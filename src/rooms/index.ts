import type { RoomDefinition } from '../types/game';
import { bedroom } from './bedroom';

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
  { id: 'kitchen', name: 'Kitchen', icon: '🍳', area: 'house' },
  { id: 'bathroom', name: 'Bathroom', icon: '🛁', area: 'house' },
  { id: 'living-room', name: 'Living room', icon: '🛋️', area: 'house' },
  { id: 'hallway', name: 'Hallway', icon: '🧥', area: 'house' },
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

export function getRoom(id: string): RoomDefinition {
  return LOCATIONS.find((l) => l.id === id)?.room ?? bedroom;
}
