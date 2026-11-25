import type { SpatialCheck } from '../../../chapter/types';
import { ENGLISH_CHAPTERS } from '../../chapters/english';
import { buildCourse, type LanguageKit, type ObjectWord } from '../roomChapter';
import type { CourseContent } from '../types';
import { bedroomChapter } from './bedroomChapter';
import { bedroom } from './bedroom';
import { kitchen } from './kitchen';
import { bathroom } from './bathroom';
import { livingRoom } from './livingroom';
import { hallway } from './hallway';
import { basement } from './basement';
import { entrance } from './entrance';
import { school } from './school';
import { office } from './office';
import { hospital } from './hospital';
import { supermarket } from './supermarket';
import { restaurant } from './restaurant';
import { city } from './city';

// ═══════════════════════════════════════════════════════════════════════════
//  POLISH course.
//  Object entries: [word, definition, example, genitive, instrumental, accusative?, 'pl'?]
//  (accusative only when it differs from the word: feminine nouns, animate nouns; 'pl' for plural nouns).
//  Instructions use only these cases: "Ustaw lampę obok łóżka", "Powieś obraz nad łóżkiem".
// ═══════════════════════════════════════════════════════════════════════════

const cases = (o: ObjectWord) => o.forms.filter((f) => f !== 'pl');
const gen = (o: ObjectWord) => cases(o)[0] ?? o.word;
const ins = (o: ObjectWord) => cases(o)[1] ?? o.word;
const acc = (o: ObjectWord) => cases(o)[2] ?? o.word;
const is = (o: ObjectWord) => (o.forms.includes('pl') ? 'są' : 'jest');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (xs: string[], joiner: string) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${joiner} ${xs[xs.length - 1]}`);
const NUMBERS = ['', 'jedną', 'dwie', 'trzy', 'cztery', 'pięć', 'sześć'];

const kit: LanguageKit = {
  exploreIntro: 'Kliknij prawdziwe rzeczy w tym miejscu.',
  exploreTitles: ['Rozejrzyj się', 'Oczy szeroko!', 'Gdzie to jest?', 'Szukaj!', 'Prawie gotowe'],
  find(names, count) {
    if (names.length === 1) return `Znajdź: ${names[0].word}. Kliknij to.`;
    if (count >= names.length) return `Znajdź wszystko: ${list(names.map((n) => n.word), 'i')}.`;
    return `Znajdź ${NUMBERS[count]} z tych rzeczy: ${list(names.map((n) => n.word), 'lub')}.`;
  },
  riddle: (o) => `Zagadka: „${o.definition}” Kliknij to.`,
  riddleIntro: 'Przeczytaj każdą zagadkę i kliknij właściwą rzecz.',
  challengeTitles: ['Czas na zagadki', 'Zadanie detektywa', 'Trudne pytania'],
  makeover: { title: 'Nowy układ', intro: 'Ustaw rzeczy tak, jak jest napisane w zadaniu.' },
  final: { title: 'Wielkie zadanie', intro: 'Pokaż, co umiesz!' },
  place(c: SpatialCheck, a, b) {
    const A = acc(a);
    switch (c.rel) {
      case 'againstWall': return `Ustaw ${A} pod ścianą.`;
      case 'nextTo': return `Ustaw ${A} obok ${b ? gen(b) : ''}.`;
      case 'near': return `Ustaw ${A} blisko ${b ? gen(b) : ''}.`;
      case 'onTop': return `Postaw ${A} na ${b ? acc(b) : ''}.`;
      case 'above': return `Powieś ${A} nad ${b ? ins(b) : ''}.`;
      case 'inFrontOf': return `Ustaw ${A} przed ${b ? ins(b) : ''}.`;
      case 'nearWindow': return `Ustaw ${A} przy oknie.`;
      case 'inCorner': return `Ustaw ${A} w rogu.`;
      case 'inMiddle': return `Ustaw ${A} na środku.`;
      case 'farFrom': return `Ustaw ${A} daleko od ${b ? gen(b) : ''}.`;
      case 'onWall': return `Powieś ${A} na ścianie.`;
    }
  },
  choice: (o) => `Co to jest? „${o.definition}”`,
  right: 'Dobrze!',
  wrong: (o) => `Nie. Dobra odpowiedź: ${o.word}.`,
  scenario: (o) => `Czego potrzebujesz? „${o.definition}”`,
  write: {
    prompt: 'Napisz dwa zdania: co gdzie jest? Użyj dwóch słów z tego miejsca.',
    label: 'słowa z tego miejsca',
    sample: (o) => `${cap(o.word)} jest…`,
  },
  writingForms: (o) => [o.word, ...cases(o)].map((w) => w.toLowerCase()),
  preposition(c, a, b) {
    // nad / przed + instrumental, obok + genitive. "w" and "na" need other cases, so only one answer fits.
    if (c.rel === 'above') return { sentence: `${cap(a.word)} wisi ___ ${ins(b)}.`, answer: 'nad', options: ['nad', 'w', 'na'] };
    if (c.rel === 'inFrontOf') return { sentence: `${cap(a.word)} ${is(a)} ___ ${ins(b)}.`, answer: 'przed', options: ['przed', 'w', 'na'] };
    if (c.rel === 'nextTo') return { sentence: `${cap(a.word)} ${is(a)} ___ ${gen(b)}.`, answer: 'obok', options: ['obok', 'w', 'na'] };
    return null;
  },
};

export const polish: CourseContent = buildCourse(
  kit,
  { bedroom, kitchen, bathroom, 'living-room': livingRoom, hallway, basement, entrance, school, office, hospital, supermarket, restaurant, city },
  ENGLISH_CHAPTERS,
  { bedroom: bedroomChapter },
);
