import type { ActivityDefinition, FurnitureDefinition, Level, VocabularyWord } from '../types/game';
import { bedroomWords } from './vocabulary/bedroom';
import { bedroomExtraWords } from './vocabulary/bedroom-extra';
import { bedroomActivities } from './activities/bedroom';
import { kitchenWords } from './vocabulary/kitchen';
import { kitchenExtraWords } from './vocabulary/kitchen-extra';
import { kitchenActivities } from './activities/kitchen';
import { bathroomWords } from './vocabulary/bathroom';
import { bathroomExtraWords } from './vocabulary/bathroom-extra';
import { bathroomActivities } from './activities/bathroom';
import { livingRoomWords } from './vocabulary/livingroom';
import { livingRoomExtraWords } from './vocabulary/livingroom-extra';
import { livingRoomActivities } from './activities/livingroom';
import { hallwayWords } from './vocabulary/hallway';
import { hallwayExtraWords } from './vocabulary/hallway-extra';
import { hallwayActivities } from './activities/hallway';
import { basementWords } from './vocabulary/basement';
import { basementExtraWords } from './vocabulary/basement-extra';
import { basementActivities } from './activities/basement';
import { entranceWords } from './vocabulary/entrance';
import { entranceExtraWords } from './vocabulary/entrance-extra';
import { entranceActivities } from './activities/entrance';
import { schoolWords } from './vocabulary/school';
import { schoolExtraWords } from './vocabulary/school-extra';
import { schoolActivities } from './activities/school';
import { officeWords } from './vocabulary/office';
import { officeExtraWords } from './vocabulary/office-extra';
import { officeActivities } from './activities/office';
import { hospitalWords } from './vocabulary/hospital';
import { hospitalExtraWords } from './vocabulary/hospital-extra';
import { hospitalActivities } from './activities/hospital';
import { supermarketWords } from './vocabulary/supermarket';
import { supermarketExtraWords } from './vocabulary/supermarket-extra';
import { supermarketActivities } from './activities/supermarket';
import { restaurantWords } from './vocabulary/restaurant';
import { restaurantExtraWords } from './vocabulary/restaurant-extra';
import { restaurantActivities } from './activities/restaurant';
import { FURNITURE } from './furniture';
import { activitiesForCourse, wordsForCourse } from './courses';
import { ACTIVE_COURSE } from '../courses/active';

// All content in one place. When you add a new room's files, add them to these lists.
export const ENGLISH_WORDS: VocabularyWord[] = [...bedroomWords, ...bedroomExtraWords, ...kitchenWords, ...kitchenExtraWords, ...bathroomWords, ...bathroomExtraWords,
  ...livingRoomWords, ...livingRoomExtraWords, ...hallwayWords, ...hallwayExtraWords,
  ...basementWords, ...basementExtraWords, ...entranceWords, ...entranceExtraWords,
  ...schoolWords, ...schoolExtraWords,
  ...officeWords, ...officeExtraWords,
  ...hospitalWords, ...hospitalExtraWords,
  ...supermarketWords, ...supermarketExtraWords,
  ...restaurantWords, ...restaurantExtraWords];
export const ENGLISH_ACTIVITIES: ActivityDefinition[] = [...bedroomActivities, ...kitchenActivities, ...bathroomActivities, ...livingRoomActivities, ...hallwayActivities, ...basementActivities, ...entranceActivities, ...schoolActivities, ...officeActivities, ...hospitalActivities, ...supermarketActivities, ...restaurantActivities];

// The course being learned (English, German, Polish) decides the words and activities.
// Other courses reuse the English word ids, so rooms and objects work the same.
const objectWordIdSet = new Set(FURNITURE.map((f) => f.wordId));
export const ALL_WORDS: VocabularyWord[] = wordsForCourse(ENGLISH_WORDS, ACTIVE_COURSE, objectWordIdSet);
export const ALL_ACTIVITIES: ActivityDefinition[] = activitiesForCourse(ENGLISH_ACTIVITIES, ACTIVE_COURSE);

const wordMap = new Map(ALL_WORDS.map((w) => [w.id, w]));
// Furniture names follow the course, so the catalogue shows "das Bett" or "łóżko".
const furnitureMap = new Map(FURNITURE.map((f) => [f.id, ACTIVE_COURSE === 'en' ? f : { ...f, name: wordMap.get(f.wordId)?.word ?? f.name }]));

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

const objectWordIds = objectWordIdSet;

/** True for the main word of a 3D object (it has a model to show). */
export function isObjectWord(w: VocabularyWord): boolean {
  return objectWordIds.has(w.id);
}

/** The 3D object whose main word this is. */
export function objectOfWord(w: VocabularyWord): string | undefined {
  return FURNITURE.find((f) => f.wordId === w.id)?.id;
}

/** All words of a room topic up to a level. */
export function wordsForRoom(topic: string, maxLevel: Level, category?: string): VocabularyWord[] {
  return ALL_WORDS.filter((w) => w.topic === topic && levelAtMost(w.level, maxLevel) && (!category || category === 'all' || w.category === category));
}
