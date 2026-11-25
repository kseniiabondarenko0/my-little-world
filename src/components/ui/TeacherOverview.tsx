import { Fragment, useMemo, useState } from 'react';
import { usePlayer } from '../../player/playerStore';
import { summariseAll } from '../../teacher/overview';
import { AvatarPortrait } from './AvatarPortrait';
import { Modal } from './Modals';
import { checkPin, hasPin, isValidPin, setPin } from '../../teacher/pin';

type Gate = 'enter' | 'create' | 'open';

/** Asks for the teacher PIN (or sets one the first time) before showing the overview. */
export function TeacherOverviewModal() {
  const [gate, setGate] = useState<Gate>(() => (hasPin() ? 'enter' : 'create'));
  const [pin, setPinText] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');

  if (gate === 'open') return <TeacherTable onChangePin={() => { setPinText(''); setRepeat(''); setError(''); setGate('create'); }} />;

  const creating = gate === 'create';
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) {
      if (!isValidPin(pin)) return setError('Use exactly 4 digits.');
      if (pin !== repeat) return setError('The two PINs don’t match.');
      setPin(pin);
      setGate('open');
    } else if (checkPin(pin)) {
      setGate('open');
    } else {
      setError('Wrong PIN. Try again.');
      setPinText('');
    }
  };
  const digits = (v: string) => v.replace(/\D/g, '').slice(0, 4);

  return (
    <Modal title="Teacher overview">
      <form className="teacher-pin" onSubmit={submit}>
        <p className="muted">
          {creating
            ? 'Choose a 4-digit PIN. You will need it to open this screen, so students can’t read each other’s work.'
            : 'Enter the teacher PIN.'}
        </p>
        <input
          className="pin-input"
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          aria-label={creating ? 'New PIN' : 'PIN'}
          placeholder="••••"
          value={pin}
          onChange={(e) => { setPinText(digits(e.target.value)); setError(''); }}
        />
        {creating && (
          <input
            className="pin-input"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            aria-label="Repeat PIN"
            placeholder="Repeat"
            value={repeat}
            onChange={(e) => { setRepeat(digits(e.target.value)); setError(''); }}
          />
        )}
        {error && <p className="pin-error" role="alert">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={pin.length !== 4 || (creating && repeat.length !== 4)}>
          {creating ? 'Save PIN' : 'Open'}
        </button>
        <p className="muted small">The PIN is saved in this browser only.</p>
      </form>
    </Modal>
  );
}

// Every player on this device in one table: chapter stage, mastered words, writing.
// Tap a row to read that player's texts.

function TeacherTable({ onChangePin }: { onChangePin: () => void }) {
  const players = usePlayer((s) => s.players);
  const currentId = usePlayer((s) => s.current?.id);
  const rows = useMemo(() => summariseAll(players), [players]);
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Modal title="Teacher overview" wide>
      {rows.length === 0 ? (
        <p className="muted">No players on this device yet.</p>
      ) : (
        <div className="teacher-table-wrap">
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Stage</th>
                <th>Words mastered</th>
                <th>Writing</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const open = openId === r.player.id;
                return (
                  <Fragment key={r.player.id}>
                    <tr
                      className={`teacher-row ${open ? 'open' : ''}`}
                      onClick={() => setOpenId(open ? null : r.player.id)}
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenId(open ? null : r.player.id)}
                      aria-expanded={open}
                    >
                      <td>
                        <span className="teacher-player">
                          <AvatarPortrait avatar={r.player.avatar} size={32} />
                          <span>
                            <b>{r.player.nickname}</b>
                            {r.player.id === currentId && <span className="muted small"> · playing now</span>}
                            <span className="muted small teacher-sub">{r.level} · {r.xp} XP</span>
                          </span>
                        </span>
                      </td>
                      <td>
                        {r.stage ? (
                          <>
                            {r.stage.icon} {r.stage.index}/{r.stageCount} {r.stage.title}
                          </>
                        ) : (
                          <>🏆 Chapter done</>
                        )}
                        <span className="muted small teacher-sub">{r.roomName} · {r.percent}%</span>
                      </td>
                      <td>
                        <b>{r.mastered}</b>
                        <span className="muted small">/{r.totalWords}</span>
                        {r.toRevise > 0 && <span className="muted small teacher-sub">{r.toRevise} to revise</span>}
                      </td>
                      <td>
                        {r.writings.length === 0 ? (
                          <span className="muted">None yet</span>
                        ) : (
                          <>
                            <b>{r.writings.length}</b> {r.writings.length === 1 ? 'text' : 'texts'}
                            <span className="muted small teacher-sub">Last {new Date(r.writings[0].at).toLocaleDateString()}</span>
                          </>
                        )}
                      </td>
                    </tr>
                    {open && (
                      <tr className="teacher-detail">
                        <td colSpan={4}>
                          <div className="writings">
                            {r.writings.length === 0 && <p className="muted">No texts written yet.</p>}
                            {r.writings.map((w) => (
                              <div key={w.roomId + w.id + w.at} className="writing">
                                <span className="eyebrow">{w.title} · {new Date(w.at).toLocaleDateString()}</span>
                                <p className="muted small">{w.prompt}</p>
                                <p>{w.text}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted small profile-note">Read from the saves in this browser. Tap a player to read their writing.{' '}
        <button className="link-btn" onClick={onChangePin}>Change PIN</button>
      </p>
    </Modal>
  );
}
