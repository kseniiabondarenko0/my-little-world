import type { VocabularyWord } from '../../types/game';

// Entrance: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More entrance words (A1–B2) are in entrance-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'entrance', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const entranceWords: VocabularyWord[] = [
  main('doormat', 'doormat', 'A2', 'A mat outside the front door where you clean your shoes.', 'Wipe your feet on the doormat.', 'килимок біля дверей', 'коврик у двери'),
  main('letterbox', 'letterbox', 'A2', 'A box where the postman puts your letters.', 'There’s a letter in the letterbox.', 'поштова скринька', 'почтовый ящик'),
  main('doorbell', 'doorbell', 'A1', 'A button by the door; you press it and it rings inside.', 'Somebody is ringing the doorbell!', 'дверний дзвінок', 'дверной звонок'),
  main('garden-bench', 'garden bench', 'A2', 'A wooden seat outside the house.', 'Grandma is sitting on the garden bench.', 'садова лавка', 'садовая скамейка'),
  main('flowerpot', 'flowerpot', 'A2', 'A pot that flowers grow in.', 'The red flowers are in the flowerpot.', 'вазон', 'цветочный горшок'),
  main('wheelie-bin', 'wheelie bin', 'A2', 'A big rubbish bin with wheels that you keep outside.', 'Take the wheelie bin out on Monday.', 'сміттєвий бак на колесах', 'мусорный бак на колёсах'),
  main('porch-light', 'porch light', 'A2', 'A light next to the front door.', 'Turn on the porch light when it’s dark.', 'ліхтар біля входу', 'фонарь у входа'),
  main('house-number', 'house number', 'A1', 'The number of your house, on the wall or the door.', 'Our house number is seven.', 'номер будинку', 'номер дома'),
  main('parcel', 'parcel', 'A1', 'A box or package that comes by post.', 'There’s a parcel for you on the bench.', 'посилка', 'посылка'),
  main('watering-can', 'watering can', 'A2', 'A container with a long spout for giving water to plants.', 'Fill the watering can and water the flowers.', 'лійка', 'лейка'),
  main('wellies', 'wellies', 'A2', 'Rubber boots for rain and mud.', 'Put on your wellies — it’s muddy outside.', 'гумові чоботи', 'резиновые сапоги'),
  main('garden-gnome', 'garden gnome', 'A2', 'A small statue of a little man with a red hat.', 'The garden gnome is next to the flowers.', 'садовий гном', 'садовый гном'),
];
