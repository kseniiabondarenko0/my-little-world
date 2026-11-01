import { useState } from 'react';
import { JourneyPanel } from './JourneyPanel';
import { useChapterView } from '../../hooks/useChapterView';
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
  const tab = useUI((s) => s.panelTab);
  const setTab = useUI((s) => s.setPanelTab);
  const { percent } = useChapterView();
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
      <div className="panel-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'journey'} className={tab === 'journey' ? 'active' : ''} onClick={() => { setTab('journey'); setOpen(true); }}>
          🗺️ Journey <span className="catalogue-count">{percent}%</span>
        </button>
        <button role="tab" aria-selected={tab === 'furniture'} className={tab === 'furniture' ? 'active' : ''} onClick={() => { setTab('furniture'); setOpen(true); }}>
          🛋️ Furniture <span className="catalogue-count">{room.objects.filter((id) => progress.unlocked.includes(id)).length}/{room.objects.length}</span>
        </button>
        <button className="panel-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Hide panel' : 'Show panel'}>
          {open ? '▾' : '▴'}
        </button>
      </div>
      {tab === 'journey' ? <JourneyPanel /> : (
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
      )}
    </aside>
  );
}
