import type { RoomCourse } from '../types';

export const basement: RoomCourse = {
  title: 'Mein Keller',
  bins: { tools: 'Werkzeug', cleaning: 'Putzen', stored: 'Große Dinge', actions: 'Was du tust' },
  objects: {
    workbench: ['die Werkbank', 'Ein starker Tisch zum Basteln und Reparieren.', 'Der Hammer liegt auf der Werkbank.'],
    shelving: ['das Lagerregal', 'Ein großes Regal für Kisten und Sachen.', 'Die Kisten stehen im Lagerregal.'],
    boiler: ['der Heizkessel', 'Er macht das Wasser und die Heizung warm.', 'Der Heizkessel steht im Keller.'],
    'chest-freezer': ['die Gefriertruhe', 'Eine große, kalte Kiste für gefrorenes Essen.', 'Das Eis ist in der Gefriertruhe.'],
    toolbox: ['der Werkzeugkasten', 'Eine Kiste für Werkzeug.', 'Der Schraubenzieher ist im Werkzeugkasten.'],
    ladder: ['die Leiter', 'Damit kletterst du nach oben.', 'Papa steht auf der Leiter.'],
    bicycle: ['das Fahrrad', 'Es hat zwei Räder, und du fährst damit.', 'Ich fahre mit dem Fahrrad zur Schule.'],
    'cardboard-box': ['der Karton', 'Eine Kiste aus Pappe.', 'Meine alten Spielsachen sind im Karton.'],
    broom: ['der Besen', 'Damit fegst du den Boden.', 'Der Besen steht in der Ecke.'],
    bucket: ['der Eimer', 'Darin trägst du Wasser.', 'Der Eimer ist voll Wasser.'],
    paint: ['die Farbe', 'Damit streichst du die Wand.', 'Die blaue Farbe ist für mein Zimmer.'],
    'fuse-box': ['der Sicherungskasten', 'Hier ist der Strom für das ganze Haus.', 'Der Sicherungskasten hängt an der Wand.'],
  },
  words: {
    basement: 'der Keller', cellar: 'der Vorratskeller', pipe: 'das Rohr', 'light-bulb': 'die Glühbirne', stepladder: 'die Trittleiter',
    storeroom: 'der Abstellraum', 'water-heater': 'der Warmwasserbereiter',
    hammer: 'der Hammer', tool: 'das Werkzeug', screwdriver: 'der Schraubenzieher', nail: 'der Nagel', saw: 'die Säge',
    paintbrush: 'der Pinsel', mop: 'der Wischmopp', dustpan: 'die Kehrschaufel', spider: 'die Spinne', screw: 'die Schraube',
    drill: 'die Bohrmaschine', 'tape-measure': 'das Maßband', spanner: 'der Schraubenschlüssel', tyre: 'der Reifen',
    pump: 'die Luftpumpe', cobweb: 'das Spinnennetz', fuse: 'die Sicherung', 'power-tool': 'das Elektrowerkzeug',
    fix: 'reparieren', 'ride-a-bike': 'Fahrrad fahren', climb: 'klettern', sweep: 'fegen', 'paint-the-wall': 'die Wand streichen',
    repair: 'instand setzen', label: 'beschriften', 'pump-up': 'aufpumpen', 'sort-out': 'aussortieren', 'get-rid-of': 'loswerden',
    insulate: 'dämmen',
    heavy: 'schwer', broken: 'kaputt', scary: 'gruselig', dusty: 'staubig', damp: 'feucht', rusty: 'rostig', sharp: 'scharf',
    flammable: 'brennbar', 'poorly-lit': 'schlecht beleuchtet',
  },
};
