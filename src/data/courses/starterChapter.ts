import type { ChapterDefinition, MissionDefinition, PropDef, SpatialCheck, WordRequirement } from '../../chapter/types';
import type { Level } from '../../types/game';

// A short Bedroom chapter for starter courses (German, Polish).
// The structure (targets, spatial checks, which box goes where) is shared and lives here;
// each language only supplies the text, in src/data/courses/<lang>.ts.
// Text is A1 only: higher levels use the A1 text (see forLevel).

type Pair = [label: string, instruction: string];

export interface StarterChapterText {
  title: string;
  exploreIntro: string;
  explore: Record<'wood' | 'sleep' | 'clothes' | 'soft' | 'organise', { title: string; prompt: string }>;
  movingDay: { title: string; intro: string; prompt: string; boxes: [string, string, string, string, string, string] };
  messy: { title: string; intro: string; prompt: string; items: [Pair, Pair, Pair, Pair, Pair] };
  makeover: { title: string; intro: string; steps: [string, string, string, string, string] };
  final: {
    title: string;
    intro: string;
    findBlanket: string;
    makeBed: string;
    blanket: Pair;
    pillow: Pair;
    suitcasePrompt: string;
    suitcase: Pair;
    choice: { prompt: string; right: [string, string]; wrong: [string, string][] };
    write: { prompt: string; sample: string };
  };
  /** One clue per object. */
  hidden: Record<'mirror' | 'lamp' | 'plant' | 'chair' | 'bookshelf' | 'carpet' | 'picture' | 'chest' | 'nightstand' | 'desk' | 'wardrobe' | 'bed', string>;
  /** Same order as DESIGNER_CHECKS below. */
  designer: [string, string, string, string, string, string, string, string, string, string];
  sortBins: Record<'furniture' | 'clothes' | 'decorations' | 'belongings', string>;
  sortItems: { word: string; bin: 'furniture' | 'clothes' | 'decorations' | 'belongings'; level: Level }[];
  scenarios: { situation: string; options: { text: string; best: boolean; feedback: string }[] }[];
  sentences: string[];
  prepositions: { sentence: string; answer: string; options: string[] }[];
  /** Furniture words the writing task looks for (lower case, without articles). */
  writing: { furnitureWords: string[] };
}

const EXPLORE_TARGETS = {
  wood: { targets: ['bed', 'wardrobe', 'desk', 'chair', 'bookshelf', 'nightstand', 'picture', 'chest'], count: 5, icon: '🪵' },
  sleep: { targets: ['lamp', 'bed', 'nightstand', 'mirror'], count: 1, icon: '🌙' },
  clothes: { targets: ['wardrobe', 'chest', 'nightstand'], count: 3, icon: '👕' },
  soft: { targets: ['carpet', 'bed'], count: 1, icon: '☁️' },
  organise: { targets: ['bookshelf', 'chest', 'wardrobe', 'nightstand', 'desk'], count: 1, icon: '🗂️' },
} as const;

const BOX_ACCEPT = [['bed'], ['bookshelf', 'desk', 'nightstand'], ['wardrobe', 'chest'], ['nightstand', 'desk', 'chest'], ['desk'], ['nightstand', 'desk', 'bookshelf', 'chest']];

const MESS: { look: PropDef['look']; color: string; accept: string[] }[] = [
  { look: 'clothes', color: '#7fa6d8', accept: ['wardrobe', 'chest'] },
  { look: 'socks', color: '#f6a6a6', accept: ['chest', 'wardrobe'] },
  { look: 'book', color: '#9fd8c2', accept: ['bookshelf'] },
  { look: 'pillow', color: '#fde2e4', accept: ['bed'] },
  { look: 'shoes', color: '#c9b6e4', accept: ['wardrobe'] },
];

const MAKEOVER_CHECKS: SpatialCheck[] = [
  { rel: 'againstWall', a: 'bed' },
  { rel: 'nextTo', a: 'nightstand', b: 'bed' },
  { rel: 'onTop', a: 'lamp', b: 'nightstand' },
  { rel: 'above', a: 'picture', b: 'bed' },
  { rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' },
];

export const DESIGNER_CHECKS: SpatialCheck[] = [
  { rel: 'nextTo', a: 'nightstand', b: 'bed' },
  { rel: 'nearWindow', a: 'desk' },
  { rel: 'nextTo', a: 'chair', b: 'desk' },
  { rel: 'againstWall', a: 'bookshelf' },
  { rel: 'onTop', a: 'lamp', b: 'desk' },
  { rel: 'inMiddle', a: 'carpet' },
  { rel: 'above', a: 'picture', b: 'bed' },
  { rel: 'nextTo', a: 'chest', b: 'wardrobe' },
  { rel: 'inCorner', a: 'bookshelf' },
  { rel: 'farFrom', a: 'desk', b: 'bed' },
];

const prop = (id: string, [label, instruction]: Pair, look: PropDef['look'], color: string, accept: string[]): PropDef => ({ id, label, instruction, look, color, accept });

export function buildStarterChapter(t: StarterChapterText): ChapterDefinition {
  const furniture = (count: number): WordRequirement => ({ label: 'furniture words', words: t.writing.furnitureWords, count });

  const explore: MissionDefinition[] = (Object.keys(EXPLORE_TARGETS) as (keyof typeof EXPLORE_TARGETS)[]).map((id) => {
    const { targets, count, icon } = EXPLORE_TARGETS[id];
    return {
      id, title: t.explore[id].title, icon, xp: 20,
      intro: { A1: t.exploreIntro },
      steps: { A1: [{ type: 'find', prompt: t.explore[id].prompt, targets: [...targets], count }] },
    };
  });

  const movingDay: MissionDefinition = {
    id: 'moving-day', title: t.movingDay.title, icon: '📦', xp: 60,
    intro: { A1: t.movingDay.intro },
    steps: { A1: [{ type: 'sort', boxes: true, prompt: t.movingDay.prompt,
      props: t.movingDay.boxes.map((label, i) => ({ id: `b${i + 1}`, label, look: 'box' as const, accept: BOX_ACCEPT[i] })) }] },
  };

  const messyBedroom: MissionDefinition = {
    id: 'messy-bedroom', title: t.messy.title, icon: '🧹', xp: 60,
    intro: { A1: t.messy.intro },
    steps: { A1: [{ type: 'sort', prompt: t.messy.prompt,
      props: t.messy.items.map((pair, i) => prop(`m${i + 1}`, pair, MESS[i].look, MESS[i].color, MESS[i].accept)) }] },
  };

  const makeover: MissionDefinition = {
    id: 'makeover', title: t.makeover.title, icon: '🎨', xp: 80,
    intro: { A1: t.makeover.intro },
    steps: { A1: t.makeover.steps.map((prompt, i) => ({ type: 'place' as const, prompt, checks: [MAKEOVER_CHECKS[i]] })) },
  };

  const f = t.final;
  const final: MissionDefinition = {
    id: 'final', title: f.title, icon: '🎒', xp: 150,
    intro: { A1: f.intro },
    steps: { A1: [
      { type: 'find', prompt: f.findBlanket, targets: ['wardrobe', 'chest'] },
      { type: 'sort', prompt: f.makeBed, props: [
        prop('f1', f.blanket, 'blanket', '#a9c9f2', ['bed']),
        prop('f2', f.pillow, 'pillow', '#fde2e4', ['bed']),
      ] },
      { type: 'sort', prompt: f.suitcasePrompt, props: [prop('f3', f.suitcase, 'suitcase', '#f6a6a6', ['wardrobe', 'bed', 'chest'])] },
      { type: 'choice', prompt: f.choice.prompt, options: [
        { text: f.choice.right[0], correct: true, feedback: f.choice.right[1] },
        ...f.choice.wrong.map(([text, feedback]) => ({ text, correct: false, feedback })),
      ] },
      { type: 'write', prompt: f.write.prompt, minWords: 8, require: [furniture(2)], sample: f.write.sample },
    ] },
  };

  return {
    roomId: 'bedroom',
    title: t.title,
    explore,
    challenges: [movingDay, messyBedroom],
    makeover,
    final,
    hiddenObjects: Object.entries(t.hidden).map(([target, prompt]) => ({ target, prompt: { A1: prompt } })),
    designerTasks: DESIGNER_CHECKS.map((check, i) => ({ checks: [check], prompt: { A1: t.designer[i] } })),
    sortGame: {
      bins: [
        { id: 'furniture', label: t.sortBins.furniture, icon: '🛋️' },
        { id: 'clothes', label: t.sortBins.clothes, icon: '👕' },
        { id: 'decorations', label: t.sortBins.decorations, icon: '🖼️' },
        { id: 'belongings', label: t.sortBins.belongings, icon: '🎒' },
      ],
      items: t.sortItems,
    },
    scenarios: t.scenarios.map((s) => ({ level: 'A1' as const, ...s })),
    sentences: t.sentences.map((text) => ({ text, level: 'A1' as const })),
    prepositions: t.prepositions.map((p) => ({ ...p, level: 'A1' as const })),
  };
}
