import type { ActivityDefinition } from '../../types/game';

// Restaurant activities. Same rules as activities/bedroom.ts:
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

export const restaurantActivities: ActivityDefinition[] = [
  ...set('table-for-two',
    ['Good evening! A ___, please.', 'table for two', ['table for two', 'tip jar', 'pizza oven']],
    ['What do you ask for when you eat with one friend?', 'a table for two', ['a table for two', 'a dessert trolley', 'an open sign']],
    ['The menu is ___ the table.', 'on', ['on', 'in', 'under']]),
  ...set('high-chair',
    ['Can we have a ___ for the baby?', 'high chair', ['high chair', 'counter', 'bill']],
    ['Where does a baby sit at the table?', 'in a high chair', ['in a high chair', 'on the pizza oven', 'in the tip jar']],
    ['The baby is sitting ___ the high chair.', 'in', ['in', 'at', 'under']]),
  ...set('counter',
    ['Please pay at the ___.', 'counter', ['counter', 'menu', 'pizza']],
    ['Where can you pay or pick up a takeaway?', 'at the counter', ['at the counter', 'in the high chair', 'on the specials board']],
    ['The tip jar is ___ the counter.', 'on', ['on', 'in', 'under']]),
  ...set('pizza-oven',
    ['The chef puts the pizza in the ___.', 'pizza oven', ['pizza oven', 'high chair', 'bill']],
    ['Where are pizzas baked?', 'in the pizza oven', ['in the pizza oven', 'on the open sign', 'in the tip jar']],
    ['Don’t stand too close ___ the hot oven.', 'to', ['to', 'at', 'on']]),
  ...set('dessert-trolley',
    ['Look at the cakes on the ___!', 'dessert trolley', ['dessert trolley', 'salt and pepper', 'open sign']],
    ['Where can you choose a cake after dinner?', 'from the dessert trolley', ['from the dessert trolley', 'from the pizza oven', 'from the bill']],
    ['The ice cream is ___ the bottom shelf.', 'on', ['on', 'in', 'at']]),
  ...set('menu',
    ['Can I see the ___, please?', 'menu', ['menu', 'counter', 'high chair']],
    ['What do you read to choose your food?', 'the menu', ['the menu', 'the tip jar', 'the pizza oven']],
    ['Is there any fish ___ the menu?', 'on', ['on', 'in', 'at']]),
  ...set('pizza',
    ['I’d like a cheese ___, please.', 'pizza', ['pizza', 'counter', 'bill']],
    ['What is round, flat and has tomato and cheese?', 'a pizza', ['a pizza', 'a menu', 'a high chair']],
    ['I’d like a pizza ___ mushrooms.', 'with', ['with', 'of', 'on']]),
  ...set('bill',
    ['Could we have the ___, please?', 'bill', ['bill', 'pizza', 'high chair']],
    ['What do you ask for when you want to pay?', 'the bill', ['the bill', 'the menu', 'the dessert trolley']],
    ['The waiter brings the bill ___ the end of the meal.', 'at', ['at', 'in', 'on']]),
  ...set('tip-jar',
    ['We put two euros in the ___.', 'tip jar', ['tip jar', 'pizza oven', 'menu']],
    ['Where can you leave extra money for the staff?', 'in the tip jar', ['in the tip jar', 'in the high chair', 'on the open sign']],
    ['There are coins ___ the tip jar.', 'in', ['in', 'on', 'at']]),
  ...set('salt-and-pepper',
    ['Could you pass the ___?', 'salt and pepper', ['salt and pepper', 'pizza oven', 'counter']],
    ['What do you add to make food taste better?', 'salt and pepper', ['salt and pepper', 'a tip jar', 'a high chair']],
    ['The salt and pepper are ___ the middle of the table.', 'in', ['in', 'on', 'at']]),
  ...set('specials-board',
    ['Today’s soup is on the ___.', 'specials board', ['specials board', 'high chair', 'tip jar']],
    ['Where can you read the dish of the day?', 'on the specials board', ['on the specials board', 'in the pizza oven', 'in the high chair']],
    ['The specials board is ___ the wall.', 'on', ['on', 'in', 'at']]),
  ...set('open-sign',
    ['The ___ is on, so let’s go in!', 'open sign', ['open sign', 'bill', 'menu']],
    ['How do you know the restaurant is open?', 'the open sign is on', ['the open sign is on', 'the pizza is hot', 'the tip jar is full']],
    ['The open sign is ___ the window.', 'in', ['in', 'on', 'under']]),
];
