import type { PlacedItem, RoomDefinition } from '../types/game';
import { ACHIEVEMENTS, type AchievementDefinition } from '../data/achievements';
import { FURNITURE } from '../data/furniture';
import type { useProgress } from './progressStore';
import type { RoomChapter } from '../chapter/chapterStore';
import { MASTERED_BOX } from '../learning/srs';

// Progression rules: object status, room completion and achievement checks.

type Progress = ReturnType<typeof useProgress.getState>;

export type ObjectStatus = 'locked' | 'learn' | 'ready' | 'placed';

/** locked = needs more stars, learn = lesson available, ready = unlocked, placed = in the room. */
export function objectStatus(id: string, progress: Progress, items: PlacedItem[]): ObjectStatus {
  if (items.some((i) => i.objectId === id)) return 'placed';
  if (progress.unlocked.includes(id)) return 'ready';
  const def = FURNITURE.find((f) => f.id === id)!;
  return progress.stars >= def.starsRequired ? 'learn' : 'locked';
}

/**
 * Each object gives 3 steps: unlocked, placed, practised.
 * Room completion = steps done / all steps.
 */
export function roomCompletion(room: RoomDefinition, progress: Progress, items: PlacedItem[]): number {
  const total = room.objects.length * 3;
  let done = 0;
  for (const id of room.objects) {
    if (progress.unlocked.includes(id)) done++;
    if (items.some((i) => i.objectId === id)) done++;
    if (progress.practised.includes(id)) done++;
  }
  return Math.round((done / total) * 100);
}

export function newlyEarnedAchievements(
  progress: Progress,
  allItems: Record<string, PlacedItem[]>,
  chapters: Record<string, RoomChapter>,
  stagesDone: number,
): AchievementDefinition[] {
  const tasks = Object.values(chapters).flatMap((c) => c.done);
  const placed = Object.values(allItems).reduce((n, list) => n + list.length, 0);
  const correct = Object.values(progress.words).reduce((n, w) => n + w.correct, 0);
  const counts: Record<string, number> = {
    correctAnswers: correct,
    unlocked: progress.unlocked.length,
    placed,
    practised: progress.practised.length,
    stars: progress.stars,
    perfect: progress.perfectSessions,
    stages: stagesDone,
    minigames: tasks.filter((t) => t.startsWith('mini:')).length,
    missions: tasks.filter((t) => t.startsWith('challenge:')).length,
    mastered: Object.values(progress.words).filter((w) => (w.box ?? 0) >= MASTERED_BOX).length,
    xp: progress.xp,
    writings: Object.values(chapters).reduce((n, c) => n + c.writings.length, 0),
  };
  return ACHIEVEMENTS.filter((a) => {
    if (progress.achievements.includes(a.id)) return false;
    const c = a.condition;
    return c.type === 'roomComplete' ? progress.completedRooms.includes(c.roomId) : counts[c.type] >= c.value;
  });
}
