import type { RoomDefinition } from '../types/game';

// The restaurant: a cosy pizzeria in the city. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2.

export const restaurant: RoomDefinition = {
  id: 'restaurant',
  name: 'Restaurant',
  icon: '🍝',
  size: { width: 6.4, depth: 5.4, height: 3.0 },
  theme: {
    wall: '#fbe9d4',
    wallLower: '#a85d45',
    trim: '#fff7ec',
    floor: ['#a8744c', '#9a6843'],
    floorStyle: 'planks',
    base: '#c98a6e',
    curtain: '#e46a5a',
  },
  window: { wall: 'left', center: -0.5, bottom: 0.9, width: 1.8, height: 1.4 },
  door: { wall: 'back', center: 2.3, bottom: 0, width: 1.0, height: 2.2 },
  objects: ['table-for-two', 'high-chair', 'counter', 'pizza-oven', 'dessert-trolley', 'menu', 'pizza', 'bill', 'tip-jar', 'salt-and-pepper', 'specials-board', 'open-sign'],
  avatarSpot: [2.5, 2.1],
  nextRoom: 'city',
};
