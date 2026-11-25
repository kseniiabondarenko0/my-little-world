import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  HOSPITAL CHAPTER — all missions, mini-game content and practice sentences.
//  A bright ward in the city hospital. Same shape as the other rooms.
//
//  Furniture ids you can use: x-ray, eye-chart (on the wall),
//  hospital-bed, wheelchair, drip-stand, medical-trolley, crutches (floor),
//  stethoscope, thermometer, bandage, syringe, heart-monitor (small)
//
//  Surfaces (small things can stand ON them): medical-trolley
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const HOSPITAL_WORDS = ['hospital', 'doctor', 'nurse', 'patient', 'bed', 'hospital bed', 'wheelchair', 'drip stand', 'trolley', 'medical trolley', 'crutches',
  'stethoscope', 'thermometer', 'bandage', 'syringe', 'heart monitor', 'monitor', 'x-ray', 'eye chart', 'medicine', 'ward', 'temperature'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const hospitalWords = (count: number): WordRequirement => ({ label: 'hospital words', words: HOSPITAL_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in the hospital ward.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('check-up', 'Check-up', '🩺', {
    A1: 'Find two things the doctor uses.',
    A2: 'Find what the doctor listens with and what checks your temperature.',
    B1: 'Find two things a doctor needs for a quick check-up.',
    B2: 'Identify two diagnostic instruments.',
  }, ['stethoscope', 'thermometer'], 2),
  findMission('broken-leg', 'A broken leg', '🦴', {
    A1: 'Find two things for a broken leg.',
    A2: 'Find the picture of the bones and what helps you walk.',
    B1: 'Find what shows the break and what you’ll need to go home.',
    B2: 'Identify the scan and the mobility aid for a fractured leg.',
  }, ['x-ray', 'crutches'], 2),
  findMission('getting-around', 'Getting around', '♿', {
    A1: 'Find two things with wheels.',
    A2: 'Find the chair with wheels and the bed with wheels.',
    B1: 'Find two ways to move a patient who can’t walk.',
    B2: 'Identify two means of transporting patients.',
  }, ['wheelchair', 'hospital-bed'], 2),
  findMission('nurse-round', 'The nurse’s round', '💉', {
    A1: 'Find two things the nurse uses.',
    A2: 'Find what the nurse uses for a cut and for an injection.',
    B1: 'Find what the nurse needs to dress a wound and give a vaccine.',
    B2: 'Identify the dressing and the injection equipment.',
  }, ['bandage', 'syringe'], 2),
  findMission('eye-test', 'Eye test', '👁️', {
    A1: 'Find the letters on the wall.',
    A2: 'Find the eye chart.',
    B1: 'Find what you read when the doctor checks your eyesight.',
    B2: 'Find the visual acuity chart.',
  }, ['eye-chart']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'New Ward', icon: '📦', xp: 60,
  intro: {
    A1: 'The hospital has a new ward! Open the boxes and put everything in the right place.',
    A2: 'A new ward opens tomorrow. Help the nurses unpack the boxes.',
    B1: 'The new children’s ward opens tomorrow. Read the labels and get everything ready.',
    B2: 'The supplier’s labels use a lot of medical language. Work out where each delivery belongs.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'sheets and a pillow', ['hospital-bed']),
      box('u2', 'a bag for the drip', ['drip-stand']),
      box('u3', 'rolls of white cloth', ['bandage', 'medical-trolley']),
      box('u4', 'a cushion for the seat with wheels', ['wheelchair']),
      box('u5', 'a picture of bones', ['x-ray']),
      box('u6', 'needles', ['syringe', 'medical-trolley']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'clean sheets', ['hospital-bed']),
      box('u2', 'a bag of medicine for the drip', ['drip-stand']),
      box('u3', 'bandages and plasters', ['bandage', 'medical-trolley']),
      box('u4', 'a seat belt for the wheelchair', ['wheelchair']),
      box('u5', 'X-ray pictures', ['x-ray']),
      box('u6', 'new needles', ['syringe', 'medical-trolley']),
      box('u7', 'batteries for the thermometer', ['thermometer']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'something to make the patient comfortable at night', ['hospital-bed']),
      box('u2', 'liquid medicine that goes into the arm', ['drip-stand']),
      box('u3', 'things to cover cuts and wounds', ['bandage', 'medical-trolley']),
      box('u4', 'rubber grips for walking sticks', ['crutches']),
      box('u5', 'photos of a patient’s bones', ['x-ray']),
      box('u6', 'sticky pads for checking heartbeats', ['heart-monitor']),
      box('u7', 'a new card with smaller and smaller letters', ['eye-chart']),
      box('u8', 'covers for the temperature tool', ['thermometer']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'pressure-relieving mattress topper', ['hospital-bed']),
      box('u2', 'saline solution for intravenous use', ['drip-stand']),
      box('u3', 'sterile wound dressings', ['bandage', 'medical-trolley']),
      box('u4', 'replacement ferrules for walking aids', ['crutches']),
      box('u5', 'radiographs for the consultant', ['x-ray']),
      box('u6', 'ECG electrodes', ['heart-monitor']),
      box('u7', 'a Snellen chart', ['eye-chart']),
      box('u8', 'disposable needles', ['syringe', 'medical-trolley']),
    ] }],
  },
};

const busyShift: MissionDefinition = {
  id: 'busy-shift', title: 'Busy Night Shift', icon: '🌙', xp: 60,
  intro: {
    A1: 'It’s night in the hospital. The ward is a mess! Help the nurse.',
    A2: 'You’re helping on a busy night shift. Follow the head nurse’s note.',
    B1: 'Three new patients arrive tonight and the ward isn’t ready. Read the head nurse’s note and sort things out.',
    B2: 'The head nurse is in an emergency and you’re left to prepare the ward. Follow her note carefully.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the pillow', 'box', '#ffffff', ['hospital-bed'], 'Put the pillow on the bed.'),
      thing('m2', 'the bandages', 'box', '#f3ead8', ['medical-trolley'], 'Put the bandages on the trolley.'),
      thing('m3', 'the medicine bag', 'bottle', '#dff3ff', ['drip-stand'], 'Hang the medicine on the drip stand.'),
      thing('m4', 'the blanket', 'box', '#8fd3c1', ['wheelchair', 'hospital-bed'], 'Put the blanket on the wheelchair.'),
      thing('m5', 'the pills', 'cup', '#ffd54f', ['medical-trolley'], 'Put the pills on the trolley.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'A patient feels hot. What do you need? Click it.', targets: ['thermometer'] },
      { type: 'sort', prompt: 'Follow the head nurse’s note.', props: [
        thing('m1', 'clean sheets', 'box', '#ffffff', ['hospital-bed'], 'Make the bed with clean sheets.'),
        thing('m2', 'a bag of medicine', 'bottle', '#dff3ff', ['drip-stand'], 'Hang the medicine on the drip stand.'),
        thing('m3', 'a box of bandages', 'box', '#f3ead8', ['medical-trolley'], 'Put the bandages on the trolley.'),
        thing('m4', 'a patient’s slippers', 'shoes', '#c9b6e4', ['hospital-bed', 'wheelchair'], 'Put the slippers by the bed.'),
        thing('m5', 'a water jug', 'bottle', '#9fd8ff', ['medical-trolley'], 'Put the water on the trolley.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'A patient’s heartbeat must be checked every hour. What shows it? Click it.', targets: ['heart-monitor'] },
      { type: 'sort', prompt: 'Read the head nurse’s note and put everything in its place.', props: [
        thing('m1', 'the new patient’s X-ray', 'book', '#1c2733', ['x-ray'], 'Put it up so the doctor can see it on her round.'),
        thing('m2', 'used needles', 'phone', '#b9c2cc', ['medical-trolley'], 'They’re dangerous — keep them on the nurse’s trolley for the safe bin.'),
        thing('m3', 'a walking aid for Mr Brown', 'phone', '#b9c2cc', ['crutches', 'hospital-bed'], 'He broke his leg and needs it by the bed.'),
        thing('m4', 'an extra blanket', 'box', '#8fd3c1', ['hospital-bed', 'wheelchair'], 'The ward gets cold at night.'),
        thing('m5', 'fresh dressings', 'box', '#f3ead8', ['medical-trolley', 'bandage'], 'Keep them ready for the morning.'),
      ] },
      { type: 'choice', prompt: 'A worried relative asks you if her dad will be OK. What do you say?', options: [
        { text: 'I understand you’re worried. The doctor will come and talk to you soon.', correct: true, feedback: 'Kind and honest — you’re not the doctor.' },
        { text: 'Don’t worry, he’ll be fine!', correct: false, feedback: 'You can’t promise that.' },
        { text: 'I don’t know. Go away.', correct: false, feedback: 'Very unkind to a worried person.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'A new patient may have a fractured wrist. What will the doctor need to look at first?', targets: ['x-ray'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'confidential patient notes', 'book', '#ffffff', ['medical-trolley'], 'Keep them with the nurse, not lying around.'),
        thing('m2', 'an IV bag', 'bottle', '#dff3ff', ['drip-stand'], 'Hang it before the patient arrives.'),
        thing('m3', 'a pressure cushion', 'box', '#8fd3c1', ['wheelchair'], 'Mrs Lee will be sitting for a long time.'),
        thing('m4', 'walking aids', 'phone', '#b9c2cc', ['crutches'], 'Store them together so nobody trips.'),
        thing('m5', 'sterile dressings', 'box', '#f3ead8', ['bandage', 'medical-trolley'], 'Keep them sealed until they’re needed.'),
        thing('m6', 'a new set of electrodes', 'phone', '#e04848', ['heart-monitor'], 'The heart readings stopped an hour ago.'),
      ] },
      { type: 'write', prompt: 'Write a short handover note for the morning nurse explaining what is ready and what still needs doing.', minWords: 35,
        require: [hospitalWords(2), connectors(1), advanced(1)], sample: 'Although the drip stand is ready, ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'beds', name: 'Three hospital beds', description: 'Beds with wheels. They take a lot of space.', price: 60, tags: ['bed', 'big'] },
  { id: 'bed', name: 'One folding bed', description: 'A simple bed for one patient.', price: 20, tags: ['bed'] },
  { id: 'wheelchair', name: 'Wheelchair', description: 'For patients who can’t walk.', price: 25, tags: ['move'] },
  { id: 'crutches', name: 'Crutches', description: 'Cheap and light.', price: 8, tags: ['move'] },
  { id: 'monitor', name: 'Heart monitor', description: 'Checks the heart all the time. Expensive.', price: 45, tags: ['check'] },
  { id: 'kit', name: 'Doctor’s kit', description: 'A stethoscope and a thermometer.', price: 15, tags: ['check'] },
  { id: 'xray', name: 'X-ray machine', description: 'Very big and very expensive.', price: 55, tags: ['check', 'big'] },
  { id: 'bandages', name: 'Box of bandages', description: 'For cuts and sprains.', price: 6, tags: ['care'] },
  { id: 'trolley', name: 'Medical trolley', description: 'Keeps everything in one place.', price: 18, tags: ['care'] },
  { id: 'toys', name: 'Toys for children', description: 'Makes young patients smile.', price: 10, tags: ['extra'] },
];

const budgetHospital: MissionDefinition = {
  id: 'budget-hospital', title: 'Clinic on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'A village needs a small clinic. Help the doctor buy things.',
    A2: 'A small village clinic is opening and there isn’t much money. Help the doctor choose.',
    B1: 'The village clinic is just one small room. Choose things that fit the space and the budget.',
    B2: 'You’re advising a charity that is equipping a one-room village clinic on a tight budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. The doctor needs a bed and something to check patients with.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['beds', 'bed', 'monitor', 'kit', 'toys'].includes(i.id)),
        needs: [{ tag: 'bed', label: 'bed' }, { tag: 'check', label: 'check patients' }] },
      { type: 'place', prompt: 'Now in YOUR ward: put the thermometer on the medical trolley.', checks: [{ rel: 'onTop', a: 'thermometer', b: 'medical-trolley' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. The clinic needs a bed, something to help people move and something to check patients.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['xray', 'trolley'].includes(i.id)),
        needs: [{ tag: 'bed', label: 'bed' }, { tag: 'move', label: 'move' }, { tag: 'check', label: 'check' }] },
      { type: 'place', prompt: 'Now in YOUR ward: put the drip stand next to the hospital bed.', checks: [{ rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The clinic is tiny, so choose only ONE big item. It needs a bed, mobility help, a way to check patients and first aid.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'bed', label: 'bed' }, { tag: 'move', label: 'move' }, { tag: 'check', label: 'check' }, { tag: 'care', label: 'first aid' }] },
      { type: 'write', prompt: 'Write a short message to the doctor explaining what you bought and why.', minWords: 25,
        require: [hospitalWords(2), connectors(1)], sample: 'I bought one folding bed because the clinic is small, and...' },
      { type: 'place', prompt: 'Now in YOUR ward: put the hospital bed against the wall.', checks: [{ rel: 'againstWall', a: 'hospital-bed' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. The clinic needs a bed, mobility aids, diagnostics, first aid and something to cheer up children.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'bed', label: 'bed' }, { tag: 'move', label: 'mobility' }, { tag: 'check', label: 'diagnostics' }, { tag: 'care', label: 'first aid' }, { tag: 'extra', label: 'for children' }] },
      { type: 'write', prompt: 'Justify your choices to the charity. Mention one option you rejected and why.', minWords: 45,
        require: [hospitalWords(3), connectors(1), advanced(1)], sample: 'I chose a doctor’s kit instead of a heart monitor because...' },
      { type: 'place', prompt: 'Now in YOUR ward: patients need daylight — hospital bed near the window.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }] },
    ],
  },
};

// ── STAGE 5: WARD MAKEOVER ─────────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Ward Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make the ward nice for patients! Read and move the things. Then press Check.',
    A2: 'Time for a ward makeover! Follow the instructions and move the real things.',
    B1: 'Give the ward a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'The head of nursing has sent you a brief. Interpret it and rearrange the ward accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the hospital bed against the wall.', checks: [{ rel: 'againstWall', a: 'hospital-bed' }] },
      { type: 'place', prompt: 'Put the drip stand next to the hospital bed.', checks: [{ rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }] },
      { type: 'place', prompt: 'Put the heart monitor on the medical trolley.', checks: [{ rel: 'onTop', a: 'heart-monitor', b: 'medical-trolley' }] },
      { type: 'place', prompt: 'Put the wheelchair in the corner.', checks: [{ rel: 'inCorner', a: 'wheelchair' }] },
      { type: 'place', prompt: 'Put the bandage on the medical trolley.', checks: [{ rel: 'onTop', a: 'bandage', b: 'medical-trolley' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the hospital bed near the window and the drip stand next to it.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }] },
      { type: 'place', prompt: 'Hang the X-ray above the hospital bed.', checks: [{ rel: 'above', a: 'x-ray', b: 'hospital-bed' }] },
      { type: 'place', prompt: 'Put the medical trolley next to the bed and the stethoscope on it.',
        checks: [{ rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }, { rel: 'onTop', a: 'stethoscope', b: 'medical-trolley' }] },
      { type: 'place', prompt: 'Put the wheelchair in the corner.', checks: [{ rel: 'inCorner', a: 'wheelchair' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Patients get better with daylight: hospital bed near the window, drip stand beside it.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }] },
      { type: 'place', prompt: 'The nurse needs everything close: medical trolley next to the bed with the heart monitor on it.',
        checks: [{ rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }, { rel: 'onTop', a: 'heart-monitor', b: 'medical-trolley' }] },
      { type: 'place', prompt: 'Keep the way clear: crutches against the wall.', checks: [{ rel: 'againstWall', a: 'crutches' }] },
      { type: 'place', prompt: 'Park the wheelchair in a corner.', checks: [{ rel: 'inCorner', a: 'wheelchair' }] },
      { type: 'write', prompt: 'Describe your new ward in 3–4 sentences. Say where things are.', minWords: 25,
        require: [hospitalWords(3), prepositions(2)], sample: 'The hospital bed is near the window...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a calm, practical bed space: bed near the window, drip stand beside it, X-ray above it.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }, { rel: 'above', a: 'x-ray', b: 'hospital-bed' }] },
      { type: 'place', prompt: 'Keep clinical equipment within reach: trolley next to the bed with the syringe on it.',
        checks: [{ rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }, { rel: 'onTop', a: 'syringe', b: 'medical-trolley' }] },
      { type: 'place', prompt: 'Keep walkways clear: wheelchair tucked into a corner, far from the bed.',
        checks: [{ rel: 'inCorner', a: 'wheelchair' }, { rel: 'farFrom', a: 'wheelchair', b: 'hospital-bed' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What helps patients and staff, what is still not ideal, and why?', minWords: 45,
        require: [hospitalWords(3), prepositions(2), advanced(1)], sample: 'Although the ward is small, the bed now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Day as a Doctor', icon: '🩺', xp: 150,
  intro: {
    A1: 'Today you help the doctor! A boy fell off his bike. Help him.',
    A2: 'You’re spending a day with a hospital doctor. A boy fell off his bike — help look after him.',
    B1: 'You’re shadowing a doctor in the emergency ward. A teenager has had a bike accident. Help from arrival to going home.',
    B2: 'As a medical student on placement, you help treat a cyclist after an accident and talk to the worried family.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'The boy can’t walk. What does he sit in? Click it.', targets: ['wheelchair'] },
      { type: 'sort', prompt: 'Help the nurse: put the bandage on the trolley and the pillow on the bed.', props: [
        thing('f1', 'the bandage', 'box', '#f3ead8', ['medical-trolley', 'bandage'], 'Put the bandage on the trolley.'),
        thing('f2', 'the pillow', 'box', '#ffffff', ['hospital-bed'], 'Put the pillow on the bed.'),
      ] },
      { type: 'choice', prompt: 'The doctor asks: “Where does it hurt?” What does the boy say?', options: [
        { text: 'My leg hurts.', correct: true, feedback: 'Clear answer!' },
        { text: 'I am a leg.', correct: false, feedback: 'His LEG hurts!' },
        { text: 'Yes, please.', correct: false, feedback: 'That doesn’t answer the question.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about the hospital ward.', minWords: 8, require: [hospitalWords(2)], sample: 'The bed is…' },
    ],
    A2: [
      { type: 'find', prompt: 'The doctor wants to see his bones. What does she look at? Click it.', targets: ['x-ray'] },
      { type: 'sort', prompt: 'Get the bed ready.', props: [
        thing('f1', 'clean sheets', 'box', '#ffffff', ['hospital-bed'], 'Put clean sheets on the bed.'),
        thing('f2', 'a bag of medicine', 'bottle', '#dff3ff', ['drip-stand'], 'Hang the medicine on the drip stand.'),
        thing('f3', 'old bandages', 'box', '#e8e2d4', ['medical-trolley'], 'Put the old bandages on the trolley.'),
      ] },
      { type: 'place', prompt: 'He needs to rest: put the drip stand next to the hospital bed.', checks: [{ rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }] },
      { type: 'write', prompt: 'Write a get-well card for the boy. Use at least 3 hospital words and 2 prepositions.', minWords: 15,
        require: [hospitalWords(3), prepositions(2)], sample: 'Get well soon! You are in the hospital bed…' },
    ],
    B1: [
      { type: 'find', prompt: 'He feels very hot. Check for a fever. Click it.', targets: ['thermometer'] },
      { type: 'sort', prompt: 'Help treat him.', props: [
        thing('f1', 'a sterile bandage', 'box', '#f3ead8', ['bandage', 'medical-trolley'], 'His knee is cut and must be covered.'),
        thing('f2', 'the X-ray of his leg', 'book', '#1c2733', ['x-ray'], 'Put it up so the doctor can check for a break.'),
        thing('f3', 'pain medicine', 'cup', '#ffd54f', ['medical-trolley'], 'Keep it with the nurse until the doctor says yes.'),
      ] },
      { type: 'sort', prompt: 'Get him ready to go home.', props: [
        thing('f4', 'a walking aid', 'phone', '#b9c2cc', ['crutches'], 'He’ll need help walking for six weeks.'),
        thing('f5', 'his bike helmet', 'toy', '#e04848', ['hospital-bed', 'wheelchair'], 'Keep his things near him.'),
        thing('f6', 'a used syringe', 'phone', '#b9c2cc', ['medical-trolley'], 'Never leave it on the bed!'),
      ] },
      { type: 'place', prompt: 'Make him comfortable: bed near the window and the medical trolley next to it.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) to his parents explaining what happened and how he is now.', minWords: 35,
        require: [hospitalWords(3), connectors(1)], sample: 'Your son fell off his bike, so he...' },
    ],
    B2: [
      { type: 'find', prompt: 'Before any surgery, the team needs to check the patient’s heart is stable. What do you look at?', targets: ['heart-monitor'] },
      { type: 'sort', prompt: 'Prepare the treatment area to a high standard.', props: [
        thing('f1', 'an IV bag of fluids', 'bottle', '#dff3ff', ['drip-stand'], 'He’s lost a lot of fluid — set it up beside the bed.'),
        thing('f2', 'sterile dressings', 'box', '#f3ead8', ['bandage', 'medical-trolley'], 'Keep them sealed until the wound is cleaned.'),
        thing('f3', 'the radiographs', 'book', '#1c2733', ['x-ray'], 'Display them for the consultant’s review.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unsafe is left out.', props: [
        thing('f4', 'used needles', 'phone', '#b9c2cc', ['medical-trolley'], 'Sharps must go back for safe disposal.'),
        thing('f5', 'a spare wheelchair', 'box', '#3c6fd1', ['wheelchair'], 'It mustn’t block the corridor.'),
        thing('f6', 'patient records', 'book', '#ffffff', ['medical-trolley'], 'Confidential — keep them with staff.'),
      ] },
      { type: 'choice', prompt: 'His mother is upset and demands to see the X-ray results immediately. What is the most professional response?', options: [
        { text: 'Acknowledge her worry, explain the doctor will go through the results with her shortly, and stay with her.', correct: true, feedback: 'Calm, empathetic and honest.' },
        { text: 'Show her the X-ray and give your own diagnosis.', correct: false, feedback: 'Only the doctor should explain results.' },
        { text: 'Tell her to calm down and wait outside.', correct: false, feedback: 'That would upset her even more.' },
      ] },
      { type: 'write', prompt: 'Write a short report (at least 55 words) on the patient’s treatment today and the advice for his recovery at home.', minWords: 55,
        require: [hospitalWords(3), prepositions(2), advanced(1)], sample: 'Although the patient arrived in pain, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const hospitalChapter: ChapterDefinition = {
  roomId: 'hospital',
  title: 'My Hospital',
  explore,
  challenges: [unpack, busyShift, budgetHospital],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'hospital-bed', prompt: { A1: 'Find the bed.', A2: 'Find the hospital bed.', B1: 'Find where a patient rests.', B2: 'Find the adjustable bed.' } },
    { target: 'wheelchair', prompt: { A1: 'Find the chair with wheels.', A2: 'Find the wheelchair.', B1: 'Find how a patient who can’t walk gets around.', B2: 'Find the mobility chair.' } },
    { target: 'drip-stand', prompt: { A1: 'Find the tall pole.', A2: 'Find the drip stand.', B1: 'Find what holds the bag of medicine.', B2: 'Find the IV pole.' } },
    { target: 'medical-trolley', prompt: { A1: 'Find the small table with wheels.', A2: 'Find the medical trolley.', B1: 'Find what the nurse pushes around.', B2: 'Find the treatment cart.' } },
    { target: 'crutches', prompt: { A1: 'Find two sticks.', A2: 'Find the crutches.', B1: 'Find what you need with a broken leg.', B2: 'Find the walking aids.' } },
    { target: 'stethoscope', prompt: { A1: 'Find the doctor’s listening thing.', A2: 'Find the stethoscope.', B1: 'Find what the doctor listens to your heart with.', B2: 'Find the auscultation instrument.' } },
    { target: 'thermometer', prompt: { A1: 'Find the thermometer.', A2: 'Find what checks your temperature.', B1: 'Find what tells you if you have a fever.', B2: 'Find the digital thermometer.' } },
    { target: 'bandage', prompt: { A1: 'Find the bandage.', A2: 'Find the white roll for cuts.', B1: 'Find what covers a wound.', B2: 'Find the dressing.' } },
    { target: 'syringe', prompt: { A1: 'Find the needle.', A2: 'Find the syringe.', B1: 'Find what the nurse uses for injections.', B2: 'Find the hypodermic syringe.' } },
    { target: 'heart-monitor', prompt: { A1: 'Find the machine that beeps.', A2: 'Find the heart monitor.', B1: 'Find what shows a patient’s heartbeat.', B2: 'Find the cardiac monitor.' } },
    { target: 'x-ray', prompt: { A1: 'Find the picture of bones.', A2: 'Find the X-ray.', B1: 'Find what shows a broken bone.', B2: 'Find the radiograph.' } },
    { target: 'eye-chart', prompt: { A1: 'Find the letters.', A2: 'Find the eye chart.', B1: 'Find what tests your eyesight.', B2: 'Find the vision chart.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'againstWall', a: 'hospital-bed' }], prompt: { A1: 'Put the hospital bed against the wall.', B1: 'Push the bed back against the wall.', B2: 'Position the bed flush against a wall.' } },
    { checks: [{ rel: 'nearWindow', a: 'hospital-bed' }], prompt: { A1: 'Put the hospital bed near the window.', B1: 'Give the patient some daylight.', B2: 'Position the bed to benefit from natural light.' } },
    { checks: [{ rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }], prompt: { A1: 'Put the drip stand next to the hospital bed.', B1: 'Keep the drip close to the patient.', B2: 'Position the IV pole beside the bed.' } },
    { checks: [{ rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }], prompt: { A1: 'Put the medical trolley next to the bed.', B1: 'Keep the nurse’s things close to the bed.', B2: 'Position the trolley beside the bed.' } },
    { checks: [{ rel: 'onTop', a: 'heart-monitor', b: 'medical-trolley' }], prompt: { A1: 'Put the heart monitor on the medical trolley.', B1: 'Set up the heart monitor where the nurse can see it.', B2: 'Place the cardiac monitor on the trolley.' } },
    { checks: [{ rel: 'inCorner', a: 'wheelchair' }], prompt: { A1: 'Put the wheelchair in the corner.', B1: 'Park the wheelchair out of the way.', B2: 'Tuck the wheelchair into a corner.' } },
    { checks: [{ rel: 'above', a: 'x-ray', b: 'hospital-bed' }], prompt: { A1: 'Hang the X-ray above the bed.', B1: 'Put the X-ray where the doctor can see it from the bed.', B2: 'Mount the radiograph above the bed.' } },
    { checks: [{ rel: 'againstWall', a: 'crutches' }], prompt: { A1: 'Put the crutches against the wall.', B1: 'Lean the crutches on the wall so nobody trips.', B2: 'Rest the walking aids against a wall.' } },
    { checks: [{ rel: 'onTop', a: 'thermometer', b: 'medical-trolley' }], prompt: { A1: 'Put the thermometer on the trolley.', B1: 'Get ready to check a temperature.', B2: 'Leave the thermometer on the trolley.' } },
    { checks: [{ rel: 'farFrom', a: 'wheelchair', b: 'hospital-bed' }], prompt: { A1: 'Put the wheelchair far from the bed.', B1: 'Keep space around the bed for the doctors.', B2: 'Keep the wheelchair clear of the bed area.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'equipment', label: 'Equipment', icon: '🩺' },
      { id: 'health', label: 'Body & health', icon: '🤒' },
      { id: 'people', label: 'People & places', icon: '👩‍⚕️' },
      { id: 'actions', label: 'Things you do', icon: '💊' },
    ],
    items: [
      { word: 'hospital bed', bin: 'equipment', level: 'A1' }, { word: 'wheelchair', bin: 'equipment', level: 'A2' },
      { word: 'thermometer', bin: 'equipment', level: 'A2' }, { word: 'bandage', bin: 'equipment', level: 'A2' },
      { word: 'stethoscope', bin: 'equipment', level: 'A2' }, { word: 'crutches', bin: 'equipment', level: 'A2' },
      { word: 'syringe', bin: 'equipment', level: 'A2' }, { word: 'X-ray', bin: 'equipment', level: 'A2' },
      { word: 'headache', bin: 'health', level: 'A1' }, { word: 'heart', bin: 'health', level: 'A1' },
      { word: 'cough', bin: 'health', level: 'A2' }, { word: 'fever', bin: 'health', level: 'A2' },
      { word: 'flu', bin: 'health', level: 'A2' }, { word: 'sore throat', bin: 'health', level: 'A2' },
      { word: 'symptom', bin: 'health', level: 'B1' }, { word: 'diagnosis', bin: 'health', level: 'B2' },
      { word: 'doctor', bin: 'people', level: 'A1' }, { word: 'nurse', bin: 'people', level: 'A1' },
      { word: 'hospital', bin: 'people', level: 'A1' }, { word: 'patient', bin: 'people', level: 'A2' },
      { word: 'pharmacy', bin: 'people', level: 'A2' }, { word: 'waiting room', bin: 'people', level: 'A2' },
      { word: 'surgeon', bin: 'people', level: 'B1' }, { word: 'ward', bin: 'people', level: 'B1' },
      { word: 'help', bin: 'actions', level: 'A1' }, { word: 'hurt', bin: 'actions', level: 'A1' },
      { word: 'feel better', bin: 'actions', level: 'A2' }, { word: 'take medicine', bin: 'actions', level: 'A2' },
      { word: 'break your leg', bin: 'actions', level: 'A2' }, { word: 'examine', bin: 'actions', level: 'B1' },
      { word: 'recover', bin: 'actions', level: 'B1' }, { word: 'sprain', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You have a headache. What do you do?', options: [
      { text: 'I tell my mum or dad.', best: true, feedback: 'Good — they can help.' },
      { text: 'I eat lots of sweets.', best: false, feedback: 'That won’t help!' },
      { text: 'I run around very fast.', best: false, feedback: 'Better to rest.' },
    ] },
    { level: 'A1', situation: 'Your friend falls and cuts her knee. What do you do?', options: [
      { text: 'I get a teacher and a plaster.', best: true, feedback: 'Very helpful!' },
      { text: 'I laugh.', best: false, feedback: 'That’s not kind.' },
      { text: 'I walk away.', best: false, feedback: 'She needs help.' },
    ] },
    { level: 'A1', situation: 'The doctor says: “Open your mouth, please.” What do you do?', options: [
      { text: 'I open my mouth and say “Aaah”.', best: true, feedback: 'Perfect patient!' },
      { text: 'I close my eyes.', best: false, feedback: 'Your MOUTH, please!' },
      { text: 'I go home.', best: false, feedback: 'The doctor is helping you.' },
    ] },
    { level: 'A2', situation: 'You have a temperature of 39 degrees. What should you do?', options: [
      { text: 'Stay at home, rest and call the doctor.', best: true, feedback: 'Sensible.' },
      { text: 'Go to school and play football.', best: false, feedback: 'You’re too ill — and you could make others ill.' },
      { text: 'Have a very hot bath.', best: false, feedback: 'That could make the fever worse.' },
    ] },
    { level: 'A2', situation: 'An old man in the waiting room can’t find his glasses to read his form. What do you do?', options: [
      { text: 'Offer to read the form to him.', best: true, feedback: 'Kind and helpful.' },
      { text: 'Ignore him and look at your phone.', best: false, feedback: 'A small act of kindness helps.' },
      { text: 'Tell him to come back tomorrow.', best: false, feedback: 'He needs help now.' },
    ] },
    { level: 'A2', situation: 'You visit your grandma in hospital. What can you bring?', options: [
      { text: 'Flowers, a card or a book.', best: true, feedback: 'Lovely gifts.' },
      { text: 'A big noisy dog.', best: false, feedback: 'Animals usually aren’t allowed in wards.' },
      { text: 'Loud music.', best: false, feedback: 'Other patients need to rest.' },
    ] },
    { level: 'B1', situation: 'You think you’ve sprained your ankle playing basketball. What would you do?', options: [
      { text: 'Stop playing, rest it with ice and see a doctor if it doesn’t improve.', best: true, feedback: 'Sensible first aid.' },
      { text: 'Keep playing — it’ll be fine.', best: false, feedback: 'You could make the injury worse.' },
      { text: 'Go straight to an emergency ward by ambulance.', best: false, feedback: 'Ambulances are for real emergencies.' },
    ], reasons: [
      { text: 'Because rest and ice reduce swelling, and a doctor can check for a break.', correct: true },
      { text: 'Because basketball is boring.', correct: false },
      { text: 'Because ambulances are fast.', correct: false },
    ] },
    { level: 'B1', situation: 'Your friend is scared of injections and has to get a vaccine. How would you help?', options: [
      { text: 'Go with her, talk to her to distract her and remind her it’s quick.', best: true, feedback: 'Supportive and practical.' },
      { text: 'Tell her it will hurt a lot.', best: false, feedback: 'That will make her more scared.' },
      { text: 'Tell her to skip the vaccine.', best: false, feedback: 'Vaccines protect her health.' },
    ], reasons: [
      { text: 'Because having a friend there makes it less frightening.', correct: true },
      { text: 'Because needles are fun.', correct: false },
    ] },
    { level: 'B2', situation: 'The hospital wants to reduce visiting hours to one hour a day to give patients more rest.', options: [
      { text: 'Suggest flexible quiet times plus longer visits for patients who need family support.', best: true, feedback: 'Balances rest with emotional support.' },
      { text: 'Ban visitors completely.', best: false, feedback: 'Families are important for recovery.' },
      { text: 'Allow visitors at any time, day or night.', best: false, feedback: 'Patients need rest too.' },
    ], write: { prompt: 'Justify your suggestion, weighing up the needs of patients, families and staff.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'A friend reads health advice on social media and wants to stop taking the medicine her doctor prescribed.', options: [
      { text: 'Encourage her to talk to her doctor before changing anything.', best: true, feedback: 'Responsible and respectful.' },
      { text: 'Agree — the internet knows best.', best: false, feedback: 'Online advice can be dangerous.' },
      { text: 'Tell her she’s stupid.', best: false, feedback: 'That won’t persuade her.' },
    ], write: { prompt: 'Explain how you would persuade her tactfully.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'The doctor listens to my heart.', level: 'A1' },
    { text: 'The nurse is very kind.', level: 'A1' },
    { text: 'I have a headache.', level: 'A1' },
    { text: 'My leg hurts a lot.', level: 'A1' },
    { text: 'The patient is in bed.', level: 'A1' },
    { text: 'He sits in a wheelchair.', level: 'A1' },
    { text: 'I have a fever and a cough.', level: 'A2' },
    { text: 'She broke her leg skiing.', level: 'A2' },
    { text: 'Take this medicine three times a day.', level: 'A2' },
    { text: 'The nurse puts a bandage on my arm.', level: 'A2' },
    { text: 'The X-ray shows a broken bone.', level: 'A2' },
    { text: 'I hope you feel better soon.', level: 'A2' },
    { text: 'I need to make an appointment with the doctor.', level: 'B1' },
    { text: 'The doctor gave me a prescription.', level: 'B1' },
    { text: 'He is recovering after his operation.', level: 'B1' },
    { text: 'Are you allergic to any medicine?', level: 'B1' },
    { text: 'Although the operation went well, he must rest.', level: 'B2' },
    { text: 'The diagnosis was confirmed by an X-ray.', level: 'B2' },
    { text: 'Flu is highly infectious, so stay at home.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The patient is ___ bed.', answer: 'in', options: ['in', 'on', 'at'], level: 'A1' },
    { sentence: 'The bandage is ___ the trolley.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The drip stand is ___ the bed.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'My mum works ___ a hospital.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The X-ray is ___ the bed.', answer: 'above', options: ['above', 'under', 'into'], level: 'A2' },
    { sentence: 'I have an appointment ___ Tuesday.', answer: 'on', options: ['on', 'in', 'at'], level: 'A2' },
    { sentence: 'Put the thermometer ___ your arm.', answer: 'under', options: ['under', 'on', 'at'], level: 'A2' },
    { sentence: 'She went ___ hospital by ambulance.', answer: 'to', options: ['to', 'in', 'at'], level: 'A2' },
    { sentence: 'He is allergic ___ nuts.', answer: 'to', options: ['to', 'of', 'with'], level: 'B1' },
    { sentence: 'She is suffering ___ a bad cold.', answer: 'from', options: ['from', 'of', 'with'], level: 'B1' },
    { sentence: 'The doctor prescribed something ___ the pain.', answer: 'for', options: ['for', 'to', 'at'], level: 'B1' },
    { sentence: 'He recovered ___ the operation quickly.', answer: 'from', options: ['from', 'of', 'after'], level: 'B2' },
    { sentence: 'The patient was discharged ___ hospital on Friday.', answer: 'from', options: ['from', 'of', 'out'], level: 'B2' },
  ],
};
