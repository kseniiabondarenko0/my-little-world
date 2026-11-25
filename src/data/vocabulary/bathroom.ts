import type { VocabularyWord } from '../../types/game';

// Bathroom: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More bathroom words (A1–B2) are in bathroom-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'bathroom', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const bathroomWords: VocabularyWord[] = [
  main('bath', 'bath', 'A1', 'A long container you fill with water and sit in to wash.', 'I have a hot bath on Sunday evening.', 'ванна', 'ванна'),
  main('washbasin', 'washbasin', 'A2', 'A small sink in the bathroom where you wash your hands and face.', 'Wash your hands at the washbasin.', 'умивальник', 'умывальник'),
  main('toilet', 'toilet', 'A1', 'You sit on it and then flush it.', 'The toilet is next to the bath.', 'унітаз', 'унитаз'),
  main('shower', 'shower', 'A1', 'Water comes down from above and you wash under it.', 'I have a quick shower every morning.', 'душ', 'душ'),
  main('towel', 'towel', 'A1', 'A soft piece of cloth you use to dry yourself.', 'My towel is on the towel rail.', 'рушник', 'полотенце'),
  main('cabinet', 'cabinet', 'A2', 'A small cupboard on the wall, often with a mirror on the door.', 'The plasters are in the bathroom cabinet.', 'шафка', 'шкафчик'),
  main('washing-machine', 'washing machine', 'A2', 'A machine that washes your clothes.', 'Put your dirty socks in the washing machine.', 'пральна машина', 'стиральная машина'),
  main('bath-mat', 'bath mat', 'A2', 'A small soft mat you stand on when you get out of the bath.', 'Stand on the bath mat so the floor stays dry.', 'килимок для ванної', 'коврик для ванной'),
  main('toothbrush', 'toothbrush', 'A1', 'A small brush for cleaning your teeth.', 'My toothbrush is blue.', 'зубна щітка', 'зубная щётка'),
  main('soap', 'soap', 'A1', 'You use it with water to wash your hands.', 'Wash your hands with soap.', 'мило', 'мыло'),
  main('hairdryer', 'hairdryer', 'A2', 'A machine that blows hot air to dry your hair.', 'I dry my hair with a hairdryer.', 'фен', 'фен'),
  main('scales', 'scales', 'A2', 'You stand on them to see how heavy you are.', 'The scales are under the washbasin.', 'ваги', 'весы'),
];
