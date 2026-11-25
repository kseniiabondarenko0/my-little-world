import type { RoomCourse } from '../types';

export const supermarket: RoomCourse = {
  title: 'Mój supermarket',
  bins: { food: 'Jedzenie i picie', money: 'Pieniądze', shop: 'W sklepie', actions: 'Co robisz' },
  objects: {
    'shopping-trolley': ['wózek na zakupy', 'Duży wózek na zakupy w sklepie.', 'Pcham wózek na zakupy.', 'wózka na zakupy', 'wózkiem na zakupy'],
    checkout: ['kasa', 'Tu płacisz.', 'Przy kasie jest długa kolejka.', 'kasy', 'kasą', 'kasę'],
    'cash-register': ['kasa fiskalna', 'Maszyna na pieniądze przy kasie.', 'Pieniądze są w kasie fiskalnej.', 'kasy fiskalnej', 'kasą fiskalną', 'kasę fiskalną'],
    'fruit-stand': ['stoisko z owocami', 'Leżą tu jabłka, banany i pomarańcze.', 'Jabłka na stoisku z owocami są świeże.', 'stoiska z owocami', 'stoiskiem z owocami'],
    'bread-rack': ['regał z pieczywem', 'Regał z chlebem i bułkami.', 'Na regale z pieczywem leży świeży chleb.', 'regału z pieczywem', 'regałem z pieczywem'],
    'drinks-fridge': ['lodówka z napojami', 'Lodówka z zimnymi napojami.', 'Lemoniada jest w lodówce z napojami.', 'lodówki z napojami', 'lodówką z napojami', 'lodówkę z napojami'],
    'shopping-basket': ['koszyk na zakupy', 'Koszyk na kilka rzeczy.', 'W koszyku na zakupy są mleko i chleb.', 'koszyka na zakupy', 'koszykiem na zakupy'],
    'barcode-scanner': ['czytnik kodów kreskowych', 'Czyta kod kreskowy przy kasie.', 'Czytnik kodów kreskowych pika przy kasie.', 'czytnika kodów kreskowych', 'czytnikiem kodów kreskowych'],
    watermelon: ['arbuz', 'Duży zielony owoc, w środku czerwony.', 'Latem lubię jeść arbuza.', 'arbuza', 'arbuzem', 'arbuza'],
    'shopping-bag': ['torba na zakupy', 'Nosisz w niej zakupy do domu.', 'Moja torba na zakupy jest pełna.', 'torby na zakupy', 'torbą na zakupy', 'torbę na zakupy'],
    'special-offer': ['promocja', 'Dziś jest taniej niż zwykle.', 'Banany są dziś w promocji.', 'promocji', 'promocją', 'promocję'],
    'opening-hours': ['godziny otwarcia', 'Pokazują, kiedy sklep jest otwarty.', 'Godziny otwarcia wiszą na drzwiach.', 'godzin otwarcia', 'godzinami otwarcia', 'pl'],
  },
  words: {
    supermarket: 'supermarket', shop: 'sklep', cashier: 'kasjer', 'shop-assistant': 'sprzedawca', queue: 'kolejka', aisle: 'alejka',
    'self-checkout': 'kasa samoobsługowa',
    orange: 'pomarańcza', tomato: 'pomidor', potato: 'ziemniak', carrot: 'marchewka', chicken: 'kurczak', fish: 'ryba',
    chocolate: 'czekolada', grapes: 'winogrona', biscuits: 'herbatniki', loaf: 'bochenek', lemonade: 'lemoniada',
    money: 'pieniądze', price: 'cena', cash: 'gotówka', change: 'reszta', receipt: 'paragon', 'shopping-list': 'lista zakupów',
    'bank-card': 'karta płatnicza', discount: 'zniżka', barcode: 'kod kreskowy', bargain: 'okazja', 'loyalty-card': 'karta lojalnościowa',
    refund: 'zwrot pieniędzy',
    buy: 'kupować', pay: 'płacić', sell: 'sprzedawać', cost: 'kosztować', 'go-shopping': 'iść na zakupy', 'queue-up': 'stać w kolejce',
    'pay-by-card': 'płacić kartą', 'compare-prices': 'porównywać ceny', 'run-out-of': 'kończyć się',
    cheap: 'tani', expensive: 'drogi', ripe: 'dojrzały', 'out-of-stock': 'niedostępny', organic: 'ekologiczny',
    'value-for-money': 'opłacalny',
  },
};
