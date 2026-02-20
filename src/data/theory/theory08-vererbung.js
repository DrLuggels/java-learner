export const theory = [
  {
    title: 'Was ist Vererbung?',
    content:
      'Vererbung ist eines der wichtigsten Konzepte der objektorientierten Programmierung.\nDie Grundidee: Eine Klasse (Unterklasse/Subclass) uebernimmt Attribute und Methoden von einer anderen Klasse (Oberklasse/Superclass).\n\nDenk an die echte Welt: Ein Auto IST EIN Fahrzeug. Ein Hund IST EIN Tier.\nDiese "ist-ein"-Beziehung ist das Kernprinzip der Vererbung.\n\nWarum Vererbung?\n- Code-Wiederverwendung: Gemeinsame Eigenschaften nur einmal definieren\n- Hierarchie: Vom Allgemeinen (Fahrzeug) zum Speziellen (Auto, Motorrad)\n- Erweiterbarkeit: Unterklassen koennen eigene Attribute/Methoden hinzufuegen\n\nWICHTIG: Java erlaubt nur EINFACHVERERBUNG!\nEine Klasse kann nur EINE Oberklasse haben (nicht wie z.B. C++).\nFuer Mehrfachvererbung nutzt Java Interfaces (spaeteres Kapitel).',
    code:
      '// Oberklasse (Superclass) -- allgemein\npublic class Fahrzeug {\n    protected String marke;\n    protected int baujahr;\n\n    public void fahren() {\n        System.out.println("Fahrzeug faehrt...");\n    }\n}\n\n// Unterklasse (Subclass) -- spezialisiert\npublic class Auto extends Fahrzeug {\n    private int tueren; // eigenes Attribut\n\n    public void hupen() { // eigene Methode\n        System.out.println("Huup!");\n    }\n}\n\n// Auto erbt marke, baujahr und fahren() von Fahrzeug!\nAuto a = new Auto();\na.marke = "BMW";  // geerbt\na.fahren();       // geerbt: "Fahrzeug faehrt..."\na.hupen();        // eigene Methode: "Huup!"'
  },
  {
    title: 'super-Keyword',
    content:
      'Das Schluesselwort "super" hat zwei wichtige Verwendungen:\n\n1. super() -- Ruft den KONSTRUKTOR der Oberklasse auf.\n   REGEL: super() MUSS die ERSTE Anweisung im Unterklassen-Konstruktor sein!\n   Wenn du keinen super()-Aufruf schreibst, fuegt Java automatisch super() (ohne Parameter) ein.\n   ABER: Wenn die Oberklasse keinen parameterlosen Konstruktor hat, MUSST du super(...) explizit mit den richtigen Parametern aufrufen!\n\n2. super.methode() -- Ruft die VERSION DER OBERKLASSE einer ueberschriebenen Methode auf.\n   Nuetzlich, wenn du die Oberklassen-Logik erweitern (nicht komplett ersetzen) willst.\n\nAnalogie: super ist wie "frag meine Eltern". super() sagt "Eltern, baut euch zuerst auf!", super.methode() sagt "Eltern, macht ihr euren Teil, ich ergaenze dann."',
    code:
      'public class Fahrzeug {\n    protected String marke;\n\n    public Fahrzeug(String marke) {\n        this.marke = marke;\n    }\n    public void info() {\n        System.out.println("Marke: " + marke);\n    }\n}\n\npublic class Auto extends Fahrzeug {\n    private int tueren;\n\n    public Auto(String marke, int tueren) {\n        super(marke);  // MUSS erste Zeile sein!\n        this.tueren = tueren;\n    }\n\n    @Override\n    public void info() {\n        super.info(); // Ruft Fahrzeug.info() auf\n        System.out.println("Tueren: " + tueren);\n    }\n}\n\nAuto a = new Auto("BMW", 4);\na.info();\n// Ausgabe: Marke: BMW\n//          Tueren: 4'
  },
  {
    title: 'Methoden ueberschreiben (@Override)',
    content:
      'Wenn eine Unterklasse eine geerbte Methode ANDERS implementieren moechte, kann sie die Methode UEBERSCHREIBEN (Override).\n\nRegeln fuer das Ueberschreiben:\n- Gleicher Methodenname und gleiche Parameter (Anzahl und Typen)\n- Gleicher oder kompatibler Rueckgabetyp\n- Sichtbarkeit darf nicht eingeschraenkt werden (public bleibt public)\n\nDie @Override-Annotation:\n- Ist NICHT Pflicht, aber DRINGEND empfohlen!\n- Sagt dem Compiler: "Ich will hier ueberschreiben"\n- Wenn du dich beim Methodennamen vertippst, bekommst du einen Compilerfehler statt einer versehentlich neuen Methode\n- In Pruefungen wird @Override fast immer erwartet!',
    code:
      'public class Tier {\n    public String sprechen() { return "..."; }\n}\n\npublic class Hund extends Tier {\n    @Override  // Compiler prueft: gibt es sprechen() in Tier?\n    public String sprechen() { return "Wuff!"; }\n}\n\npublic class Katze extends Tier {\n    @Override\n    public String sprechen() { return "Miau!"; }\n}\n\nHund h = new Hund();\nSystem.out.println(h.sprechen()); // "Wuff!"\nKatze k = new Katze();\nSystem.out.println(k.sprechen()); // "Miau!"'
  },
  {
    title: 'protected Sichtbarkeit',
    content:
      'Java hat vier Sichtbarkeitsstufen. "protected" ist besonders wichtig bei Vererbung:\n\n- private:   Nur in der EIGENEN Klasse sichtbar\n- (default): Im gleichen PAKET sichtbar (kein Schluesselwort)\n- protected: Im gleichen Paket + in UNTERKLASSEN (auch in anderen Paketen!)\n- public:    Ueberall sichtbar\n\nprotected ist der ideale Kompromiss fuer Vererbung:\n- private waere zu restriktiv: Unterklassen koennten nicht darauf zugreifen\n- public waere zu offen: Jeder koennte darauf zugreifen\n- protected erlaubt genau den Zugriff, den Unterklassen brauchen\n\nDaumenregel: Attribute, die Unterklassen direkt nutzen sollen, werden als protected deklariert. Alles andere bleibt private mit Gettern.',
    code:
      'public class Fahrzeug {\n    protected String marke;     // Unterklassen duerfen zugreifen\n    private String geheimnis;   // Nur Fahrzeug selbst\n    public int baujahr;         // Jeder darf zugreifen\n}\n\npublic class Auto extends Fahrzeug {\n    public void zeigen() {\n        System.out.println(marke);     // OK (protected)\n        // System.out.println(geheimnis); // FEHLER (private)\n        System.out.println(baujahr);   // OK (public)\n    }\n}'
  },
  {
    title: 'Polymorphie',
    content:
      'Polymorphie (griechisch: "Vielgestaltigkeit") ist DAS Kernkonzept der OOP.\nDie Idee: Eine Variable vom Typ der Oberklasse kann Objekte JEDER Unterklasse halten!\n\nFahrzeug f = new Auto(); -- das funktioniert, weil ein Auto EIN Fahrzeug IST.\n\nWarum ist das so maechtig?\n- Du kannst eine Methode schreiben, die ein Fahrzeug akzeptiert, und ihr Auto, Motorrad, LKW etc. uebergeben\n- Du kannst ein Array/Liste von Fahrzeugen haben, das verschiedene Fahrzeugtypen enthaelt\n- Zur LAUFZEIT wird automatisch die richtige Methode aufgerufen!\n\nBeispiel: Wenn du f.fahren() aufrufst und f ein Auto ist, wird Auto.fahren() ausgefuehrt, nicht Fahrzeug.fahren(). Das nennt man "dynamische Bindung" (dynamic dispatch).',
    code:
      '// Polymorphie in Aktion:\nFahrzeug f1 = new Auto("BMW");\nFahrzeug f2 = new Motorrad("Honda");\nFahrzeug f3 = new LKW("MAN");\n\n// Alle in einem Array:\nFahrzeug[] flotte = { f1, f2, f3 };\n\n// Jedes Fahrzeug faehrt auf SEINE Art:\nfor (Fahrzeug f : flotte) {\n    f.fahren(); // Ruft die jeweilige Unterklassen-Methode auf!\n}\n// Ausgabe: Auto faehrt / Motorrad kurvt / LKW transportiert\n\n// Methode akzeptiert JEDES Fahrzeug:\npublic void tanken(Fahrzeug f) {\n    System.out.println(f.marke + " wird betankt");\n}'
  },
  {
    title: 'Statischer vs. Dynamischer Typ',
    content:
      'Das ist DAS wichtigste Konzept fuer die Pruefung! Lerne es auswendig:\n\nFahrzeug f = new Auto();\n^^^^^^^^         ^^^^^^\nSTATISCHER TYP   DYNAMISCHER TYP\n\nSTATISCHER TYP (Compile-Time):\n- Der deklarierte Typ LINKS vom Gleichheitszeichen\n- Bestimmt, welche Methoden du AUFRUFEN DARFST\n- Der Compiler prueft nur den statischen Typ!\n\nDYNAMISCHER TYP (Runtime):\n- Der tatsaechliche Typ des Objekts RECHTS bei new\n- Bestimmt, welche IMPLEMENTATION ausgefuehrt wird\n- Wird erst zur Laufzeit ausgewertet!\n\nKonkretes Beispiel:\nFahrzeug f = new Auto();\nf.fahren()  -->  ERLAUBT (Fahrzeug hat fahren()) + Auto.fahren() wird ausgefuehrt\nf.turbo()   -->  COMPILERFEHLER! Fahrzeug hat kein turbo(), obwohl Auto es hat!',
    code:
      'class Fahrzeug {\n    public void fahren() { System.out.println("Fahrzeug faehrt"); }\n}\nclass Auto extends Fahrzeug {\n    @Override\n    public void fahren() { System.out.println("Auto faehrt"); }\n    public void turbo() { System.out.println("TURBO!"); }\n}\n\nFahrzeug f = new Auto();\nf.fahren();  // OK! Ausgabe: "Auto faehrt" (dynamischer Typ)\n// f.turbo(); // COMPILERFEHLER! Fahrzeug kennt turbo() nicht'
  },
  {
    title: 'Upcast und Downcast',
    content:
      'Beim Arbeiten mit Vererbung musst du oft zwischen Typen wechseln:\n\nUPCAST (nach oben in der Hierarchie):\n- Von Unterklasse zu Oberklasse: Auto -> Fahrzeug\n- Passiert IMPLIZIT (automatisch), kein Cast noetig\n- Ist IMMER sicher, weil jedes Auto ein Fahrzeug IST\n\nDOWNCAST (nach unten in der Hierarchie):\n- Von Oberklasse zu Unterklasse: Fahrzeug -> Auto\n- MUSS EXPLIZIT geschrieben werden: (Auto) fahrzeug\n- Ist GEFAEHRLICH! Kann ClassCastException ausloesen!\n- Nur moeglich, wenn das Objekt TATSAECHLICH ein Auto ist\n\nAnalogie: Upcast ist wie sagen "mein BMW ist ein Auto" (immer wahr). Downcast ist wie sagen "dieses Auto ist ein BMW" (nur manchmal wahr).',
    code:
      'Auto meinAuto = new Auto("BMW", 4);\n\n// UPCAST: Auto -> Fahrzeug (implizit, sicher)\nFahrzeug f = meinAuto; // kein Cast noetig!\n\n// DOWNCAST: Fahrzeug -> Auto (explizit, gefaehrlich!)\nAuto a = (Auto) f; // OK, weil f tatsaechlich ein Auto ist\n\n// GEFAEHRLICHER DOWNCAST:\nFahrzeug f2 = new Motorrad("Honda");\n// Auto a2 = (Auto) f2; // ClassCastException!! Motorrad ist kein Auto!\n\n// SICHER mit instanceof:\nif (f2 instanceof Auto) {\n    Auto a2 = (Auto) f2; // Nur wenn f2 wirklich ein Auto ist\n}'
  },
  {
    title: 'instanceof Operator',
    content:
      'Der instanceof-Operator prueft, ob ein Objekt eine Instanz eines bestimmten Typs ist. Er gibt true oder false zurueck.\n\nSyntax: objekt instanceof Typ\n\nWann liefert instanceof true?\n- Wenn das Objekt genau diesen Typ hat\n- Wenn das Objekt eine Unterklasse diesen Typs ist\n- null instanceof IrgendeinTyp --> immer false!\n\nSeit Java 16: Pattern Matching fuer instanceof!\nStatt zwei Zeilen (pruefen + casten) geht es in einer:\nif (f instanceof Auto a) { ... }\nDas prueft UND castet gleichzeitig. Die Variable a ist direkt als Auto verfuegbar. Das ist kuerzer, sicherer und moderner.\n\nPruefungstipp: Beide Varianten (alt und neu) koennen drankommen!',
    code:
      'Fahrzeug f = new Auto("BMW", 4);\n\n// Klassische Variante (vor Java 16):\nif (f instanceof Auto) {\n    Auto a = (Auto) f; // Separater Cast noetig\n    System.out.println(a.getTueren());\n}\n\n// Pattern Matching (ab Java 16) -- EMPFOHLEN:\nif (f instanceof Auto a) {\n    // a ist bereits als Auto verfuegbar!\n    System.out.println(a.getTueren()); // Kein Cast noetig\n}\n\n// Mehrere Typen pruefen:\nif (f instanceof Auto a) {\n    System.out.println("Auto mit " + a.getTueren() + " Tueren");\n} else if (f instanceof Motorrad m) {\n    System.out.println("Motorrad: " + m.getHubraum() + "ccm");\n}'
  }
];
