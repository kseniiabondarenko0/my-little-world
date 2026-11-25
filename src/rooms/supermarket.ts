import type { RoomDefinition } from '../types/game';

// The supermarket: a small corner shop in the city. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2.

export const supermarket: RoomDefinition = {
  id: 'supermarket',
  name: 'Supermarket',
  icon: '🛒',
  size: { width: 6.6, depth: 5.4, height: 3.0 },
  theme: {
    wall: '#fffaf0',
    wallLower: '#f6c9a0',
    trim: '#ffffff',
    floor: ['#f4f1ea', '#e3ddd0'],
    floorStyle: 'tiles',
    base: '#f2b880',
    curtain: '#9fd8c2',
  },
  window: { wall: 'left', center: -0.6, bottom: 0.6, width: 2.2, height: 1.7 },
  door: { wall: 'back', center: 2.3, bottom: 0, width: 1.3, height: 2.3 },
  objects: ['shopping-trolley', 'checkout', 'cash-register', 'fruit-stand', 'bread-rack', 'drinks-fridge', 'shopping-basket', 'barcode-scanner', 'watermelon', 'shopping-bag', 'special-offer', 'opening-hours'],
  avatarSpot: [2.6, 2.1],
  nextRoom: 'restaurant',
};
