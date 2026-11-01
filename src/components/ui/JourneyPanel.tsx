import { useEffect, useState } from 'react';
import { useChapterView } from '../../hooks/useChapterView';
import { ensurePicks, startTask } from '../../progression/actions';
import { useMission } from '../../missions/missionStore';
import type { Stage } from '../../chapter/stages';

// The chapter journey: 7 stages that open one after another, each with its tasks.

export function JourneyPanel() {
  const { stages } = useChapterView();
  const missionActive = useMission((s) => s.run !== null);
  const current = stages.find((s) => s.unlocked && !s.done) ?? stages[stages.length - 1];
  const [openId, setOpenId] = useState(current.id);

  // When a stage is finished, jump to the next one.
  useEffect(() => setOpenId(current.id), [current.id]);
  useEffect(() => {
    if (current.id === 'minigames') ensurePicks();
  }, [current.id]);

  const total = stages.reduce((n, s) => n + s.minutes, 0);
  const allDone = stages.every((s) => s.done);

  return (
    <div className="journey">
      {allDone && (
        <div className="journey-done">🏆 Chapter complete! You can replay any task.</div>
      )}
      {stages.map((stage, i) => (
        <StageCard
          key={stage.id}
          index={i}
          stage={stage}
          open={openId === stage.id}
          current={stage.id === current.id && !allDone}
          disabled={missionActive}
          onToggle={() => setOpenId(openId === stage.id ? '' : stage.id)}
        />
      ))}
      <p className="muted small journey-foot">About {total} minutes in total · progress saves automatically</p>
    </div>
  );
}

function StageCard({ stage, index, open, current, disabled, onToggle }: {
  stage: Stage; index: number; open: boolean; current: boolean; disabled: boolean; onToggle: () => void;
}) {
  const doneCount = stage.tasks.filter((t) => t.done).length;
  const state = stage.done ? 'done' : stage.unlocked ? 'open' : 'locked';
  return (
    <div className={`stage stage-${state} ${current ? 'current' : ''}`}>
      <button className="stage-head" onClick={onToggle} aria-expanded={open}>
        <span className="stage-num">{stage.done ? '✓' : stage.unlocked ? index + 1 : '🔒'}</span>
        <span className="stage-title">
          <b>{stage.icon} {stage.title}</b>
          <span className="muted small">
            {stage.unlocked ? `${doneCount}/${stage.tasks.length || 3} · ~${stage.minutes} min` : 'Finish the stage above to open'}
          </span>
        </span>
      </button>
      {open && (
        <div className="stage-body">
          <p className="muted small">{stage.description}</p>
          {stage.unlocked ? (
            <ul className="tasks">
              {stage.tasks.length === 0 && <li className="muted small">Choosing your games…</li>}
              {stage.tasks.map((t) => (
                <li key={t.id} className={`task ${t.done ? 'done' : ''}`}>
                  <span className="task-icon">{t.done ? '✅' : t.icon}</span>
                  <span className="task-title">
                    {t.title}
                    {t.progress && !t.done && <span className="muted small"> · {t.progress[0]}/{t.progress[1]}</span>}
                  </span>
                  {t.kind !== 'auto' ? (
                    <button className={`btn ${t.done ? 'btn-soft' : 'btn-primary'} btn-small`} disabled={disabled} onClick={() => startTask(t)}>
                      {t.done ? 'Replay' : 'Start'}
                    </button>
                  ) : (
                    !t.done && (
                      <button className="btn btn-soft btn-small" disabled={disabled} onClick={() => startTask(t)}>
                        How?
                      </button>
                    )
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="locked-note">🔒 Locked</p>
          )}
        </div>
      )}
    </div>
  );
}
