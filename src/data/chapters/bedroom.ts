import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  BEDROOM CHAPTER — all missions, mini-game content and practice sentences.
//
//  Furniture ids you can use: bed, lamp, nightstand (bedside table), carpet,
//  wardrobe, desk, chair, bookshelf, picture, mirror, plant, chest (chest of drawers)
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

// ── Word lists used to check students' writing ─────────────────────────────
const FURNITURE_WORDS = ['bed', 'lamp', 'bedside table', 'carpet', 'rug', 'wardrobe', 'desk', 'chair', 'bookshelf',
  'shelf', 'picture', 'mirror', 'plant', 'chest of drawers', 'window', 'door', 'pillow', 'blanket', 'curtains', 'poster'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const furniture = (count: number): WordRequirement => ({ label: 'furniture words', words: FURNITURE_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your room.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('wood', 'Made of wood', '🪵', {
    A1: 'Find five objects made of wood.',
    A2: 'Find five things in your room that are made of wood.',
    B1: 'Find five pieces of furniture with a wooden frame.',
    B2: 'Identify five items whose structure is mainly made of wood.',
  }, ['bed', 'wardrobe', 'desk', 'chair', 'bookshelf', 'nightstand', 'picture', 'chest'], 5),
  findMission('sleep', 'Bedtime', '🌙', {
    A1: 'Find something you use before you go to sleep.',
    B1: 'Find something you might use just before falling asleep.',
    B2: 'Find an object that is part of your evening routine before you fall asleep.',
  }, ['lamp', 'bed', 'nightstand', 'mirror']),
  findMission('clothes', 'Clothes storage', '👕', {
    A1: 'Find three things where you can keep clothes.',
    A2: 'Find three pieces of furniture that can store clothes.',
    B1: 'Find three places where you could put away your clothes.',
    B2: 'Identify three storage solutions suitable for clothing.',
  }, ['wardrobe', 'chest', 'nightstand'], 3),
  findMission('soft', 'Something soft', '☁️', {
    A1: 'Find something soft.',
    B1: 'Find something that feels soft when you touch it.',
    B2: 'Find something with a soft, comfortable texture.',
  }, ['carpet', 'bed']),
  findMission('organise', 'Get organised', '🗂️', {
    A1: 'Find something that helps you keep your things tidy.',
    A2: 'Find an object that helps you organise your belongings.',
    B2: 'Find a piece of furniture that would help someone who struggles to stay organised.',
  }, ['bookshelf', 'chest', 'wardrobe', 'nightstand', 'desk']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

const movingDay: MissionDefinition = {
  id: 'moving-day', title: 'Moving Day', icon: '📦', xp: 60,
  intro: {
    A1: 'You have a new bedroom! Open the boxes and put your things in the right places.',
    A2: 'You’ve just moved into your new bedroom. Unpack the boxes and find a place for everything.',
    B1: 'Moving day! Unpack each box. The labels describe what’s inside — work out where each thing belongs.',
    B2: 'You’ve just moved in. The removal company labelled the boxes with descriptions instead of names — decide where everything should go.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('b1', 'a pillow', ['bed']),
      box('b2', 'books', ['bookshelf', 'desk', 'nightstand']),
      box('b3', 'T-shirts', ['wardrobe', 'chest']),
      box('b4', 'an alarm clock', ['nightstand', 'desk', 'chest']),
      box('b5', 'a pen and a notebook', ['desk']),
      box('b6', 'a photo frame', ['nightstand', 'desk', 'bookshelf', 'chest']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('b1', 'a pillow and a blanket', ['bed']),
      box('b2', 'a pile of books', ['bookshelf']),
      box('b3', 'jumpers and jeans', ['wardrobe', 'chest']),
      box('b4', 'an alarm clock and a phone charger', ['nightstand']),
      box('b5', 'pencils, pens and notebooks', ['desk']),
      box('b6', 'a hairbrush and perfume', ['mirror', 'chest', 'nightstand']),
      box('b7', 'dresses and coats on hangers', ['wardrobe']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('b1', 'something soft to rest your head on at night', ['bed']),
      box('b2', 'novels and dictionaries', ['bookshelf']),
      box('b3', 'clothes that need to be folded', ['chest', 'wardrobe']),
      box('b4', 'something that wakes you up in the morning', ['nightstand']),
      box('b5', 'stationery for doing homework', ['desk']),
      box('b6', 'things you use to get ready in the morning', ['mirror', 'chest']),
      box('b7', 'clothes that need to be hung up', ['wardrobe']),
      box('b8', 'a small pot with a cactus', ['desk', 'bookshelf', 'nightstand', 'chest']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('b1', 'bedding: a spare duvet and pillowcases', ['bed', 'wardrobe', 'chest']),
      box('b2', 'reference books you rarely use', ['bookshelf']),
      box('b3', 'delicate items that should be folded, not hung', ['chest']),
      box('b4', 'a device that goes off at 7 a.m.', ['nightstand']),
      box('b5', 'everything needed for a productive study session', ['desk']),
      box('b6', 'toiletries and grooming essentials', ['mirror', 'chest']),
      box('b7', 'formal clothes that crease easily', ['wardrobe']),
      box('b8', 'a decorative item that needs sunlight', ['desk', 'bookshelf', 'nightstand', 'chest']),
    ] }],
  },
};

function mess(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const messyBedroom: MissionDefinition = {
  id: 'messy-bedroom', title: 'Messy Bedroom', icon: '🧹', xp: 60,
  intro: {
    A1: 'Oh no! Your room is messy. Follow the instructions and tidy up.',
    A2: 'Your bedroom is a mess and your mum wants it tidy before dinner. Follow her instructions.',
    B1: 'Your room is really untidy. Read the note and put everything away properly.',
    B2: 'Your flatmate left you a note about the state of your room. Follow the instructions carefully.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click where it goes.', props: [
      mess('m1', 'the jeans', 'clothes', '#7fa6d8', ['wardrobe', 'chest'], 'Put the jeans in the wardrobe.'),
      mess('m2', 'the socks', 'socks', '#f6a6a6', ['chest', 'wardrobe'], 'Put the socks in the chest of drawers.'),
      mess('m3', 'the book', 'book', '#9fd8c2', ['bookshelf'], 'Put the book on the bookshelf.'),
      mess('m4', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'Put the pillow on the bed.'),
      mess('m5', 'the shoes', 'shoes', '#c9b6e4', ['wardrobe'], 'Put the shoes in the wardrobe.'),
    ] }],
    A2: [{ type: 'sort', prompt: 'Tidy up! Follow each instruction.', props: [
      mess('m1', 'the jeans', 'clothes', '#7fa6d8', ['wardrobe', 'chest'], 'Fold the jeans and put them in the chest of drawers or the wardrobe.'),
      mess('m2', 'the socks', 'socks', '#f6a6a6', ['chest'], 'Put the socks in the top drawer of the chest of drawers.'),
      mess('m3', 'the books', 'book', '#9fd8c2', ['bookshelf'], 'Put the books back on the shelf.'),
      mess('m4', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'Make the bed: put the pillow back on it.'),
      mess('m5', 'the trainers', 'shoes', '#c9b6e4', ['wardrobe'], 'Put the trainers at the bottom of the wardrobe.'),
      mess('m6', 'the hoodie', 'clothes', '#ffd27a', ['wardrobe'], 'Hang up the hoodie in the wardrobe.'),
    ] }],
    B1: [{ type: 'sort', prompt: 'Read the note and put everything away.', props: [
      mess('m1', 'the jeans', 'clothes', '#7fa6d8', ['chest', 'wardrobe'], 'Clothes you fold go in drawers.'),
      mess('m2', 'the socks', 'socks', '#f6a6a6', ['chest'], 'Small clothes belong in the top drawer.'),
      mess('m3', 'the dictionary', 'book', '#9fd8c2', ['bookshelf', 'desk'], 'Books you study with go near your homework space or on the shelf.'),
      mess('m4', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'The bed isn’t made — sort that out.'),
      mess('m5', 'the trainers', 'shoes', '#c9b6e4', ['wardrobe'], 'Shoes shouldn’t be lying around — store them out of sight.'),
      mess('m6', 'the shirt', 'clothes', '#ffffff', ['wardrobe'], 'Anything that creases needs to be hung up.'),
      mess('m7', 'the cactus', 'cup', '#8cc084', ['desk', 'bookshelf', 'nightstand', 'chest'], 'The plant pot needs a flat surface off the floor.'),
    ] }],
    B2: [{ type: 'sort', prompt: 'Follow your flatmate’s note — some instructions are indirect.', props: [
      mess('m1', 'the folded jeans', 'clothes', '#7fa6d8', ['chest'], 'Anything that’s already folded shouldn’t take up hanging space.'),
      mess('m2', 'the socks', 'socks', '#f6a6a6', ['chest'], 'Small items get lost in the wardrobe — find them a drawer.'),
      mess('m3', 'the textbook', 'book', '#9fd8c2', ['desk', 'bookshelf'], 'Put the textbook where you’ll actually use it, or with the other books.'),
      mess('m4', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'It’s hard to relax when the bed looks unmade.'),
      mess('m5', 'the muddy trainers', 'shoes', '#c9b6e4', ['wardrobe'], 'Keep outdoor shoes out of the way, not on the carpet.'),
      mess('m6', 'the formal shirt', 'clothes', '#ffffff', ['wardrobe'], 'You have an interview tomorrow — make sure the shirt doesn’t get creased.'),
      mess('m7', 'the cactus', 'cup', '#8cc084', ['desk', 'bookshelf', 'nightstand', 'chest'], 'The cactus would appreciate a bit more light than it gets on the floor.'),
      mess('m8', 'the mug', 'cup', '#f7c59f', ['desk', 'nightstand'], 'Leave the mug somewhere sensible until you take it to the kitchen.'),
    ] }],
  },
};

const SHOP_ITEMS = [
  { id: 'sofa-bed', name: 'Sofa bed', description: 'A sofa during the day and a bed at night.', price: 60, tags: ['sleep', 'sit', 'big'] },
  { id: 'single-bed', name: 'Single bed', description: 'A small bed for one person.', price: 45, tags: ['sleep'] },
  { id: 'double-bed', name: 'Double bed', description: 'A very big bed. It needs a lot of space.', price: 90, tags: ['sleep', 'big'] },
  { id: 'wardrobe', name: 'Tall wardrobe', description: 'Lots of space to hang clothes. It is big and heavy.', price: 55, tags: ['clothes', 'big'] },
  { id: 'chest', name: 'Chest of drawers', description: 'Three drawers for folded clothes.', price: 35, tags: ['clothes'] },
  { id: 'rail', name: 'Clothes rail', description: 'A cheap metal rail for hanging a few clothes.', price: 15, tags: ['clothes'] },
  { id: 'desk', name: 'Small desk', description: 'A desk for studying or working.', price: 30, tags: ['study'] },
  { id: 'gaming-chair', name: 'Gaming chair', description: 'A comfortable chair. Not very useful without a desk.', price: 45, tags: ['sit'] },
  { id: 'bean-bag', name: 'Bean bag', description: 'A soft seat for relaxing on the floor.', price: 15, tags: ['sit'] },
  { id: 'floor-lamp', name: 'Floor lamp', description: 'A tall lamp that gives soft light.', price: 20, tags: ['light'] },
  { id: 'mirror', name: 'Big mirror', description: 'A large mirror for the wall.', price: 40, tags: ['decor'] },
];

const designOnBudget: MissionDefinition = {
  id: 'budget-designer', title: 'Design on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your cousin is coming to live with you. Buy furniture for their room.',
    A2: 'Your cousin is moving into the small spare room. You have a little money to buy furniture.',
    B1: 'Your cousin is moving into a very small spare room. Choose furniture that fits the space and the budget.',
    B2: 'You’re furnishing a tiny spare room for your cousin on a tight budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 100 coins. Your cousin needs a place to sleep and a place for clothes.', budget: 100,
        items: SHOP_ITEMS.filter((i) => ['single-bed', 'double-bed', 'wardrobe', 'chest', 'mirror', 'bean-bag'].includes(i.id)),
        needs: [{ tag: 'sleep', label: 'sleep' }, { tag: 'clothes', label: 'clothes' }] },
      { type: 'place', prompt: 'Now in YOUR room: put the wardrobe against the wall.', checks: [{ rel: 'againstWall', a: 'wardrobe' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 120 coins. Your cousin needs somewhere to sleep, somewhere to keep clothes and somewhere to study.', budget: 120,
        items: SHOP_ITEMS.filter((i) => i.id !== 'rail'),
        needs: [{ tag: 'sleep', label: 'sleep' }, { tag: 'clothes', label: 'keep clothes' }, { tag: 'study', label: 'study' }] },
      { type: 'place', prompt: 'Now in YOUR room: put the desk near the window and the chair next to the desk.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'nextTo', a: 'chair', b: 'desk' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 130 coins. The room is tiny, so choose only ONE big item. Your cousin needs to sleep, store clothes, study and have some light in the evening.', budget: 130, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sleep', label: 'sleep' }, { tag: 'clothes', label: 'store clothes' }, { tag: 'study', label: 'study' }, { tag: 'light', label: 'light' }] },
      { type: 'write', prompt: 'Write a short message to your cousin explaining what you bought and why.', minWords: 25,
        require: [furniture(2), connectors(1)], sample: 'I bought a single bed because the room is small, and a chest of drawers so you can keep your clothes...' },
      { type: 'place', prompt: 'Now in YOUR room: make a study corner — the desk near the window with the chair next to it.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'nextTo', a: 'chair', b: 'desk' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 140 coins and the room can only fit ONE bulky item. Your cousin needs to sleep, store clothes, study, have evening light and somewhere comfortable for a friend to sit.', budget: 140, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sleep', label: 'sleep' }, { tag: 'clothes', label: 'store clothes' }, { tag: 'study', label: 'study' }, { tag: 'light', label: 'light' }, { tag: 'sit', label: 'a seat for a guest' }] },
      { type: 'write', prompt: 'Justify your choices to your aunt, who is paying. Explain at least one alternative you rejected and why.', minWords: 45,
        require: [furniture(3), connectors(1), advanced(1)], sample: 'I chose a sofa bed instead of a double bed because it saves space, which means there is room for a desk...' },
      { type: 'place', prompt: 'Now in YOUR room: create a productive study area — the desk should get natural light and the chair should be next to it.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'nextTo', a: 'chair', b: 'desk' }] },
    ],
  },
};

// ── STAGE 5: ROOM MAKEOVER ─────────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Room Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your room beautiful! Read and move the furniture. Then press Check.',
    A2: 'Time for a makeover! Follow the instructions and move the real furniture.',
    B1: 'Give your bedroom a makeover. Read each brief carefully, rearrange the furniture, then check.',
    B2: 'An interior designer has sent you a brief. Interpret it and rearrange your room accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the bed against the wall.', checks: [{ rel: 'againstWall', a: 'bed' }] },
      { type: 'place', prompt: 'Put the bedside table next to the bed.', checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }] },
      { type: 'place', prompt: 'Put the lamp on the bedside table.', checks: [{ rel: 'onTop', a: 'lamp', b: 'nightstand' }] },
      { type: 'place', prompt: 'Hang the picture above the bed.', checks: [{ rel: 'above', a: 'picture', b: 'bed' }] },
      { type: 'place', prompt: 'Put the carpet in front of the wardrobe.', checks: [{ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the bed against the wall and the bedside table next to it.',
        checks: [{ rel: 'againstWall', a: 'bed' }, { rel: 'nextTo', a: 'nightstand', b: 'bed' }] },
      { type: 'place', prompt: 'Put the lamp on the bedside table and hang the picture above the bed.',
        checks: [{ rel: 'onTop', a: 'lamp', b: 'nightstand' }, { rel: 'above', a: 'picture', b: 'bed' }] },
      { type: 'place', prompt: 'Put the rug in front of the wardrobe.', checks: [{ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }] },
      { type: 'place', prompt: 'Put the desk near the window and the plant on the desk.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'onTop', a: 'plant', b: 'desk' }] },
    ],
    B1: [
      { type: 'place', prompt: 'You like reading in bed at night: put the bedside table next to the bed with the lamp on it.',
        checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }, { rel: 'onTop', a: 'lamp', b: 'nightstand' }] },
      { type: 'place', prompt: 'Make the sleeping area cosy: the bed should be against a wall with a picture hanging above it.',
        checks: [{ rel: 'againstWall', a: 'bed' }, { rel: 'above', a: 'picture', b: 'bed' }] },
      { type: 'place', prompt: 'Put the rug in front of the wardrobe so your feet stay warm while you get dressed.',
        checks: [{ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }] },
      { type: 'place', prompt: 'Your desk should get natural light, and the chair should be next to it.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'nextTo', a: 'chair', b: 'desk' }] },
      { type: 'write', prompt: 'Describe your new room in 3–4 sentences. Say where things are.', minWords: 25,
        require: [furniture(3), prepositions(3)], sample: 'My bed is against the wall and there is a picture above it...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a reading nook: the bedside table should be within arm’s reach of the bed, with a light source on top.',
        checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }, { rel: 'onTop', a: 'lamp', b: 'nightstand' }] },
      { type: 'place', prompt: 'Anchor the bed against a wall and give it a focal point by hanging artwork directly above it.',
        checks: [{ rel: 'againstWall', a: 'bed' }, { rel: 'above', a: 'picture', b: 'bed' }] },
      { type: 'place', prompt: 'Position the rug so that it softens the area where you get dressed, in front of the wardrobe.',
        checks: [{ rel: 'inFrontOf', a: 'carpet', b: 'wardrobe' }] },
      { type: 'place', prompt: 'Make the most of the daylight for studying, keep the chair beside the desk, and give the plant a sunny spot.',
        checks: [{ rel: 'nearWindow', a: 'desk' }, { rel: 'nextTo', a: 'chair', b: 'desk' }, { rel: 'nearWindow', a: 'plant' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what would you still change, and why?', minWords: 45,
        require: [furniture(3), prepositions(2), advanced(1)], sample: 'Although the room is quite small, the layout feels spacious because...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'A Friend Is Coming!', icon: '🎒', xp: 150,
  intro: {
    A1: 'Your friend is coming to sleep at your house! Get your room ready.',
    A2: 'Your friend is coming to stay for the weekend. Prepare the bedroom!',
    B1: 'A friend from another city is staying with you for the weekend. Get your bedroom ready and make them feel at home.',
    B2: 'An exchange student is staying with you for a week. Prepare your room thoughtfully and explain your arrangements.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Your friend needs a blanket. Where can you find an extra blanket? Click it.', targets: ['wardrobe', 'chest'] },
      { type: 'sort', prompt: 'Make the bed for your friend: put the blanket and the pillow on the bed.', props: [
        mess('f1', 'the blanket', 'blanket', '#a9c9f2', ['bed'], 'Put the blanket on the bed.'),
        mess('f2', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'Put the pillow on the bed.'),
      ] },
      { type: 'sort', prompt: 'Your friend has a suitcase. Find a place for it.', props: [
        mess('f3', 'the suitcase', 'suitcase', '#f6a6a6', ['wardrobe', 'bed', 'chest'], 'Put the suitcase next to the wardrobe or under the bed.'),
      ] },
      { type: 'choice', prompt: 'Your friend asks: “Where is the lamp?” What do you say?', options: [
        { text: 'It’s on the bedside table.', correct: true, feedback: 'Yes! “on the bedside table”.' },
        { text: 'It’s a lamp.', correct: false, feedback: 'Your friend wants to know WHERE it is.' },
        { text: 'I am a lamp.', correct: false, feedback: 'Use “It’s on/next to/under...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your room for your friend.', minWords: 8, require: [furniture(2)], sample: 'My bed is big. The lamp is on the bedside table.' },
    ],
    A2: [
      { type: 'find', prompt: 'Your friend gets cold at night. Where can you find an extra blanket? Click it.', targets: ['wardrobe', 'chest'] },
      { type: 'sort', prompt: 'Prepare the bed: put the blanket and the pillow on it.', props: [
        mess('f1', 'the extra blanket', 'blanket', '#a9c9f2', ['bed'], 'Put the extra blanket on the bed.'),
        mess('f2', 'the pillow', 'pillow', '#fde2e4', ['bed'], 'Put the pillow on the bed.'),
      ] },
      { type: 'sort', prompt: 'Organise your things so your friend has space.', props: [
        mess('f3', 'your books', 'book', '#9fd8c2', ['bookshelf'], 'Put your books on the bookshelf.'),
        mess('f4', 'your jeans', 'clothes', '#7fa6d8', ['wardrobe', 'chest'], 'Put your jeans away.'),
        mess('f5', 'your phone', 'phone', '#4a3f58', ['nightstand', 'desk'], 'Put your phone on the bedside table or the desk.'),
      ] },
      { type: 'sort', prompt: 'Find a place for your friend’s suitcase.', props: [
        mess('f6', 'the suitcase', 'suitcase', '#f6a6a6', ['wardrobe', 'bed', 'chest'], 'Put the suitcase next to the wardrobe or under the bed.'),
      ] },
      { type: 'write', prompt: 'Describe the room for your friend. Use at least 3 furniture words and 2 prepositions.', minWords: 15,
        require: [furniture(3), prepositions(2)], sample: 'This is my bedroom. Your bag can go next to the wardrobe. The lamp is on the bedside table...' },
    ],
    B1: [
      { type: 'find', prompt: 'Your friend feels the cold easily. Where would you look for a spare blanket? Click it.', targets: ['wardrobe', 'chest'] },
      { type: 'sort', prompt: 'Prepare the bed properly for your guest.', props: [
        mess('f1', 'the spare blanket', 'blanket', '#a9c9f2', ['bed'], 'The guest bed needs an extra blanket.'),
        mess('f2', 'a clean pillow', 'pillow', '#fde2e4', ['bed'], 'And a clean pillow.'),
      ] },
      { type: 'sort', prompt: 'Clear some space for your friend’s things.', props: [
        mess('f3', 'your schoolbooks', 'book', '#9fd8c2', ['bookshelf', 'desk'], 'Your schoolbooks are on the floor.'),
        mess('f4', 'your hoodie', 'clothes', '#ffd27a', ['wardrobe'], 'Your hoodie should be hung up.'),
        mess('f5', 'your trainers', 'shoes', '#c9b6e4', ['wardrobe'], 'Your trainers are in the way.'),
      ] },
      { type: 'place', prompt: 'Your friend likes reading at night: make sure there is a bedside table next to the bed with a lamp on it.',
        checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }, { rel: 'onTop', a: 'lamp', b: 'nightstand' }] },
      { type: 'sort', prompt: 'Find a sensible place for your friend’s suitcase.', props: [
        mess('f6', 'the suitcase', 'suitcase', '#f6a6a6', ['wardrobe', 'bed', 'chest'], 'Somewhere it won’t be in the way.'),
      ] },
      { type: 'write', prompt: 'Leave a note for your friend (at least 35 words): tell them where they can put their things and why.', minWords: 35,
        require: [furniture(3), prepositions(3), connectors(1)], sample: 'Welcome! You can put your clothes in the chest of drawers because I emptied the top drawer for you...' },
    ],
    B2: [
      { type: 'find', prompt: 'Your guest mentioned they always feel cold. Where would you keep spare bedding? Click it.', targets: ['wardrobe', 'chest'] },
      { type: 'sort', prompt: 'Prepare the bed to a high standard.', props: [
        mess('f1', 'the spare duvet', 'blanket', '#a9c9f2', ['bed'], 'Add the spare duvet to the bed.'),
        mess('f2', 'freshly washed pillows', 'pillow', '#fde2e4', ['bed'], 'Freshly washed pillows go on the bed.'),
      ] },
      { type: 'sort', prompt: 'Declutter so your guest has somewhere to unpack.', props: [
        mess('f3', 'a stack of textbooks', 'book', '#9fd8c2', ['bookshelf', 'desk'], 'Textbooks are taking up floor space.'),
        mess('f4', 'your formal jacket', 'clothes', '#5b6b8c', ['wardrobe'], 'Your jacket would crease in a drawer.'),
        mess('f5', 'your gym shoes', 'shoes', '#c9b6e4', ['wardrobe'], 'Gym shoes shouldn’t be in the walkway.'),
        mess('f6', 'a used mug', 'cup', '#f7c59f', ['desk', 'nightstand'], 'The mug can wait somewhere sensible.'),
      ] },
      { type: 'place', prompt: 'Make the room guest-friendly: a reading light within reach of the bed, and a clear study space by the window.',
        checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }, { rel: 'onTop', a: 'lamp', b: 'nightstand' }, { rel: 'nearWindow', a: 'desk' }] },
      { type: 'choice', prompt: 'Your guest has a bad back and finds low beds uncomfortable. What is the most considerate solution?', options: [
        { text: 'Offer them your own bed and sleep on the sofa bed yourself.', correct: true, feedback: 'Considerate and practical — the guest gets the most suitable bed.' },
        { text: 'Tell them to put a pillow under their back.', correct: false, feedback: 'This doesn’t really solve the problem.' },
        { text: 'Buy a new double bed for one week.', correct: false, feedback: 'Expensive, and there may not be space for it.' },
      ] },
      { type: 'write', prompt: 'Write a welcome note (at least 55 words) explaining how you’ve arranged the room, justifying your choices.', minWords: 55,
        require: [furniture(4), prepositions(3), connectors(1), advanced(1)], sample: 'I’ve moved the bedside table next to the bed so that you can read at night. Although the room is quite small...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const bedroomChapter: ChapterDefinition = {
  roomId: 'bedroom',
  title: 'My Bedroom',
  explore,
  challenges: [movingDay, messyBedroom, designOnBudget],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'mirror', prompt: { A1: 'Find something you look in.', A2: 'Find something you use to check your appearance.', B1: 'Find the object you’d use to see if your outfit looks good.', B2: 'Find the item that lets you check your appearance before you leave.' } },
    { target: 'lamp', prompt: { A1: 'Find something that gives light.', A2: 'Find something you switch on when it gets dark.', B1: 'Find what you’d use to read in bed without waking anyone up.', B2: 'Find a source of artificial light that you can control yourself.' } },
    { target: 'plant', prompt: { A1: 'Find something green.', A2: 'Find something that needs water every week.', B1: 'Find a living thing that makes the room feel fresher.', B2: 'Find the decorative item that can improve air quality.' } },
    { target: 'chair', prompt: { A1: 'Find something you sit on.', A2: 'Find what you sit on when you do your homework.', B1: 'Find the piece of furniture that goes with the desk.', B2: 'Find the seat that supports your posture while you study.' } },
    { target: 'bookshelf', prompt: { A1: 'Find where the books are.', A2: 'Find a place to keep your books.', B1: 'Find somewhere to store novels and dictionaries.', B2: 'Find the storage that displays your reading collection.' } },
    { target: 'carpet', prompt: { A1: 'Find something soft on the floor.', A2: 'Find something that keeps your feet warm.', B1: 'Find what stops the floor feeling cold in winter.', B2: 'Find the textile that softens the floor and reduces noise.' } },
    { target: 'picture', prompt: { A1: 'Find something on the wall.', A2: 'Find a decoration that hangs on the wall.', B1: 'Find something that makes the walls look less empty.', B2: 'Find the artwork that acts as a focal point on the wall.' } },
    { target: 'chest', prompt: { A1: 'Find the furniture with three drawers.', A2: 'Find where you can keep socks and T-shirts.', B1: 'Find where you’d store clothes that you fold.', B2: 'Find the storage best suited to folded garments.' } },
    { target: 'nightstand', prompt: { A1: 'Find the small table next to the bed.', A2: 'Find where you put your phone at night.', B1: 'Find where you’d leave your alarm clock.', B2: 'Find the surface within reach when you’re lying in bed.' } },
    { target: 'desk', prompt: { A1: 'Find the table for homework.', A2: 'Find where you write and study.', B1: 'Find your workspace.', B2: 'Find the furniture designed for productive work.' } },
    { target: 'wardrobe', prompt: { A1: 'Find where coats and dresses go.', A2: 'Find the tall furniture for clothes.', B1: 'Find where you’d hang up a shirt.', B2: 'Find the storage that keeps clothes free of creases.' } },
    { target: 'bed', prompt: { A1: 'Find where you sleep.', A2: 'Find where you rest at night.', B1: 'Find the most comfortable place to lie down.', B2: 'Find the piece of furniture you spend about a third of your life in.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'nextTo', a: 'nightstand', b: 'bed' }], prompt: { A1: 'Put the bedside table next to the bed.', B1: 'Move the bedside table so you can reach it from the bed.', B2: 'Position the bedside table within arm’s reach of the bed.' } },
    { checks: [{ rel: 'nearWindow', a: 'desk' }], prompt: { A1: 'Put the desk near the window.', B1: 'Put the desk where it gets the most natural light.', B2: 'Arrange the desk so you make the most of the daylight.' } },
    { checks: [{ rel: 'nextTo', a: 'chair', b: 'desk' }], prompt: { A1: 'Put the chair next to the desk.', B1: 'Put the chair where you can sit and work at the desk.', B2: 'Pair the chair with the workspace.' } },
    { checks: [{ rel: 'againstWall', a: 'bookshelf' }], prompt: { A1: 'Put the bookshelf against the wall.', B1: 'Tall furniture is safer against a wall — move the bookshelf.', B2: 'Secure the bookshelf’s position by placing it flush against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'lamp', b: 'desk' }], prompt: { A1: 'Put the lamp on the desk.', B1: 'You need light for homework — put the lamp on the desk.', B2: 'Provide task lighting for the workspace.' } },
    { checks: [{ rel: 'inMiddle', a: 'carpet' }], prompt: { A1: 'Put the carpet in the middle of the room.', B1: 'Put the rug in the centre of the room.', B2: 'Centre the rug to tie the room together.' } },
    { checks: [{ rel: 'above', a: 'picture', b: 'bed' }], prompt: { A1: 'Hang the picture above the bed.', B1: 'Hang the picture on the wall above the bed.', B2: 'Create a focal point above the bed with the picture.' } },
    { checks: [{ rel: 'nextTo', a: 'chest', b: 'wardrobe' }], prompt: { A1: 'Put the chest of drawers next to the wardrobe.', B1: 'Keep all your clothes storage together: the chest of drawers next to the wardrobe.', B2: 'Group the clothes storage by placing the chest of drawers beside the wardrobe.' } },
    { checks: [{ rel: 'inCorner', a: 'bookshelf' }], prompt: { A1: 'Put the bookshelf in the corner.', B1: 'Save space by moving the bookshelf into a corner.', B2: 'Make use of the corner space for the bookshelf.' } },
    { checks: [{ rel: 'farFrom', a: 'desk', b: 'bed' }], prompt: { A1: 'Put the desk far from the bed.', B1: 'Keep your study area away from the bed.', B2: 'Separate the workspace from the sleeping area to help you focus.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'furniture', label: 'Furniture', icon: '🛋️' },
      { id: 'clothes', label: 'Clothes', icon: '👕' },
      { id: 'decorations', label: 'Decorations', icon: '🖼️' },
      { id: 'belongings', label: 'Personal belongings', icon: '🎒' },
    ],
    items: [
      { word: 'bed', bin: 'furniture', level: 'A1' }, { word: 'chair', bin: 'furniture', level: 'A1' },
      { word: 'desk', bin: 'furniture', level: 'A1' }, { word: 'wardrobe', bin: 'furniture', level: 'A1' },
      { word: 'bedside table', bin: 'furniture', level: 'A1' }, { word: 'chest of drawers', bin: 'furniture', level: 'A2' },
      { word: 'bookshelf', bin: 'furniture', level: 'A1' }, { word: 'dressing table', bin: 'furniture', level: 'B1' },
      { word: 'T-shirt', bin: 'clothes', level: 'A1' }, { word: 'jeans', bin: 'clothes', level: 'A1' },
      { word: 'socks', bin: 'clothes', level: 'A1' }, { word: 'dress', bin: 'clothes', level: 'A1' },
      { word: 'pyjamas', bin: 'clothes', level: 'A2' }, { word: 'dressing gown', bin: 'clothes', level: 'A2' },
      { word: 'scarf', bin: 'clothes', level: 'A2' }, { word: 'trainers', bin: 'clothes', level: 'A2' },
      { word: 'picture', bin: 'decorations', level: 'A1' }, { word: 'plant', bin: 'decorations', level: 'A1' },
      { word: 'poster', bin: 'decorations', level: 'A2' }, { word: 'vase', bin: 'decorations', level: 'A2' },
      { word: 'candle', bin: 'decorations', level: 'A2' }, { word: 'photo frame', bin: 'decorations', level: 'A2' },
      { word: 'chandelier', bin: 'decorations', level: 'B2' }, { word: 'curtains', bin: 'decorations', level: 'A2' },
      { word: 'backpack', bin: 'belongings', level: 'A1' }, { word: 'book', bin: 'belongings', level: 'A1' },
      { word: 'wallet', bin: 'belongings', level: 'A2' }, { word: 'headphones', bin: 'belongings', level: 'A2' },
      { word: 'hairbrush', bin: 'belongings', level: 'A2' }, { word: 'phone charger', bin: 'belongings', level: 'A2' },
      { word: 'perfume', bin: 'belongings', level: 'A2' }, { word: 'jewellery box', bin: 'belongings', level: 'A2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'Your room is dark and you want to read. What do you do?', options: [
      { text: 'I turn on the lamp.', best: true, feedback: 'Yes! A lamp gives light.' },
      { text: 'I open the wardrobe.', best: false, feedback: 'The wardrobe is for clothes, not light.' },
      { text: 'I sit on the carpet.', best: false, feedback: 'You still can’t see the book!' },
    ] },
    { level: 'A1', situation: 'You are cold in bed. What do you need?', options: [
      { text: 'A blanket.', best: true, feedback: 'Right — a blanket keeps you warm.' },
      { text: 'A mirror.', best: false, feedback: 'A mirror doesn’t keep you warm.' },
      { text: 'A desk.', best: false, feedback: 'A desk is for homework.' },
    ] },
    { level: 'A1', situation: 'Your books are on the floor. Where do you put them?', options: [
      { text: 'On the bookshelf.', best: true, feedback: 'Perfect!' },
      { text: 'In the bed.', best: false, feedback: 'Books in bed? Not a good place to keep them!' },
      { text: 'Under the carpet.', best: false, feedback: 'You won’t find them there!' },
    ] },
    { level: 'A2', situation: 'Your friend is coming in 10 minutes and your room is messy. What do you do first?', options: [
      { text: 'I put my clothes in the wardrobe.', best: true, feedback: 'Good idea — clothes on the floor make a room look messy.' },
      { text: 'I buy a new bed.', best: false, feedback: 'There isn’t time, and it doesn’t solve the mess!' },
      { text: 'I go to sleep.', best: false, feedback: 'Your friend will see the mess!' },
    ] },
    { level: 'A2', situation: 'Every morning you can’t find your socks. What can you do?', options: [
      { text: 'Keep all my socks in one drawer.', best: true, feedback: 'Yes — one place for one type of thing.' },
      { text: 'Buy new socks every day.', best: false, feedback: 'That’s very expensive!' },
      { text: 'Wear no socks.', best: false, feedback: 'Your feet will be cold!' },
    ] },
    { level: 'A2', situation: 'The sun wakes you up too early in summer. What can help?', options: [
      { text: 'Close the curtains before I go to bed.', best: true, feedback: 'Curtains block the light.' },
      { text: 'Move the lamp.', best: false, feedback: 'The lamp isn’t the problem — the sun is.' },
      { text: 'Put a plant on the bed.', best: false, feedback: 'That won’t stop the sun!' },
    ] },
    { level: 'B1', situation: 'Your bedroom is too cluttered. How would you organise it?', options: [
      { text: 'Sort everything into “keep”, “give away” and “throw away”, then store what I keep.', best: true, feedback: 'This deals with the real problem: having too many things.' },
      { text: 'Push everything under the bed.', best: false, feedback: 'This hides the clutter but doesn’t solve it.' },
      { text: 'Buy more furniture to put things in.', best: false, feedback: 'More furniture takes up even more space.' },
    ], reasons: [
      { text: 'Because it reduces the number of things, not just moves them.', correct: true },
      { text: 'Because it is the quickest option.', correct: false },
      { text: 'Because it costs the most money.', correct: false },
    ] },
    { level: 'B1', situation: 'You share a room with your younger brother, who goes to bed earlier than you. You want to read. What would you do?', options: [
      { text: 'Use a small lamp on my bedside table instead of the ceiling light.', best: true, feedback: 'You can read without disturbing him.' },
      { text: 'Turn on all the lights.', best: false, feedback: 'That would wake him up.' },
      { text: 'Read in the dark.', best: false, feedback: 'Bad for your eyes!' },
    ], reasons: [
      { text: 'Because a small light is enough for me and won’t keep him awake.', correct: true },
      { text: 'Because lamps are cheaper than books.', correct: false },
      { text: 'Because the ceiling light is broken.', correct: false },
    ] },
    { level: 'B1', situation: 'Your desk is next to your bed and you keep lying down instead of studying. What would you change?', options: [
      { text: 'Move the desk to the other side of the room, near the window.', best: true, feedback: 'Separating study and sleep areas helps you focus — and daylight helps too.' },
      { text: 'Study in bed instead.', best: false, feedback: 'That makes it even harder to concentrate.' },
      { text: 'Get a bigger bed.', best: false, feedback: 'That makes the temptation worse!' },
    ], reasons: [
      { text: 'Because a separate study area helps me concentrate.', correct: true },
      { text: 'Because windows are nice to look at.', correct: false },
      { text: 'Because the desk is too heavy.', correct: false },
    ] },
    { level: 'B2', situation: 'Your room is small, but you need space both to study and to do yoga every morning. What would you do?', options: [
      { text: 'Get a folding desk and keep the floor clear, storing things vertically on shelves.', best: true, feedback: 'Flexible furniture and vertical storage make a small room multi-functional.' },
      { text: 'Do yoga on the bed.', best: false, feedback: 'Not very stable — and it doesn’t solve the space issue.' },
      { text: 'Move the wardrobe into the middle of the room.', best: false, feedback: 'This would take up the floor space you need.' },
    ], write: { prompt: 'Justify your choice. Why is it better than the alternatives?', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'You want to redecorate your bedroom but you have a very tight budget. What is the most sensible approach?', options: [
      { text: 'Upcycle the furniture I already have and add cheap touches like plants and cushions.', best: true, feedback: 'Low cost, sustainable and personal.' },
      { text: 'Buy all new furniture on credit.', best: false, feedback: 'Risky — you’d be in debt for decoration.' },
      { text: 'Leave it as it is.', best: false, feedback: 'Possible, but you can still improve it for very little.' },
    ], write: { prompt: 'Explain your reasoning and mention one disadvantage of a different option.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Your flatmate keeps borrowing your clothes without asking, and they end up all over their room. What would you do?', options: [
      { text: 'Talk to them calmly and agree on clear rules, like asking first and returning things the same day.', best: true, feedback: 'Direct but respectful communication solves the cause.' },
      { text: 'Lock the wardrobe and say nothing.', best: false, feedback: 'This avoids the conversation and may create tension.' },
      { text: 'Take their clothes in return.', best: false, feedback: 'Revenge usually makes things worse.' },
    ], write: { prompt: 'Justify your decision, considering how your flatmate might feel.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'The bed is next to the window.', level: 'A1' },
    { text: 'My lamp is on the desk.', level: 'A1' },
    { text: 'I sleep in my bed.', level: 'A1' },
    { text: 'The cat is under the chair.', level: 'A1' },
    { text: 'There is a plant in my room.', level: 'A1' },
    { text: 'The picture is on the wall.', level: 'A1' },
    { text: 'I keep my clothes in the wardrobe.', level: 'A2' },
    { text: 'My bedside table is next to the bed.', level: 'A2' },
    { text: 'I make my bed every morning.', level: 'A2' },
    { text: 'There are three books on the shelf.', level: 'A2' },
    { text: 'The rug is in front of the wardrobe.', level: 'A2' },
    { text: 'I usually tidy up my room at the weekend.', level: 'B1' },
    { text: 'The desk is near the window because I like natural light.', level: 'B1' },
    { text: 'My wardrobe is too small for all my clothes.', level: 'B1' },
    { text: 'I hang up my shirts so they do not get creased.', level: 'B1' },
    { text: 'Although my room is small, it feels spacious.', level: 'B2' },
    { text: 'I would rearrange the furniture to make the room more functional.', level: 'B2' },
    { text: 'Having a separate study area helps me concentrate.', level: 'B2' },
  ],

  // Practice Mode: Prepositions
  prepositions: [
    { sentence: 'The lamp is ___ the bedside table.', answer: 'on', options: ['on', 'in', 'under'], level: 'A1' },
    { sentence: 'My shoes are ___ the bed.', answer: 'under', options: ['under', 'on', 'at'], level: 'A1' },
    { sentence: 'The clothes are ___ the wardrobe.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The chair is ___ the desk.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The cat is sleeping ___ the carpet.', answer: 'on', options: ['on', 'in', 'under'], level: 'A1' },
    { sentence: 'The picture is ___ the bed.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The rug is ___ the wardrobe.', answer: 'in front of', options: ['in front of', 'inside', 'above'], level: 'A2' },
    { sentence: 'The plant is ___ the corner.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'The bedside table is ___ the bed and the wall.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The mirror is ___ the window, on the other side of the room.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'The bed is ___ the wall.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'The rug is ___ the middle of the room.', answer: 'in', options: ['in', 'on', 'at'], level: 'B1' },
    { sentence: 'I keep my passport ___ the top drawer.', answer: 'in', options: ['in', 'on', 'at'], level: 'B1' },
    { sentence: 'The light switch is just ___ the door.', answer: 'by', options: ['by', 'among', 'during'], level: 'B1' },
    { sentence: 'The window is directly ___ the desk, so I get plenty of light.', answer: 'above', options: ['above', 'over to', 'beneath of'], level: 'B2' },
    { sentence: 'My bed is tucked away ___ the alcove.', answer: 'in', options: ['in', 'on', 'onto'], level: 'B2' },
  ],
};
