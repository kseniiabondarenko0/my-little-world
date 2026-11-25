import type { RoomDefinition } from '../types/game';

// The school: a classroom in the city. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2.

export const school: RoomDefinition = {
  id: 'school',
  name: 'School',
  icon: '🏫',
  size: { width: 6.4, depth: 5.2, height: 3.0 },
  theme: {
    wall: '#fdf3d8',
    wallLower: '#9fc8a8',
    trim: '#ffffff',
    floor: ['#e6dccb', '#d8ccb6'],
    floorStyle: 'tiles',
    base: '#a9c7e8',
    curtain: '#f2c46d',
  },
  window: { wall: 'left', center: -0.6, bottom: 1.0, width: 1.8, height: 1.3 },
  door: { wall: 'back', center: 2.4, bottom: 0, width: 0.95, height: 2.2 },
  objects: ['whiteboard', 'teachers-desk', 'school-desk', 'locker', 'globe', 'world-map', 'timetable', 'pencil-case', 'school-bag', 'projector', 'textbooks', 'microscope'],
  avatarSpot: [2.5, 2.0],
  nextRoom: 'office',
};
