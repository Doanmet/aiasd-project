"""Server tests for the REQ-009 create, browse and join test case."""

import uuid

from fastapi.testclient import TestClient

from server.course_login import auth_header_for_tests
from server.groups import groups
from server.main import app

client = TestClient(app)


def someone() -> dict[str, str]:
    email = f"group-member-{uuid.uuid4().hex}@example.com"
    return auth_header_for_tests(client, email)


def test_TC_009_01_a_student_can_create_browse_and_join_a_study_group():
    groups.clear()
    owner = someone()
    created = client.post(
        "/groups", json={"name": "Database Systems", "course": "DB201"}, headers=owner
    )
    assert created.status_code == 201
    group = created.json()
    assert group["name"] == "Database Systems"
    assert group["course"] == "DB201"

    listed = client.get("/groups", headers=owner)
    assert listed.status_code == 200
    assert group in listed.json()["items"]

    member = someone()
    joined = client.post(f"/groups/{group['id']}/members", headers=member)
    assert joined.status_code == 200
    assert joined.json() == {"joined": True}

    duplicate = client.post(f"/groups/{group['id']}/members", headers=member)
    assert duplicate.status_code == 409


def test_TC_009_02_a_group_with_a_blank_name_is_rejected():
    response = client.post("/groups", json={"name": "   ", "course": "DB201"}, headers=someone())
    assert response.status_code == 422


def test_group_creation_and_browsing_require_login():
    assert client.get("/groups").status_code == 401
    assert client.post("/groups", json={"name": "Study", "course": "DB201"}).status_code == 401
