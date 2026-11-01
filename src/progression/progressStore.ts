import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Level, NativeLanguage } from '../types/game';
import { safeStorage } from '../save/storage';
import { DEFAULT_ROOM_ID } from '../rooms';

// The student's learning progress (saved automatically).

export interface WordProgress {
  correct: number;
  attempts: number;
}

interface ProgressData {
  stars: number;
  unlocked: string[];
  practised: string[];
  words: Record<string, WordProgress>;
  achievements: string[];
  completedRooms: string[];
  perfectSessions: number;
  seenIntro: boolean;
  currentRoomId: string;
  language: NativeLanguage;
  level: Level;
}

interface ProgressActions {
  recordAnswer: (wordId: string, correct: boolean, firstTry: boolean) => void;
  unlockObject: (id: string) => void;
  markPractised: (id: string) => void;
  addPerfectSession: () => void;
  unlockAchievement: (id: string) => void;
  completeRoom: (id: string) => void;
  setSeenIntro: () => void;
  setLanguage: (language: NativeLanguage) => void;
  setLevel: (level: Level) => void;
  reset: () => void;
}

const initial: ProgressData = {
  stars: 0,
  unlocked: [],
  practised: [],
  words: {},
  achievements: [],
  completedRooms: [],
  perfectSessions: 0,
  seenIntro: false,
  currentRoomId: DEFAULT_ROOM_ID,
  language: 'uk',
  level: 'A1',
};

const addUnique = (list: string[], id: string) => (list.includes(id) ? list : [...list, id]);

export const useProgress = create<ProgressData & ProgressActions>()(
  persist(
    (set) => ({
      ...initial,
      recordAnswer: (wordId, correct, firstTry) =>
        set((s) => {
          const w = s.words[wordId] ?? { correct: 0, attempts: 0 };
          return {
            words: { ...s.words, [wordId]: { correct: w.correct + (correct ? 1 : 0), attempts: w.attempts + 1 } },
            stars: s.stars + (correct && firstTry ? 1 : 0),
          };
        }),
      unlockObject: (id) => set((s) => ({ unlocked: addUnique(s.unlocked, id) })),
      markPractised: (id) => set((s) => ({ practised: addUnique(s.practised, id) })),
      addPerfectSession: () => set((s) => ({ perfectSessions: s.perfectSessions + 1 })),
      unlockAchievement: (id) => set((s) => ({ achievements: addUnique(s.achievements, id) })),
      completeRoom: (id) => set((s) => ({ completedRooms: addUnique(s.completedRooms, id) })),
      setSeenIntro: () => set({ seenIntro: true }),
      setLanguage: (language) => set({ language }),
      setLevel: (level) => set({ level }),
      // Keep language and level so the teacher's setup survives a reset.
      reset: () => set((s) => ({ ...initial, language: s.language, level: s.level })),
    }),
    { name: 'progress', version: 1, storage: createJSONStorage(() => safeStorage) },
  ),
);
