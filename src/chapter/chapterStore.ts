import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '../save/storage';

// Chapter progress per room: finished tasks, chosen mini-games, inspected objects,
// and the student's written answers (so a teacher can read them in the profile).

export interface Writing {
  id: string;
  title: string;
  prompt: string;
  text: string;
  at: number;
}

export interface RoomChapter {
  done: string[];
  picks: string[];
  inspected: string[];
  writings: Writing[];
}

const emptyRoom = (): RoomChapter => ({ done: [], picks: [], inspected: [], writings: [] });

interface ChapterState {
  rooms: Record<string, RoomChapter>;
  complete: (roomId: string, taskId: string) => boolean;
  setPicks: (roomId: string, picks: string[]) => void;
  inspect: (roomId: string, objectId: string) => void;
  addWriting: (roomId: string, writing: Omit<Writing, 'at'>) => void;
  reset: () => void;
}

export const EMPTY_CHAPTER = emptyRoom();

export const useChapter = create<ChapterState>()(
  persist(
    (set, get) => {
      const patch = (roomId: string, fn: (r: RoomChapter) => Partial<RoomChapter>) =>
        set((s) => {
          const room = s.rooms[roomId] ?? emptyRoom();
          return { rooms: { ...s.rooms, [roomId]: { ...room, ...fn(room) } } };
        });
      return {
        rooms: {},
        /** Returns true if the task was newly completed. */
        complete: (roomId, taskId) => {
          if ((get().rooms[roomId] ?? EMPTY_CHAPTER).done.includes(taskId)) return false;
          patch(roomId, (r) => ({ done: [...r.done, taskId] }));
          return true;
        },
        setPicks: (roomId, picks) => patch(roomId, () => ({ picks })),
        inspect: (roomId, objectId) =>
          patch(roomId, (r) => (r.inspected.includes(objectId) ? {} : { inspected: [...r.inspected, objectId] })),
        addWriting: (roomId, writing) =>
          patch(roomId, (r) => ({ writings: [...r.writings.filter((w) => w.id !== writing.id), { ...writing, at: Date.now() }] })),
        reset: () => set({ rooms: {} }),
      };
    },
    { name: 'chapter', version: 1, storage: createJSONStorage(() => safeStorage) },
  ),
);
