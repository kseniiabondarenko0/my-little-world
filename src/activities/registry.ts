import type { ComponentType } from 'react';
import type { ActivityType } from '../types/game';
import type { Question } from './engine';
import { ChoiceActivity } from './components/ChoiceActivity';
import { SpellingActivity } from './components/SpellingActivity';

// Which screen shows which activity type.
// A new activity type (listening, speaking, dialogue...) = a new component + one line here.

export interface ActivityProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

export const ACTIVITY_COMPONENTS: Record<ActivityType, ComponentType<ActivityProps>> = {
  vocabulary: ChoiceActivity,
  multipleChoice: ChoiceActivity,
  sentence: ChoiceActivity,
  translation: ChoiceActivity,
  spelling: SpellingActivity,
};
