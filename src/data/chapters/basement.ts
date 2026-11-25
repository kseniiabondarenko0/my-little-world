import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  BASEMENT CHAPTER — all missions, mini-game content and practice sentences.
//  Same shape as bedroom.ts and the other rooms.
//
//  Furniture ids you can use: workbench, shelving, boiler, chest-freezer, toolbox (small), ladder,
//  bicycle, cardboard-box, broom, bucket (small), paint (small), fuse-box (wall)
//
//  Surfaces (small things can stand ON them): workbench, chest-freezer
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const BASEMENT_WORDS = ['basement', 'cellar', 'workbench', 'shelves', 'shelf', 'shelving', 'boiler', 'freezer', 'chest freezer', 'toolbox', 'tools',
  'hammer', 'screwdriver', 'ladder', 'bicycle', 'bike', 'box', 'boxes', 'cardboard box', 'broom', 'bucket', 'mop', 'paint', 'fuse box', 'pipe', 'light bulb'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const basementWords = (count: number): WordRequirement => ({ label: 'basement words', words: BASEMENT_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your basement.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('fix-it', 'Fix it!', '🔨', {
    A1: 'Find two things you use to fix a chair.',
    A2: 'Find where you work and where the tools are.',
    B1: 'Find two things you’d need to repair a broken shelf.',
    B2: 'Identify the work surface and the tool storage.',
  }, ['workbench', 'toolbox'], 2),
  findMission('clean-up', 'Clean-up time', '🧹', {
    A1: 'Find two things for cleaning.',
    A2: 'Find two things you use to clean the floor.',
    B1: 'Find two things you’d need after a small flood.',
    B2: 'Identify two items for cleaning a dusty floor.',
  }, ['broom', 'bucket'], 2),
  findMission('house-machines', 'House machines', '⚙️', {
    A1: 'Find two big machines.',
    A2: 'Find what makes hot water and what keeps food frozen.',
    B1: 'Find two appliances that use a lot of electricity.',
    B2: 'Identify the heating appliance and the food-storage appliance.',
  }, ['boiler', 'chest-freezer'], 2),
  findMission('lights-out', 'Lights out', '⚡', {
    A1: 'Find the box for electricity.',
    A2: 'Find what you check when the lights go off.',
    B1: 'Find what controls all the electricity in the house.',
    B2: 'Find the consumer unit (fuse box).',
  }, ['fuse-box']),
  findMission('weekend', 'Weekend plans', '🚲', {
    A1: 'Find two things: one to ride and one to climb.',
    A2: 'Find something to ride and something to climb.',
    B1: 'Find something for a trip to the park and something for reaching the top shelf.',
    B2: 'Identify a means of transport and a piece of climbing equipment.',
  }, ['bicycle', 'ladder'], 2),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Storage Day', icon: '📦', xp: 60,
  intro: {
    A1: 'The family brought lots of things down to the basement. Put everything in the right place.',
    A2: 'Mum wants to use the basement for storage. Open the boxes and put things away.',
    B1: 'The attic is being cleared, so everything is coming down to the basement. Decide where it all goes.',
    B2: 'The boxes from the attic have rather unhelpful labels. Work out where their contents belong.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'a hammer', ['toolbox', 'workbench']),
      box('u2', 'frozen pizza', ['chest-freezer']),
      box('u3', 'old toys', ['shelving', 'cardboard-box']),
      box('u4', 'a bike helmet', ['bicycle']),
      box('u5', 'a brush for paint', ['paint', 'workbench']),
      box('u6', 'a mop', ['bucket']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'a screwdriver and nails', ['toolbox']),
      box('u2', 'ice cream and frozen peas', ['chest-freezer']),
      box('u3', 'Christmas decorations', ['shelving', 'cardboard-box']),
      box('u4', 'a bike pump', ['bicycle']),
      box('u5', 'paintbrushes', ['paint', 'workbench']),
      box('u6', 'a mop and cloths', ['bucket']),
      box('u7', 'a new light bulb', ['shelving', 'workbench']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'things for putting up shelves', ['toolbox', 'workbench']),
      box('u2', 'food that must stay below −18 °C', ['chest-freezer']),
      box('u3', 'decorations we only use in December', ['shelving', 'cardboard-box']),
      box('u4', 'something for flat tyres', ['bicycle']),
      box('u5', 'brushes and rollers', ['paint']),
      box('u6', 'things for washing the floor', ['bucket', 'broom']),
      box('u7', 'spare fuses', ['fuse-box', 'toolbox']),
      box('u8', 'pieces of wood for a project', ['workbench']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'DIY essentials', ['toolbox', 'workbench']),
      box('u2', 'batch-cooked meals', ['chest-freezer']),
      box('u3', 'seasonal decorations', ['shelving', 'cardboard-box']),
      box('u4', 'a puncture repair kit', ['bicycle']),
      box('u5', 'decorating supplies', ['paint']),
      box('u6', 'floor-cleaning equipment', ['bucket', 'broom']),
      box('u7', 'replacement fuses', ['fuse-box', 'toolbox']),
      box('u8', 'offcuts of timber', ['workbench']),
    ] }],
  },
};

const floodAlert: MissionDefinition = {
  id: 'flood-alert', title: 'Flood Alert!', icon: '💧', xp: 60,
  intro: {
    A1: 'There is water on the basement floor! Move things up high, fast.',
    A2: 'A pipe is leaking and the basement floor is wet. Follow Dad’s instructions.',
    B1: 'Heavy rain has got into the basement. Read Dad’s note and save what you can.',
    B2: 'The basement is starting to flood after a storm. Deal with your dad’s note quickly and calmly.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click a high place for it.', props: [
      thing('m1', 'the photo albums', 'book', '#f7b2d0', ['shelving'], 'Put the photo albums on the shelves.'),
      thing('m2', 'the tools', 'box', '#e04848', ['workbench'], 'Put the tools on the workbench.'),
      thing('m3', 'the old toys', 'toy', '#ffd54f', ['shelving'], 'Put the toys on the shelves.'),
      thing('m4', 'the paint', 'bottle', '#f28c8c', ['shelving', 'workbench'], 'Put the paint on the workbench.'),
      thing('m5', 'the school books', 'book', '#5aa9e6', ['chest-freezer', 'shelving'], 'Put the books up high.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'You need to clean up the water. What do you need first? Click it.', targets: ['bucket'] },
      { type: 'sort', prompt: 'Save the things on the floor!', props: [
        thing('m1', 'the family photos', 'book', '#f7b2d0', ['shelving'], 'Put the photos on the top shelf.'),
        thing('m2', 'Dad’s drill', 'phone', '#2f3440', ['workbench'], 'Put the drill on the workbench.'),
        thing('m3', 'the box of games', 'box', '#9fd08f', ['shelving', 'chest-freezer'], 'Put the games somewhere high.'),
        thing('m4', 'the wet towels', 'clothes', '#7fc0d8', ['bucket'], 'Put the wet towels in the bucket.'),
        thing('m5', 'the extension cable', 'phone', '#f2c46d', ['workbench'], 'Get the cable off the wet floor!'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'Water and electricity are dangerous. What should Dad switch off first? Click it.', targets: ['fuse-box'] },
      { type: 'sort', prompt: 'Read Dad’s note and save everything.', props: [
        thing('m1', 'the old photo albums', 'book', '#f7b2d0', ['shelving'], 'The photos can’t be replaced — get them as high as possible.'),
        thing('m2', 'the power drill', 'phone', '#2f3440', ['workbench'], 'Electrical tools must stay dry.'),
        thing('m3', 'the bag of cement', 'box', '#b9b5ae', ['workbench', 'chest-freezer'], 'Cement goes hard if it gets wet.'),
        thing('m4', 'the wet cardboard', 'box', '#d6b07a', ['bucket', 'cardboard-box'], 'Soggy cardboard should go with the rubbish for now.'),
        thing('m5', 'the camping gear', 'suitcase', '#9fd08f', ['shelving'], 'Our tent will go mouldy if it stays on the floor.'),
      ] },
      { type: 'choice', prompt: 'Your little brother wants to splash in the water. What do you say?', options: [
        { text: 'Please go upstairs — the water could be dangerous here.', correct: true, feedback: 'Clear and gives a reason.' },
        { text: 'OK, have fun!', correct: false, feedback: 'Water near electricity is dangerous.' },
        { text: 'Go away!', correct: false, feedback: 'He won’t understand why.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'The water is coming from a pipe near the appliance that heats the house. Which one? Click it.', targets: ['boiler'] },
      { type: 'sort', prompt: 'Your dad’s note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'irreplaceable family documents', 'book', '#fff3a3', ['shelving'], 'Anything we can’t replace goes on the highest shelf.'),
        thing('m2', 'the cordless sander', 'phone', '#2f3440', ['workbench'], 'Power tools and water are a disastrous combination.'),
        thing('m3', 'the tins of paint', 'bottle', '#f28c8c', ['workbench', 'shelving'], 'Paint tins rust if they sit in water.'),
        thing('m4', 'the dehumidifier', 'box', '#ffffff', ['chest-freezer', 'workbench'], 'Once the water’s gone, we’ll need the dehumidifier somewhere stable.'),
        thing('m5', 'the bike', 'toy', '#4aa3a2', ['ladder', 'shelving'], 'The bike chain will rust — hang it up or lift it off the floor.'),
        thing('m6', 'the soaked rug', 'clothes', '#c2575b', ['bucket'], 'Wring the rug out before we decide whether to keep it.'),
      ] },
      { type: 'write', prompt: 'Write a short message to your landlord describing the flood and asking for help. Be polite but clear.', minWords: 35,
        require: [basementWords(2), connectors(1), advanced(1)], sample: 'Although we acted quickly, the basement...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'workbench', name: 'Big workbench', description: 'A strong table for fixing things. It takes a lot of space.', price: 60, tags: ['work', 'big'] },
  { id: 'folding-table', name: 'Folding table', description: 'A small table you can fold away.', price: 20, tags: ['work'] },
  { id: 'toolbox', name: 'Full toolbox', description: 'Hammer, screwdrivers and more.', price: 35, tags: ['tools'] },
  { id: 'hammer', name: 'Hammer and nails', description: 'Just the basics. Cheap.', price: 10, tags: ['tools'] },
  { id: 'shelving', name: 'Metal shelving', description: 'Tall shelves for lots of boxes. Quite big.', price: 40, tags: ['store', 'big'] },
  { id: 'boxes', name: 'Plastic boxes', description: 'Ten boxes with lids.', price: 15, tags: ['store'] },
  { id: 'lamp', name: 'Work lamp', description: 'A bright lamp for dark corners.', price: 18, tags: ['light'] },
  { id: 'bulb', name: 'Brighter bulb', description: 'Change the old bulb for a brighter one.', price: 5, tags: ['light'] },
  { id: 'broom', name: 'Broom and dustpan', description: 'For dusty floors.', price: 8, tags: ['clean'] },
  { id: 'ladder', name: 'Stepladder', description: 'Reach the high shelves safely.', price: 25, tags: ['extra'] },
];

const budgetBasement: MissionDefinition = {
  id: 'budget-basement', title: 'Workshop on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Grandpa wants a little workshop in his basement. Help him buy things.',
    A2: 'Grandpa wants to turn his empty basement into a workshop, but he doesn’t have much money.',
    B1: 'Grandpa’s basement is small and dark. Choose things that fit the space and the budget.',
    B2: 'You’re helping your grandfather set up a compact workshop on a tight budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 60 coins. Grandpa needs something to work on and some tools.', budget: 60,
        items: SHOP_ITEMS.filter((i) => ['workbench', 'folding-table', 'toolbox', 'hammer', 'ladder'].includes(i.id)),
        needs: [{ tag: 'work', label: 'work on' }, { tag: 'tools', label: 'tools' }] },
      { type: 'place', prompt: 'Now in YOUR basement: put the toolbox on the workbench.', checks: [{ rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 75 coins. Grandpa needs to work, keep tools and store things.', budget: 75,
        items: SHOP_ITEMS.filter((i) => !['lamp', 'bulb'].includes(i.id)),
        needs: [{ tag: 'work', label: 'work on' }, { tag: 'tools', label: 'tools' }, { tag: 'store', label: 'store things' }] },
      { type: 'place', prompt: 'Now in YOUR basement: put the workbench against the wall.', checks: [{ rel: 'againstWall', a: 'workbench' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 100 coins. The basement is small, so choose only ONE big item. Grandpa needs to work, have tools, store things and see in the dark.', budget: 100, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'work', label: 'work on' }, { tag: 'tools', label: 'tools' }, { tag: 'store', label: 'store things' }, { tag: 'light', label: 'light' }] },
      { type: 'write', prompt: 'Write a short message to Grandpa explaining what you bought and why.', minWords: 25,
        require: [basementWords(2), connectors(1)], sample: 'I bought a folding table because the basement is small, and...' },
      { type: 'place', prompt: 'Now in YOUR basement: put the shelving unit in a corner.', checks: [{ rel: 'inCorner', a: 'shelving' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 110 coins and space for only ONE bulky item. Grandpa needs a work surface, tools, storage, light and something to keep it clean.', budget: 110, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'work', label: 'work surface' }, { tag: 'tools', label: 'tools' }, { tag: 'store', label: 'storage' }, { tag: 'light', label: 'light' }, { tag: 'clean', label: 'cleaning' }] },
      { type: 'write', prompt: 'Justify your choices to Grandpa. Mention one option you rejected and why.', minWords: 45,
        require: [basementWords(3), connectors(1), advanced(1)], sample: 'I chose plastic boxes instead of shelving because...' },
      { type: 'place', prompt: 'Now in YOUR basement: make it safe — the paint must be far from the boiler.',
        checks: [{ rel: 'farFrom', a: 'paint', b: 'boiler' }] },
    ],
  },
};

// ── STAGE 5: BASEMENT MAKEOVER ─────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Basement Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your basement tidy! Read and move the things. Then press Check.',
    A2: 'Time for a basement makeover! Follow the instructions and move the real things.',
    B1: 'Give your basement a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A home organiser has sent you a brief. Interpret it and rearrange your basement accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the workbench against the wall.', checks: [{ rel: 'againstWall', a: 'workbench' }] },
      { type: 'place', prompt: 'Put the toolbox on the workbench.', checks: [{ rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
      { type: 'place', prompt: 'Put the shelving unit in the corner.', checks: [{ rel: 'inCorner', a: 'shelving' }] },
      { type: 'place', prompt: 'Put the broom next to the bucket.', checks: [{ rel: 'nextTo', a: 'broom', b: 'bucket' }] },
      { type: 'place', prompt: 'Put the ladder against the wall.', checks: [{ rel: 'againstWall', a: 'ladder' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the workbench against the wall and the toolbox on it.',
        checks: [{ rel: 'againstWall', a: 'workbench' }, { rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
      { type: 'place', prompt: 'Put the paint on the workbench and the bucket on the chest freezer.',
        checks: [{ rel: 'onTop', a: 'paint', b: 'workbench' }, { rel: 'onTop', a: 'bucket', b: 'chest-freezer' }] },
      { type: 'place', prompt: 'Put the bicycle next to the cardboard boxes.', checks: [{ rel: 'nextTo', a: 'bicycle', b: 'cardboard-box' }] },
      { type: 'place', prompt: 'Put the shelving unit in the corner.', checks: [{ rel: 'inCorner', a: 'shelving' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a proper workshop: workbench against a wall, toolbox on top.',
        checks: [{ rel: 'againstWall', a: 'workbench' }, { rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
      { type: 'place', prompt: 'Paint is flammable: keep it far from the boiler.', checks: [{ rel: 'farFrom', a: 'paint', b: 'boiler' }] },
      { type: 'place', prompt: 'Save floor space: shelving unit into a corner.', checks: [{ rel: 'inCorner', a: 'shelving' }] },
      { type: 'place', prompt: 'Keep the cleaning things together: broom next to the chest freezer, where the bucket is.',
        checks: [{ rel: 'nextTo', a: 'broom', b: 'chest-freezer' }] },
      { type: 'write', prompt: 'Describe your new basement in 3–4 sentences. Say where things are.', minWords: 25,
        require: [basementWords(3), prepositions(2)], sample: 'The workbench is against the wall...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a functional workshop zone: workbench against a wall, toolbox and paint on it.',
        checks: [{ rel: 'againstWall', a: 'workbench' }, { rel: 'onTop', a: 'toolbox', b: 'workbench' }, { rel: 'onTop', a: 'paint', b: 'workbench' }] },
      { type: 'place', prompt: 'Reduce fire risk: the workbench (with the paint) well away from the boiler.',
        checks: [{ rel: 'farFrom', a: 'workbench', b: 'boiler' }] },
      { type: 'place', prompt: 'Maximise space: shelving in a corner and the ladder against a wall.',
        checks: [{ rel: 'inCorner', a: 'shelving' }, { rel: 'againstWall', a: 'ladder' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what is still not ideal, and why?', minWords: 45,
        require: [basementWords(3), prepositions(2), advanced(1)], sample: 'Although the basement is quite dark, the workbench now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'The Big Clear-Out', icon: '🧹', xp: 150,
  intro: {
    A1: 'Your family wants a games corner in the basement. First, clean and tidy it!',
    A2: 'The basement is full of old things. Clear it out so your family can use it again.',
    B1: 'Your parents want to turn part of the basement into a games room. Clear it out and organise what’s left.',
    B2: 'Your family is planning a home gym in the basement. Lead the clear-out, organise the space and make it safe.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'The floor is very dusty. What do you use? Click it.', targets: ['broom'] },
      { type: 'sort', prompt: 'Tidy up: put the old toys in a box and the hammer in the toolbox.', props: [
        thing('f1', 'the old toys', 'toy', '#ffd54f', ['cardboard-box', 'shelving'], 'Put the old toys in a cardboard box.'),
        thing('f2', 'the hammer', 'phone', '#9c7150', ['toolbox', 'workbench'], 'Put the hammer in the toolbox.'),
      ] },
      { type: 'choice', prompt: 'Dad asks: “Where is the ladder?” What do you say?', options: [
        { text: 'It’s against the wall.', correct: true, feedback: 'Yes! “against the wall”.' },
        { text: 'It’s a ladder.', correct: false, feedback: 'He wants to know WHERE it is.' },
        { text: 'I am against the wall.', correct: false, feedback: 'Use “It’s in/on/next to...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your basement.', minWords: 8, require: [basementWords(2)], sample: 'The bicycle is…' },
    ],
    A2: [
      { type: 'find', prompt: 'It’s dark in the corner. Dad needs to climb up and change the light bulb. Click what he needs.', targets: ['ladder'] },
      { type: 'sort', prompt: 'Keep or give away?', props: [
        thing('f1', 'your old clothes', 'clothes', '#c9b6e4', ['cardboard-box'], 'Put the old clothes in a box for charity.'),
        thing('f2', 'the tools', 'box', '#e04848', ['toolbox', 'workbench'], 'Keep the tools in the toolbox.'),
        thing('f3', 'the summer ice lollies', 'box', '#7fc0d8', ['chest-freezer'], 'Put the ice lollies in the freezer.'),
      ] },
      { type: 'place', prompt: 'Make space for the games corner: put the shelving unit in the corner.', checks: [{ rel: 'inCorner', a: 'shelving' }] },
      { type: 'write', prompt: 'Write a list of jobs for the clear-out. Use at least 3 basement words and 2 prepositions.', minWords: 15,
        require: [basementWords(3), prepositions(2)], sample: 'Put the toys in…' },
    ],
    B1: [
      { type: 'find', prompt: 'Before you plug in the games console, check what controls the electricity. Click it.', targets: ['fuse-box'] },
      { type: 'sort', prompt: 'Sort out the old things.', props: [
        thing('f1', 'a broken lamp', 'box', '#f2c46d', ['cardboard-box'], 'It’s broken — put it in the box to take to the tip.'),
        thing('f2', 'a working drill', 'phone', '#2f3440', ['workbench', 'toolbox'], 'It still works, so keep it with the tools.'),
        thing('f3', 'half-empty paint tins', 'bottle', '#f28c8c', ['shelving'], 'We might need the paint again — keep it on a shelf.'),
      ] },
      { type: 'sort', prompt: 'Make the space safe and clean.', props: [
        thing('f4', 'the sharp saw', 'phone', '#8f99a3', ['workbench', 'toolbox'], 'The saw shouldn’t be anywhere near the games corner.'),
        thing('f5', 'the dusty rags', 'clothes', '#e8e2d4', ['bucket'], 'The rags need a wash.'),
        thing('f6', 'the bike pump', 'phone', '#5b5560', ['bicycle'], 'Keep the pump with the bike.'),
      ] },
      { type: 'place', prompt: 'Make it safe and practical: paint far from the boiler and the workbench against a wall.',
        checks: [{ rel: 'farFrom', a: 'paint', b: 'boiler' }, { rel: 'againstWall', a: 'workbench' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) to your family about the clear-out: what you kept, what you gave away and why.', minWords: 35,
        require: [basementWords(3), connectors(1)], sample: 'We kept the drill because it still works, but...' },
    ],
    B2: [
      { type: 'find', prompt: 'The gym will need hot showers afterwards. Which appliance should be serviced first? Click it.', targets: ['boiler'] },
      { type: 'sort', prompt: 'Decide what stays, what goes and where.', props: [
        thing('f1', 'an exercise mat', 'clothes', '#9fd08f', ['shelving'], 'Store the mat neatly until the gym corner is ready.'),
        thing('f2', 'flammable spray cans', 'bottle', '#f25c5c', ['shelving', 'workbench'], 'Aerosols must be kept well away from any heat source.'),
        thing('f3', 'old magazines', 'book', '#e8e2d4', ['cardboard-box'], 'Recycle the magazines.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing dangerous is left out.', props: [
        thing('f4', 'the power tools', 'phone', '#2f3440', ['workbench', 'toolbox'], 'Power tools belong in the workshop area.'),
        thing('f5', 'rat poison', 'box', '#f2c46d', ['shelving'], 'Poison must be kept high up, out of reach.'),
        thing('f6', 'the extension lead', 'phone', '#f2c46d', ['workbench'], 'Don’t leave cables across the floor.'),
      ] },
      { type: 'choice', prompt: 'Your dad wants to keep everything “just in case”, but there’s no space for the gym. What is the most tactful approach?', options: [
        { text: 'Suggest keeping one box of “maybe” things for six months, then deciding together.', correct: true, feedback: 'A fair compromise that respects his feelings.' },
        { text: 'Throw his things away while he’s at work.', correct: false, feedback: 'That would break his trust.' },
        { text: 'Give up on the gym.', correct: false, feedback: 'There’s probably a solution that works for everyone.' },
      ] },
      { type: 'write', prompt: 'Write a proposal (at least 55 words) for your family explaining your plan for the basement and how you’ll keep it safe.', minWords: 55,
        require: [basementWords(4), prepositions(2), advanced(1)], sample: 'Although the basement is full at the moment, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const basementChapter: ChapterDefinition = {
  roomId: 'basement',
  title: 'My Basement',
  explore,
  challenges: [unpack, floodAlert, budgetBasement],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'workbench', prompt: { A1: 'Find a strong table.', A2: 'Find where you fix things.', B1: 'Find where Grandpa makes things out of wood.', B2: 'Find the sturdy work surface with a vice.' } },
    { target: 'shelving', prompt: { A1: 'Find the shelves.', A2: 'Find where boxes are stored.', B1: 'Find the tall metal storage.', B2: 'Find the free-standing shelving unit.' } },
    { target: 'boiler', prompt: { A1: 'Find what makes hot water.', A2: 'Find the machine with pipes.', B1: 'Find what heats the house.', B2: 'Find the appliance that needs an annual service.' } },
    { target: 'chest-freezer', prompt: { A1: 'Find where the ice cream is.', A2: 'Find the big freezer.', B1: 'Find the freezer that opens at the top.', B2: 'Find the appliance for long-term frozen storage.' } },
    { target: 'toolbox', prompt: { A1: 'Find the red box.', A2: 'Find where the hammer is.', B1: 'Find what you’d take to fix a wobbly table.', B2: 'Find the portable tool storage.' } },
    { target: 'ladder', prompt: { A1: 'Find something to climb.', A2: 'Find what helps you reach high places.', B1: 'Find what you’d need to change a light bulb.', B2: 'Find the climbing equipment.' } },
    { target: 'bicycle', prompt: { A1: 'Find the bike.', A2: 'Find what has two wheels.', B1: 'Find what needs a pump for its tyres.', B2: 'Find the pedal-powered vehicle.' } },
    { target: 'cardboard-box', prompt: { A1: 'Find the brown boxes.', A2: 'Find where the old things are.', B1: 'Find what you’d pack for moving house.', B2: 'Find the stack of cartons.' } },
    { target: 'broom', prompt: { A1: 'Find something for a dirty floor.', A2: 'Find what you sweep with.', B1: 'Find what you’d use on a dusty floor.', B2: 'Find the long-handled brush.' } },
    { target: 'bucket', prompt: { A1: 'Find something for water.', A2: 'Find what you carry water in.', B1: 'Find what you’d use with a mop.', B2: 'Find the container with a handle.' } },
    { target: 'paint', prompt: { A1: 'Find the paint.', A2: 'Find what colours walls.', B1: 'Find what you’d need to decorate a room.', B2: 'Find the tin of emulsion.' } },
    { target: 'fuse-box', prompt: { A1: 'Find the electricity box.', A2: 'Find what you check when the lights go off.', B1: 'Find what controls the power.', B2: 'Find the consumer unit.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'onTop', a: 'toolbox', b: 'workbench' }], prompt: { A1: 'Put the toolbox on the workbench.', B1: 'Keep the tools where you work.', B2: 'Place the toolbox on the work surface.' } },
    { checks: [{ rel: 'againstWall', a: 'workbench' }], prompt: { A1: 'Put the workbench against the wall.', B1: 'Push the workbench against a wall.', B2: 'Position the workbench flush against a wall.' } },
    { checks: [{ rel: 'inCorner', a: 'shelving' }], prompt: { A1: 'Put the shelving unit in the corner.', B1: 'Save space by moving the shelves into a corner.', B2: 'Make use of the corner for the shelving.' } },
    { checks: [{ rel: 'farFrom', a: 'paint', b: 'boiler' }], prompt: { A1: 'Put the paint far from the boiler.', B1: 'Keep the paint away from the heat.', B2: 'Store the flammable paint at a safe distance from the boiler.' } },
    { checks: [{ rel: 'againstWall', a: 'ladder' }], prompt: { A1: 'Put the ladder against the wall.', B1: 'Lean the ladder against a wall.', B2: 'Store the ladder flush against a wall.' } },
    { checks: [{ rel: 'nextTo', a: 'broom', b: 'chest-freezer' }], prompt: { A1: 'Put the broom next to the chest freezer.', B1: 'Keep the broom by the freezer.', B2: 'Store the broom beside the freezer.' } },
    { checks: [{ rel: 'onTop', a: 'bucket', b: 'chest-freezer' }], prompt: { A1: 'Put the bucket on the chest freezer.', B1: 'Keep the bucket off the floor, on the freezer.', B2: 'Place the bucket on top of the freezer.' } },
    { checks: [{ rel: 'nextTo', a: 'bicycle', b: 'cardboard-box' }], prompt: { A1: 'Put the bicycle next to the boxes.', B1: 'Park the bike beside the boxes.', B2: 'Position the bicycle beside the cartons.' } },
    { checks: [{ rel: 'onTop', a: 'paint', b: 'workbench' }], prompt: { A1: 'Put the paint on the workbench.', B1: 'Get the paint ready on the workbench.', B2: 'Leave the paint on the work surface.' } },
    { checks: [{ rel: 'againstWall', a: 'boiler' }], prompt: { A1: 'Put the boiler against the wall.', B1: 'The boiler needs pipes — put it against a wall.', B2: 'Install the boiler flush against a wall.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'tools', label: 'Tools', icon: '🔨' },
      { id: 'cleaning', label: 'Cleaning', icon: '🧹' },
      { id: 'stored', label: 'Big things', icon: '📦' },
      { id: 'actions', label: 'Things you do', icon: '🛠️' },
    ],
    items: [
      { word: 'hammer', bin: 'tools', level: 'A1' }, { word: 'screwdriver', bin: 'tools', level: 'A2' },
      { word: 'nail', bin: 'tools', level: 'A2' }, { word: 'saw', bin: 'tools', level: 'A2' },
      { word: 'drill', bin: 'tools', level: 'B1' }, { word: 'spanner', bin: 'tools', level: 'B1' },
      { word: 'tape measure', bin: 'tools', level: 'B1' }, { word: 'screw', bin: 'tools', level: 'B1' },
      { word: 'broom', bin: 'cleaning', level: 'A2' }, { word: 'bucket', bin: 'cleaning', level: 'A2' },
      { word: 'mop', bin: 'cleaning', level: 'A2' }, { word: 'dustpan', bin: 'cleaning', level: 'A2' },
      { word: 'sponge', bin: 'cleaning', level: 'A2' }, { word: 'vacuum', bin: 'cleaning', level: 'A2' },
      { word: 'cobweb', bin: 'cleaning', level: 'B1' }, { word: 'dust', bin: 'cleaning', level: 'A2' },
      { word: 'bicycle', bin: 'stored', level: 'A1' }, { word: 'ladder', bin: 'stored', level: 'A1' },
      { word: 'boiler', bin: 'stored', level: 'A2' }, { word: 'chest freezer', bin: 'stored', level: 'A2' },
      { word: 'workbench', bin: 'stored', level: 'A2' }, { word: 'cardboard box', bin: 'stored', level: 'A2' },
      { word: 'shelving unit', bin: 'stored', level: 'A2' }, { word: 'water heater', bin: 'stored', level: 'B2' },
      { word: 'fix', bin: 'actions', level: 'A1' }, { word: 'climb', bin: 'actions', level: 'A2' },
      { word: 'sweep', bin: 'actions', level: 'A2' }, { word: 'paint the wall', bin: 'actions', level: 'A2' },
      { word: 'repair', bin: 'actions', level: 'B1' }, { word: 'pump up', bin: 'actions', level: 'B1' },
      { word: 'sort out', bin: 'actions', level: 'B1' }, { word: 'get rid of', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'Your bike has a flat tyre. What do you do?', options: [
      { text: 'I pump up the tyre.', best: true, feedback: 'Yes! Now you can ride.' },
      { text: 'I put it in the freezer.', best: false, feedback: 'That won’t help!' },
      { text: 'I paint it.', best: false, feedback: 'It will look nice, but the tyre is still flat.' },
    ] },
    { level: 'A1', situation: 'The basement floor is dusty. What do you do?', options: [
      { text: 'I sweep it with the broom.', best: true, feedback: 'Right — now it’s clean.' },
      { text: 'I climb the ladder.', best: false, feedback: 'The dust is on the floor!' },
      { text: 'I ride my bike.', best: false, feedback: 'That makes more dust.' },
    ] },
    { level: 'A1', situation: 'You want an ice cream. Where do you look?', options: [
      { text: 'In the chest freezer.', best: true, feedback: 'Yum!' },
      { text: 'In the toolbox.', best: false, feedback: 'There are only tools in there.' },
      { text: 'In the boiler.', best: false, feedback: 'It’s hot in there — the ice cream would melt!' },
    ] },
    { level: 'A2', situation: 'You need a book from the top shelf. What do you do?', options: [
      { text: 'Use the ladder and ask someone to hold it.', best: true, feedback: 'Safe and smart.' },
      { text: 'Climb the shelves.', best: false, feedback: 'They could fall on you!' },
      { text: 'Stand on the bucket.', best: false, feedback: 'That’s not safe.' },
    ] },
    { level: 'A2', situation: 'You see a big spider in the basement. What do you do?', options: [
      { text: 'Stay calm and carefully put it outside.', best: true, feedback: 'Kind and calm.' },
      { text: 'Scream and run upstairs.', best: false, feedback: 'It’s just a spider!' },
      { text: 'Never go to the basement again.', best: false, feedback: 'That’s a bit extreme.' },
    ] },
    { level: 'A2', situation: 'All the lights in the house go off. What do you do?', options: [
      { text: 'Tell an adult so they can check the fuse box.', best: true, feedback: 'Right — the fuse box is a job for an adult.' },
      { text: 'Open the fuse box and touch the wires.', best: false, feedback: 'Very dangerous!' },
      { text: 'Go to sleep.', best: false, feedback: 'Someone needs to fix it.' },
    ] },
    { level: 'B1', situation: 'The basement smells damp and there are black spots on the wall. How would you deal with it?', options: [
      { text: 'Clean the mould, open the window and use a dehumidifier.', best: true, feedback: 'This deals with the cause: damp air.' },
      { text: 'Spray perfume everywhere.', best: false, feedback: 'The smell will come back.' },
      { text: 'Paint over the spots.', best: false, feedback: 'The mould will grow back.' },
    ], reasons: [
      { text: 'Because dry air stops mould growing.', correct: true },
      { text: 'Because mould likes fresh air.', correct: false },
      { text: 'Because it is the cheapest option.', correct: false },
    ] },
    { level: 'B1', situation: 'Your brother wants to keep old paint tins next to the boiler. What would you do?', options: [
      { text: 'Explain that paint can catch fire and move it somewhere safer.', best: true, feedback: 'He stays safe and understands why.' },
      { text: 'Let him — it’s only paint.', best: false, feedback: 'Paint near heat is a fire risk.' },
      { text: 'Throw the paint away without saying anything.', best: false, feedback: 'He won’t learn why it’s dangerous.' },
    ], reasons: [
      { text: 'Because he learns a safety rule he can use for life.', correct: true },
      { text: 'Because paint is expensive.', correct: false },
    ] },
    { level: 'B2', situation: 'Your basement is full of things nobody has used for years. What would you suggest?', options: [
      { text: 'Sort everything into keep, donate and recycle, and sell valuable things online.', best: true, feedback: 'Organised, sustainable and it might even earn money.' },
      { text: 'Rent a bigger house.', best: false, feedback: 'Far too expensive.' },
      { text: 'Lock the door and forget about it.', best: false, feedback: 'The problem will only grow.' },
    ], write: { prompt: 'Justify your suggestion, considering how each family member might react.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Your heating bills are very high and the boiler is fifteen years old. What would you suggest to your parents?', options: [
      { text: 'Get the boiler checked and compare the cost of a more efficient one.', best: true, feedback: 'A well-reasoned, long-term solution.' },
      { text: 'Turn the heating off all winter.', best: false, feedback: 'Not healthy or practical.' },
      { text: 'Ignore it; bills are always high.', best: false, feedback: 'That doesn’t address the problem.' },
    ], write: { prompt: 'Explain your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'My bicycle is in the basement.', level: 'A1' },
    { text: 'The hammer is in the toolbox.', level: 'A1' },
    { text: 'Dad climbs the ladder.', level: 'A1' },
    { text: 'The ice cream is in the freezer.', level: 'A1' },
    { text: 'I sweep the floor with a broom.', level: 'A1' },
    { text: 'The basement is dark and cold.', level: 'A1' },
    { text: 'The toolbox is on the workbench.', level: 'A2' },
    { text: 'Put the old toys in a cardboard box.', level: 'A2' },
    { text: 'The boiler makes hot water for the house.', level: 'A2' },
    { text: 'The ladder is against the wall.', level: 'A2' },
    { text: 'Fill the bucket with water.', level: 'A2' },
    { text: 'There is a spider behind the boxes.', level: 'A2' },
    { text: 'Could you hold the ladder for me, please?', level: 'B1' },
    { text: 'Keep the paint away from the boiler.', level: 'B1' },
    { text: 'The basement is damp, so open the window.', level: 'B1' },
    { text: 'We need to sort out all these old boxes.', level: 'B1' },
    { text: 'Although the basement is small, it is well organised.', level: 'B2' },
    { text: 'Flammable products should be stored away from heat.', level: 'B2' },
    { text: 'The boiler should be serviced once a year.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The hammer is ___ the toolbox.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The toolbox is ___ the workbench.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The cat is hiding ___ the workbench.', answer: 'under', options: ['under', 'in', 'at'], level: 'A1' },
    { sentence: 'The broom is ___ the bucket.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The fuse box is ___ the shelves.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The bicycle is ___ the freezer and the boxes.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'There is a spider ___ the boxes.', answer: 'behind', options: ['behind', 'at', 'into'], level: 'A2' },
    { sentence: 'The workbench is ___ the boiler, on the other side of the room.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'The ladder is leaning ___ the wall.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'Dad is ___ the top of the ladder.', answer: 'at', options: ['at', 'in', 'on to'], level: 'B1' },
    { sentence: 'Please take the old boxes ___ to the car.', answer: 'out', options: ['out', 'off', 'over'], level: 'B1' },
    { sentence: 'Keep the paint well away ___ the boiler.', answer: 'from', options: ['from', 'of', 'off'], level: 'B2' },
    { sentence: 'We finally got rid ___ the old sofa.', answer: 'of', options: ['of', 'from', 'off'], level: 'B2' },
  ],
};
