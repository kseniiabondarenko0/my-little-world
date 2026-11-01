import { useMemo, useRef, useState } from 'react';
import { useUI } from '../../hooks/useUIStore';
import { useProgress } from '../../progression/progressStore';
import { ALL_WORDS, LEVELS, levelAtMost, wordsForRoom } from '../../data/content';
import { CHAPTERS, getChapter } from '../../data/chapters';
import { LOCATIONS } from '../../rooms';
import { buildDeck, chooseWords, type Format } from '../../learning/questions';
import { masteryOf } from '../../learning/srs';
import { shuffle, unique, type Question } from '../../activities/engine';
import { canSpeak, speak } from '../../activities/speech';
import type { Level, VocabularyWord } from '../../types/game';
import { SessionRunner, type SessionResult } from './SessionRunner';
import { SpeakButton } from './SpeakButton';
import { Segmented } from './Segmented';

// Practice Mode: unlimited practice, separate from the chapter story.
// Words the student often gets wrong come first.

type ModeId = 'flashcards' | 'quiz' | 'spelling' | 'listening' | 'builder' | 'prepositions' | 'speaking' | 'mistakes';

const MODES: { id: ModeId; icon: string; title: string; blurb: string }[] = [
  { id: 'flashcards', icon: '🃏', title: 'Flashcards', blurb: 'See the word, remember the meaning.' },
  { id: 'quiz', icon: '❓', title: 'Vocabulary Quiz', blurb: 'Mixed questions.' },
  { id: 'spelling', icon: '✏️', title: 'Spelling', blurb: 'Missing letters and typing.' },
  { id: 'listening', icon: '🎧', title: 'Listening', blurb: 'Hear it, choose or type it.' },
  { id: 'builder', icon: '🧱', title: 'Sentence Builder', blurb: 'Put the words in order.' },
  { id: 'prepositions', icon: '📍', title: 'Prepositions', blurb: 'on, under, next to…' },
  { id: 'speaking', icon: '🎤', title: 'Speaking', blurb: 'Say the words out loud.' },
  { id: 'mistakes', icon: '🔁', title: 'Mistakes Review', blurb: 'Words you got wrong.' },
];

let qid = 0;

export function PracticeMode() {
  const isOpen = useUI((s) => s.modal === 'practice');
  if (!isOpen) return null;
  return <Practice />;
}

function Practice() {
  const close = () => useUI.getState().openModal(null);
  const { language, level: myLevel, words, tick, currentRoomId } = useProgress();
  const [roomId, setRoomId] = useState(currentRoomId);
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState<Level>(myLevel);
  const [mode, setMode] = useState<ModeId | null>(null);
  const [round, setRound] = useState(0);

  const rooms = LOCATIONS.filter((l) => CHAPTERS[l.id]);
  const categories = useMemo(() => ['all', ...new Set(ALL_WORDS.filter((w) => w.topic === roomId).map((w) => w.category))], [roomId]);
  const pool = useMemo(() => wordsForRoom(roomId, level, category), [roomId, level, category]);
  const mistakes = useMemo(
    () => ALL_WORDS.filter((w) => w.topic === roomId && (words[w.id]?.wrong ?? 0) > 0 && masteryOf(words[w.id]) !== 'mastered'),
    [roomId, words],
  );
  const ctx = { language, level };

  const questions = useMemo<Question[] | null>(() => {
    if (!mode || mode === 'flashcards' || mode === 'speaking') return null;
    const formats: Record<string, Format[]> = {
      quiz: ['image', 'pictures', 'listening', 'sentence', 'match', 'recall'],
      spelling: ['letters', 'dictation', 'recall'],
      listening: ['listening', 'dictation'],
      mistakes: ['image', 'letters', 'recall', 'listening', 'sentence', 'dictation'],
    };
    if (mode === 'builder') {
      const chapter = getChapter(roomId);
      return shuffle(chapter.sentences.filter((s) => levelAtMost(s.level, level))).slice(0, 6).map((s) => ({
        key: `builder-${++qid}`, type: 'builder', word: wordFor(s.text, roomId), prompt: 'Put the words in order.',
        answer: s.text, options: [], objectId: '',
      }));
    }
    if (mode === 'prepositions') {
      const chapter = getChapter(roomId);
      const prepWord = ALL_WORDS.find((w) => w.category === 'prepositions')!;
      return shuffle(chapter.prepositions.filter((p) => levelAtMost(p.level, level))).slice(0, 8).map((p) => ({
        key: `prep-${++qid}`, type: 'sentence', word: ALL_WORDS.find((w) => w.word === p.answer && w.category === 'prepositions') ?? prepWord,
        prompt: 'Choose the right preposition.', sentence: p.sentence, answer: p.answer, options: shuffle(unique([p.answer, ...p.options])), objectId: '',
      }));
    }
    const source = mode === 'mistakes' ? mistakes : pool;
    if (!source.length) return [];
    return buildDeck(source, formats[mode], ctx, words, tick, mode === 'mistakes' ? Math.min(12, source.length) : 10);
    // A new round rebuilds the questions.
  }, [mode, round, roomId, level, pool, mistakes]);

  const again = () => setRound((r) => r + 1);
  const summary = (r: SessionResult) => (
    <div className="summary">
      <div className="summary-burst">{r.perfect ? '🌟' : '💪'}</div>
      <h2>Round complete!</h2>
      <p className="summary-stars">+{r.stars} <span className="star-icon">★</span> <span className="muted">({r.firstTry}/{r.total} first try)</span></p>
      <div className="summary-actions">
        <button className="btn btn-primary" onClick={again}>Practise again</button>
        <button className="btn btn-soft" onClick={() => setMode(null)}>Choose another mode</button>
      </div>
    </div>
  );

  const info = MODES.find((m) => m.id === mode);

  return (
    <div className="overlay">
      <div className="modal modal-wide practice" role="dialog" aria-modal="true" aria-label="Practice Mode">
        {!mode ? (
          <>
            <div className="modal-head">
              <div>
                <span className="eyebrow">Unlimited practice</span>
                <h2>🎯 Practice Mode</h2>
              </div>
              <button className="icon-btn" onClick={close} aria-label="Close">✕</button>
            </div>
            <div className="practice-filters">
              <label>
                <span>Room</span>
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                  {rooms.map((r) => <option key={r.id} value={r.id}>{r.icon} {r.name}</option>)}
                </select>
              </label>
              <label>
                <span>Category</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => <option key={c} value={c}>{c === 'all' ? 'All categories' : c}</option>)}
                </select>
              </label>
              <div>
                <span className="filter-label">Level (and below)</span>
                <Segmented value={level} options={LEVELS.map((l) => ({ id: l, label: l }))} onChange={(l: Level) => setLevel(l)} />
              </div>
            </div>
            <p className="muted small">{pool.length} words · {mistakes.length} need revision · difficult words come first</p>
            <div className="mode-grid">
              {MODES.map((m) => {
                const disabled = (m.id === 'mistakes' && mistakes.length === 0) || (m.id === 'listening' && !canSpeak) || (pool.length === 0 && !['builder', 'prepositions', 'mistakes'].includes(m.id));
                return (
                  <button key={m.id} className="mode-tile" disabled={disabled} onClick={() => { setMode(m.id); setRound((r) => r + 1); }}>
                    <span className="menu-icon">{m.icon}</span>
                    <b>{m.title}</b>
                    <span className="muted small">{m.id === 'mistakes' && mistakes.length === 0 ? 'No mistakes yet!' : m.blurb}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : mode === 'flashcards' ? (
          <Flashcards key={round} pool={pool} onBack={() => setMode(null)} onClose={close} />
        ) : mode === 'speaking' ? (
          <Speaking key={round} pool={pool} level={level} roomId={roomId} onBack={() => setMode(null)} onClose={close} />
        ) : questions && questions.length ? (
          <SessionRunner key={round} inline questions={questions} eyebrow={`Practice · ${info?.title}`} onClose={() => setMode(null)} renderSummary={summary} />
        ) : (
          <div className="summary">
            <p className="muted">Nothing to practise with these filters yet.</p>
            <button className="btn btn-soft" onClick={() => setMode(null)}>Back</button>
          </div>
        )}
      </div>
    </div>
  );
}

/** A word to attach a sentence to (for statistics): the first room word that appears in it. */
function wordFor(text: string, roomId: string): VocabularyWord {
  const lower = text.toLowerCase();
  const words = ALL_WORDS.filter((w) => w.topic === roomId).sort((a, b) => b.word.length - a.word.length);
  return words.find((w) => lower.includes(w.word.toLowerCase())) ?? words[0];
}

function PracticeHead({ title, onBack, onClose }: { title: string; onBack: () => void; onClose: () => void }) {
  return (
    <div className="modal-head">
      <div>
        <button className="btn btn-ghost small back-btn" onClick={onBack}>← Modes</button>
        <h2>{title}</h2>
      </div>
      <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
    </div>
  );
}

function Flashcards({ pool, onBack, onClose }: { pool: VocabularyWord[]; onBack: () => void; onClose: () => void }) {
  const { language, words, tick } = useProgress.getState();
  const deck = useMemo(() => chooseWords(pool, words, tick, 12), [pool]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const card = deck[i];

  const answer = (knewIt: boolean) => {
    useProgress.getState().recordAnswer(card.id, knewIt, true);
    if (knewIt) {
      setKnown((k) => k + 1);
      useUI.getState().cheerUp();
    }
    setFlipped(false);
    setI(i + 1);
  };

  return (
    <>
      <PracticeHead title="🃏 Flashcards" onBack={onBack} onClose={onClose} />
      {!card ? (
        <div className="summary">
          <div className="summary-burst">🌟</div>
          <h2>Deck finished!</h2>
          <p className="muted">You knew {known} of {deck.length}. Cards you didn’t know will come back sooner.</p>
          <button className="btn btn-primary" onClick={onBack}>Back to modes</button>
        </div>
      ) : (
        <div className="flash-wrap">
          <p className="muted small">Card {i + 1} of {deck.length}</p>
          <button className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => { setFlipped(true); if (!flipped) speak(card.word); }}>
            {!flipped ? (
              <>
                <span className="flash-word">{card.word}</span>
                <span className="muted small">Tap to see the meaning</span>
              </>
            ) : (
              <>
                <span className="flash-word">{card.translations?.[language] ?? '—'}</span>
                <span className="flash-en">{card.word}</span>
                {card.example && <em className="muted">“{card.example}”</em>}
                <span className="chips"><span className={`level level-${card.level}`}>{card.level}</span><span className="chip">{card.category}</span></span>
              </>
            )}
          </button>
          <SpeakButton text={card.word} label="Listen" />
          {flipped && (
            <div className="summary-actions">
              <button className="btn btn-soft" onClick={() => answer(false)}>🔁 Not yet</button>
              <button className="btn btn-primary" onClick={() => answer(true)}>✓ I knew it</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Speech recognition (Chrome, Edge, Safari). Typed minimally to avoid extra dependencies.
interface Recognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (e: { results: { [i: number]: { [j: number]: { transcript: string } }; length: number } }) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}
type RecognitionCtor = new () => Recognition;
const RecognitionImpl: RecognitionCtor | undefined =
  typeof window !== 'undefined'
    ? ((window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }).SpeechRecognition ??
      (window as unknown as { webkitSpeechRecognition?: RecognitionCtor }).webkitSpeechRecognition)
    : undefined;

const simplify = (s: string) => s.toLowerCase().replace(/[^a-z ]/g, '').replace(/\s+/g, ' ').trim();

function Speaking({ pool, level, roomId, onBack, onClose }: { pool: VocabularyWord[]; level: Level; roomId: string; onBack: () => void; onClose: () => void }) {
  const language = useProgress((s) => s.language);
  const items = useMemo(() => {
    const sentences = level === 'B1' || level === 'B2'
      ? shuffle(getChapter(roomId).sentences.filter((s) => levelAtMost(s.level, level))).slice(0, 3).map((s) => ({ text: s.text, native: '', word: wordFor(s.text, roomId) }))
      : [];
    const ws = chooseWords(pool, useProgress.getState().words, useProgress.getState().tick, 8 - sentences.length)
      .map((w) => ({ text: w.word, native: w.translations?.[language] ?? '', word: w }));
    return shuffle([...ws, ...sentences]);
  }, [pool, level, roomId]);
  const [i, setI] = useState(0);
  const [heard, setHeard] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'listening' | 'right' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const rec = useRef<Recognition | null>(null);
  const item = items[i];

  const listen = () => {
    if (!RecognitionImpl || !item) return;
    const r = new RecognitionImpl();
    rec.current = r;
    r.lang = 'en-GB';
    r.interimResults = false;
    r.maxAlternatives = 3;
    setStatus('listening');
    setHeard(null);
    r.onresult = (e) => {
      const alts = [0, 1, 2].map((k) => e.results[0]?.[k]?.transcript).filter(Boolean) as string[];
      setHeard(alts[0] ?? '');
      const ok = alts.some((t) => simplify(t).includes(simplify(item.text)) || simplify(item.text).includes(simplify(t)) && simplify(t).length > 2);
      setStatus(ok ? 'right' : 'wrong');
      useProgress.getState().recordAnswer(item.word.id, ok, true);
      if (ok) {
        setScore((s) => s + 1);
        useUI.getState().cheerUp();
      }
    };
    r.onerror = () => setStatus('idle');
    r.onend = () => setStatus((s) => (s === 'listening' ? 'idle' : s));
    try {
      r.start();
    } catch {
      setStatus('idle');
    }
  };

  const next = () => {
    setI(i + 1);
    setHeard(null);
    setStatus('idle');
  };

  return (
    <>
      <PracticeHead title="🎤 Speaking" onBack={onBack} onClose={onClose} />
      {!item ? (
        <div className="summary">
          <div className="summary-burst">🎉</div>
          <h2>Well spoken!</h2>
          {RecognitionImpl && <p className="muted">Recognised: {score} of {items.length}</p>}
          <button className="btn btn-primary" onClick={onBack}>Back to modes</button>
        </div>
      ) : (
        <div className="flash-wrap">
          <p className="muted small">{i + 1} of {items.length}</p>
          <div className="flashcard speak-card">
            <span className="flash-word">{item.text}</span>
            {item.native && <span className="muted">{item.native}</span>}
          </div>
          <div className="summary-actions">
            <SpeakButton text={item.text} label="Listen first" />
            {RecognitionImpl ? (
              <button className={`btn btn-primary ${status === 'listening' ? 'pulse' : ''}`} onClick={listen} disabled={status === 'listening'}>
                {status === 'listening' ? '🎙️ Listening…' : '🎤 Say it'}
              </button>
            ) : null}
          </div>
          {!RecognitionImpl && (
            <p className="activity-hint">Your browser can’t check speech. Listen, say it aloud 2–3 times, then go on. (Chrome and Edge can check your pronunciation.)</p>
          )}
          {heard !== null && (
            <p className={`mission-msg msg-${status === 'right' ? 'good' : 'bad'}`}>
              {status === 'right' ? '✓ Great pronunciation!' : `I heard: “${heard || '…'}”. Try again!`}
            </p>
          )}
          {(status === 'right' || status === 'wrong' || !RecognitionImpl) && (
            <button className="btn btn-soft" onClick={next}>Next ➜</button>
          )}
        </div>
      )}
    </>
  );
}
