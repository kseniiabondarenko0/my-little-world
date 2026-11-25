import { create } from 'zustand';
import type { AvatarConfig, PlayerProfile } from './types';
import { buildBackup, freeNickname, type BackupFile } from '../save/backup';
import type { Course } from '../types/game';
import { ACTIVE_PLAYER_ID, adoptLegacySave, deletePlayerSave, readJSON, readPlayerSave, seedCourseSave, setActivePlayer, writeJSON, writePlayerSave, type PlayerSave } from '../save/storage';
import { DEFAULT_COURSE } from '../courses/courses';

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
  create: (nickname: string, avatar: AvatarConfig, course?: Course) => PlayerProfile;
  update: (patch: Partial<Pick<PlayerProfile, 'nickname' | 'avatar'>>) => void;
  /** Switches the language this player learns. Each course has its own save; the page reloads. */
  setCourse: (course: Course, homeLanguage: string) => void;
  switchTo: (id: string | null) => void;
  remove: (id: string) => void;
  /** The current player's profile and progress, ready to save as a file. */
  exportCurrent: () => BackupFile | null;
  /** Adds a player from a save file (or replaces the same player) and makes them active. Reload after. */
  importSave: (player: PlayerProfile, saves: PlayerSave) => PlayerProfile;
}

const initialPlayers = load();

export const usePlayer = create<PlayerState>()((set, get) => ({
  players: initialPlayers,
  current: initialPlayers.find((p) => p.id === ACTIVE_PLAYER_ID) ?? null,

  create: (nickname, avatar, course = DEFAULT_COURSE) => {
    const profile: PlayerProfile = { id: newId(), nickname: nickname.trim(), avatar, createdAt: Date.now(), course };
    const players = [...get().players, profile];
    writeJSON(KEY, players);
    // Progress made before this profile existed (v0.1 saves, or the language/level
    // chosen during sign-up) moves into the new player's own save.
    adoptLegacySave(profile.id, course);
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

  setCourse: (course, homeLanguage) => {
    const current = get().current;
    if (!current || (current.course ?? DEFAULT_COURSE) === course) return;
    seedCourseSave(current.id, course, homeLanguage);
    const players = get().players.map((p) => (p.id === current.id ? { ...p, course } : p));
    writeJSON(KEY, players);
    window.location.reload();
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

  exportCurrent: () => {
    const current = get().current;
    return current ? buildBackup(current, readPlayerSave(current.id)) : null;
  },

  importSave: (player, saves) => {
    // Same id = the same player coming back: their save is replaced by the file.
    const others = get().players.filter((p) => p.id !== player.id);
    const profile = { ...player, nickname: freeNickname(player.nickname, others.map((p) => p.nickname)) };
    const players = [...others, profile];
    writeJSON(KEY, players);
    writePlayerSave(profile.id, saves);
    setActivePlayer(profile.id);
    set({ players });
    return profile;
  },
}));
