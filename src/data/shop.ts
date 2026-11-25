import type { Accessory, HairStyle, OutfitStyle } from '../player/types';
import type { Course, RoomDefinition } from '../types/game';

// ═══════════════════════════════════════════════════════════════════════════
//  PET + COIN SHOP — everything a student can adopt or buy.
//
//  Coins come from finished tasks (see COIN_REWARDS). They are saved per player
//  (shared by every course the player learns), so German and Polish students earn
//  and spend the same way. Item ids are saved in student files: don't rename them.
//  Prices are a first guess; change them here.
// ═══════════════════════════════════════════════════════════════════════════

/** How many coins each kind of task gives. */
export const COIN_REWARDS = {
  /** Any finished question session (lesson, practice, training, Practice Mode). */
  session: 5,
  /** Extra when every answer in the session was right the first time. */
  perfectBonus: 3,
  /** Extra for finishing the unlock lesson of a new piece of furniture. */
  unlockLesson: 5,
  /** A mini-game played outside the Journey. */
  freeMinigame: 5,
  /** A piece of writing in a mission. */
  writing: 5,
  /** Coins every player starts with (plus one per star already earned, for older saves). */
  starter: 25,
} as const;

/** Chapter tasks, missions and side quests pay a quarter of their XP (at least 5). */
export const coinsForXp = (xp: number) => Math.max(5, Math.round(xp / 4));

// ── Pets ────────────────────────────────────────────────────────────────────

export type PetSpecies = 'cat' | 'dog' | 'hamster' | 'parrot';
export type PetAccessory = 'none' | 'collar' | 'bow' | 'bandana' | 'partyhat' | 'crown' | 'glasses';

export interface PetConfig {
  species: PetSpecies;
  name: string;
  /** Fur (or feather) colour. */
  color: string;
  accessory: PetAccessory;
}

export interface SpeciesInfo {
  id: PetSpecies;
  icon: string;
  /** The animal's name in every course language, so students meet the word they're learning. */
  word: Record<Course, string>;
  /** Free colours for this animal. */
  colors: string[];
  defaultName: string;
}

export const PET_SPECIES: SpeciesInfo[] = [
  { id: 'cat', icon: '🐱', word: { en: 'cat', de: 'die Katze', pl: 'kot' }, colors: ['#e8a05c', '#3a3540', '#f4efe8', '#9a9aa6', '#8a5a3a', '#f1d9b0'], defaultName: 'Mochi' },
  { id: 'dog', icon: '🐶', word: { en: 'dog', de: 'der Hund', pl: 'pies' }, colors: ['#c98b4e', '#3a3540', '#f4efe8', '#8a5a3a', '#e3c48f', '#9a9aa6'], defaultName: 'Biscuit' },
  { id: 'hamster', icon: '🐹', word: { en: 'hamster', de: 'der Hamster', pl: 'chomik' }, colors: ['#e6b980', '#f4efe8', '#b98a63', '#9a9aa6', '#d9a066', '#f1d9b0'], defaultName: 'Peanut' },
  { id: 'parrot', icon: '🦜', word: { en: 'parrot', de: 'der Papagei', pl: 'papuga' }, colors: ['#4cb860', '#4a8fe0', '#e0503a', '#f2c53d', '#f4efe8', '#9a9aa6'], defaultName: 'Kiwi' },
];

export const speciesInfo = (id: PetSpecies) => PET_SPECIES.find((s) => s.id === id) ?? PET_SPECIES[0];

// ── Shop items ──────────────────────────────────────────────────────────────

export type ShopCategory = 'room' | 'avatar' | 'pet';

interface ItemBase {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: ShopCategory;
}

export interface WallPaint extends ItemBase { kind: 'wall'; wall: string; wallLower: string }
export interface FloorStyle extends ItemBase { kind: 'floor'; floor: [string, string]; floorStyle: NonNullable<RoomDefinition['theme']['floorStyle']> }
export interface RoomDecor extends ItemBase { kind: 'decor' }
export interface AvatarHair extends ItemBase { kind: 'hair'; hair: HairStyle }
export interface AvatarOutfit extends ItemBase { kind: 'outfit'; outfit: OutfitStyle }
export interface AvatarAccessory extends ItemBase { kind: 'accessory'; accessory: Accessory }
export interface PetItem extends ItemBase { kind: 'petAccessory'; petAccessory: PetAccessory }
export interface PetColor extends ItemBase { kind: 'petColor'; color: string }

export type ShopItem = WallPaint | FloorStyle | RoomDecor | AvatarHair | AvatarOutfit | AvatarAccessory | PetItem | PetColor;

export type DecorId = 'decor-fairy-lights' | 'decor-bunting' | 'decor-stars' | 'decor-balloons';

const room = { category: 'room' as const };
const avatar = { category: 'avatar' as const };
const pet = { category: 'pet' as const };

export const SHOP_ITEMS: ShopItem[] = [
  // Room: wall paint (used in any room once bought)
  { ...room, kind: 'wall', id: 'paint-mint', name: 'Mint walls', icon: '🟩', price: 40, wall: '#dff3ea', wallLower: '#b9e3d1' },
  { ...room, kind: 'wall', id: 'paint-lavender', name: 'Lavender walls', icon: '🟪', price: 40, wall: '#ece4fa', wallLower: '#d3c3ef' },
  { ...room, kind: 'wall', id: 'paint-sky', name: 'Sky blue walls', icon: '🟦', price: 40, wall: '#e1eefb', wallLower: '#bcd6f1' },
  { ...room, kind: 'wall', id: 'paint-lemon', name: 'Lemon walls', icon: '🟨', price: 40, wall: '#fdf4d4', wallLower: '#f6e2a0' },
  { ...room, kind: 'wall', id: 'paint-rose', name: 'Rose walls', icon: '🌸', price: 50, wall: '#fbe3ea', wallLower: '#f3bfcf' },
  { ...room, kind: 'wall', id: 'paint-night', name: 'Midnight walls', icon: '🌙', price: 70, wall: '#4a4d78', wallLower: '#363961' },
  // Room: floors
  { ...room, kind: 'floor', id: 'floor-walnut', name: 'Dark wood floor', icon: '🪵', price: 60, floor: ['#9a6b47', '#8c5f3d'], floorStyle: 'planks' },
  { ...room, kind: 'floor', id: 'floor-whitewash', name: 'White wood floor', icon: '🤍', price: 60, floor: ['#f1e9de', '#e7dccd'], floorStyle: 'planks' },
  { ...room, kind: 'floor', id: 'floor-checker', name: 'Checker tiles', icon: '🏁', price: 70, floor: ['#fbf7f2', '#4a4458'], floorStyle: 'tiles' },
  { ...room, kind: 'floor', id: 'floor-candy', name: 'Candy tiles', icon: '🍬', price: 80, floor: ['#fde2ea', '#d9ecfb'], floorStyle: 'tiles' },
  { ...room, kind: 'floor', id: 'floor-paving', name: 'Stone paving', icon: '🪨', price: 70, floor: ['#c9c3ba', '#b8b1a7'], floorStyle: 'paving' },
  // Room: decorations
  { ...room, kind: 'decor', id: 'decor-fairy-lights', name: 'Fairy lights', icon: '✨', price: 50 },
  { ...room, kind: 'decor', id: 'decor-bunting', name: 'Party flags', icon: '🎏', price: 45 },
  { ...room, kind: 'decor', id: 'decor-stars', name: 'Glowing wall stars', icon: '⭐', price: 55 },
  { ...room, kind: 'decor', id: 'decor-balloons', name: 'Balloons', icon: '🎈', price: 35 },
  // Avatar: exclusive styles (they then appear in the avatar creator too)
  { ...avatar, kind: 'hair', id: 'hair-ponytail', name: 'Ponytail', icon: '💇', price: 60, hair: 'ponytail' },
  { ...avatar, kind: 'hair', id: 'hair-pigtails', name: 'Pigtails', icon: '🎀', price: 60, hair: 'pigtails' },
  { ...avatar, kind: 'outfit', id: 'outfit-cape', name: 'Hero cape', icon: '🦸', price: 90, outfit: 'cape' },
  { ...avatar, kind: 'outfit', id: 'outfit-suit', name: 'Smart suit', icon: '🤵', price: 90, outfit: 'suit' },
  { ...avatar, kind: 'outfit', id: 'outfit-gown', name: 'Party dress', icon: '👗', price: 100, outfit: 'gown' },
  { ...avatar, kind: 'accessory', id: 'acc-crown', name: 'Golden crown', icon: '👑', price: 120, accessory: 'crown' },
  { ...avatar, kind: 'accessory', id: 'acc-wizard', name: 'Wizard hat', icon: '🧙', price: 80, accessory: 'wizard' },
  { ...avatar, kind: 'accessory', id: 'acc-catears', name: 'Cat ears', icon: '🐱', price: 50, accessory: 'catears' },
  // Pet
  { ...pet, kind: 'petAccessory', id: 'pet-bow', name: 'Pet bow', icon: '🎀', price: 30, petAccessory: 'bow' },
  { ...pet, kind: 'petAccessory', id: 'pet-bandana', name: 'Bandana', icon: '🧣', price: 35, petAccessory: 'bandana' },
  { ...pet, kind: 'petAccessory', id: 'pet-partyhat', name: 'Party hat', icon: '🥳', price: 40, petAccessory: 'partyhat' },
  { ...pet, kind: 'petAccessory', id: 'pet-glasses', name: 'Tiny glasses', icon: '🤓', price: 45, petAccessory: 'glasses' },
  { ...pet, kind: 'petAccessory', id: 'pet-crown', name: 'Pet crown', icon: '👑', price: 80, petAccessory: 'crown' },
  { ...pet, kind: 'petColor', id: 'petcolor-galaxy', name: 'Galaxy purple fur', icon: '🌌', price: 60, color: '#6b4fc8' },
  { ...pet, kind: 'petColor', id: 'petcolor-candy', name: 'Candy pink fur', icon: '🍭', price: 60, color: '#f59ac0' },
  { ...pet, kind: 'petColor', id: 'petcolor-gold', name: 'Golden fur', icon: '🌟', price: 90, color: '#f2c94c' },
];

export const shopItem = (id: string) => SHOP_ITEMS.find((i) => i.id === id);

/** Free pet accessory everyone has. */
export const FREE_PET_ACCESSORIES: PetAccessory[] = ['none', 'collar'];

/** The shop item that unlocks an exclusive avatar style, if it is one. */
export function exclusiveFor(kind: 'hair' | 'outfit' | 'accessory', value: string) {
  return SHOP_ITEMS.find((i) => i.kind === kind && (i as unknown as Record<string, string>)[kind] === value);
}

/** What a student has chosen for one room: wall paint, floor and decorations (shop item ids). */
export interface RoomStyle {
  wall?: string;
  floor?: string;
  decor?: string[];
}

/** The room with the student's paint and floor on top of its own theme. */
export function styledRoom(room: RoomDefinition, style: RoomStyle | undefined): RoomDefinition {
  if (!style) return room;
  const wall = style.wall ? shopItem(style.wall) : undefined;
  const floor = style.floor ? shopItem(style.floor) : undefined;
  const theme = { ...room.theme };
  if (wall?.kind === 'wall') Object.assign(theme, { wall: wall.wall, wallLower: wall.wallLower });
  if (floor?.kind === 'floor') Object.assign(theme, { floor: floor.floor, floorStyle: floor.floorStyle });
  return { ...room, theme };
}
