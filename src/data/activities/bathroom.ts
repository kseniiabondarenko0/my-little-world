import type { ActivityDefinition } from '../../types/game';

// Bathroom activities. Same rules as activities/bedroom.ts:
//   stage 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
//   stage 'practice' -> played when the student clicks the object in the room
// Every id must be unique.

export const bathroomActivities: ActivityDefinition[] = [
  // ── bath ──
  { id: 'bath-vocab', wordId: 'bath', stage: 'lesson', type: 'vocabulary' },
  { id: 'bath-spell', wordId: 'bath', stage: 'lesson', type: 'spelling' },
  { id: 'bath-sentence', wordId: 'bath', stage: 'lesson', type: 'sentence',
    sentence: 'I fill the ___ with warm water and relax.', answer: 'bath', options: ['bath', 'toilet', 'soap'] },
  { id: 'bath-mc', wordId: 'bath', stage: 'practice', type: 'multipleChoice',
    question: 'Where can you lie in warm water?', answer: 'in the bath', options: ['in the bath', 'in the washing machine', 'on the scales'] },
  { id: 'bath-prep', wordId: 'bath', stage: 'practice', type: 'sentence',
    sentence: 'The rubber duck is ___ the bath.', answer: 'in', options: ['in', 'under', 'behind'] },

  // ── washbasin ──
  { id: 'washbasin-vocab', wordId: 'washbasin', stage: 'lesson', type: 'vocabulary' },
  { id: 'washbasin-spell', wordId: 'washbasin', stage: 'lesson', type: 'spelling' },
  { id: 'washbasin-sentence', wordId: 'washbasin', stage: 'lesson', type: 'sentence',
    sentence: 'I wash my face at the ___.', answer: 'washbasin', options: ['washbasin', 'bath mat', 'hairdryer'] },
  { id: 'washbasin-mc', wordId: 'washbasin', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you wash your hands after the toilet?', answer: 'at the washbasin', options: ['at the washbasin', 'in the washing machine', 'on the towel rail'] },
  { id: 'washbasin-prep', wordId: 'washbasin', stage: 'practice', type: 'sentence',
    sentence: 'The soap is ___ the washbasin.', answer: 'on', options: ['on', 'under', 'inside'] },

  // ── toilet ──
  { id: 'toilet-vocab', wordId: 'toilet', stage: 'lesson', type: 'vocabulary' },
  { id: 'toilet-spell', wordId: 'toilet', stage: 'lesson', type: 'spelling' },
  { id: 'toilet-sentence', wordId: 'toilet', stage: 'lesson', type: 'sentence',
    sentence: 'After you use the ___, you flush it.', answer: 'toilet', options: ['toilet', 'shower', 'cabinet'] },
  { id: 'toilet-mc', wordId: 'toilet', stage: 'practice', type: 'multipleChoice',
    question: 'What do you flush?', answer: 'the toilet', options: ['the toilet', 'the towel', 'the toothbrush'] },
  { id: 'toilet-prep', wordId: 'toilet', stage: 'practice', type: 'sentence',
    sentence: 'The toilet paper is ___ the toilet.', answer: 'next to', options: ['next to', 'inside', 'above'] },

  // ── shower ──
  { id: 'shower-vocab', wordId: 'shower', stage: 'lesson', type: 'vocabulary' },
  { id: 'shower-spell', wordId: 'shower', stage: 'lesson', type: 'spelling' },
  { id: 'shower-sentence', wordId: 'shower', stage: 'lesson', type: 'sentence',
    sentence: 'I have a quick ___ before school.', answer: 'shower', options: ['shower', 'scales', 'cabinet'] },
  { id: 'shower-mc', wordId: 'shower', stage: 'practice', type: 'multipleChoice',
    question: 'What is faster than a bath?', answer: 'a shower', options: ['a shower', 'a hairdryer', 'a bath mat'] },
  { id: 'shower-prep', wordId: 'shower', stage: 'practice', type: 'sentence',
    sentence: 'The shower gel is ___ the shower.', answer: 'in', options: ['in', 'on top of', 'behind'] },

  // ── towel ──
  { id: 'towel-vocab', wordId: 'towel', stage: 'lesson', type: 'vocabulary' },
  { id: 'towel-spell', wordId: 'towel', stage: 'lesson', type: 'spelling' },
  { id: 'towel-sentence', wordId: 'towel', stage: 'lesson', type: 'sentence',
    sentence: 'After my shower I dry myself with a ___.', answer: 'towel', options: ['towel', 'soap', 'toothbrush'] },
  { id: 'towel-mc', wordId: 'towel', stage: 'practice', type: 'multipleChoice',
    question: 'What do you use to get dry?', answer: 'a towel', options: ['a towel', 'a washbasin', 'some soap'] },
  { id: 'towel-prep', wordId: 'towel', stage: 'practice', type: 'sentence',
    sentence: 'The towel is hanging ___ the rail.', answer: 'on', options: ['on', 'in', 'under'] },

  // ── cabinet ──
  { id: 'cabinet-vocab', wordId: 'cabinet', stage: 'lesson', type: 'vocabulary' },
  { id: 'cabinet-spell', wordId: 'cabinet', stage: 'lesson', type: 'spelling' },
  { id: 'cabinet-sentence', wordId: 'cabinet', stage: 'lesson', type: 'sentence',
    sentence: 'The medicine is in the bathroom ___.', answer: 'cabinet', options: ['cabinet', 'toilet', 'shower'] },
  { id: 'cabinet-mc', wordId: 'cabinet', stage: 'practice', type: 'multipleChoice',
    question: 'Where do you keep plasters and medicine?', answer: 'in the bathroom cabinet', options: ['in the bathroom cabinet', 'in the bath', 'under the bath mat'] },
  { id: 'cabinet-prep', wordId: 'cabinet', stage: 'practice', type: 'sentence',
    sentence: 'The cabinet is ___ the washbasin.', answer: 'above', options: ['above', 'under', 'in'] },

  // ── washing machine ──
  { id: 'washing-machine-vocab', wordId: 'washing-machine', stage: 'lesson', type: 'vocabulary' },
  { id: 'washing-machine-spell', wordId: 'washing-machine', stage: 'lesson', type: 'spelling' },
  { id: 'washing-machine-sentence', wordId: 'washing-machine', stage: 'lesson', type: 'sentence',
    sentence: 'Put your dirty T-shirt in the ___.', answer: 'washing machine', options: ['washing machine', 'washbasin', 'cabinet'] },
  { id: 'washing-machine-mc', wordId: 'washing-machine', stage: 'practice', type: 'multipleChoice',
    question: 'What washes your clothes?', answer: 'the washing machine', options: ['the washing machine', 'the shower', 'the scales'] },
  { id: 'washing-machine-prep', wordId: 'washing-machine', stage: 'practice', type: 'sentence',
    sentence: 'The washing powder is ___ the washing machine.', answer: 'on', options: ['on', 'under', 'between'] },

  // ── bath mat ──
  { id: 'bath-mat-vocab', wordId: 'bath-mat', stage: 'lesson', type: 'vocabulary' },
  { id: 'bath-mat-spell', wordId: 'bath-mat', stage: 'lesson', type: 'spelling' },
  { id: 'bath-mat-sentence', wordId: 'bath-mat', stage: 'lesson', type: 'sentence',
    sentence: 'Stand on the ___ so you don’t slip.', answer: 'bath mat', options: ['bath mat', 'towel', 'scales'] },
  { id: 'bath-mat-mc', wordId: 'bath-mat', stage: 'practice', type: 'multipleChoice',
    question: 'What keeps the floor dry when you get out of the bath?', answer: 'a bath mat', options: ['a bath mat', 'a hairdryer', 'a toothbrush'] },
  { id: 'bath-mat-prep', wordId: 'bath-mat', stage: 'practice', type: 'sentence',
    sentence: 'The bath mat is ___ the bath.', answer: 'in front of', options: ['in front of', 'on', 'inside'] },

  // ── toothbrush ──
  { id: 'toothbrush-vocab', wordId: 'toothbrush', stage: 'lesson', type: 'vocabulary' },
  { id: 'toothbrush-spell', wordId: 'toothbrush', stage: 'lesson', type: 'spelling' },
  { id: 'toothbrush-sentence', wordId: 'toothbrush', stage: 'lesson', type: 'sentence',
    sentence: 'I brush my teeth with my ___.', answer: 'toothbrush', options: ['toothbrush', 'hairdryer', 'soap'] },
  { id: 'toothbrush-mc', wordId: 'toothbrush', stage: 'practice', type: 'multipleChoice',
    question: 'What do you put toothpaste on?', answer: 'a toothbrush', options: ['a toothbrush', 'a towel', 'a bath mat'] },
  { id: 'toothbrush-prep', wordId: 'toothbrush', stage: 'practice', type: 'sentence',
    sentence: 'My toothbrush is ___ a cup.', answer: 'in', options: ['in', 'under', 'at'] },

  // ── soap ──
  { id: 'soap-vocab', wordId: 'soap', stage: 'lesson', type: 'vocabulary' },
  { id: 'soap-spell', wordId: 'soap', stage: 'lesson', type: 'spelling' },
  { id: 'soap-sentence', wordId: 'soap', stage: 'lesson', type: 'sentence',
    sentence: 'Wash your hands with ___ and water.', answer: 'soap', options: ['soap', 'scales', 'towel rail'] },
  { id: 'soap-mc', wordId: 'soap', stage: 'practice', type: 'multipleChoice',
    question: 'What makes your hands clean?', answer: 'soap and water', options: ['soap and water', 'a hairdryer', 'the scales'] },
  { id: 'soap-prep', wordId: 'soap', stage: 'practice', type: 'sentence',
    sentence: 'The soap is ___ the washbasin.', answer: 'on', options: ['on', 'under', 'behind'] },

  // ── hairdryer ──
  { id: 'hairdryer-vocab', wordId: 'hairdryer', stage: 'lesson', type: 'vocabulary' },
  { id: 'hairdryer-spell', wordId: 'hairdryer', stage: 'lesson', type: 'spelling' },
  { id: 'hairdryer-sentence', wordId: 'hairdryer', stage: 'lesson', type: 'sentence',
    sentence: 'My hair is wet. I need the ___.', answer: 'hairdryer', options: ['hairdryer', 'toilet', 'bath'] },
  { id: 'hairdryer-mc', wordId: 'hairdryer', stage: 'practice', type: 'multipleChoice',
    question: 'What do you use to dry your hair quickly?', answer: 'a hairdryer', options: ['a hairdryer', 'a toothbrush', 'a washbasin'] },
  { id: 'hairdryer-prep', wordId: 'hairdryer', stage: 'practice', type: 'sentence',
    sentence: 'Never use a hairdryer ___ the bath!', answer: 'in', options: ['in', 'on', 'at'] },

  // ── scales ──
  { id: 'scales-vocab', wordId: 'scales', stage: 'lesson', type: 'vocabulary' },
  { id: 'scales-spell', wordId: 'scales', stage: 'lesson', type: 'spelling' },
  { id: 'scales-sentence', wordId: 'scales', stage: 'lesson', type: 'sentence',
    sentence: 'I stand on the ___ to see how heavy I am.', answer: 'scales', options: ['scales', 'soap', 'towel'] },
  { id: 'scales-mc', wordId: 'scales', stage: 'practice', type: 'multipleChoice',
    question: 'What tells you how heavy you are?', answer: 'the scales', options: ['the scales', 'the shower', 'the cabinet'] },
  { id: 'scales-prep', wordId: 'scales', stage: 'practice', type: 'sentence',
    sentence: 'The scales are ___ the floor.', answer: 'on', options: ['on', 'in', 'above'] },
];
