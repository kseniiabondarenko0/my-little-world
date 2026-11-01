import { useMemo, useState } from 'react';
import type { ActivityProps } from '../registry';
import { shuffle } from '../engine';
import { useUI } from '../../hooks/useUIStore';
import { getFurniture } from '../../data/content';

// Tap an English word, then its translation or picture. All pairs = done.
// The whole question counts as correct if there were no wrong matches.

export function MatchActivity({ question, onAnswer }: ActivityProps) {
  const pairs = question.pairs ?? [];
  const thumbnails = useUI((s) => s.thumbnails);
  const rights = useMemo(() => shuffle(pairs.map((p) => p.right)), [question.key]);
  const [left, setLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState<string | null>(null);
  const done = matched.length === pairs.length;

  const tapRight = (right: string) => {
    if (!left || done) return;
    const pair = pairs.find((p) => p.left === left)!;
    if (pair.right === right) {
      const next = [...matched, left];
      setMatched(next);
      setLeft(null);
      if (next.length === pairs.length) onAnswer(mistakes === 0);
    } else {
      setMistakes((m) => m + 1);
      setShake(right);
      setTimeout(() => setShake(null), 400);
    }
  };

  const renderRight = (right: string) => {
    if (!right.startsWith('obj:')) return right;
    const id = right.slice(4);
    return thumbnails[id] ? <img src={thumbnails[id]} alt="" /> : getFurniture(id).icon;
  };

  return (
    <div className="activity">
      <p className="activity-prompt">{question.prompt}</p>
      <div className="match-grid">
        <div className="match-col">
          {pairs.map((p) => (
            <button
              key={p.left}
              className={`match-item ${matched.includes(p.left) ? 'right' : left === p.left ? 'selected' : ''}`}
              disabled={matched.includes(p.left)}
              onClick={() => setLeft(p.left)}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {rights.map((r) => {
            const isMatched = pairs.some((p) => p.right === r && matched.includes(p.left));
            return (
              <button
                key={r}
                className={`match-item ${r.startsWith('obj:') ? 'match-picture' : ''} ${isMatched ? 'right' : ''} ${shake === r ? 'wrong' : ''}`}
                disabled={isMatched}
                onClick={() => tapRight(r)}
              >
                {renderRight(r)}
              </button>
            );
          })}
        </div>
      </div>
      {!done && <p className="activity-hint">{left ? `Now tap the match for “${left}”.` : 'Tap a word on the left first.'}</p>}
      {done && mistakes > 0 && <p className="activity-hint">All matched — with {mistakes} mistake{mistakes > 1 ? 's' : ''}.</p>}
    </div>
  );
}
