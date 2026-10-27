"""Server tests for the REQ-002 post creation and list test cases."""

import uuid

from fastapi.testclient import TestClient

from server.course_login import auth_header_for_tests
from server.main import app

client = TestClient(app)


def someone() -> dict[str, str]:
    email = f"student-{uuid.uuid4().hex}@example.com"
    return auth_header_for_tests(client, email)


def test_TC_002_01_a_post_is_created_and_appears_in_the_list():
    body = {
        "title": f"Database Systems Exam {uuid.uuid4().hex[:8]}",
        "category": "Computer Science",
        "content": "Does anyone have revision notes?",
    }

    assert client.get("/posts").status_code == 401
    assert client.post("/posts", json=body).status_code == 401

    headers = someone()
    created = client.post("/posts", json=body, headers=headers)

    assert created.status_code == 201
    assert created.json() == {"id": created.json()["id"], **body}

    listed = client.get("/posts", headers=headers)

    assert listed.status_code == 200
    assert created.json() in listed.json()["items"]


def test_TC_002_02_a_post_with_an_empty_required_field_is_rejected():
    headers = someone()
    before = client.get("/posts", headers=headers).json()["items"]

    response = client.post(
        "/posts",
        json={
            "title": "",
            "category": "Computer Science",
            "content": "Does anyone have revision notes?",
        },
        headers=headers,
    )

    after = client.get("/posts", headers=headers).json()["items"]

    assert response.status_code == 422
    assert "This field must not be empty." in response.text
    assert after == before
