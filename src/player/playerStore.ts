import { create } from 'zustand';
import type { AvatarConfig, PlayerProfile } from './types';
import { ACTIVE_PLAYER_ID, adoptLegacySave, deletePlayerSave, readJSON, setActivePlayer, writeJSON } from '../save/storage';

// All player profiles on this device, and which one is playing.
// Profiles are stored once per device (not per player save).

const KEY = 'players';

function load(): PlayerProfile[] {
  return readJSON<PlayerProfile[]>(KEY, []);
}

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

interface PlayerState {
  players: PlayerProfile[];
  /** The profile currently playing, or null before the first profile is made. */
  current: PlayerProfile | null;
  create: (nickname: string, avatar: AvatarConfig) => PlayerProfile;
  update: (patch: Partial<Pick<PlayerProfile, 'nickname' | 'avatar'>>) => void;
  switchTo: (id: string | null) => void;
  remove: (id: string) => void;
}

const initialPlayers = load();

export const usePlayer = create<PlayerState>()((set, get) => ({
  players: initialPlayers,
  current: initialPlayers.find((p) => p.id === ACTIVE_PLAYER_ID) ?? null,

  create: (nickname, avatar) => {
    const profile: PlayerProfile = { id: newId(), nickname: nickname.trim(), avatar, createdAt: Date.now() };
    const players = [...get().players, profile];
    writeJSON(KEY, players);
    // Progress made before this profile existed (v0.1 saves, or the language/level
    // chosen during sign-up) moves into the new player's own save.
    adoptLegacySave(profile.id);
    setActivePlayer(profile.id);
    set({ players });
    return profile;
  },

  update: (patch) => {
    const current = get().current;
    if (!current) return;
    const updated = { ...current, ...patch };
    const players = get().players.map((p) => (p.id === current.id ? updated : p));
    writeJSON(KEY, players);
    set({ players, current: updated });
  },

  switchTo: (id) => {
    setActivePlayer(id);
    window.location.reload();
  },

  remove: (id) => {
    const players = get().players.filter((p) => p.id !== id);
    writeJSON(KEY, players);
    deletePlayerSave(id);
    set({ players });
  },
}));
