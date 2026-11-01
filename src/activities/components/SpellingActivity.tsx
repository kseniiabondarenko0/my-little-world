import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ActivityProps } from '../registry';
import { shuffle } from '../engine';
import { SpeakButton } from '../../components/ui/SpeakButton';

// Missing letters: tap the letter tiles (or type on a keyboard) to fill the gaps.

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function SpellingActivity({ question, onAnswer }: ActivityProps) {
  const letters = useMemo(() => [...question.answer.toLowerCase()], [question.answer]);
  const hidden = question.hide ?? [];

  const tiles = useMemo(() => {
    const needed = hidden.map((i) => letters[i]);
    const extras = shuffle([...ALPHABET].filter((c) => !needed.includes(c))).slice(0, Math.min(3, Math.max(2, 6 - needed.length)));
    return shuffle([...needed, ...extras]).map((ch, id) => ({ id, ch }));
  }, [question.key]);

  // filled[k] = tile id placed into the k-th gap
  const [filled, setFilled] = useState<(number | null)[]>(() => hidden.map(() => null));
  const [result, setResult] = useState<boolean | null>(null);
  const used = new Set(filled.filter((t): t is number => t !== null));
  const complete = filled.every((t) => t !== null);

  const place = useCallback(
    (tileId: number) => {
      if (result !== null) return;
      setFilled((f) => {
        const k = f.indexOf(null);
        if (k === -1 || f.includes(tileId)) return f;
        const next = [...f];
        next[k] = tileId;
        return next;
      });
    },
    [result],
  );

  const clearGap = (k: number) => {
    if (result !== null) return;
    setFilled((f) => f.map((t, i) => (i === k ? null : t)));
  };

  const check = useCallback(() => {
    if (!complete || result !== null) return;
    const ok = filled.every((t, k) => tiles[t!].ch === letters[hidden[k]]);
    setResult(ok);
    onAnswer(ok);
  }, [complete, result, filled, tiles, letters, hidden, onAnswer]);

  // Keyboard: letters fill gaps, Backspace removes, Enter checks.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (result !== null) return;
      const key = e.key.toLowerCase();
      if (key.length === 1 && ALPHABET.includes(key)) {
        const tile = tiles.find((t) => t.ch === key && !used.has(t.id));
        if (tile) place(tile.id);
      } else if (e.key === 'Backspace') {
        setFilled((f) => {
          const last = f.map((t, i) => (t !== null ? i : -1)).filter((i) => i >= 0).pop();
          return last === undefined ? f : f.map((t, i) => (i === last ? null : t));
        });
      } else if (e.key === 'Enter') {
        check();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tiles, used, place, check, result]);

  let gapIndex = -1;
  return (
    <div className="activity">
      <p className="activity-prompt">
        {question.prompt} <SpeakButton text={question.answer} small label="Listen" />
      </p>
      {question.native && <p className="activity-hint">{question.native}</p>}

      <div className={`spelling-word ${result === true ? 'right' : result === false ? 'wrong' : ''}`}>
        {letters.map((ch, i) => {
          if (ch === ' ') return <span key={i} className="letter-space" />;
          if (!hidden.includes(i)) return <span key={i} className="letter">{ch.toUpperCase()}</span>;
          gapIndex++;
          const k = gapIndex;
          const tile = filled[k] !== null ? tiles[filled[k]!] : null;
          const shown = result === false ? ch : tile?.ch;
          return (
            <button key={i} className={`letter gap-letter ${tile ? 'filled' : ''}`} onClick={() => clearGap(k)} disabled={result !== null}>
              {shown ? shown.toUpperCase() : ''}
            </button>
          );
        })}
      </div>

      <div className="tiles">
        {tiles.map((t) => (
          <button key={t.id} className="tile" onClick={() => place(t.id)} disabled={used.has(t.id) || result !== null}>
            {t.ch.toUpperCase()}
          </button>
        ))}
      </div>

      {result === null && (
        <button className="btn btn-primary check-btn" onClick={check} disabled={!complete}>
          Check
        </button>
      )}
    </div>
  );
}
