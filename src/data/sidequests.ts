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

export const SIDE_QUESTS: Record<string, MissionDefinition[]> = {
  bedroom: [lostPhone, sleepover, laundryDay],
  kitchen: [midnightSnack, recipeCard, inspector],
  bathroom: [lostRing, spaDay, plumber],
  'living-room': [lostRemote, pianoConcert, winterEvening],
  hallway: [lostKeys, powerCut, rainyWalk],
  basement: [strangeNoise, bikeRepair, timeCapsule],
};
