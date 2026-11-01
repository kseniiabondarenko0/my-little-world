import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Level, NativeLanguage } from '../types/game';
import { safeStorage } from '../save/storage';
import { DEFAULT_ROOM_ID } from '../rooms';
import { applyAnswer, emptyWord, type WordProgress } from '../learning/srs';

// The student's learning progress (saved automatically, one save per player).

export type { WordProgress };

interface ProgressData {
  stars: number;
  xp: number;
  /** Counts answers; used by spaced repetition. */
  tick: number;
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
  addXp: (amount: number) => void;
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
  xp: 0,
  tick: 0,
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
        set((s) => ({
          tick: s.tick + 1,
          words: { ...s.words, [wordId]: applyAnswer(s.words[wordId], correct, s.tick + 1) },
          stars: s.stars + (correct && firstTry ? 1 : 0),
          xp: s.xp + (correct ? (firstTry ? 5 : 2) : 0),
        })),
      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),
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
    {
      name: 'progress',
      version: 2,
      storage: createJSONStorage(() => safeStorage),
      // v1 (first release) → v2: add XP and spaced-repetition data, keep everything else.
      migrate: (persisted, version) => {
        const state = { ...initial, ...(persisted as Partial<ProgressData>) };
        if (version < 2) {
          const words: Record<string, WordProgress> = {};
          for (const [id, w] of Object.entries(state.words ?? {})) {
            const old = w as { correct?: number; attempts?: number };
            const correct = old.correct ?? 0;
            const attempts = old.attempts ?? 0;
            words[id] = { ...emptyWord(), correct, attempts, wrong: attempts - correct, box: Math.min(3, correct) };
          }
          state.words = words;
          state.xp = state.stars * 5;
        }
        return state as ProgressData & ProgressActions;
      },
    },
  ),
);
