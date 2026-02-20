export const theory = [
  {
    title: 'Was ist Java? JDK, JRE, JVM',
    content: 'Java ist eine objektorientierte, plattformunabhängige Programmiersprache. Das JDK (Java Development Kit) enthält Compiler und Tools. Die JRE (Java Runtime Environment) stellt die Laufzeitumgebung bereit. Die JVM (Java Virtual Machine) führt den Bytecode aus.'
  },
  {
    title: 'Aufbau einer Java-Klasse',
    content: 'Jede Java-Datei enthält mindestens eine Klasse. Die main-Methode ist der Einstiegspunkt.',
    code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hallo Welt!");\n    }\n}'
  },
  {
    title: 'Primitive Datentypen',
    content: 'Java hat 8 primitive Datentypen: byte (8 Bit, -128 bis 127), short (16 Bit), int (32 Bit), long (64 Bit), float (32 Bit Kommazahl), double (64 Bit Kommazahl), char (16 Bit Unicode-Zeichen), boolean (true/false).'
  },
  {
    title: 'Wrapper-Klassen',
    content: 'Für jeden primitiven Typ gibt es eine Wrapper-Klasse (int → Integer, double → Double usw.). Wrapper sind Objekte und können null sein. Autoboxing wandelt automatisch zwischen primitiv und Wrapper um.'
  },
  {
    title: 'Typumwandlung (Casting)',
    content: 'Implizites Casting (Widening): kleinerer → größerer Typ automatisch. Explizites Casting (Narrowing): größerer → kleinerer Typ mit (typ). Bei Casting von double zu int wird abgeschnitten, nicht gerundet.',
    code: 'double d = 3.9;\nint i = (int) d; // i = 3 (abgeschnitten!)'
  },
  {
    title: 'Variablen und final',
    content: 'Variablen speichern Werte eines bestimmten Typs. Mit dem Schlüsselwort final wird eine Konstante deklariert, deren Wert nicht mehr geändert werden kann.',
    code: 'final int MAX = 100;\n// MAX = 200; // Compilerfehler!'
  },
  {
    title: 'Strings und Methoden',
    content: 'Strings sind Objekte (keine Primitiven). Wichtige Methoden: length(), charAt(), substring(), equals(), toUpperCase(), toLowerCase(). == vergleicht Referenzen, equals() vergleicht Inhalte.',
    code: 'String s = "Hallo";\ns.length();    // 5\ns.charAt(0);   // \'H\''
  },
  {
    title: 'Escape-Sequenzen und Binärzahlen',
    content: 'Escape-Sequenzen: \\n (Zeilenumbruch), \\t (Tab), \\\\ (Backslash), \\" (Anführungszeichen). Binärzahlen beginnen mit 0b, z.B. 0b1010 = 10 dezimal.'
  }
];

export const questions = [
  { id: 'm1q1', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println((int) 3.9);', options: ['3.9', '4', '3', 'Compilerfehler'], answer: '3', explanation: 'Beim Casting von double zu int wird der Nachkommateil abgeschnitten, nicht gerundet.' },
  { id: 'm1q2', type: 'mc', question: 'Was ist der Unterschied zwischen int und Integer?', options: ['Kein Unterschied', 'int ist größer als Integer', 'int ist primitiv, Integer ist eine Wrapper-Klasse (Objekt)', 'Integer ist schneller'], answer: 'int ist primitiv, Integer ist eine Wrapper-Klasse (Objekt)', explanation: 'int ist ein primitiver Datentyp, Integer ist die zugehörige Wrapper-Klasse und somit ein Objekt.' },
  { id: 'm1q3', type: 'mc', question: 'Was gibt "Hallo".length() aus?', options: ['4', '5', '6', 'Compilerfehler'], answer: '5', explanation: '"Hallo" hat 5 Zeichen: H-a-l-l-o.' },
  { id: 'm1q4', type: 'mc', question: 'Was passiert bei folgendem Code?', code: 'int x = 0b1010;', options: ['x = 1010', 'x = 10', 'Compilerfehler', 'x = 0'], answer: 'x = 10', explanation: '0b1010 ist eine Binärzahl. 1·8 + 0·4 + 1·2 + 0·1 = 10 dezimal.' },
  { id: 'm1q5', type: 'mc', question: 'Was ist der Unterschied zwischen == und .equals() bei Strings?', options: ['Kein Unterschied', '== vergleicht Referenzen, equals() vergleicht den Inhalt', '== ist schneller', 'equals() funktioniert nur mit Zahlen'], answer: '== vergleicht Referenzen, equals() vergleicht den Inhalt', explanation: '== prüft, ob zwei Variablen auf dasselbe Objekt zeigen. equals() prüft, ob der Inhalt identisch ist.' },
  { id: 'm1q6', type: 'mc', question: 'Was gibt folgender Code aus?', code: "System.out.println('A' + 1);", options: ['A1', 'B', '66', 'Compilerfehler'], answer: '66', explanation: "'A' hat den ASCII-Wert 65. Bei der Addition mit einem int wird char zu int umgewandelt: 65 + 1 = 66." },
  { id: 'm1q7', type: 'mc', question: 'Welcher Datentyp eignet sich für Kommazahlen mit hoher Genauigkeit?', options: ['float', 'int', 'double', 'long'], answer: 'double', explanation: 'double hat 64 Bit und bietet höhere Genauigkeit als float (32 Bit).' },
  { id: 'm1q8', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println("Ha" + "llo");', options: ['"Ha" + "llo"', 'Hallo', 'Compilerfehler', 'null'], answer: 'Hallo', explanation: 'Der +-Operator verkettet Strings zu einem neuen String: "Ha" + "llo" = "Hallo".' },
  { id: 'm1q9', type: 'mc', question: 'Was passiert bei folgendem Code?', code: 'byte b = 128;', options: ['b = 128', 'b = -128', 'Compilerfehler', 'b = 0'], answer: 'Compilerfehler', explanation: 'byte hat den Wertebereich -128 bis 127. Der Wert 128 liegt außerhalb und erzeugt einen Compilerfehler.' },
  { id: 'm1q10', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println(5 / 2);', options: ['2.5', '2', '3', 'Compilerfehler'], answer: '2', explanation: 'Bei der Ganzzahldivision (int / int) wird der Nachkommateil abgeschnitten: 5 / 2 = 2.' },
  { id: 'm1q11', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'System.out.println(5.0 / 2);', options: ['2', '2.5', '3.0', 'Compilerfehler'], answer: '2.5', explanation: 'Da 5.0 ein double ist, wird eine Gleitkommadivision durchgeführt: 5.0 / 2 = 2.5.' },
  { id: 'm1q12', type: 'mc', question: 'Was bedeutet folgende Deklaration?', code: 'final int X = 5;', options: ['X ist eine Variable', 'X ist eine Konstante, die nicht mehr geändert werden kann', 'X wird automatisch erhöht', 'X ist ein String'], answer: 'X ist eine Konstante, die nicht mehr geändert werden kann', explanation: 'Das Schlüsselwort final macht eine Variable zur Konstante. Der Wert kann nach der Zuweisung nicht geändert werden.' },
  { id: 'm1q13', type: 'mc', question: 'Was gibt "Hello".charAt(0) zurück?', options: ["'H'", "'e'", "'o'", "0"], answer: "'H'", explanation: 'charAt(0) gibt das erste Zeichen (Index 0) des Strings zurück, also \'H\'.' },
  { id: 'm1q14', type: 'text', question: 'Was ist die Binärzahl 0b1010010 als Dezimalzahl? (Nur die Zahl eingeben)', answer: '82', explanation: '0b1010010 = 1·64 + 0·32 + 1·16 + 0·8 + 0·4 + 1·2 + 0·1 = 64 + 16 + 2 = 82.' },
  { id: 'm1q15', type: 'mc', question: 'Was passiert bei folgendem Code?', code: 'String s = null;\nSystem.out.println(s.length());', options: ['0', 'null', 'NullPointerException', 'Compilerfehler'], answer: 'NullPointerException', explanation: 'Da s null ist, führt der Aufruf von s.length() zu einer NullPointerException zur Laufzeit.' }
];
