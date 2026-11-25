import type { CourseContent, CourseWord } from './types';
import { buildStarterChapter } from './starterChapter';

// ═══════════════════════════════════════════════════════════════════════════
//  POLISH starter course — Bedroom.
//  Keys are the English word ids. Translations (uk / ru) are reused from English
//  unless given here.
// ═══════════════════════════════════════════════════════════════════════════

const words: Record<string, CourseWord> = {
  // ── 3D objects (taught in the unlock lessons) ──
  bed: { word: 'łóżko', definition: 'Śpisz w nim w nocy.', example: 'Idę do łóżka o dziesiątej.' },
  wardrobe: { word: 'szafa', definition: 'Wysoki mebel na ubrania.', example: 'Mój płaszcz jest w szafie.' },
  desk: { word: 'biurko', definition: 'Stół do nauki i pracy.', example: 'Odrabiam lekcje przy biurku.' },
  chair: { word: 'krzesło', definition: 'Siedzisz na nim.', example: 'Krzesło stoi przed biurkiem.' },
  bookshelf: { word: 'regał', definition: 'Mebel z półkami na książki.', example: 'Na moim regale jest dziesięć książek.' },
  lamp: { word: 'lampa', definition: 'Daje światło.', example: 'Czytam przy lampie.' },
  carpet: { word: 'dywan', definition: 'Leży miękko na podłodze.', example: 'Kot leży na dywanie.' },
  picture: { word: 'obraz', definition: 'Obraz albo zdjęcie na ścianie.', example: 'Na ścianie wisi obraz z morzem.' },
  mirror: { word: 'lustro', definition: 'Widzisz w nim siebie.', example: 'Codziennie rano patrzę w lustro.' },
  nightstand: { word: 'szafka nocna', definition: 'Mała szafka obok łóżka.', example: 'Mój telefon leży na szafce nocnej.' },
  plant: { word: 'roślina', definition: 'Jest zielona i potrzebuje wody.', example: 'Codziennie podlewam roślinę.' },
  'chest-of-drawers': { word: 'komoda', definition: 'Mebel z szufladami na ubrania.', example: 'Moje skarpetki są w komodzie.' },

  // ── More bedroom words ──
  pillow: { word: 'poduszka' },
  blanket: { word: 'koc' },
  shelf: { word: 'półka' },
  window: { word: 'okno' },
  door: { word: 'drzwi' },
  clock: { word: 'zegar' },
  'alarm-clock': { word: 'budzik' },
  book: { word: 'książka' },
  notebook: { word: 'zeszyt' },
  pen: { word: 'długopis' },
  pencil: { word: 'ołówek' },
  backpack: { word: 'plecak' },
  't-shirt': { word: 'koszulka' },
  shirt: { word: 'koszula' },
  trousers: { word: 'spodnie' },
  jeans: { word: 'dżinsy' },
  skirt: { word: 'spódnica' },
  dress: { word: 'sukienka' },
  sweater: { word: 'sweter' },
  socks: { word: 'skarpetki' },
  shoes: { word: 'buty' },
  soft: { word: 'miękki' },
  'wake-up': { word: 'budzić się' },
  clean: { word: 'sprzątać' },
  in: { word: 'w' },
  on: { word: 'na' },
  under: { word: 'pod' },
  'next-to': { word: 'obok' },
  'in-front-of': { word: 'przed' },
  behind: { word: 'za' },
};

const bedroom = buildStarterChapter({
  title: 'Mój pokój',
  exploreIntro: 'Kliknij rzeczy w swoim pokoju.',
  explore: {
    wood: { title: 'Z drewna', prompt: 'Znajdź pięć rzeczy z drewna.' },
    sleep: { title: 'Pora spać', prompt: 'Znajdź coś, czego używasz przed snem.' },
    clothes: { title: 'Miejsce na ubrania', prompt: 'Znajdź trzy meble na ubrania.' },
    soft: { title: 'Coś miękkiego', prompt: 'Znajdź coś miękkiego.' },
    organise: { title: 'Porządek', prompt: 'Znajdź coś, co pomaga utrzymać porządek.' },
  },
  movingDay: {
    title: 'Przeprowadzka',
    intro: 'Masz nowy pokój! Otwórz pudła i połóż rzeczy na miejsce.',
    prompt: 'Kliknij pudło. Potem kliknij, gdzie ta rzecz pasuje.',
    boxes: ['poduszka', 'książki', 'koszulki', 'budzik', 'długopis i zeszyt', 'ramka na zdjęcie'],
  },
  messy: {
    title: 'Bałagan w pokoju',
    intro: 'Ojej! W twoim pokoju jest bałagan. Czytaj i sprzątaj.',
    prompt: 'Kliknij rzecz na podłodze. Potem kliknij, gdzie ją położyć.',
    items: [
      ['dżinsy', 'Włóż dżinsy do szafy.'],
      ['skarpetki', 'Włóż skarpetki do komody.'],
      ['książka', 'Połóż książkę na regale.'],
      ['poduszka', 'Połóż poduszkę na łóżku.'],
      ['buty', 'Włóż buty do szafy.'],
    ],
  },
  makeover: {
    title: 'Nowy wygląd pokoju',
    intro: 'Zrób piękny pokój! Czytaj i przesuwaj meble. Potem kliknij „Check”.',
    steps: [
      'Postaw łóżko przy ścianie.',
      'Postaw szafkę nocną obok łóżka.',
      'Postaw lampę na szafce nocnej.',
      'Powieś obraz nad łóżkiem.',
      'Połóż dywan przed szafą.',
    ],
  },
  final: {
    title: 'Przyjaciel przyjeżdża!',
    intro: 'Twój przyjaciel dziś u ciebie śpi! Przygotuj pokój.',
    findBlanket: 'Twój przyjaciel potrzebuje koca. Gdzie jest koc? Kliknij.',
    makeBed: 'Pościel łóżko dla przyjaciela: połóż koc i poduszkę na łóżku.',
    blanket: ['koc', 'Połóż koc na łóżku.'],
    pillow: ['poduszka', 'Połóż poduszkę na łóżku.'],
    suitcasePrompt: 'Twój przyjaciel ma walizkę. Gdzie ją postawić?',
    suitcase: ['walizka', 'Postaw walizkę obok szafy albo pod łóżkiem.'],
    choice: {
      prompt: 'Przyjaciel pyta: „Gdzie jest lampa?” Co odpowiadasz?',
      right: ['Jest na szafce nocnej.', 'Tak! „na szafce nocnej”.'],
      wrong: [
        ['To jest lampa.', 'Przyjaciel pyta, GDZIE jest lampa.'],
        ['Ja jestem lampą.', 'Powiedz: „Jest na / obok / pod …”.'],
      ],
    },
    write: { prompt: 'Napisz dwa zdania o swoim pokoju dla przyjaciela.', sample: 'Moje łóżko jest …' },
  },
  hidden: {
    mirror: 'Znajdź coś, w co patrzysz.',
    lamp: 'Znajdź coś, co daje światło.',
    plant: 'Znajdź coś zielonego.',
    chair: 'Znajdź coś do siedzenia.',
    bookshelf: 'Znajdź miejsce na książki.',
    carpet: 'Znajdź coś miękkiego na podłodze.',
    picture: 'Znajdź coś na ścianie.',
    chest: 'Znajdź mebel z trzema szufladami.',
    nightstand: 'Znajdź małą szafkę obok łóżka.',
    desk: 'Znajdź stół do odrabiania lekcji.',
    wardrobe: 'Znajdź miejsce na płaszcze i sukienki.',
    bed: 'Znajdź miejsce do spania.',
  },
  designer: [
    'Postaw szafkę nocną obok łóżka.',
    'Postaw biurko przy oknie.',
    'Postaw krzesło obok biurka.',
    'Postaw regał przy ścianie.',
    'Postaw lampę na biurku.',
    'Połóż dywan na środku pokoju.',
    'Powieś obraz nad łóżkiem.',
    'Postaw komodę obok szafy.',
    'Postaw regał w rogu.',
    'Postaw biurko daleko od łóżka.',
  ],
  sortBins: { furniture: 'Meble', clothes: 'Ubrania', decorations: 'Dekoracje', belongings: 'Moje rzeczy' },
  sortItems: [
    { word: 'łóżko', bin: 'furniture', level: 'A1' }, { word: 'krzesło', bin: 'furniture', level: 'A1' },
    { word: 'biurko', bin: 'furniture', level: 'A1' }, { word: 'szafa', bin: 'furniture', level: 'A1' },
    { word: 'szafka nocna', bin: 'furniture', level: 'A1' }, { word: 'komoda', bin: 'furniture', level: 'A1' },
    { word: 'koszulka', bin: 'clothes', level: 'A1' }, { word: 'dżinsy', bin: 'clothes', level: 'A1' },
    { word: 'skarpetki', bin: 'clothes', level: 'A1' }, { word: 'sukienka', bin: 'clothes', level: 'A1' },
    { word: 'sweter', bin: 'clothes', level: 'A1' }, { word: 'piżama', bin: 'clothes', level: 'A2' },
    { word: 'obraz', bin: 'decorations', level: 'A1' }, { word: 'roślina', bin: 'decorations', level: 'A1' },
    { word: 'plakat', bin: 'decorations', level: 'A2' }, { word: 'wazon', bin: 'decorations', level: 'A2' },
    { word: 'świeczka', bin: 'decorations', level: 'A2' },
    { word: 'plecak', bin: 'belongings', level: 'A1' }, { word: 'książka', bin: 'belongings', level: 'A1' },
    { word: 'telefon', bin: 'belongings', level: 'A1' }, { word: 'słuchawki', bin: 'belongings', level: 'A2' },
    { word: 'szczotka do włosów', bin: 'belongings', level: 'A2' },
  ],
  scenarios: [
    { situation: 'W pokoju jest ciemno. Chcesz czytać. Co robisz?', options: [
      { text: 'Włączam lampę.', best: true, feedback: 'Tak! Lampa daje światło.' },
      { text: 'Otwieram szafę.', best: false, feedback: 'W szafie są ubrania, nie światło.' },
      { text: 'Siadam na dywanie.', best: false, feedback: 'Na dywanie nadal jest ciemno.' },
    ] },
    { situation: 'Twoje skarpetki leżą na podłodze. Co robisz?', options: [
      { text: 'Wkładam je do komody.', best: true, feedback: 'Super! Skarpetki są w komodzie.' },
      { text: 'Kładę je na biurku.', best: false, feedback: 'Biurko jest do nauki.' },
      { text: 'Wieszam je na ścianie.', best: false, feedback: 'Na ścianie wisi obraz, nie skarpetki!' },
    ] },
    { situation: 'Odrabiasz lekcje. Gdzie siedzisz?', options: [
      { text: 'Na krześle przy biurku.', best: true, feedback: 'Właśnie! Tam dobrze się uczysz.' },
      { text: 'W szafie.', best: false, feedback: 'Tam nie ma miejsca do nauki.' },
      { text: 'Na szafce nocnej.', best: false, feedback: 'Szafka nocna jest za mała.' },
    ] },
  ],
  sentences: [
    'Łóżko stoi przy oknie.',
    'Moja lampa stoi na biurku.',
    'Śpię w moim łóżku.',
    'Kot jest pod krzesłem.',
    'W moim pokoju jest roślina.',
    'Obraz wisi na ścianie.',
    'Moje ubrania są w szafie.',
  ],
  prepositions: [
    { sentence: 'Lampa stoi ___ szafce nocnej.', answer: 'na', options: ['na', 'w', 'pod'] },
    { sentence: 'Moje buty są ___ łóżkiem.', answer: 'pod', options: ['pod', 'na', 'w'] },
    { sentence: 'Ubrania są ___ szafie.', answer: 'w', options: ['w', 'na', 'pod'] },
    { sentence: 'Krzesło stoi ___ biurka.', answer: 'obok', options: ['obok', 'w', 'na'] },
    { sentence: 'Kot śpi ___ dywanie.', answer: 'na', options: ['na', 'w', 'pod'] },
    { sentence: 'Obraz wisi ___ łóżkiem.', answer: 'nad', options: ['nad', 'pod', 'w'] },
  ],
  writing: {
    // Polish changes word endings (łóżko, łóżku, łóżkiem), so stems are listed too.
    furnitureWords: ['łóżko', 'łóżku', 'łóżka', 'lampa', 'lampę', 'lampie', 'szafka', 'szafce', 'dywan', 'dywanie',
      'szafa', 'szafie', 'szafy', 'biurko', 'biurku', 'krzesło', 'krześle', 'regał', 'regale', 'półka', 'półce',
      'obraz', 'lustro', 'roślina', 'komoda', 'komodzie', 'okno', 'oknie', 'drzwi', 'poduszka', 'koc'],
  },
});

export const polish: CourseContent = { words, chapters: { bedroom } };
