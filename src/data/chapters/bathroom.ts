import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  BATHROOM CHAPTER — all missions, mini-game content and practice sentences.
//  Same shape as bedroom.ts and kitchen.ts.
//
//  Furniture ids you can use: bath, washbasin, toilet, shower, towel (towel rail, on the wall),
//  cabinet (on the wall), washing-machine, bath-mat (rug), toothbrush, soap, hairdryer (small),
//  scales
//
//  Surfaces (small things can stand ON them): washbasin, washing-machine
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

// ── Word lists used to check students' writing ─────────────────────────────
const BATHROOM_WORDS = ['bath', 'bathroom', 'shower', 'toilet', 'washbasin', 'basin', 'sink', 'towel', 'towels', 'cabinet', 'washing machine',
  'bath mat', 'mat', 'toothbrush', 'toothpaste', 'soap', 'shampoo', 'hairdryer', 'scales', 'mirror', 'tap', 'shower gel', 'sponge', 'tiles'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const bathroomWords = (count: number): WordRequirement => ({ label: 'bathroom words', words: BATHROOM_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your bathroom.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('get-clean', 'Squeaky clean', '🧼', {
    A1: 'Find two places where you can wash your body.',
    A2: 'Find two places where you can get clean all over.',
    B1: 'Find two things you could use to wash after a football match.',
    B2: 'Identify two fittings designed for washing your whole body.',
  }, ['bath', 'shower'], 2),
  findMission('get-dry', 'Dry off', '🧖', {
    A1: 'Find two things that help you get dry.',
    A2: 'Find two things you use after a shower to get dry.',
    B1: 'Find two things that stop you dripping water all over the floor.',
    B2: 'Identify two items that help you dry off or keep the floor dry.',
  }, ['towel', 'hairdryer', 'bath-mat'], 2),
  findMission('electric', 'Plug it in', '🔌', {
    A1: 'Find two machines.',
    A2: 'Find two things in the bathroom that use electricity.',
    B1: 'Find two appliances you must keep away from water when they’re plugged in.',
    B2: 'Identify the two electrical appliances in your bathroom.',
  }, ['washing-machine', 'hairdryer'], 2),
  findMission('morning', 'Morning routine', '⏰', {
    A1: 'Find two things you use every morning.',
    A2: 'Find two things you use before school.',
    B1: 'Find two things you’d use to get ready in five minutes.',
    B2: 'Find two things that belong to a quick morning routine.',
  }, ['toothbrush', 'soap', 'washbasin', 'shower', 'towel'], 2),
  findMission('store', 'Hide it away', '🗄️', {
    A1: 'Find where you keep medicine.',
    A2: 'Find where you keep plasters and medicine.',
    B1: 'Find the place where things should be out of reach of small children.',
    B2: 'Find the wall-mounted storage with a mirror on the front.',
  }, ['cabinet']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'New Bathroom Things', icon: '🛍️', xp: 60,
  intro: {
    A1: 'You are back from the shop with new things for the bathroom. Open the bags and put everything away.',
    A2: 'You’ve bought everything for the new bathroom. Unpack the bags and put things in the right place.',
    B1: 'The delivery has arrived. The labels describe what’s inside — decide where each thing belongs.',
    B2: 'Your online order came with very vague labels. Work out the most sensible place for everything.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a bag to open it. Then click where the thing goes.', props: [
      box('u1', 'shampoo', ['shower', 'bath']),
      box('u2', 'toothpaste', ['washbasin', 'cabinet']),
      box('u3', 'a new towel', ['towel']),
      box('u4', 'medicine', ['cabinet']),
      box('u5', 'washing powder', ['washing-machine']),
      box('u6', 'hand soap', ['washbasin']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each bag and put the things where they belong.', props: [
      box('u1', 'shampoo and shower gel', ['shower', 'bath']),
      box('u2', 'toothpaste and a new toothbrush', ['washbasin', 'cabinet']),
      box('u3', 'two big towels', ['towel']),
      box('u4', 'plasters and medicine', ['cabinet']),
      box('u5', 'washing powder', ['washing-machine']),
      box('u6', 'a bar of soap', ['washbasin']),
      box('u7', 'toilet paper', ['toilet']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'things you use with water on your hair', ['shower', 'bath']),
      box('u2', 'things for keeping your teeth healthy', ['washbasin', 'cabinet']),
      box('u3', 'something soft for drying yourself', ['towel']),
      box('u4', 'things children shouldn’t be able to reach', ['cabinet']),
      box('u5', 'something that makes clothes smell nice', ['washing-machine']),
      box('u6', 'something for washing your hands', ['washbasin']),
      box('u7', 'rolls you’ll need next to the toilet', ['toilet']),
      box('u8', 'bubbles for a relaxing evening', ['bath']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'haircare products', ['shower', 'bath']),
      box('u2', 'dental hygiene essentials', ['washbasin', 'cabinet']),
      box('u3', 'freshly laundered linen for drying off', ['towel']),
      box('u4', 'a first-aid kit', ['cabinet']),
      box('u5', 'fabric softener', ['washing-machine']),
      box('u6', 'an antibacterial hand wash', ['washbasin']),
      box('u7', 'a spare supply of toilet roll', ['toilet', 'cabinet']),
      box('u8', 'bath salts for soaking', ['bath']),
    ] }],
  },
};

const morningRush: MissionDefinition = {
  id: 'morning-rush', title: 'Morning Rush', icon: '🏃', xp: 60,
  intro: {
    A1: 'It’s 7 o’clock. Everyone needs the bathroom! Tidy it up fast.',
    A2: 'Your family of four shares one bathroom, and everyone is late. Follow Mum’s list.',
    B1: 'It’s a school morning and the bathroom is chaos. Read Mum’s note and sort everything out.',
    B2: 'Your older brother left the bathroom in a state before rushing to work. Deal with his note.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing on the floor, then click where it goes.', props: [
      thing('m1', 'the wet towel', 'clothes', '#f6a6a6', ['towel'], 'Hang the wet towel on the towel rail.'),
      thing('m2', 'the dirty socks', 'socks', '#ffffff', ['washing-machine'], 'Put the dirty socks in the washing machine.'),
      thing('m3', 'the shampoo', 'bottle', '#9fd8c2', ['shower', 'bath'], 'Put the shampoo in the shower.'),
      thing('m4', 'the toothpaste', 'bottle', '#a9c9f2', ['washbasin'], 'Put the toothpaste on the washbasin.'),
      thing('m5', 'the rubber duck', 'toy', '#ffd54f', ['bath'], 'Put the duck in the bath.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'Your little sister can’t find her toothbrush. Click it.', targets: ['toothbrush'] },
      { type: 'sort', prompt: 'Tidy up! Follow each instruction.', props: [
        thing('m1', 'the wet towels', 'clothes', '#f6a6a6', ['towel'], 'Hang the wet towels up so they can dry.'),
        thing('m2', 'Dad’s dirty T-shirt', 'clothes', '#a8d0f0', ['washing-machine'], 'Put Dad’s dirty T-shirt in the washing machine.'),
        thing('m3', 'the shower gel', 'bottle', '#c9b6e4', ['shower', 'bath'], 'Put the shower gel back in the shower.'),
        thing('m4', 'the medicine', 'box', '#ffffff', ['cabinet'], 'Put the medicine in the cabinet.'),
        thing('m5', 'the hairbrush', 'phone', '#d9a874', ['cabinet', 'washbasin'], 'Put the hairbrush next to the mirror.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'Mum needs to dry her hair but she’s already late. What should you pass her? Click it.', targets: ['hairdryer'] },
      { type: 'sort', prompt: 'Read Mum’s note and put everything away.', props: [
        thing('m1', 'the soaking wet towels', 'clothes', '#f6a6a6', ['towel'], 'Wet towels on the floor go mouldy — hang them up.'),
        thing('m2', 'the muddy football kit', 'clothes', '#9fd08f', ['washing-machine'], 'Your football kit needs to be clean by Saturday.'),
        thing('m3', 'the open shampoo bottle', 'bottle', '#9fd8c2', ['shower', 'bath'], 'Close the shampoo and put it back where we use it.'),
        thing('m4', 'the cough medicine', 'box', '#ffffff', ['cabinet'], 'Medicine must be out of reach of your little sister.'),
        thing('m5', 'the empty toilet roll', 'box', '#e8e2d4', ['toilet'], 'Someone used the last toilet roll — put a new one where it’s needed.'),
      ] },
      { type: 'choice', prompt: 'Your brother has been in the shower for 25 minutes. What do you say?', options: [
        { text: 'Could you hurry up, please? I need to get ready for school.', correct: true, feedback: 'Polite and clear.' },
        { text: 'Get out now!', correct: false, feedback: 'He might hurry, but it isn’t very polite.' },
        { text: 'Can I have a shower?', correct: false, feedback: 'True, but he won’t know you’re in a hurry.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'The washbasin is blocked and won’t drain. Which fitting needs fixing? Click it.', targets: ['washbasin'] },
      { type: 'sort', prompt: 'Your brother’s note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'the damp towels', 'clothes', '#f6a6a6', ['towel'], 'If the towels stay in a heap, they’ll start to smell.'),
        thing('m2', 'my gym clothes', 'clothes', '#9fd08f', ['washing-machine'], 'I’d appreciate it if my gym kit were clean by tomorrow.'),
        thing('m3', 'the conditioner', 'bottle', '#9fd8c2', ['shower', 'bath'], 'The conditioner lives where the water is, not on the floor.'),
        thing('m4', 'the painkillers', 'box', '#ffffff', ['cabinet'], 'The painkillers really shouldn’t be left lying around.'),
        thing('m5', 'the razor', 'phone', '#b8c1c9', ['cabinet'], 'The razor is sharp, so somewhere high and closed would be best.'),
        thing('m6', 'the hairdryer cable', 'phone', '#5b5560', ['washing-machine', 'cabinet'], 'Keep the hairdryer well away from the bath, please.'),
      ] },
      { type: 'write', prompt: 'Write a short, polite note to your brother asking him to keep the bathroom tidy. Explain why.', minWords: 35,
        require: [bathroomWords(2), connectors(1), advanced(1)], sample: 'Although I know you’re busy in the mornings, could you...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'bath', name: 'Big bath', description: 'A long bath for relaxing. It takes a lot of space.', price: 70, tags: ['wash', 'big'] },
  { id: 'shower', name: 'Shower cubicle', description: 'A small shower. It saves space and water.', price: 50, tags: ['wash'] },
  { id: 'washing-machine', name: 'Washing machine', description: 'Washes all your clothes. It is big.', price: 60, tags: ['laundry', 'big'] },
  { id: 'laundry-bag', name: 'Laundry bag', description: 'Collect dirty clothes and wash them at the launderette.', price: 10, tags: ['laundry'] },
  { id: 'cabinet', name: 'Mirror cabinet', description: 'A cabinet with a mirror on the door.', price: 30, tags: ['store'] },
  { id: 'shelf', name: 'Small shelf', description: 'A simple shelf for toiletries. Cheap.', price: 10, tags: ['store'] },
  { id: 'towels', name: 'Set of towels', description: 'Four soft towels.', price: 20, tags: ['dry'] },
  { id: 'heated-rail', name: 'Heated towel rail', description: 'Keeps towels warm and dry, but it is expensive.', price: 45, tags: ['dry'] },
  { id: 'mat', name: 'Bath mat', description: 'Stops you slipping on a wet floor.', price: 8, tags: ['safe'] },
  { id: 'scales', name: 'Digital scales', description: 'Tells you how heavy you are.', price: 15, tags: ['extra'] },
];

const budgetBathroom: MissionDefinition = {
  id: 'budget-bathroom', title: 'Bathroom on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'Your cousin has a new flat. The bathroom is empty. Help him buy things.',
    A2: 'Your cousin has just moved into a tiny flat and the bathroom is empty. He doesn’t have much money.',
    B1: 'Your cousin’s new bathroom is very small. Choose things that fit the space and the budget.',
    B2: 'You’re helping your cousin equip a tiny bathroom on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 90 coins. Your cousin needs something to wash in and something to dry with.', budget: 90,
        items: SHOP_ITEMS.filter((i) => ['bath', 'shower', 'towels', 'heated-rail', 'scales'].includes(i.id)),
        needs: [{ tag: 'wash', label: 'wash' }, { tag: 'dry', label: 'get dry' }] },
      { type: 'place', prompt: 'Now in YOUR bathroom: put the bath mat in front of the bath.', checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 110 coins. Your cousin needs to wash, get dry and keep his things somewhere.', budget: 110,
        items: SHOP_ITEMS.filter((i) => i.id !== 'washing-machine' && i.id !== 'laundry-bag'),
        needs: [{ tag: 'wash', label: 'wash' }, { tag: 'dry', label: 'get dry' }, { tag: 'store', label: 'store things' }] },
      { type: 'place', prompt: 'Now in YOUR bathroom: hang the cabinet above the washbasin.', checks: [{ rel: 'above', a: 'cabinet', b: 'washbasin' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 130 coins. The bathroom is tiny, so choose only ONE big item. Your cousin needs to wash, dry, store things and do his laundry.', budget: 130, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'wash', label: 'wash' }, { tag: 'dry', label: 'get dry' }, { tag: 'store', label: 'store things' }, { tag: 'laundry', label: 'laundry' }] },
      { type: 'write', prompt: 'Write a short message to your cousin explaining what you bought and why.', minWords: 25,
        require: [bathroomWords(2), connectors(1)], sample: 'I bought a shower because the bathroom is small, and...' },
      { type: 'place', prompt: 'Now in YOUR bathroom: put the washing machine in a corner.', checks: [{ rel: 'inCorner', a: 'washing-machine' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 140 coins and space for only ONE bulky item. Your cousin needs to wash, dry, store things, do laundry and be safe on a wet floor.', budget: 140, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'wash', label: 'wash' }, { tag: 'dry', label: 'get dry' }, { tag: 'store', label: 'store things' }, { tag: 'laundry', label: 'laundry' }, { tag: 'safe', label: 'safety' }] },
      { type: 'write', prompt: 'Justify your choices to your cousin’s parents, who are paying. Mention one option you rejected and why.', minWords: 45,
        require: [bathroomWords(3), connectors(1), advanced(1)], sample: 'I chose a shower instead of a bath because it saves space, which means...' },
      { type: 'place', prompt: 'Now in YOUR bathroom: make the space safe — the hairdryer must be well away from the bath.',
        checks: [{ rel: 'farFrom', a: 'hairdryer', b: 'bath' }] },
    ],
  },
};

// ── STAGE 5: BATHROOM MAKEOVER ─────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Bathroom Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your bathroom nice! Read and move the furniture. Then press Check.',
    A2: 'Time for a bathroom makeover! Follow the instructions and move the real furniture.',
    B1: 'Give your bathroom a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'A bathroom designer has sent you a brief. Interpret it and rearrange your bathroom accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the washbasin against the wall.', checks: [{ rel: 'againstWall', a: 'washbasin' }] },
      { type: 'place', prompt: 'Hang the cabinet above the washbasin.', checks: [{ rel: 'above', a: 'cabinet', b: 'washbasin' }] },
      { type: 'place', prompt: 'Put the toothbrush on the washbasin.', checks: [{ rel: 'onTop', a: 'toothbrush', b: 'washbasin' }] },
      { type: 'place', prompt: 'Put the bath mat in front of the bath.', checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }] },
      { type: 'place', prompt: 'Put the washing machine in the corner.', checks: [{ rel: 'inCorner', a: 'washing-machine' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the washbasin against the wall and hang the cabinet above it.',
        checks: [{ rel: 'againstWall', a: 'washbasin' }, { rel: 'above', a: 'cabinet', b: 'washbasin' }] },
      { type: 'place', prompt: 'Put the toothbrush and the soap on the washbasin.',
        checks: [{ rel: 'onTop', a: 'toothbrush', b: 'washbasin' }, { rel: 'onTop', a: 'soap', b: 'washbasin' }] },
      { type: 'place', prompt: 'Put the bath mat in front of the bath and the scales next to the washbasin.',
        checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }, { rel: 'nextTo', a: 'scales', b: 'washbasin' }] },
      { type: 'place', prompt: 'Put the hairdryer on the washing machine.', checks: [{ rel: 'onTop', a: 'hairdryer', b: 'washing-machine' }] },
    ],
    B1: [
      { type: 'place', prompt: 'You want to check your teeth in the mirror: hang the cabinet right above the washbasin.',
        checks: [{ rel: 'above', a: 'cabinet', b: 'washbasin' }] },
      { type: 'place', prompt: 'Nobody wants to slip: put the bath mat where you step out of the bath.',
        checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }] },
      { type: 'place', prompt: 'Electricity and water don’t mix: keep the hairdryer far from the bath, on top of the washing machine.',
        checks: [{ rel: 'farFrom', a: 'hairdryer', b: 'bath' }, { rel: 'onTop', a: 'hairdryer', b: 'washing-machine' }] },
      { type: 'place', prompt: 'Save space: tuck the washing machine into a corner.', checks: [{ rel: 'inCorner', a: 'washing-machine' }] },
      { type: 'write', prompt: 'Describe your new bathroom in 3–4 sentences. Say where things are.', minWords: 25,
        require: [bathroomWords(3), prepositions(2)], sample: 'The cabinet is above the washbasin...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a grooming zone: the washbasin against a wall with the mirror cabinet directly above it.',
        checks: [{ rel: 'againstWall', a: 'washbasin' }, { rel: 'above', a: 'cabinet', b: 'washbasin' }] },
      { type: 'place', prompt: 'Keep everyday essentials within reach: toothbrush and soap both on the basin.',
        checks: [{ rel: 'onTop', a: 'toothbrush', b: 'washbasin' }, { rel: 'onTop', a: 'soap', b: 'washbasin' }] },
      { type: 'place', prompt: 'Minimise the risk of slipping and electric shocks: mat in front of the bath, hairdryer well away from it.',
        checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }, { rel: 'farFrom', a: 'hairdryer', b: 'bath' }] },
      { type: 'place', prompt: 'Make the most of the corner space for the washing machine.', checks: [{ rel: 'inCorner', a: 'washing-machine' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What works well, what is still not ideal, and why?', minWords: 45,
        require: [bathroomWords(3), prepositions(2), advanced(1)], sample: 'Although the bathroom is small, the washing machine now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'A Guest for the Weekend', icon: '🧳', xp: 150,
  intro: {
    A1: 'Your cousin is staying for the weekend! Get the bathroom ready.',
    A2: 'Your cousin is coming to stay this weekend. Make the bathroom clean and nice for her.',
    B1: 'A friend from another country is staying with your family. Prepare the bathroom and help her feel at home.',
    B2: 'An exchange student is staying with you for a week. Make the bathroom welcoming and practical, and explain the house rules.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'Your cousin wants to wash her hands. Where does she go? Click it.', targets: ['washbasin'] },
      { type: 'sort', prompt: 'Get ready: put a clean towel on the rail and soap on the washbasin.', props: [
        thing('f1', 'a clean towel', 'clothes', '#9fd8c2', ['towel'], 'Put the clean towel on the towel rail.'),
        thing('f2', 'new soap', 'box', '#f7b2d0', ['washbasin'], 'Put the new soap on the washbasin.'),
      ] },
      { type: 'choice', prompt: 'Your cousin asks: “Where is the toothpaste?” What do you say?', options: [
        { text: 'It’s in the cabinet.', correct: true, feedback: 'Yes! “in the cabinet”.' },
        { text: 'It’s toothpaste.', correct: false, feedback: 'She wants to know WHERE it is.' },
        { text: 'I am in the cabinet.', correct: false, feedback: 'Use “It’s in/on/next to...”.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your bathroom for your cousin.', minWords: 8, require: [bathroomWords(2)], sample: 'The towel is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Your cousin has long hair. What will she need after her shower? Click it.', targets: ['hairdryer'] },
      { type: 'sort', prompt: 'Get the bathroom ready for your guest.', props: [
        thing('f1', 'a clean towel', 'clothes', '#9fd8c2', ['towel'], 'Hang a clean towel on the rail.'),
        thing('f2', 'a new toothbrush', 'phone', '#5aa9e6', ['washbasin', 'cabinet'], 'Put a new toothbrush by the washbasin.'),
        thing('f3', 'shampoo', 'bottle', '#c9b6e4', ['shower', 'bath'], 'Put the shampoo in the shower.'),
      ] },
      { type: 'sort', prompt: 'Clean up before she arrives.', props: [
        thing('f4', 'your dirty clothes', 'clothes', '#a8d0f0', ['washing-machine'], 'Put your dirty clothes in the washing machine.'),
        thing('f5', 'the empty shampoo bottle', 'bottle', '#e8e2d4', ['cabinet', 'washing-machine'], 'Take the empty bottle away from the shower.'),
      ] },
      { type: 'place', prompt: 'Your cousin must not slip: put the bath mat in front of the bath.', checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }] },
      { type: 'write', prompt: 'Write a note for your cousin. Use at least 3 bathroom words and 2 prepositions.', minWords: 15,
        require: [bathroomWords(3), prepositions(2)], sample: 'Your towel is on…' },
    ],
    B1: [
      { type: 'find', prompt: 'Your friend forgot her toothbrush. Where would you look for a spare one? Click it.', targets: ['cabinet'] },
      { type: 'sort', prompt: 'Make the bathroom welcoming.', props: [
        thing('f1', 'a fluffy guest towel', 'clothes', '#9fd8c2', ['towel'], 'Hang a fresh towel where she can find it.'),
        thing('f2', 'a new bar of soap', 'box', '#f7b2d0', ['washbasin'], 'Put fresh soap by the basin.'),
        thing('f3', 'travel-size shampoo', 'bottle', '#c9b6e4', ['shower', 'bath'], 'Leave her some shampoo where she’ll shower.'),
      ] },
      { type: 'sort', prompt: 'Put away anything that makes the bathroom look messy.', props: [
        thing('f4', 'Dad’s razor', 'phone', '#b8c1c9', ['cabinet'], 'Dad’s razor shouldn’t be lying around.'),
        thing('f5', 'the pile of laundry', 'clothes', '#ffd27a', ['washing-machine'], 'Nobody wants to see a pile of laundry.'),
        thing('f6', 'the wet bath mat', 'clothes', '#7fc0d8', ['washing-machine'], 'The bath mat is soaking — wash it.'),
      ] },
      { type: 'place', prompt: 'Make it safe and practical: mat in front of the bath and the cabinet above the washbasin.',
        checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }, { rel: 'above', a: 'cabinet', b: 'washbasin' }] },
      { type: 'write', prompt: 'Write a message (at least 35 words) telling your friend where everything is in the bathroom and why.', minWords: 35,
        require: [bathroomWords(3), connectors(1)], sample: 'Welcome! Your towel is on the rail, so...' },
    ],
    B2: [
      { type: 'find', prompt: 'Your guest wants to wash her clothes after a long trip. Which appliance do you show her? Click it.', targets: ['washing-machine'] },
      { type: 'sort', prompt: 'Set the bathroom up to a high standard.', props: [
        thing('f1', 'a set of fresh towels', 'clothes', '#9fd8c2', ['towel'], 'Make sure she has fresh towels.'),
        thing('f2', 'a guest toothbrush', 'phone', '#5aa9e6', ['washbasin', 'cabinet'], 'Leave a spare toothbrush within reach.'),
        thing('f3', 'unscented shower gel', 'bottle', '#c9b6e4', ['shower', 'bath'], 'She has sensitive skin, so leave the unscented gel where she’ll wash.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unhygienic or unsafe is left out.', props: [
        thing('f4', 'the medicine', 'box', '#ffffff', ['cabinet'], 'Medicines must be stored safely.'),
        thing('f5', 'the damp towels', 'clothes', '#f6a6a6', ['washing-machine'], 'Old damp towels need a proper wash.'),
        thing('f6', 'the hairdryer', 'phone', '#c9b6e4', ['washing-machine', 'cabinet'], 'The hairdryer shouldn’t be anywhere near the bath.'),
      ] },
      { type: 'choice', prompt: 'Your guest is used to very long showers, but your family pays a lot for hot water. What is the most tactful thing to do?', options: [
        { text: 'Explain the house rules kindly on the first day, e.g. showers of about ten minutes.', correct: true, feedback: 'Clear and friendly — she knows what to expect.' },
        { text: 'Turn the hot water off while she’s in the shower.', correct: false, feedback: 'That’s rude and could make her feel unwelcome.' },
        { text: 'Say nothing and complain about her to your friends.', correct: false, feedback: 'That doesn’t solve anything.' },
      ] },
      { type: 'write', prompt: 'Write a welcome note (at least 55 words) explaining how the bathroom works and the house rules, politely.', minWords: 55,
        require: [bathroomWords(4), prepositions(2), advanced(1)], sample: 'Welcome! Although our bathroom is quite small, ...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const bathroomChapter: ChapterDefinition = {
  roomId: 'bathroom',
  title: 'My Bathroom',
  explore,
  challenges: [unpack, morningRush, budgetBathroom],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'bath', prompt: { A1: 'Find where you can relax in warm water.', A2: 'Find where the rubber duck swims.', B1: 'Find where you’d soak after a long day.', B2: 'Find the largest fitting in the room.' } },
    { target: 'shower', prompt: { A1: 'Find where water comes from above.', A2: 'Find a quick way to get clean.', B1: 'Find where you’d wash after sport.', B2: 'Find the enclosure with a glass screen.' } },
    { target: 'toilet', prompt: { A1: 'Find the toilet.', A2: 'Find what you flush.', B1: 'Find what needs toilet paper next to it.', B2: 'Find the fitting with a cistern.' } },
    { target: 'washbasin', prompt: { A1: 'Find where you wash your hands.', A2: 'Find where you brush your teeth.', B1: 'Find the small sink with a tap.', B2: 'Find the basin under the mirror cabinet.' } },
    { target: 'towel', prompt: { A1: 'Find something to dry you.', A2: 'Find what hangs on the rail.', B1: 'Find what you reach for after a shower.', B2: 'Find the absorbent cloth on the wall.' } },
    { target: 'cabinet', prompt: { A1: 'Find where the medicine is.', A2: 'Find something with a mirror.', B1: 'Find where plasters are kept.', B2: 'Find the wall-mounted storage.' } },
    { target: 'washing-machine', prompt: { A1: 'Find a machine for clothes.', A2: 'Find what washes your socks.', B1: 'Find where your football kit goes after a match.', B2: 'Find the appliance with a round glass door.' } },
    { target: 'bath-mat', prompt: { A1: 'Find something soft on the floor.', A2: 'Find what you stand on after a bath.', B1: 'Find what stops you slipping.', B2: 'Find the non-slip mat.' } },
    { target: 'toothbrush', prompt: { A1: 'Find something for your teeth.', A2: 'Find what you put toothpaste on.', B1: 'Find what you use twice a day for two minutes.', B2: 'Find what your dentist tells you to replace every three months.' } },
    { target: 'soap', prompt: { A1: 'Find something for clean hands.', A2: 'Find what makes bubbles on your hands.', B1: 'Find what you use before eating.', B2: 'Find what removes germs from your hands.' } },
    { target: 'hairdryer', prompt: { A1: 'Find a machine for your hair.', A2: 'Find what blows hot air.', B1: 'Find what you use when your hair is wet.', B2: 'Find the appliance you must never use near water.' } },
    { target: 'scales', prompt: { A1: 'Find something you stand on.', A2: 'Find what shows how heavy you are.', B1: 'Find what you’d use to weigh yourself.', B2: 'Find the device that measures your weight.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'above', a: 'cabinet', b: 'washbasin' }], prompt: { A1: 'Hang the cabinet above the washbasin.', B1: 'Put the mirror cabinet where you can see yourself while washing.', B2: 'Mount the mirror cabinet directly over the basin.' } },
    { checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }], prompt: { A1: 'Put the bath mat in front of the bath.', B1: 'Put the bath mat where you step out of the bath.', B2: 'Position the mat to prevent slipping as you get out.' } },
    { checks: [{ rel: 'onTop', a: 'toothbrush', b: 'washbasin' }], prompt: { A1: 'Put the toothbrush on the washbasin.', B1: 'Keep the toothbrush by the tap.', B2: 'Place the toothbrush within reach of the basin.' } },
    { checks: [{ rel: 'onTop', a: 'soap', b: 'washbasin' }], prompt: { A1: 'Put the soap on the washbasin.', B1: 'Put the soap where you wash your hands.', B2: 'Leave the soap beside the tap.' } },
    { checks: [{ rel: 'inCorner', a: 'washing-machine' }], prompt: { A1: 'Put the washing machine in the corner.', B1: 'Save space by moving the washing machine into a corner.', B2: 'Make use of the corner space for the washing machine.' } },
    { checks: [{ rel: 'farFrom', a: 'hairdryer', b: 'bath' }], prompt: { A1: 'Put the hairdryer far from the bath.', B1: 'Keep the hairdryer away from the water in the bath.', B2: 'Keep the electrical appliance at a safe distance from the bath.' } },
    { checks: [{ rel: 'nextTo', a: 'scales', b: 'washbasin' }], prompt: { A1: 'Put the scales next to the washbasin.', B1: 'Put the scales near the basin, out of the way.', B2: 'Tuck the scales beside the basin.' } },
    { checks: [{ rel: 'againstWall', a: 'bath' }], prompt: { A1: 'Put the bath against the wall.', B1: 'Push the bath against a wall to save space.', B2: 'Position the bath flush against a wall.' } },
    { checks: [{ rel: 'inCorner', a: 'shower' }], prompt: { A1: 'Put the shower in the corner.', B1: 'Showers fit best in a corner — move it there.', B2: 'Install the shower in a corner to free up floor space.' } },
    { checks: [{ rel: 'nextTo', a: 'toilet', b: 'washbasin' }], prompt: { A1: 'Put the toilet next to the washbasin.', B1: 'Put the toilet close to the basin so you can wash your hands.', B2: 'Position the toilet beside the basin for hygiene.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'fittings', label: 'Fittings', icon: '🛁' },
      { id: 'toiletries', label: 'Toiletries', icon: '🧴' },
      { id: 'laundry', label: 'Laundry', icon: '🧺' },
      { id: 'actions', label: 'Things you do', icon: '🪥' },
    ],
    items: [
      { word: 'bath', bin: 'fittings', level: 'A1' }, { word: 'shower', bin: 'fittings', level: 'A1' },
      { word: 'toilet', bin: 'fittings', level: 'A1' }, { word: 'washbasin', bin: 'fittings', level: 'A2' },
      { word: 'tap', bin: 'fittings', level: 'A2' }, { word: 'towel rail', bin: 'fittings', level: 'A2' },
      { word: 'radiator', bin: 'fittings', level: 'B1' }, { word: 'drain', bin: 'fittings', level: 'B1' },
      { word: 'soap', bin: 'toiletries', level: 'A1' }, { word: 'toothpaste', bin: 'toiletries', level: 'A1' },
      { word: 'shampoo', bin: 'toiletries', level: 'A1' }, { word: 'shower gel', bin: 'toiletries', level: 'A2' },
      { word: 'conditioner', bin: 'toiletries', level: 'A2' }, { word: 'deodorant', bin: 'toiletries', level: 'B1' },
      { word: 'razor', bin: 'toiletries', level: 'B1' }, { word: 'dental floss', bin: 'toiletries', level: 'B1' },
      { word: 'socks', bin: 'laundry', level: 'A1' }, { word: 'T-shirt', bin: 'laundry', level: 'A1' },
      { word: 'towel', bin: 'laundry', level: 'A1' }, { word: 'washing machine', bin: 'laundry', level: 'A2' },
      { word: 'washing powder', bin: 'laundry', level: 'B1' }, { word: 'laundry basket', bin: 'laundry', level: 'A2' },
      { word: 'fabric softener', bin: 'laundry', level: 'B2' }, { word: 'pyjamas', bin: 'laundry', level: 'A2' },
      { word: 'brush your teeth', bin: 'actions', level: 'A1' }, { word: 'have a shower', bin: 'actions', level: 'A1' },
      { word: 'wash your hands', bin: 'actions', level: 'A1' }, { word: 'dry your hair', bin: 'actions', level: 'A2' },
      { word: 'flush', bin: 'actions', level: 'A2' }, { word: 'rinse', bin: 'actions', level: 'B1' },
      { word: 'shave', bin: 'actions', level: 'B1' }, { word: 'soak', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'Your hands are dirty. What do you do?', options: [
      { text: 'I wash my hands with soap.', best: true, feedback: 'Yes! Soap and water.' },
      { text: 'I put my hands in the washing machine.', best: false, feedback: 'Ouch! That’s for clothes.' },
      { text: 'I dry my hands with the hairdryer.', best: false, feedback: 'Wash them first!' },
    ] },
    { level: 'A1', situation: 'Your towel is wet. Where do you put it?', options: [
      { text: 'On the towel rail.', best: true, feedback: 'Right — it can dry there.' },
      { text: 'On the floor.', best: false, feedback: 'It won’t dry, and someone will slip!' },
      { text: 'In the cabinet.', best: false, feedback: 'A wet towel in a closed cabinet will smell.' },
    ] },
    { level: 'A1', situation: 'It is 9 o’clock in the evening. What do you do before bed?', options: [
      { text: 'I brush my teeth.', best: true, feedback: 'Perfect!' },
      { text: 'I do the laundry.', best: false, feedback: 'Maybe, but your teeth come first.' },
      { text: 'I stand on the scales.', best: false, feedback: 'That won’t help you sleep!' },
    ] },
    { level: 'A2', situation: 'The bath is full of water and your phone rings in the kitchen. What do you do?', options: [
      { text: 'Turn off the tap first, then answer the phone.', best: true, feedback: 'Good idea — no flood.' },
      { text: 'Run to the phone and leave the tap on.', best: false, feedback: 'The water will go everywhere!' },
      { text: 'Bring the phone into the bath.', best: false, feedback: 'Water and phones don’t mix.' },
    ] },
    { level: 'A2', situation: 'Your family always runs out of toilet paper. What can help?', options: [
      { text: 'Keep a few spare rolls in the cabinet.', best: true, feedback: 'Simple and smart.' },
      { text: 'Use towels instead.', best: false, feedback: 'Please don’t!' },
      { text: 'Buy one roll every day.', best: false, feedback: 'That’s a lot of trips to the shop.' },
    ] },
    { level: 'A2', situation: 'The bathroom floor is wet and slippery. What should you do?', options: [
      { text: 'Dry it and put the bath mat down.', best: true, feedback: 'Right — now nobody will fall.' },
      { text: 'Walk carefully and leave it.', best: false, feedback: 'Someone else might slip.' },
      { text: 'Use the hairdryer on the floor.', best: false, feedback: 'Electricity near water is dangerous.' },
    ] },
    { level: 'B1', situation: 'There is black mould on the ceiling above the shower. How would you deal with it?', options: [
      { text: 'Clean it and open the window after every shower.', best: true, feedback: 'This deals with the cause: steam with nowhere to go.' },
      { text: 'Paint over it.', best: false, feedback: 'It will just come back.' },
      { text: 'Stop having showers.', best: false, feedback: 'Not very practical — or hygienic.' },
    ], reasons: [
      { text: 'Because fresh air stops the bathroom staying damp.', correct: true },
      { text: 'Because mould likes the cold.', correct: false },
      { text: 'Because it is the cheapest option.', correct: false },
    ] },
    { level: 'B1', situation: 'Your little brother wants to use the hairdryer while he is in the bath. What would you do?', options: [
      { text: 'Stop him and explain that electricity and water are dangerous together.', best: true, feedback: 'He stays safe and understands why.' },
      { text: 'Let him, but tell him to be careful.', best: false, feedback: 'Being careful isn’t enough — it’s really dangerous.' },
      { text: 'Hide the hairdryer and say nothing.', best: false, feedback: 'He won’t learn why it’s dangerous.' },
    ], reasons: [
      { text: 'Because he learns a safety rule he can use for life.', correct: true },
      { text: 'Because hairdryers are expensive.', correct: false },
    ] },
    { level: 'B2', situation: 'Five people share one bathroom and there is a queue every morning. What would you suggest?', options: [
      { text: 'Agree on a morning timetable with time slots for everyone.', best: true, feedback: 'Fair, clear and it tackles the cause.' },
      { text: 'Get up at 5 a.m. so you are always first.', best: false, feedback: 'It solves your problem, not the family’s.' },
      { text: 'Lock the door and take as long as you like.', best: false, feedback: 'That will only cause arguments.' },
    ], write: { prompt: 'Justify your suggestion, considering how each family member might react.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Your water bill is very high and the shower is old and wastes water. What would you suggest to your parents?', options: [
      { text: 'Fit a water-saving shower head, since it pays for itself quickly.', best: true, feedback: 'A well-reasoned, low-cost long-term solution.' },
      { text: 'Have a bath every day instead.', best: false, feedback: 'Baths usually use even more water.' },
      { text: 'Ignore it; bills are always high.', best: false, feedback: 'That doesn’t address the problem.' },
    ], write: { prompt: 'Explain your suggestion, weighing up the cost against the benefits.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'I brush my teeth every morning.', level: 'A1' },
    { text: 'The towel is on the rail.', level: 'A1' },
    { text: 'I wash my hands with soap.', level: 'A1' },
    { text: 'The bath mat is in front of the bath.', level: 'A1' },
    { text: 'My toothbrush is in a cup.', level: 'A1' },
    { text: 'I have a shower after school.', level: 'A1' },
    { text: 'The cabinet is above the washbasin.', level: 'A2' },
    { text: 'Put your dirty clothes in the washing machine.', level: 'A2' },
    { text: 'I dry my hair with a hairdryer.', level: 'A2' },
    { text: 'Don’t forget to flush the toilet.', level: 'A2' },
    { text: 'The shampoo is next to the shower gel.', level: 'A2' },
    { text: 'The scales are under the washbasin.', level: 'A2' },
    { text: 'Could you hang up your wet towel, please?', level: 'B1' },
    { text: 'Open the window so the bathroom doesn’t get steamy.', level: 'B1' },
    { text: 'The floor is slippery, so be careful.', level: 'B1' },
    { text: 'Medicine should be kept out of reach of children.', level: 'B1' },
    { text: 'Although the bathroom is small, it is well designed.', level: 'B2' },
    { text: 'A shorter shower saves both water and money.', level: 'B2' },
    { text: 'Electrical appliances should never be used near water.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The rubber duck is ___ the bath.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The soap is ___ the washbasin.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'The scales are ___ the washbasin.', answer: 'under', options: ['under', 'on', 'in'], level: 'A1' },
    { sentence: 'The toilet is ___ the bath.', answer: 'next to', options: ['next to', 'in', 'on'], level: 'A1' },
    { sentence: 'The mirror cabinet is ___ the washbasin.', answer: 'above', options: ['above', 'under', 'in'], level: 'A2' },
    { sentence: 'The washbasin is ___ the toilet and the shower.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The bath mat is ___ front of the bath.', answer: 'in', options: ['in', 'on', 'at'], level: 'A2' },
    { sentence: 'The shower is ___ the bath, on the other side of the room.', answer: 'opposite', options: ['opposite', 'next to', 'behind'], level: 'A2' },
    { sentence: 'The bath stands ___ the wall.', answer: 'against', options: ['against', 'in', 'at'], level: 'B1' },
    { sentence: 'Hang your towel ___ the rail to dry.', answer: 'on', options: ['on', 'in', 'at'], level: 'B1' },
    { sentence: 'Please wipe the water ___ the floor.', answer: 'off', options: ['off', 'out', 'over'], level: 'B1' },
    { sentence: 'The extractor fan is directly ___ the shower.', answer: 'above', options: ['above', 'over to', 'beneath of'], level: 'B2' },
    { sentence: 'Keep the medicine ___ of reach of children.', answer: 'out', options: ['out', 'off', 'away'], level: 'B2' },
  ],
};
