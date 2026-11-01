import { useCallback, useState } from 'react';
import { useUI } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { getChapter } from '../../data/chapters';
import { MINIGAMES } from '../../minigames/registry';
import { MINIGAME_COMPONENTS, type MiniGameResult } from '../../minigames/components';
import { completeTask } from '../../progression/actions';

// Window for the mini-games that don't need the 3D room.

export function MinigameModal() {
  const game = useUI((s) => s.minigame);
  if (!game) return null;
  return <Game key={game.nonce} gameId={game.gameId} taskId={game.taskId} />;
}

function Game({ gameId, taskId }: { gameId: string; taskId: string | null }) {
  const close = useUI((s) => s.closeMinigame);
  const { level, language, currentRoomId } = useProgress.getState();
  const info = MINIGAMES.find((g) => g.id === gameId)!;
  const Component = MINIGAME_COMPONENTS[gameId];
  const [result, setResult] = useState<MiniGameResult | null>(null);

  const onComplete = useCallback(
    (r: MiniGameResult) => {
      setResult(r);
      if (taskId) completeTask(taskId, info.title, 40);
      else useProgress.getState().addXp(15);
    },
    [taskId, info.title],
  );

  return (
    <div className="overlay">
      <div className="modal modal-wide activity-modal" role="dialog" aria-modal="true" aria-label={info.title}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">Mini-game</span>
            <h2>{info.icon} {info.title}</h2>
          </div>
          <button className="icon-btn" onClick={close} aria-label="Close">✕</button>
        </div>
        {result ? (
          <div className="summary">
            <div className="summary-burst">{result.mistakes === 0 ? '🌟' : '🎉'}</div>
            <h2>{info.title} complete!</h2>
            <p className="muted">{result.detail}</p>
            {result.mistakes === 0 && <p className="badge">💯 No mistakes!</p>}
            <div className="summary-actions">
              <button className="btn btn-primary" onClick={close}>Back to my room</button>
              <button className="btn btn-soft" onClick={() => useUI.getState().openMinigame(gameId, null)}>Play again</button>
            </div>
          </div>
        ) : (
          <Component chapter={getChapter(currentRoomId)} level={level} language={language} onComplete={onComplete} />
        )}
      </div>
    </div>
  );
}
