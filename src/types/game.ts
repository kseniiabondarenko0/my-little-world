// Shared types for the whole game. Content files in /data and /rooms follow these shapes.

export type Level = 'A1' | 'A2' | 'B1' | 'B2';

/** One vocabulary word. Lives in src/data/vocabulary/*. */
export interface VocabularyWord {
  id: string;
  word: string;
  level: Level;
  topic: string;
  /** Group shown in the Word Book, e.g. 'furniture', 'clothes', 'verbs'. */
  category: string;
  /** The 3D object this word belongs to. Practising that object can ask about this word. */
  objectId?: string;
  /** Simple English explanation, shown after answering. */
  definition?: string;
  /** Example sentence, shown after answering. */
  example?: string;
  /** Optional translations by language code, e.g. { uk: 'ліжко', es: 'cama' }. */
  translations?: Record<string, string>;
}

export type ActivityType = 'vocabulary' | 'multipleChoice' | 'spelling' | 'sentence' | 'translation';

/** Students' home language, used by translation activities. */
export type NativeLanguage = 'uk' | 'ru';

/**
 * 'lesson'   = played to unlock an object (from the catalogue).
 * 'practice' = played by clicking an object already placed in the room.
 */
export type ActivityStage = 'lesson' | 'practice';

interface ActivityBase {
  id: string;
  wordId: string;
  stage: ActivityStage;
}

/** "What is this?" — shows the 3D object, the student picks the word. */
export interface VocabularyActivityDef extends ActivityBase {
  type: 'vocabulary';
  /** Wrong answers to show. If omitted, other words from the same topic are used. */
  distractors?: string[];
}

/** A question with several answers. `options` must include the `answer`. */
export interface MultipleChoiceActivityDef extends ActivityBase {
  type: 'multipleChoice';
  question: string;
  answer: string;
  options: string[];
}

/** Fill in the missing letters: B _ D. */
export interface SpellingActivityDef extends ActivityBase {
  type: 'spelling';
  /** Letter positions to hide (0 = first letter). If omitted, vowels are hidden. */
  hide?: number[];
}

/** Sentence with a gap written as ___ . `options` must include the `answer`. */
export interface SentenceActivityDef extends ActivityBase {
  type: 'sentence';
  sentence: string;
  answer: string;
  options: string[];
}

/**
 * "Translate: «ліжко»" — the student picks the English word.
 * Created automatically for practice from the word's `translations`,
 * but you can also add it to a lesson by hand.
 */
export interface TranslationActivityDef extends ActivityBase {
  type: 'translation';
  distractors?: string[];
}

export type ActivityDefinition =
  | VocabularyActivityDef
  | MultipleChoiceActivityDef
  | SpellingActivityDef
  | SentenceActivityDef
  | TranslationActivityDef;

/**
 * floor = stands on the floor (bed, desk...)
 * rug   = lies flat on the floor, other things can stand on it
 * small = can stand on the floor OR on top of furniture with a `surfaceHeight`
 * wall  = hangs on a wall
 */
export type MountType = 'floor' | 'rug' | 'small' | 'wall';

/** One piece of furniture in the catalogue. Lives in src/data/furniture.ts. */
export interface FurnitureDefinition {
  id: string;
  wordId: string;
  name: string;
  /** Key of the 3D model in src/objects/models/index.ts */
  model: string;
  mount: MountType;
  /** [width, height, depth] in metres. */
  size: [number, number, number];
  /** Small objects can be put on top of this furniture at this height. */
  surfaceHeight?: number;
  /** Stars the student needs before the unlock lesson opens. */
  starsRequired: number;
  /** Emoji used while the 3D thumbnail is loading. */
  icon: string;
}

export type WallSide = 'back' | 'left';

/** An object placed in a room (saved to localStorage). */
export interface PlacedItem {
  uid: string;
  objectId: string;
  x: number;
  y: number;
  z: number;
  /** Quarter turns: 0, 1, 2, 3 */
  rot: number;
  wall?: WallSide;
}

/** A window or door. `center` is measured along the wall (x for back, z for left). */
export interface WallOpening {
  wall: WallSide;
  center: number;
  bottom: number;
  width: number;
  height: number;
}

export interface RoomDefinition {
  id: string;
  name: string;
  icon: string;
  size: { width: number; depth: number; height: number };
  theme: {
    wall: string;
    wallLower: string;
    trim: string;
    floor: [string, string];
    base: string;
    curtain: string;
  };
  window?: WallOpening;
  door?: WallOpening;
  /** Furniture ids available in this room, in catalogue order. */
  objects: string[];
  nextRoom?: string;
}
