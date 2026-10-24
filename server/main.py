"""FastAPI skeleton for WikiCampus; feature routes are built in later weeks."""

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel

app = FastAPI(title="WikiCampus")


class EmailCodeRequest(BaseModel):
    email: str


class LoginRequest(BaseModel):
    email: str
    code: str


class PostRequest(BaseModel):
    title: str
    category: str
    content: str


@app.get("/health")
def health() -> dict:
    """Technical check that the server is running."""
    return {"status": "ok"}


@app.post("/auth/code")
def request_login_code(body: EmailCodeRequest) -> None:
    """REQ-001: send a one-time email code; implementation comes in Week 6."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 6")


@app.post("/auth/login")
def login(body: LoginRequest) -> None:
    """REQ-001: verify the one-time code; implementation comes in Week 6."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 6")


@app.post("/posts")
def create_post(body: PostRequest) -> None:
    """REQ-002: create a categorized course discussion; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/posts/{post_id}")
def get_post(post_id: int) -> None:
    """REQ-003: show a discussion and its replies; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/resources")
def search_resources(q: str = Query(..., min_length=1)) -> None:
    """REQ-004, REQ-007: search study resources; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/profiles/{student_id}")
def get_profile(student_id: str) -> None:
    """REQ-005: show a student profile; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/groups")
def list_groups() -> None:
    """REQ-009: list course study groups; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.post("/groups")
def create_group() -> None:
    """REQ-009: create a course study group; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.post("/groups/{group_id}/members")
def join_group(group_id: int) -> None:
    """REQ-009: join a study group; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/groups/{group_id}/messages")
def list_group_messages(group_id: int) -> None:
    """REQ-010: read group messages; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.post("/groups/{group_id}/messages")
def send_group_message(group_id: int) -> None:
    """REQ-010: send a group message; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")
