# 🏡 My Little World

A cozy 3D game where students learn English by furnishing and living in their own room.

**Version 0.2:** the **Bedroom chapter**, a full ~45-minute journey in 7 stages. It has 12 pieces of
furniture, 155 words (A1–B2) with Ukrainian and Russian translations, player profiles with avatars, six mini-games,
real-life missions in the 3D room, and a separate Practice Mode.

---

## 1. Run the game on your computer

Open the Terminal and go to the game folder:

```bash
cd ~/Desktop/"My Little World"/my-little-world
```

The first time only:

```bash
npm install
```

Then start it:

```bash
npm run dev
```

Open the address it prints (usually **http://localhost:5173**). The page updates by itself whenever you save a file.
Press `Ctrl + C` in the Terminal to stop. To try it on a phone on the same Wi-Fi, use the **Network** address it prints.

To check the content and game logic (about 2,900 automatic checks):

```bash
npm run test:logic
```

---

## 2. How the game works (for students)

**First visit:** “Welcome to My Little World!” → choose a **nickname** (no real names, phone numbers or emails;
nicknames are saved on this device only) → create an **avatar** (6 ready-made characters, or choose skin, hair, clothes and
accessory) → choose **language** (Українська / Русский) and **English level** (A1–B2).

**The chapter:** the **Journey** tab shows 7 stages. Each one opens when the previous one is finished:

| Stage | What students do | ~min |
|---|---|---|
| 1. Move In | Furniture lessons (picture, spelling, sentence) unlock furniture; place it in the room | 8 |
| 2. Explore the Room | Tap every object (word, translation, sound, example, level, category) + 5 “find it” missions | 4 |
| 3. Vocabulary Training | 2 sessions in 8 formats + master 10 words (spaced repetition) | 7 |
| 4. Mini-Games | 3 of 6 games, chosen per player (one is played in the 3D room) | 8 |
| 5. Real-Life Challenges | Moving Day · Messy Bedroom · Design on a Budget | 8 |
| 6. Room Makeover | Rearrange the real furniture by following English instructions | 6 |
| 7. Final Mission | “A Friend Is Coming!”: find, organise, arrange, choose and write | 7 |

The room counts as complete only when the final mission is done, so clicking through doesn't finish it.
Mistakes aren't punished: wrong answers are explained and come back later in a different format.
Everything can be replayed. Progress saves automatically, so students can stop and continue later.

**The levels change the tasks, not just the words.** A1 has short, direct instructions (“Put the lamp on the bedside table”).
A2 has multi-step instructions. B1 has contextual ones (“You like reading in bed…”), choosing reasons and short writing.
B2 has indirect instructions, evaluating options and justifying decisions in writing.

**Practice Mode** (🎯 in the top bar) is unlimited practice outside the story: Flashcards, Vocabulary Quiz, Spelling, Listening,
Sentence Builder, Prepositions, Speaking (Chrome, Edge and Safari can check pronunciation) and Mistakes Review.
Students can filter by room, category and level, and words they often get wrong come first.

**Profile** (tap the avatar): stars, XP and level, rooms done, achievements, words mastered by CEFR level, words to revise,
and **every text the student wrote**. Teachers can read students' writing here.

**Several students on one device** (school tablets): Menu → *Players on this device* → **＋ New player**, or tap a name to switch.
Each player has their own room and progress.

---

## 3. Which files to edit

| What | File |
|---|---|
| Missions, mini-game content, sentences, prepositions | `src/data/chapters/bedroom.ts` |
| Word bank (A1–B2, translations, links to 3D objects) | `src/data/vocabulary/bedroom-extra.ts` |
| Main word of each object | `src/data/vocabulary/bedroom.ts` |
| Furniture lesson questions | `src/data/activities/bedroom.ts` |
| Furniture list, sizes, stars needed | `src/data/furniture.ts` |
| Achievements | `src/data/achievements.ts` |
| Avatar colours, hairstyles, ready-made characters | `src/data/avatar.ts` |
| Room colours, window, door, avatar spot | `src/rooms/bedroom.ts` |

After editing content, run `npm run test:logic`. It catches typos such as a mission pointing to furniture that doesn't exist,
a shop that can't be solved, or a choice question with no correct answer.

### Mission content (in `src/data/chapters/bedroom.ts`)

Every mission has steps for each level. Write `{ A1: ..., A2: ..., B1: ..., B2: ... }`; missing levels use the closest lower one.
Step types:

- `find`: tap real objects: `{ type: 'find', prompt: 'Find something soft.', targets: ['carpet', 'bed'] }`
- `place`: move furniture, then Check: `checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }]`.
  Rules: `againstWall, nextTo, near, farFrom, onTop, above, inFrontOf, nearWindow, inCorner, inMiddle`
- `sort`: things appear on the floor; tap one, then tap where it goes (`accept: ['wardrobe', 'chest']`).
  `boxes: true` turns them into boxes to unpack.
- `choice`: one question, one correct option, feedback for each option
- `write`: minimum words plus required word lists (furniture words, prepositions, linking words); saved in the profile
- `shop`: a budget, items with prices and tags, and needs to cover

### Add a word

One row in `src/data/vocabulary/bedroom-extra.ts`:

```ts
w('duvet', 'B1', 'advanced', 'bed', 'одеяло', 'ковдра'),
//  English  level  category  object  Russian  Ukrainian
```

It appears in the Word Book, Practice Mode and Vocabulary Training, and in practice questions about that object.

### Add new furniture

1. Model: copy a function in `src/objects/models/index.tsx` and add it to `MODELS`.
2. Catalogue entry: `src/data/furniture.ts`.
3. Main word: `src/data/vocabulary/bedroom.ts` (set `objectId`).
4. Lesson questions: `src/data/activities/bedroom.ts`.
5. Add its id to `objects` in `src/rooms/bedroom.ts`.

---

## 4. Publish an update

The game is published by GitHub Pages from the `main` branch: **https://kseniiabondarenko0.github.io/my-little-world/**

In the game folder:

```bash
git add -A && git commit -m "Describe the change" && git push
```

GitHub rebuilds the site in about 1–2 minutes (watch it in the **Actions** tab of the repository).
Students' progress is kept across updates. Don't rename object or word **ids**; changing their text is always safe.

---

## 5. Privacy & limitations

- No accounts, no server, nothing is sent online. Profiles and progress live in each device's browser.
  Clearing browser data or using private mode removes them.
- A student can't continue on a different device yet (needs cloud saves, see below).
- Writing is checked by length and required vocabulary, not by grammar. The teacher reads the texts in the profile.
- Speaking checks need Chrome, Edge or Safari with microphone permission. Other browsers show “listen and repeat”.
- A mission interrupted by a page reload starts again from its first step. Finished tasks are always saved.
- Only the bedroom is playable; the other rooms show “coming soon”.

---

## 6. How the code is organised

```
src/
  data/          ← all educational content (edit this)
  chapter/       ← stages, tasks, chapter progress (per room)
  missions/      ← mission engine, spatial checks, writing checks
  minigames/     ← the six mini-games (reusable for any room)
  learning/      ← spaced repetition + question formats
  player/        ← player profiles (stable player id, separate from nickname)
  activities/    ← question screens
  progression/   ← stars, XP, unlocks, achievements, game actions
  rooms/         ← room definitions + saved layouts
  objects/       ← 3D models, placement rules
  components/3d  ← 3D scene, room, avatar, mission props
  components/ui  ← journey, mission bar, practice, profile, menus
  save/          ← storage (one save per player)
scripts/logic-test.ts ← automatic checks (npm run test:logic)
```

**Ready for later (not built yet):** cloud saves and student accounts (replace `src/save/storage.ts` and
`src/player/playerService.ts` with a Supabase backend; the player id is already permanent and separate from the nickname),
then friends, room visits, gifts, leaderboards and a teacher dashboard. No chat or public communication is included on purpose.
New rooms need a room file in `src/rooms/` and a chapter file in `src/data/chapters/`.
