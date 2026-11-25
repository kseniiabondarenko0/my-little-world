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
import { supermarketChapter } from './supermarket';
import { restaurantChapter } from './restaurant';
import { cityChapter } from './city';

// One chapter per playable room. Add new rooms' chapters here.
export const ENGLISH_CHAPTERS: Record<string, ChapterDefinition> = {
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
  supermarket: supermarketChapter,
  restaurant: restaurantChapter,
  city: cityChapter,
};
