export const theory = [
  {
    title: 'Enum-Definition',
    content: 'Ein Enum (Aufzählungstyp) definiert eine feste Menge benannter Konstanten. Enums sind typsicher und verhindern ungültige Werte. Sie werden mit dem Schlüsselwort enum deklariert.',
    code: 'public enum Jahreszeit {\n    FRUEHLING, SOMMER, HERBST, WINTER\n}'
  },
  {
    title: 'Enum mit Attributen und Konstruktor',
    content: 'Enums können eigene Attribute und Konstruktoren haben. Der Konstruktor ist immer implizit private. Die Werte werden mit Argumenten in Klammern definiert.',
    code: 'public enum EngineType {\n    ELECTRO("Strom"), DIESEL("Diesel");\n\n    private final String fuel;\n    EngineType(String fuel) {\n        this.fuel = fuel;\n    }\n    public String getFuel() { return fuel; }\n}'
  },
  {
    title: 'Enum-Methoden: values(), valueOf(), ordinal(), name()',
    content: 'values() gibt ein Array aller Enum-Werte zurück. valueOf("NAME") liefert den Enum-Wert mit dem angegebenen Namen. ordinal() gibt die Position (0-basiert) zurück. name() gibt den Namen als String zurück.',
    code: 'EngineType[] alle = EngineType.values();\nEngineType e = EngineType.valueOf("ELECTRO");\ne.ordinal() // 0\ne.name()    // "ELECTRO"'
  },
  {
    title: 'Enum mit eigenen Methoden',
    content: 'Enums können beliebige Methoden definieren. Damit lassen sich Verhaltensweisen direkt an die Enum-Werte koppeln.',
    code: 'public enum EngineType {\n    ELECTRO, HYBRID, DIESEL;\n\n    public boolean isSustainable() {\n        return this == ELECTRO || this == HYBRID;\n    }\n}'
  },
  {
    title: 'Enum in switch',
    content: 'Enums eignen sich hervorragend für switch-Anweisungen. In switch-case-Blöcken werden die Enum-Werte ohne Präfix verwendet.',
    code: 'EngineType engine = EngineType.ELECTRO;\nswitch (engine) {\n    case ELECTRO -> System.out.println("Leise");\n    case DIESEL  -> System.out.println("Laut");\n}'
  }
];

export const questions = [
  { id: 'm7q1', type: 'mc', question: 'Was ist ein Enum in Java?', options: ['Eine Schleifenart', 'Ein Aufzählungstyp mit festen, benannten Werten', 'Ein Array von Strings', 'Eine abstrakte Klasse'], answer: 'Ein Aufzählungstyp mit festen, benannten Werten', explanation: 'Ein Enum definiert eine endliche Menge von Konstanten, die typsicher verwendet werden können.' },
  { id: 'm7q2', type: 'mc', question: 'Wie definiert man ein Enum mit Eigenschaften?', options: ['Mit Getter und public Konstruktor', 'Mit Attribut, privatem Konstruktor und Getter', 'Mit einer ArrayList', 'Mit Vererbung von Object'], answer: 'Mit Attribut, privatem Konstruktor und Getter', explanation: 'Enum-Werte erhalten Argumente, die über einen (implizit privaten) Konstruktor den Attributen zugewiesen werden.' },
  { id: 'm7q3', type: 'mc', question: 'Was gibt EngineType.values().length zurück, wenn EngineType die Werte ELECTRO und DIESEL hat?', options: ['0', '1', '2', '3'], answer: '2', explanation: 'values() gibt ein Array aller Enum-Werte zurück. Bei ELECTRO und DIESEL hat das Array die Länge 2.' },
  { id: 'm7q4', type: 'truefalse', question: 'Ein Enum kann eigene Methoden haben.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Enums können beliebige Methoden definieren, z.B. isSustainable() oder getDescription().' },
  { id: 'm7q5', type: 'truefalse', question: 'Enum-Werte werden mit new erstellt.', options: ['Wahr', 'Falsch'], answer: 'Falsch', explanation: 'Enum-Werte werden direkt in der Enum-Definition deklariert, nicht mit new. Der Konstruktor ist implizit private.' },
  { id: 'm7q6', type: 'mc', question: 'Was gibt die Methode ordinal() bei einem Enum-Wert zurück?', options: ['Den Namen des Werts', 'Die Position des Werts (0-basiert)', 'Die Anzahl aller Werte', 'Den Hashcode'], answer: 'Die Position des Werts (0-basiert)', explanation: 'ordinal() gibt die Position des Enum-Werts in der Deklarationsreihenfolge zurück, beginnend bei 0.' },
  { id: 'm7q7', type: 'mc', question: 'Was gibt EngineType.valueOf("ELECTRO") zurück?', options: ['Den String "ELECTRO"', 'null', 'EngineType.ELECTRO', 'Eine IllegalArgumentException'], answer: 'EngineType.ELECTRO', explanation: 'valueOf() konvertiert einen String in den entsprechenden Enum-Wert. "ELECTRO" liefert EngineType.ELECTRO.' },
  { id: 'm7q8', type: 'truefalse', question: 'Ein Enum kann Interfaces implementieren.', options: ['Wahr', 'Falsch'], answer: 'Wahr', explanation: 'Enums können Interfaces implementieren, z.B. Comparable oder eigene Interfaces.' },
  { id: 'm7q9', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'public enum EngineType {\n    ELECTRO, HYBRID, DIESEL;\n    public boolean isSustainable() {\n        return this == ELECTRO || this == HYBRID;\n    }\n}\nSystem.out.println(EngineType.DIESEL.isSustainable());', options: ['true', 'false', 'DIESEL', 'Compilerfehler'], answer: 'false', explanation: 'DIESEL ist weder ELECTRO noch HYBRID, daher gibt isSustainable() false zurück.' },
  { id: 'm7q10', type: 'mc', question: 'Was gibt folgender Code aus?', code: 'enum Farbe { ROT, GRUEN, BLAU }\nFarbe f = Farbe.GRUEN;\nswitch (f) {\n    case ROT   -> System.out.print("R");\n    case GRUEN -> System.out.print("G");\n    case BLAU  -> System.out.print("B");\n}', options: ['ROT', 'R', 'G', 'GRUEN'], answer: 'G', explanation: 'f ist GRUEN, daher wird der case GRUEN ausgeführt und "G" ausgegeben.' }
];
