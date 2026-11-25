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

/**
 * One room of a starter course, in src/data/courses/<lang>/<room>.ts.
 * objects: the room's 3D objects, keyed by object word id:
 *   [word, definition, example, ...grammar forms the language needs (see the language's index.ts)].
 * words: every other word of the room, keyed by English word id.
 * The chapter for the room is built from the English chapter's structure plus this text
 * (see roomChapter.ts), unless the language gives a hand-written chapter.
 */
export interface RoomCourse {
  /** Chapter title, e.g. "Meine Küche". */
  title: string;
  /** Labels for the English chapter's sort-game groups, by group id. */
  bins: Record<string, string>;
  objects: Record<string, [word: string, definition: string, example: string, ...forms: string[]]>;
  words: Record<string, string>;
}
