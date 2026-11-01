import type { Level } from '../types/game';

// Shapes for chapter content (stages, missions, mini-game content).
// Every room gets one ChapterDefinition in src/data/chapters/.

/** Text or data that changes with the student's level. A1 is required; higher levels fall back downwards. */
export type ByLevel<T> = { A1: T } & Partial<Record<Exclude<Level, 'A1'>, T>>;

/** A rule about where furniture stands, checked against the real room. */
export interface SpatialCheck {
  rel: 'againstWall' | 'nextTo' | 'near' | 'onTop' | 'above' | 'inFrontOf' | 'nearWindow' | 'inCorner' | 'inMiddle' | 'farFrom' | 'onWall';
  a: string;
  b?: string;
}

export type PropLook = 'box' | 'clothes' | 'socks' | 'book' | 'shoes' | 'pillow' | 'blanket' | 'suitcase' | 'cup' | 'phone' | 'toy';

/** A loose thing on the floor during a mission. Click it, then click where it belongs. */
export interface PropDef {
  id: string;
  /** What the student sees ("the jeans"). For boxes: what's inside, shown after opening. */
  label: string;
  look: PropLook;
  color?: string;
  /** Furniture ids where it may go. */
  accept: string[];
  /** Checklist line, e.g. "Put the jeans in the wardrobe." */
  instruction?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  /** Which needs it covers, plus 'big' for bulky items. */
  tags: string[];
}

export interface WordRequirement {
  label: string;
  words: string[];
  count: number;
}

export type MissionStep =
  | { type: 'find'; prompt: string; targets: string[]; count?: number; hint?: string }
  | { type: 'place'; prompt: string; checks: SpatialCheck[]; hint?: string }
  | { type: 'sort'; prompt: string; props: PropDef[]; boxes?: boolean }
  | { type: 'choice'; prompt: string; options: { text: string; correct: boolean; feedback: string }[] }
  | { type: 'write'; prompt: string; minWords: number; require?: WordRequirement[]; sample?: string }
  | { type: 'shop'; prompt: string; budget: number; items: ShopItem[]; needs: { tag: string; label: string }[]; maxBig?: number };

export interface MissionDefinition {
  id: string;
  title: string;
  icon: string;
  intro: ByLevel<string>;
  steps: ByLevel<MissionStep[]>;
  xp?: number;
}

export interface Scenario {
  level: Level;
  situation: string;
  options: { text: string; best: boolean; feedback: string }[];
  /** B1: choose the best reason after choosing the action. */
  reasons?: { text: string; correct: boolean }[];
  /** B2: justify in writing. */
  write?: { prompt: string; minWords: number; require?: WordRequirement[] };
}

export interface ChapterDefinition {
  roomId: string;
  title: string;
  explore: MissionDefinition[];
  challenges: MissionDefinition[];
  makeover: MissionDefinition;
  final: MissionDefinition;
  hiddenObjects: { target: string; prompt: ByLevel<string> }[];
  designerTasks: { checks: SpatialCheck[]; prompt: ByLevel<string> }[];
  sortGame: { bins: { id: string; label: string; icon: string }[]; items: { word: string; bin: string; level: Level }[] };
  scenarios: Scenario[];
  sentences: { text: string; level: Level }[];
  prepositions: { sentence: string; answer: string; options: string[]; level: Level }[];
}

const ORDER: Level[] = ['A1', 'A2', 'B1', 'B2'];

/** Picks the version for this level, or the closest lower one. */
export function forLevel<T>(value: ByLevel<T>, level: Level): T {
  for (let i = ORDER.indexOf(level); i >= 0; i--) {
    const v = value[ORDER[i] as keyof ByLevel<T>];
    if (v !== undefined) return v as T;
  }
  return value.A1;
}
