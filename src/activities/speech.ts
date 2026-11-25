import { COURSE } from '../courses/active';

// Pronunciation with the browser's built-in voices (no files or internet needed).
// The voice follows the course: English, German or Polish.
// Browsers ship very different voices, so we score them and pick the most natural one:
// neural/"Natural"/"Online" voices (Edge, Windows), Google voices (Chrome), and
// enhanced/premium Siri-style voices (Safari, iPad) win; robotic and joke voices lose.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

// macOS novelty voices and old robotic engines that sound strange to learners.
const NOVELTY =
  /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|deranged|good news|hysterical|jester|organ|pipe organ|superstar|trinoids|whisper|wobble|zarvox|fred|junior|ralph|kathy|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley)\b|espeak|mbrola/i;
// Names that usually mean a high-quality voice.
const NATURAL = /natural|neural|online|premium|enhanced|wavenet|siri/i;
// Well-known clear voices per language (Apple / Microsoft / Google names).
const PREFERRED: Record<string, RegExp> = {
  en: /\b(google uk english|serena|daniel|kate|sonia|libby|ryan|samantha|aria|jenny|google us english)\b/i,
  de: /\b(google deutsch|anna|petra|markus|katja|conrad|amala|helena|hedda)\b/i,
  pl: /\b(google polski|zosia|ewa|krzysztof|marek|agnieszka|paulina|zofia)\b/i,
};

function score(v: SpeechSynthesisVoice, lang: string): number {
  const base = lang.slice(0, 2).toLowerCase();
  const vlang = v.lang.replace('_', '-').toLowerCase();
  if (!vlang.startsWith(base)) return -Infinity;
  let s = 0;
  if (vlang === lang.toLowerCase()) s += 20; // exact accent, e.g. en-GB
  if (NATURAL.test(v.name)) s += 40;
  if (PREFERRED[base]?.test(v.name)) s += 25;
  if (/google/i.test(v.name)) s += 15;
  if (NOVELTY.test(v.name)) s -= 100;
  if (v.default) s += 2;
  return s;
}

let cachedFor = '';
let cached: SpeechSynthesisVoice | undefined;

function bestVoice(): SpeechSynthesisVoice | undefined {
  const lang = COURSE.speechLang;
  if (cachedFor === lang && cached) return cached;
  let best: SpeechSynthesisVoice | undefined;
  let bestScore = -Infinity;
  for (const v of window.speechSynthesis.getVoices()) {
    const s = score(v, lang);
    if (s > bestScore) {
      best = v;
      bestScore = s;
    }
  }
  if (best) {
    cachedFor = lang;
    cached = best;
  }
  return best;
}

// Chrome loads voices late: without this the first word can play in the default robot voice.
if (canSpeak) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    cached = undefined;
    cachedFor = '';
  });
}

export function speak(text: string) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, 'blank'));
  const voice = bestVoice();
  u.lang = voice?.lang ?? COURSE.speechLang;
  if (voice) u.voice = voice;
  // Natural voices already speak clearly; slowing them down too much makes them sound odd.
  u.rate = voice && NATURAL.test(voice.name) ? 0.95 : 0.9;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}
