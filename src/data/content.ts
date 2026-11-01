import type { ActivityDefinition, FurnitureDefinition, Level, VocabularyWord } from '../types/game';
import { bedroomWords } from './vocabulary/bedroom';
import { bedroomExtraWords } from './vocabulary/bedroom-extra';
import { bedroomActivities } from './activities/bedroom';
import { FURNITURE } from './furniture';

// All content in one place. When you add a new room's files, add them to these lists.
export const ALL_WORDS: VocabularyWord[] = [...bedroomWords, ...bedroomExtraWords];
export const ALL_ACTIVITIES: ActivityDefinition[] = [...bedroomActivities];

const wordMap = new Map(ALL_WORDS.map((w) => [w.id, w]));
const furnitureMap = new Map(FURNITURE.map((f) => [f.id, f]));

export function getWord(id: string): VocabularyWord {
  const word = wordMap.get(id);
  if (!word) throw new Error(`Unknown word "${id}". Add it to src/data/vocabulary.`);
  return word;
}

export function getFurniture(id: string): FurnitureDefinition {
  const def = furnitureMap.get(id);
  if (!def) throw new Error(`Unknown furniture "${id}". Add it to src/data/furniture.ts.`);
  return def;
}

export function getActivitiesForWord(wordId: string): ActivityDefinition[] {
  return ALL_ACTIVITIES.filter((a) => a.wordId === wordId);
}

export function getWordsByTopic(topic: string): VocabularyWord[] {
  return ALL_WORDS.filter((w) => w.topic === topic);
}

const LEVEL_ORDER: Level[] = ['A1', 'A2', 'B1', 'B2'];

export function levelAtMost(level: Level, max: Level): boolean {
  return LEVEL_ORDER.indexOf(level) <= LEVEL_ORDER.indexOf(max);
}

/** Extra words linked to a 3D object (not its main word), up to a level. */
export function getLinkedWords(objectId: string, mainWordId: string, maxLevel: Level): VocabularyWord[] {
  return ALL_WORDS.filter((w) => w.objectId === objectId && w.id !== mainWordId && levelAtMost(w.level, maxLevel));
}

export const LEVELS = LEVEL_ORDER;
