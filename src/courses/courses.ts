import type { Course } from '../types/game';

// The languages a player can learn. English is the full game; German and Polish
// are starter courses: every room and word, with A1 mission text and no side quests.
// To add a language: add it here and to the Course type, then add a folder in src/data/courses/.

export interface CourseInfo {
  id: Course;
  /** Name in English, used in the interface ("My German level"). */
  name: string;
  /** Name in the language itself, shown on the picker. */
  label: string;
  flag: string;
  /** Browser voice language for pronunciation. */
  speechLang: string;
  /** Starter courses have A1 mission text only and no side quests. */
  starter: boolean;
}

export const COURSES: CourseInfo[] = [
  { id: 'en', name: 'English', label: 'English', flag: '🇬🇧', speechLang: 'en-GB', starter: false },
  { id: 'de', name: 'German', label: 'Deutsch', flag: '🇩🇪', speechLang: 'de-DE', starter: true },
  { id: 'pl', name: 'Polish', label: 'Polski', flag: '🇵🇱', speechLang: 'pl-PL', starter: true },
];

export const DEFAULT_COURSE: Course = 'en';

export function courseInfo(id: Course): CourseInfo {
  return COURSES.find((c) => c.id === id) ?? COURSES[0];
}

export const isCourse = (v: unknown): v is Course => COURSES.some((c) => c.id === v);
