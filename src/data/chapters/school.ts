import type { ByLevel, ChapterDefinition, MissionDefinition, MissionStep, PropDef, WordRequirement } from '../../chapter/types';

// ═══════════════════════════════════════════════════════════════════════════
//  SCHOOL CHAPTER — all missions, mini-game content and practice sentences.
//  The school is a classroom: the first place in the city. Same shape as the house rooms.
//
//  Furniture ids you can use: whiteboard, world-map, timetable (all on the wall),
//  teachers-desk, school-desk, locker (floor), globe, pencil-case, school-bag, projector,
//  textbooks, microscope (small)
//
//  Surfaces (small things can stand ON them): teachers-desk, school-desk
//
//  Text can change by level:  { A1: '...', A2: '...', B1: '...', B2: '...' }
//  Only A1 is required — missing levels use the closest lower level.
// ═══════════════════════════════════════════════════════════════════════════

const SCHOOL_WORDS = ['school', 'classroom', 'teacher', 'student', 'whiteboard', 'board', 'desk', 'teacher’s desk', 'school desk', 'locker', 'globe', 'map',
  'world map', 'timetable', 'pencil case', 'pen', 'pencil', 'bag', 'school bag', 'projector', 'textbook', 'textbooks', 'book', 'microscope', 'lesson', 'homework'];
const PREPOSITIONS = ['next to', 'on', 'under', 'above', 'in front of', 'behind', 'near', 'between', 'opposite',
  'in the corner', 'against the wall', 'in the middle of', 'inside', 'below', 'in', 'by', 'at'];
const CONNECTORS = ['because', 'so', 'so that', 'which', 'and', 'but'];
const ADVANCED_CONNECTORS = ['although', 'however', 'whereas', 'instead of', 'which means', 'on the other hand', 'even though', 'therefore'];

const schoolWords = (count: number): WordRequirement => ({ label: 'school words', words: SCHOOL_WORDS, count });
const prepositions = (count: number): WordRequirement => ({ label: 'prepositions', words: PREPOSITIONS, count });
const connectors = (count: number): WordRequirement => ({ label: 'linking words (because, so...)', words: CONNECTORS, count });
const advanced = (count: number): WordRequirement => ({ label: 'advanced linking words (although, however, instead of...)', words: ADVANCED_CONNECTORS, count });

const same = <T>(v: T): ByLevel<T> => ({ A1: v });

function findMission(id: string, title: string, icon: string, prompt: ByLevel<string>, targets: string[], count = 1): MissionDefinition {
  const step = (p: string): MissionStep[] => [{ type: 'find', prompt: p, targets, count }];
  return {
    id, title, icon, xp: 20,
    intro: same('Click the real objects in your classroom.'),
    steps: { A1: step(prompt.A1), A2: step(prompt.A2 ?? prompt.A1), B1: step(prompt.B1 ?? prompt.A2 ?? prompt.A1), B2: step(prompt.B2 ?? prompt.B1 ?? prompt.A2 ?? prompt.A1) },
  };
}

// ── STAGE 2: EXPLORE ───────────────────────────────────────────────────────
const explore: MissionDefinition[] = [
  findMission('first-day', 'First day at school', '🎒', {
    A1: 'Find two things you bring to school.',
    A2: 'Find your bag and the case for your pens.',
    B1: 'Find two things every student packs the night before school.',
    B2: 'Identify two personal items a student brings to class.',
  }, ['school-bag', 'pencil-case'], 2),
  findMission('teacher-corner', 'The teacher’s corner', '👩‍🏫', {
    A1: 'Find two things the teacher uses.',
    A2: 'Find where the teacher writes and where she sits.',
    B1: 'Find the two places the teacher uses most in a lesson.',
    B2: 'Identify the teacher’s writing surface and workstation.',
  }, ['whiteboard', 'teachers-desk'], 2),
  findMission('geography', 'Around the world', '🌍', {
    A1: 'Find two things that show the world.',
    A2: 'Find the round Earth and the map.',
    B1: 'Find two things you need in a geography lesson.',
    B2: 'Identify two resources for teaching geography.',
  }, ['globe', 'world-map'], 2),
  findMission('science', 'Science time', '🔬', {
    A1: 'Find two things for science.',
    A2: 'Find the books and the thing that makes small things big.',
    B1: 'Find what you study from and what you use in an experiment.',
    B2: 'Identify the reference material and the lab instrument.',
  }, ['textbooks', 'microscope'], 2),
  findMission('what-next', 'What’s next?', '🗓️', {
    A1: 'Find the list of lessons.',
    A2: 'Find what tells you the next lesson.',
    B1: 'Find out if you have PE today.',
    B2: 'Find the weekly schedule.',
  }, ['timetable']),
];

// ── STAGE 4: REAL-LIFE CHALLENGES ──────────────────────────────────────────
function box(id: string, label: string, accept: string[]): PropDef {
  return { id, label, look: 'box', accept };
}

function thing(id: string, label: string, look: PropDef['look'], color: string, accept: string[], instruction: string): PropDef {
  return { id, label, look, color, accept, instruction };
}

const unpack: MissionDefinition = {
  id: 'unpack', title: 'New School Year', icon: '📦', xp: 60,
  intro: {
    A1: 'It’s September! New things came for the classroom. Put everything in the right place.',
    A2: 'The new school year starts tomorrow. Help the teacher unpack the boxes.',
    B1: 'The classroom has been empty all summer. Read the labels and get it ready for the first day.',
    B2: 'The supplier’s labels are rather vague. Work out where each delivery belongs before the students arrive.',
  },
  steps: {
    A1: [{ type: 'sort', boxes: true, prompt: 'Click a box to open it. Then click where the thing goes.', props: [
      box('u1', 'board pens', ['whiteboard']),
      box('u2', 'new books', ['textbooks', 'school-desk']),
      box('u3', 'a new map of the countries', ['world-map']),
      box('u4', 'pens and pencils', ['pencil-case']),
      box('u5', 'a list of lessons', ['timetable']),
      box('u6', 'PE shoes', ['locker']),
    ] }],
    A2: [{ type: 'sort', boxes: true, prompt: 'Open each box and put the things where they belong.', props: [
      box('u1', 'red and blue markers', ['whiteboard']),
      box('u2', 'English books for the class', ['textbooks', 'school-desk']),
      box('u3', 'a new world map', ['world-map']),
      box('u4', 'rulers and rubbers', ['pencil-case']),
      box('u5', 'this year’s timetable', ['timetable']),
      box('u6', 'sports kit', ['locker']),
      box('u7', 'the register', ['teachers-desk']),
    ] }],
    B1: [{ type: 'sort', boxes: true, prompt: 'Read each label and decide where the contents should go.', props: [
      box('u1', 'something to write on the board with', ['whiteboard']),
      box('u2', 'books for every student', ['textbooks', 'school-desk']),
      box('u3', 'something that shows every country', ['world-map', 'globe']),
      box('u4', 'things you need in every lesson', ['pencil-case']),
      box('u5', 'the new lesson plan for the week', ['timetable']),
      box('u6', 'trainers and a towel', ['locker']),
      box('u7', 'slides for the computer', ['projector']),
      box('u8', 'glass slides with leaves on them', ['microscope']),
    ] }],
    B2: [{ type: 'sort', boxes: true, prompt: 'Interpret each label and find the most suitable place for its contents.', props: [
      box('u1', 'dry-wipe markers', ['whiteboard']),
      box('u2', 'a class set of course books', ['textbooks', 'school-desk']),
      box('u3', 'an up-to-date political map', ['world-map']),
      box('u4', 'essential stationery', ['pencil-case']),
      box('u5', 'the revised weekly schedule', ['timetable']),
      box('u6', 'personal belongings for PE', ['locker']),
      box('u7', 'a replacement lamp for the beamer', ['projector']),
      box('u8', 'prepared specimen slides', ['microscope']),
    ] }],
  },
};

const lateForClass: MissionDefinition = {
  id: 'late-for-class', title: 'Messy Classroom', icon: '🧹', xp: 60,
  intro: {
    A1: 'After the lesson, the classroom is a mess! Help the teacher tidy up.',
    A2: 'The last lesson has finished and the classroom is a mess. Follow the teacher’s note.',
    B1: 'An inspector is visiting tomorrow morning, and the classroom is chaos. Read the teacher’s note and sort things out.',
    B2: 'Your teacher is off sick and you are in charge of getting the classroom ready for a supply teacher. Follow the note.',
  },
  steps: {
    A1: [{ type: 'sort', prompt: 'Click a thing, then click where it goes.', props: [
      thing('m1', 'the books', 'book', '#3c6fd1', ['textbooks', 'school-desk', 'teachers-desk'], 'Put the books on the desk.'),
      thing('m2', 'the pens', 'phone', '#ffd54f', ['pencil-case'], 'Put the pens in the pencil case.'),
      thing('m3', 'the football boots', 'shoes', '#2f3440', ['locker'], 'Put the boots in the locker.'),
      thing('m4', 'the homework', 'book', '#ffffff', ['teachers-desk'], 'Put the homework on the teacher’s desk.'),
      thing('m5', 'the marker', 'phone', '#e04848', ['whiteboard'], 'Put the marker by the whiteboard.'),
    ] }],
    A2: [
      { type: 'find', prompt: 'The teacher wants to know the next lesson. What does she look at? Click it.', targets: ['timetable'] },
      { type: 'sort', prompt: 'Follow the teacher’s note.', props: [
        thing('m1', 'the English books', 'book', '#6fae6a', ['textbooks', 'school-desk'], 'Put the English books on the desks.'),
        thing('m2', 'the rulers', 'phone', '#c9d2d9', ['pencil-case'], 'Put the rulers in the pencil case.'),
        thing('m3', 'a wet towel', 'box', '#9fd8ff', ['locker'], 'Put the towel in the locker.'),
        thing('m4', 'the test papers', 'book', '#fff3a3', ['teachers-desk'], 'Put the tests on my desk.'),
        thing('m5', 'the laptop cable', 'phone', '#2f3440', ['projector'], 'Put the cable next to the projector.'),
      ] },
    ],
    B1: [
      { type: 'find', prompt: 'Somebody wrote a rude word on the board. What must you clean first? Click it.', targets: ['whiteboard'] },
      { type: 'sort', prompt: 'Read the teacher’s note and put everything in its place.', props: [
        thing('m1', 'the marked homework', 'book', '#ffffff', ['teachers-desk'], 'The inspector will want to see the marking.'),
        thing('m2', 'the slides of onion skin', 'phone', '#c9b6e4', ['microscope'], 'We need them for the science lesson at nine.'),
        thing('m3', 'a smelly PE bag', 'box', '#3f7d4e', ['locker'], 'It shouldn’t be lying in the middle of the room!'),
        thing('m4', 'the loose pencils', 'phone', '#ffd54f', ['pencil-case'], 'Nobody wants to find pencils on the floor.'),
        thing('m5', 'the atlas', 'book', '#5aa9e6', ['globe', 'world-map', 'teachers-desk'], 'Leave it with the other geography things.'),
      ] },
      { type: 'choice', prompt: 'A classmate asks you to tell the teacher that he was ill, but he wasn’t. What do you say?', options: [
        { text: 'Sorry, I can’t lie for you. Just tell her the truth.', correct: true, feedback: 'Honest and kind.' },
        { text: 'OK, I’ll say you were very ill.', correct: false, feedback: 'You could both get into trouble.' },
        { text: 'I’ll tell everyone you’re a liar.', correct: false, feedback: 'That isn’t very friendly.' },
      ] },
    ],
    B2: [
      { type: 'find', prompt: 'The supply teacher has prepared slides but the wall is blank. What needs switching on? Click it.', targets: ['projector'] },
      { type: 'sort', prompt: 'The note is full of hints. Put each thing where it should go.', props: [
        thing('m1', 'the confidential reports', 'book', '#ffffff', ['teachers-desk'], 'They mustn’t be left where students can read them.'),
        thing('m2', 'the specimen slides', 'phone', '#c9b6e4', ['microscope'], 'Fragile — keep them with the instrument they belong to.'),
        thing('m3', 'a lost-property jumper', 'box', '#e04848', ['locker'], 'Store it securely until the owner turns up.'),
        thing('m4', 'stray stationery', 'phone', '#ffd54f', ['pencil-case'], 'Gather up anything that could roll off a desk.'),
        thing('m5', 'the class novels', 'book', '#6fae6a', ['textbooks', 'school-desk'], 'Return the reading books to where students study.'),
        thing('m6', 'a cleaning spray', 'bottle', '#9fd8c2', ['whiteboard'], 'Yesterday’s notes are still showing.'),
      ] },
      { type: 'write', prompt: 'Write a short note to the supply teacher explaining what is ready and what is still missing.', minWords: 35,
        require: [schoolWords(2), connectors(1), advanced(1)], sample: 'Although the projector is ready, ...' },
    ],
  },
};

const SHOP_ITEMS = [
  { id: 'desks', name: 'Six school desks', description: 'Desks and chairs for a group. Big and heavy.', price: 60, tags: ['sit', 'big'] },
  { id: 'cushions', name: 'Floor cushions', description: 'Soft cushions for the reading corner.', price: 15, tags: ['sit'] },
  { id: 'board', name: 'Whiteboard', description: 'A big board for the wall.', price: 35, tags: ['write'] },
  { id: 'flipchart', name: 'Flipchart', description: 'Big paper on a stand. Small and cheap.', price: 12, tags: ['write'] },
  { id: 'globe', name: 'Globe', description: 'A round model of the Earth.', price: 20, tags: ['learn'] },
  { id: 'books', name: 'Box of storybooks', description: 'Thirty books for reading time.', price: 18, tags: ['learn'] },
  { id: 'projector', name: 'Projector', description: 'Show films and slides. Expensive.', price: 50, tags: ['learn', 'big'] },
  { id: 'pens', name: 'Pencil cases for everyone', description: 'Pens, pencils and rulers.', price: 10, tags: ['tools'] },
  { id: 'lockers', name: 'Lockers', description: 'Safe places for bags. They take a lot of space.', price: 45, tags: ['store', 'big'] },
  { id: 'boxes', name: 'Plastic boxes', description: 'Boxes for bags and coats.', price: 8, tags: ['store'] },
];

const budgetSchool: MissionDefinition = {
  id: 'budget-school', title: 'Classroom on a Budget', icon: '💰', xp: 60,
  intro: {
    A1: 'A village school needs a new classroom. Help the teacher buy things.',
    A2: 'A small village school has an empty classroom and very little money. Help the teacher.',
    B1: 'The village school’s classroom is tiny. Choose things that fit both the room and the budget.',
    B2: 'You’re helping a village school equip a small classroom on a strict budget. Weigh up the options carefully.',
  },
  steps: {
    A1: [
      { type: 'shop', prompt: 'You have 50 coins. The class needs something to write on and something to learn with.', budget: 50,
        items: SHOP_ITEMS.filter((i) => ['board', 'flipchart', 'globe', 'books', 'projector'].includes(i.id)),
        needs: [{ tag: 'write', label: 'write on' }, { tag: 'learn', label: 'learn with' }] },
      { type: 'place', prompt: 'Now in YOUR classroom: put the globe on the teacher’s desk.', checks: [{ rel: 'onTop', a: 'globe', b: 'teachers-desk' }] },
    ],
    A2: [
      { type: 'shop', prompt: 'You have 60 coins. The class needs a place to sit, something to write on and pens.', budget: 60,
        items: SHOP_ITEMS.filter((i) => !['lockers', 'boxes'].includes(i.id)),
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'write', label: 'write on' }, { tag: 'tools', label: 'pens' }] },
      { type: 'place', prompt: 'Now in YOUR classroom: put the pencil case on the school desk.', checks: [{ rel: 'onTop', a: 'pencil-case', b: 'school-desk' }] },
    ],
    B1: [
      { type: 'shop', prompt: 'You have 80 coins. The room is tiny, so choose only ONE big item. The class needs seats, something to write on, books and somewhere to store bags.', budget: 80, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'sit' }, { tag: 'write', label: 'write on' }, { tag: 'learn', label: 'learn' }, { tag: 'store', label: 'store bags' }] },
      { type: 'write', prompt: 'Write a short message to the head teacher explaining what you bought and why.', minWords: 25,
        require: [schoolWords(2), connectors(1)], sample: 'I bought a flipchart because the room is small, and...' },
      { type: 'place', prompt: 'Now in YOUR classroom: put the locker in a corner.', checks: [{ rel: 'inCorner', a: 'locker' }] },
    ],
    B2: [
      { type: 'shop', prompt: 'You have 90 coins and space for only ONE bulky item. The class needs seats, something to write on, learning materials, pens and storage.', budget: 90, maxBig: 1,
        items: SHOP_ITEMS,
        needs: [{ tag: 'sit', label: 'seating' }, { tag: 'write', label: 'writing surface' }, { tag: 'learn', label: 'materials' }, { tag: 'tools', label: 'stationery' }, { tag: 'store', label: 'storage' }] },
      { type: 'write', prompt: 'Justify your choices to the head teacher. Mention one option you rejected and why.', minWords: 45,
        require: [schoolWords(3), connectors(1), advanced(1)], sample: 'I chose floor cushions instead of desks because...' },
      { type: 'place', prompt: 'Now in YOUR classroom: students must see the board — put the school desk far from the locker.',
        checks: [{ rel: 'farFrom', a: 'school-desk', b: 'locker' }] },
    ],
  },
};

// ── STAGE 5: CLASSROOM MAKEOVER ────────────────────────────────────────────
const makeover: MissionDefinition = {
  id: 'makeover', title: 'Classroom Makeover', icon: '🎨', xp: 80,
  intro: {
    A1: 'Make your classroom nice! Read and move the things. Then press Check.',
    A2: 'Time for a classroom makeover! Follow the instructions and move the real things.',
    B1: 'Give your classroom a makeover. Read each brief carefully, rearrange things, then check.',
    B2: 'The head teacher has sent you a brief. Interpret it and rearrange the classroom accordingly.',
  },
  steps: {
    A1: [
      { type: 'place', prompt: 'Put the teacher’s desk against the wall.', checks: [{ rel: 'againstWall', a: 'teachers-desk' }] },
      { type: 'place', prompt: 'Put the projector on the teacher’s desk.', checks: [{ rel: 'onTop', a: 'projector', b: 'teachers-desk' }] },
      { type: 'place', prompt: 'Put the locker in the corner.', checks: [{ rel: 'inCorner', a: 'locker' }] },
      { type: 'place', prompt: 'Put the textbooks on the school desk.', checks: [{ rel: 'onTop', a: 'textbooks', b: 'school-desk' }] },
      { type: 'place', prompt: 'Put the school bag next to the school desk.', checks: [{ rel: 'nextTo', a: 'school-bag', b: 'school-desk' }] },
    ],
    A2: [
      { type: 'place', prompt: 'Put the teacher’s desk against the wall and the globe on it.',
        checks: [{ rel: 'againstWall', a: 'teachers-desk' }, { rel: 'onTop', a: 'globe', b: 'teachers-desk' }] },
      { type: 'place', prompt: 'Hang the whiteboard above the teacher’s desk.', checks: [{ rel: 'above', a: 'whiteboard', b: 'teachers-desk' }] },
      { type: 'place', prompt: 'Put the pencil case on the school desk and the bag next to it.',
        checks: [{ rel: 'onTop', a: 'pencil-case', b: 'school-desk' }, { rel: 'nextTo', a: 'school-bag', b: 'school-desk' }] },
      { type: 'place', prompt: 'Put the locker in the corner.', checks: [{ rel: 'inCorner', a: 'locker' }] },
    ],
    B1: [
      { type: 'place', prompt: 'Set up the front of the class: teacher’s desk against a wall with the whiteboard above it.',
        checks: [{ rel: 'againstWall', a: 'teachers-desk' }, { rel: 'above', a: 'whiteboard', b: 'teachers-desk' }] },
      { type: 'place', prompt: 'Students need light to read: put the school desk near the window.', checks: [{ rel: 'nearWindow', a: 'school-desk' }] },
      { type: 'place', prompt: 'Get ready for science: the microscope on the school desk.', checks: [{ rel: 'onTop', a: 'microscope', b: 'school-desk' }] },
      { type: 'place', prompt: 'Keep the noisy locker doors away from the lesson: locker far from the school desk.', checks: [{ rel: 'farFrom', a: 'locker', b: 'school-desk' }] },
      { type: 'write', prompt: 'Describe your new classroom in 3–4 sentences. Say where things are.', minWords: 25,
        require: [schoolWords(3), prepositions(2)], sample: 'The whiteboard is above the desk...' },
    ],
    B2: [
      { type: 'place', prompt: 'Create a clear teaching area: teacher’s desk against a wall, whiteboard above it and the projector on the desk.',
        checks: [{ rel: 'againstWall', a: 'teachers-desk' }, { rel: 'above', a: 'whiteboard', b: 'teachers-desk' }, { rel: 'onTop', a: 'projector', b: 'teachers-desk' }] },
      { type: 'place', prompt: 'Make the most of daylight: the school desk by the window, well away from the locker.',
        checks: [{ rel: 'nearWindow', a: 'school-desk' }, { rel: 'farFrom', a: 'locker', b: 'school-desk' }] },
      { type: 'place', prompt: 'Add a geography corner: the world map above the school desk.', checks: [{ rel: 'above', a: 'world-map', b: 'school-desk' }] },
      { type: 'write', prompt: 'Evaluate your new layout. What helps students learn, what is still not ideal, and why?', minWords: 45,
        require: [schoolWords(3), prepositions(2), advanced(1)], sample: 'Although the classroom is small, the desk now...' },
    ],
  },
};

// ── STAGE 6: FINAL MISSION ─────────────────────────────────────────────────
const final: MissionDefinition = {
  id: 'final', title: 'Open Day', icon: '🏆', xp: 150,
  intro: {
    A1: 'It’s Open Day! Parents are visiting the classroom. Make it ready.',
    A2: 'Families are visiting the school today. Get the classroom ready and show them around.',
    B1: 'It’s the school Open Day and new families are coming to see your classroom. Make a great impression.',
    B2: 'You’re a student ambassador at the school Open Day. Prepare the classroom and present it to prospective families.',
  },
  steps: {
    A1: [
      { type: 'find', prompt: 'A mum asks: “Where does the teacher write?” Click it.', targets: ['whiteboard'] },
      { type: 'sort', prompt: 'Get ready: put the books on the desk and the bags in the locker.', props: [
        thing('f1', 'the books', 'book', '#3c6fd1', ['school-desk', 'teachers-desk', 'textbooks'], 'Put the books on the desk.'),
        thing('f2', 'the bags', 'box', '#e04848', ['locker'], 'Put the bags in the locker.'),
      ] },
      { type: 'choice', prompt: 'A dad asks: “What is your favourite lesson?” What do you say?', options: [
        { text: 'I like geography. We use the globe!', correct: true, feedback: 'Great answer!' },
        { text: 'I am a lesson.', correct: false, feedback: 'You are a student!' },
        { text: 'Yes, please.', correct: false, feedback: 'That doesn’t answer the question.' },
      ] },
      { type: 'write', prompt: 'Write 2 sentences about your classroom.', minWords: 8, require: [schoolWords(2)], sample: 'The globe is…' },
    ],
    A2: [
      { type: 'find', prompt: 'Parents want to see the school day. What shows all the lessons? Click it.', targets: ['timetable'] },
      { type: 'sort', prompt: 'Make the classroom nice.', props: [
        thing('f1', 'a “Welcome” poster', 'book', '#fff3a3', ['whiteboard', 'world-map'], 'Put the welcome poster by the board.'),
        thing('f2', 'the best drawings', 'book', '#f7b2d0', ['teachers-desk', 'school-desk'], 'Put the drawings on a desk.'),
        thing('f3', 'old papers', 'book', '#e8e2d4', ['locker', 'teachers-desk'], 'Put the old papers away.'),
      ] },
      { type: 'place', prompt: 'Visitors will look at the front: put the teacher’s desk against the wall.', checks: [{ rel: 'againstWall', a: 'teachers-desk' }] },
      { type: 'write', prompt: 'Write a short text for parents about your classroom. Use at least 3 school words and 2 prepositions.', minWords: 15,
        require: [schoolWords(3), prepositions(2)], sample: 'Welcome to our classroom! The whiteboard is…' },
    ],
    B1: [
      { type: 'find', prompt: 'A girl who loves science asks what you use in experiments. Click it.', targets: ['microscope'] },
      { type: 'sort', prompt: 'Make the classroom welcoming.', props: [
        thing('f1', 'a slideshow of school trips', 'phone', '#9fd8ff', ['projector'], 'Show families what students do outside school.'),
        thing('f2', 'projects about other countries', 'book', '#6fae6a', ['world-map', 'globe', 'school-desk'], 'Display them with the geography things.'),
        thing('f3', 'a plate of biscuits', 'cup', '#d9a77a', ['teachers-desk'], 'Offer visitors something at the front.'),
      ] },
      { type: 'sort', prompt: 'Clear away anything that looks messy.', props: [
        thing('f4', 'muddy football boots', 'shoes', '#2f3440', ['locker'], 'Visitors don’t want to see them.'),
        thing('f5', 'loose pens', 'phone', '#ffd54f', ['pencil-case'], 'Someone could slip on them.'),
        thing('f6', 'yesterday’s homework', 'book', '#ffffff', ['teachers-desk'], 'It belongs with the teacher, not on the floor.'),
      ] },
      { type: 'place', prompt: 'Make the front look organised: whiteboard above the teacher’s desk and the projector on it.',
        checks: [{ rel: 'above', a: 'whiteboard', b: 'teachers-desk' }, { rel: 'onTop', a: 'projector', b: 'teachers-desk' }] },
      { type: 'write', prompt: 'Write a short welcome speech (at least 35 words) for the visiting families.', minWords: 35,
        require: [schoolWords(3), connectors(1)], sample: 'Welcome to our classroom! We love it here because...' },
    ],
    B2: [
      { type: 'find', prompt: 'A parent asks how lessons use technology. Show them the device that displays the teacher’s slides.', targets: ['projector'] },
      { type: 'sort', prompt: 'Set up the classroom to a high standard.', props: [
        thing('f1', 'a display of science results', 'book', '#c9b6e4', ['microscope', 'school-desk'], 'Put it beside the equipment the class used.'),
        thing('f2', 'a guest book', 'book', '#fff3a3', ['teachers-desk'], 'Families can leave comments on their way out.'),
        thing('f3', 'information leaflets', 'book', '#5aa9e6', ['teachers-desk', 'school-desk'], 'Make them easy to pick up.'),
      ] },
      { type: 'sort', prompt: 'Make sure nothing unsafe or untidy is left out.', props: [
        thing('f4', 'a heavy pile of textbooks', 'book', '#3c6fd1', ['textbooks', 'school-desk'], 'It mustn’t block the walkway.'),
        thing('f5', 'abandoned PE kit', 'box', '#3f7d4e', ['locker'], 'It should be stored, not on show.'),
        thing('f6', 'scissors and a craft knife', 'phone', '#8f99a3', ['pencil-case', 'teachers-desk'], 'Sharp things must be out of reach of little visitors.'),
      ] },
      { type: 'choice', prompt: 'A parent says: “Classes here look too big.” What is the most professional response?', options: [
        { text: 'Acknowledge the concern, explain how teachers support every student and offer to introduce the head teacher.', correct: true, feedback: 'Respectful, informed and helpful.' },
        { text: 'Tell them to choose another school.', correct: false, feedback: 'That isn’t how an ambassador behaves.' },
        { text: 'Ignore the question.', correct: false, feedback: 'The parent deserves an answer.' },
      ] },
      { type: 'write', prompt: 'Write a short article (at least 55 words) for the school website about the Open Day and what makes your classroom special.', minWords: 55,
        require: [schoolWords(3), prepositions(2), advanced(1)], sample: 'Although it rained on Saturday, our Open Day...' },
    ],
  },
};

// ── THE CHAPTER ────────────────────────────────────────────────────────────
export const schoolChapter: ChapterDefinition = {
  roomId: 'school',
  title: 'My School',
  explore,
  challenges: [unpack, lateForClass, budgetSchool],
  makeover,
  final,

  // Mini-game: Hidden Objects
  hiddenObjects: [
    { target: 'whiteboard', prompt: { A1: 'Find the board.', A2: 'Find where the teacher writes.', B1: 'Find what you clean with a sponge after maths.', B2: 'Find the dry-wipe board.' } },
    { target: 'teachers-desk', prompt: { A1: 'Find the teacher’s table.', A2: 'Find where the teacher sits.', B1: 'Find where you hand in homework.', B2: 'Find the teacher’s workstation.' } },
    { target: 'school-desk', prompt: { A1: 'Find a student’s desk.', A2: 'Find where students sit.', B1: 'Find where you do your classwork.', B2: 'Find a pupil’s workspace.' } },
    { target: 'locker', prompt: { A1: 'Find the tall cupboard.', A2: 'Find where you keep your PE kit.', B1: 'Find what you open with a key or a code.', B2: 'Find the personal storage unit.' } },
    { target: 'globe', prompt: { A1: 'Find the round Earth.', A2: 'Find the globe.', B1: 'Find what spins to show every country.', B2: 'Find the spherical map.' } },
    { target: 'world-map', prompt: { A1: 'Find the map.', A2: 'Find the map of all countries.', B1: 'Find what you use to find Australia on the wall.', B2: 'Find the wall chart of the world.' } },
    { target: 'timetable', prompt: { A1: 'Find the list of lessons.', A2: 'Find the timetable.', B1: 'Find what tells you when PE is.', B2: 'Find the weekly schedule.' } },
    { target: 'pencil-case', prompt: { A1: 'Find the pens.', A2: 'Find the pencil case.', B1: 'Find where your rubber and ruler live.', B2: 'Find the stationery holder.' } },
    { target: 'school-bag', prompt: { A1: 'Find a bag.', A2: 'Find the red school bag.', B1: 'Find what you carry books in.', B2: 'Find the satchel.' } },
    { target: 'projector', prompt: { A1: 'Find the machine for pictures.', A2: 'Find the projector.', B1: 'Find what shows slides on the wall.', B2: 'Find the beamer.' } },
    { target: 'textbooks', prompt: { A1: 'Find the books.', A2: 'Find the textbooks.', B1: 'Find what you study from.', B2: 'Find the course books.' } },
    { target: 'microscope', prompt: { A1: 'Find the science machine.', A2: 'Find the microscope.', B1: 'Find what makes small things look big.', B2: 'Find the optical instrument.' } },
  ],

  // Mini-game: Interior Designer (3 random tasks)
  designerTasks: [
    { checks: [{ rel: 'againstWall', a: 'teachers-desk' }], prompt: { A1: 'Put the teacher’s desk against the wall.', B1: 'Push the teacher’s desk to the wall.', B2: 'Position the teacher’s desk flush against a wall.' } },
    { checks: [{ rel: 'above', a: 'whiteboard', b: 'teachers-desk' }], prompt: { A1: 'Hang the whiteboard above the teacher’s desk.', B1: 'Put the board where the teacher can reach it.', B2: 'Mount the whiteboard directly above the teacher’s desk.' } },
    { checks: [{ rel: 'onTop', a: 'projector', b: 'teachers-desk' }], prompt: { A1: 'Put the projector on the teacher’s desk.', B1: 'Get the slides ready on the teacher’s desk.', B2: 'Set the projector up on the teacher’s desk.' } },
    { checks: [{ rel: 'inCorner', a: 'locker' }], prompt: { A1: 'Put the locker in the corner.', B1: 'Move the locker out of the way, into a corner.', B2: 'Tuck the locker into a corner.' } },
    { checks: [{ rel: 'nearWindow', a: 'school-desk' }], prompt: { A1: 'Put the school desk near the window.', B1: 'Give the student some daylight.', B2: 'Position the desk to make the most of natural light.' } },
    { checks: [{ rel: 'onTop', a: 'textbooks', b: 'school-desk' }], prompt: { A1: 'Put the textbooks on the school desk.', B1: 'Get the books ready for the lesson.', B2: 'Leave the course books on the pupil’s desk.' } },
    { checks: [{ rel: 'nextTo', a: 'school-bag', b: 'school-desk' }], prompt: { A1: 'Put the school bag next to the school desk.', B1: 'Leave your bag beside your desk.', B2: 'Place the satchel beside the desk.' } },
    { checks: [{ rel: 'onTop', a: 'globe', b: 'teachers-desk' }], prompt: { A1: 'Put the globe on the teacher’s desk.', B1: 'Get ready for geography at the front.', B2: 'Place the globe on the teacher’s desk.' } },
    { checks: [{ rel: 'onTop', a: 'microscope', b: 'school-desk' }], prompt: { A1: 'Put the microscope on the school desk.', B1: 'Get ready for the science experiment.', B2: 'Set the microscope up on the pupil’s desk.' } },
    { checks: [{ rel: 'farFrom', a: 'locker', b: 'school-desk' }], prompt: { A1: 'Put the locker far from the school desk.', B1: 'Keep the noisy locker away from the student.', B2: 'Keep the locker at a distance from the desk.' } },
  ],

  // Mini-game: Sort It Out
  sortGame: {
    bins: [
      { id: 'classroom', label: 'In the classroom', icon: '🏫' },
      { id: 'subjects', label: 'Subjects', icon: '📚' },
      { id: 'people', label: 'People & places', icon: '👩‍🏫' },
      { id: 'actions', label: 'Things you do', icon: '✏️' },
    ],
    items: [
      { word: 'whiteboard', bin: 'classroom', level: 'A1' }, { word: 'school desk', bin: 'classroom', level: 'A1' },
      { word: 'pencil case', bin: 'classroom', level: 'A1' }, { word: 'ruler', bin: 'classroom', level: 'A1' },
      { word: 'locker', bin: 'classroom', level: 'A2' }, { word: 'timetable', bin: 'classroom', level: 'A2' },
      { word: 'projector', bin: 'classroom', level: 'A2' }, { word: 'microscope', bin: 'classroom', level: 'A2' },
      { word: 'maths', bin: 'subjects', level: 'A1' }, { word: 'English', bin: 'subjects', level: 'A1' },
      { word: 'art', bin: 'subjects', level: 'A1' }, { word: 'geography', bin: 'subjects', level: 'A2' },
      { word: 'history', bin: 'subjects', level: 'A2' }, { word: 'science', bin: 'subjects', level: 'A2' },
      { word: 'PE', bin: 'subjects', level: 'A2' }, { word: 'curriculum', bin: 'subjects', level: 'B2' },
      { word: 'teacher', bin: 'people', level: 'A1' }, { word: 'student', bin: 'people', level: 'A1' },
      { word: 'classmate', bin: 'people', level: 'A2' }, { word: 'playground', bin: 'people', level: 'A2' },
      { word: 'library', bin: 'people', level: 'A2' }, { word: 'canteen', bin: 'people', level: 'A2' },
      { word: 'head teacher', bin: 'people', level: 'B1' }, { word: 'science lab', bin: 'people', level: 'B1' },
      { word: 'learn', bin: 'actions', level: 'A1' }, { word: 'write', bin: 'actions', level: 'A1' },
      { word: 'listen', bin: 'actions', level: 'A1' }, { word: 'put your hand up', bin: 'actions', level: 'A2' },
      { word: 'be late', bin: 'actions', level: 'A2' }, { word: 'revise', bin: 'actions', level: 'B1' },
      { word: 'hand in', bin: 'actions', level: 'B1' }, { word: 'concentrate', bin: 'actions', level: 'B2' },
    ],
  },

  // Mini-game: What Would You Do?
  scenarios: [
    { level: 'A1', situation: 'You want to answer the teacher’s question. What do you do?', options: [
      { text: 'I put my hand up.', best: true, feedback: 'Yes! That’s polite.' },
      { text: 'I shout the answer.', best: false, feedback: 'Everybody wants to speak!' },
      { text: 'I stand on my desk.', best: false, feedback: 'That’s dangerous!' },
    ] },
    { level: 'A1', situation: 'You don’t have a pen. What do you do?', options: [
      { text: 'I ask: “Can I borrow a pen, please?”', best: true, feedback: 'Perfect!' },
      { text: 'I take my friend’s pen without asking.', best: false, feedback: 'Always ask first.' },
      { text: 'I go home.', best: false, feedback: 'That’s a bit much!' },
    ] },
    { level: 'A1', situation: 'The lesson starts at nine. It’s five to nine. What do you do?', options: [
      { text: 'I go to the classroom and sit at my desk.', best: true, feedback: 'You’re on time!' },
      { text: 'I play football in the playground.', best: false, feedback: 'You’ll be late.' },
      { text: 'I sleep in the library.', best: false, feedback: 'The teacher is waiting!' },
    ] },
    { level: 'A2', situation: 'You forgot your homework at home. What do you do?', options: [
      { text: 'Tell the teacher the truth and bring it tomorrow.', best: true, feedback: 'Honest and responsible.' },
      { text: 'Say the dog ate it.', best: false, feedback: 'Teachers have heard that one before!' },
      { text: 'Copy a friend’s homework quickly.', best: false, feedback: 'That’s cheating.' },
    ] },
    { level: 'A2', situation: 'A new student sits alone at lunch. What do you do?', options: [
      { text: 'Say hello and invite them to sit with you.', best: true, feedback: 'Kind — they’ll remember it.' },
      { text: 'Laugh at them.', best: false, feedback: 'That’s unkind.' },
      { text: 'Ignore them.', best: false, feedback: 'A small hello can help a lot.' },
    ] },
    { level: 'A2', situation: 'You don’t understand the maths exercise. What do you do?', options: [
      { text: 'Put your hand up and ask the teacher to explain again.', best: true, feedback: 'That’s what teachers are for.' },
      { text: 'Write random numbers.', best: false, feedback: 'You won’t learn anything.' },
      { text: 'Cry under the desk.', best: false, feedback: 'Asking is easier!' },
    ] },
    { level: 'B1', situation: 'You have a big test on Friday and lots of football training. How would you plan your week?', options: [
      { text: 'Make a revision timetable with short sessions every day.', best: true, feedback: 'Little and often works best.' },
      { text: 'Revise everything on Thursday night.', best: false, feedback: 'Too much in one go.' },
      { text: 'Skip training all week.', best: false, feedback: 'You can do both with a plan.' },
    ], reasons: [
      { text: 'Because your brain remembers more when you revise regularly.', correct: true },
      { text: 'Because timetables look nice.', correct: false },
      { text: 'Because football is boring.', correct: false },
    ] },
    { level: 'B1', situation: 'You see someone copying in a test. What would you do?', options: [
      { text: 'Keep your eyes on your own paper and talk to the teacher later if it continues.', best: true, feedback: 'Fair and sensible.' },
      { text: 'Shout “Cheat!” in the middle of the test.', best: false, feedback: 'That disturbs everyone.' },
      { text: 'Let them copy from you too.', best: false, feedback: 'Then you’re cheating as well.' },
    ], reasons: [
      { text: 'Because it is fair to everyone and doesn’t disturb the test.', correct: true },
      { text: 'Because teachers never notice.', correct: false },
    ] },
    { level: 'B2', situation: 'Your school wants to ban mobile phones completely. The student council asks for your opinion.', options: [
      { text: 'Suggest phones stay in lockers during lessons but can be used at break.', best: true, feedback: 'A balanced compromise.' },
      { text: 'Say phones should be allowed everywhere, all the time.', best: false, feedback: 'That ignores the problem.' },
      { text: 'Refuse to give an opinion.', best: false, feedback: 'Your voice matters on the council.' },
    ], write: { prompt: 'Justify your suggestion, weighing up the benefits and drawbacks.', minWords: 25, require: [connectors(1), advanced(1)] } },
    { level: 'B2', situation: 'Your group project is due tomorrow, but one member hasn’t done their part. What would you do?', options: [
      { text: 'Contact them now, agree a plan and tell the teacher honestly if it’s still not done.', best: true, feedback: 'Responsible and fair.' },
      { text: 'Do it all yourself and say nothing.', best: false, feedback: 'You’ll be exhausted and it isn’t fair.' },
      { text: 'Hand in nothing.', best: false, feedback: 'The whole group loses.' },
    ], write: { prompt: 'Explain your plan, considering fairness to everyone in the group.', minWords: 25, require: [connectors(1), advanced(1)] } },
  ],

  // Practice Mode: Sentence Builder
  sentences: [
    { text: 'The teacher writes on the whiteboard.', level: 'A1' },
    { text: 'My pens are in my pencil case.', level: 'A1' },
    { text: 'Open your books, please.', level: 'A1' },
    { text: 'I sit at my school desk.', level: 'A1' },
    { text: 'Find Ukraine on the globe.', level: 'A1' },
    { text: 'Don’t forget your school bag.', level: 'A1' },
    { text: 'We have English on Monday morning.', level: 'A2' },
    { text: 'I keep my sports kit in my locker.', level: 'A2' },
    { text: 'The world map is next to the board.', level: 'A2' },
    { text: 'Put your homework on the teacher’s desk.', level: 'A2' },
    { text: 'Can I borrow a ruler, please?', level: 'A2' },
    { text: 'We looked at a leaf under the microscope.', level: 'A2' },
    { text: 'I have to revise for my exam.', level: 'B1' },
    { text: 'Please hand in your work by Friday.', level: 'B1' },
    { text: 'The teacher turned on the projector for the presentation.', level: 'B1' },
    { text: 'If you are late, you miss the start.', level: 'B1' },
    { text: 'Although the test was difficult, I passed it.', level: 'B2' },
    { text: 'Science is compulsory until the age of sixteen.', level: 'B2' },
    { text: 'It is hard to concentrate in a noisy classroom.', level: 'B2' },
  ],

  // Practice Mode: Preposition Practice
  prepositions: [
    { sentence: 'The pens are ___ the pencil case.', answer: 'in', options: ['in', 'on', 'under'], level: 'A1' },
    { sentence: 'The globe is ___ the teacher’s desk.', answer: 'on', options: ['on', 'in', 'at'], level: 'A1' },
    { sentence: 'My bag is ___ my desk.', answer: 'under', options: ['under', 'in', 'at'], level: 'A1' },
    { sentence: 'The map is ___ the whiteboard.', answer: 'next to', options: ['next to', 'in', 'under'], level: 'A1' },
    { sentence: 'We have maths ___ Monday.', answer: 'on', options: ['on', 'in', 'at'], level: 'A2' },
    { sentence: 'The lesson starts ___ nine o’clock.', answer: 'at', options: ['at', 'on', 'in'], level: 'A2' },
    { sentence: 'I sit ___ Anna and Tom.', answer: 'between', options: ['between', 'among', 'opposite'], level: 'A2' },
    { sentence: 'The whiteboard is ___ the front of the classroom.', answer: 'at', options: ['at', 'on', 'over'], level: 'A2' },
    { sentence: 'Please hand ___ your homework.', answer: 'in', options: ['in', 'on', 'at'], level: 'B1' },
    { sentence: 'She is very good ___ maths.', answer: 'at', options: ['at', 'in', 'on'], level: 'B1' },
    { sentence: 'Don’t be late ___ school.', answer: 'for', options: ['for', 'to', 'at'], level: 'B1' },
    { sentence: 'We are revising ___ the exam.', answer: 'for', options: ['for', 'to', 'on'], level: 'B2' },
    { sentence: 'The class is divided ___ three groups.', answer: 'into', options: ['into', 'in', 'on'], level: 'B2' },
  ],
};
