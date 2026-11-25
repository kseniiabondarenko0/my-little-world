import type { ChapterDefinition } from '../../chapter/types';
import { bedroomChapter } from './bedroom';
import { ENGLISH_CHAPTERS } from './english';
import { COURSE_CONTENT } from '../courses';
import { ACTIVE_COURSE } from '../../courses/active';

// The English chapters (one per playable room) are listed in english.ts.
export const CHAPTERS: Record<string, ChapterDefinition> = ENGLISH_CHAPTERS;

/** German / Polish chapters replace the English one where they exist (see src/data/courses). */
export function getChapter(roomId: string): ChapterDefinition {
  return COURSE_CONTENT[ACTIVE_COURSE]?.chapters[roomId] ?? CHAPTERS[roomId] ?? bedroomChapter;
}
