import type { RoomCourse } from '../types';

export const livingRoom: RoomCourse = {
  title: 'Mein Wohnzimmer',
  bins: { furniture: 'Möbel', entertainment: 'Spaß & Hobbys', cosy: 'Licht & Gemütliches', actions: 'Was du tust' },
  objects: {
    sofa: ['das Sofa', 'Ein weiches Möbelstück für zwei oder drei Personen.', 'Wir sitzen zusammen auf dem Sofa.'],
    armchair: ['der Sessel', 'Ein bequemer Sitz für eine Person.', 'Opa liest im Sessel.'],
    'coffee-table': ['der Couchtisch', 'Ein niedriger Tisch vor dem Sofa.', 'Die Tassen stehen auf dem Couchtisch.'],
    tv: ['der Fernseher', 'Darauf siehst du Filme und Serien.', 'Der Fernseher hängt an der Wand.'],
    fireplace: ['der Kamin', 'Hier brennt im Winter ein Feuer.', 'Im Winter sitzen wir am Kamin.'],
    bookcase: ['der Bücherschrank', 'Ein Schrank voller Bücher.', 'Im Bücherschrank stehen alte Bücher.'],
    'floor-lamp': ['die Stehlampe', 'Eine hohe Lampe, die auf dem Boden steht.', 'Die Stehlampe steht neben dem Sessel.'],
    cushion: ['das Sofakissen', 'Ein kleines, weiches Kissen für das Sofa.', 'Auf dem Sofa liegen drei Sofakissen.'],
    remote: ['die Fernbedienung', 'Damit schaltest du den Fernseher an.', 'Wo ist die Fernbedienung?'],
    'wall-clock': ['die Wanduhr', 'Sie hängt an der Wand und zeigt die Zeit.', 'Die Wanduhr zeigt acht Uhr.'],
    piano: ['das Klavier', 'Ein großes Musikinstrument mit Tasten.', 'Meine Schwester spielt Klavier.'],
    beanbag: ['der Sitzsack', 'Ein weicher Sack zum Sitzen.', 'Ich lese gern im Sitzsack.'],
  },
  words: {
    'living-room': 'das Wohnzimmer', television: 'das Fernsehen', screen: 'der Bildschirm', 'tv-unit': 'der Fernsehschrank',
    mantelpiece: 'der Kaminsims', footstool: 'der Fußhocker', 'sofa-bed': 'das Schlafsofa', 'corner-sofa': 'das Ecksofa',
    recliner: 'der Relaxsessel', 'display-cabinet': 'die Vitrine',
    magazine: 'die Zeitschrift', photo: 'das Foto', game: 'das Spiel', 'piano-keys': 'die Klaviertasten', 'board-game': 'das Brettspiel',
    'games-console': 'die Spielkonsole', speaker: 'der Lautsprecher', firewood: 'das Brennholz', lampshade: 'der Lampenschirm',
    throw: 'die Kuscheldecke', ornament: 'die Dekofigur', coaster: 'der Untersetzer', 'sheet-music': 'die Noten',
    'sit-down': 'sich hinsetzen', 'watch-tv': 'fernsehen', read: 'lesen', 'play-the-piano': 'Klavier spielen',
    relax: 'sich entspannen', 'turn-on': 'einschalten', 'turn-off': 'ausschalten', 'switch-channels': 'umschalten',
    'light-a-fire': 'ein Feuer anzünden', 'curl-up': 'sich einkuscheln', 'entertain-guests': 'Gäste bewirten',
    'binge-watch': 'Serien am Stück schauen',
    comfortable: 'bequem', big: 'groß', small: 'klein', noisy: 'laut', quiet: 'leise', bright: 'hell', dark: 'dunkel',
    crowded: 'überfüllt', 'open-plan': 'offen gestaltet', inviting: 'einladend',
  },
};
