import type { ActivityDefinition } from '../../types/game';

// Kitchen activities. Same rules as activities/bedroom.ts:
//   stage 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
//   stage 'practice' -> played when the student clicks the object in the room
// Every id must be unique.

export const kitchenActivities: ActivityDefinition[] = [
  // ── Table ────────────────────────────────────────
  { id: 'table-vocab', wordId: 'table', stage: 'lesson', type: 'vocabulary' },
  { id: 'table-spell', wordId: 'table', stage: 'lesson', type: 'spelling', hide: [1, 4] },
  { id: 'table-sentence', wordId: 'table', stage: 'lesson', type: 'sentence',
    sentence: 'We eat dinner at the kitchen ___.', answer: 'table', options: ['table', 'sink', 'bin'] },
  { id: 'table-mc', wordId: 'table', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you put the plates for dinner?', answer: 'on the table', options: ['on the table', 'in the bin', 'on the calendar'] },
  { id: 'table-prep', wordId: 'table', stage: 'practice', type: 'sentence',
    sentence: 'The fruit bowl is ___ the table.', answer: 'on', options: ['on', 'in', 'under'] },

  // ── Fridge ───────────────────────────────────────
  { id: 'fridge-vocab', wordId: 'fridge', stage: 'lesson', type: 'vocabulary' },
  { id: 'fridge-spell', wordId: 'fridge', stage: 'lesson', type: 'spelling', hide: [2, 3] },
  { id: 'fridge-sentence', wordId: 'fridge', stage: 'lesson', type: 'sentence',
    sentence: 'Put the milk in the ___ so it stays cold.', answer: 'fridge', options: ['fridge', 'toaster', 'kettle'] },
  { id: 'fridge-mc', wordId: 'fridge', stage: 'practice', type: 'multipleChoice',
    question: 'What keeps food cold?', answer: 'a fridge', options: ['a fridge', 'a cooker', 'a toaster'] },
  { id: 'fridge-prep', wordId: 'fridge', stage: 'practice', type: 'sentence',
    sentence: 'The cheese is ___ the fridge.', answer: 'in', options: ['in', 'on', 'at'] },

  // ── Cooker ───────────────────────────────────────
  { id: 'cooker-vocab', wordId: 'cooker', stage: 'lesson', type: 'vocabulary' },
  { id: 'cooker-spell', wordId: 'cooker', stage: 'lesson', type: 'spelling' },
  { id: 'cooker-sentence', wordId: 'cooker', stage: 'lesson', type: 'sentence',
    sentence: 'Dad is making soup on the ___.', answer: 'cooker', options: ['cooker', 'fridge', 'calendar'] },
  { id: 'cooker-mc', wordId: 'cooker', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you cook pasta?', answer: 'on the cooker', options: ['on the cooker', 'in the bin', 'in the dishwasher'] },
  { id: 'cooker-prep', wordId: 'cooker', stage: 'practice', type: 'sentence',
    sentence: 'The pan is ___ the cooker.', answer: 'on', options: ['on', 'under', 'between'] },

  // ── Sink ─────────────────────────────────────────
  { id: 'sink-vocab', wordId: 'sink', stage: 'lesson', type: 'vocabulary' },
  { id: 'sink-spell', wordId: 'sink', stage: 'lesson', type: 'spelling', hide: [1] },
  { id: 'sink-sentence', wordId: 'sink', stage: 'lesson', type: 'sentence',
    sentence: 'I wash the dirty cups in the ___.', answer: 'sink', options: ['sink', 'toaster', 'stool'] },
  { id: 'sink-mc', wordId: 'sink', stage: 'practice', type: 'multipleChoice',
    question: 'Where does the water come out?', answer: 'from the tap over the sink', options: ['from the tap over the sink', 'from the toaster', 'from the calendar'] },
  { id: 'sink-prep', wordId: 'sink', stage: 'practice', type: 'sentence',
    sentence: 'The sink is ___ the window, so I can look outside.', answer: 'under', options: ['under', 'on', 'inside'] },

  // ── Stool ────────────────────────────────────────
  { id: 'stool-vocab', wordId: 'stool', stage: 'lesson', type: 'vocabulary' },
  { id: 'stool-spell', wordId: 'stool', stage: 'lesson', type: 'spelling', hide: [2, 3] },
  { id: 'stool-sentence', wordId: 'stool', stage: 'lesson', type: 'sentence',
    sentence: 'A ___ is a seat with no back.', answer: 'stool', options: ['stool', 'sink', 'kettle'] },
  { id: 'stool-mc', wordId: 'stool', stage: 'practice', type: 'multipleChoice',
    question: 'What can you sit on in the kitchen?', answer: 'a stool', options: ['a stool', 'a microwave', 'a bin'] },
  { id: 'stool-prep', wordId: 'stool', stage: 'practice', type: 'sentence',
    sentence: 'The stool is ___ the table.', answer: 'next to', options: ['next to', 'inside', 'on'] },

  // ── Kettle ───────────────────────────────────────
  { id: 'kettle-vocab', wordId: 'kettle', stage: 'lesson', type: 'vocabulary' },
  { id: 'kettle-spell', wordId: 'kettle', stage: 'lesson', type: 'spelling', hide: [1, 3] },
  { id: 'kettle-sentence', wordId: 'kettle', stage: 'lesson', type: 'sentence',
    sentence: 'I want a cup of tea. I switch on the ___.', answer: 'kettle', options: ['kettle', 'dishwasher', 'bin'] },
  { id: 'kettle-mc', wordId: 'kettle', stage: 'practice', type: 'multipleChoice',
    question: 'What do you use to boil water?', answer: 'a kettle', options: ['a kettle', 'a fridge', 'a calendar'] },
  { id: 'kettle-prep', wordId: 'kettle', stage: 'practice', type: 'sentence',
    sentence: 'The kettle is ___ the worktop, next to the toaster.', answer: 'on', options: ['on', 'in', 'under'] },

  // ── Cupboard ─────────────────────────────────────
  { id: 'cupboard-vocab', wordId: 'cupboard', stage: 'lesson', type: 'vocabulary' },
  { id: 'cupboard-spell', wordId: 'cupboard', stage: 'lesson', type: 'spelling', hide: [1, 3, 5] },
  { id: 'cupboard-sentence', wordId: 'cupboard', stage: 'lesson', type: 'sentence',
    sentence: 'The plates and bowls are in the ___.', answer: 'cupboard', options: ['cupboard', 'toaster', 'kettle'] },
  { id: 'cupboard-mc', wordId: 'cupboard', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you keep clean cups?', answer: 'in the cupboard', options: ['in the cupboard', 'in the bin', 'in the oven'] },
  { id: 'cupboard-prep', wordId: 'cupboard', stage: 'practice', type: 'sentence',
    sentence: 'The cupboard is on the wall ___ the sink.', answer: 'above', options: ['above', 'under', 'in'] },

  // ── Microwave ────────────────────────────────────
  { id: 'microwave-vocab', wordId: 'microwave', stage: 'lesson', type: 'vocabulary' },
  { id: 'microwave-spell', wordId: 'microwave', stage: 'lesson', type: 'spelling', hide: [1, 4, 7] },
  { id: 'microwave-sentence', wordId: 'microwave', stage: 'lesson', type: 'sentence',
    sentence: 'My soup is cold. I heat it up in the ___.', answer: 'microwave', options: ['microwave', 'fridge', 'sink'] },
  { id: 'microwave-mc', wordId: 'microwave', stage: 'practice', type: 'multipleChoice',
    question: 'What heats food in one or two minutes?', answer: 'a microwave', options: ['a microwave', 'a stool', 'a calendar'] },
  { id: 'microwave-prep', wordId: 'microwave', stage: 'practice', type: 'sentence',
    sentence: 'Don’t put metal forks ___ the microwave!', answer: 'in', options: ['in', 'at', 'off'] },

  // ── Toaster ──────────────────────────────────────
  { id: 'toaster-vocab', wordId: 'toaster', stage: 'lesson', type: 'vocabulary' },
  { id: 'toaster-spell', wordId: 'toaster', stage: 'lesson', type: 'spelling', hide: [1, 2, 5] },
  { id: 'toaster-sentence', wordId: 'toaster', stage: 'lesson', type: 'sentence',
    sentence: 'I make toast for breakfast in the ___.', answer: 'toaster', options: ['toaster', 'dishwasher', 'cupboard'] },
  { id: 'toaster-mc', wordId: 'toaster', stage: 'practice', type: 'multipleChoice',
    question: 'What do you put in a toaster?', answer: 'bread', options: ['bread', 'soup', 'milk'] },
  { id: 'toaster-prep', wordId: 'toaster', stage: 'practice', type: 'sentence',
    sentence: 'The toaster is ___ the kettle and the microwave.', answer: 'between', options: ['between', 'among', 'inside'] },

  // ── Calendar ─────────────────────────────────────
  { id: 'calendar-vocab', wordId: 'calendar', stage: 'lesson', type: 'vocabulary' },
  { id: 'calendar-spell', wordId: 'calendar', stage: 'lesson', type: 'spelling', hide: [1, 4, 6] },
  { id: 'calendar-sentence', wordId: 'calendar', stage: 'lesson', type: 'sentence',
    sentence: 'Look at the ___. What day is it today?', answer: 'calendar', options: ['calendar', 'cooker', 'bin'] },
  { id: 'calendar-mc', wordId: 'calendar', stage: 'practice', type: 'multipleChoice',
    question: 'Where can you write Grandma’s birthday?', answer: 'on the calendar', options: ['on the calendar', 'in the fridge', 'in the toaster'] },
  { id: 'calendar-prep', wordId: 'calendar', stage: 'practice', type: 'sentence',
    sentence: 'The calendar is ___ the wall.', answer: 'on', options: ['on', 'in', 'under'] },

  // ── Bin ──────────────────────────────────────────
  { id: 'bin-vocab', wordId: 'bin', stage: 'lesson', type: 'vocabulary' },
  { id: 'bin-spell', wordId: 'bin', stage: 'lesson', type: 'spelling', hide: [1] },
  { id: 'bin-sentence', wordId: 'bin', stage: 'lesson', type: 'sentence',
    sentence: 'Put the empty box in the ___.', answer: 'bin', options: ['bin', 'fridge', 'kettle'] },
  { id: 'bin-mc', wordId: 'bin', stage: 'practice', type: 'multipleChoice',
    question: 'Where does rubbish go?', answer: 'in the bin', options: ['in the bin', 'in the cupboard', 'on the table'] },
  { id: 'bin-prep', wordId: 'bin', stage: 'practice', type: 'sentence',
    sentence: 'The bin is ___ the sink, on the floor.', answer: 'under', options: ['under', 'above', 'on'] },

  // ── Dishwasher ───────────────────────────────────
  { id: 'dishwasher-vocab', wordId: 'dishwasher', stage: 'lesson', type: 'vocabulary' },
  { id: 'dishwasher-spell', wordId: 'dishwasher', stage: 'lesson', type: 'spelling', hide: [1, 5, 8] },
  { id: 'dishwasher-sentence', wordId: 'dishwasher', stage: 'lesson', type: 'sentence',
    sentence: 'After dinner, we put the plates in the ___.', answer: 'dishwasher', options: ['dishwasher', 'microwave', 'calendar'] },
  { id: 'dishwasher-mc', wordId: 'dishwasher', stage: 'practice', type: 'multipleChoice',
    question: 'What washes the dishes for you?', answer: 'a dishwasher', options: ['a dishwasher', 'a toaster', 'a stool'] },
  { id: 'dishwasher-prep', wordId: 'dishwasher', stage: 'practice', type: 'sentence',
    sentence: 'The dishwasher is ___ the sink.', answer: 'next to', options: ['next to', 'on', 'inside'] },
];
