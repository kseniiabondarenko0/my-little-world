import type { ChapterDefinition } from '../../chapter/types';

/**
 * One word in a starter course, keyed by the English word's id (so progress, 3D objects
 * and missions stay linked). Level, category and linked object come from the English word.
 * translations: leave out to reuse the English word's Ukrainian/Russian translations.
 */
export interface CourseWord {
  word: string;
  definition?: string;
  example?: string;
  translations?: { uk: string; ru: string };
}

export interface CourseContent {
  /** Words by English word id. Words not listed here are not part of the course. */
  words: Record<string, CourseWord>;
  /** Chapters by room id. A room without one uses the English chapter. */
  chapters: Record<string, ChapterDefinition>;
}
