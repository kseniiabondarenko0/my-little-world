import { useEffect } from 'react';
import { useProgress } from '../progression/progressStore';
import { useLayout } from '../rooms/layoutStore';
import { useChapter } from '../chapter/chapterStore';
import { useUI } from './useUIStore';
import { getRoom, LOCATIONS } from '../rooms';
import { newlyEarnedAchievements } from '../progression/rules';
import { completeTask, currentStages } from '../progression/actions';

// Watches progress; completes automatic chapter tasks, finishes rooms and awards achievements.

const AUTO_TASKS = ['movein:unlock', 'movein:place', 'explore:inspect', 'vocab:mastery'];
let checking = false;

export function useProgressWatcher() {
  useEffect(() => {
    const check = () => {
      if (checking) return;
      checking = true;
      try {
        const progress = useProgress.getState();
        const room = getRoom(progress.currentRoomId);
        const toast = useUI.getState().pushToast;
        const stages = currentStages();
        const done = useChapter.getState().rooms[room.id]?.done ?? [];

        // Tasks that complete themselves (unlock everything, place everything...). Once done they stay done.
        for (const t of stages.flatMap((s) => s.tasks)) {
          if (AUTO_TASKS.includes(t.id) && t.done && !done.includes(t.id)) completeTask(t.id, t.title, t.xp);
        }

        if (!progress.completedRooms.includes(room.id) && stages.every((s) => s.done)) {
          progress.completeRoom(room.id);
          const next = LOCATIONS.find((l) => l.id === room.nextRoom);
          toast({ icon: '🏆', title: `${room.name} complete!`, text: next ? `The ${next.name.toLowerCase()} is next — coming soon!` : 'Amazing work!', tone: 'success', avatar: true });
        }

        const stagesDone = currentStages().filter((s) => s.done).length;
        for (const a of newlyEarnedAchievements(useProgress.getState(), useLayout.getState().rooms, useChapter.getState().rooms, stagesDone)) {
          useProgress.getState().unlockAchievement(a.id);
          useUI.getState().cheerUp();
          toast({ icon: a.icon, title: `Achievement: ${a.title}`, text: a.description, tone: 'success', avatar: true });
        }
      } finally {
        checking = false;
      }
    };
    check();
    const offs = [useProgress.subscribe(check), useLayout.subscribe(check), useChapter.subscribe(check)];
    return () => offs.forEach((off) => off());
  }, []);
}
