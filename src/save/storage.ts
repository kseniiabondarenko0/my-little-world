import type { StateStorage } from 'zustand/middleware';
import type { Course } from '../types/game';
import { COURSES, DEFAULT_COURSE, isCourse } from '../courses/courses';

// Saved progress lives in the browser's localStorage.
// Each player on this device has their own save: "my-little-world:p:<playerId>:<store>".
// Each extra course (German, Polish) gets its own save next to it: "...:p:<playerId>:de:<store>",
// so learning German starts a fresh room. English keeps the original keys (old saves still load).
// Later this file is the one place to swap for cloud saves (student accounts).

export const PREFIX = 'my-little-world:';
const ACTIVE_KEY = `${PREFIX}active-player`;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Storage full or blocked (private mode): the game still works, it just won't save.
  }
}

/** The player whose save is loaded. Fixed for the lifetime of the page (switching reloads). */
export const ACTIVE_PLAYER_ID: string | null = read(ACTIVE_KEY);

function readCourse(): Course {
  try {
    const players = JSON.parse(read(`${PREFIX}players`) ?? '[]') as { id: string; course?: unknown }[];
    const course = players.find((p) => p.id === ACTIVE_PLAYER_ID)?.course;
    return isCourse(course) ? course : DEFAULT_COURSE;
  } catch {
    return DEFAULT_COURSE;
  }
}

/** The language the active player is learning. Fixed for the lifetime of the page (switching reloads). */
export const ACTIVE_COURSE: Course = readCourse();

const namespace = (playerId: string | null, course: Course = ACTIVE_COURSE) =>
  playerId ? `${PREFIX}p:${playerId}:${course === DEFAULT_COURSE ? '' : `${course}:`}` : PREFIX;

export const safeStorage: StateStorage = {
  getItem: (name) => read(namespace(ACTIVE_PLAYER_ID) + name),
  setItem: (name, value) => write(namespace(ACTIVE_PLAYER_ID) + name, value),
  removeItem: (name) => write(namespace(ACTIVE_PLAYER_ID) + name, null),
};

/** True if this player has a save for that course already. */
export function hasCourseSave(playerId: string, course: Course): boolean {
  return read(namespace(playerId, course) + 'progress') !== null;
}

/** Starts a course save with the student's home language, so they don't have to choose it again. */
export function seedCourseSave(playerId: string, course: Course, language: string) {
  if (hasCourseSave(playerId, course)) return;
  write(namespace(playerId, course) + 'progress', JSON.stringify({ state: { language, level: 'A1' }, version: 2 }));
}

export const STORE_NAMES = ['progress', 'layout', 'chapter'];

/** Makes another player active. The page must reload so every store loads that player's save. */
export function setActivePlayer(playerId: string | null) {
  write(ACTIVE_KEY, playerId);
}

/** Moves a save made before profiles existed (v0.1) into a player's own save. */
export function adoptLegacySave(playerId: string, course: Course = DEFAULT_COURSE) {
  for (const name of STORE_NAMES) {
    const legacy = read(PREFIX + name);
    if (legacy !== null && read(namespace(playerId, course) + name) === null) {
      write(namespace(playerId, course) + name, legacy);
      write(PREFIX + name, null);
    }
  }
}

export function deletePlayerSave(playerId: string) {
  for (const c of COURSES) for (const name of STORE_NAMES) write(namespace(playerId, c.id) + name, null);
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = read(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  write(PREFIX + key, JSON.stringify(value));
}

/** One player's saved stores for every course: course → store → the raw JSON zustand keeps. */
export type PlayerSave = Record<string, Record<string, string | null>>;

/** Everything one player has saved on this device, in every course they started. */
export function readPlayerSave(playerId: string): PlayerSave {
  const save: PlayerSave = {};
  for (const c of COURSES) {
    const stores = Object.fromEntries(STORE_NAMES.map((name) => [name, read(namespace(playerId, c.id) + name)]));
    if (Object.values(stores).some((v) => v !== null)) save[c.id] = stores;
  }
  return save;
}

/** Replaces one player's saves in every course. Courses and stores missing from `save` are cleared. */
export function writePlayerSave(playerId: string, save: PlayerSave) {
  for (const c of COURSES) for (const name of STORE_NAMES) write(namespace(playerId, c.id) + name, save[c.id]?.[name] ?? null);
}
