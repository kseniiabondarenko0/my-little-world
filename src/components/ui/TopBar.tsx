import { useProgress } from '../../progression/progressStore';
import { useLayout, EMPTY_ITEMS } from '../../rooms/layoutStore';
import { useUI } from '../../hooks/useUIStore';
import { getRoom } from '../../rooms';
import { roomCompletion } from '../../progression/rules';

export function TopBar() {
  const progress = useProgress();
  const room = getRoom(progress.currentRoomId);
  const items = useLayout((s) => s.rooms[room.id] ?? EMPTY_ITEMS);
  const openModal = useUI((s) => s.openModal);
  const pct = roomCompletion(room, progress, items);

  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-logo">🏡</span>
        <span className="brand-name">My Little World</span>
      </div>

      <button className="pill room-pill" onClick={() => openModal('rooms')} aria-label="Open map">
        <span>{room.icon}</span>
        <span className="room-name">{room.name}</span>
        <span className="chev">▾</span>
      </button>

      <div className="progress" title={`${room.name}: ${pct}% complete`}>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-label">{pct}%</span>
      </div>

      <div className="topbar-right">
        <div className="pill stars" key={progress.stars} title="Stars">
          <span className="star-icon">★</span>
          <span>{progress.stars}</span>
        </div>
        <button className="icon-btn" onClick={() => openModal('words')} aria-label="Word book" title="Word book">📖</button>
        <button className="icon-btn" onClick={() => openModal('achievements')} aria-label="Achievements" title="Achievements">🏆</button>
        <button className="icon-btn" onClick={() => openModal('menu')} aria-label="Menu" title="Menu">☰</button>
      </div>
    </header>
  );
}
