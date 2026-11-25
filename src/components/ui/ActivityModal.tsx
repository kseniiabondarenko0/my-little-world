import { useMemo } from 'react';
import { COURSE } from '../../courses/active';
import { useUI, type ActivityRequest } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { getFurniture } from '../../data/content';
import { buildSession } from '../../activities/engine';
import { buildLesson } from '../../activities/lesson';
import { addObjectToRoom, finishSession } from '../../progression/actions';
import { SessionRunner, type SessionResult } from './SessionRunner';

// Furniture lessons (unlock) and object practice, played with the shared SessionRunner.

export function ActivityModal() {
  const request = useUI((s) => s.activity);
  if (!request) return null;
  return <Session key={`${request.objectId}-${request.stage}-${request.nonce}`} request={request} />;
}

// English: "the bed". Other courses show the word as taught: "das Bett", "łóżko".
const theName = (name: string) => (COURSE.id === 'en' ? `the ${name.toLowerCase()}` : name);

function Session({ request }: { request: ActivityRequest }) {
  const { objectId, stage } = request;
  const def = getFurniture(objectId);
  const close = useUI((s) => s.closeActivity);
  const language = useProgress((s) => s.language);
  const level = useProgress((s) => s.level);
  const questions = useMemo(() => (stage === 'lesson' ? buildLesson(objectId, { language, level }) : buildSession(objectId, stage, { language, level })), [objectId, stage, language, level]);

  return (
    <SessionRunner
      questions={questions}
      eyebrow={stage === 'lesson' ? `Lesson · unlock ${theName(def.name)}` : `Practice · ${def.name}`}
      onClose={close}
      onFinish={(r) => finishSession(objectId, stage, r.perfect)}
      renderSummary={(r) => <Summary request={request} result={r} />}
    />
  );
}

function Summary({ request, result }: { request: ActivityRequest; result: SessionResult }) {
  const def = getFurniture(request.objectId);
  const close = useUI((s) => s.closeActivity);
  const lesson = request.stage === 'lesson';
  return (
    <div className="summary">
      <div className="summary-burst">{lesson ? '🎉' : result.perfect ? '🌟' : '👏'}</div>
      <h2>{lesson ? `You unlocked ${theName(def.name)}!` : 'Practice complete!'}</h2>
      <p className="summary-stars">
        +{result.stars} <span className="star-icon">★</span> <span className="muted">({result.stars}/{result.total} first try)</span>
      </p>
      {result.perfect && <p className="badge">💯 No mistakes!</p>}
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
