// The mini-games. Each one works with any room's chapter content.
// kind 'modal'   = plays in a window (components in ./components.ts)
// kind 'mission' = plays in the 3D room (built by ./missions.ts)

export interface MiniGameInfo {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  kind: 'modal' | 'mission';
}

export const MINIGAMES: MiniGameInfo[] = [
  { id: 'memory', title: 'Memory Match', icon: '🃏', blurb: 'Flip cards and match words to pictures or meanings.', kind: 'modal' },
  { id: 'hidden', title: 'Hidden Objects', icon: '🔎', blurb: 'Read the clue and find the object in your room.', kind: 'mission' },
  { id: 'sort', title: 'Sort It Out', icon: '🧺', blurb: 'Put each word into the right group.', kind: 'modal' },
  { id: 'scramble', title: 'Word Scramble', icon: '🔤', blurb: 'Put the mixed-up letters in order.', kind: 'modal' },
  { id: 'designer', title: 'Interior Designer', icon: '📐', blurb: 'Move your furniture to follow the brief.', kind: 'mission' },
  { id: 'decide', title: 'What Would You Do?', icon: '💭', blurb: 'Solve everyday situations and explain your choice.', kind: 'modal' },
];
