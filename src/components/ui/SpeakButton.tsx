import { canSpeak, speak } from '../../activities/speech';

export function SpeakButton({ text, small, label }: { text: string; small?: boolean; label?: string }) {
  if (!canSpeak) return null;
  return (
    <button
      type="button"
      className={`speak-btn ${small ? 'small' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label={`Listen: ${text}`}
      title="Listen"
    >
      🔊{label && <span>{label}</span>}
    </button>
  );
}
