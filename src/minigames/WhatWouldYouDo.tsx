import { useMemo, useState } from 'react';
import type { MiniGameProps } from './components';
import type { Level } from '../types/game';
import { shuffle } from '../activities/engine';
import { evaluateWriting, type WritingResult } from '../missions/writing';
import { useChapter } from '../chapter/chapterStore';
import { useUI } from '../hooks/useUIStore';
import { SpeakButton } from '../components/ui/SpeakButton';
import { WritingChecklist } from '../components/ui/WritingChecklist';

// Real situations: choose what to do. B1 adds "why?", B2 asks for a written justification.

const ORDER: Level[] = ['A1', 'A2', 'B1', 'B2'];

export function WhatWouldYouDo({ chapter, level, onComplete }: MiniGameProps) {
  const scenarios = useMemo(() => {
    const own = shuffle(chapter.scenarios.filter((s) => s.level === level));
    const lower = shuffle(chapter.scenarios.filter((s) => ORDER.indexOf(s.level) < ORDER.indexOf(level)));
    return [...own, ...lower].slice(0, 3);
  }, [chapter.scenarios, level]);

  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<'choose' | 'reason' | 'write' | 'done'>('choose');
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [text, setText] = useState('');
  const [writing, setWriting] = useState<WritingResult | null>(null);
  const s = scenarios[round];
  const options = useMemo(() => (s ? shuffle(s.options) : []), [s]);
  const reasons = useMemo(() => (s?.reasons ? shuffle(s.reasons) : []), [s]);

  if (!s) return <p className="muted">No situations for this level yet.</p>;

  const advance = () => {
    setFeedback(null);
    setText('');
    setWriting(null);
    if (round + 1 >= scenarios.length) {
      onComplete({ mistakes, detail: `${scenarios.length} situations solved` });
    } else {
      setRound(round + 1);
      setPhase('choose');
    }
  };

  const afterBest = () => {
    if (s.reasons) setPhase('reason');
    else if (s.write) setPhase('write');
    else setPhase('done');
  };

  return (
    <div className="minigame">
      <p className="muted small">Situation {round + 1} of {scenarios.length}</p>
      <div className="scenario">
        <p className="scenario-text">{s.situation} <SpeakButton text={s.situation} small /></p>
      </div>

      {phase === 'choose' && (
        <div className="options options-col">
          {options.map((o) => (
            <button
              key={o.text}
              className="option option-left"
              onClick={() => {
                setFeedback({ ok: o.best, text: o.feedback });
                if (o.best) {
                  useUI.getState().cheerUp();
                  afterBest();
                } else setMistakes((m) => m + 1);
              }}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}

      {phase === 'reason' && (
        <>
          <p className="activity-prompt">Why is this the best choice?</p>
          <div className="options options-col">
            {reasons.map((r) => (
              <button
                key={r.text}
                className="option option-left"
                onClick={() => {
                  if (r.correct) {
                    setFeedback({ ok: true, text: 'Exactly — good reasoning!' });
                    setPhase(s.write ? 'write' : 'done');
                  } else {
                    setFeedback({ ok: false, text: 'That’s not the main reason. Think again.' });
                    setMistakes((m) => m + 1);
                  }
                }}
              >
                {r.text}
              </button>
            ))}
          </div>
        </>
      )}

      {phase === 'write' && s.write && (
        <div className="write-box">
          <p className="activity-prompt">{s.write.prompt}</p>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder="Write your answer in English…" />
          {writing && <WritingChecklist result={writing} />}
          <button
            className="btn btn-primary"
            onClick={() => {
              const r = evaluateWriting(text, s.write!.minWords, s.write!.require);
              setWriting(r);
              if (r.ok) {
                useChapter.getState().addWriting(chapter.roomId, { id: `decide-${s.situation.slice(0, 24)}`, title: 'What Would You Do?', prompt: s.situation, text });
                setFeedback({ ok: true, text: 'Well argued! Saved to your profile.' });
                setPhase('done');
              }
            }}
          >
            Check my answer
          </button>
        </div>
      )}

      {feedback && (
        <div className={`feedback ${feedback.ok ? 'feedback-right' : 'feedback-wrong'}`}>
          <div className="feedback-text">
            <strong>{feedback.ok ? '✓' : '✗'} {feedback.text}</strong>
          </div>
          {phase === 'done' && <button className="btn btn-primary" onClick={advance} autoFocus>Next</button>}
        </div>
      )}
    </div>
  );
}
