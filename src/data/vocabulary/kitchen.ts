import type { VocabularyWord } from '../../types/game';

// Kitchen: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More kitchen words (A1–B2) are in kitchen-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'kitchen', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const kitchenWords: VocabularyWord[] = [
  main('table', 'table', 'A1', 'You eat your meals at it.', 'We have dinner at the kitchen table.', 'стіл', 'стол'),
  main('fridge', 'fridge', 'A1', 'A cold box that keeps food fresh.', 'The milk is in the fridge.', 'холодильник', 'холодильник'),
  main('cooker', 'cooker', 'A2', 'You cook food on it or in its oven.', 'The soup is on the cooker.', 'плита', 'плита'),
  main('sink', 'sink', 'A1', 'You wash the dishes in it.', 'Put the dirty plates in the sink.', 'раковина', 'раковина'),
  main('stool', 'stool', 'A2', 'A seat with no back.', 'I sit on a stool when I have breakfast.', 'табурет', 'табурет'),
  main('kettle', 'kettle', 'A1', 'You boil water in it for tea.', 'Can you switch on the kettle, please?', 'чайник', 'чайник'),
  main('cupboard', 'cupboard', 'A1', 'Furniture with doors where you keep plates and food.', 'The cups are in the cupboard.', 'кухонна шафа', 'кухонный шкаф'),
  main('microwave', 'microwave', 'A2', 'A machine that heats food very quickly.', 'I heat my lunch in the microwave.', 'мікрохвильовка', 'микроволновка'),
  main('toaster', 'toaster', 'A2', 'A machine that makes bread hot and crispy.', 'Put two slices of bread in the toaster.', 'тостер', 'тостер'),
  main('calendar', 'calendar', 'A1', 'It shows the days, weeks and months of the year.', 'Mum’s birthday is on the calendar.', 'календар', 'календарь'),
  main('bin', 'bin', 'A1', 'You put rubbish in it.', 'Throw the banana skin in the bin.', 'відро для сміття', 'мусорное ведро'),
  main('dishwasher', 'dishwasher', 'A2', 'A machine that washes plates, cups and forks.', 'Put the plates in the dishwasher.', 'посудомийна машина', 'посудомоечная машина'),
];
