import type { RoomCourse } from '../types';

export const city: RoomCourse = {
  title: 'Moje miasto',
  bins: { places: 'Miejsca', street: 'Na ulicy', transport: 'Transport i ludzie', actions: 'Co robisz' },
  objects: {
    'park-bench': ['ławka w parku', 'Siedzisz na niej w parku.', 'Siedzimy na ławce w parku i jemy lody.', 'ławki w parku', 'ławką w parku', 'ławkę w parku'],
    'bus-stop': ['przystanek autobusowy', 'Tu czekasz na autobus.', 'Czekam na przystanku autobusowym.', 'przystanku autobusowego', 'przystankiem autobusowym'],
    'street-lamp': ['latarnia uliczna', 'W nocy świeci na ulicy.', 'Wieczorem latarnia uliczna się zapala.', 'latarni ulicznej', 'latarnią uliczną', 'latarnię uliczną'],
    'traffic-light': ['sygnalizacja świetlna', 'Czerwone światło znaczy stój, zielone znaczy idź.', 'Światło jest czerwone, czekamy.', 'sygnalizacji świetlnej', 'sygnalizacją świetlną', 'sygnalizację świetlną'],
    'post-box': ['skrzynka pocztowa', 'Na ulicy wrzucasz do niej listy.', 'Wrzucam list do skrzynki pocztowej.', 'skrzynki pocztowej', 'skrzynką pocztową', 'skrzynkę pocztową'],
    fountain: ['fontanna', 'Woda tryska w niej do góry.', 'Dzieci bawią się przy fontannie.', 'fontanny', 'fontanną', 'fontannę'],
    'ice-cream-cart': ['wózek z lodami', 'Mały wózek, który sprzedaje lody.', 'Przy wózku z lodami kupuję lody czekoladowe.', 'wózka z lodami', 'wózkiem z lodami'],
    'bus-ticket': ['bilet autobusowy', 'Dzięki niemu możesz jechać autobusem.', 'Kupuję bilet autobusowy.', 'biletu autobusowego', 'biletem autobusowym'],
    skateboard: ['deskorolka', 'Deska z czterema kółkami.', 'Mój brat jeździ na deskorolce w parku.', 'deskorolki', 'deskorolką', 'deskorolkę'],
    pigeon: ['gołąb', 'Szary ptak w mieście.', 'Na placu siedzi dużo gołębi.', 'gołębia', 'gołębiem', 'gołębia'],
    'street-sign': ['tabliczka z nazwą ulicy', 'Pokazuje nazwę ulicy.', 'Na tabliczce z nazwą ulicy jest napisane „Główna”.', 'tabliczki z nazwą ulicy', 'tabliczką z nazwą ulicy', 'tabliczkę z nazwą ulicy'],
    'city-map': ['plan miasta', 'Mapa ulic w mieście.', 'Z planem miasta znajduję muzeum.', 'planu miasta', 'planem miasta'],
  },
  words: {
    city: 'miasto', park: 'park', road: 'droga', cinema: 'kino', museum: 'muzeum', square: 'plac', bridge: 'most', pavement: 'chodnik',
    'post-office': 'poczta', 'police-station': 'komisariat', 'zebra-crossing': 'przejście dla pieszych', roundabout: 'rondo',
    landmark: 'zabytek', neighbourhood: 'okolica',
    bus: 'autobus', car: 'samochód', taxi: 'taksówka', tram: 'tramwaj', tourist: 'turysta', driver: 'kierowca', traffic: 'ruch uliczny',
    cyclist: 'rowerzysta', pedestrian: 'pieszy', 'traffic-jam': 'korek', 'rush-hour': 'godziny szczytu',
    'public-transport': 'komunikacja miejska',
    'cross-the-road': 'przechodzić przez ulicę', 'turn-left': 'skręcić w lewo', 'turn-right': 'skręcić w prawo',
    'go-straight-on': 'iść prosto', 'get-on': 'wsiadać', 'get-off': 'wysiadać', 'post-a-letter': 'wysłać list',
    'ask-for-directions': 'pytać o drogę', 'go-sightseeing': 'zwiedzać', commute: 'dojeżdżać',
    modern: 'nowoczesny', lively: 'tętniący życiem', polluted: 'zanieczyszczony', pedestrianised: 'zamknięty dla ruchu',
    bustling: 'ruchliwy',
  },
};
