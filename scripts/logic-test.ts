// Automated checks for the game logic and content (no browser needed).
// Run with:  npm run test:logic

import type { Level, NativeLanguage, PlacedItem } from '../src/types/game';
import { bedroom } from '../src/rooms/bedroom';
import { LOCATIONS, isRoomOpen } from '../src/rooms';
import { FURNITURE } from '../src/data/furniture';
import { ALL_WORDS, getFurniture, wordsForRoom } from '../src/data/content';
import { CHAPTERS } from '../src/data/chapters';
import { forLevel, type MissionDefinition, type MissionStep } from '../src/chapter/types';
import { evaluate } from '../src/missions/spatial';
import { evaluateWriting } from '../src/missions/writing';
import { findFreeSpot, isPlacementValid } from '../src/objects/placement';
import { applyAnswer, masteryOf, emptyWord } from '../src/learning/srs';
import { buildTraining, makeQuestion, supports, ALL_FORMATS, buildDeck } from '../src/learning/questions';
import { buildSession } from '../src/activities/engine';
import { buildLesson } from '../src/activities/lesson';
import { SIDE_QUESTS } from '../src/data/sidequests';
import { buildStages, chapterPercent, choosePicks } from '../src/chapter/stages';
import { MINIGAMES } from '../src/minigames/registry';
import { hiddenObjectsMission, interiorDesignerMission, missionForTask } from '../src/minigames/missions';
import { checkNickname } from '../src/player/playerService';
import { summarise } from '../src/teacher/overview';
import { isValidPin } from '../src/teacher/pin';
import { buildBackup, parseBackup, freeNickname, backupFileName } from '../src/save/backup';
import { COURSE_CONTENT, activitiesForCourse, wordsForCourse } from '../src/data/courses';
import { ENGLISH_ACTIVITIES, ENGLISH_WORDS } from '../src/data/content';
import { COURSES } from '../src/courses/courses';
import { autoHide } from '../src/activities/engine';
import { SHOP_ITEMS, PET_SPECIES, styledRoom, coinsForXp, exclusiveFor } from '../src/data/shop';
import { useCompanion, sanitize, initialCompanion } from '../src/companion/companionStore';
import { HAIR_STYLES, OUTFITS, ACCESSORIES } from '../src/data/avatar';

const getRoomOf = (objectId: string) => LOCATIONS.find((l) => l.room?.objects.includes(objectId))?.id;

let passed = 0;
const failures: string[] = [];
function check(name: string, ok: boolean, detail = '') {
  if (ok) passed++;
  else failures.push(`✗ ${name}${detail ? ` — ${detail}` : ''}`);
}

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2'];
const LANGS: NativeLanguage[] = ['uk', 'ru'];
const ids = new Set(FURNITURE.map((f) => f.id));
const item = (objectId: string, x: number, z: number, extra: Partial<PlacedItem> = {}): PlacedItem => ({ uid: objectId, objectId, x, y: 0, z, rot: 0, ...extra });

// ── 1. Spatial rules ───────────────────────────────────────────
{
  const room = bedroom;
  const bedBack = item('bed', -1.5, -2);
  const ev = (c: Parameters<typeof evaluate>[0], items: PlacedItem[]) => evaluate(c, items, room).ok;
  check('againstWall: bed at back wall', ev({ rel: 'againstWall', a: 'bed' }, [bedBack]));
  check('againstWall: bed in middle fails', !ev({ rel: 'againstWall', a: 'bed' }, [item('bed', 0, 0)]));
  check('nextTo: bedside table beside bed', ev({ rel: 'nextTo', a: 'nightstand', b: 'bed' }, [bedBack, item('nightstand', -0.5, -2.76)]));
  check('nextTo: far away fails', !ev({ rel: 'nextTo', a: 'nightstand', b: 'bed' }, [bedBack, item('nightstand', 2.5, 1)]));
  check('onTop: lamp on bedside table', ev({ rel: 'onTop', a: 'lamp', b: 'nightstand' }, [item('nightstand', 1, -2.76), item('lamp', 1, -2.76, { y: 0.58 })]));
  check('onTop: lamp on floor fails', !ev({ rel: 'onTop', a: 'lamp', b: 'nightstand' }, [item('nightstand', 1, -2.76), item('lamp', 1.6, -2.7)]));
  check('above: picture above bed (back wall)', ev({ rel: 'above', a: 'picture', b: 'bed' }, [bedBack, item('picture', -1.5, -2.96, { y: 1.6, wall: 'back' })]));
  check('above: picture above bed (left wall)', ev({ rel: 'above', a: 'picture', b: 'bed' }, [item('bed', -2, -1.3, { rot: 1 }), item('picture', -2.96, -1.3, { y: 1.6, wall: 'left', rot: 1 })]));
  check('above: picture elsewhere fails', !ev({ rel: 'above', a: 'picture', b: 'bed' }, [bedBack, item('picture', 2, -2.96, { y: 1.6, wall: 'back' })]));
  check('inFrontOf: carpet in front of wardrobe', ev({ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }, [item('wardrobe', -1.5, -2.69), item('carpet', -1.5, -1.3)]));
  check('inFrontOf: carpet far away fails', !ev({ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }, [item('wardrobe', -1.5, -2.69), item('carpet', 2, 2)]));
  check('nearWindow: desk under window', ev({ rel: 'nearWindow', a: 'desk' }, [item('desk', 0.6, -2.7)]));
  check('nearWindow: desk by the door fails', !ev({ rel: 'nearWindow', a: 'desk' }, [item('desk', -2, 2.5)]));
  check('inCorner: bookshelf in corner', ev({ rel: 'inCorner', a: 'bookshelf' }, [item('bookshelf', -2.55, -2.82)]));
  check('inMiddle: carpet centred', ev({ rel: 'inMiddle', a: 'carpet' }, [item('carpet', 0, 0)]));
  check('farFrom: desk far from bed', ev({ rel: 'farFrom', a: 'desk', b: 'bed' }, [bedBack, item('desk', 2.2, 2)]));
  const missing = evaluate({ rel: 'nextTo', a: 'chair', b: 'desk' }, [item('desk', 0, 0)], room);
  check('missing object explains what to add', !missing.ok && missing.message.includes('First add'), missing.message);
}

// ── 2. Automatic placement in an empty room ────────────────────
const PLAYABLE = LOCATIONS.flatMap((l) => (l.room ? [l.room] : []));
for (const room of PLAYABLE) {
  const placed: PlacedItem[] = [];
  for (const id of room.objects) {
    const def = getFurniture(id);
    const spot = findFreeSpot(def, placed, room, def.id);
    check(`auto-place ${room.id}/${def.id}`, !!spot);
    if (spot) {
      check(`auto-place ${room.id}/${def.id} is valid`, isPlacementValid(spot, placed, room));
      placed.push(spot);
    }
  }
}
check('every furniture belongs to exactly one room', FURNITURE.every((f) => PLAYABLE.filter((r) => r.objects.includes(f.id)).length === 1));
check('kitchen is locked until the bedroom is complete', !isRoomOpen('kitchen', []) && isRoomOpen('kitchen', ['bedroom']) && isRoomOpen('bedroom', []));
check('bathroom is locked until the kitchen is complete', !isRoomOpen('bathroom', ['bedroom']) && isRoomOpen('bathroom', ['bedroom', 'kitchen']));
check('living room is locked until the bathroom is complete', !isRoomOpen('living-room', ['bedroom', 'kitchen']) && isRoomOpen('living-room', ['bedroom', 'kitchen', 'bathroom']));
check('hallway is locked until the living room is complete', !isRoomOpen('hallway', ['bedroom', 'kitchen', 'bathroom']) && isRoomOpen('hallway', ['bedroom', 'kitchen', 'bathroom', 'living-room']));
check('basement is locked until the hallway is complete', !isRoomOpen('basement', ['bedroom', 'kitchen', 'bathroom', 'living-room']) && isRoomOpen('basement', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway']));
check('entrance is locked until the basement is complete', !isRoomOpen('entrance', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway']) && isRoomOpen('entrance', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement']));
check('school is locked until the entrance is complete', !isRoomOpen('school', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement']) && isRoomOpen('school', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement', 'entrance']));
check('office is locked until the school is complete', !isRoomOpen('office', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement', 'entrance']) && isRoomOpen('office', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement', 'entrance', 'school']));
check('hospital is locked until the office is complete', !isRoomOpen('hospital', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement', 'entrance', 'school']) && isRoomOpen('hospital', ['bedroom', 'kitchen', 'bathroom', 'living-room', 'hallway', 'basement', 'entrance', 'school', 'office']));
{
  const placed: PlacedItem[] = [];
  for (const id of bedroom.objects) {
    const def = getFurniture(id);
    const spot = findFreeSpot(def, placed, bedroom, def.id);
    if (spot) placed.push(spot);
  }
  const bed = placed.find((p) => p.objectId === 'bed')!;
  const win = bedroom.window!;
  const underWindow = bed.z < -2 && Math.abs(bed.x - win.center) < (win.width + 1.46) / 2 && bed.rot % 2 === 0;
  check('bed is not placed under the window', !underWindow, `bed at ${bed.x},${bed.z}`);
}

// ── 3. Content integrity ───────────────────────────────────────
function stepObjects(step: MissionStep): string[] {
  switch (step.type) {
    case 'find': return step.targets;
    case 'place': return step.checks.flatMap((c) => [c.a, c.b].filter(Boolean) as string[]);
    case 'sort': return step.props.flatMap((p) => p.accept);
    default: return [];
  }
}
const courseChapters = Object.entries(COURSE_CONTENT).flatMap(([c, content]) => Object.entries(content!.chapters).map(([room, ch]) => [`${c}/${room}`, ch] as const));
for (const [roomId, chapter] of [...Object.entries(CHAPTERS), ...courseChapters]) {
  const starter = roomId.includes('/');
  const missions: MissionDefinition[] = [...chapter.explore, ...chapter.challenges, chapter.makeover, chapter.final, ...(starter ? [] : SIDE_QUESTS[roomId] ?? [])];
  for (const m of missions) {
    for (const level of LEVELS) {
      const steps = forLevel(m.steps, level);
      check(`${roomId}/${m.id}/${level} has steps`, steps.length > 0);
      for (const s of steps) {
        for (const id of stepObjects(s)) check(`${roomId}/${m.id}/${level} uses real furniture "${id}"`, ids.has(id));
        if (s.type === 'choice') check(`${m.id}/${level} choice has one correct option`, s.options.filter((o) => o.correct).length === 1);
        if (s.type === 'shop') {
          // There must be at least one basket that solves the shop.
          const items = s.items;
          let solvable = false;
          for (let mask = 1; mask < 1 << items.length && !solvable; mask++) {
            const chosen = items.filter((_, i) => mask & (1 << i));
            const total = chosen.reduce((n, i) => n + i.price, 0);
            const big = chosen.filter((i) => i.tags.includes('big')).length;
            solvable = total <= s.budget && s.needs.every((n) => chosen.some((i) => i.tags.includes(n.tag))) && (s.maxBig === undefined || big <= s.maxBig);
          }
          check(`${m.id}/${level} shop can be solved`, solvable);
        }
        if (s.type === 'write' && s.sample) check(`${m.id}/${level} sample is only a start (shorter than required)`, evaluateWriting(s.sample, s.minWords, s.require).ok === false);
      }
    }
  }
  for (const h of chapter.hiddenObjects) check(`hidden object target "${h.target}" exists`, ids.has(h.target));
  for (const d of chapter.designerTasks) for (const c of d.checks) check(`designer check uses real furniture`, ids.has(c.a) && (!c.b || ids.has(c.b)));
  for (const level of LEVELS) {
    if (!starter) check(`scenarios exist for ${level}`, chapter.scenarios.some((s) => s.level === level));
    else check(`${roomId}: scenarios exist at or below ${level}`, chapter.scenarios.some((s) => LEVELS.indexOf(s.level) <= LEVELS.indexOf(level)));
    check(`hidden objects mission builds for ${level}`, forLevel(hiddenObjectsMission(chapter, level).steps, level).length === 6);
    check(`designer mission builds for ${level}`, forLevel(interiorDesignerMission(chapter, level).steps, level).length === 3);
  }
  for (const sc of chapter.scenarios) check(`scenario has one best option: ${sc.situation.slice(0, 30)}`, sc.options.filter((o) => o.best).length === 1);
  for (const p of chapter.prepositions) check(`preposition answer in options: ${p.sentence}`, p.options.includes(p.answer));
  const bins = new Set(chapter.sortGame.bins.map((b) => b.id));
  for (const i of chapter.sortGame.items) check(`sort item "${i.word}" has a real group`, bins.has(i.bin));
}
for (const roomId of Object.keys(SIDE_QUESTS)) {
  check(`side quests are for a playable room (${roomId})`, !!CHAPTERS[roomId]);
  check(`${roomId} has at least 3 side quests`, SIDE_QUESTS[roomId].length >= 3);
  check(`${roomId} side quest ids are unique`, new Set(SIDE_QUESTS[roomId].map((m) => m.id)).size === SIDE_QUESTS[roomId].length);
  for (const m of SIDE_QUESTS[roomId]) check(`side quest ${m.id} starts from the journey`, missionForTask(CHAPTERS[roomId], `side:${m.id}`, 'A1') === m);
}
check('every furniture word exists', FURNITURE.every((f) => ALL_WORDS.some((w) => w.id === f.wordId)));
check('word ids are unique', new Set(ALL_WORDS.map((w) => w.id)).size === ALL_WORDS.length);
check('every word has uk and ru translations', ALL_WORDS.every((w) => w.translations?.uk && w.translations?.ru), ALL_WORDS.filter((w) => !w.translations?.uk || !w.translations?.ru).map((w) => w.id).join(','));

// ── 4. Questions for every level, language and format ──────────
for (const roomId of Object.keys(CHAPTERS)) for (const level of LEVELS) {
  for (const language of LANGS) {
    const ctx = { level, language };
    for (let run = 0; run < 15; run++) {
      let qs;
      try {
        qs = buildTraining(roomId, ctx, {}, 0);
      } catch (e) {
        check(`training builds (${roomId}/${level}/${language})`, false, String(e));
        continue;
      }
      check(`training has questions (${roomId}/${level}/${language})`, qs.length >= 8);
      for (const q of qs) {
        if (q.options.length) check(`options include the answer (${q.type})`, q.options.includes(q.answer), `${q.word.id}: ${q.options.join('|')}`);
        if (q.type === 'match') check('match has 4 pairs', (q.pairs ?? []).length === 4, String(q.pairs?.length));
        if (q.type === 'spelling') check(`spelling hides real letters (${q.word.word})`, (q.hide ?? []).length > 0 && (q.hide ?? []).every((i) => /[a-z]/i.test(q.answer[i])));
        if (q.type === 'pictureChoice') check('every picture is a real object', (q.pictures ?? []).every((p) => ids.has(p)));
        if (q.type === 'typing' && q.mode === 'recall') check('recall shows a translation', !!q.native);
      }
    }
    for (const w of wordsForRoom(roomId, level)) {
      for (const f of ALL_FORMATS) {
        if (!supports(w, f, ctx)) continue;
        try {
          makeQuestion(w, f, ctx, wordsForRoom(roomId, level));
        } catch (e) {
          check(`question ${f} for "${w.word}"`, false, String(e));
        }
      }
    }
    check(`practice deck builds (${roomId}/${level}/${language})`, buildDeck(wordsForRoom(roomId, level), ['image', 'letters', 'recall'], ctx, {}, 0, 10).length === 10);
    for (const f of FURNITURE.filter((d) => getRoomOf(d.id) === roomId)) {
      check(`lesson for ${f.id} has 3 questions`, buildSession(f.id, 'lesson', ctx).length === 3);
      const lesson = buildLesson(f.id, ctx);
      const minSteps = { A1: 4, A2: 5, B1: 5, B2: 5 }[level];
      check(`unlock lesson for ${f.id}/${level} has at least ${minSteps} steps`, lesson.length >= minSteps, String(lesson.length));
      check(`unlock lesson for ${f.id}/${level} mixes at least 4 activity types`, new Set(lesson.map((q) => q.type)).size >= 4, lesson.map((q) => q.type).join(','));
      check(`unlock lesson keys are unique (${f.id})`, new Set(lesson.map((q) => q.key)).size === lesson.length);
      if (level !== 'A1') check(`unlock lesson for ${f.id}/${level} has a match step`, lesson.some((q) => q.type === 'match' && q.pairs?.length === 4));
      if (level === 'B1' || level === 'B2') check(`unlock lesson for ${f.id}/${level} has a sentence builder`, lesson.some((q) => q.type === 'builder'));
      for (const q of lesson) {
        if (q.options.length) check(`lesson options include the answer (${f.id}/${q.type})`, q.options.includes(q.answer), q.options.join('|'));
        if (q.type === 'spelling') check(`lesson spelling hides 2+ letters or the whole short word (${q.answer})`, (q.hide ?? []).length >= Math.min(2, q.answer.length - 2));
        if (q.type === 'typing' && q.mode === 'recall') check('lesson recall shows a translation', !!q.native);
      }
      check(`practice for ${f.id} has questions`, buildSession(f.id, 'practice', ctx).length >= 3);
    }
  }
}

// ── 5. Spaced repetition ───────────────────────────────────────
{
  let w = emptyWord();
  check('new word is "new"', masteryOf(w) === 'new');
  w = applyAnswer(w, false, 1);
  check('a mistake marks a word for revision', masteryOf(w) === 'revise');
  for (let t = 2; t < 6; t++) w = applyAnswer(w, true, t);
  check('three+ correct answers master a word', masteryOf(w) === 'mastered', JSON.stringify(w));
}

// ── 6. Writing checker ─────────────────────────────────────────
{
  const r = evaluateWriting('The rug is in front of the wardrobe because it is cosy.', 5, [
    { label: 'prepositions', words: ['in', 'in front of', 'on'], count: 2 },
  ]);
  check('"in front of" does not also count as "in"', !r.checks[1].ok, r.checks[1].detail);
  const r2 = evaluateWriting('My lamp is on the desk and my bag is in the wardrobe.', 5, [
    { label: 'prepositions', words: ['in', 'on'], count: 2 },
  ]);
  check('two different prepositions are counted', r2.checks[1].ok, r2.checks[1].detail);
  check('word count works', evaluateWriting('one two three', 3).ok);
}

// ── 7. Chapter stages ──────────────────────────────────────────
for (const [roomId, chapter] of Object.entries(CHAPTERS)) {
  const room = LOCATIONS.find((l) => l.id === roomId)!.room!;
  const base = { chapter, room, level: 'A1' as Level, unlocked: [], items: [], words: {} };
  const empty = buildStages({ ...base, state: { done: [], picks: [], inspected: [], writings: [] } });
  check('only the first stage is open at the start', empty.filter((s) => s.unlocked).length === 1);
  check('a new chapter is 0%', chapterPercent(empty) === 0);
  const picks = choosePicks();
  check('3 mini-games are picked', picks.length === 3 && new Set(picks).size === 3);
  check('exactly one mini-game is played in the room', picks.filter((p) => MINIGAMES.find((g) => g.id === p)!.kind === 'mission').length === 1);
  const allDone = empty.flatMap((s) => s.tasks.map((t) => t.id)).concat(picks.map((p) => `mini:${p}`));
  const full = buildStages({ ...base, state: { done: allDone, picks, inspected: [], writings: [] } });
  check('all tasks done = 100%', chapterPercent(full) === 100);
  check('all stages unlocked when done', full.every((s) => s.unlocked && s.done));
}

// ── 8. Nicknames ───────────────────────────────────────────────
check('nickname too short is refused', !checkNickname('ab').ok);
check('phone number in nickname is refused', !checkNickname('kid0501234567').ok);
check('email in nickname is refused', !checkNickname('me@mail.com').ok);
check('normal nickname is accepted', checkNickname('SunnyFox').ok);
check('Cyrillic nickname is accepted', checkNickname('Лисичка').ok);

// ── 10. Save files ──────────────────────────────────────────────
{
  const player = { id: 'p1', nickname: 'SunnyFox', avatar: { skin: '#f1c', hair: 'short', hairColor: '#000', outfit: 'tshirt', outfitColor: '#00f', accessory: 'none' } as const, createdAt: 1 };
  const progress = JSON.stringify({ state: { xp: 40, unlocked: ['bed'] }, version: 2 });
  const file = JSON.stringify(buildBackup({ ...player, course: 'de' }, { en: { progress, layout: null, chapter: null }, de: { progress, layout: null, chapter: null } }));
  const back = parseBackup(file);
  check('save file round-trips', back.ok && back.player.id === 'p1' && back.saves.en.progress === progress && back.saves.en.layout === null);
  check('save file keeps every course', back.ok && back.saves.de?.progress === progress && back.player.course === 'de');
  check('unknown course in a file is skipped', (() => { const r = parseBackup(file.replace('"de":', '"xx":')); return r.ok && !r.saves.xx && !!r.saves.en; })());
  check('random JSON is refused', !parseBackup('{"hello":1}').ok);
  check('non-JSON is refused', !parseBackup('not json').ok);
  check('newer format is refused', !parseBackup(file.replace('"format": 1', '"format": 99').replace('"format":1', '"format":99')).ok);
  check('damaged store is refused', !parseBackup(JSON.stringify({ ...JSON.parse(file), saves: { en: { progress: 5 } } })).ok);
  check('nickname clash gets a number', freeNickname('SunnyFox', ['sunnyfox']) === 'SunnyFox 2');
  check('renamed nickname stays within 16 chars', freeNickname('ABCDEFGHIJKLMNOP', ['abcdefghijklmnop']).length <= 16);
  check('file name is safe', /^my-little-world-SunnyFox-\d{4}-\d{2}-\d{2}\.json$/.test(backupFileName(player)));
}

// ── 11. Teacher overview ───────────────────────────────────────
{
  const avatar = { skin: '#fff', hair: 'short', hairColor: '#000', outfit: 'tshirt', outfitColor: '#f00', accessory: 'none' } as const;
  const player = { id: 'p1', nickname: 'SunnyFox', avatar: { ...avatar }, createdAt: 0 };
  const blank = summarise(player, { progress: null, chapter: null, layout: null });
  check('teacher: new player is on stage 1', blank.stage?.index === 1 && blank.mastered === 0 && blank.writings.length === 0);
  const w0 = ALL_WORDS[0].id;
  const w1 = ALL_WORDS[1].id;
  const done = { done: ['movein:unlock', 'movein:place'], picks: [], inspected: [], writings: [
    { id: 'a', title: 'Old', prompt: 'p', text: 'first', at: 1 },
    { id: 'b', title: 'New', prompt: 'p', text: 'second', at: 2 },
  ] };
  const s = summarise(player, {
    progress: { words: { [w0]: { ...emptyWord(), box: 3, attempts: 3, correct: 3 }, [w1]: { ...emptyWord(), box: 0, attempts: 2, wrong: 2 } }, level: 'A2', xp: 40 },
    chapter: { rooms: { bedroom: done } },
    layout: null,
  });
  check('teacher: finished stage 1 moves to stage 2', s.stage?.index === 2, JSON.stringify(s.stage));
  check('teacher: counts mastered and revise words', s.mastered === 1 && s.toRevise === 1, `${s.mastered}/${s.toRevise}`);
  check('teacher: newest writing first', s.writings[0]?.text === 'second' && s.writings.length === 2);
  check('teacher PIN: 4 digits accepted', isValidPin('0427'));
  check('teacher PIN: wrong lengths and letters refused', !isValidPin('123') && !isValidPin('12345') && !isValidPin('12a4'));
  check('teacher: profile without a course is English', s.course === 'en');
  const de = summarise({ ...player, course: 'de' }, { progress: null, chapter: null, layout: null });
  check('teacher: German player counts German course words', de.course === 'de' && de.totalWords > 0 && de.totalWords <= ENGLISH_WORDS.length);
  check('teacher: keeps level and XP', s.level === 'A2' && s.xp === 40);
}

void getFurniture;
// ── 9. Starter courses (German, Polish) ────────────────────────
{
  const objectIds = new Set(FURNITURE.map((f) => f.wordId));
  check('every course with content is in the course list', Object.keys(COURSE_CONTENT).every((c) => COURSES.some((x) => x.id === c)));
  for (const [course, content] of Object.entries(COURSE_CONTENT)) {
    const words = wordsForCourse(ENGLISH_WORDS, course as never, objectIds);
    const english = new Map(ENGLISH_WORDS.map((w) => [w.id, w]));
    for (const id of Object.keys(content!.words)) check(`${course}: word key "${id}" is a real English word id`, english.has(id));
    // Rooms this course has its own chapter for must be fully translated; other rooms fall back to English.
    const courseObjects = FURNITURE.filter((f) => Object.keys(content!.chapters).some((r) => getRoomOf(f.id) === r));
    const fallbackWordIds = new Set(FURNITURE.filter((f) => !courseObjects.includes(f)).map((f) => f.wordId));
    for (const f of courseObjects) check(`${course}: object word "${f.wordId}" is translated`, !!content!.words[f.wordId]);
    check(`${course}: enough words to master ${10}`, words.length >= 20, `${words.length}`);
    check(`${course}: every word has uk and ru`, words.every((w) => w.translations?.uk && w.translations?.ru));
    check(`${course}: no word is still English`, words.every((w) => content!.words[w.id] || fallbackWordIds.has(w.id)), words.filter((w) => !content!.words[w.id] && !fallbackWordIds.has(w.id)).map((w) => w.id).join(','));
    const forms = new Set(words.map((w) => w.word.toLowerCase()));
    check(`${course}: no two words look the same`, forms.size === words.length);
    const acts = activitiesForCourse(ENGLISH_ACTIVITIES, course as never);
    check(`${course}: no English-only activities`, acts.every((a) => a.type !== 'sentence' && a.type !== 'multipleChoice'));
    for (const f of courseObjects) check(`${course}: lesson for ${f.id} has 3 steps`, acts.filter((a) => a.wordId === f.wordId && a.stage === 'lesson').length === 3);
    for (const w of words) {
      const hide = autoHide(w.word);
      check(`${course}: spelling hides 1–5 letters of "${w.word}"`, hide.length >= 1 && hide.length <= 5 && hide.every((i) => /\p{L}/u.test([...w.word][i])));
    }
    const ch = content!.chapters.bedroom;
    const write = ch.final.steps.A1.find((s) => s.type === 'write');
    if (write?.type === 'write') {
      const sentence = course === 'de' ? 'Mein Bett steht am Fenster und die Lampe ist auf dem Nachttisch.' : 'Moje łóżko stoi przy oknie, a lampa jest na szafce nocnej.';
      check(`${course}: a good answer passes the writing task`, evaluateWriting(sentence, write.minWords, write.require).ok, JSON.stringify(evaluateWriting(sentence, write.minWords, write.require).checks));
    }
  }
  check('de: German article stays visible in spelling', autoHide('das Bett').every((i) => i > 3));
}

// ── Stars ──────────────────────────────────────────────────────
{
  const { useProgress } = await import('../src/progression/progressStore');
  const before = useProgress.getState().stars;
  useProgress.getState().recordAnswer(ALL_WORDS[0].id, true, true, false);
  check('stars: self-marked flashcards give no star', useProgress.getState().stars === before);
  useProgress.getState().recordAnswer(ALL_WORDS[0].id, true, true);
  check('stars: a checked first-try answer gives one star', useProgress.getState().stars === before + 1);
}

// ── Pet + coin shop ────────────────────────────────────────────
{
  const ids = SHOP_ITEMS.map((i) => i.id);
  check('shop: item ids are unique', new Set(ids).size === ids.length);
  check('shop: prices are positive whole numbers', SHOP_ITEMS.every((i) => Number.isInteger(i.price) && i.price > 0));
  check('shop: every category has items', ['room', 'avatar', 'pet'].every((c) => SHOP_ITEMS.some((i) => i.category === c)));
  check('pets: four animals with a word in every course', PET_SPECIES.length === 4 && PET_SPECIES.every((p) => COURSES.every((c) => !!p.word[c.id]) && p.colors.length >= 4));
  check('shop: every exclusive avatar item is in the creator', SHOP_ITEMS.every((i) =>
    i.kind === 'hair' ? HAIR_STYLES.some((h) => h.id === i.hair) : i.kind === 'outfit' ? OUTFITS.some((o) => o.id === i.outfit) : i.kind === 'accessory' ? ACCESSORIES.some((a) => a.id === i.accessory) : true));
  check('shop: starter avatar styles stay free', ['short', 'long', 'bun', 'curly', 'spiky', 'bob'].every((h) => !exclusiveFor('hair', h)) && !exclusiveFor('outfit', 'dress'));
  check('coins: tasks pay a quarter of XP, at least 5', coinsForXp(40) === 10 && coinsForXp(90) === 23 && coinsForXp(4) === 5);
  const painted = styledRoom(bedroom, { wall: 'paint-mint', floor: 'floor-checker' });
  check('room style: paint and floor change the theme', painted.theme.wall === '#dff3ea' && painted.theme.floorStyle === 'tiles' && bedroom.theme.wall !== '#dff3ea');
  check('room style: no style keeps the room', styledRoom(bedroom, undefined) === bedroom && styledRoom(bedroom, { wall: 'nope' }).theme.wall === bedroom.theme.wall);

  const c = useCompanion;
  c.setState({ ...initialCompanion });
  c.getState().start(12);
  check('coins: starter coins plus one per star (older saves)', c.getState().coins === 37 && c.getState().started);
  c.getState().start(50);
  check('coins: starter coins only once', c.getState().coins === 37);
  check('shop: can’t buy without enough coins', !c.getState().buy('acc-crown') && c.getState().coins === 37);
  check('shop: buying needs the full price', !c.getState().buy('paint-mint') && !c.getState().owned.includes('paint-mint'));
  c.setState({ coins: 100 });
  check('shop: buying adds the item and takes coins', c.getState().buy('pet-bow') && c.getState().coins === 70 && c.getState().owned.includes('pet-bow'));
  check('shop: an item can’t be bought twice', !c.getState().buy('pet-bow') && c.getState().coins === 70);
  c.getState().earn(15);
  check('coins: earning adds to coins and lifetime total', c.getState().coins === 85 && c.getState().earned === 52);
  c.getState().adopt({ species: 'parrot', name: '   ', color: '#4cb860', accessory: 'none' });
  check('pet: empty name gets a default', c.getState().pet?.name === 'Buddy');
  c.getState().updatePet({ name: 'A very very long pet name' });
  check('pet: name is at most 16 letters', (c.getState().pet?.name.length ?? 0) <= 16);
  c.getState().toggleDecor('bedroom', 'decor-balloons');
  c.getState().setRoomStyle('bedroom', { wall: 'paint-mint' });
  check('room style: decor and paint are kept together', c.getState().roomStyles.bedroom.decor?.[0] === 'decor-balloons' && c.getState().roomStyles.bedroom.wall === 'paint-mint');
  check('save: damaged companion data is cleaned', JSON.stringify(sanitize({ coins: -5, owned: ['pet-bow', 'fake', 3], pet: 'x' })) === JSON.stringify({ owned: ['pet-bow'] }));

  const player = { id: 'p1', nickname: 'SunnyFox', avatar: { skin: '#f1c', hair: 'short', hairColor: '#000', outfit: 'tshirt', outfitColor: '#00f', accessory: 'none' } as const, createdAt: 1 };
  const companion = JSON.stringify({ state: { coins: 85, pet: { species: 'cat', name: 'Mochi', color: '#e8a05c', accessory: 'bow' } }, version: 1 });
  const file = JSON.stringify(buildBackup(player, { en: { progress: null, layout: null, chapter: null }, profile: { companion } }));
  const back = parseBackup(file);
  check('save file keeps the pet and coins', back.ok && back.saves.profile?.companion === companion);
  const old = parseBackup(JSON.stringify({ ...JSON.parse(file), saves: { en: JSON.parse(file).saves.en } }));
  check('save file from before the pet still loads', old.ok && !old.saves.profile);
}

console.log(`\n${passed} checks passed, ${failures.length} failed`);
if (failures.length) {
  console.log([...new Set(failures)].slice(0, 60).join('\n'));
  process.exit(1);
}
