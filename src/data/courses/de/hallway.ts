import type { RoomCourse } from '../types';

export const hallway: RoomCourse = {
  title: 'Mein Flur',
  bins: { furniture: 'Möbel', wear: 'Zum Anziehen', things: 'Nützliche Dinge', actions: 'Was du tust' },
  objects: {
    'coat-stand': ['der Garderobenständer', 'Daran hängst du Mäntel und Jacken.', 'Meine Jacke hängt am Garderobenständer.'],
    'shoe-rack': ['das Schuhregal', 'Ein Regal für Schuhe.', 'Stell deine Schuhe ins Schuhregal.'],
    stairs: ['die Treppe', 'Damit gehst du nach oben.', 'Die Treppe führt zum Schlafzimmer.'],
    'hall-table': ['der Flurtisch', 'Ein schmaler Tisch im Flur.', 'Die Post liegt auf dem Flurtisch.'],
    'umbrella-stand': ['der Schirmständer', 'Hier stehen nasse Regenschirme.', 'Mein Regenschirm ist im Schirmständer.'],
    bench: ['die Bank', 'Hier sitzt du und ziehst die Schuhe an.', 'Ich sitze auf der Bank und ziehe die Stiefel an.'],
    'key-hook': ['das Schlüsselbrett', 'Hier hängen die Schlüssel.', 'Die Schlüssel hängen am Schlüsselbrett.'],
    noticeboard: ['die Pinnwand', 'Daran hängen Notizen und Zettel.', 'An der Pinnwand hängt ein Zettel von Mama.'],
    runner: ['der Läufer', 'Ein langer, schmaler Teppich im Flur.', 'Der Läufer liegt im ganzen Flur.'],
    telephone: ['das Telefon', 'Damit rufst du jemanden an.', 'Das Telefon klingelt!'],
    torch: ['die Taschenlampe', 'Eine kleine Lampe für dunkle Orte.', 'Im Keller brauche ich eine Taschenlampe.'],
    scooter: ['der Roller', 'Damit fährst du schnell zur Schule.', 'Mein Roller steht im Flur.'],
  },
  words: {
    hall: 'die Diele', hallway: 'der Flur', upstairs: 'oben', downstairs: 'unten', step: 'die Stufe', corridor: 'der Gang',
    'light-switch': 'der Lichtschalter', hook: 'der Haken', landing: 'der Treppenabsatz', banister: 'das Geländer',
    'cupboard-under-the-stairs': 'die Abstellkammer unter der Treppe', alcove: 'die Nische',
    coat: 'der Mantel', jacket: 'die Jacke', hat: 'der Hut', keys: 'die Schlüssel', umbrella: 'der Regenschirm', boots: 'die Stiefel',
    helmet: 'der Helm', raincoat: 'die Regenjacke', note: 'der Zettel', 'drawing-pin': 'die Reißzwecke', battery: 'die Batterie',
    'spare-key': 'der Ersatzschlüssel', shoehorn: 'der Schuhlöffel', landline: 'das Festnetztelefon',
    'go-upstairs': 'nach oben gehen', 'put-on': 'anziehen', 'take-off': 'ausziehen', 'hang-up': 'aufhängen',
    'answer-the-phone': 'ans Telefon gehen', 'leave-a-message': 'eine Nachricht hinterlassen', ring: 'anrufen', pin: 'anpinnen',
    'trip-over': 'stolpern', 'lace-up': 'zuschnüren', declutter: 'ausmisten',
    long: 'lang', narrow: 'schmal', muddy: 'matschig', steep: 'steil', draughty: 'zugig', welcoming: 'gastlich',
  },
};
