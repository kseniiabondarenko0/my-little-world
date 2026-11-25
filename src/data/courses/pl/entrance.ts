import type { RoomCourse } from '../types';

export const entrance: RoomCourse = {
  title: 'Moje wejście do domu',
  bins: { door: 'Przy drzwiach', garden: 'Ogród', people: 'Ludzie i poczta', actions: 'Co robisz' },
  objects: {
    doormat: ['wycieraczka', 'Wycierasz na niej buty.', 'Wycieraczka leży przed drzwiami.', 'wycieraczki', 'wycieraczką', 'wycieraczkę'],
    letterbox: ['skrzynka na listy', 'Tu przychodzą listy.', 'W skrzynce na listy jest list do ciebie.', 'skrzynki na listy', 'skrzynką na listy', 'skrzynkę na listy'],
    doorbell: ['dzwonek do drzwi', 'Naciskasz go i dzwoni.', 'Dzwonek do drzwi robi „ding-dong”.', 'dzwonka do drzwi', 'dzwonkiem do drzwi'],
    'garden-bench': ['ławka ogrodowa', 'Ławka w ogrodzie.', 'Babcia siedzi na ławce ogrodowej.', 'ławki ogrodowej', 'ławką ogrodową', 'ławkę ogrodową'],
    flowerpot: ['doniczka', 'Rosną w niej kwiaty.', 'W doniczce rośnie czerwony kwiat.', 'doniczki', 'doniczką', 'doniczkę'],
    'wheelie-bin': ['kubeł na śmieci', 'Duży pojemnik na kółkach na śmieci.', 'Kubeł na śmieci stoi obok furtki.', 'kubła na śmieci', 'kubłem na śmieci'],
    'porch-light': ['lampa przed domem', 'Świeci przed drzwiami wejściowymi.', 'Wieczorem lampa przed domem jest włączona.', 'lampy przed domem', 'lampą przed domem', 'lampę przed domem'],
    'house-number': ['numer domu', 'Pokazuje, który to dom.', 'Nasz numer domu to dwanaście.', 'numeru domu', 'numerem domu'],
    parcel: ['paczka', 'Pudełko, które przynosi kurier.', 'Przyszła do ciebie paczka.', 'paczki', 'paczką', 'paczkę'],
    'watering-can': ['konewka', 'Podlewasz nią kwiaty.', 'Konewka jest pełna wody.', 'konewki', 'konewką', 'konewkę'],
    wellies: ['kalosze', 'Wysokie buty na deszcz i błoto.', 'Kiedy pada, zakładam kalosze.', 'kaloszy', 'kaloszami', 'pl'],
    'garden-gnome': ['krasnal ogrodowy', 'Mała figurka w czerwonej czapce.', 'Krasnal ogrodowy stoi obok kwiatów.', 'krasnala ogrodowego', 'krasnalem ogrodowym', 'krasnala ogrodowego'],
  },
  words: {
    'front-door': 'drzwi wejściowe', garden: 'ogród', street: 'ulica', path: 'ścieżka', gate: 'furtka', fence: 'płot', porch: 'ganek',
    doorstep: 'próg', driveway: 'podjazd', hedge: 'żywopłot', 'front-garden': 'ogródek przed domem',
    letter: 'list', flower: 'kwiat', visitor: 'odwiedzający', postman: 'listonosz', neighbour: 'sąsiad', rubbish: 'śmieci', lock: 'zamek',
    'delivery-driver': 'kurier', soil: 'ziemia', 'security-camera': 'kamera monitoringu', 'motion-sensor': 'czujnik ruchu',
    knock: 'pukać', 'ring-the-doorbell': 'dzwonić do drzwi', 'open-the-door': 'otwierać drzwi', 'water-the-plants': 'podlewać rośliny',
    'wipe-your-feet': 'wycierać buty', 'lock-the-door': 'zamykać drzwi na klucz', 'take-out-the-rubbish': 'wynosić śmieci',
    deliver: 'dostarczać', 'sign-for': 'pokwitować odbiór', greet: 'witać', trim: 'przycinać',
    open: 'otwarty', closed: 'zamknięty', safe: 'bezpieczny', friendly: 'przyjazny', colourful: 'kolorowy', 'well-lit': 'dobrze oświetlony',
    overgrown: 'zarośnięty', 'kerb-appeal': 'wygląd domu z zewnątrz',
  },
};
