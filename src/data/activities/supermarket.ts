import type { ActivityDefinition } from '../../types/game';

// Supermarket activities. Same rules as activities/bedroom.ts:
//   stage 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
//   stage 'practice' -> played when the student clicks the object in the room
// Every id must be unique. `set` writes the usual five activities for one object.

function set(wordId: string, sentence: [string, string, string[]], mc: [string, string, string[]], prep: [string, string, string[]]): ActivityDefinition[] {
  return [
    { id: `${wordId}-vocab`, wordId, stage: 'lesson', type: 'vocabulary' },
    { id: `${wordId}-spell`, wordId, stage: 'lesson', type: 'spelling' },
    { id: `${wordId}-sentence`, wordId, stage: 'lesson', type: 'sentence', sentence: sentence[0], answer: sentence[1], options: sentence[2] },
    { id: `${wordId}-mc`, wordId, stage: 'practice', type: 'multipleChoice', question: mc[0], answer: mc[1], options: mc[2] },
    { id: `${wordId}-prep`, wordId, stage: 'practice', type: 'sentence', sentence: prep[0], answer: prep[1], options: prep[2] },
  ];
}

export const supermarketActivities: ActivityDefinition[] = [
  ...set('shopping-trolley',
    ['Our ___ is full of food.', 'shopping trolley', ['shopping trolley', 'barcode scanner', 'watermelon']],
    ['What do you push around a big shop?', 'a shopping trolley', ['a shopping trolley', 'a cash register', 'an opening hours sign']],
    ['Put the watermelon ___ the trolley.', 'in', ['in', 'on', 'at']]),
  ...set('checkout',
    ['There’s a long queue at the ___.', 'checkout', ['checkout', 'fruit stand', 'shopping bag']],
    ['Where do you pay in a shop?', 'at the checkout', ['at the checkout', 'at the bread rack', 'in the drinks fridge']],
    ['The cashier sits ___ the checkout.', 'at', ['at', 'in', 'on']]),
  ...set('cash-register',
    ['The cashier puts the money in the ___.', 'cash register', ['cash register', 'shopping basket', 'bread rack']],
    ['What machine keeps the money at the checkout?', 'the cash register', ['the cash register', 'the drinks fridge', 'the watermelon']],
    ['The cash register is ___ the checkout.', 'on', ['on', 'in', 'under']]),
  ...set('fruit-stand',
    ['The apples are on the ___.', 'fruit stand', ['fruit stand', 'cash register', 'special offer']],
    ['Where can you find oranges and bananas?', 'on the fruit stand', ['on the fruit stand', 'in the cash register', 'on the opening hours sign']],
    ['The watermelon is ___ the fruit stand.', 'on', ['on', 'in', 'at']]),
  ...set('bread-rack',
    ['Take a loaf from the ___.', 'bread rack', ['bread rack', 'barcode scanner', 'shopping bag']],
    ['Where is the fresh bread?', 'on the bread rack', ['on the bread rack', 'in the drinks fridge', 'at the cash register']],
    ['The rolls are ___ the top shelf.', 'on', ['on', 'in', 'at']]),
  ...set('drinks-fridge',
    ['Get some cold lemonade from the ___.', 'drinks fridge', ['drinks fridge', 'fruit stand', 'checkout']],
    ['Where are the cold drinks?', 'in the drinks fridge', ['in the drinks fridge', 'on the bread rack', 'in the shopping basket']],
    ['The juice is ___ the drinks fridge.', 'in', ['in', 'on', 'at']]),
  ...set('shopping-basket',
    ['I only need a ___ today.', 'shopping basket', ['shopping basket', 'drinks fridge', 'checkout']],
    ['What small thing do you carry for a few items?', 'a shopping basket', ['a shopping basket', 'a bread rack', 'a cash register']],
    ['There is some cheese ___ my basket.', 'in', ['in', 'on', 'at']]),
  ...set('barcode-scanner',
    ['The ___ goes beep!', 'barcode scanner', ['barcode scanner', 'watermelon', 'fruit stand']],
    ['What reads the price of a product?', 'the barcode scanner', ['the barcode scanner', 'the shopping bag', 'the bread rack']],
    ['Hold the barcode ___ the scanner.', 'under', ['under', 'into', 'behind']]),
  ...set('watermelon',
    ['This ___ is really heavy!', 'watermelon', ['watermelon', 'checkout', 'cash register']],
    ['What big green fruit is red inside?', 'a watermelon', ['a watermelon', 'a shopping bag', 'a barcode scanner']],
    ['The watermelon is ___ the bottom of the bag.', 'at', ['at', 'on', 'in']]),
  ...set('shopping-bag',
    ['Did you bring a ___?', 'shopping bag', ['shopping bag', 'drinks fridge', 'bread rack']],
    ['What do you carry your food home in?', 'a shopping bag', ['a shopping bag', 'a cash register', 'a checkout']],
    ['Put the eggs ___ the top of the bag.', 'at', ['at', 'in', 'under']]),
  ...set('special-offer',
    ['Look — a ___: buy one, get one free!', 'special offer', ['special offer', 'barcode scanner', 'shopping basket']],
    ['What do you call a cheaper price for a short time?', 'a special offer', ['a special offer', 'an opening hours sign', 'a bread rack']],
    ['The chocolate is ___ special offer this week.', 'on', ['on', 'in', 'at']]),
  ...set('opening-hours',
    ['The ___ are on the door.', 'opening hours', ['opening hours', 'shopping bags', 'checkouts']],
    ['How do you know when the shop is open?', 'look at the opening hours', ['look at the opening hours', 'ask the watermelon', 'open the drinks fridge']],
    ['The shop opens ___ eight o’clock.', 'at', ['at', 'on', 'in']]),
];
