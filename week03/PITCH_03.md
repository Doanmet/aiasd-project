---
marp: true
paginate: true
---

<!--
WEEK 3 — YOUR 5-MINUTE PITCH, SIX SLIDES                      3. HAFTA — 5 DAKİKALIK SUNUMUNUZ, ALTI SLAYT

This file IS your slide deck. Each "---" starts a new slide.   Bu dosya sunumunuzun kendisidir. Her "---" yeni bir slayt.
Open it in VS Code with the "Marp for VS Code" extension        VS Code'da "Marp for VS Code" eklentisiyle açın (sağ üstte
(preview button top right) and present from your own laptop.    önizleme düğmesi) ve kendi bilgisayarınızdan sunun.
Export to PDF or PPTX from the same button if you prefer.        İsterseniz aynı düğmeden PDF ya da PPTX'e aktarın.

WRITE IT YOURSELF. No AI for this file — not the text, not       KENDİNİZ YAZIN. Bu dosyada yapay zekâ yok — ne metin, ne
the structure. Everything here is about YOUR life and YOUR       yapı. Buradaki her şey SİZİN hayatınız ve SİZİN
people; an assistant cannot know it. In the group, and in        çevreniz; bir asistan bunu bilemez. Grupta ve derste
class, I will ask about any slide.                               herhangi bir slayt hakkında soru sorabilirim.

Replace every line in [brackets]. Keep each slide short:         Köşeli parantezli her satırı değiştirin. Slaytlar kısa
you are talking, the slide is only the skeleton.                 olsun: siz konuşuyorsunuz, slayt yalnızca iskelet.
Delete this comment when you are done.                           Bitince bu yorumu silin.
-->

# WikiCampus

WikiCampus is a web platform for university students to share course resources, discuss academic and campus-related problems, ask questions, and get help from other students. It combines a dictionary-style discussion system with resource sharing and peer-to-peer support.

Ahmet Doğan · Software Engineering · Week 3

---

## 1. The last time it happened — to me, or in front of me


- **When:** Last semester
- **Who / where / doing what:** All of us that who takes the same course. We was preapering for a final exam and we got lost due to absence of enough material and help.
- **What they did instead:** We tried to study by ourself with the current materials.
- **What it cost:** We got low grades from that curse and didn't learn properly.

---

## 2. Five people who will test it in Week 9


| # | Ömer Türkhan | How you know them | Why they have the same problem |
|---|------|-------------------|--------------------------------|
| 1 | Ömer Türkhan | childhood friend | Finiance student  |
| 2 | Emir Mutlu| school friend | CS student |
| 3 | Kaan Bolat | school friend | Dentist |
| 4 | Esra Bölük | gym | Doing major in cs |
| 5 | İkbal Özman | neigboorhood | Software engineer student |

---

## 3. What it does — and what it does not

REQ-001: The platform shall enable students to create, categorize, and discuss posts organized in a forum and dictionary-style structure covering academic topics, campus life, internships, and courses.

REQ-002: The platform shall allow users to upload, search, and share course notes, study materials, and educational resources.

REQ-003: The platform shall support user profiles displaying courses, skills, and areas of expertise to allow students to locate and contact peers for subject-specific academic help.

It does not: It does not process  transactions for private tutoring services or integrate directly with university Learning Management Systems and official grade databases.

---

## 4. The main screen

+--------------------------------------+
| 🎓 UniPlatform       [ Search ]   |
+--------------------------------------+
| [ All Topics ] [ Notes ] [ Peer Help]|
+--------------------------------------+
| TRENDING TOPICS                      |
| 📌 # CS301 - Operating Systems       |
|    "Shared midterm summary notes!"   |
|    👤 Ahmet D. • 💬 14 replies       |
|                                      |
| 📌 # Summer Internships 2026         |
|    "Tips for B2B full-stack roles"   |
|    👤 Zeynep K. • 💬 28 replies      |
+--------------------------------------+
| PEER HELP AVAILABLE                  |
| Mehmet Y. — Database Systems (A+) |
|    [ Contact Mentor ]                |
+--------------------------------------+
|        [ + Create New Post ]         |
+--------------------------------------+
| 🏠 Home   📚 Courses   💬 Help   👤  |
+--------------------------------------+

## 5. What I am not sure about

How should we handle file uploads for course notes and study materials to prevent performance bottlenecks as user traffic and storage grow?

Storing files directly in the database or server filesystem makes initial development simpler, but it will quickly degrade database performance.

## 6. Reviewers — answer these three, in writing

<!-- Leave this slide as it is. Each listener writes one sentence per question;
     you copy their sentences into week03/contributors_03.json after the round.
     Bu slaydı olduğu gibi bırakın. Her dinleyici soru başına bir cümle yazar;
     turdan sonra cümlelerini week03/contributors_03.json'a siz geçirirsiniz. -->

1. **Real?** Did they convince you this problem happens to them, and to the five people on slide 2?
2. **Usable here?** Could those five people actually use this in Week 9 — what would stop them?
3. **Too much or too little?** Which part will not be finished by Week 11 — or has the product shrunk to one screen?
