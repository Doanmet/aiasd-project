"""REQ-009: create, browse and join course study groups."""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, field_validator

from server.course_login import current_user

router = APIRouter()
groups: list[dict] = []


class GroupRequest(BaseModel):
    name: str
    course: str

    @field_validator("name", "course")
    @classmethod
    def required_text_must_not_be_blank(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("This field must not be empty.")
        return cleaned


@router.get("/groups")
def list_groups(_user: str = Depends(current_user)) -> dict[str, list[dict]]:
    return {"items": [{key: group[key] for key in ("id", "name", "course")} for group in groups]}


@router.post("/groups", status_code=201)
def create_group(body: GroupRequest, user: str = Depends(current_user)) -> dict:
    """A signed-in student creates a named group for a course."""
    group = {
        "id": len(groups) + 1,
        "name": body.name,
        "course": body.course,
        "members": [user],
    }
    groups.append(group)
    return {key: group[key] for key in ("id", "name", "course")}


@router.post("/groups/{group_id}/members")
def join_group(group_id: int, user: str = Depends(current_user)) -> dict[str, bool]:
    group = next((item for item in groups if item["id"] == group_id), None)
    if group is None:
        raise HTTPException(status_code=404, detail="Study group not found.")
    if user in group["members"]:
        raise HTTPException(status_code=409, detail="Already a member of this group.")
    group["members"].append(user)
    return {"joined": True}
