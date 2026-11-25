import type { VocabularyWord } from '../../types/game';

// Basement: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More basement words (A1–B2) are in basement-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'basement', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const basementWords: VocabularyWord[] = [
  main('workbench', 'workbench', 'A2', 'A strong table where you make or fix things.', 'Dad is fixing a chair at the workbench.', 'верстак', 'верстак'),
  main('shelving', 'shelving unit', 'A2', 'A tall frame with many shelves for storing things.', 'The old toys are on the shelving unit.', 'стелаж', 'стеллаж'),
  main('boiler', 'boiler', 'A2', 'A machine that heats water for the house.', 'The boiler makes hot water for the shower.', 'бойлер, котел', 'бойлер, котёл'),
  main('chest-freezer', 'chest freezer', 'A2', 'A big freezer that opens at the top.', 'There is ice cream in the chest freezer.', 'морозильна скриня', 'морозильный ларь'),
  main('toolbox', 'toolbox', 'A2', 'A box where you keep tools like a hammer and a screwdriver.', 'The hammer is in the toolbox.', 'ящик з інструментами', 'ящик с инструментами'),
  main('ladder', 'ladder', 'A1', 'Two long poles with steps between them; you climb it to reach high places.', 'Hold the ladder while I change the light bulb.', 'драбина', 'лестница-стремянка'),
  main('bicycle', 'bicycle', 'A1', 'A bike: it has two wheels and you ride it.', 'My bicycle is in the basement.', 'велосипед', 'велосипед'),
  main('cardboard-box', 'cardboard box', 'A2', 'A box made of thick brown paper.', 'Put the old books in a cardboard box.', 'картонна коробка', 'картонная коробка'),
  main('broom', 'broom', 'A2', 'A brush with a long handle for sweeping the floor.', 'Sweep the floor with the broom.', 'віник, мітла', 'веник, метла'),
  main('bucket', 'bucket', 'A2', 'A round container with a handle for carrying water.', 'Fill the bucket with water.', 'відро', 'ведро'),
  main('paint', 'paint', 'A1', 'A coloured liquid you put on walls with a brush.', 'We need blue paint for my bedroom.', 'фарба', 'краска'),
  main('fuse-box', 'fuse box', 'A2', 'A box on the wall that controls the electricity in the house.', 'The lights went off, so Dad checked the fuse box.', 'електрощиток', 'электрощиток'),
];
