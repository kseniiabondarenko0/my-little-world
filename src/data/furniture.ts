import type { FurnitureDefinition } from '../types/game';

// The furniture catalogue.
// size = [width, height, depth] in metres. The room is 6 × 6 m.
// starsRequired controls the unlock order: the lesson opens once the student has that many stars.

export const FURNITURE: FurnitureDefinition[] = [
  { id: 'bed', wordId: 'bed', name: 'Bed', model: 'bed', mount: 'floor',
    size: [1.46, 1.0, 2.0], starsRequired: 0, icon: '🛏️' },
  { id: 'lamp', wordId: 'lamp', name: 'Lamp', model: 'lamp', mount: 'small',
    size: [0.3, 0.55, 0.3], starsRequired: 0, icon: '💡' },
  { id: 'nightstand', wordId: 'nightstand', name: 'Bedside table', model: 'nightstand', mount: 'floor',
    size: [0.54, 0.58, 0.48], surfaceHeight: 0.58, starsRequired: 2, icon: '🗄️' },
  { id: 'carpet', wordId: 'carpet', name: 'Carpet', model: 'carpet', mount: 'rug',
    size: [2.0, 0.03, 1.4], starsRequired: 4, icon: '🟣' },
  { id: 'wardrobe', wordId: 'wardrobe', name: 'Wardrobe', model: 'wardrobe', mount: 'floor',
    size: [1.26, 2.0, 0.62], starsRequired: 6, icon: '🚪' },
  { id: 'desk', wordId: 'desk', name: 'Desk', model: 'desk', mount: 'floor',
    size: [1.2, 0.76, 0.6], surfaceHeight: 0.76, starsRequired: 9, icon: '🖊️' },
  { id: 'chair', wordId: 'chair', name: 'Chair', model: 'chair', mount: 'floor',
    size: [0.5, 0.95, 0.5], starsRequired: 12, icon: '🪑' },
  { id: 'bookshelf', wordId: 'bookshelf', name: 'Bookshelf', model: 'bookshelf', mount: 'floor',
    size: [0.9, 1.8, 0.36], surfaceHeight: 1.8, starsRequired: 15, icon: '📚' },
  { id: 'picture', wordId: 'picture', name: 'Picture', model: 'picture', mount: 'wall',
    size: [0.8, 0.6, 0.05], starsRequired: 18, icon: '🖼️' },
  { id: 'mirror', wordId: 'mirror', name: 'Mirror', model: 'mirror', mount: 'wall',
    size: [0.55, 1.1, 0.05], starsRequired: 21, icon: '🪞' },
  { id: 'plant', wordId: 'plant', name: 'Plant', model: 'plant', mount: 'small',
    size: [0.4, 0.8, 0.4], starsRequired: 24, icon: '🪴' },
  { id: 'chest', wordId: 'chest-of-drawers', name: 'Chest of drawers', model: 'chest', mount: 'floor',
    size: [0.9, 1.0, 0.5], surfaceHeight: 1.0, starsRequired: 27, icon: '🗃️' },
];
