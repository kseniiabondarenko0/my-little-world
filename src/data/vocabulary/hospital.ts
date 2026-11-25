import type { VocabularyWord } from '../../types/game';

// Hospital: the main word of each 3D object (A1/A2). These are taught in the unlock lessons.
// More hospital words (A1–B2) are in hospital-extra.ts.
// translations: uk = Ukrainian, ru = Russian (used by the Translate activity).

function main(id: string, word: string, level: 'A1' | 'A2', definition: string, example: string, uk: string, ru: string): VocabularyWord {
  return { id, objectId: id, word, level, topic: 'hospital', category: 'furniture', definition, example, translations: { uk, ru } };
}

export const hospitalWords: VocabularyWord[] = [
  main('hospital-bed', 'hospital bed', 'A1', 'A bed with wheels where patients sleep in hospital.', 'The patient is resting in the hospital bed.', 'лікарняне ліжко', 'больничная кровать'),
  main('wheelchair', 'wheelchair', 'A2', 'A chair with big wheels for people who can’t walk.', 'The nurse pushes the wheelchair to the lift.', 'інвалідний візок', 'инвалидная коляска'),
  main('drip-stand', 'drip stand', 'A2', 'A tall pole that holds a bag of medicine going into your arm.', 'The drip stand is next to the bed.', 'стійка для крапельниці', 'стойка для капельницы'),
  main('medical-trolley', 'medical trolley', 'A2', 'A small table on wheels for the nurse’s things.', 'The bandages are on the medical trolley.', 'медичний візок', 'медицинская тележка'),
  main('crutches', 'crutches', 'A2', 'Two sticks that help you walk when your leg is hurt.', 'He broke his leg, so he walks with crutches.', 'милиці', 'костыли'),
  main('stethoscope', 'stethoscope', 'A2', 'The thing a doctor uses to listen to your heart.', 'The doctor listens to my heart with a stethoscope.', 'стетоскоп', 'стетоскоп'),
  main('thermometer', 'thermometer', 'A2', 'A thing that tells you your temperature.', 'The thermometer says 38 degrees — you have a fever.', 'термометр, градусник', 'термометр, градусник'),
  main('bandage', 'bandage', 'A2', 'A long piece of cloth that you put round a cut or a hurt arm.', 'The nurse puts a bandage on my arm.', 'бинт, пов’язка', 'бинт, повязка'),
  main('syringe', 'syringe', 'A2', 'A small tube with a needle for giving injections.', 'Don’t worry, the syringe is very small.', 'шприц', 'шприц'),
  main('heart-monitor', 'heart monitor', 'A2', 'A machine with a screen that shows how your heart is beating.', 'The heart monitor goes beep, beep, beep.', 'кардіомонітор', 'кардиомонитор'),
  main('x-ray', 'X-ray', 'A2', 'A picture of the inside of your body, like your bones.', 'The X-ray shows that the arm is broken.', 'рентгенівський знімок', 'рентгеновский снимок'),
  main('eye-chart', 'eye chart', 'A2', 'A chart with letters that get smaller, for testing your eyes.', 'Read the smallest letters on the eye chart.', 'таблиця для перевірки зору', 'таблица для проверки зрения'),
];
