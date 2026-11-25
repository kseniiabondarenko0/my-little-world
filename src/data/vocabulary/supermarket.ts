import type { VocabularyWord } from '../../types/game';

// Supermarket: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More supermarket words (A1–B2) are in supermarket-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'supermarket', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const supermarketWords: VocabularyWord[] = [
  main('shopping-trolley', 'shopping trolley', 'A2', 'A big metal basket on wheels that you push around a shop.', 'Our shopping trolley is full of food.', 'візок для покупок', 'тележка для покупок'),
  main('checkout', 'checkout', 'A2', 'The place in a shop where you pay.', 'There’s a long queue at the checkout.', 'каса', 'касса'),
  main('cash-register', 'cash register', 'A2', 'A machine that adds up prices and keeps the money.', 'The cashier opens the cash register.', 'касовий апарат', 'кассовый аппарат'),
  main('fruit-stand', 'fruit stand', 'A2', 'A table in a shop where fruit is sold.', 'The apples are on the fruit stand.', 'прилавок з фруктами', 'прилавок с фруктами'),
  main('bread-rack', 'bread rack', 'A2', 'Shelves where bread and rolls are sold.', 'Take a loaf from the bread rack.', 'полиця для хліба', 'полка для хлеба'),
  main('drinks-fridge', 'drinks fridge', 'A2', 'A cold cupboard with a glass door for drinks.', 'Get some cold lemonade from the drinks fridge.', 'холодильник з напоями', 'холодильник с напитками'),
  main('shopping-basket', 'shopping basket', 'A1', 'A small basket you carry in a shop.', 'I only need a shopping basket today.', 'кошик для покупок', 'корзина для покупок'),
  main('barcode-scanner', 'barcode scanner', 'A2', 'A machine that reads the black lines on a product to find its price.', 'The barcode scanner goes beep!', 'сканер штрихкодів', 'сканер штрихкодов'),
  main('watermelon', 'watermelon', 'A1', 'A very big green fruit that is red inside.', 'This watermelon is really heavy!', 'кавун', 'арбуз'),
  main('shopping-bag', 'shopping bag', 'A1', 'A bag for carrying the things you buy.', 'Did you bring a shopping bag?', 'сумка для покупок', 'сумка для покупок'),
  main('special-offer', 'special offer', 'A2', 'A cheaper price for a short time.', 'Look — a special offer: buy one, get one free!', 'спеціальна пропозиція', 'специальное предложение'),
  main('opening-hours', 'opening hours', 'A2', 'The times when a shop is open.', 'The opening hours are on the door.', 'години роботи', 'часы работы'),
];
