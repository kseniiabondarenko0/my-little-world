import type { VocabularyWord } from '../../types/game';

// Restaurant: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More restaurant words (A1–B2) are in restaurant-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'restaurant', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const restaurantWords: VocabularyWord[] = [
  main('table-for-two', 'table for two', 'A1', 'A small restaurant table with two chairs.', 'A table for two, please.', 'столик на двох', 'столик на двоих'),
  main('high-chair', 'high chair', 'A2', 'A tall chair for a baby to sit at the table.', 'Can we have a high chair for the baby?', 'дитячий стільчик', 'детский стульчик'),
  main('counter', 'counter', 'A2', 'A long table where people pay or where food is served.', 'Please pay at the counter.', 'прилавок, стійка', 'прилавок, стойка'),
  main('pizza-oven', 'pizza oven', 'A2', 'A very hot oven where pizzas are baked.', 'The chef puts the pizza in the pizza oven.', 'піч для піци', 'печь для пиццы'),
  main('dessert-trolley', 'dessert trolley', 'A2', 'A small table on wheels with cakes and sweet things.', 'Look at the cakes on the dessert trolley!', 'візок з десертами', 'тележка с десертами'),
  main('menu', 'menu', 'A1', 'A list of the food and drinks in a restaurant.', 'Can I see the menu, please?', 'меню', 'меню'),
  main('pizza', 'pizza', 'A1', 'A flat round bread with tomato and cheese on top.', 'I’d like a cheese pizza, please.', 'піца', 'пицца'),
  main('bill', 'bill', 'A2', 'A piece of paper that shows how much you must pay.', 'Could we have the bill, please?', 'рахунок', 'счёт'),
  main('tip-jar', 'tip jar', 'A2', 'A jar for extra money that you give to the staff.', 'We put two euros in the tip jar.', 'баночка для чайових', 'баночка для чаевых'),
  main('salt-and-pepper', 'salt and pepper', 'A1', 'Two small pots you use to make food taste better.', 'Could you pass the salt and pepper?', 'сіль і перець', 'соль и перец'),
  main('specials-board', 'specials board', 'A2', 'A board with the special dishes of the day.', 'Today’s soup is on the specials board.', 'дошка зі стравами дня', 'доска с блюдами дня'),
  main('open-sign', 'open sign', 'A1', 'A sign that tells people the restaurant is open.', 'The open sign is on, so let’s go in!', 'вивіска «Відчинено»', 'вывеска «Открыто»'),
];
