# Week 5 — AI log

## The assistant and the code I asked it for
I used ChatGPT to repair my FastAPI skeleton and add tests from my login test cases. The feature is not ready yet, so these routes should still return 501 this week.

## What I expected, before running
I expected the health test to pass. TC-001-01 through TC-001-04 should fail because login is planned for Week 6. I wanted to see 501 rather than a missing route or an import error.

## What I ran and saw
I ran `.\.venv\Scripts\python.exe -m pytest -q -p no:cacheprovider`. The health test passed and all four login tests got 501. The routes exist, but login is not implemented yet.

## The line I kept and why
The server raises `HTTPException(status_code=501, detail="Not built yet: Week 6")` in both login routes. I kept it because writing the actual login now would skip the Week 6 work and make the tests pass too early.

## Evidence — prompt, answer, and terminal output

```text
ME:
yes. it seems you understand the scope of my project. it will help uni students to study, chat, manage uni groups ....
know fix every thing you mentioned at the at with a natural student language. and list what have you changed.

AI:
The Week 5 server, API contract, design, and login tests are now aligned. I also filled the requirements and test cases around the real project direction: study resources, discussions, profiles, course groups, and group chat.

TERMINAL:
COMMAND: $env:PYTHONDONTWRITEBYTECODE='1'; .\.venv\Scripts\python.exe -m pytest -q -p no:cacheprovider

.FFFF                                                                    [100%]
================================== FAILURES ==================================
_______________ test_TC_001_01_a_code_is_sent_for_a_valid_email _______________

    def test_TC_001_01_a_code_is_sent_for_a_valid_email():
        response = client.post("/auth/code", json={"email": "student@example.com"})
>       assert response.status_code == 200
E       assert 501 == 200
E        +  where 501 = <Response [501 Not Implemented]>.status_code

server\tests\test_login.py:12: AssertionError
___________________ test_TC_001_02_a_wrong_code_is_refused ____________________

    def test_TC_001_02_a_wrong_code_is_refused():
        response = client.post("/auth/login", json={"email": "student@example.com", "code": "0000"})
>       assert response.status_code == 401
E       assert 501 == 401
E        +  where 501 = <Response [501 Not Implemented]>.status_code

server\tests\test_login.py:18: AssertionError
__________________ test_TC_001_03_an_expired_code_is_refused __________________

    def test_TC_001_03_an_expired_code_is_refused():
        response = client.post("/auth/login", json={"email": "student@example.com", "code": "1234"})
>       assert response.status_code == 401
E       assert 501 == 401
E        +  where 501 = <Response [501 Not Implemented]>.status_code

server\tests\test_login.py:23: AssertionError
__________ test_TC_001_04_a_second_code_request_too_soon_is_refused ___________

    def test_TC_001_04_a_second_code_request_too_soon_is_refused():
        response = client.post("/auth/code", json={"email": "student@example.com"})
>       assert response.status_code == 429
E       assert 501 == 429
E        +  where 501 = <Response [501 Not Implemented]>.status_code

server\tests\test_login.py:28: AssertionError
=========================== short test summary info ============================
FAILED server/tests/test_login.py::test_TC_001_01_a_code_is_sent_for_a_valid_email
FAILED server/tests/test_login.py::test_TC_001_02_a_wrong_code_is_refused
FAILED server/tests/test_login.py::test_TC_001_03_an_expired_code_is_refused
FAILED server/tests/test_login.py::test_TC_001_04_a_second_code_request_too_soon_is_refused
4 failed, 1 passed in 0.90s
```
