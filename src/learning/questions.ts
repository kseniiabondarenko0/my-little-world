import type { Level, NativeLanguage, VocabularyWord } from '../types/game';
import { ALL_WORDS, getActivitiesForWord, objectOfWord, wordsForRoom } from '../data/content';
import { distractors, objectDistractors, retryOf, shuffle, unique, type Question } from '../activities/engine';
import { priority, type WordProgress } from './srs';
import { canSpeak } from '../activities/speech';

// Builds training and practice questions from vocabulary in 8 formats,
// choosing the words that most need practice (spaced repetition).

export type Format =
  | 'image'       // 1. picture → word
  | 'pictures'    // 2. word → choose the picture
  | 'match'       // 3. match words to translations/pictures
  | 'dictation'   // 4. spelling: listen and type
  | 'letters'     // 5. missing letters
  | 'sentence'    // 6. sentence completion
  | 'listening'   // 7. listen and choose
  | 'recall';     // 8. active recall: translation → type the word

export const ALL_FORMATS: Format[] = ['image', 'pictures', 'match', 'dictation', 'letters', 'sentence', 'listening', 'recall'];

interface Ctx {
  language: NativeLanguage;
  level: Level;
}

let counter = 0;
const key = (prefix: string) => `${prefix}-${++counter}`;

/** Can this word be asked in this format? */
export function supports(word: VocabularyWord, format: Format, ctx: Ctx): boolean {
  const hasModel = !!objectOfWord(word);
  const native = !!word.translations?.[ctx.language];
  const single = /^[a-z][a-z-]{2,11}$/i.test(word.word);
  switch (format) {
    case 'image':
    case 'pictures':
      return hasModel;
    case 'match':
      return native || hasModel;
    case 'dictation':
      return canSpeak && word.word.length <= 16;
    case 'letters':
      return single || word.word.length <= 16;
    case 'sentence':
      return sentenceFor(word) !== null;
    case 'listening':
      return canSpeak;
    case 'recall':
      return native && word.word.length <= 18;
  }
}

function sentenceFor(word: VocabularyWord): { sentence: string; options: string[] } | null {
  const fromActivities = getActivitiesForWord(word.id).find((a) => a.type === 'sentence' && 'answer' in a && a.answer === word.word);
  if (fromActivities && fromActivities.type === 'sentence') return { sentence: fromActivities.sentence, options: fromActivities.options };
  if (word.example && new RegExp(`\\b${word.word}\\b`, 'i').test(word.example)) {
    return { sentence: word.example.replace(new RegExp(`\\b${word.word}\\b`, 'i'), '___'), options: [] };
  }
  return null;
}

function autoHide(word: string): number[] {
  const letters = [...word].map((c, i) => ({ c, i })).filter(({ c }) => /[a-z]/i.test(c));
  let hidden = letters.filter(({ c }) => /[aeiou]/i.test(c)).map(({ i }) => i);
  if (hidden.length === 0 || hidden.length === letters.length) hidden = [letters[Math.floor(letters.length / 2)].i];
  if (hidden.length > 5) hidden = hidden.filter((_, k) => k % 2 === 0).slice(0, 5);
  return hidden;
}

export function makeQuestion(word: VocabularyWord, format: Format, ctx: Ctx, pool: VocabularyWord[] = []): Question {
  const native = word.translations?.[ctx.language];
  const objectId = objectOfWord(word) ?? '';
  const base = { key: key(`${word.id}-${format}`), word, objectId, native, answer: word.word, options: [] as string[] };
  switch (format) {
    case 'image':
      return { ...base, type: 'imageChoice', prompt: 'What is this?', options: shuffle(unique([word.word, ...objectDistractors(word, 3)])) };
    case 'pictures': {
      const others = objectDistractors(word, 3);
      const options = shuffle(unique([word.word, ...others]));
      const pictures = options.map((w) => objectOfWord(ALL_WORDS.find((x) => x.word === w)!) ?? '');
      return { ...base, type: 'pictureChoice', prompt: `Find: ${word.word}`, options, pictures };
    }
    case 'match': {
      const usePictures = !!objectId && pool.filter((w) => objectOfWord(w)).length >= 4;
      const candidates = (usePictures ? pool.filter((w) => objectOfWord(w)) : pool.filter((w) => w.translations?.[ctx.language]))
        .filter((w) => w.id !== word.id);
      const group = [word, ...shuffle(candidates).slice(0, 3)];
      const pairs = group.map((w) => ({ left: w.word, right: usePictures ? `obj:${objectOfWord(w)}` : w.translations![ctx.language]! }));
      return { ...base, type: 'match', prompt: usePictures ? 'Match the words to the pictures.' : 'Match the words to their translations.', pairs };
    }
    case 'dictation':
      return { ...base, type: 'typing', mode: 'dictation', prompt: 'Listen and type the word.' };
    case 'letters':
      return { ...base, type: 'spelling', prompt: 'Complete the word.', hide: autoHide(word.word) };
    case 'sentence': {
      const s = sentenceFor(word)!;
      const options = s.options.length ? s.options : [word.word, ...distractors(word, 2, ctx)];
      return { ...base, type: 'sentence', prompt: 'Complete the sentence.', sentence: s.sentence, options: shuffle(unique([word.word, ...options])) };
    }
    case 'listening': {
      const others = objectOfWord(word) ? objectDistractors(word, 3) : distractors(word, 3, ctx);
      return { ...base, type: 'listening', prompt: 'Listen. Which word do you hear?', options: shuffle(unique([word.word, ...others])) };
    }
    case 'recall':
      return { ...base, type: 'typing', mode: 'recall', prompt: 'Type the English word.' };
  }
}

/** Formats in teaching order: recognise first, then produce. */
const RECOGNISE: Format[] = ['image', 'listening', 'pictures', 'match', 'sentence'];
const PRODUCE: Format[] = ['letters', 'recall', 'dictation', 'sentence'];

function pickFormat(word: VocabularyWord, from: Format[], ctx: Ctx, avoid?: Format): Format {
  const ok = shuffle(from).filter((f) => f !== avoid && supports(word, f, ctx));
  if (ok.length) return ok[0];
  const any = shuffle(ALL_FORMATS).filter((f) => f !== avoid && supports(word, f, ctx));
  return any[0] ?? 'letters';
}

/** Words that most need practice first; new words fill the rest. */
export function chooseWords(pool: VocabularyWord[], words: Record<string, WordProgress>, tick: number, count: number): VocabularyWord[] {
  return shuffle(pool)
    .map((w) => ({ w, p: priority(words[w.id], tick) + Math.random() }))
    .sort((a, b) => b.p - a.p)
    .slice(0, count)
    .map((x) => x.w);
}

/**
 * A training session: each chosen word appears twice — once to recognise, once to produce —
 * spread out so the same word never comes twice in a row. One matching question joins in.
 */
export function buildTraining(
  topic: string,
  ctx: Ctx,
  words: Record<string, WordProgress>,
  tick: number,
  size = 8,
): Question[] {
  const pool = wordsForRoom(topic, ctx.level);
  const chosen = chooseWords(pool, words, tick, size);
  const first = chosen.map((w) => makeQuestion(w, pickFormat(w, RECOGNISE.filter((f) => f !== 'match'), ctx), ctx, pool));
  const second = shuffle(chosen).map((w) => makeQuestion(w, pickFormat(w, PRODUCE, ctx), ctx, pool));
  const match = chosen.length >= 4 ? [makeQuestion(chosen[0], 'match', ctx, chosen)] : [];
  return [...shuffle(first), ...match, ...second];
}

/** A wrong answer comes back later in a different format. */
export function retryInNewFormat(q: Question, attempt: number, ctx: Ctx): Question {
  if (q.type === 'match') return retryOf(q, attempt);
  const current: Format | undefined =
    q.type === 'imageChoice' ? 'image' : q.type === 'pictureChoice' ? 'pictures' : q.type === 'listening' ? 'listening'
      : q.type === 'spelling' ? 'letters' : q.type === 'typing' ? (q.mode === 'dictation' ? 'dictation' : 'recall')
        : q.type === 'sentence' ? 'sentence' : undefined;
  if (!current) return retryOf(q, attempt);
  const next = makeQuestion(q.word, pickFormat(q.word, [...RECOGNISE, ...PRODUCE].filter((f) => f !== 'match'), ctx, current), ctx);
  return { ...next, key: `${q.key}#${attempt}` };
}

/** Practice Mode decks. */
export function buildDeck(pool: VocabularyWord[], formats: Format[], ctx: Ctx, words: Record<string, WordProgress>, tick: number, size = 10): Question[] {
  const chosen = chooseWords(pool, words, tick, size);
  return chosen.map((w) => makeQuestion(w, pickFormat(w, formats, ctx), ctx, pool));
}
