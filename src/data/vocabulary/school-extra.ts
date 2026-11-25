import type { Level, VocabularyWord } from '../../types/game';

// School word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (book, pen, pencil, notebook, backpack...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'school',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const schoolExtraWords: VocabularyWord[] = [
  // ── Places & people ──────────────────────────────
  w('school', 'A1', 'places', null, 'школа', 'школа'),
  w('classroom', 'A1', 'places', null, 'класс (комната)', 'клас (кімната)'),
  w('teacher', 'A1', 'people', 'teachers-desk', 'учитель', 'вчитель'),
  w('student', 'A1', 'people', 'school-desk', 'ученик, студент', 'учень, студент'),
  w('classmate', 'A2', 'people', 'school-desk', 'одноклассник', 'однокласник'),
  w('playground', 'A2', 'places', null, 'школьный двор, площадка', 'шкільне подвір’я, майданчик'),
  w('library', 'A2', 'places', 'textbooks', 'библиотека', 'бібліотека'),
  w('canteen', 'A2', 'places', null, 'столовая', 'їдальня'),
  w('gym', 'A2', 'places', 'locker', 'спортзал', 'спортзал'),
  w('head teacher', 'B1', 'people', null, 'директор школы', 'директор школи'),
  w('science lab', 'B1', 'places', 'microscope', 'кабинет естествознания', 'кабінет природничих наук'),

  // ── Subjects & things ────────────────────────────
  w('lesson', 'A1', 'things', 'timetable', 'урок', 'урок'),
  w('homework', 'A1', 'things', 'teachers-desk', 'домашнее задание', 'домашнє завдання'),
  w('maths', 'A1', 'subjects', 'whiteboard', 'математика', 'математика'),
  w('English', 'A1', 'subjects', 'textbooks', 'английский язык', 'англійська мова'),
  w('geography', 'A2', 'subjects', 'globe', 'география', 'географія'),
  w('history', 'A2', 'subjects', 'textbooks', 'история', 'історія'),
  w('science', 'A2', 'subjects', 'microscope', 'естествознание, наука', 'природничі науки'),
  w('art', 'A1', 'subjects', null, 'рисование, искусство', 'малювання, мистецтво'),
  w('PE', 'A2', 'subjects', 'locker', 'физкультура', 'фізкультура'),
  w('ruler', 'A1', 'things', 'pencil-case', 'линейка', 'лінійка'),
  w('rubber', 'A1', 'things', 'pencil-case', 'ластик', 'гумка'),
  w('marker', 'A2', 'things', 'whiteboard', 'маркер', 'маркер'),
  w('break', 'A2', 'things', 'timetable', 'перемена', 'перерва'),
  w('test', 'A2', 'things', null, 'контрольная, тест', 'контрольна, тест'),
  w('exam', 'B1', 'things', null, 'экзамен', 'іспит'),
  w('report', 'B1', 'things', null, 'табель, отчёт', 'табель, звіт'),
  w('uniform', 'B1', 'things', 'locker', 'школьная форма', 'шкільна форма'),
  w('presentation', 'B1', 'things', 'projector', 'презентация', 'презентація'),
  w('experiment', 'B1', 'things', 'microscope', 'эксперимент, опыт', 'експеримент, дослід'),
  w('curriculum', 'B2', 'things', 'timetable', 'учебная программа', 'навчальна програма'),
  w('deadline', 'B2', 'things', null, 'крайний срок', 'кінцевий термін'),

  // ── Actions ──────────────────────────────────────
  w('learn', 'A1', 'verbs', null, 'учить, учиться', 'вчити, вчитися'),
  w('write', 'A1', 'verbs', 'whiteboard', 'писать', 'писати'),
  w('listen', 'A1', 'verbs', null, 'слушать', 'слухати'),
  w('put your hand up', 'A2', 'verbs', 'school-desk', 'поднять руку', 'підняти руку'),
  w('be late', 'A2', 'verbs', 'timetable', 'опаздывать', 'запізнюватися'),
  w('revise', 'B1', 'verbs', 'textbooks', 'повторять (материал)', 'повторювати (матеріал)'),
  w('hand in', 'B1', 'verbs', 'teachers-desk', 'сдавать (работу)', 'здавати (роботу)'),
  w('pass an exam', 'B1', 'verbs', null, 'сдать экзамен', 'скласти іспит'),
  w('copy', 'B1', 'verbs', null, 'списывать, копировать', 'списувати, копіювати'),
  w('concentrate', 'B2', 'verbs', null, 'сосредоточиться', 'зосередитися'),

  // ── Describing ───────────────────────────────────
  w('easy', 'A1', 'adjectives', null, 'лёгкий', 'легкий'),
  w('difficult', 'A1', 'adjectives', null, 'трудный', 'складний'),
  w('interesting', 'A1', 'adjectives', null, 'интересный', 'цікавий'),
  w('boring', 'A2', 'adjectives', null, 'скучный', 'нудний'),
  w('strict', 'B1', 'adjectives', 'teachers-desk', 'строгий', 'суворий'),
  w('compulsory', 'B2', 'adjectives', 'timetable', 'обязательный', 'обов’язковий'),
];
