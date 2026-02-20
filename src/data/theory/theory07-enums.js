export const theory = [
  {
    title: 'Was ist ein Enum?',
    content:
      'Ein Enum (kurz fuer "Enumeration" = Aufzaehlung) ist ein spezieller Datentyp in Java, ' +
      'der eine FESTE MENGE von Konstanten definiert.\n\n' +
      'Stell dir vor, du programmierst eine Ampel. Welche Zustaende gibt es? Genau drei: ROT, GELB, GRUEN. ' +
      'Es wird niemals einen vierten Zustand geben. Genau fuer solche Faelle gibt es Enums!\n\n' +
      'Weitere Beispiele aus dem Alltag:\n' +
      '- Wochentage: MONTAG, DIENSTAG, ..., SONNTAG\n' +
      '- Kartensymbole: KREUZ, PIK, HERZ, KARO\n' +
      '- Jahreszeiten: FRUEHLING, SOMMER, HERBST, WINTER\n\n' +
      'Warum nicht einfach Strings verwenden? Weil Enums TYPSICHER sind!\n' +
      'Bei Strings koennte man sich vertippen: "Rot", "rot", "ROT" -- alles unterschiedlich.\n' +
      'Bei Enums gibt es nur die definierten Werte. Der Compiler verhindert Fehler.\n\n' +
      'Wichtig: Enum-Werte werden per Konvention in GROSSBUCHSTABEN geschrieben.',
    code:
      '// Syntax: enum Name { WERT1, WERT2, ... }\npublic enum Ampelfarbe {\n    ROT, GELB, GRUEN\n}\n\n' +
      '// Verwendung:\nAmpelfarbe farbe = Ampelfarbe.ROT;\nSystem.out.println(farbe); // Ausgabe: ROT\n\n' +
      '// Vergleich mit == (nicht .equals()!):\nif (farbe == Ampelfarbe.ROT) {\n    System.out.println("Stehen bleiben!");\n}'
  },
  {
    title: 'Enum mit Attributen und Konstruktor',
    content:
      'Enums in Java sind viel maechiger als in vielen anderen Sprachen. ' +
      'Jeder Enum-Wert ist ein OBJEKT und kann eigene Attribute (Felder) haben!\n\n' +
      'Wie funktioniert das? Schritt fuer Schritt:\n\n' +
      '1. Du definierst Attribute (Felder) im Enum, genau wie in einer Klasse.\n' +
      '2. Du schreibst einen Konstruktor, der diese Attribute setzt.\n' +
      '   WICHTIG: Der Konstruktor ist IMMER implizit private! Man kann kein new EngineType() schreiben.\n' +
      '3. Jeder Enum-Wert ruft den Konstruktor mit Argumenten in Klammern auf.\n\n' +
      'Stell dir vor, jeder Enum-Wert ist wie eine Karteikarte mit zusaetzlichen Informationen.\n' +
      'ELECTRO ist nicht nur ein Name, sondern traegt auch die Information "Nachhaltig" mit sich.\n\n' +
      'Der Ablauf beim Laden der Klasse:\n' +
      '- Java sieht ELECTRO("Nachhaltig") und ruft den Konstruktor mit "Nachhaltig" auf\n' +
      '- Java sieht DIESEL("Nicht nachhaltig") und ruft den Konstruktor mit "Nicht nachhaltig" auf\n' +
      '- Alle Enum-Werte werden einmalig beim Laden der Klasse erzeugt',
    code:
      'public enum EngineType {\n' +
      '    // Jeder Wert ruft den Konstruktor auf:\n' +
      '    ELECTRO("Nachhaltig"),\n' +
      '    HYBRID("Teilweise nachhaltig"),\n' +
      '    DIESEL("Nicht nachhaltig");  // Semikolon nach dem letzten Wert!\n\n' +
      '    // Attribut (Feld)\n' +
      '    private final String beschreibung;\n\n' +
      '    // Konstruktor (immer implizit private!)\n' +
      '    EngineType(String beschreibung) {\n' +
      '        this.beschreibung = beschreibung;\n' +
      '    }\n\n' +
      '    // Getter-Methode\n' +
      '    public String getBeschreibung() {\n' +
      '        return beschreibung;\n' +
      '    }\n' +
      '}\n\n' +
      '// Verwendung:\n' +
      'EngineType e = EngineType.ELECTRO;\n' +
      'System.out.println(e.getBeschreibung()); // "Nachhaltig"'
  },
  {
    title: 'Enum-Methoden: values(), valueOf(), ordinal(), name()',
    content:
      'Jeder Enum-Typ bekommt automatisch nuetzliche Methoden von Java geschenkt. ' +
      'Diese musst du nicht selbst schreiben -- sie sind immer da!\n\n' +
      '1. values() -- Gibt ein Array mit ALLEN Enum-Werten zurueck.\n' +
      '   Nuetzlich, um ueber alle Werte zu iterieren (z.B. in einer for-each Schleife).\n\n' +
      '2. valueOf(String) -- Wandelt einen String in den entsprechenden Enum-Wert um.\n' +
      '   ACHTUNG: Wenn der String keinen gueltigen Wert darstellt, wird eine\n' +
      '   IllegalArgumentException geworfen! "electro" funktioniert NICHT (Grossschreibung beachten!).\n\n' +
      '3. ordinal() -- Gibt die Position des Werts zurueck (0-basiert).\n' +
      '   Der erste deklarierte Wert hat ordinal() == 0, der zweite == 1, usw.\n' +
      '   Vorsicht: Aendert sich die Reihenfolge im Enum, aendern sich die Ordinals!\n\n' +
      '4. name() -- Gibt den Namen des Enum-Werts als String zurueck.\n' +
      '   Identisch mit toString() (sofern toString() nicht ueberschrieben wurde).',
    code:
      'public enum Farbe { ROT, GRUEN, BLAU }\n\n' +
      '// values() -- alle Werte als Array:\n' +
      'Farbe[] alle = Farbe.values();\n' +
      'for (Farbe f : alle) {\n' +
      '    System.out.println(f); // ROT, GRUEN, BLAU\n' +
      '}\n\n' +
      '// valueOf() -- String zu Enum:\n' +
      'Farbe rot = Farbe.valueOf("ROT"); // Farbe.ROT\n' +
      '// Farbe.valueOf("rot"); // FEHLER! IllegalArgumentException\n\n' +
      '// ordinal() -- Position (0-basiert):\n' +
      'System.out.println(Farbe.ROT.ordinal());   // 0\n' +
      'System.out.println(Farbe.GRUEN.ordinal()); // 1\n' +
      'System.out.println(Farbe.BLAU.ordinal());  // 2\n\n' +
      '// name() -- Name als String:\n' +
      'System.out.println(Farbe.ROT.name()); // "ROT"'
  },
  {
    title: 'Enum mit eigenen Methoden',
    content:
      'Da Enums in Java richtige Klassen sind, kannst du ihnen beliebige eigene Methoden hinzufuegen!\n\n' +
      'Das ist ein sehr haeufiges Muster in Pruefungen und in der Praxis:\n' +
      'Ein Enum hat ein Attribut und eine Methode, die basierend auf dem Attribut etwas berechnet oder entscheidet.\n\n' +
      'Beispiel: Ein EngineType-Enum soll eine Methode isSustainable() haben,\n' +
      'die true zurueckgibt, wenn der Motor nachhaltig ist.\n\n' +
      'Du kannst auch Methoden schreiben, die mit this arbeiten.\n' +
      'Innerhalb einer Enum-Methode bezieht sich "this" auf den aktuellen Enum-Wert.\n' +
      'Wenn du also ELECTRO.isSustainable() aufrufst, ist this == ELECTRO.\n\n' +
      'Tipp: Enums koennen auch Interfaces implementieren! Zum Beispiel:\n' +
      'enum Farbe implements Comparable<Farbe> { ... }',
    code:
      'public enum EngineType {\n' +
      '    ELECTRO("Strom", true),\n' +
      '    HYBRID("Strom/Benzin", true),\n' +
      '    DIESEL("Diesel", false),\n' +
      '    BENZIN("Benzin", false);\n\n' +
      '    private final String kraftstoff;\n' +
      '    private final boolean nachhaltig;\n\n' +
      '    EngineType(String kraftstoff, boolean nachhaltig) {\n' +
      '        this.kraftstoff = kraftstoff;\n' +
      '        this.nachhaltig = nachhaltig;\n' +
      '    }\n\n' +
      '    // Eigene Methode:\n' +
      '    public boolean isSustainable() {\n' +
      '        return this.nachhaltig;\n' +
      '    }\n\n' +
      '    public String getKraftstoff() {\n' +
      '        return this.kraftstoff;\n' +
      '    }\n' +
      '}\n\n' +
      '// Verwendung:\n' +
      'System.out.println(EngineType.ELECTRO.isSustainable()); // true\n' +
      'System.out.println(EngineType.DIESEL.isSustainable());  // false\n' +
      'System.out.println(EngineType.ELECTRO.getKraftstoff()); // "Strom"'
  },
  {
    title: 'Enum in switch',
    content:
      'Enums und switch passen perfekt zusammen! Ein switch ueber einen Enum-Typ\n' +
      'ist uebersichtlich, typsicher und der Compiler warnt dich sogar, wenn du\n' +
      'einen Enum-Wert vergessen hast.\n\n' +
      'WICHTIG: In den case-Zweigen schreibst du NUR den Wert-Namen, OHNE den Enum-Typ davor!\n' +
      'Also: case ELECTRO (richtig), NICHT: case EngineType.ELECTRO (falsch!).\n\n' +
      'Das liegt daran, dass Java aus dem switch-Ausdruck bereits weiss,\n' +
      'welcher Enum-Typ gemeint ist.\n\n' +
      'Seit Java 14 gibt es auch die kompaktere Arrow-Syntax (->), die ohne break auskommt.\n' +
      'Beide Varianten sind in Pruefungen relevant.',
    code:
      'EngineType motor = EngineType.ELECTRO;\n\n' +
      '// Klassische switch-Syntax:\n' +
      'switch (motor) {\n' +
      '    case ELECTRO:\n' +
      '        System.out.println("Leise und sauber");\n' +
      '        break;\n' +
      '    case HYBRID:\n' +
      '        System.out.println("Gemischt");\n' +
      '        break;\n' +
      '    case DIESEL:\n' +
      '        System.out.println("Laut aber kraftvoll");\n' +
      '        break;\n' +
      '}\n\n' +
      '// Moderne Arrow-Syntax (seit Java 14):\n' +
      'switch (motor) {\n' +
      '    case ELECTRO -> System.out.println("Leise und sauber");\n' +
      '    case HYBRID  -> System.out.println("Gemischt");\n' +
      '    case DIESEL  -> System.out.println("Laut aber kraftvoll");\n' +
      '}\n\n' +
      '// Switch-Expression mit Rueckgabewert:\n' +
      'String info = switch (motor) {\n' +
      '    case ELECTRO -> "Strom";\n' +
      '    case HYBRID  -> "Strom/Benzin";\n' +
      '    case DIESEL  -> "Diesel";\n' +
      '};'
  }
];
