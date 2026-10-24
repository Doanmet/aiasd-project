# API contract — WikiCampus

Feature routes have matching routes in server/main.py. Until the feature is built, they return 501. Examples use invented student data.

| Method | Path | Request | Response | Errors | REQ |
|---|---|---|---|---|---|
| GET | /health | — | 200 {"status":"ok"} | — | — |
| POST | /auth/code | {"email":"student@example.com"} | 200 {"sent":true} | 422 invalid or missing email · 429 another code was requested within 60 seconds | REQ-001 |
| POST | /auth/login | {"email":"student@example.com","code":"1234"} | 200 {"token":"sample-session-token"} | 401 wrong or expired code · 422 missing or invalid field | REQ-001 |
| POST | /posts | {"title":"Database Systems Exam","category":"courses","content":"Does anyone have revision notes?"} | 201 {"id":1,"title":"Database Systems Exam","category":"courses","content":"Does anyone have revision notes?"} | 401 not signed in · 422 a required field is missing or empty | REQ-002 |
| GET | /posts/{post_id} | post_id in the path | 200 {"id":1,"title":"Database Systems Exam","replies":[]} | 401 not signed in · 404 post does not exist | REQ-003 |
| GET | /resources | q=Java query parameter | 200 {"items":[{"id":1,"title":"Java OOP"}]} or {"items":[]} | 401 not signed in · 422 q is missing or empty | REQ-004, REQ-007 |
| GET | /profiles/{student_id} | student_id in the path | 200 {"student_id":"sample-1","courses":["Database Systems"],"interests":["Java"]} | 401 not signed in · 404 profile does not exist | REQ-005 |
| GET | /groups | — | 200 {"items":[]} | 401 not signed in | REQ-009 |
| POST | /groups | {"name":"Database Systems","course":"DB201"} | 201 {"id":1,"name":"Database Systems","course":"DB201"} | 401 not signed in · 422 name or course is missing | REQ-009 |
| POST | /groups/{group_id}/members | group_id in the path | 200 {"joined":true} | 401 not signed in · 404 group does not exist · 409 already a member | REQ-009 |
| GET | /groups/{group_id}/messages | group_id in the path | 200 {"items":[]} | 401 not signed in · 403 not a group member · 404 group does not exist | REQ-010 |
| POST | /groups/{group_id}/messages | {"text":"I found a useful review sheet."} | 201 {"id":1,"text":"I found a useful review sheet."} | 401 not signed in · 403 not a group member · 404 group does not exist · 422 text is empty | REQ-010 |
