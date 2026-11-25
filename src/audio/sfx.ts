// Soft UI click sounds, synthesised with the Web Audio API (no files to download).
// A short, quiet "pop" plays when a button is pressed. Players can mute it from the top bar.

const KEY = 'mlw:sfx-muted';

let ctx: AudioContext | null = null;
let muted = readMuted();
const listeners = new Set<(m: boolean) => void>();

function readMuted(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function isSfxMuted() {
  return muted;
}

export function setSfxMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(KEY, value ? '1' : '0');
  } catch {
    /* private mode: keep it for this visit only */
  }
  listeners.forEach((fn) => fn(value));
}

export function onSfxMutedChange(fn: (m: boolean) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** A gentle wooden "tok": a quick pitch drop with a fast fade, very quiet. */
export function playClick() {
  if (muted) return;
  const ac = audio();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.exponentialRampToValueAtTime(440, t + 0.06);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.12, t + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

const CLICKABLE = 'button, [role="button"], a[href], select, input[type="checkbox"], input[type="radio"]';

/** Plays the click for every button press in the app. Call once at startup. */
export function installClickSounds() {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'pointerdown',
    (e) => {
      const el = (e.target as Element | null)?.closest?.(CLICKABLE);
      if (!el || (el as HTMLButtonElement).disabled) return;
      playClick();
    },
    { capture: true, passive: true },
  );
}
