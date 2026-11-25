import type { RoomCourse } from '../types';

export const hospital: RoomCourse = {
  title: 'Mój szpital',
  bins: { equipment: 'Sprzęt', health: 'Ciało i zdrowie', people: 'Ludzie i miejsca', actions: 'Co robisz' },
  objects: {
    'hospital-bed': ['łóżko szpitalne', 'Łóżko dla chorych w szpitalu.', 'Pacjent leży w łóżku szpitalnym.', 'łóżka szpitalnego', 'łóżkiem szpitalnym'],
    wheelchair: ['wózek inwalidzki', 'Krzesło z dużymi kołami.', 'Pielęgniarka pcha wózek inwalidzki.', 'wózka inwalidzkiego', 'wózkiem inwalidzkim'],
    'drip-stand': ['stojak na kroplówkę', 'Wisi na nim kroplówka.', 'Stojak na kroplówkę stoi obok łóżka.', 'stojaka na kroplówkę', 'stojakiem na kroplówkę'],
    'medical-trolley': ['wózek medyczny', 'Wózek z lekami i bandażami.', 'Leki są na wózku medycznym.', 'wózka medycznego', 'wózkiem medycznym'],
    crutches: ['kule', 'Pomagają chodzić, kiedy masz chorą nogę.', 'Po wypadku chodzę o kulach.', 'kul', 'kulami', 'pl'],
    stethoscope: ['stetoskop', 'Lekarka słucha nim serca.', 'Lekarka ma stetoskop.', 'stetoskopu', 'stetoskopem'],
    thermometer: ['termometr', 'Mierzy twoją temperaturę.', 'Termometr pokazuje 38 stopni.', 'termometru', 'termometrem'],
    bandage: ['bandaż', 'Owijasz nim ranę.', 'Mam bandaż na ręce.', 'bandaża', 'bandażem'],
    syringe: ['strzykawka', 'Pielęgniarka robi nią zastrzyk.', 'Pielęgniarka ma strzykawkę.', 'strzykawki', 'strzykawką', 'strzykawkę'],
    'heart-monitor': ['monitor pracy serca', 'Pokazuje, jak bije twoje serce.', 'Monitor pracy serca cicho pika.', 'monitora pracy serca', 'monitorem pracy serca'],
    'x-ray': ['zdjęcie rentgenowskie', 'Zdjęcie twoich kości.', 'Na zdjęciu rentgenowskim widać kość.', 'zdjęcia rentgenowskiego', 'zdjęciem rentgenowskim'],
    'eye-chart': ['tablica do badania wzroku', 'Tablica z literami do badania oczu.', 'Czytam litery na tablicy do badania wzroku.', 'tablicy do badania wzroku', 'tablicą do badania wzroku', 'tablicę do badania wzroku'],
  },
  words: {
    hospital: 'szpital', doctor: 'lekarz', nurse: 'pielęgniarka', patient: 'pacjent', ambulance: 'karetka',
    'waiting-room': 'poczekalnia', pharmacy: 'apteka', ward: 'oddział', surgeon: 'chirurg', emergency: 'nagły wypadek',
    medicine: 'lek', pill: 'tabletka', headache: 'ból głowy', 'stomach-ache': 'ból brzucha', 'sore-throat': 'ból gardła',
    cough: 'kaszel', fever: 'gorączka', flu: 'grypa', temperature: 'temperatura', heart: 'serce', bone: 'kość', blood: 'krew',
    injection: 'zastrzyk', appointment: 'wizyta', prescription: 'recepta', operation: 'operacja', symptom: 'objaw', eyesight: 'wzrok',
    heartbeat: 'bicie serca', diagnosis: 'diagnoza',
    hurt: 'boleć', help: 'pomagać', 'feel-better': 'czuć się lepiej', 'break-your-leg': 'złamać nogę', 'take-medicine': 'brać lekarstwo',
    examine: 'badać', recover: 'wracać do zdrowia', sprain: 'skręcić',
    ill: 'chory', well: 'zdrów', painful: 'bolesny', serious: 'poważny', allergic: 'uczulony', infectious: 'zakaźny',
  },
};
