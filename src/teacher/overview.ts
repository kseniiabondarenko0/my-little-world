import type { Course, Level, PlacedItem } from '../types/game';
import type { PlayerProfile } from '../player/types';
import type { RoomChapter, Writing } from '../chapter/chapterStore';
import { EMPTY_CHAPTER } from '../chapter/chapterStore';
import { buildStages, chapterPercent } from '../chapter/stages';
import { getChapter } from '../data/chapters';
import { getRoom, DEFAULT_ROOM_ID } from '../rooms';
import { ENGLISH_WORDS } from '../data/content';
import { wordsForCourse } from '../data/courses';
import { FURNITURE } from '../data/furniture';
import { DEFAULT_COURSE, isCourse } from '../courses/courses';
import { masteryOf, type WordProgress } from '../learning/srs';
import { readPlayerStore } from '../save/storage';

// Teacher overview: one row per player on this device, read straight from each
// player's save, so it works without switching player.

export interface PlayerSummary {
  player: PlayerProfile;
  /** The language this player is learning; each course has its own save. */
  course: Course;
  level: Level;
  roomId: string;
  roomName: string;
  /** Current stage of the current room's chapter, or null when the chapter is finished. */
  stage: { index: number; title: string; icon: string } | null;
  stageCount: number;
  percent: number;
  mastered: number;
  toRevise: number;
  totalWords: number;
  xp: number;
  writings: (Writing & { roomId: string })[];
}

interface SavedProgress {
  words?: Record<string, WordProgress>;
  unlocked?: string[];
  currentRoomId?: string;
  level?: Level;
  xp?: number;
}

export interface SavedData {
  progress: SavedProgress | null;
  chapter: { rooms?: Record<string, RoomChapter> } | null;
  layout: { rooms?: Record<string, PlacedItem[]> } | null;
}

export const courseOf = (player: PlayerProfile): Course => (isCourse(player.course) ? player.course : DEFAULT_COURSE);

export function readSaves(playerId: string, course: Course = DEFAULT_COURSE): SavedData {
  return {
    progress: readPlayerStore(playerId, 'progress', course),
    chapter: readPlayerStore(playerId, 'chapter', course),
    layout: readPlayerStore(playerId, 'layout', course),
  };
}

const objectWordIds = new Set(FURNITURE.map((f) => f.wordId));

export function summarise(player: PlayerProfile, saved: SavedData): PlayerSummary {
  const course = courseOf(player);
  const courseWords = wordsForCourse(ENGLISH_WORDS, course, objectWordIds);
  const p = saved.progress ?? {};
  const words = p.words ?? {};
  const level = p.level ?? 'A1';
  const roomId = p.currentRoomId ?? DEFAULT_ROOM_ID;
  const room = getRoom(roomId);
  const chapterRooms = saved.chapter?.rooms ?? {};
  const state = { ...EMPTY_CHAPTER, ...chapterRooms[roomId] };
  const stages = buildStages({
    chapter: getChapter(roomId),
    room,
    level,
    state,
    unlocked: p.unlocked ?? [],
    items: saved.layout?.rooms?.[roomId] ?? [],
    words,
  });
  const index = stages.findIndex((s) => !s.done);
  const mastery = courseWords.map((w) => masteryOf(words[w.id]));
  const writings = Object.entries(chapterRooms)
    .flatMap(([rid, c]) => (c.writings ?? []).map((w) => ({ ...w, roomId: rid })))
    .sort((a, b) => b.at - a.at);

  return {
    player,
    course,
    level,
    roomId,
    roomName: room.name,
    stage: index === -1 ? null : { index: index + 1, title: stages[index].title, icon: stages[index].icon },
    stageCount: stages.length,
    percent: chapterPercent(stages),
    mastered: mastery.filter((m) => m === 'mastered').length,
    toRevise: mastery.filter((m) => m === 'revise').length,
    totalWords: courseWords.length,
    xp: p.xp ?? 0,
    writings,
  };
}

export function summariseAll(players: PlayerProfile[]): PlayerSummary[] {
  return players.map((pl) => summarise(pl, readSaves(pl.id, courseOf(pl))));
}
