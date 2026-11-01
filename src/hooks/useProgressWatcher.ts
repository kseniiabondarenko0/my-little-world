import { useEffect } from 'react';
import { useProgress } from '../progression/progressStore';
import { useLayout } from '../rooms/layoutStore';
import { useUI } from './useUIStore';
import { getRoom, LOCATIONS } from '../rooms';
import { newlyEarnedAchievements, roomCompletion } from '../progression/rules';

// Watches progress and layout; awards achievements and completes rooms automatically.

export function useProgressWatcher() {
  useEffect(() => {
    const check = () => {
      const progress = useProgress.getState();
      const rooms = useLayout.getState().rooms;
      const room = getRoom(progress.currentRoomId);
      const toast = useUI.getState().pushToast;

      if (!progress.completedRooms.includes(room.id) && roomCompletion(room, progress, rooms[room.id] ?? []) === 100) {
        progress.completeRoom(room.id);
        const next = LOCATIONS.find((l) => l.id === room.nextRoom);
        toast({
          icon: '🏆',
          title: `${room.name} complete!`,
          text: next ? `The ${next.name.toLowerCase()} is next — coming soon!` : 'Amazing work!',
          tone: 'success',
        });
      }

      for (const a of newlyEarnedAchievements(useProgress.getState(), rooms)) {
        useProgress.getState().unlockAchievement(a.id);
        toast({ icon: a.icon, title: `Achievement: ${a.title}`, text: a.description, tone: 'success' });
      }
    };
    check();
    const offProgress = useProgress.subscribe(check);
    const offLayout = useLayout.subscribe(check);
    return () => {
      offProgress();
      offLayout();
    };
  }, []);
}
