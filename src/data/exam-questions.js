export const examQuestions = [
  {
    id: 'exam1', moduleId: 6, type: 'mc',
    question: 'Was macht static ArrayList<Vehicle> allVehicles = new ArrayList<>(); im Konstruktor mit allVehicles.add(this)?',
    options: ['Speichert alle erstellten Fahrzeuge', 'Erstellt eine Kopie', 'Löscht alte Fahrzeuge', 'Erstellt ein Array'],
    answer: 'Speichert alle erstellten Fahrzeuge',
    explanation: 'Das Static ArrayList Pattern trackt alle erstellten Instanzen einer Klasse.'
  },
  {
    id: 'exam2', moduleId: 8, type: 'mc',
    question: 'Was ist der Output?',
    code: 'Fahrzeug f = new Auto("BMW");\nSystem.out.println(f instanceof Auto);',
    options: ['true', 'false', 'Compilerfehler', 'Laufzeitfehler'],
    answer: 'true',
    explanation: 'Der dynamische Typ von f ist Auto, daher gibt instanceof Auto true zurück.'
  },
  {
    id: 'exam3', moduleId: 12, type: 'mc',
    question: 'Klasse Person implements Comparable<Person> mit compareTo nach Alter aufsteigend. Was sortiert Collections.sort(liste)?',
    options: ['Nach Alter aufsteigend', 'Nach Alter absteigend', 'Nach Name', 'Gar nicht'],
    answer: 'Nach Alter aufsteigend',
    explanation: 'Collections.sort() nutzt die compareTo-Methode von Comparable für die natürliche Ordnung.'
  },
  {
    id: 'exam4', moduleId: 11, type: 'mc',
    question: 'Was passiert wenn eine checked Exception nicht gefangen und nicht mit throws deklariert wird?',
    options: ['Compilerfehler', 'Laufzeitfehler', 'Exception wird ignoriert', 'Programm läuft weiter'],
    answer: 'Compilerfehler',
    explanation: 'Checked Exceptions müssen entweder gefangen (try-catch) oder deklariert (throws) werden.'
  },
  {
    id: 'exam5', moduleId: 9, type: 'mc',
    question: 'Eine Klasse kann gleichzeitig...',
    options: [
      'Eine Klasse erweitern UND mehrere Interfaces implementieren',
      'Mehrere Klassen erweitern',
      'Nur ein Interface implementieren',
      'Weder erweitern noch implementieren'
    ],
    answer: 'Eine Klasse erweitern UND mehrere Interfaces implementieren',
    explanation: 'Java erlaubt Einfachvererbung + mehrere Interfaces: class X extends Y implements A, B {}'
  },
  {
    id: 'exam6', moduleId: 7, type: 'mc',
    question: 'Was ist der Output?',
    code: 'enum Size { S, M, L, XL }\nSystem.out.println(Size.M.ordinal());',
    options: ['1', '0', '2', 'M'],
    answer: '1',
    explanation: 'ordinal() gibt die Position zurück (0-basiert). S=0, M=1, L=2, XL=3.'
  },
  {
    id: 'exam7', moduleId: 10, type: 'mc',
    question: 'Was ist der Output?',
    code: 'ArrayList<Integer> l = new ArrayList<>();\nl.add(1); l.add(2); l.add(3);\nl.remove(1);\nSystem.out.println(l);',
    options: ['[1, 3]', '[2, 3]', '[1, 2]', 'Fehler'],
    answer: '[1, 3]',
    explanation: 'remove(1) entfernt das Element an Index 1 (die 2), nicht den Wert 1.'
  },
  {
    id: 'exam8', moduleId: 6, type: 'mc',
    question: 'Welche Sichtbarkeit sollten Attribute in der Regel haben?',
    options: ['private', 'public', 'protected', 'package-private'],
    answer: 'private',
    explanation: 'Kapselung: Attribute private, Zugriff über Getter/Setter.'
  },
  {
    id: 'exam9', moduleId: 8, type: 'mc',
    question: 'Was passiert hier?',
    code: 'Fahrzeug f = new Fahrrad();\nAuto a = (Auto) f;',
    options: ['ClassCastException', 'Compilerfehler', 'Funktioniert', 'null'],
    answer: 'ClassCastException',
    explanation: 'Fahrrad ist kein Auto. Der Downcast schlägt zur Laufzeit fehl.'
  },
  {
    id: 'exam10', moduleId: 1, type: 'mc',
    question: 'Was ist der Output?',
    code: 'System.out.println(5 + 3 + "ha" + 5 + 3);',
    options: ['8ha53', '8ha8', '53ha53', '8ha53'],
    answer: '8ha53',
    explanation: '5+3=8, dann "8"+"ha"="8ha", dann "8ha"+"5"="8ha5", dann "8ha5"+"3"="8ha53".'
  },
]
