import type { ActivityDefinition } from '../../types/game';

// School activities. Same rules as activities/bedroom.ts:
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

export const schoolActivities: ActivityDefinition[] = [
  ...set('whiteboard',
    ['The teacher writes the date on the ___.', 'whiteboard', ['whiteboard', 'locker', 'globe']],
    ['Where does the teacher write the new words?', 'on the whiteboard', ['on the whiteboard', 'in the pencil case', 'in the locker']],
    ['The world map is ___ the whiteboard.', 'next to', ['next to', 'inside', 'under']]),
  ...set('teachers-desk',
    ['Put your homework on the ___.', 'teacher’s desk', ['teacher’s desk', 'world map', 'school bag']],
    ['Where does the teacher sit?', 'at the teacher’s desk', ['at the teacher’s desk', 'in the locker', 'on the globe']],
    ['The projector is ___ the teacher’s desk.', 'on', ['on', 'in', 'under']]),
  ...set('school-desk',
    ['Sit down at your ___, please.', 'school desk', ['school desk', 'timetable', 'microscope']],
    ['Where do students sit and write?', 'at a school desk', ['at a school desk', 'on the whiteboard', 'in the school bag']],
    ['My bag is ___ my school desk.', 'under', ['under', 'into', 'above']]),
  ...set('locker',
    ['I keep my sports kit in my ___.', 'locker', ['locker', 'globe', 'timetable']],
    ['Where can you leave your things during the day?', 'in your locker', ['in your locker', 'on the world map', 'in the projector']],
    ['Your PE bag is ___ the locker.', 'in', ['in', 'on', 'at']]),
  ...set('globe',
    ['Find Ukraine on the ___.', 'globe', ['globe', 'locker', 'pencil case']],
    ['What is a round model of the Earth?', 'a globe', ['a globe', 'a timetable', 'a school bag']],
    ['The globe is ___ the teacher’s desk.', 'on', ['on', 'in', 'under']]),
  ...set('world-map',
    ['All the countries are on the ___.', 'world map', ['world map', 'school desk', 'microscope']],
    ['What shows every country on the wall?', 'the world map', ['the world map', 'the locker', 'the pencil case']],
    ['The world map is ___ the wall.', 'on', ['on', 'in', 'at']]),
  ...set('timetable',
    ['We have maths at nine. Look at the ___.', 'timetable', ['timetable', 'globe', 'school bag']],
    ['How do you know which lesson is next?', 'look at the timetable', ['look at the timetable', 'open the locker', 'turn on the projector']],
    ['The timetable is ___ the door.', 'next to', ['next to', 'inside', 'under']]),
  ...set('pencil-case',
    ['My pens are in my ___.', 'pencil case', ['pencil case', 'whiteboard', 'world map']],
    ['Where do you keep your pens and ruler?', 'in a pencil case', ['in a pencil case', 'on the timetable', 'in the globe']],
    ['The ruler is ___ the pencil case.', 'in', ['in', 'on', 'at']]),
  ...set('school-bag',
    ['Don’t forget your ___!', 'school bag', ['school bag', 'whiteboard', 'projector']],
    ['What do you carry your books in?', 'a school bag', ['a school bag', 'a microscope', 'a world map']],
    ['Put your school bag ___ your desk.', 'under', ['under', 'into', 'above']]),
  ...set('projector',
    ['The teacher turns on the ___.', 'projector', ['projector', 'pencil case', 'locker']],
    ['What shows pictures from the computer on the wall?', 'the projector', ['the projector', 'the globe', 'the school bag']],
    ['The projector is ___ the teacher’s desk.', 'on', ['on', 'in', 'under']]),
  ...set('textbooks',
    ['Open your ___ at page ten.', 'textbooks', ['textbooks', 'lockers', 'globes']],
    ['What do you study from in lessons?', 'textbooks', ['textbooks', 'a whiteboard', 'a locker']],
    ['The textbooks are ___ the desk.', 'on', ['on', 'in', 'at']]),
  ...set('microscope',
    ['We looked at a leaf under the ___.', 'microscope', ['microscope', 'timetable', 'school bag']],
    ['What makes very small things look big?', 'a microscope', ['a microscope', 'a pencil case', 'a world map']],
    ['Put the leaf ___ the microscope.', 'under', ['under', 'into', 'above']]),
];
