import type { RoomDefinition } from '../types/game';

// The hallway. Same coordinates as the bedroom: centred at (0, 0), back wall at z = -depth/2,
// left wall at x = -width/2. Window/door `center` is measured along their wall.

export const hallway: RoomDefinition = {
  id: 'hallway',
  name: 'Hallway',
  icon: '🧥',
  size: { width: 6.4, depth: 4.6, height: 2.8 },
  theme: {
    wall: '#eef0f7',
    wallLower: '#c9cfe6',
    trim: '#ffffff',
    floor: ['#f1e6d6', '#c98f6a'],
    floorStyle: 'tiles',
    base: '#c7b8d8',
    curtain: '#f2c46d',
  },
  window: { wall: 'back', center: 0.2, bottom: 1.2, width: 0.8, height: 0.9 },
  door: { wall: 'left', center: 0.8, bottom: 0, width: 0.95, height: 2.15 },
  objects: ['coat-stand', 'shoe-rack', 'stairs', 'hall-table', 'umbrella-stand', 'bench', 'key-hook', 'noticeboard', 'runner', 'telephone', 'torch', 'scooter'],
  avatarSpot: [2.6, 1.6],
  nextRoom: 'basement',
};
