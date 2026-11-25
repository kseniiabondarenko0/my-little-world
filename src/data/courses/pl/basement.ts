import type { RoomCourse } from '../types';

export const basement: RoomCourse = {
  title: 'Moja piwnica',
  bins: { tools: 'Narzędzia', cleaning: 'Sprzątanie', stored: 'Duże rzeczy', actions: 'Co robisz' },
  objects: {
    workbench: ['stół warsztatowy', 'Mocny stół do majsterkowania.', 'Młotek leży na stole warsztatowym.', 'stołu warsztatowego', 'stołem warsztatowym'],
    shelving: ['regał magazynowy', 'Duży regał na pudła i rzeczy.', 'Pudła stoją na regale magazynowym.', 'regału magazynowego', 'regałem magazynowym'],
    boiler: ['piec gazowy', 'Grzeje wodę i cały dom.', 'Piec gazowy stoi w piwnicy.', 'pieca gazowego', 'piecem gazowym'],
    'chest-freezer': ['zamrażarka skrzyniowa', 'Duża, zimna skrzynia na mrożone jedzenie.', 'Lody są w zamrażarce skrzyniowej.', 'zamrażarki skrzyniowej', 'zamrażarką skrzyniową', 'zamrażarkę skrzyniową'],
    toolbox: ['skrzynka na narzędzia', 'Pudełko na narzędzia.', 'Śrubokręt jest w skrzynce na narzędzia.', 'skrzynki na narzędzia', 'skrzynką na narzędzia', 'skrzynkę na narzędzia'],
    ladder: ['drabina', 'Wchodzisz po niej wysoko.', 'Tata stoi na drabinie.', 'drabiny', 'drabiną', 'drabinę'],
    bicycle: ['rower', 'Ma dwa koła i jeździsz na nim.', 'Jeżdżę do szkoły na rowerze.', 'roweru', 'rowerem'],
    'cardboard-box': ['karton', 'Pudło z tektury.', 'Moje stare zabawki są w kartonie.', 'kartonu', 'kartonem'],
    broom: ['miotła', 'Zamiatasz nią podłogę.', 'Miotła stoi w rogu.', 'miotły', 'miotłą', 'miotłę'],
    bucket: ['wiadro', 'Nosisz w nim wodę.', 'Wiadro jest pełne wody.', 'wiadra', 'wiadrem'],
    paint: ['farba', 'Malujesz nią ściany.', 'Niebieska farba jest do mojego pokoju.', 'farby', 'farbą', 'farbę'],
    'fuse-box': ['skrzynka z bezpiecznikami', 'Tu jest prąd dla całego domu.', 'Skrzynka z bezpiecznikami wisi na ścianie.', 'skrzynki z bezpiecznikami', 'skrzynką z bezpiecznikami', 'skrzynkę z bezpiecznikami'],
  },
  words: {
    basement: 'piwnica', cellar: 'piwniczka', pipe: 'rura', 'light-bulb': 'żarówka', stepladder: 'drabinka', storeroom: 'składzik',
    'water-heater': 'podgrzewacz wody',
    hammer: 'młotek', tool: 'narzędzie', screwdriver: 'śrubokręt', nail: 'gwóźdź', saw: 'piła', paintbrush: 'pędzel', mop: 'mop',
    dustpan: 'szufelka', spider: 'pająk', screw: 'śruba', drill: 'wiertarka', 'tape-measure': 'miarka', spanner: 'klucz płaski',
    tyre: 'opona', pump: 'pompka', cobweb: 'pajęczyna', fuse: 'bezpiecznik', 'power-tool': 'elektronarzędzie',
    fix: 'naprawiać', 'ride-a-bike': 'jeździć na rowerze', climb: 'wspinać się', sweep: 'zamiatać', 'paint-the-wall': 'malować ścianę',
    repair: 'remontować', label: 'podpisywać', 'pump-up': 'pompować', 'sort-out': 'porządkować', 'get-rid-of': 'pozbywać się',
    insulate: 'ocieplać',
    heavy: 'ciężki', broken: 'zepsuty', scary: 'straszny', dusty: 'zakurzony', damp: 'wilgotny', rusty: 'zardzewiały', sharp: 'ostry',
    flammable: 'łatwopalny', 'poorly-lit': 'słabo oświetlony',
  },
};
