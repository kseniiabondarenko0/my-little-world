import { useEffect, useMemo, useState } from 'react';
import type { MiniGameProps } from './components';
import { shuffle } from '../activities/engine';
import { ALL_WORDS, objectOfWord } from '../data/content';
import { useUI } from '../hooks/useUIStore';
import { getFurniture } from '../data/content';

// Flip two cards: an English word and its picture (A1–A2) or its definition (B1–B2).

interface Card {
  id: number;
  pair: string;
  kind: 'word' | 'match';
  text: string;
  objectId?: string;
}

export function MemoryMatch({ level, onComplete }: MiniGameProps) {
  const thumbnails = useUI((s) => s.thumbnails);
  const useDefinitions = level === 'B1' || level === 'B2';
  const pairs = level === 'B2' ? 8 : 6;

  const cards = useMemo<Card[]>(() => {
    const words = shuffle(ALL_WORDS.filter((w) => objectOfWord(w) && (!useDefinitions || w.definition))).slice(0, pairs);
    let id = 0;
    return shuffle(
      words.flatMap((w) => [
        { id: id++, pair: w.id, kind: 'word' as const, text: w.word },
        useDefinitions
          ? { id: id++, pair: w.id, kind: 'match' as const, text: w.definition! }
          : { id: id++, pair: w.id, kind: 'match' as const, text: w.word, objectId: objectOfWord(w) },
      ]),
    );
  }, [useDefinitions, pairs]);

  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open.map((i) => cards.find((c) => c.id === i)!);
    setMoves((m) => m + 1);
    if (a.pair === b.pair && a.kind !== b.kind) {
      setMatched((m) => [...m, a.pair]);
      setOpen([]);
      useUI.getState().cheerUp();
    } else {
      const t = setTimeout(() => setOpen([]), 950);
      return () => clearTimeout(t);
    }
  }, [open, cards]);

  useEffect(() => {
    if (matched.length === pairs) {
      const t = setTimeout(() => onComplete({ mistakes: Math.max(0, moves - pairs), detail: `${moves} moves` }), 600);
      return () => clearTimeout(t);
    }
  }, [matched, pairs, moves, onComplete]);

  return (
    <div className="minigame">
      <p className="activity-prompt">{useDefinitions ? 'Match each word to its meaning.' : 'Match each word to its picture.'}</p>
      <p className="muted small">Moves: {moves} · Pairs: {matched.length}/{pairs}</p>
      <div className={`memory-grid ${pairs === 8 ? 'memory-16' : ''}`}>
        {cards.map((c) => {
          const faceUp = open.includes(c.id) || matched.includes(c.pair);
          return (
            <button
              key={c.id}
              className={`memory-card ${faceUp ? 'up' : ''} ${matched.includes(c.pair) ? 'matched' : ''} ${c.kind === 'match' && useDefinitions ? 'definition' : ''}`}
              disabled={faceUp || open.length === 2}
              onClick={() => setOpen((o) => [...o, c.id])}
              aria-label={faceUp ? c.text : 'Hidden card'}
            >
              {faceUp ? (
                c.objectId ? (
                  thumbnails[c.objectId] ? <img src={thumbnails[c.objectId]} alt="" /> : <span className="card-emoji">{getFurniture(c.objectId).icon}</span>
                ) : (
                  <span>{c.text}</span>
                )
              ) : (
                <span className="memory-back">?</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
