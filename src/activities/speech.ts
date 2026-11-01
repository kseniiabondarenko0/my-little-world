// Pronunciation with the browser's built-in voice (no files or internet needed).

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

function englishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-GB' && /female|natural|google/i.test(v.name)) ??
    voices.find((v) => v.lang === 'en-GB') ??
    voices.find((v) => v.lang.startsWith('en'))
  );
}

export function speak(text: string) {
  if (!canSpeak) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/___/g, 'blank'));
  u.lang = 'en-GB';
  u.rate = 0.85;
  const voice = englishVoice();
  if (voice) u.voice = voice;
  window.speechSynthesis.speak(u);
}
