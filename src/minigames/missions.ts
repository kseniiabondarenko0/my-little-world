import type { Level } from '../types/game';
import { forLevel, type ChapterDefinition, type MissionDefinition } from '../chapter/types';
import { shuffle } from '../activities/engine';

// Builds the 3D-room mini-games from chapter content, with fresh picks each time.

export function hiddenObjectsMission(chapter: ChapterDefinition, level: Level): MissionDefinition {
  const picks = shuffle(chapter.hiddenObjects).slice(0, 6);
  const steps = picks.map((h) => ({ type: 'find' as const, prompt: forLevel(h.prompt, level), targets: [h.target] }));
  return {
    id: 'hidden', title: 'Hidden Objects', icon: '🔎', xp: 40,
    intro: { A1: 'Read the clue. Click the right object in your room.' },
    steps: { A1: steps },
  };
}

export function interiorDesignerMission(chapter: ChapterDefinition, level: Level): MissionDefinition {
  const picks = shuffle(chapter.designerTasks).slice(0, 3);
  const steps = picks.map((t) => ({ type: 'place' as const, prompt: forLevel(t.prompt, level), checks: t.checks }));
  return {
    id: 'designer', title: 'Interior Designer', icon: '📐', xp: 40,
    intro: { A1: 'Move the furniture to follow each instruction, then press Check.' },
    steps: { A1: steps },
  };
}

/** Finds the mission for a chapter task. */
export function missionForTask(chapter: ChapterDefinition, taskId: string, level: Level): MissionDefinition | null {
  if (taskId === 'makeover') return chapter.makeover;
  if (taskId === 'final') return chapter.final;
  if (taskId === 'mini:hidden') return hiddenObjectsMission(chapter, level);
  if (taskId === 'mini:designer') return interiorDesignerMission(chapter, level);
  const [group, id] = taskId.split(':');
  if (group === 'explore') return chapter.explore.find((m) => m.id === id) ?? null;
  if (group === 'challenge') return chapter.challenges.find((m) => m.id === id) ?? null;
  return null;
}
