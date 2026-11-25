import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { profileStorage } from '../save/storage';
import { COIN_REWARDS, shopItem, type PetConfig, type RoomStyle } from '../data/shop';

// The player's pet, coins and everything bought in the shop.
// One save per player, shared by all their courses (English, German, Polish).

export interface CompanionData {
  coins: number;
  /** Every coin ever earned (for the teacher overview and achievements later). */
  earned: number;
  pet: PetConfig | null;
  /** Shop item ids the player owns. */
  owned: string[];
  /** room id → the paint, floor and decorations chosen for that room. */
  roomStyles: Record<string, RoomStyle>;
  /** False until the starter coins were given (new players and saves from before the shop). */
  started: boolean;
}

interface CompanionActions {
  earn: (amount: number) => void;
  /** Spends coins on a shop item. False if it's owned already or there aren't enough coins. */
  buy: (itemId: string) => boolean;
  adopt: (pet: PetConfig) => void;
  updatePet: (patch: Partial<PetConfig>) => void;
  setRoomStyle: (roomId: string, patch: RoomStyle) => void;
  toggleDecor: (roomId: string, itemId: string) => void;
  /** Gives the starter coins once. `stars` = stars already earned (older saves get a coin per star). */
  start: (stars: number) => void;
}

export const initialCompanion: CompanionData = { coins: 0, earned: 0, pet: null, owned: [], roomStyles: {}, started: false };

export const useCompanion = create<CompanionData & CompanionActions>()(
  persist(
    (set, get) => ({
      ...initialCompanion,
      earn: (amount) => {
        if (amount <= 0) return;
        set((s) => ({ coins: s.coins + amount, earned: s.earned + amount }));
      },
      buy: (itemId) => {
        const item = shopItem(itemId);
        const s = get();
        if (!item || s.owned.includes(itemId) || s.coins < item.price) return false;
        set({ coins: s.coins - item.price, owned: [...s.owned, itemId] });
        return true;
      },
      adopt: (pet) => set({ pet: { ...pet, name: pet.name.trim().slice(0, 16) || 'Buddy' } }),
      updatePet: (patch) =>
        set((s) => (s.pet ? { pet: { ...s.pet, ...patch, ...(patch.name !== undefined ? { name: patch.name.slice(0, 16) } : {}) } } : s)),
      setRoomStyle: (roomId, patch) =>
        set((s) => ({ roomStyles: { ...s.roomStyles, [roomId]: { ...s.roomStyles[roomId], ...patch } } })),
      toggleDecor: (roomId, itemId) =>
        set((s) => {
          const current = s.roomStyles[roomId]?.decor ?? [];
          const decor = current.includes(itemId) ? current.filter((d) => d !== itemId) : [...current, itemId];
          return { roomStyles: { ...s.roomStyles, [roomId]: { ...s.roomStyles[roomId], decor } } };
        }),
      start: (stars) => {
        if (get().started) return;
        const coins = COIN_REWARDS.starter + Math.max(0, Math.floor(stars));
        set((s) => ({ started: true, coins: s.coins + coins, earned: s.earned + coins }));
      },
    }),
    {
      name: 'companion',
      version: 1,
      storage: createJSONStorage(() => profileStorage),
      merge: (persisted, current) => ({ ...current, ...sanitize(persisted) }),
    },
  ),
);

/** Keeps a damaged or hand-edited save from breaking the game. */
export function sanitize(raw: unknown): Partial<CompanionData> {
  if (typeof raw !== 'object' || raw === null) return {};
  const s = raw as Partial<CompanionData>;
  const out: Partial<CompanionData> = {};
  if (typeof s.coins === 'number' && s.coins >= 0) out.coins = Math.floor(s.coins);
  if (typeof s.earned === 'number' && s.earned >= 0) out.earned = Math.floor(s.earned);
  if (Array.isArray(s.owned)) out.owned = s.owned.filter((id) => typeof id === 'string' && !!shopItem(id));
  if (s.pet && typeof s.pet === 'object' && typeof s.pet.name === 'string') out.pet = s.pet;
  if (s.roomStyles && typeof s.roomStyles === 'object') out.roomStyles = s.roomStyles;
  if (typeof s.started === 'boolean') out.started = s.started;
  return out;
}
