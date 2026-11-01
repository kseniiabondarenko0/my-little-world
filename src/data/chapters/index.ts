import type { ChapterDefinition } from '../../chapter/types';
import { bedroomChapter } from './bedroom';

// One chapter per playable room. Add new rooms' chapters here.
export const CHAPTERS: Record<string, ChapterDefinition> = {
  bedroom: bedroomChapter,
};

export function getChapter(roomId: string): ChapterDefinition {
  return CHAPTERS[roomId] ?? bedroomChapter;
}
