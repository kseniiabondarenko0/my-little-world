import type { ChapterDefinition } from '../../chapter/types';
import { bedroomChapter } from './bedroom';
import { COURSE_CONTENT } from '../courses';
import { ACTIVE_COURSE } from '../../courses/active';

// One chapter per playable room. Add new rooms' chapters here.
export const CHAPTERS: Record<string, ChapterDefinition> = {
  bedroom: bedroomChapter,
};

/** German / Polish chapters replace the English one where they exist (see src/data/courses). */
export function getChapter(roomId: string): ChapterDefinition {
  return COURSE_CONTENT[ACTIVE_COURSE]?.chapters[roomId] ?? CHAPTERS[roomId] ?? bedroomChapter;
}
