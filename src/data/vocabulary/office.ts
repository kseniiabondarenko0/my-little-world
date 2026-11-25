import type { VocabularyWord } from '../../types/game';

// Office: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More office words (A1–B2) are in office-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'office', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const officeWords: VocabularyWord[] = [
  main('meeting-table', 'meeting table', 'A2', 'A big table where people sit together and talk about work.', 'The team is sitting at the meeting table.', 'стіл для нарад', 'стол для совещаний'),
  main('office-chair', 'office chair', 'A1', 'A soft chair with wheels that can turn round.', 'My office chair goes round and round!', 'офісне крісло', 'офисное кресло'),
  main('filing-cabinet', 'filing cabinet', 'A2', 'A metal cupboard with drawers for papers.', 'The contracts are in the filing cabinet.', 'шафа для документів', 'шкаф для документов'),
  main('water-cooler', 'water cooler', 'A2', 'A machine that gives cold drinking water.', 'Let’s get some water from the water cooler.', 'кулер для води', 'кулер для воды'),
  main('shredder', 'shredder', 'A2', 'A machine that cuts papers into very small pieces.', 'Put old bank letters in the shredder.', 'шредер', 'шредер'),
  main('printer', 'printer', 'A1', 'A machine that puts words and pictures from a computer onto paper.', 'The printer is out of paper again.', 'принтер', 'принтер'),
  main('computer', 'computer', 'A1', 'A machine with a screen and a keyboard for work, email and the internet.', 'I write emails on my computer.', 'комп’ютер', 'компьютер'),
  main('laptop', 'laptop', 'A1', 'A small computer that you can carry.', 'She takes her laptop to every meeting.', 'ноутбук', 'ноутбук'),
  main('stapler', 'stapler', 'A2', 'A small tool that joins pieces of paper together.', 'Can I borrow your stapler?', 'степлер', 'степлер'),
  main('sticky-notes', 'sticky notes', 'A2', 'Small coloured papers that you can stick anywhere.', 'I wrote the phone number on a sticky note.', 'стікери', 'стикеры'),
  main('fire-extinguisher', 'fire extinguisher', 'A2', 'A red metal bottle that puts out fires.', 'The fire extinguisher is next to the door.', 'вогнегасник', 'огнетушитель'),
  main('sales-chart', 'sales chart', 'A2', 'A picture with bars or lines that shows how much a company sells.', 'The sales chart goes up every month.', 'графік продажів', 'график продаж'),
];
