import type { RoomCourse } from '../types';

export const school: RoomCourse = {
  title: 'Moja szkoła',
  bins: { classroom: 'W klasie', subjects: 'Przedmioty', people: 'Ludzie i miejsca', actions: 'Co robisz' },
  objects: {
    whiteboard: ['tablica', 'Nauczycielka pisze na niej.', 'Pani pisze datę na tablicy.', 'tablicy', 'tablicą', 'tablicę'],
    'teachers-desk': ['biurko nauczyciela', 'Stół nauczyciela w klasie.', 'Zeszyty leżą na biurku nauczyciela.', 'biurka nauczyciela', 'biurkiem nauczyciela'],
    'school-desk': ['ławka szkolna', 'Siedzisz przy niej na lekcji.', 'Mój zeszyt leży na ławce szkolnej.', 'ławki szkolnej', 'ławką szkolną', 'ławkę szkolną'],
    locker: ['szafka szkolna', 'Mała szafka z zamkiem na twoje rzeczy.', 'Moja kurtka jest w szafce szkolnej.', 'szafki szkolnej', 'szafką szkolną', 'szafkę szkolną'],
    globe: ['globus', 'Okrągła mapa Ziemi.', 'Na globusie szukam Ukrainy.', 'globusa', 'globusem'],
    'world-map': ['mapa świata', 'Mapa wszystkich krajów.', 'Mapa świata wisi na ścianie.', 'mapy świata', 'mapą świata', 'mapę świata'],
    timetable: ['plan lekcji', 'Pokazuje przedmioty na każdy dzień.', 'Według planu lekcji mamy dziś matematykę.', 'planu lekcji', 'planem lekcji'],
    'pencil-case': ['piórnik', 'Są w nim długopisy i gumka.', 'Mój ołówek jest w piórniku.', 'piórnika', 'piórnikiem'],
    'school-bag': ['tornister', 'Nosisz w nim książki i zeszyty.', 'Mój tornister jest dziś bardzo ciężki.', 'tornistra', 'tornistrem'],
    projector: ['rzutnik', 'Pokazuje duże obrazy na ścianie.', 'Nauczyciel włącza rzutnik.', 'rzutnika', 'rzutnikiem'],
    textbooks: ['podręczniki', 'Książki do nauki w szkole.', 'Podręczniki leżą na półce.', 'podręczników', 'podręcznikami', 'pl'],
    microscope: ['mikroskop', 'Widzisz przez niego bardzo małe rzeczy.', 'Patrzymy przez mikroskop.', 'mikroskopu', 'mikroskopem'],
  },
  words: {
    school: 'szkoła', classroom: 'klasa', teacher: 'nauczyciel', student: 'uczeń', classmate: 'kolega z klasy', playground: 'boisko',
    library: 'biblioteka', canteen: 'stołówka', gym: 'sala gimnastyczna', 'head-teacher': 'dyrektor szkoły',
    'science-lab': 'pracownia przyrodnicza', lesson: 'lekcja', homework: 'praca domowa',
    maths: 'matematyka', english: 'angielski', geography: 'geografia', history: 'historia', science: 'przyroda', art: 'plastyka',
    pe: 'wychowanie fizyczne', ruler: 'linijka', rubber: 'gumka', marker: 'marker', break: 'przerwa', test: 'sprawdzian',
    exam: 'egzamin', report: 'świadectwo', uniform: 'mundurek', presentation: 'prezentacja', experiment: 'doświadczenie',
    curriculum: 'program nauczania', deadline: 'termin',
    learn: 'uczyć się', write: 'pisać', listen: 'słuchać', 'put-your-hand-up': 'podnieść rękę', 'be-late': 'spóźniać się',
    revise: 'powtarzać', 'hand-in': 'oddawać', 'pass-an-exam': 'zdać egzamin', copy: 'ściągać', concentrate: 'skupić się',
    easy: 'łatwy', difficult: 'trudny', interesting: 'ciekawy', boring: 'nudny', strict: 'surowy', compulsory: 'obowiązkowy',
  },
};
