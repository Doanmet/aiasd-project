"""REQ-004 and REQ-007: search the shared study resources."""

from fastapi import APIRouter, Depends, HTTPException, Query

from server.course_login import current_user

router = APIRouter()

resources = [
    {
        "id": 1,
        "title": "Database Systems — Revision Notes",
        "subject": "Database Systems",
        "description": "Summary of keys, normalization and relationships.",
    },
    {
        "id": 2,
        "title": "Java OOP Exam Summary",
        "subject": "Programming",
        "description": "Classes, inheritance, interfaces and polymorphism.",
    },
    {
        "id": 3,
        "title": "Sorting Algorithms Cheat Sheet",
        "subject": "Algorithms",
        "description": "A quick comparison of common sorting algorithms.",
    },
]


@router.get("/resources")
def search_resources(q: str = Query(..., min_length=1), _user: str = Depends(current_user)) -> dict:
    query = q.strip().casefold()
    if not query:
        raise HTTPException(status_code=422, detail="Search text must not be empty.")
    matches = [
        item
        for item in resources
        if query
        in " ".join(str(item[key]) for key in ("title", "subject", "description")).casefold()
    ]
    return {"items": matches}
