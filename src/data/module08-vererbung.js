export const theory = [
  {
    title: 'Vererbung mit extends',
    content: 'Vererbung erlaubt es, eine neue Klasse (Unterklasse) aus einer bestehenden Klasse (Oberklasse) abzuleiten. Die Unterklasse erbt alle nicht-privaten Attribute und Methoden. Java erlaubt nur Einfachvererbung.',
    code: 'public class Fahrzeug {\n    protected String marke;\n    public void fahren() { System.out.println("Fahre..."); }\n}\npublic class Auto extends Fahrzeug {\n    private int tueren;\n}'
  },
  {
    title: 'super-Keyword und super()',
    content: 'super() ruft den Konstruktor der Oberklasse auf und muss die erste Anweisung im Unterklassen-Konstruktor sein. super.methode() ruft eine Methode der Oberklasse auf. Wenn kein super()-Aufruf vorhanden ist, fügt Java automatisch super() (parameterlos) ein.',
    code: 'public class Auto extends Fahrzeug {\n    public Auto(String marke, int tueren) {\n        super();  // Eltern-Konstruktor\n        this.tueren = tueren;\n    }\n}'
  },
  {
    title: 'Methoden überschreiben (@Override)',
    content: '@Override kennzeichnet eine Methode, die eine geerbte Methode überschreibt. Die Annotation ist optional, aber empfohlen, da sie Compilerfehler bei Tippfehlern verhindert.',
    code: 'public class Auto extends Fahrzeug {\n    @Override\n    public void fahren() {\n        System.out.println("Auto fährt!");\n    }\n}'
  },
  {
    title: 'Polymorphie: Statischer vs. Dynamischer Typ',
    content: 'Statischer Typ = deklarierter Typ (links vom =). Dynamischer Typ = tatsächlicher Typ des Objekts (rechts vom =). Der statische Typ bestimmt, welche Methoden aufrufbar sind. Der dynamische Typ bestimmt, welche Implementation ausgeführt wird.',
    code: 'Fahrzeug f = new Auto();\n// Statischer Typ: Fahrzeug\n// Dynamischer Typ: Auto\nf.fahren(); // Ruft Auto.fahren() auf!'
  },
  {
    title: 'Upcast und Downcast',
    content: 'Upcast (Unterklasse zu Oberklasse) geschieht implizit und ist immer sicher. Downcast (Oberklasse zu Unterklasse) muss explizit erfolgen und kann zur ClassCastException führen.',
    code: 'Auto a = new Auto();\nFahrzeug f = a;           // Upcast (implizit)\nAuto a2 = (Auto) f;       // Downcast (explizit)\n// Sicher mit instanceof:\nif (f instanceof Auto auto) {\n    auto.gettueren();\n}'
  },
  {
    title: 'instanceof und Pattern Matching',
    content: 'instanceof prüft, ob ein Objekt eine Instanz eines bestimmten Typs ist. Mit Pattern Matching (Java 16+) kann gleichzeitig geprüft und gecastet werden.',
    code: 'if (f instanceof Auto a) {\n    // a ist bereits als Auto verfügbar\n    System.out.println(a.getTueren());\n}'
  },
  {
    title: 'Zusammenfassung: Statischer und Dynamischer Typ',
    content: 'Merke: Statischer Typ bestimmt die aufrufbaren Methoden (was der Compiler erlaubt). Dynamischer Typ bestimmt die tatsächliche Implementation (was zur Laufzeit ausgeführt wird). Das ist das Kernprinzip der Polymorphie.'
  }
];

export const questions = [
  { id: 'm8q1', type: 'mc', question: 'Was bedeutet Vererbung in Java?', options: ['Eine Klasse wird kopiert', 'Eine Klasse übernimmt Eigenschaften und Methoden einer anderen Klasse', 'Zwei Klassen werden zusammengeführt', 'Eine Klasse wird gelöscht'], answer: 'Eine Klasse übernimmt Eigenschaften und Methoden einer anderen Klasse', explanation: 'Vererbung erlaubt einer Unterklasse, Attribute und Methoden der Oberklasse zu erben und zu erweitern.' },
  { id: 'm8q2', type: 'mc', question: 'Was macht super()?', options: ['Ruft die main-Methode auf', 'Erstellt ein neues Objekt', 'Ruft den Konstruktor der Oberklasse auf', 'Löscht das aktuelle Objekt'], answer: 'Ruft den Konstruktor der Oberklasse auf', explanation: 'super() ruft den Konstruktor der Elternklasse auf, um deren Initialisierung durchzuführen.' },
  { id: 'm8q3', type: 'mc', question: 'Was ist der Unterschied zwischen statischem und dynamischem Typ?', options: ['Kein Unterschied', 'Statisch = deklarierter Typ, dynamisch = tatsächlicher Typ des Objekts', 'Statisch = zur Laufzeit, dynamisch = zur Compilezeit', 'Beides ist der gleiche Typ'], answer: 'Statisch = deklarierter Typ, dynamisch = tatsächlicher Typ des Objekts', explanation: 'Der statische Typ steht links vom =, der dynamische Typ ist der tatsächliche Typ des Objekts (rechts bei new).' },
  { id: 'm8q4', type: 'mc', question: 'Was ist ein Upcast?', options: ['Explizite Umwandlung in Oberklasse', 'Implizite Umwandlung von Unterklasse zu Oberklasse', 'Umwandlung in einen primitiven Typ', 'Umwandlung von Oberklasse zu Unterklasse'], answer: 'Implizite Umwandlung von Unterklasse zu Oberklasse', explanation: 'Ein Upcast (z.B. Fahrzeug f = new Auto()) geschieht implizit und ist immer sicher.' },
  { id: 'm8q5', type: 'mc', question: 'Was ist ein Downcast?', options: ['Implizite Umwandlung in Unterklasse', 'Explizite Umwandlung von Oberklasse zu Unterklasse', 'Automatische Typkonvertierung', 'Umwandlung in String'], answer: 'Explizite Umwandlung von Oberklasse zu Unterklasse', explanation: 'Ein Downcast (z.B. Auto a = (Auto) fahrzeug) muss explizit erfolgen und kann fehlschlagen.' },
  { id: 'm8q6', type: 'mc', question: 'Was prüft der instanceof-Operator?', options: ['Ob zwei Objekte gleich sind', 'Ob ein Objekt null ist', 'Ob ein Objekt eine Instanz eines bestimmten Typs ist', 'Ob eine Klasse existiert'], answer: 'Ob ein Objekt eine Instanz eines bestimmten Typs ist', explanation: 'instanceof prüft, ob ein Objekt dem angegebenen Typ oder einer Unterklasse davon angehört.' },
  { id: 'm8q7', type: 'truefalse', question: '@Override ist Pflicht beim Überschreiben von Methoden.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: '@Override ist optional, aber empfohlen. Es hilft dem Compiler, Fehler beim Überschreiben zu erkennen.' },
  { id: 'm8q8', type: 'truefalse', question: 'super() muss die erste Anweisung im Konstruktor der Unterklasse sein.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Der super()-Aufruf muss immer die erste Anweisung im Konstruktor sein, damit die Oberklasse zuerst initialisiert wird.' },
  { id: 'm8q9', type: 'truefalse', question: 'Java unterstützt Mehrfachvererbung von Klassen.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: 'Java erlaubt nur Einfachvererbung. Eine Klasse kann nur von einer Klasse erben. Mehrfachvererbung ist nur über Interfaces möglich.' },
  { id: 'm8q10', type: 'mc', question: 'Was ist der statische Typ bei: Fahrzeug f = new Auto();?', options: ['Auto', 'Fahrzeug', 'Object', 'null'], answer: 'Fahrzeug', explanation: 'Der statische Typ ist der deklarierte Typ links vom Gleichheitszeichen, also Fahrzeug.' },
  { id: 'm8q11', type: 'mc', question: 'Was ist der dynamische Typ bei: Fahrzeug f = new Auto();?', options: ['Fahrzeug', 'Object', 'Auto', 'null'], answer: 'Auto', explanation: 'Der dynamische Typ ist der tatsächliche Typ des erzeugten Objekts, also Auto.' },
  { id: 'm8q12', type: 'mc', question: 'Welche Methoden sind bei Fahrzeug f = new Auto(); aufrufbar?', options: ['Nur Methoden von Auto', 'Nur Methoden von Fahrzeug', 'Methoden von Fahrzeug (statischer Typ bestimmt Aufrufbarkeit)', 'Alle Methoden beider Klassen'], answer: 'Methoden von Fahrzeug (statischer Typ bestimmt Aufrufbarkeit)', explanation: 'Der statische Typ bestimmt, welche Methoden der Compiler erlaubt. Nur Fahrzeug-Methoden sind aufrufbar.' },
  { id: 'm8q13', type: 'mc', question: 'Welche Implementation wird bei f.fahren() ausgeführt, wenn f dynamisch Auto ist?', options: ['Immer Fahrzeug.fahren()', 'Die Implementation von Auto (dynamischer Typ bestimmt)', 'Zufällig', 'Compilerfehler'], answer: 'Die Implementation von Auto (dynamischer Typ bestimmt)', explanation: 'Der dynamische Typ bestimmt, welche Implementation zur Laufzeit ausgeführt wird (Polymorphie).' },
  { id: 'm8q14', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'class Tier {\n    public String sprechen() { return "..."; }\n}\nclass Hund extends Tier {\n    @Override\n    public String sprechen() { return "Wuff"; }\n}\nTier t = new Hund();\nSystem.out.println(t.sprechen());', options: ['...', 'Wuff', 'null', 'Compilerfehler'], answer: 'Wuff', explanation: 'Der dynamische Typ ist Hund. Durch Polymorphie wird Hund.sprechen() aufgerufen, also "Wuff".' },
  { id: 'm8q15', type: 'mc', question: 'Was passiert bei folgendem Code?', code: 'Tier t = new Tier();\nif (t instanceof Hund h) {\n    System.out.println("Hund");\n} else {\n    System.out.println("Kein Hund");\n}', options: ['Hund', 'Kein Hund', 'Compilerfehler', 'ClassCastException'], answer: 'Kein Hund', explanation: 'Das Objekt ist ein Tier, kein Hund. instanceof gibt false zurück, der else-Zweig wird ausgeführt.' },
  { id: 'm8q16', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'class A {\n    public String info() { return "A"; }\n}\nclass B extends A {\n    @Override\n    public String info() { return "B+" + super.info(); }\n}\nSystem.out.println(new B().info());', options: ['A', 'B', 'B+A', 'Compilerfehler'], answer: 'B+A', explanation: 'B.info() gibt "B+" zurück und ruft mit super.info() die Methode der Oberklasse A auf, die "A" zurückgibt.' },
  { id: 'm8q17', type: 'truefalse', question: 'Eine als final deklarierte Klasse kann erweitert (beerbt) werden.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: 'Eine final-Klasse kann nicht erweitert werden. extends auf eine final-Klasse erzeugt einen Compilerfehler.' },
  { id: 'm8q18', type: 'truefalse', question: 'Protected Attribute einer Oberklasse sind in der Unterklasse zugänglich.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'protected erlaubt den Zugriff aus Unterklassen, auch wenn diese in einem anderen Paket liegen.' },
  { id: 'm8q19', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'class Form {\n    public String typ() { return "Form"; }\n}\nclass Kreis extends Form {\n    @Override\n    public String typ() { return "Kreis"; }\n}\nclass FarbigerKreis extends Kreis {\n    @Override\n    public String typ() { return "FarbigerKreis"; }\n}\nForm f = new FarbigerKreis();\nSystem.out.println(f.typ());', options: ['Form', 'Kreis', 'FarbigerKreis', 'Compilerfehler'], answer: 'FarbigerKreis', explanation: 'Der dynamische Typ ist FarbigerKreis. Polymorphie ruft die am weitesten überschriebene Methode auf.' },
  { id: 'm8q20', type: 'truefalse', question: 'Ein falscher Downcast löst zur Laufzeit eine ClassCastException aus.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Wenn der tatsächliche Typ nicht kompatibel ist (z.B. (Auto) einFahrrad), wird eine ClassCastException geworfen.' }
];
