import type { ActivityDefinition } from '../../types/game';

// City street activities. Same rules as activities/bedroom.ts:
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

export const cityActivities: ActivityDefinition[] = [
  ...set('park-bench',
    ['Let’s sit on the ___ and rest.', 'park bench', ['park bench', 'post box', 'bus ticket']],
    ['Where can you sit down in the park?', 'on a park bench', ['on a park bench', 'in a post box', 'on a traffic light']],
    ['The pigeon is ___ the bench.', 'under', ['under', 'into', 'at']]),
  ...set('bus-stop',
    ['I wait for the bus at the ___.', 'bus stop', ['bus stop', 'fountain', 'skateboard']],
    ['Where do you wait for a bus?', 'at the bus stop', ['at the bus stop', 'in the fountain', 'on the street sign']],
    ['The bus stop is ___ the post box.', 'next to', ['next to', 'in', 'on']]),
  ...set('street-lamp',
    ['The ___ comes on when it gets dark.', 'street lamp', ['street lamp', 'pigeon', 'city map']],
    ['What lights the street at night?', 'a street lamp', ['a street lamp', 'a bus ticket', 'a skateboard']],
    ['The street lamp is ___ the bench.', 'behind', ['behind', 'into', 'of']]),
  ...set('traffic-light',
    ['Wait until the ___ is green.', 'traffic light', ['traffic light', 'park bench', 'fountain']],
    ['What tells you when to cross the road?', 'the traffic light', ['the traffic light', 'the pigeon', 'the ice cream cart']],
    ['Stop ___ the red light.', 'at', ['at', 'on', 'in']]),
  ...set('post-box',
    ['I posted my card in the ___.', 'post box', ['post box', 'bus stop', 'skateboard']],
    ['Where do you put a letter to send it?', 'in the post box', ['in the post box', 'in the fountain', 'on the bus ticket']],
    ['Put the letter ___ the post box.', 'into', ['into', 'at', 'off']]),
  ...set('fountain',
    ['The children are playing near the ___.', 'fountain', ['fountain', 'bus ticket', 'street sign']],
    ['What sends water into the air in the square?', 'a fountain', ['a fountain', 'a post box', 'a traffic light']],
    ['People throw coins ___ the fountain.', 'into', ['into', 'at', 'off']]),
  ...set('ice-cream-cart',
    ['We bought two ice creams from the ___.', 'ice cream cart', ['ice cream cart', 'street lamp', 'pigeon']],
    ['Where can you buy an ice cream in the street?', 'from the ice cream cart', ['from the ice cream cart', 'from the post box', 'from the bus stop']],
    ['There is a long queue ___ the ice cream cart.', 'at', ['at', 'of', 'into']]),
  ...set('bus-ticket',
    ['Don’t forget to buy a ___!', 'bus ticket', ['bus ticket', 'fountain', 'park bench']],
    ['What do you need to travel by bus?', 'a bus ticket', ['a bus ticket', 'a skateboard', 'a street sign']],
    ['Show your ticket ___ the driver.', 'to', ['to', 'at', 'of']]),
  ...set('skateboard',
    ['My brother rides his ___ in the park.', 'skateboard', ['skateboard', 'post box', 'city map']],
    ['What has four small wheels and you stand on it?', 'a skateboard', ['a skateboard', 'a park bench', 'a traffic light']],
    ['He jumped ___ his skateboard.', 'off', ['off', 'at', 'of']]),
  ...set('pigeon',
    ['There are lots of ___ in the square.', 'pigeons', ['pigeons', 'bus stops', 'street lamps']],
    ['Which grey bird lives in the city?', 'a pigeon', ['a pigeon', 'a fountain', 'a bus ticket']],
    ['The pigeon is sitting ___ the street lamp.', 'on', ['on', 'in', 'at']]),
  ...set('street-sign',
    ['Look at the ___ — this is Green Street.', 'street sign', ['street sign', 'skateboard', 'ice cream cart']],
    ['What shows the name of the street?', 'the street sign', ['the street sign', 'the pigeon', 'the park bench']],
    ['The street sign is ___ the wall.', 'on', ['on', 'in', 'under']]),
  ...set('city-map',
    ['Let’s find the museum on the ___.', 'city map', ['city map', 'bus stop', 'pigeon']],
    ['What do you look at when you are lost in town?', 'a city map', ['a city map', 'a skateboard', 'a post box']],
    ['The museum is ___ the map.', 'on', ['on', 'in', 'at']]),
];
