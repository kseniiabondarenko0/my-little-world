import { usePlayer } from './playerStore';

// The single place that would talk to a server (e.g. Supabase) in the future:
// nickname checks, cloud saves, friends, room visits, leaderboards.
// For now everything is local to this device.

export type NicknameCheck =
  | { ok: true; note: string }
  | { ok: false; reason: string };

export const NICKNAMES_ARE_LOCAL = true;

const ALLOWED = /^[\p{L}\p{N} _.-]+$/u;

export function checkNickname(raw: string, ignoreId?: string): NicknameCheck {
  const nickname = raw.trim();
  if (nickname.length < 3) return { ok: false, reason: 'Use at least 3 characters.' };
  if (nickname.length > 16) return { ok: false, reason: 'Use 16 characters or fewer.' };
  if (!ALLOWED.test(nickname)) return { ok: false, reason: 'Use letters, numbers, spaces, dots or dashes only.' };
  if (/\d{5,}/.test(nickname) || nickname.includes('@')) {
    return { ok: false, reason: 'Please don’t use phone numbers or emails in your nickname.' };
  }
  const taken = usePlayer
    .getState()
    .players.some((p) => p.id !== ignoreId && p.nickname.toLowerCase() === nickname.toLowerCase());
  if (taken) return { ok: false, reason: 'Someone on this device already uses this nickname.' };
  return { ok: true, note: 'Nicknames are saved on this device only.' };
}
