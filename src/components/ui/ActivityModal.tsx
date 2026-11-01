import { useCallback, useMemo, useRef, useState } from 'react';
import { useUI, type ActivityRequest } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { getFurniture } from '../../data/content';
import { buildSession, retryOf, type Question } from '../../activities/engine';
import { ACTIVITY_COMPONENTS } from '../../activities/registry';
import { addObjectToRoom, finishSession } from '../../progression/actions';
import { SpeakButton } from './SpeakButton';

// Runs a lesson or practice session: questions one by one, feedback, then a summary.
// A wrong answer is asked again at the end, so every session finishes with success.

const PRAISE = ['Great job!', 'Brilliant!', 'You got it!', 'Excellent!', 'Well done!', 'Perfect!'];
const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

export function ActivityModal() {
  const request = useUI((s) => s.activity);
  if (!request) return null;
  return <Session key={`${request.objectId}-${request.stage}-${request.nonce}`} request={request} />;
}

function Session({ request }: { request: ActivityRequest }) {
  const { objectId, stage } = request;
  const def = getFurniture(objectId);
  const close = useUI((s) => s.closeActivity);
  const language = useProgress((s) => s.language);
  const level = useProgress((s) => s.level);

  const initial = useMemo(() => buildSession(objectId, stage, { language, level }), [objectId, stage, language, level]);
  const [queue, setQueue] = useState<Question[]>(initial);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [finished, setFinished] = useState(false);
  const missed = useRef(new Set<string>());
  const starsEarned = useRef(0);

  const question = queue[index];
  const baseKey = (q: Question) => q.key.split('#')[0];

  const onAnswer = useCallback(
    (correct: boolean) => {
      const firstTry = !missed.current.has(baseKey(question));
      useProgress.getState().recordAnswer(question.word.id, correct, firstTry);
      if (correct && firstTry) starsEarned.current++;
      if (!correct) {
        missed.current.add(baseKey(question));
        setQueue((q) => [...q, retryOf(question, q.length)]);
      }
      setFeedback({ correct, text: correct ? pick(PRAISE) : 'Not quite!' });
    },
    [question],
  );

  const next = () => {
    setFeedback(null);
    if (index + 1 < queue.length) {
      setIndex(index + 1);
    } else {
      finishSession(objectId, stage, missed.current.size === 0);
      setFinished(true);
    }
  };

  const Activity = question ? ACTIVITY_COMPONENTS[question.type] : null;
  const total = queue.length;

  return (
    <div className="overlay" onPointerDown={(e) => e.target === e.currentTarget && close()}>
      <div className="modal activity-modal" role="dialog" aria-modal="true" aria-label={`${def.name} ${stage}`}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">{stage === 'lesson' ? `Lesson · unlock the ${def.name.toLowerCase()}` : `Practice · ${def.name}`}</span>
            {!finished && (
              <div className="dots">
                {queue.map((q, i) => (
                  <span key={q.key} className={`dot ${i < index || (i === index && feedback) ? 'done' : ''} ${i === index ? 'current' : ''}`} />
                ))}
              </div>
            )}
          </div>
          <button className="icon-btn" onClick={close} aria-label="Close">✕</button>
        </div>

        {finished ? (
          <Summary request={request} stars={starsEarned.current} perfect={missed.current.size === 0} total={initial.length} />
        ) : (
          <>
            {Activity && <Activity key={question.key} question={question} onAnswer={onAnswer} />}
            {feedback && (
              <div className={`feedback ${feedback.correct ? 'feedback-right' : 'feedback-wrong'}`}>
                <div className="feedback-text">
                  <strong>{feedback.correct ? '✓' : '✗'} {feedback.text}</strong>
                  <span>
                    {feedback.correct ? (missed.current.has(baseKey(question)) ? 'No star this time, but well remembered!' : '+1 ★') : <>The answer is <b>{question.answer}</b>. We’ll try again later.</>}
                  </span>
                  {(question.word.translations?.[language] || question.word.example) && (
                    <span className="feedback-extra">
                      <b>{question.word.word}</b>
                      {question.word.translations?.[language] && <> — {question.word.translations[language]}</>}
                      {question.word.example && <em> “{question.word.example}”</em>}
                      <SpeakButton text={question.word.example ?? question.word.word} small />
                    </span>
                  )}
                </div>
                <button className="btn btn-primary" onClick={next} autoFocus>
                  {index + 1 < total ? 'Continue' : 'Finish'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Summary({ request, stars, perfect, total }: { request: ActivityRequest; stars: number; perfect: boolean; total: number }) {
  const def = getFurniture(request.objectId);
  const close = useUI((s) => s.closeActivity);
  const lesson = request.stage === 'lesson';
  return (
    <div className="summary">
      <div className="summary-burst">{lesson ? '🎉' : perfect ? '🌟' : '👏'}</div>
      <h2>{lesson ? `You unlocked the ${def.name.toLowerCase()}!` : 'Practice complete!'}</h2>
      <p className="summary-stars">
        +{stars} <span className="star-icon">★</span> <span className="muted">({stars}/{total} first try)</span>
      </p>
      {perfect && <p className="badge">💯 No mistakes!</p>}
      <div className="summary-actions">
        {lesson ? (
          <>
            <button className="btn btn-primary" onClick={() => { close(); addObjectToRoom(def.id); }}>
              Put it in my room
            </button>
            <button className="btn btn-soft" onClick={close}>Later</button>
          </>
        ) : (
          <>
            <button className="btn btn-primary" onClick={close}>Back to my room</button>
            <button className="btn btn-soft" onClick={() => useUI.getState().openActivity({ ...request })}>Practise again</button>
          </>
        )}
      </div>
    </div>
  );
}
