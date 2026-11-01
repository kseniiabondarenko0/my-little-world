import { useState } from 'react';
import type { AvatarConfig } from '../../player/types';
import type { Level, NativeLanguage } from '../../types/game';
import { usePlayer } from '../../player/playerStore';
import { checkNickname } from '../../player/playerService';
import { useProgress } from '../../progression/progressStore';
import { DEFAULT_AVATAR, PRESETS } from '../../data/avatar';
import { LEVELS } from '../../data/content';
import { AvatarCreator } from './AvatarCreator';
import { AvatarPortrait } from './AvatarPortrait';
import { Segmented, LANGUAGES } from './Segmented';

// First-time setup: nickname → avatar → language & level. Shown until a profile exists.

const LEVEL_HELP: Record<Level, string> = {
  A1: 'I’m a beginner',
  A2: 'I know basic English',
  B1: 'I can talk about everyday things',
  B2: 'I’m confident in English',
};

export function Welcome() {
  const current = usePlayer((s) => s.current);
  const players = usePlayer((s) => s.players);
  const [step, setStep] = useState<'hello' | 'name' | 'avatar' | 'level'>('hello');
  const [nickname, setNickname] = useState('');
  const [touched, setTouched] = useState(false);
  const [avatar, setAvatar] = useState<AvatarConfig>(() => PRESETS[Math.floor(Math.random() * PRESETS.length)].avatar ?? DEFAULT_AVATAR);
  const { language, level, setLanguage, setLevel } = useProgress();
  const hadProgress = useProgress((s) => s.unlocked.length > 0);

  if (current) return null;
  const check = checkNickname(nickname);

  const finish = () => {
    useProgress.getState().setSeenIntro();
    usePlayer.getState().create(nickname, avatar);
    window.location.reload();
  };

  return (
    <div className="overlay welcome-overlay">
      <div className="modal welcome" role="dialog" aria-modal="true" aria-label="Welcome">
        {step === 'hello' && (
          <div className="welcome-step center">
            <div className="intro-art">🏡</div>
            <h1>Welcome to My Little World!</h1>
            <p className="muted">Learn English by building and decorating your own home.</p>
            {hadProgress && <p className="badge">Your saved room will be kept 💾</p>}
            <button className="btn btn-primary btn-big" onClick={() => setStep('name')}>Create my player</button>
            {players.length > 0 && (
              <div className="switch-list">
                <p className="muted small">Already playing on this device?</p>
                {players.map((p) => (
                  <button key={p.id} className="player-chip" onClick={() => usePlayer.getState().switchTo(p.id)}>
                    <AvatarPortrait avatar={p.avatar} size={32} /> {p.nickname}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 'name' && (
          <form
            className="welcome-step"
            onSubmit={(e) => {
              e.preventDefault();
              setTouched(true);
              if (check.ok) setStep('avatar');
            }}
          >
            <span className="eyebrow">Step 1 of 3</span>
            <h2>Choose a nickname</h2>
            <p className="muted">Please <b>don’t use your real name</b>. Invent a fun game name, like “SunnyFox” or “Captain Pillow”.</p>
            <input
              className="typing-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={() => setTouched(true)}
              maxLength={16}
              placeholder="Your nickname"
              autoFocus
              autoComplete="off"
              aria-label="Nickname"
            />
            <p className={`small ${touched && !check.ok ? 'error' : 'muted'}`}>
              {touched && !check.ok ? check.reason : 'Nicknames are saved on this device only — nothing is sent online.'}
            </p>
            <div className="welcome-actions">
              <button type="button" className="btn btn-soft" onClick={() => setStep('hello')}>Back</button>
              <button type="submit" className="btn btn-primary" disabled={!nickname.trim()}>Next</button>
            </div>
          </form>
        )}

        {step === 'avatar' && (
          <div className="welcome-step">
            <span className="eyebrow">Step 2 of 3</span>
            <h2>Create your character</h2>
            <AvatarCreator value={avatar} onChange={setAvatar} />
            <div className="welcome-actions sticky-actions">
              <button className="btn btn-soft" onClick={() => setStep('name')}>Back</button>
              <button className="btn btn-primary" onClick={() => setStep('level')}>Next</button>
            </div>
          </div>
        )}

        {step === 'level' && (
          <div className="welcome-step">
            <span className="eyebrow">Step 3 of 3</span>
            <h2>About you</h2>
            <h3 className="section-title">My language</h3>
            <Segmented value={language} options={LANGUAGES} onChange={(l: NativeLanguage) => setLanguage(l)} />
            <h3 className="section-title">My English level</h3>
            <div className="level-cards">
              {LEVELS.map((l) => (
                <button key={l} className={`level-card ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>
                  <b className={`level level-${l}`}>{l}</b>
                  <span>{LEVEL_HELP[l]}</span>
                </button>
              ))}
            </div>
            <p className="muted small">Not sure? Choose A1 — your teacher can change it later in the menu.</p>
            <div className="welcome-ready">
              <AvatarPortrait avatar={avatar} size={56} />
              <span>Ready, <b>{nickname.trim()}</b>?</span>
            </div>
            <div className="welcome-actions">
              <button className="btn btn-soft" onClick={() => setStep('avatar')}>Back</button>
              <button className="btn btn-primary btn-big" onClick={finish}>Let’s start!</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
