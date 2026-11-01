// Spaced repetition (Leitner boxes).
// Every word has a box 0–5. A correct answer moves it up a box; a mistake moves it down.
// Higher boxes come back less often. "Time" is counted in answers (ticks), so revision
// fits into lessons and practice instead of depending on the calendar.

export interface WordProgress {
  correct: number;
  attempts: number;
  wrong: number;
  box: number;
  /** Tick when the word should be revised again. */
  due: number;
}

export type Mastery = 'new' | 'learning' | 'mastered' | 'revise';

const INTERVALS = [0, 3, 6, 15, 40, 100];
export const MASTERED_BOX = 3;

export const emptyWord = (): WordProgress => ({ correct: 0, attempts: 0, wrong: 0, box: 0, due: 0 });

export function applyAnswer(w: WordProgress | undefined, correct: boolean, tick: number): WordProgress {
  const prev = { ...emptyWord(), ...w };
  const box = correct ? Math.min(5, prev.box + 1) : Math.max(0, prev.box - 2);
  return {
    correct: prev.correct + (correct ? 1 : 0),
    attempts: prev.attempts + 1,
    wrong: prev.wrong + (correct ? 0 : 1),
    box,
    due: tick + (correct ? INTERVALS[box] : 2),
  };
}

export function masteryOf(w: WordProgress | undefined): Mastery {
  if (!w || w.attempts === 0) return 'new';
  if (w.box >= MASTERED_BOX) return 'mastered';
  if (w.wrong > 0 && w.box <= 1) return 'revise';
  return 'learning';
}

/** Higher = more urgent to practise. */
export function priority(w: WordProgress | undefined, tick: number): number {
  if (!w || w.attempts === 0) return 5;
  const overdue = Math.max(0, tick - w.due);
  return (5 - w.box) * 2 + Math.min(10, w.wrong * 1.5) + Math.min(6, overdue / 5) - (w.due > tick ? 8 : 0);
}
