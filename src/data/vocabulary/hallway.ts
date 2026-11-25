import type { VocabularyWord } from '../../types/game';

// Hallway: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More hallway words (A1–B2) are in hallway-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'hallway', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const hallwayWords: VocabularyWord[] = [
  main('coat-stand', 'coat stand', 'A2', 'A tall pole with hooks where you hang coats and hats.', 'Hang your coat on the coat stand.', 'вішак для одягу', 'вешалка-стойка'),
  main('shoe-rack', 'shoe rack', 'A2', 'Shelves near the door where you keep your shoes.', 'Put your trainers on the shoe rack.', 'полиця для взуття', 'полка для обуви'),
  main('stairs', 'stairs', 'A1', 'Steps that take you from one floor of a house to another.', 'My bedroom is up the stairs.', 'сходи', 'лестница'),
  main('hall-table', 'hall table', 'A2', 'A narrow table in the hall where you leave keys and letters.', 'The letters are on the hall table.', 'столик у передпокої', 'столик в прихожей'),
  main('umbrella-stand', 'umbrella stand', 'A2', 'A tall pot by the door where you keep umbrellas.', 'Leave your wet umbrella in the umbrella stand.', 'підставка для парасольок', 'подставка для зонтов'),
  main('bench', 'bench', 'A1', 'A long seat for two or more people.', 'Sit on the bench and take off your shoes.', 'лавка', 'скамейка'),
  main('key-hook', 'key hook', 'A2', 'A small board on the wall with hooks for your keys.', 'Dad’s keys are on the key hook.', 'ключниця', 'ключница'),
  main('noticeboard', 'noticeboard', 'A2', 'A board on the wall where you pin notes and messages.', 'Mum left a message on the noticeboard.', 'дошка для оголошень', 'доска для заметок'),
  main('runner', 'hall runner', 'A2', 'A long narrow carpet in a hall or corridor.', 'The hall runner keeps the floor clean.', 'доріжка', 'ковровая дорожка'),
  main('telephone', 'telephone', 'A1', 'A machine you use to talk to someone far away.', 'The telephone is ringing!', 'телефон', 'телефон'),
  main('torch', 'torch', 'A2', 'A small electric light you carry in your hand.', 'Take a torch — it’s dark outside.', 'ліхтарик', 'фонарик'),
  main('scooter', 'scooter', 'A1', 'A toy with two wheels and a handle; you push it with one foot.', 'I go to school on my scooter.', 'самокат', 'самокат'),
];
