import { useState } from 'react';
import { useProgress } from '../../progression/progressStore';
import { useLayout, EMPTY_ITEMS } from '../../rooms/layoutStore';
import { useUI } from '../../hooks/useUIStore';
import { getRoom } from '../../rooms';
import { getFurniture } from '../../data/content';
import { objectStatus, type ObjectStatus } from '../../progression/rules';
import { addObjectToRoom } from '../../progression/actions';

const LABELS: Record<ObjectStatus, string> = {
  locked: '',
  learn: 'Learn to unlock',
  ready: 'Tap to add',
  placed: 'In your room',
};

export function Catalogue() {
  const progress = useProgress();
  const room = getRoom(progress.currentRoomId);
  const items = useLayout((s) => s.rooms[room.id] ?? EMPTY_ITEMS);
  const thumbnails = useUI((s) => s.thumbnails);
  const { openActivity, select, pushToast } = useUI.getState();
  const [open, setOpen] = useState(true);

  const onCard = (id: string, status: ObjectStatus) => {
    const def = getFurniture(id);
    if (status === 'locked') {
      const need = def.starsRequired - progress.stars;
      pushToast({ icon: '🔒', title: `${def.name} is locked`, text: `Earn ${need} more ★ to open its lesson.`, tone: 'info' });
    } else if (status === 'learn') {
      openActivity({ objectId: id, stage: 'lesson' });
    } else if (status === 'ready') {
      addObjectToRoom(id);
    } else {
      select(items.find((i) => i.objectId === id)?.uid ?? null);
    }
  };

  return (
    <aside className={`catalogue ${open ? 'open' : 'closed'}`}>
      <button className="catalogue-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>🛋️ Furniture</span>
        <span className="catalogue-count">
          {room.objects.filter((id) => progress.unlocked.includes(id)).length}/{room.objects.length}
        </span>
        <span className="chev">{open ? '▾' : '▴'}</span>
      </button>
      <div className="catalogue-list">
        {room.objects.map((id) => {
          const def = getFurniture(id);
          const status = objectStatus(id, progress, items);
          return (
            <button key={id} className={`card card-${status}`} onClick={() => onCard(id, status)}>
              <div className="card-thumb">
                {thumbnails[id] ? <img src={thumbnails[id]} alt="" draggable={false} /> : <span className="card-emoji">{def.icon}</span>}
                {status === 'locked' && <span className="card-lock">🔒</span>}
                {status === 'placed' && <span className="card-check">✓</span>}
                {progress.practised.includes(id) && <span className="card-star">★</span>}
              </div>
              <div className="card-body">
                <span className="card-name">{def.name}</span>
                <span className="card-status">
                  {status === 'locked' ? <>Need <b>★ {def.starsRequired}</b></> : LABELS[status]}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
