import type { Level, VocabularyWord } from '../../types/game';

// Supermarket word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (apple, bread, milk, basket, customer, label...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'supermarket',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const supermarketExtraWords: VocabularyWord[] = [
  // ── Places & people ──────────────────────────────
  w('supermarket', 'A1', 'places', null, 'супермаркет', 'супермаркет'),
  w('shop', 'A1', 'places', null, 'магазин', 'магазин'),
  w('cashier', 'A2', 'people', 'cash-register', 'кассир', 'касир'),
  w('shop assistant', 'A2', 'people', null, 'продавец', 'продавець'),
  w('queue', 'A2', 'things', 'checkout', 'очередь', 'черга'),
  w('aisle', 'B1', 'places', null, 'проход (между рядами)', 'прохід (між рядами)'),
  w('self-checkout', 'B1', 'things', 'checkout', 'касса самообслуживания', 'каса самообслуговування'),

  // ── Food ─────────────────────────────────────────
  w('orange', 'A1', 'food', 'fruit-stand', 'апельсин', 'апельсин'),
  w('tomato', 'A1', 'food', 'fruit-stand', 'помидор', 'помідор'),
  w('potato', 'A1', 'food', null, 'картофель', 'картопля'),
  w('carrot', 'A1', 'food', null, 'морковь', 'морква'),
  w('chicken', 'A1', 'food', null, 'курица', 'курка'),
  w('fish', 'A1', 'food', null, 'рыба', 'риба'),
  w('chocolate', 'A1', 'food', null, 'шоколад', 'шоколад'),
  w('grapes', 'A2', 'food', 'fruit-stand', 'виноград', 'виноград'),
  w('biscuits', 'A2', 'food', null, 'печенье', 'печиво'),
  w('loaf', 'A2', 'food', 'bread-rack', 'буханка', 'буханка'),
  w('lemonade', 'A2', 'food', 'drinks-fridge', 'лимонад', 'лимонад'),

  // ── Money & things ───────────────────────────────
  w('money', 'A1', 'money', 'cash-register', 'деньги', 'гроші'),
  w('price', 'A1', 'money', 'barcode-scanner', 'цена', 'ціна'),
  w('cash', 'A2', 'money', 'cash-register', 'наличные', 'готівка'),
  w('change', 'A2', 'money', 'cash-register', 'сдача', 'решта'),
  w('receipt', 'A2', 'money', 'checkout', 'чек', 'чек'),
  w('shopping list', 'A2', 'things', 'shopping-basket', 'список покупок', 'список покупок'),
  w('bank card', 'A2', 'money', 'checkout', 'банковская карта', 'банківська картка'),
  w('discount', 'B1', 'money', 'special-offer', 'скидка', 'знижка'),
  w('barcode', 'B1', 'things', 'barcode-scanner', 'штрихкод', 'штрихкод'),
  w('bargain', 'B1', 'money', 'special-offer', 'выгодная покупка', 'вигідна покупка'),
  w('loyalty card', 'B2', 'money', null, 'карта постоянного покупателя', 'картка постійного покупця'),
  w('refund', 'B2', 'money', null, 'возврат денег', 'повернення грошей'),

  // ── Actions ──────────────────────────────────────
  w('buy', 'A1', 'verbs', null, 'покупать', 'купувати'),
  w('pay', 'A1', 'verbs', 'checkout', 'платить', 'платити'),
  w('sell', 'A1', 'verbs', null, 'продавать', 'продавати'),
  w('cost', 'A1', 'verbs', 'special-offer', 'стоить', 'коштувати'),
  w('go shopping', 'A1', 'verbs', 'shopping-trolley', 'ходить за покупками', 'ходити по покупки'),
  w('queue up', 'A2', 'verbs', 'checkout', 'стоять в очереди', 'стояти в черзі'),
  w('pay by card', 'A2', 'verbs', 'checkout', 'платить картой', 'платити карткою'),
  w('compare prices', 'B1', 'verbs', 'special-offer', 'сравнивать цены', 'порівнювати ціни'),
  w('run out of', 'B1', 'verbs', null, 'закончиться (о запасах)', 'закінчитися (про запаси)'),

  // ── Describing ───────────────────────────────────
  w('cheap', 'A1', 'adjectives', 'special-offer', 'дешёвый', 'дешевий'),
  w('expensive', 'A1', 'adjectives', null, 'дорогой', 'дорогий'),
  w('ripe', 'B1', 'adjectives', 'fruit-stand', 'спелый', 'стиглий'),
  w('out of stock', 'B1', 'adjectives', null, 'нет в наличии', 'немає в наявності'),
  w('organic', 'B2', 'adjectives', 'fruit-stand', 'органический', 'органічний'),
  w('value for money', 'B2', 'adjectives', 'special-offer', 'выгодный по цене', 'вигідний за ціною'),
];
