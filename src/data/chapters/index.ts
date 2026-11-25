import type { ChapterDefinition } from '../../chapter/types';
import { bedroomChapter } from './bedroom';
import { kitchenChapter } from './kitchen';
import { bathroomChapter } from './bathroom';
import { livingRoomChapter } from './livingroom';
import { hallwayChapter } from './hallway';
import { basementChapter } from './basement';
import { entranceChapter } from './entrance';
import { schoolChapter } from './school';
import { officeChapter } from './office';
import { hospitalChapter } from './hospital';
import { COURSE_CONTENT } from '../courses';
import { ACTIVE_COURSE } from '../../courses/active';

// One chapter per playable room. Add new rooms' chapters here.
export const CHAPTERS: Record<string, ChapterDefinition> = {
  bedroom: bedroomChapter,
  kitchen: kitchenChapter,
  bathroom: bathroomChapter,
  'living-room': livingRoomChapter,
  hallway: hallwayChapter,
  basement: basementChapter,
  entrance: entranceChapter,
  school: schoolChapter,
  office: officeChapter,
  hospital: hospitalChapter,
};

/** German / Polish chapters replace the English one where they exist (see src/data/courses). */
export function getChapter(roomId: string): ChapterDefinition {
  return COURSE_CONTENT[ACTIVE_COURSE]?.chapters[roomId] ?? CHAPTERS[roomId] ?? bedroomChapter;
}
