import type { Level, VocabularyWord } from '../../types/game';

// Restaurant word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (plate, fork, napkin, soup, delicious, customer...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'restaurant',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const restaurantExtraWords: VocabularyWord[] = [
  // ── Places & people ──────────────────────────────
  w('restaurant', 'A1', 'places', null, 'ресторан', 'ресторан'),
  w('cafe', 'A1', 'places', null, 'кафе', 'кафе'),
  w('waiter', 'A1', 'people', 'bill', 'официант', 'офіціант'),
  w('waitress', 'A1', 'people', 'bill', 'официантка', 'офіціантка'),
  w('chef', 'A2', 'people', 'pizza-oven', 'шеф-повар', 'шеф-кухар'),
  w('guest', 'A2', 'people', 'table-for-two', 'гость', 'гість'),
  w('takeaway', 'B1', 'places', 'pizza', 'еда навынос', 'їжа на винос'),

  // ── Food & meals ─────────────────────────────────
  w('breakfast', 'A1', 'food', null, 'завтрак', 'сніданок'),
  w('lunch', 'A1', 'food', null, 'обед', 'обід'),
  w('dinner', 'A1', 'food', null, 'ужин', 'вечеря'),
  w('salad', 'A1', 'food', null, 'салат', 'салат'),
  w('ice cream', 'A1', 'food', 'dessert-trolley', 'мороженое', 'морозиво'),
  w('cake', 'A1', 'food', 'dessert-trolley', 'торт, пирожное', 'торт, тістечко'),
  w('dessert', 'A2', 'food', 'dessert-trolley', 'десерт', 'десерт'),
  w('starter', 'A2', 'food', 'menu', 'закуска', 'закуска'),
  w('main course', 'A2', 'food', 'menu', 'основное блюдо', 'основна страва'),
  w('steak', 'A2', 'food', null, 'стейк', 'стейк'),
  w('pepper', 'A2', 'food', 'salt-and-pepper', 'перец', 'перець'),
  w('dish', 'B1', 'food', 'specials-board', 'блюдо', 'страва'),
  w('dish of the day', 'B1', 'food', 'specials-board', 'блюдо дня', 'страва дня'),
  w('portion', 'B1', 'food', null, 'порция', 'порція'),

  // ── Things ───────────────────────────────────────
  w('tip', 'A2', 'things', 'tip-jar', 'чаевые', 'чайові'),
  w('reservation', 'B1', 'things', 'table-for-two', 'бронирование', 'бронювання'),
  w('allergy', 'B1', 'things', 'menu', 'аллергия', 'алергія'),
  w('service charge', 'B2', 'things', 'bill', 'плата за обслуживание', 'плата за обслуговування'),

  // ── Actions ──────────────────────────────────────
  w('order', 'A1', 'verbs', 'menu', 'заказывать', 'замовляти'),
  w('taste', 'A2', 'verbs', 'salt-and-pepper', 'пробовать на вкус', 'куштувати'),
  w('book a table', 'A2', 'verbs', 'table-for-two', 'забронировать столик', 'забронювати столик'),
  w('serve', 'A2', 'verbs', 'counter', 'подавать (еду)', 'подавати (їжу)'),
  w('pay the bill', 'A2', 'verbs', 'bill', 'оплатить счёт', 'оплатити рахунок'),
  w('recommend', 'B1', 'verbs', 'specials-board', 'рекомендовать', 'рекомендувати'),
  w('complain', 'B1', 'verbs', null, 'жаловаться', 'скаржитися'),
  w('share', 'B1', 'verbs', 'pizza', 'делиться', 'ділитися'),
  w('split the bill', 'B2', 'verbs', 'bill', 'разделить счёт', 'розділити рахунок'),

  // ── Describing ───────────────────────────────────
  w('tasty', 'A1', 'adjectives', 'pizza', 'вкусный', 'смачний'),
  w('sweet', 'A1', 'adjectives', 'dessert-trolley', 'сладкий', 'солодкий'),
  w('spicy', 'A2', 'adjectives', null, 'острый', 'гострий'),
  w('salty', 'A2', 'adjectives', 'salt-and-pepper', 'солёный', 'солоний'),
  w('vegetarian', 'B1', 'adjectives', 'menu', 'вегетарианский', 'вегетаріанський'),
  w('fully booked', 'B1', 'adjectives', null, 'всё забронировано', 'все заброньовано'),
  w('overcooked', 'B2', 'adjectives', 'pizza-oven', 'пережаренный', 'пересмажений'),
];
