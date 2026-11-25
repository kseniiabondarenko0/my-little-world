import type { ActivityDefinition } from '../../types/game';

// Hallway activities. Same rules as activities/bedroom.ts:
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

export const hallwayActivities: ActivityDefinition[] = [
  ...set('coat-stand',
    ['Hang your coat on the ___.', 'coat stand', ['coat stand', 'torch', 'runner']],
    ['Where do you hang your coat when you come home?', 'on the coat stand', ['on the coat stand', 'in the telephone', 'under the runner']],
    ['My scarf is ___ the coat stand.', 'on', ['on', 'under', 'inside']]),
  ...set('shoe-rack',
    ['Take off your shoes and put them on the ___.', 'shoe rack', ['shoe rack', 'noticeboard', 'telephone']],
    ['Where do you keep your shoes by the door?', 'on the shoe rack', ['on the shoe rack', 'on the key hook', 'on the stairs']],
    ['The boots are ___ the bottom shelf.', 'on', ['on', 'at', 'in']]),
  ...set('stairs',
    ['My bedroom is upstairs. Go up the ___.', 'stairs', ['stairs', 'bench', 'scooter']],
    ['How do you get to the first floor?', 'up the stairs', ['up the stairs', 'on the bench', 'in the umbrella stand']],
    ['The cupboard is ___ the stairs.', 'under', ['under', 'on', 'between']]),
  ...set('hall-table',
    ['Put the letters on the ___.', 'hall table', ['hall table', 'scooter', 'runner']],
    ['Where can you leave letters by the front door?', 'on the hall table', ['on the hall table', 'in the umbrella stand', 'on the stairs']],
    ['The telephone is ___ the hall table.', 'on', ['on', 'in', 'at']]),
  ...set('umbrella-stand',
    ['My umbrella is wet. I put it in the ___.', 'umbrella stand', ['umbrella stand', 'noticeboard', 'bench']],
    ['Where do you leave a wet umbrella?', 'in the umbrella stand', ['in the umbrella stand', 'on the telephone', 'on the key hook']],
    ['The umbrella stand is ___ the door.', 'next to', ['next to', 'inside', 'above']]),
  ...set('bench',
    ['Sit on the ___ and put on your boots.', 'bench', ['bench', 'torch', 'key hook']],
    ['Where can you sit to put on your shoes?', 'on the bench', ['on the bench', 'on the noticeboard', 'in the umbrella stand']],
    ['The shoe rack is ___ the bench.', 'under', ['under', 'on', 'above']]),
  ...set('key-hook',
    ['I always hang my keys on the ___.', 'key hook', ['key hook', 'shoe rack', 'scooter']],
    ['Where can you find the house keys?', 'on the key hook', ['on the key hook', 'in the shoe rack', 'under the stairs']],
    ['The key hook is ___ the hall table.', 'above', ['above', 'under', 'inside']]),
  ...set('noticeboard',
    ['Mum pinned a note on the ___.', 'noticeboard', ['noticeboard', 'runner', 'bench']],
    ['Where can the family leave messages?', 'on the noticeboard', ['on the noticeboard', 'in the torch', 'on the stairs']],
    ['The school timetable is ___ the noticeboard.', 'on', ['on', 'in', 'at']]),
  ...set('runner',
    ['There is a long ___ on the hall floor.', 'hall runner', ['hall runner', 'telephone', 'key hook']],
    ['What is a long narrow carpet in the hall called?', 'a hall runner', ['a hall runner', 'a coat stand', 'a torch']],
    ['The runner is ___ the floor.', 'on', ['on', 'above', 'at']]),
  ...set('telephone',
    ['The ___ is ringing. Can you answer it?', 'telephone', ['telephone', 'bench', 'umbrella stand']],
    ['What do you use to call Grandma?', 'the telephone', ['the telephone', 'the shoe rack', 'the runner']],
    ['Grandma is ___ the phone.', 'on', ['on', 'in', 'at']]),
  ...set('torch',
    ['It’s dark outside. Take a ___.', 'torch', ['torch', 'bench', 'noticeboard']],
    ['What do you need if the lights go out?', 'a torch', ['a torch', 'a coat stand', 'a hall runner']],
    ['The torch is ___ the drawer of the hall table.', 'in', ['in', 'on', 'at']]),
  ...set('scooter',
    ['I go to the park on my ___.', 'scooter', ['scooter', 'telephone', 'key hook']],
    ['What has two wheels and a handle?', 'a scooter', ['a scooter', 'a bench', 'a noticeboard']],
    ['Don’t leave your scooter ___ the middle of the hall!', 'in', ['in', 'on', 'at']]),
];
