import type { Level, VocabularyWord } from '../../types/game';

// Bathroom word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (mirror, tap, clean, hot...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'bathroom',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const bathroomExtraWords: VocabularyWord[] = [
  // ── Bathroom & fittings ──────────────────────────
  w('bathroom', 'A1', 'furniture', null, 'ванная комната', 'ванна кімната'),
  w('towel rail', 'A2', 'furniture', 'towel', 'вешалка для полотенец', 'тримач для рушників'),
  w('shower curtain', 'A2', 'furniture', 'shower', 'шторка для душа', 'шторка для душу'),
  w('plug', 'A2', 'furniture', 'bath', 'пробка', 'пробка'),
  w('tiles', 'B1', 'furniture', null, 'плитка', 'плитка'),
  w('radiator', 'B1', 'furniture', null, 'батарея', 'батарея'),
  w('drain', 'B1', 'furniture', 'shower', 'слив', 'злив'),
  w('medicine cabinet', 'B1', 'furniture', 'cabinet', 'аптечка', 'аптечка'),
  w('en-suite', 'B2', 'furniture', null, 'ванная при спальне', 'ванна кімната при спальні'),
  w('extractor', 'B2', 'furniture', null, 'вытяжной вентилятор', 'витяжний вентилятор'),

  // ── Toiletries & things ──────────────────────────
  w('toothpaste', 'A1', 'toiletries', 'toothbrush', 'зубная паста', 'зубна паста'),
  w('shampoo', 'A1', 'toiletries', null, 'шампунь', 'шампунь'),
  w('toilet paper', 'A1', 'toiletries', 'toilet', 'туалетная бумага', 'туалетний папір'),
  w('comb', 'A1', 'toiletries', null, 'расчёска', 'гребінець'),
  w('sponge', 'A2', 'toiletries', 'bath', 'губка', 'губка'),
  w('shower gel', 'A2', 'toiletries', 'shower', 'гель для душа', 'гель для душу'),
  w('conditioner', 'A2', 'toiletries', null, 'бальзам для волос', 'бальзам для волосся'),
  w('bubble bath', 'A2', 'toiletries', 'bath', 'пена для ванны', 'піна для ванни'),
  w('bathrobe', 'A2', 'toiletries', null, 'банный халат', 'банний халат'),
  w('razor', 'B1', 'toiletries', null, 'бритва', 'бритва'),
  w('deodorant', 'B1', 'toiletries', null, 'дезодорант', 'дезодорант'),
  w('plaster', 'B1', 'toiletries', 'cabinet', 'пластырь', 'пластир'),
  w('dental floss', 'B1', 'toiletries', 'toothbrush', 'зубная нить', 'зубна нитка'),
  w('nail clippers', 'B1', 'toiletries', null, 'кусачки для ногтей', 'щипчики для нігтів'),
  w('washing powder', 'B1', 'toiletries', 'washing-machine', 'стиральный порошок', 'пральний порошок'),
  w('toiletries', 'B2', 'toiletries', null, 'туалетные принадлежности', 'засоби гігієни'),
  w('first-aid kit', 'B2', 'toiletries', 'cabinet', 'аптечка первой помощи', 'аптечка першої допомоги'),
  w('fabric softener', 'B2', 'toiletries', 'washing-machine', 'кондиционер для белья', 'кондиціонер для білизни'),

  // ── Actions ──────────────────────────────────────
  w('wash', 'A1', 'verbs', 'washbasin', 'мыть', 'мити'),
  w('brush your teeth', 'A1', 'verbs', 'toothbrush', 'чистить зубы', 'чистити зуби'),
  w('have a shower', 'A1', 'verbs', 'shower', 'принимать душ', 'приймати душ'),
  w('have a bath', 'A1', 'verbs', 'bath', 'принимать ванну', 'приймати ванну'),
  w('wash your hands', 'A1', 'verbs', 'soap', 'мыть руки', 'мити руки'),
  w('dry', 'A2', 'verbs', 'towel', 'сушить, вытирать', 'сушити, витирати'),
  w('dry your hair', 'A2', 'verbs', 'hairdryer', 'сушить волосы', 'сушити волосся'),
  w('brush your hair', 'A2', 'verbs', null, 'расчёсывать волосы', 'розчісувати волосся'),
  w('flush', 'A2', 'verbs', 'toilet', 'смывать', 'змивати'),
  w('do the laundry', 'A2', 'verbs', 'washing-machine', 'стирать бельё', 'прати білизну'),
  w('rinse', 'B1', 'verbs', 'washbasin', 'полоскать', 'полоскати'),
  w('shave', 'B1', 'verbs', null, 'бриться', 'голитися'),
  w('scrub', 'B1', 'verbs', 'bath', 'тереть, чистить щёткой', 'терти, чистити щіткою'),
  w('weigh', 'B1', 'verbs', 'scales', 'взвешивать', 'зважувати'),
  w('soak', 'B2', 'verbs', 'bath', 'отмачивать, лежать в воде', 'замочувати, лежати у воді'),
  w('unblock', 'B2', 'verbs', 'washbasin', 'прочищать', 'прочищати'),

  // ── Describing ───────────────────────────────────
  w('wet', 'A1', 'adjectives', null, 'мокрый', 'мокрий'),
  w('warm', 'A1', 'adjectives', null, 'тёплый', 'теплий'),
  w('slippery', 'B1', 'adjectives', 'bath-mat', 'скользкий', 'слизький'),
  w('steamy', 'B1', 'adjectives', 'shower', 'запотевший, полный пара', 'запарений, повний пари'),
  w('blocked', 'B1', 'adjectives', 'washbasin', 'засорённый', 'засмічений'),
  w('leaking', 'B1', 'adjectives', null, 'протекающий', 'що протікає'),
  w('mouldy', 'B2', 'adjectives', null, 'заплесневелый', 'запліснявілий'),
  w('waterproof', 'B2', 'adjectives', null, 'водонепроницаемый', 'водонепроникний'),
  w('limescale', 'B2', 'toiletries', 'washbasin', 'известковый налёт', 'вапняний наліт'),
  w('well-ventilated', 'B2', 'adjectives', null, 'хорошо проветриваемый', 'добре провітрюваний'),
];
