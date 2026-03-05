# Lernplan Java 1 — Klausurvorbereitung 2026

## Klausurformat (Insider-Info)
- **Aufgabe 1 (~50 Punkte):** Klassendiagramm → Klassen implementieren
  - Vererbung, abstrakte Klassen, Interfaces, Exceptions, Enums
  - **90% der Punkte = pro Zeile** → jede richtige Zeile zählt, du musst nicht alles schaffen
  - **Stolperfalle:** Nicht alles im Diagramm muss implementiert werden UND umgekehrt
  - Was du nicht selbst implementierst darfst du trotzdem aufrufen
- **Aufgabe 2 (5 Punkte):** Theorie — abstrakte Klassen, Interfaces, switch-case etc.
- **Java API wird mitgegeben:** String, ArrayList, Collections, Comparable/Comparator

---

## Phase 1: Grundsyntax (MUSS sitzen)

### 1.1 Die drei Grundmuster
Jede Zeile in einer Klasse ist eins davon:

**Attribut:**
```java
private final String name;
private final List<Card> cards = new ArrayList<Card>();
```

**Konstruktor (Name = Klassenname, KEIN void, KEIN Rückgabetyp):**
```java
Card(String colour, int value){
    this.colour = colour;
    this.value = value;
}
```

**Methode (HAT Rückgabetyp — void, int, String, etc.):**
```java
public String getColour(){
    return colour;
}
public void addCard(Card card){
    cards.add(card);
}
```

**Regel: IMMER Typ vor Name.** Bei Attributen, Parametern, Variablen — überall.
- `String name` ✓ (nicht `name String`)
- `Card card` ✓ (nicht `card Card`)
- `List<Card> cards` ✓ (nicht `cards List<Card>`)

### 1.2 Access Modifiers (Sichtbarkeit)
```
public    → von überall sichtbar
private   → nur innerhalb der eigenen Klasse
protected → eigene Klasse + Kindklassen
```
Im UML-Klassendiagramm:
```
+  → public
-  → private
#  → protected
```

### 1.3 Getter und Setter
```java
// Getter — gibt Attribut zurück
public String getName(){
    return name;
}

// Setter — setzt Attribut
public void setName(String name){
    this.name = name;
}
```

### 1.4 Übung
- Aufgabe: Klasse `Person` mit `name` (String), `budget` (double), Konstruktor, Getter für beide
- Aufgabe: Klasse `Flat` mit `fee` (double), `renter` (Person), Konstruktor, Getter, `isFree()` Methode

---

## Phase 2: UML Klassendiagramm lesen (KLAUSUR-KRITISCH)

### 2.1 Symbole die du kennen MUSST
```
+              → public
-              → private
#              → protected
unterstrichen  → static
{final}        → final (nur einmal zuweisbar)
<<interface>>  → Interface
<<enum>>       → Enum
<<exception>>  → Exception-Klasse
```

### 2.2 Beispiel: Diagramm → Code
Diagramm zeigt:
```
- name: String {final}
+ getName(): String
```
Code:
```java
private final String name;

public String getName(){
    return name;
}
```

### 2.3 Beziehungen im Diagramm
```
A --|> B       → A extends B (Vererbung)
A ..|> B       → A implements B (Interface)
A --> B        → A benutzt B (Assoziation)
A o-- B        → A hat B (Aggregation — B existiert unabhängig)
```

### 2.4 Stolperfallen in der Klausur
- Manche Sachen im Diagramm musst du NICHT implementieren
- Manche Sachen die du brauchst stehen NICHT im Diagramm
- Was du nicht implementiert hast, darfst du trotzdem aufrufen (z.B. `person.getBudget()`)

### 2.5 Übung
- Aufgabe: Ich gebe dir ein Mini-Klassendiagramm, du schreibst den Code

---

## Phase 3: Vererbung & Konstruktor-Verkettung

### 3.1 extends + super
```java
class House extends Building{
    House(int number, double fee){
        super(number);          // ruft Building-Konstruktor auf
        this.fee = fee;
    }
}
```

### 3.2 Zwei Konstruktoren mit this(...)
Kommt in JEDER Klausur vor. Ein "unspezifischer" ruft den "spezifischen" auf:
```java
House(int number){
    this(number, 0);       // ruft den anderen Konstruktor auf mit fee=0
}
House(int number, double fee){
    this.number = number;
    this.fee = fee;
}
```

### 3.3 protected
```java
class Building{
    protected int number;    // Kindklassen dürfen darauf zugreifen
}
class House extends Building{
    // kann this.number benutzen weil protected
}
```

### 3.4 Übung
- Aufgabe: Klasse `Building` mit `number`, und `House extends Building` mit zwei Konstruktoren
- Aufgabe: Im spezifischen Konstruktor N Objekte erzeugen und einer Liste hinzufügen

---

## Phase 4: Interfaces

### 4.1 Interface definieren und implementieren
```java
interface Rentable{
    void rent(Person p) throws NotRentableException, TooLowBudgetException;
}

class Flat implements Rentable{
    public void rent(Person p) throws NotRentableException, TooLowBudgetException{
        // Implementierung
    }
}
```

### 4.2 Wichtig für Klausur
- Interface-Methoden sind automatisch `public abstract`
- `throws` deklariert welche Exceptions die Methode werfen KANN
- Implementierende Klasse MUSS die Methode haben und `public` davor schreiben

### 4.3 Übung
- Aufgabe: Interface `Parkable` mit Methoden `getName()`, `getWidth()`, `getValue()`
- Aufgabe: Klasse `Car implements Parkable` die alles implementiert

---

## Phase 5: Exceptions (eigene schreiben + werfen + fangen)

### 5.1 Eigene Exception-Klasse
```java
class TooLowBudgetException extends Exception{
    private final double difference;

    TooLowBudgetException(double difference){
        this.difference = difference;
    }

    public double getDifference(){
        return difference;
    }
}
```

### 5.2 Exception werfen (throw)
```java
public void rent(Person p) throws NotRentableException, TooLowBudgetException{
    if(!isRentable() || !isFree()){
        throw new NotRentableException();
    }
    if(fee > p.getBudget()){
        throw new TooLowBudgetException(fee - p.getBudget());
    }
    this.renter = p;
}
```

### 5.3 Exception fangen (try/catch)
```java
try{
    house.rent(person);
} catch(TooLowBudgetException e){
    System.out.println("Es wird " + e.getDifference() + " mehr Geld gebraucht.");
} catch(NotRentableException e){
    System.out.println("Nicht mietbar.");
}
```

### 5.4 Übung
- Aufgabe: Eigene Exception `TooWideException` mit `difference` Attribut
- Aufgabe: Methode die Exception wirft + main die sie fängt

---

## Phase 6: Enums mit Attributen

### 6.1 Enum mit Konstruktor und Methoden
```java
enum OperatingSystem{
    WINDOWS("W"), ANDROID("A"), MACOS("M"), IOS("I"), LINUX("L");

    private final String name;

    OperatingSystem(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public boolean isMobile(){
        return this == ANDROID || this == IOS;
    }
}
```

### 6.2 Enum benutzen (Insider-Info: .value auf enum!)
```java
OperatingSystem os = OperatingSystem.WINDOWS;
os.getName();      // "W"  ← DAS ist ".value auf enum"
os.isMobile();     // false
```

### 6.3 switch mit Enum
```java
switch(os){
    case WINDOWS:
        System.out.println("Windows");
        break;
    case ANDROID:
        System.out.println("Android");
        break;
    default:
        System.out.println("Andere");
        break;
}
```

### 6.4 Übung
- Aufgabe: Enum `OperatingSystem` wie oben bauen
- Aufgabe: In switch-case verschiedene Enums abfragen

---

## Phase 7: Abstrakte Klassen + Polymorphie

### 7.1 Abstrakte Klasse mit statischer Liste
```java
abstract class Device{
    private static ArrayList<Device> allDevices = new ArrayList<Device>();
    private final OperatingSystem os;

    Device(OperatingSystem os){
        this.os = os;
        allDevices.add(this);    // fügt sich selbst zur Liste hinzu!
    }

    public OperatingSystem getOs(){ return os; }
    public abstract boolean isSecure();
    public static ArrayList<Device> getAllDevices(){ return allDevices; }
}
```

### 7.2 static erklärt
```java
private static ArrayList<Device> allDevices;  // gehört zur KLASSE, nicht zum Objekt
public static ArrayList<Device> getAllDevices(){ return allDevices; } // Aufruf: Device.getAllDevices()
```
- `static` = existiert nur EINMAL für alle Objekte zusammen
- Aufruf über Klassennamen: `Device.getAllDevices()`, `Math.abs()`
- `public static void main` ist static weil beim Programmstart noch kein Objekt existiert

### 7.3 Kindklasse
```java
class Phone extends Device{
    private final boolean encrypted;

    Phone(OperatingSystem os, boolean encrypted){
        super(os);
        this.encrypted = encrypted;
    }

    public boolean isSecure(){
        return encrypted || getOs() == OperatingSystem.IOS;
    }
}
```

### 7.4 Polymorphie — Upcast, Downcast, instanceof
```java
// Upcast: Kind-Objekt in Eltern-Variable (geht immer)
Device d = new Phone(OperatingSystem.ANDROID, true);

// instanceof: prüfen welcher Typ
if(d instanceof Phone){
    // Downcast: Eltern-Variable zurück zu Kind (nur nach instanceof!)
    Phone p = (Phone) d;
    p.isSecure();
}
```

### 7.5 Übung
- Aufgabe: Device/Phone/Laptop komplett bauen
- Aufgabe: In main Objekte erstellen, mit Schleife sichere Geräte zählen

---

## Phase 8: Comparable & Comparator (Sortierung)

### 8.1 Comparable — natürliche Ordnung (in der Klasse selbst)
```java
class House implements Comparable<House>{
    public int compareTo(House other){
        return Integer.valueOf(this.number).compareTo(Integer.valueOf(other.number));
    }
}
// Benutzen:
Collections.sort(houses);
```

### 8.2 Comparator — externe Sortierung (eigene Klasse)
```java
class HouseFeeComparator implements Comparator<House>{
    public int compare(House h1, House h2){
        return Double.valueOf(h1.getFee()).compareTo(Double.valueOf(h2.getFee()));
    }
}
// Benutzen:
Collections.sort(houses, new HouseFeeComparator());
```

### 8.3 Wrapper-Klassen für Vergleiche
```java
Integer.valueOf(5).compareTo(Integer.valueOf(3))   // int vergleichen
Double.valueOf(2.5).compareTo(Double.valueOf(1.0))  // double vergleichen
"abc".compareTo("xyz")                               // String direkt
```

### 8.4 Übung
- Aufgabe: House mit Comparable nach Hausnummer sortieren
- Aufgabe: HouseFeeComparator nach Gebühr sortieren
- Aufgabe: Beides in main testen mit Collections.sort

---

## Phase 9: toString() überschreiben

### 9.1 Syntax
```java
class Present{
    private final String description;
    private final double price;

    public String toString(){
        return "Present[description=" + description + ", price=" + price + "]";
    }
}
```
Wird automatisch aufgerufen bei `System.out.println(objekt)`.

### 9.2 Übung
- Aufgabe: toString() für eine Klasse schreiben

---

## Phase 10: Theoriefrage vorbereiten (5 Punkte geschenkt!)

### 10.1 if-else vs switch
**Unterschiede:**
- if-else: beliebige Bedingungen (>, <, &&, ||, Methodenaufrufe)
- switch: nur GLEICHHEIT prüfen, nur mit int, char, String, Enum
- switch ist schneller bei vielen Gleichheitsprüfungen
- if-else ist flexibler

**Anwendungsfall:**
"Wenn ich einen Enum-Wert auf verschiedene Fälle prüfen möchte, benutze ich switch, weil ich nur Gleichheit prüfe und switch dafür effizienter und übersichtlicher ist."

### 10.2 Abstrakte Klasse vs Interface
**Abstrakte Klasse:**
- Kann Attribute haben
- Kann implementierte Methoden haben
- Kann Konstruktor haben
- Eine Klasse kann nur von EINER abstrakten Klasse erben

**Interface:**
- Nur Methodensignaturen (kein Code, keine Attribute)
- Eine Klasse kann MEHRERE Interfaces implementieren
- Methoden sind automatisch public abstract

### 10.3 abstract vs final
- abstract: MUSS erweitert/implementiert werden
- final: DARF NICHT erweitert/überschrieben werden
- Gegenteil voneinander!

---

## Phase 11: Komplette Klausuraufgaben durcharbeiten

### 11.1 Probeklausur 2026-1 (Straße mit Häusern)
Klassen: Rentable, NotRentableException, TooLowBudgetException, Flat, House, HouseFeeComparator, Street, ExamTask

### 11.2 Probeklausur 2026-2 Aufgabe 1 (Parkhaus)
Klassen: Parkable, ParkingLot, TooWideException, Floor, FloorValueComparator, CarPark, ExamTask

### 11.3 Probeklausur 2026-2 Aufgabe 2 (Geräte)
Klassen: OperatingSystem (Enum), Device (abstract), Phone, Laptop, ExamTask

### 11.4 Klausur 2025 (Zoo)
Klassen: Animal (Interface), NoSpaceException, Cage, Area, CageSpaceComparator, Zoo, ExamTask

### 11.5 Klausur 2024 (Fahrzeuge + Personal)
Aufgabe 1: EngineType (Enum), Vehicle (abstract), Car, Truck, ExamTask
Aufgabe 2: Human (Comparable), SalaryComparator, Company, ExamTask

---

## Zusammenfassung: Was in JEDER Klausur vorkommt

| Konzept | Häufigkeit |
|---|---|
| Klasse + Konstruktor + this-Zuweisungen | Jede Klasse |
| Getter | Jede Klasse |
| Interface mit throws | 2024, 2025, 2026 |
| Eigene Exception (extends Exception) | 2023, 2025, 2026 |
| throw new + try/catch | 2023, 2025, 2026 |
| Zwei Konstruktoren (this(...)) | 2024, 2025, 2026 |
| ArrayList durchlaufen + filtern | Jedes Jahr |
| Comparable (compareTo) | Jedes Jahr |
| Comparator (eigene Klasse) | Jedes Jahr |
| Collections.sort | Jedes Jahr |
| Enum mit Attributen + Methoden | 2023, 2024, 2025 |
| Abstrakte Klasse + Vererbung | 2023, 2024, 2025 |
| static Attribut + Methode | 2024, 2025 |
| instanceof | 2023, 2025 |
| toString() | 2023, 2024 |
| Theoriefrage (if-else/switch) | 2025, 2026 |

---

## Deine häufigsten Fehler (Checkliste vor Abgabe!)

- [ ] Typ vor Name? (`String name` nicht `name String`)
- [ ] Konstruktor hat KEIN void?
- [ ] this-Zuweisungen im Konstruktor?
- [ ] Klammern {} alle geschlossen?
- [ ] for-each: `for(Typ variable : liste)` ?
- [ ] Schleifenbedingung richtig? (< nicht >=)
- [ ] Methoden AUSSERHALB von main?
- [ ] return am richtigen Ort (nicht in Schleife)?
