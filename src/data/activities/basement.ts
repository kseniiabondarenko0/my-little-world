import type { ActivityDefinition } from '../../types/game';

// Basement activities. Same rules as activities/bedroom.ts:
//   stage 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
//   stage 'practice' -> played when the student clicks the object in the room
// Every id must be unique. `set` writes the usual five activities for one object.

function set(wordId: string, sentence: [string, string, string[]], mc: [string, string, string[]], prep: [string, string, string[]]): ActivityDefinition[] {
  return [
    { id: `${wordId}-vocab`, wordId, stage: 'lesson', type: 'vocabulary' },
    { id: `${wordId}-spell`, wordId, stage: 'lesson', type: 'spelling' },
    { id: `${wordId}-sentence`, wordId, stage: 'lesson', type: 'sentence', sentence: sentence[0], answer: sentence[1], options: sentence[2] },
    { id: `${wordId}-mc`, wordId, stage: 'practice', type: 'multipleChoice', question: mc[0], answer: mc[1], options: mc[2] },
    { id: `${wordId}-prep`, wordId, stage: 'practice', type: 'sentence', sentence: prep[0], answer: prep[1], options: prep[2] },
  ];
}

export const basementActivities: ActivityDefinition[] = [
  ...set('workbench',
    ['Grandpa fixes the old chair at the ___.', 'workbench', ['workbench', 'bucket', 'fuse box']],
    ['Where do you make and fix things in the basement?', 'at the workbench', ['at the workbench', 'in the bucket', 'on the bicycle']],
    ['The toolbox is ___ the workbench.', 'on', ['on', 'in', 'at']]),
  ...set('shelving',
    ['The old toys are on the ___.', 'shelving unit', ['shelving unit', 'broom', 'paint']],
    ['Where can you store lots of boxes in the basement?', 'on the shelving unit', ['on the shelving unit', 'in the boiler', 'on the ladder']],
    ['The paint is ___ the top shelf.', 'on', ['on', 'at', 'under']]),
  ...set('boiler',
    ['The ___ heats the water for the house.', 'boiler', ['boiler', 'toolbox', 'bicycle']],
    ['What makes hot water for the shower?', 'the boiler', ['the boiler', 'the broom', 'the ladder']],
    ['The pipes go ___ the boiler to the bathroom.', 'from', ['from', 'at', 'on']]),
  ...set('chest-freezer',
    ['There is ice cream in the ___.', 'chest freezer', ['chest freezer', 'bucket', 'workbench']],
    ['Where do you keep frozen food in the basement?', 'in the chest freezer', ['in the chest freezer', 'in the toolbox', 'in the paint']],
    ['The frozen peas are ___ the chest freezer.', 'in', ['in', 'on', 'at']]),
  ...set('toolbox',
    ['The hammer is in the ___.', 'toolbox', ['toolbox', 'bicycle', 'boiler']],
    ['Where do you keep the screwdriver?', 'in the toolbox', ['in the toolbox', 'in the bucket', 'on the bicycle']],
    ['Put the nails back ___ the toolbox.', 'in', ['in', 'at', 'off']]),
  ...set('ladder',
    ['Dad climbs the ___ to change the light bulb.', 'ladder', ['ladder', 'paint', 'bucket']],
    ['What do you climb to reach a high shelf?', 'a ladder', ['a ladder', 'a broom', 'a fuse box']],
    ['The ladder is ___ the wall.', 'against', ['against', 'in', 'at']]),
  ...set('bicycle',
    ['I ride my ___ to school.', 'bicycle', ['bicycle', 'boiler', 'broom']],
    ['What has two wheels and pedals?', 'a bicycle', ['a bicycle', 'a workbench', 'a chest freezer']],
    ['My bicycle is ___ the basement.', 'in', ['in', 'on', 'at']]),
  ...set('cardboard-box',
    ['Put the old books in a ___.', 'cardboard box', ['cardboard box', 'ladder', 'boiler']],
    ['What can you pack things in when you move house?', 'a cardboard box', ['a cardboard box', 'a fuse box', 'a broom']],
    ['The Christmas decorations are ___ the cardboard box.', 'in', ['in', 'on', 'at']]),
  ...set('broom',
    ['The floor is dirty. Sweep it with the ___.', 'broom', ['broom', 'bicycle', 'paint']],
    ['What do you use to sweep the floor?', 'a broom', ['a broom', 'a ladder', 'a toolbox']],
    ['The broom is ___ the corner.', 'in', ['in', 'on', 'at']]),
  ...set('bucket',
    ['Fill the ___ with water and wash the floor.', 'bucket', ['bucket', 'shelving unit', 'boiler']],
    ['What do you carry water in?', 'a bucket', ['a bucket', 'a fuse box', 'a bicycle']],
    ['The mop is ___ the bucket.', 'in', ['in', 'at', 'under']]),
  ...set('paint',
    ['We need blue ___ for my bedroom walls.', 'paint', ['paint', 'broom', 'toolbox']],
    ['What do you put on a wall with a brush?', 'paint', ['paint', 'a bucket', 'a ladder']],
    ['The paint is ___ the shelf.', 'on', ['on', 'in', 'at']]),
  ...set('fuse-box',
    ['The lights went off. Check the ___.', 'fuse box', ['fuse box', 'chest freezer', 'bucket']],
    ['What controls the electricity in the house?', 'the fuse box', ['the fuse box', 'the workbench', 'the broom']],
    ['The fuse box is ___ the wall.', 'on', ['on', 'in', 'at']]),
];
