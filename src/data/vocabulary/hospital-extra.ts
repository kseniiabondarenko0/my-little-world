import type { Level, VocabularyWord } from '../../types/game';

// Hospital word bank, A1–B2. One row = one word:
//
//   w('English', 'level', 'category', 'linked 3D object or null', 'Russian', 'Ukrainian')
//
// Same rules as bedroom-extra.ts. Word ids are made from the English word, so a word that
// already exists in another room (plaster, first aid kit, scales, cold...) must NOT be added again here.

function w(word: string, level: Level, category: string, objectId: string | null, ru: string, uk: string): VocabularyWord {
  return {
    id: word.toLowerCase().replace(/[^a-z]+/g, '-'),
    word,
    level,
    topic: 'hospital',
    category,
    objectId: objectId ?? undefined,
    translations: { ru, uk },
  };
}

export const hospitalExtraWords: VocabularyWord[] = [
  // ── Places & people ──────────────────────────────
  w('hospital', 'A1', 'places', 'hospital-bed', 'больница', 'лікарня'),
  w('doctor', 'A1', 'people', 'stethoscope', 'врач', 'лікар'),
  w('nurse', 'A1', 'people', 'medical-trolley', 'медсестра', 'медсестра'),
  w('patient', 'A2', 'people', 'hospital-bed', 'пациент', 'пацієнт'),
  w('ambulance', 'A2', 'things', null, 'скорая помощь', 'швидка допомога'),
  w('waiting room', 'A2', 'places', null, 'зал ожидания', 'зала очікування'),
  w('pharmacy', 'A2', 'places', null, 'аптека', 'аптека'),
  w('ward', 'B1', 'places', 'hospital-bed', 'палата, отделение', 'палата, відділення'),
  w('surgeon', 'B1', 'people', null, 'хирург', 'хірург'),
  w('emergency', 'B1', 'things', null, 'неотложный случай', 'невідкладний випадок'),

  // ── Body & health ────────────────────────────────
  w('medicine', 'A1', 'things', 'medical-trolley', 'лекарство', 'ліки'),
  w('pill', 'A2', 'things', 'medical-trolley', 'таблетка', 'пігулка'),
  w('headache', 'A1', 'health', null, 'головная боль', 'головний біль'),
  w('stomach ache', 'A2', 'health', null, 'боль в животе', 'біль у животі'),
  w('sore throat', 'A2', 'health', null, 'боль в горле', 'біль у горлі'),
  w('cough', 'A2', 'health', null, 'кашель', 'кашель'),
  w('fever', 'A2', 'health', 'thermometer', 'жар, температура', 'жар, температура'),
  w('flu', 'A2', 'health', null, 'грипп', 'грип'),
  w('temperature', 'A2', 'health', 'thermometer', 'температура', 'температура'),
  w('heart', 'A1', 'health', 'heart-monitor', 'сердце', 'серце'),
  w('bone', 'A2', 'health', 'x-ray', 'кость', 'кістка'),
  w('blood', 'A2', 'health', 'syringe', 'кровь', 'кров'),
  w('injection', 'B1', 'things', 'syringe', 'укол', 'укол'),
  w('appointment', 'B1', 'things', null, 'запись (на приём)', 'запис (на прийом)'),
  w('prescription', 'B1', 'things', null, 'рецепт', 'рецепт'),
  w('operation', 'B1', 'things', null, 'операция', 'операція'),
  w('symptom', 'B1', 'health', null, 'симптом', 'симптом'),
  w('eyesight', 'B1', 'health', 'eye-chart', 'зрение', 'зір'),
  w('heartbeat', 'B2', 'health', 'heart-monitor', 'сердцебиение', 'серцебиття'),
  w('diagnosis', 'B2', 'things', 'x-ray', 'диагноз', 'діагноз'),

  // ── Actions ──────────────────────────────────────
  w('hurt', 'A1', 'verbs', null, 'болеть, ушибить', 'боліти, забити'),
  w('help', 'A1', 'verbs', null, 'помогать', 'допомагати'),
  w('feel better', 'A2', 'verbs', null, 'чувствовать себя лучше', 'почуватися краще'),
  w('break your leg', 'A2', 'verbs', 'crutches', 'сломать ногу', 'зламати ногу'),
  w('take medicine', 'A2', 'verbs', null, 'принимать лекарство', 'приймати ліки'),
  w('examine', 'B1', 'verbs', 'stethoscope', 'осматривать', 'оглядати'),
  w('recover', 'B1', 'verbs', 'hospital-bed', 'выздоравливать', 'одужувати'),
  w('sprain', 'B2', 'verbs', 'bandage', 'растянуть (связки)', 'розтягнути (зв’язки)'),

  // ── Describing ───────────────────────────────────
  w('ill', 'A1', 'adjectives', 'hospital-bed', 'больной', 'хворий'),
  w('well', 'A1', 'adjectives', null, 'здоровый, хорошо', 'здоровий, добре'),
  w('painful', 'A2', 'adjectives', null, 'болезненный', 'болісний'),
  w('serious', 'B1', 'adjectives', null, 'серьёзный', 'серйозний'),
  w('allergic', 'B1', 'adjectives', null, 'аллергический', 'алергічний'),
  w('infectious', 'B2', 'adjectives', null, 'заразный', 'заразний'),
];
