import type { ActivityDefinition } from '../../types/game';

// Office activities. Same rules as activities/bedroom.ts:
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

export const officeActivities: ActivityDefinition[] = [
  ...set('meeting-table',
    ['The team is sitting at the ___.', 'meeting table', ['meeting table', 'stapler', 'shredder']],
    ['Where does the team sit and talk about work?', 'at the meeting table', ['at the meeting table', 'in the shredder', 'on the sales chart']],
    ['The laptop is ___ the meeting table.', 'on', ['on', 'in', 'under']]),
  ...set('office-chair',
    ['My ___ has wheels.', 'office chair', ['office chair', 'printer', 'sticky notes']],
    ['What do you sit on at your computer?', 'an office chair', ['an office chair', 'a water cooler', 'a filing cabinet']],
    ['The office chair is ___ the table.', 'next to', ['next to', 'inside', 'above']]),
  ...set('filing-cabinet',
    ['The contracts are in the ___.', 'filing cabinet', ['filing cabinet', 'water cooler', 'laptop']],
    ['Where do you keep important papers?', 'in the filing cabinet', ['in the filing cabinet', 'in the water cooler', 'on the fire extinguisher']],
    ['The printer is ___ the filing cabinet.', 'on', ['on', 'in', 'under']]),
  ...set('water-cooler',
    ['I’m thirsty. Let’s go to the ___.', 'water cooler', ['water cooler', 'shredder', 'stapler']],
    ['Where can you get cold water at work?', 'from the water cooler', ['from the water cooler', 'from the printer', 'from the shredder']],
    ['The water cooler is ___ the corner.', 'in', ['in', 'on', 'at']]),
  ...set('shredder',
    ['Put the old bank letters in the ___.', 'shredder', ['shredder', 'water cooler', 'sales chart']],
    ['What cuts secret papers into tiny pieces?', 'the shredder', ['the shredder', 'the stapler', 'the laptop']],
    ['Put the paper ___ the shredder.', 'into', ['into', 'on', 'under']]),
  ...set('printer',
    ['The ___ is out of paper again.', 'printer', ['printer', 'office chair', 'fire extinguisher']],
    ['What puts your document on paper?', 'the printer', ['the printer', 'the water cooler', 'the meeting table']],
    ['There is no paper ___ the printer.', 'in', ['in', 'on', 'at']]),
  ...set('computer',
    ['I write emails on my ___.', 'computer', ['computer', 'stapler', 'shredder']],
    ['What has a screen, a keyboard and a mouse?', 'a computer', ['a computer', 'a filing cabinet', 'a water cooler']],
    ['The keyboard is ___ front of the screen.', 'in', ['in', 'on', 'at']]),
  ...set('laptop',
    ['She takes her ___ to every meeting.', 'laptop', ['laptop', 'water cooler', 'filing cabinet']],
    ['What small computer can you carry?', 'a laptop', ['a laptop', 'a printer', 'a shredder']],
    ['I left my laptop ___ the meeting table.', 'on', ['on', 'in', 'at']]),
  ...set('stapler',
    ['Can I borrow your ___, please?', 'stapler', ['stapler', 'water cooler', 'office chair']],
    ['What joins two pages together?', 'a stapler', ['a stapler', 'a shredder', 'a sales chart']],
    ['The stapler is ___ the computer.', 'next to', ['next to', 'inside', 'above']]),
  ...set('sticky-notes',
    ['I wrote the number on the ___.', 'sticky notes', ['sticky notes', 'water cooler', 'shredder']],
    ['What small coloured papers can you stick on your screen?', 'sticky notes', ['sticky notes', 'a filing cabinet', 'a fire extinguisher']],
    ['There are sticky notes ___ my screen.', 'on', ['on', 'in', 'under']]),
  ...set('fire-extinguisher',
    ['In a fire, use the ___.', 'fire extinguisher', ['fire extinguisher', 'stapler', 'laptop']],
    ['What red thing puts out a small fire?', 'a fire extinguisher', ['a fire extinguisher', 'a water cooler', 'a printer']],
    ['The fire extinguisher is ___ the wall.', 'on', ['on', 'in', 'at']]),
  ...set('sales-chart',
    ['The ___ shows we sold more this month.', 'sales chart', ['sales chart', 'office chair', 'shredder']],
    ['What shows how much the company sells?', 'the sales chart', ['the sales chart', 'the stapler', 'the water cooler']],
    ['The sales chart is ___ the meeting table.', 'above', ['above', 'under', 'in']]),
];
