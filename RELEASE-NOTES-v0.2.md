# My Little World: version 0.2

## New features
- **Player profiles:** a welcome flow (nickname with privacy checks, avatar creator, language, level), a profile screen,
  several students per device with a separate save each. Existing v0.1 progress is kept.
- **Avatar** in the 3D room (it cheers on success), in the top bar, profile and notifications.
- **Bedroom chapter** in 7 stages: Move In, Explore, Vocabulary Training, Mini-Games, Real-Life Challenges, Room Makeover, Final Mission.
- **Missions in the 3D room:** find objects, move furniture (checked against real positions), sort and unpack things on the floor,
  choose, write (checked and saved), and shop on a budget.
- **6 mini-games:** Memory Match, Hidden Objects, Sort It Out, Word Scramble, Interior Designer, What Would You Do? (3 picked per player).
- **Vocabulary training** in 8 formats with spaced repetition and mastery tracking.
- **Practice Mode:** 8 modes with room, category and level filters; difficult words first.
- **A1–B2 versions** of every mission, with increasing complexity.
- New furniture (**chest of drawers**), new achievements, XP and levels, and an object info card with example, level and category.
- **Automatic checks:** `npm run test:logic` (about 2,900 checks of rules and content).

## Fixed while testing
Furniture no longer hides pictures and mirrors, or blocks the window. The mission bar no longer covers the room.
Small items are easier to tap (their labels are tappable). Practice rounds no longer reset after a correct answer.
Windows no longer jump when feedback appears. The phone layout keeps the whole room visible, including during missions.

## Changed files
**New:** `src/player/*`, `src/chapter/*`, `src/missions/*`, `src/minigames/*`, `src/learning/*`, `src/data/chapters/*`,
`src/data/avatar.ts`, `src/objects/models/props.tsx`, `src/components/3d/AvatarFigure.tsx`, `src/components/3d/MissionProps.tsx`,
`src/components/ui/{Welcome, AvatarCreator, AvatarPortrait, JourneyPanel, MissionHUD, MinigameModal, TrainingModal, PracticeMode, SessionRunner, Segmented, WritingChecklist}.tsx`,
`src/activities/components/{PictureChoice, Typing, Match, Builder}Activity.tsx`, `src/hooks/useChapterView.ts`, `scripts/logic-test.ts`.

**Updated:** `App.tsx`, `save/storage.ts`, `progression/{progressStore, actions, rules}.ts`, `objects/placement.ts`,
`objects/models/index.tsx`, `components/3d/{Scene, PlacementController}.tsx`,
`components/ui/{ActivityModal, Catalogue, Modals, ObjectToolbar, TopBar}.tsx`, `activities/{engine, registry}.ts`,
`activities/components/ChoiceActivity.tsx`, `data/{content, furniture, achievements}.ts`, `data/vocabulary/*`,
`data/activities/bedroom.ts`, `rooms/bedroom.ts`, `hooks/{useUIStore, useProgressWatcher, useKeyboardShortcuts}.ts`,
`types/game.ts`, `styles/global.css`, `package.json`, `README.md`.

## Student testing checklist
1. Open the link → create a nickname (try a real-name warning) → pick an avatar → choose language and level.
2. Refresh the page: the profile and room are still there.
3. Furniture tab: finish 2–3 lessons and place the furniture; drag and rotate it.
4. Journey tab: follow the stages in order; tap objects to read about them.
5. Try one mission of each kind: find, move furniture + Check, unpack boxes, write a text.
6. Play the three chosen mini-games.
7. Open 🎯 Practice: Flashcards, Quiz and Mistakes Review.
8. Open the profile: check stars, words mastered and the Writing tab.
9. On a shared device: Menu → New player, then switch back.
10. Try it on a phone: the bottom panel, a mission, Practice Mode.
