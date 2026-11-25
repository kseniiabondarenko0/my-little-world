import type { VocabularyWord } from '../../types/game';

// City street: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More city words (A1–B2) are in city-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'city', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const cityWords: VocabularyWord[] = [
  main('park-bench', 'park bench', 'A1', 'A long seat outside, in a park or on a street.', 'Let’s sit on the park bench and eat our sandwiches.', 'лавка в парку', 'скамейка в парке'),
  main('bus-stop', 'bus stop', 'A1', 'A place where the bus stops so people can get on and off.', 'I wait for the bus at the bus stop.', 'автобусна зупинка', 'автобусная остановка'),
  main('street-lamp', 'street lamp', 'A2', 'A tall light that lights the street at night.', 'The street lamps come on when it gets dark.', 'вуличний ліхтар', 'уличный фонарь'),
  main('traffic-light', 'traffic light', 'A1', 'Red, yellow and green lights that tell cars and people when to stop and go.', 'Wait until the traffic light is green.', 'світлофор', 'светофор'),
  main('post-box', 'post box', 'A2', 'A red box in the street where you put letters to send them.', 'I posted my birthday card in the post box.', 'поштова скринька', 'почтовый ящик'),
  main('fountain', 'fountain', 'A2', 'A structure in a square or park that sends water into the air.', 'The children are playing near the fountain.', 'фонтан', 'фонтан'),
  main('ice-cream-cart', 'ice cream cart', 'A2', 'A small shop on wheels that sells ice cream outside.', 'We bought two ice creams from the ice cream cart.', 'візок з морозивом', 'тележка с мороженым'),
  main('bus-ticket', 'bus ticket', 'A1', 'A small card or paper you need to travel by bus.', 'Don’t forget to buy a bus ticket!', 'квиток на автобус', 'билет на автобус'),
  main('skateboard', 'skateboard', 'A1', 'A short board with four small wheels that you stand and ride on.', 'My brother rides his skateboard in the park.', 'скейтборд', 'скейтборд'),
  main('pigeon', 'pigeon', 'A2', 'A grey bird that lives in towns and cities.', 'There are lots of pigeons in the square.', 'голуб', 'голубь'),
  main('street-sign', 'street sign', 'A2', 'A sign on a building that shows the name of the street.', 'Look at the street sign — this is Green Street.', 'табличка з назвою вулиці', 'табличка с названием улицы'),
  main('city-map', 'city map', 'A1', 'A drawing of the town that shows the streets and places.', 'Let’s find the museum on the city map.', 'карта міста', 'карта города'),
];
