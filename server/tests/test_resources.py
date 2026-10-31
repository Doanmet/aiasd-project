"""Server tests for the REQ-004 and REQ-007 resource search test cases."""

import uuid

from fastapi.testclient import TestClient

from server.course_login import auth_header_for_tests
from server.main import app

client = TestClient(app)


def someone() -> dict[str, str]:
    email = f"searcher-{uuid.uuid4().hex}@example.com"
    return auth_header_for_tests(client, email)


def test_TC_004_01_search_finds_matching_resources_and_filters_unrelated_items():
    response = client.get("/resources", params={"q": "Java"}, headers=someone())
    assert response.status_code == 200
    assert len(response.json()["items"]) == 1
    assert response.json()["items"][0]["title"] == "Java OOP Exam Summary"


def test_TC_007_01_an_unmatched_search_returns_no_items():
    response = client.get("/resources", params={"q": "xyz-no-match-123"}, headers=someone())
    assert response.status_code == 200
    assert response.json() == {"items": []}


def test_resource_search_requires_login():
    assert client.get("/resources", params={"q": "Java"}).status_code == 401
