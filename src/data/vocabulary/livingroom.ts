import type { VocabularyWord } from '../../types/game';

// Living room: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More living room words (A1–B2) are in livingroom-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'living-room', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const livingRoomWords: VocabularyWord[] = [
  main('sofa', 'sofa', 'A1', 'A long soft seat for two or three people.', 'We sit on the sofa and watch films.', 'диван', 'диван'),
  main('armchair', 'armchair', 'A1', 'A soft chair for one person, with arms on both sides.', 'Grandpa reads in his armchair.', 'крісло', 'кресло'),
  main('coffee-table', 'coffee table', 'A2', 'A low table in front of the sofa.', 'Put your cup on the coffee table.', 'журнальний столик', 'журнальный столик'),
  main('tv', 'TV', 'A1', 'A machine with a screen that shows programmes and films.', 'My favourite cartoon is on TV at five.', 'телевізор', 'телевизор'),
  main('fireplace', 'fireplace', 'A2', 'A place in the wall where you can make a fire to keep warm.', 'In winter we sit by the fireplace.', 'камін', 'камин'),
  main('bookcase', 'bookcase', 'A2', 'A tall piece of furniture with shelves for books.', 'The bookcase is full of old books.', 'книжкова шафа', 'книжный шкаф'),
  main('floor-lamp', 'floor lamp', 'A2', 'A tall lamp that stands on the floor.', 'The floor lamp is next to the armchair.', 'торшер', 'торшер'),
  main('cushion', 'cushion', 'A2', 'A small soft bag you put on a sofa or chair.', 'There are two red cushions on the sofa.', 'диванна подушка', 'диванная подушка'),
  main('remote', 'remote control', 'A2', 'A small thing with buttons to turn on the TV from your seat.', 'Where is the remote control?', 'пульт', 'пульт'),
  main('wall-clock', 'wall clock', 'A1', 'A clock that hangs on the wall.', 'The wall clock says it’s six o’clock.', 'настінний годинник', 'настенные часы'),
  main('piano', 'piano', 'A1', 'A big musical instrument with black and white keys.', 'My sister plays the piano.', 'піаніно', 'пианино'),
  main('beanbag', 'beanbag', 'A2', 'A big soft bag that you sit on, on the floor.', 'I sit on the beanbag and play games.', 'крісло-мішок', 'кресло-мешок'),
];
