import { useEffect, useRef, useState } from 'react';
import type { ActivityProps } from '../registry';
import { normalize } from '../engine';
import { speak } from '../speech';
import { SpeakButton } from '../../components/ui/SpeakButton';

// Type the word: from listening (dictation) or from the translation (active recall).

const clean = (s: string) => normalize(s).replace(/\s+/g, ' ').replace(/[.!?]$/, '');

/** Number of single-letter edits between two words (for "almost!" feedback). */
function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

export function TypingActivity({ question, onAnswer }: ActivityProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'right' | 'wrong' | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const dictation = question.mode === 'dictation';

  useEffect(() => {
    input.current?.focus();
    if (dictation) {
      const t = setTimeout(() => speak(question.answer), 350);
      return () => clearTimeout(t);
    }
  }, [dictation, question.answer]);

  const check = () => {
    if (!value.trim() || result) return;
    const typed = clean(value);
    const answer = clean(question.answer);
    if (typed === answer) {
      setResult('right');
      onAnswer(true);
      return;
    }
    // One small typo on the first try: give a chance to fix it.
    if (!hint && distance(typed, answer) === 1 && answer.length > 4) {
      setHint('Almost! Check your spelling and try again.');
      return;
    }
    setResult('wrong');
    onAnswer(false);
  };

  return (
    <div className="activity">
      <p className="activity-prompt">{question.prompt}</p>
      {dictation ? (
        <button className="listen-big" onClick={() => speak(question.answer)} aria-label="Play again">
          🔊<span>Play again</span>
        </button>
      ) : (
        <div className="activity-native">
          <span className="native-word">{question.native}</span>
        </div>
      )}
      <form
        className="typing-row"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        <input
          ref={input}
          className={`typing-input ${result ?? ''}`}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setHint(null);
          }}
          disabled={!!result}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          placeholder="Type here…"
          aria-label="Your answer"
        />
        {!result && (
          <button className="btn btn-primary" type="submit" disabled={!value.trim()}>
            Check
          </button>
        )}
      </form>
      {hint && <p className="activity-hint">{hint}</p>}
      {result === 'wrong' && (
        <p className="activity-hint">
          Correct spelling: <b>{question.answer}</b> <SpeakButton text={question.answer} small />
        </p>
      )}
    </div>
  );
}
