import { useMemo, useState } from 'react';
import type { MiniGameProps } from './components';
import { shuffle } from '../activities/engine';
import { wordsForRoom, objectOfWord } from '../data/content';
import { useProgress } from '../progression/progressStore';
import { useUI } from '../hooks/useUIStore';
import { SpeakButton } from '../components/ui/SpeakButton';

// Rebuild words from mixed-up letters. Clues get harder at higher levels.

const ROUNDS = 6;

export function WordScramble({ chapter, level, language, onComplete }: MiniGameProps) {
  const thumbnails = useUI((s) => s.thumbnails);
  const words = useMemo(() => {
    const pool = wordsForRoom(chapter.roomId, level).filter((w) => /^[a-z]{3,12}$/i.test(w.word));
    // Higher levels: prefer longer, harder words.
    const sorted = level === 'A1' ? pool : [...pool].sort((a, b) => b.word.length - a.word.length).slice(0, Math.max(12, pool.length / 2));
    return shuffle(sorted).slice(0, ROUNDS);
  }, [chapter.roomId, level]);

  const [round, setRound] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const word = words[round];

  if (!word) return <p className="muted">No words available for this level yet.</p>;

  return (
    <div className="minigame">
      <p className="muted small">Word {round + 1} of {words.length}</p>
      <Round
        key={word.id}
        word={word.word}
        clue={
          level === 'B1' || level === 'B2'
            ? word.definition ?? word.translations?.[language] ?? ''
            : word.translations?.[language] ?? ''
        }
        image={level === 'A1' ? thumbnails[objectOfWord(word) ?? ''] : undefined}
        onDone={(correct) => {
          useProgress.getState().recordAnswer(word.id, correct, true);
          if (!correct) setMistakes((m) => m + 1);
          if (round + 1 >= words.length) onComplete({ mistakes: mistakes + (correct ? 0 : 1), detail: `${words.length - mistakes - (correct ? 0 : 1)}/${words.length} correct` });
          else setRound(round + 1);
        }}
      />
    </div>
  );
}

function Round({ word, clue, image, onDone }: { word: string; clue: string; image?: string; onDone: (correct: boolean) => void }) {
  const letters = useMemo(() => {
    let s = shuffle([...word.toUpperCase()].map((ch, i) => ({ ch, i })));
    if (s.map((x) => x.ch).join('') === word.toUpperCase()) s = [...s.slice(1), s[0]];
    return s;
  }, [word]);
  const [picked, setPicked] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  const built = picked.map((i) => letters[i].ch).join('');

  const pick = (i: number) => {
    if (result !== null || picked.includes(i)) return;
    const next = [...picked, i];
    setPicked(next);
    if (next.length === letters.length) {
      const ok = next.map((k) => letters[k].ch).join('') === word.toUpperCase();
      setResult(ok);
      if (ok) useUI.getState().cheerUp();
    }
  };

  return (
    <div className="activity">
      <p className="activity-prompt">Unscramble the word</p>
      {image && <img className="scramble-image" src={image} alt="" />}
      {clue && <p className="activity-hint">Clue: {clue}</p>}
      <div className={`spelling-word ${result === true ? 'right' : result === false ? 'wrong' : ''}`}>
        {letters.map((_, k) => (
          <button key={k} className={`letter gap-letter ${built[k] ? 'filled' : ''}`} disabled={result !== null || k >= picked.length}
            onClick={() => setPicked(picked.slice(0, k))}>
            {result === false ? word.toUpperCase()[k] : built[k] ?? ''}
          </button>
        ))}
      </div>
      <div className="tiles">
        {letters.map((l, i) => (
          <button key={i} className="tile" disabled={picked.includes(i) || result !== null} onClick={() => pick(i)}>
            {l.ch}
          </button>
        ))}
      </div>
      {result !== null && (
        <div className={`feedback ${result ? 'feedback-right' : 'feedback-wrong'}`}>
          <div className="feedback-text">
            <strong>{result ? '✓ Well done!' : '✗ Not quite'}</strong>
            <span>The word is <b>{word}</b> <SpeakButton text={word} small /></span>
          </div>
          <button className="btn btn-primary" onClick={() => onDone(result)} autoFocus>Next</button>
        </div>
      )}
    </div>
  );
}
