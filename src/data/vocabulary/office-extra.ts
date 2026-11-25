import type { Level, VocabularyWord } from '../../types/game';

// Office word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (desk, telephone, calendar, deadline, presentation...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'office',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const officeExtraWords: VocabularyWord[] = [
  // ── Places & people ──────────────────────────────
  w('office', 'A1', 'places', null, 'офис', 'офіс'),
  w('job', 'A1', 'things', null, 'работа (должность)', 'робота (посада)'),
  w('boss', 'A1', 'people', 'office-chair', 'начальник', 'начальник'),
  w('colleague', 'A2', 'people', 'meeting-table', 'коллега', 'колега'),
  w('manager', 'A2', 'people', 'sales-chart', 'менеджер, руководитель', 'менеджер, керівник'),
  w('receptionist', 'A2', 'people', null, 'администратор, секретарь', 'адміністратор, секретар'),
  w('customer', 'A2', 'people', 'sales-chart', 'клиент, покупатель', 'клієнт, покупець'),
  w('company', 'A2', 'places', 'sales-chart', 'компания', 'компанія'),
  w('team', 'A2', 'people', 'meeting-table', 'команда', 'команда'),
  w('reception', 'B1', 'places', null, 'приёмная, ресепшен', 'приймальня, ресепшн'),
  w('employee', 'B1', 'people', null, 'сотрудник', 'працівник'),
  w('employer', 'B1', 'people', null, 'работодатель', 'роботодавець'),

  // ── Things ───────────────────────────────────────
  w('email', 'A1', 'things', 'computer', 'электронное письмо', 'електронний лист'),
  w('keyboard', 'A1', 'things', 'computer', 'клавиатура', 'клавіатура'),
  w('mouse', 'A1', 'things', 'computer', 'мышь (компьютерная)', 'миша (комп’ютерна)'),
  w('paper', 'A1', 'things', 'printer', 'бумага', 'папір'),
  w('meeting', 'A2', 'things', 'meeting-table', 'встреча, совещание', 'зустріч, нарада'),
  w('file', 'A2', 'things', 'filing-cabinet', 'папка, файл', 'папка, файл'),
  w('password', 'A2', 'things', 'laptop', 'пароль', 'пароль'),
  w('salary', 'B1', 'things', null, 'зарплата', 'зарплата'),
  w('contract', 'B1', 'things', 'filing-cabinet', 'договор, контракт', 'договір, контракт'),
  w('job interview', 'B1', 'things', null, 'собеседование', 'співбесіда'),
  w('agenda', 'B1', 'things', 'meeting-table', 'повестка дня', 'порядок денний'),
  w('fire exit', 'B1', 'things', 'fire-extinguisher', 'пожарный выход', 'пожежний вихід'),
  w('profit', 'B2', 'things', 'sales-chart', 'прибыль', 'прибуток'),
  w('confidential', 'B2', 'adjectives', 'shredder', 'конфиденциальный', 'конфіденційний'),

  // ── Actions ──────────────────────────────────────
  w('work', 'A1', 'verbs', null, 'работать', 'працювати'),
  w('type', 'A1', 'verbs', 'computer', 'печатать (на клавиатуре)', 'друкувати (на клавіатурі)'),
  w('print', 'A1', 'verbs', 'printer', 'печатать (на принтере)', 'друкувати (на принтері)'),
  w('send', 'A1', 'verbs', 'computer', 'отправлять', 'надсилати'),
  w('log in', 'A2', 'verbs', 'laptop', 'войти (в систему)', 'увійти (в систему)'),
  w('have a meeting', 'A2', 'verbs', 'meeting-table', 'проводить совещание', 'проводити нараду'),
  w('take notes', 'A2', 'verbs', 'sticky-notes', 'делать заметки', 'робити нотатки'),
  w('save', 'A2', 'verbs', 'laptop', 'сохранять', 'зберігати'),
  w('attach', 'B1', 'verbs', 'computer', 'прикреплять (файл)', 'прикріплювати (файл)'),
  w('apply for', 'B1', 'verbs', null, 'подавать заявку на', 'подавати заявку на'),
  w('promote', 'B2', 'verbs', null, 'повышать (в должности)', 'підвищувати (на посаді)'),
  w('negotiate', 'B2', 'verbs', 'meeting-table', 'вести переговоры', 'вести переговори'),

  // ── Describing ───────────────────────────────────
  w('busy', 'A1', 'adjectives', null, 'занятой', 'зайнятий'),
  w('tired', 'A1', 'adjectives', null, 'уставший', 'втомлений'),
  w('organised', 'A2', 'adjectives', 'filing-cabinet', 'организованный', 'організований'),
  w('professional', 'B1', 'adjectives', null, 'профессиональный', 'професійний'),
  w('full-time', 'B1', 'adjectives', null, 'на полный рабочий день', 'на повний робочий день'),
  w('part-time', 'B1', 'adjectives', null, 'на неполный рабочий день', 'на неповний робочий день'),
  w('ergonomic', 'B2', 'adjectives', 'office-chair', 'эргономичный', 'ергономічний'),
];
