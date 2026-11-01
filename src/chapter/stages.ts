import type { Level, PlacedItem, RoomDefinition } from '../types/game';
import type { ChapterDefinition } from './types';
import type { RoomChapter } from './chapterStore';
import type { WordProgress } from '../learning/srs';
import { MASTERED_BOX } from '../learning/srs';
import { wordsForRoom } from '../data/content';
import { MINIGAMES } from '../minigames/registry';
import { shuffle } from '../activities/engine';

// The 7 stages of a room chapter, built from the chapter content.
// Stages open one after another; the room is complete when the final mission is done.

export type TaskKind = 'auto' | 'mission' | 'training' | 'minigame';

export interface Task {
  id: string;
  title: string;
  icon: string;
  kind: TaskKind;
  done: boolean;
  missionId?: string;
  gameId?: string;
  progress?: [number, number];
  xp: number;
}

export interface Stage {
  id: string;
  title: string;
  icon: string;
  minutes: number;
  description: string;
  tasks: Task[];
  done: boolean;
  unlocked: boolean;
}

export const MASTERY_GOAL = 10;

interface Inputs {
  chapter: ChapterDefinition;
  room: RoomDefinition;
  level: Level;
  state: RoomChapter;
  unlocked: string[];
  items: PlacedItem[];
  words: Record<string, WordProgress>;
}

export function masteredCount(topic: string, level: Level, words: Record<string, WordProgress>): number {
  return wordsForRoom(topic, level).filter((w) => (words[w.id]?.box ?? 0) >= MASTERED_BOX).length;
}

/** Three mini-games for this playthrough: one played in the 3D room, two others. */
export function choosePicks(): string[] {
  const room = shuffle(MINIGAMES.filter((g) => g.kind === 'mission')).slice(0, 1);
  const others = shuffle(MINIGAMES.filter((g) => g.kind === 'modal')).slice(0, 2);
  return shuffle([...room, ...others]).map((g) => g.id);
}

export function buildStages({ chapter, room, level, state, unlocked, items, words }: Inputs): Stage[] {
  const done = (id: string) => state.done.includes(id);
  const total = room.objects.length;
  const unlockedCount = room.objects.filter((id) => unlocked.includes(id)).length;
  const placedCount = room.objects.filter((id) => items.some((i) => i.objectId === id)).length;
  const inspectedCount = room.objects.filter((id) => state.inspected.includes(id)).length;
  const mastered = masteredCount(room.id, level, words);
  const picks = state.picks.length ? state.picks : [];

  const stages: Omit<Stage, 'done' | 'unlocked'>[] = [
    {
      id: 'move-in', title: 'Move In', icon: '📦', minutes: 8,
      description: 'Learn the furniture words, unlock every piece and furnish your room.',
      tasks: [
        { id: 'movein:unlock', title: 'Unlock all the furniture', icon: '🔓', kind: 'auto', done: done('movein:unlock') || unlockedCount === total, progress: [unlockedCount, total], xp: 50 },
        { id: 'movein:place', title: 'Put everything in your room', icon: '🛋️', kind: 'auto', done: done('movein:place') || placedCount === total, progress: [placedCount, total], xp: 30 },
      ],
    },
    {
      id: 'explore', title: 'Explore the Room', icon: '🔍', minutes: 4,
      description: 'Tap objects to learn about them, then complete the exploration missions.',
      tasks: [
        { id: 'explore:inspect', title: 'Tap every object to read about it', icon: '👆', kind: 'auto', done: done('explore:inspect') || inspectedCount === total, progress: [inspectedCount, total], xp: 20 },
        ...chapter.explore.map((m) => ({ id: `explore:${m.id}`, title: m.title, icon: m.icon, kind: 'mission' as const, missionId: m.id, done: done(`explore:${m.id}`), xp: m.xp ?? 20 })),
      ],
    },
    {
      id: 'vocabulary', title: 'Vocabulary Training', icon: '🧠', minutes: 7,
      description: 'Eight kinds of exercises. Words you get wrong come back later in a new way.',
      tasks: [
        { id: 'vocab:session-1', title: 'Training session 1', icon: '🏋️', kind: 'training', done: done('vocab:session-1'), xp: 40 },
        { id: 'vocab:session-2', title: 'Training session 2', icon: '🏋️', kind: 'training', done: done('vocab:session-2'), xp: 40 },
        { id: 'vocab:mastery', title: `Master ${MASTERY_GOAL} words`, icon: '⭐', kind: 'training', done: done('vocab:mastery') || mastered >= MASTERY_GOAL, progress: [Math.min(mastered, MASTERY_GOAL), MASTERY_GOAL], xp: 40 },
      ],
    },
    {
      id: 'minigames', title: 'Mini-Games', icon: '🎲', minutes: 8,
      description: 'Three games, chosen for you. You can replay any of them.',
      tasks: picks.map((id) => {
        const g = MINIGAMES.find((m) => m.id === id)!;
        return { id: `mini:${id}`, title: g.title, icon: g.icon, kind: 'minigame' as const, gameId: id, done: done(`mini:${id}`), xp: 40 };
      }),
    },
    {
      id: 'challenges', title: 'Real-Life Challenges', icon: '🏠', minutes: 8,
      description: 'Practical missions in your 3D room.',
      tasks: chapter.challenges.map((m) => ({ id: `challenge:${m.id}`, title: m.title, icon: m.icon, kind: 'mission' as const, missionId: m.id, done: done(`challenge:${m.id}`), xp: m.xp ?? 60 })),
    },
    {
      id: 'makeover', title: 'Room Makeover', icon: '🎨', minutes: 6,
      description: 'Rearrange your room by following English instructions.',
      tasks: [{ id: 'makeover', title: chapter.makeover.title, icon: chapter.makeover.icon, kind: 'mission', missionId: chapter.makeover.id, done: done('makeover'), xp: chapter.makeover.xp ?? 80 }],
    },
    {
      id: 'final', title: 'Final Mission', icon: '🏆', minutes: 7,
      description: 'Use everything you’ve learned.',
      tasks: [{ id: 'final', title: chapter.final.title, icon: chapter.final.icon, kind: 'mission', missionId: chapter.final.id, done: done('final'), xp: chapter.final.xp ?? 150 }],
    },
  ];

  let open = true;
  return stages.map((s) => {
    const complete = s.tasks.length > 0 && s.tasks.every((t) => t.done);
    const stage = { ...s, done: complete, unlocked: open };
    open = open && complete;
    return stage;
  });
}

export function chapterPercent(stages: Stage[]): number {
  const tasks = stages.flatMap((s) => s.tasks);
  // Mini-game tasks exist only once picked; count them as 3 until then.
  const pending = stages.find((s) => s.id === 'minigames')?.tasks.length ? 0 : 3;
  const all = tasks.length + pending;
  return all ? Math.round((tasks.filter((t) => t.done).length / all) * 100) : 0;
}

export function findTask(stages: Stage[], taskId: string): Task | undefined {
  return stages.flatMap((s) => s.tasks).find((t) => t.id === taskId);
}
