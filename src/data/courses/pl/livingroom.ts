import type { RoomCourse } from '../types';

export const livingRoom: RoomCourse = {
  title: 'Mój salon',
  bins: { furniture: 'Meble', entertainment: 'Rozrywka', cosy: 'Światło i przytulne rzeczy', actions: 'Co robisz' },
  objects: {
    sofa: ['kanapa', 'Miękki mebel dla dwóch lub trzech osób.', 'Siedzimy razem na kanapie.', 'kanapy', 'kanapą', 'kanapę'],
    armchair: ['fotel', 'Wygodne siedzenie dla jednej osoby.', 'Dziadek czyta w fotelu.', 'fotela', 'fotelem'],
    'coffee-table': ['stolik kawowy', 'Niski stolik przed kanapą.', 'Filiżanki stoją na stoliku kawowym.', 'stolika kawowego', 'stolikiem kawowym'],
    tv: ['telewizor', 'Oglądasz na nim filmy i seriale.', 'Telewizor wisi na ścianie.', 'telewizora', 'telewizorem'],
    fireplace: ['kominek', 'Zimą pali się w nim ogień.', 'Zimą siedzimy przy kominku.', 'kominka', 'kominkiem'],
    bookcase: ['biblioteczka', 'Szafa pełna książek.', 'W biblioteczce stoją stare książki.', 'biblioteczki', 'biblioteczką', 'biblioteczkę'],
    'floor-lamp': ['lampa stojąca', 'Wysoka lampa, która stoi na podłodze.', 'Lampa stojąca stoi obok fotela.', 'lampy stojącej', 'lampą stojącą', 'lampę stojącą'],
    cushion: ['poduszka dekoracyjna', 'Mała, miękka poduszka na kanapę.', 'Na kanapie leżą trzy poduszki dekoracyjne.', 'poduszki dekoracyjnej', 'poduszką dekoracyjną', 'poduszkę dekoracyjną'],
    remote: ['pilot', 'Włączasz nim telewizor.', 'Gdzie jest pilot?', 'pilota', 'pilotem'],
    'wall-clock': ['zegar ścienny', 'Wisi na ścianie i pokazuje godzinę.', 'Zegar ścienny pokazuje ósmą.', 'zegara ściennego', 'zegarem ściennym'],
    piano: ['pianino', 'Duży instrument z klawiszami.', 'Moja siostra gra na pianinie.', 'pianina', 'pianinem'],
    beanbag: ['pufa', 'Miękki worek do siedzenia.', 'Lubię czytać na pufie.', 'pufy', 'pufą', 'pufę'],
  },
  words: {
    'living-room': 'salon', television: 'telewizja', screen: 'ekran', 'tv-unit': 'szafka pod telewizor',
    mantelpiece: 'półka nad kominkiem', footstool: 'podnóżek', 'sofa-bed': 'rozkładana kanapa', 'corner-sofa': 'narożnik',
    recliner: 'fotel rozkładany', 'display-cabinet': 'witryna',
    magazine: 'czasopismo', photo: 'zdjęcie', game: 'gra', 'piano-keys': 'klawisze', 'board-game': 'gra planszowa',
    'games-console': 'konsola do gier', speaker: 'głośnik', firewood: 'drewno na opał', lampshade: 'abażur', throw: 'pled',
    ornament: 'figurka', coaster: 'podkładka pod kubek', 'sheet-music': 'nuty',
    'sit-down': 'siadać', 'watch-tv': 'oglądać telewizję', read: 'czytać', 'play-the-piano': 'grać na pianinie',
    relax: 'odpoczywać', 'turn-on': 'włączać', 'turn-off': 'wyłączać', 'switch-channels': 'przełączać kanały',
    'light-a-fire': 'rozpalić ogień', 'curl-up': 'zwinąć się w kłębek', 'entertain-guests': 'przyjmować gości',
    'binge-watch': 'oglądać seriale ciurkiem',
    comfortable: 'wygodny', big: 'duży', small: 'mały', noisy: 'głośny', quiet: 'cichy', bright: 'jasny', dark: 'ciemny',
    crowded: 'zatłoczony', 'open-plan': 'z otwartą przestrzenią', inviting: 'zachęcający',
  },
};
