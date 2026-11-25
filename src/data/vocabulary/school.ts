import type { VocabularyWord } from '../../types/game';

// School: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More school words (A1–B2) are in school-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'school', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const schoolWords: VocabularyWord[] = [
  main('whiteboard', 'whiteboard', 'A1', 'A big white board on the wall that the teacher writes on with pens.', 'The teacher writes the date on the whiteboard.', 'біла дошка', 'белая доска'),
  main('teachers-desk', 'teacher’s desk', 'A1', 'The big table at the front of the classroom where the teacher sits.', 'Put your homework on the teacher’s desk.', 'учительський стіл', 'учительский стол'),
  main('school-desk', 'school desk', 'A1', 'A small table with a chair where a student sits and works.', 'My school desk is next to the window.', 'парта', 'парта'),
  main('locker', 'locker', 'A2', 'A tall metal cupboard with a door where students keep their things.', 'I keep my sports kit in my locker.', 'шафка', 'шкафчик'),
  main('globe', 'globe', 'A2', 'A round model of the Earth.', 'Find Ukraine on the globe.', 'глобус', 'глобус'),
  main('world-map', 'world map', 'A2', 'A big picture of all the countries of the world.', 'The world map is on the wall.', 'карта світу', 'карта мира'),
  main('timetable', 'timetable', 'A2', 'A list that shows which lessons you have and when.', 'We have English on Monday — look at the timetable.', 'розклад', 'расписание'),
  main('pencil-case', 'pencil case', 'A1', 'A small bag for pens and pencils.', 'My pencil case is full of colourful pens.', 'пенал', 'пенал'),
  main('school-bag', 'school bag', 'A1', 'A bag for your books that you carry to school.', 'Don’t forget your school bag!', 'шкільна сумка', 'школьная сумка'),
  main('projector', 'projector', 'A2', 'A machine that shows pictures from a computer on the wall.', 'The teacher turns on the projector.', 'проєктор', 'проектор'),
  main('textbooks', 'textbooks', 'A2', 'Books that you study from in lessons.', 'Open your textbooks at page ten.', 'підручники', 'учебники'),
  main('microscope', 'microscope', 'A2', 'A machine that makes very small things look big.', 'We looked at a leaf under the microscope.', 'мікроскоп', 'микроскоп'),
];
