import type { PlayerProfile } from '../player/types';
import { STORE_NAMES } from './storage';

// A save file a student can keep (USB stick, cloud drive, email to themselves)
// and load again after the browser's storage was cleared, or on another device.
// One file = one player: their profile plus their progress, room and chapter.

const APP = 'my-little-world';
const FORMAT = 1;

export interface BackupFile {
  app: typeof APP;
  format: number;
  exportedAt: string;
  player: PlayerProfile;
  /** Each store's saved JSON, parsed (so the file is readable), or null if never saved. */
  saves: Record<string, unknown>;
}

export type ParsedBackup =
  | { ok: true; player: PlayerProfile; saves: Record<string, string | null> }
  | { ok: false; reason: string };

export function buildBackup(player: PlayerProfile, saves: Record<string, string | null>, now = new Date()): BackupFile {
  const parsed: Record<string, unknown> = {};
  for (const name of STORE_NAMES) {
    const raw = saves[name];
    try {
      parsed[name] = raw ? JSON.parse(raw) : null;
    } catch {
      parsed[name] = null;
    }
  }
  return { app: APP, format: FORMAT, exportedAt: now.toISOString(), player, saves: parsed };
}

export function backupFileName(player: PlayerProfile, now = new Date()): string {
  const safe = player.nickname.replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '') || 'player';
  return `my-little-world-${safe}-${now.toISOString().slice(0, 10)}.json`;
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Checks a loaded file before anything on the device is changed. */
export function parseBackup(text: string): ParsedBackup {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, reason: 'This file isn’t a My Little World save.' };
  }
  if (!isObject(data) || data.app !== APP) return { ok: false, reason: 'This file isn’t a My Little World save.' };
  if (typeof data.format !== 'number' || data.format > FORMAT) {
    return { ok: false, reason: 'This save was made by a newer version of the game. Please update the game first.' };
  }
  const p = data.player;
  if (!isObject(p) || typeof p.id !== 'string' || !p.id || typeof p.nickname !== 'string' || !isObject(p.avatar)) {
    return { ok: false, reason: 'This save file is damaged (no player inside).' };
  }
  if (!isObject(data.saves)) return { ok: false, reason: 'This save file is damaged (no progress inside).' };

  const saves: Record<string, string | null> = {};
  for (const name of STORE_NAMES) {
    const value = data.saves[name];
    if (value === undefined || value === null) saves[name] = null;
    // zustand's persist format: { state: {...}, version: n }
    else if (isObject(value) && isObject(value.state)) saves[name] = JSON.stringify(value);
    else return { ok: false, reason: 'This save file is damaged.' };
  }
  const player: PlayerProfile = {
    id: p.id,
    nickname: p.nickname.trim().slice(0, 16),
    avatar: p.avatar as unknown as PlayerProfile['avatar'],
    createdAt: typeof p.createdAt === 'number' ? p.createdAt : Date.now(),
  };
  return { ok: true, player, saves };
}

/** Gives the nickname a number if another player on this device already uses it. */
export function freeNickname(nickname: string, taken: string[]): string {
  const used = new Set(taken.map((n) => n.toLowerCase()));
  if (!used.has(nickname.toLowerCase())) return nickname;
  for (let i = 2; ; i++) {
    const suffix = ` ${i}`;
    const candidate = nickname.slice(0, 16 - suffix.length) + suffix;
    if (!used.has(candidate.toLowerCase())) return candidate;
  }
}
