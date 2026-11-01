import { useMemo, useState } from 'react';
import type { ActivityProps } from '../registry';
import { shuffle } from '../engine';
import { SpeakButton } from '../../components/ui/SpeakButton';

// Sentence builder: tap the words in the right order.

const strip = (s: string) => s.replace(/[.,!?]/g, '').toLowerCase();

export function BuilderActivity({ question, onAnswer }: ActivityProps) {
  const words = useMemo(() => question.answer.split(' '), [question.answer]);
  const tiles = useMemo(() => {
    let order = shuffle(words.map((w, i) => ({ w, i })));
    // Make sure it doesn't start already solved.
    if (order.every((t, k) => t.i === k) && words.length > 1) order = [...order.slice(1), order[0]];
    return order;
  }, [question.key]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const built = placed.map((i) => tiles[i].w);
  const complete = placed.length === tiles.length;

  const check = () => {
    const ok = built.map(strip).join(' ') === words.map(strip).join(' ');
    setResult(ok);
    onAnswer(ok);
  };

  return (
    <div className="activity">
      <p className="activity-prompt">{question.prompt}</p>
      {question.native && <p className="activity-hint">{question.native}</p>}
      <div className={`builder-line ${result === true ? 'right' : result === false ? 'wrong' : ''}`}>
        {placed.length === 0 && <span className="builder-placeholder">Tap the words below…</span>}
        {placed.map((ti, k) => (
          <button key={k} className="builder-word placed" disabled={result !== null} onClick={() => setPlaced(placed.filter((_, j) => j !== k))}>
            {tiles[ti].w}
          </button>
        ))}
      </div>
      <div className="tiles">
        {tiles.map((t, i) => (
          <button key={i} className="builder-word" disabled={placed.includes(i) || result !== null} onClick={() => setPlaced([...placed, i])}>
            {t.w}
          </button>
        ))}
      </div>
      {result === null ? (
        <button className="btn btn-primary check-btn" disabled={!complete} onClick={check}>
          Check
        </button>
      ) : (
        result === false && (
          <p className="activity-hint">
            Correct: <b>{question.answer}</b> <SpeakButton text={question.answer} small />
          </p>
        )
      )}
    </div>
  );
}
