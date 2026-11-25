import type { ChapterDefinition } from '../../chapter/types';
import { bedroomChapter } from './bedroom';
import { kitchenChapter } from './kitchen';
import { bathroomChapter } from './bathroom';
import { livingRoomChapter } from './livingroom';
import { COURSE_CONTENT } from '../courses';
import { ACTIVE_COURSE } from '../../courses/active';

// One chapter per playable room. Add new rooms' chapters here.
export const CHAPTERS: Record<string, ChapterDefinition> = {
  bedroom: bedroomChapter,
  kitchen: kitchenChapter,
  bathroom: bathroomChapter,
  'living-room': livingRoomChapter,
};

/** German / Polish chapters replace the English one where they exist (see src/data/courses). */
export function getChapter(roomId: string): ChapterDefinition {
  return COURSE_CONTENT[ACTIVE_COURSE]?.chapters[roomId] ?? CHAPTERS[roomId] ?? bedroomChapter;
}
