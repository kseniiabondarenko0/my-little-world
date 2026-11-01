// Achievements. Each has a simple condition the game checks automatically.
//
// Condition types:
//   correctAnswers  total correct answers
//   unlocked        number of unlocked objects
//   placed          number of objects placed in rooms
//   practised       number of objects practised
//   stars           star total
//   perfect         lessons/practices finished with no mistakes
//   roomComplete    a room reached 100% (needs roomId)

export type AchievementCondition =
  | { type: 'correctAnswers' | 'unlocked' | 'placed' | 'practised' | 'stars' | 'perfect'; value: number }
  | { type: 'roomComplete'; roomId: string };

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: AchievementCondition;
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  { id: 'first-word', title: 'First Word', description: 'Give your first correct answer.', icon: '🌱',
    condition: { type: 'correctAnswers', value: 1 } },
  { id: 'first-unlock', title: 'Unlocked!', description: 'Unlock your first piece of furniture.', icon: '🔓',
    condition: { type: 'unlocked', value: 1 } },
  { id: 'decorator', title: 'Little Decorator', description: 'Place 3 objects in your room.', icon: '🎨',
    condition: { type: 'placed', value: 3 } },
  { id: 'perfect', title: 'Perfect!', description: 'Finish a lesson with no mistakes.', icon: '💯',
    condition: { type: 'perfect', value: 1 } },
  { id: 'collector', title: 'Word Collector', description: 'Unlock 6 objects.', icon: '📦',
    condition: { type: 'unlocked', value: 6 } },
  { id: 'practice-5', title: 'Practice Makes Perfect', description: 'Practise with 5 objects in your room.', icon: '✏️',
    condition: { type: 'practised', value: 5 } },
  { id: 'stars-30', title: 'Shining Star', description: 'Collect 30 stars.', icon: '🌟',
    condition: { type: 'stars', value: 30 } },
  { id: 'bedroom-complete', title: 'Sweet Dreams', description: 'Complete the bedroom.', icon: '🌙',
    condition: { type: 'roomComplete', roomId: 'bedroom' } },
];
