# Week 6 — AI log

> **THE AI LOG IS WRITTEN BY A HUMAN. NO EXCEPTIONS.**
> **AI LOG KESİNLİKLE İNSAN TARAFINDAN YAZILIR. İSTİSNA YOK.**
>
> **Write this file yourself, in your own words. Outside the Evidence block and the bold
> quotes (see below), use no assistant: not to write it, not to "improve" it, not even for
> the language. A log written by an assistant earns 0.** Your English or Turkish is not
> graded.
>
> **Bu dosyayı kendiniz, kendi cümlelerinizle yazın. Evidence bloğu ve kalın alıntılar (aşağıya
> bakın) dışında asistan kullanmayın: ne yazmak için, ne "düzeltmek" için, dil için bile.
> Asistana yazdırılmış bir günlük 0 puan alır.** İngilizceniz ya da Türkçeniz notlanmaz.
>
> There are two kinds of words, as in Weeks 4 and 5. Your words are plain text: every word,
> the grammar too. The assistant's words are **bold**, and only where they must come from it:
> an attack it named, or one sentence or one line of its code that you point at. Each bold
> phrase is also in the Evidence block, under `AI:`, letter for letter. Use bold for nothing
> else.
>
> 4. ve 5. haftalardaki gibi iki tür söz var. Sizin sözleriniz düz yazıdır: her kelime, dil
> bilgisi de. Asistanın sözleri **kalındır** ve yalnızca asistandan gelmesi gereken yerdedir:
> adını koyduğu bir saldırı ya da işaret ettiğiniz tek bir cümle veya kodundan tek bir satır.
> Her kalın ifade, harfi harfine aynı biçimde, Evidence bloğunda `AI:` altında da bulunur.
> Kalın yazıyı başka hiçbir şey için kullanmayın.
>
> **Part of the 2 human-involvement points, and a person reads it.** The grade does not depend on how much you used
> AI. It depends on whether you tried each attack yourself and looked at what really
> happened. Delete these quoted instructions before you commit.

<!--
THIS WEEK'S TASK — the hostile reviewer (AI_Doc5 §3), on your own feature. Short answers, one per heading.
1. Give the assistant the routes of your own feature (your files in server/, not course_login.py),
   and the requirements they serve, with their acceptance criteria. Ask it to attack: "Give me the
   three strongest attacks on these routes, numbered. Do not fix anything, only attack."
2. Try each attack yourself: against your running server (curl, /docs or your page), or as a test
   in server/tests/. Copy the commands and their output into the Evidence block, under TERMINAL:.
   Do not change them.
3. For each attack: what your server did, with the status code.
4. The one you fixed: what you changed, and the test (with its test case id) that now catches it.
5. The one that is wrong: why it does not work against your server, and the evidence.
6. Your groupmate attacked you in the lecture (group_06.json). Where do the two agree? Which of
   the two found something that the other missed?

WEAK:   "I asked ChatGPT to attack my app. It gave three attacks. My app is secure."
STRONG: "Attack 1 was **accept a reply as a student by calling the endpoint directly**. The page hides
         the button from students, but I sent POST /replies/3/accept with a student's token and got
         403, so the server checks it too. Attack 2, **read another course by changing its id**, is
         wrong for my app: every route asks course_of_member() first, and the two calls gave 403. Attack 3
         was real: an announcement of five spaces was pinned as an empty card (201). The server now strips
         the text first and answers 422; test TC-003-02 sends five spaces too (CR-02). My groupmate found
         the spaces as well, but never tried the accept endpoint, which the assistant did."

Delete this comment when you are done.
-->

## The assistant, and what I gave it

chat gpt-6 kullandım. posts.py, resources.py, groups.py dosyalarını verip REQ-002, REQ-003, REQ-004, REQ-007 ve REQ-009 için 3 güçlü saldırı yazmasını istedim.

## The three attacks, and what my server did

1. Giriş yapmadan listelemeye çalışmak. Server'ım izin vermedi. 401 Unauthorized attı.
2. Discussion kısmında title yerine sadece boşluk girmek. Server'ım bunun farkına vardı ve izin vermedi. 422 Unprocessable Content attı. 
3. Listede bulunmayan bir arama yapmak. Server 200 Ok olarak isteği işledi ama boş liste döndüğünü de ayrıca farkedip kullanıcıyı bilgilendirdi.

## The one I fixed

Bu hafta herhangibir fix yapmadım.

## The one that is wrong

Kimlik doğrulamayı aşma girişimi başarısız oldu ve sunucum 401 döndürdü.

## The assistant and my groupmate


Ai asistanın verdiği 'attack' fikirlerini beğendim ve groupmate im ile server'ım üzerinde bu testleri gerçekleştirdik.

## Evidence — the exchange and the terminal output

```text
ME:
server/posts.py
   REQ-002
   REQ-003: 

 server/resources.py
   REQ-004
   REQ-007

 server/groups.py
   REQ-009

Inspect the actual routes and their validation behaviors

Give me the three strongest attacks on these routes, numbered. Do not change anything nly attack. for each attack explain exactly what request or input I should try and what result would cause a vulnerability.

AI:
**1. Authentication bypass:

Try calling the post, resource, and group endpoints directly without an Authorization token. Check whether any endpoint returns protected data or allows a write instead of rejecting the request with 401 Unauthorized.

Neden önemli? Özelliklerin tamamında Depends(current_user) kullanılıyor. Arayüzde giriş butonunu gizlemek yeterli değildir; sunucunun da giriş yapmamış kullanıcıyı engellemesi gerekir.

2. Whitespace-only input:

Try creating a post with a title, category, or content containing only spaces. Also try creating a group with a name or course containing only spaces. Check whether the server accepts the input or rejects it with 422 Unprocessable Entity.

Neden önemli? Kodunda strip() ile kontrol yapılıyor. Bu nedenle saldırının başarılı olmasını beklemiyorum. Ama mevcut testlerin bütün alanları ayrı ayrı kontrol edip etmediğini görebiliriz.

3. Empty search result handling:

Search for a keyword that matches no resources, such as xyz-no-match-123. Check both the API response and the actual web page. The API should return an empty item list, and the page should display a clear no-results message instead of leaving the user with a blank result area.**

TERMINAL:
(.venv) PS C:\Users\xxx\Documents\aiasd-project> uvicorn server.main:app --reload
INFO:     Will watch for changes in these directories: ['C:\\Users\\xxx\\Documents\\aiasd-project']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [22372] using StatReload
INFO:     Started server process [20316]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:59917 - "GET /docs HTTP/1.1" 200 OK
INFO:     127.0.0.1:59917 - "GET /openapi.json HTTP/1.1" 200 OK
INFO:     127.0.0.1:56908 - "POST /auth/login HTTP/1.1" 422 Unprocessable Content
INFO:     127.0.0.1:57027 - "GET /posts HTTP/1.1" 401 Unauthorized
INFO:     127.0.0.1:61794 - "POST /posts HTTP/1.1" 401 Unauthorized
INFO:     127.0.0.1:51289 - "POST /posts HTTP/1.1" 401 Unauthorized
INFO:     127.0.0.1:55700 - "POST /posts HTTP/1.1" 401 Unauthorized
INFO:     Shutting down
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [20316]
INFO:     Stopping reloader process [22372]
(.venv) PS C:\Users\xxx\Documents\aiasd-project> $env:AIASD_CODE_FILE="login_code.txt"
>> 
(.venv) PS C:\Users\xxx\Documents\aiasd-project> uvicorn server.main:app --reload
INFO:     Will watch for changes in these directories: ['C:\\Users\\xxx\\Documents\\aiasd-project']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [20408] using StatReload
INFO:     Started server process [25100]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     127.0.0.1:64962 - "GET / HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:64962 - "GET /favicon.ico HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:50250 - "GET / HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:50250 - "GET / HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:59526 - "GET / HTTP/1.1" 404 Not Found
INFO:     127.0.0.1:53331 - "GET /web/login.html HTTP/1.1" 304 Not Modified
INFO:     127.0.0.1:53331 - "GET /web/style.css HTTP/1.1" 304 Not Modified
INFO:     127.0.0.1:52451 - "POST /auth/code HTTP/1.1" 200 OK
INFO:     127.0.0.1:58883 - "POST /auth/login HTTP/1.1" 200 OK
INFO:     127.0.0.1:58883 - "GET /web/create-post.html HTTP/1.1" 200 OK
INFO:     127.0.0.1:58883 - "GET /posts HTTP/1.1" 200 OK
INFO:     127.0.0.1:62683 - "POST /posts HTTP/1.1" 422 Unprocessable Content
INFO:     127.0.0.1:61558 - "GET /web/resources.html HTTP/1.1" 200 OK
INFO:     127.0.0.1:61558 - "GET /resources?q=xyz-no-match-123 HTTP/1.1" 200 OK


PS C:\Users\xxx\Documents\aiasd-project> (Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned) ; (& c:\Users\xxx\Documents\aiasd-project\.venv\Scripts\Activate.ps1)
(.venv) PS C:\Users\xxx\Documents\aiasd-project> curl.exe -i http://127.0.0.1:8000/resources?q=Java
HTTP/1.1 401 Unauthorized
date: Sat, 31 Oct 2026 20:24:24 GMT
server: uvicorn
content-length: 26
content-type: application/json

{"detail":"Not logged in"}
(.venv) PS C:\Users\xxx\Documents\aiasd-project> curl.exe -i http://127.0.0.1:8000/groups
HTTP/1.1 401 Unauthorized
date: Sat, 31 Oct 2026 20:24:30 GMT
server: uvicorn
content-length: 26
content-type: application/json

{"detail":"Not logged in"}
(.venv) PS C:\Users\xxx\Documents\aiasd-project> ^C
(.venv) PS C:\Users\xxx\Documents\aiasd-project> 