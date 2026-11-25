import type { RoomCourse } from '../types';

export const restaurant: RoomCourse = {
  title: 'Mein Restaurant',
  bins: { food: 'Essen & Gerichte', things: 'Im Restaurant', people: 'Menschen & Orte', actions: 'Was du tust' },
  objects: {
    'table-for-two': ['der Zweiertisch', 'Ein kleiner Tisch für zwei Personen.', 'Einen Zweiertisch, bitte.'],
    'high-chair': ['der Hochstuhl', 'Ein hoher Stuhl für ein Baby.', 'Haben Sie einen Hochstuhl für das Baby?'],
    counter: ['die Theke', 'Ein langer Tisch, an dem man bezahlt.', 'Bitte zahlen Sie an der Theke.'],
    'pizza-oven': ['der Pizzaofen', 'Ein sehr heißer Ofen für Pizza.', 'Der Koch schiebt die Pizza in den Pizzaofen.'],
    'dessert-trolley': ['der Dessertwagen', 'Ein kleiner Wagen mit Kuchen und Süßem.', 'Schau mal, die Kuchen auf dem Dessertwagen!'],
    menu: ['die Speisekarte', 'Eine Liste mit Essen und Getränken.', 'Kann ich bitte die Speisekarte sehen?'],
    pizza: ['die Pizza', 'Ein flaches, rundes Brot mit Tomaten und Käse.', 'Ich hätte gern eine Pizza mit Käse.'],
    bill: ['die Rechnung', 'Ein Zettel, der zeigt, wie viel du zahlen musst.', 'Die Rechnung, bitte!'],
    'tip-jar': ['das Trinkgeldglas', 'Ein Glas für ein bisschen extra Geld.', 'Wir legen zwei Euro ins Trinkgeldglas.'],
    'salt-and-pepper': ['die Salz- und Pfefferstreuer', 'Damit schmeckt das Essen besser.', 'Gibst du mir bitte die Salz- und Pfefferstreuer?', 'pl'],
    'specials-board': ['die Tageskarte', 'Eine Tafel mit den Gerichten des Tages.', 'Die Suppe von heute steht auf der Tageskarte.'],
    'open-sign': ['das Geöffnet-Schild', 'Es zeigt, dass das Restaurant offen ist.', 'Das Geöffnet-Schild leuchtet, also gehen wir rein!'],
  },
  words: {
    restaurant: 'das Restaurant', cafe: 'das Café', waiter: 'der Kellner', waitress: 'die Kellnerin', chef: 'der Koch', guest: 'der Gast',
    takeaway: 'das Essen zum Mitnehmen', breakfast: 'das Frühstück', lunch: 'das Mittagessen', dinner: 'das Abendessen',
    salad: 'der Salat', 'ice-cream': 'das Eis', cake: 'der Kuchen', dessert: 'der Nachtisch', starter: 'die Vorspeise',
    'main-course': 'das Hauptgericht', steak: 'das Steak', pepper: 'der Pfeffer', dish: 'das Gericht', 'dish-of-the-day': 'das Tagesgericht',
    portion: 'die Portion', tip: 'das Trinkgeld', reservation: 'die Reservierung', allergy: 'die Allergie',
    'service-charge': 'die Servicegebühr',
    order: 'bestellen', taste: 'probieren', 'book-a-table': 'einen Tisch reservieren', serve: 'servieren',
    'pay-the-bill': 'die Rechnung bezahlen', recommend: 'empfehlen', complain: 'sich beschweren', share: 'teilen',
    'split-the-bill': 'getrennt zahlen',
    tasty: 'schmackhaft', sweet: 'süß', spicy: 'scharf gewürzt', salty: 'salzig', vegetarian: 'vegetarisch', 'fully-booked': 'ausgebucht',
    overcooked: 'verkocht',
  },
};
