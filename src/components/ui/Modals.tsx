import { useMemo, useState, type ReactNode } from 'react';
import { useUI } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { useLayout } from '../../rooms/layoutStore';
import { LOCATIONS, getRoom } from '../../rooms';
import { ACHIEVEMENTS } from '../../data/achievements';
import { ALL_WORDS, LEVELS } from '../../data/content';
import { roomCompletion } from '../../progression/rules';
import type { Level, NativeLanguage } from '../../types/game';
import { SpeakButton } from './SpeakButton';

function Modal({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  const close = () => useUI.getState().openModal(null);
  return (
    <div className="overlay" onPointerDown={(e) => e.target === e.currentTarget && close()}>
      <div className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button className="icon-btn" onClick={close} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function RoomsModal() {
  const progress = useProgress();
  const rooms = useLayout((s) => s.rooms);
  const area = (a: 'house' | 'city') => LOCATIONS.filter((l) => l.area === a);
  const bedroomDone = progress.completedRooms.includes('bedroom');

  const tile = (l: (typeof LOCATIONS)[number]) => {
    const playable = !!l.room;
    const pct = l.room ? roomCompletion(l.room, progress, rooms[l.id] ?? []) : 0;
    const current = progress.currentRoomId === l.id;
    const hint = playable ? `${pct}% complete` : l.id === 'kitchen' && bedroomDone ? 'Coming in the next update!' : 'Coming soon';
    return (
      <div key={l.id} className={`map-tile ${playable ? 'playable' : 'soon'} ${current ? 'current' : ''}`}>
        <span className="map-icon">{l.icon}</span>
        <span className="map-name">{l.name}</span>
        <span className="map-hint">{playable ? hint : <>🔒 {hint}</>}</span>
        {playable && <div className="mini-track"><div style={{ width: `${pct}%` }} /></div>}
      </div>
    );
  };

  return (
    <Modal title="My World" wide>
      <h3 className="section-title">🏠 My house</h3>
      <div className="map-grid">{area('house').map(tile)}</div>
      <h3 className="section-title">🏙️ Around town</h3>
      <div className="map-grid">{area('city').map(tile)}</div>
      <p className="muted small">Complete a room to unlock the next one.</p>
    </Modal>
  );
}

function AchievementsModal() {
  const earned = useProgress((s) => s.achievements);
  return (
    <Modal title="Achievements">
      <p className="muted">{earned.length} of {ACHIEVEMENTS.length} earned</p>
      <div className="ach-list">
        {ACHIEVEMENTS.map((a) => {
          const got = earned.includes(a.id);
          return (
            <div key={a.id} className={`ach ${got ? 'got' : ''}`}>
              <span className="ach-icon">{got ? a.icon : '🔒'}</span>
              <div>
                <strong>{a.title}</strong>
                <span>{a.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

const LANGUAGES: { id: NativeLanguage; label: string }[] = [
  { id: 'uk', label: 'Українська' },
  { id: 'ru', label: 'Русский' },
];

function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { id: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="segmented">
      {options.map((o) => (
        <button key={o.id} className={value === o.id ? 'active' : ''} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function MenuModal() {
  const { language, level, setLanguage, setLevel } = useProgress();
  const [confirm, setConfirm] = useState(false);

  const reset = () => {
    useProgress.getState().reset();
    useLayout.getState().reset();
    useUI.getState().select(null);
    useUI.getState().openModal('intro');
  };

  return (
    <Modal title="Menu">
      <h3 className="section-title">My language</h3>
      <Segmented value={language} options={LANGUAGES} onChange={setLanguage} />

      <h3 className="section-title">My English level</h3>
      <Segmented value={level} options={LEVELS.map((l) => ({ id: l, label: l }))} onChange={(l: Level) => setLevel(l)} />
      <p className="muted small">Practice includes extra words up to this level.</p>

      <h3 className="section-title">How to play</h3>
      <ul className="help">
        <li><b>Rotate the view:</b> drag on the room (one finger on a phone).</li>
        <li><b>Zoom:</b> mouse wheel or pinch.</li>
        <li><b>Unlock furniture:</b> tap it in the catalogue and finish its lesson.</li>
        <li><b>Move:</b> drag an object. Red means it doesn’t fit there.</li>
        <li><b>Practise:</b> tap an object, then “Practice”. Or double-click it.</li>
        <li><b>Keyboard:</b> R rotates, Delete puts back, Esc closes.</li>
      </ul>

      <h3 className="section-title">Progress</h3>
      {confirm ? (
        <div className="confirm-row">
          <span>Delete all progress on this device?</span>
          <button className="btn btn-danger" onClick={reset}>Yes, start again</button>
          <button className="btn btn-soft" onClick={() => setConfirm(false)}>Cancel</button>
        </div>
      ) : (
        <button className="btn btn-soft" onClick={() => setConfirm(true)}>Start again…</button>
      )}
      <p className="muted small">Progress is saved automatically in this browser.</p>
    </Modal>
  );
}

function WordBookModal() {
  const { language, words, level: myLevel } = useProgress();
  const [level, setLevel] = useState<Level | 'all'>(myLevel);
  const [category, setCategory] = useState('all');
  const categories = useMemo(() => ['all', ...new Set(ALL_WORDS.map((w) => w.category))], []);
  const list = ALL_WORDS.filter((w) => (level === 'all' || w.level === level) && (category === 'all' || w.category === category));
  const learned = ALL_WORDS.filter((w) => (words[w.id]?.correct ?? 0) > 0).length;

  return (
    <Modal title="Word Book" wide>
      <p className="muted">{learned} of {ALL_WORDS.length} words practised</p>
      <Segmented value={level} options={[{ id: 'all' as const, label: 'All' }, ...LEVELS.map((l) => ({ id: l, label: l }))]} onChange={setLevel} />
      <div className="chips">
        {categories.map((c) => (
          <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="word-list">
        {list.map((w) => (
          <div key={w.id} className={`word-row ${(words[w.id]?.correct ?? 0) > 0 ? 'known' : ''}`}>
            <SpeakButton text={w.word} small />
            <span className="word-en">{w.word}</span>
            <span className="word-native">{w.translations?.[language] ?? ''}</span>
            <span className={`level level-${w.level}`}>{w.level}</span>
          </div>
        ))}
        {list.length === 0 && <p className="muted">No words here yet.</p>}
      </div>
    </Modal>
  );
}

function IntroModal() {
  const { language, setLanguage, setSeenIntro } = useProgress();
  const room = getRoom(useProgress((s) => s.currentRoomId));
  const start = () => {
    setSeenIntro();
    useUI.getState().openModal(null);
  };
  return (
    <div className="overlay">
      <div className="modal intro" role="dialog" aria-modal="true" aria-label="Welcome">
        <div className="intro-art">🏡</div>
        <h1>My Little World</h1>
        <p>Your {room.name.toLowerCase()} is empty! Learn English words to unlock furniture and make it cosy.</p>
        <ol className="intro-steps">
          <li><span>1</span> Tap furniture in the catalogue</li>
          <li><span>2</span> Finish the lesson to unlock it</li>
          <li><span>3</span> Place it, then tap it to practise</li>
        </ol>
        <h3 className="section-title">My language</h3>
        <Segmented value={language} options={LANGUAGES} onChange={setLanguage} />
        <button className="btn btn-primary btn-big" onClick={start}>Let’s start!</button>
      </div>
    </div>
  );
}

export function Modals() {
  const modal = useUI((s) => s.modal);
  switch (modal) {
    case 'rooms': return <RoomsModal />;
    case 'achievements': return <AchievementsModal />;
    case 'menu': return <MenuModal />;
    case 'words': return <WordBookModal />;
    case 'intro': return <IntroModal />;
    default: return null;
  }
}

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <button key={t.id} className={`toast toast-${t.tone ?? 'info'}`} onClick={() => dismiss(t.id)}>
          <span className="toast-icon">{t.icon}</span>
          <span className="toast-text">
            <strong>{t.title}</strong>
            {t.text && <span>{t.text}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
