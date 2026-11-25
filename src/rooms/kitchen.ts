import type { RoomDefinition } from '../types/game';

// The kitchen. Same coordinates as the bedroom: centred at (0, 0), back wall at z = -depth/2,
// left wall at x = -width/2. Window/door `center` is measured along their wall.

export const kitchen: RoomDefinition = {
  id: 'kitchen',
  name: 'Kitchen',
  icon: '🍳',
  size: { width: 6, depth: 6, height: 2.8 },
  theme: {
    wall: '#eef6e9',
    wallLower: '#cfe6d4',
    trim: '#fffdf6',
    floor: ['#f3e3c3', '#e8d3ac'],
    base: '#bfe0d8',
    curtain: '#ffd59e',
  },
  window: { wall: 'back', center: 0.4, bottom: 1.05, width: 1.4, height: 1.1 },
  door: { wall: 'left', center: 1.7, bottom: 0, width: 0.95, height: 2.15 },
  objects: ['table', 'fridge', 'cooker', 'sink', 'stool', 'kettle', 'cupboard', 'microwave', 'toaster', 'calendar', 'bin', 'dishwasher'],
  avatarSpot: [2.45, 2.45],
  nextRoom: 'bathroom',
};
