import type { ActivityDefinition } from '../../types/game';

// Living room activities. Same rules as activities/bedroom.ts:
//   stage 'lesson'   -> played from the catalogue to UNLOCK the object (in this order)
//   stage 'practice' -> played when the student clicks the object in the room
// Every id must be unique. `set` writes the usual five activities for one object.

function set(wordId: string, sentence: [string, string, string[]], mc: [string, string, string[]], prep: [string, string, string[]]): ActivityDefinition[] {
  return [
    { id: `${wordId}-vocab`, wordId, stage: 'lesson', type: 'vocabulary' },
    { id: `${wordId}-spell`, wordId, stage: 'lesson', type: 'spelling' },
    { id: `${wordId}-sentence`, wordId, stage: 'lesson', type: 'sentence', sentence: sentence[0], answer: sentence[1], options: sentence[2] },
    { id: `${wordId}-mc`, wordId, stage: 'practice', type: 'multipleChoice', question: mc[0], answer: mc[1], options: mc[2] },
    { id: `${wordId}-prep`, wordId, stage: 'practice', type: 'sentence', sentence: prep[0], answer: prep[1], options: prep[2] },
  ];
}

export const livingRoomActivities: ActivityDefinition[] = [
  ...set('sofa',
    ['Three people can sit on the ___.', 'sofa', ['sofa', 'remote control', 'wall clock']],
    ['Where does the family sit to watch a film?', 'on the sofa', ['on the sofa', 'in the fireplace', 'on the wall clock']],
    ['The cushions are ___ the sofa.', 'on', ['on', 'under', 'inside']]),
  ...set('armchair',
    ['Grandpa sits in his ___ and reads.', 'armchair', ['armchair', 'piano', 'TV']],
    ['What is a soft chair for one person?', 'an armchair', ['an armchair', 'a bookcase', 'a coffee table']],
    ['The floor lamp is ___ the armchair.', 'next to', ['next to', 'inside', 'under']]),
  ...set('coffee-table',
    ['Put the cups on the ___.', 'coffee table', ['coffee table', 'beanbag', 'wall clock']],
    ['Where can you put a magazine in front of the sofa?', 'on the coffee table', ['on the coffee table', 'in the piano', 'on the wall clock']],
    ['The coffee table is ___ front of the sofa.', 'in', ['in', 'on', 'at']]),
  ...set('tv',
    ['My favourite cartoon is on ___ tonight.', 'TV', ['TV', 'sofa', 'cushion']],
    ['What do you watch films on?', 'the TV', ['the TV', 'the fireplace', 'the cushion']],
    ['The sofa is ___ the TV.', 'opposite', ['opposite', 'inside', 'on']]),
  ...set('fireplace',
    ['It is cold. Let’s sit by the ___.', 'fireplace', ['fireplace', 'remote control', 'bookcase']],
    ['Where can you make a fire to keep warm?', 'in the fireplace', ['in the fireplace', 'on the sofa', 'in the piano']],
    ['The photos are ___ the mantelpiece, above the fire.', 'on', ['on', 'under', 'in']]),
  ...set('bookcase',
    ['All my books are in the ___.', 'bookcase', ['bookcase', 'TV', 'armchair']],
    ['What has shelves for your books?', 'a bookcase', ['a bookcase', 'a beanbag', 'a floor lamp']],
    ['The dictionary is ___ the top shelf of the bookcase.', 'on', ['on', 'at', 'under']]),
  ...set('floor-lamp',
    ['It’s dark. Turn on the ___, please.', 'floor lamp', ['floor lamp', 'piano', 'coffee table']],
    ['What gives you light next to the armchair?', 'a floor lamp', ['a floor lamp', 'a cushion', 'a remote control']],
    ['The floor lamp stands ___ the corner.', 'in', ['in', 'on', 'at']]),
  ...set('cushion',
    ['Put a soft ___ behind your back.', 'cushion', ['cushion', 'fireplace', 'TV']],
    ['What makes the sofa more comfortable?', 'a cushion', ['a cushion', 'a wall clock', 'a piano']],
    ['The cat is sleeping ___ the cushion.', 'on', ['on', 'at', 'into']]),
  ...set('remote',
    ['I can’t change the channel. Where’s the ___?', 'remote control', ['remote control', 'bookcase', 'beanbag']],
    ['What do you use to turn on the TV from the sofa?', 'the remote control', ['the remote control', 'the cushion', 'the fireplace']],
    ['The remote control is ___ the sofa cushions!', 'between', ['between', 'above', 'opposite']]),
  ...set('wall-clock',
    ['Look at the ___. It’s eight o’clock!', 'wall clock', ['wall clock', 'sofa', 'beanbag']],
    ['What tells you the time on the wall?', 'the wall clock', ['the wall clock', 'the floor lamp', 'the armchair']],
    ['The wall clock is ___ the fireplace.', 'above', ['above', 'under', 'in']]),
  ...set('piano',
    ['My sister plays the ___ every evening.', 'piano', ['piano', 'cushion', 'coffee table']],
    ['What instrument has black and white keys?', 'the piano', ['the piano', 'the TV', 'the bookcase']],
    ['The sheet music is ___ the piano.', 'on', ['on', 'under', 'behind']]),
  ...set('beanbag',
    ['I sit on the ___ and play video games.', 'beanbag', ['beanbag', 'wall clock', 'fireplace']],
    ['What big soft bag can you sit on, on the floor?', 'a beanbag', ['a beanbag', 'a bookcase', 'a remote control']],
    ['The beanbag is ___ the floor in front of the TV.', 'on', ['on', 'above', 'at']]),
];
