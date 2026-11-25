import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  RESTAURANT CHAPTER — all missions, mini-game content and practice sentences.
//  A cosy pizzeria in the city. Same shape as the other rooms.
//
//  Furniture ids you can use: specials-board, open-sign (on the wall),
//  table-for-two, high-chair, counter, pizza-oven, dessert-trolley (floor),
//  menu, pizza, bill, tip-jar, salt-and-pepper (small)
//
//  Surfaces (small things can stand ON them): table-for-two, counter, dessert-trolley
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const RESTAURANT_WORDS = ['restaurant', 'waiter', 'waitress', 'chef', 'table', 'table for two', 'high chair', 'counter', 'oven', 'pizza oven', 'dessert',
  'dessert trolley', 'menu', 'pizza', 'bill', 'tip', 'tip jar', 'salt', 'pepper', 'specials board', 'open sign', 'order', 'food', 'dinner'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const restaurantWords = (count: number): WordRequirement => ({ label: 'restaurant words', words: RESTAURANT_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in the restaurant.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('choose', 'What shall we eat?', '📋', {
    A1: 'Find two things that tell you about the food.',
    A2: 'Find the menu and the board with today’s dishes.',
    B1: 'Find two places to read about the food before you order.',
    B2: 'Identify the printed menu and the daily specials.',
  }, ['menu', 'specials-board'], 2),
  findMission('kitchen', 'The chef’s corner', '👨‍🍳', {
    A1: 'Find two things the chef uses.',
    A2: 'Find the hot oven and the pizza.',
    B1: 'Find where the pizza is baked and what comes out of it.',
    B2: 'Identify the wood-fired oven and its signature dish.',
  }, ['pizza-oven', 'pizza'], 2),
  findMission('pay', 'Time to pay', '💶', {
    A1: 'Find two things for paying.',
    A2: 'Find the bill and the jar for tips.',
    B1: 'Find what the waiter brings at the end and where you leave a little extra.',
    B2: 'Identify the bill and the gratuity jar.',
  }, ['bill', 'tip-jar'], 2),
  findMission('family', 'Family dinner', '👶', {
    A1: 'Find two places to sit.',
    A2: 'Find the table and the baby’s chair.',
    B1: 'Find where a family with a baby will sit.',
    B2: 'Identify seating for an adult couple and an infant.',
  }, ['table-for-two', 'high-chair'], 2),
  findMission('sweet', 'Something sweet', '🍰', {
    A1: 'Find the cakes.',
    A2: 'Find the dessert trolley.',
    B1: 'Find where to choose a pudding after dinner.',
    B2: 'Find the dessert selection.',
  }, ['dessert-trolley']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Before Opening', icon: '📦', xp: 60,
  intro: {
    A1: 'The restaurant opens soon! Open the boxes and put everything in the right place.',
    A2: 'The restaurant opens in one hour and the food delivery has just arrived. Help the chef.',
    B1: 'The deliveries are late and the restaurant opens soon. Read the labels and put everything away.',
    B2: 'The supplier’s labels are rather vague. Work out where each delivery belongs before the first guests arrive.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'pizza dough', ['pizza-oven']),
      box('u2', 'new menus', ['menu', 'table-for-two']),
      box('u3', 'cakes', ['dessert-trolley']),
      box('u4', 'chalk', ['specials-board']),
      box('u5', 'a baby cushion', ['high-chair']),
      box('u6', 'salt', ['salt-and-pepper']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'wood for the fire', ['pizza-oven']),
      box('u2', 'clean menus', ['menu', 'table-for-two']),
      box('u3', 'chocolate cakes', ['dessert-trolley']),
      box('u4', 'coloured chalk', ['specials-board']),
      box('u5', 'a baby’s bib', ['high-chair']),
      box('u6', 'black pepper', ['salt-and-pepper']),
      box('u7', 'a new bulb for the sign', ['open-sign']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'something to make the fire hotter', ['pizza-oven']),
      box('u2', 'lists of dishes with prices', ['menu', 'table-for-two']),
      box('u3', 'something sweet for after dinner', ['dessert-trolley']),
      box('u4', 'something to write today’s dishes with', ['specials-board']),
      box('u5', 'a safety strap for a baby', ['high-chair']),
      box('u6', 'refills for the little pots on the table', ['salt-and-pepper']),
      box('u7', 'paper rolls for printing receipts', ['bill', 'counter']),
      box('u8', 'a label: “Thank you!”', ['tip-jar']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'seasoned hardwood logs', ['pizza-oven']),
      box('u2', 'reprinted menus with allergy information', ['menu', 'table-for-two']),
      box('u3', 'patisserie for the evening service', ['dessert-trolley']),
      box('u4', 'liquid chalk pens', ['specials-board']),
      box('u5', 'an infant safety harness', ['high-chair']),
      box('u6', 'condiment refills', ['salt-and-pepper']),
      box('u7', 'thermal receipt paper', ['bill', 'counter']),
      box('u8', 'a replacement neon tube', ['open-sign']),
    ] }],
  },
};

const busyEvening: MissionDefinition = {
  id: 'busy-evening', title: 'Friday Night Rush', icon: '🍕', xp: 60,
  intro: {
    A1: 'It’s Friday night and the restaurant is full! Help the waiter.',
    A2: 'Everyone wants pizza tonight and the waiter needs help. Follow the manager’s note.',
    B1: 'It’s the busiest night of the week and a waiter is ill. Read the manager’s note and keep things running.',
    B2: 'You’re covering for the manager on a fully booked Friday. Follow her note and keep the guests happy.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the pizza', 'cup', '#e9b46a', ['table-for-two'], 'Put the pizza on the table.'),
      thing('m2', 'the menus', 'book', '#7a2f2f', ['table-for-two', 'counter'], 'Put the menus on the table.'),
      thing('m3', 'the cake', 'box', '#f7b2d0', ['dessert-trolley'], 'Put the cake on the dessert trolley.'),
      thing('m4', 'the coins', 'cup', '#c9a227', ['tip-jar'], 'Put the coins in the tip jar.'),
      thing('m5', 'the bill', 'book', '#ffffff', ['table-for-two', 'counter'], 'Put the bill on the table.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'A family with a baby comes in. What do they need? Click it.', targets: ['high-chair'] },
      { type: 'sort', prompt: 'Follow the manager’s note.', props: [
        thing('m1', 'two hot pizzas', 'cup', '#e9b46a', ['table-for-two'], 'Take the pizzas to the table.'),
        thing('m2', 'clean menus', 'book', '#7a2f2f', ['table-for-two', 'counter'], 'Put clean menus on the table.'),
        thing('m3', 'a fruit tart', 'box', '#ffd54f', ['dessert-trolley'], 'Put the tart on the dessert trolley.'),
        thing('m4', 'the takeaway boxes', 'box', '#d6b07a', ['counter'], 'Put the takeaway boxes on the counter.'),
        thing('m5', 'tips from table 3', 'cup', '#c9a227', ['tip-jar'], 'Put the tips in the jar.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'A guest asks what the soup of the day is. What do you point to? Click it.', targets: ['specials-board'] },
      { type: 'sort', prompt: 'Read the manager’s note and put everything in its place.', props: [
        thing('m1', 'a pizza without cheese', 'cup', '#d9442f', ['table-for-two'], 'For the guest with a milk allergy — serve it right away!'),
        thing('m2', 'a birthday cake with candles', 'box', '#f7b2d0', ['dessert-trolley'], 'Keep it hidden until table 5 finishes eating.'),
        thing('m3', 'raw pizza dough', 'box', '#f3ead8', ['pizza-oven'], 'Bake the next order now.'),
        thing('m4', 'a takeaway order', 'box', '#d6b07a', ['counter'], 'The driver is collecting it in five minutes.'),
        thing('m5', 'a forgotten phone', 'phone', '#2f3440', ['counter'], 'Keep it safe until the owner comes back.'),
      ] },
      { type: 'choice', prompt: 'A guest says: “There’s a hair in my pasta!” What do you say?', options: [
        { text: 'I’m so sorry! I’ll bring you a new plate right away.', correct: true, feedback: 'Apologetic and quick.' },
        { text: 'It’s probably yours.', correct: false, feedback: 'That would make him very angry.' },
        { text: 'Just take it out.', correct: false, feedback: 'Not acceptable in a restaurant.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A couple without a reservation asks for a table, but you’re full. Check whether the small table near the window is free.', targets: ['table-for-two'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'a gluten-free base', 'cup', '#f3ead8', ['pizza-oven'], 'Bake it separately — never on the same tray as the others.'),
        thing('m2', 'a complaint card from table 2', 'book', '#ffffff', ['counter'], 'Leave it where the manager will see it tomorrow.'),
        thing('m3', 'the evening’s card payments slip', 'book', '#6fae6a', ['counter'], 'Keep financial records secure at the till.'),
        thing('m4', 'a cheesecake for table 4', 'box', '#ffd54f', ['dessert-trolley'], 'They ordered it before their mains.'),
        thing('m5', 'a dropped knife', 'phone', '#b9c2cc', ['counter'], 'Get it off the floor before someone treads on it.'),
        thing('m6', 'a corrected price list', 'book', '#fff3d6', ['specials-board', 'menu'], 'The fish is now cheaper — update the display.'),
      ] },
      { type: 'write', prompt: 'Write a short note to the manager explaining how the evening went and what problems still need solving.', minWords: 35,
        require: [restaurantWords(2), connectors(1), advanced(1)], sample: 'Although we were fully booked, the pizza oven ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'big-oven', name: 'Wood-fired pizza oven', description: 'Makes the best pizza. Very big.', price: 55, tags: ['cook', 'big'] },
  { id: 'small-oven', name: 'Electric pizza oven', description: 'Small and quick.', price: 20, tags: ['cook'] },
  { id: 'tables', name: 'Six tables', description: 'Lots of seats. They take a lot of space.', price: 45, tags: ['seat', 'big'] },
  { id: 'two-tables', name: 'Two small tables', description: 'Enough for a small café.', price: 18, tags: ['seat'] },
  { id: 'high-chair', name: 'High chair', description: 'For families with babies.', price: 10, tags: ['family'] },
  { id: 'menus', name: 'Printed menus', description: 'Nice menus for every table.', price: 12, tags: ['menu'] },
  { id: 'board', name: 'Chalk board', description: 'Write the dishes of the day.', price: 8, tags: ['menu'] },
  { id: 'trolley', name: 'Dessert trolley', description: 'Shows off your cakes.', price: 25, tags: ['dessert'] },
  { id: 'fridge', name: 'Cake fridge', description: 'A small fridge for desserts.', price: 15, tags: ['dessert'] },
  { id: 'sign', name: 'Neon open sign', description: 'People see you from the street.', price: 12, tags: ['extra'] },
];

const budgetRestaurant: MissionDefinition = {
  id: 'budget-restaurant', title: 'Café on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your aunt wants a small pizza café. Help her buy things.',
    A2: 'Your aunt is opening a tiny pizza café and doesn’t have much money. Help her choose.',
    B1: 'Your aunt’s café is very small. Choose things that fit the space and the budget.',
    B2: 'You’re advising your aunt on fitting out a tiny pizzeria on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. She needs an oven and tables.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['big-oven', 'small-oven', 'two-tables', 'tables', 'sign'].includes(i.id)),
        needs: [{ tag: 'cook', label: 'oven' }, { tag: 'seat', label: 'tables' }] },
      { type: 'place', prompt: 'Now in YOUR restaurant: put the pizza on the table for two.', checks: [{ rel: 'onTop', a: 'pizza', b: 'table-for-two' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. The café needs an oven, tables and a menu.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['trolley', 'fridge'].includes(i.id)),
        needs: [{ tag: 'cook', label: 'oven' }, { tag: 'seat', label: 'tables' }, { tag: 'menu', label: 'menu' }] },
      { type: 'place', prompt: 'Now in YOUR restaurant: put the high chair next to the table for two.', checks: [{ rel: 'nextTo', a: 'high-chair', b: 'table-for-two' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The café is tiny, so choose only ONE big item. It needs an oven, tables, a menu and desserts.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'cook', label: 'oven' }, { tag: 'seat', label: 'tables' }, { tag: 'menu', label: 'menu' }, { tag: 'dessert', label: 'desserts' }] },
      { type: 'write', prompt: 'Write a short message to your aunt explaining what you bought and why.', minWords: 25,
        require: [restaurantWords(2), connectors(1)], sample: 'I bought an electric oven because the café is small, and...' },
      { type: 'place', prompt: 'Now in YOUR restaurant: put the counter against the wall.', checks: [{ rel: 'againstWall', a: 'counter' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. The café needs an oven, seating, a menu, desserts and to welcome families.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'cook', label: 'oven' }, { tag: 'seat', label: 'seating' }, { tag: 'menu', label: 'menu' }, { tag: 'dessert', label: 'desserts' }, { tag: 'family', label: 'families' }] },
      { type: 'write', prompt: 'Justify your choices to your aunt. Mention one option you rejected and why.', minWords: 45,
        require: [restaurantWords(3), connectors(1), advanced(1)], sample: 'I chose a chalk board instead of printed menus because...' },
      { type: 'place', prompt: 'Now in YOUR restaurant: guests shouldn’t sit next to the hot oven — table for two far from the pizza oven.',
        checks: [{ rel: 'farFrom', a: 'table-for-two', b: 'pizza-oven' }] },
    ],
  },
};

// ── STAGE 5: RESTAURANT MAKEOVER ───────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Restaurant Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make the restaurant nice! Read and move the things. Then press Check.',
    A2: 'Time for a restaurant makeover! Follow the instructions and move the real things.',
    B1: 'Give the restaurant a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'An interior designer has sent you a brief. Interpret it and rearrange the restaurant accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the table for two near the window.', checks: [{ rel: 'nearWindow', a: 'table-for-two' }] },
      { type: 'place', prompt: 'Put the salt and pepper on the table for two.', checks: [{ rel: 'onTop', a: 'salt-and-pepper', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Put the pizza oven in the corner.', checks: [{ rel: 'inCorner', a: 'pizza-oven' }] },
      { type: 'place', prompt: 'Put the counter against the wall.', checks: [{ rel: 'againstWall', a: 'counter' }] },
      { type: 'place', prompt: 'Put the tip jar on the counter.', checks: [{ rel: 'onTop', a: 'tip-jar', b: 'counter' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the table for two near the window and the menu on it.',
        checks: [{ rel: 'nearWindow', a: 'table-for-two' }, { rel: 'onTop', a: 'menu', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Hang the specials board above the counter.', checks: [{ rel: 'above', a: 'specials-board', b: 'counter' }] },
      { type: 'place', prompt: 'Put the high chair next to the table for two.', checks: [{ rel: 'nextTo', a: 'high-chair', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Put the pizza oven in the corner.', checks: [{ rel: 'inCorner', a: 'pizza-oven' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a romantic spot: table for two near the window with the salt and pepper on it.',
        checks: [{ rel: 'nearWindow', a: 'table-for-two' }, { rel: 'onTop', a: 'salt-and-pepper', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Organise the counter: against a wall, specials board above it, tip jar on it.',
        checks: [{ rel: 'againstWall', a: 'counter' }, { rel: 'above', a: 'specials-board', b: 'counter' }, { rel: 'onTop', a: 'tip-jar', b: 'counter' }] },
      { type: 'place', prompt: 'Keep guests cool: the pizza oven far from the table for two.', checks: [{ rel: 'farFrom', a: 'pizza-oven', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Tempt guests: dessert trolley next to the table for two.', checks: [{ rel: 'nextTo', a: 'dessert-trolley', b: 'table-for-two' }] },
      { type: 'write', prompt: 'Describe your new restaurant in 3–4 sentences. Say where things are.', minWords: 25,
        require: [restaurantWords(3), prepositions(2)], sample: 'The table for two is near the window...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create an intimate dining spot: table by the window, menu on it, dessert trolley beside it.',
        checks: [{ rel: 'nearWindow', a: 'table-for-two' }, { rel: 'onTop', a: 'menu', b: 'table-for-two' }, { rel: 'nextTo', a: 'dessert-trolley', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Make the oven a feature but keep it safe: pizza oven in a corner, well away from the table.',
        checks: [{ rel: 'inCorner', a: 'pizza-oven' }, { rel: 'farFrom', a: 'pizza-oven', b: 'table-for-two' }] },
      { type: 'place', prompt: 'Make the specials visible to everyone waiting to pay: specials board above the counter.', checks: [{ rel: 'above', a: 'specials-board', b: 'counter' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works for guests and staff, what is still not ideal, and why?', minWords: 45,
        require: [restaurantWords(3), prepositions(2), advanced(1)], sample: 'Although the restaurant is small, the table now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Food Critic Night', icon: '⭐', xp: 150,
  intro: {
    A1: 'A famous food critic is coming tonight! Make the restaurant perfect.',
    A2: 'A food critic is visiting tonight. Get the restaurant ready and serve her well.',
    B1: 'A well-known food critic is coming to review the restaurant. Prepare everything and give excellent service.',
    B2: 'A national newspaper’s food critic has booked a table. Prepare the restaurant, handle her requests and write the follow-up.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'The critic wants to choose her food. What does she need? Click it.', targets: ['menu'] },
      { type: 'sort', prompt: 'Get ready: put the pizza on the table and the cake on the trolley.', props: [
        thing('f1', 'the pizza', 'cup', '#e9b46a', ['table-for-two'], 'Put the pizza on the table.'),
        thing('f2', 'the cake', 'box', '#f7b2d0', ['dessert-trolley'], 'Put the cake on the dessert trolley.'),
      ] },
      { type: 'choice', prompt: 'The critic says: “I’d like a pizza, please.” What do you say?', options: [
        { text: 'Of course! Which pizza would you like?', correct: true, feedback: 'Polite and helpful!' },
        { text: 'No pizza today.', correct: false, feedback: 'It’s a pizzeria!' },
        { text: 'I am a pizza.', correct: false, feedback: 'Ha! You’re the waiter.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about the restaurant.', minWords: 8, require: [restaurantWords(2)], sample: 'The pizza oven is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Is the restaurant open? Check the sign. Click it.', targets: ['open-sign'] },
      { type: 'sort', prompt: 'Make the table perfect.', props: [
        thing('f1', 'a candle', 'cup', '#fff3d6', ['table-for-two'], 'Put a candle on the table.'),
        thing('f2', 'a flower', 'cup', '#f28c8c', ['table-for-two', 'counter'], 'Put a flower on the table.'),
        thing('f3', 'dirty plates', 'cup', '#e8e2d4', ['counter'], 'Take the dirty plates to the counter.'),
      ] },
      { type: 'place', prompt: 'The critic likes the view: put the table for two near the window.', checks: [{ rel: 'nearWindow', a: 'table-for-two' }] },
      { type: 'write', prompt: 'Write today’s specials for the board. Use at least 3 restaurant words and 2 prepositions.', minWords: 15,
        require: [restaurantWords(3), prepositions(2)], sample: 'Today’s specials: pizza with…' },
    ],
    B1: [
      { type: 'find', prompt: 'The critic asks which dish the chef recommends tonight. What do you point to? Click it.', targets: ['specials-board'] },
      { type: 'sort', prompt: 'Prepare her table.', props: [
        thing('f1', 'a menu with allergy information', 'book', '#7a2f2f', ['table-for-two', 'menu'], 'She mentioned she can’t eat nuts.'),
        thing('f2', 'the chef’s special pizza', 'cup', '#d9442f', ['table-for-two'], 'Serve it hot, straight from the oven.'),
        thing('f3', 'a fresh tiramisu', 'box', '#c98a4e', ['dessert-trolley'], 'Keep it ready for after the main course.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks messy.', props: [
        thing('f4', 'a dirty high chair cover', 'box', '#9fd8c2', ['high-chair', 'counter'], 'Change it before anyone sees it.'),
        thing('f5', 'old receipts', 'book', '#ffffff', ['counter'], 'Don’t leave them on the tables.'),
        thing('f6', 'spilled coins', 'cup', '#c9a227', ['tip-jar'], 'Somebody knocked the jar over.'),
      ] },
      { type: 'place', prompt: 'Make her evening comfortable: table for two near the window and far from the hot oven.',
        checks: [{ rel: 'nearWindow', a: 'table-for-two' }, { rel: 'farFrom', a: 'pizza-oven', b: 'table-for-two' }] },
      { type: 'write', prompt: 'Write a thank-you email (at least 35 words) to the critic after her visit.', minWords: 35,
        require: [restaurantWords(3), connectors(1)], sample: 'Thank you for visiting our restaurant. We hope you enjoyed...' },
    ],
    B2: [
      { type: 'find', prompt: 'The critic wants to see the pizzas being made. Show her the heart of the kitchen.', targets: ['pizza-oven'] },
      { type: 'sort', prompt: 'Prepare the service to a high standard.', props: [
        thing('f1', 'a tasting menu', 'book', '#7a2f2f', ['table-for-two', 'menu'], 'Present it at her table before she orders.'),
        thing('f2', 'a seasonal tart', 'box', '#ffd54f', ['dessert-trolley'], 'Showcase local ingredients at dessert.'),
        thing('f3', 'freshly ground pepper', 'cup', '#2f3440', ['salt-and-pepper', 'table-for-two'], 'Offer it with the main course.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unprofessional is left out.', props: [
        thing('f4', 'a crumpled bill from another table', 'book', '#ffffff', ['counter'], 'Other guests’ bills are private.'),
        thing('f5', 'an overflowing tip jar', 'cup', '#c9a227', ['counter', 'tip-jar'], 'Empty it discreetly before the critic arrives.'),
        thing('f6', 'a burnt pizza', 'cup', '#3a2a1a', ['counter'], 'It must never reach a table.'),
      ] },
      { type: 'choice', prompt: 'The critic says her pizza is slightly overcooked. What is the most professional response?', options: [
        { text: 'Thank her for the feedback, apologise and offer to bring a freshly made one straight away.', correct: true, feedback: 'Gracious and quick to put it right.' },
        { text: 'Explain that it’s supposed to be like that.', correct: false, feedback: 'Arguing with a critic rarely ends well.' },
        { text: 'Take it away without saying anything.', correct: false, feedback: 'Acknowledge the problem first.' },
      ] },
      { type: 'write', prompt: 'Write a short reply (at least 55 words) to the critic’s published review, which praised the atmosphere but criticised one dish.', minWords: 55,
        require: [restaurantWords(3), prepositions(2), advanced(1)], sample: 'Although we were disappointed to read about the pizza, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const restaurantChapter: ChapterDefinition = {
  roomId: 'restaurant',
  title: 'My Restaurant',
  explore,
  challenges: [unpack, busyEvening, budgetRestaurant],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'table-for-two', prompt: { A1: 'Find the small table.', A2: 'Find the table for two.', B1: 'Find a romantic place to eat.', B2: 'Find the table set for a couple.' } },
    { target: 'high-chair', prompt: { A1: 'Find the baby’s chair.', A2: 'Find the high chair.', B1: 'Find where a baby sits at dinner.', B2: 'Find the infant seat.' } },
    { target: 'counter', prompt: { A1: 'Find where you pay.', A2: 'Find the counter.', B1: 'Find where takeaways are collected.', B2: 'Find the service counter.' } },
    { target: 'pizza-oven', prompt: { A1: 'Find the hot oven.', A2: 'Find the pizza oven.', B1: 'Find where the pizzas are baked.', B2: 'Find the wood-fired oven.' } },
    { target: 'dessert-trolley', prompt: { A1: 'Find the cakes.', A2: 'Find the dessert trolley.', B1: 'Find the sweet things on wheels.', B2: 'Find the pudding selection.' } },
    { target: 'menu', prompt: { A1: 'Find the menu.', A2: 'Find the list of food.', B1: 'Find what you read before you order.', B2: 'Find the bill of fare.' } },
    { target: 'pizza', prompt: { A1: 'Find the pizza.', A2: 'Find the round food with cheese.', B1: 'Find the chef’s famous dish.', B2: 'Find the margherita.' } },
    { target: 'bill', prompt: { A1: 'Find the bill.', A2: 'Find what shows how much to pay.', B1: 'Find what the waiter brings at the end.', B2: 'Find the receipt for the meal.' } },
    { target: 'tip-jar', prompt: { A1: 'Find the jar.', A2: 'Find the tip jar.', B1: 'Find where you leave a little extra money.', B2: 'Find the gratuity jar.' } },
    { target: 'salt-and-pepper', prompt: { A1: 'Find the salt.', A2: 'Find the salt and pepper.', B1: 'Find what makes food tastier.', B2: 'Find the condiments.' } },
    { target: 'specials-board', prompt: { A1: 'Find the black board.', A2: 'Find the specials board.', B1: 'Find today’s dishes.', B2: 'Find the chalkboard of daily specials.' } },
    { target: 'open-sign', prompt: { A1: 'Find the pink light.', A2: 'Find the open sign.', B1: 'Find what tells people you’re open.', B2: 'Find the neon sign.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'nearWindow', a: 'table-for-two' }], prompt: { A1: 'Put the table for two near the window.', B1: 'Give the guests a nice view.', B2: 'Position the table to make the most of the view.' } },
    { checks: [{ rel: 'onTop', a: 'salt-and-pepper', b: 'table-for-two' }], prompt: { A1: 'Put the salt and pepper on the table.', B1: 'Set the table with salt and pepper.', B2: 'Place the condiments on the table.' } },
    { checks: [{ rel: 'inCorner', a: 'pizza-oven' }], prompt: { A1: 'Put the pizza oven in the corner.', B1: 'Move the hot oven out of the way.', B2: 'Tuck the oven into a corner.' } },
    { checks: [{ rel: 'againstWall', a: 'counter' }], prompt: { A1: 'Put the counter against the wall.', B1: 'Push the counter back to the wall.', B2: 'Position the counter flush against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'tip-jar', b: 'counter' }], prompt: { A1: 'Put the tip jar on the counter.', B1: 'Put the tip jar where people pay.', B2: 'Place the gratuity jar on the counter.' } },
    { checks: [{ rel: 'above', a: 'specials-board', b: 'counter' }], prompt: { A1: 'Hang the specials board above the counter.', B1: 'Show today’s dishes where people queue.', B2: 'Mount the specials board above the counter.' } },
    { checks: [{ rel: 'nextTo', a: 'high-chair', b: 'table-for-two' }], prompt: { A1: 'Put the high chair next to the table.', B1: 'Make room for the baby at the table.', B2: 'Position the high chair beside the table.' } },
    { checks: [{ rel: 'farFrom', a: 'pizza-oven', b: 'table-for-two' }], prompt: { A1: 'Put the pizza oven far from the table.', B1: 'Keep the hot oven away from the guests.', B2: 'Keep the oven at a safe distance from diners.' } },
    { checks: [{ rel: 'onTop', a: 'pizza', b: 'table-for-two' }], prompt: { A1: 'Put the pizza on the table.', B1: 'Serve the pizza.', B2: 'Serve the pizza at the table.' } },
    { checks: [{ rel: 'nextTo', a: 'dessert-trolley', b: 'table-for-two' }], prompt: { A1: 'Put the dessert trolley next to the table.', B1: 'Bring the cakes to the guests.', B2: 'Position the dessert trolley beside the table.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'food', label: 'Food & meals', icon: '🍕' },
      { id: 'things', label: 'In the restaurant', icon: '🍽️' },
      { id: 'people', label: 'People & places', icon: '👨‍🍳' },
      { id: 'actions', label: 'Things you do', icon: '🗣️' },
    ],
    items: [
      { word: 'pizza', bin: 'food', level: 'A1' }, { word: 'salad', bin: 'food', level: 'A1' },
      { word: 'ice cream', bin: 'food', level: 'A1' }, { word: 'cake', bin: 'food', level: 'A1' },
      { word: 'dessert', bin: 'food', level: 'A2' }, { word: 'starter', bin: 'food', level: 'A2' },
      { word: 'main course', bin: 'food', level: 'A2' }, { word: 'dish of the day', bin: 'food', level: 'B1' },
      { word: 'menu', bin: 'things', level: 'A1' }, { word: 'table for two', bin: 'things', level: 'A1' },
      { word: 'salt and pepper', bin: 'things', level: 'A1' }, { word: 'bill', bin: 'things', level: 'A2' },
      { word: 'high chair', bin: 'things', level: 'A2' }, { word: 'tip jar', bin: 'things', level: 'A2' },
      { word: 'pizza oven', bin: 'things', level: 'A2' }, { word: 'reservation', bin: 'things', level: 'B1' },
      { word: 'restaurant', bin: 'people', level: 'A1' }, { word: 'waiter', bin: 'people', level: 'A1' },
      { word: 'waitress', bin: 'people', level: 'A1' }, { word: 'cafe', bin: 'people', level: 'A1' },
      { word: 'chef', bin: 'people', level: 'A2' }, { word: 'guest', bin: 'people', level: 'A2' },
      { word: 'takeaway', bin: 'people', level: 'B1' }, { word: 'counter', bin: 'people', level: 'A2' },
      { word: 'order', bin: 'actions', level: 'A1' }, { word: 'taste', bin: 'actions', level: 'A2' },
      { word: 'book a table', bin: 'actions', level: 'A2' }, { word: 'serve', bin: 'actions', level: 'A2' },
      { word: 'pay the bill', bin: 'actions', level: 'A2' }, { word: 'recommend', bin: 'actions', level: 'B1' },
      { word: 'complain', bin: 'actions', level: 'B1' }, { word: 'split the bill', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You arrive at the restaurant with your friend. What do you say?', options: [
      { text: 'Hello! A table for two, please.', best: true, feedback: 'Perfect!' },
      { text: 'Give me pizza!', best: false, feedback: 'Say “please”!' },
      { text: 'Goodbye!', best: false, feedback: 'You’ve just arrived!' },
    ] },
    { level: 'A1', situation: 'You want to know what food they have. What do you ask?', options: [
      { text: 'Can I see the menu, please?', best: true, feedback: 'Great!' },
      { text: 'Can I see the kitchen?', best: false, feedback: 'The menu is easier!' },
      { text: 'Where is the toilet?', best: false, feedback: 'Useful, but not now.' },
    ] },
    { level: 'A1', situation: 'You finish your dinner. You want to pay. What do you say?', options: [
      { text: 'Can I have the bill, please?', best: true, feedback: 'Yes!' },
      { text: 'Can I have the oven, please?', best: false, feedback: 'The BILL!' },
      { text: 'Nothing — I just leave.', best: false, feedback: 'You must pay first!' },
    ] },
    { level: 'A2', situation: 'Your soup is cold. What do you do?', options: [
      { text: 'Politely tell the waiter and ask for it to be heated.', best: true, feedback: 'Polite and clear.' },
      { text: 'Shout at the waiter.', best: false, feedback: 'That isn’t nice.' },
      { text: 'Eat it and write a bad review later.', best: false, feedback: 'Tell them now so they can fix it.' },
    ] },
    { level: 'A2', situation: 'You’re allergic to nuts. What do you do when you order?', options: [
      { text: 'Tell the waiter about your allergy before you order.', best: true, feedback: 'Safe and sensible.' },
      { text: 'Say nothing and hope for the best.', best: false, feedback: 'That could be dangerous.' },
      { text: 'Only drink water all evening.', best: false, feedback: 'The restaurant can help — just ask.' },
    ] },
    { level: 'A2', situation: 'The waiter was very friendly and helpful. What can you do?', options: [
      { text: 'Say thank you and leave a tip.', best: true, feedback: 'A nice way to say thanks.' },
      { text: 'Take the salt and pepper home.', best: false, feedback: 'They belong to the restaurant!' },
      { text: 'Nothing.', best: false, feedback: 'A thank you is free!' },
    ] },
    { level: 'B1', situation: 'You booked a table for 8 p.m., but you’re going to be 30 minutes late. What would you do?', options: [
      { text: 'Phone the restaurant, apologise and ask if they can keep the table.', best: true, feedback: 'Polite and practical.' },
      { text: 'Arrive late and say nothing.', best: false, feedback: 'They might give your table away.' },
      { text: 'Don’t go at all and don’t call.', best: false, feedback: 'That’s unfair to the restaurant.' },
    ], reasons: [
      { text: 'Because the restaurant can plan and other guests aren’t affected.', correct: true },
      { text: 'Because phones are free.', correct: false },
      { text: 'Because restaurants are always empty.', correct: false },
    ] },
    { level: 'B1', situation: 'Your group can’t agree how to pay the bill. Some people ate much more than others. What would you suggest?', options: [
      { text: 'Everyone pays for what they ordered, plus a share of the tip.', best: true, feedback: 'Fair for everyone.' },
      { text: 'Split it equally anyway.', best: false, feedback: 'Some people might feel it’s unfair.' },
      { text: 'Let one person pay for everyone.', best: false, feedback: 'That’s a lot to ask.' },
    ], reasons: [
      { text: 'Because it’s fair when everyone pays for their own food.', correct: true },
      { text: 'Because maths is fun.', correct: false },
    ] },
    { level: 'B2', situation: 'Your city wants to ban fast-food restaurants near schools to improve children’s health.', options: [
      { text: 'Support healthier options near schools, but suggest working with restaurants instead of a total ban.', best: true, feedback: 'A balanced, constructive view.' },
      { text: 'Say it’s a terrible idea — children should eat what they like.', best: false, feedback: 'That ignores the health concerns.' },
      { text: 'Ban all restaurants in the city.', best: false, feedback: 'Far too extreme.' },
    ], write: { prompt: 'Justify your view, weighing up health benefits against freedom of choice.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'A restaurant throws away a lot of good food every evening.', options: [
      { text: 'Suggest donating it to a food bank or selling it cheaply through an app.', best: true, feedback: 'Reduces waste and helps people.' },
      { text: 'Say it’s not your problem.', best: false, feedback: 'Food waste affects everyone.' },
      { text: 'Tell them to cook less and turn customers away.', best: false, feedback: 'There are better solutions.' },
    ], write: { prompt: 'Explain how restaurants could reduce food waste.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'A table for two, please.', level: 'A1' },
    { text: 'Can I see the menu, please?', level: 'A1' },
    { text: 'I would like a cheese pizza.', level: 'A1' },
    { text: 'The pizza is very tasty.', level: 'A1' },
    { text: 'Can I have the bill, please?', level: 'A1' },
    { text: 'The waiter brings the food.', level: 'A1' },
    { text: 'I’d like to book a table for Friday.', level: 'A2' },
    { text: 'What would you like for dessert?', level: 'A2' },
    { text: 'The chef puts the pizza in the oven.', level: 'A2' },
    { text: 'Could you pass the salt and pepper?', level: 'A2' },
    { text: 'We left a tip for the waitress.', level: 'A2' },
    { text: 'This soup is too spicy for me.', level: 'A2' },
    { text: 'What do you recommend today?', level: 'B1' },
    { text: 'Do you have any vegetarian dishes?', level: 'B1' },
    { text: 'I’m sorry, we are fully booked tonight.', level: 'B1' },
    { text: 'Shall we share a large pizza?', level: 'B1' },
    { text: 'Although the service was slow, the food was excellent.', level: 'B2' },
    { text: 'Is the service charge included in the bill?', level: 'B2' },
    { text: 'Shall we split the bill between us?', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The menu is ___ the table.', answer: 'on', options: ['on', 'in', 'under'], level: 'A1' },
    { sentence: 'The pizza is ___ the oven.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The high chair is ___ the table.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'We are ___ a restaurant.', answer: 'at', options: ['at', 'on', 'under'], level: 'A1' },
    { sentence: 'I’d like a pizza ___ mushrooms.', answer: 'with', options: ['with', 'of', 'at'], level: 'A2' },
    { sentence: 'We have a table ___ eight o’clock.', answer: 'at', options: ['at', 'on', 'in'], level: 'A2' },
    { sentence: 'The board is ___ the counter.', answer: 'above', options: ['above', 'under', 'into'], level: 'A2' },
    { sentence: 'Let’s go ___ dinner on Saturday.', answer: 'out for', options: ['out for', 'out at', 'in for'], level: 'A2' },
    { sentence: 'Is the soup ___ the menu today?', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'I’m allergic ___ nuts.', answer: 'to', options: ['to', 'of', 'with'], level: 'B1' },
    { sentence: 'We booked a table ___ four people.', answer: 'for', options: ['for', 'to', 'of'], level: 'B1' },
    { sentence: 'The price includes a charge ___ service.', answer: 'for', options: ['for', 'of', 'at'], level: 'B2' },
    { sentence: 'The restaurant specialises ___ Italian food.', answer: 'in', options: ['in', 'on', 'at'], level: 'B2' },
  ],
};
