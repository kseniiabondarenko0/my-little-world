import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  ENTRANCE CHAPTER — all missions, mini-game content and practice sentences.
//  The entrance is the front porch outside the house. Same shape as the other rooms.
//
//  Furniture ids you can use: doormat (rug), letterbox, doorbell, porch-light, house-number (all on
//  the wall), garden-bench, flowerpot, wheelie-bin, garden-gnome, parcel, watering-can, wellies (small)
//
//  Surfaces (small things can stand ON them): garden-bench
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const ENTRANCE_WORDS = ['entrance', 'front door', 'door', 'doormat', 'mat', 'letterbox', 'doorbell', 'bell', 'bench', 'garden bench', 'flowerpot', 'flowers',
  'wheelie bin', 'bin', 'porch light', 'light', 'house number', 'number', 'parcel', 'watering can', 'wellies', 'gnome', 'garden', 'path', 'porch', 'letter'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'outside', 'below', 'in', 'by'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const entranceWords = (count: number): WordRequirement => ({ label: 'entrance words', words: ENTRANCE_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects at your entrance.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('visitors', 'Hello, visitor!', '🔔', {
    A1: 'Find two things a visitor uses at the door.',
    A2: 'Find what a visitor presses and what they wipe their feet on.',
    B1: 'Find two things a polite guest uses before coming in.',
    B2: 'Identify two items a visitor interacts with on arrival.',
  }, ['doorbell', 'doormat'], 2),
  findMission('post', 'You’ve got mail', '📮', {
    A1: 'Find two things the postman brings or uses.',
    A2: 'Find where letters go and what came today.',
    B1: 'Find where the post goes and the delivery that arrived this morning.',
    B2: 'Identify the post receptacle and today’s delivery.',
  }, ['letterbox', 'parcel'], 2),
  findMission('find-house', 'Find our house', '🏠', {
    A1: 'Find two things that help people find your house at night.',
    A2: 'Find the number and the light.',
    B1: 'Find two things that help a taxi driver find your door in the dark.',
    B2: 'Identify two features that make the house easy to locate at night.',
  }, ['house-number', 'porch-light'], 2),
  findMission('garden-jobs', 'Garden jobs', '🌸', {
    A1: 'Find two things for the flowers.',
    A2: 'Find the flowers and what you water them with.',
    B1: 'Find two things you’d need on a hot, dry day in the garden.',
    B2: 'Identify the planter and the equipment for watering it.',
  }, ['flowerpot', 'watering-can'], 2),
  findMission('rubbish-day', 'Rubbish day', '🗑️', {
    A1: 'Find the big bin.',
    A2: 'Find what you take to the street on Monday.',
    B1: 'Find what the rubbish collectors empty every week.',
    B2: 'Find the bin on wheels.',
  }, ['wheelie-bin']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Spring at the Door', icon: '🌷', xp: 60,
  intro: {
    A1: 'It’s spring! You bought new things for the front of the house. Put everything in the right place.',
    A2: 'Spring is here and you want the entrance to look nice. Open the bags and put things away.',
    B1: 'You’re giving the entrance a spring refresh. Read the labels and decide where everything goes.',
    B2: 'The garden centre’s labels are rather vague. Work out where each purchase belongs.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a bag to open it. Then click where the thing goes.', props: [
      box('u1', 'flowers', ['flowerpot']),
      box('u2', 'a new light bulb', ['porch-light']),
      box('u3', 'rubbish bags', ['wheelie-bin']),
      box('u4', 'a cushion for the seat', ['garden-bench']),
      box('u5', 'a new battery for the bell', ['doorbell']),
      box('u6', 'a sticker: “No junk mail”', ['letterbox']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each bag and put the things where they belong.', props: [
      box('u1', 'red and yellow flowers', ['flowerpot']),
      box('u2', 'a brighter light bulb', ['porch-light']),
      box('u3', 'bin bags', ['wheelie-bin']),
      box('u4', 'a seat cushion', ['garden-bench']),
      box('u5', 'a battery for the bell', ['doorbell']),
      box('u6', 'a name sign for the post', ['letterbox']),
      box('u7', 'new shiny numbers', ['house-number']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'plants that like sun', ['flowerpot']),
      box('u2', 'something to help visitors see at night', ['porch-light']),
      box('u3', 'something for rubbish day', ['wheelie-bin']),
      box('u4', 'something to make the seat comfy', ['garden-bench']),
      box('u5', 'something so the bell works again', ['doorbell']),
      box('u6', 'a sign that says who lives here', ['letterbox']),
      box('u7', 'numbers you can see from the street', ['house-number']),
      box('u8', 'compost', ['flowerpot']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'drought-tolerant perennials', ['flowerpot']),
      box('u2', 'an energy-saving bulb', ['porch-light']),
      box('u3', 'compostable bin liners', ['wheelie-bin']),
      box('u4', 'a weatherproof seat pad', ['garden-bench']),
      box('u5', 'a replacement chime unit', ['doorbell']),
      box('u6', 'a “No cold callers” notice', ['letterbox']),
      box('u7', 'reflective house numerals', ['house-number']),
      box('u8', 'slow-release fertiliser', ['flowerpot']),
    ] }],
  },
};

const deliveryDay: MissionDefinition = {
  id: 'delivery-day', title: 'Busy Delivery Day', icon: '🚚', xp: 60,
  intro: {
    A1: 'Lots of people come to the door today! Help everyone.',
    A2: 'You’re home alone on a busy morning and lots of deliveries arrive. Follow Mum’s note.',
    B1: 'It’s the day before your sister’s birthday and deliveries keep arriving. Read Mum’s note and sort things out.',
    B2: 'Your parents are away and you’re in charge of a chaotic morning of deliveries and visitors. Follow Mum’s note.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the letters', 'book', '#ffffff', ['letterbox'], 'Put the letters in the letterbox.'),
      thing('m2', 'the rubbish bag', 'box', '#2f3440', ['wheelie-bin'], 'Put the rubbish bag in the wheelie bin.'),
      thing('m3', 'the new flowers', 'cup', '#f28c8c', ['flowerpot'], 'Put the flowers in the flowerpot.'),
      thing('m4', 'the big box', 'box', '#d6b07a', ['garden-bench'], 'Put the box on the garden bench.'),
      thing('m5', 'the muddy boots', 'shoes', '#9c7150', ['doormat'], 'Put the muddy boots on the doormat.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'Ding-dong! Somebody is at the door. What did they press? Click it.', targets: ['doorbell'] },
      { type: 'sort', prompt: 'Follow Mum’s note.', props: [
        thing('m1', 'the magazines', 'book', '#f7b2d0', ['letterbox'], 'Put the magazines in the letterbox for later.'),
        thing('m2', 'the empty bottles', 'bottle', '#9fd8c2', ['wheelie-bin'], 'Put the bottles in the bin.'),
        thing('m3', 'the parcel for next door', 'box', '#d6b07a', ['garden-bench'], 'Leave the neighbour’s parcel on the bench.'),
        thing('m4', 'your wet boots', 'shoes', '#f2c46d', ['doormat'], 'Leave your wet boots on the doormat.'),
        thing('m5', 'the watering can', 'bottle', '#5aa9e6', ['flowerpot'], 'Put the watering can next to the flowers.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'The delivery driver can’t find number 7. What should be easy to see? Click it.', targets: ['house-number'] },
      { type: 'sort', prompt: 'Read Mum’s note and put everything in its place.', props: [
        thing('m1', 'the birthday cards', 'book', '#f7b2d0', ['letterbox'], 'Hide the cards where your sister won’t look — with the post.'),
        thing('m2', 'the wrapping paper rubbish', 'box', '#f2c46d', ['wheelie-bin'], 'The wrapping paper should go out before she sees it!'),
        thing('m3', 'the cake box', 'box', '#ffffff', ['garden-bench'], 'Keep the cake off the ground until I’m home.'),
        thing('m4', 'the balloons', 'toy', '#f28c8c', ['garden-bench', 'flowerpot'], 'Tie the balloons where guests will see them.'),
        thing('m5', 'Dad’s muddy wellies', 'shoes', '#3f7d4e', ['doormat'], 'Dad’s wellies stay outside the door.'),
      ] },
      { type: 'choice', prompt: 'A delivery driver asks you to sign for a parcel for your neighbour. What do you say?', options: [
        { text: 'Sure, I’ll sign and give it to her later.', correct: true, feedback: 'Helpful and clear.' },
        { text: 'No. Go away.', correct: false, feedback: 'That’s not very neighbourly.' },
        { text: 'Can I open it?', correct: false, feedback: 'It isn’t your parcel!' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A delivery arrives after dark and the driver nearly trips on the steps. What should have been switched on? Click it.', targets: ['porch-light'] },
      { type: 'sort', prompt: 'Mum’s note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'the council tax letter', 'book', '#ffffff', ['letterbox'], 'Don’t let the important post blow away.'),
        thing('m2', 'the flattened cardboard', 'box', '#d6b07a', ['wheelie-bin'], 'Recycling day is tomorrow — make sure it’s ready.'),
        thing('m3', 'the neighbour’s fragile parcel', 'box', '#c9b6e4', ['garden-bench'], 'Fragile things shouldn’t be left on the ground.'),
        thing('m4', 'the dripping wellies', 'shoes', '#f2c46d', ['doormat'], 'The hall carpet doesn’t need any more mud.'),
        thing('m5', 'the seedlings', 'cup', '#6fae6a', ['flowerpot'], 'The seedlings need planting before they dry out.'),
        thing('m6', 'the watering can', 'bottle', '#5aa9e6', ['garden-bench', 'flowerpot'], 'Don’t leave it in the middle of the path.'),
      ] },
      { type: 'write', prompt: 'Write a short, polite note to the delivery company asking them to stop leaving parcels on the street. Explain why.', minWords: 35,
        require: [entranceWords(2), connectors(1), advanced(1)], sample: 'Although I appreciate your quick deliveries, ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'bench', name: 'Garden bench', description: 'A wooden bench for two. It takes a lot of space.', price: 50, tags: ['sit', 'big'] },
  { id: 'chair', name: 'Folding chair', description: 'A small chair you can fold away.', price: 15, tags: ['sit'] },
  { id: 'big-pots', name: 'Three big flowerpots', description: 'Lots of flowers. Heavy and big.', price: 40, tags: ['pretty', 'big'] },
  { id: 'small-pot', name: 'Small flowerpot', description: 'One pot of flowers.', price: 10, tags: ['pretty'] },
  { id: 'light', name: 'Porch light', description: 'A bright light by the door.', price: 25, tags: ['light'] },
  { id: 'solar', name: 'Solar lights', description: 'Small lights for the path. Not very bright.', price: 12, tags: ['light'] },
  { id: 'mat', name: 'Doormat', description: 'Clean shoes, clean house.', price: 8, tags: ['clean'] },
  { id: 'camera', name: 'Video doorbell', description: 'See who is at the door on your phone. Expensive.', price: 45, tags: ['safe'] },
  { id: 'sign', name: 'House number sign', description: 'Big numbers that are easy to see.', price: 10, tags: ['safe'] },
  { id: 'gnome', name: 'Garden gnome', description: 'Just for fun.', price: 6, tags: ['extra'] },
];

const budgetEntrance: MissionDefinition = {
  id: 'budget-entrance', title: 'Entrance on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your grandma has a new house. The front door area is empty. Help her buy things.',
    A2: 'Your grandma has just moved into a little house and the entrance looks sad. She doesn’t have much money.',
    B1: 'Your grandma’s front porch is very small. Choose things that fit the space and the budget.',
    B2: 'You’re helping your grandmother improve a tiny front porch on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. Grandma needs a light and something pretty.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['light', 'solar', 'big-pots', 'small-pot', 'camera'].includes(i.id)),
        needs: [{ tag: 'light', label: 'light' }, { tag: 'pretty', label: 'something pretty' }] },
      { type: 'place', prompt: 'Now at YOUR entrance: put the flowerpot next to the garden bench.', checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. Grandma needs a seat, a light and a clean doorstep.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['camera', 'sign'].includes(i.id)),
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'light', label: 'light' }, { tag: 'clean', label: 'clean shoes' }] },
      { type: 'place', prompt: 'Now at YOUR entrance: put the parcel on the garden bench.', checks: [{ rel: 'onTop', a: 'parcel', b: 'garden-bench' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The porch is tiny, so choose only ONE big item. Grandma needs a seat, light, something pretty and a clean doorstep.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'light', label: 'light' }, { tag: 'pretty', label: 'something pretty' }, { tag: 'clean', label: 'clean shoes' }] },
      { type: 'write', prompt: 'Write a short message to Grandma explaining what you bought and why.', minWords: 25,
        require: [entranceWords(2), connectors(1)], sample: 'I bought a folding chair because the porch is small, and...' },
      { type: 'place', prompt: 'Now at YOUR entrance: put the wheelie bin in a corner.', checks: [{ rel: 'inCorner', a: 'wheelie-bin' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. Grandma needs a seat, light, something pretty, a clean doorstep and to feel safe.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'seat' }, { tag: 'light', label: 'light' }, { tag: 'pretty', label: 'decoration' }, { tag: 'clean', label: 'clean shoes' }, { tag: 'safe', label: 'safety' }] },
      { type: 'write', prompt: 'Justify your choices to Grandma. Mention one option you rejected and why.', minWords: 45,
        require: [entranceWords(3), connectors(1), advanced(1)], sample: 'I chose solar lights instead of a porch light because...' },
      { type: 'place', prompt: 'Now at YOUR entrance: keep the bin away from the seating — the wheelie bin far from the garden bench.',
        checks: [{ rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }] },
    ],
  },
};

// ── STAGE 5: ENTRANCE MAKEOVER ─────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Entrance Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your entrance nice! Read and move the things. Then press Check.',
    A2: 'Time for an entrance makeover! Follow the instructions and move the real things.',
    B1: 'Give your entrance a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A garden designer has sent you a brief. Interpret it and rearrange your entrance accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the garden bench against the wall.', checks: [{ rel: 'againstWall', a: 'garden-bench' }] },
      { type: 'place', prompt: 'Put the flowerpot next to the garden bench.', checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Put the wheelie bin in the corner.', checks: [{ rel: 'inCorner', a: 'wheelie-bin' }] },
      { type: 'place', prompt: 'Put the watering can on the garden bench.', checks: [{ rel: 'onTop', a: 'watering-can', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Put the gnome next to the flowerpot.', checks: [{ rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the garden bench against the wall and the parcel on it.',
        checks: [{ rel: 'againstWall', a: 'garden-bench' }, { rel: 'onTop', a: 'parcel', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Hang the porch light above the garden bench.', checks: [{ rel: 'above', a: 'porch-light', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Put the flowerpot next to the bench and the gnome next to the flowerpot.',
        checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }, { rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }] },
      { type: 'place', prompt: 'Put the wheelie bin in the corner.', checks: [{ rel: 'inCorner', a: 'wheelie-bin' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a welcoming seat: garden bench against a wall with the porch light above it.',
        checks: [{ rel: 'againstWall', a: 'garden-bench' }, { rel: 'above', a: 'porch-light', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Nobody wants to sit next to rubbish: keep the wheelie bin far from the bench.',
        checks: [{ rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Add some colour: the flowerpot next to the bench.', checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Keep wet boots off the path: put the wellies next to the doormat.', checks: [{ rel: 'nextTo', a: 'wellies', b: 'doormat' }] },
      { type: 'write', prompt: 'Describe your new entrance in 3–4 sentences. Say where things are.', minWords: 25,
        require: [entranceWords(3), prepositions(2)], sample: 'The bench is against the wall...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create an inviting seating spot: bench against a wall, porch light above it, flowerpot beside it.',
        checks: [{ rel: 'againstWall', a: 'garden-bench' }, { rel: 'above', a: 'porch-light', b: 'garden-bench' }, { rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Keep the bin discreet: wheelie bin in a corner, well away from the bench.',
        checks: [{ rel: 'inCorner', a: 'wheelie-bin' }, { rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Add a playful touch: the gnome beside the flowerpot.', checks: [{ rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what is still not ideal, and why?', minWords: 45,
        require: [entranceWords(3), prepositions(2), advanced(1)], sample: 'Although the porch is small, the bench now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'House-Warming Party', icon: '🎈', xp: 150,
  intro: {
    A1: 'The whole house is ready! Your friends are coming to a party. Make the entrance welcoming.',
    A2: 'You’re having a house-warming party tonight. Get the entrance ready for your guests.',
    B1: 'Your family is throwing a house-warming party for the neighbours. Make a great first impression at the door.',
    B2: 'You’re hosting a house-warming party for neighbours, friends and family. Make the entrance welcoming, safe and easy to find after dark.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Your friends arrive. What do they press? Click it.', targets: ['doorbell'] },
      { type: 'sort', prompt: 'Get ready: put the balloons on the bench and the rubbish in the bin.', props: [
        thing('f1', 'the balloons', 'toy', '#f28c8c', ['garden-bench'], 'Put the balloons on the bench.'),
        thing('f2', 'the rubbish', 'box', '#2f3440', ['wheelie-bin'], 'Put the rubbish in the wheelie bin.'),
      ] },
      { type: 'choice', prompt: 'Your friend asks: “Which house is yours?” What do you say?', options: [
        { text: 'It’s number seven, with the red letterbox.', correct: true, feedback: 'Yes! Easy to find.' },
        { text: 'It’s a house.', correct: false, feedback: 'They need more information!' },
        { text: 'I am number seven.', correct: false, feedback: 'Your HOUSE is number seven.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your entrance.', minWords: 8, require: [entranceWords(2)], sample: 'The flowerpot is…' },
    ],
    A2: [
      { type: 'find', prompt: 'The party starts at 8 p.m. and it will be dark. What do you turn on? Click it.', targets: ['porch-light'] },
      { type: 'sort', prompt: 'Make the entrance nice.', props: [
        thing('f1', 'a “Welcome” sign', 'book', '#fff3a3', ['garden-bench', 'letterbox'], 'Put the welcome sign on the bench.'),
        thing('f2', 'new flowers', 'cup', '#ffd54f', ['flowerpot'], 'Put the new flowers in the flowerpot.'),
        thing('f3', 'the old newspapers', 'book', '#e8e2d4', ['wheelie-bin'], 'Put the old newspapers in the bin.'),
      ] },
      { type: 'place', prompt: 'Guests will sit outside: put the garden bench against the wall.', checks: [{ rel: 'againstWall', a: 'garden-bench' }] },
      { type: 'write', prompt: 'Write an invitation to your party. Use at least 3 entrance words and 2 prepositions.', minWords: 15,
        require: [entranceWords(3), prepositions(2)], sample: 'Come to my party! Our house is number…' },
    ],
    B1: [
      { type: 'find', prompt: 'A neighbour brings flowers as a gift. Where can you put them outside? Click it.', targets: ['flowerpot'] },
      { type: 'sort', prompt: 'Make the entrance welcoming.', props: [
        thing('f1', 'fairy lights', 'phone', '#fff3d6', ['garden-bench', 'flowerpot'], 'Add some sparkle where guests will see it.'),
        thing('f2', 'a basket of slippers', 'box', '#c9b6e4', ['doormat', 'garden-bench'], 'Guests can change their shoes at the door.'),
        thing('f3', 'a jug of lemonade', 'bottle', '#ffd54f', ['garden-bench'], 'Offer drinks to people waiting outside.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks messy.', props: [
        thing('f4', 'the recycling', 'box', '#9fd8c2', ['wheelie-bin'], 'The recycling shouldn’t be on the doorstep.'),
        thing('f5', 'your muddy wellies', 'shoes', '#3f7d4e', ['doormat'], 'Muddy boots in the middle of the path look terrible.'),
        thing('f6', 'the watering can', 'bottle', '#5aa9e6', ['flowerpot', 'garden-bench'], 'Someone could trip over it.'),
      ] },
      { type: 'place', prompt: 'Make it safe and welcoming: porch light above the bench and the bin far from it.',
        checks: [{ rel: 'above', a: 'porch-light', b: 'garden-bench' }, { rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) inviting your neighbours and telling them how to find your house.', minWords: 35,
        require: [entranceWords(3), connectors(1)], sample: 'Please come to our house-warming! We’re at number 7, so...' },
    ],
    B2: [
      { type: 'find', prompt: 'Some guests have never been here and will arrive by taxi after dark. What must be clearly visible from the street? Click it.', targets: ['house-number'] },
      { type: 'sort', prompt: 'Set up the entrance to a high standard.', props: [
        thing('f1', 'lanterns', 'cup', '#fff3d6', ['garden-bench', 'flowerpot'], 'Light the way so nobody trips on the path.'),
        thing('f2', 'a guest book', 'book', '#c9b6e4', ['garden-bench'], 'Guests can leave a message on their way in.'),
        thing('f3', 'potted herbs as gifts', 'cup', '#6fae6a', ['garden-bench', 'flowerpot'], 'Each guest takes a little pot home.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unsafe or unsightly is left out.', props: [
        thing('f4', 'the overflowing rubbish', 'box', '#2f3440', ['wheelie-bin'], 'The bin lid must close properly.'),
        thing('f5', 'garden tools', 'phone', '#8f99a3', ['wheelie-bin', 'garden-bench'], 'Sharp tools shouldn’t be lying near the path.'),
        thing('f6', 'wet wellies', 'shoes', '#f2c46d', ['doormat'], 'Boots belong by the mat, not on the steps.'),
      ] },
      { type: 'choice', prompt: 'One neighbour complains that the party will be too noisy. What is the most tactful response?', options: [
        { text: 'Invite them, promise to keep the music down after 10 p.m. and give them your number.', correct: true, feedback: 'Respectful, practical and neighbourly.' },
        { text: 'Tell them it’s your house and you’ll do what you like.', correct: false, feedback: 'That will start a long argument.' },
        { text: 'Cancel the party.', correct: false, feedback: 'There’s a better compromise.' },
      ] },
      { type: 'write', prompt: 'Write a note (at least 55 words) for your neighbours: invite them, explain the plans, and reassure them about noise and parking.', minWords: 55,
        require: [entranceWords(3), prepositions(2), advanced(1)], sample: 'Although we’re planning a party on Saturday, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const entranceChapter: ChapterDefinition = {
  roomId: 'entrance',
  title: 'My Entrance',
  explore,
  challenges: [unpack, deliveryDay, budgetEntrance],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'doormat', prompt: { A1: 'Find the mat.', A2: 'Find where you wipe your feet.', B1: 'Find what keeps mud out of the house.', B2: 'Find the coir mat on the doorstep.' } },
    { target: 'letterbox', prompt: { A1: 'Find where letters go.', A2: 'Find the red box for post.', B1: 'Find what the postman opens every morning.', B2: 'Find the post receptacle.' } },
    { target: 'doorbell', prompt: { A1: 'Find the bell.', A2: 'Find what visitors press.', B1: 'Find what goes “ding-dong”.', B2: 'Find the chime button.' } },
    { target: 'garden-bench', prompt: { A1: 'Find a seat outside.', A2: 'Find the wooden bench.', B1: 'Find where you’d wait in the sun.', B2: 'Find the outdoor seating.' } },
    { target: 'flowerpot', prompt: { A1: 'Find the flowers.', A2: 'Find the pot of flowers.', B1: 'Find what needs water every day in summer.', B2: 'Find the terracotta planter.' } },
    { target: 'wheelie-bin', prompt: { A1: 'Find the big bin.', A2: 'Find the bin with wheels.', B1: 'Find what goes to the street on rubbish day.', B2: 'Find the refuse container.' } },
    { target: 'porch-light', prompt: { A1: 'Find a light outside.', A2: 'Find the light by the door.', B1: 'Find what helps visitors at night.', B2: 'Find the exterior wall light.' } },
    { target: 'house-number', prompt: { A1: 'Find a number.', A2: 'Find the number of the house.', B1: 'Find what helps the postman find you.', B2: 'Find the house numeral.' } },
    { target: 'parcel', prompt: { A1: 'Find a box.', A2: 'Find what came in the post.', B1: 'Find the delivery.', B2: 'Find the package awaiting collection.' } },
    { target: 'watering-can', prompt: { A1: 'Find something for water.', A2: 'Find what you water flowers with.', B1: 'Find what you need on a hot, dry day.', B2: 'Find the can with a spout.' } },
    { target: 'wellies', prompt: { A1: 'Find the boots.', A2: 'Find the yellow rubber boots.', B1: 'Find what you wear in muddy puddles.', B2: 'Find the wellington boots.' } },
    { target: 'garden-gnome', prompt: { A1: 'Find the little man.', A2: 'Find the gnome with a red hat.', B1: 'Find the funny statue.', B2: 'Find the ornamental figure.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'againstWall', a: 'garden-bench' }], prompt: { A1: 'Put the garden bench against the wall.', B1: 'Push the bench against the house.', B2: 'Position the bench flush against the wall.' } },
    { checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }], prompt: { A1: 'Put the flowerpot next to the bench.', B1: 'Add colour beside the bench.', B2: 'Position the planter beside the bench.' } },
    { checks: [{ rel: 'above', a: 'porch-light', b: 'garden-bench' }], prompt: { A1: 'Hang the porch light above the bench.', B1: 'Light up the seat for the evening.', B2: 'Mount the light directly above the bench.' } },
    { checks: [{ rel: 'inCorner', a: 'wheelie-bin' }], prompt: { A1: 'Put the wheelie bin in the corner.', B1: 'Hide the bin in a corner.', B2: 'Tuck the bin discreetly into a corner.' } },
    { checks: [{ rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }], prompt: { A1: 'Put the wheelie bin far from the bench.', B1: 'Keep the smelly bin away from the seat.', B2: 'Keep the bin at a distance from the seating.' } },
    { checks: [{ rel: 'onTop', a: 'parcel', b: 'garden-bench' }], prompt: { A1: 'Put the parcel on the bench.', B1: 'Keep the parcel off the wet ground.', B2: 'Place the parcel on the bench.' } },
    { checks: [{ rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }], prompt: { A1: 'Put the gnome next to the flowerpot.', B1: 'Let the gnome guard the flowers.', B2: 'Position the gnome beside the planter.' } },
    { checks: [{ rel: 'onTop', a: 'watering-can', b: 'garden-bench' }], prompt: { A1: 'Put the watering can on the bench.', B1: 'Keep the watering can off the path.', B2: 'Leave the watering can on the bench.' } },
    { checks: [{ rel: 'nextTo', a: 'wellies', b: 'doormat' }], prompt: { A1: 'Put the wellies next to the doormat.', B1: 'Leave the boots by the mat.', B2: 'Store the wellies beside the doormat.' } },
    { checks: [{ rel: 'above', a: 'house-number', b: 'flowerpot' }], prompt: { A1: 'Hang the house number above the flowerpot.', B1: 'Put the number where people look — above the flowers.', B2: 'Mount the numeral above the planter.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'door', label: 'At the door', icon: '🚪' },
      { id: 'garden', label: 'Garden', icon: '🌸' },
      { id: 'people', label: 'People & post', icon: '📮' },
      { id: 'actions', label: 'Things you do', icon: '🔔' },
    ],
    items: [
      { word: 'doormat', bin: 'door', level: 'A2' }, { word: 'doorbell', bin: 'door', level: 'A1' },
      { word: 'front door', bin: 'door', level: 'A1' }, { word: 'porch light', bin: 'door', level: 'A2' },
      { word: 'house number', bin: 'door', level: 'A1' }, { word: 'lock', bin: 'door', level: 'A2' },
      { word: 'doorstep', bin: 'door', level: 'B1' }, { word: 'porch', bin: 'door', level: 'B1' },
      { word: 'flower', bin: 'garden', level: 'A1' }, { word: 'flowerpot', bin: 'garden', level: 'A2' },
      { word: 'watering can', bin: 'garden', level: 'A2' }, { word: 'garden gnome', bin: 'garden', level: 'A2' },
      { word: 'path', bin: 'garden', level: 'A2' }, { word: 'fence', bin: 'garden', level: 'A2' },
      { word: 'hedge', bin: 'garden', level: 'B1' }, { word: 'soil', bin: 'garden', level: 'B1' },
      { word: 'postman', bin: 'people', level: 'A2' }, { word: 'letter', bin: 'people', level: 'A1' },
      { word: 'parcel', bin: 'people', level: 'A1' }, { word: 'visitor', bin: 'people', level: 'A2' },
      { word: 'neighbour', bin: 'people', level: 'A2' }, { word: 'letterbox', bin: 'people', level: 'A2' },
      { word: 'delivery driver', bin: 'people', level: 'B1' }, { word: 'security camera', bin: 'people', level: 'B1' },
      { word: 'knock', bin: 'actions', level: 'A1' }, { word: 'ring the doorbell', bin: 'actions', level: 'A1' },
      { word: 'open the door', bin: 'actions', level: 'A1' }, { word: 'wipe your feet', bin: 'actions', level: 'A2' },
      { word: 'water the plants', bin: 'actions', level: 'A2' }, { word: 'lock the door', bin: 'actions', level: 'A2' },
      { word: 'sign for', bin: 'actions', level: 'B1' }, { word: 'trim', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You come home. Your shoes are muddy. What do you do?', options: [
      { text: 'I wipe my feet on the doormat.', best: true, feedback: 'Yes! The house stays clean.' },
      { text: 'I run inside.', best: false, feedback: 'Mud everywhere!' },
      { text: 'I put my shoes in the letterbox.', best: false, feedback: 'That’s for letters!' },
    ] },
    { level: 'A1', situation: 'You visit your friend. What do you do at the door?', options: [
      { text: 'I ring the doorbell.', best: true, feedback: 'Perfect!' },
      { text: 'I climb in the window.', best: false, feedback: 'That’s very strange!' },
      { text: 'I sit on the wheelie bin.', best: false, feedback: 'Your friend won’t know you’re there.' },
    ] },
    { level: 'A1', situation: 'The flowers are dry. What do you do?', options: [
      { text: 'I water them with the watering can.', best: true, feedback: 'They’ll be happy now.' },
      { text: 'I put them in the bin.', best: false, feedback: 'They just need water!' },
      { text: 'I give them to the gnome.', best: false, feedback: 'The gnome can’t help.' },
    ] },
    { level: 'A2', situation: 'You are home alone and somebody you don’t know rings the doorbell. What do you do?', options: [
      { text: 'Don’t open the door. Ask who it is or call a parent.', best: true, feedback: 'Safe and sensible.' },
      { text: 'Open the door and let them in.', best: false, feedback: 'Not safe when you don’t know them.' },
      { text: 'Hide under the bed for an hour.', best: false, feedback: 'You can simply talk through the door.' },
    ] },
    { level: 'A2', situation: 'It’s Monday and the bins are collected today. What do you do?', options: [
      { text: 'Take the wheelie bin to the street.', best: true, feedback: 'Right — otherwise it stays full all week.' },
      { text: 'Put more rubbish on the doormat.', best: false, feedback: 'That’s disgusting!' },
      { text: 'Forget about it.', best: false, feedback: 'The bin will overflow.' },
    ] },
    { level: 'A2', situation: 'A parcel for your neighbour comes to your house. What do you do?', options: [
      { text: 'Keep it safe and take it to your neighbour later.', best: true, feedback: 'Kind and helpful.' },
      { text: 'Open it.', best: false, feedback: 'It isn’t yours!' },
      { text: 'Leave it in the rain.', best: false, feedback: 'It might get wet and broken.' },
    ] },
    { level: 'B1', situation: 'Visitors often can’t find your house at night. How would you solve it?', options: [
      { text: 'Fit a brighter porch light and bigger house numbers.', best: true, feedback: 'Simple and effective.' },
      { text: 'Stand outside every evening and wave.', best: false, feedback: 'Not very practical!' },
      { text: 'Stop inviting people in the evening.', best: false, feedback: 'That’s a sad solution.' },
    ], reasons: [
      { text: 'Because people can see the number and the door in the dark.', correct: true },
      { text: 'Because lights are cheap.', correct: false },
      { text: 'Because neighbours like it.', correct: false },
    ] },
    { level: 'B1', situation: 'Your neighbour’s wheelie bin always blocks your path. What would you do?', options: [
      { text: 'Talk to them politely and suggest a better place for it.', best: true, feedback: 'Friendly and it solves the problem.' },
      { text: 'Push the bin into the road.', best: false, feedback: 'That could cause an accident.' },
      { text: 'Complain about them on social media.', best: false, feedback: 'That won’t make things better.' },
    ], reasons: [
      { text: 'Because good neighbours talk to each other.', correct: true },
      { text: 'Because bins are heavy.', correct: false },
    ] },
    { level: 'B2', situation: 'Parcels keep disappearing from your doorstep. What would you suggest to your family?', options: [
      { text: 'Use a safe parcel box or ask a neighbour to accept deliveries.', best: true, feedback: 'A practical, low-cost solution.' },
      { text: 'Stop ordering anything online.', best: false, feedback: 'Too extreme for most families.' },
      { text: 'Wait outside all day.', best: false, feedback: 'Not realistic.' },
    ], write: { prompt: 'Justify your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'You want to sell your house, but the entrance looks tired and untidy. What would you do first?', options: [
      { text: 'Tidy up, paint the door, add plants and fix the light — first impressions matter.', best: true, feedback: 'Cheap changes with a big impact.' },
      { text: 'Build a new porch.', best: false, feedback: 'Very expensive for a quick sale.' },
      { text: 'Nothing — buyers only care about the inside.', best: false, feedback: 'The entrance is the first thing buyers see.' },
    ], write: { prompt: 'Explain your plan, considering what buyers notice first.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'Wipe your feet on the doormat.', level: 'A1' },
    { text: 'Somebody is ringing the doorbell.', level: 'A1' },
    { text: 'Our house number is seven.', level: 'A1' },
    { text: 'There is a parcel for you.', level: 'A1' },
    { text: 'The flowers are in the flowerpot.', level: 'A1' },
    { text: 'The gnome has a red hat.', level: 'A1' },
    { text: 'The postman puts letters in the letterbox.', level: 'A2' },
    { text: 'Take the wheelie bin out on Monday.', level: 'A2' },
    { text: 'The porch light is above the door.', level: 'A2' },
    { text: 'Leave your wellies outside the door.', level: 'A2' },
    { text: 'Grandma is sitting on the garden bench.', level: 'A2' },
    { text: 'Water the plants with the watering can.', level: 'A2' },
    { text: 'Could you sign for this parcel, please?', level: 'B1' },
    { text: 'Don’t open the door to strangers.', level: 'B1' },
    { text: 'The path is well lit, so nobody trips.', level: 'B1' },
    { text: 'We left the parcel with our neighbour.', level: 'B1' },
    { text: 'Although the porch is small, it looks very welcoming.', level: 'B2' },
    { text: 'A tidy entrance makes a good first impression.', level: 'B2' },
    { text: 'The light switches on automatically when someone arrives.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The letters are ___ the letterbox.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The parcel is ___ the bench.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The doorbell is ___ the door.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The cat is sleeping ___ the bench.', answer: 'under', options: ['under', 'in', 'at'], level: 'A1' },
    { sentence: 'The porch light is ___ the door.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The bench is ___ the flowerpot and the bin.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The doormat is ___ front of the door.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'Leave your muddy boots ___ the door.', answer: 'outside', options: ['outside', 'into', 'over'], level: 'A2' },
    { sentence: 'Somebody is ___ the door!', answer: 'at', options: ['at', 'in', 'on'], level: 'B1' },
    { sentence: 'The bench stands ___ the wall of the house.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'Please put the bin ___ for the collectors.', answer: 'out', options: ['out', 'off', 'over'], level: 'B1' },
    { sentence: 'The parcel was left ___ the doorstep.', answer: 'on', options: ['on', 'in', 'at'], level: 'B2' },
    { sentence: 'Keep the gate shut so the dog can’t get ___.', answer: 'out', options: ['out', 'off', 'away'], level: 'B2' },
  ],
};
