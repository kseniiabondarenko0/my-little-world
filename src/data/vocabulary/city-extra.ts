import type { Level, VocabularyWord } from '../../types/game';

// City word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (library, busy, quiet...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'city',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const cityExtraWords: VocabularyWord[] = [
  // ── Places ───────────────────────────────────────
  w('city', 'A1', 'places', 'city-map', 'город', 'місто'),
  w('park', 'A1', 'places', 'park-bench', 'парк', 'парк'),
  w('road', 'A1', 'places', 'traffic-light', 'дорога', 'дорога'),
  w('cinema', 'A1', 'places', null, 'кинотеатр', 'кінотеатр'),
  w('museum', 'A1', 'places', 'city-map', 'музей', 'музей'),
  w('square', 'A2', 'places', 'fountain', 'площадь', 'площа'),
  w('bridge', 'A2', 'places', null, 'мост', 'міст'),
  w('pavement', 'A2', 'places', 'street-lamp', 'тротуар', 'тротуар'),
  w('post office', 'A2', 'places', 'post-box', 'почта', 'пошта'),
  w('police station', 'A2', 'places', null, 'полицейский участок', 'поліцейська дільниця'),
  w('zebra crossing', 'B1', 'places', 'traffic-light', 'пешеходный переход', 'пішохідний перехід'),
  w('roundabout', 'B1', 'places', null, 'круговой перекрёсток', 'кільцева розв’язка'),
  w('landmark', 'B2', 'places', 'city-map', 'достопримечательность, ориентир', 'визначна пам’ятка, орієнтир'),
  w('neighbourhood', 'B2', 'places', null, 'район, окрестности', 'район, околиці'),

  // ── Transport & people ───────────────────────────
  w('bus', 'A1', 'transport', 'bus-stop', 'автобус', 'автобус'),
  w('car', 'A1', 'transport', 'traffic-light', 'машина', 'машина'),
  w('taxi', 'A1', 'transport', null, 'такси', 'таксі'),
  w('tram', 'A2', 'transport', 'bus-stop', 'трамвай', 'трамвай'),
  w('tourist', 'A2', 'transport', 'city-map', 'турист', 'турист'),
  w('driver', 'A2', 'transport', 'bus-ticket', 'водитель', 'водій'),
  w('traffic', 'A2', 'transport', 'traffic-light', 'дорожное движение', 'дорожній рух'),
  w('cyclist', 'B1', 'transport', null, 'велосипедист', 'велосипедист'),
  w('pedestrian', 'B1', 'transport', 'traffic-light', 'пешеход', 'пішохід'),
  w('traffic jam', 'B1', 'transport', null, 'пробка', 'затор'),
  w('rush hour', 'B1', 'transport', 'bus-stop', 'час пик', 'година пік'),
  w('public transport', 'B2', 'transport', 'bus-ticket', 'общественный транспорт', 'громадський транспорт'),

  // ── Actions ──────────────────────────────────────
  w('cross the road', 'A1', 'verbs', 'traffic-light', 'переходить дорогу', 'переходити дорогу'),
  w('turn left', 'A1', 'verbs', 'street-sign', 'повернуть налево', 'повернути ліворуч'),
  w('turn right', 'A1', 'verbs', 'street-sign', 'повернуть направо', 'повернути праворуч'),
  w('go straight on', 'A2', 'verbs', 'street-sign', 'идти прямо', 'йти прямо'),
  w('get on', 'A2', 'verbs', 'bus-stop', 'садиться (в транспорт)', 'сідати (в транспорт)'),
  w('get off', 'A2', 'verbs', 'bus-stop', 'выходить (из транспорта)', 'виходити (з транспорту)'),
  w('post a letter', 'A2', 'verbs', 'post-box', 'отправить письмо', 'надіслати лист'),
  w('ask for directions', 'B1', 'verbs', 'city-map', 'спрашивать дорогу', 'питати дорогу'),
  w('go sightseeing', 'B1', 'verbs', 'city-map', 'осматривать достопримечательности', 'оглядати пам’ятки'),
  w('commute', 'B2', 'verbs', 'bus-ticket', 'ездить на работу/учёбу', 'їздити на роботу/навчання'),

  // ── Describing ───────────────────────────────────
  w('modern', 'A2', 'adjectives', null, 'современный', 'сучасний'),
  w('lively', 'B1', 'adjectives', 'fountain', 'оживлённый', 'жвавий'),
  w('polluted', 'B1', 'adjectives', null, 'загрязнённый', 'забруднений'),
  w('pedestrianised', 'B2', 'adjectives', null, 'пешеходный (без машин)', 'пішохідний (без машин)'),
  w('bustling', 'B2', 'adjectives', 'fountain', 'шумный, кипящий жизнью', 'гамірний, сповнений життя'),
];
