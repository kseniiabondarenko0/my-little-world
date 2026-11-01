import { useMemo } from 'react';
import { useUI } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { buildTraining, retryInNewFormat } from '../../learning/questions';
import { completeTask } from '../../progression/actions';
import { useChapter } from '../../chapter/chapterStore';
import { masteredCount, MASTERY_GOAL } from '../../chapter/stages';
import { SessionRunner, type SessionResult } from './SessionRunner';

// Stage 3: a vocabulary training session in mixed formats with spaced repetition.

export function TrainingModal() {
  const training = useUI((s) => s.training);
  if (!training) return null;
  return <Training key={training.nonce} />;
}

function Training() {
  const close = useUI((s) => s.closeTraining);
  const { language, level, currentRoomId } = useProgress.getState();
  const questions = useMemo(() => {
    const { words, tick } = useProgress.getState();
    return buildTraining(currentRoomId, { language, level }, words, tick);
  }, [currentRoomId, language, level]);

  const onFinish = () => {
    const done = useChapter.getState().rooms[currentRoomId]?.done ?? [];
    const session = !done.includes('vocab:session-1') ? 'vocab:session-1' : !done.includes('vocab:session-2') ? 'vocab:session-2' : null;
    if (session) completeTask(session, session.endsWith('1') ? 'Training session 1' : 'Training session 2', 40);
    if (masteredCount(currentRoomId, level, useProgress.getState().words) >= MASTERY_GOAL) completeTask('vocab:mastery', `Master ${MASTERY_GOAL} words`, 40);
  };

  return (
    <SessionRunner
      questions={questions}
      eyebrow="Vocabulary training"
      onClose={close}
      onFinish={onFinish}
      makeRetry={(q, attempt) => retryInNewFormat(q, attempt, { language, level })}
      renderSummary={(r) => <Summary result={r} />}
    />
  );
}

function Summary({ result }: { result: SessionResult }) {
  const close = useUI((s) => s.closeTraining);
  const open = useUI((s) => s.openTraining);
  const { level, currentRoomId, words } = useProgress();
  const mastered = masteredCount(currentRoomId, level, words);
  return (
    <div className="summary">
      <div className="summary-burst">{result.perfect ? '🌟' : '💪'}</div>
      <h2>Training complete!</h2>
      <p className="summary-stars">
        +{result.stars} <span className="star-icon">★</span> <span className="muted">({result.firstTry}/{result.total} first try)</span>
      </p>
      <p className="muted">Mastered words in this room: <b>{mastered}</b>. Words you missed will come back soon.</p>
      <div className="summary-actions">
        <button className="btn btn-primary" onClick={close}>Back to my room</button>
        <button className="btn btn-soft" onClick={() => open(null)}>Train again</button>
      </div>
    </div>
  );
}
