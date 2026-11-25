import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  HALLWAY CHAPTER — all missions, mini-game content and practice sentences.
//  Same shape as bedroom.ts and the other rooms.
//
//  Furniture ids you can use: coat-stand, shoe-rack, stairs, hall-table, umbrella-stand, bench,
//  key-hook (wall), noticeboard (wall), runner (rug), telephone (small), torch (small), scooter
//
//  Surfaces (small things can stand ON them): shoe-rack, hall-table, bench
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const HALL_WORDS = ['hall', 'hallway', 'coat', 'coat stand', 'shoes', 'shoe rack', 'stairs', 'hall table', 'table', 'umbrella', 'umbrella stand',
  'bench', 'keys', 'key hook', 'noticeboard', 'runner', 'telephone', 'phone', 'torch', 'scooter', 'boots', 'jacket', 'upstairs', 'downstairs'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const hallWords = (count: number): WordRequirement => ({ label: 'hallway words', words: HALL_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your hallway.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('rainy-day', 'Rainy day', '🌧️', {
    A1: 'It’s raining. Find two things you need by the door.',
    A2: 'You come home wet. Find two places for your wet things.',
    B1: 'Find two things that stop rain and mud getting into the house.',
    B2: 'Identify two items that deal with wet outdoor gear.',
  }, ['umbrella-stand', 'coat-stand', 'shoe-rack', 'runner'], 2),
  findMission('shoes-off', 'Shoes off!', '👟', {
    A1: 'Find two things that help with shoes.',
    A2: 'Find where you sit and where you put your shoes.',
    B1: 'Find two things you’d use to take your boots off neatly.',
    B2: 'Identify the seating and storage for footwear.',
  }, ['bench', 'shoe-rack'], 2),
  findMission('dont-forget', 'Don’t forget!', '🔑', {
    A1: 'Find two things on the wall.',
    A2: 'Find where the keys are and where the messages are.',
    B1: 'Find two things that help a busy family remember things.',
    B2: 'Identify the two wall-mounted organisers.',
  }, ['key-hook', 'noticeboard'], 2),
  findMission('call-grandma', 'Call Grandma', '☎️', {
    A1: 'Find the telephone.',
    A2: 'Find what you use to call Grandma.',
    B1: 'Find the phone that isn’t a mobile.',
    B2: 'Find the landline.',
  }, ['telephone']),
  findMission('go-up', 'Up and away', '🪜', {
    A1: 'Find two things that take you somewhere.',
    A2: 'Find how you go upstairs and what you ride to school.',
    B1: 'Find a way to the first floor and a way to the park.',
    B2: 'Identify the route upstairs and a means of transport.',
  }, ['stairs', 'scooter'], 2),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Delivery Day', icon: '📦', xp: 60,
  intro: {
    A1: 'Lots of parcels arrived today! Open them and put everything away in the hallway.',
    A2: 'The postman brought lots of parcels. Unpack them and put things in the right place.',
    B1: 'A pile of deliveries is blocking the hall. Read the labels and decide where everything goes.',
    B2: 'The parcels have rather vague descriptions. Work out where their contents belong.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a parcel to open it. Then click where the thing goes.', props: [
      box('u1', 'new shoes', ['shoe-rack']),
      box('u2', 'a coat', ['coat-stand']),
      box('u3', 'an umbrella', ['umbrella-stand']),
      box('u4', 'keys', ['key-hook']),
      box('u5', 'a calendar', ['noticeboard']),
      box('u6', 'letters', ['hall-table']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each parcel and put the things where they belong.', props: [
      box('u1', 'winter boots', ['shoe-rack']),
      box('u2', 'a raincoat and a hat', ['coat-stand']),
      box('u3', 'a big umbrella', ['umbrella-stand']),
      box('u4', 'a spare key', ['key-hook']),
      box('u5', 'the school timetable', ['noticeboard']),
      box('u6', 'a letter for Mum', ['hall-table']),
      box('u7', 'a cushion for the seat', ['bench']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'something to wear on your feet in the snow', ['shoe-rack']),
      box('u2', 'something to keep you dry on a rainy walk', ['coat-stand', 'umbrella-stand']),
      box('u3', 'something that opens the back door', ['key-hook']),
      box('u4', 'a reminder about the dentist', ['noticeboard']),
      box('u5', 'batteries for the torch', ['hall-table']),
      box('u6', 'a seat cushion', ['bench']),
      box('u7', 'a new helmet', ['coat-stand', 'bench']),
      box('u8', 'a phone book', ['hall-table']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'waterproof footwear', ['shoe-rack']),
      box('u2', 'outerwear', ['coat-stand']),
      box('u3', 'a compact folding umbrella', ['umbrella-stand']),
      box('u4', 'a duplicate key', ['key-hook']),
      box('u5', 'the family’s weekly rota', ['noticeboard']),
      box('u6', 'unopened post', ['hall-table']),
      box('u7', 'a padded seat cover', ['bench']),
      box('u8', 'a cordless handset', ['hall-table']),
    ] }],
  },
};

const lateForSchool: MissionDefinition = {
  id: 'late-for-school', title: 'Late for School', icon: '⏰', xp: 60,
  intro: {
    A1: 'It’s 8 o’clock! You must leave for school. Find your things fast.',
    A2: 'You’re late for school and the hallway is a mess. Follow Mum’s list.',
    B1: 'The school bus leaves in five minutes and the hall is chaos. Read Mum’s note and sort it out.',
    B2: 'Everyone is rushing out at once and the hall is blocked. Deal with your mum’s note quickly.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click where it goes.', props: [
      thing('m1', 'your shoes', 'shoes', '#f28c8c', ['shoe-rack'], 'Put your shoes on the shoe rack.'),
      thing('m2', 'your coat', 'clothes', '#7fa7d8', ['coat-stand'], 'Hang your coat on the coat stand.'),
      thing('m3', 'the umbrella', 'phone', '#f25c5c', ['umbrella-stand'], 'Put the umbrella in the umbrella stand.'),
      thing('m4', 'the letters', 'book', '#ffffff', ['hall-table'], 'Put the letters on the hall table.'),
      thing('m5', 'your school bag', 'suitcase', '#9fd08f', ['bench'], 'Put your school bag on the bench.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'You can’t open the door without your keys. Where are they? Click it.', targets: ['key-hook'] },
      { type: 'sort', prompt: 'Tidy up! Follow each instruction.', props: [
        thing('m1', 'your trainers', 'shoes', '#ffffff', ['shoe-rack'], 'Put your trainers on the shoe rack.'),
        thing('m2', 'Dad’s jacket', 'clothes', '#5b5560', ['coat-stand'], 'Hang Dad’s jacket up.'),
        thing('m3', 'the wet umbrella', 'phone', '#2f3440', ['umbrella-stand'], 'Put the wet umbrella in the stand.'),
        thing('m4', 'the post', 'book', '#ffffff', ['hall-table'], 'Put the post on the hall table.'),
        thing('m5', 'a note for your teacher', 'book', '#fff3a3', ['noticeboard'], 'Pin the note on the noticeboard so you remember it.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'You left your bike light on and the battery is flat. What else gives light? Click it.', targets: ['torch'] },
      { type: 'sort', prompt: 'Read Mum’s note and put everything away.', props: [
        thing('m1', 'the muddy boots', 'shoes', '#9c7150', ['shoe-rack'], 'Muddy boots don’t belong on the clean floor.'),
        thing('m2', 'your PE kit', 'clothes', '#9fd08f', ['bench', 'coat-stand'], 'Leave your PE kit where you’ll see it on the way out.'),
        thing('m3', 'the dripping umbrella', 'phone', '#2f3440', ['umbrella-stand'], 'Something is dripping on the floor — put it where water can’t hurt.'),
        thing('m4', 'the dentist letter', 'book', '#fff3a3', ['noticeboard'], 'We have to remember the dentist on Thursday.'),
        thing('m5', 'your little brother’s scooter helmet', 'toy', '#f25c5c', ['coat-stand', 'bench'], 'His helmet should hang up, not roll around.'),
      ] },
      { type: 'choice', prompt: 'Your sister is sitting on the bench and you need to put on your shoes. What do you say?', options: [
        { text: 'Could you move up a bit, please? I’m late.', correct: true, feedback: 'Polite and clear.' },
        { text: 'Move!', correct: false, feedback: 'She might move, but it isn’t very polite.' },
        { text: 'Say nothing and push her.', correct: false, feedback: 'That will start an argument.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'The hall is so dark you can’t find the light switch. What could help you? Click it.', targets: ['torch'] },
      { type: 'sort', prompt: 'Your mum’s note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'the soaking wet boots', 'shoes', '#9c7150', ['shoe-rack'], 'I’d rather not have puddles on the tiles again.'),
        thing('m2', 'the heavy winter coats', 'clothes', '#7fa7d8', ['coat-stand'], 'Coats piled on the bench make it impossible to sit down.'),
        thing('m3', 'the car keys', 'phone', '#c9d2d9', ['key-hook'], 'Dad will be furious if the car keys go missing again.'),
        thing('m4', 'the electricity bill', 'book', '#ffffff', ['hall-table', 'noticeboard'], 'The bill needs paying, so keep it somewhere visible.'),
        thing('m5', 'the parcel for next door', 'box', '#d9a874', ['hall-table'], 'The neighbour’s parcel should be ready to hand over.'),
        thing('m6', 'the scooter', 'toy', '#7fc0d8', ['stairs', 'shoe-rack', 'bench'], 'Someone will trip over that scooter — get it out of the way.'),
      ] },
      { type: 'write', prompt: 'Write a short, polite note for the noticeboard asking the family to keep the hallway clear. Explain why.', minWords: 35,
        require: [hallWords(2), connectors(1), advanced(1)], sample: 'Although we’re all busy in the mornings, could everyone...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'wardrobe', name: 'Coat cupboard', description: 'A big cupboard for coats and shoes. It takes a lot of space.', price: 70, tags: ['coats', 'shoes', 'big'] },
  { id: 'coat-stand', name: 'Coat stand', description: 'A tall stand for coats and hats.', price: 25, tags: ['coats'] },
  { id: 'hooks', name: 'Wall hooks', description: 'Five hooks for coats. Cheap and small.', price: 8, tags: ['coats'] },
  { id: 'shoe-rack', name: 'Shoe rack', description: 'Shelves for six pairs of shoes.', price: 20, tags: ['shoes'] },
  { id: 'bench', name: 'Storage bench', description: 'Sit on it and keep shoes inside. Quite big.', price: 45, tags: ['sit', 'shoes', 'big'] },
  { id: 'stool', name: 'Small stool', description: 'A small seat for putting on shoes.', price: 12, tags: ['sit'] },
  { id: 'key-hook', name: 'Key hook', description: 'Never lose your keys again.', price: 6, tags: ['keys'] },
  { id: 'bowl', name: 'Key bowl', description: 'A pretty bowl for keys and coins.', price: 10, tags: ['keys'] },
  { id: 'runner', name: 'Hall runner', description: 'A long carpet that keeps the floor clean.', price: 18, tags: ['floor'] },
  { id: 'mirror', name: 'Big mirror', description: 'Check your hair before you go out.', price: 30, tags: ['extra'] },
];

const budgetHall: MissionDefinition = {
  id: 'budget-hallway', title: 'Hallway on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your uncle has a new flat. The hallway is empty. Help him buy things.',
    A2: 'Your uncle has just moved into a flat with a very narrow hallway. He doesn’t have much money.',
    B1: 'Your uncle’s new hallway is long and narrow. Choose things that fit the space and the budget.',
    B2: 'You’re helping your uncle organise a cramped hallway on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. Your uncle needs somewhere for coats and somewhere for shoes.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['coat-stand', 'hooks', 'shoe-rack', 'mirror', 'wardrobe'].includes(i.id)),
        needs: [{ tag: 'coats', label: 'coats' }, { tag: 'shoes', label: 'shoes' }] },
      { type: 'place', prompt: 'Now in YOUR hallway: put the shoe rack next to the bench.', checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. Your uncle needs places for coats, shoes and keys.', budget: 60,
        items: SHOP_ITEMS.filter((i) => i.id !== 'runner'),
        needs: [{ tag: 'coats', label: 'coats' }, { tag: 'shoes', label: 'shoes' }, { tag: 'keys', label: 'keys' }] },
      { type: 'place', prompt: 'Now in YOUR hallway: hang the key hook above the hall table.', checks: [{ rel: 'above', a: 'key-hook', b: 'hall-table' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 90 coins. The hall is narrow, so choose only ONE big item. Your uncle needs coats, shoes, keys and somewhere to sit.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'coats', label: 'coats' }, { tag: 'shoes', label: 'shoes' }, { tag: 'keys', label: 'keys' }, { tag: 'sit', label: 'a seat' }] },
      { type: 'write', prompt: 'Write a short message to your uncle explaining what you bought and why.', minWords: 25,
        require: [hallWords(2), connectors(1)], sample: 'I bought a coat stand because the hall is narrow, and...' },
      { type: 'place', prompt: 'Now in YOUR hallway: put the umbrella stand in a corner.', checks: [{ rel: 'inCorner', a: 'umbrella-stand' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 100 coins and space for only ONE bulky item. Your uncle needs coats, shoes, keys, a seat and protection for the floor.', budget: 100, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'coats', label: 'coats' }, { tag: 'shoes', label: 'shoes' }, { tag: 'keys', label: 'keys' }, { tag: 'sit', label: 'a seat' }, { tag: 'floor', label: 'floor' }] },
      { type: 'write', prompt: 'Justify your choices to your uncle. Mention one option you rejected and why.', minWords: 45,
        require: [hallWords(3), connectors(1), advanced(1)], sample: 'I chose wall hooks instead of a cupboard because...' },
      { type: 'place', prompt: 'Now in YOUR hallway: keep the walkway clear — park the scooter next to the stairs.',
        checks: [{ rel: 'nextTo', a: 'scooter', b: 'stairs' }] },
    ],
  },
};

// ── STAGE 5: HALLWAY MAKEOVER ──────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Hallway Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your hallway nice! Read and move the furniture. Then press Check.',
    A2: 'Time for a hallway makeover! Follow the instructions and move the real furniture.',
    B1: 'Give your hallway a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'An interior designer has sent you a brief. Interpret it and rearrange your hallway accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the stairs against the wall.', checks: [{ rel: 'againstWall', a: 'stairs' }] },
      { type: 'place', prompt: 'Put the hall table against the wall.', checks: [{ rel: 'againstWall', a: 'hall-table' }] },
      { type: 'place', prompt: 'Put the telephone on the hall table.', checks: [{ rel: 'onTop', a: 'telephone', b: 'hall-table' }] },
      { type: 'place', prompt: 'Hang the key hook above the hall table.', checks: [{ rel: 'above', a: 'key-hook', b: 'hall-table' }] },
      { type: 'place', prompt: 'Put the shoe rack next to the bench.', checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the hall table against the wall and the telephone on it.',
        checks: [{ rel: 'againstWall', a: 'hall-table' }, { rel: 'onTop', a: 'telephone', b: 'hall-table' }] },
      { type: 'place', prompt: 'Hang the key hook above the hall table and the noticeboard above the bench.',
        checks: [{ rel: 'above', a: 'key-hook', b: 'hall-table' }, { rel: 'above', a: 'noticeboard', b: 'bench' }] },
      { type: 'place', prompt: 'Put the coat stand in the corner.', checks: [{ rel: 'inCorner', a: 'coat-stand' }] },
      { type: 'place', prompt: 'Put the torch on the shoe rack.', checks: [{ rel: 'onTop', a: 'torch', b: 'shoe-rack' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a “drop zone” for when you come home: key hook above the hall table.',
        checks: [{ rel: 'above', a: 'key-hook', b: 'hall-table' }] },
      { type: 'place', prompt: 'Make putting on boots easy: shoe rack next to the bench.', checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }] },
      { type: 'place', prompt: 'Save space: tuck the coat stand into a corner.', checks: [{ rel: 'inCorner', a: 'coat-stand' }] },
      { type: 'place', prompt: 'The family should see messages on their way out: hang the noticeboard above the bench.',
        checks: [{ rel: 'above', a: 'noticeboard', b: 'bench' }] },
      { type: 'write', prompt: 'Describe your new hallway in 3–4 sentences. Say where things are.', minWords: 25,
        require: [hallWords(3), prepositions(2)], sample: 'The key hook is above the hall table...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create an organised entry zone: hall table against a wall, key hook directly above it, phone on the table.',
        checks: [{ rel: 'againstWall', a: 'hall-table' }, { rel: 'above', a: 'key-hook', b: 'hall-table' }, { rel: 'onTop', a: 'telephone', b: 'hall-table' }] },
      { type: 'place', prompt: 'A practical boot station: shoe rack beside the bench, noticeboard above the bench.',
        checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }, { rel: 'above', a: 'noticeboard', b: 'bench' }] },
      { type: 'place', prompt: 'Keep the walkway clear: coat stand and umbrella stand in corners.',
        checks: [{ rel: 'inCorner', a: 'coat-stand' }, { rel: 'inCorner', a: 'umbrella-stand' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what is still not ideal, and why?', minWords: 45,
        require: [hallWords(3), prepositions(2), advanced(1)], sample: 'Although the hallway is narrow, the bench now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Welcome Home!', icon: '🏡', xp: 150,
  intro: {
    A1: 'Your family is coming home from a long holiday! Get the hallway ready.',
    A2: 'Your parents are back from a trip tonight. Make the hallway tidy and welcoming.',
    B1: 'A new neighbour is visiting for the first time. Make sure the hallway gives a good first impression.',
    B2: 'Your grandparents are moving in with you. Make the hallway safe, practical and welcoming for them.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Your family needs to go upstairs with the bags. Click the way up.', targets: ['stairs'] },
      { type: 'sort', prompt: 'Get ready: put the coats on the coat stand and the shoes on the shoe rack.', props: [
        thing('f1', 'the coats', 'clothes', '#7fa7d8', ['coat-stand'], 'Hang the coats on the coat stand.'),
        thing('f2', 'the shoes', 'shoes', '#f28c8c', ['shoe-rack'], 'Put the shoes on the shoe rack.'),
      ] },
      { type: 'choice', prompt: 'Mum asks: “Where are my keys?” What do you say?', options: [
        { text: 'They’re on the key hook.', correct: true, feedback: 'Yes! “on the key hook”.' },
        { text: 'They’re keys.', correct: false, feedback: 'She wants to know WHERE they are.' },
        { text: 'I am on the key hook.', correct: false, feedback: 'Use “They’re in/on/next to...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your hallway.', minWords: 8, require: [hallWords(2)], sample: 'The coat stand is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Dad wants to call Grandma to say they are home. Click what he uses.', targets: ['telephone'] },
      { type: 'sort', prompt: 'Make the hallway tidy.', props: [
        thing('f1', 'the suitcases', 'suitcase', '#c9b6e4', ['stairs', 'bench'], 'Put the suitcases by the stairs.'),
        thing('f2', 'the holiday post', 'book', '#ffffff', ['hall-table'], 'Put all the post on the hall table.'),
        thing('f3', 'a “Welcome home” card', 'book', '#f7b2d0', ['noticeboard'], 'Pin the card on the noticeboard.'),
      ] },
      { type: 'place', prompt: 'Nobody should trip: put the scooter next to the stairs.', checks: [{ rel: 'nextTo', a: 'scooter', b: 'stairs' }] },
      { type: 'write', prompt: 'Write a welcome note for your parents. Use at least 3 hallway words and 2 prepositions.', minWords: 15,
        require: [hallWords(3), prepositions(2)], sample: 'Welcome home! Your keys are on…' },
    ],
    B1: [
      { type: 'find', prompt: 'Your neighbour needs somewhere to sit while she takes off her boots. Click it.', targets: ['bench'] },
      { type: 'sort', prompt: 'Make the hallway welcoming.', props: [
        thing('f1', 'a pair of guest slippers', 'shoes', '#c9b6e4', ['shoe-rack'], 'Leave slippers where guests will see them.'),
        thing('f2', 'fresh flowers', 'cup', '#f7b2d0', ['hall-table'], 'Flowers would brighten up the table.'),
        thing('f3', 'an empty coat hanger', 'clothes', '#d9a874', ['coat-stand'], 'Make sure there’s space for her coat.'),
      ] },
      { type: 'sort', prompt: 'Put away anything that makes the hall look messy.', props: [
        thing('f4', 'the pile of old newspapers', 'book', '#e8e2d4', ['hall-table', 'bench'], 'Newspapers all over the floor look terrible.'),
        thing('f5', 'your football boots', 'shoes', '#2f3440', ['shoe-rack'], 'Your muddy football boots are the first thing she’ll see.'),
        thing('f6', 'the bike pump', 'phone', '#5b5560', ['stairs', 'shoe-rack'], 'The pump should be out of the way.'),
      ] },
      { type: 'place', prompt: 'Make it practical: shoe rack next to the bench and the key hook above the hall table.',
        checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }, { rel: 'above', a: 'key-hook', b: 'hall-table' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) inviting your neighbour and telling her what to do when she arrives.', minWords: 35,
        require: [hallWords(3), connectors(1)], sample: 'Please come in! You can leave your coat on the stand, so...' },
    ],
    B2: [
      { type: 'find', prompt: 'Grandpa can’t see well at night. What should be near the door in case of a power cut? Click it.', targets: ['torch'] },
      { type: 'sort', prompt: 'Set the hallway up for your grandparents.', props: [
        thing('f1', 'Grandma’s walking stick', 'phone', '#9c7150', ['umbrella-stand'], 'Grandma’s walking stick should stand somewhere easy to reach.'),
        thing('f2', 'a list of emergency numbers', 'book', '#fff3a3', ['noticeboard'], 'Emergency numbers must be visible at all times.'),
        thing('f3', 'a cushion for the seat', 'pillow', '#c9b6e4', ['bench'], 'Make the seat by the door more comfortable.'),
      ] },
      { type: 'sort', prompt: 'Remove anything that could cause a fall.', props: [
        thing('f4', 'your skateboard', 'toy', '#f28c8c', ['stairs', 'shoe-rack'], 'Wheels on the floor are a serious trip hazard.'),
        thing('f5', 'shoes on the stairs', 'shoes', '#ffffff', ['shoe-rack'], 'Nothing should ever be left on the stairs.'),
        thing('f6', 'the loose cable', 'phone', '#2f3440', ['hall-table'], 'The phone cable is across the walkway.'),
      ] },
      { type: 'choice', prompt: 'Grandpa wants to keep his big old wardrobe in the narrow hall, but it blocks the way. What is the most tactful thing to say?', options: [
        { text: 'Explain the safety risk kindly and suggest a better place for it together.', correct: true, feedback: 'Respectful and it solves the problem.' },
        { text: 'Tell him it’s ugly and must go.', correct: false, feedback: 'That could really hurt his feelings.' },
        { text: 'Say nothing and move it while he’s out.', correct: false, feedback: 'He might feel his opinion doesn’t matter.' },
      ] },
      { type: 'write', prompt: 'Write a note (at least 55 words) welcoming your grandparents and explaining how you’ve made the hallway safe and practical.', minWords: 55,
        require: [hallWords(4), prepositions(2), advanced(1)], sample: 'Welcome! Although the hallway is quite narrow, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const hallwayChapter: ChapterDefinition = {
  roomId: 'hallway',
  title: 'My Hallway',
  explore,
  challenges: [unpack, lateForSchool, budgetHall],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'coat-stand', prompt: { A1: 'Find where your coat goes.', A2: 'Find the tall stand with hooks.', B1: 'Find where you’d hang a wet raincoat.', B2: 'Find the free-standing rack for outerwear.' } },
    { target: 'shoe-rack', prompt: { A1: 'Find the shoes.', A2: 'Find the shelves for boots.', B1: 'Find where muddy trainers should go.', B2: 'Find the footwear storage.' } },
    { target: 'stairs', prompt: { A1: 'Find the way up.', A2: 'Find how you go upstairs.', B1: 'Find the steps with a banister.', B2: 'Find the staircase.' } },
    { target: 'hall-table', prompt: { A1: 'Find a narrow table.', A2: 'Find where the post goes.', B1: 'Find where you’d leave a letter for Mum.', B2: 'Find the console table by the wall.' } },
    { target: 'umbrella-stand', prompt: { A1: 'Find the umbrellas.', A2: 'Find where a wet umbrella goes.', B1: 'Find the tall pot by the door.', B2: 'Find the receptacle for umbrellas.' } },
    { target: 'bench', prompt: { A1: 'Find a long seat.', A2: 'Find where you sit to put on shoes.', B1: 'Find the seat by the door.', B2: 'Find the padded bench.' } },
    { target: 'key-hook', prompt: { A1: 'Find the keys.', A2: 'Find the small hooks on the wall.', B1: 'Find what stops you losing your keys.', B2: 'Find the wall-mounted key holder.' } },
    { target: 'noticeboard', prompt: { A1: 'Find the notes.', A2: 'Find where messages are pinned.', B1: 'Find the family’s reminders.', B2: 'Find the cork board.' } },
    { target: 'runner', prompt: { A1: 'Find a long carpet.', A2: 'Find the carpet in the hall.', B1: 'Find what keeps the tiles clean.', B2: 'Find the narrow rug.' } },
    { target: 'telephone', prompt: { A1: 'Find the phone.', A2: 'Find what rings.', B1: 'Find the phone that isn’t a mobile.', B2: 'Find the landline.' } },
    { target: 'torch', prompt: { A1: 'Find a small light.', A2: 'Find what you use in the dark.', B1: 'Find what you need in a power cut.', B2: 'Find the battery-powered light.' } },
    { target: 'scooter', prompt: { A1: 'Find something with wheels.', A2: 'Find what you ride to the park.', B1: 'Find what you push with one foot.', B2: 'Find the kick scooter.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'above', a: 'key-hook', b: 'hall-table' }], prompt: { A1: 'Hang the key hook above the hall table.', B1: 'Put the key hook where you drop your things.', B2: 'Mount the key holder above the console table.' } },
    { checks: [{ rel: 'onTop', a: 'telephone', b: 'hall-table' }], prompt: { A1: 'Put the telephone on the hall table.', B1: 'Give the phone a place on the table.', B2: 'Place the landline on the console table.' } },
    { checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }], prompt: { A1: 'Put the shoe rack next to the bench.', B1: 'Keep shoes near where you sit.', B2: 'Position the shoe rack beside the bench.' } },
    { checks: [{ rel: 'above', a: 'noticeboard', b: 'bench' }], prompt: { A1: 'Hang the noticeboard above the bench.', B1: 'Put the noticeboard where you see it while putting on shoes.', B2: 'Mount the noticeboard over the bench.' } },
    { checks: [{ rel: 'inCorner', a: 'coat-stand' }], prompt: { A1: 'Put the coat stand in the corner.', B1: 'Save space by moving the coat stand into a corner.', B2: 'Make use of the corner for the coat stand.' } },
    { checks: [{ rel: 'againstWall', a: 'stairs' }], prompt: { A1: 'Put the stairs against the wall.', B1: 'Push the stairs against a wall.', B2: 'Position the staircase flush against a wall.' } },
    { checks: [{ rel: 'nextTo', a: 'umbrella-stand', b: 'coat-stand' }], prompt: { A1: 'Put the umbrella stand next to the coat stand.', B1: 'Keep all the rain things together.', B2: 'Group the umbrella stand with the outerwear.' } },
    { checks: [{ rel: 'onTop', a: 'torch', b: 'hall-table' }], prompt: { A1: 'Put the torch on the hall table.', B1: 'Keep the torch somewhere easy to find in the dark.', B2: 'Leave the torch within reach of the door.' } },
    { checks: [{ rel: 'nextTo', a: 'scooter', b: 'stairs' }], prompt: { A1: 'Put the scooter next to the stairs.', B1: 'Park the scooter out of the way by the stairs.', B2: 'Store the scooter beside the staircase.' } },
    { checks: [{ rel: 'againstWall', a: 'bench' }], prompt: { A1: 'Put the bench against the wall.', B1: 'Push the bench against a wall.', B2: 'Position the bench flush against a wall.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'furniture', label: 'Furniture', icon: '🪑' },
      { id: 'wear', label: 'Things you wear', icon: '🧥' },
      { id: 'things', label: 'Useful things', icon: '🔑' },
      { id: 'actions', label: 'Things you do', icon: '🚶' },
    ],
    items: [
      { word: 'bench', bin: 'furniture', level: 'A1' }, { word: 'stairs', bin: 'furniture', level: 'A1' },
      { word: 'coat stand', bin: 'furniture', level: 'A2' }, { word: 'shoe rack', bin: 'furniture', level: 'A2' },
      { word: 'hall table', bin: 'furniture', level: 'A2' }, { word: 'umbrella stand', bin: 'furniture', level: 'A2' },
      { word: 'banister', bin: 'furniture', level: 'B1' }, { word: 'landing', bin: 'furniture', level: 'B1' },
      { word: 'coat', bin: 'wear', level: 'A1' }, { word: 'jacket', bin: 'wear', level: 'A1' },
      { word: 'hat', bin: 'wear', level: 'A1' }, { word: 'boots', bin: 'wear', level: 'A1' },
      { word: 'raincoat', bin: 'wear', level: 'A2' }, { word: 'helmet', bin: 'wear', level: 'A2' },
      { word: 'scarf', bin: 'wear', level: 'A1' }, { word: 'gloves', bin: 'wear', level: 'A1' },
      { word: 'keys', bin: 'things', level: 'A1' }, { word: 'umbrella', bin: 'things', level: 'A1' },
      { word: 'telephone', bin: 'things', level: 'A1' }, { word: 'torch', bin: 'things', level: 'A2' },
      { word: 'scooter', bin: 'things', level: 'A1' }, { word: 'battery', bin: 'things', level: 'B1' },
      { word: 'spare key', bin: 'things', level: 'B1' }, { word: 'shoehorn', bin: 'things', level: 'B2' },
      { word: 'go upstairs', bin: 'actions', level: 'A1' }, { word: 'take off', bin: 'actions', level: 'A1' },
      { word: 'put on', bin: 'actions', level: 'A1' }, { word: 'hang up', bin: 'actions', level: 'A2' },
      { word: 'answer the phone', bin: 'actions', level: 'A2' }, { word: 'pin', bin: 'actions', level: 'B1' },
      { word: 'trip over', bin: 'actions', level: 'B1' }, { word: 'declutter', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You come home. Your shoes are wet. What do you do?', options: [
      { text: 'I take off my shoes and put them on the shoe rack.', best: true, feedback: 'Yes! The floor stays clean.' },
      { text: 'I walk upstairs in my wet shoes.', best: false, feedback: 'Oh no — wet footprints everywhere!' },
      { text: 'I put my shoes on the hall table.', best: false, feedback: 'Shoes don’t go on the table.' },
    ] },
    { level: 'A1', situation: 'The telephone is ringing. What do you say?', options: [
      { text: 'Hello?', best: true, feedback: 'Perfect!' },
      { text: 'Goodbye!', best: false, feedback: 'That’s for the end of the call.' },
      { text: 'Nothing.', best: false, feedback: 'Somebody wants to talk to you!' },
    ] },
    { level: 'A1', situation: 'It is raining. What do you take?', options: [
      { text: 'An umbrella and a raincoat.', best: true, feedback: 'Right — you’ll stay dry.' },
      { text: 'A torch.', best: false, feedback: 'That won’t keep you dry.' },
      { text: 'My scooter.', best: false, feedback: 'You’ll get very wet!' },
    ] },
    { level: 'A2', situation: 'You always lose your keys. What can help?', options: [
      { text: 'Hang them on the key hook every time you come in.', best: true, feedback: 'A simple habit that works.' },
      { text: 'Never lock the door.', best: false, feedback: 'That isn’t safe.' },
      { text: 'Buy new keys every week.', best: false, feedback: 'That’s expensive!' },
    ] },
    { level: 'A2', situation: 'Your little brother left his scooter at the bottom of the stairs. What do you do?', options: [
      { text: 'Move it out of the way and tell him.', best: true, feedback: 'Now nobody will trip.' },
      { text: 'Jump over it.', best: false, feedback: 'Somebody else might fall.' },
      { text: 'Ride it upstairs.', best: false, feedback: 'That’s dangerous!' },
    ] },
    { level: 'A2', situation: 'The light in the hall is broken and it is dark. What do you do?', options: [
      { text: 'Use the torch and tell Dad about the light.', best: true, feedback: 'Safe and sensible.' },
      { text: 'Walk in the dark.', best: false, feedback: 'You could fall on the stairs.' },
      { text: 'Go to bed in the hall.', best: false, feedback: 'Not very comfortable!' },
    ] },
    { level: 'B1', situation: 'The hallway is always full of shoes and bags, and someone nearly fell on the stairs. How would you deal with it?', options: [
      { text: 'Suggest a rule: shoes on the rack, bags on hooks, nothing on the stairs.', best: true, feedback: 'Clear rules tackle the cause.' },
      { text: 'Throw everybody’s shoes away.', best: false, feedback: 'That would cause a lot of anger.' },
      { text: 'Just be careful yourself.', best: false, feedback: 'Others could still get hurt.' },
    ], reasons: [
      { text: 'Because everybody knows where things go.', correct: true },
      { text: 'Because shoes are expensive.', correct: false },
      { text: 'Because it is the cheapest option.', correct: false },
    ] },
    { level: 'B1', situation: 'A delivery driver rings while you are home alone. What would you do?', options: [
      { text: 'Talk through the door or intercom and ask him to leave the parcel.', best: true, feedback: 'Safe and polite.' },
      { text: 'Open the door wide and invite him in.', best: false, feedback: 'Not safe when you’re alone.' },
      { text: 'Hide and say nothing.', best: false, feedback: 'You could simply ask him to leave it.' },
    ], reasons: [
      { text: 'Because you stay safe and still get the parcel.', correct: true },
      { text: 'Because drivers are rude.', correct: false },
    ] },
    { level: 'B2', situation: 'Your hallway is cold and draughty in winter, and the heating bills are high. What would you suggest?', options: [
      { text: 'Fit a draught excluder to the front door and lay a thick runner.', best: true, feedback: 'Cheap, effective and quick to do.' },
      { text: 'Turn the heating up to the maximum.', best: false, feedback: 'The bills will go up even more.' },
      { text: 'Never use the hallway.', best: false, feedback: 'Not exactly practical.' },
    ], write: { prompt: 'Justify your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Five people share a tiny hallway and leave for work and school at the same time. What would you suggest?', options: [
      { text: 'Get everything ready the night before and stagger leaving times.', best: true, feedback: 'Well organised and fair to everyone.' },
      { text: 'Get up at 5 a.m. so you’re first.', best: false, feedback: 'It only solves your problem.' },
      { text: 'Leave your things on the stairs.', best: false, feedback: 'That makes it worse and dangerous.' },
    ], write: { prompt: 'Explain your suggestion, considering how each family member might react.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'Hang your coat on the coat stand.', level: 'A1' },
    { text: 'My shoes are on the shoe rack.', level: 'A1' },
    { text: 'The keys are on the key hook.', level: 'A1' },
    { text: 'I go up the stairs to my bedroom.', level: 'A1' },
    { text: 'The telephone is ringing.', level: 'A1' },
    { text: 'Sit on the bench and take off your boots.', level: 'A1' },
    { text: 'The letters are on the hall table.', level: 'A2' },
    { text: 'Put your wet umbrella in the umbrella stand.', level: 'A2' },
    { text: 'Mum left a note on the noticeboard.', level: 'A2' },
    { text: 'Don’t leave your scooter in the hall.', level: 'A2' },
    { text: 'The torch is in the drawer.', level: 'A2' },
    { text: 'The shoe rack is next to the bench.', level: 'A2' },
    { text: 'Could you answer the phone, please?', level: 'B1' },
    { text: 'Wipe your feet before you come in.', level: 'B1' },
    { text: 'Nothing should be left on the stairs.', level: 'B1' },
    { text: 'The hallway is narrow, so keep it tidy.', level: 'B1' },
    { text: 'Although the hallway is small, it is well organised.', level: 'B2' },
    { text: 'A tidy hallway gives visitors a good first impression.', level: 'B2' },
    { text: 'The runner protects the floor from muddy boots.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'My coat is ___ the coat stand.', answer: 'on', options: ['on', 'in', 'under'], level: 'A1' },
    { sentence: 'The umbrella is ___ the umbrella stand.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The shoe rack is ___ the bench.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The cupboard is ___ the stairs.', answer: 'under', options: ['under', 'in', 'at'], level: 'A1' },
    { sentence: 'The key hook is ___ the hall table.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The bench is ___ the coat stand and the shoe rack.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'My bedroom is ___ the stairs.', answer: 'up', options: ['up', 'on', 'in'], level: 'A2' },
    { sentence: 'The door is ___ the stairs, on the other side of the hall.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'Hang your keys ___ the hook.', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'Please take your shoes ___ before you come in.', answer: 'off', options: ['off', 'out', 'up'], level: 'B1' },
    { sentence: 'I nearly tripped ___ the scooter.', answer: 'over', options: ['over', 'on', 'off'], level: 'B1' },
    { sentence: 'The note is pinned ___ the noticeboard.', answer: 'to', options: ['to', 'at', 'in'], level: 'B2' },
    { sentence: 'Keep the stairs clear ___ shoes and bags.', answer: 'of', options: ['of', 'from', 'off'], level: 'B2' },
  ],
};
