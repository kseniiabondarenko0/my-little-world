import type { Level, VocabularyWord } from '../../types/game';

// Basement word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (storage box, cold, dark, dust...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'basement',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const basementExtraWords: VocabularyWord[] = [
  // ── Places & parts ───────────────────────────────
  w('basement', 'A1', 'furniture', null, 'подвал', 'підвал'),
  w('cellar', 'A2', 'furniture', null, 'погреб, подвал', 'льох, підвал'),
  w('pipe', 'A2', 'furniture', 'boiler', 'труба', 'труба'),
  w('light bulb', 'A2', 'furniture', null, 'лампочка', 'лампочка'),
  w('stepladder', 'B1', 'furniture', 'ladder', 'стремянка', 'драбина-стрем’янка'),
  w('storeroom', 'B1', 'furniture', null, 'кладовая', 'комора'),
  w('water heater', 'B2', 'furniture', 'boiler', 'водонагреватель', 'водонагрівач'),

  // ── Tools & things ───────────────────────────────
  w('hammer', 'A1', 'tools', 'toolbox', 'молоток', 'молоток'),
  w('tool', 'A1', 'tools', 'toolbox', 'инструмент', 'інструмент'),
  w('screwdriver', 'A2', 'tools', 'toolbox', 'отвёртка', 'викрутка'),
  w('nail', 'A2', 'tools', 'toolbox', 'гвоздь', 'цвях'),
  w('saw', 'A2', 'tools', 'workbench', 'пила', 'пилка'),
  w('paintbrush', 'A2', 'tools', 'paint', 'кисть', 'пензель'),
  w('mop', 'A2', 'tools', 'bucket', 'швабра', 'швабра'),
  w('dustpan', 'A2', 'tools', 'broom', 'совок', 'совок'),
  w('spider', 'A1', 'tools', null, 'паук', 'павук'),
  w('screw', 'B1', 'tools', 'toolbox', 'шуруп', 'шуруп'),
  w('drill', 'B1', 'tools', 'workbench', 'дрель', 'дриль'),
  w('tape measure', 'B1', 'tools', 'toolbox', 'рулетка', 'рулетка'),
  w('spanner', 'B1', 'tools', 'toolbox', 'гаечный ключ', 'гайковий ключ'),
  w('tyre', 'B1', 'tools', 'bicycle', 'шина', 'шина'),
  w('pump', 'B1', 'tools', 'bicycle', 'насос', 'насос'),
  w('cobweb', 'B1', 'tools', null, 'паутина', 'павутиння'),
  w('fuse', 'B2', 'tools', 'fuse-box', 'предохранитель', 'запобіжник'),
  w('power tool', 'B2', 'tools', 'workbench', 'электроинструмент', 'електроінструмент'),

  // ── Actions ──────────────────────────────────────
  w('fix', 'A1', 'verbs', 'workbench', 'чинить', 'лагодити'),
  w('ride a bike', 'A1', 'verbs', 'bicycle', 'кататься на велосипеде', 'кататися на велосипеді'),
  w('climb', 'A2', 'verbs', 'ladder', 'залезать', 'залазити'),
  w('sweep', 'A2', 'verbs', 'broom', 'подметать', 'підмітати'),
  w('paint the wall', 'A2', 'verbs', 'paint', 'красить стену', 'фарбувати стіну'),
  w('repair', 'B1', 'verbs', 'workbench', 'ремонтировать', 'ремонтувати'),
  w('label', 'B1', 'verbs', 'cardboard-box', 'подписывать, маркировать', 'підписувати, маркувати'),
  w('pump up', 'B1', 'verbs', 'bicycle', 'накачивать', 'накачувати'),
  w('sort out', 'B1', 'verbs', 'shelving', 'разбирать', 'розбирати'),
  w('get rid of', 'B2', 'verbs', 'cardboard-box', 'избавляться от', 'позбуватися'),
  w('insulate', 'B2', 'verbs', 'boiler', 'утеплять', 'утеплювати'),

  // ── Describing ───────────────────────────────────
  w('heavy', 'A1', 'adjectives', 'toolbox', 'тяжёлый', 'важкий'),
  w('broken', 'A1', 'adjectives', null, 'сломанный', 'зламаний'),
  w('scary', 'A2', 'adjectives', null, 'страшный', 'страшний'),
  w('dusty', 'A2', 'adjectives', 'shelving', 'пыльный', 'запилений'),
  w('damp', 'B1', 'adjectives', null, 'сырой', 'вологий'),
  w('rusty', 'B1', 'adjectives', 'bicycle', 'ржавый', 'іржавий'),
  w('sharp', 'B1', 'adjectives', 'toolbox', 'острый', 'гострий'),
  w('flammable', 'B2', 'adjectives', 'paint', 'легковоспламеняющийся', 'легкозаймистий'),
  w('poorly lit', 'B2', 'adjectives', null, 'плохо освещённый', 'погано освітлений'),
];
