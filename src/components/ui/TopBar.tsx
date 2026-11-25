import { useProgress } from '../../progression/progressStore';
import { useUI } from '../../hooks/useUIStore';
import { usePlayer } from '../../player/playerStore';
import { useChapterView } from '../../hooks/useChapterView';
import { AvatarPortrait } from './AvatarPortrait';
import { useEffect, useState } from 'react';
import { isSfxMuted, onSfxMutedChange, setSfxMuted } from '../../audio/sfx';

export function TopBar() {
  const stars = useProgress((s) => s.stars);
  const player = usePlayer((s) => s.current);
  const openModal = useUI((s) => s.openModal);
  const { percent, room } = useChapterView();
  const [muted, setMuted] = useState(isSfxMuted());
  useEffect(() => {
    const off = onSfxMutedChange(setMuted);
    return () => { off(); };
  }, []);

  return (
    <header className="topbar">
      {player ? (
        <button className="player-btn" onClick={() => openModal('profile')} aria-label="My profile">
          <AvatarPortrait avatar={player.avatar} size={38} />
          <span className="player-name">{player.nickname}</span>
        </button>
      ) : (
        <div className="brand">
          <span className="brand-logo">🏡</span>
          <span className="brand-name">My Little World</span>
        </div>
      )}

      <button className="pill room-pill" onClick={() => openModal('rooms')} aria-label="Open map">
        <span>{room.icon}</span>
        <span className="room-name">{room.name}</span>
        <span className="chev">▾</span>
      </button>

      <div className="progress" title={`${room.name} chapter: ${percent}% complete`}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="progress-label">{percent}%</span>
      </div>

      <div className="topbar-right">
        <div className="pill stars" key={stars} title="Stars">
          <span className="star-icon">★</span>
          <span>{stars}</span>
        </div>
        <button className="icon-btn practice-btn" onClick={() => openModal('practice')} aria-label="Practice Mode" title="Practice Mode">
          🎯<span className="hide-sm">Practice</span>
        </button>
        <button
          className="icon-btn"
          onClick={() => setSfxMuted(!muted)}
          aria-label={muted ? 'Turn click sounds on' : 'Turn click sounds off'}
          aria-pressed={!muted}
          title={muted ? 'Click sounds: off' : 'Click sounds: on'}
        >
          {muted ? '🔇' : '🔔'}
        </button>
        <button className="icon-btn" onClick={() => openModal('menu')} aria-label="Menu" title="Menu">☰</button>
      </div>
    </header>
  );
}
