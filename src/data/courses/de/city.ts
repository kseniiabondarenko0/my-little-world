import type { RoomCourse } from '../types';

export const city: RoomCourse = {
  title: 'Meine Stadt',
  bins: { places: 'Orte', street: 'Auf der Straße', transport: 'Verkehr & Menschen', actions: 'Was du tust' },
  objects: {
    'park-bench': ['die Parkbank', 'Eine Bank im Park.', 'Wir sitzen auf der Parkbank und essen Eis.'],
    'bus-stop': ['die Bushaltestelle', 'Hier wartest du auf den Bus.', 'Ich warte an der Bushaltestelle.'],
    'street-lamp': ['die Straßenlaterne', 'Sie macht nachts Licht auf der Straße.', 'Am Abend geht die Straßenlaterne an.'],
    'traffic-light': ['die Ampel', 'Rot heißt stehen, Grün heißt gehen.', 'Die Ampel ist rot, wir warten.'],
    'post-box': ['der Postkasten', 'Hier wirfst du Briefe auf der Straße ein.', 'Ich werfe den Brief in den Postkasten.'],
    fountain: ['der Brunnen', 'Hier spritzt Wasser in die Luft.', 'Die Kinder spielen am Brunnen.'],
    'ice-cream-cart': ['der Eiswagen', 'Ein kleiner Wagen, der Eis verkauft.', 'Am Eiswagen kaufe ich ein Schokoladeneis.'],
    'bus-ticket': ['die Busfahrkarte', 'Damit darfst du Bus fahren.', 'Ich kaufe eine Busfahrkarte.'],
    skateboard: ['das Skateboard', 'Ein Brett mit vier Rollen.', 'Mein Bruder fährt im Park Skateboard.'],
    pigeon: ['die Taube', 'Ein grauer Vogel in der Stadt.', 'Auf dem Platz sitzen viele Tauben.'],
    'street-sign': ['das Straßenschild', 'Es zeigt den Namen der Straße.', 'Auf dem Straßenschild steht „Hauptstraße“.'],
    'city-map': ['der Stadtplan', 'Eine Karte von der Stadt.', 'Mit dem Stadtplan finde ich das Museum.'],
  },
  words: {
    city: 'die Stadt', park: 'der Park', road: 'die Fahrbahn', cinema: 'das Kino', museum: 'das Museum', square: 'der Platz',
    bridge: 'die Brücke', pavement: 'der Gehweg', 'post-office': 'die Post', 'police-station': 'die Polizeiwache',
    'zebra-crossing': 'der Zebrastreifen', roundabout: 'der Kreisverkehr', landmark: 'das Wahrzeichen', neighbourhood: 'das Viertel',
    bus: 'der Bus', car: 'das Auto', taxi: 'das Taxi', tram: 'die Straßenbahn', tourist: 'der Tourist', driver: 'der Fahrer',
    traffic: 'der Verkehr', cyclist: 'der Radfahrer', pedestrian: 'der Fußgänger', 'traffic-jam': 'der Stau',
    'rush-hour': 'die Hauptverkehrszeit', 'public-transport': 'die öffentlichen Verkehrsmittel',
    'cross-the-road': 'über die Straße gehen', 'turn-left': 'links abbiegen', 'turn-right': 'rechts abbiegen',
    'go-straight-on': 'geradeaus gehen', 'get-on': 'einsteigen', 'get-off': 'aussteigen', 'post-a-letter': 'einen Brief einwerfen',
    'ask-for-directions': 'nach dem Weg fragen', 'go-sightseeing': 'Sehenswürdigkeiten besichtigen', commute: 'pendeln',
    modern: 'modern', lively: 'lebhaft', polluted: 'verschmutzt', pedestrianised: 'autofrei', bustling: 'belebt',
  },
};
