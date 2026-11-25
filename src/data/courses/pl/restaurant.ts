import type { RoomCourse } from '../types';

export const restaurant: RoomCourse = {
  title: 'Moja restauracja',
  bins: { food: 'Jedzenie i dania', things: 'W restauracji', people: 'Ludzie i miejsca', actions: 'Co robisz' },
  objects: {
    'table-for-two': ['stolik dla dwojga', 'Mały stolik dla dwóch osób.', 'Poproszę stolik dla dwojga.', 'stolika dla dwojga', 'stolikiem dla dwojga'],
    'high-chair': ['krzesełko do karmienia', 'Wysokie krzesełko dla dziecka.', 'Czy macie krzesełko do karmienia dla dziecka?', 'krzesełka do karmienia', 'krzesełkiem do karmienia'],
    counter: ['lada', 'Długi stół, przy którym się płaci.', 'Proszę zapłacić przy ladzie.', 'lady', 'ladą', 'ladę'],
    'pizza-oven': ['piec do pizzy', 'Bardzo gorący piec do pieczenia pizzy.', 'Kucharz wkłada pizzę do pieca do pizzy.', 'pieca do pizzy', 'piecem do pizzy'],
    'dessert-trolley': ['wózek z deserami', 'Mały wózek z ciastami i słodyczami.', 'Zobacz ciasta na wózku z deserami!', 'wózka z deserami', 'wózkiem z deserami'],
    menu: ['karta dań', 'Lista dań i napojów.', 'Poproszę kartę dań.', 'karty dań', 'kartą dań', 'kartę dań'],
    pizza: ['pizza', 'Płaski, okrągły placek z pomidorami i serem.', 'Poproszę pizzę z serem.', 'pizzy', 'pizzą', 'pizzę'],
    bill: ['rachunek', 'Kartka, która pokazuje, ile musisz zapłacić.', 'Poproszę rachunek.', 'rachunku', 'rachunkiem'],
    'tip-jar': ['słoik na napiwki', 'Słoik na dodatkowe pieniądze dla obsługi.', 'Wkładamy dwa euro do słoika na napiwki.', 'słoika na napiwki', 'słoikiem na napiwki'],
    'salt-and-pepper': ['sól i pieprz', 'Dzięki nim jedzenie lepiej smakuje.', 'Podasz mi sól i pieprz?', 'soli i pieprzu', 'solą i pieprzem', 'pl'],
    'specials-board': ['tablica z daniami dnia', 'Tablica z daniami na dziś.', 'Dzisiejsza zupa jest na tablicy z daniami dnia.', 'tablicy z daniami dnia', 'tablicą z daniami dnia', 'tablicę z daniami dnia'],
    'open-sign': ['napis „Otwarte”', 'Pokazuje, że restauracja jest otwarta.', 'Napis „Otwarte” świeci, więc wchodzimy!', 'napisu „Otwarte”', 'napisem „Otwarte”'],
  },
  words: {
    restaurant: 'restauracja', cafe: 'kawiarnia', waiter: 'kelner', waitress: 'kelnerka', chef: 'kucharz', guest: 'gość',
    takeaway: 'jedzenie na wynos', breakfast: 'śniadanie', lunch: 'obiad', dinner: 'kolacja', salad: 'sałatka', 'ice-cream': 'lody',
    cake: 'ciasto', dessert: 'deser', starter: 'przystawka', 'main-course': 'danie główne', steak: 'stek', pepper: 'pieprz',
    dish: 'danie', 'dish-of-the-day': 'danie dnia', portion: 'porcja', tip: 'napiwek', reservation: 'rezerwacja', allergy: 'alergia',
    'service-charge': 'opłata za obsługę',
    order: 'zamawiać', taste: 'próbować', 'book-a-table': 'zarezerwować stolik', serve: 'podawać', 'pay-the-bill': 'zapłacić rachunek',
    recommend: 'polecać', complain: 'skarżyć się', share: 'dzielić się', 'split-the-bill': 'podzielić rachunek',
    tasty: 'smaczny', sweet: 'słodki', spicy: 'pikantny', salty: 'słony', vegetarian: 'wegetariański', 'fully-booked': 'brak wolnych miejsc',
    overcooked: 'rozgotowany',
  },
};
