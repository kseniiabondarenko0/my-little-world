import type { RoomCourse } from '../types';

export const entrance: RoomCourse = {
  title: 'Mein Hauseingang',
  bins: { door: 'An der Tür', garden: 'Garten', people: 'Leute & Post', actions: 'Was du tust' },
  objects: {
    doormat: ['die Fußmatte', 'Hier putzt du dir die Schuhe ab.', 'Die Fußmatte liegt vor der Tür.'],
    letterbox: ['der Briefkasten', 'Hier kommen die Briefe hinein.', 'Im Briefkasten ist ein Brief für dich.'],
    doorbell: ['die Türklingel', 'Du drückst darauf, und es klingelt.', 'Die Türklingel macht „Ding-Dong“.'],
    'garden-bench': ['die Gartenbank', 'Eine Bank im Garten.', 'Oma sitzt auf der Gartenbank.'],
    flowerpot: ['der Blumentopf', 'Darin wachsen Blumen.', 'Im Blumentopf wächst eine rote Blume.'],
    'wheelie-bin': ['die Mülltonne', 'Eine große Tonne mit Rädern für den Müll.', 'Die Mülltonne steht neben dem Tor.'],
    'porch-light': ['die Außenlampe', 'Sie macht Licht vor der Haustür.', 'Am Abend ist die Außenlampe an.'],
    'house-number': ['die Hausnummer', 'Sie zeigt, welches Haus es ist.', 'Unsere Hausnummer ist zwölf.'],
    parcel: ['das Paket', 'Eine Kiste, die der Paketbote bringt.', 'Für dich ist ein Paket gekommen.'],
    'watering-can': ['die Gießkanne', 'Damit gießt du die Blumen.', 'Die Gießkanne ist voll Wasser.'],
    wellies: ['die Gummistiefel', 'Hohe Stiefel für Regen und Matsch.', 'Bei Regen ziehe ich Gummistiefel an.', 'pl'],
    'garden-gnome': ['der Gartenzwerg', 'Eine kleine Figur mit roter Mütze.', 'Der Gartenzwerg steht neben den Blumen.'],
  },
  words: {
    'front-door': 'die Haustür', garden: 'der Garten', street: 'die Straße', path: 'der Weg', gate: 'das Tor', fence: 'der Zaun',
    porch: 'die Veranda', doorstep: 'die Türschwelle', driveway: 'die Einfahrt', hedge: 'die Hecke', 'front-garden': 'der Vorgarten',
    letter: 'der Brief', flower: 'die Blume', visitor: 'der Besucher', postman: 'der Postbote', neighbour: 'der Nachbar',
    rubbish: 'der Müll', lock: 'das Schloss', 'delivery-driver': 'der Paketbote', soil: 'die Erde',
    'security-camera': 'die Überwachungskamera', 'motion-sensor': 'der Bewegungsmelder',
    knock: 'klopfen', 'ring-the-doorbell': 'klingeln', 'open-the-door': 'die Tür öffnen', 'water-the-plants': 'die Pflanzen gießen',
    'wipe-your-feet': 'die Füße abtreten', 'lock-the-door': 'die Tür abschließen', 'take-out-the-rubbish': 'den Müll rausbringen',
    deliver: 'liefern', 'sign-for': 'unterschreiben', greet: 'begrüßen', trim: 'stutzen',
    open: 'offen', closed: 'geschlossen', safe: 'sicher', friendly: 'freundlich', colourful: 'bunt', 'well-lit': 'gut beleuchtet',
    overgrown: 'überwuchert', 'kerb-appeal': 'der erste Eindruck',
  },
};
