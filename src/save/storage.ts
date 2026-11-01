import type { StateStorage } from 'zustand/middleware';

// Saved progress lives in the browser's localStorage under this prefix.
// Later this file is the one place to swap for cloud saves (student accounts).

const PREFIX = 'my-little-world:';

export const safeStorage: StateStorage = {
  getItem(name) {
    try {
      return localStorage.getItem(PREFIX + name);
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(PREFIX + name, value);
    } catch {
      // Storage full or blocked (private mode): the game still works, it just won't save.
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(PREFIX + name);
    } catch {
      // ignore
    }
  },
};
