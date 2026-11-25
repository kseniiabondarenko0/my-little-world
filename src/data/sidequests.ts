import type { MissionDefinition, MissionStep, PropDef, WordRequirement } from '../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  SIDE QUESTS — optional extra missions for each room, with an XP reward.
//
//  They open once every piece of furniture is in the room (stage "Move In" done)
//  and don't count towards chapter progress, so nobody is blocked by them.
//  They reuse the mission steps of the chapters (find, place, sort, choice, write).
//  Text is English, so they show only in the English course.
//
//  Text and steps can change by level: { A1: ..., A2: ..., B1: ..., B2: ... }
//  (missing levels use the closest lower level).
// ═══════════════════════════════════════════════════════════════════════════

const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite', 'in the corner', 'in', 'inside'];
const LINKERS = ['because', 'so', 'first', 'then', 'after that', 'finally', 'and', 'but'];
const ADVANCED = ['although', 'however', 'which means', 'instead of', 'even though', 'therefore', 'whereas'];
const BEDROOM = ['bed', 'lamp', 'bedside table', 'carpet', 'wardrobe', 'desk', 'chair', 'bookshelf', 'picture', 'mirror', 'plant', 'chest', 'pillow', 'blanket'];
const KITCHEN = ['table', 'fridge', 'cooker', 'oven', 'sink', 'stool', 'kettle', 'cupboard', 'microwave', 'toaster', 'bin', 'dishwasher', 'plate', 'cup', 'bowl', 'pan', 'saucepan'];

const prep = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const linkers = (count: number): WordRequirement => ({ label: 'linking words (first, then, because...)', words: LINKERS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however...)', words: ADVANCED, count });
const room = (words: string[], label: string) => (count: number): WordRequirement => ({ label, words, count });
const bedroomWords = room(BEDROOM, 'bedroom words');
const kitchenWords = room(KITCHEN, 'kitchen words');
const BATHROOM = ['bath', 'shower', 'toilet', 'washbasin', 'basin', 'towel', 'cabinet', 'washing machine', 'bath mat', 'toothbrush', 'toothpaste', 'soap', 'shampoo', 'hairdryer', 'scales', 'mirror', 'tap'];
const bathroomWords = room(BATHROOM, 'bathroom words');

const find = (prompt: string, targets: string[], hint?: string): MissionStep => ({ type: 'find', prompt, targets, hint });
const item = (id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef =>
  ({ id, label, look, color, accept, instruction });

// ── BEDROOM ────────────────────────────────────────────────────────────────

const lostPhone: MissionDefinition = {
  id: 'lost-phone', title: 'The Lost Phone', icon: '📱', xp: 90,
  intro: {
    A1: 'You can’t find your phone! Follow the clues and click the right places.',
    B1: 'Your phone has vanished and the bus leaves in ten minutes. Retrace your steps from yesterday evening.',
  },
  steps: {
    A1: [
      find('Clue 1: “I read in bed. It was dark, so I turned on the …” Click it.', ['lamp']),
      find('Clue 2: “Then I looked at my hair.” Click the thing you look into.', ['mirror']),
      find('Clue 3: “I put my clothes away.” Click the big cupboard for clothes.', ['wardrobe']),
      find('Clue 4: Found it! It was in the box at the end of the bed. Click it.', ['chest']),
    ],
    A2: [
      find('Clue 1: “Last night I read a book under the warm light.” Where was the light?', ['lamp']),
      find('Clue 2: “I put the book back where all my other books live.”', ['bookshelf']),
      find('Clue 3: “I checked my face before I went to sleep.”', ['mirror']),
      find('Clue 4: “I opened the wooden box to get an extra blanket…” Is the phone there?', ['chest']),
    ],
    B1: [
      find('Clue 1: “I was revising for my test until late, sitting at…”', ['desk']),
      find('Clue 2: “When I’d finished, I returned my textbooks to where they belong.”', ['bookshelf']),
      find('Clue 3: “I hung up my school uniform so it wouldn’t get creased.”', ['wardrobe']),
      find('Clue 4: “It got chilly, so I took a spare blanket out of storage.” Check there!', ['chest']),
      { type: 'choice', prompt: 'You found it! Your mum asks where it was. What do you say?', options: [
        { text: 'It was in the chest — it must have fallen in when I took the blanket out.', correct: true, feedback: 'Clear and logical: where it was and why.' },
        { text: 'It is in the chest yesterday.', correct: false, feedback: 'Use the past: “It was in the chest”.' },
        { text: 'I don’t know, a chest.', correct: false, feedback: 'Your mum needs a full sentence: “It was in the chest…”.' },
      ] },
    ],
    B2: [
      find('Clue 1: “I’d been studying for hours, hunched over my notes.” Where?', ['desk']),
      find('Clue 2: “I tidied away the novels I’d been comparing for my essay.”', ['bookshelf']),
      find('Clue 3: “Before turning in, I checked whether I looked as exhausted as I felt.”', ['mirror']),
      find('Clue 4: “Shivering, I rummaged through the storage at the foot of the bed for extra bedding.”', ['chest']),
      { type: 'write', prompt: 'Write a short message to a friend explaining how you lost the phone and where you finally found it.', minWords: 35,
        require: [prep(2), advanced(1)], sample: 'I thought I had left it on my desk, although…' },
    ],
  },
};

const sleepover: MissionDefinition = {
  id: 'sleepover', title: 'Sleepover Night', icon: '🌙', xp: 110,
  intro: {
    A1: 'Your friend is staying tonight! Get the room ready.',
    A2: 'Your best friend is coming for a sleepover. Make the room comfortable and tell them where things are.',
    B1: 'A friend from another city is staying for the weekend. Prepare the room and leave them clear instructions.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the plant near the window, so the room feels fresh.', checks: [{ rel: 'nearWindow', a: 'plant' }] },
      { type: 'choice', prompt: 'Your friend is cold. What do you say?', options: [
        { text: 'Here is a blanket.', correct: true, feedback: 'Kind and correct!' },
        { text: 'Here is a mirror.', correct: false, feedback: 'A mirror can’t make you warm.' },
        { text: 'Here are a blanket.', correct: false, feedback: 'One blanket: “Here IS a blanket.”' },
      ] },
      find('Your friend wants to read. Click the thing that gives light.', ['lamp']),
    ],
    A2: [
      { type: 'place', prompt: 'Make a reading spot: put the chair next to the bookshelf.', checks: [{ rel: 'nextTo', a: 'chair', b: 'bookshelf' }] },
      { type: 'choice', prompt: 'Your friend asks: “Where can I put my clothes?” Choose the best answer.', options: [
        { text: 'You can put them in the wardrobe.', correct: true, feedback: 'Perfect: “in the wardrobe”.' },
        { text: 'You can put them on the wardrobe.', correct: false, feedback: 'Clothes go INSIDE: “in the wardrobe”.' },
        { text: 'Put clothes the wardrobe.', correct: false, feedback: 'You need a preposition: “in the wardrobe”.' },
      ] },
      { type: 'write', prompt: 'Write a note for your friend: where are the lamp, the blanket and the mirror?', minWords: 15,
        require: [prep(2), bedroomWords(2)], sample: 'The lamp is on…' },
    ],
    B1: [
      { type: 'place', prompt: 'Make a cosy reading corner: the chair next to the bookshelf, and the plant near the window.',
        checks: [{ rel: 'nextTo', a: 'chair', b: 'bookshelf' }, { rel: 'nearWindow', a: 'plant' }] },
      { type: 'choice', prompt: 'Your guest is allergic to dust. What is the most helpful thing to do?', options: [
        { text: 'Hoover the carpet and wipe the shelves before they arrive.', correct: true, feedback: 'Practical and thoughtful.' },
        { text: 'Move the carpet into the wardrobe.', correct: false, feedback: 'That doesn’t remove the dust.' },
        { text: 'Tell them to sleep with the window closed.', correct: false, feedback: 'Fresh air actually helps; the dust is still there.' },
      ] },
      { type: 'write', prompt: 'Leave a welcome note: tell your guest where to find things and why the room is arranged this way.', minWords: 30,
        require: [prep(2), bedroomWords(3), linkers(1)], sample: 'Welcome! The spare blanket is in the chest because…' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a guest-friendly layout: a reading chair next to the bookshelf, the plant in the light, and the desk against a wall to free up floor space.',
        checks: [{ rel: 'nextTo', a: 'chair', b: 'bookshelf' }, { rel: 'nearWindow', a: 'plant' }, { rel: 'againstWall', a: 'desk' }] },
      { type: 'choice', prompt: 'Your guest is a light sleeper and you get up at 6 for training. What’s the most considerate plan?', options: [
        { text: 'Lay out your kit the night before in the hall, so you can leave without switching on the light.', correct: true, feedback: 'You’ve thought ahead and solved the real problem.' },
        { text: 'Set two alarms so you definitely wake up.', correct: false, feedback: 'That makes the noise problem worse.' },
        { text: 'Ask your guest to get up at 6 too.', correct: false, feedback: 'Not very considerate for a guest!' },
      ] },
      { type: 'write', prompt: 'Write a welcome note that explains the layout and justifies one change you made for your guest.', minWords: 45,
        require: [prep(2), bedroomWords(3), advanced(1)], sample: 'I moved the desk against the wall, which means…' },
    ],
  },
};

const laundryDay: MissionDefinition = {
  id: 'laundry-day', title: 'Laundry Day', icon: '🧺', xp: 80,
  intro: {
    A1: 'The clean washing is on the floor. Put everything in the right place.',
    B1: 'Mum has done the washing and left everything in a pile. Read each label carefully and put it away.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      item('l1', 'the T-shirts', 'clothes', '#7fb3e6', ['wardrobe', 'chest'], 'Put the T-shirts in the wardrobe.'),
      item('l2', 'the socks', 'socks', '#f0a6b5', ['chest', 'wardrobe'], 'Put the socks in the chest.'),
      item('l3', 'the blanket', 'blanket', '#b9a0e0', ['bed', 'chest'], 'Put the blanket on the bed.'),
      item('l4', 'the pillow', 'pillow', '#ffffff', ['bed'], 'Put the pillow on the bed.'),
      item('l5', 'the trainers', 'shoes', '#444444', ['wardrobe', 'carpet'], 'Put the trainers in the wardrobe.'),
    ] }],
    B1: [{ type: 'sort', prompt: 'Follow the notes: each thing has a sensible place.', props: [
      item('l1', 'a shirt that creases easily', 'clothes', '#7fb3e6', ['wardrobe'], 'Hang it where it won’t crease.'),
      item('l2', 'winter socks you won’t need till December', 'socks', '#f0a6b5', ['chest'], 'Store them for later.'),
      item('l3', 'a freshly washed duvet cover', 'blanket', '#b9a0e0', ['bed'], 'Put it where you’ll use it tonight.'),
      item('l4', 'a library book that was in a pocket', 'book', '#c0392b', ['bookshelf', 'desk'], 'Put it with your other books.'),
      item('l5', 'muddy football boots (cleaned!)', 'shoes', '#444444', ['wardrobe'], 'Keep them off the floor.'),
      item('l6', 'a charger found in the jeans', 'phone', '#222222', ['desk', 'nightstand'], 'Put it where you charge your phone.'),
    ] }],
  },
};

// ── KITCHEN ────────────────────────────────────────────────────────────────

const midnightSnack: MissionDefinition = {
  id: 'midnight-snack', title: 'Midnight Snack', icon: '🌙', xp: 90,
  intro: {
    A1: 'It’s late and you are hungry. Make a snack — quietly!',
    B1: 'It’s midnight, everyone is asleep, and you’re starving. Make hot chocolate and toast without waking anyone.',
  },
  steps: {
    A1: [
      find('Get the milk. Where is it cold?', ['fridge']),
      find('Get a cup. Where are the cups?', ['cupboard']),
      find('Make the milk hot. Click the small machine with a door.', ['microwave']),
      find('Make toast. Click the right machine.', ['toaster']),
      find('Wash the cup. Where is the water?', ['sink']),
    ],
    A2: [
      find('First, take the milk and butter out.', ['fridge']),
      find('Next, find a mug and a plate.', ['cupboard']),
      find('Heat the milk for one minute.', ['microwave']),
      find('Make two slices of toast.', ['toaster']),
      find('Finally, put your dirty plate somewhere it will get washed.', ['dishwasher', 'sink']),
    ],
    B1: [
      find('The milk needs to stay cold until you use it. Get it.', ['fridge']),
      find('The kettle is too loud at night. What else can heat the milk quietly?', ['microwave']),
      find('Bread goes in here for golden slices.', ['toaster']),
      find('Don’t leave a mess for the morning: load your plate and mug.', ['dishwasher']),
      { type: 'choice', prompt: 'Your dad wakes up and asks what you’re doing. Which answer is best?', options: [
        { text: 'Sorry, I was hungry, so I made some toast. I’ve already cleaned up.', correct: true, feedback: 'Polite, honest, and uses “so” well.' },
        { text: 'I make toast because hungry.', correct: false, feedback: 'Past tense and a full clause: “I made toast because I was hungry.”' },
        { text: 'Nothing. Go back to bed.', correct: false, feedback: 'A bit rude for midnight!' },
      ] },
    ],
    B2: [
      find('Ingredients that would go off at room temperature are kept here.', ['fridge']),
      find('Silent option for warming milk — the kettle would wake the whole house.', ['microwave']),
      find('Appliance for browning bread.', ['toaster']),
      find('Leave no evidence: where do the dirty dishes go?', ['dishwasher']),
      { type: 'write', prompt: 'Write a note for your family explaining what you ate last night and what you’ll replace tomorrow.', minWords: 35,
        require: [kitchenWords(3), advanced(1)], sample: 'Although I tried to be quiet, …' },
    ],
  },
};

const recipeCard: MissionDefinition = {
  id: 'recipe-card', title: 'Pancake Recipe', icon: '🥞', xp: 110,
  intro: {
    A1: 'Let’s make pancakes! Do the steps in the right order.',
    B1: 'Grandma’s pancake recipe has lost its order. Work it out, then write it down for your cousin.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'What do you do FIRST?', options: [
        { text: 'Wash your hands.', correct: true, feedback: 'Yes! Clean hands first.' },
        { text: 'Eat the pancakes.', correct: false, feedback: 'Not yet — that’s the last step!' },
        { text: 'Wash the pan.', correct: false, feedback: 'You wash it at the end.' },
      ] },
      find('Get eggs and milk.', ['fridge']),
      find('Cook the pancakes. Where is it hot?', ['cooker']),
      find('Eat them at the…', ['table']),
    ],
    A2: [
      { type: 'choice', prompt: 'Put the recipe in order. Which step comes SECOND? (1. Mix flour, eggs and milk.)', options: [
        { text: 'Heat a little oil in a pan.', correct: true, feedback: 'Right — the pan must be hot before the batter goes in.' },
        { text: 'Serve with lemon and sugar.', correct: false, feedback: 'That’s the last step.' },
        { text: 'Flip the pancake.', correct: false, feedback: 'You can only flip it after you pour it in.' },
      ] },
      find('Take out the eggs and milk.', ['fridge']),
      find('Find the flour and sugar.', ['cupboard']),
      find('Heat the pan.', ['cooker']),
      { type: 'write', prompt: 'Write the recipe in 4 steps for a friend. Use first, then, after that, finally.', minWords: 20,
        require: [linkers(2), kitchenWords(1)], sample: 'First, mix…' },
    ],
    B1: [
      { type: 'choice', prompt: 'Why do you leave the batter to rest for 20 minutes?', options: [
        { text: 'So that the pancakes are softer and don’t tear.', correct: true, feedback: 'Exactly — resting makes the batter smoother.' },
        { text: 'Because the cooker needs to cool down.', correct: false, feedback: 'You haven’t used the cooker yet!' },
        { text: 'So the eggs become cold.', correct: false, feedback: 'Temperature isn’t the point here.' },
      ] },
      find('Where are the eggs, milk and butter?', ['fridge']),
      find('Where do you keep flour and a mixing bowl?', ['cupboard']),
      find('Where do you fry the pancakes?', ['cooker']),
      { type: 'write', prompt: 'Write the recipe for your cousin. Explain at least one step with “because” or “so”.', minWords: 30,
        require: [linkers(3), kitchenWords(2)], sample: 'First, mix the flour and eggs in a bowl. Then…' },
    ],
    B2: [
      { type: 'choice', prompt: 'Your first pancake is always pale and greasy. What’s the most likely reason?', options: [
        { text: 'The pan wasn’t hot enough when the batter went in.', correct: true, feedback: 'Yes — a properly heated pan gives colour and less grease.' },
        { text: 'There was too much flour in the cupboard.', correct: false, feedback: 'Storage doesn’t affect cooking.' },
        { text: 'The fridge was too cold.', correct: false, feedback: 'Cold milk might slow you down, but it isn’t the main cause.' },
      ] },
      find('Perishable ingredients first.', ['fridge']),
      find('Dry ingredients and equipment.', ['cupboard']),
      find('Where the cooking happens.', ['cooker']),
      { type: 'write', prompt: 'Write the recipe with one tip that explains a common mistake and how to avoid it.', minWords: 45,
        require: [linkers(2), advanced(1), kitchenWords(2)], sample: 'Although it is tempting to start straight away, …' },
    ],
  },
};

const inspector: MissionDefinition = {
  id: 'kitchen-inspector', title: 'Kitchen Inspector', icon: '🧑‍🍳', xp: 100,
  intro: {
    A1: 'A kitchen inspector is coming! Make the kitchen safe and smart.',
    B1: 'A safety inspector is visiting your kitchen. Fix the layout and answer their questions.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the dishwasher next to the sink.', checks: [{ rel: 'nextTo', a: 'dishwasher', b: 'sink' }] },
      { type: 'choice', prompt: 'The inspector asks: “Where do you keep the milk?”', options: [
        { text: 'In the fridge.', correct: true, feedback: 'Yes — milk must be cold.' },
        { text: 'In the cooker.', correct: false, feedback: 'The cooker is hot!' },
        { text: 'On the calendar.', correct: false, feedback: 'A calendar is for dates.' },
      ] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the dishwasher next to the sink, and the fridge against a wall.',
        checks: [{ rel: 'nextTo', a: 'dishwasher', b: 'sink' }, { rel: 'againstWall', a: 'fridge' }] },
      { type: 'choice', prompt: 'The inspector asks: “Why is the bin far from the cooker?”', options: [
        { text: 'Because paper in the bin can catch fire.', correct: true, feedback: 'A good safety reason.' },
        { text: 'Because the bin is very big.', correct: false, feedback: 'Size isn’t the safety problem.' },
        { text: 'Because I like it.', correct: false, feedback: 'Give a real reason.' },
      ] },
      { type: 'place', prompt: 'Now move the bin far from the cooker.', checks: [{ rel: 'farFrom', a: 'bin', b: 'cooker' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Fix the layout: the dishwasher next to the sink (shared water pipes), the bin away from the cooker.',
        checks: [{ rel: 'nextTo', a: 'dishwasher', b: 'sink' }, { rel: 'farFrom', a: 'bin', b: 'cooker' }] },
      { type: 'choice', prompt: '“The kettle is right next to the sink. Is that a problem?” Choose the best answer.', options: [
        { text: 'It’s fine as long as the plug and cable stay dry.', correct: true, feedback: 'A balanced, accurate answer.' },
        { text: 'No, water and electricity are always fine together.', correct: false, feedback: 'Definitely not!' },
        { text: 'Yes, kettles must always be in the cupboard.', correct: false, feedback: 'Too extreme — it just needs to stay dry.' },
      ] },
      { type: 'write', prompt: 'Write two sentences for the inspector’s report explaining one change you made and why.', minWords: 25,
        require: [prep(1), linkers(1), kitchenWords(2)], sample: 'I moved the bin away from the cooker because…' },
    ],
    B2: [
      { type: 'place', prompt: 'Optimise the layout: dishwasher beside the sink, bin well away from the cooker, fridge against a wall.',
        checks: [{ rel: 'nextTo', a: 'dishwasher', b: 'sink' }, { rel: 'farFrom', a: 'bin', b: 'cooker' }, { rel: 'againstWall', a: 'fridge' }] },
      { type: 'write', prompt: 'Write a short inspection report: two things that are safe, one risk, and your recommendation.', minWords: 45,
        require: [kitchenWords(3), advanced(1), prep(1)], sample: 'Overall, the kitchen is well organised; however, …' },
    ],
  },
};

// ── BATHROOM ───────────────────────────────────────────────────────────────

const lostRing: MissionDefinition = {
  id: 'lost-ring', title: 'Mum’s Lost Ring', icon: '💍', xp: 90,
  intro: {
    A1: 'Mum can’t find her ring! Follow the clues and click the right places.',
    B1: 'Mum took her ring off before her shower and now it’s gone. Retrace her steps.',
  },
  steps: {
    A1: [
      find('Mum washed her hands. Look there first.', ['washbasin']),
      find('Then she had a shower.', ['shower']),
      find('She dried her hair with…', ['hairdryer']),
      find('Found it! It was in the box with the medicine.', ['cabinet']),
    ],
    A2: [
      find('Mum took the ring off to wash her face. Where?', ['washbasin']),
      find('Then she got clean all over, quickly.', ['shower']),
      find('She dried herself with something soft from the rail.', ['towel']),
      find('The ring is safe behind the mirror door!', ['cabinet']),
      { type: 'write', prompt: 'Write what Mum did, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), bathroomWords(2)], sample: 'First, Mum washed her face at the…' },
    ],
    B1: [
      find('She always takes her ring off before touching soap. Where would that be?', ['washbasin', 'soap']),
      find('She didn’t have time for a bath, so she…', ['shower']),
      find('She hung up something wet before leaving.', ['towel']),
      find('She keeps small valuable things behind a mirror.', ['cabinet']),
      { type: 'write', prompt: 'Explain to Mum where the ring was and suggest how she can stop losing it.', minWords: 30,
        require: [linkers(2), bathroomWords(2)], sample: 'Your ring was in the cabinet because…' },
    ],
    B2: [
      find('Start where jewellery is most at risk of going down the drain.', ['washbasin']),
      find('Check the fitting where she spent ten minutes this morning.', ['shower']),
      find('Check the appliance she used last, near the plug socket.', ['hairdryer']),
      find('The safest place for valuables in this room.', ['cabinet']),
      { type: 'write', prompt: 'Write Mum a short note: where the ring was, and one sensible habit to avoid losing it again.', minWords: 40,
        require: [linkers(1), advanced(1), bathroomWords(2)], sample: 'Although it gave us a fright, the ring was…' },
    ],
  },
};

const spaDay: MissionDefinition = {
  id: 'spa-day', title: 'Spa Day', icon: '🧖', xp: 90,
  intro: {
    A1: 'Make the bathroom a relaxing spa for Grandma’s birthday!',
    B1: 'Turn the bathroom into a home spa as a birthday surprise for Grandma.',
  },
  steps: {
    A1: [
      { type: 'sort', prompt: 'Put the spa things in the right places.', props: [
        item('sp1', 'bubble bath', 'bottle', '#f7b2d0', ['bath'], 'Put the bubble bath next to the bath.'),
        item('sp2', 'a soft towel', 'clothes', '#ffffff', ['towel'], 'Put a soft towel on the rail.'),
        item('sp3', 'a candle', 'cup', '#ffe9a8', ['washbasin', 'cabinet'], 'Put a candle on the washbasin.'),
      ] },
      { type: 'place', prompt: 'Put the bath mat in front of the bath.', checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }] },
    ],
    A2: [
      { type: 'sort', prompt: 'Get the spa ready.', props: [
        item('sp1', 'bubble bath', 'bottle', '#f7b2d0', ['bath'], 'Put the bubble bath by the bath.'),
        item('sp2', 'two warm towels', 'clothes', '#ffffff', ['towel'], 'Hang the towels on the rail.'),
        item('sp3', 'a candle', 'cup', '#ffe9a8', ['washbasin', 'cabinet'], 'Put the candle on the washbasin.'),
        item('sp4', 'the dirty laundry', 'clothes', '#a8d0f0', ['washing-machine'], 'Hide the dirty laundry in the washing machine.'),
      ] },
      { type: 'place', prompt: 'Keep the hairdryer far from the bath.', checks: [{ rel: 'farFrom', a: 'hairdryer', b: 'bath' }] },
      { type: 'write', prompt: 'Write a birthday card inviting Grandma to her spa.', minWords: 15,
        require: [bathroomWords(2), prep(1)], sample: 'Happy birthday, Grandma! There is a warm towel on…' },
    ],
    B1: [
      { type: 'sort', prompt: 'Create a calm, tidy spa.', props: [
        item('sp1', 'lavender bath salts', 'bottle', '#c9b6e4', ['bath'], 'Something relaxing for her soak.'),
        item('sp2', 'fluffy towels', 'clothes', '#ffffff', ['towel'], 'She’ll want something warm afterwards.'),
        item('sp3', 'a scented candle', 'cup', '#ffe9a8', ['washbasin', 'cabinet'], 'Somewhere safe, away from towels.'),
        item('sp4', 'everyone’s dirty socks', 'socks', '#a8d0f0', ['washing-machine'], 'Nothing ruins a spa like dirty socks.'),
      ] },
      { type: 'place', prompt: 'Make it safe: bath mat in front of the bath, hairdryer far from it.',
        checks: [{ rel: 'inFrontOf', a: 'bath-mat', b: 'bath' }, { rel: 'farFrom', a: 'hairdryer', b: 'bath' }] },
      { type: 'write', prompt: 'Write Grandma an invitation describing her spa and why you chose each thing.', minWords: 30,
        require: [bathroomWords(2), linkers(1)], sample: 'Dear Grandma, I’ve made the bathroom into a spa because…' },
    ],
  },
};

const plumber: MissionDefinition = {
  id: 'plumber-visit', title: 'The Plumber’s Visit', icon: '🔧', xp: 100,
  intro: {
    A1: 'Water is on the floor! Help the plumber find the problem.',
    B1: 'There’s a leak somewhere in the bathroom. Help the plumber find it and explain what happened.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'There is water on the floor. What do you do first?', options: [
        { text: 'Turn off the tap.', correct: true, feedback: 'Yes! Stop the water first.' },
        { text: 'Use the hairdryer.', correct: false, feedback: 'No! Electricity and water are dangerous.' },
        { text: 'Have a bath.', correct: false, feedback: 'Not now!' },
      ] },
      find('The plumber asks: where do you wash your hands?', ['washbasin']),
      find('Where does the water go when you flush?', ['toilet']),
      find('Which machine uses water for clothes?', ['washing-machine']),
    ],
    A2: [
      { type: 'choice', prompt: 'Water is coming from under the washing machine. What do you say to the plumber?', options: [
        { text: 'There’s water under the washing machine.', correct: true, feedback: 'Clear and useful.' },
        { text: 'The washing machine is white.', correct: false, feedback: 'True, but it doesn’t help.' },
        { text: 'I like water.', correct: false, feedback: 'Tell the plumber WHERE the water is.' },
      ] },
      find('Show the plumber the washing machine.', ['washing-machine']),
      find('He wants to check the other things with water too. Show him the washbasin.', ['washbasin']),
      { type: 'write', prompt: 'Write a message to your landlord: what happened and where.', minWords: 15,
        require: [bathroomWords(2), prep(1)], sample: 'There is water on the floor next to…' },
    ],
    B1: [
      { type: 'choice', prompt: 'The plumber asks when you first noticed the leak. What’s the most helpful answer?', options: [
        { text: 'This morning, after the washing machine finished its cycle.', correct: true, feedback: 'Precise — it points to the cause.' },
        { text: 'I don’t know, it’s just wet.', correct: false, feedback: 'He needs more information.' },
        { text: 'Last year, I think.', correct: false, feedback: 'Then it would be much worse by now!' },
      ] },
      find('Show him the appliance you suspect.', ['washing-machine']),
      find('He wants to test the water pressure at the fittings. Show him one.', ['washbasin', 'bath', 'shower']),
      { type: 'write', prompt: 'Write an email to your landlord explaining what happened and what the plumber did.', minWords: 35,
        require: [bathroomWords(2), linkers(2)], sample: 'This morning I noticed water under the washing machine, so…' },
    ],
    B2: [
      { type: 'choice', prompt: 'The repair will cost a lot. Your landlord says it’s your fault. What’s the most reasonable response?', options: [
        { text: 'Politely explain that the hose was worn out from age, and ask for the plumber’s report as evidence.', correct: true, feedback: 'Calm, factual and backed by evidence.' },
        { text: 'Refuse to pay and stop answering his messages.', correct: false, feedback: 'Ignoring the problem only makes it worse.' },
        { text: 'Pay immediately without asking anything.', correct: false, feedback: 'You may be paying for something that isn’t your fault.' },
      ] },
      find('Show the plumber where the worn hose is.', ['washing-machine']),
      { type: 'write', prompt: 'Write a polite but firm email to your landlord explaining why you shouldn’t pay for the repair.', minWords: 50,
        require: [bathroomWords(2), advanced(1)], sample: 'Although I understand your concern, the plumber confirmed that…' },
    ],
  },
};

// ── LIVING ROOM ────────────────────────────────────────────────────────────

const LIVING = ['sofa', 'armchair', 'coffee table', 'tv', 'television', 'fireplace', 'bookcase', 'floor lamp', 'lamp', 'cushion', 'remote control', 'remote', 'clock', 'piano', 'beanbag', 'rug'];
const livingWords = room(LIVING, 'living room words');

const lostRemote: MissionDefinition = {
  id: 'lost-remote', title: 'Where’s the Remote?', icon: '🎛️', xp: 90,
  intro: {
    A1: 'The football match starts in five minutes and Dad can’t find the remote! Follow the clues.',
    B1: 'The match is about to start and the remote has vanished. Retrace everyone’s steps from last night.',
  },
  steps: {
    A1: [
      find('Dad sat on the long soft seat. Look there first.', ['sofa']),
      find('Then he made a cup of tea and put it on the low table.', ['coffee-table']),
      find('Then he read a book. Look where the books are.', ['bookcase']),
      find('Found it! It was in front of the TV all the time.', ['remote']),
    ],
    A2: [
      find('Last night Grandma watched a film in her seat for one person.', ['armchair']),
      find('Then she turned on the tall light to read.', ['floor-lamp']),
      find('Your brother played music on the instrument with black and white keys.', ['piano']),
      find('There it is, next to the snacks!', ['remote']),
      { type: 'write', prompt: 'Write what the family did last night, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), livingWords(2)], sample: 'First, Grandma sat in the…' },
    ],
    B1: [
      find('Your sister always falls asleep where three people can sit. Check there.', ['sofa']),
      find('She warmed her feet somewhere hot before bed.', ['fireplace']),
      find('She curled up on the floor seat to play video games.', ['beanbag']),
      find('Somebody tidied it away with the other small things.', ['remote']),
      { type: 'write', prompt: 'Suggest to your family a simple rule so the remote never gets lost again.', minWords: 30,
        require: [linkers(2), livingWords(2)], sample: 'The remote was on the table because…' },
    ],
    B2: [
      find('Start where things most often slip down between the cushions.', ['sofa', 'armchair']),
      find('Check the surface above the hearth where people leave things.', ['fireplace']),
      find('Check the instrument — your cousin was practising scales there.', ['piano']),
      find('There it is. Click it before the kick-off!', ['remote']),
      { type: 'write', prompt: 'Write a short, humorous note for the family noticeboard about the Great Remote Hunt and one sensible habit.', minWords: 40,
        require: [linkers(1), advanced(1), livingWords(2)], sample: 'Although it was a close call, the remote…' },
    ],
  },
};

const pianoConcert: MissionDefinition = {
  id: 'piano-concert', title: 'Home Concert', icon: '🎹', xp: 100,
  intro: {
    A1: 'You are giving a small piano concert for your family! Get the room ready.',
    B1: 'You’re performing a short piano recital for relatives at home. Set up the room so everyone can see and hear.',
  },
  steps: {
    A1: [
      find('Find the instrument for the concert.', ['piano']),
      { type: 'sort', prompt: 'Get ready for the concert.', props: [
        item('c1', 'the music book', 'book', '#fffdf6', ['piano'], 'Put the music book on the piano.'),
        item('c2', 'the flowers', 'cup', '#f7b2d0', ['coffee-table', 'fireplace'], 'Put the flowers on the coffee table.'),
      ] },
      { type: 'place', prompt: 'Put the piano against the wall.', checks: [{ rel: 'againstWall', a: 'piano' }] },
    ],
    A2: [
      find('Grandma will sit in a comfortable seat for one. Click it.', ['armchair']),
      { type: 'sort', prompt: 'Make the room ready.', props: [
        item('c1', 'the sheet music', 'book', '#fffdf6', ['piano'], 'Put the sheet music on the piano.'),
        item('c2', 'the drinks', 'cup', '#a9c9f2', ['coffee-table'], 'Put the drinks on the coffee table.'),
        item('c3', 'the toys', 'toy', '#ffd54f', ['bookcase'], 'Put the toys away on the bookcase.'),
      ] },
      { type: 'place', prompt: 'Put the piano against the wall and the floor lamp next to it so you can read the music.',
        checks: [{ rel: 'againstWall', a: 'piano' }, { rel: 'nextTo', a: 'floor-lamp', b: 'piano' }] },
      { type: 'write', prompt: 'Write an invitation to your concert. Say where people will sit.', minWords: 15,
        require: [livingWords(2), prep(1)], sample: 'Please come to my concert! You can sit on…' },
    ],
    B1: [
      { type: 'place', prompt: 'You need light to read the music: put the floor lamp next to the piano.', checks: [{ rel: 'nextTo', a: 'floor-lamp', b: 'piano' }] },
      { type: 'place', prompt: 'The audience should face the piano: put the sofa opposite it, away from the instrument.', checks: [{ rel: 'farFrom', a: 'sofa', b: 'piano' }] },
      { type: 'choice', prompt: 'Your little cousin keeps talking during the concert. What do you say afterwards?', options: [
        { text: 'Next time, could you listen quietly? Then you can play a song too!', correct: true, feedback: 'Kind, clear and it gives him a reason.' },
        { text: 'You ruined everything!', correct: false, feedback: 'Too harsh for a small child.' },
        { text: 'Say nothing and never play again.', correct: false, feedback: 'That doesn’t help anyone.' },
      ] },
      { type: 'write', prompt: 'Write a short programme for your concert: what you’ll play and why you chose it.', minWords: 30,
        require: [linkers(2), livingWords(1)], sample: 'First, I’ll play… because…' },
    ],
    B2: [
      { type: 'place', prompt: 'Good acoustics and lighting: piano against a wall, floor lamp beside it.',
        checks: [{ rel: 'againstWall', a: 'piano' }, { rel: 'nextTo', a: 'floor-lamp', b: 'piano' }] },
      { type: 'place', prompt: 'Seating for the audience: sofa well away from the piano, coffee table in front of the sofa for drinks.',
        checks: [{ rel: 'farFrom', a: 'sofa', b: 'piano' }, { rel: 'inFrontOf', a: 'coffee-table', b: 'sofa' }] },
      { type: 'write', prompt: 'Write a short speech to introduce your concert: thank your guests and explain what they’re about to hear.', minWords: 45,
        require: [advanced(1), livingWords(1)], sample: 'Although I’m a little nervous, I’m delighted that…' },
    ],
  },
};

const winterEvening: MissionDefinition = {
  id: 'winter-evening', title: 'Snowy Evening', icon: '❄️', xp: 90,
  intro: {
    A1: 'It is snowing outside! Make the living room warm and cosy.',
    B1: 'There’s a snowstorm and the heating has broken. Keep the family warm and cheerful in the living room.',
  },
  steps: {
    A1: [
      find('Find where you can make a fire.', ['fireplace']),
      { type: 'sort', prompt: 'Make it cosy.', props: [
        item('w1', 'a warm blanket', 'blanket', '#c9b6e4', ['sofa', 'armchair'], 'Put the blanket on the sofa.'),
        item('w2', 'hot chocolate', 'cup', '#a0522d', ['coffee-table'], 'Put the hot chocolate on the coffee table.'),
      ] },
      { type: 'place', prompt: 'Put the armchair next to the fireplace.', checks: [{ rel: 'nextTo', a: 'armchair', b: 'fireplace' }] },
    ],
    A2: [
      find('It’s getting dark. Find a light to turn on.', ['floor-lamp']),
      { type: 'sort', prompt: 'Get everything ready.', props: [
        item('w1', 'blankets', 'blanket', '#c9b6e4', ['sofa', 'armchair'], 'Put the blankets on the sofa.'),
        item('w2', 'firewood', 'box', '#9c7150', ['fireplace'], 'Put the firewood by the fireplace.'),
        item('w3', 'a board game', 'box', '#9fd08f', ['coffee-table'], 'Put the board game on the coffee table.'),
      ] },
      { type: 'place', prompt: 'Keep the beanbag far from the fire.', checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }] },
      { type: 'write', prompt: 'Write what your family does on a snowy evening.', minWords: 15,
        require: [livingWords(2), linkers(1)], sample: 'We sit by the fire and…' },
    ],
    B1: [
      find('The heating is broken. What can you use to heat the room?', ['fireplace']),
      { type: 'place', prompt: 'Bring the seats closer to the warmth: armchair next to the fireplace.', checks: [{ rel: 'nextTo', a: 'armchair', b: 'fireplace' }] },
      { type: 'place', prompt: 'Safety first: the beanbag must stay far from the fire.', checks: [{ rel: 'farFrom', a: 'beanbag', b: 'fireplace' }] },
      { type: 'choice', prompt: 'The power goes off and your little sister is scared of the dark. What do you do?', options: [
        { text: 'Sit with her by the fire and tell her a story.', correct: true, feedback: 'Calm and comforting.' },
        { text: 'Tell her not to be a baby.', correct: false, feedback: 'That won’t make her feel better.' },
        { text: 'Leave her and go to bed.', correct: false, feedback: 'She needs someone with her.' },
      ] },
      { type: 'write', prompt: 'Write a diary entry about the snowy evening.', minWords: 30,
        require: [linkers(2), livingWords(2)], sample: 'First, the heating stopped working, so…' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a warm zone: armchair beside the fireplace, beanbag at a safe distance.',
        checks: [{ rel: 'nextTo', a: 'armchair', b: 'fireplace' }, { rel: 'farFrom', a: 'beanbag', b: 'fireplace' }] },
      { type: 'choice', prompt: 'Your neighbour is elderly and lives alone, and the storm will last all night. What is the most responsible thing to do?', options: [
        { text: 'Check on her and invite her to stay by your fire.', correct: true, feedback: 'Thoughtful and practical.' },
        { text: 'Assume she’s fine.', correct: false, feedback: 'She might need help.' },
        { text: 'Post about the storm online.', correct: false, feedback: 'That doesn’t help her.' },
      ] },
      { type: 'write', prompt: 'Write a message to your neighbour inviting her over and explaining how you’ve made the room warm and safe.', minWords: 45,
        require: [advanced(1), livingWords(2), prep(1)], sample: 'Although the heating isn’t working, we have…' },
    ],
  },
};

// ── HALLWAY ────────────────────────────────────────────────────────────────

const HALL = ['coat', 'coat stand', 'shoes', 'shoe rack', 'stairs', 'hall table', 'umbrella', 'bench', 'keys', 'key hook', 'noticeboard', 'telephone', 'phone', 'torch', 'scooter', 'boots'];
const hallWords = room(HALL, 'hallway words');

const lostKeys: MissionDefinition = {
  id: 'lost-keys', title: 'The Missing Keys', icon: '🔑', xp: 90,
  intro: {
    A1: 'Dad is late for work and he can’t find his car keys! Follow the clues.',
    B1: 'Dad has to leave in three minutes and his car keys have disappeared. Retrace his steps from last night.',
  },
  steps: {
    A1: [
      find('Dad came home and took off his coat. Look there first.', ['coat-stand']),
      find('Then he took off his shoes.', ['shoe-rack']),
      find('Then he sat down to read the post.', ['bench']),
      find('Found them! They were on the hook all the time.', ['key-hook']),
    ],
    A2: [
      find('Dad came in from the rain and put something wet away.', ['umbrella-stand']),
      find('Then he read a message from Mum on the wall.', ['noticeboard']),
      find('Then he called Grandma.', ['telephone']),
      find('The keys were on the table under the letters!', ['hall-table']),
      { type: 'write', prompt: 'Write what Dad did, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), hallWords(2)], sample: 'First, Dad put his umbrella in the…' },
    ],
    B1: [
      find('He always empties his pockets where he sits to take off his boots.', ['bench']),
      find('He hung up his jacket — check the pockets.', ['coat-stand']),
      find('He wrote a reminder about the car service.', ['noticeboard']),
      find('Somebody tidied the keys away where they belong.', ['key-hook']),
      { type: 'write', prompt: 'Suggest to Dad a simple habit so he never loses his keys again.', minWords: 30,
        require: [linkers(2), hallWords(2)], sample: 'The keys were on the hook because…' },
    ],
    B2: [
      find('Start where things tend to get dropped the moment someone walks in.', ['hall-table']),
      find('Check the outerwear — keys often stay in a pocket.', ['coat-stand']),
      find('He went upstairs to change. Check the route.', ['stairs']),
      find('Mystery solved. Click where they were.', ['key-hook']),
      { type: 'write', prompt: 'Write a short, humorous note for the noticeboard about the Great Key Hunt and one sensible rule.', minWords: 40,
        require: [linkers(1), advanced(1), hallWords(2)], sample: 'Although it was a close call, the keys…' },
    ],
  },
};

const powerCut: MissionDefinition = {
  id: 'power-cut', title: 'Power Cut!', icon: '🔦', xp: 100,
  intro: {
    A1: 'Oh no! The lights went out. Find your way in the dark hallway.',
    B1: 'There’s a power cut on a stormy night and you’re in charge until your parents get home.',
  },
  steps: {
    A1: [
      find('Find something that gives light.', ['torch']),
      find('Find the phone to call Mum.', ['telephone']),
      find('Go carefully up to your bedroom. Click the way up.', ['stairs']),
    ],
    A2: [
      find('It is very dark. Find the torch.', ['torch']),
      find('Your little sister is scared. Sit with her. Find a seat.', ['bench']),
      find('Call Dad and tell him about the power cut.', ['telephone']),
      { type: 'place', prompt: 'Nobody should trip in the dark: put the scooter next to the stairs.', checks: [{ rel: 'nextTo', a: 'scooter', b: 'stairs' }] },
      { type: 'write', prompt: 'Write what you did in the power cut. Use first and then.', minWords: 15,
        require: [linkers(2), hallWords(2)], sample: 'First, I found the torch…' },
    ],
    B1: [
      find('You need light before you do anything else.', ['torch']),
      { type: 'place', prompt: 'Clear the walkway so nobody trips: scooter next to the stairs.', checks: [{ rel: 'nextTo', a: 'scooter', b: 'stairs' }] },
      find('Check the emergency numbers Mum pinned up.', ['noticeboard']),
      { type: 'choice', prompt: 'The power company says it will be off for three hours. What do you tell your little brother?', options: [
        { text: 'Don’t worry, we have a torch. Let’s play a game until Mum gets home.', correct: true, feedback: 'Calm and reassuring.' },
        { text: 'It might be off forever!', correct: false, feedback: 'That will scare him.' },
        { text: 'Go to sleep now.', correct: false, feedback: 'He’s too scared to sleep.' },
      ] },
      { type: 'write', prompt: 'Write a message to your parents explaining what happened and what you did.', minWords: 30,
        require: [linkers(2), hallWords(1)], sample: 'First, the lights went out, so…' },
    ],
    B2: [
      find('Priority one: a reliable light source.', ['torch']),
      find('Check the list of emergency contacts.', ['noticeboard']),
      find('Use the phone that doesn’t need charging… or does it? Check it.', ['telephone']),
      { type: 'choice', prompt: 'The cordless phone won’t work without power and your mobile is at 5%. What is the most sensible thing to do?', options: [
        { text: 'Send one short text to Mum, then switch the mobile off to save battery.', correct: true, feedback: 'Efficient and keeps you reachable.' },
        { text: 'Watch videos until the power comes back.', correct: false, feedback: 'Your battery will be dead in minutes.' },
        { text: 'Do nothing and wait.', correct: false, feedback: 'Your parents might worry.' },
      ] },
      { type: 'write', prompt: 'Write a short power-cut plan for the noticeboard so the family knows what to do next time.', minWords: 45,
        require: [advanced(1), hallWords(2)], sample: 'Although power cuts are rare, everyone should know where…' },
    ],
  },
};

const rainyWalk: MissionDefinition = {
  id: 'rainy-walk', title: 'Back from the Rain', icon: '☔', xp: 90,
  intro: {
    A1: 'The family is back from a walk in the rain. Everything is wet!',
    B1: 'Everyone has just come back from a muddy walk in the pouring rain. Stop the mess spreading through the house.',
  },
  steps: {
    A1: [
      { type: 'sort', prompt: 'Put the wet things away.', props: [
        item('r1', 'the wet umbrella', 'phone', '#f25c5c', ['umbrella-stand'], 'Put the umbrella in the umbrella stand.'),
        item('r2', 'the wet coat', 'clothes', '#7fa7d8', ['coat-stand'], 'Hang the coat on the coat stand.'),
        item('r3', 'the muddy boots', 'shoes', '#9c7150', ['shoe-rack'], 'Put the boots on the shoe rack.'),
      ] },
      find('Sit down and take off your socks. Find a seat.', ['bench']),
    ],
    A2: [
      { type: 'sort', prompt: 'Tidy up after the walk.', props: [
        item('r1', 'two wet umbrellas', 'phone', '#2f3440', ['umbrella-stand'], 'Put the umbrellas in the stand.'),
        item('r2', 'the raincoats', 'clothes', '#f2c46d', ['coat-stand'], 'Hang the raincoats up.'),
        item('r3', 'the muddy wellies', 'shoes', '#9fd08f', ['shoe-rack'], 'Put the wellies on the shoe rack.'),
        item('r4', 'the dog lead', 'phone', '#f28c8c', ['key-hook', 'coat-stand'], 'Hang the dog lead on a hook.'),
      ] },
      { type: 'place', prompt: 'Put the shoe rack next to the bench.', checks: [{ rel: 'nextTo', a: 'shoe-rack', b: 'bench' }] },
      { type: 'write', prompt: 'Write what the family did when they came home.', minWords: 15,
        require: [hallWords(2), linkers(1)], sample: 'We came home and took off…' },
    ],
    B1: [
      { type: 'sort', prompt: 'Keep the mud in the hall.', props: [
        item('r1', 'the dripping umbrellas', 'phone', '#2f3440', ['umbrella-stand'], 'Stop them dripping on the floor.'),
        item('r2', 'the soaking coats', 'clothes', '#7fa7d8', ['coat-stand'], 'They need to hang up to dry.'),
        item('r3', 'the filthy boots', 'shoes', '#9c7150', ['shoe-rack'], 'Nobody walks upstairs in those!'),
      ] },
      { type: 'choice', prompt: 'Your brother walks straight upstairs in his muddy boots. What do you say?', options: [
        { text: 'Could you take your boots off, please? The carpet upstairs will get dirty.', correct: true, feedback: 'Polite and gives a reason.' },
        { text: 'You’re so annoying!', correct: false, feedback: 'That won’t get the boots off.' },
        { text: 'Say nothing and clean it up later.', correct: false, feedback: 'He won’t learn.' },
      ] },
      { type: 'write', prompt: 'Write a “wet weather rule” for the noticeboard.', minWords: 30,
        require: [linkers(2), hallWords(2)], sample: 'When you come in from the rain, first…' },
    ],
    B2: [
      { type: 'place', prompt: 'Set up a proper wet-weather station: umbrella stand next to the coat stand, shoe rack next to the bench.',
        checks: [{ rel: 'nextTo', a: 'umbrella-stand', b: 'coat-stand' }, { rel: 'nextTo', a: 'shoe-rack', b: 'bench' }] },
      { type: 'write', prompt: 'Your parents want to replace the hall runner with tiles only. Argue for or against it.', minWords: 45,
        require: [advanced(1), hallWords(2)], sample: 'Although tiles are easier to clean, a runner…' },
    ],
  },
};

// ── BASEMENT ───────────────────────────────────────────────────────────────

const BASEMENT = ['workbench', 'shelves', 'shelf', 'boiler', 'freezer', 'toolbox', 'hammer', 'ladder', 'bicycle', 'bike', 'box', 'boxes', 'broom', 'bucket', 'paint', 'fuse box'];
const basementWords = room(BASEMENT, 'basement words');

const strangeNoise: MissionDefinition = {
  id: 'strange-noise', title: 'The Strange Noise', icon: '👻', xp: 90,
  intro: {
    A1: 'There is a strange noise in the basement! Be brave and find it.',
    B1: 'Every night you hear knocking from the basement. Investigate and solve the mystery.',
  },
  steps: {
    A1: [
      find('Is it the big machine with pipes? Click it.', ['boiler']),
      find('No. Is it behind the boxes?', ['cardboard-box']),
      find('No. Is it under the strong table?', ['workbench']),
      find('There it is! A little mouse on the shelves!', ['shelving']),
    ],
    A2: [
      find('The noise comes from something that makes hot water.', ['boiler']),
      find('Then you hear a sound from the cold box with food.', ['chest-freezer']),
      find('Then something falls. Was it the thing you climb?', ['ladder']),
      find('It was the cat, playing in the boxes!', ['cardboard-box']),
      { type: 'write', prompt: 'Write what you did, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), basementWords(2)], sample: 'First, I checked the boiler…' },
    ],
    B1: [
      find('The knocking is loudest when the heating comes on. Check there.', ['boiler']),
      find('Check the pipes along the wall near the power controls.', ['fuse-box']),
      find('A loose thing could be rattling on the metal shelves.', ['shelving']),
      find('Mystery solved: a loose tool was vibrating on the workbench!', ['workbench']),
      { type: 'write', prompt: 'Write a short report for your parents explaining the noise and how you fixed it.', minWords: 30,
        require: [linkers(2), basementWords(2)], sample: 'The noise came from the workbench because…' },
    ],
    B2: [
      find('Start with the appliance whose pipes expand when they heat up.', ['boiler']),
      find('Rule out the appliance with a motor that switches on and off.', ['chest-freezer']),
      find('Check anything metal that could resonate.', ['shelving', 'ladder']),
      find('The culprit: a loose spanner on the work surface.', ['workbench']),
      { type: 'write', prompt: 'Write a short, atmospheric story about the night you solved the mystery.', minWords: 40,
        require: [linkers(1), advanced(1), basementWords(2)], sample: 'Although I was terrified, I crept down the stairs…' },
    ],
  },
};

const bikeRepair: MissionDefinition = {
  id: 'bike-repair', title: 'Bike Repair', icon: '🚲', xp: 100,
  intro: {
    A1: 'Your bike is broken and there’s a bike ride tomorrow! Fix it in the basement.',
    B1: 'Your bike has a puncture and a rusty chain, and the school cycling trip is tomorrow.',
  },
  steps: {
    A1: [
      find('Find your bike.', ['bicycle']),
      find('Find the tools.', ['toolbox']),
      find('Find where you can work.', ['workbench']),
      { type: 'place', prompt: 'Put the toolbox on the workbench.', checks: [{ rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
    ],
    A2: [
      find('Find the bike with the flat tyre.', ['bicycle']),
      find('You need a bucket of water to find the hole. Click it.', ['bucket']),
      { type: 'place', prompt: 'Put the toolbox on the workbench and the bicycle next to it.',
        checks: [{ rel: 'onTop', a: 'toolbox', b: 'workbench' }, { rel: 'nextTo', a: 'bicycle', b: 'workbench' }] },
      { type: 'write', prompt: 'Write how you fixed your bike. Use first and then.', minWords: 15,
        require: [linkers(2), basementWords(2)], sample: 'First, I found the hole…' },
    ],
    B1: [
      { type: 'place', prompt: 'Set up a repair station: bicycle next to the workbench, toolbox on top.',
        checks: [{ rel: 'nextTo', a: 'bicycle', b: 'workbench' }, { rel: 'onTop', a: 'toolbox', b: 'workbench' }] },
      find('You need water to find the puncture.', ['bucket']),
      { type: 'choice', prompt: 'Your dad offers to fix the bike for you. What do you say?', options: [
        { text: 'Thanks! Could you show me how, so I can do it myself next time?', correct: true, feedback: 'Polite, and you’ll learn something.' },
        { text: 'No, go away, I can do it.', correct: false, feedback: 'A bit rude — and help is useful.' },
        { text: 'Yes, and can you clean my room too?', correct: false, feedback: 'That’s pushing your luck!' },
      ] },
      { type: 'write', prompt: 'Write instructions for fixing a puncture.', minWords: 30,
        require: [linkers(3), basementWords(1)], sample: 'First, take the wheel off. Then…' },
    ],
    B2: [
      { type: 'place', prompt: 'Organise the workspace: bicycle beside the workbench, paint well away from the boiler.',
        checks: [{ rel: 'nextTo', a: 'bicycle', b: 'workbench' }, { rel: 'farFrom', a: 'paint', b: 'boiler' }] },
      { type: 'write', prompt: 'Write a short guide for younger students on looking after a bike over winter.', minWords: 45,
        require: [advanced(1), linkers(2), basementWords(1)], sample: 'Although it’s tempting to leave your bike outside, …' },
    ],
  },
};

const timeCapsule: MissionDefinition = {
  id: 'time-capsule', title: 'Grandma’s Treasure', icon: '🗝️', xp: 90,
  intro: {
    A1: 'Grandma hid a box of old photos in the basement years ago. Find it!',
    B1: 'Grandma remembers hiding a treasure box in the basement in 1985. Follow her memories.',
  },
  steps: {
    A1: [
      find('Grandma says: “It is high up. I used the …” Click it.', ['ladder']),
      find('“I put it next to the old boxes on the tall shelves.”', ['shelving']),
      find('Found it! In the brown box!', ['cardboard-box']),
    ],
    A2: [
      find('“I climbed up on something to reach it.”', ['ladder']),
      find('“It wasn’t near the hot machine, it was too warm there.”', ['boiler']),
      find('“I put a red box with tools in front of it.”', ['toolbox']),
      find('Here it is, in the old cardboard box!', ['cardboard-box']),
      { type: 'write', prompt: 'Write what Grandma did with the box, in order.', minWords: 15,
        require: [linkers(2), basementWords(2)], sample: 'First, she climbed the ladder…' },
    ],
    B1: [
      find('“I needed something to reach the top.”', ['ladder']),
      find('“I kept it somewhere cool and dry, not near the heating.”', ['shelving']),
      find('“I wrote my name on the lid of a brown box.”', ['cardboard-box']),
      { type: 'write', prompt: 'Imagine what is in the box. Write a message to Grandma about what you found.', minWords: 30,
        require: [linkers(1), basementWords(2)], sample: 'Grandma, we found the box on the shelves, and inside…' },
    ],
    B2: [
      find('“It had to be out of reach of the children.”', ['shelving']),
      find('“I needed to stand on something to reach it.”', ['ladder']),
      find('Click the box.', ['cardboard-box']),
      { type: 'write', prompt: 'Write a letter to a future family member to put in a new time capsule. What would you include and why?', minWords: 45,
        require: [advanced(1), linkers(1)], sample: 'Although you may find this strange, I decided to include…' },
    ],
  },
};

// ── ENTRANCE ───────────────────────────────────────────────────────────────

const ENTRANCE = ['door', 'front door', 'doormat', 'letterbox', 'doorbell', 'bench', 'flowerpot', 'flowers', 'bin', 'wheelie bin', 'porch light', 'light', 'house number', 'parcel', 'watering can', 'wellies', 'gnome'];
const entranceWords = room(ENTRANCE, 'entrance words');

const missingParcel: MissionDefinition = {
  id: 'missing-parcel', title: 'The Missing Parcel', icon: '📦', xp: 90,
  intro: {
    A1: 'Your new book was delivered, but where is it? Follow the clues.',
    B1: 'The delivery app says “left in a safe place”. Work out where the driver hid your parcel.',
  },
  steps: {
    A1: [
      find('Is it in the box for letters? Click it.', ['letterbox']),
      find('No. Is it on the mat?', ['doormat']),
      find('No. Is it behind the flowers?', ['flowerpot']),
      find('Found it! It is on the bench.', ['garden-bench']),
    ],
    A2: [
      find('The driver rang this first.', ['doorbell']),
      find('Then he looked for the number of the house.', ['house-number']),
      find('Then he looked for a dry place, not near the rubbish.', ['wheelie-bin']),
      find('There it is, next to the little man with the red hat!', ['garden-gnome']),
      { type: 'write', prompt: 'Write what the driver did, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), entranceWords(2)], sample: 'First, the driver rang the…' },
    ],
    B1: [
      find('“A safe place” isn’t on the wet ground. Start with the seat.', ['garden-bench']),
      find('Perhaps he hid it behind something big and green.', ['wheelie-bin']),
      find('Or behind something with flowers in it.', ['flowerpot']),
      find('Found it — behind the gnome! Click the parcel.', ['parcel']),
      { type: 'write', prompt: 'Write a review of the delivery for the app: what went well and what didn’t.', minWords: 30,
        require: [linkers(2), entranceWords(2)], sample: 'The parcel arrived on time, but…' },
    ],
    B2: [
      find('Check the most obvious hiding place first: somewhere off the ground and out of sight from the street.', ['garden-bench']),
      find('Rule out the receptacle that’s far too small for a parcel.', ['letterbox']),
      find('Check behind the large object on wheels.', ['wheelie-bin']),
      find('Located. Click the parcel.', ['parcel']),
      { type: 'write', prompt: 'Write a polite complaint to the delivery company about where the parcel was left, and suggest a better option.', minWords: 40,
        require: [linkers(1), advanced(1), entranceWords(2)], sample: 'Although the parcel arrived safely, …' },
    ],
  },
};

const gardenDay: MissionDefinition = {
  id: 'garden-day', title: 'Front Garden Day', icon: '🌻', xp: 100,
  intro: {
    A1: 'It’s sunny! Make the front of the house beautiful.',
    B1: 'Your street is having a “best front garden” competition. Make your entrance the most beautiful one.',
  },
  steps: {
    A1: [
      find('Find the flowers.', ['flowerpot']),
      find('Find what you water them with.', ['watering-can']),
      { type: 'place', prompt: 'Put the flowerpot next to the garden bench.', checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
    ],
    A2: [
      find('Put on your boots for the garden. Click them.', ['wellies']),
      find('Water the flowers.', ['watering-can']),
      { type: 'place', prompt: 'Put the gnome next to the flowerpot and the bin in the corner.',
        checks: [{ rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }, { rel: 'inCorner', a: 'wheelie-bin' }] },
      { type: 'write', prompt: 'Write what you did in the garden today.', minWords: 15,
        require: [entranceWords(2), linkers(1)], sample: 'First, I put on my wellies…' },
    ],
    B1: [
      { type: 'place', prompt: 'Judges love tidy entrances: bin in a corner, far from the bench.',
        checks: [{ rel: 'inCorner', a: 'wheelie-bin' }, { rel: 'farFrom', a: 'wheelie-bin', b: 'garden-bench' }] },
      { type: 'place', prompt: 'Add colour: flowerpot next to the bench and the gnome beside the flowers.',
        checks: [{ rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }, { rel: 'nextTo', a: 'garden-gnome', b: 'flowerpot' }] },
      { type: 'choice', prompt: 'Your neighbour says your gnome is “a bit silly”. What do you say?', options: [
        { text: 'I think it’s fun! Everyone has different taste.', correct: true, feedback: 'Friendly and confident.' },
        { text: 'Your garden is ugly!', correct: false, feedback: 'That will start an argument.' },
        { text: 'Throw the gnome away.', correct: false, feedback: 'You like it — keep it!' },
      ] },
      { type: 'write', prompt: 'Write a short description of your entrance for the competition judges.', minWords: 30,
        require: [entranceWords(3), prep(1)], sample: 'Our entrance is colourful because…' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a striking first impression: bench against the wall, porch light above it, flowers beside it.',
        checks: [{ rel: 'againstWall', a: 'garden-bench' }, { rel: 'above', a: 'porch-light', b: 'garden-bench' }, { rel: 'nextTo', a: 'flowerpot', b: 'garden-bench' }] },
      { type: 'write', prompt: 'Write a persuasive paragraph for the judges explaining why your entrance deserves to win.', minWords: 45,
        require: [advanced(1), entranceWords(3)], sample: 'Although our porch is small, it…' },
    ],
  },
};

const newNeighbours: MissionDefinition = {
  id: 'new-neighbours', title: 'New Neighbours', icon: '👋', xp: 90,
  intro: {
    A1: 'A new family moved in next door. Say hello and help them!',
    B1: 'A family from another country has moved in next door. Make them feel welcome and explain how things work on your street.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'You meet the new girl next door. What do you say?', options: [
        { text: 'Hello! I’m your neighbour. Welcome!', correct: true, feedback: 'Friendly!' },
        { text: 'Go away.', correct: false, feedback: 'Not very kind.' },
        { text: 'Goodbye!', correct: false, feedback: 'You’ve just met!' },
      ] },
      find('Show them where the post goes.', ['letterbox']),
      find('Show them the bin for rubbish.', ['wheelie-bin']),
    ],
    A2: [
      find('They ask how to call you. Show them your doorbell.', ['doorbell']),
      find('Tell them your house number.', ['house-number']),
      find('Show them the bin. Rubbish day is Monday.', ['wheelie-bin']),
      { type: 'write', prompt: 'Write a welcome card for your new neighbours.', minWords: 15,
        require: [entranceWords(2)], sample: 'Welcome! We live at number…' },
    ],
    B1: [
      find('Explain where the post arrives every morning.', ['letterbox']),
      find('Explain which day the rubbish is collected — show them.', ['wheelie-bin']),
      { type: 'choice', prompt: 'They don’t speak much English yet. What is the best way to help?', options: [
        { text: 'Speak slowly, use simple words and show them things.', correct: true, feedback: 'Patient and practical.' },
        { text: 'Speak louder.', correct: false, feedback: 'Louder isn’t clearer!' },
        { text: 'Don’t talk to them until they learn English.', correct: false, feedback: 'They need help now.' },
      ] },
      { type: 'write', prompt: 'Write a short guide to “life on our street” for the new family.', minWords: 30,
        require: [linkers(2), entranceWords(2)], sample: 'First, the rubbish goes out on Monday…' },
    ],
    B2: [
      find('Show them where parcels are usually left when nobody is home.', ['garden-bench']),
      find('Point out how visitors find the house after dark.', ['porch-light', 'house-number']),
      { type: 'write', prompt: 'Write a warm welcome letter to the new family, offering help and explaining a few useful things about the neighbourhood.', minWords: 45,
        require: [advanced(1), entranceWords(2)], sample: 'Although moving to a new country can be difficult, …' },
    ],
  },
};

// ── SCHOOL ─────────────────────────────────────────────────────────────────

const SCHOOL = ['school', 'classroom', 'teacher', 'whiteboard', 'board', 'desk', 'locker', 'globe', 'map', 'timetable', 'pencil case', 'bag', 'projector', 'textbook', 'textbooks', 'microscope', 'homework', 'lesson'];
const schoolWords = room(SCHOOL, 'school words');

const lostHomework: MissionDefinition = {
  id: 'lost-homework', title: 'The Lost Homework', icon: '📄', xp: 90,
  intro: {
    A1: 'You did your homework, but now you can’t find it! Look around the classroom.',
    B1: 'Your essay is due in five minutes and it has vanished. Retrace your steps around the classroom.',
  },
  steps: {
    A1: [
      find('Is it in your bag? Click it.', ['school-bag']),
      find('No. Is it in your locker?', ['locker']),
      find('No. Is it with your books?', ['textbooks']),
      find('Found it! It is on the teacher’s desk.', ['teachers-desk']),
    ],
    A2: [
      find('You had it this morning in the lesson on the timetable. Check the timetable — first lesson was maths.', ['timetable']),
      find('In maths you sat at your desk.', ['school-desk']),
      find('Then you put your pens away.', ['pencil-case']),
      find('Then you went to get your PE kit.', ['locker']),
      { type: 'write', prompt: 'Write what you did this morning, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), schoolWords(2)], sample: 'First, I sat at my…' },
    ],
    B1: [
      find('You last saw it when the teacher was showing slides. Start there.', ['projector']),
      find('Then you looked something up in your course book.', ['textbooks']),
      find('Then you checked a country on the round model of the Earth.', ['globe']),
      find('Found it — tucked under the globe on the teacher’s desk! Click the desk.', ['teachers-desk']),
      { type: 'write', prompt: 'Write a short apology to your teacher explaining why your homework was almost late.', minWords: 30,
        require: [linkers(2), schoolWords(2)], sample: 'I’m sorry because my homework…' },
    ],
    B2: [
      find('Think logically: where would a stray sheet most likely end up after a geography lesson? Check the wall chart first.', ['world-map']),
      find('Rule out the place where you only keep sports kit.', ['locker']),
      find('Check the place where papers are handed in.', ['teachers-desk']),
      find('Located — it slipped inside a course book. Click the textbooks.', ['textbooks']),
      { type: 'write', prompt: 'Write a short email to your teacher suggesting a better system for handing in homework, so nothing gets lost.', minWords: 40,
        require: [linkers(1), advanced(1), schoolWords(2)], sample: 'Although our current system works, …' },
    ],
  },
};

const scienceFair: MissionDefinition = {
  id: 'science-fair', title: 'Science Fair', icon: '🧪', xp: 100,
  intro: {
    A1: 'It’s the science fair! Get your project ready.',
    B1: 'Your class is entering the school science fair. Prepare your stand and present your experiment.',
  },
  steps: {
    A1: [
      find('Find the thing that makes small things big.', ['microscope']),
      find('Find your books.', ['textbooks']),
      { type: 'place', prompt: 'Put the microscope on the school desk.', checks: [{ rel: 'onTop', a: 'microscope', b: 'school-desk' }] },
    ],
    A2: [
      find('Check the timetable: when is the fair?', ['timetable']),
      find('Show your slides with this machine.', ['projector']),
      { type: 'place', prompt: 'Put the projector on the teacher’s desk and the microscope on the school desk.',
        checks: [{ rel: 'onTop', a: 'projector', b: 'teachers-desk' }, { rel: 'onTop', a: 'microscope', b: 'school-desk' }] },
      { type: 'write', prompt: 'Write what you did to get your stand ready.', minWords: 15,
        require: [schoolWords(2), linkers(1)], sample: 'First, I put the microscope…' },
    ],
    B1: [
      { type: 'place', prompt: 'Visitors need good light to see your slides: school desk near the window with the microscope on it.',
        checks: [{ rel: 'nearWindow', a: 'school-desk' }, { rel: 'onTop', a: 'microscope', b: 'school-desk' }] },
      { type: 'choice', prompt: 'A judge asks a question and you don’t know the answer. What do you say?', options: [
        { text: 'That’s a good question. I’m not sure, but I can find out.', correct: true, feedback: 'Honest and confident.' },
        { text: 'That’s a stupid question.', correct: false, feedback: 'Very rude to a judge!' },
        { text: 'Say nothing and walk away.', correct: false, feedback: 'You can still answer politely.' },
      ] },
      { type: 'write', prompt: 'Describe your experiment for the judges: what you did and what happened.', minWords: 30,
        require: [schoolWords(2), linkers(2)], sample: 'First, we put a leaf under…' },
    ],
    B2: [
      { type: 'place', prompt: 'Set up a professional stand: teacher’s desk against a wall, whiteboard above it, projector on it.',
        checks: [{ rel: 'againstWall', a: 'teachers-desk' }, { rel: 'above', a: 'whiteboard', b: 'teachers-desk' }, { rel: 'onTop', a: 'projector', b: 'teachers-desk' }] },
      { type: 'write', prompt: 'Write a persuasive summary of your project explaining why it deserves first prize.', minWords: 45,
        require: [advanced(1), schoolWords(3)], sample: 'Although our experiment was simple, it…' },
    ],
  },
};

const newStudent: MissionDefinition = {
  id: 'new-student', title: 'The New Student', icon: '👋', xp: 90,
  intro: {
    A1: 'A new student joins your class today. Say hello and help him!',
    B1: 'A student from another country has joined your class. Show him around and explain how things work.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'You meet the new boy. What do you say?', options: [
        { text: 'Hi! I’m Anna. Welcome to our class!', correct: true, feedback: 'Friendly!' },
        { text: 'You’re in my seat.', correct: false, feedback: 'Not very welcoming.' },
        { text: 'Goodbye!', correct: false, feedback: 'You’ve just met!' },
      ] },
      find('Show him his desk.', ['school-desk']),
      find('Show him where to keep his things.', ['locker']),
    ],
    A2: [
      find('He asks what lesson is next. Show him.', ['timetable']),
      find('He needs a pen. Show him your pencil case.', ['pencil-case']),
      find('Show him where to put his homework.', ['teachers-desk']),
      { type: 'write', prompt: 'Write a welcome card for the new student.', minWords: 15,
        require: [schoolWords(2)], sample: 'Welcome to our school! Your locker…' },
    ],
    B1: [
      find('Show him where he can find his home country.', ['world-map', 'globe']),
      find('Explain where homework is handed in.', ['teachers-desk']),
      { type: 'choice', prompt: 'He doesn’t speak much English yet. What is the best way to help?', options: [
        { text: 'Speak slowly, use simple words and show him things.', correct: true, feedback: 'Patient and practical.' },
        { text: 'Speak louder.', correct: false, feedback: 'Louder isn’t clearer!' },
        { text: 'Leave him alone until he learns English.', correct: false, feedback: 'He needs help now.' },
      ] },
      { type: 'write', prompt: 'Write a short guide to “a day in our school” for the new student.', minWords: 30,
        require: [linkers(2), schoolWords(2)], sample: 'First, we meet in the classroom…' },
    ],
    B2: [
      find('Show him where the weekly schedule is displayed.', ['timetable']),
      find('Point out where he can store valuables securely.', ['locker']),
      { type: 'write', prompt: 'Write a warm welcome letter to the new student, offering help and explaining a few things that surprised you when you started at this school.', minWords: 45,
        require: [advanced(1), schoolWords(2)], sample: 'Although starting a new school can be scary, …' },
    ],
  },
};

// ── OFFICE ─────────────────────────────────────────────────────────────────

const OFFICE = ['office', 'boss', 'colleague', 'meeting', 'table', 'meeting table', 'chair', 'filing cabinet', 'cabinet', 'water cooler', 'shredder', 'printer', 'computer', 'laptop', 'stapler', 'sticky notes', 'chart', 'email'];
const officeWords = room(OFFICE, 'office words');

const lostLaptop: MissionDefinition = {
  id: 'lost-laptop', title: 'Where’s My Laptop?', icon: '💻', xp: 90,
  intro: {
    A1: 'Your laptop is not on the table! Look around the office.',
    B1: 'Your presentation starts in ten minutes and your laptop has disappeared. Retrace your morning.',
  },
  steps: {
    A1: [
      find('Is it near the printer? Click it.', ['printer']),
      find('No. Is it on the cabinet?', ['filing-cabinet']),
      find('No. Is it by the water?', ['water-cooler']),
      find('Found it! It is on your chair.', ['office-chair']),
    ],
    A2: [
      find('This morning you got some water first.', ['water-cooler']),
      find('Then you printed a report.', ['printer']),
      find('Then you put the report together with this.', ['stapler']),
      find('Then you went to the meeting. Look there!', ['meeting-table']),
      { type: 'write', prompt: 'Write what you did this morning, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), officeWords(2)], sample: 'First, I got some water…' },
    ],
    B1: [
      find('You wrote a reminder this morning. Check your notes.', ['sticky-notes']),
      find('The note says “old contracts — 9:30”. Where are contracts kept?', ['filing-cabinet']),
      find('Then you destroyed the old copies.', ['shredder']),
      find('Found it — next to the shredder, on your chair! Click the chair.', ['office-chair']),
      { type: 'write', prompt: 'Write a quick message to your team explaining why the presentation will start a few minutes late.', minWords: 30,
        require: [linkers(2), officeWords(2)], sample: 'Sorry, everyone, because my laptop…' },
    ],
    B2: [
      find('Think logically: you last used it to check the figures on the wall. Start there.', ['sales-chart']),
      find('Rule out the place where you only keep paper files.', ['filing-cabinet']),
      find('Check the place where the morning meeting was held.', ['meeting-table']),
      find('Located — it was under a pile of printouts. Click the printer.', ['printer']),
      { type: 'write', prompt: 'Write a short email to your colleagues suggesting a rule for shared equipment so nothing goes missing.', minWords: 40,
        require: [linkers(1), advanced(1), officeWords(2)], sample: 'Although we all share the meeting room, …' },
    ],
  },
};

const fireDrill: MissionDefinition = {
  id: 'fire-drill', title: 'Fire Drill', icon: '🚨', xp: 100,
  intro: {
    A1: 'The fire alarm is ringing! It’s only practice. Do the right things.',
    B1: 'The building is having a fire drill and you are the fire warden for your office. Make sure everything is safe.',
  },
  steps: {
    A1: [
      find('Find the red fire extinguisher.', ['fire-extinguisher']),
      find('Turn off your computer.', ['computer']),
      { type: 'place', prompt: 'Move the shredder far from the meeting table so people can walk out.', checks: [{ rel: 'farFrom', a: 'shredder', b: 'meeting-table' }] },
    ],
    A2: [
      find('Check the fire extinguisher is on the wall.', ['fire-extinguisher']),
      find('Close the drawers of the filing cabinet.', ['filing-cabinet']),
      { type: 'place', prompt: 'Clear the way: put the office chair next to the meeting table and the water cooler in the corner.',
        checks: [{ rel: 'nextTo', a: 'office-chair', b: 'meeting-table' }, { rel: 'inCorner', a: 'water-cooler' }] },
      { type: 'write', prompt: 'Write what you did in the fire drill.', minWords: 15,
        require: [officeWords(2), linkers(1)], sample: 'First, I turned off the…' },
    ],
    B1: [
      { type: 'place', prompt: 'Nothing should block the exit: water cooler in a corner, filing cabinet against a wall.',
        checks: [{ rel: 'inCorner', a: 'water-cooler' }, { rel: 'againstWall', a: 'filing-cabinet' }] },
      { type: 'choice', prompt: 'A colleague says: “I’ll just finish this email first.” What do you say?', options: [
        { text: 'Sorry, we all need to leave now. The email can wait.', correct: true, feedback: 'Firm but polite — that’s a fire warden.' },
        { text: 'OK, take your time.', correct: false, feedback: 'In a real fire, every second counts.' },
        { text: 'Turn off their computer without a word.', correct: false, feedback: 'Explain first — politely.' },
      ] },
      { type: 'write', prompt: 'Write a short report for your manager about the fire drill: what went well and what didn’t.', minWords: 30,
        require: [officeWords(2), linkers(2)], sample: 'First, the alarm rang and…' },
    ],
    B2: [
      { type: 'place', prompt: 'Make the office fire-safe: filing cabinet against a wall, water cooler in a corner, shredder far from the meeting table.',
        checks: [{ rel: 'againstWall', a: 'filing-cabinet' }, { rel: 'inCorner', a: 'water-cooler' }, { rel: 'farFrom', a: 'shredder', b: 'meeting-table' }] },
      { type: 'write', prompt: 'Write a persuasive email to all staff explaining why fire drills matter, even though they are inconvenient.', minWords: 45,
        require: [advanced(1), officeWords(2)], sample: 'Although fire drills interrupt our work, …' },
    ],
  },
};

const jobInterview: MissionDefinition = {
  id: 'job-interview', title: 'The Job Interview', icon: '🤝', xp: 90,
  intro: {
    A1: 'Somebody is coming for a job interview. Help get ready and say hello!',
    B1: 'You’re helping your manager interview a new team member. Prepare the room and take part in the interview.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'The visitor arrives. What do you say?', options: [
        { text: 'Hello! Welcome. Please sit down.', correct: true, feedback: 'Friendly and polite!' },
        { text: 'What do you want?', correct: false, feedback: 'Not very welcoming.' },
        { text: 'Goodbye!', correct: false, feedback: 'They’ve just arrived!' },
      ] },
      find('Show the visitor where to sit.', ['office-chair']),
      find('Get the visitor some water.', ['water-cooler']),
    ],
    A2: [
      find('Print the visitor’s CV.', ['printer']),
      find('Put the CV pages together.', ['stapler']),
      find('Sit down for the interview here.', ['meeting-table']),
      { type: 'write', prompt: 'Write three questions to ask at the interview.', minWords: 15,
        require: [officeWords(1)], sample: 'Do you like working in an office? …' },
    ],
    B1: [
      find('Open the job description on the portable computer.', ['laptop']),
      find('Take quick notes during the interview.', ['sticky-notes']),
      { type: 'choice', prompt: 'The candidate asks about the salary. What is the best answer?', options: [
        { text: 'That’s a good question — my manager will discuss it with you at the end.', correct: true, feedback: 'Polite and professional.' },
        { text: 'It’s a secret.', correct: false, feedback: 'Not very helpful.' },
        { text: 'Why do you care about money?', correct: false, feedback: 'Everyone needs a salary!' },
      ] },
      { type: 'write', prompt: 'Write a short note to your manager about the candidate: strengths and weaknesses.', minWords: 30,
        require: [linkers(2), officeWords(1)], sample: 'The candidate was friendly, but…' },
    ],
    B2: [
      find('After the interview, file the signed application securely.', ['filing-cabinet']),
      find('Destroy your rough notes, which contain personal data.', ['shredder']),
      { type: 'write', prompt: 'Write a polite email to the candidate who did not get the job, thanking them and offering feedback.', minWords: 45,
        require: [advanced(1), officeWords(1)], sample: 'Although your interview was impressive, …' },
    ],
  },
};

// ── HOSPITAL ───────────────────────────────────────────────────────────────

const HOSPITAL = ['hospital', 'doctor', 'nurse', 'patient', 'bed', 'wheelchair', 'drip stand', 'trolley', 'crutches', 'stethoscope', 'thermometer', 'bandage', 'syringe', 'monitor', 'x-ray', 'eye chart', 'medicine'];
const hospitalWords = room(HOSPITAL, 'hospital words');

const lostStethoscope: MissionDefinition = {
  id: 'lost-stethoscope', title: 'The Doctor’s Missing Stethoscope', icon: '🩺', xp: 90,
  intro: {
    A1: 'Dr Green can’t find her stethoscope! Help her look.',
    B1: 'Dr Green has patients waiting and her stethoscope has vanished. Follow her round of the ward to find it.',
  },
  steps: {
    A1: [
      find('Is it on the bed? Click it.', ['hospital-bed']),
      find('No. Is it on the wheelchair?', ['wheelchair']),
      find('No. Is it by the eye chart?', ['eye-chart']),
      find('Found it! It is on the medical trolley.', ['medical-trolley']),
    ],
    A2: [
      find('First, Dr Green checked a patient’s temperature.', ['thermometer']),
      find('Then she looked at an X-ray.', ['x-ray']),
      find('Then she helped a boy with his crutches.', ['crutches']),
      find('Then she checked a heart. Look there!', ['heart-monitor']),
      { type: 'write', prompt: 'Write what the doctor did, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), hospitalWords(2)], sample: 'First, the doctor checked…' },
    ],
    B1: [
      find('She remembers changing the bag of medicine for a patient. Start there.', ['drip-stand']),
      find('Then she dressed a wound on a patient’s arm.', ['bandage']),
      find('Then she pushed a patient to the lift.', ['wheelchair']),
      find('Found it — hanging on the back of the patient’s bed! Click the bed.', ['hospital-bed']),
      { type: 'write', prompt: 'Write a short note to the doctor explaining where you found it and how.', minWords: 30,
        require: [linkers(2), hospitalWords(2)], sample: 'First, I checked the drip stand, then…' },
    ],
    B2: [
      find('Think logically: she last used it before reviewing a scan. Check the radiograph first.', ['x-ray']),
      find('Rule out the place where only walking aids are kept.', ['crutches']),
      find('Check the cart where clinical equipment is returned.', ['medical-trolley']),
      find('Located — under the cardiac monitor. Click it.', ['heart-monitor']),
      { type: 'write', prompt: 'Write a short email to ward staff proposing a system so shared equipment isn’t misplaced.', minWords: 40,
        require: [linkers(1), advanced(1), hospitalWords(2)], sample: 'Although equipment goes missing only occasionally, …' },
    ],
  },
};

const fluSeason: MissionDefinition = {
  id: 'flu-season', title: 'Flu Season', icon: '🤧', xp: 100,
  intro: {
    A1: 'Lots of people have the flu! Help the nurses.',
    B1: 'It’s winter and the ward is full of flu patients. Help the nurses keep everyone safe and comfortable.',
  },
  steps: {
    A1: [
      find('Find the thermometer.', ['thermometer']),
      find('Find the bed for the sick patient.', ['hospital-bed']),
      { type: 'place', prompt: 'Put the thermometer on the medical trolley.', checks: [{ rel: 'onTop', a: 'thermometer', b: 'medical-trolley' }] },
    ],
    A2: [
      find('Check a patient’s temperature.', ['thermometer']),
      find('Give a patient medicine through the drip.', ['drip-stand']),
      { type: 'place', prompt: 'Put the drip stand next to the bed and the bed near the window.',
        checks: [{ rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }, { rel: 'nearWindow', a: 'hospital-bed' }] },
      { type: 'write', prompt: 'Write what you did to help the flu patients.', minWords: 15,
        require: [hospitalWords(2), linkers(1)], sample: 'First, I checked the temperature…' },
    ],
    B1: [
      { type: 'place', prompt: 'Fresh air helps: bed near the window, medical trolley next to it.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'medical-trolley', b: 'hospital-bed' }] },
      { type: 'choice', prompt: 'A visitor with a bad cough wants to see his grandmother. What do you say?', options: [
        { text: 'I’m sorry, but you could make the patients ill. Could you call her instead today?', correct: true, feedback: 'Polite and protects the patients.' },
        { text: 'Sure, go in!', correct: false, feedback: 'The patients could catch his illness.' },
        { text: 'Get out!', correct: false, feedback: 'Much too rude.' },
      ] },
      { type: 'write', prompt: 'Write a short poster for the waiting room with three tips to stop flu spreading.', minWords: 30,
        require: [hospitalWords(2), linkers(1)], sample: 'Stop the flu! First, wash your hands…' },
    ],
    B2: [
      { type: 'place', prompt: 'Organise an isolation bay: bed near the window, drip stand beside it, wheelchair far from the bed.',
        checks: [{ rel: 'nearWindow', a: 'hospital-bed' }, { rel: 'nextTo', a: 'drip-stand', b: 'hospital-bed' }, { rel: 'farFrom', a: 'wheelchair', b: 'hospital-bed' }] },
      { type: 'write', prompt: 'Write a persuasive article for a local newspaper encouraging people to get a flu vaccine.', minWords: 45,
        require: [advanced(1), hospitalWords(2)], sample: 'Although many people think flu is just a bad cold, …' },
    ],
  },
};

const scaredPatient: MissionDefinition = {
  id: 'scared-patient', title: 'The Scared Patient', icon: '🧸', xp: 90,
  intro: {
    A1: 'A little girl is scared of the hospital. Help her feel better!',
    B1: 'A seven-year-old girl is in hospital for the first time and very frightened. Show her around and explain things gently.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'The girl is crying. What do you say?', options: [
        { text: 'Hello! Don’t be scared. The doctors are very kind.', correct: true, feedback: 'Kind and calm!' },
        { text: 'Stop crying!', correct: false, feedback: 'That won’t help her.' },
        { text: 'Goodbye!', correct: false, feedback: 'She needs you to stay.' },
      ] },
      find('Show her the bed where she can rest.', ['hospital-bed']),
      find('Show her the chair with wheels — it’s like a car!', ['wheelchair']),
    ],
    A2: [
      find('She asks what the beeping is. Show her.', ['heart-monitor']),
      find('Show her the funny letters on the wall.', ['eye-chart']),
      find('Show her what the doctor listens to her heart with.', ['stethoscope']),
      { type: 'write', prompt: 'Write a little card for the girl to make her smile.', minWords: 15,
        require: [hospitalWords(2)], sample: 'Dear Mia, the nurses here…' },
    ],
    B1: [
      find('Explain what the bag of medicine is for.', ['drip-stand']),
      find('Show her the picture of her arm and explain it isn’t scary.', ['x-ray']),
      { type: 'choice', prompt: 'She asks: “Will the injection hurt?” What is the best answer?', options: [
        { text: 'It might feel like a little scratch, but it’s very quick. You can hold my hand.', correct: true, feedback: 'Honest and comforting.' },
        { text: 'No, it never hurts.', correct: false, feedback: 'She won’t trust you next time.' },
        { text: 'Yes, it hurts a lot.', correct: false, feedback: 'That will scare her more.' },
      ] },
      { type: 'write', prompt: 'Write a short, simple guide “Your first day in hospital” for young children.', minWords: 30,
        require: [linkers(2), hospitalWords(2)], sample: 'First, a nurse will say hello…' },
    ],
    B2: [
      find('Show her parents where her treatment equipment is kept.', ['medical-trolley']),
      find('Point out how the staff will monitor her during the night.', ['heart-monitor']),
      { type: 'write', prompt: 'Write a reassuring letter to the girl’s parents explaining how the ward helps frightened children.', minWords: 45,
        require: [advanced(1), hospitalWords(2)], sample: 'Although a hospital stay can be frightening, …' },
    ],
  },
};

// ── SUPERMARKET ────────────────────────────────────────────────────────────

const SUPERMARKET = ['supermarket', 'shop', 'trolley', 'checkout', 'cash register', 'fruit', 'fruit stand', 'bread', 'fridge', 'basket', 'scanner', 'watermelon', 'bag', 'special offer', 'price', 'money'];
const supermarketWords = room(SUPERMARKET, 'supermarket words');

const lostChild: MissionDefinition = {
  id: 'lost-child', title: 'Where’s Little Max?', icon: '🧒', xp: 90,
  intro: {
    A1: 'Little Max is lost in the supermarket! Help his mum find him.',
    B1: 'A worried mum can’t find her four-year-old son, Max. Think about what a small child would like and search the shop.',
  },
  steps: {
    A1: [
      find('Is he near the fruit? Click it.', ['fruit-stand']),
      find('No. Is he near the bread?', ['bread-rack']),
      find('No. Is he near the cold drinks?', ['drinks-fridge']),
      find('Found him! He is in the shopping trolley.', ['shopping-trolley']),
    ],
    A2: [
      find('Max loves bread rolls. Look there first.', ['bread-rack']),
      find('Then he wanted a cold drink.', ['drinks-fridge']),
      find('Then he looked at the big green fruit.', ['watermelon']),
      find('Then he went to the place that goes “beep”!', ['barcode-scanner']),
      { type: 'write', prompt: 'Write where Max went, in order. Use first, then, after that.', minWords: 15,
        require: [linkers(2), supermarketWords(2)], sample: 'First, Max went to the…' },
    ],
    B1: [
      find('Children love sweet things on offer. Check the sign with today’s deals.', ['special-offer']),
      find('Then he may have followed the trolleys.', ['shopping-trolley']),
      find('Ask the cashier at the till.', ['cash-register']),
      find('Found him — hiding behind the fruit stand! Click it.', ['fruit-stand']),
      { type: 'write', prompt: 'Write a short announcement for the shop’s loudspeaker describing the lost boy.', minWords: 30,
        require: [linkers(1), supermarketWords(2)], sample: 'Attention, please! A little boy called Max…' },
    ],
    B2: [
      find('Be logical: check the exit route first — the checkout.', ['checkout']),
      find('Rule out the cold cabinet; a child wouldn’t stay there long.', ['drinks-fridge']),
      find('Check the area with the most colourful display.', ['fruit-stand']),
      find('Located — sitting in an empty trolley. Click it.', ['shopping-trolley']),
      { type: 'write', prompt: 'Write a short email to the manager suggesting how the shop could handle lost children better.', minWords: 40,
        require: [linkers(1), advanced(1), supermarketWords(2)], sample: 'Although Max was found quickly, …' },
    ],
  },
};

const partyShopping: MissionDefinition = {
  id: 'party-shopping', title: 'Party Shopping', icon: '🎂', xp: 100,
  intro: {
    A1: 'You are shopping for a birthday party! Find the things you need.',
    B1: 'You’re buying everything for your best friend’s surprise party, with a list and a strict budget.',
  },
  steps: {
    A1: [
      find('Take a basket.', ['shopping-basket']),
      find('Find the fruit.', ['fruit-stand']),
      find('Find the cold drinks.', ['drinks-fridge']),
      find('Pay here.', ['checkout']),
    ],
    A2: [
      find('It’s a big party — take a trolley.', ['shopping-trolley']),
      find('Buy a big fruit for everyone.', ['watermelon']),
      find('Buy some bread rolls.', ['bread-rack']),
      { type: 'write', prompt: 'Write your shopping list for the party.', minWords: 15,
        require: [supermarketWords(2)], sample: 'I need a watermelon and…' },
    ],
    B1: [
      find('Check the special offers first to save money.', ['special-offer']),
      find('Get lemonade from the cold cabinet.', ['drinks-fridge']),
      { type: 'choice', prompt: 'At the till you have 3 euros too little. What do you say?', options: [
        { text: 'Sorry, could you take the watermelon off, please?', correct: true, feedback: 'Polite and practical.' },
        { text: 'Can I pay next week?', correct: false, feedback: 'Shops don’t usually do that.' },
        { text: 'Just give it to me.', correct: false, feedback: 'That’s not how shops work!' },
      ] },
      { type: 'write', prompt: 'Write a message to a friend explaining what you bought for the party and why.', minWords: 30,
        require: [supermarketWords(2), linkers(1)], sample: 'I bought lemonade because…' },
    ],
    B2: [
      { type: 'place', prompt: 'Help the shop prepare for weekend parties: fruit stand by the window with the offer sign above it.',
        checks: [{ rel: 'nearWindow', a: 'fruit-stand' }, { rel: 'above', a: 'special-offer', b: 'fruit-stand' }] },
      { type: 'write', prompt: 'Write a short guide “How to shop for a party on a budget” for your school magazine.', minWords: 45,
        require: [advanced(1), supermarketWords(2)], sample: 'Although parties can be expensive, …' },
    ],
  },
};

const newCashier: MissionDefinition = {
  id: 'new-cashier', title: 'First Day at the Till', icon: '🧾', xp: 90,
  intro: {
    A1: 'Today you work at the checkout! Help the customers.',
    B1: 'It’s your first shift as a cashier. Learn the till and serve your first customers politely.',
  },
  steps: {
    A1: [
      { type: 'choice', prompt: 'A customer comes to the checkout. What do you say?', options: [
        { text: 'Hello! Do you need a bag?', correct: true, feedback: 'Friendly!' },
        { text: 'What do you want?', correct: false, feedback: 'Not very polite.' },
        { text: 'Goodbye!', correct: false, feedback: 'They just arrived!' },
      ] },
      find('Scan the food.', ['barcode-scanner']),
      find('Put the money in here.', ['cash-register']),
    ],
    A2: [
      find('A customer wants a bag. Give her one.', ['shopping-bag']),
      find('Scan her milk.', ['barcode-scanner']),
      find('Give her the change from here.', ['cash-register']),
      { type: 'write', prompt: 'Write three things a cashier says to customers.', minWords: 15,
        require: [supermarketWords(1)], sample: 'Hello! Would you like a bag? …' },
    ],
    B1: [
      find('The scanner says the bread costs 50 euros! Check the shelf price.', ['bread-rack']),
      find('Tell the customer about today’s deal.', ['special-offer']),
      { type: 'choice', prompt: 'A customer is rude because the queue is long. What is the best answer?', options: [
        { text: 'I’m sorry for the wait. I’ll be as quick as I can.', correct: true, feedback: 'Calm and professional.' },
        { text: 'It’s not my fault!', correct: false, feedback: 'That makes things worse.' },
        { text: 'Say nothing and look angry.', correct: false, feedback: 'A friendly word helps.' },
      ] },
      { type: 'write', prompt: 'Write a short diary entry about your first day as a cashier.', minWords: 30,
        require: [linkers(2), supermarketWords(2)], sample: 'First, I learned how to use the…' },
    ],
    B2: [
      find('At closing time, check the money in the till.', ['cash-register']),
      find('Then check the closing time customers can see.', ['opening-hours']),
      { type: 'write', prompt: 'Write an email to your manager suggesting one change that would make the checkout faster.', minWords: 45,
        require: [advanced(1), supermarketWords(2)], sample: 'Although the new scanners work well, …' },
    ],
  },
};

export const SIDE_QUESTS: Record<string, MissionDefinition[]> = {
  bedroom: [lostPhone, sleepover, laundryDay],
  kitchen: [midnightSnack, recipeCard, inspector],
  bathroom: [lostRing, spaDay, plumber],
  'living-room': [lostRemote, pianoConcert, winterEvening],
  hallway: [lostKeys, powerCut, rainyWalk],
  basement: [strangeNoise, bikeRepair, timeCapsule],
  entrance: [missingParcel, gardenDay, newNeighbours],
  school: [lostHomework, scienceFair, newStudent],
  office: [lostLaptop, fireDrill, jobInterview],
  hospital: [lostStethoscope, fluSeason, scaredPatient],
  supermarket: [lostChild, partyShopping, newCashier],
};
