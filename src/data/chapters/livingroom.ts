import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  LIVING ROOM CHAPTER — all missions, mini-game content and practice sentences.
//  Same shape as bedroom.ts, kitchen.ts and bathroom.ts.
//
//  Furniture ids you can use: sofa, armchair, coffee-table, tv, fireplace, bookcase,
//  floor-lamp, cushion (small), remote (small), wall-clock (on the wall), piano, beanbag
//
//  Surfaces (small things can stand ON them): sofa, armchair, coffee-table, fireplace (mantelpiece)
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const LIVING_WORDS = ['living room', 'sofa', 'armchair', 'coffee table', 'table', 'tv', 'television', 'fireplace', 'fire', 'bookcase', 'books',
  'floor lamp', 'lamp', 'cushion', 'cushions', 'remote control', 'remote', 'clock', 'piano', 'beanbag', 'rug', 'curtains', 'mantelpiece', 'shelf', 'shelves'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const livingWords = (count: number): WordRequirement => ({ label: 'living room words', words: LIVING_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your living room.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('sit-down', 'Take a seat', '🛋️', {
    A1: 'Find two things you can sit on.',
    A2: 'Find two places where you can sit and relax.',
    B1: 'Find two seats where a guest could sit comfortably.',
    B2: 'Identify two pieces of seating furniture.',
  }, ['sofa', 'armchair', 'beanbag'], 2),
  findMission('evening-light', 'Cosy evening', '🕯️', {
    A1: 'Find two things that make the room light or warm.',
    A2: 'Find two things that give light or heat in the evening.',
    B1: 'Find two things you’d turn on when it gets dark and cold.',
    B2: 'Identify two sources of light or warmth in the room.',
  }, ['floor-lamp', 'fireplace'], 2),
  findMission('film-night', 'Film night', '🎬', {
    A1: 'Find two things you need to watch a film.',
    A2: 'Find two things you use to watch a cartoon.',
    B1: 'Find two things you’d need for a film night without leaving the sofa.',
    B2: 'Identify two items essential for watching TV from your seat.',
  }, ['tv', 'remote'], 2),
  findMission('hobbies', 'Free time', '🎵', {
    A1: 'Find two things for free time: music or books.',
    A2: 'Find two things you use for a hobby.',
    B1: 'Find two things that would help you spend a rainy afternoon without screens.',
    B2: 'Identify two items for screen-free leisure.',
  }, ['piano', 'bookcase'], 2),
  findMission('what-time', 'What time is it?', '🕰️', {
    A1: 'Find the clock.',
    A2: 'Find what tells you the time.',
    B1: 'Find what you’d look at to check if you’re late.',
    B2: 'Find the wall-mounted timepiece.',
  }, ['wall-clock']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Moving Day', icon: '📦', xp: 60,
  intro: {
    A1: 'You moved into a new house. The boxes are in the living room. Put everything away.',
    A2: 'It’s moving day! The removal van left boxes everywhere. Unpack the living room.',
    B1: 'The removal team only wrote short notes on the boxes. Decide where everything belongs.',
    B2: 'The boxes have rather cryptic labels. Work out where their contents should go.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'books', ['bookcase']),
      box('u2', 'cushions', ['sofa', 'armchair']),
      box('u3', 'a DVD', ['tv']),
      box('u4', 'wood for the fire', ['fireplace']),
      box('u5', 'cups and magazines', ['coffee-table']),
      box('u6', 'music books', ['piano']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'books and dictionaries', ['bookcase']),
      box('u2', 'two soft cushions', ['sofa', 'armchair']),
      box('u3', 'a games console', ['tv']),
      box('u4', 'firewood', ['fireplace']),
      box('u5', 'board games', ['coffee-table', 'bookcase']),
      box('u6', 'sheet music', ['piano']),
      box('u7', 'a new light bulb', ['floor-lamp']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'novels and photo albums', ['bookcase']),
      box('u2', 'things to make the sofa softer', ['sofa', 'armchair']),
      box('u3', 'cables for the screen', ['tv']),
      box('u4', 'logs and matches', ['fireplace']),
      box('u5', 'coasters for hot drinks', ['coffee-table']),
      box('u6', 'my piano exercises', ['piano']),
      box('u7', 'a lampshade', ['floor-lamp']),
      box('u8', 'family photos in frames', ['fireplace', 'bookcase']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'paperbacks and reference books', ['bookcase']),
      box('u2', 'soft furnishings', ['sofa', 'armchair']),
      box('u3', 'a streaming device and HDMI cables', ['tv']),
      box('u4', 'kindling', ['fireplace']),
      box('u5', 'a set of coasters', ['coffee-table']),
      box('u6', 'a metronome', ['piano']),
      box('u7', 'a spare bulb for reading light', ['floor-lamp']),
      box('u8', 'ornaments for the mantelpiece', ['fireplace']),
    ] }],
  },
};

const afterParty: MissionDefinition = {
  id: 'after-party', title: 'After the Party', icon: '🎉', xp: 60,
  intro: {
    A1: 'There was a party last night. The living room is a mess! Tidy it up.',
    A2: 'Your brother had a birthday party and the living room is a mess. Follow Dad’s list.',
    B1: 'The morning after a family party, the living room is chaos. Read Dad’s note and sort it out.',
    B2: 'Your parents are back in an hour and the living room looks like a tornado hit it. Deal with your sister’s note.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click where it goes.', props: [
      thing('p1', 'the cushion', 'pillow', '#f28c8c', ['sofa', 'armchair'], 'Put the cushion on the sofa.'),
      thing('p2', 'the book', 'book', '#5aa9e6', ['bookcase'], 'Put the book in the bookcase.'),
      thing('p3', 'the cups', 'cup', '#ffffff', ['coffee-table'], 'Put the cups on the coffee table.'),
      thing('p4', 'the toy car', 'toy', '#ffd54f', ['bookcase', 'coffee-table'], 'Put the toy car on the bookcase.'),
      thing('p5', 'the blanket', 'blanket', '#c9b6e4', ['sofa', 'armchair'], 'Put the blanket on the armchair.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'Grandma wants to watch the news but can’t turn on the TV. What does she need? Click it.', targets: ['remote'] },
      { type: 'sort', prompt: 'Tidy up! Follow each instruction.', props: [
        thing('p1', 'the cushions', 'pillow', '#f28c8c', ['sofa', 'armchair'], 'Put the cushions back on the sofa.'),
        thing('p2', 'the board game', 'box', '#9fd08f', ['coffee-table', 'bookcase'], 'Put the board game on the bookcase.'),
        thing('p3', 'the dirty plates', 'plate', '#ffffff', ['coffee-table'], 'Stack the plates on the coffee table for now.'),
        thing('p4', 'the photo album', 'book', '#d9a874', ['bookcase'], 'Put the photo album back on the shelf.'),
        thing('p5', 'the music book', 'book', '#c9b6e4', ['piano'], 'Put the music book on the piano.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'Somebody left the fire burning all night. Check it is safe. Click it.', targets: ['fireplace'] },
      { type: 'sort', prompt: 'Read Dad’s note and put everything away.', props: [
        thing('p1', 'the squashed cushions', 'pillow', '#f28c8c', ['sofa', 'armchair'], 'Plump up the cushions and put them back where people sit.'),
        thing('p2', 'the party games', 'box', '#9fd08f', ['bookcase', 'coffee-table'], 'The games live on the shelves, not on the floor.'),
        thing('p3', 'the empty glasses', 'cup', '#a9c9f2', ['coffee-table'], 'Collect the glasses on the low table so I can take them to the kitchen.'),
        thing('p4', 'the birthday cards', 'book', '#f7b2d0', ['fireplace'], 'Stand the cards on the mantelpiece so everyone can see them.'),
        thing('p5', 'the sheet music', 'book', '#fffdf6', ['piano'], 'Your piano exercises shouldn’t be under the sofa.'),
      ] },
      { type: 'choice', prompt: 'Your cousin is still asleep on the sofa at 11 a.m. What do you say?', options: [
        { text: 'Good morning! Would you like some breakfast? We need to tidy up soon.', correct: true, feedback: 'Friendly and clear.' },
        { text: 'Get off the sofa now!', correct: false, feedback: 'He’ll move, but it isn’t very kind.' },
        { text: 'Turn the TV on very loud.', correct: false, feedback: 'That’s a rude way to wake someone.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'Someone spilt juice on the soft seat for one person. Which piece of furniture needs cleaning? Click it.', targets: ['armchair'] },
      { type: 'sort', prompt: 'Your sister’s note is full of hints. Put each thing where it should go.', props: [
        thing('p1', 'the scattered cushions', 'pillow', '#f28c8c', ['sofa', 'armchair'], 'Mum hates seeing soft furnishings on the floor.'),
        thing('p2', 'the throw', 'blanket', '#c9b6e4', ['sofa'], 'Drape the throw back over the three-seater.'),
        thing('p3', 'the half-finished puzzle', 'box', '#9fd08f', ['coffee-table'], 'Leave the puzzle somewhere low where we can finish it later.'),
        thing('p4', 'the borrowed novel', 'book', '#5aa9e6', ['bookcase'], 'Shelve the novel with the others so we don’t lose it.'),
        thing('p5', 'the candles', 'cup', '#fff3d6', ['fireplace'], 'The candles belong on the mantelpiece, well out of the children’s reach.'),
        thing('p6', 'Dad’s glasses case', 'phone', '#5b5560', ['armchair', 'coffee-table'], 'Dad always looks for his glasses next to his reading chair.'),
      ] },
      { type: 'write', prompt: 'Write a short, polite message to your family asking everyone to help tidy up. Explain why.', minWords: 35,
        require: [livingWords(2), connectors(1), advanced(1)], sample: 'Although the party was great, the living room...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'sofa', name: 'Big sofa', description: 'A soft sofa for three people. It takes a lot of space.', price: 70, tags: ['sit', 'big'] },
  { id: 'beanbag', name: 'Beanbag', description: 'A soft seat for the floor. Cheap and fun.', price: 15, tags: ['sit'] },
  { id: 'armchair', name: 'Armchair', description: 'A comfortable chair for one person.', price: 35, tags: ['sit'] },
  { id: 'tv', name: 'Big TV', description: 'A large TV for films and games.', price: 60, tags: ['fun', 'big'] },
  { id: 'board-games', name: 'Board games', description: 'Three games for the whole family.', price: 15, tags: ['fun'] },
  { id: 'floor-lamp', name: 'Floor lamp', description: 'A tall lamp for reading in the evening.', price: 20, tags: ['light'] },
  { id: 'fairy-lights', name: 'Fairy lights', description: 'Small pretty lights. Not very bright.', price: 8, tags: ['light'] },
  { id: 'bookcase', name: 'Bookcase', description: 'Tall shelves for books and games.', price: 30, tags: ['store'] },
  { id: 'baskets', name: 'Storage baskets', description: 'Baskets for toys and magazines. Cheap.', price: 10, tags: ['store'] },
  { id: 'rug', name: 'Rug', description: 'A soft rug that makes the room warm and quiet.', price: 18, tags: ['cosy'] },
];

const budgetLiving: MissionDefinition = {
  id: 'budget-living', title: 'Living Room on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your aunt has a new flat. The living room is empty. Help her buy things.',
    A2: 'Your aunt has just moved into a small flat and the living room is empty. She doesn’t have much money.',
    B1: 'Your aunt’s new living room is quite small. Choose things that fit the space and the budget.',
    B2: 'You’re helping your aunt furnish a compact living room on a tight budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 90 coins. Your aunt needs something to sit on and a light.', budget: 90,
        items: SHOP_ITEMS.filter((i) => ['sofa', 'armchair', 'floor-lamp', 'fairy-lights', 'tv'].includes(i.id)),
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'light', label: 'light' }] },
      { type: 'place', prompt: 'Now in YOUR living room: put the coffee table in front of the sofa.', checks: [{ rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 110 coins. Your aunt needs to sit, have fun and keep her things somewhere.', budget: 110,
        items: SHOP_ITEMS.filter((i) => i.id !== 'rug'),
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'fun', label: 'have fun' }, { tag: 'store', label: 'store things' }] },
      { type: 'place', prompt: 'Now in YOUR living room: put the floor lamp next to the armchair.', checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 130 coins. The room is small, so choose only ONE big item. Your aunt needs to sit, have fun, read in the evening and store things.', budget: 130, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'fun', label: 'have fun' }, { tag: 'light', label: 'light' }, { tag: 'store', label: 'store things' }] },
      { type: 'write', prompt: 'Write a short message to your aunt explaining what you bought and why.', minWords: 25,
        require: [livingWords(2), connectors(1)], sample: 'I bought an armchair because the room is small, and...' },
      { type: 'place', prompt: 'Now in YOUR living room: put the floor lamp in a corner.', checks: [{ rel: 'inCorner', a: 'floor-lamp' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 140 coins and space for only ONE bulky item. Your aunt needs seating, entertainment, light, storage and something to make it cosy.', budget: 140, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'seating' }, { tag: 'fun', label: 'entertainment' }, { tag: 'light', label: 'light' }, { tag: 'store', label: 'storage' }, { tag: 'cosy', label: 'cosiness' }] },
      { type: 'write', prompt: 'Justify your choices to your aunt. Mention one option you rejected and why.', minWords: 45,
        require: [livingWords(3), connectors(1), advanced(1)], sample: 'I chose board games instead of a big TV because...' },
      { type: 'place', prompt: 'Now in YOUR living room: create a reading corner — the floor lamp next to the armchair, with the armchair against a wall.',
        checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }, { rel: 'againstWall', a: 'armchair' }] },
    ],
  },
};

// ── STAGE 5: LIVING ROOM MAKEOVER ──────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Living Room Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your living room nice! Read and move the furniture. Then press Check.',
    A2: 'Time for a living room makeover! Follow the instructions and move the real furniture.',
    B1: 'Give your living room a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'An interior designer has sent you a brief. Interpret it and rearrange your living room accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the sofa against the wall.', checks: [{ rel: 'againstWall', a: 'sofa' }] },
      { type: 'place', prompt: 'Put the coffee table in front of the sofa.', checks: [{ rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }] },
      { type: 'place', prompt: 'Put the remote control on the coffee table.', checks: [{ rel: 'onTop', a: 'remote', b: 'coffee-table' }] },
      { type: 'place', prompt: 'Put the cushion on the sofa.', checks: [{ rel: 'onTop', a: 'cushion', b: 'sofa' }] },
      { type: 'place', prompt: 'Hang the clock above the fireplace.', checks: [{ rel: 'above', a: 'wall-clock', b: 'fireplace' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the sofa against the wall and the coffee table in front of it.',
        checks: [{ rel: 'againstWall', a: 'sofa' }, { rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }] },
      { type: 'place', prompt: 'Put the cushion on the sofa and the remote control on the coffee table.',
        checks: [{ rel: 'onTop', a: 'cushion', b: 'sofa' }, { rel: 'onTop', a: 'remote', b: 'coffee-table' }] },
      { type: 'place', prompt: 'Put the floor lamp next to the armchair.', checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }] },
      { type: 'place', prompt: 'Put the piano against the wall.', checks: [{ rel: 'againstWall', a: 'piano' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Everyone should see the screen: put the coffee table in front of the sofa, with the TV against a wall.',
        checks: [{ rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }, { rel: 'againstWall', a: 'tv' }] },
      { type: 'place', prompt: 'Make a reading corner: the floor lamp next to the armchair.', checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }] },
      { type: 'place', prompt: 'Keep the beanbag away from the fire — it could melt!', checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }] },
      { type: 'place', prompt: 'You always check the time while sitting by the fire: hang the clock above the fireplace.',
        checks: [{ rel: 'above', a: 'wall-clock', b: 'fireplace' }] },
      { type: 'write', prompt: 'Describe your new living room in 3–4 sentences. Say where things are.', minWords: 25,
        require: [livingWords(3), prepositions(2)], sample: 'The sofa is against the wall...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a TV zone: sofa against a wall, coffee table in front of it, remote within reach on the table.',
        checks: [{ rel: 'againstWall', a: 'sofa' }, { rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }, { rel: 'onTop', a: 'remote', b: 'coffee-table' }] },
      { type: 'place', prompt: 'Design a quiet reading nook: armchair in a corner with the floor lamp beside it.',
        checks: [{ rel: 'inCorner', a: 'armchair' }, { rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }] },
      { type: 'place', prompt: 'Minimise fire risk: the beanbag must be well away from the fireplace.', checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }] },
      { type: 'place', prompt: 'Acoustics matter: put the piano against a wall.', checks: [{ rel: 'againstWall', a: 'piano' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what is still not ideal, and why?', minWords: 45,
        require: [livingWords(3), prepositions(2), advanced(1)], sample: 'Although the room feels more spacious, the piano...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Family Film Night', icon: '🍿', xp: 150,
  intro: {
    A1: 'Your grandparents are coming for a film night! Get the living room ready.',
    A2: 'The whole family is coming for a film night on Saturday. Make the living room cosy.',
    B1: 'You’re hosting a film night for your friends and your grandparents. Prepare the living room so everyone is comfortable.',
    B2: 'You’re organising a film night for relatives of all ages. Make the room welcoming and practical, and deal with any disagreements.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Grandma wants a comfortable seat for one. Where does she sit? Click it.', targets: ['armchair'] },
      { type: 'sort', prompt: 'Get ready: put the snacks on the coffee table and a cushion on the sofa.', props: [
        thing('f1', 'the popcorn', 'plate', '#fff3d6', ['coffee-table'], 'Put the popcorn on the coffee table.'),
        thing('f2', 'a soft cushion', 'pillow', '#9fd8c2', ['sofa', 'armchair'], 'Put the cushion on the sofa.'),
      ] },
      { type: 'choice', prompt: 'Grandpa asks: “Where is the remote control?” What do you say?', options: [
        { text: 'It’s on the coffee table.', correct: true, feedback: 'Yes! “on the coffee table”.' },
        { text: 'It’s a remote control.', correct: false, feedback: 'He wants to know WHERE it is.' },
        { text: 'I am on the coffee table.', correct: false, feedback: 'Use “It’s in/on/next to...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your living room for your grandparents.', minWords: 8, require: [livingWords(2)], sample: 'The sofa is…' },
    ],
    A2: [
      { type: 'find', prompt: 'It’s cold this evening. What can keep everyone warm? Click it.', targets: ['fireplace'] },
      { type: 'sort', prompt: 'Make the living room cosy.', props: [
        thing('f1', 'a warm blanket', 'blanket', '#c9b6e4', ['sofa', 'armchair'], 'Put a blanket on the sofa.'),
        thing('f2', 'the drinks', 'cup', '#a9c9f2', ['coffee-table'], 'Put the drinks on the coffee table.'),
        thing('f3', 'the DVD', 'box', '#5aa9e6', ['tv'], 'Put the DVD next to the TV.'),
      ] },
      { type: 'sort', prompt: 'Tidy up before everyone arrives.', props: [
        thing('f4', 'your school books', 'book', '#f28c8c', ['bookcase'], 'Put your school books in the bookcase.'),
        thing('f5', 'your trainers', 'shoes', '#ffffff', ['bookcase', 'beanbag'], 'Take your trainers off the coffee table!'),
      ] },
      { type: 'place', prompt: 'Everyone needs to see the TV: put the coffee table in front of the sofa.', checks: [{ rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }] },
      { type: 'write', prompt: 'Write an invitation to your family. Use at least 3 living room words and 2 prepositions.', minWords: 15,
        require: [livingWords(3), prepositions(2)], sample: 'Come to film night! We can sit on…' },
    ],
    B1: [
      { type: 'find', prompt: 'Grandpa can’t read the film titles in the dark. What could you turn on? Click it.', targets: ['floor-lamp'] },
      { type: 'sort', prompt: 'Make the living room welcoming.', props: [
        thing('f1', 'extra cushions', 'pillow', '#f28c8c', ['sofa', 'armchair', 'beanbag'], 'Make sure everyone has something soft to lean on.'),
        thing('f2', 'a big bowl of popcorn', 'plate', '#fff3d6', ['coffee-table'], 'Put the snacks where everyone can reach them.'),
        thing('f3', 'the film list', 'book', '#fffdf6', ['coffee-table', 'tv'], 'Leave the list of films where people can choose.'),
      ] },
      { type: 'sort', prompt: 'Put away anything that makes the room look messy.', props: [
        thing('f4', 'the pile of magazines', 'book', '#f7b2d0', ['bookcase', 'coffee-table'], 'The magazines should go on a shelf.'),
        thing('f5', 'your little brother’s toys', 'toy', '#ffd54f', ['bookcase'], 'Somebody will trip over those toys.'),
        thing('f6', 'Dad’s work laptop', 'phone', '#5b5560', ['bookcase'], 'Dad’s laptop shouldn’t be anywhere near the drinks.'),
      ] },
      { type: 'place', prompt: 'Make it safe and practical: the beanbag far from the fire and the remote on the coffee table.',
        checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }, { rel: 'onTop', a: 'remote', b: 'coffee-table' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) inviting your friends and telling them about the plan for the evening.', minWords: 35,
        require: [livingWords(3), connectors(1)], sample: 'Come round on Saturday! We’ll sit on the sofa, so...' },
    ],
    B2: [
      { type: 'find', prompt: 'Your little cousins want something to do before the film. Which instrument can they play? Click it.', targets: ['piano'] },
      { type: 'sort', prompt: 'Set the room up to a high standard.', props: [
        thing('f1', 'a throw for the sofa', 'blanket', '#c9b6e4', ['sofa'], 'Make the three-seater look inviting.'),
        thing('f2', 'snacks and drinks', 'plate', '#fff3d6', ['coffee-table'], 'Snacks should be within reach of every seat.'),
        thing('f3', 'gluten-free biscuits', 'box', '#d9a874', ['coffee-table'], 'Your aunt can’t eat gluten, so put hers with the other snacks.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing dangerous or messy is left out.', props: [
        thing('f4', 'the matches', 'box', '#f25c5c', ['fireplace'], 'Keep the matches on the mantelpiece, out of the children’s reach.'),
        thing('f5', 'the cables on the floor', 'phone', '#2f3440', ['tv'], 'Tidy the cables behind the screen so nobody trips.'),
        thing('f6', 'the fragile vase', 'cup', '#9cc7a4', ['bookcase', 'fireplace'], 'The vase should be somewhere high and stable.'),
      ] },
      { type: 'choice', prompt: 'Your grandparents want an old black-and-white film, but your cousins want a cartoon. What is the most tactful solution?', options: [
        { text: 'Watch a short cartoon first, then the classic film, and let everyone vote next time.', correct: true, feedback: 'Fair to both groups and keeps everyone happy.' },
        { text: 'Choose the cartoon because there are more children.', correct: false, feedback: 'The grandparents may feel ignored.' },
        { text: 'Cancel the film night.', correct: false, feedback: 'That doesn’t solve anything.' },
      ] },
      { type: 'write', prompt: 'Write a message (at least 55 words) to your relatives explaining the plan for the evening and how you’ll keep everyone happy.', minWords: 55,
        require: [livingWords(4), prepositions(2), advanced(1)], sample: 'Although we all like different films, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const livingRoomChapter: ChapterDefinition = {
  roomId: 'living-room',
  title: 'My Living Room',
  explore,
  challenges: [unpack, afterParty, budgetLiving],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'sofa', prompt: { A1: 'Find a seat for three people.', A2: 'Find where the family watches TV.', B1: 'Find where a guest could sleep for one night.', B2: 'Find the largest piece of seating.' } },
    { target: 'armchair', prompt: { A1: 'Find a soft chair for one.', A2: 'Find Grandpa’s reading seat.', B1: 'Find a seat with two arms for one person.', B2: 'Find the single upholstered seat.' } },
    { target: 'coffee-table', prompt: { A1: 'Find a low table.', A2: 'Find where you put your cup.', B1: 'Find where the magazines are.', B2: 'Find the low table in front of the seating.' } },
    { target: 'tv', prompt: { A1: 'Find the TV.', A2: 'Find where you watch cartoons.', B1: 'Find what you’d turn on for the news.', B2: 'Find the screen on the low unit.' } },
    { target: 'fireplace', prompt: { A1: 'Find the fire.', A2: 'Find where it is warm in winter.', B1: 'Find where you’d burn logs.', B2: 'Find the hearth with a mantelpiece.' } },
    { target: 'bookcase', prompt: { A1: 'Find the books.', A2: 'Find the tall shelves.', B1: 'Find where you’d look for a dictionary.', B2: 'Find the shelving unit full of novels.' } },
    { target: 'floor-lamp', prompt: { A1: 'Find a tall light.', A2: 'Find a lamp on the floor.', B1: 'Find what helps you read in the evening.', B2: 'Find the free-standing light.' } },
    { target: 'cushion', prompt: { A1: 'Find something small and soft.', A2: 'Find what you lean on.', B1: 'Find what makes a sofa more comfortable.', B2: 'Find the soft furnishing.' } },
    { target: 'remote', prompt: { A1: 'Find something with buttons.', A2: 'Find what changes the channel.', B1: 'Find what everybody always loses.', B2: 'Find the device for controlling the TV.' } },
    { target: 'wall-clock', prompt: { A1: 'Find the clock.', A2: 'Find what shows the time.', B1: 'Find what tells you it’s bedtime.', B2: 'Find the timepiece on the wall.' } },
    { target: 'piano', prompt: { A1: 'Find something for music.', A2: 'Find the black and white keys.', B1: 'Find where you’d practise for a concert.', B2: 'Find the upright instrument.' } },
    { target: 'beanbag', prompt: { A1: 'Find a seat on the floor.', A2: 'Find the big soft bag.', B1: 'Find where you’d sit to play video games.', B2: 'Find the shapeless seat.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }], prompt: { A1: 'Put the coffee table in front of the sofa.', B1: 'Put the coffee table where people on the sofa can reach it.', B2: 'Position the coffee table in front of the main seating.' } },
    { checks: [{ rel: 'againstWall', a: 'sofa' }], prompt: { A1: 'Put the sofa against the wall.', B1: 'Push the sofa against a wall to save space.', B2: 'Position the sofa flush against a wall.' } },
    { checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'armchair' }], prompt: { A1: 'Put the floor lamp next to the armchair.', B1: 'Give the armchair a reading light.', B2: 'Create a reading nook with the lamp beside the armchair.' } },
    { checks: [{ rel: 'onTop', a: 'remote', b: 'coffee-table' }], prompt: { A1: 'Put the remote control on the coffee table.', B1: 'Keep the remote somewhere easy to find.', B2: 'Leave the remote within reach of the seating.' } },
    { checks: [{ rel: 'onTop', a: 'cushion', b: 'sofa' }], prompt: { A1: 'Put the cushion on the sofa.', B1: 'Make the sofa more comfortable.', B2: 'Add a soft furnishing to the three-seater.' } },
    { checks: [{ rel: 'above', a: 'wall-clock', b: 'fireplace' }], prompt: { A1: 'Hang the clock above the fireplace.', B1: 'Put the clock over the mantelpiece.', B2: 'Mount the clock directly above the hearth.' } },
    { checks: [{ rel: 'againstWall', a: 'piano' }], prompt: { A1: 'Put the piano against the wall.', B1: 'Push the piano against a wall.', B2: 'Position the piano flush against a wall.' } },
    { checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }], prompt: { A1: 'Put the beanbag far from the fireplace.', B1: 'Keep the beanbag away from the fire.', B2: 'Keep the flammable beanbag at a safe distance from the fire.' } },
    { checks: [{ rel: 'inCorner', a: 'bookcase' }], prompt: { A1: 'Put the bookcase in the corner.', B1: 'Save space by moving the bookcase into a corner.', B2: 'Make use of the corner for the bookcase.' } },
    { checks: [{ rel: 'nextTo', a: 'armchair', b: 'fireplace' }], prompt: { A1: 'Put the armchair next to the fireplace.', B1: 'Put the armchair where it’s warm in winter.', B2: 'Position the armchair beside the hearth.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'furniture', label: 'Furniture', icon: '🛋️' },
      { id: 'entertainment', label: 'Fun & hobbies', icon: '🎮' },
      { id: 'cosy', label: 'Light & cosy things', icon: '🕯️' },
      { id: 'actions', label: 'Things you do', icon: '📺' },
    ],
    items: [
      { word: 'sofa', bin: 'furniture', level: 'A1' }, { word: 'armchair', bin: 'furniture', level: 'A1' },
      { word: 'coffee table', bin: 'furniture', level: 'A2' }, { word: 'bookcase', bin: 'furniture', level: 'A2' },
      { word: 'beanbag', bin: 'furniture', level: 'A2' }, { word: 'footstool', bin: 'furniture', level: 'B1' },
      { word: 'sofa bed', bin: 'furniture', level: 'B1' }, { word: 'recliner', bin: 'furniture', level: 'B2' },
      { word: 'TV', bin: 'entertainment', level: 'A1' }, { word: 'piano', bin: 'entertainment', level: 'A1' },
      { word: 'book', bin: 'entertainment', level: 'A1' }, { word: 'board game', bin: 'entertainment', level: 'A2' },
      { word: 'games console', bin: 'entertainment', level: 'A2' }, { word: 'speaker', bin: 'entertainment', level: 'A2' },
      { word: 'sheet music', bin: 'entertainment', level: 'B2' }, { word: 'magazine', bin: 'entertainment', level: 'A1' },
      { word: 'cushion', bin: 'cosy', level: 'A2' }, { word: 'floor lamp', bin: 'cosy', level: 'A2' },
      { word: 'fireplace', bin: 'cosy', level: 'A2' }, { word: 'candle', bin: 'cosy', level: 'A2' },
      { word: 'throw', bin: 'cosy', level: 'B1' }, { word: 'lampshade', bin: 'cosy', level: 'B1' },
      { word: 'rug', bin: 'cosy', level: 'A2' }, { word: 'firewood', bin: 'cosy', level: 'B1' },
      { word: 'watch TV', bin: 'actions', level: 'A1' }, { word: 'sit down', bin: 'actions', level: 'A1' },
      { word: 'play the piano', bin: 'actions', level: 'A1' }, { word: 'relax', bin: 'actions', level: 'A2' },
      { word: 'turn on', bin: 'actions', level: 'A2' }, { word: 'switch channels', bin: 'actions', level: 'B1' },
      { word: 'light a fire', bin: 'actions', level: 'B1' }, { word: 'entertain guests', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You want to watch TV. What do you do?', options: [
      { text: 'I sit on the sofa and turn on the TV.', best: true, feedback: 'Yes! Enjoy your programme.' },
      { text: 'I play the piano.', best: false, feedback: 'That’s fun, but it isn’t TV.' },
      { text: 'I sit in the fireplace.', best: false, feedback: 'Ouch! That’s hot.' },
    ] },
    { level: 'A1', situation: 'It is dark and you want to read. What do you do?', options: [
      { text: 'I turn on the floor lamp.', best: true, feedback: 'Right — now you can see.' },
      { text: 'I turn on the TV.', best: false, feedback: 'That won’t help you read.' },
      { text: 'I close my eyes.', best: false, feedback: 'You can’t read with your eyes closed!' },
    ] },
    { level: 'A1', situation: 'Your friend comes to visit. What do you say?', options: [
      { text: 'Come in! Sit down on the sofa.', best: true, feedback: 'Friendly and polite.' },
      { text: 'Sit on the floor.', best: false, feedback: 'That’s not very welcoming.' },
      { text: 'Go to the bathroom.', best: false, feedback: 'Why? Invite them to sit down!' },
    ] },
    { level: 'A2', situation: 'You can’t find the remote control. What do you do?', options: [
      { text: 'Look between the sofa cushions.', best: true, feedback: 'Good idea — it’s usually there!' },
      { text: 'Buy a new TV.', best: false, feedback: 'That’s very expensive.' },
      { text: 'Shout at your brother.', best: false, feedback: 'Ask nicely first.' },
    ] },
    { level: 'A2', situation: 'Your little sister is watching TV very close to the screen. What do you say?', options: [
      { text: 'Please sit on the sofa — it’s better for your eyes.', best: true, feedback: 'Kind and sensible.' },
      { text: 'Turn the TV off forever!', best: false, feedback: 'That’s too strict.' },
      { text: 'Say nothing.', best: false, feedback: 'Sitting so close isn’t good for her eyes.' },
    ] },
    { level: 'A2', situation: 'The living room is cold in winter. What can you do?', options: [
      { text: 'Light the fire and put a blanket on the sofa.', best: true, feedback: 'Warm and cosy.' },
      { text: 'Open all the windows.', best: false, feedback: 'It will get even colder!' },
      { text: 'Sit on the piano.', best: false, feedback: 'That won’t warm you up.' },
    ] },
    { level: 'B1', situation: 'Your family argue every evening about what to watch on TV. How would you solve it?', options: [
      { text: 'Make a weekly plan so everyone chooses on different nights.', best: true, feedback: 'Fair and it stops the daily arguments.' },
      { text: 'Hide the remote control.', best: false, feedback: 'That will start a new argument.' },
      { text: 'Always let the oldest person decide.', best: false, feedback: 'The others won’t think that’s fair.' },
    ], reasons: [
      { text: 'Because everybody gets a turn.', correct: true },
      { text: 'Because TV is bad.', correct: false },
      { text: 'Because it is the cheapest option.', correct: false },
    ] },
    { level: 'B1', situation: 'Your younger brother wants to put his beanbag right next to the fire. What would you do?', options: [
      { text: 'Explain that it could catch fire and help him find a safer spot.', best: true, feedback: 'He stays safe and understands why.' },
      { text: 'Let him, it’s his beanbag.', best: false, feedback: 'It’s really dangerous.' },
      { text: 'Take the beanbag away and say nothing.', best: false, feedback: 'He won’t learn why it’s dangerous.' },
    ], reasons: [
      { text: 'Because he learns a safety rule he can use for life.', correct: true },
      { text: 'Because beanbags are expensive.', correct: false },
    ] },
    { level: 'B2', situation: 'Your family spends every evening looking at screens and hardly talks. What would you suggest?', options: [
      { text: 'Suggest one screen-free evening a week with board games or music.', best: true, feedback: 'Realistic, positive and it brings people together.' },
      { text: 'Throw the TV away.', best: false, feedback: 'Too extreme — nobody will agree.' },
      { text: 'Watch even more TV yourself.', best: false, feedback: 'That makes the problem worse.' },
    ], write: { prompt: 'Justify your suggestion, considering how each family member might react.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'The living room is too small for everyone when relatives visit. What would you suggest to your parents?', options: [
      { text: 'Replace the big armchair with a sofa bed and folding chairs.', best: true, feedback: 'A flexible, well-reasoned solution.' },
      { text: 'Stop inviting relatives.', best: false, feedback: 'That’s not a kind solution.' },
      { text: 'Move to a bigger house.', best: false, feedback: 'Far too expensive for this problem.' },
    ], write: { prompt: 'Explain your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'We watch TV in the living room.', level: 'A1' },
    { text: 'The sofa is very comfortable.', level: 'A1' },
    { text: 'My sister plays the piano.', level: 'A1' },
    { text: 'The books are in the bookcase.', level: 'A1' },
    { text: 'The cat is on the cushion.', level: 'A1' },
    { text: 'I sit on the beanbag.', level: 'A1' },
    { text: 'The coffee table is in front of the sofa.', level: 'A2' },
    { text: 'Where is the remote control?', level: 'A2' },
    { text: 'The clock is above the fireplace.', level: 'A2' },
    { text: 'Grandpa reads in his armchair every evening.', level: 'A2' },
    { text: 'Turn on the floor lamp, please.', level: 'A2' },
    { text: 'The TV is opposite the sofa.', level: 'A2' },
    { text: 'Could you turn the volume down, please?', level: 'B1' },
    { text: 'We light the fire when it gets cold.', level: 'B1' },
    { text: 'The living room feels cosy in the evening.', level: 'B1' },
    { text: 'Keep the beanbag away from the fire.', level: 'B1' },
    { text: 'Although the room is small, it feels spacious.', level: 'B2' },
    { text: 'A screen-free evening brings the family together.', level: 'B2' },
    { text: 'The armchair has been moved closer to the window.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The cushion is ___ the sofa.', answer: 'on', options: ['on', 'in', 'under'], level: 'A1' },
    { sentence: 'The books are ___ the bookcase.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The cat is sleeping ___ the coffee table.', answer: 'under', options: ['under', 'in', 'at'], level: 'A1' },
    { sentence: 'The floor lamp is ___ the armchair.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The clock is ___ the fireplace.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The coffee table is ___ the sofa and the TV.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The coffee table is ___ front of the sofa.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'The TV is ___ the sofa, on the other side of the room.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'The piano stands ___ the wall.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'The photos are ___ the mantelpiece.', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'The remote fell down ___ the cushions.', answer: 'behind', options: ['behind', 'over', 'onto'], level: 'B1' },
    { sentence: 'We sat ___ the fire all evening.', answer: 'by', options: ['by', 'at', 'on'], level: 'B2' },
    { sentence: 'Keep the matches ___ of reach of children.', answer: 'out', options: ['out', 'off', 'away'], level: 'B2' },
  ],
};
