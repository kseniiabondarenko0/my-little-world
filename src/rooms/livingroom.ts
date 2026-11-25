import type { RoomDefinition } from '../types/game';

// The living room. Same coordinates as the bedroom: centred at (0, 0), back wall at z = -depth/2,
// left wall at x = -width/2. Window/door `center` is measured along their wall.

export const livingRoom: RoomDefinition = {
  id: 'living-room',
  name: 'Living room',
  icon: '🛋️',
  size: { width: 6.4, depth: 5.8, height: 2.8 },
  theme: {
    wall: '#fbf1e4',
    wallLower: '#ecd9c0',
    trim: '#fffaf2',
    floor: ['#d8b48a', '#cba57b'],
    base: '#e6c9a8',
    curtain: '#9cc7a4',
  },
  window: { wall: 'back', center: 1.4, bottom: 0.95, width: 1.2, height: 1.25 },
  door: { wall: 'left', center: 1.9, bottom: 0, width: 0.95, height: 2.15 },
  objects: ['sofa', 'armchair', 'coffee-table', 'tv', 'fireplace', 'bookcase', 'floor-lamp', 'cushion', 'remote', 'wall-clock', 'piano', 'beanbag'],
  avatarSpot: [2.6, 2.3],
  nextRoom: 'hallway',
};
