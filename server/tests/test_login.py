"""Week 5 contract tests; login returns 501 until it is built in Week 6."""

from fastapi.testclient import TestClient

from server.main import app

client = TestClient(app)


def test_TC_001_01_a_code_is_sent_for_a_valid_email():
    response = client.post("/auth/code", json={"email": "student@example.com"})
    assert response.status_code == 200
    assert response.json() == {"sent": True}


def test_TC_001_02_a_wrong_code_is_refused():
    response = client.post("/auth/login", json={"email": "student@example.com", "code": "0000"})
    assert response.status_code == 401


def test_TC_001_03_an_expired_code_is_refused():
    response = client.post("/auth/login", json={"email": "student@example.com", "code": "1234"})
    assert response.status_code == 401


def test_TC_001_04_a_second_code_request_too_soon_is_refused():
    response = client.post("/auth/code", json={"email": "student@example.com"})
    assert response.status_code == 429
