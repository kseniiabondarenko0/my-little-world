import { useCompanion } from './companionStore';
import { useUI } from '../hooks/useUIStore';
import { COURSES } from '../courses/courses';
import { ACTIVE_PLAYER_ID, readPlayerStore } from '../save/storage';

// Giving coins for finished tasks. The amounts live in src/data/shop.ts (COIN_REWARDS).

/** Adds coins; with `toast`, also shows a small "+N coins" message. */
export function earnCoins(amount: number, toast?: string) {
  if (!ACTIVE_PLAYER_ID || amount <= 0) return;
  useCompanion.getState().earn(amount);
  if (toast) useUI.getState().pushToast({ icon: '🪙', title: `+${amount} coins`, text: toast, tone: 'success' });
}

/**
 * Gives the starter coins the first time a player opens this version.
 * Saves from before the shop also get one coin per star already earned (all courses).
 */
export function startCompanion() {
  if (!ACTIVE_PLAYER_ID || useCompanion.getState().started) return;
  let stars = 0;
  for (const c of COURSES) stars += readPlayerStore<{ stars?: number }>(ACTIVE_PLAYER_ID, 'progress', c.id)?.stars ?? 0;
  useCompanion.getState().start(stars);
}
