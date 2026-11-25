import type { RoomCourse } from '../types';

export const school: RoomCourse = {
  title: 'Meine Schule',
  bins: { classroom: 'Im Klassenzimmer', subjects: 'Fächer', people: 'Menschen & Orte', actions: 'Was du tust' },
  objects: {
    whiteboard: ['die Tafel', 'Die Lehrerin schreibt darauf.', 'Die Lehrerin schreibt das Datum an die Tafel.'],
    'teachers-desk': ['das Lehrerpult', 'Der Tisch der Lehrerin oder des Lehrers.', 'Die Hefte liegen auf dem Lehrerpult.'],
    'school-desk': ['die Schulbank', 'Hier sitzt du im Unterricht.', 'Mein Heft liegt auf der Schulbank.'],
    locker: ['das Schließfach', 'Ein kleiner Schrank mit Schloss für deine Sachen.', 'Meine Jacke ist im Schließfach.'],
    globe: ['der Globus', 'Eine runde Karte der Erde.', 'Auf dem Globus suche ich die Ukraine.'],
    'world-map': ['die Weltkarte', 'Eine Karte mit allen Ländern.', 'Die Weltkarte hängt an der Wand.'],
    timetable: ['der Stundenplan', 'Er zeigt die Fächer für jeden Tag.', 'Laut Stundenplan haben wir heute Mathe.'],
    'pencil-case': ['das Federmäppchen', 'Darin sind Stifte und ein Radiergummi.', 'Mein Bleistift ist im Federmäppchen.'],
    'school-bag': ['die Schultasche', 'Darin trägst du Bücher und Hefte.', 'Meine Schultasche ist heute sehr schwer.'],
    projector: ['der Beamer', 'Er zeigt Bilder groß an der Wand.', 'Der Lehrer macht den Beamer an.'],
    textbooks: ['die Schulbücher', 'Bücher für den Unterricht.', 'Die Schulbücher liegen im Regal.', 'pl'],
    microscope: ['das Mikroskop', 'Damit siehst du ganz kleine Dinge.', 'Wir schauen durch das Mikroskop.'],
  },
  words: {
    school: 'die Schule', classroom: 'das Klassenzimmer', teacher: 'der Lehrer', student: 'der Schüler', classmate: 'der Mitschüler',
    playground: 'der Schulhof', library: 'die Bibliothek', canteen: 'die Mensa', gym: 'die Turnhalle', 'head-teacher': 'der Schulleiter',
    'science-lab': 'das Labor', lesson: 'die Unterrichtsstunde', homework: 'die Hausaufgaben',
    maths: 'Mathe', english: 'Englisch', geography: 'Erdkunde', history: 'Geschichte', science: 'Naturwissenschaften', art: 'Kunst',
    pe: 'Sport', ruler: 'das Lineal', rubber: 'der Radiergummi', marker: 'der Filzstift', break: 'die Pause', test: 'der Test',
    exam: 'die Prüfung', report: 'das Zeugnis', uniform: 'die Schuluniform', presentation: 'das Referat', experiment: 'das Experiment',
    curriculum: 'der Lehrplan', deadline: 'die Abgabefrist',
    learn: 'lernen', write: 'schreiben', listen: 'zuhören', 'put-your-hand-up': 'sich melden', 'be-late': 'zu spät kommen',
    revise: 'wiederholen', 'hand-in': 'abgeben', 'pass-an-exam': 'eine Prüfung bestehen', copy: 'abschreiben',
    concentrate: 'sich konzentrieren',
    easy: 'leicht', difficult: 'schwierig', interesting: 'interessant', boring: 'langweilig', strict: 'streng', compulsory: 'verpflichtend',
  },
};
