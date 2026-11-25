import type { ActivityDefinition } from '../../types/game';

// Hospital activities. Same rules as activities/bedroom.ts:
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

export const hospitalActivities: ActivityDefinition[] = [
  ...set('hospital-bed',
    ['The patient is resting in the ___.', 'hospital bed', ['hospital bed', 'syringe', 'eye chart']],
    ['Where does a patient sleep in hospital?', 'in a hospital bed', ['in a hospital bed', 'on the medical trolley', 'in the wheelchair']],
    ['The drip stand is ___ the hospital bed.', 'next to', ['next to', 'inside', 'above']]),
  ...set('wheelchair',
    ['The nurse pushes the ___ to the lift.', 'wheelchair', ['wheelchair', 'thermometer', 'bandage']],
    ['What helps people who can’t walk move around?', 'a wheelchair', ['a wheelchair', 'a stethoscope', 'an eye chart']],
    ['Grandad is sitting ___ the wheelchair.', 'in', ['in', 'at', 'under']]),
  ...set('drip-stand',
    ['The bag of medicine hangs on the ___.', 'drip stand', ['drip stand', 'bandage', 'X-ray']],
    ['What holds the bag of medicine above the bed?', 'the drip stand', ['the drip stand', 'the crutches', 'the thermometer']],
    ['The bag hangs ___ the top of the drip stand.', 'from', ['from', 'under', 'into']]),
  ...set('medical-trolley',
    ['The bandages are on the ___.', 'medical trolley', ['medical trolley', 'eye chart', 'heart monitor']],
    ['What does the nurse push from bed to bed?', 'the medical trolley', ['the medical trolley', 'the X-ray', 'the eye chart']],
    ['The thermometer is ___ the medical trolley.', 'on', ['on', 'in', 'at']]),
  ...set('crutches',
    ['He broke his leg, so he walks with ___.', 'crutches', ['crutches', 'bandages', 'syringes']],
    ['What helps you walk when your leg is hurt?', 'crutches', ['crutches', 'a stethoscope', 'a heart monitor']],
    ['The crutches are ___ the wall.', 'against', ['against', 'into', 'on']]),
  ...set('stethoscope',
    ['The doctor listens to my heart with a ___.', 'stethoscope', ['stethoscope', 'wheelchair', 'drip stand']],
    ['What does a doctor use to listen to your chest?', 'a stethoscope', ['a stethoscope', 'a bandage', 'an X-ray']],
    ['The doctor wears the stethoscope ___ her neck.', 'around', ['around', 'into', 'under']]),
  ...set('thermometer',
    ['Let’s check your temperature with the ___.', 'thermometer', ['thermometer', 'wheelchair', 'eye chart']],
    ['How do you know if you have a fever?', 'use a thermometer', ['use a thermometer', 'look at the X-ray', 'sit in a wheelchair']],
    ['Put the thermometer ___ your arm.', 'under', ['under', 'on', 'above']]),
  ...set('bandage',
    ['The nurse puts a ___ on my arm.', 'bandage', ['bandage', 'drip stand', 'heart monitor']],
    ['What do you put round a cut to keep it clean?', 'a bandage', ['a bandage', 'a thermometer', 'a wheelchair']],
    ['She wrapped the bandage ___ my wrist.', 'around', ['around', 'into', 'above']]),
  ...set('syringe',
    ['The nurse gives the injection with a ___.', 'syringe', ['syringe', 'crutches', 'eye chart']],
    ['What has a small needle for injections?', 'a syringe', ['a syringe', 'a hospital bed', 'a stethoscope']],
    ['The syringe is ___ the trolley.', 'on', ['on', 'in', 'at']]),
  ...set('heart-monitor',
    ['The ___ goes beep, beep, beep.', 'heart monitor', ['heart monitor', 'bandage', 'crutches']],
    ['What shows how a patient’s heart is beating?', 'the heart monitor', ['the heart monitor', 'the eye chart', 'the wheelchair']],
    ['The heart monitor is ___ the trolley.', 'on', ['on', 'in', 'under']]),
  ...set('x-ray',
    ['The ___ shows that the arm is broken.', 'X-ray', ['X-ray', 'syringe', 'wheelchair']],
    ['What picture shows your bones?', 'an X-ray', ['an X-ray', 'an eye chart', 'a thermometer']],
    ['The X-ray is ___ the wall.', 'on', ['on', 'in', 'at']]),
  ...set('eye-chart',
    ['Read the smallest letters on the ___.', 'eye chart', ['eye chart', 'bandage', 'medical trolley']],
    ['What do you read to test your eyes?', 'an eye chart', ['an eye chart', 'an X-ray', 'a heart monitor']],
    ['Stand three metres ___ the eye chart.', 'from', ['from', 'of', 'at']]),
];
