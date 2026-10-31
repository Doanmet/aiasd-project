"""FastAPI skeleton for WikiCampus; feature routes are built in later weeks."""

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

from server import course_login, groups, posts, resources

app = FastAPI(title="WikiCampus")
app.include_router(course_login.router)
app.include_router(posts.router)
app.include_router(resources.router)
app.include_router(groups.router)


@app.get("/health")
def health() -> dict:
    """Technical check that the server is running."""
    return {"status": "ok"}


@app.get("/profiles/{student_id}")
def get_profile(student_id: str) -> None:
    """REQ-005: show a student profile; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.get("/groups/{group_id}/messages")
def list_group_messages(group_id: int) -> None:
    """REQ-010: read group messages; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


@app.post("/groups/{group_id}/messages")
def send_group_message(group_id: int) -> None:
    """REQ-010: send a group message; implemented in Week 8."""
    raise HTTPException(status_code=501, detail="Not built yet: Week 8")


WEB = Path(__file__).resolve().parent.parent / "web"
if WEB.is_dir():
    app.mount("/web", StaticFiles(directory=WEB, html=True), name="web")
