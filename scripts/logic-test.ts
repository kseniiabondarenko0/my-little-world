// Automated checks for the game logic and content (no browser needed).
// Run with:  npm run test:logic

import type { Level, NativeLanguage, PlacedItem } from '../src/types/game';
import { bedroom } from '../src/rooms/bedroom';
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
import { buildStages, chapterPercent, choosePicks } from '../src/chapter/stages';
import { MINIGAMES } from '../src/minigames/registry';
import { hiddenObjectsMission, interiorDesignerMission } from '../src/minigames/missions';
import { checkNickname } from '../src/player/playerService';

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
{
  const placed: PlacedItem[] = [];
  for (const def of FURNITURE) {
    const spot = findFreeSpot(def, placed, bedroom, def.id);
    check(`auto-place ${def.id}`, !!spot);
    if (spot) {
      check(`auto-place ${def.id} is valid`, isPlacementValid(spot, placed, bedroom));
      placed.push(spot);
    }
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
for (const [roomId, chapter] of Object.entries(CHAPTERS)) {
  const missions: MissionDefinition[] = [...chapter.explore, ...chapter.challenges, chapter.makeover, chapter.final];
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
    check(`scenarios exist for ${level}`, chapter.scenarios.some((s) => s.level === level));
    check(`hidden objects mission builds for ${level}`, forLevel(hiddenObjectsMission(chapter, level).steps, level).length === 6);
    check(`designer mission builds for ${level}`, forLevel(interiorDesignerMission(chapter, level).steps, level).length === 3);
  }
  for (const sc of chapter.scenarios) check(`scenario has one best option: ${sc.situation.slice(0, 30)}`, sc.options.filter((o) => o.best).length === 1);
  for (const p of chapter.prepositions) check(`preposition answer in options: ${p.sentence}`, p.options.includes(p.answer));
  const bins = new Set(chapter.sortGame.bins.map((b) => b.id));
  for (const i of chapter.sortGame.items) check(`sort item "${i.word}" has a real group`, bins.has(i.bin));
}
check('every furniture word exists', FURNITURE.every((f) => ALL_WORDS.some((w) => w.id === f.wordId)));
check('word ids are unique', new Set(ALL_WORDS.map((w) => w.id)).size === ALL_WORDS.length);
check('every word has uk and ru translations', ALL_WORDS.every((w) => w.translations?.uk && w.translations?.ru), ALL_WORDS.filter((w) => !w.translations?.uk || !w.translations?.ru).map((w) => w.id).join(','));

// ── 4. Questions for every level, language and format ──────────
for (const level of LEVELS) {
  for (const language of LANGS) {
    const ctx = { level, language };
    for (let run = 0; run < 15; run++) {
      let qs;
      try {
        qs = buildTraining('bedroom', ctx, {}, 0);
      } catch (e) {
        check(`training builds (${level}/${language})`, false, String(e));
        continue;
      }
      check(`training has questions (${level}/${language})`, qs.length >= 8);
      for (const q of qs) {
        if (q.options.length) check(`options include the answer (${q.type})`, q.options.includes(q.answer), `${q.word.id}: ${q.options.join('|')}`);
        if (q.type === 'match') check('match has 4 pairs', (q.pairs ?? []).length === 4, String(q.pairs?.length));
        if (q.type === 'spelling') check(`spelling hides real letters (${q.word.word})`, (q.hide ?? []).length > 0 && (q.hide ?? []).every((i) => /[a-z]/i.test(q.answer[i])));
        if (q.type === 'pictureChoice') check('every picture is a real object', (q.pictures ?? []).every((p) => ids.has(p)));
        if (q.type === 'typing' && q.mode === 'recall') check('recall shows a translation', !!q.native);
      }
    }
    for (const w of wordsForRoom('bedroom', level)) {
      for (const f of ALL_FORMATS) {
        if (!supports(w, f, ctx)) continue;
        try {
          makeQuestion(w, f, ctx, wordsForRoom('bedroom', level));
        } catch (e) {
          check(`question ${f} for "${w.word}"`, false, String(e));
        }
      }
    }
    check(`practice deck builds (${level}/${language})`, buildDeck(wordsForRoom('bedroom', level), ['image', 'letters', 'recall'], ctx, {}, 0, 10).length === 10);
    for (const f of FURNITURE) {
      check(`lesson for ${f.id} has 3 questions`, buildSession(f.id, 'lesson', ctx).length === 3);
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
{
  const chapter = CHAPTERS.bedroom;
  const base = { chapter, room: bedroom, level: 'A1' as Level, unlocked: [], items: [], words: {} };
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

void getFurniture;
console.log(`\n${passed} checks passed, ${failures.length} failed`);
if (failures.length) {
  console.log([...new Set(failures)].slice(0, 60).join('\n'));
  process.exit(1);
}
