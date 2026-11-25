import type { Level, VocabularyWord } from '../../types/game';

// Living room word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (rug, clock, curtains, vase...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'living-room',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const livingRoomExtraWords: VocabularyWord[] = [
  // ── Room & furniture ─────────────────────────────
  w('living room', 'A1', 'furniture', null, 'гостиная', 'вітальня'),
  w('television', 'A1', 'furniture', 'tv', 'телевизор', 'телевізор'),
  w('screen', 'A2', 'furniture', 'tv', 'экран', 'екран'),
  w('TV unit', 'A2', 'furniture', 'tv', 'тумба под телевизор', 'тумба під телевізор'),
  w('mantelpiece', 'B1', 'furniture', 'fireplace', 'каминная полка', 'камінна полиця'),
  w('footstool', 'B1', 'furniture', null, 'пуфик для ног', 'пуфик для ніг'),
  w('sofa bed', 'B1', 'furniture', 'sofa', 'диван-кровать', 'диван-ліжко'),
  w('corner sofa', 'B1', 'furniture', 'sofa', 'угловой диван', 'кутовий диван'),
  w('recliner', 'B2', 'furniture', 'armchair', 'кресло с откидной спинкой', 'крісло з відкидною спинкою'),
  w('display cabinet', 'B2', 'furniture', null, 'сервант, витрина', 'сервант, вітрина'),

  // ── Things in the room ───────────────────────────
  w('magazine', 'A1', 'things', 'coffee-table', 'журнал', 'журнал'),
  w('photo', 'A1', 'things', null, 'фотография', 'фотографія'),
  w('game', 'A1', 'things', null, 'игра', 'гра'),
  w('piano keys', 'A2', 'things', 'piano', 'клавиши', 'клавіші'),
  w('board game', 'A2', 'things', 'coffee-table', 'настольная игра', 'настільна гра'),
  w('games console', 'A2', 'things', 'tv', 'игровая приставка', 'ігрова приставка'),
  w('speaker', 'A2', 'things', null, 'колонка', 'колонка'),
  w('firewood', 'B1', 'things', 'fireplace', 'дрова', 'дрова'),
  w('lampshade', 'B1', 'things', 'floor-lamp', 'абажур', 'абажур'),
  w('throw', 'B1', 'things', 'sofa', 'плед', 'плед'),
  w('ornament', 'B1', 'things', 'fireplace', 'украшение, статуэтка', 'прикраса, статуетка'),
  w('coaster', 'B2', 'things', 'coffee-table', 'подставка под чашку', 'підставка під чашку'),
  w('sheet music', 'B2', 'things', 'piano', 'ноты', 'ноти'),

  // ── Actions ──────────────────────────────────────
  w('sit down', 'A1', 'verbs', 'sofa', 'садиться', 'сідати'),
  w('watch TV', 'A1', 'verbs', 'tv', 'смотреть телевизор', 'дивитися телевізор'),
  w('read', 'A1', 'verbs', 'bookcase', 'читать', 'читати'),
  w('play the piano', 'A1', 'verbs', 'piano', 'играть на пианино', 'грати на піаніно'),
  w('relax', 'A2', 'verbs', 'armchair', 'отдыхать', 'відпочивати'),
  w('turn on', 'A2', 'verbs', 'floor-lamp', 'включать', 'вмикати'),
  w('turn off', 'A2', 'verbs', 'tv', 'выключать', 'вимикати'),
  w('switch channels', 'B1', 'verbs', 'remote', 'переключать каналы', 'перемикати канали'),
  w('light a fire', 'B1', 'verbs', 'fireplace', 'разжечь огонь', 'розпалити вогонь'),
  w('curl up', 'B1', 'verbs', 'beanbag', 'свернуться калачиком', 'згорнутися клубочком'),
  w('entertain guests', 'B2', 'verbs', null, 'принимать гостей', 'приймати гостей'),
  w('binge-watch', 'B2', 'verbs', 'tv', 'смотреть запоем', 'дивитися запоєм'),

  // ── Describing ───────────────────────────────────
  w('comfortable', 'A1', 'adjectives', 'armchair', 'удобный', 'зручний'),
  w('big', 'A1', 'adjectives', null, 'большой', 'великий'),
  w('small', 'A1', 'adjectives', null, 'маленький', 'маленький'),
  w('noisy', 'A2', 'adjectives', null, 'шумный', 'галасливий'),
  w('quiet', 'A2', 'adjectives', null, 'тихий', 'тихий'),
  w('bright', 'A2', 'adjectives', 'floor-lamp', 'светлый, яркий', 'світлий, яскравий'),
  w('dark', 'A2', 'adjectives', null, 'тёмный', 'темний'),
  w('crowded', 'B1', 'adjectives', null, 'тесный, заставленный', 'тісний, заставлений'),
  w('open-plan', 'B2', 'adjectives', null, 'со свободной планировкой', 'з відкритим плануванням'),
  w('inviting', 'B2', 'adjectives', null, 'уютный, манящий', 'затишний, привабливий'),
];
