import type { RoomDefinition } from '../types/game';

// The entrance: the front porch outside the house. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2. The walls are the outside of the house.

export const entrance: RoomDefinition = {
  id: 'entrance',
  name: 'Entrance',
  icon: '🚪',
  size: { width: 6.0, depth: 4.8, height: 2.8 },
  theme: {
    wall: '#e8b9a0',
    wallLower: '#c98a6e',
    trim: '#fffaf2',
    floor: ['#d9d2c5', '#c7bfb0'],
    floorStyle: 'tiles',
    base: '#9fcf8f',
    curtain: '#9cc7a4',
  },
  window: { wall: 'left', center: -0.9, bottom: 1.0, width: 1.1, height: 1.1 },
  door: { wall: 'back', center: 0.4, bottom: 0, width: 1.0, height: 2.2 },
  objects: ['doormat', 'letterbox', 'doorbell', 'garden-bench', 'flowerpot', 'wheelie-bin', 'porch-light', 'house-number', 'parcel', 'watering-can', 'wellies', 'garden-gnome'],
  avatarSpot: [2.3, 1.8],
  nextRoom: 'school',
};
