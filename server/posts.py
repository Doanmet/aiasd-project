"""REQ-002: create and list categorized course discussion posts."""

from fastapi import APIRouter, Depends
from pydantic import BaseModel, field_validator

from server.course_login import current_user

router = APIRouter()
posts: list[dict[str, int | str]] = []


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
        "id": len(posts) + 1,
        "title": body.title,
        "category": body.category,
        "content": body.content,
    }
    posts.append(post)
    return post


@router.get("/posts")
def list_posts(_user: str = Depends(current_user)) -> dict[str, list[dict[str, int | str]]]:
    return {"items": posts}
