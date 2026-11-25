import type { RoomCourse } from '../types';

export const hospital: RoomCourse = {
  title: 'Mein Krankenhaus',
  bins: { equipment: 'Ausrüstung', health: 'Körper & Gesundheit', people: 'Menschen & Orte', actions: 'Was du tust' },
  objects: {
    'hospital-bed': ['das Krankenbett', 'Ein Bett für Kranke im Krankenhaus.', 'Der Patient liegt im Krankenbett.'],
    wheelchair: ['der Rollstuhl', 'Ein Stuhl mit großen Rädern.', 'Die Krankenschwester schiebt den Rollstuhl.'],
    'drip-stand': ['der Infusionsständer', 'Daran hängt die Infusion.', 'Der Infusionsständer steht neben dem Bett.'],
    'medical-trolley': ['der Pflegewagen', 'Ein Wagen mit Medikamenten und Verbänden.', 'Die Medikamente sind auf dem Pflegewagen.'],
    crutches: ['die Krücken', 'Sie helfen dir beim Gehen, wenn dein Bein verletzt ist.', 'Nach dem Unfall gehe ich mit Krücken.', 'pl'],
    stethoscope: ['das Stethoskop', 'Damit hört die Ärztin dein Herz.', 'Die Ärztin hat ein Stethoskop.'],
    thermometer: ['das Fieberthermometer', 'Es misst deine Temperatur.', 'Das Fieberthermometer zeigt 38 Grad.'],
    bandage: ['der Verband', 'Er kommt um eine Wunde.', 'Ich habe einen Verband am Arm.'],
    syringe: ['die Spritze', 'Damit bekommst du eine Impfung.', 'Die Krankenschwester hat eine Spritze.'],
    'heart-monitor': ['der Herzmonitor', 'Er zeigt, wie dein Herz schlägt.', 'Der Herzmonitor piept leise.'],
    'x-ray': ['das Röntgenbild', 'Ein Bild von deinen Knochen.', 'Auf dem Röntgenbild sieht man den Knochen.'],
    'eye-chart': ['die Sehtafel', 'Eine Tafel mit Buchstaben für den Augentest.', 'Ich lese die Buchstaben auf der Sehtafel.'],
  },
  words: {
    hospital: 'das Krankenhaus', doctor: 'der Arzt', nurse: 'die Krankenschwester', patient: 'der Patient',
    ambulance: 'der Krankenwagen', 'waiting-room': 'das Wartezimmer', pharmacy: 'die Apotheke', ward: 'die Station',
    surgeon: 'der Chirurg', emergency: 'der Notfall', medicine: 'das Medikament', pill: 'die Tablette',
    headache: 'die Kopfschmerzen', 'stomach-ache': 'die Bauchschmerzen', 'sore-throat': 'die Halsschmerzen', cough: 'der Husten',
    fever: 'das Fieber', flu: 'die Grippe', temperature: 'die Temperatur', heart: 'das Herz', bone: 'der Knochen', blood: 'das Blut',
    injection: 'die Injektion', appointment: 'der Termin', prescription: 'das Rezept', operation: 'die Operation',
    symptom: 'das Symptom', eyesight: 'die Sehkraft', heartbeat: 'der Herzschlag', diagnosis: 'die Diagnose',
    hurt: 'wehtun', help: 'helfen', 'feel-better': 'sich besser fühlen', 'break-your-leg': 'sich das Bein brechen',
    'take-medicine': 'Medikamente nehmen', examine: 'untersuchen', recover: 'gesund werden', sprain: 'sich verstauchen',
    ill: 'krank', well: 'wohlauf', painful: 'schmerzhaft', serious: 'ernst', allergic: 'allergisch', infectious: 'ansteckend',
  },
};
