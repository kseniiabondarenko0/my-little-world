import type { ActivityDefinition } from '../../types/game';

// Entrance activities. Same rules as activities/bedroom.ts:
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

export const entranceActivities: ActivityDefinition[] = [
  ...set('doormat',
    ['Wipe your feet on the ___ before you come in.', 'doormat', ['doormat', 'parcel', 'doorbell']],
    ['Where do you clean your shoes before you go in?', 'on the doormat', ['on the doormat', 'in the letterbox', 'on the house number']],
    ['The doormat is ___ front of the door.', 'in', ['in', 'on', 'at']]),
  ...set('letterbox',
    ['The postman puts letters in the ___.', 'letterbox', ['letterbox', 'flowerpot', 'wellies']],
    ['Where does the postman put your letters?', 'in the letterbox', ['in the letterbox', 'in the wheelie bin', 'in the watering can']],
    ['There is a postcard ___ the letterbox.', 'in', ['in', 'on', 'under']]),
  ...set('doorbell',
    ['Somebody is ringing the ___!', 'doorbell', ['doorbell', 'doormat', 'garden gnome']],
    ['What do visitors press when they arrive?', 'the doorbell', ['the doorbell', 'the flowerpot', 'the parcel']],
    ['The doorbell is ___ the door.', 'next to', ['next to', 'under', 'inside']]),
  ...set('garden-bench',
    ['Grandma sits on the ___ in the sun.', 'garden bench', ['garden bench', 'letterbox', 'doorbell']],
    ['Where can you sit outside the front door?', 'on the garden bench', ['on the garden bench', 'in the wheelie bin', 'on the house number']],
    ['The parcel is ___ the garden bench.', 'on', ['on', 'in', 'at']]),
  ...set('flowerpot',
    ['The red flowers are in the ___.', 'flowerpot', ['flowerpot', 'doorbell', 'parcel']],
    ['Where do the flowers grow by the door?', 'in the flowerpot', ['in the flowerpot', 'in the letterbox', 'on the doormat']],
    ['The garden gnome is ___ the flowerpot.', 'next to', ['next to', 'inside', 'above']]),
  ...set('wheelie-bin',
    ['Put the rubbish in the ___.', 'wheelie bin', ['wheelie bin', 'watering can', 'doorbell']],
    ['What do you take to the street on rubbish day?', 'the wheelie bin', ['the wheelie bin', 'the doormat', 'the house number']],
    ['The wheelie bin is ___ the corner.', 'in', ['in', 'on', 'at']]),
  ...set('porch-light',
    ['It’s dark. Turn on the ___.', 'porch light', ['porch light', 'wellies', 'parcel']],
    ['What helps visitors see your door at night?', 'the porch light', ['the porch light', 'the doormat', 'the watering can']],
    ['The porch light is ___ the door.', 'above', ['above', 'under', 'in']]),
  ...set('house-number',
    ['Our ___ is seven.', 'house number', ['house number', 'flowerpot', 'garden bench']],
    ['How does the postman find your house?', 'by the house number', ['by the house number', 'by the doormat', 'by the wellies']],
    ['The house number is ___ the wall.', 'on', ['on', 'in', 'at']]),
  ...set('parcel',
    ['A ___ came for you today!', 'parcel', ['parcel', 'doormat', 'porch light']],
    ['What does the delivery driver bring?', 'a parcel', ['a parcel', 'a wheelie bin', 'a doorbell']],
    ['The driver left the parcel ___ the bench.', 'on', ['on', 'in', 'at']]),
  ...set('watering-can',
    ['The flowers are dry. Fill the ___.', 'watering can', ['watering can', 'letterbox', 'doorbell']],
    ['What do you use to water the plants?', 'a watering can', ['a watering can', 'a doormat', 'a house number']],
    ['The watering can is ___ the flowerpot.', 'next to', ['next to', 'inside', 'above']]),
  ...set('wellies',
    ['It’s muddy. Put on your ___.', 'wellies', ['wellies', 'parcel', 'porch light']],
    ['What do you wear on your feet in the rain and mud?', 'wellies', ['wellies', 'a letterbox', 'a flowerpot']],
    ['Leave your muddy wellies ___ the door.', 'outside', ['outside', 'into', 'on']]),
  ...set('garden-gnome',
    ['A little ___ with a red hat sits by the flowers.', 'garden gnome', ['garden gnome', 'wheelie bin', 'letterbox']],
    ['What small statue has a red pointed hat?', 'a garden gnome', ['a garden gnome', 'a doorbell', 'a watering can']],
    ['The gnome is hiding ___ the flowerpot.', 'behind', ['behind', 'on', 'into']]),
];
