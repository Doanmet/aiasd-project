"""REQ-012: answer questions about using WikiCampus with OpenAI."""

import os
from datetime import date

import requests
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator

from server.course_login import current_user
from server.storage import reserve_chat_message

router = APIRouter()
DAILY_LIMIT = 10

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
    if not api_key or not model:
        raise HTTPException(status_code=503, detail="The chat service is not configured.")

    _reserve_message(user)
    try:
        response = requests.post(
            "https://api.openai.com/v1/responses",
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
    except (requests.RequestException, ValueError) as error:
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
