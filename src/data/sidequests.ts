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

export const SIDE_QUESTS: Record<string, MissionDefinition[]> = {
  bedroom: [lostPhone, sleepover, laundryDay],
  kitchen: [midnightSnack, recipeCard, inspector],
};
