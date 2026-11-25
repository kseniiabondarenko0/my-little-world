import type { RoomCourse } from '../types';

export const supermarket: RoomCourse = {
  title: 'Mein Supermarkt',
  bins: { food: 'Essen & Trinken', money: 'Geld', shop: 'Im Laden', actions: 'Was du tust' },
  objects: {
    'shopping-trolley': ['der Einkaufswagen', 'Ein großer Wagen für deine Einkäufe.', 'Ich schiebe den Einkaufswagen.'],
    checkout: ['die Kasse', 'Hier bezahlst du.', 'An der Kasse ist eine lange Schlange.'],
    'cash-register': ['die Registrierkasse', 'Eine Maschine für das Geld an der Kasse.', 'Das Geld ist in der Registrierkasse.'],
    'fruit-stand': ['der Obststand', 'Hier liegen Äpfel, Bananen und Orangen.', 'Die Äpfel am Obststand sind frisch.'],
    'bread-rack': ['das Brotregal', 'Ein Regal mit Brot und Brötchen.', 'Im Brotregal liegt frisches Brot.'],
    'drinks-fridge': ['der Getränkekühlschrank', 'Ein Kühlschrank mit kalten Getränken.', 'Die Limonade ist im Getränkekühlschrank.'],
    'shopping-basket': ['der Einkaufskorb', 'Ein Korb für ein paar Einkäufe.', 'Im Einkaufskorb sind Milch und Brot.'],
    'barcode-scanner': ['der Scanner', 'Er liest den Strichcode an der Kasse.', 'Der Scanner piept an der Kasse.'],
    watermelon: ['die Wassermelone', 'Eine große, grüne Frucht, innen rot.', 'Im Sommer esse ich gern Wassermelone.'],
    'shopping-bag': ['die Einkaufstasche', 'Darin trägst du deine Einkäufe nach Hause.', 'Meine Einkaufstasche ist voll.'],
    'special-offer': ['das Sonderangebot', 'Heute ist es billiger als sonst.', 'Die Bananen sind heute im Sonderangebot.'],
    'opening-hours': ['die Öffnungszeiten', 'Sie zeigen, wann der Laden offen ist.', 'Die Öffnungszeiten hängen an der Tür.', 'pl'],
  },
  words: {
    supermarket: 'der Supermarkt', shop: 'der Laden', cashier: 'der Kassierer', 'shop-assistant': 'der Verkäufer', queue: 'die Schlange',
    aisle: 'der Regalgang', 'self-checkout': 'die Selbstbedienungskasse',
    orange: 'die Orange', tomato: 'die Tomate', potato: 'die Kartoffel', carrot: 'die Karotte', chicken: 'das Hähnchen', fish: 'der Fisch',
    chocolate: 'die Schokolade', grapes: 'die Weintrauben', biscuits: 'die Kekse', loaf: 'der Brotlaib', lemonade: 'die Limonade',
    money: 'das Geld', price: 'der Preis', cash: 'das Bargeld', change: 'das Wechselgeld', receipt: 'der Kassenbon',
    'shopping-list': 'der Einkaufszettel', 'bank-card': 'die Bankkarte', discount: 'der Rabatt', barcode: 'der Strichcode',
    bargain: 'das Schnäppchen', 'loyalty-card': 'die Kundenkarte', refund: 'die Rückerstattung',
    buy: 'kaufen', pay: 'bezahlen', sell: 'verkaufen', cost: 'kosten', 'go-shopping': 'einkaufen gehen', 'queue-up': 'Schlange stehen',
    'pay-by-card': 'mit Karte zahlen', 'compare-prices': 'Preise vergleichen', 'run-out-of': 'ausgehen',
    cheap: 'billig', expensive: 'teuer', ripe: 'reif', 'out-of-stock': 'ausverkauft', organic: 'bio', 'value-for-money': 'preiswert',
  },
};
