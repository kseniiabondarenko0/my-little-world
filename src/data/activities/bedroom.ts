import type { ActivityDefinition } from '../../types/game';

// Bedroom activities.
//
// stage: 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
// stage: 'practice' -> played when the student clicks the object in the room
//                      (mixed with lesson activities, in random order)
//
// Types:
//   vocabulary      "What is this?" with the 3D object
//   spelling        missing letters (hide: [1] hides the 2nd letter; default hides vowels)
//   sentence        gap ___ in a sentence; options must include the answer
//   multipleChoice  any question; options must include the answer
//
// Every id must be unique.

export const bedroomActivities: ActivityDefinition[] = [
  // ── Bed ──────────────────────────────────────────
  { id: 'bed-vocab', wordId: 'bed', stage: 'lesson', type: 'vocabulary' },
  { id: 'bed-spell', wordId: 'bed', stage: 'lesson', type: 'spelling', hide: [1] },
  { id: 'bed-sentence', wordId: 'bed', stage: 'lesson', type: 'sentence',
    sentence: 'I sleep in my ___ every night.', answer: 'bed', options: ['bed', 'desk', 'lamp'] },
  { id: 'bed-mc', wordId: 'bed', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you sleep?', answer: 'in a bed', options: ['in a bed', 'in a mirror', 'in a lamp'] },
  { id: 'bed-prep', wordId: 'bed', stage: 'practice', type: 'sentence',
    sentence: 'The pillow is ___ the bed.', answer: 'on', options: ['on', 'under', 'at'] },

  // ── Lamp ─────────────────────────────────────────
  { id: 'lamp-vocab', wordId: 'lamp', stage: 'lesson', type: 'vocabulary' },
  { id: 'lamp-spell', wordId: 'lamp', stage: 'lesson', type: 'spelling' },
  { id: 'lamp-sentence', wordId: 'lamp', stage: 'lesson', type: 'sentence',
    sentence: 'It’s dark. Please turn on the ___.', answer: 'lamp', options: ['lamp', 'chair', 'carpet'] },
  { id: 'lamp-mc', wordId: 'lamp', stage: 'practice', type: 'multipleChoice',
    question: 'What gives light?', answer: 'a lamp', options: ['a lamp', 'a wardrobe', 'a carpet'] },
  { id: 'lamp-prep', wordId: 'lamp', stage: 'practice', type: 'sentence',
    sentence: 'The lamp is ___ the bedside table.', answer: 'on', options: ['on', 'in', 'under'] },

  // ── Bedside table ───────────────────────────────────
  { id: 'nightstand-vocab', wordId: 'nightstand', stage: 'lesson', type: 'vocabulary' },
  { id: 'nightstand-spell', wordId: 'nightstand', stage: 'lesson', type: 'spelling', hide: [2, 4, 9, 11] },
  { id: 'nightstand-sentence', wordId: 'nightstand', stage: 'lesson', type: 'sentence',
    sentence: 'My alarm clock is on the ___ next to my bed.', answer: 'bedside table',
    options: ['bedside table', 'wardrobe', 'carpet'] },
  { id: 'nightstand-mc', wordId: 'nightstand', stage: 'practice', type: 'multipleChoice',
    question: 'What small table is next to your bed?', answer: 'a bedside table',
    options: ['a bedside table', 'a bookshelf', 'a mirror'] },
  { id: 'nightstand-prep', wordId: 'nightstand', stage: 'practice', type: 'sentence',
    sentence: 'The bedside table is ___ the bed.', answer: 'next to', options: ['next to', 'in', 'on'] },

  // ── Carpet ───────────────────────────────────────
  { id: 'carpet-vocab', wordId: 'carpet', stage: 'lesson', type: 'vocabulary' },
  { id: 'carpet-spell', wordId: 'carpet', stage: 'lesson', type: 'spelling' },
  { id: 'carpet-sentence', wordId: 'carpet', stage: 'lesson', type: 'sentence',
    sentence: 'The ___ is soft and it is on the floor.', answer: 'carpet', options: ['carpet', 'picture', 'lamp'] },
  { id: 'carpet-mc', wordId: 'carpet', stage: 'practice', type: 'multipleChoice',
    question: 'Where is a carpet?', answer: 'on the floor', options: ['on the floor', 'on the wall', 'in the bed'] },
  { id: 'carpet-prep', wordId: 'carpet', stage: 'practice', type: 'sentence',
    sentence: 'The cat is sleeping ___ the carpet.', answer: 'on', options: ['on', 'in', 'at'] },

  // ── Wardrobe ─────────────────────────────────────
  { id: 'wardrobe-vocab', wordId: 'wardrobe', stage: 'lesson', type: 'vocabulary' },
  { id: 'wardrobe-spell', wordId: 'wardrobe', stage: 'lesson', type: 'spelling' },
  { id: 'wardrobe-sentence', wordId: 'wardrobe', stage: 'lesson', type: 'sentence',
    sentence: 'I keep my clothes in the ___.', answer: 'wardrobe', options: ['wardrobe', 'lamp', 'plant'] },
  { id: 'wardrobe-mc', wordId: 'wardrobe', stage: 'practice', type: 'multipleChoice',
    question: 'What do you put in a wardrobe?', answer: 'clothes', options: ['clothes', 'water', 'food'] },
  { id: 'wardrobe-prep', wordId: 'wardrobe', stage: 'practice', type: 'sentence',
    sentence: 'My jacket is ___ the wardrobe.', answer: 'in', options: ['in', 'on', 'at'] },

  // ── Desk ─────────────────────────────────────────
  { id: 'desk-vocab', wordId: 'desk', stage: 'lesson', type: 'vocabulary' },
  { id: 'desk-spell', wordId: 'desk', stage: 'lesson', type: 'spelling', hide: [1, 2] },
  { id: 'desk-sentence', wordId: 'desk', stage: 'lesson', type: 'sentence',
    sentence: 'I do my homework at my ___.', answer: 'desk', options: ['desk', 'bed', 'carpet'] },
  { id: 'desk-mc', wordId: 'desk', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you write and study?', answer: 'at a desk', options: ['at a desk', 'in a wardrobe', 'on a mirror'] },
  { id: 'desk-prep', wordId: 'desk', stage: 'practice', type: 'sentence',
    sentence: 'My books are ___ the desk.', answer: 'on', options: ['on', 'in', 'at'] },

  // ── Chair ────────────────────────────────────────
  { id: 'chair-vocab', wordId: 'chair', stage: 'lesson', type: 'vocabulary' },
  { id: 'chair-spell', wordId: 'chair', stage: 'lesson', type: 'spelling', hide: [0, 2] },
  { id: 'chair-sentence', wordId: 'chair', stage: 'lesson', type: 'sentence',
    sentence: 'Please sit on the ___.', answer: 'chair', options: ['chair', 'picture', 'lamp'] },
  { id: 'chair-mc', wordId: 'chair', stage: 'practice', type: 'multipleChoice',
    question: 'What do you sit on?', answer: 'a chair', options: ['a chair', 'a mirror', 'a plant'] },
  { id: 'chair-prep', wordId: 'chair', stage: 'practice', type: 'sentence',
    sentence: 'The chair is ___ front of the desk.', answer: 'in', options: ['in', 'on', 'at'] },

  // ── Bookshelf ────────────────────────────────────
  { id: 'bookshelf-vocab', wordId: 'bookshelf', stage: 'lesson', type: 'vocabulary' },
  { id: 'bookshelf-spell', wordId: 'bookshelf', stage: 'lesson', type: 'spelling' },
  { id: 'bookshelf-sentence', wordId: 'bookshelf', stage: 'lesson', type: 'sentence',
    sentence: 'My books are on the ___.', answer: 'bookshelf', options: ['bookshelf', 'bed', 'mirror'] },
  { id: 'bookshelf-mc', wordId: 'bookshelf', stage: 'practice', type: 'multipleChoice',
    question: 'What do you keep on a bookshelf?', answer: 'books', options: ['books', 'shoes', 'milk'] },
  { id: 'bookshelf-grammar', wordId: 'bookshelf', stage: 'practice', type: 'sentence',
    sentence: 'There ___ many books on the bookshelf.', answer: 'are', options: ['are', 'is', 'am'] },

  // ── Picture ──────────────────────────────────────
  { id: 'picture-vocab', wordId: 'picture', stage: 'lesson', type: 'vocabulary' },
  { id: 'picture-spell', wordId: 'picture', stage: 'lesson', type: 'spelling' },
  { id: 'picture-sentence', wordId: 'picture', stage: 'lesson', type: 'sentence',
    sentence: 'There is a ___ on the wall.', answer: 'picture', options: ['picture', 'bed', 'chair'] },
  { id: 'picture-mc', wordId: 'picture', stage: 'practice', type: 'multipleChoice',
    question: 'What can you hang on the wall?', answer: 'a picture', options: ['a picture', 'a bed', 'a wardrobe'] },
  { id: 'picture-grammar', wordId: 'picture', stage: 'practice', type: 'sentence',
    sentence: 'This ___ a beautiful picture.', answer: 'is', options: ['is', 'are', 'am'] },

  // ── Mirror ───────────────────────────────────────
  { id: 'mirror-vocab', wordId: 'mirror', stage: 'lesson', type: 'vocabulary' },
  { id: 'mirror-spell', wordId: 'mirror', stage: 'lesson', type: 'spelling', hide: [2, 3] },
  { id: 'mirror-sentence', wordId: 'mirror', stage: 'lesson', type: 'sentence',
    sentence: 'I look in the ___ every morning.', answer: 'mirror', options: ['mirror', 'desk', 'carpet'] },
  { id: 'mirror-mc', wordId: 'mirror', stage: 'practice', type: 'multipleChoice',
    question: 'What do you look in to see your face?', answer: 'a mirror', options: ['a mirror', 'a lamp', 'a bookshelf'] },
  { id: 'mirror-grammar', wordId: 'mirror', stage: 'practice', type: 'sentence',
    sentence: 'I ___ my hair in front of the mirror.', answer: 'brush', options: ['brush', 'brushes', 'brushing'] },

  // ── Plant ────────────────────────────────────────
  { id: 'plant-vocab', wordId: 'plant', stage: 'lesson', type: 'vocabulary' },
  { id: 'plant-spell', wordId: 'plant', stage: 'lesson', type: 'spelling', hide: [1, 2] },
  { id: 'plant-sentence', wordId: 'plant', stage: 'lesson', type: 'sentence',
    sentence: 'I water my ___ every day.', answer: 'plant', options: ['plant', 'lamp', 'mirror'] },
  { id: 'plant-mc', wordId: 'plant', stage: 'practice', type: 'multipleChoice',
    question: 'What does a plant need?', answer: 'water', options: ['water', 'a pillow', 'a key'] },
  { id: 'plant-grammar', wordId: 'plant', stage: 'practice', type: 'sentence',
    sentence: 'The plant ___ green leaves.', answer: 'has', options: ['has', 'have', 'is'] },
];
