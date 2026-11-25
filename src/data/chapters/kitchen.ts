import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  KITCHEN CHAPTER — all missions, mini-game content and practice sentences.
//  Same shape as bedroom.ts.
//
//  Furniture ids you can use: table, fridge, cooker, sink, stool, kettle,
//  cupboard (on the wall), microwave, toaster, calendar (on the wall), bin, dishwasher
//
//  Surfaces (things can stand ON them): table, cooker, sink (worktop), dishwasher (worktop)
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

// ── Word lists used to check students' writing ─────────────────────────────
const KITCHEN_WORDS = ['table', 'fridge', 'cooker', 'oven', 'sink', 'stool', 'kettle', 'cupboard', 'microwave', 'toaster',
  'calendar', 'bin', 'dishwasher', 'worktop', 'tap', 'freezer', 'plate', 'plates', 'cup', 'cups', 'bowl', 'fork', 'knife', 'spoon', 'pan', 'saucepan'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const kitchenWords = (count: number): WordRequirement => ({ label: 'kitchen words', words: KITCHEN_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your kitchen.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('cold', 'Keep it cold', '🧊', {
    A1: 'Find something that keeps food cold.',
    A2: 'Find where you keep milk and cheese.',
    B1: 'Find the appliance that stops food from going off.',
    B2: 'Find where you would store perishable food.',
  }, ['fridge']),
  findMission('water', 'Water, please', '💧', {
    A1: 'Find two things that use water.',
    A2: 'Find two things in the kitchen that need water to work.',
    B1: 'Find two things you would fill with water or connect to a tap.',
    B2: 'Identify two appliances or fittings that rely on a water supply.',
  }, ['sink', 'kettle', 'dishwasher'], 2),
  findMission('electric', 'Plug it in', '🔌', {
    A1: 'Find three machines.',
    A2: 'Find three things that use electricity.',
    B1: 'Find three kitchen appliances that need to be plugged in.',
    B2: 'Identify three electrical appliances in your kitchen.',
  }, ['fridge', 'cooker', 'microwave', 'toaster', 'kettle', 'dishwasher'], 3),
  findMission('breakfast', 'Breakfast time', '🥐', {
    A1: 'Find two things you use to make breakfast.',
    B1: 'Find two things you would use to make toast and a cup of tea.',
    B2: 'Find two appliances you would need for a quick breakfast of toast and tea.',
  }, ['toaster', 'kettle'], 2),
  findMission('clean', 'Keep it clean', '🧽', {
    A1: 'Find two things that help you keep the kitchen clean.',
    A2: 'Find two things you use after dinner to clean up.',
    B2: 'Identify two things that help keep the kitchen hygienic.',
  }, ['sink', 'dishwasher', 'bin'], 2),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

const shopping: MissionDefinition = {
  id: 'shopping', title: 'Unpack the Shopping', icon: '🛍️', xp: 60,
  intro: {
    A1: 'You are back from the supermarket! Open the bags and put the food in the right place.',
    A2: 'You’ve just done the weekly shopping. Unpack the bags and put everything away.',
    B1: 'The shopping has arrived. The labels describe what’s inside — decide where each thing should be stored.',
    B2: 'Your online grocery order has been delivered with vague labels. Store everything sensibly so nothing goes off.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a bag to open it. Then click where the food goes.', props: [
      box('s1', 'milk', ['fridge']),
      box('s2', 'cheese', ['fridge']),
      box('s3', 'pasta', ['cupboard']),
      box('s4', 'tea bags', ['cupboard']),
      box('s5', 'apples', ['table', 'fridge']),
      box('s6', 'bread', ['cupboard', 'table']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each bag and put the things where they belong.', props: [
      box('s1', 'milk and butter', ['fridge']),
      box('s2', 'eggs and yoghurt', ['fridge']),
      box('s3', 'rice and pasta', ['cupboard']),
      box('s4', 'sugar and salt', ['cupboard']),
      box('s5', 'a bowl of fruit', ['table']),
      box('s6', 'a loaf of bread for toast', ['cupboard', 'table']),
      box('s7', 'old newspapers from the bag', ['bin']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('s1', 'things that must be kept cold', ['fridge']),
      box('s2', 'frozen peas and ice cream', ['fridge']),
      box('s3', 'dry food in packets', ['cupboard']),
      box('s4', 'jars of jam and honey', ['cupboard']),
      box('s5', 'fruit for everyone to share', ['table']),
      box('s6', 'empty plastic bags you don’t need', ['bin']),
      box('s7', 'new plates and bowls', ['cupboard', 'dishwasher']),
      box('s8', 'ready meals you’ll heat up tonight', ['fridge', 'microwave']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('s1', 'perishable dairy products', ['fridge']),
      box('s2', 'anything that needs to stay below zero', ['fridge']),
      box('s3', 'non-perishable staples like flour and lentils', ['cupboard']),
      box('s4', 'spices and condiments', ['cupboard']),
      box('s5', 'a centrepiece of seasonal fruit', ['table']),
      box('s6', 'packaging that can’t be reused', ['bin']),
      box('s7', 'new crockery that needs washing before use', ['dishwasher', 'sink']),
      box('s8', 'tonight’s leftovers that need reheating', ['microwave', 'fridge']),
    ] }],
  },
};

function mess(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const messyKitchen: MissionDefinition = {
  id: 'messy-kitchen', title: 'After the Party', icon: '🎉', xp: 60,
  intro: {
    A1: 'There was a party! The kitchen is messy. Follow the instructions and tidy up.',
    A2: 'Your birthday party is over and the kitchen is a mess. Your dad left a list.',
    B1: 'The party was great, but the kitchen wasn’t. Read the note and clean everything up.',
    B2: 'Your flatmate left you a slightly passive-aggressive note about the kitchen. Deal with it.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click where it goes.', props: [
      mess('k1', 'the dirty plates', 'plate', '#ffffff', ['sink', 'dishwasher'], 'Put the dirty plates in the sink.'),
      mess('k2', 'the cups', 'cup', '#a8d0f0', ['sink', 'dishwasher'], 'Put the cups in the dishwasher.'),
      mess('k3', 'the cheese', 'box', '#ffd27a', ['fridge'], 'Put the cheese in the fridge.'),
      mess('k4', 'the banana skins', 'fruit', '#ffe066', ['bin'], 'Put the banana skins in the bin.'),
      mess('k5', 'the fruit', 'fruit', '#e76f51', ['table'], 'Put the fruit on the table.'),
    ] }],
    A2: [{ type: 'sort', prompt: 'Tidy up! Follow each instruction.', props: [
      mess('k1', 'the dirty plates', 'plate', '#ffffff', ['dishwasher'], 'Load the dirty plates into the dishwasher.'),
      mess('k2', 'the mugs', 'cup', '#a8d0f0', ['sink', 'dishwasher'], 'Wash the mugs in the sink or put them in the dishwasher.'),
      mess('k3', 'the leftover cake', 'box', '#f7c59f', ['fridge'], 'Keep the leftover cake in the fridge for tomorrow.'),
      mess('k4', 'the empty pizza box', 'box', '#d9a874', ['bin'], 'Throw the empty pizza box in the bin.'),
      mess('k5', 'the clean bowls', 'plate', '#9fd8c2', ['cupboard'], 'Put the clean bowls back in the cupboard.'),
      mess('k6', 'the apples', 'fruit', '#e76f51', ['table', 'fridge'], 'Put the apples on the table.'),
    ] }],
    B1: [{ type: 'sort', prompt: 'Read the note and put everything away.', props: [
      mess('k1', 'the greasy plates', 'plate', '#ffffff', ['dishwasher', 'sink'], 'Those greasy plates won’t clean themselves — the machine can do it.'),
      mess('k2', 'the glasses', 'cup', '#d6ebf7', ['sink'], 'The nice glasses break in the machine, so wash them by hand.'),
      mess('k3', 'the leftover salad', 'box', '#9fd08f', ['fridge'], 'Don’t let the leftover salad go off.'),
      mess('k4', 'the paper cups', 'cup', '#f6a6a6', ['bin'], 'The paper cups can’t be used again.'),
      mess('k5', 'the clean saucepan', 'plate', '#b8c1c9', ['cupboard', 'cooker'], 'The clean saucepan goes back where we keep it.'),
      mess('k6', 'the cold pizza', 'box', '#ffd27a', ['microwave', 'fridge'], 'Someone wants to eat the cold pizza now, but warm.'),
    ] }],
    B2: [{ type: 'sort', prompt: 'Follow your flatmate’s note — some instructions are indirect.', props: [
      mess('k1', 'the stack of dirty plates', 'plate', '#ffffff', ['dishwasher'], 'It would be lovely if the plates found their way into the appliance designed for them.'),
      mess('k2', 'the crystal glasses', 'cup', '#d6ebf7', ['sink'], 'My grandmother’s crystal glasses are not dishwasher-safe, just so you know.'),
      mess('k3', 'the half-eaten dessert', 'box', '#f7c59f', ['fridge'], 'The dessert is perishable and I’d rather it didn’t sit out overnight.'),
      mess('k4', 'the non-recyclable wrappers', 'box', '#c9b6e4', ['bin'], 'Those wrappers have nowhere to go but one place.'),
      mess('k5', 'the clean serving bowls', 'plate', '#9fd8c2', ['cupboard'], 'The serving bowls are clean, so they can go back behind closed doors.'),
      mess('k6', 'the fruit nobody ate', 'fruit', '#e76f51', ['table', 'fridge'], 'Leave the fruit somewhere visible so people actually eat it.'),
      mess('k7', 'the cold leftovers', 'box', '#ffd27a', ['microwave'], 'I’m having the leftovers for lunch in five minutes — warm, please.'),
    ] }],
  },
};

const SHOP_ITEMS = [
  { id: 'cooker', name: 'Cooker with oven', description: 'Four hot plates and a big oven. It takes a lot of space.', price: 60, tags: ['cook', 'big'] },
  { id: 'hob', name: 'Small hob', description: 'Two hot plates. Small and cheap.', price: 35, tags: ['cook'] },
  { id: 'fridge-freezer', name: 'Tall fridge-freezer', description: 'A very big fridge with a freezer. It needs a lot of space.', price: 80, tags: ['cold', 'big'] },
  { id: 'mini-fridge', name: 'Mini fridge', description: 'A small fridge that fits under the worktop.', price: 40, tags: ['cold'] },
  { id: 'dishwasher', name: 'Dishwasher', description: 'Washes all the dishes for you. It is big.', price: 50, tags: ['wash', 'big'] },
  { id: 'bowl', name: 'Washing-up bowl and brush', description: 'For washing dishes by hand in the sink.', price: 8, tags: ['wash'] },
  { id: 'kettle', name: 'Kettle', description: 'Boils water for tea in two minutes.', price: 15, tags: ['drink'] },
  { id: 'coffee', name: 'Coffee machine', description: 'Makes great coffee, but it is expensive.', price: 45, tags: ['drink'] },
  { id: 'microwave', name: 'Microwave', description: 'Heats food very quickly.', price: 30, tags: ['cook'] },
  { id: 'toaster', name: 'Toaster', description: 'Makes toast for breakfast.', price: 15, tags: ['breakfast'] },
];

const budgetKitchen: MissionDefinition = {
  id: 'budget-kitchen', title: 'Kitchen on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your sister has a new flat with an empty kitchen. Help her buy things.',
    A2: 'Your sister has just moved into a small flat. The kitchen is empty and she doesn’t have much money.',
    B1: 'Your sister’s new flat has a tiny kitchen. Choose appliances that fit the space and the budget.',
    B2: 'You’re helping your sister equip a tiny galley kitchen on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 100 coins. Your sister needs something to cook on and something to keep food cold.', budget: 100,
        items: SHOP_ITEMS.filter((i) => ['cooker', 'hob', 'fridge-freezer', 'mini-fridge', 'toaster', 'coffee'].includes(i.id)),
        needs: [{ tag: 'cook', label: 'cook' }, { tag: 'cold', label: 'keep food cold' }] },
      { type: 'place', prompt: 'Now in YOUR kitchen: put the fridge against the wall.', checks: [{ rel: 'againstWall', a: 'fridge' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 120 coins. Your sister needs to cook, keep food cold and wash the dishes.', budget: 120,
        items: SHOP_ITEMS.filter((i) => i.id !== 'coffee'),
        needs: [{ tag: 'cook', label: 'cook' }, { tag: 'cold', label: 'keep food cold' }, { tag: 'wash', label: 'wash dishes' }] },
      { type: 'place', prompt: 'Now in YOUR kitchen: put the sink near the window and the dishwasher next to the sink.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 130 coins. The kitchen is tiny, so choose only ONE big item. Your sister needs to cook, keep food cold, wash dishes and make hot drinks.', budget: 130, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'cook', label: 'cook' }, { tag: 'cold', label: 'keep food cold' }, { tag: 'wash', label: 'wash dishes' }, { tag: 'drink', label: 'hot drinks' }] },
      { type: 'write', prompt: 'Write a short message to your sister explaining what you bought and why.', minWords: 25,
        require: [kitchenWords(2), connectors(1)], sample: 'I bought a mini fridge because the kitchen is small, and a kettle so you can...' },
      { type: 'place', prompt: 'Now in YOUR kitchen: put the sink under the window and the dishwasher next to it.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 140 coins and space for only ONE bulky item. Your sister needs to cook, keep food cold, wash dishes, make hot drinks and have something for breakfast.', budget: 140, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'cook', label: 'cook' }, { tag: 'cold', label: 'keep food cold' }, { tag: 'wash', label: 'wash dishes' }, { tag: 'drink', label: 'hot drinks' }, { tag: 'breakfast', label: 'breakfast' }] },
      { type: 'write', prompt: 'Justify your choices to your parents, who are paying. Explain at least one option you rejected and why.', minWords: 45,
        require: [kitchenWords(3), connectors(1), advanced(1)], sample: 'I chose a small hob instead of a full cooker because it saves space, which means...' },
      { type: 'place', prompt: 'Now in YOUR kitchen: create an efficient washing-up area — the sink should get natural light and the dishwasher should be right beside it.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
    ],
  },
};

// ── STAGE 5: KITCHEN MAKEOVER ──────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Kitchen Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your kitchen beautiful! Read and move the furniture. Then press Check.',
    A2: 'Time for a kitchen makeover! Follow the instructions and move the real furniture.',
    B1: 'Give your kitchen a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A kitchen designer has sent you a brief. Interpret it and rearrange your kitchen accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the fridge against the wall.', checks: [{ rel: 'againstWall', a: 'fridge' }] },
      { type: 'place', prompt: 'Put the sink near the window.', checks: [{ rel: 'nearWindow', a: 'sink' }] },
      { type: 'place', prompt: 'Put the kettle on the sink worktop.', checks: [{ rel: 'onTop', a: 'kettle', b: 'sink' }] },
      { type: 'place', prompt: 'Hang the cupboard above the sink.', checks: [{ rel: 'above', a: 'cupboard', b: 'sink' }] },
      { type: 'place', prompt: 'Put the table in the middle of the kitchen.', checks: [{ rel: 'inMiddle', a: 'table' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the sink near the window and the dishwasher next to it.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
      { type: 'place', prompt: 'Hang the cupboard above the sink and put the kettle on the worktop.',
        checks: [{ rel: 'above', a: 'cupboard', b: 'sink' }, { rel: 'onTop', a: 'kettle', b: 'sink' }] },
      { type: 'place', prompt: 'Put the table in the middle of the kitchen and the stool next to it.',
        checks: [{ rel: 'inMiddle', a: 'table' }, { rel: 'nextTo', a: 'stool', b: 'table' }] },
      { type: 'place', prompt: 'Put the toaster on the dishwasher worktop.', checks: [{ rel: 'onTop', a: 'toaster', b: 'dishwasher' }] },
    ],
    B1: [
      { type: 'place', prompt: 'You like looking outside while you wash up: put the sink by the window, with the dishwasher beside it.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
      { type: 'place', prompt: 'Clean plates should be easy to put away: hang the cupboard right above the sink.',
        checks: [{ rel: 'above', a: 'cupboard', b: 'sink' }] },
      { type: 'place', prompt: 'Make a breakfast corner: the kettle and the toaster should both be on the worktop by the sink.',
        checks: [{ rel: 'onTop', a: 'kettle', b: 'sink' }, { rel: 'onTop', a: 'toaster', b: 'sink' }] },
      { type: 'place', prompt: 'Keep the bin far from the table — nobody wants to eat next to the rubbish.',
        checks: [{ rel: 'farFrom', a: 'bin', b: 'table' }] },
      { type: 'write', prompt: 'Describe your new kitchen in 3–4 sentences. Say where things are.', minWords: 25,
        require: [kitchenWords(3), prepositions(2)], sample: 'The sink is under the window...' },
    ],
    B2: [
      { type: 'place', prompt: 'Design an efficient washing-up zone: natural light over the sink and the dishwasher within reach.',
        checks: [{ rel: 'nearWindow', a: 'sink' }, { rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
      { type: 'place', prompt: 'Minimise the distance between washing and storing dishes by mounting the cupboard directly above the sink.',
        checks: [{ rel: 'above', a: 'cupboard', b: 'sink' }] },
      { type: 'place', prompt: 'Set up a compact breakfast station on the worktop beside the sink with both small appliances.',
        checks: [{ rel: 'onTop', a: 'kettle', b: 'sink' }, { rel: 'onTop', a: 'toaster', b: 'sink' }] },
      { type: 'place', prompt: 'Keep the waste well away from the dining area, and make the table the centre of the room.',
        checks: [{ rel: 'farFrom', a: 'bin', b: 'table' }, { rel: 'inMiddle', a: 'table' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what would you still change, and why?', minWords: 45,
        require: [kitchenWords(3), prepositions(2), advanced(1)], sample: 'Although the sink is now by the window...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Breakfast for Grandma', icon: '🥞', xp: 150,
  intro: {
    A1: 'Grandma is coming for breakfast! Get the kitchen ready.',
    A2: 'Your grandma is visiting this morning. Make breakfast and get the kitchen ready.',
    B1: 'Your grandparents are coming for a family breakfast. Prepare the kitchen and make them feel welcome.',
    B2: 'You’re hosting a family brunch for your grandparents, one of whom has some dietary needs. Prepare everything thoughtfully.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Grandma wants tea. What do you use to boil water? Click it.', targets: ['kettle'] },
      { type: 'find', prompt: 'You need milk. Where is the milk? Click it.', targets: ['fridge'] },
      { type: 'sort', prompt: 'Lay the table: put the plates and the fruit on the table.', props: [
        mess('f1', 'the plates', 'plate', '#ffffff', ['table'], 'Put the plates on the table.'),
        mess('f2', 'the fruit', 'fruit', '#e76f51', ['table'], 'Put the fruit on the table.'),
      ] },
      { type: 'choice', prompt: 'Grandma asks: “Where are the cups?” What do you say?', options: [
        { text: 'They’re in the cupboard.', correct: true, feedback: 'Yes! “in the cupboard”.' },
        { text: 'They’re cups.', correct: false, feedback: 'Grandma wants to know WHERE they are.' },
        { text: 'I am in the cupboard.', correct: false, feedback: 'Use “They’re in/on/next to...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your kitchen for Grandma.', minWords: 8, require: [kitchenWords(2)], sample: 'The kettle is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Grandma likes toast. What do you need to make it? Click it.', targets: ['toaster'] },
      { type: 'sort', prompt: 'Lay the table for breakfast.', props: [
        mess('f1', 'the plates', 'plate', '#ffffff', ['table'], 'Put the plates on the table.'),
        mess('f2', 'the cups', 'cup', '#a8d0f0', ['table'], 'Put the cups on the table.'),
        mess('f3', 'the fruit bowl', 'fruit', '#e76f51', ['table'], 'Put the fruit in the middle of the table.'),
      ] },
      { type: 'sort', prompt: 'Clean up before Grandma arrives.', props: [
        mess('f4', 'yesterday’s dirty pan', 'plate', '#b8c1c9', ['sink', 'dishwasher'], 'Wash the dirty pan.'),
        mess('f5', 'the old newspaper', 'book', '#e8e2d4', ['bin'], 'Throw the old newspaper away.'),
      ] },
      { type: 'place', prompt: 'Grandma needs somewhere to sit: put the stool next to the table.', checks: [{ rel: 'nextTo', a: 'stool', b: 'table' }] },
      { type: 'write', prompt: 'Write a note for Grandma. Use at least 3 kitchen words and 2 prepositions.', minWords: 15,
        require: [kitchenWords(3), prepositions(2)], sample: 'The tea is…' },
    ],
    B1: [
      { type: 'find', prompt: 'Grandad only drinks tea made with freshly boiled water. What do you need? Click it.', targets: ['kettle'] },
      { type: 'sort', prompt: 'Lay the table properly for a family breakfast.', props: [
        mess('f1', 'the plates', 'plate', '#ffffff', ['table'], 'Put the plates on the table.'),
        mess('f2', 'the mugs', 'cup', '#a8d0f0', ['table'], 'Put a mug for everyone on the table.'),
        mess('f3', 'the fruit', 'fruit', '#e76f51', ['table'], 'Put some fruit out for people to share.'),
      ] },
      { type: 'sort', prompt: 'Put away the things you don’t need so the kitchen looks tidy.', props: [
        mess('f4', 'the butter', 'box', '#ffe9a8', ['fridge'], 'The butter shouldn’t sit in the sun all morning.'),
        mess('f5', 'the empty egg box', 'box', '#d9a874', ['bin'], 'The egg box is empty now.'),
        mess('f6', 'the dirty frying pan', 'plate', '#b8c1c9', ['sink', 'dishwasher'], 'Deal with the frying pan before the guests arrive.'),
      ] },
      { type: 'place', prompt: 'Make the table welcoming: put it in the middle of the kitchen with a stool next to it.',
        checks: [{ rel: 'inMiddle', a: 'table' }, { rel: 'nextTo', a: 'stool', b: 'table' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) inviting your grandparents and telling them what you’ve prepared and why.', minWords: 35,
        require: [kitchenWords(3), connectors(1)], sample: 'Dear Grandma and Grandad, I’ve made...' },
    ],
    B2: [
      { type: 'find', prompt: 'Grandma has to avoid fried food, so you’ll warm up some porridge instead. Which appliance is quickest? Click it.', targets: ['microwave'] },
      { type: 'sort', prompt: 'Set the table to a high standard.', props: [
        mess('f1', 'the plates', 'plate', '#ffffff', ['table'], 'Set a plate for each person.'),
        mess('f2', 'the mugs', 'cup', '#a8d0f0', ['table'], 'Set out the mugs.'),
        mess('f3', 'the fruit platter', 'fruit', '#e76f51', ['table'], 'Make the fruit platter the centrepiece.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing perishable is left out and the kitchen is spotless.', props: [
        mess('f4', 'the yoghurt', 'box', '#ffffff', ['fridge'], 'The yoghurt is perishable.'),
        mess('f5', 'the greasy baking tray', 'plate', '#b8c1c9', ['sink', 'dishwasher'], 'The baking tray needs a proper clean.'),
        mess('f6', 'the food packaging', 'box', '#c9b6e4', ['bin'], 'Get rid of the packaging.'),
      ] },
      { type: 'choice', prompt: 'Grandad finds the stools uncomfortable because of his back. What is the most considerate solution?', options: [
        { text: 'Bring a proper chair with a back from another room for him.', correct: true, feedback: 'Thoughtful — it solves his problem without changing the whole kitchen.' },
        { text: 'Tell him to eat standing up.', correct: false, feedback: 'Not very welcoming!' },
        { text: 'Buy a brand-new dining set before breakfast.', correct: false, feedback: 'Unrealistic, and there’s no time.' },
      ] },
      { type: 'write', prompt: 'Write a note (at least 55 words) explaining how you’ve prepared the brunch, justifying your choices.', minWords: 55,
        require: [kitchenWords(4), prepositions(2), advanced(1)], sample: 'Since Grandma can’t eat fried food, I...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const kitchenChapter: ChapterDefinition = {
  roomId: 'kitchen',
  title: 'My Kitchen',
  explore,
  challenges: [shopping, messyKitchen, budgetKitchen],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'fridge', prompt: { A1: 'Find something cold.', A2: 'Find where the milk is.', B1: 'Find where you’d keep food fresh.', B2: 'Find the appliance that slows down food going off.' } },
    { target: 'kettle', prompt: { A1: 'Find something for making tea.', A2: 'Find what you use to boil water.', B1: 'Find what you’d switch on first if a guest wanted coffee.', B2: 'Find the appliance that brings water to 100 degrees.' } },
    { target: 'toaster', prompt: { A1: 'Find something for bread.', A2: 'Find what makes toast.', B1: 'Find what makes bread hot and crispy.', B2: 'Find the appliance that browns slices of bread.' } },
    { target: 'sink', prompt: { A1: 'Find where you wash cups.', A2: 'Find the place with a tap.', B1: 'Find where you’d wash up by hand.', B2: 'Find the fitting connected to the water supply.' } },
    { target: 'cooker', prompt: { A1: 'Find where you cook.', A2: 'Find what has an oven.', B1: 'Find where you’d make soup.', B2: 'Find the appliance with a hob and an oven.' } },
    { target: 'table', prompt: { A1: 'Find where you eat.', A2: 'Find where the family has dinner.', B1: 'Find where you’d lay plates and forks.', B2: 'Find the surface where meals are served.' } },
    { target: 'stool', prompt: { A1: 'Find something you sit on.', A2: 'Find a seat with no back.', B1: 'Find somewhere to sit while you have breakfast.', B2: 'Find the backless seat.' } },
    { target: 'microwave', prompt: { A1: 'Find a machine that makes food hot fast.', A2: 'Find what heats up your lunch.', B1: 'Find what you’d use to warm up leftovers.', B2: 'Find what you’d use to defrost something quickly.' } },
    { target: 'cupboard', prompt: { A1: 'Find where the plates are.', A2: 'Find where you keep cups and bowls.', B1: 'Find where clean dishes are stored.', B2: 'Find the wall-mounted storage.' } },
    { target: 'calendar', prompt: { A1: 'Find something with days and months.', A2: 'Find where you can see today’s date.', B1: 'Find where the family writes down birthdays.', B2: 'Find what helps the family plan their week.' } },
    { target: 'bin', prompt: { A1: 'Find where rubbish goes.', A2: 'Find where you throw away a banana skin.', B1: 'Find where you’d put packaging you can’t reuse.', B2: 'Find the container for household waste.' } },
    { target: 'dishwasher', prompt: { A1: 'Find a machine that washes plates.', A2: 'Find what cleans the dishes for you.', B1: 'Find what you load after a big dinner.', B2: 'Find the appliance that saves you from washing up by hand.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'nearWindow', a: 'sink' }], prompt: { A1: 'Put the sink near the window.', B1: 'Put the sink where you can look outside while washing up.', B2: 'Position the sink to make the most of the daylight.' } },
    { checks: [{ rel: 'nextTo', a: 'dishwasher', b: 'sink' }], prompt: { A1: 'Put the dishwasher next to the sink.', B1: 'Keep the dishwasher close to the sink.', B2: 'Pair the dishwasher with the sink to share the plumbing.' } },
    { checks: [{ rel: 'againstWall', a: 'fridge' }], prompt: { A1: 'Put the fridge against the wall.', B1: 'Tall appliances look tidier against a wall — move the fridge.', B2: 'Place the fridge flush against a wall.' } },
    { checks: [{ rel: 'inMiddle', a: 'table' }], prompt: { A1: 'Put the table in the middle of the kitchen.', B1: 'Put the table in the centre of the room.', B2: 'Centre the table so everyone can reach it.' } },
    { checks: [{ rel: 'nextTo', a: 'stool', b: 'table' }], prompt: { A1: 'Put the stool next to the table.', B1: 'Put the stool where you can sit and eat.', B2: 'Pair the stool with the dining table.' } },
    { checks: [{ rel: 'onTop', a: 'kettle', b: 'sink' }], prompt: { A1: 'Put the kettle on the sink worktop.', B1: 'Put the kettle next to the tap so it’s easy to fill.', B2: 'Position the kettle on the worktop within reach of the tap.' } },
    { checks: [{ rel: 'above', a: 'cupboard', b: 'sink' }], prompt: { A1: 'Hang the cupboard above the sink.', B1: 'Hang the cupboard on the wall above the sink.', B2: 'Mount the cupboard directly over the sink.' } },
    { checks: [{ rel: 'farFrom', a: 'bin', b: 'table' }], prompt: { A1: 'Put the bin far from the table.', B1: 'Keep the bin away from where people eat.', B2: 'Separate the waste from the dining area.' } },
    { checks: [{ rel: 'onTop', a: 'microwave', b: 'dishwasher' }], prompt: { A1: 'Put the microwave on the dishwasher worktop.', B1: 'Find a spot on the worktop for the microwave, above the dishwasher.', B2: 'Use the worktop above the dishwasher for the microwave.' } },
    { checks: [{ rel: 'inCorner', a: 'fridge' }], prompt: { A1: 'Put the fridge in the corner.', B1: 'Save space by moving the fridge into a corner.', B2: 'Make use of the corner space for the fridge.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'appliances', label: 'Appliances', icon: '🔌' },
      { id: 'kitchenware', label: 'Kitchenware', icon: '🍴' },
      { id: 'food', label: 'Food', icon: '🥕' },
      { id: 'drinks', label: 'Drinks', icon: '🥤' },
    ],
    items: [
      { word: 'fridge', bin: 'appliances', level: 'A1' }, { word: 'kettle', bin: 'appliances', level: 'A1' },
      { word: 'toaster', bin: 'appliances', level: 'A2' }, { word: 'microwave', bin: 'appliances', level: 'A2' },
      { word: 'cooker', bin: 'appliances', level: 'A2' }, { word: 'dishwasher', bin: 'appliances', level: 'A2' },
      { word: 'blender', bin: 'appliances', level: 'B1' }, { word: 'freezer', bin: 'appliances', level: 'A2' },
      { word: 'plate', bin: 'kitchenware', level: 'A1' }, { word: 'fork', bin: 'kitchenware', level: 'A1' },
      { word: 'spoon', bin: 'kitchenware', level: 'A1' }, { word: 'knife', bin: 'kitchenware', level: 'A1' },
      { word: 'bowl', bin: 'kitchenware', level: 'A1' }, { word: 'saucepan', bin: 'kitchenware', level: 'A2' },
      { word: 'frying pan', bin: 'kitchenware', level: 'A2' }, { word: 'chopping board', bin: 'kitchenware', level: 'B1' },
      { word: 'bread', bin: 'food', level: 'A1' }, { word: 'cheese', bin: 'food', level: 'A1' },
      { word: 'egg', bin: 'food', level: 'A1' }, { word: 'apple', bin: 'food', level: 'A1' },
      { word: 'pasta', bin: 'food', level: 'A2' }, { word: 'rice', bin: 'food', level: 'A2' },
      { word: 'flour', bin: 'food', level: 'A2' }, { word: 'lentils', bin: 'food', level: 'B2' },
      { word: 'milk', bin: 'drinks', level: 'A1' }, { word: 'water', bin: 'drinks', level: 'A1' },
      { word: 'juice', bin: 'drinks', level: 'A1' }, { word: 'tea', bin: 'drinks', level: 'A1' },
      { word: 'coffee', bin: 'drinks', level: 'A1' }, { word: 'lemonade', bin: 'drinks', level: 'A2' },
      { word: 'hot chocolate', bin: 'drinks', level: 'A2' }, { word: 'smoothie', bin: 'drinks', level: 'B1' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You are hungry and there is bread. What do you do?', options: [
      { text: 'I make toast in the toaster.', best: true, feedback: 'Yes! Toast is quick and easy.' },
      { text: 'I put the bread in the bin.', best: false, feedback: 'But you are hungry!' },
      { text: 'I put the bread in the dishwasher.', best: false, feedback: 'The dishwasher is for plates, not bread!' },
    ] },
    { level: 'A1', situation: 'The milk is on the table all day. Where do you put it?', options: [
      { text: 'In the fridge.', best: true, feedback: 'Right — milk must stay cold.' },
      { text: 'In the cupboard.', best: false, feedback: 'The cupboard is not cold.' },
      { text: 'In the kettle.', best: false, feedback: 'Milk in the kettle? No, thank you!' },
    ] },
    { level: 'A1', situation: 'Your plate is dirty. Where does it go?', options: [
      { text: 'In the sink.', best: true, feedback: 'Perfect!' },
      { text: 'In the fridge.', best: false, feedback: 'Don’t put dirty plates in the fridge!' },
      { text: 'Under the table.', best: false, feedback: 'Someone will step on it!' },
    ] },
    { level: 'A2', situation: 'Your friends are coming for dinner in one hour and the sink is full of dirty dishes. What do you do first?', options: [
      { text: 'I load the dishwasher and switch it on.', best: true, feedback: 'Good idea — it will be done before they arrive.' },
      { text: 'I buy new plates.', best: false, feedback: 'That’s expensive and doesn’t fix the mess!' },
      { text: 'I hide the dishes in the oven.', best: false, feedback: 'Someone might turn the oven on!' },
    ] },
    { level: 'A2', situation: 'You can never find a clean spoon in the morning. What can help?', options: [
      { text: 'Wash the spoons every evening and keep them in one drawer.', best: true, feedback: 'Yes — one place, and clean every day.' },
      { text: 'Eat cereal with a fork.', best: false, feedback: 'That will take a long time!' },
      { text: 'Stop eating breakfast.', best: false, feedback: 'Breakfast is important!' },
    ] },
    { level: 'A2', situation: 'The bin is full and smells bad. What should you do?', options: [
      { text: 'Take the rubbish out and put a new bag in.', best: true, feedback: 'Right — problem solved.' },
      { text: 'Open the fridge.', best: false, feedback: 'That won’t help the smell!' },
      { text: 'Put more rubbish on top.', best: false, feedback: 'It will get even worse!' },
    ] },
    { level: 'B1', situation: 'Your family wastes a lot of food because it goes off in the fridge. How would you fix this?', options: [
      { text: 'Check the fridge before shopping and put older food at the front.', best: true, feedback: 'This deals with the real problem: buying too much and forgetting what you have.' },
      { text: 'Buy a bigger fridge.', best: false, feedback: 'More space usually means even more forgotten food.' },
      { text: 'Stop buying fresh food.', best: false, feedback: 'Fresh food is important for a healthy diet.' },
    ], reasons: [
      { text: 'Because it stops you buying food you already have.', correct: true },
      { text: 'Because it is the most expensive option.', correct: false },
      { text: 'Because fridges work better when they are empty.', correct: false },
    ] },
    { level: 'B1', situation: 'Your little brother wants to use the cooker alone to make pancakes. What would you do?', options: [
      { text: 'Help him and show him how to use it safely.', best: true, feedback: 'He learns something and stays safe.' },
      { text: 'Let him do it and leave the kitchen.', best: false, feedback: 'Hot pans can be dangerous for children.' },
      { text: 'Tell him pancakes are bad for him.', best: false, feedback: 'That avoids the problem instead of solving it.' },
    ], reasons: [
      { text: 'Because he can learn a skill without getting hurt.', correct: true },
      { text: 'Because pancakes are difficult to eat.', correct: false },
    ] },
    { level: 'B2', situation: 'Your flatmates never wash up, and the sink is always full. What would you do?', options: [
      { text: 'Suggest a simple washing-up rota and agree on it together.', best: true, feedback: 'Fair, clear and it tackles the cause.' },
      { text: 'Do all the washing-up yourself and say nothing.', best: false, feedback: 'This may build resentment over time.' },
      { text: 'Put their dirty dishes on their beds.', best: false, feedback: 'Passive-aggressive tactics usually backfire.' },
    ], write: { prompt: 'Justify your decision, considering how your flatmates might react.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Your energy bill is very high and the old fridge is noisy. What would you suggest to your parents?', options: [
      { text: 'Replace it with an energy-efficient model, since it will pay for itself over time.', best: true, feedback: 'A well-reasoned long-term solution.' },
      { text: 'Turn the fridge off at night.', best: false, feedback: 'The food would go off — not safe.' },
      { text: 'Ignore it; bills are always high.', best: false, feedback: 'That doesn’t address the problem.' },
    ], write: { prompt: 'Explain your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'The milk is in the fridge.', level: 'A1' },
    { text: 'I eat breakfast at the table.', level: 'A1' },
    { text: 'The kettle is on the worktop.', level: 'A1' },
    { text: 'The plates are in the cupboard.', level: 'A1' },
    { text: 'I wash the cups in the sink.', level: 'A1' },
    { text: 'The calendar is on the wall.', level: 'A1' },
    { text: 'Put the rubbish in the bin.', level: 'A2' },
    { text: 'My mum is cooking soup on the cooker.', level: 'A2' },
    { text: 'I heat up my lunch in the microwave.', level: 'A2' },
    { text: 'The stool is next to the table.', level: 'A2' },
    { text: 'We load the dishwasher after dinner.', level: 'A2' },
    { text: 'The cupboard is above the sink.', level: 'A2' },
    { text: 'I always check the date before I drink the milk.', level: 'B1' },
    { text: 'The sink is under the window, so there is lots of light.', level: 'B1' },
    { text: 'Could you take the bread out of the toaster?', level: 'B1' },
    { text: 'Leftovers should be kept in the fridge.', level: 'B1' },
    { text: 'Although the kitchen is small, it is very practical.', level: 'B2' },
    { text: 'The dishwasher saves us a lot of time and water.', level: 'B2' },
    { text: 'Perishable food should never be left out overnight.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The milk is ___ the fridge.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The plates are ___ the table.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The bin is ___ the sink.', answer: 'under', options: ['under', 'on', 'in'], level: 'A1' },
    { sentence: 'The stool is ___ the table.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The cupboard is ___ the sink.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The toaster is ___ the kettle and the microwave.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The table is ___ the middle of the kitchen.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'The fridge is ___ the cooker, on the other side of the room.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'The fridge stands ___ the wall.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'I keep the spices ___ the top shelf.', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'Please wipe the crumbs ___ the table.', answer: 'off', options: ['off', 'out', 'over'], level: 'B1' },
    { sentence: 'The extractor fan is directly ___ the hob.', answer: 'above', options: ['above', 'over to', 'beneath of'], level: 'B2' },
    { sentence: 'Store the flour ___ an airtight jar.', answer: 'in', options: ['in', 'on', 'onto'], level: 'B2' },
  ],
};
