import { useMemo, useState } from 'react';
import { useMission, type MissionRun } from '../../missions/missionStore';
import { useProgress } from '../../progression/progressStore';
import { useLayout, EMPTY_ITEMS } from '../../rooms/layoutStore';
import { getRoom } from '../../rooms';
import { forLevel, type MissionStep } from '../../chapter/types';
import { shuffle } from '../../activities/engine';
import { countWords } from '../../missions/writing';
import { SpeakButton } from './SpeakButton';
import { WritingChecklist } from './WritingChecklist';

// The mission bar (for steps played in the 3D room) and mission windows
// (intro, multiple choice, writing, shop).

export function MissionHUD() {
  const run = useMission((s) => s.run);
  const level = useProgress((s) => s.level);
  const room = getRoom(useProgress((s) => s.currentRoomId));
  const items = useLayout((s) => s.rooms[room.id] ?? EMPTY_ITEMS);
  if (!run) return null;
  const m = useMission.getState();

  if (run.showIntro) {
    return (
      <div className="overlay">
        <div className="modal mission-intro" role="dialog" aria-modal="true" aria-label={run.def.title}>
          <div className="summary-burst">{run.def.icon}</div>
          <span className="eyebrow">Mission</span>
          <h2>{run.def.title}</h2>
          <p className="mission-intro-text">
            {forLevel(run.def.intro, level)} <SpeakButton text={forLevel(run.def.intro, level)} small />
          </p>
          <p className="muted small">{run.steps.length} step{run.steps.length > 1 ? 's' : ''}</p>
          <div className="summary-actions">
            <button className="btn btn-primary btn-big" onClick={() => m.beginSteps(items, room)}>Start</button>
            <button className="btn btn-soft" onClick={m.quit}>Not now</button>
          </div>
        </div>
      </div>
    );
  }

  const step = run.steps[run.index];
  const inRoom = step.type === 'find' || step.type === 'place' || step.type === 'sort';
  const last = run.index + 1 >= run.steps.length;
  const nextBtn = run.stepDone && (
    <button className="btn btn-primary" onClick={() => m.next(items, room)} autoFocus>
      {last ? 'Finish ✓' : 'Next ➜'}
    </button>
  );

  const header = (
    <div className="mission-head">
      <span className="mission-icon">{run.def.icon}</span>
      <div>
        <span className="eyebrow">{run.def.title} · step {run.index + 1}/{run.steps.length}</span>
        <p className="mission-prompt">
          {step.prompt} <SpeakButton text={step.prompt} small />
        </p>
      </div>
      <button className="icon-btn mission-quit" onClick={m.quit} aria-label="Leave mission" title="Leave mission">✕</button>
    </div>
  );

  const message = run.message && <p className={`mission-msg msg-${run.message.tone}`}>{run.message.text}</p>;

  if (inRoom) {
    return (
      <div className="mission-bar" role="region" aria-label="Mission">
        {header}
        {step.type === 'find' && (step.count ?? 1) > 1 && (
          <div className="mission-progress">Found: {run.found.length}/{step.count}</div>
        )}
        {step.type === 'sort' && <SortList run={run} step={step} />}
        {message}
        <div className="mission-actions">
          {step.type === 'place' && !run.stepDone && (
            <button className="btn btn-primary" onClick={() => m.checkPlacement(useLayout.getState().rooms[room.id] ?? [], room)}>Check ✓</button>
          )}
          {nextBtn}
          {!run.stepDone && (
            <span className="mission-tip">
              {step.type === 'find' ? 'Tap objects in the room.' : step.type === 'place' ? 'Drag furniture, then press Check.' : 'Tap a thing on the floor, then the furniture.'}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="modal mission-modal" role="dialog" aria-modal="true" aria-label={run.def.title}>
        {header}
        {step.type === 'choice' && <ChoiceStep key={run.index} step={step} done={run.stepDone} />}
        {step.type === 'write' && <WriteStep key={run.index} step={step} run={run} />}
        {step.type === 'shop' && <ShopStep key={run.index} step={step} done={run.stepDone} />}
        {message}
        <div className="mission-actions">{nextBtn}</div>
      </div>
    </div>
  );
}

function SortList({ run, step }: { run: MissionRun; step: Extract<MissionStep, { type: 'sort' }> }) {
  const left = run.props.filter((p) => !p.done).length;
  if (step.boxes) return <div className="mission-progress">Boxes left: {left}/{run.props.length}</div>;
  return (
    <ul className="mission-list">
      {run.props.map((p) => (
        <li key={p.def.id} className={`${p.done ? 'done' : ''} ${run.picked === p.def.id ? 'picked' : ''}`}>
          {p.done ? '✓' : '○'} {p.def.instruction ?? p.def.label}
        </li>
      ))}
    </ul>
  );
}

function ChoiceStep({ step, done }: { step: Extract<MissionStep, { type: 'choice' }>; done: boolean }) {
  const options = useMemo(() => shuffle(step.options.map((o, i) => ({ ...o, i }))), [step]);
  const [tried, setTried] = useState<number[]>([]);
  return (
    <div className="options options-col">
      {options.map((o) => (
        <button
          key={o.i}
          className={`option option-left ${tried.includes(o.i) ? (o.correct ? 'right' : 'wrong') : ''}`}
          disabled={done || tried.includes(o.i)}
          onClick={() => {
            setTried([...tried, o.i]);
            useMission.getState().choose(o.i);
          }}
        >
          {o.text}
        </button>
      ))}
    </div>
  );
}

function WriteStep({ step, run }: { step: Extract<MissionStep, { type: 'write' }>; run: MissionRun }) {
  const [text, setText] = useState('');
  const [showSample, setShowSample] = useState(false);
  return (
    <div className="write-box">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        disabled={run.stepDone}
        placeholder="Write in English…"
        aria-label="Your answer"
      />
      <div className="write-meta">
        <span className="muted small">{countWords(text)} words (at least {step.minWords})</span>
        {step.sample && !run.stepDone && (
          <button className="btn btn-ghost small" onClick={() => setShowSample(!showSample)}>{showSample ? 'Hide example' : 'Need an idea?'}</button>
        )}
      </div>
      {showSample && step.sample && <p className="write-sample">Example start: “{step.sample}”</p>}
      {run.writing && <WritingChecklist result={run.writing} />}
      {!run.stepDone && (
        <button className="btn btn-primary" disabled={!text.trim()} onClick={() => useMission.getState().submitWriting(text)}>
          Check my writing
        </button>
      )}
    </div>
  );
}

function ShopStep({ step, done }: { step: Extract<MissionStep, { type: 'shop' }>; done: boolean }) {
  const [cart, setCart] = useState<string[]>([]);
  const total = step.items.filter((i) => cart.includes(i.id)).reduce((n, i) => n + i.price, 0);
  return (
    <div className="shop">
      <div className="shop-budget">
        <span>💰 Budget: <b>{step.budget}</b></span>
        <span className={total > step.budget ? 'over' : ''}>Spent: <b>{total}</b></span>
        <span className="muted small">Needs: {step.needs.map((n) => n.label).join(' · ')}{step.maxBig !== undefined ? ` · max ${step.maxBig} big item` : ''}</span>
      </div>
      <div className="shop-grid">
        {step.items.map((item) => {
          const inCart = cart.includes(item.id);
          return (
            <button
              key={item.id}
              className={`shop-item ${inCart ? 'in-cart' : ''}`}
              disabled={done}
              onClick={() => setCart(inCart ? cart.filter((c) => c !== item.id) : [...cart, item.id])}
            >
              <span className="shop-name">{inCart ? '✓ ' : ''}{item.name}</span>
              <span className="shop-desc">{item.description}</span>
              <span className="shop-price">{item.price} coins</span>
            </button>
          );
        })}
      </div>
      {!done && (
        <button className="btn btn-primary" disabled={!cart.length} onClick={() => useMission.getState().submitShop(cart)}>
          Buy these ({total} coins)
        </button>
      )}
    </div>
  );
}
