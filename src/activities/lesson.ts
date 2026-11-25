import type { Level, VocabularyWord } from '../types/game';
import { COURSE } from '../courses/active';
import { getFurniture, getWord, wordsForRoom } from '../data/content';
import { makeQuestion, supports, type Format } from '../learning/questions';
import { canSpeak } from './speech';
import { autoHide, buildSession, distractors, shuffle, unique, type Question, type SessionOptions } from './engine';

// The unlock lesson: what a student must do before an object goes into the room.
//
// It used to be three easy steps (pick the word, fill one letter, pick the gap word).
// Now it goes from recognising to producing, and gets longer and harder with level:
//
//   1. What is this?           (the 3D object, 4 choices)        all levels
//   2. Listen and choose       (or pick the picture, if no voice) all levels
//   3. The word in context     (gap sentence / translation)       all levels; 4 choices from A2
//   4. Match it with roommates (word ↔ picture/translation)       A2+
//   5. Produce it              A1: most letters hidden · A2: type from translation · B1+: dictation
//   6. Build a sentence        (tap the words in order)           B1+, English course only
//
// The hand-written lesson activities in src/data/activities are still the source for
// steps 1 and 3, so content and the German/Polish courses keep working unchanged.

const RANK: Record<Level, number> = { A1: 0, A2: 1, B1: 2, B2: 3 };

let counter = 0;
const tag = (q: Question, step: string): Question => ({ ...q, key: `${q.key}-L${step}-${++counter}` });

/** Spelling with most letters hidden (only first and last letter, and a German article, stay). */
function hardSpelling(word: VocabularyWord, objectId: string): Question {
  const text = word.word;
  const article = /^(der|die|das) /i.exec(text)?.[0].length ?? 0;
  const letters = [...text].map((c, i) => ({ c, i })).filter(({ c, i }) => i >= article && /\p{L}/u.test(c));
  let hide = letters.slice(1, -1).map(({ i }) => i);
  if (letters.length <= 3 || hide.length === 0) hide = autoHide(text);
  if (hide.length > 7) hide = hide.filter((_, k) => k % 3 !== 0).slice(0, 7);
  return { key: `${word.id}-hardspell`, type: 'spelling', word, objectId, prompt: 'Complete the word.', answer: text, options: [], hide };
}

function production(word: VocabularyWord, objectId: string, opts: SessionOptions): Question {
  const ctx = { language: opts.language, level: opts.level };
  const native = word.translations?.[opts.language];
  const english = COURSE.id === 'en';
  // German/Polish: typing whole words with ä/ł… is hard on some keyboards, so typing starts at B1.
  const typeFrom = english ? 1 : 2;
  if (RANK[opts.level] >= 2 && english && canSpeak && supports(word, 'dictation', ctx)) return makeQuestion(word, 'dictation', ctx);
  if (RANK[opts.level] >= typeFrom && native && supports(word, 'recall', ctx)) return makeQuestion(word, 'recall', ctx);
  return { ...hardSpelling(word, objectId), native };
}

/** A sentence to rebuild: the lesson's gap sentence filled in, or the word's example. */
function builderSentence(word: VocabularyWord, base: Question[]): string | null {
  const gap = base.find((q) => q.type === 'sentence' && q.sentence && q.answer === word.word);
  const text = gap?.sentence ? gap.sentence.replace('___', gap.answer) : word.example;
  if (!text) return null;
  const count = text.split(' ').length;
  return count >= 4 && count <= 12 ? text : null;
}

export function buildLesson(objectId: string, opts: SessionOptions): Question[] {
  const def = getFurniture(objectId);
  const word = getWord(def.wordId);
  const ctx = { language: opts.language, level: opts.level };
  const rank = RANK[opts.level];
  const base = buildSession(objectId, 'lesson', opts);
  const steps: Question[] = [];

  // 1. Recognise the object.
  const vocab = base.find((q) => q.type === 'vocabulary');
  if (vocab) steps.push(tag(vocab, '1'));

  // 2. Listen (or find the picture).
  const second: Format = canSpeak ? 'listening' : 'pictures';
  if (supports(word, second, ctx)) steps.push(tag(makeQuestion(word, second, ctx), '2'));

  // 3. Context: the hand-written gap sentence / question / translation, with an extra wrong answer from A2.
  for (const q of base.filter((x) => x.type !== 'vocabulary' && x.type !== 'spelling')) {
    let options = q.options;
    if (rank >= 1 && options.length < 4) {
      const extra = distractors(word, 4, opts).filter((d) => !options.includes(d) && d !== q.answer);
      if (q.type === 'translation' || q.answer === word.word) options = shuffle(unique([...options, ...extra.slice(0, 4 - options.length)]));
    }
    steps.push(tag({ ...q, options }, '3'));
  }

  // 4. Match it with other words from the same room.
  if (rank >= 1) {
    const pool = wordsForRoom(word.topic, opts.level);
    if (pool.length >= 4) {
      const m = makeQuestion(word, 'match', ctx, pool);
      if ((m.pairs ?? []).length === 4) steps.push(tag(m, '4'));
    }
  }

  // 5. Produce the word.
  steps.push(tag(production(word, objectId, opts), '5'));

  // 6. Build a sentence (English only: the course sentences are in English).
  if (rank >= 2 && COURSE.id === 'en') {
    const sentence = builderSentence(word, base);
    if (sentence) {
      steps.push({
        key: `${word.id}-L6-${++counter}`, type: 'builder', word, objectId,
        prompt: 'Put the words in order to make a sentence.', answer: sentence, options: [],
      });
    }
  }
  return steps;
}
