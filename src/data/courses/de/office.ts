import type { RoomCourse } from '../types';

export const office: RoomCourse = {
  title: 'Mein Büro',
  bins: { tech: 'Geräte', things: 'Bürosachen', people: 'Menschen & Orte', actions: 'Was du tust' },
  objects: {
    'meeting-table': ['der Besprechungstisch', 'Ein großer Tisch für Besprechungen.', 'Das Team sitzt am Besprechungstisch.'],
    'office-chair': ['der Bürostuhl', 'Ein Stuhl mit Rollen für die Arbeit.', 'Mein Bürostuhl ist sehr bequem.'],
    'filing-cabinet': ['der Aktenschrank', 'Ein Schrank für Papiere und Akten.', 'Die Verträge sind im Aktenschrank.'],
    'water-cooler': ['der Wasserspender', 'Hier bekommst du kaltes Wasser.', 'Ich hole mir Wasser am Wasserspender.'],
    shredder: ['der Aktenvernichter', 'Er macht Papier ganz klein.', 'Alte Briefe kommen in den Aktenvernichter.'],
    printer: ['der Drucker', 'Er druckt Texte auf Papier.', 'Der Drucker hat kein Papier mehr.'],
    computer: ['der Computer', 'Damit schreibst du E-Mails und arbeitest.', 'Mein Computer ist neu.'],
    laptop: ['der Laptop', 'Ein kleiner Computer zum Mitnehmen.', 'Heute arbeite ich am Laptop.'],
    stapler: ['der Tacker', 'Er hält Blätter zusammen.', 'Kannst du mir den Tacker geben?'],
    'sticky-notes': ['die Haftnotizen', 'Kleine gelbe Zettel, die kleben.', 'Am Bildschirm kleben drei Haftnotizen.', 'pl'],
    'fire-extinguisher': ['der Feuerlöscher', 'Damit löschst du ein Feuer.', 'Der Feuerlöscher hängt neben der Tür.'],
    'sales-chart': ['die Verkaufsgrafik', 'Sie zeigt, wie viel die Firma verkauft.', 'Die Verkaufsgrafik geht nach oben.'],
  },
  words: {
    office: 'das Büro', job: 'die Stelle', boss: 'der Chef', colleague: 'der Kollege', manager: 'der Abteilungsleiter',
    receptionist: 'die Empfangskraft', customer: 'der Kunde', company: 'die Firma', team: 'das Team', reception: 'der Empfang',
    employee: 'der Mitarbeiter', employer: 'der Arbeitgeber',
    email: 'die E-Mail', keyboard: 'die Tastatur', mouse: 'die Maus', paper: 'das Papier', meeting: 'die Besprechung', file: 'die Akte',
    password: 'das Passwort', salary: 'das Gehalt', contract: 'der Vertrag', 'job-interview': 'das Vorstellungsgespräch',
    agenda: 'die Tagesordnung', 'fire-exit': 'der Notausgang', profit: 'der Gewinn', confidential: 'vertraulich',
    work: 'arbeiten', type: 'tippen', print: 'drucken', send: 'schicken', 'log-in': 'sich anmelden',
    'have-a-meeting': 'eine Besprechung haben', 'take-notes': 'Notizen machen', save: 'speichern', attach: 'anhängen',
    'apply-for': 'sich bewerben um', promote: 'befördern', negotiate: 'verhandeln',
    busy: 'beschäftigt', tired: 'müde', organised: 'organisiert', professional: 'professionell', 'full-time': 'Vollzeit',
    'part-time': 'Teilzeit', ergonomic: 'ergonomisch',
  },
};
