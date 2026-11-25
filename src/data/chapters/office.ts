import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  OFFICE CHAPTER — all missions, mini-game content and practice sentences.
//  A small open-plan office in the city. Same shape as the other rooms.
//
//  Furniture ids you can use: fire-extinguisher, sales-chart (on the wall),
//  meeting-table, office-chair, filing-cabinet, water-cooler, shredder (floor),
//  printer, computer, laptop, stapler, sticky-notes (small)
//
//  Surfaces (small things can stand ON them): meeting-table, filing-cabinet
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const OFFICE_WORDS = ['office', 'work', 'job', 'boss', 'colleague', 'team', 'meeting', 'table', 'meeting table', 'chair', 'office chair', 'filing cabinet',
  'cabinet', 'water cooler', 'water', 'shredder', 'printer', 'computer', 'laptop', 'stapler', 'sticky notes', 'notes', 'fire extinguisher', 'chart', 'sales chart', 'email', 'paper'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const officeWords = (count: number): WordRequirement => ({ label: 'office words', words: OFFICE_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your office.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('first-job', 'First day at work', '💼', {
    A1: 'Find two computers.',
    A2: 'Find the big computer and the small one you can carry.',
    B1: 'Find two things you’ll use to answer emails today.',
    B2: 'Identify two devices for digital work.',
  }, ['computer', 'laptop'], 2),
  findMission('paperwork', 'Paperwork', '📄', {
    A1: 'Find two things for paper.',
    A2: 'Find what prints paper and what joins papers together.',
    B1: 'Find two things you need to make a printed report.',
    B2: 'Identify the equipment for producing and binding documents.',
  }, ['printer', 'stapler'], 2),
  findMission('break-time', 'Coffee break', '💧', {
    A1: 'Find two places to take a break.',
    A2: 'Find the cold water and where you sit with colleagues.',
    B1: 'Find where colleagues chat during a short break.',
    B2: 'Identify two spots for informal conversations.',
  }, ['water-cooler', 'meeting-table'], 2),
  findMission('secret', 'Top secret!', '🔒', {
    A1: 'Find two things for important papers.',
    A2: 'Find where you keep papers and what destroys them.',
    B1: 'Find where contracts are kept and what you use for old confidential letters.',
    B2: 'Identify secure storage and the means of disposing of sensitive documents.',
  }, ['filing-cabinet', 'shredder'], 2),
  findMission('safety', 'Safety first', '🧯', {
    A1: 'Find the red thing for fires.',
    A2: 'Find the fire extinguisher.',
    B1: 'Find what you would use if a bin caught fire.',
    B2: 'Locate the fire-fighting equipment.',
  }, ['fire-extinguisher']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'Moving Offices', icon: '📦', xp: 60,
  intro: {
    A1: 'The company has a new office! Open the boxes and put everything in the right place.',
    A2: 'Your company has just moved into a new office. Help unpack the boxes.',
    B1: 'The removal company left boxes everywhere. Read the labels and set up the new office.',
    B2: 'The removal team’s labels are rather cryptic. Work out where each box belongs before Monday morning.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'paper for printing', ['printer']),
      box('u2', 'files and papers', ['filing-cabinet']),
      box('u3', 'a big bottle of water', ['water-cooler']),
      box('u4', 'a mouse and a keyboard', ['computer']),
      box('u5', 'staples', ['stapler']),
      box('u6', 'old letters to destroy', ['shredder']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'a pack of white paper', ['printer']),
      box('u2', 'customer files', ['filing-cabinet']),
      box('u3', 'plastic cups', ['water-cooler']),
      box('u4', 'a new keyboard', ['computer']),
      box('u5', 'a laptop charger', ['laptop']),
      box('u6', 'old bank letters', ['shredder']),
      box('u7', 'yellow notes', ['sticky-notes']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'ink cartridges', ['printer']),
      box('u2', 'contracts from last year', ['filing-cabinet']),
      box('u3', 'a spare bottle for drinks', ['water-cooler']),
      box('u4', 'a second screen', ['computer']),
      box('u5', 'a power cable for the portable computer', ['laptop']),
      box('u6', 'papers with customers’ bank details — destroy!', ['shredder']),
      box('u7', 'a poster showing this year’s results', ['sales-chart']),
      box('u8', 'a safety check sticker', ['fire-extinguisher']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'toner', ['printer']),
      box('u2', 'archived invoices', ['filing-cabinet']),
      box('u3', 'a replacement water bottle', ['water-cooler']),
      box('u4', 'peripherals for the workstation', ['computer']),
      box('u5', 'a portable device’s power adapter', ['laptop']),
      box('u6', 'sensitive documents for disposal', ['shredder']),
      box('u7', 'quarterly performance figures', ['sales-chart']),
      box('u8', 'an annual inspection tag', ['fire-extinguisher']),
    ] }],
  },
};

const busyMonday: MissionDefinition = {
  id: 'busy-monday', title: 'Busy Monday', icon: '⏰', xp: 60,
  intro: {
    A1: 'It’s Monday morning and the office is a mess! Help your boss.',
    A2: 'It’s Monday and there’s a big meeting at ten. Follow your boss’s note.',
    B1: 'Important clients are arriving at ten and the office looks terrible. Read your manager’s note and sort things out.',
    B2: 'Your manager is stuck on a train and you’re in charge of preparing for a client meeting. Follow the note.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the papers', 'book', '#ffffff', ['filing-cabinet'], 'Put the papers in the filing cabinet.'),
      thing('m2', 'the cups', 'cup', '#9fd8ff', ['water-cooler'], 'Put the cups by the water cooler.'),
      thing('m3', 'the old letters', 'book', '#e8e2d4', ['shredder'], 'Put the old letters in the shredder.'),
      thing('m4', 'the laptop', 'phone', '#c9d2d9', ['meeting-table'], 'Put the laptop on the meeting table.'),
      thing('m5', 'the paper', 'box', '#ffffff', ['printer'], 'Put the paper in the printer.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'Your boss needs ten copies of the report. What do you use? Click it.', targets: ['printer'] },
      { type: 'sort', prompt: 'Follow your boss’s note.', props: [
        thing('m1', 'the reports', 'book', '#ffffff', ['meeting-table'], 'Put the reports on the meeting table.'),
        thing('m2', 'the customer files', 'book', '#5aa9e6', ['filing-cabinet'], 'Put the files away in the cabinet.'),
        thing('m3', 'clean glasses', 'cup', '#9fd8ff', ['water-cooler', 'meeting-table'], 'Put glasses next to the water.'),
        thing('m4', 'pens and notes', 'phone', '#ffd54f', ['meeting-table', 'sticky-notes'], 'Put pens and notes on the table.'),
        thing('m5', 'yesterday’s rubbish paper', 'book', '#e8e2d4', ['shredder'], 'Shred yesterday’s paper.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'The clients want to see how sales went this year. What will you show them? Click it.', targets: ['sales-chart'] },
      { type: 'sort', prompt: 'Read your manager’s note and put everything in its place.', props: [
        thing('m1', 'the signed contracts', 'book', '#ffffff', ['filing-cabinet'], 'They must be locked away before the clients arrive.'),
        thing('m2', 'printed agendas', 'book', '#fff3a3', ['meeting-table'], 'One for each person at the meeting.'),
        thing('m3', 'notes with passwords', 'book', '#ffd54f', ['shredder'], 'Nobody should ever see these!'),
        thing('m4', 'the presentation', 'phone', '#c9d2d9', ['laptop', 'meeting-table'], 'Have it ready on the portable computer.'),
        thing('m5', 'a jug and glasses', 'bottle', '#9fd8ff', ['meeting-table', 'water-cooler'], 'Clients get thirsty in long meetings.'),
      ] },
      { type: 'choice', prompt: 'A client arrives 20 minutes early. What do you say?', options: [
        { text: 'Good morning! Please have a seat. Can I get you some water?', correct: true, feedback: 'Polite and professional.' },
        { text: 'You’re too early. Come back later.', correct: false, feedback: 'That’s rude to a client.' },
        { text: 'Who are you?', correct: false, feedback: 'Too direct — introduce yourself first.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A safety inspector is coming with the clients. Check the equipment you’d need in an emergency.', targets: ['fire-extinguisher'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'confidential salary data', 'book', '#ffffff', ['shredder'], 'It must not exist on paper once the meeting starts.'),
        thing('m2', 'original contracts', 'book', '#5aa9e6', ['filing-cabinet'], 'Store originals securely; clients get copies.'),
        thing('m3', 'copies of the proposal', 'book', '#fff3a3', ['meeting-table'], 'Have them ready where people will sit.'),
        thing('m4', 'a trailing laptop cable', 'phone', '#2f3440', ['laptop', 'meeting-table'], 'Somebody could trip over it.'),
        thing('m5', 'reminders for the presenter', 'book', '#ffd54f', ['sticky-notes', 'laptop'], 'Discreet prompts beside the presenter’s screen.'),
        thing('m6', 'empty paper cups', 'cup', '#ffffff', ['water-cooler'], 'Return them to where drinks are served.'),
      ] },
      { type: 'write', prompt: 'Write a short email to your manager explaining what is ready and what is still missing.', minWords: 35,
        require: [officeWords(2), connectors(1), advanced(1)], sample: 'Although the meeting table is ready, ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'big-table', name: 'Meeting table for ten', description: 'A long table. It takes a lot of space.', price: 60, tags: ['meet', 'big'] },
  { id: 'small-table', name: 'Round table for four', description: 'A small table for short meetings.', price: 20, tags: ['meet'] },
  { id: 'chairs', name: 'Office chairs', description: 'Comfortable chairs with wheels.', price: 30, tags: ['sit'] },
  { id: 'stools', name: 'Stools', description: 'Cheap, but not good for your back.', price: 10, tags: ['sit'] },
  { id: 'laptops', name: 'Two laptops', description: 'Fast and light. Expensive.', price: 50, tags: ['tech'] },
  { id: 'old-pc', name: 'Second-hand computer', description: 'Old but it works.', price: 15, tags: ['tech'] },
  { id: 'printer', name: 'Big printer', description: 'Prints, scans and copies. Very big.', price: 45, tags: ['print', 'big'] },
  { id: 'small-printer', name: 'Small printer', description: 'Prints only. Fits on a cabinet.', price: 12, tags: ['print'] },
  { id: 'cabinet', name: 'Filing cabinet', description: 'Lockable drawers for papers.', price: 18, tags: ['store'] },
  { id: 'plant', name: 'Big plant', description: 'Makes the office nicer.', price: 8, tags: ['extra'] },
];

const budgetOffice: MissionDefinition = {
  id: 'budget-office', title: 'Start-up on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your friend has a new company. The office is empty. Help her buy things.',
    A2: 'Your friend is starting a small company and the office is empty. She doesn’t have much money.',
    B1: 'Your friend’s start-up has rented a tiny office. Choose things that fit the space and the budget.',
    B2: 'You’re advising a friend on equipping a tiny start-up office on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. She needs something to sit on and a computer.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['chairs', 'stools', 'laptops', 'old-pc', 'plant'].includes(i.id)),
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'tech', label: 'computer' }] },
      { type: 'place', prompt: 'Now in YOUR office: put the laptop on the meeting table.', checks: [{ rel: 'onTop', a: 'laptop', b: 'meeting-table' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. She needs a table, chairs and a computer.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['printer', 'cabinet'].includes(i.id)),
        needs: [{ tag: 'meet', label: 'table' }, { tag: 'sit', label: 'sit' }, { tag: 'tech', label: 'computer' }] },
      { type: 'place', prompt: 'Now in YOUR office: put the office chair next to the meeting table.', checks: [{ rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The office is tiny, so choose only ONE big item. She needs a table, seats, a computer and a printer.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'meet', label: 'table' }, { tag: 'sit', label: 'sit' }, { tag: 'tech', label: 'computer' }, { tag: 'print', label: 'printer' }] },
      { type: 'write', prompt: 'Write a short email to your friend explaining what you bought and why.', minWords: 25,
        require: [officeWords(2), connectors(1)], sample: 'I bought a small printer because the office is tiny, and...' },
      { type: 'place', prompt: 'Now in YOUR office: put the water cooler in a corner.', checks: [{ rel: 'inCorner', a: 'water-cooler' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. She needs a table, seats, a computer, a printer and somewhere to store papers.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'meet', label: 'table' }, { tag: 'sit', label: 'seating' }, { tag: 'tech', label: 'computer' }, { tag: 'print', label: 'printing' }, { tag: 'store', label: 'storage' }] },
      { type: 'write', prompt: 'Justify your choices to your friend. Mention one option you rejected and why.', minWords: 45,
        require: [officeWords(3), connectors(1), advanced(1)], sample: 'I chose a second-hand computer instead of laptops because...' },
      { type: 'place', prompt: 'Now in YOUR office: the noisy shredder shouldn’t disturb meetings — put it far from the meeting table.',
        checks: [{ rel: 'farFrom', a: 'shredder', b: 'meeting-table' }] },
    ],
  },
};

// ── STAGE 5: OFFICE MAKEOVER ───────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Office Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your office nice! Read and move the things. Then press Check.',
    A2: 'Time for an office makeover! Follow the instructions and move the real things.',
    B1: 'Give your office a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'An office designer has sent you a brief. Interpret it and rearrange the office accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the meeting table in the middle of the office.', checks: [{ rel: 'inMiddle', a: 'meeting-table' }] },
      { type: 'place', prompt: 'Put the office chair next to the meeting table.', checks: [{ rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }] },
      { type: 'place', prompt: 'Put the filing cabinet against the wall.', checks: [{ rel: 'againstWall', a: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Put the printer on the filing cabinet.', checks: [{ rel: 'onTop', a: 'printer', b: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Put the water cooler in the corner.', checks: [{ rel: 'inCorner', a: 'water-cooler' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the meeting table near the window and the laptop on it.',
        checks: [{ rel: 'nearWindow', a: 'meeting-table' }, { rel: 'onTop', a: 'laptop', b: 'meeting-table' }] },
      { type: 'place', prompt: 'Hang the sales chart above the meeting table.', checks: [{ rel: 'above', a: 'sales-chart', b: 'meeting-table' }] },
      { type: 'place', prompt: 'Put the filing cabinet against the wall and the printer on it.',
        checks: [{ rel: 'againstWall', a: 'filing-cabinet' }, { rel: 'onTop', a: 'printer', b: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Put the shredder next to the filing cabinet.', checks: [{ rel: 'nextTo', a: 'shredder', b: 'filing-cabinet' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Make a bright meeting area: meeting table near the window with the office chair beside it.',
        checks: [{ rel: 'nearWindow', a: 'meeting-table' }, { rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }] },
      { type: 'place', prompt: 'Make a paperwork corner: filing cabinet against the wall, shredder next to it.',
        checks: [{ rel: 'againstWall', a: 'filing-cabinet' }, { rel: 'nextTo', a: 'shredder', b: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Keep the noisy printer away from the meeting: printer on the filing cabinet.', checks: [{ rel: 'onTop', a: 'printer', b: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Keep chatting away from work: water cooler far from the meeting table.', checks: [{ rel: 'farFrom', a: 'water-cooler', b: 'meeting-table' }] },
      { type: 'write', prompt: 'Describe your new office in 3–4 sentences. Say where things are.', minWords: 25,
        require: [officeWords(3), prepositions(2)], sample: 'The meeting table is near the window...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a focused meeting zone: table by the window, sales chart above it, laptop on it.',
        checks: [{ rel: 'nearWindow', a: 'meeting-table' }, { rel: 'above', a: 'sales-chart', b: 'meeting-table' }, { rel: 'onTop', a: 'laptop', b: 'meeting-table' }] },
      { type: 'place', prompt: 'Separate noisy equipment: shredder well away from the meeting table and the printer on the filing cabinet.',
        checks: [{ rel: 'farFrom', a: 'shredder', b: 'meeting-table' }, { rel: 'onTop', a: 'printer', b: 'filing-cabinet' }] },
      { type: 'place', prompt: 'Tuck the water cooler into a corner.', checks: [{ rel: 'inCorner', a: 'water-cooler' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What helps people work, what is still not ideal, and why?', minWords: 45,
        require: [officeWords(3), prepositions(2), advanced(1)], sample: 'Although the office is small, the table now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'The Big Presentation', icon: '📊', xp: 150,
  intro: {
    A1: 'Today you give a presentation to your team! Get the office ready.',
    A2: 'You’re giving your first presentation at work today. Prepare the office and the meeting.',
    B1: 'You’re presenting a new idea to the company’s directors. Prepare the room and make a great impression.',
    B2: 'You’re pitching a project to an important investor. Prepare the office, handle questions and follow up professionally.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Your slides are on the small computer. Click it.', targets: ['laptop'] },
      { type: 'sort', prompt: 'Get ready: put the papers on the table and the cups by the water.', props: [
        thing('f1', 'the papers', 'book', '#ffffff', ['meeting-table'], 'Put the papers on the meeting table.'),
        thing('f2', 'the cups', 'cup', '#9fd8ff', ['water-cooler'], 'Put the cups by the water cooler.'),
      ] },
      { type: 'choice', prompt: 'Your boss says: “Good morning! Are you ready?” What do you say?', options: [
        { text: 'Good morning! Yes, I’m ready.', correct: true, feedback: 'Great!' },
        { text: 'Good night!', correct: false, feedback: 'It’s the morning!' },
        { text: 'I am a laptop.', correct: false, feedback: 'Your presentation is ON the laptop.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your office.', minWords: 8, require: [officeWords(2)], sample: 'The printer is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Everyone needs a copy of your report. What do you use? Click it.', targets: ['printer'] },
      { type: 'sort', prompt: 'Make the meeting room ready.', props: [
        thing('f1', 'printed reports', 'book', '#ffffff', ['meeting-table'], 'Put a report on the table for everyone.'),
        thing('f2', 'a jug of water', 'bottle', '#9fd8ff', ['meeting-table', 'water-cooler'], 'Put water on the table.'),
        thing('f3', 'old notes', 'book', '#ffd54f', ['shredder'], 'Shred your old notes.'),
      ] },
      { type: 'place', prompt: 'Put the sales chart above the meeting table so everyone can see it.', checks: [{ rel: 'above', a: 'sales-chart', b: 'meeting-table' }] },
      { type: 'write', prompt: 'Write the start of your presentation. Use at least 3 office words and 2 prepositions.', minWords: 15,
        require: [officeWords(3), prepositions(2)], sample: 'Good morning, everyone. On the chart…' },
    ],
    B1: [
      { type: 'find', prompt: 'A director asks for last year’s contract. Where is it? Click it.', targets: ['filing-cabinet'] },
      { type: 'sort', prompt: 'Prepare the room.', props: [
        thing('f1', 'the slides', 'phone', '#c9d2d9', ['laptop'], 'Your slides must be ready on the portable computer.'),
        thing('f2', 'name cards', 'book', '#fff3a3', ['meeting-table'], 'Everyone should know where to sit.'),
        thing('f3', 'reminder cards', 'book', '#ffd54f', ['sticky-notes', 'laptop'], 'Keep your key points close to your screen.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks unprofessional.', props: [
        thing('f4', 'a pile of old printouts', 'book', '#e8e2d4', ['shredder'], 'Get rid of them — they contain customer names.'),
        thing('f5', 'empty cups', 'cup', '#ffffff', ['water-cooler'], 'Nobody wants to see yesterday’s cups.'),
        thing('f6', 'loose files', 'book', '#5aa9e6', ['filing-cabinet'], 'Put them back where they belong.'),
      ] },
      { type: 'place', prompt: 'Make the meeting comfortable: meeting table near the window and the office chair beside it.',
        checks: [{ rel: 'nearWindow', a: 'meeting-table' }, { rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }] },
      { type: 'write', prompt: 'Write a follow-up email (at least 35 words) to the directors thanking them and summarising your idea.', minWords: 35,
        require: [officeWords(3), connectors(1)], sample: 'Thank you for coming to the meeting. My idea is...' },
    ],
    B2: [
      { type: 'find', prompt: 'The investor wants evidence that the company is growing. What do you point to? Click it.', targets: ['sales-chart'] },
      { type: 'sort', prompt: 'Set up the meeting to a high standard.', props: [
        thing('f1', 'a polished pitch deck', 'phone', '#c9d2d9', ['laptop'], 'Load it on the portable device before the investor arrives.'),
        thing('f2', 'bound copies of the proposal', 'book', '#fff3a3', ['meeting-table'], 'Have them ready at each seat.'),
        thing('f3', 'refreshments', 'bottle', '#9fd8ff', ['meeting-table', 'water-cooler'], 'Offer something to drink during a long meeting.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing confidential or unsafe is left out.', props: [
        thing('f4', 'staff salary lists', 'book', '#ffffff', ['shredder', 'filing-cabinet'], 'The investor must not see them.'),
        thing('f5', 'a heavy box of paper', 'box', '#ffffff', ['printer', 'filing-cabinet'], 'It mustn’t block the fire exit.'),
        thing('f6', 'passwords on notes', 'book', '#ffd54f', ['shredder'], 'A serious security risk if anyone sees them.'),
      ] },
      { type: 'choice', prompt: 'The investor says your prices are too high. What is the most professional response?', options: [
        { text: 'Acknowledge the concern, explain the value you offer and suggest discussing options.', correct: true, feedback: 'Calm, confident and open.' },
        { text: 'Tell them they clearly don’t understand the market.', correct: false, feedback: 'That will end the meeting badly.' },
        { text: 'Immediately offer a 50% discount.', correct: false, feedback: 'Don’t panic — explain your value first.' },
      ] },
      { type: 'write', prompt: 'Write a follow-up email (at least 55 words) to the investor: thank them, answer their concern about prices and propose next steps.', minWords: 55,
        require: [officeWords(3), prepositions(2), advanced(1)], sample: 'Although our prices may seem high at first, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const officeChapter: ChapterDefinition = {
  roomId: 'office',
  title: 'My Office',
  explore,
  challenges: [unpack, busyMonday, budgetOffice],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'meeting-table', prompt: { A1: 'Find the big table.', A2: 'Find where the team meets.', B1: 'Find where you’d sit with clients.', B2: 'Find the conference table.' } },
    { target: 'office-chair', prompt: { A1: 'Find a chair with wheels.', A2: 'Find the office chair.', B1: 'Find what spins round when you sit on it.', B2: 'Find the swivel chair.' } },
    { target: 'filing-cabinet', prompt: { A1: 'Find the cupboard for papers.', A2: 'Find the filing cabinet.', B1: 'Find where contracts are kept.', B2: 'Find the document storage unit.' } },
    { target: 'water-cooler', prompt: { A1: 'Find the water.', A2: 'Find the water cooler.', B1: 'Find where colleagues chat over a drink.', B2: 'Find the drinking-water dispenser.' } },
    { target: 'shredder', prompt: { A1: 'Find the paper cutter.', A2: 'Find the shredder.', B1: 'Find what destroys secret papers.', B2: 'Find the document destroyer.' } },
    { target: 'printer', prompt: { A1: 'Find the printer.', A2: 'Find what puts words on paper.', B1: 'Find what needs new ink.', B2: 'Find the output device for documents.' } },
    { target: 'computer', prompt: { A1: 'Find the computer.', A2: 'Find the computer with a big screen.', B1: 'Find where you read your emails.', B2: 'Find the desktop workstation.' } },
    { target: 'laptop', prompt: { A1: 'Find the small computer.', A2: 'Find the laptop.', B1: 'Find the computer you take to meetings.', B2: 'Find the portable computer.' } },
    { target: 'stapler', prompt: { A1: 'Find the stapler.', A2: 'Find what joins papers.', B1: 'Find what you use to fasten a report.', B2: 'Find the paper fastener.' } },
    { target: 'sticky-notes', prompt: { A1: 'Find the yellow notes.', A2: 'Find the sticky notes.', B1: 'Find something for quick reminders.', B2: 'Find the adhesive notepads.' } },
    { target: 'fire-extinguisher', prompt: { A1: 'Find the red bottle.', A2: 'Find the fire extinguisher.', B1: 'Find what you need in a fire.', B2: 'Find the fire-fighting equipment.' } },
    { target: 'sales-chart', prompt: { A1: 'Find the chart.', A2: 'Find the sales chart.', B1: 'Find what shows how much the company sells.', B2: 'Find the performance graph.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'nearWindow', a: 'meeting-table' }], prompt: { A1: 'Put the meeting table near the window.', B1: 'Give the meeting some daylight.', B2: 'Position the meeting table to benefit from natural light.' } },
    { checks: [{ rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }], prompt: { A1: 'Put the office chair next to the meeting table.', B1: 'Pull a chair up to the table.', B2: 'Position the chair beside the conference table.' } },
    { checks: [{ rel: 'againstWall', a: 'filing-cabinet' }], prompt: { A1: 'Put the filing cabinet against the wall.', B1: 'Push the cabinet back to the wall.', B2: 'Position the filing cabinet flush against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'printer', b: 'filing-cabinet' }], prompt: { A1: 'Put the printer on the filing cabinet.', B1: 'Find a good place for the printer up off the floor.', B2: 'Set the printer on top of the filing cabinet.' } },
    { checks: [{ rel: 'inCorner', a: 'water-cooler' }], prompt: { A1: 'Put the water cooler in the corner.', B1: 'Move the water cooler out of the way.', B2: 'Tuck the water cooler into a corner.' } },
    { checks: [{ rel: 'above', a: 'sales-chart', b: 'meeting-table' }], prompt: { A1: 'Hang the sales chart above the meeting table.', B1: 'Put the chart where the team can see it in meetings.', B2: 'Mount the chart directly above the meeting table.' } },
    { checks: [{ rel: 'onTop', a: 'laptop', b: 'meeting-table' }], prompt: { A1: 'Put the laptop on the meeting table.', B1: 'Get the laptop ready for the meeting.', B2: 'Set up the laptop on the conference table.' } },
    { checks: [{ rel: 'nextTo', a: 'shredder', b: 'filing-cabinet' }], prompt: { A1: 'Put the shredder next to the filing cabinet.', B1: 'Keep the shredder close to the old papers.', B2: 'Position the shredder beside the filing cabinet.' } },
    { checks: [{ rel: 'farFrom', a: 'water-cooler', b: 'meeting-table' }], prompt: { A1: 'Put the water cooler far from the meeting table.', B1: 'Keep chatting away from the meetings.', B2: 'Keep the water cooler at a distance from the meeting table.' } },
    { checks: [{ rel: 'onTop', a: 'computer', b: 'meeting-table' }], prompt: { A1: 'Put the computer on the meeting table.', B1: 'Set up a workstation at the table.', B2: 'Place the desktop computer on the table.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'tech', label: 'Machines', icon: '🖥️' },
      { id: 'things', label: 'Office things', icon: '📎' },
      { id: 'people', label: 'People & places', icon: '👔' },
      { id: 'actions', label: 'Things you do', icon: '⌨️' },
    ],
    items: [
      { word: 'computer', bin: 'tech', level: 'A1' }, { word: 'laptop', bin: 'tech', level: 'A1' },
      { word: 'printer', bin: 'tech', level: 'A1' }, { word: 'keyboard', bin: 'tech', level: 'A1' },
      { word: 'mouse', bin: 'tech', level: 'A1' }, { word: 'shredder', bin: 'tech', level: 'A2' },
      { word: 'water cooler', bin: 'tech', level: 'A2' }, { word: 'password', bin: 'tech', level: 'A2' },
      { word: 'paper', bin: 'things', level: 'A1' }, { word: 'email', bin: 'things', level: 'A1' },
      { word: 'stapler', bin: 'things', level: 'A2' }, { word: 'sticky notes', bin: 'things', level: 'A2' },
      { word: 'file', bin: 'things', level: 'A2' }, { word: 'filing cabinet', bin: 'things', level: 'A2' },
      { word: 'contract', bin: 'things', level: 'B1' }, { word: 'agenda', bin: 'things', level: 'B1' },
      { word: 'boss', bin: 'people', level: 'A1' }, { word: 'office', bin: 'people', level: 'A1' },
      { word: 'colleague', bin: 'people', level: 'A2' }, { word: 'manager', bin: 'people', level: 'A2' },
      { word: 'customer', bin: 'people', level: 'A2' }, { word: 'receptionist', bin: 'people', level: 'A2' },
      { word: 'employee', bin: 'people', level: 'B1' }, { word: 'reception', bin: 'people', level: 'B1' },
      { word: 'work', bin: 'actions', level: 'A1' }, { word: 'type', bin: 'actions', level: 'A1' },
      { word: 'print', bin: 'actions', level: 'A1' }, { word: 'send', bin: 'actions', level: 'A1' },
      { word: 'log in', bin: 'actions', level: 'A2' }, { word: 'take notes', bin: 'actions', level: 'A2' },
      { word: 'attach', bin: 'actions', level: 'B1' }, { word: 'negotiate', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'It’s your first day at work. You meet your boss. What do you say?', options: [
      { text: 'Hello! Nice to meet you.', best: true, feedback: 'Perfect!' },
      { text: 'Give me money.', best: false, feedback: 'That’s not a good start!' },
      { text: 'Goodbye!', best: false, feedback: 'You’ve just arrived!' },
    ] },
    { level: 'A1', situation: 'The printer has no paper. What do you do?', options: [
      { text: 'I put paper in the printer.', best: true, feedback: 'Easy!' },
      { text: 'I hit the printer.', best: false, feedback: 'That won’t help!' },
      { text: 'I go home.', best: false, feedback: 'You can fix it.' },
    ] },
    { level: 'A1', situation: 'You are thirsty at work. What do you do?', options: [
      { text: 'I get water from the water cooler.', best: true, feedback: 'Good idea!' },
      { text: 'I drink from the printer.', best: false, feedback: 'That’s ink!' },
      { text: 'I cry.', best: false, feedback: 'The water cooler is right there.' },
    ] },
    { level: 'A2', situation: 'You’re going to be 15 minutes late for work. What do you do?', options: [
      { text: 'Call or message your manager and say sorry.', best: true, feedback: 'Professional and polite.' },
      { text: 'Say nothing and hope nobody notices.', best: false, feedback: 'People will notice.' },
      { text: 'Don’t go to work at all.', best: false, feedback: 'Fifteen minutes isn’t a reason to stay home.' },
    ] },
    { level: 'A2', situation: 'A colleague’s computer screen shows his password on a sticky note. What do you do?', options: [
      { text: 'Tell him quietly that it isn’t safe.', best: true, feedback: 'Helpful and discreet.' },
      { text: 'Use his password to read his emails.', best: false, feedback: 'Definitely not!' },
      { text: 'Tell the whole office.', best: false, feedback: 'That would embarrass him.' },
    ] },
    { level: 'A2', situation: 'Someone else’s lunch is in the shared fridge. You’re hungry. What do you do?', options: [
      { text: 'Leave it and buy your own lunch.', best: true, feedback: 'Respectful.' },
      { text: 'Eat it quickly.', best: false, feedback: 'That’s stealing — and they’ll be hungry!' },
      { text: 'Eat half of it.', best: false, feedback: 'Still not yours!' },
    ] },
    { level: 'B1', situation: 'You have three urgent tasks and only time for two today. What would you do?', options: [
      { text: 'Talk to your manager about which task is most important.', best: true, feedback: 'Clear communication avoids problems.' },
      { text: 'Do all three badly.', best: false, feedback: 'Quality matters.' },
      { text: 'Choose the easiest two and say nothing.', best: false, feedback: 'Your manager needs to know.' },
    ], reasons: [
      { text: 'Because your manager knows the priorities of the team.', correct: true },
      { text: 'Because managers like long conversations.', correct: false },
      { text: 'Because the easy tasks are always the important ones.', correct: false },
    ] },
    { level: 'B1', situation: 'A colleague keeps talking loudly on the phone near you and you can’t concentrate. What would you do?', options: [
      { text: 'Politely ask if they could take calls in a meeting room.', best: true, feedback: 'Friendly and it solves the problem.' },
      { text: 'Shout at them to be quiet.', best: false, feedback: 'That creates tension.' },
      { text: 'Complain about them to everyone else.', best: false, feedback: 'Talk to them directly first.' },
    ], reasons: [
      { text: 'Because talking directly and politely usually works best.', correct: true },
      { text: 'Because phones are bad.', correct: false },
    ] },
    { level: 'B2', situation: 'Your company wants everyone back in the office five days a week. Many staff prefer working from home.', options: [
      { text: 'Suggest a hybrid model: some days in the office for teamwork, some at home for focused work.', best: true, feedback: 'A balanced compromise.' },
      { text: 'Refuse to come to the office.', best: false, feedback: 'That could cost you your job.' },
      { text: 'Say nothing and look for a new job.', best: false, feedback: 'Your opinion could change things.' },
    ], write: { prompt: 'Justify your suggestion, weighing up the advantages and disadvantages.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'You notice a mistake in a report your manager has already sent to an important client.', options: [
      { text: 'Tell your manager privately straight away and offer to help correct it.', best: true, feedback: 'Honest, discreet and helpful.' },
      { text: 'Email the client yourself without telling anyone.', best: false, feedback: 'Your manager should decide how to handle it.' },
      { text: 'Say nothing — it isn’t your problem.', best: false, feedback: 'It could become a bigger problem.' },
    ], write: { prompt: 'Explain how you would raise the issue tactfully.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'I work in an office.', level: 'A1' },
    { text: 'The printer is out of paper.', level: 'A1' },
    { text: 'I write emails on my computer.', level: 'A1' },
    { text: 'My office chair has wheels.', level: 'A1' },
    { text: 'Can I borrow your stapler?', level: 'A1' },
    { text: 'The water cooler is in the corner.', level: 'A1' },
    { text: 'We have a meeting at ten o’clock.', level: 'A2' },
    { text: 'The contracts are in the filing cabinet.', level: 'A2' },
    { text: 'I wrote the number on a sticky note.', level: 'A2' },
    { text: 'Put old letters in the shredder.', level: 'A2' },
    { text: 'My colleague takes her laptop everywhere.', level: 'A2' },
    { text: 'The sales chart goes up every month.', level: 'A2' },
    { text: 'Could you attach the report to the email?', level: 'B1' },
    { text: 'I applied for a full-time job.', level: 'B1' },
    { text: 'The fire extinguisher is next to the exit.', level: 'B1' },
    { text: 'Please print the agenda before the meeting.', level: 'B1' },
    { text: 'Although the meeting was long, it was useful.', level: 'B2' },
    { text: 'She was promoted after only two years.', level: 'B2' },
    { text: 'Confidential documents must be shredded immediately.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The papers are ___ the filing cabinet.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The laptop is ___ the table.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The water cooler is ___ the printer.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'I work ___ an office.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The meeting is ___ Monday.', answer: 'on', options: ['on', 'in', 'at'], level: 'A2' },
    { sentence: 'I start work ___ nine o’clock.', answer: 'at', options: ['at', 'on', 'in'], level: 'A2' },
    { sentence: 'The chart is ___ the meeting table.', answer: 'above', options: ['above', 'under', 'into'], level: 'A2' },
    { sentence: 'She is ___ a meeting right now.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'I’m responsible ___ the new customers.', answer: 'for', options: ['for', 'of', 'to'], level: 'B1' },
    { sentence: 'Please reply ___ my email.', answer: 'to', options: ['to', 'at', 'for'], level: 'B1' },
    { sentence: 'He applied ___ the job last week.', answer: 'for', options: ['for', 'to', 'on'], level: 'B1' },
    { sentence: 'The deal depends ___ the price.', answer: 'on', options: ['on', 'of', 'from'], level: 'B2' },
    { sentence: 'She is in charge ___ the sales team.', answer: 'of', options: ['of', 'for', 'on'], level: 'B2' },
  ],
};
