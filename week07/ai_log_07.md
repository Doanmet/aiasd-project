# Week 7 — AI log

<!--
A HUMAN WRITES THE AI LOG, WITH NO EXCEPTIONS.
AI LOG'U İNSAN YAZAR, İSTİSNASIZ.

Write this file yourself, in your own words. The Evidence block and the bold quotes are the only
exceptions. Do not use an assistant to write the log, to "improve" it, or to correct its language. A log
that an assistant wrote earns 0. Your English or Turkish is not graded. A person reads the log.

Bu dosyayı kendiniz, kendi cümlelerinizle yazın. Evidence bloğu ve kalın alıntılar tek istisnadır.
Asistanı günlüğü yazmak, "düzeltmek" ya da dilini düzeltmek için kullanmayın. Asistanın yazdığı bir
günlük 0 puan alır. İngilizceniz ya da Türkçeniz notlanmaz. Günlüğü bir insan okur.

The log has two kinds of words, as in Weeks 4 to 6. Your own words are plain text. The words of the
assistant are **bold**. Use bold only where the words must come from the assistant: one line of its diff,
or one sentence of its answer, that you point at. Each bold phrase also appears in the Evidence block,
letter for letter. Do not use bold for anything else.

Günlükte, 4–6. haftalardaki gibi, iki tür söz vardır. Sizin sözleriniz düz yazıdır. Asistanın sözleri
**kalındır**. Kalın yazıyı yalnızca sözlerin asistandan gelmesi gereken yerde kullanın: işaret ettiğiniz,
diff'inden tek bir satır ya da cevabından tek bir cümle. Her kalın ifade, harfi harfine aynı biçimde,
Evidence bloğunda da bulunur. Kalın yazıyı başka hiçbir şey için kullanmayın.

This week's task is small diffs (AI_Doc5 §6) on your mobile client. ASSIGNMENT_07 §15 gives the steps.
1. Choose ONE change to your mobile client. Here are three examples. A screen shows the 409 message of
   the server. The app sends the user back to the login after a 401. The app keeps the address of the
   server in one constant.
2. Give the assistant the file, and ask for exactly this change and nothing else.
3. Before you accept anything, read ALL of the diff (git diff). Read also the lines that you did not
   ask for.
4. Keep the part that you asked for. Refuse every other change, even a good one.
5. Commit the accepted change on its own, with a message that names it. Write its commit id below.
   The first 7 characters of the id are enough.
6. Run the screen on the phone, and show that the change works.

A WEAK log says: "I asked the assistant to improve my booking screen. The new code was better, so I
accepted it."
A STRONG log says: "I asked for one change in book_screen.dart: after a 401, go back to the login screen. The diff
         did that, but it also changed **const server = 'http://192.168.1.40:8000';** in api.dart, an
         address I did not ask for, and it renamed my variable message to statusText. I kept only the
         401 part and put api.dart back with git restore. Commit 4e1a9c2 changes six lines of
         book_screen.dart and nothing else. On the emulator I restarted the server, so my token was no
         longer valid, and pressed Book: the app went back to the login screen."

Delete this comment when you are done.
-->

## The change I asked for

Codex. I asked it to build the mobile app and explain to me how to export with expo go.

## The change I received

we mainly worked on the mobile folder and week07 folder

## What I refused, and why

I refused to build a real gmail aauthorization because it adds to much bottleneck for this project. we are fine with mock auth currently.

## The commit, and the phone

[Write the commit id (its first 7 characters) and its message. Write how you showed on the phone that the change works.]

## Evidence — the exchange and the diff

```text
ME:
login was succesfull. now lets build the home page for wikicampus.

AI:
Login worked; the page in your screenshot is the Expo sample screen. I’ve added a WikiCampus discussion screen and changed Continue to open it. It loads the discussion list and lets you create a post using the same /posts endpoints as the web app.

Reload the app in Expo Go. You should see the Create a discussion screen after you sign in and tap Continue. Try creating a post and check that it appears in the list. The changes are in [discussions.tsx](C:/Users/xxx/Documents/aiasd-project/mobile/src/app/discussions.tsx) and [index.tsx](C:/Users/xxx/Documents/aiasd-project/mobile/src/app/index.tsx).

The TypeScript check found no errors in these screens. It still reports the starter template’s existing error in app-tabs.web.tsx.

  Edited 2 files+193-1View changesUndoView changes

mobile/src/app/discussions.tsxmobile/src/app/discussions.tsx+192-0
mobile/src/app/index.tsxmobile/src/app/index.tsx+1-1

TERMINAL:
PS C:\Users\xxx\Documents\aiasd-project> (Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned) ; (& c:\Users\xxx\Documents\aiasd-project\.venv\Scripts\Activate.ps1)
(.venv) PS C:\Users\xxx\Documents\aiasd-project> cd mobile
(.venv) PS C:\Users\xxx\Documents\aiasd-project\mobile> npx expo start
Starting project at C:\Users\xxx\Documents\aiasd-project\mobile
Using src/app as the root directory for Expo Router.
React Compiler enabled
Starting Metro Bundler

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀█ █▄▄▄▀▀█ ▄▄▄▄▄ █
█ █   █ █▀▀▀█ ▀▄▀▀█ █   █ █
█ █▄▄▄█ █▀ █▀▀ ▄▀██ █▄▄▄█ █
█▄▄▄▄▄▄▄█▄▀ ▀▄█▄█ █▄▄▄▄▄▄▄█
█    ▄█▄▄▄▄▀▄▀ ▀██ █▄█ █ ██
██▀▀▄▀▀▄▀▀█▄█▀██▄▀  ▀  █▄ █
█ █  ▄█▄▄█▄▄█▄▄▀▄▄▀▄█▄▀ ▀██
█ █▀▀▄▄▄███  ▄██▄   ██ ▄  █
█▄█▄▄▄▄▄█  ▄▄▀ ▀▄ ▄▄▄ ▄ ▄▄█
█ ▄▄▄▄▄ █▄ ▀█▀██▀ █▄█ ▀▄ ▄█
█ █   █ █  ▄█▄▄▀▄▄▄   ▄   █
█ █▄▄▄█ █    ▄█▀▄▀▀█▀█▀▄█ █
█▄▄▄▄▄▄▄█▄█▄▄▄██▄██████▄▄▄█

› Scan the QR code above to open in Expo Go.
› Metro: exp://10.55.176.39:8081
› Web: http://localhost:8081

› Using Expo Go (Press s to switch to development build)
› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
λ Bundled 17459ms node_modules\expo\node_modules\@expo\cli\node_modules\@expo\router-server\node\render.js (1329 modules)
λ Bundled 4793ms node_modules\expo\node_modules\@expo\cli\node_modules\@expo\router-server\node\render.js (1 module)
Web Bundled 8407ms node_modules\expo-router\entry.js (831 modules)
Web Bundled 8664ms node_modules\expo-router\entry.js (1 module)
λ Bundled 592ms src\app\index.tsx (64 modules)
λ Bundled 578ms src\app\index.tsx (1 module)

Metro error: This operation was aborted

Code: http.js
  103 |         if (!res.writableEnded) {
  104 |             if (!controller.signal.aborted) {
> 105 |                 controller.abort();
      |                            ^
  106 |             }
  107 |             if (!req.destroyed) {
  108 |                 req.destroy();
Call Stack
  new DOMException (node:internal\per_context\domexception)
  AbortController.abort (node:internal\abort_controller)
  ServerResponse.<anonymous> (node_modules\expo-server\build\cjs\vendor\http.js:105:28)
  Object.onceWrapper (node:events)
  ServerResponse.emit (node:events)
  emitCloseNT (node:_http_server)
  Socket.onServerResponseClose (node:_http_server)
  Socket.emit (node:events)
  TCP.<anonymous> (node:net)
No apps connected. Sending "sendDevCommand" to all React Native apps failed. Make sure your app is running in the simulator or on a phone connected via USB.
Web Bundled 7484ms node_modules\expo-router\entry.js (830 modules)
Web  INFO  %cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold
Web  LOG  Running application "main" with appParams: {"hydrate": true, "rootTag": "#root"}
Web Bundled 6143ms src\app\_layout.tsx (1224 modules)
Web Bundled 705ms src\app\index.tsx (632 modules)
Android Bundled 15096ms node_modules\expo-router\entry.js (1793 modules)
λ Bundled 81ms node_modules\expo\node_modules\@expo\cli\node_modules\@expo\router-server\node\render.js (1 module)
Web Bundled 45ms node_modules\expo-router\entry.js (1 module)
λ Bundled 6ms src\app\index.tsx (1 module)
Web Bundled 79ms node_modules\expo-router\entry.js (1 module)
Web  INFO  %cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold
Web  LOG  Running application "main" with appParams: {"hydrate": true, "rootTag": "#root"}
Web Bundled 98ms src\app\_layout.tsx (1 module)
Web Bundled 110ms src\app\index.tsx (1 module)
Web  WARN  An error occurred in the <Content> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.
λ Bundled 353ms node_modules\expo\node_modules\@expo\cli\node_modules\@expo\router-server\node\render.js (1 module)
Web Bundled 106ms node_modules\expo-router\entry.js (1 module)
λ Bundled 71ms src\app\index.tsx (1 module)
Web  ERROR  [Error: A navigator can only contain 'Screen', 'Group' or 'React.Fragment' as its direct children (found 'Screen' for the screen '__root'). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.] 

Code: setupFastRefresh.js
  15 |             return;
  16 |         }
> 17 |         ReactRefreshRuntime.performReactRefresh();
     |                             ^
  18 |     }
  19 | };
  20 | // The metro require polyfill can not have dependencies (applies for all polyfills).
Call Stack
  Refresh.performReactRefresh (node_modules\expo\build\async-require\setupFastRefresh.js:17:29)
Web Bundled 106ms node_modules\expo-router\entry.js (1 module)
Web  INFO  %cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools font-weight:bold
Web  LOG  Running application "main" with appParams: {"hydrate": true, "rootTag": "#root"}
Web Bundled 92ms src\app\_layout.tsx (1 module)
Web Bundled 54ms src\app\index.tsx (1 module)
Android Bundled 204ms node_modules\expo-router\entry.js (1 module)
Android Bundled 210ms node_modules\expo-router\entry.js (1 module)
Android Bundled 182ms node_modules\expo-router\entry.js (1 module)
Android Bundled 112ms node_modules\expo-router\entry.js (1 module)
Android Bundled 436ms node_modules\expo-router\entry.js (1 module)
Android Bundled 253ms node_modules\expo-router\entry.js (1 module)
Android Bundled 89ms node_modules\expo-router\entry.js (1 module)
Android Bundled 4177ms node_modules\expo-router\entry.js (1 module)
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git config user.name
>> 
Ahmet Dogan
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git config user.email
ahmet.doanmet@gmail.com
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- server/course_login.py mobile
>> 
warning: in the working copy of 'server/course_login.py', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/.gitignore', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/.vscode/extensions.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/.vscode/settings.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/AGENTS.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/LICENSE', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/README.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/app.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/assets/expo.icon/Assets/expo-symbol 2.svg', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/assets/expo.icon/icon.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/scripts/reset-project.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/api.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/_layout.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/discussions.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/explore.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/index.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/animated-icon.module.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/animated-icon.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/animated-icon.web.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/app-tabs.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/app-tabs.web.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/external-link.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/hint-row.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/themed-text.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/themed-view.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/ui/collapsible.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/components/web-badge.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/constants/theme.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/global.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/hooks/use-color-scheme.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/hooks/use-color-scheme.web.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/hooks/use-theme.ts', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/tsconfig.json', LF will be replaced by CRLF the next time Git touches it
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git restore --staged -- mobile/src/app/discussions.tsx
>> 
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git diff --cached --name-only
mobile/.gitignore
mobile/.vscode/extensions.json
mobile/.vscode/settings.json
mobile/AGENTS.md
mobile/LICENSE
mobile/README.md
mobile/app.json
mobile/assets/expo.icon/Assets/expo-symbol 2.svg
mobile/assets/expo.icon/Assets/grid.png
mobile/assets/expo.icon/icon.json
mobile/assets/images/android-icon-background.png
mobile/assets/images/android-icon-foreground.png
mobile/assets/images/android-icon-monochrome.png
mobile/assets/images/expo-badge-white.png
mobile/assets/images/expo-badge.png
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07: Expo app and phone login with Expo Go"
>> 
[main 62a9de7] week07: Expo app and phone login with Expo Go
 55 files changed, 9467 insertions(+), 2 deletions(-)
 create mode 100644 mobile/.gitignore
 create mode 100644 mobile/.vscode/extensions.json
 create mode 100644 mobile/.vscode/settings.json
 create mode 100644 mobile/AGENTS.md
 create mode 100644 mobile/LICENSE
 create mode 100644 mobile/README.md
 create mode 100644 mobile/app.json
 create mode 100644 mobile/assets/expo.icon/Assets/expo-symbol 2.svg
 create mode 100644 mobile/assets/expo.icon/Assets/grid.png
 create mode 100644 mobile/assets/expo.icon/icon.json
 create mode 100644 mobile/assets/images/android-icon-background.png
 create mode 100644 mobile/assets/images/android-icon-foreground.png
 create mode 100644 mobile/assets/images/android-icon-monochrome.png
 create mode 100644 mobile/assets/images/expo-badge-white.png
 create mode 100644 mobile/assets/images/expo-badge.png
 create mode 100644 mobile/assets/images/expo-logo.png
 create mode 100644 mobile/assets/images/favicon.png
 create mode 100644 mobile/assets/images/icon.png
 create mode 100644 mobile/assets/images/logo-glow.png
 create mode 100644 mobile/assets/images/react-logo.png
 create mode 100644 mobile/assets/images/react-logo@2x.png
 create mode 100644 mobile/assets/images/react-logo@3x.png
 create mode 100644 mobile/assets/images/splash-icon.png
 create mode 100644 mobile/assets/images/tabIcons/explore.png
 create mode 100644 mobile/assets/images/tabIcons/explore@2x.png
 create mode 100644 mobile/assets/images/tabIcons/explore@3x.png
 create mode 100644 mobile/assets/images/tabIcons/home.png
 create mode 100644 mobile/assets/images/tabIcons/home@2x.png
 create mode 100644 mobile/assets/images/tabIcons/home@3x.png
 create mode 100644 mobile/assets/images/tutorial-web.png
 create mode 100644 mobile/package-lock.json
 create mode 100644 mobile/package.json
 create mode 100644 mobile/scripts/reset-project.js
 create mode 100644 mobile/src/api.ts
 create mode 100644 mobile/src/app/_layout.tsx
 create mode 100644 mobile/src/app/explore.tsx
 create mode 100644 mobile/src/app/index.tsx
 create mode 100644 mobile/src/components/animated-icon.module.css
 create mode 100644 mobile/src/components/animated-icon.tsx
 create mode 100644 mobile/src/components/animated-icon.web.tsx
 create mode 100644 mobile/src/components/app-tabs.tsx
 create mode 100644 mobile/src/components/app-tabs.web.tsx
 create mode 100644 mobile/src/components/external-link.tsx
 create mode 100644 mobile/src/components/hint-row.tsx
 create mode 100644 mobile/src/components/themed-text.tsx
 create mode 100644 mobile/src/components/themed-view.tsx
 create mode 100644 mobile/src/components/ui/collapsible.tsx
 create mode 100644 mobile/src/components/web-badge.tsx
 create mode 100644 mobile/src/constants/theme.ts
 create mode 100644 mobile/src/global.css
 create mode 100644 mobile/src/hooks/use-color-scheme.ts
 create mode 100644 mobile/src/hooks/use-color-scheme.web.ts
 create mode 100644 mobile/src/hooks/use-theme.ts
 create mode 100644 mobile/tsconfig.json
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git push
Enumerating objects: 74, done.
Counting objects: 100% (74/74), done.
Delta compression using up to 8 threads
Compressing objects: 100% (67/67), done.
Writing objects: 100% (71/71), 1.41 MiB | 718.00 KiB/s, done.
Total 71 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (4/4), completed with 3 local objects.
To https://github.com/Doanmet/aiasd-project
   b1dd091..62a9de7  main -> main
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- mobile/src/app/discussions.tsx
>> git diff --cached --name-only
>> 
warning: in the working copy of 'mobile/src/app/discussions.tsx', LF will be replaced by CRLF the next time Git touches it
mobile/src/app/discussions.tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- mobile/src/app/discussions.tsx
>> 
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git diff --cached --name-only
>> 
mobile/src/app/discussions.tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07: add mobile discussions screen"
>> 
[main 22a772c] week07: add mobile discussions screen
 1 file changed, 192 insertions(+)
 create mode 100644 mobile/src/app/discussions.tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git reset --soft HEAD~1
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git status   
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   week07/group_07.json

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .github/check_deliverables.py
        modified:   AI_Doc2_AI_Technical_Background_EN.md
        modified:   AI_Doc2_media/image10.png
        modified:   AI_Doc3_Development_Environment_and_Tools_EN.md
        modified:   AI_Doc4_AI_Tools_Methodology_EN.md
        modified:   AI_PLATFORMS_AND_STORES_EN.md
        modified:   AI_PLATFORMS_AND_STORES_TR.md
        modified:   AI_README_EN.md
        modified:   AI_README_TR.md
        modified:   AI_SETUP_CARD_EN.md
        modified:   AI_SETUP_CARD_TR.md
        modified:   AI_SKELETON_EN.md
        modified:   AI_SKELETON_TR.md
        modified:   AI_Syllabus_EN.md
        modified:   AI_Syllabus_TR.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_EN.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_TR.md
        modified:   student.json
        modified:   week01/hello.py
        modified:   week03/PITCH_03.md
        modified:   week03/contributors_03.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        AI_Doc5_Using_AI_Properly_EN.md
        AI_Doc5_Using_AI_Properly_TR.md
        AI_OVERVIEW_EN.md
        AI_OVERVIEW_TR.md
        login_code.txt
        server.zip
        week01/setup_proof.md
        week02.zip
        week02/ASSIGNMENT_02_EN.md
        week02/ASSIGNMENT_02_TR.md
        week02/SRS.md
        week02/ai_log_02.md
        week02/contributors_02.json
        week03/ASSIGNMENT_03_EN.md
        week03/ASSIGNMENT_03_TR.md
        week03/LECTURE_03_EN.md
        week03/LECTURE_03_TR.md
        week03/ai_log_03.md
        week03/screens_03.md
        week04.zip
        week04/LECTURE_04_EN.html
        week04/LECTURE_04_TR.html
        week05.zip
        week06.zip

(.venv) PS C:\Users\xxx\Documents\aiasd-project> git push origin main
Enumerating objects: 10, done.
Counting objects: 100% (10/10), done.
Delta compression using up to 8 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 2.85 KiB | 1.42 MiB/s, done.
Total 6 (delta 3), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
To https://github.com/Doanmet/aiasd-project
   62a9de7..22a772c  main -> main
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git status                               
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   week07/group_07.json

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .github/check_deliverables.py
        modified:   AI_Doc2_AI_Technical_Background_EN.md
        modified:   AI_Doc2_media/image10.png
        modified:   AI_Doc3_Development_Environment_and_Tools_EN.md
        modified:   AI_Doc4_AI_Tools_Methodology_EN.md
        modified:   AI_PLATFORMS_AND_STORES_EN.md
        modified:   AI_PLATFORMS_AND_STORES_TR.md
        modified:   AI_README_EN.md
        modified:   AI_README_TR.md
        modified:   AI_SETUP_CARD_EN.md
        modified:   AI_SETUP_CARD_TR.md
        modified:   AI_SKELETON_EN.md
        modified:   AI_SKELETON_TR.md
        modified:   AI_Syllabus_EN.md
        modified:   AI_Syllabus_TR.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_EN.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_TR.md
        modified:   mobile/src/app/discussions.tsx
        modified:   student.json
        modified:   week01/hello.py
        modified:   week03/PITCH_03.md
        modified:   week03/contributors_03.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        AI_Doc5_Using_AI_Properly_EN.md
        AI_Doc5_Using_AI_Properly_TR.md
        AI_OVERVIEW_EN.md
        AI_OVERVIEW_TR.md
        login_code.txt
        mobile/src/app/posts/
        server.zip
        week01/setup_proof.md
        week02.zip
        week02/ASSIGNMENT_02_EN.md
        week02/ASSIGNMENT_02_TR.md
        week02/SRS.md
        week02/ai_log_02.md
        week02/contributors_02.json
        week03/ASSIGNMENT_03_EN.md
        week03/ASSIGNMENT_03_TR.md
        week03/LECTURE_03_EN.md
        week03/LECTURE_03_TR.md
        week03/ai_log_03.md
        week03/screens_03.md
        week04.zip
        week04/LECTURE_04_EN.html
        week04/LECTURE_04_TR.html
        week05.zip
        week06.zip

(.venv) PS C:\Users\xxx\Documents\aiasd-project> git restore --staged week07/group_07.json
>> 
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- mobile/src/app/discussions.tsx 'mobile/src/app/posts/[id].tsx'
>> 
warning: in the working copy of 'mobile/src/app/discussions.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/posts/[id].tsx', LF will be replaced by CRLF the next time Git touches it
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git status --short
 M .github/check_deliverables.py
 M AI_Doc2_AI_Technical_Background_EN.md
 M AI_Doc2_media/image10.png
 M AI_Doc3_Development_Environment_and_Tools_EN.md
 M AI_Doc4_AI_Tools_Methodology_EN.md
 M AI_PLATFORMS_AND_STORES_EN.md
 M AI_PLATFORMS_AND_STORES_TR.md
 M AI_README_EN.md
 M AI_README_TR.md
 M AI_SETUP_CARD_EN.md
 M AI_SETUP_CARD_TR.md
 M AI_SKELETON_EN.md
 M AI_SKELETON_TR.md
 M AI_Syllabus_EN.md
 M AI_Syllabus_TR.md
 M AI_WEEKLY_WORKFLOW_STUDENT_EN.md
 M AI_WEEKLY_WORKFLOW_STUDENT_TR.md
M  mobile/src/app/discussions.tsx
A  mobile/src/app/posts/[id].tsx
 M student.json
 M week01/hello.py
 M week03/PITCH_03.md
 M week03/contributors_03.json
 M week07/group_07.json
?? AI_Doc5_Using_AI_Properly_EN.md
?? AI_Doc5_Using_AI_Properly_TR.md
?? AI_OVERVIEW_EN.md
?? AI_OVERVIEW_TR.md
?? login_code.txt
?? server.zip
?? week01/setup_proof.md
?? week02.zip
?? week02/ASSIGNMENT_02_EN.md
?? week02/ASSIGNMENT_02_TR.md
?? week02/SRS.md
?? week02/ai_log_02.md
?? week02/contributors_02.json
?? week03/ASSIGNMENT_03_EN.md
?? week03/ASSIGNMENT_03_TR.md
?? week03/LECTURE_03_EN.md
?? week03/LECTURE_03_TR.md
?? week03/ai_log_03.md
?? week03/screens_03.md
?? week04.zip
?? week04/LECTURE_04_EN.html
?? week04/LECTURE_04_TR.html
?? week05.zip
?? week06.zip
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07:discussion detail screen"     
>> 
[main 8605fc8] week07:discussion detail screen
 2 files changed, 131 insertions(+), 2 deletions(-)
 create mode 100644 mobile/src/app/posts/[id].tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git push origin main
Enumerating objects: 13, done.
Counting objects: 100% (13/13), done.
Delta compression using up to 8 threads
Compressing objects: 100% (7/7), done.
Writing objects: 100% (8/8), 1.94 KiB | 993.00 KiB/s, done.
Total 8 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (6/6), completed with 5 local objects.
To https://github.com/Doanmet/aiasd-project
   22a772c..8605fc8  main -> main
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- mobile/src/app/discussions.tsx mobile/src/app/resources.tsx
>> 
warning: in the working copy of 'mobile/src/app/discussions.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'mobile/src/app/resources.tsx', LF will be replaced by CRLF the next time Git touches it
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git status --short
>> 
 M .github/check_deliverables.py
 M AI_Doc2_AI_Technical_Background_EN.md
 M AI_Doc2_media/image10.png
 M AI_Doc3_Development_Environment_and_Tools_EN.md
 M AI_Doc4_AI_Tools_Methodology_EN.md
 M AI_PLATFORMS_AND_STORES_EN.md
 M AI_PLATFORMS_AND_STORES_TR.md
 M AI_README_EN.md
 M AI_README_TR.md
 M AI_SETUP_CARD_EN.md
 M AI_SETUP_CARD_TR.md
 M AI_SKELETON_EN.md
 M AI_SKELETON_TR.md
 M AI_Syllabus_EN.md
 M AI_Syllabus_TR.md
 M AI_WEEKLY_WORKFLOW_STUDENT_EN.md
 M AI_WEEKLY_WORKFLOW_STUDENT_TR.md
M  mobile/src/app/discussions.tsx
A  mobile/src/app/resources.tsx
 M student.json
 M week01/hello.py
 M week03/PITCH_03.md
 M week03/contributors_03.json
 M week07/group_07.json
?? AI_Doc5_Using_AI_Properly_EN.md
?? AI_Doc5_Using_AI_Properly_TR.md
?? AI_OVERVIEW_EN.md
?? AI_OVERVIEW_TR.md
?? login_code.txt
?? mobile/src/app/groups.tsx
?? server.zip
?? week01/setup_proof.md
?? week02.zip
?? week02/ASSIGNMENT_02_EN.md
?? week02/ASSIGNMENT_02_TR.md
?? week02/SRS.md
?? week02/ai_log_02.md
?? week02/contributors_02.json
?? week03/ASSIGNMENT_03_EN.md
?? week03/ASSIGNMENT_03_TR.md
?? week03/LECTURE_03_EN.md
?? week03/LECTURE_03_TR.md
?? week03/ai_log_03.md
?? week03/screens_03.md
?? week04.zip
?? week04/LECTURE_04_EN.html
?? week04/LECTURE_04_TR.html
?? week05.zip
?? week06.zip
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07: addition of resource search"
>> 
[main 4b637f6] week07: addition of resource search
 2 files changed, 146 insertions(+)
 create mode 100644 mobile/src/app/resources.tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git add -- mobile/src/app/groups.tsx
>> 
warning: in the working copy of 'mobile/src/app/groups.tsx', LF will be replaced by CRLF the next time Git touches it
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git status --short
>> 
 M .github/check_deliverables.py
 M AI_Doc2_AI_Technical_Background_EN.md
 M AI_Doc2_media/image10.png
 M AI_Doc3_Development_Environment_and_Tools_EN.md
 M AI_Doc4_AI_Tools_Methodology_EN.md
 M AI_PLATFORMS_AND_STORES_EN.md
 M AI_PLATFORMS_AND_STORES_TR.md
 M AI_README_EN.md
 M AI_README_TR.md
 M AI_SETUP_CARD_EN.md
 M AI_SETUP_CARD_TR.md
 M AI_SKELETON_EN.md
 M AI_SKELETON_TR.md
 M AI_Syllabus_EN.md
 M AI_Syllabus_TR.md
 M AI_WEEKLY_WORKFLOW_STUDENT_EN.md
 M AI_WEEKLY_WORKFLOW_STUDENT_TR.md
A  mobile/src/app/groups.tsx
 M student.json
 M week01/hello.py
 M week03/PITCH_03.md
 M week03/contributors_03.json
 M week07/group_07.json
?? AI_Doc5_Using_AI_Properly_EN.md
?? AI_Doc5_Using_AI_Properly_TR.md
?? AI_OVERVIEW_EN.md
?? AI_OVERVIEW_TR.md
?? login_code.txt
?? server.zip
?? week01/setup_proof.md
?? week02.zip
?? week02/ASSIGNMENT_02_EN.md
?? week02/ASSIGNMENT_02_TR.md
?? week02/SRS.md
?? week02/ai_log_02.md
?? week02/contributors_02.json
?? week03/ASSIGNMENT_03_EN.md
?? week03/ASSIGNMENT_03_TR.md
?? week03/LECTURE_03_EN.md
?? week03/LECTURE_03_TR.md
?? week03/ai_log_03.md
?? week03/screens_03.md
?? week04.zip
?? week04/LECTURE_04_EN.html
?? week04/LECTURE_04_TR.html
?? week05.zip
?? week06.zip
(.venv) PS C:\Users\xxx\Documents\aiasd-project> v
v : The term 'v' is not recognized as the name of a cmdlet, function, script file, or operable program. 
Check the spelling of the name, or if a path was included, verify that the path is correct and try 
again.
At line:1 char:1
+ v
+ ~
    + CategoryInfo          : ObjectNotFound: (v:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException
 
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07: add mobile study groups"
>> 
[main b25d991] week07: add mobile study groups
 1 file changed, 208 insertions(+)
 create mode 100644 mobile/src/app/groups.tsx
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git commit -m "week07: add study groups"       
>> 
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .github/check_deliverables.py
        modified:   AI_Doc2_AI_Technical_Background_EN.md
        modified:   AI_Doc2_media/image10.png
        modified:   AI_Doc3_Development_Environment_and_Tools_EN.md
        modified:   AI_Doc4_AI_Tools_Methodology_EN.md
        modified:   AI_PLATFORMS_AND_STORES_EN.md
        modified:   AI_PLATFORMS_AND_STORES_TR.md
        modified:   AI_README_EN.md
        modified:   AI_README_TR.md
        modified:   AI_SETUP_CARD_EN.md
        modified:   AI_SETUP_CARD_TR.md
        modified:   AI_SKELETON_EN.md
        modified:   AI_SKELETON_TR.md
        modified:   AI_Syllabus_EN.md
        modified:   AI_Syllabus_TR.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_EN.md
        modified:   AI_WEEKLY_WORKFLOW_STUDENT_TR.md
        modified:   student.json
        modified:   week01/hello.py
        modified:   week03/PITCH_03.md
        modified:   week03/contributors_03.json
        modified:   week07/group_07.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        AI_Doc5_Using_AI_Properly_EN.md
        AI_Doc5_Using_AI_Properly_TR.md
        AI_OVERVIEW_EN.md
        AI_OVERVIEW_TR.md
        login_code.txt
        server.zip
        week01/setup_proof.md
        week02.zip
        week02/ASSIGNMENT_02_EN.md
        week02/ASSIGNMENT_02_TR.md
        week02/SRS.md
        week02/ai_log_02.md
        week02/contributors_02.json
        week03/ASSIGNMENT_03_EN.md
        week03/ASSIGNMENT_03_TR.md
        week03/LECTURE_03_EN.md
        week03/LECTURE_03_TR.md
        week03/ai_log_03.md
        week03/screens_03.md
        week04.zip
        week04/LECTURE_04_EN.html
        week04/LECTURE_04_TR.html
        week05.zip
        week06.zip

no changes added to commit (use "git add" and/or "git commit -a")
(.venv) PS C:\Users\xxx\Documents\aiasd-project> git push origin main
Enumerating objects: 18, done.
Counting objects: 100% (18/18), done.
Delta compression using up to 8 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (13/13), 4.35 KiB | 556.00 KiB/s, done.
Total 13 (delta 10), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (10/10), completed with 5 local objects.
To https://github.com/Doanmet/aiasd-project
   8605fc8..b25d991  main -> main
(.venv) PS C:\Users\xxx\Documents\aiasd-project> 
<!-- ME: holds your prompt. AI: holds the answer of the assistant. TERMINAL: holds the commands that
     you typed and their output. It holds at least the git diff of the change before you accepted it.
     Paste the rounds of the exchange that show the change. You may leave out whole rounds that do
     not show it. Paste every ME:, AI: or TERMINAL: part that you keep whole, exactly as it came.
     Remove nothing, and correct nothing, not even the grammar. For several rounds, repeat ME: and
     AI:. -->
```
