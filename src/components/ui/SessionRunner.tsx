import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useProgress } from '../../progression/progressStore';
import { useUI } from '../../hooks/useUIStore';
import { retryOf, type Question } from '../../activities/engine';
import { ACTIVITY_COMPONENTS } from '../../activities/registry';
import { SpeakButton } from './SpeakButton';

// Plays a list of questions one by one with feedback, then shows a summary.
// A wrong answer comes back later (by default the same question; training passes
// `makeRetry` to ask it in a different format), so every session ends in success.
// Used by lessons, vocabulary training and Practice Mode.

const PRAISE = ['Great job!', 'Brilliant!', 'You got it!', 'Excellent!', 'Well done!', 'Perfect!'];
const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

export interface SessionResult {
  stars: number;
  firstTry: number;
  total: number;
  perfect: boolean;
}

interface Props {
  questions: Question[];
  eyebrow: string;
  onClose: () => void;
  onFinish?: (result: SessionResult) => void;
  renderSummary: (result: SessionResult) => ReactNode;
  makeRetry?: (q: Question, attempt: number) => Question;
  /** Inside another window (Practice Mode) instead of its own overlay. */
  inline?: boolean;
}

export function SessionRunner({ questions, eyebrow, onClose, onFinish, renderSummary, makeRetry = retryOf, inline }: Props) {
  const language = useProgress((s) => s.language);
  const [queue, setQueue] = useState<Question[]>(questions);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);
  const missed = useRef(new Set<string>());
  const stars = useRef(0);

  const question = queue[index];
  const baseKey = (q: Question) => q.key.split('#')[0];

  const onAnswer = useCallback(
    (correct: boolean) => {
      const firstTry = !missed.current.has(baseKey(question));
      useProgress.getState().recordAnswer(question.word.id, correct, firstTry);
      if (correct && firstTry) stars.current++;
      if (correct) useUI.getState().cheerUp();
      if (!correct) {
        missed.current.add(baseKey(question));
        setQueue((q) => [...q, makeRetry(question, q.length)]);
      }
      setFeedback({ correct, text: correct ? pick(PRAISE) : 'Not quite!' });
    },
    [question, makeRetry],
  );

  const next = () => {
    setFeedback(null);
    if (index + 1 < queue.length) {
      setIndex(index + 1);
      return;
    }
    const r = { stars: stars.current, firstTry: stars.current, total: questions.length, perfect: missed.current.size === 0 };
    onFinish?.(r);
    setResult(r);
  };

  const Activity = question ? ACTIVITY_COMPONENTS[question.type] : null;
  const isMatch = question?.type === 'match';
  const answerShown = question?.type === 'multipleChoice' || question?.type === 'sentence' || question?.type === 'builder' ? question.answer : question?.word.word;

  const body = (
    <>
      <div className="modal-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          {!result && (
            <div className="dots">
              {queue.map((q, i) => (
                <span key={q.key} className={`dot ${i < index || (i === index && feedback) ? 'done' : ''} ${i === index ? 'current' : ''}`} />
              ))}
            </div>
          )}
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {result ? (
        renderSummary(result)
      ) : (
        <>
          {Activity && question && <Activity key={question.key} question={question} onAnswer={onAnswer} />}
          {feedback && question && (
            <div className={`feedback ${feedback.correct ? 'feedback-right' : 'feedback-wrong'}`}>
              <div className="feedback-text">
                <strong>{feedback.correct ? '✓' : '✗'} {feedback.text}</strong>
                <span>
                  {feedback.correct
                    ? missed.current.has(baseKey(question)) ? 'No star this time, but well remembered!' : '+1 ★'
                    : isMatch ? 'Some pairs were mixed up. We’ll try again later.' : <>The answer is <b>{answerShown}</b>. We’ll try again later.</>}
                </span>
                {!isMatch && (question.word.translations?.[language] || question.word.example) && (
                  <span className="feedback-extra">
                    <b>{question.word.word}</b>
                    {question.word.translations?.[language] && <> — {question.word.translations[language]}</>}
                    {question.word.example && <em> “{question.word.example}”</em>}
                    <SpeakButton text={question.word.example ?? question.word.word} small />
                  </span>
                )}
              </div>
              <button className="btn btn-primary" onClick={next} autoFocus>
                {index + 1 < queue.length ? 'Continue' : 'Finish'}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );

  if (inline) return <div className="session-inline">{body}</div>;
  return (
    <div className="overlay">
      <div className="modal activity-modal" role="dialog" aria-modal="true" aria-label={eyebrow}>
        {body}
      </div>
    </div>
  );
}
