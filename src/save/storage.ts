import type { StateStorage } from 'zustand/middleware';

// Saved progress lives in the browser's localStorage.
// Each player on this device has their own save: "my-little-world:p:<playerId>:<store>".
// Later this file is the one place to swap for cloud saves (student accounts).

export const PREFIX = 'my-little-world:';
const ACTIVE_KEY = `${PREFIX}active-player`;

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Storage full or blocked (private mode): the game still works, it just won't save.
  }
}

/** The player whose save is loaded. Fixed for the lifetime of the page (switching reloads). */
export const ACTIVE_PLAYER_ID: string | null = read(ACTIVE_KEY);

const namespace = (playerId: string | null) => (playerId ? `${PREFIX}p:${playerId}:` : PREFIX);

export const safeStorage: StateStorage = {
  getItem: (name) => read(namespace(ACTIVE_PLAYER_ID) + name),
  setItem: (name, value) => write(namespace(ACTIVE_PLAYER_ID) + name, value),
  removeItem: (name) => write(namespace(ACTIVE_PLAYER_ID) + name, null),
};

export const STORE_NAMES = ['progress', 'layout', 'chapter'];

/** Makes another player active. The page must reload so every store loads that player's save. */
export function setActivePlayer(playerId: string | null) {
  write(ACTIVE_KEY, playerId);
}

/** Moves a save made before profiles existed (v0.1) into a player's own save. */
export function adoptLegacySave(playerId: string) {
  for (const name of STORE_NAMES) {
    const legacy = read(PREFIX + name);
    if (legacy !== null && read(namespace(playerId) + name) === null) {
      write(namespace(playerId) + name, legacy);
      write(PREFIX + name, null);
    }
  }
}

export function deletePlayerSave(playerId: string) {
  for (const name of STORE_NAMES) write(namespace(playerId) + name, null);
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = read(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown) {
  write(PREFIX + key, JSON.stringify(value));
}
