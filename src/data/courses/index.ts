import type { ActivityDefinition, Course, VocabularyWord } from '../../types/game';
import type { CourseContent } from './types';
import { german } from './de';
import { polish } from './pl';

// Starter courses: German and Polish content laid over the English game.
// English is the base: rooms, 3D objects and word ids are shared by every course.

export const COURSE_CONTENT: Partial<Record<Course, CourseContent>> = { de: german, pl: polish };

/** The word list for a course. English = unchanged. */
export function wordsForCourse(english: VocabularyWord[], course: Course, objectWordIds: Set<string>): VocabularyWord[] {
  const content = COURSE_CONTENT[course];
  if (!content) return english;
  return english.flatMap((w) => {
    const c = content.words[w.id];
    // A 3D object's main word must exist, or the room can't be played: fall back to English.
    if (!c) return objectWordIds.has(w.id) ? [w] : [];
    return [{ ...w, word: c.word, definition: c.definition, example: c.example, translations: c.translations ?? w.translations }];
  });
}

/**
 * Lesson and practice activities for a course. The hand-written English questions
 * (sentence, multipleChoice) only make sense in English, so other courses keep the
 * word-based ones and get a translation question in each lesson instead.
 */
export function activitiesForCourse(english: ActivityDefinition[], course: Course): ActivityDefinition[] {
  if (!COURSE_CONTENT[course]) return english;
  const kept = english
    .filter((a) => a.type === 'vocabulary' || a.type === 'spelling' || a.type === 'translation')
    .map((a) => (a.type === 'spelling' ? { ...a, hide: undefined } : a));
  const lessonWords = [...new Set(kept.filter((a) => a.stage === 'lesson').map((a) => a.wordId))];
  const translations: ActivityDefinition[] = lessonWords.map((wordId) => ({ id: `${wordId}-translate`, wordId, stage: 'lesson', type: 'translation' }));
  return [...kept, ...translations];
}
