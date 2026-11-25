import type { RoomCourse } from '../types';

export const office: RoomCourse = {
  title: 'Moje biuro',
  bins: { tech: 'Urządzenia', things: 'Rzeczy biurowe', people: 'Ludzie i miejsca', actions: 'Co robisz' },
  objects: {
    'meeting-table': ['stół konferencyjny', 'Duży stół do spotkań.', 'Zespół siedzi przy stole konferencyjnym.', 'stołu konferencyjnego', 'stołem konferencyjnym'],
    'office-chair': ['krzesło biurowe', 'Krzesło na kółkach do pracy.', 'Moje krzesło biurowe jest bardzo wygodne.', 'krzesła biurowego', 'krzesłem biurowym'],
    'filing-cabinet': ['szafa na dokumenty', 'Szafa na papiery i dokumenty.', 'Umowy są w szafie na dokumenty.', 'szafy na dokumenty', 'szafą na dokumenty', 'szafę na dokumenty'],
    'water-cooler': ['dystrybutor wody', 'Tu bierzesz zimną wodę.', 'Biorę wodę z dystrybutora wody.', 'dystrybutora wody', 'dystrybutorem wody'],
    shredder: ['niszczarka', 'Tnie papier na małe kawałki.', 'Stare listy idą do niszczarki.', 'niszczarki', 'niszczarką', 'niszczarkę'],
    printer: ['drukarka', 'Drukuje teksty na papierze.', 'W drukarce nie ma papieru.', 'drukarki', 'drukarką', 'drukarkę'],
    computer: ['komputer', 'Piszesz na nim maile i pracujesz.', 'Mój komputer jest nowy.', 'komputera', 'komputerem'],
    laptop: ['laptop', 'Mały komputer, który możesz nosić.', 'Dzisiaj pracuję na laptopie.', 'laptopa', 'laptopem'],
    stapler: ['zszywacz', 'Łączy kartki papieru.', 'Podasz mi zszywacz?', 'zszywacza', 'zszywaczem'],
    'sticky-notes': ['karteczki samoprzylepne', 'Małe żółte karteczki, które się kleją.', 'Na monitorze są trzy karteczki samoprzylepne.', 'karteczek samoprzylepnych', 'karteczkami samoprzylepnymi', 'pl'],
    'fire-extinguisher': ['gaśnica', 'Gasisz nią ogień.', 'Gaśnica wisi obok drzwi.', 'gaśnicy', 'gaśnicą', 'gaśnicę'],
    'sales-chart': ['wykres sprzedaży', 'Pokazuje, ile firma sprzedaje.', 'Wykres sprzedaży idzie w górę.', 'wykresu sprzedaży', 'wykresem sprzedaży'],
  },
  words: {
    office: 'biuro', job: 'praca', boss: 'szef', colleague: 'kolega z pracy', manager: 'kierownik', receptionist: 'recepcjonista',
    customer: 'klient', company: 'firma', team: 'zespół', reception: 'recepcja', employee: 'pracownik', employer: 'pracodawca',
    email: 'e-mail', keyboard: 'klawiatura', mouse: 'mysz', paper: 'papier', meeting: 'spotkanie', file: 'teczka', password: 'hasło',
    salary: 'pensja', contract: 'umowa', 'job-interview': 'rozmowa kwalifikacyjna', agenda: 'porządek spotkania',
    'fire-exit': 'wyjście ewakuacyjne', profit: 'zysk', confidential: 'poufny',
    work: 'pracować', type: 'pisać na klawiaturze', print: 'drukować', send: 'wysyłać', 'log-in': 'zalogować się',
    'have-a-meeting': 'mieć spotkanie', 'take-notes': 'robić notatki', save: 'zapisywać', attach: 'załączać',
    'apply-for': 'ubiegać się o', promote: 'awansować', negotiate: 'negocjować',
    busy: 'zajęty', tired: 'zmęczony', organised: 'zorganizowany', professional: 'profesjonalny', 'full-time': 'na pełen etat',
    'part-time': 'na część etatu', ergonomic: 'ergonomiczny',
  },
};
