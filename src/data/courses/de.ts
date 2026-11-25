import type { CourseContent, CourseWord } from './types';
import { buildStarterChapter } from './starterChapter';

// ═══════════════════════════════════════════════════════════════════════════
//  GERMAN starter course — Bedroom.
//  Nouns are written with their article (der / die / das): learners need it.
//  Keys are the English word ids. Translations (uk / ru) are reused from English
//  unless given here.
// ═══════════════════════════════════════════════════════════════════════════

const words: Record<string, CourseWord> = {
  // ── 3D objects (taught in the unlock lessons) ──
  bed: { word: 'das Bett', definition: 'Hier schläfst du in der Nacht.', example: 'Ich gehe um zehn Uhr ins Bett.' },
  wardrobe: { word: 'der Kleiderschrank', definition: 'Ein großer Schrank für Kleidung.', example: 'Meine Jacke ist im Kleiderschrank.' },
  desk: { word: 'der Schreibtisch', definition: 'Ein Tisch für Hausaufgaben.', example: 'Ich mache meine Hausaufgaben am Schreibtisch.' },
  chair: { word: 'der Stuhl', definition: 'Darauf sitzt du.', example: 'Der Stuhl steht vor dem Schreibtisch.' },
  bookshelf: { word: 'das Bücherregal', definition: 'Ein Möbelstück für Bücher.', example: 'In meinem Bücherregal stehen zehn Bücher.' },
  lamp: { word: 'die Lampe', definition: 'Sie macht Licht.', example: 'Ich lese mit der Lampe.' },
  carpet: { word: 'der Teppich', definition: 'Er liegt weich auf dem Boden.', example: 'Die Katze liegt auf dem Teppich.' },
  picture: { word: 'das Bild', definition: 'Ein Gemälde oder Foto an der Wand.', example: 'An meiner Wand hängt ein Bild vom Meer.' },
  mirror: { word: 'der Spiegel', definition: 'Darin siehst du dich selbst.', example: 'Ich schaue jeden Morgen in den Spiegel.' },
  nightstand: { word: 'der Nachttisch', definition: 'Ein kleiner Tisch neben dem Bett.', example: 'Mein Handy liegt auf dem Nachttisch.' },
  plant: { word: 'die Pflanze', definition: 'Sie ist grün und braucht Wasser.', example: 'Ich gieße meine Pflanze jeden Tag.' },
  'chest-of-drawers': { word: 'die Kommode', definition: 'Ein Möbelstück mit Schubladen für Kleidung.', example: 'Meine Socken sind in der Kommode.' },

  // ── More bedroom words ──
  pillow: { word: 'das Kissen' },
  blanket: { word: 'die Decke' },
  shelf: { word: 'das Regal' },
  window: { word: 'das Fenster' },
  door: { word: 'die Tür' },
  clock: { word: 'die Uhr' },
  'alarm-clock': { word: 'der Wecker' },
  book: { word: 'das Buch' },
  notebook: { word: 'das Heft' },
  pen: { word: 'der Kugelschreiber' },
  pencil: { word: 'der Bleistift' },
  backpack: { word: 'der Rucksack' },
  't-shirt': { word: 'das T-Shirt' },
  shirt: { word: 'das Hemd' },
  trousers: { word: 'die Hose' },
  jeans: { word: 'die Jeans' },
  skirt: { word: 'der Rock' },
  dress: { word: 'das Kleid' },
  sweater: { word: 'der Pullover' },
  socks: { word: 'die Socken' },
  shoes: { word: 'die Schuhe' },
  soft: { word: 'weich' },
  'wake-up': { word: 'aufwachen' },
  clean: { word: 'putzen' },
  in: { word: 'in' },
  on: { word: 'auf' },
  under: { word: 'unter' },
  'next-to': { word: 'neben' },
  'in-front-of': { word: 'vor' },
  behind: { word: 'hinter' },
};

const bedroom = buildStarterChapter({
  title: 'Mein Schlafzimmer',
  exploreIntro: 'Klick auf die Dinge in deinem Zimmer.',
  explore: {
    wood: { title: 'Aus Holz', prompt: 'Finde fünf Dinge aus Holz.' },
    sleep: { title: 'Schlafenszeit', prompt: 'Finde etwas, das du vor dem Schlafen benutzt.' },
    clothes: { title: 'Platz für Kleidung', prompt: 'Finde drei Möbel für deine Kleidung.' },
    soft: { title: 'Etwas Weiches', prompt: 'Finde etwas Weiches.' },
    organise: { title: 'Ordnung', prompt: 'Finde etwas, das dir hilft, Ordnung zu halten.' },
  },
  movingDay: {
    title: 'Umzugstag',
    intro: 'Du hast ein neues Zimmer! Öffne die Kisten und räum deine Sachen ein.',
    prompt: 'Klick auf eine Kiste. Dann klick auf den richtigen Platz.',
    boxes: ['ein Kissen', 'Bücher', 'T-Shirts', 'ein Wecker', 'ein Stift und ein Heft', 'ein Bilderrahmen'],
  },
  messy: {
    title: 'Chaos im Zimmer',
    intro: 'Oh nein! Dein Zimmer ist unordentlich. Lies und räum auf.',
    prompt: 'Klick auf eine Sache am Boden. Dann klick auf den richtigen Platz.',
    items: [
      ['die Jeans', 'Leg die Jeans in den Kleiderschrank.'],
      ['die Socken', 'Leg die Socken in die Kommode.'],
      ['das Buch', 'Stell das Buch ins Bücherregal.'],
      ['das Kissen', 'Leg das Kissen auf das Bett.'],
      ['die Schuhe', 'Stell die Schuhe in den Kleiderschrank.'],
    ],
  },
  makeover: {
    title: 'Neues Zimmer',
    intro: 'Mach dein Zimmer schön! Lies und stell die Möbel um. Dann klick auf „Check“.',
    steps: [
      'Stell das Bett an die Wand.',
      'Stell den Nachttisch neben das Bett.',
      'Stell die Lampe auf den Nachttisch.',
      'Häng das Bild über das Bett.',
      'Leg den Teppich vor den Kleiderschrank.',
    ],
  },
  final: {
    title: 'Besuch kommt!',
    intro: 'Dein Freund schläft heute bei dir! Mach dein Zimmer bereit.',
    findBlanket: 'Dein Freund braucht eine Decke. Wo ist eine Decke? Klick darauf.',
    makeBed: 'Mach das Bett für deinen Freund: Leg die Decke und das Kissen auf das Bett.',
    blanket: ['die Decke', 'Leg die Decke auf das Bett.'],
    pillow: ['das Kissen', 'Leg das Kissen auf das Bett.'],
    suitcasePrompt: 'Dein Freund hat einen Koffer. Wohin damit?',
    suitcase: ['der Koffer', 'Stell den Koffer neben den Kleiderschrank oder unter das Bett.'],
    choice: {
      prompt: 'Dein Freund fragt: „Wo ist die Lampe?“ Was sagst du?',
      right: ['Sie ist auf dem Nachttisch.', 'Ja! „auf dem Nachttisch“.'],
      wrong: [
        ['Das ist eine Lampe.', 'Dein Freund fragt, WO die Lampe ist.'],
        ['Ich bin eine Lampe.', 'Sag: „Sie ist auf / neben / unter …“.'],
      ],
    },
    write: { prompt: 'Schreib zwei Sätze über dein Zimmer für deinen Freund.', sample: 'Mein Bett ist …' },
  },
  hidden: {
    mirror: 'Finde etwas, in das du schaust.',
    lamp: 'Finde etwas, das Licht macht.',
    plant: 'Finde etwas Grünes.',
    chair: 'Finde etwas zum Sitzen.',
    bookshelf: 'Finde den Platz für Bücher.',
    carpet: 'Finde etwas Weiches auf dem Boden.',
    picture: 'Finde etwas an der Wand.',
    chest: 'Finde das Möbelstück mit drei Schubladen.',
    nightstand: 'Finde den kleinen Tisch neben dem Bett.',
    desk: 'Finde den Tisch für Hausaufgaben.',
    wardrobe: 'Finde den Platz für Jacken und Kleider.',
    bed: 'Finde den Platz zum Schlafen.',
  },
  designer: [
    'Stell den Nachttisch neben das Bett.',
    'Stell den Schreibtisch ans Fenster.',
    'Stell den Stuhl neben den Schreibtisch.',
    'Stell das Bücherregal an die Wand.',
    'Stell die Lampe auf den Schreibtisch.',
    'Leg den Teppich in die Mitte des Zimmers.',
    'Häng das Bild über das Bett.',
    'Stell die Kommode neben den Kleiderschrank.',
    'Stell das Bücherregal in die Ecke.',
    'Stell den Schreibtisch weit weg vom Bett.',
  ],
  sortBins: { furniture: 'Möbel', clothes: 'Kleidung', decorations: 'Deko', belongings: 'Meine Sachen' },
  sortItems: [
    { word: 'das Bett', bin: 'furniture', level: 'A1' }, { word: 'der Stuhl', bin: 'furniture', level: 'A1' },
    { word: 'der Schreibtisch', bin: 'furniture', level: 'A1' }, { word: 'der Kleiderschrank', bin: 'furniture', level: 'A1' },
    { word: 'der Nachttisch', bin: 'furniture', level: 'A1' }, { word: 'die Kommode', bin: 'furniture', level: 'A1' },
    { word: 'das T-Shirt', bin: 'clothes', level: 'A1' }, { word: 'die Jeans', bin: 'clothes', level: 'A1' },
    { word: 'die Socken', bin: 'clothes', level: 'A1' }, { word: 'das Kleid', bin: 'clothes', level: 'A1' },
    { word: 'der Pullover', bin: 'clothes', level: 'A1' }, { word: 'der Schlafanzug', bin: 'clothes', level: 'A2' },
    { word: 'das Bild', bin: 'decorations', level: 'A1' }, { word: 'die Pflanze', bin: 'decorations', level: 'A1' },
    { word: 'das Poster', bin: 'decorations', level: 'A2' }, { word: 'die Vase', bin: 'decorations', level: 'A2' },
    { word: 'die Kerze', bin: 'decorations', level: 'A2' },
    { word: 'der Rucksack', bin: 'belongings', level: 'A1' }, { word: 'das Buch', bin: 'belongings', level: 'A1' },
    { word: 'das Handy', bin: 'belongings', level: 'A1' }, { word: 'die Kopfhörer', bin: 'belongings', level: 'A2' },
    { word: 'die Haarbürste', bin: 'belongings', level: 'A2' },
  ],
  scenarios: [
    { situation: 'Dein Zimmer ist dunkel. Du willst lesen. Was machst du?', options: [
      { text: 'Ich mache die Lampe an.', best: true, feedback: 'Ja! Die Lampe macht Licht.' },
      { text: 'Ich öffne den Kleiderschrank.', best: false, feedback: 'Im Kleiderschrank ist Kleidung, kein Licht.' },
      { text: 'Ich setze mich auf den Teppich.', best: false, feedback: 'Auf dem Teppich ist es immer noch dunkel.' },
    ] },
    { situation: 'Deine Socken liegen auf dem Boden. Was machst du?', options: [
      { text: 'Ich lege sie in die Kommode.', best: true, feedback: 'Super! Socken gehören in die Kommode.' },
      { text: 'Ich lege sie auf den Schreibtisch.', best: false, feedback: 'Der Schreibtisch ist für Hausaufgaben.' },
      { text: 'Ich hänge sie an die Wand.', best: false, feedback: 'An der Wand hängt ein Bild, keine Socken!' },
    ] },
    { situation: 'Du machst Hausaufgaben. Wo sitzt du?', options: [
      { text: 'Auf dem Stuhl am Schreibtisch.', best: true, feedback: 'Genau! Dort lernst du gut.' },
      { text: 'Im Kleiderschrank.', best: false, feedback: 'Da ist kein Platz zum Lernen.' },
      { text: 'Auf dem Nachttisch.', best: false, feedback: 'Der Nachttisch ist zu klein zum Sitzen.' },
    ] },
  ],
  sentences: [
    'Das Bett steht am Fenster.',
    'Meine Lampe steht auf dem Schreibtisch.',
    'Ich schlafe in meinem Bett.',
    'Die Katze ist unter dem Stuhl.',
    'In meinem Zimmer ist eine Pflanze.',
    'Das Bild hängt an der Wand.',
    'Meine Kleidung ist im Kleiderschrank.',
  ],
  prepositions: [
    { sentence: 'Die Lampe steht ___ dem Nachttisch.', answer: 'auf', options: ['auf', 'in', 'unter'] },
    { sentence: 'Meine Schuhe sind ___ dem Bett.', answer: 'unter', options: ['unter', 'auf', 'an'] },
    { sentence: 'Die Kleidung ist ___ dem Kleiderschrank.', answer: 'in', options: ['in', 'auf', 'an'] },
    { sentence: 'Der Stuhl steht ___ dem Schreibtisch.', answer: 'neben', options: ['neben', 'in', 'auf'] },
    { sentence: 'Die Katze schläft ___ dem Teppich.', answer: 'auf', options: ['auf', 'in', 'unter'] },
    { sentence: 'Das Bild hängt ___ dem Bett.', answer: 'über', options: ['über', 'unter', 'in'] },
  ],
  writing: {
    furnitureWords: ['bett', 'lampe', 'nachttisch', 'teppich', 'kleiderschrank', 'schrank', 'schreibtisch', 'stuhl',
      'bücherregal', 'regal', 'bild', 'spiegel', 'pflanze', 'kommode', 'fenster', 'tür', 'kissen', 'decke'],
  },
});

export const german: CourseContent = { words, chapters: { bedroom } };
