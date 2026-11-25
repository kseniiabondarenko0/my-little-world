import { COURSE } from '../courses/active';

// Pronunciation with the browser's built-in voice (no files or internet needed).
// The voice follows the course: English, German or Polish.

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

function courseVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const lang = COURSE.speechLang;
  return (
    voices.find((v) => v.lang === lang && /female|natural|google/i.test(v.name)) ??
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.startsWith(lang.slice(0, 2)))
  );
}

export function speak(text: string) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, 'blank'));
  u.lang = COURSE.speechLang;
  u.rate = 0.85;
  const voice = courseVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
