import type { ActivityDefinition, ActivityStage, ActivityType, Level, NativeLanguage, VocabularyWord } from '../types/game';
import { ALL_WORDS, getActivitiesForWord, getFurniture, getLinkedWords, getWord, isObjectWord, levelAtMost } from '../data/content';

// Turns content (words + activity definitions) into ready-to-play questions.

/** A question in one common shape, whatever its activity type. */
export interface Question {
  key: string;
  type: ActivityType;
  word: VocabularyWord;
  prompt: string;
  answer: string;
  options: string[];
  sentence?: string;
  hide?: number[];
  /** Text in the student's language (translation activities, spelling hint). */
  native?: string;
  showModel?: boolean;
  objectId: string;
  /** match: pairs to connect (left = English, right = translation/picture object id). */
  pairs?: { left: string; right: string }[];
  /** builder: words to put in order. */
  tokens?: string[];
  /** typing: listen and type, or translate and type. */
  mode?: 'dictation' | 'recall';
  /** pictureChoice: object ids shown as pictures, same order as `options`. */
  pictures?: string[];
}

export interface SessionOptions {
  language: NativeLanguage;
  level: Level;
}

export function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const unique = (list: string[]) => [...new Set(list)];

export const normalize = (s: string) => s.trim().toLowerCase().replace(/[’']/g, "'");

/** Wrong answers: words from the same category that don't mean the same thing. */
export function distractors(word: VocabularyWord, count: number, opts: SessionOptions): string[] {
  const native = word.translations?.[opts.language];
  const pool = ALL_WORDS.filter(
    (w) =>
      w.id !== word.id &&
      w.category === word.category &&
      normalize(w.word) !== normalize(word.word) &&
      (!native || w.translations?.[opts.language] !== native),
  );
  // Prefer words at a similar level, then fill up with the rest.
  const near = shuffle(pool.filter((w) => levelAtMost(w.level, opts.level === 'A1' ? 'A2' : opts.level)));
  const far = shuffle(pool.filter((w) => !near.includes(w)));
  return [...near, ...far].slice(0, count).map((w) => w.word);
}

/** Wrong answers for "What is this?": names of other 3D objects, never parts of this one. */
export function objectDistractors(word: VocabularyWord, count: number): string[] {
  return shuffle(ALL_WORDS.filter((w) => isObjectWord(w) && w.id !== word.id)).slice(0, count).map((w) => w.word);
}

/** Default letters to hide for spelling: the vowels (at most 5). */
export function autoHide(word: string): number[] {
  const letters = [...word].map((c, i) => ({ c, i })).filter(({ c }) => /[a-z]/i.test(c));
  let hidden = letters.filter(({ c }) => /[aeiou]/i.test(c)).map(({ i }) => i);
  if (hidden.length === 0 || hidden.length === letters.length) hidden = [letters[Math.floor(letters.length / 2)].i];
  if (hidden.length > 5) hidden = hidden.filter((_, k) => k % 2 === 0).slice(0, 5);
  return hidden;
}

function resolve(def: ActivityDefinition, objectId: string, opts: SessionOptions, key: string): Question {
  const word = getWord(def.wordId);
  const native = word.translations?.[opts.language];
  const base = { key, type: def.type, word, objectId, native };
  switch (def.type) {
    case 'vocabulary':
      return {
        ...base,
        prompt: 'What is this?',
        answer: word.word,
        options: shuffle(unique([word.word, ...(def.distractors ?? objectDistractors(word, 3))])),
        showModel: true,
      };
    case 'multipleChoice':
      return { ...base, prompt: def.question, answer: def.answer, options: shuffle(unique([def.answer, ...def.options])) };
    case 'sentence':
      return {
        ...base,
        prompt: 'Complete the sentence.',
        sentence: def.sentence,
        answer: def.answer,
        options: shuffle(unique([def.answer, ...def.options])),
      };
    case 'spelling':
      return { ...base, prompt: 'Complete the word.', answer: word.word, options: [], hide: def.hide ?? autoHide(word.word) };
    case 'translation':
      return {
        ...base,
        prompt: 'Translate into English.',
        answer: word.word,
        options: shuffle(unique([word.word, ...(def.distractors ?? distractors(word, 3, opts))])),
      };
  }
}

/** Auto-made question about any word: translation, or spelling for short single words. */
function autoQuestion(word: VocabularyWord, objectId: string, opts: SessionOptions, key: string): Question | null {
  const canSpell = /^[a-z]{3,10}$/i.test(word.word);
  const hasTranslation = !!word.translations?.[opts.language];
  if (!hasTranslation && !canSpell) return null;
  const type: ActivityType = hasTranslation && (!canSpell || Math.random() < 0.6) ? 'translation' : 'spelling';
  return resolve({ id: key, wordId: word.id, stage: 'practice', type } as ActivityDefinition, objectId, opts, key);
}

/**
 * lesson:   the object's lesson activities, in order (unlocks the object).
 * practice: a mix of practice + lesson activities for the main word, a translation,
 *           and up to 2 questions about linked words at the student's level.
 */
export function buildSession(objectId: string, stage: ActivityStage, opts: SessionOptions): Question[] {
  const def = getFurniture(objectId);
  const all = getActivitiesForWord(def.wordId);
  const lesson = all.filter((a) => a.stage === 'lesson');

  if (stage === 'lesson') return lesson.map((a, i) => resolve(a, objectId, opts, `${a.id}-${i}`));

  const practice = all.filter((a) => a.stage === 'practice');
  const main = [...shuffle(practice).slice(0, 2), ...shuffle(lesson).slice(0, 1)].map((a, i) =>
    resolve(a, objectId, opts, `${a.id}-p${i}`),
  );
  const extra: Question[] = [];
  const mainTranslation = autoQuestion(getWord(def.wordId), objectId, opts, `${def.wordId}-auto`);
  if (mainTranslation?.type === 'translation') extra.push(mainTranslation);
  for (const word of shuffle(getLinkedWords(objectId, def.wordId, opts.level)).slice(0, 2)) {
    const q = autoQuestion(word, objectId, opts, `${word.id}-auto`);
    if (q) extra.push(q);
  }
  return shuffle([...main, ...extra]);
}

/** A fresh copy of a question to ask again later (options reshuffled). */
export function retryOf(q: Question, attempt: number): Question {
  return { ...q, key: `${q.key}#${attempt}`, options: shuffle(q.options) };
}
