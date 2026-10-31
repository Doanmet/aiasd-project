"""REQ-002 and REQ-003: create, list and read categorized discussions."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator

from server.course_login import current_user

router = APIRouter()
posts: list[dict] = [
    {
        "id": 1,
        "title": "How are you preparing for the DBMS exam?",
        "category": "Computer Science",
        "content": "I'm reviewing normalization and SQL queries. Which topics should I focus on before the exam?",
        "replies": [
            {"text": "Practice joins, functional dependencies and normal forms."},
            {"text": "Don't skip transactions and indexing."},
        ],
    }
]


class PostRequest(BaseModel):
    title: str
    category: str
    content: str

    @field_validator("title", "category", "content")
    @classmethod
    def required_text_must_not_be_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field must not be empty.")
        return cleaned


@router.post("/posts", status_code=201)
def create_post(body: PostRequest, _user: str = Depends(current_user)) -> dict[str, int | str]:
    post = {
        "id": max((item["id"] for item in posts), default=0) + 1,
        "title": body.title,
        "category": body.category,
        "content": body.content,
        "replies": [],
    }
    posts.append(post)
    return {key: post[key] for key in ("id", "title", "category", "content")}


@router.get("/posts")
def list_posts(_user: str = Depends(current_user)) -> dict[str, list[dict]]:
    return {
        "items": [{key: p[key] for key in ("id", "title", "category", "content")} for p in posts]
    }


@router.get("/posts/{post_id}")
def get_post(post_id: int, _user: str = Depends(current_user)) -> dict:
    """REQ-003: show a discussion and its replies to a signed-in student."""
    post = next((item for item in posts if item["id"] == post_id), None)
    if post is None:
        raise HTTPException(status_code=404, detail="Discussion not found.")
    return post
