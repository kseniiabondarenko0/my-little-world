import type { RoomCourse } from '../types';

export const hallway: RoomCourse = {
  title: 'Mój przedpokój',
  bins: { furniture: 'Meble', wear: 'Rzeczy do ubrania', things: 'Przydatne rzeczy', actions: 'Co robisz' },
  objects: {
    'coat-stand': ['wieszak stojący', 'Wieszasz na nim płaszcze i kurtki.', 'Moja kurtka wisi na wieszaku stojącym.', 'wieszaka stojącego', 'wieszakiem stojącym'],
    'shoe-rack': ['szafka na buty', 'Mebel na buty.', 'Włóż buty do szafki na buty.', 'szafki na buty', 'szafką na buty', 'szafkę na buty'],
    stairs: ['schody', 'Po nich idziesz na górę.', 'Schody prowadzą do sypialni.', 'schodów', 'schodami', 'pl'],
    'hall-table': ['stolik w przedpokoju', 'Wąski stolik w przedpokoju.', 'Poczta leży na stoliku w przedpokoju.', 'stolika w przedpokoju', 'stolikiem w przedpokoju'],
    'umbrella-stand': ['stojak na parasole', 'Tu stoją mokre parasole.', 'Mój parasol jest w stojaku na parasole.', 'stojaka na parasole', 'stojakiem na parasole'],
    bench: ['ławka', 'Siedzisz na niej i zakładasz buty.', 'Siedzę na ławce i zakładam kozaki.', 'ławki', 'ławką', 'ławkę'],
    'key-hook': ['wieszak na klucze', 'Tu wiszą klucze.', 'Klucze wiszą na wieszaku na klucze.', 'wieszaka na klucze', 'wieszakiem na klucze'],
    noticeboard: ['tablica korkowa', 'Wiszą na niej notatki i kartki.', 'Na tablicy korkowej jest kartka od mamy.', 'tablicy korkowej', 'tablicą korkową', 'tablicę korkową'],
    runner: ['dywanik do przedpokoju', 'Długi, wąski dywan w przedpokoju.', 'Dywanik do przedpokoju leży przy drzwiach.', 'dywanika do przedpokoju', 'dywanikiem do przedpokoju'],
    telephone: ['telefon', 'Dzwonisz nim do kogoś.', 'Telefon dzwoni!', 'telefonu', 'telefonem'],
    torch: ['latarka', 'Mała lampa na ciemne miejsca.', 'W piwnicy potrzebuję latarki.', 'latarki', 'latarką', 'latarkę'],
    scooter: ['hulajnoga', 'Szybko jeździsz nią do szkoły.', 'Moja hulajnoga stoi w przedpokoju.', 'hulajnogi', 'hulajnogą', 'hulajnogę'],
  },
  words: {
    hall: 'hol', hallway: 'przedpokój', upstairs: 'na górze', downstairs: 'na dole', step: 'stopień', corridor: 'korytarz',
    'light-switch': 'włącznik światła', hook: 'haczyk', landing: 'półpiętro', banister: 'poręcz',
    'cupboard-under-the-stairs': 'schowek pod schodami', alcove: 'wnęka',
    coat: 'płaszcz', jacket: 'kurtka', hat: 'czapka', keys: 'klucze', umbrella: 'parasol', boots: 'kozaki', helmet: 'kask',
    raincoat: 'płaszcz przeciwdeszczowy', note: 'kartka', 'drawing-pin': 'pinezka', battery: 'bateria', 'spare-key': 'zapasowy klucz',
    shoehorn: 'łyżka do butów', landline: 'telefon stacjonarny',
    'go-upstairs': 'iść na górę', 'put-on': 'zakładać', 'take-off': 'zdejmować', 'hang-up': 'wieszać', 'answer-the-phone': 'odbierać telefon',
    'leave-a-message': 'zostawić wiadomość', ring: 'dzwonić', pin: 'przypinać', 'trip-over': 'potknąć się', 'lace-up': 'sznurować',
    declutter: 'pozbywać się zbędnych rzeczy',
    long: 'długi', narrow: 'wąski', muddy: 'zabłocony', steep: 'stromy', draughty: 'z przeciągami', welcoming: 'gościnny',
  },
};
