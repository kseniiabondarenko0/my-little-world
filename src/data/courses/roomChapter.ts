import type { ChapterDefinition, MissionDefinition, MissionStep, SpatialCheck } from '../../chapter/types';
import { FURNITURE } from '../furniture';
import type { CourseContent, CourseWord, RoomCourse } from './types';

// ═══════════════════════════════════════════════════════════════════════════
//  Chapters for starter courses (German, Polish), built from the English chapter.
//
//  The English chapter gives the structure: which objects each mission uses, the
//  spatial checks of the makeover and the designer game, the sort-game groups.
//  The language gives the words (src/data/courses/<lang>/<room>.ts) and a small
//  "kit" of sentence patterns with correct grammar (src/data/courses/<lang>/index.ts).
//  So a German player never sees an English instruction, and every room is playable.
// ═══════════════════════════════════════════════════════════════════════════

/** A 3D object's word in a course, with the grammar forms the kit needs. */
export interface ObjectWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  forms: string[];
}

export interface LanguageKit {
  exploreIntro: string;
  exploreTitles: string[];
  /** "Find two of these: …" */
  find(names: ObjectWord[], count: number): string;
  riddle(o: ObjectWord): string;
  riddleIntro: string;
  /** Title for a challenge built from an English challenge (index from 0). */
  challengeTitles: string[];
  makeover: { title: string; intro: string };
  final: { title: string; intro: string };
  /** An instruction for a spatial check, e.g. "Stell den Hocker neben den Tisch." */
  place(check: SpatialCheck, a: ObjectWord, b?: ObjectWord): string;
  choice(o: ObjectWord): string;
  right: string;
  wrong(o: ObjectWord): string;
  scenario(o: ObjectWord): string;
  write: { prompt: string; label: string; sample(o: ObjectWord): string };
  /** Words that count as "a word from this room" in the writing task. */
  writingForms(o: ObjectWord): string[];
  /** A fill-the-gap preposition sentence for a check, or null when the language has none for it. */
  preposition(check: SpatialCheck, a: ObjectWord, b: ObjectWord): { sentence: string; answer: string; options: string[] } | null;
}

const furnitureWord = new Map(FURNITURE.map((f) => [f.id, f.wordId]));

function objectWords(room: RoomCourse): Map<string, ObjectWord> {
  const byWord = new Map(Object.entries(room.objects).map(([id, [word, definition, example, ...forms]]) => [id, { id, word, definition, example, forms }]));
  const byObject = new Map<string, ObjectWord>();
  for (const [objectId, wordId] of furnitureWord) {
    const o = byWord.get(wordId);
    if (o) byObject.set(objectId, o);
  }
  return byObject;
}

const unique = <T>(xs: T[]) => [...new Set(xs)];

function stepObjects(step: MissionStep): string[] {
  switch (step.type) {
    case 'find': return step.targets;
    case 'sort': return step.props.flatMap((p) => p.accept.slice(0, 1));
    case 'place': return step.checks.flatMap((c) => [c.a, c.b].filter((x): x is string => !!x));
    default: return [];
  }
}
const stepChecks = (steps: MissionStep[]) => steps.flatMap((s) => (s.type === 'place' ? s.checks : []));

export function buildRoomChapter(kit: LanguageKit, room: RoomCourse, english: ChapterDefinition): ChapterDefinition {
  const objects = objectWords(room);
  const o = (id: string) => {
    const w = objects.get(id);
    if (!w) throw new Error(`${english.roomId}: no course word for object "${id}"`);
    return w;
  };
  const placeStep = (c: SpatialCheck): MissionStep => ({ type: 'place', prompt: kit.place(c, o(c.a), c.b ? o(c.b) : undefined), checks: [c] });
  const riddleStep = (id: string): MissionStep => ({ type: 'find', prompt: kit.riddle(o(id)), targets: [id] });
  const all = [...objects.values()];
  // Three options: the right object and the next two in the room's list.
  const others = (right: ObjectWord) => {
    const i = all.indexOf(right);
    return [all[(i + 1) % all.length], all[(i + 2) % all.length]];
  };
  const choiceStep = (right: ObjectWord): MissionStep => ({
    type: 'choice', prompt: kit.choice(right), options: [
      { text: right.word, correct: true, feedback: kit.right },
      ...others(right).map((w) => ({ text: w.word, correct: false, feedback: kit.wrong(right) })),
    ],
  });

  const explore: MissionDefinition[] = english.explore.map((m, i) => {
    const step = m.steps.A1.find((s) => s.type === 'find');
    const targets = step?.type === 'find' ? step.targets : [all[i % all.length].id];
    const count = step?.type === 'find' ? step.count ?? 1 : 1;
    return {
      id: m.id, icon: m.icon, xp: m.xp, title: kit.exploreTitles[i % kit.exploreTitles.length],
      intro: { A1: kit.exploreIntro },
      steps: { A1: [{ type: 'find', prompt: kit.find(targets.map(o), count), targets, count }] },
    };
  });

  // Challenges: riddles about the objects the English challenge uses, then its placing tasks.
  const challenges: MissionDefinition[] = english.challenges.map((m, i) => {
    const used = unique(m.steps.A1.flatMap(stepObjects)).filter((id) => objects.has(id)).slice(0, 4);
    const ids = used.length >= 2 ? used : all.slice(i * 3, i * 3 + 3).map((w) => w.id);
    const checks = stepChecks(m.steps.A1).slice(0, 2);
    return {
      id: m.id, icon: m.icon, xp: m.xp, title: kit.challengeTitles[i % kit.challengeTitles.length],
      intro: { A1: kit.riddleIntro },
      steps: { A1: [...ids.map(riddleStep), ...checks.map(placeStep)] },
    };
  });

  const makeoverChecks = stepChecks(english.makeover.steps.A1);
  const makeover: MissionDefinition = {
    id: english.makeover.id, icon: english.makeover.icon, xp: english.makeover.xp,
    title: kit.makeover.title, intro: { A1: kit.makeover.intro },
    steps: { A1: (makeoverChecks.length ? makeoverChecks : english.designerTasks.slice(0, 4).flatMap((d) => d.checks)).map(placeStep) },
  };

  const finalSteps = english.final.steps.A1;
  const finalFinds = unique(finalSteps.flatMap((s) => (s.type === 'find' ? s.targets.slice(0, 1) : []))).filter((id) => objects.has(id)).slice(0, 3);
  const finalChecks = stepChecks(finalSteps).slice(0, 2);
  const firstFinal = o(finalFinds[0] ?? all[0].id);
  const final: MissionDefinition = {
    id: english.final.id, icon: english.final.icon, xp: english.final.xp,
    title: kit.final.title, intro: { A1: kit.final.intro },
    steps: { A1: [
      ...(finalFinds.length ? finalFinds : [all[0].id]).map(riddleStep),
      ...finalChecks.map(placeStep),
      choiceStep(all[all.length - 1]),
      { type: 'write', prompt: kit.write.prompt, minWords: 8, sample: kit.write.sample(firstFinal),
        require: [{ label: kit.write.label, words: unique(all.flatMap(kit.writingForms)), count: 2 }] },
    ] },
  };

  const designerChecks = english.designerTasks.flatMap((d) => d.checks);
  const prepositions = unique([...makeoverChecks, ...designerChecks].map((c) => JSON.stringify(c)))
    .map((s) => JSON.parse(s) as SpatialCheck)
    .flatMap((c) => {
      const p = c.b ? kit.preposition(c, o(c.a), o(c.b)) : null;
      return p ? [{ ...p, level: 'A1' as const }] : [];
    });

  const courseWord = (english: string) => {
    const id = english.toLowerCase().replace(/[^a-z]+/g, '-');
    return room.words[id] ?? room.objects[id]?.[0];
  };

  return {
    roomId: english.roomId,
    title: room.title,
    explore,
    challenges,
    makeover,
    final,
    hiddenObjects: english.hiddenObjects.map((h) => ({ target: h.target, prompt: { A1: kit.riddle(o(h.target)) } })),
    designerTasks: english.designerTasks.map((d) => ({ checks: d.checks, prompt: { A1: d.checks.map((c) => kit.place(c, o(c.a), c.b ? o(c.b) : undefined)).join(' ') } })),
    sortGame: {
      bins: english.sortGame.bins.map((b) => ({ ...b, label: room.bins[b.id] ?? b.label })),
      items: english.sortGame.items.flatMap((i) => {
        const word = courseWord(i.word);
        return word ? [{ ...i, word }] : [];
      }),
    },
    scenarios: all.slice(0, 6).map((right) => ({
      level: 'A1' as const,
      situation: kit.scenario(right),
      options: [right, ...others(right)].map((w, k) => ({ text: w.word, best: k === 0, feedback: k === 0 ? kit.right : kit.wrong(right) })),
    })),
    sentences: all.map((w) => ({ text: w.example, level: 'A1' as const })),
    prepositions,
  };
}

/** All words and chapters of a starter course. Hand-written chapters (bedroom) win over built ones. */
export function buildCourse(
  kit: LanguageKit,
  rooms: Record<string, RoomCourse>,
  english: Record<string, ChapterDefinition>,
  handWritten: Record<string, ChapterDefinition> = {},
): CourseContent {
  const words: Record<string, CourseWord> = {};
  const chapters: Record<string, ChapterDefinition> = {};
  for (const [roomId, room] of Object.entries(rooms)) {
    for (const [id, [word, definition, example]] of Object.entries(room.objects)) words[id] = { word, definition, example };
    for (const [id, word] of Object.entries(room.words)) words[id] = { word };
    chapters[roomId] = handWritten[roomId] ?? buildRoomChapter(kit, room, english[roomId]);
  }
  return { words, chapters };
}
