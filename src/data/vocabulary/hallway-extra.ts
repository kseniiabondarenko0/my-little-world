import type { Level, VocabularyWord } from '../../types/game';

// Hallway word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (shoes, scarf, gloves, mirror...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'hallway',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const hallwayExtraWords: VocabularyWord[] = [
  // ── Places & parts ───────────────────────────────
  w('hall', 'A1', 'furniture', null, 'прихожая, холл', 'передпокій, хол'),
  w('hallway', 'A1', 'furniture', null, 'коридор, прихожая', 'коридор, передпокій'),
  w('upstairs', 'A1', 'furniture', 'stairs', 'наверху, наверх', 'нагорі, нагору'),
  w('downstairs', 'A1', 'furniture', 'stairs', 'внизу, вниз', 'внизу, вниз'),
  w('step', 'A2', 'furniture', 'stairs', 'ступенька', 'сходинка'),
  w('corridor', 'A2', 'furniture', null, 'коридор', 'коридор'),
  w('light switch', 'A2', 'furniture', null, 'выключатель', 'вимикач'),
  w('hook', 'A2', 'furniture', 'key-hook', 'крючок', 'гачок'),
  w('landing', 'B1', 'furniture', 'stairs', 'лестничная площадка', 'сходовий майданчик'),
  w('banister', 'B1', 'furniture', 'stairs', 'перила', 'поручні'),
  w('cupboard under the stairs', 'B1', 'furniture', 'stairs', 'кладовка под лестницей', 'комірка під сходами'),
  w('alcove', 'B2', 'furniture', null, 'ниша', 'ніша'),

  // ── Things ───────────────────────────────────────
  w('coat', 'A1', 'things', 'coat-stand', 'пальто', 'пальто'),
  w('jacket', 'A1', 'things', 'coat-stand', 'куртка', 'куртка'),
  w('hat', 'A1', 'things', 'coat-stand', 'шапка, шляпа', 'шапка, капелюх'),
  w('keys', 'A1', 'things', 'key-hook', 'ключи', 'ключі'),
  w('umbrella', 'A1', 'things', 'umbrella-stand', 'зонт', 'парасолька'),
  w('boots', 'A1', 'things', 'shoe-rack', 'ботинки, сапоги', 'черевики, чоботи'),
  w('helmet', 'A2', 'things', 'scooter', 'шлем', 'шолом'),
  w('raincoat', 'A2', 'things', 'coat-stand', 'плащ, дождевик', 'плащ, дощовик'),
  w('note', 'A2', 'things', 'noticeboard', 'записка', 'записка'),
  w('drawing pin', 'B1', 'things', 'noticeboard', 'кнопка', 'кнопка'),
  w('battery', 'B1', 'things', 'torch', 'батарейка', 'батарейка'),
  w('spare key', 'B1', 'things', 'key-hook', 'запасной ключ', 'запасний ключ'),
  w('shoehorn', 'B2', 'things', 'shoe-rack', 'ложка для обуви', 'ріжок для взуття'),
  w('landline', 'B2', 'things', 'telephone', 'стационарный телефон', 'стаціонарний телефон'),

  // ── Actions ──────────────────────────────────────
  w('go upstairs', 'A1', 'verbs', 'stairs', 'подниматься наверх', 'підніматися нагору'),
  w('put on', 'A1', 'verbs', 'coat-stand', 'надевать', 'надягати'),
  w('take off', 'A1', 'verbs', 'shoe-rack', 'снимать', 'знімати'),
  w('hang up', 'A2', 'verbs', 'coat-stand', 'вешать', 'вішати'),
  w('answer the phone', 'A2', 'verbs', 'telephone', 'отвечать на звонок', 'відповідати на дзвінок'),
  w('leave a message', 'A2', 'verbs', 'noticeboard', 'оставить сообщение', 'залишити повідомлення'),
  w('ring', 'A2', 'verbs', 'telephone', 'звонить', 'дзвонити'),
  w('pin', 'B1', 'verbs', 'noticeboard', 'прикалывать', 'приколювати'),
  w('trip over', 'B1', 'verbs', 'runner', 'споткнуться', 'спіткнутися'),
  w('lace up', 'B1', 'verbs', 'bench', 'зашнуровывать', 'зашнуровувати'),
  w('declutter', 'B2', 'verbs', null, 'расхламлять', 'позбуватися мотлоху'),

  // ── Describing ───────────────────────────────────
  w('long', 'A1', 'adjectives', 'runner', 'длинный', 'довгий'),
  w('narrow', 'A2', 'adjectives', null, 'узкий', 'вузький'),
  w('muddy', 'A2', 'adjectives', 'shoe-rack', 'грязный (в грязи)', 'брудний (у багнюці)'),
  w('steep', 'B1', 'adjectives', 'stairs', 'крутой', 'крутий'),
  w('draughty', 'B2', 'adjectives', null, 'со сквозняком', 'з протягом'),
  w('welcoming', 'B2', 'adjectives', null, 'гостеприимный', 'гостинний'),
];
