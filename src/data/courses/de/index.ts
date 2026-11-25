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
//  GERMAN course. Nouns are written with their article (der / die / das).
//  Object entries: [word, definition, example] plus 'pl' when the noun is plural.
//  Cases are made from the article: den/die/das (accusative), dem/der/dem (dative).
// ═══════════════════════════════════════════════════════════════════════════

const article = (o: ObjectWord) => /^(der|die|das) /.exec(o.word)?.[1] as 'der' | 'die' | 'das' | undefined;
const noun = (o: ObjectWord) => o.word.replace(/^(der|die|das) /, '');
const plural = (o: ObjectWord) => o.forms.includes('pl');

function acc(o: ObjectWord): string {
  const a = article(o);
  return a === 'der' && !plural(o) ? `den ${noun(o)}` : o.word;
}
function dat(o: ObjectWord): string {
  const n = noun(o);
  if (plural(o)) return `den ${/[ns]$/.test(n) ? n : `${n}n`}`;
  return { der: `dem ${n}`, das: `dem ${n}`, die: `der ${n}` }[article(o) ?? 'das'];
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const list = (xs: string[], joiner: string) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${joiner} ${xs[xs.length - 1]}`);
const NUMBERS = ['', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs'];

const kit: LanguageKit = {
  exploreIntro: 'Klicke auf die echten Dinge im Raum.',
  exploreTitles: ['Schau dich um', 'Augen auf!', 'Wo ist das?', 'Such mal!', 'Fast geschafft'],
  find(names, count) {
    if (names.length === 1) return `Finde ${acc(names[0])}. Klicke darauf.`;
    if (count >= names.length) return `Finde ${list(names.map(acc), 'und')}.`;
    return `Finde ${NUMBERS[count]} davon: ${list(names.map(acc), 'oder')}.`;
  },
  riddle: (o) => `Rätsel: „${o.definition}“ Klicke darauf.`,
  riddleIntro: 'Lies jedes Rätsel und klicke auf das richtige Ding.',
  challengeTitles: ['Rätselzeit', 'Detektiv-Aufgabe', 'Knifflige Fragen'],
  makeover: { title: 'Neue Ordnung', intro: 'Stell die Dinge so, wie es in der Aufgabe steht.' },
  final: { title: 'Die große Aufgabe', intro: 'Zeig, was du kannst!' },
  place(c: SpatialCheck, a, b) {
    const A = acc(a);
    const B = b ? acc(b) : '';
    switch (c.rel) {
      case 'againstWall': return `Stell ${A} an die Wand.`;
      case 'nextTo': return `Stell ${A} neben ${B}.`;
      case 'near': return `Stell ${A} nah an ${B}.`;
      case 'onTop': return `Stell ${A} auf ${B}.`;
      case 'above': return `Häng ${A} über ${B}.`;
      case 'inFrontOf': return `Stell ${A} vor ${B}.`;
      case 'nearWindow': return `Stell ${A} ans Fenster.`;
      case 'inCorner': return `Stell ${A} in die Ecke.`;
      case 'inMiddle': return `Stell ${A} in die Mitte.`;
      case 'farFrom': return `Stell ${A} weit weg von ${b ? dat(b) : ''}.`.replace(' von dem ', ' vom ');
      case 'onWall': return `Häng ${A} an die Wand.`;
    }
  },
  choice: (o) => `Was ist das? „${o.definition}“`,
  right: 'Richtig!',
  wrong: (o) => `Nein. Richtig ist: ${o.word}.`,
  scenario: (o) => `Was brauchst du? „${o.definition}“`,
  write: {
    prompt: 'Schreibe zwei Sätze: Wo ist was? Benutze zwei Wörter aus diesem Raum.',
    label: 'Wörter aus diesem Raum',
    sample: (o) => `${cap(o.word)} ist…`,
  },
  writingForms: (o) => [noun(o).toLowerCase(), dat(o).replace(/^den /, '').toLowerCase()],
  preposition(c, a, b) {
    const answer = { nextTo: 'neben', above: 'über', inFrontOf: 'vor', onTop: 'auf' }[c.rel as string];
    if (!answer) return null;
    const verb = c.rel === 'above' ? 'hängt' : plural(a) ? 'sind' : 'ist';
    // "in" and "zwischen" (needs two things) can't be right, so there is one answer.
    const options = [answer, 'in', 'zwischen'];
    return { sentence: `${cap(a.word)} ${verb} ___ ${dat(b)}.`, answer, options };
  },
};

export const german: CourseContent = buildCourse(
  kit,
  { bedroom, kitchen, bathroom, 'living-room': livingRoom, hallway, basement, entrance, school, office, hospital, supermarket, restaurant, city },
  ENGLISH_CHAPTERS,
  { bedroom: bedroomChapter },
);
