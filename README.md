# 🏡 My Little World

A cozy 3D game where students learn English by furnishing a room.
Version 1: the **Bedroom** — 11 pieces of furniture, 155 words (A1–B2),
Ukrainian and Russian translations.

---

## 1. Run the game on your computer

You need **Node.js** once (it's already installed on this Mac).

Open the Terminal, go to the project folder, and run:

```bash
npm install
```

(only the first time), then:

```bash
npm run dev
```

Open the address it prints (usually **http://localhost:5173**).
The page refreshes by itself whenever you save a file. Press `Ctrl + C` in the Terminal to stop.

To open it on your phone (same Wi-Fi), use the **Network** address the Terminal prints.

---

## 2. How the game works

1. The bedroom starts empty. Each piece of furniture in the catalogue is locked.
2. Tap a piece → play its **lesson** (What is this? · Spelling · Sentence). Finishing it unlocks the piece.
3. Every first-try correct answer gives **1 ★**. Stars open the next lessons (bed & lamp are free, the plant needs 24 ★).
4. Put the furniture in the room, drag it around, rotate it.
5. Tap a placed object → **Practice**: a mix of questions, plus automatic translation/spelling
   questions about related words at the student's level (pillow, duvet, headboard… for the bed).
6. Room completion = for every object: unlocked + placed + practised. 100% completes the room.

Wrong answers are shown, explained, and asked again at the end — every lesson ends in success.
Progress saves automatically in the browser (no accounts needed).

**Menu (☰):** choose the student's language (Українська / Русский) and level (A1–B2), see help, or start again.
**📖 Word Book:** every word with translation, level, category and pronunciation.

---

## 3. Which files you edit

Everything you will normally change is in **`src/data/`** — no programming needed,
just copy a line and change the text. Keep the quotes `'...'` and commas.

| What | File |
|---|---|
| Word bank (A1–B2, translations, links to objects) | `src/data/vocabulary/bedroom-extra.ts` |
| Main word of each object (with definition & example) | `src/data/vocabulary/bedroom.ts` |
| Questions for each object | `src/data/activities/bedroom.ts` |
| Furniture list, sizes, stars needed | `src/data/furniture.ts` |
| Achievements | `src/data/achievements.ts` |
| Room colours, window, door | `src/rooms/bedroom.ts` |
| Map of all rooms / places | `src/rooms/index.ts` |
| Interface colours | top of `src/styles/global.css` |

### Add a new word

In `src/data/vocabulary/bedroom-extra.ts` add one row:

```ts
w('duvet', 'B1', 'advanced', 'bed', 'одеяло (в пододеяльнике)', 'ковдра (у підковдрі)'),
//  English  level  category  object  Russian                     Ukrainian
```

- **object** = which 3D object it belongs to (`'bed'`, `'wardrobe'`, `'desk'`… or `null`).
  Practising that object will now ask about this word (if the student's level is high enough).
- **category** = the group in the Word Book (use an existing one or invent a new one).

### Add a question

In `src/data/activities/bedroom.ts`, copy a line under the right object. Every `id` must be unique.

```ts
// sentence with a gap (___). options must include the answer
{ id: 'bed-sentence-2', wordId: 'bed', stage: 'practice', type: 'sentence',
  sentence: 'My cat sleeps ___ my bed.', answer: 'under', options: ['under', 'in', 'at'] },

// any question with answers
{ id: 'bed-mc-2', wordId: 'bed', stage: 'practice', type: 'multipleChoice',
  question: 'When do you go to bed?', answer: 'at night', options: ['at night', 'at lunch', 'at school'] },

// spelling: hide letters 1 and 2 (counting from 0) → B _ _
{ id: 'bed-spell-2', wordId: 'bed', stage: 'practice', type: 'spelling', hide: [1, 2] },
```

- `stage: 'lesson'` → part of the unlock lesson (played in order).
- `stage: 'practice'` → used when the student practises with the placed object.

### Change unlock order / difficulty

In `src/data/furniture.ts` change `starsRequired`.

### Add new furniture (needs a 3D model)

1. **Model:** in `src/objects/models/index.tsx` copy a model function (e.g. `Nightstand`),
   rename it, change shapes/colours, and add it to `MODELS` at the bottom.
2. **Catalogue:** add an entry in `src/data/furniture.ts` (`mount`: `floor`, `rug`, `small` or `wall`;
   `size` in metres; `surfaceHeight` if things can stand on it).
3. **Word:** add its main word in `src/data/vocabulary/bedroom.ts` with `objectId` set to the new id.
4. **Questions:** add a lesson (vocabulary + spelling + sentence) in `src/data/activities/bedroom.ts`.
5. **Room:** add the id to `objects` in `src/rooms/bedroom.ts`.

(Or simply ask Claude: “Add a guitar to the bedroom with these words…”.)

---

## 4. Publish online & share with students

The project is ready for **GitHub Pages** (free). Students only need the link — no install, no login.

**One-time setup**

1. On github.com create a new **public** repository named `my-little-world`.
2. Upload this project to it (ask Claude to do it, or use GitHub Desktop).
3. In the repository: **Settings → Pages → Source → GitHub Actions**.

After a minute or two the game is live at:

**https://kseniiabondarenko0.github.io/my-little-world/**

Every time you change words/questions and upload again, the site updates automatically
(the recipe is in `.github/workflows/deploy.yml`).

**Notes for the classroom**
- Each student's progress is saved **on their own device/browser**. Clearing browser data resets it.
- Works on phones, tablets, Chromebooks and computers (Chrome, Safari, Edge, Firefox).
- The 🔊 buttons use the device's built-in English voice.

---

## 5. How the code is organised (for later)

```
src/
  data/          ← educational content (edit this)
  rooms/         ← room definitions + saved room layouts
  objects/       ← 3D models and placement rules (snapping, collisions, walls)
  activities/    ← question engine + one screen per activity type
  progression/   ← stars, unlocks, completion, achievements, saved progress
  components/3d  ← 3D scene, room, objects, drag & drop
  components/ui  ← catalogue, toolbar, lesson window, menus
  hooks/         ← screen state, keyboard shortcuts, achievement watcher
  save/          ← localStorage (swap for cloud saves later)
  types/         ← shared data shapes
```

Ready for later: new rooms (add a file in `rooms/` + content in `data/`), new activity types
(one component + one line in `activities/registry.ts`), more levels/languages (already in the data),
student accounts / teacher dashboard (replace `save/storage.ts` with a server).
