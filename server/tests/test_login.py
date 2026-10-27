"""Week 5 login contract tests, adapted to the course login from Week 6."""

import uuid

from fastapi.testclient import TestClient

from server.main import app

client = TestClient(app)


def test_TC_001_01_a_code_is_sent_for_a_valid_email():
    email = f"student-{uuid.uuid4().hex}@example.com"
    response = client.post("/auth/code", json={"email": email})
    assert response.status_code == 200
    assert response.json() == {"sent": True}


def test_TC_001_02_a_wrong_code_is_refused():
    email = f"student-{uuid.uuid4().hex}@example.com"
    response = client.post("/auth/login", json={"email": email, "code": "0000"})
    assert response.status_code == 401


def test_TC_001_03_an_expired_code_is_refused():
    email = f"student-{uuid.uuid4().hex}@example.com"
    response = client.post("/auth/login", json={"email": email, "code": "1234"})
    assert response.status_code == 401


def test_TC_001_04_a_second_code_request_too_soon_is_refused():
    email = f"student-{uuid.uuid4().hex}@example.com"
    first = client.post("/auth/code", json={"email": email})
    assert first.status_code == 200

    response = client.post("/auth/code", json={"email": email})
    assert response.status_code == 429
