"""Server tests for the REQ-003 discussion reading test cases."""

import uuid

from fastapi.testclient import TestClient

from server.course_login import auth_header_for_tests
from server.main import app

client = TestClient(app)


def someone() -> dict[str, str]:
    email = f"reader-{uuid.uuid4().hex}@example.com"
    return auth_header_for_tests(client, email)


def test_TC_003_01_a_student_can_read_a_post_and_its_replies():
    headers = someone()
    response = client.get("/posts/1", headers=headers)
    assert response.status_code == 200
    assert response.json()["title"] == "How are you preparing for the DBMS exam?"
    assert response.json()["category"] == "Computer Science"
    assert "normalization and SQL" in response.json()["content"]
    assert len(response.json()["replies"]) == 2


def test_TC_003_02_an_unknown_post_is_not_found():
    response = client.get("/posts/999999", headers=someone())
    assert response.status_code == 404
    assert response.json()["detail"] == "Discussion not found."


def test_post_reading_requires_login():
    assert client.get("/posts/1").status_code == 401
