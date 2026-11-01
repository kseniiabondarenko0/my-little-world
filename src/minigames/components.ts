import type { ComponentType } from 'react';
import type { Level, NativeLanguage } from '../types/game';
import type { ChapterDefinition } from '../chapter/types';
import { MemoryMatch } from './MemoryMatch';
import { SortItOut } from './SortItOut';
import { WordScramble } from './WordScramble';
import { WhatWouldYouDo } from './WhatWouldYouDo';

// Mini-games that play in a window. Each gets the room's chapter content and the student's level.

export interface MiniGameResult {
  mistakes: number;
  detail: string;
}

export interface MiniGameProps {
  chapter: ChapterDefinition;
  level: Level;
  language: NativeLanguage;
  onComplete: (result: MiniGameResult) => void;
}

export const MINIGAME_COMPONENTS: Record<string, ComponentType<MiniGameProps>> = {
  memory: MemoryMatch,
  sort: SortItOut,
  scramble: WordScramble,
  decide: WhatWouldYouDo,
};
