import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  SUPERMARKET CHAPTER — all missions, mini-game content and practice sentences.
//  A small supermarket in the city. Same shape as the other rooms.
//
//  Furniture ids you can use: special-offer, opening-hours (on the wall),
//  shopping-trolley, checkout, fruit-stand, bread-rack, drinks-fridge (floor),
//  cash-register, shopping-basket, barcode-scanner, watermelon, shopping-bag (small)
//
//  Surfaces (small things can stand ON them): checkout, fruit-stand
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const SHOP_WORDS = ['supermarket', 'shop', 'trolley', 'shopping trolley', 'checkout', 'cash register', 'fruit', 'fruit stand', 'bread', 'bread rack', 'fridge',
  'drinks fridge', 'basket', 'shopping basket', 'scanner', 'barcode scanner', 'watermelon', 'bag', 'shopping bag', 'special offer', 'opening hours', 'price', 'money', 'cashier'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const shopWords = (count: number): WordRequirement => ({ label: 'supermarket words', words: SHOP_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in the supermarket.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('carry', 'Carry it all', '🧺', {
    A1: 'Find two things to carry your shopping in.',
    A2: 'Find the big one with wheels and the small one you carry.',
    B1: 'Find what you’d take for a big weekly shop and for a quick one.',
    B2: 'Identify two ways of carrying goods around the shop.',
  }, ['shopping-trolley', 'shopping-basket'], 2),
  findMission('pay-here', 'Pay here', '💳', {
    A1: 'Find two things where you pay.',
    A2: 'Find where you pay and the machine for the money.',
    B1: 'Find two things the cashier uses at the end of your shop.',
    B2: 'Identify the point of sale and the till.',
  }, ['checkout', 'cash-register'], 2),
  findMission('fresh-food', 'Fresh food', '🍎', {
    A1: 'Find two places with food.',
    A2: 'Find the fruit and the bread.',
    B1: 'Find two places where food is fresh every morning.',
    B2: 'Identify the fresh produce and bakery displays.',
  }, ['fruit-stand', 'bread-rack'], 2),
  findMission('signs', 'Read the signs', '🪧', {
    A1: 'Find two signs.',
    A2: 'Find when the shop is open and what is cheap today.',
    B1: 'Find two signs that help you plan your shopping.',
    B2: 'Identify the trading times and the current promotion.',
  }, ['opening-hours', 'special-offer'], 2),
  findMission('cold-drink', 'Cold drink', '🥤', {
    A1: 'Find the cold drinks.',
    A2: 'Find the drinks fridge.',
    B1: 'Find where to get a cold drink on a hot day.',
    B2: 'Find the chilled beverage cabinet.',
  }, ['drinks-fridge']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Delivery Day', icon: '🚚', xp: 60,
  intro: {
    A1: 'The lorry brought new food! Open the boxes and put everything in the right place.',
    A2: 'It’s early morning and a delivery has arrived. Help the shop assistant fill the shop.',
    B1: 'The shop opens in an hour and the delivery boxes are everywhere. Read the labels and stock the shelves.',
    B2: 'The wholesaler’s labels are rather vague. Work out where each delivery belongs before the doors open.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'apples and bananas', ['fruit-stand']),
      box('u2', 'bread', ['bread-rack']),
      box('u3', 'cold drinks', ['drinks-fridge']),
      box('u4', 'paper for receipts', ['cash-register']),
      box('u5', 'a sign: “Cheap today!”', ['special-offer']),
      box('u6', 'bags', ['checkout', 'shopping-bag']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'oranges and grapes', ['fruit-stand']),
      box('u2', 'rolls and loaves', ['bread-rack']),
      box('u3', 'lemonade and juice', ['drinks-fridge']),
      box('u4', 'coins for change', ['cash-register']),
      box('u5', 'a new price poster', ['special-offer']),
      box('u6', 'paper bags', ['checkout', 'shopping-bag']),
      box('u7', 'a new sign with times', ['opening-hours']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'ripe fruit — sell today', ['fruit-stand']),
      box('u2', 'something baked this morning', ['bread-rack']),
      box('u3', 'drinks that must stay cold', ['drinks-fridge']),
      box('u4', 'a till roll', ['cash-register']),
      box('u5', 'a “2 for 1” poster', ['special-offer']),
      box('u6', 'bags customers can buy at the till', ['checkout', 'shopping-bag']),
      box('u7', 'new times for Sundays', ['opening-hours']),
      box('u8', 'batteries for the thing that goes “beep”', ['barcode-scanner']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'seasonal produce', ['fruit-stand']),
      box('u2', 'artisan sourdough', ['bread-rack']),
      box('u3', 'chilled soft drinks', ['drinks-fridge']),
      box('u4', 'a float for the till', ['cash-register']),
      box('u5', 'promotional signage', ['special-offer']),
      box('u6', 'reusable carrier bags', ['checkout', 'shopping-bag']),
      box('u7', 'revised trading hours', ['opening-hours']),
      box('u8', 'a replacement laser unit', ['barcode-scanner']),
    ] }],
  },
};

const rushHour: MissionDefinition = {
  id: 'rush-hour', title: 'Saturday Rush', icon: '🏃', xp: 60,
  intro: {
    A1: 'It’s Saturday. The shop is very busy and things are everywhere! Help the shop assistant.',
    A2: 'It’s the busiest day of the week and the shop is a mess. Follow the manager’s note.',
    B1: 'Saturday is chaos and a lot of customers are waiting. Read the manager’s note and sort things out.',
    B2: 'The manager is off sick and you’re running the shop floor on a Saturday. Follow her note carefully.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the apples', 'cup', '#e04848', ['fruit-stand'], 'Put the apples on the fruit stand.'),
      thing('m2', 'the bread', 'box', '#c98a4e', ['bread-rack'], 'Put the bread on the bread rack.'),
      thing('m3', 'the juice', 'bottle', '#f2a33a', ['drinks-fridge'], 'Put the juice in the drinks fridge.'),
      thing('m4', 'the money', 'book', '#6fae6a', ['cash-register'], 'Put the money in the cash register.'),
      thing('m5', 'the empty basket', 'box', '#e04848', ['checkout', 'shopping-basket'], 'Put the basket by the checkout.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'A customer asks: “When do you close?” What do you show her? Click it.', targets: ['opening-hours'] },
      { type: 'sort', prompt: 'Follow the manager’s note.', props: [
        thing('m1', 'a box of oranges', 'box', '#f2a33a', ['fruit-stand'], 'Put the oranges on the fruit stand.'),
        thing('m2', 'warm rolls', 'box', '#e0b070', ['bread-rack'], 'Put the rolls on the bread rack.'),
        thing('m3', 'cold milk', 'bottle', '#ffffff', ['drinks-fridge'], 'Milk goes in the fridge!'),
        thing('m4', 'coins for change', 'cup', '#c9a227', ['cash-register'], 'Put the coins in the cash register.'),
        thing('m5', 'a lost shopping list', 'book', '#fff3a3', ['checkout'], 'Leave it at the checkout for the customer.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'The price of the chocolate is wrong. What do you use to check it? Click it.', targets: ['barcode-scanner'] },
      { type: 'sort', prompt: 'Read the manager’s note and put everything in its place.', props: [
        thing('m1', 'melting ice lollies', 'bottle', '#f7b2d0', ['drinks-fridge'], 'They need to be cold right now!'),
        thing('m2', 'squashed bananas', 'cup', '#ffd54f', ['special-offer', 'fruit-stand'], 'Sell them cheaply before they go bad.'),
        thing('m3', 'a customer’s forgotten wallet', 'book', '#2f3440', ['cash-register', 'checkout'], 'Keep it safe at the till until they come back.'),
        thing('m4', 'yesterday’s bread', 'box', '#b8743a', ['special-offer', 'bread-rack'], 'Half price — make sure people see it.'),
        thing('m5', 'a trolley left in the aisle', 'box', '#b9c2cc', ['shopping-trolley'], 'Someone could walk into it.'),
      ] },
      { type: 'choice', prompt: 'A customer says the scanner charged him twice for the same milk. What do you say?', options: [
        { text: 'I’m sorry about that. Let me check your receipt and give you a refund.', correct: true, feedback: 'Polite and solves the problem.' },
        { text: 'That’s impossible.', correct: false, feedback: 'Machines make mistakes too.' },
        { text: 'It’s only one euro.', correct: false, feedback: 'It’s still his money.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A queue is forming and the till has run out of coins. What needs restocking?', targets: ['cash-register'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'perishable dairy', 'bottle', '#ffffff', ['drinks-fridge'], 'Anything that spoils at room temperature must be chilled.'),
        thing('m2', 'produce near its sell-by date', 'cup', '#6fae6a', ['special-offer', 'fruit-stand'], 'Move it under the promotion so it sells today.'),
        thing('m3', 'a dropped bank card', 'book', '#3c6fd1', ['cash-register', 'checkout'], 'Keep it secure at the till.'),
        thing('m4', 'freshly delivered baguettes', 'box', '#e0b070', ['bread-rack'], 'Display them while they’re still warm.'),
        thing('m5', 'an abandoned trolley', 'box', '#b9c2cc', ['shopping-trolley'], 'It’s blocking the fire exit.'),
        thing('m6', 'spare carrier bags', 'box', '#d6b07a', ['checkout', 'shopping-bag'], 'Customers ask for them when they pay.'),
      ] },
      { type: 'write', prompt: 'Write a short note to the manager explaining what happened today and what still needs doing.', minWords: 35,
        require: [shopWords(2), connectors(1), advanced(1)], sample: 'Although Saturday was busy, the checkout ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'big-fridge', name: 'Large drinks fridge', description: 'Holds lots of drinks. Very big.', price: 55, tags: ['cold', 'big'] },
  { id: 'cool-box', name: 'Cool box', description: 'A small box with ice.', price: 12, tags: ['cold'] },
  { id: 'till', name: 'Cash register', description: 'Adds up prices and keeps money.', price: 30, tags: ['pay'] },
  { id: 'card-reader', name: 'Card reader', description: 'Customers pay by card. Small and cheap.', price: 10, tags: ['pay'] },
  { id: 'stand', name: 'Fruit stand', description: 'Shows fruit nicely.', price: 20, tags: ['show'] },
  { id: 'crates', name: 'Wooden crates', description: 'Simple boxes for fruit and bread.', price: 8, tags: ['show'] },
  { id: 'trolleys', name: 'Five trolleys', description: 'For big shops. They take a lot of space.', price: 40, tags: ['carry', 'big'] },
  { id: 'baskets', name: 'Ten baskets', description: 'Light and cheap.', price: 10, tags: ['carry'] },
  { id: 'sign', name: 'Big shop sign', description: 'People see your shop from the street.', price: 15, tags: ['sign'] },
  { id: 'balloons', name: 'Balloons', description: 'Just for fun on opening day.', price: 5, tags: ['extra'] },
];

const budgetShop: MissionDefinition = {
  id: 'budget-shop', title: 'Corner Shop on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your uncle is opening a small shop. Help him buy things.',
    A2: 'Your uncle is opening a little corner shop and doesn’t have much money. Help him choose.',
    B1: 'Your uncle’s shop is tiny. Choose things that fit the space and the budget.',
    B2: 'You’re advising your uncle on fitting out a tiny corner shop on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. The shop needs a way to pay and something to show fruit.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['till', 'card-reader', 'stand', 'crates', 'big-fridge'].includes(i.id)),
        needs: [{ tag: 'pay', label: 'pay' }, { tag: 'show', label: 'show fruit' }] },
      { type: 'place', prompt: 'Now in YOUR shop: put the cash register on the checkout.', checks: [{ rel: 'onTop', a: 'cash-register', b: 'checkout' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. The shop needs a way to pay, something cold and something to carry shopping.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['sign', 'trolleys'].includes(i.id)),
        needs: [{ tag: 'pay', label: 'pay' }, { tag: 'cold', label: 'cold' }, { tag: 'carry', label: 'carry' }] },
      { type: 'place', prompt: 'Now in YOUR shop: put the watermelon on the fruit stand.', checks: [{ rel: 'onTop', a: 'watermelon', b: 'fruit-stand' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The shop is tiny, so choose only ONE big item. It needs a way to pay, something cold, a display and something to carry shopping.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'pay', label: 'pay' }, { tag: 'cold', label: 'cold' }, { tag: 'show', label: 'display' }, { tag: 'carry', label: 'carry' }] },
      { type: 'write', prompt: 'Write a short message to your uncle explaining what you bought and why.', minWords: 25,
        require: [shopWords(2), connectors(1)], sample: 'I bought baskets because the shop is small, and...' },
      { type: 'place', prompt: 'Now in YOUR shop: put the drinks fridge against the wall.', checks: [{ rel: 'againstWall', a: 'drinks-fridge' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. The shop needs payment, refrigeration, a display, baskets and a sign.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'pay', label: 'payment' }, { tag: 'cold', label: 'refrigeration' }, { tag: 'show', label: 'display' }, { tag: 'carry', label: 'baskets' }, { tag: 'sign', label: 'sign' }] },
      { type: 'write', prompt: 'Justify your choices to your uncle. Mention one option you rejected and why.', minWords: 45,
        require: [shopWords(3), connectors(1), advanced(1)], sample: 'I chose a card reader instead of a cash register because...' },
      { type: 'place', prompt: 'Now in YOUR shop: customers see fresh fruit first — fruit stand near the window.',
        checks: [{ rel: 'nearWindow', a: 'fruit-stand' }] },
    ],
  },
};

// ── STAGE 5: SHOP MAKEOVER ─────────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Shop Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make the shop nice! Read and move the things. Then press Check.',
    A2: 'Time for a shop makeover! Follow the instructions and move the real things.',
    B1: 'Give the supermarket a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A retail designer has sent you a brief. Interpret it and rearrange the shop accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the checkout against the wall.', checks: [{ rel: 'againstWall', a: 'checkout' }] },
      { type: 'place', prompt: 'Put the cash register on the checkout.', checks: [{ rel: 'onTop', a: 'cash-register', b: 'checkout' }] },
      { type: 'place', prompt: 'Put the fruit stand near the window.', checks: [{ rel: 'nearWindow', a: 'fruit-stand' }] },
      { type: 'place', prompt: 'Put the watermelon on the fruit stand.', checks: [{ rel: 'onTop', a: 'watermelon', b: 'fruit-stand' }] },
      { type: 'place', prompt: 'Put the drinks fridge in the corner.', checks: [{ rel: 'inCorner', a: 'drinks-fridge' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the checkout against the wall and the barcode scanner on it.',
        checks: [{ rel: 'againstWall', a: 'checkout' }, { rel: 'onTop', a: 'barcode-scanner', b: 'checkout' }] },
      { type: 'place', prompt: 'Hang the special offer sign above the fruit stand.', checks: [{ rel: 'above', a: 'special-offer', b: 'fruit-stand' }] },
      { type: 'place', prompt: 'Put the shopping trolley next to the checkout.', checks: [{ rel: 'nextTo', a: 'shopping-trolley', b: 'checkout' }] },
      { type: 'place', prompt: 'Put the bread rack against the wall.', checks: [{ rel: 'againstWall', a: 'bread-rack' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a fast checkout: checkout against a wall with the cash register and the barcode scanner on it.',
        checks: [{ rel: 'againstWall', a: 'checkout' }, { rel: 'onTop', a: 'cash-register', b: 'checkout' }, { rel: 'onTop', a: 'barcode-scanner', b: 'checkout' }] },
      { type: 'place', prompt: 'Attract customers from the street: fruit stand near the window.', checks: [{ rel: 'nearWindow', a: 'fruit-stand' }] },
      { type: 'place', prompt: 'Keep drinks cold: the drinks fridge away from the sunny window — far from the fruit stand.', checks: [{ rel: 'farFrom', a: 'drinks-fridge', b: 'fruit-stand' }] },
      { type: 'place', prompt: 'Show off today’s deal: special offer sign above the fruit stand.', checks: [{ rel: 'above', a: 'special-offer', b: 'fruit-stand' }] },
      { type: 'write', prompt: 'Describe your new shop in 3–4 sentences. Say where things are.', minWords: 25,
        require: [shopWords(3), prepositions(2)], sample: 'The fruit stand is near the window...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create an inviting entrance display: fruit stand by the window, special offer above it, watermelon on it.',
        checks: [{ rel: 'nearWindow', a: 'fruit-stand' }, { rel: 'above', a: 'special-offer', b: 'fruit-stand' }, { rel: 'onTop', a: 'watermelon', b: 'fruit-stand' }] },
      { type: 'place', prompt: 'Organise an efficient till point: checkout against a wall, trolleys parked beside it.',
        checks: [{ rel: 'againstWall', a: 'checkout' }, { rel: 'nextTo', a: 'shopping-trolley', b: 'checkout' }] },
      { type: 'place', prompt: 'Make customers walk through the shop: put the drinks fridge in a corner, far from the checkout.',
        checks: [{ rel: 'inCorner', a: 'drinks-fridge' }, { rel: 'farFrom', a: 'drinks-fridge', b: 'checkout' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What helps customers and sales, what is still not ideal, and why?', minWords: 45,
        require: [shopWords(3), prepositions(2), advanced(1)], sample: 'Although the shop is small, the fruit stand now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Grand Opening', icon: '🎉', xp: 150,
  intro: {
    A1: 'The new supermarket opens today! Get the shop ready and help the first customers.',
    A2: 'It’s the grand opening of the new supermarket. Prepare the shop and serve the first customers.',
    B1: 'You’re helping at the grand opening of a neighbourhood supermarket. Make a great first impression and deal with the customers.',
    B2: 'You’re the assistant manager on opening day. Prepare the shop, handle difficult customers and report back to head office.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'The first customer wants to pay. Where does she go? Click it.', targets: ['checkout'] },
      { type: 'sort', prompt: 'Get ready: put the fruit on the stand and the drinks in the fridge.', props: [
        thing('f1', 'the fruit', 'cup', '#f2a33a', ['fruit-stand'], 'Put the fruit on the fruit stand.'),
        thing('f2', 'the drinks', 'bottle', '#5aa9e6', ['drinks-fridge'], 'Put the drinks in the fridge.'),
      ] },
      { type: 'choice', prompt: 'A customer asks: “How much is the watermelon?” What do you say?', options: [
        { text: 'It’s three euros.', correct: true, feedback: 'Clear answer!' },
        { text: 'It’s green.', correct: false, feedback: 'She asked about the PRICE.' },
        { text: 'I am a watermelon.', correct: false, feedback: 'Ha! No, you’re the shop assistant.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about the supermarket.', minWords: 8, require: [shopWords(2)], sample: 'The watermelon is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Everyone should know today’s deal. What do you put up? Click it.', targets: ['special-offer'] },
      { type: 'sort', prompt: 'Make the shop nice.', props: [
        thing('f1', 'balloons', 'toy', '#f28c8c', ['checkout', 'fruit-stand'], 'Tie the balloons to the checkout.'),
        thing('f2', 'free cakes to try', 'box', '#f7b2d0', ['checkout', 'fruit-stand'], 'Put the cakes on the checkout.'),
        thing('f3', 'fresh rolls', 'box', '#e0b070', ['bread-rack'], 'Put the rolls on the bread rack.'),
      ] },
      { type: 'place', prompt: 'Customers will see fruit first: put the fruit stand near the window.', checks: [{ rel: 'nearWindow', a: 'fruit-stand' }] },
      { type: 'write', prompt: 'Write a short advert for the opening. Use at least 3 supermarket words and 2 prepositions.', minWords: 15,
        require: [shopWords(3), prepositions(2)], sample: 'Come to our new supermarket! On the fruit stand…' },
    ],
    B1: [
      { type: 'find', prompt: 'A customer wants to know if you’re open on Sunday. What do you point to? Click it.', targets: ['opening-hours'] },
      { type: 'sort', prompt: 'Prepare the shop.', props: [
        thing('f1', 'opening-day discount vouchers', 'book', '#ffd54f', ['checkout', 'cash-register'], 'Give one to every customer when they pay.'),
        thing('f2', 'free fruit samples', 'cup', '#e04848', ['fruit-stand'], 'Let people taste how fresh the fruit is.'),
        thing('f3', 'cold bottles of water', 'bottle', '#9fd8ff', ['drinks-fridge'], 'It’s a hot day — keep them cold.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks messy.', props: [
        thing('f4', 'empty delivery boxes', 'box', '#d6b07a', ['checkout', 'shopping-bag'], 'Flatten them behind the till, out of sight.'),
        thing('f5', 'a trolley with a broken wheel', 'box', '#b9c2cc', ['shopping-trolley'], 'Park it with the others until it’s fixed.'),
        thing('f6', 'old price stickers', 'book', '#ffffff', ['cash-register'], 'They mustn’t confuse customers.'),
      ] },
      { type: 'place', prompt: 'Make paying quick: checkout against the wall with the scanner on it.',
        checks: [{ rel: 'againstWall', a: 'checkout' }, { rel: 'onTop', a: 'barcode-scanner', b: 'checkout' }] },
      { type: 'write', prompt: 'Write a short post (at least 35 words) for the shop’s social media about opening day.', minWords: 35,
        require: [shopWords(3), connectors(1)], sample: 'Our new supermarket is open! Come and visit because...' },
    ],
    B2: [
      { type: 'find', prompt: 'Head office wants proof the opening promotion is visible from the entrance. Click the promotion.', targets: ['special-offer'] },
      { type: 'sort', prompt: 'Prepare the shop to a high standard.', props: [
        thing('f1', 'a tasting tray of local cheese', 'box', '#ffd54f', ['checkout', 'fruit-stand'], 'Showcase local suppliers where people queue.'),
        thing('f2', 'reusable bags with the shop logo', 'box', '#3f7d4e', ['checkout', 'shopping-bag'], 'Offer them at the point of sale.'),
        thing('f3', 'chilled smoothies', 'bottle', '#c06bd6', ['drinks-fridge'], 'Perishable — keep them refrigerated.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unsafe or out of date is left out.', props: [
        thing('f4', 'out-of-date yoghurts', 'cup', '#ffffff', ['shopping-bag'], 'Remove them from sale immediately.'),
        thing('f5', 'a spill sign', 'book', '#ffd54f', ['fruit-stand', 'checkout'], 'Someone dropped grapes — warn customers.'),
        thing('f6', 'the cash float', 'book', '#6fae6a', ['cash-register'], 'Money must never be left unattended.'),
      ] },
      { type: 'choice', prompt: 'A customer angrily says the opening offer has already sold out. What is the most professional response?', options: [
        { text: 'Apologise, explain demand was higher than expected and offer a voucher for when it’s back in stock.', correct: true, feedback: 'Calm, honest and keeps the customer.' },
        { text: 'Tell him he should have come earlier.', correct: false, feedback: 'That will lose a customer.' },
        { text: 'Ignore him and serve the next person.', correct: false, feedback: 'He deserves an answer.' },
      ] },
      { type: 'write', prompt: 'Write a short report (at least 55 words) to head office on opening day: what went well, what went wrong and what you recommend.', minWords: 55,
        require: [shopWords(3), prepositions(2), advanced(1)], sample: 'Although opening day was very busy, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const supermarketChapter: ChapterDefinition = {
  roomId: 'supermarket',
  title: 'My Supermarket',
  explore,
  challenges: [unpack, rushHour, budgetShop],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'shopping-trolley', prompt: { A1: 'Find the trolley.', A2: 'Find the big basket on wheels.', B1: 'Find what you push for a big shop.', B2: 'Find the shopping cart.' } },
    { target: 'checkout', prompt: { A1: 'Find where you pay.', A2: 'Find the checkout.', B1: 'Find where the queue ends.', B2: 'Find the point of sale.' } },
    { target: 'cash-register', prompt: { A1: 'Find the money machine.', A2: 'Find the cash register.', B1: 'Find where the cashier keeps the money.', B2: 'Find the till.' } },
    { target: 'fruit-stand', prompt: { A1: 'Find the fruit.', A2: 'Find the fruit stand.', B1: 'Find where the oranges are sold.', B2: 'Find the fresh produce display.' } },
    { target: 'bread-rack', prompt: { A1: 'Find the bread.', A2: 'Find the bread rack.', B1: 'Find where the fresh rolls are.', B2: 'Find the bakery shelves.' } },
    { target: 'drinks-fridge', prompt: { A1: 'Find the cold drinks.', A2: 'Find the drinks fridge.', B1: 'Find where to get a cold lemonade.', B2: 'Find the chilled cabinet.' } },
    { target: 'shopping-basket', prompt: { A1: 'Find the red basket.', A2: 'Find the shopping basket.', B1: 'Find what you carry for a quick shop.', B2: 'Find the hand basket.' } },
    { target: 'barcode-scanner', prompt: { A1: 'Find what goes “beep”.', A2: 'Find the barcode scanner.', B1: 'Find what reads the price.', B2: 'Find the scanning device.' } },
    { target: 'watermelon', prompt: { A1: 'Find the big green fruit.', A2: 'Find the watermelon.', B1: 'Find the heaviest fruit in the shop.', B2: 'Find the melon.' } },
    { target: 'shopping-bag', prompt: { A1: 'Find the bag.', A2: 'Find the shopping bag.', B1: 'Find what you take your shopping home in.', B2: 'Find the carrier bag.' } },
    { target: 'special-offer', prompt: { A1: 'Find the yellow sign.', A2: 'Find the special offer.', B1: 'Find what tells you what’s cheap today.', B2: 'Find the promotion.' } },
    { target: 'opening-hours', prompt: { A1: 'Find the times.', A2: 'Find the opening hours.', B1: 'Find when the shop closes.', B2: 'Find the trading hours.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'againstWall', a: 'checkout' }], prompt: { A1: 'Put the checkout against the wall.', B1: 'Push the checkout back to the wall.', B2: 'Position the checkout flush against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'cash-register', b: 'checkout' }], prompt: { A1: 'Put the cash register on the checkout.', B1: 'Get the till ready for customers.', B2: 'Set the cash register on the checkout.' } },
    { checks: [{ rel: 'nearWindow', a: 'fruit-stand' }], prompt: { A1: 'Put the fruit stand near the window.', B1: 'Let people outside see the fresh fruit.', B2: 'Position the produce display by the window.' } },
    { checks: [{ rel: 'onTop', a: 'watermelon', b: 'fruit-stand' }], prompt: { A1: 'Put the watermelon on the fruit stand.', B1: 'Put the big melon on display.', B2: 'Display the watermelon on the fruit stand.' } },
    { checks: [{ rel: 'inCorner', a: 'drinks-fridge' }], prompt: { A1: 'Put the drinks fridge in the corner.', B1: 'Move the fridge out of the way.', B2: 'Tuck the chilled cabinet into a corner.' } },
    { checks: [{ rel: 'above', a: 'special-offer', b: 'fruit-stand' }], prompt: { A1: 'Hang the special offer above the fruit stand.', B1: 'Show today’s deal above the fruit.', B2: 'Mount the promotion above the produce display.' } },
    { checks: [{ rel: 'nextTo', a: 'shopping-trolley', b: 'checkout' }], prompt: { A1: 'Put the trolley next to the checkout.', B1: 'Park the trolley by the till.', B2: 'Position the trolley beside the checkout.' } },
    { checks: [{ rel: 'againstWall', a: 'bread-rack' }], prompt: { A1: 'Put the bread rack against the wall.', B1: 'Push the bread shelves to the wall.', B2: 'Position the bakery rack against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'barcode-scanner', b: 'checkout' }], prompt: { A1: 'Put the barcode scanner on the checkout.', B1: 'Get ready to scan the shopping.', B2: 'Set the scanner up on the checkout.' } },
    { checks: [{ rel: 'farFrom', a: 'drinks-fridge', b: 'checkout' }], prompt: { A1: 'Put the drinks fridge far from the checkout.', B1: 'Make customers walk past everything to get a drink.', B2: 'Keep the chilled cabinet at a distance from the till.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'food', label: 'Food & drink', icon: '🍎' },
      { id: 'money', label: 'Money', icon: '💶' },
      { id: 'shop', label: 'In the shop', icon: '🛒' },
      { id: 'actions', label: 'Things you do', icon: '🛍️' },
    ],
    items: [
      { word: 'orange', bin: 'food', level: 'A1' }, { word: 'tomato', bin: 'food', level: 'A1' },
      { word: 'chicken', bin: 'food', level: 'A1' }, { word: 'chocolate', bin: 'food', level: 'A1' },
      { word: 'watermelon', bin: 'food', level: 'A1' }, { word: 'grapes', bin: 'food', level: 'A2' },
      { word: 'loaf', bin: 'food', level: 'A2' }, { word: 'lemonade', bin: 'food', level: 'A2' },
      { word: 'money', bin: 'money', level: 'A1' }, { word: 'price', bin: 'money', level: 'A1' },
      { word: 'cash', bin: 'money', level: 'A2' }, { word: 'change', bin: 'money', level: 'A2' },
      { word: 'receipt', bin: 'money', level: 'A2' }, { word: 'bank card', bin: 'money', level: 'A2' },
      { word: 'discount', bin: 'money', level: 'B1' }, { word: 'refund', bin: 'money', level: 'B2' },
      { word: 'shopping basket', bin: 'shop', level: 'A1' }, { word: 'shopping bag', bin: 'shop', level: 'A1' },
      { word: 'checkout', bin: 'shop', level: 'A2' }, { word: 'shopping trolley', bin: 'shop', level: 'A2' },
      { word: 'cashier', bin: 'shop', level: 'A2' }, { word: 'queue', bin: 'shop', level: 'A2' },
      { word: 'aisle', bin: 'shop', level: 'B1' }, { word: 'self-checkout', bin: 'shop', level: 'B1' },
      { word: 'buy', bin: 'actions', level: 'A1' }, { word: 'pay', bin: 'actions', level: 'A1' },
      { word: 'sell', bin: 'actions', level: 'A1' }, { word: 'go shopping', bin: 'actions', level: 'A1' },
      { word: 'queue up', bin: 'actions', level: 'A2' }, { word: 'pay by card', bin: 'actions', level: 'A2' },
      { word: 'compare prices', bin: 'actions', level: 'B1' }, { word: 'run out of', bin: 'actions', level: 'B1' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You want to buy some apples. What do you do?', options: [
      { text: 'I go to the fruit stand and take some apples.', best: true, feedback: 'Yes!' },
      { text: 'I look in the drinks fridge.', best: false, feedback: 'Apples aren’t drinks!' },
      { text: 'I ask the watermelon.', best: false, feedback: 'Watermelons can’t talk!' },
    ] },
    { level: 'A1', situation: 'There are five people at the checkout. What do you do?', options: [
      { text: 'I wait in the queue.', best: true, feedback: 'Polite!' },
      { text: 'I go to the front.', best: false, feedback: 'That’s not fair.' },
      { text: 'I leave my shopping and go home.', best: false, feedback: 'You can wait a little.' },
    ] },
    { level: 'A1', situation: 'You drop a bottle and it breaks. What do you do?', options: [
      { text: 'I tell the shop assistant.', best: true, feedback: 'Good — they can clean it safely.' },
      { text: 'I run away.', best: false, feedback: 'Someone could get hurt.' },
      { text: 'I pick up the glass with my hands.', best: false, feedback: 'Careful — you could cut yourself.' },
    ] },
    { level: 'A2', situation: 'The cashier gives you too much change. What do you do?', options: [
      { text: 'Give the extra money back.', best: true, feedback: 'Honest!' },
      { text: 'Keep it and walk away quickly.', best: false, feedback: 'The cashier might have to pay it back.' },
      { text: 'Ask for even more.', best: false, feedback: 'Ha! No.' },
    ] },
    { level: 'A2', situation: 'You can’t find the biscuits. What do you do?', options: [
      { text: 'Ask a shop assistant: “Excuse me, where are the biscuits?”', best: true, feedback: 'Polite and quick.' },
      { text: 'Walk round for an hour.', best: false, feedback: 'Asking is faster!' },
      { text: 'Shout “BISCUITS!”', best: false, feedback: 'That’s a bit loud.' },
    ] },
    { level: 'A2', situation: 'You forgot your shopping bag. What do you do?', options: [
      { text: 'Buy a bag at the checkout or carry things in a box.', best: true, feedback: 'Easy solution.' },
      { text: 'Take a basket home with you.', best: false, feedback: 'The baskets belong to the shop.' },
      { text: 'Leave all your shopping.', best: false, feedback: 'There’s an easy fix.' },
    ] },
    { level: 'B1', situation: 'You only have 20 euros and a long shopping list. What would you do?', options: [
      { text: 'Compare prices, look for special offers and buy the most important things first.', best: true, feedback: 'Smart shopping.' },
      { text: 'Buy everything and hope the money is enough.', best: false, feedback: 'You might be embarrassed at the till.' },
      { text: 'Buy only chocolate.', best: false, feedback: 'Tasty, but not a good plan.' },
    ], reasons: [
      { text: 'Because you get what you really need without spending too much.', correct: true },
      { text: 'Because special offers are always healthy.', correct: false },
      { text: 'Because chocolate is cheap.', correct: false },
    ] },
    { level: 'B1', situation: 'You get home and find the milk you bought is already out of date. What would you do?', options: [
      { text: 'Take it back with the receipt and ask for a refund or a new one.', best: true, feedback: 'You have the right to a refund.' },
      { text: 'Drink it anyway.', best: false, feedback: 'You could get ill.' },
      { text: 'Write an angry review without talking to the shop.', best: false, feedback: 'Give them a chance to fix it first.' },
    ], reasons: [
      { text: 'Because shops should replace food that is out of date.', correct: true },
      { text: 'Because milk is expensive.', correct: false },
    ] },
    { level: 'B2', situation: 'Your local supermarket wants to stop selling plastic bags completely.', options: [
      { text: 'Support it, but suggest selling cheap reusable bags and reminding customers to bring their own.', best: true, feedback: 'Good for the planet and practical for customers.' },
      { text: 'Complain that it’s inconvenient.', best: false, feedback: 'Short-term convenience isn’t everything.' },
      { text: 'Say nothing.', best: false, feedback: 'Your opinion could help shape the plan.' },
    ], write: { prompt: 'Justify your view, weighing up the environmental benefits and the inconvenience.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'You see an elderly customer struggling to use the self-checkout and getting upset.', options: [
      { text: 'Offer help politely, or call a member of staff if she prefers.', best: true, feedback: 'Respectful and helpful.' },
      { text: 'Tell her to hurry up.', best: false, feedback: 'Unkind and unhelpful.' },
      { text: 'Scan her shopping without asking.', best: false, feedback: 'Ask first — respect her independence.' },
    ], write: { prompt: 'Explain how shops could make self-checkouts easier for older customers.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'I go shopping on Saturday.', level: 'A1' },
    { text: 'How much is the watermelon?', level: 'A1' },
    { text: 'The apples are on the fruit stand.', level: 'A1' },
    { text: 'I pay at the checkout.', level: 'A1' },
    { text: 'The drinks are in the fridge.', level: 'A1' },
    { text: 'Can I have a bag, please?', level: 'A1' },
    { text: 'There is a long queue today.', level: 'A2' },
    { text: 'Can I pay by card, please?', level: 'A2' },
    { text: 'Here is your change and your receipt.', level: 'A2' },
    { text: 'The shop opens at eight o’clock.', level: 'A2' },
    { text: 'The chocolate is on special offer.', level: 'A2' },
    { text: 'We need a trolley for all this food.', level: 'A2' },
    { text: 'Excuse me, which aisle is the rice in?', level: 'B1' },
    { text: 'I always compare prices before I buy.', level: 'B1' },
    { text: 'Sorry, we have run out of bread.', level: 'B1' },
    { text: 'These bananas aren’t ripe yet.', level: 'B1' },
    { text: 'Although organic food is expensive, many people buy it.', level: 'B2' },
    { text: 'You can get a refund if you keep the receipt.', level: 'B2' },
    { text: 'This brand is better value for money.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The milk is ___ the fridge.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The bananas are ___ the fruit stand.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The trolley is ___ the checkout.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'I am ___ the supermarket.', answer: 'at', options: ['at', 'on', 'under'], level: 'A1' },
    { sentence: 'The shop is closed ___ Sunday.', answer: 'on', options: ['on', 'in', 'at'], level: 'A2' },
    { sentence: 'You pay ___ the checkout.', answer: 'at', options: ['at', 'on', 'in'], level: 'A2' },
    { sentence: 'Can I pay ___ card?', answer: 'by', options: ['by', 'with', 'on'], level: 'A2' },
    { sentence: 'The sign is ___ the fruit stand.', answer: 'above', options: ['above', 'under', 'into'], level: 'A2' },
    { sentence: 'The biscuits are ___ special offer.', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'We’ve run out ___ milk.', answer: 'of', options: ['of', 'from', 'off'], level: 'B1' },
    { sentence: 'I spent twenty euros ___ food.', answer: 'on', options: ['on', 'for', 'at'], level: 'B1' },
    { sentence: 'This model is out ___ stock.', answer: 'of', options: ['of', 'from', 'off'], level: 'B2' },
    { sentence: 'Customers are entitled ___ a refund.', answer: 'to', options: ['to', 'for', 'of'], level: 'B2' },
  ],
};
