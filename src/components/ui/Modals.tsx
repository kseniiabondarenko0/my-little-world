import { useMemo, useState, type ReactNode } from 'react';
import { useUI } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { useLayout } from '../../rooms/layoutStore';
import { useChapter } from '../../chapter/chapterStore';
import { usePlayer } from '../../player/playerStore';
import { LOCATIONS } from '../../rooms';
import { ACHIEVEMENTS } from '../../data/achievements';
import { ALL_WORDS, LEVELS } from '../../data/content';
import { masteryOf, type Mastery } from '../../learning/srs';
import { useChapterView } from '../../hooks/useChapterView';
import type { AvatarConfig, PlayerProfile } from '../../player/types';
import type { Level } from '../../types/game';
import { SpeakButton } from './SpeakButton';
import { AvatarPortrait } from './AvatarPortrait';
import { AvatarCreator } from './AvatarCreator';
import { Segmented, LANGUAGES } from './Segmented';
import { checkNickname } from '../../player/playerService';

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

// XP levels: every level needs 50 XP more than the last (150, 200, 250...).
export function xpLevel(xp: number) {
  let level = 1;
  let need = 150;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level++;
    need += 50;
  }
  return { level, into: rest, need };
}

function RoomsModal() {
  const completed = useProgress((s) => s.completedRooms);
  const currentRoomId = useProgress((s) => s.currentRoomId);
  const { percent } = useChapterView();
  const area = (a: 'house' | 'city') => LOCATIONS.filter((l) => l.area === a);
  const bedroomDone = completed.includes('bedroom');

  const tile = (l: (typeof LOCATIONS)[number]) => {
    const playable = !!l.room;
    const pct = l.id === currentRoomId ? percent : completed.includes(l.id) ? 100 : 0;
    const hint = playable ? `${pct}% complete` : l.id === 'kitchen' && bedroomDone ? 'Coming in the next update!' : 'Coming soon';
    return (
      <div key={l.id} className={`map-tile ${playable ? 'playable' : 'soon'} ${currentRoomId === l.id ? 'current' : ''}`}>
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
      <p className="muted small">Finish a room’s final mission to unlock the next one.</p>
    </Modal>
  );
}

function AchievementList() {
  const earned = useProgress((s) => s.achievements);
  return (
    <>
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
    </>
  );
}

function AchievementsModal() {
  return (
    <Modal title="Achievements">
      <AchievementList />
    </Modal>
  );
}

function MenuModal() {
  const { language, level, setLanguage, setLevel } = useProgress();
  const player = usePlayer((s) => s.current);
  const players = usePlayer((s) => s.players);
  const [confirm, setConfirm] = useState(false);
  const open = useUI.getState().openModal;

  const reset = () => {
    useProgress.getState().reset();
    useLayout.getState().reset();
    useChapter.getState().reset();
    useUI.getState().select(null);
    open(null);
  };

  const tiles: { icon: string; label: string; onClick: () => void }[] = [
    { icon: '👤', label: 'My profile', onClick: () => open('profile') },
    { icon: '🎯', label: 'Practice Mode', onClick: () => open('practice') },
    { icon: '📖', label: 'Word Book', onClick: () => open('words') },
    { icon: '🏆', label: 'Achievements', onClick: () => open('achievements') },
    { icon: '🗺️', label: 'My World', onClick: () => open('rooms') },
    { icon: '🧭', label: 'Journey', onClick: () => { useUI.getState().setPanelTab('journey'); open(null); } },
  ];

  return (
    <Modal title="Menu">
      {player && (
        <button className="menu-player" onClick={() => open('profile')}>
          <AvatarPortrait avatar={player.avatar} size={48} />
          <span><b>{player.nickname}</b><span className="muted small">View profile</span></span>
        </button>
      )}
      <div className="menu-grid">
        {tiles.map((t) => (
          <button key={t.label} className="menu-tile" onClick={t.onClick}>
            <span className="menu-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <h3 className="section-title">My language</h3>
      <Segmented value={language} options={LANGUAGES} onChange={setLanguage} />

      <h3 className="section-title">My English level</h3>
      <Segmented value={level} options={LEVELS.map((l) => ({ id: l, label: l }))} onChange={(l: Level) => setLevel(l)} />
      <p className="muted small">Missions, games and practice change with the level.</p>

      <h3 className="section-title">How to play</h3>
      <ul className="help">
        <li><b>Journey tab:</b> follow the 7 stages of the chapter, one after another.</li>
        <li><b>Rotate the view:</b> drag on the room (one finger on a phone). <b>Zoom:</b> wheel or pinch.</li>
        <li><b>Unlock furniture:</b> Furniture tab → tap it → finish its lesson.</li>
        <li><b>Move:</b> drag an object. Red means it doesn’t fit there.</li>
        <li><b>Learn about an object:</b> tap it in the room.</li>
        <li><b>Keyboard:</b> R rotates, Delete puts back, Esc closes.</li>
      </ul>

      <h3 className="section-title">Players on this device</h3>
      <div className="switch-list">
        {players.filter((p) => p.id !== player?.id).map((p) => (
          <button key={p.id} className="player-chip" onClick={() => usePlayer.getState().switchTo(p.id)}>
            <AvatarPortrait avatar={p.avatar} size={32} /> {p.nickname}
          </button>
        ))}
        <button className="player-chip new" onClick={() => usePlayer.getState().switchTo(null)}>＋ New player</button>
      </div>
      <p className="muted small">Each player has their own room and progress, saved in this browser.</p>

      <h3 className="section-title">Progress</h3>
      {confirm ? (
        <div className="confirm-row">
          <span>Delete <b>{player?.nickname ?? 'this player'}</b>’s progress?</span>
          <button className="btn btn-danger" onClick={reset}>Yes, start again</button>
          <button className="btn btn-soft" onClick={() => setConfirm(false)}>Cancel</button>
        </div>
      ) : (
        <button className="btn btn-soft" onClick={() => setConfirm(true)}>Start again…</button>
      )}
    </Modal>
  );
}

const MASTERY_LABEL: Record<Mastery, string> = { new: 'New', learning: 'Learning', mastered: 'Mastered', revise: 'Revise' };

function WordBookModal() {
  const { language, words, level: myLevel } = useProgress();
  const [level, setLevel] = useState<Level | 'all'>(myLevel);
  const [category, setCategory] = useState('all');
  const categories = useMemo(() => ['all', ...new Set(ALL_WORDS.map((w) => w.category))], []);
  const list = ALL_WORDS.filter((w) => (level === 'all' || w.level === level) && (category === 'all' || w.category === category));
  const mastered = ALL_WORDS.filter((w) => masteryOf(words[w.id]) === 'mastered').length;

  return (
    <Modal title="Word Book" wide>
      <p className="muted">{mastered} of {ALL_WORDS.length} words mastered</p>
      <Segmented value={level} options={[{ id: 'all' as const, label: 'All' }, ...LEVELS.map((l) => ({ id: l, label: l }))]} onChange={setLevel} />
      <div className="chips">
        {categories.map((c) => (
          <button key={c} className={`chip chip-cap ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="word-list">
        {list.map((w) => {
          const m = masteryOf(words[w.id]);
          return (
            <div key={w.id} className={`word-row m-${m}`}>
              <SpeakButton text={w.word} small />
              <span className="word-en">{w.word}</span>
              <span className="word-native">{w.translations?.[language] ?? ''}</span>
              <span className={`mastery mastery-${m}`}>{MASTERY_LABEL[m]}</span>
              <span className={`level level-${w.level}`}>{w.level}</span>
            </div>
          );
        })}
        {list.length === 0 && <p className="muted">No words here yet.</p>}
      </div>
    </Modal>
  );
}

function ProfileModal() {
  const player = usePlayer((s) => s.current);
  const progress = useProgress();
  const chapters = useChapter((s) => s.rooms);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState<'overview' | 'words' | 'writing' | 'achievements'>('overview');
  if (!player) return null;
  const lvl = xpLevel(progress.xp);
  const counts = ALL_WORDS.reduce<Record<Mastery, number>>((acc, w) => {
    acc[masteryOf(progress.words[w.id])]++;
    return acc;
  }, { new: 0, learning: 0, mastered: 0, revise: 0 });
  const byLevel = LEVELS.map((l) => {
    const ws = ALL_WORDS.filter((w) => w.level === l);
    return { l, total: ws.length, mastered: ws.filter((w) => masteryOf(progress.words[w.id]) === 'mastered').length };
  });
  const writings = Object.values(chapters).flatMap((c) => c.writings).sort((a, b) => b.at - a.at);
  const revise = ALL_WORDS.filter((w) => masteryOf(progress.words[w.id]) === 'revise');

  if (editing) return <EditProfile player={player} onDone={() => setEditing(false)} />;

  return (
    <Modal title="My profile" wide>
      <div className="profile-head">
        <AvatarPortrait avatar={player.avatar} size={96} />
        <div className="profile-id">
          <h2>{player.nickname}</h2>
          <p className="muted small">Level {lvl.level} explorer · English level <b>{progress.level}</b></p>
          <div className="xp-bar"><div style={{ width: `${(lvl.into / lvl.need) * 100}%` }} /></div>
          <p className="muted small">{lvl.into}/{lvl.need} XP to level {lvl.level + 1}</p>
        </div>
        <button className="btn btn-soft" onClick={() => setEditing(true)}>✏️ Edit</button>
      </div>

      <div className="stat-row">
        <div className="stat"><b>★ {progress.stars}</b><span>Stars</span></div>
        <div className="stat"><b>⚡ {progress.xp}</b><span>XP</span></div>
        <div className="stat"><b>🏠 {progress.completedRooms.length}</b><span>Rooms done</span></div>
        <div className="stat"><b>🏆 {progress.achievements.length}</b><span>Achievements</span></div>
      </div>

      <Segmented
        value={tab}
        options={[{ id: 'overview', label: 'Words' }, { id: 'writing', label: `Writing (${writings.length})` }, { id: 'achievements', label: 'Achievements' }]}
        onChange={(t) => setTab(t as typeof tab)}
      />

      {tab === 'overview' && (
        <>
          <div className="mastery-row">
            <span className="mastery mastery-mastered">Mastered {counts.mastered}</span>
            <span className="mastery mastery-learning">Learning {counts.learning}</span>
            <span className="mastery mastery-revise">To revise {counts.revise}</span>
            <span className="mastery mastery-new">New {counts.new}</span>
          </div>
          {byLevel.map((b) => (
            <div key={b.l} className="level-progress">
              <span className={`level level-${b.l}`}>{b.l}</span>
              <div className="mini-track"><div style={{ width: `${(b.mastered / b.total) * 100}%` }} /></div>
              <span className="muted small">{b.mastered}/{b.total}</span>
            </div>
          ))}
          {revise.length > 0 && (
            <>
              <h3 className="section-title">Words to revise</h3>
              <div className="chips">
                {revise.slice(0, 16).map((w) => <span key={w.id} className="chip">{w.word}</span>)}
              </div>
              <button className="btn btn-primary" onClick={() => useUI.getState().openModal('practice')}>🎯 Practise them</button>
            </>
          )}
        </>
      )}

      {tab === 'writing' && (
        <div className="writings">
          {writings.length === 0 && <p className="muted">Texts you write in missions appear here — your teacher can read them.</p>}
          {writings.map((w) => (
            <div key={w.id + w.at} className="writing">
              <span className="eyebrow">{w.title} · {new Date(w.at).toLocaleDateString()}</span>
              <p className="muted small">{w.prompt}</p>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'achievements' && <AchievementList />}

      <p className="muted small profile-note">🔒 Your profile is stored only on this device. Player ID: {player.id.slice(0, 8)}</p>
    </Modal>
  );
}

function EditProfile({ player, onDone }: { player: PlayerProfile; onDone: () => void }) {
  const [nickname, setNickname] = useState(player.nickname);
  const [avatar, setAvatar] = useState<AvatarConfig>(player.avatar);
  const check = checkNickname(nickname, player.id);
  return (
    <Modal title="Edit profile" wide>
      <h3 className="section-title">Nickname</h3>
      <input className="typing-input" value={nickname} maxLength={16} onChange={(e) => setNickname(e.target.value)} aria-label="Nickname" />
      {!check.ok && <p className="small error">{check.reason}</p>}
      <AvatarCreator value={avatar} onChange={setAvatar} />
      <div className="welcome-actions sticky-actions">
        <button className="btn btn-soft" onClick={onDone}>Cancel</button>
        <button
          className="btn btn-primary"
          disabled={!check.ok}
          onClick={() => {
            usePlayer.getState().update({ nickname: nickname.trim(), avatar });
            useUI.getState().cheerUp();
            onDone();
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export function Modals() {
  const modal = useUI((s) => s.modal);
  switch (modal) {
    case 'rooms': return <RoomsModal />;
    case 'achievements': return <AchievementsModal />;
    case 'menu': return <MenuModal />;
    case 'words': return <WordBookModal />;
    case 'profile': return <ProfileModal />;
    default: return null;
  }
}

export function Toasts() {
  const toasts = useUI((s) => s.toasts);
  const dismiss = useUI((s) => s.dismissToast);
  const avatar = usePlayer((s) => s.current?.avatar);
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <button key={t.id} className={`toast toast-${t.tone ?? 'info'}`} onClick={() => dismiss(t.id)}>
          {t.avatar && avatar ? (
            <span className="toast-avatar">
              <AvatarPortrait avatar={avatar} size={40} />
              <span className="toast-badge">{t.icon}</span>
            </span>
          ) : (
            <span className="toast-icon">{t.icon}</span>
          )}
          <span className="toast-text">
            <strong>{t.title}</strong>
            {t.text && <span>{t.text}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
