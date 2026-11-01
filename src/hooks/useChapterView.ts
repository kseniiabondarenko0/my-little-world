import { useMemo } from 'react';
import { useProgress } from '../progression/progressStore';
import { useLayout, EMPTY_ITEMS } from '../rooms/layoutStore';
import { useChapter, EMPTY_CHAPTER } from '../chapter/chapterStore';
import { getRoom } from '../rooms';
import { getChapter } from '../data/chapters';
import { buildStages, chapterPercent } from '../chapter/stages';

/** The current room's chapter stages, kept up to date with progress. */
export function useChapterView() {
  const roomId = useProgress((s) => s.currentRoomId);
  const level = useProgress((s) => s.level);
  const unlocked = useProgress((s) => s.unlocked);
  const words = useProgress((s) => s.words);
  const items = useLayout((s) => s.rooms[roomId] ?? EMPTY_ITEMS);
  const state = useChapter((s) => s.rooms[roomId] ?? EMPTY_CHAPTER);

  return useMemo(() => {
    const room = getRoom(roomId);
    const stages = buildStages({ chapter: getChapter(roomId), room, level, state, unlocked, items, words });
    return { stages, percent: chapterPercent(stages), room };
  }, [roomId, level, unlocked, words, items, state]);
}
