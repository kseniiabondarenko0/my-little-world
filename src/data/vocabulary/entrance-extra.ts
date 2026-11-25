import type { Level, VocabularyWord } from '../../types/game';

// Entrance word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (door, keys, step, umbrella...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'entrance',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const entranceExtraWords: VocabularyWord[] = [
  // ── Places & parts ───────────────────────────────
  w('front door', 'A1', 'places', null, 'входная дверь', 'вхідні двері'),
  w('garden', 'A1', 'places', 'flowerpot', 'сад', 'сад'),
  w('street', 'A1', 'places', null, 'улица', 'вулиця'),
  w('path', 'A2', 'places', null, 'дорожка', 'доріжка'),
  w('gate', 'A2', 'places', null, 'калитка, ворота', 'хвіртка, ворота'),
  w('fence', 'A2', 'places', null, 'забор', 'паркан'),
  w('porch', 'B1', 'places', 'porch-light', 'крыльцо', 'ґанок'),
  w('doorstep', 'B1', 'places', 'doormat', 'порог', 'поріг'),
  w('driveway', 'B1', 'places', null, 'подъездная дорожка', 'під’їзна доріжка'),
  w('hedge', 'B1', 'places', null, 'живая изгородь', 'живопліт'),
  w('front garden', 'B2', 'places', 'flowerpot', 'палисадник', 'палісадник'),

  // ── People & things ──────────────────────────────
  w('letter', 'A1', 'things', 'letterbox', 'письмо', 'лист'),
  w('flower', 'A1', 'things', 'flowerpot', 'цветок', 'квітка'),
  w('visitor', 'A2', 'things', 'doorbell', 'гость, посетитель', 'гість, відвідувач'),
  w('postman', 'A2', 'things', 'letterbox', 'почтальон', 'листоноша'),
  w('neighbour', 'A2', 'things', null, 'сосед', 'сусід'),
  w('rubbish', 'A2', 'things', 'wheelie-bin', 'мусор', 'сміття'),
  w('lock', 'A2', 'things', null, 'замок', 'замок'),
  w('delivery driver', 'B1', 'things', 'parcel', 'курьер', 'кур’єр'),
  w('soil', 'B1', 'things', 'flowerpot', 'почва, земля', 'ґрунт, земля'),
  w('security camera', 'B1', 'things', null, 'камера наблюдения', 'камера спостереження'),
  w('motion sensor', 'B2', 'things', 'porch-light', 'датчик движения', 'датчик руху'),

  // ── Actions ──────────────────────────────────────
  w('knock', 'A1', 'verbs', null, 'стучать', 'стукати'),
  w('ring the doorbell', 'A1', 'verbs', 'doorbell', 'звонить в дверь', 'дзвонити у двері'),
  w('open the door', 'A1', 'verbs', null, 'открывать дверь', 'відчиняти двері'),
  w('water the plants', 'A2', 'verbs', 'watering-can', 'поливать растения', 'поливати рослини'),
  w('wipe your feet', 'A2', 'verbs', 'doormat', 'вытирать ноги', 'витирати ноги'),
  w('lock the door', 'A2', 'verbs', null, 'запирать дверь', 'замикати двері'),
  w('take out the rubbish', 'A2', 'verbs', 'wheelie-bin', 'выносить мусор', 'виносити сміття'),
  w('deliver', 'B1', 'verbs', 'parcel', 'доставлять', 'доставляти'),
  w('sign for', 'B1', 'verbs', 'parcel', 'расписаться за', 'розписатися за'),
  w('greet', 'B1', 'verbs', null, 'приветствовать', 'вітати'),
  w('trim', 'B2', 'verbs', null, 'подстригать', 'підстригати'),

  // ── Describing ───────────────────────────────────
  w('open', 'A1', 'adjectives', null, 'открытый', 'відчинений'),
  w('closed', 'A1', 'adjectives', null, 'закрытый', 'зачинений'),
  w('safe', 'A2', 'adjectives', null, 'безопасный', 'безпечний'),
  w('friendly', 'A2', 'adjectives', null, 'дружелюбный', 'дружній'),
  w('colourful', 'A2', 'adjectives', 'flowerpot', 'красочный', 'барвистий'),
  w('well-lit', 'B1', 'adjectives', 'porch-light', 'хорошо освещённый', 'добре освітлений'),
  w('overgrown', 'B2', 'adjectives', null, 'заросший', 'зарослий'),
  w('kerb appeal', 'B2', 'adjectives', null, 'привлекательный вид дома снаружи', 'привабливий вигляд будинку ззовні'),
];
