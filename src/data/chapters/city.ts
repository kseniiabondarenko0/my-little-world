import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  CITY CHAPTER — all missions, mini-game content and practice sentences.
//  A city street outdoors: the last stop on the map. Same shape as the other rooms.
//
//  Furniture ids you can use: street-sign, city-map (on the wall),
//  park-bench, bus-stop, street-lamp, traffic-light, post-box, fountain, ice-cream-cart (floor),
//  bus-ticket, skateboard, pigeon (small)
//
//  Surfaces (small things can stand ON them): park-bench, fountain, ice-cream-cart
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const CITY_WORDS = ['city', 'street', 'road', 'park', 'square', 'bus', 'car', 'park bench', 'bench', 'bus stop', 'street lamp', 'lamp', 'traffic light',
  'post box', 'fountain', 'ice cream', 'ice cream cart', 'ticket', 'bus ticket', 'skateboard', 'pigeon', 'street sign', 'map', 'city map', 'traffic'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const cityWords = (count: number): WordRequirement => ({ label: 'city words', words: CITY_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects on the street.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('travel', 'Catch the bus', '🚌', {
    A1: 'Find two things you need for the bus.',
    A2: 'Find the bus stop and the bus ticket.',
    B1: 'Find where you wait for the bus and what you show the driver.',
    B2: 'Identify the shelter and the fare you need for public transport.',
  }, ['bus-stop', 'bus-ticket'], 2),
  findMission('safe', 'Cross safely', '🚦', {
    A1: 'Find two lights on the street.',
    A2: 'Find the traffic light and the street lamp.',
    B1: 'Find what keeps people safe at the crossing and on dark evenings.',
    B2: 'Identify the signals and lighting that keep pedestrians safe.',
  }, ['traffic-light', 'street-lamp'], 2),
  findMission('lost', 'Where am I?', '🗺️', {
    A1: 'Find two things that help you when you are lost.',
    A2: 'Find the city map and the street sign.',
    B1: 'Find two things that tell you where you are.',
    B2: 'Identify the wayfinding aids on this street.',
  }, ['city-map', 'street-sign'], 2),
  findMission('relax', 'A sunny afternoon', '☀️', {
    A1: 'Find two nice things in the square.',
    A2: 'Find the fountain and the ice cream cart.',
    B1: 'Find where people cool down on a hot day.',
    B2: 'Identify two attractions that make the square lively.',
  }, ['fountain', 'ice-cream-cart'], 2),
  findMission('bird', 'A city bird', '🐦', {
    A1: 'Find the bird.',
    A2: 'Find the pigeon.',
    B1: 'Find the grey bird looking for crumbs.',
    B2: 'Find the city’s most common bird.',
  }, ['pigeon']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Street Repairs', icon: '🧰', xp: 60,
  intro: {
    A1: 'The city workers bring boxes! Open them and put everything in the right place.',
    A2: 'The council is tidying the street before a festival. Help the workers put things in place.',
    B1: 'The repair van has arrived with the wrong paperwork. Read the labels and put everything where it belongs.',
    B2: 'The council’s delivery labels are rather vague. Work out where each item belongs before the street reopens.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'a new light bulb', ['street-lamp']),
      box('u2', 'letters', ['post-box']),
      box('u3', 'ice cream', ['ice-cream-cart']),
      box('u4', 'a new map', ['city-map']),
      box('u5', 'a red light', ['traffic-light']),
      box('u6', 'a cushion', ['park-bench']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'a big lamp bulb', ['street-lamp']),
      box('u2', 'a bus timetable', ['bus-stop']),
      box('u3', 'cones and wafers', ['ice-cream-cart']),
      box('u4', 'a new map of the town', ['city-map']),
      box('u5', 'a green light', ['traffic-light']),
      box('u6', 'blue paint for the name', ['street-sign']),
      box('u7', 'clean water', ['fountain']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'something to light the street at night', ['street-lamp']),
      box('u2', 'times for the number 7 bus', ['bus-stop']),
      box('u3', 'something cold and sweet to sell', ['ice-cream-cart']),
      box('u4', 'a plan of the streets with a “You are here” dot', ['city-map']),
      box('u5', 'a part that tells cars to stop', ['traffic-light']),
      box('u6', 'a wooden slat for a seat', ['park-bench']),
      box('u7', 'a filter for the water', ['fountain']),
      box('u8', 'a new lock for the letter slot', ['post-box']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'an energy-saving LED unit', ['street-lamp']),
      box('u2', 'a revised timetable for the night service', ['bus-stop']),
      box('u3', 'frozen dessert stock', ['ice-cream-cart']),
      box('u4', 'an updated tourist wayfinding panel', ['city-map']),
      box('u5', 'a replacement pedestrian signal', ['traffic-light']),
      box('u6', 'weatherproof timber slats', ['park-bench']),
      box('u7', 'a water pump', ['fountain']),
      box('u8', 'a reflective name plate', ['street-sign']),
    ] }],
  },
};

const busyMorning: MissionDefinition = {
  id: 'busy-morning', title: 'Rush Hour', icon: '🚌', xp: 60,
  intro: {
    A1: 'It’s eight o’clock and the street is very busy! Help people.',
    A2: 'It’s rush hour and everyone is in a hurry. Follow the street warden’s note.',
    B1: 'It’s the busiest time of the morning and the street warden is ill. Read her note and keep the street running.',
    B2: 'You’re covering for the street warden during the morning rush. Follow her note and keep everyone moving safely.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the letter', 'book', '#ffffff', ['post-box'], 'Put the letter in the post box.'),
      thing('m2', 'the timetable', 'book', '#ffd27a', ['bus-stop'], 'Put the timetable at the bus stop.'),
      thing('m3', 'the bag', 'box', '#7a5232', ['park-bench'], 'Put the bag on the bench.'),
      thing('m4', 'the ice cream', 'cup', '#f7b2d0', ['ice-cream-cart'], 'Put the ice cream on the cart.'),
      thing('m5', 'the coins', 'cup', '#c9a227', ['fountain'], 'Throw the coins in the fountain.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'A man wants to cross the road. What tells him when? Click it.', targets: ['traffic-light'] },
      { type: 'sort', prompt: 'Follow the warden’s note.', props: [
        thing('m1', 'a pile of letters', 'book', '#ffffff', ['post-box'], 'Post the letters before nine.'),
        thing('m2', 'a lost bus ticket', 'book', '#ffd27a', ['bus-stop'], 'Leave it at the bus stop for the owner.'),
        thing('m3', 'a lost umbrella', 'box', '#3d4a5c', ['park-bench'], 'Leave it on the bench.'),
        thing('m4', 'a box of cones', 'box', '#d6b07a', ['ice-cream-cart'], 'Give the cones to the ice cream seller.'),
        thing('m5', 'a lost dog’s lead', 'phone', '#e46a5a', ['street-lamp', 'park-bench'], 'Tie it to the lamp so the owner sees it.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'A tourist asks how to get to the museum. What do you show him? Click it.', targets: ['city-map'] },
      { type: 'sort', prompt: 'Read the warden’s note and put everything in its place.', props: [
        thing('m1', 'a found wallet', 'phone', '#7a5232', ['bus-stop', 'post-box'], 'Hand it in quickly — the owner is probably on the bus.'),
        thing('m2', 'a sign “Wet paint”', 'book', '#ffffff', ['park-bench'], 'Someone just painted the seat!'),
        thing('m3', 'a timetable change', 'book', '#ffd27a', ['bus-stop'], 'The number 7 bus is now every ten minutes.'),
        thing('m4', 'an urgent parcel', 'box', '#d6b07a', ['post-box'], 'It must go today.'),
        thing('m5', 'bread crumbs', 'cup', '#e9b46a', ['pigeon'], 'For the hungry bird — not on the pavement.'),
      ] },
      { type: 'choice', prompt: 'A cyclist rides through a red light and nearly hits a child. What do you say?', options: [
        { text: 'Excuse me, that was dangerous — please stop at red lights.', correct: true, feedback: 'Calm and clear.' },
        { text: 'Nothing. It’s not my problem.', correct: false, feedback: 'Safety is everyone’s business.' },
        { text: 'Chase him and shout.', correct: false, feedback: 'That could cause another accident.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A lorry has hidden the street name from view. What do visitors need to see? Check it.', targets: ['street-sign'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'a flickering bulb report', 'book', '#ffffff', ['street-lamp'], 'Attach it to whatever went dark last night.'),
        thing('m2', 'an accessibility notice', 'book', '#a9c9f2', ['bus-stop'], 'For passengers in wheelchairs waiting for the low-floor bus.'),
        thing('m3', 'a hygiene certificate', 'book', '#8fd3b6', ['ice-cream-cart'], 'The food seller must display it.'),
        thing('m4', 'a broken skateboard', 'box', '#7b5ea7', ['park-bench'], 'Leave it somewhere visible until its owner returns.'),
        thing('m5', 'a “Do not drink” sign', 'book', '#ffd27a', ['fountain'], 'The water is not safe for drinking.'),
        thing('m6', 'a corrected collection time', 'book', '#e46a5a', ['post-box'], 'Letters are now collected at 5 p.m.'),
      ] },
      { type: 'write', prompt: 'Write a short note to the warden explaining how the morning went and what still needs fixing.', minWords: 35,
        require: [cityWords(2), connectors(1), advanced(1)], sample: 'Although the rush hour was busy, the bus stop ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'big-fountain', name: 'Big stone fountain', description: 'Beautiful, but very big.', price: 55, tags: ['water', 'big'] },
  { id: 'small-fountain', name: 'Drinking fountain', description: 'Small and useful.', price: 18, tags: ['water'] },
  { id: 'benches', name: 'Six benches', description: 'Lots of seats. They take a lot of space.', price: 40, tags: ['seat', 'big'] },
  { id: 'two-benches', name: 'Two benches', description: 'Enough for a small square.', price: 16, tags: ['seat'] },
  { id: 'lamps', name: 'Street lamps', description: 'Light for the evening.', price: 14, tags: ['light'] },
  { id: 'fairy-lights', name: 'Fairy lights', description: 'Pretty, but not very bright.', price: 8, tags: ['extra'] },
  { id: 'bus-shelter', name: 'Bus shelter', description: 'Keeps people dry while they wait.', price: 30, tags: ['bus', 'big'] },
  { id: 'bus-sign', name: 'Bus stop sign', description: 'A simple sign with the timetable.', price: 10, tags: ['bus'] },
  { id: 'map-board', name: 'Map board', description: 'Helps tourists find their way.', price: 12, tags: ['map'] },
  { id: 'flowers', name: 'Flower pots', description: 'Make the square colourful.', price: 9, tags: ['extra'] },
];

const budgetSquare: MissionDefinition = {
  id: 'budget-square', title: 'A New Square', icon: '💰', xp: 60,
  intro: {
    A1: 'The town has a new square. Help the mayor buy things.',
    A2: 'The mayor wants a nice square but doesn’t have much money. Help her choose.',
    B1: 'The new square is quite small. Choose things that fit the space and the budget.',
    B2: 'You’re advising the council on a small public square with a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. The square needs water and seats.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['big-fountain', 'small-fountain', 'two-benches', 'benches', 'flowers'].includes(i.id)),
        needs: [{ tag: 'water', label: 'fountain' }, { tag: 'seat', label: 'seats' }] },
      { type: 'place', prompt: 'Now on YOUR street: put the pigeon on the park bench.', checks: [{ rel: 'onTop', a: 'pigeon', b: 'park-bench' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. The square needs water, seats and lights.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['bus-shelter', 'bus-sign'].includes(i.id)),
        needs: [{ tag: 'water', label: 'fountain' }, { tag: 'seat', label: 'seats' }, { tag: 'light', label: 'lights' }] },
      { type: 'place', prompt: 'Now on YOUR street: put the street lamp next to the park bench.', checks: [{ rel: 'nextTo', a: 'street-lamp', b: 'park-bench' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The square is small, so choose only ONE big item. It needs water, seats, lights and a bus stop.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'water', label: 'fountain' }, { tag: 'seat', label: 'seats' }, { tag: 'light', label: 'lights' }, { tag: 'bus', label: 'bus stop' }] },
      { type: 'write', prompt: 'Write a short message to the mayor explaining what you bought and why.', minWords: 25,
        require: [cityWords(2), connectors(1)], sample: 'I bought two benches because the square is small, and...' },
      { type: 'place', prompt: 'Now on YOUR street: put the bus stop against the wall.', checks: [{ rel: 'againstWall', a: 'bus-stop' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. The square needs water, seating, lighting, a bus stop and help for tourists.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'water', label: 'fountain' }, { tag: 'seat', label: 'seating' }, { tag: 'light', label: 'lighting' }, { tag: 'bus', label: 'bus stop' }, { tag: 'map', label: 'tourists' }] },
      { type: 'write', prompt: 'Justify your choices to the council. Mention one option you rejected and why.', minWords: 45,
        require: [cityWords(3), connectors(1), advanced(1)], sample: 'I chose a bus shelter instead of a big fountain because...' },
      { type: 'place', prompt: 'Now on YOUR street: children play by the water, so keep the traffic light far from the fountain.',
        checks: [{ rel: 'farFrom', a: 'traffic-light', b: 'fountain' }] },
    ],
  },
};

// ── STAGE 5: STREET MAKEOVER ───────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Street Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make the street nice! Read and move the things. Then press Check.',
    A2: 'Time for a street makeover! Follow the instructions and move the real things.',
    B1: 'Give the street a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A town planner has sent you a brief. Interpret it and rearrange the street accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the fountain in the middle.', checks: [{ rel: 'inMiddle', a: 'fountain' }] },
      { type: 'place', prompt: 'Put the pigeon on the park bench.', checks: [{ rel: 'onTop', a: 'pigeon', b: 'park-bench' }] },
      { type: 'place', prompt: 'Put the bus stop against the wall.', checks: [{ rel: 'againstWall', a: 'bus-stop' }] },
      { type: 'place', prompt: 'Put the traffic light in the corner.', checks: [{ rel: 'inCorner', a: 'traffic-light' }] },
      { type: 'place', prompt: 'Put the bus ticket on the park bench.', checks: [{ rel: 'onTop', a: 'bus-ticket', b: 'park-bench' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the park bench next to the fountain and the skateboard on it.',
        checks: [{ rel: 'nextTo', a: 'park-bench', b: 'fountain' }, { rel: 'onTop', a: 'skateboard', b: 'park-bench' }] },
      { type: 'place', prompt: 'Hang the city map above the bus stop.', checks: [{ rel: 'above', a: 'city-map', b: 'bus-stop' }] },
      { type: 'place', prompt: 'Put the street lamp next to the park bench.', checks: [{ rel: 'nextTo', a: 'street-lamp', b: 'park-bench' }] },
      { type: 'place', prompt: 'Put the ice cream cart near the window.', checks: [{ rel: 'nearWindow', a: 'ice-cream-cart' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a nice place to rest: bench next to the fountain with the pigeon on the bench.',
        checks: [{ rel: 'nextTo', a: 'park-bench', b: 'fountain' }, { rel: 'onTop', a: 'pigeon', b: 'park-bench' }] },
      { type: 'place', prompt: 'Help travellers: bus stop against a wall, city map above it, post box next to it.',
        checks: [{ rel: 'againstWall', a: 'bus-stop' }, { rel: 'above', a: 'city-map', b: 'bus-stop' }, { rel: 'nextTo', a: 'post-box', b: 'bus-stop' }] },
      { type: 'place', prompt: 'Keep children safe: the traffic light far from the fountain.', checks: [{ rel: 'farFrom', a: 'traffic-light', b: 'fountain' }] },
      { type: 'place', prompt: 'Light the bench at night: street lamp next to the park bench.', checks: [{ rel: 'nextTo', a: 'street-lamp', b: 'park-bench' }] },
      { type: 'write', prompt: 'Describe your new street in 3–4 sentences. Say where things are.', minWords: 25,
        require: [cityWords(3), prepositions(2)], sample: 'The fountain is in the middle of the square...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a lively centre: fountain in the middle, ice cream cart next to it, bench beside it.',
        checks: [{ rel: 'inMiddle', a: 'fountain' }, { rel: 'nextTo', a: 'ice-cream-cart', b: 'fountain' }, { rel: 'nextTo', a: 'park-bench', b: 'fountain' }] },
      { type: 'place', prompt: 'Keep traffic apart from play: traffic light in a corner, well away from the fountain.',
        checks: [{ rel: 'inCorner', a: 'traffic-light' }, { rel: 'farFrom', a: 'traffic-light', b: 'fountain' }] },
      { type: 'place', prompt: 'Help visitors find their way while they wait: city map above the bus stop.', checks: [{ rel: 'above', a: 'city-map', b: 'bus-stop' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works for residents and visitors, what is still not ideal, and why?', minWords: 45,
        require: [cityWords(3), prepositions(2), advanced(1)], sample: 'Although the square is small, the fountain now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'City Festival', icon: '🎉', xp: 150,
  intro: {
    A1: 'It’s the city festival today! Make the street perfect for everyone.',
    A2: 'The city festival starts this afternoon. Get the street ready and help the visitors.',
    B1: 'Thousands of visitors are coming to the city festival. Prepare the street and help people find their way.',
    B2: 'You’re the volunteer coordinator for the city festival. Prepare the street, handle visitors’ problems and write the follow-up.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'A girl is lost. What does she need? Click it.', targets: ['city-map'] },
      { type: 'sort', prompt: 'Get ready: put the ice cream on the cart and the flowers on the bench.', props: [
        thing('f1', 'the ice cream', 'cup', '#f7b2d0', ['ice-cream-cart'], 'Put the ice cream on the cart.'),
        thing('f2', 'the flowers', 'cup', '#f28c8c', ['park-bench', 'fountain'], 'Put the flowers on the bench.'),
      ] },
      { type: 'choice', prompt: 'A tourist says: “Where is the bus stop?” What do you say?', options: [
        { text: 'It’s over there, next to the post box.', correct: true, feedback: 'Clear and helpful!' },
        { text: 'I don’t like buses.', correct: false, feedback: 'That doesn’t help him!' },
        { text: 'I am a bus.', correct: false, feedback: 'Ha! No, you’re not.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about the street.', minWords: 8, require: [cityWords(2)], sample: 'The fountain is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Can people cross the road now? Check the light. Click it.', targets: ['traffic-light'] },
      { type: 'sort', prompt: 'Make the square perfect.', props: [
        thing('f1', 'a festival poster', 'book', '#ffd27a', ['bus-stop', 'city-map'], 'Put it where people wait.'),
        thing('f2', 'balloons', 'cup', '#ff8fa3', ['street-lamp', 'park-bench'], 'Tie them to the lamp.'),
        thing('f3', 'litter', 'box', '#9aa7b5', ['post-box', 'park-bench'], 'Pick it up off the fountain.'),
      ] },
      { type: 'place', prompt: 'Everyone wants to see the fountain: put it in the middle.', checks: [{ rel: 'inMiddle', a: 'fountain' }] },
      { type: 'write', prompt: 'Write a festival poster. Use at least 3 city words and 2 prepositions.', minWords: 15,
        require: [cityWords(3), prepositions(2)], sample: 'City festival today! Meet us at the fountain…' },
    ],
    B1: [
      { type: 'find', prompt: 'A visitor asks for the name of this street. What do you point to? Click it.', targets: ['street-sign'] },
      { type: 'sort', prompt: 'Prepare the square for visitors.', props: [
        thing('f1', 'a map with festival stages', 'book', '#8fd3b6', ['city-map', 'bus-stop'], 'Visitors must see where the concerts are.'),
        thing('f2', 'extra cones and sprinkles', 'box', '#d6b07a', ['ice-cream-cart'], 'It’s going to be a hot day.'),
        thing('f3', 'a lost child’s teddy', 'cup', '#c98a4e', ['park-bench', 'bus-stop'], 'Leave it somewhere easy to see.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks messy or unsafe.', props: [
        thing('f4', 'broken glass', 'cup', '#bfe0ff', ['post-box', 'park-bench'], 'Get it off the pavement before someone gets hurt.'),
        thing('f5', 'an abandoned skateboard', 'box', '#7b5ea7', ['park-bench'], 'Someone could trip over it.'),
        thing('f6', 'old flyers', 'book', '#ffffff', ['post-box'], 'Recycle them.'),
      ] },
      { type: 'place', prompt: 'Make the square safe: fountain in the middle and the traffic light far from it.',
        checks: [{ rel: 'inMiddle', a: 'fountain' }, { rel: 'farFrom', a: 'traffic-light', b: 'fountain' }] },
      { type: 'write', prompt: 'Write a thank-you message (at least 35 words) to the festival volunteers.', minWords: 35,
        require: [cityWords(3), connectors(1)], sample: 'Thank you for helping at the festival. The square looked...' },
    ],
    B2: [
      { type: 'find', prompt: 'The mayor wants to show visitors how to leave without a car. Show her the public transport.', targets: ['bus-stop'] },
      { type: 'sort', prompt: 'Prepare the street to a high standard.', props: [
        thing('f1', 'an accessible route map', 'book', '#a9c9f2', ['city-map', 'bus-stop'], 'Display it where wheelchair users will see it first.'),
        thing('f2', 'free water bottles', 'cup', '#7cc7e8', ['fountain', 'ice-cream-cart'], 'Hand them out near the water in the heat.'),
        thing('f3', 'extra evening timetables', 'book', '#ffd27a', ['bus-stop'], 'Buses run late tonight.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unsafe or unprofessional is left out.', props: [
        thing('f4', 'a leaking water hose', 'phone', '#2f6b4f', ['fountain'], 'Reconnect it before the pavement gets slippery.'),
        thing('f5', 'a lost passport', 'book', '#7a2f2f', ['post-box', 'bus-stop'], 'Personal documents must be kept safe.'),
        thing('f6', 'a broken bulb', 'cup', '#fff3c4', ['street-lamp'], 'Replace it before dark.'),
      ] },
      { type: 'choice', prompt: 'A resident complains that the festival is too noisy late at night. What is the most professional response?', options: [
        { text: 'Thank them, apologise and explain when the music will stop, then pass the complaint on.', correct: true, feedback: 'Respectful and practical.' },
        { text: 'Tell them it’s only once a year, so they should relax.', correct: false, feedback: 'That dismisses their concern.' },
        { text: 'Ignore them and turn the music up.', correct: false, feedback: 'Definitely not!' },
      ] },
      { type: 'write', prompt: 'Write a short report (at least 55 words) to the council on how the festival went and what should change next year.', minWords: 55,
        require: [cityWords(3), prepositions(2), advanced(1)], sample: 'Although the festival was a great success, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const cityChapter: ChapterDefinition = {
  roomId: 'city',
  title: 'My City',
  explore,
  challenges: [unpack, busyMorning, budgetSquare],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'park-bench', prompt: { A1: 'Find the bench.', A2: 'Find the park bench.', B1: 'Find a place to sit outside.', B2: 'Find the public seating.' } },
    { target: 'bus-stop', prompt: { A1: 'Find the bus stop.', A2: 'Find where you wait for the bus.', B1: 'Find the shelter for bus passengers.', B2: 'Find the public transport stop.' } },
    { target: 'street-lamp', prompt: { A1: 'Find the lamp.', A2: 'Find the street lamp.', B1: 'Find what lights the street at night.', B2: 'Find the street lighting.' } },
    { target: 'traffic-light', prompt: { A1: 'Find the red, yellow and green lights.', A2: 'Find the traffic light.', B1: 'Find what tells cars to stop.', B2: 'Find the signal at the crossing.' } },
    { target: 'post-box', prompt: { A1: 'Find the red box.', A2: 'Find the post box.', B1: 'Find where you send a letter.', B2: 'Find the postal collection box.' } },
    { target: 'fountain', prompt: { A1: 'Find the water.', A2: 'Find the fountain.', B1: 'Find where children splash on hot days.', B2: 'Find the square’s water feature.' } },
    { target: 'ice-cream-cart', prompt: { A1: 'Find the ice cream.', A2: 'Find the ice cream cart.', B1: 'Find a cold treat on wheels.', B2: 'Find the frozen dessert vendor.' } },
    { target: 'bus-ticket', prompt: { A1: 'Find the ticket.', A2: 'Find the bus ticket.', B1: 'Find what you show the driver.', B2: 'Find the travel pass.' } },
    { target: 'skateboard', prompt: { A1: 'Find the skateboard.', A2: 'Find the board with wheels.', B1: 'Find something to ride in the park.', B2: 'Find the deck with four wheels.' } },
    { target: 'pigeon', prompt: { A1: 'Find the bird.', A2: 'Find the pigeon.', B1: 'Find the grey city bird.', B2: 'Find the urban bird.' } },
    { target: 'street-sign', prompt: { A1: 'Find the blue sign.', A2: 'Find the street sign.', B1: 'Find the name of the street.', B2: 'Find the street name plate.' } },
    { target: 'city-map', prompt: { A1: 'Find the map.', A2: 'Find the city map.', B1: 'Find what helps when you are lost.', B2: 'Find the wayfinding panel.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'inMiddle', a: 'fountain' }], prompt: { A1: 'Put the fountain in the middle.', B1: 'Make the fountain the centre of the square.', B2: 'Position the fountain as the focal point.' } },
    { checks: [{ rel: 'onTop', a: 'pigeon', b: 'park-bench' }], prompt: { A1: 'Put the pigeon on the bench.', B1: 'Let the pigeon rest on the bench.', B2: 'Perch the pigeon on the bench.' } },
    { checks: [{ rel: 'inCorner', a: 'traffic-light' }], prompt: { A1: 'Put the traffic light in the corner.', B1: 'Move the traffic light to the crossing in the corner.', B2: 'Install the signal at the corner.' } },
    { checks: [{ rel: 'againstWall', a: 'bus-stop' }], prompt: { A1: 'Put the bus stop against the wall.', B1: 'Move the bus stop back to the wall.', B2: 'Position the shelter flush against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'bus-ticket', b: 'park-bench' }], prompt: { A1: 'Put the bus ticket on the bench.', B1: 'Someone left their ticket — put it on the bench.', B2: 'Leave the ticket on the bench for its owner.' } },
    { checks: [{ rel: 'above', a: 'city-map', b: 'bus-stop' }], prompt: { A1: 'Hang the city map above the bus stop.', B1: 'Show the map where people wait.', B2: 'Mount the map above the shelter.' } },
    { checks: [{ rel: 'nextTo', a: 'street-lamp', b: 'park-bench' }], prompt: { A1: 'Put the street lamp next to the bench.', B1: 'Light the bench for the evening.', B2: 'Position the lamp beside the bench.' } },
    { checks: [{ rel: 'farFrom', a: 'traffic-light', b: 'fountain' }], prompt: { A1: 'Put the traffic light far from the fountain.', B1: 'Keep the road away from the children.', B2: 'Keep the crossing at a safe distance from the fountain.' } },
    { checks: [{ rel: 'onTop', a: 'skateboard', b: 'park-bench' }], prompt: { A1: 'Put the skateboard on the bench.', B1: 'Get the skateboard off the pavement.', B2: 'Store the skateboard on the bench.' } },
    { checks: [{ rel: 'nextTo', a: 'ice-cream-cart', b: 'fountain' }], prompt: { A1: 'Put the ice cream cart next to the fountain.', B1: 'Bring the ice cream to the busy square.', B2: 'Position the vendor beside the fountain.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'places', label: 'Places', icon: '🏛️' },
      { id: 'street', label: 'On the street', icon: '🚦' },
      { id: 'transport', label: 'Transport & people', icon: '🚌' },
      { id: 'actions', label: 'Things you do', icon: '🚶' },
    ],
    items: [
      { word: 'park', bin: 'places', level: 'A1' }, { word: 'cinema', bin: 'places', level: 'A1' },
      { word: 'museum', bin: 'places', level: 'A1' }, { word: 'city', bin: 'places', level: 'A1' },
      { word: 'square', bin: 'places', level: 'A2' }, { word: 'bridge', bin: 'places', level: 'A2' },
      { word: 'post office', bin: 'places', level: 'A2' }, { word: 'roundabout', bin: 'places', level: 'B1' },
      { word: 'park bench', bin: 'street', level: 'A1' }, { word: 'traffic light', bin: 'street', level: 'A1' },
      { word: 'city map', bin: 'street', level: 'A1' }, { word: 'street lamp', bin: 'street', level: 'A2' },
      { word: 'post box', bin: 'street', level: 'A2' }, { word: 'fountain', bin: 'street', level: 'A2' },
      { word: 'pavement', bin: 'street', level: 'A2' }, { word: 'zebra crossing', bin: 'street', level: 'B1' },
      { word: 'bus', bin: 'transport', level: 'A1' }, { word: 'car', bin: 'transport', level: 'A1' },
      { word: 'taxi', bin: 'transport', level: 'A1' }, { word: 'tram', bin: 'transport', level: 'A2' },
      { word: 'tourist', bin: 'transport', level: 'A2' }, { word: 'driver', bin: 'transport', level: 'A2' },
      { word: 'pedestrian', bin: 'transport', level: 'B1' }, { word: 'cyclist', bin: 'transport', level: 'B1' },
      { word: 'cross the road', bin: 'actions', level: 'A1' }, { word: 'turn left', bin: 'actions', level: 'A1' },
      { word: 'go straight on', bin: 'actions', level: 'A2' }, { word: 'get off', bin: 'actions', level: 'A2' },
      { word: 'post a letter', bin: 'actions', level: 'A2' }, { word: 'ask for directions', bin: 'actions', level: 'B1' },
      { word: 'go sightseeing', bin: 'actions', level: 'B1' }, { word: 'commute', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You want to cross the road. The light is red. What do you do?', options: [
      { text: 'Wait for the green light.', best: true, feedback: 'Safe!' },
      { text: 'Run across quickly.', best: false, feedback: 'Very dangerous!' },
      { text: 'Close your eyes and go.', best: false, feedback: 'No!' },
    ] },
    { level: 'A1', situation: 'You are lost in the city. What do you say to a person?', options: [
      { text: 'Excuse me, where is the station, please?', best: true, feedback: 'Great!' },
      { text: 'Where am I? Tell me!', best: false, feedback: 'Say “excuse me” and “please”.' },
      { text: 'Goodbye!', best: false, feedback: 'Ask for help first!' },
    ] },
    { level: 'A1', situation: 'You get on the bus. What do you need?', options: [
      { text: 'A bus ticket.', best: true, feedback: 'Yes!' },
      { text: 'A skateboard.', best: false, feedback: 'Not on the bus!' },
      { text: 'An ice cream.', best: false, feedback: 'You need a TICKET.' },
    ] },
    { level: 'A2', situation: 'You see an old lady with heavy bags at the bus stop. What do you do?', options: [
      { text: 'Offer to help her with her bags.', best: true, feedback: 'Kind and helpful.' },
      { text: 'Push past her to get on first.', best: false, feedback: 'That isn’t nice.' },
      { text: 'Take a photo of her.', best: false, feedback: 'Not helpful at all.' },
    ] },
    { level: 'A2', situation: 'You finish your ice cream in the park. What do you do with the paper?', options: [
      { text: 'Put it in a bin.', best: true, feedback: 'Keep the city clean!' },
      { text: 'Drop it on the pavement.', best: false, feedback: 'That’s litter.' },
      { text: 'Give it to a pigeon.', best: false, feedback: 'Birds can’t eat paper!' },
    ] },
    { level: 'A2', situation: 'A tourist asks you the way to the museum, but you don’t know. What do you say?', options: [
      { text: 'Sorry, I don’t know, but there’s a city map over there.', best: true, feedback: 'Honest and helpful.' },
      { text: 'Turn left, I think… or maybe right.', best: false, feedback: 'Don’t guess — he might get lost.' },
      { text: 'Walk away without answering.', best: false, feedback: 'A quick “sorry” is kinder.' },
    ] },
    { level: 'B1', situation: 'You find a wallet with money on a park bench. What would you do?', options: [
      { text: 'Take it to the police station or try to contact the owner.', best: true, feedback: 'Honest and responsible.' },
      { text: 'Keep the money and leave the wallet.', best: false, feedback: 'That’s stealing.' },
      { text: 'Leave it on the bench.', best: false, feedback: 'Someone else might take it.' },
    ], reasons: [
      { text: 'Because the owner is probably worried and needs their documents.', correct: true },
      { text: 'Because wallets are heavy.', correct: false },
      { text: 'Because the police like presents.', correct: false },
    ] },
    { level: 'B1', situation: 'Your bus is very late and you’ll miss your first lesson. What would you do?', options: [
      { text: 'Message your teacher to explain, then wait or find another route.', best: true, feedback: 'Responsible and calm.' },
      { text: 'Go home and miss the whole day.', best: false, feedback: 'That makes things worse.' },
      { text: 'Shout at the bus driver when the bus arrives.', best: false, feedback: 'It isn’t the driver’s fault.' },
    ], reasons: [
      { text: 'Because the teacher knows why you’re late and doesn’t worry.', correct: true },
      { text: 'Because buses are always late.', correct: false },
    ] },
    { level: 'B2', situation: 'Your city wants to close the centre to cars and make it pedestrianised.', options: [
      { text: 'Support it, but suggest better public transport and access for disabled people and deliveries.', best: true, feedback: 'A balanced, constructive view.' },
      { text: 'Say it’s a terrible idea — everyone needs their car.', best: false, feedback: 'That ignores pollution and safety.' },
      { text: 'Ban all vehicles everywhere, including buses.', best: false, feedback: 'Far too extreme.' },
    ], write: { prompt: 'Justify your view, weighing up cleaner air against the needs of drivers and shops.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Young people in your town say there is nowhere for them to go in the evening.', options: [
      { text: 'Suggest a skate park or youth centre and ask young people to help design it.', best: true, feedback: 'Practical and inclusive.' },
      { text: 'Say they should stay at home.', best: false, feedback: 'That doesn’t solve the problem.' },
      { text: 'Close the parks at night so nobody goes out.', best: false, feedback: 'That makes things worse.' },
    ], write: { prompt: 'Explain how a town could offer more for teenagers.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'The bus stop is next to the post box.', level: 'A1' },
    { text: 'Wait for the green light.', level: 'A1' },
    { text: 'I sit on the park bench.', level: 'A1' },
    { text: 'There is a fountain in the square.', level: 'A1' },
    { text: 'Can I have a bus ticket, please?', level: 'A1' },
    { text: 'The pigeon is very hungry.', level: 'A1' },
    { text: 'Excuse me, where is the museum?', level: 'A2' },
    { text: 'Turn left at the traffic lights.', level: 'A2' },
    { text: 'Go straight on and cross the bridge.', level: 'A2' },
    { text: 'The street lamps come on at night.', level: 'A2' },
    { text: 'We bought ice cream in the park.', level: 'A2' },
    { text: 'Which bus goes to the station?', level: 'A2' },
    { text: 'Could you show me on the map?', level: 'B1' },
    { text: 'The traffic is terrible in the rush hour.', level: 'B1' },
    { text: 'It takes ten minutes to walk there.', level: 'B1' },
    { text: 'You can’t miss it — it’s opposite the cinema.', level: 'B1' },
    { text: 'Although the city is busy, it has lovely parks.', level: 'B2' },
    { text: 'The centre has been pedestrianised since last year.', level: 'B2' },
    { text: 'Public transport here is cheap and reliable.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The pigeon is ___ the bench.', answer: 'on', options: ['on', 'in', 'into'], level: 'A1' },
    { sentence: 'I am waiting ___ the bus stop.', answer: 'at', options: ['at', 'on', 'of'], level: 'A1' },
    { sentence: 'The post box is ___ the bus stop.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'We live ___ a big city.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'I go to school ___ bus.', answer: 'by', options: ['by', 'on', 'with'], level: 'A2' },
    { sentence: 'Get ___ the bus at the next stop.', answer: 'off', options: ['off', 'out', 'down'], level: 'A2' },
    { sentence: 'The map is ___ the bus stop.', answer: 'above', options: ['above', 'under', 'into'], level: 'A2' },
    { sentence: 'Walk ___ the bridge and turn right.', answer: 'across', options: ['across', 'through', 'along'], level: 'A2' },
    { sentence: 'The museum is ___ the cinema.', answer: 'opposite', options: ['opposite', 'across', 'front'], level: 'B1' },
    { sentence: 'Walk ___ the park to the fountain.', answer: 'through', options: ['through', 'across of', 'over to'], level: 'B1' },
    { sentence: 'The shop is ___ the corner of Green Street.', answer: 'on', options: ['on', 'in', 'at of'], level: 'B1' },
    { sentence: 'The square is within walking distance ___ the station.', answer: 'of', options: ['of', 'from', 'to'], level: 'B2' },
    { sentence: 'The town is famous ___ its old bridge.', answer: 'for', options: ['for', 'of', 'with'], level: 'B2' },
  ],
};
