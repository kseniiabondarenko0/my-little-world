import { readJSON, writeJSON } from '../save/storage';

// A simple 4-digit teacher PIN, stored in this browser only.
// It keeps students out of the overview; it is not real security
// (anyone who clears the browser's site data also clears the PIN).

const KEY = 'teacher-pin';

export const isValidPin = (pin: string) => /^\d{4}$/.test(pin);

export function hasPin(): boolean {
  return readJSON<string | null>(KEY, null) !== null;
}

export function checkPin(pin: string): boolean {
  return readJSON<string | null>(KEY, null) === pin;
}

export function setPin(pin: string): boolean {
  if (!isValidPin(pin)) return false;
  writeJSON(KEY, pin);
  return true;
}
