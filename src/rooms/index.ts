import type { RoomDefinition } from '../types/game';
import { bedroom } from './bedroom';
import { kitchen } from './kitchen';
import { bathroom } from './bathroom';
import { livingRoom } from './livingroom';
import { hallway } from './hallway';

// The map of the world. A location with a `room` can be played;
// the others appear as "coming soon" in the navigation menu.

export interface LocationEntry {
  id: string;
  name: string;
  icon: string;
  area: 'house' | 'city';
  room?: RoomDefinition;
}

export const LOCATIONS: LocationEntry[] = [
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️', area: 'house', room: bedroom },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳', area: 'house', room: kitchen },
  { id: 'bathroom', name: 'Bathroom', icon: '🛁', area: 'house', room: bathroom },
  { id: 'living-room', name: 'Living room', icon: '🛋️', area: 'house', room: livingRoom },
  { id: 'hallway', name: 'Hallway', icon: '🧥', area: 'house', room: hallway },
  { id: 'basement', name: 'Basement', icon: '📦', area: 'house' },
  { id: 'entrance', name: 'Entrance', icon: '🚪', area: 'house' },
  { id: 'school', name: 'School', icon: '🏫', area: 'city' },
  { id: 'office', name: 'Office', icon: '💼', area: 'city' },
  { id: 'hospital', name: 'Hospital', icon: '🏥', area: 'city' },
  { id: 'supermarket', name: 'Supermarket', icon: '🛒', area: 'city' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍝', area: 'city' },
  { id: 'city', name: 'City', icon: '🏙️', area: 'city' },
];

export const DEFAULT_ROOM_ID = 'bedroom';

/** A room is open when it is the first room or the room before it is complete. */
export function isRoomOpen(id: string, completedRooms: string[]): boolean {
  if (id === DEFAULT_ROOM_ID) return true;
  const before = LOCATIONS.find((l) => l.room?.nextRoom === id);
  return !!before && completedRooms.includes(before.id);
}

export function getRoom(id: string): RoomDefinition {
  return LOCATIONS.find((l) => l.id === id)?.room ?? bedroom;
}
