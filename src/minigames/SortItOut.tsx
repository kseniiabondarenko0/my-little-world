import { useMemo, useState } from 'react';
import type { MiniGameProps } from './components';
import { shuffle } from '../activities/engine';
import { levelAtMost } from '../data/content';
import { useUI } from '../hooks/useUIStore';

// Put each word into the right group. Drag it (mouse) or tap it, then tap a group (touch).

export function SortItOut({ chapter, level, onComplete }: MiniGameProps) {
  const { bins, items: all } = chapter.sortGame;
  const items = useMemo(() => {
    const ok = all.filter((i) => levelAtMost(i.level, level));
    const perBin = bins.flatMap((b) => shuffle(ok.filter((i) => i.bin === b.id)).slice(0, 3));
    return shuffle(perBin).slice(0, 12);
  }, [all, bins, level]);

  const [selected, setSelected] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [mistakes, setMistakes] = useState(0);
  const [wrongBin, setWrongBin] = useState<string | null>(null);
  const left = items.filter((i) => !placed[i.word]);

  const drop = (word: string, bin: string) => {
    const item = items.find((i) => i.word === word);
    if (!item || placed[word]) return;
    if (item.bin === bin) {
      const next = { ...placed, [word]: bin };
      setPlaced(next);
      setSelected(null);
      useUI.getState().cheerUp();
      if (Object.keys(next).length === items.length) setTimeout(() => onComplete({ mistakes, detail: mistakes === 1 ? '1 mistake' : `${mistakes} mistakes` }), 500);
    } else {
      setMistakes((m) => m + 1);
      setWrongBin(bin);
      setTimeout(() => setWrongBin(null), 450);
    }
  };

  return (
    <div className="minigame">
      <p className="activity-prompt">Sort the words into groups.</p>
      <p className="muted small">Drag a word into a box — or tap a word, then tap a box.</p>
      <div className="sort-chips">
        {left.map((i) => (
          <button
            key={i.word}
            className={`chip sort-chip ${selected === i.word ? 'active' : ''}`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', i.word)}
            onClick={() => setSelected(selected === i.word ? null : i.word)}
          >
            {i.word}
          </button>
        ))}
        {left.length === 0 && <span className="muted">All sorted! 🎉</span>}
      </div>
      <div className="sort-bins">
        {bins.map((b) => (
          <div
            key={b.id}
            className={`sort-bin ${wrongBin === b.id ? 'wrong' : ''} ${selected ? 'ready' : ''}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              drop(e.dataTransfer.getData('text/plain'), b.id);
            }}
            onClick={() => selected && drop(selected, b.id)}
            role="button"
            tabIndex={0}
          >
            <div className="sort-bin-head">{b.icon} {b.label}</div>
            <div className="sort-bin-items">
              {items.filter((i) => placed[i.word] === b.id).map((i) => (
                <span key={i.word} className="chip done">{i.word}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
