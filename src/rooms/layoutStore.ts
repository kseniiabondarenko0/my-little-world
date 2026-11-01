import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { PlacedItem } from '../types/game';
import { safeStorage } from '../save/storage';

// Where every object stands in every room (saved automatically).

interface LayoutState {
  rooms: Record<string, PlacedItem[]>;
  addItem: (roomId: string, item: PlacedItem) => void;
  updateItems: (roomId: string, updates: PlacedItem[]) => void;
  removeItem: (roomId: string, uid: string) => void;
  reset: () => void;
}

export const EMPTY_ITEMS: PlacedItem[] = [];

export const useLayout = create<LayoutState>()(
  persist(
    (set) => ({
      rooms: {},
      addItem: (roomId, item) =>
        set((s) => ({ rooms: { ...s.rooms, [roomId]: [...(s.rooms[roomId] ?? []), item] } })),
      updateItems: (roomId, updates) =>
        set((s) => {
          const byId = new Map(updates.map((u) => [u.uid, u]));
          return { rooms: { ...s.rooms, [roomId]: (s.rooms[roomId] ?? []).map((i) => byId.get(i.uid) ?? i) } };
        }),
      removeItem: (roomId, uid) =>
        set((s) => ({ rooms: { ...s.rooms, [roomId]: (s.rooms[roomId] ?? []).filter((i) => i.uid !== uid) } })),
      reset: () => set({ rooms: {} }),
    }),
    { name: 'layout', version: 1, storage: createJSONStorage(() => safeStorage) },
  ),
);
