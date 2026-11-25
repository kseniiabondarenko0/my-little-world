import type { Level, VocabularyWord } from '../../types/game';

// Kitchen word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (window, door, glass, clean...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'kitchen',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const kitchenExtraWords: VocabularyWord[] = [
  // ── Kitchen & appliances ─────────────────────────
  w('kitchen', 'A1', 'furniture', null, 'кухня', 'кухня'),
  w('oven', 'A1', 'furniture', 'cooker', 'духовка', 'духовка'),
  w('freezer', 'A2', 'furniture', 'fridge', 'морозилка', 'морозилка'),
  w('tap', 'A2', 'furniture', 'sink', 'кран', 'кран'),
  w('worktop', 'B1', 'furniture', 'sink', 'столешница', 'стільниця'),
  w('hob', 'B1', 'furniture', 'cooker', 'варочная панель', 'варильна поверхня'),
  w('extractor fan', 'B2', 'furniture', 'cooker', 'вытяжка', 'витяжка'),
  w('blender', 'A2', 'furniture', null, 'блендер', 'блендер'),
  w('coffee machine', 'A2', 'furniture', null, 'кофемашина', 'кавоварка'),
  w('pantry', 'B2', 'furniture', 'cupboard', 'кладовая', 'комора'),
  w('tea towel', 'B1', 'furniture', 'sink', 'кухонное полотенце', 'кухонний рушник'),
  w('recycling bin', 'B1', 'furniture', 'bin', 'контейнер для переработки', 'контейнер для сортування сміття'),

  // ── Kitchenware ──────────────────────────────────
  w('plate', 'A1', 'kitchenware', 'cupboard', 'тарелка', 'тарілка'),
  w('cup', 'A1', 'kitchenware', 'cupboard', 'чашка', 'чашка'),
  w('mug', 'A1', 'kitchenware', 'kettle', 'кружка', 'кухоль'),
  w('bowl', 'A1', 'kitchenware', 'cupboard', 'миска', 'миска'),
  w('fork', 'A1', 'kitchenware', 'table', 'вилка', 'виделка'),
  w('knife', 'A1', 'kitchenware', 'table', 'нож', 'ніж'),
  w('spoon', 'A1', 'kitchenware', 'table', 'ложка', 'ложка'),
  w('pan', 'A2', 'kitchenware', 'cooker', 'сковорода', 'сковорідка'),
  w('saucepan', 'A2', 'kitchenware', 'cooker', 'кастрюля', 'каструля'),
  w('teapot', 'A2', 'kitchenware', 'kettle', 'заварочный чайник', 'заварник'),
  w('napkin', 'A2', 'kitchenware', 'table', 'салфетка', 'серветка'),
  w('tray', 'A2', 'kitchenware', null, 'поднос', 'тація'),
  w('chopping board', 'B1', 'kitchenware', null, 'разделочная доска', 'обробна дошка'),
  w('cutlery', 'B1', 'kitchenware', 'table', 'столовые приборы', 'столові прибори'),
  w('jar', 'B1', 'kitchenware', 'cupboard', 'банка', 'банка'),
  w('dishes', 'A2', 'kitchenware', 'dishwasher', 'посуда', 'посуд'),
  w('ladle', 'B2', 'kitchenware', 'cooker', 'половник', 'черпак'),
  w('whisk', 'B2', 'kitchenware', null, 'венчик', 'віночок'),
  w('baking tray', 'B2', 'kitchenware', 'cooker', 'противень', 'деко'),

  // ── Food & drink ─────────────────────────────────
  w('bread', 'A1', 'food', 'toaster', 'хлеб', 'хліб'),
  w('milk', 'A1', 'food', 'fridge', 'молоко', 'молоко'),
  w('egg', 'A1', 'food', 'fridge', 'яйцо', 'яйце'),
  w('cheese', 'A1', 'food', 'fridge', 'сыр', 'сир'),
  w('butter', 'A1', 'food', 'fridge', 'сливочное масло', 'вершкове масло'),
  w('apple', 'A1', 'food', null, 'яблоко', 'яблуко'),
  w('banana', 'A1', 'food', null, 'банан', 'банан'),
  w('water', 'A1', 'food', 'kettle', 'вода', 'вода'),
  w('tea', 'A1', 'food', 'kettle', 'чай', 'чай'),
  w('juice', 'A1', 'food', 'fridge', 'сок', 'сік'),
  w('soup', 'A1', 'food', 'cooker', 'суп', 'суп'),
  w('rice', 'A2', 'food', 'cupboard', 'рис', 'рис'),
  w('pasta', 'A2', 'food', 'cupboard', 'макароны', 'макарони'),
  w('flour', 'A2', 'food', 'cupboard', 'мука', 'борошно'),
  w('sugar', 'A2', 'food', 'cupboard', 'сахар', 'цукор'),
  w('salt', 'A2', 'food', 'cupboard', 'соль', 'сіль'),
  w('vegetables', 'A2', 'food', 'fridge', 'овощи', 'овочі'),
  w('toast', 'A2', 'food', 'toaster', 'тост', 'тост'),
  w('leftovers', 'B1', 'food', 'microwave', 'остатки еды', 'залишки їжі'),
  w('frozen food', 'B1', 'food', 'fridge', 'замороженные продукты', 'заморожені продукти'),
  w('ingredients', 'B1', 'food', null, 'ингредиенты', 'інгредієнти'),
  w('spices', 'B1', 'food', 'cupboard', 'специи', 'спеції'),
  w('dairy products', 'B2', 'food', 'fridge', 'молочные продукты', 'молочні продукти'),

  // ── Kitchen actions ──────────────────────────────
  w('cook', 'A1', 'verbs', 'cooker', 'готовить', 'готувати'),
  w('eat', 'A1', 'verbs', 'table', 'есть', 'їсти'),
  w('drink', 'A1', 'verbs', null, 'пить', 'пити'),
  w('wash up', 'A2', 'verbs', 'sink', 'мыть посуду', 'мити посуд'),
  w('boil', 'A2', 'verbs', 'kettle', 'кипятить', 'кип’ятити'),
  w('cut', 'A2', 'verbs', null, 'резать', 'різати'),
  w('heat up', 'A2', 'verbs', 'microwave', 'разогревать', 'розігрівати'),
  w('lay the table', 'A2', 'verbs', 'table', 'накрывать на стол', 'накривати на стіл'),
  w('clear the table', 'B1', 'verbs', 'table', 'убирать со стола', 'прибирати зі столу'),
  w('fry', 'B1', 'verbs', 'cooker', 'жарить', 'смажити'),
  w('bake', 'B1', 'verbs', 'cooker', 'печь', 'пекти'),
  w('stir', 'B1', 'verbs', null, 'помешивать', 'помішувати'),
  w('peel', 'B1', 'verbs', null, 'чистить (овощи)', 'чистити (овочі)'),
  w('load the dishwasher', 'B1', 'verbs', 'dishwasher', 'загружать посудомойку', 'завантажувати посудомийку'),
  w('throw away', 'A2', 'verbs', 'bin', 'выбрасывать', 'викидати'),
  w('defrost', 'B2', 'verbs', 'microwave', 'размораживать', 'розморожувати'),
  w('simmer', 'B2', 'verbs', 'cooker', 'тушить на медленном огне', 'тушкувати на малому вогні'),
  w('recycle', 'B2', 'verbs', 'bin', 'перерабатывать', 'переробляти'),

  // ── Describing ───────────────────────────────────
  w('hot', 'A1', 'adjectives', null, 'горячий', 'гарячий'),
  w('cold', 'A1', 'adjectives', 'fridge', 'холодный', 'холодний'),
  w('hungry', 'A1', 'adjectives', null, 'голодный', 'голодний'),
  w('delicious', 'A2', 'adjectives', null, 'вкусный', 'смачний'),
  w('dirty', 'A2', 'adjectives', 'sink', 'грязный', 'брудний'),
  w('fresh', 'A2', 'adjectives', 'fridge', 'свежий', 'свіжий'),
  w('empty', 'A2', 'adjectives', null, 'пустой', 'порожній'),
  w('full', 'A2', 'adjectives', null, 'полный', 'повний'),
  w('sticky', 'B1', 'adjectives', null, 'липкий', 'липкий'),
  w('out of date', 'B1', 'adjectives', 'fridge', 'просроченный', 'прострочений'),
  w('healthy', 'B1', 'adjectives', null, 'полезный (для здоровья)', 'корисний (для здоров’я)'),
  w('hygienic', 'B2', 'adjectives', 'sink', 'гигиеничный', 'гігієнічний'),
  w('energy-efficient', 'B2', 'adjectives', 'dishwasher', 'энергоэффективный', 'енергоефективний'),
  w('perishable', 'B2', 'adjectives', 'fridge', 'скоропортящийся', 'швидкопсувний'),
];
