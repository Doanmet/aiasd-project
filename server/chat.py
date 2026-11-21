"""REQ-012: answer questions about using WikiCampus with Groq."""

import logging
import os
from datetime import date

import requests
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator

from server.course_login import current_user
from server.storage import reserve_chat_message

router = APIRouter()
DAILY_LIMIT = 10
logger = logging.getLogger(__name__)

SYSTEM_PROMPT = (
    "You are the WikiCampus app guide. Answer questions only about using the "
    "WikiCampus application, such as finding resources or creating discussion "
    "topics. If you do not know the answer, say that you do not know and do not "
    "guess. For questions unrelated to WikiCampus, politely say you can only "
    "help with using WikiCampus."
)


class ChatRequest(BaseModel):
    message: str

    @field_validator("message")
    @classmethod
    def message_must_not_be_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Message must not be empty.")
        return cleaned


def _reserve_message(user: str) -> None:
    today = date.today()
    if not reserve_chat_message(user, today.isoformat(), DAILY_LIMIT):
        raise HTTPException(status_code=429, detail="Daily chat limit reached (10 messages).")


@router.post("/chat")
def chat(body: ChatRequest, user: str = Depends(current_user)) -> dict[str, str]:
    """Send a WikiCampus usage question to OpenAI; the API key stays on the server."""
    api_key = os.getenv("LLM_API_KEY")
    model = os.getenv("LLM_MODEL")
    base_url = os.getenv("LLM_API_BASE_URL", "https://api.groq.com/openai/v1").rstrip("/")
    if not api_key or not model:
        raise HTTPException(status_code=503, detail="The chat service is not configured.")

    _reserve_message(user)
    try:
        response = requests.post(
            f"{base_url}/responses",
            headers={"Authorization": f"Bearer {api_key}"},
            json={
                "model": model,
                "instructions": SYSTEM_PROMPT,
                "input": body.message,
            },
            timeout=20,
        )
        response.raise_for_status()
        payload = response.json()
    except requests.HTTPError as error:
        status = error.response.status_code if error.response is not None else "unknown"
        provider_code = "unknown"
        if error.response is not None:
            try:
                provider_error = error.response.json().get("error", {})
                if isinstance(provider_error, dict):
                    provider_code = (
                        provider_error.get("code") or provider_error.get("type") or "unknown"
                    )
            except ValueError:
                pass
        logger.warning("LLM API rejected the request: status=%s code=%s", status, provider_code)
        raise HTTPException(
            status_code=503,
            detail="The LLM API is unavailable or did not return a valid answer.",
        ) from error
    except requests.RequestException as error:
        logger.warning("LLM API connection failed: %s", type(error).__name__)
        raise HTTPException(
            status_code=503,
            detail="The LLM API is unavailable or did not return a valid answer.",
        ) from error
    except ValueError as error:
        logger.warning("LLM API response was not valid JSON")
        raise HTTPException(
            status_code=503,
            detail="The LLM API is unavailable or did not return a valid answer.",
        ) from error

    answer_parts = [
        part.get("text", "")
        for item in payload.get("output", [])
        if item.get("type") == "message"
        for part in item.get("content", [])
        if part.get("type") == "output_text" and part.get("text")
    ]
    answer = "\n".join(answer_parts).strip()
    if not answer:
        raise HTTPException(status_code=503, detail="The LLM API did not return an answer.")
    return {"answer": answer}
