# Flugzeug-Klausur V2 — Row-basiert (K3 Pattern, alternative Struktur)

## Warum V2?
V1 deckt die Insider-Infos ab, aber NUR in einer bestimmten Struktur (Seat als Hub).
V2 bereitet auf den Fall vor, dass Steffen die gleichen Konzepte ANDERS anordnet.

## Strukturelle Unterschiede V1 vs V2

| Aspekt | V1 (Seat-basiert) | V2 (Row-basiert) |
|--------|-------------------|-------------------|
| Hub-Klasse | Seat (Sitz) | Row (Reihe) |
| Kapazitaet | Gewicht (double, usedWeight) | Anzahl (int, isFull) |
| Sitzplatz-Buchstaben | Eigenschaft: `letter` Feld | Berechnet: `getNextLetter()` |
| Nested Loop | Airplane-Konstruktor (Reihen x Buchstaben) | KEINER — Buchstaben aus Index |
| char-Arithmetik | `(char)('A' + j)` im Konstruktor-Loop | `(char)('A' + passengers.size())` in getNextLetter() |
| Print-Ort | In Airplane.board() | In Row.add() |
| Catch-Verhalten | instanceof → return false (Abbruch) | Immer weiter (log + continue) |
| Passagier-Ergebnis | Manche abgelehnt (Standby) | Alle platziert (Fallback in normale Reihen) |
| Interface-Methode | getWeight(): double (in Berechnung) | getName(): String (nur Ausgabe) |
| Enum-Semantik | TicketClass (Business/Economy/Standby) | SeatType (Window/Aisle/Middle) |
| Enum char-Werte | 'B', 'E', 'S' | 'F', 'G', 'M' (Fenster/Gang/Mitte) |

## Was GLEICH bleibt (= K3-Kernmuster)

- Subklasse 1: `feld >= KONSTANTE && item instanceof Typ` → super.add() (= IceCompartment)
- Subklasse 2: `item instanceof Typ p && p.feld.enumMethode()` → super.add() (= VegetableCompartment)
- Subklasse 1 super(): Parameter veraendert (maxPassengers - 2)
- Subklasse 2 super(): Wert hardcoded (Reihe 1)
- Container iteriert List, try/catch
- ExamTask: for (EnumTyp e : EnumTyp.values()) Loop
- 10 Verbindungen, Hub mit 5 Connections
- 47.25 Punkte
- throws Exception direkt (keine custom Exception)
- Gegeben-Klasse implements Interface

## Insider-Abdeckung

- [x] Enum .value → SeatType mit `private char value` + `getValue()`
- [x] Reihen+Buchstaben → Row.number + `getNextLetter()` via `(char)('A' + size)`
- [x] Kein Comparable/Comparator
- [x] .values() Loop → ExamTask: `for (SeatType st : SeatType.values())`
- [x] ArrayList-Iteration → Airplane.board() + Row.add() intern
- [ ] Abstrakte Klassen → Row ist konkret (wie K3)

---

## DESIGN: Flugzeug-Klausur V2

### Konzept
Passagiere werden in Sitzreihen platziert. Verschiedene Reihentypen haben
verschiedene Regeln. Das Interface repraesentiert "wer fliegen darf" (Boardable).
Sitzplatz-Buchstaben ergeben sich automatisch aus der Belegungsreihenfolge.

### Klassen (8 zu implementieren, 1 gegeben):

1. **Boardable** (interface, 1.5P) — `+getName(): String`

2. **SeatType** (enum, 3.5P)
   ```
   Window('F'), Aisle('G'), Middle('M');
   - value: char
   + SeatType(value: char)
   + getValue(): char
   + isPreferred(): boolean  -> Window+Aisle=true, Middle=false
   ```

3. **Passenger** (3.5P) — implements Boardable
   ```
   + name: String {final}
   + age: int {final}
   + seatType: SeatType {final}
   + Passenger(name, age, seatType)
   + getName(): String  -> name
   ```

4. **Row** (10P) — Basis-Klasse / Hub (wie FridgeCompartment)
   ```
   + number: int {final}
   + maxPassengers: int {final}
   - passengers: List<Boardable>
   + Row(number, maxPassengers)
   # getNextLetter(): char       -> (char)('A' + passengers.size())
   # isFull(): boolean           -> passengers.size() >= maxPassengers
   # add(Boardable): void       -> throws Exception wenn voll
   ```
   5 Verbindungen: Airplane(comp), Boardable(comp), FirstClassRow(ext), EmergencyRow(ext), Exception(throws)

5. **FirstClassRow** (5.75P) — extends Row (wie IceCompartment)
   ```
   - MIN_CREW: int {static final} = 2
   - assignedCrew: int
   + FirstClassRow(number, maxPassengers, assignedCrew)
   + add(Boardable): void
   ```
   - Konstruktor: `super(number, maxPassengers - 2)` -> weniger Plaetze (breitere Sitze)
   - add(): `if (assignedCrew >= FirstClassRow.MIN_CREW && item instanceof FlightCrew)` -> super.add()
   - else: throw Exception "Nur Crew in der First Class erlaubt!"

6. **EmergencyRow** (6P) — extends Row (wie VegetableCompartment)
   ```
   + EmergencyRow(maxPassengers)
   + add(Boardable): void
   ```
   - Konstruktor: `super(1, maxPassengers)` — Emergency immer Reihe 1
   - add(): `if (item instanceof Passenger p && p.seatType.isPreferred())` -> super.add()
   - else: throw Exception "Nur Passagiere mit bevorzugtem Sitztyp erlaubt!"

7. **Airplane** (12P) — Container (wie Fridge)
   ```
   + rows: List<Row> {final}
   + Airplane(numberOfRows, seatsPerRow)
   + board(Boardable): boolean
   ```
   - Konstruktor: FirstClassRow(hoechste Reihe) + EmergencyRow(Reihe 1) + Loop normale Reihen
   - board(): iteriert rows, try/catch, KEIN instanceof im catch — immer weitersuchen

8. **ExamTask** (5P)
   - Airplane(4, 3)
   - FlightCrew erstellen + boarden
   - `for (SeatType st : SeatType.values())` Loop: Passenger mit st.getValue() boarden
   - Fehler mit st.getValue() ausgeben

**Gegeben:** FlightCrew implements Boardable — im Aufgabentext erwaehnt, im Diagramm normal dargestellt

### Punkte-Verteilung: 1.5 + 3.5 + 3.5 + 10 + 5.75 + 6 + 12 + 5 = 47.25

### Verbindungsgraph (10 Verbindungen):
```
Airplane --<>-- Row --<>-- Boardable (interface)
                 |    |         |         |
           +--ext--+ throws  impl     impl
           v       v   |      v          v
     FirstClassRow EmergRow | Passenger  FlightCrew(gegeben)
           |       |    |      |
        throws  throws  |   --<>-- SeatType(enum)
           v       v    v
         Exception <----+
```

### Musterloesung

```java
// 1.5
public interface Boardable {
    public String getName();
}

// 3.5
public enum SeatType {
    Window('F'),
    Aisle('G'),
    Middle('M');

    private char value;

    SeatType(char value) {
        this.value = value;
    }

    public char getValue() {
        return value;
    }

    public boolean isPreferred() {
        return this != SeatType.Middle;
    }
}

// 3.5
public class Passenger implements Boardable {
    public final String name;
    public final int age;
    public final SeatType seatType;

    public Passenger(String name, int age, SeatType seatType) {
        this.name = name;
        this.age = age;
        this.seatType = seatType;
    }

    public String getName() {
        return name;
    }
}

// 10.0
public class Row {
    public final int number;
    public final int maxPassengers;
    private List<Boardable> passengers;

    public Row(int number, int maxPassengers) {
        this.number = number;
        this.maxPassengers = maxPassengers;
        this.passengers = new ArrayList<>();
    }

    protected char getNextLetter() {
        return (char)('A' + passengers.size());
    }

    protected boolean isFull() {
        return passengers.size() >= maxPassengers;
    }

    protected void add(Boardable item) throws Exception {
        if (!isFull()) {
            System.out.println("Platziert in Reihe " + number + " Platz " + getNextLetter());
            passengers.add(item);
        } else {
            throw new Exception("Reihe " + number + " ist voll");
        }
    }
}

// 5.75
public class FirstClassRow extends Row {
    private static final int MIN_CREW = 2;
    private int assignedCrew;

    public FirstClassRow(int number, int maxPassengers, int assignedCrew) {
        super(number, maxPassengers - 2);
        this.assignedCrew = assignedCrew;
    }

    public void add(Boardable item) throws Exception {
        if (assignedCrew >= FirstClassRow.MIN_CREW && item instanceof FlightCrew) {
            super.add(item);
        } else {
            throw new Exception("Nur Crew in der First Class erlaubt!");
        }
    }
}

// 6.0
public class EmergencyRow extends Row {

    public EmergencyRow(int maxPassengers) {
        super(1, maxPassengers);
    }

    public void add(Boardable item) throws Exception {
        if (item instanceof Passenger p && p.seatType.isPreferred()) {
            super.add(item);
        } else {
            throw new Exception("Nur Passagiere mit bevorzugtem Sitztyp erlaubt!");
        }
    }
}

// 12.0
public class Airplane {
    public final List<Row> rows;

    public Airplane(int numberOfRows, int seatsPerRow) {
        ArrayList<Row> rows = new ArrayList<>();
        rows.add(new FirstClassRow(numberOfRows + 2, seatsPerRow, 4));
        rows.add(new EmergencyRow(seatsPerRow));
        for (int i = 0; i < numberOfRows; i++) {
            rows.add(new Row(numberOfRows + 1 - i, seatsPerRow));
        }
        this.rows = rows;
    }

    public boolean board(Boardable item) {
        for (Row row : rows) {
            try {
                row.add(item);
                return true;
            } catch (Exception exception) {
                System.out.println(exception.getMessage());
            }
        }
        return false;
    }
}

// 5.0
public class ExamTask {
    public static void main(String[] args) {
        Airplane airplane = new Airplane(4, 3);
        FlightCrew crew = new FlightCrew("Pilot Schmidt");
        if (!airplane.board(crew)) {
            System.out.println("Kein Platz gefunden.");
        }
        for (SeatType st : SeatType.values()) {
            Passenger p = new Passenger("Gast-" + st.getValue(), 25, st);
            if (!airplane.board(p)) {
                System.out.println("Kein Platz fuer Sitztyp " + st.getValue());
            }
        }
    }
}
```

### Airplane-Konstruktor — Einfacher Loop (KEIN nested Loop!):
Nur ein Loop ueber numberOfRows. Reihen zaehlen herunter: 5, 4, 3, 2.
FirstClassRow Reihe 6 (numberOfRows+2), EmergencyRow Reihe 1.
Ergebnis: [FirstClassRow(6,max=1), EmergencyRow(1,max=3), Row(5,3), Row(4,3), Row(3,3), Row(2,3)]

### getNextLetter() — Sitzplatz-Buchstaben aus Index:
Statt eines verschachtelten Loops werden Buchstaben BERECHNET:
`(char)('A' + passengers.size())` → erster Passagier bekommt 'A', zweiter 'B', dritter 'C'.
Die char-Arithmetik erscheint hier statt im Konstruktor-Loop!

### Row.add() — Print in der Basis-Klasse (nicht im Container!):
Anders als V1 (wo Airplane.board() den Print macht) druckt Row.add() die Platzierung,
weil nur Row sowohl die Reihennummer ALS AUCH den naechsten Buchstaben kennt.

### Airplane.board() — KEIN instanceof im catch:
Einfachste Variante: Exception loggen und naechste Reihe versuchen.
Dadurch finden ALLE Passagiere einen Platz (Fallback in normale Reihen).
Kein `return false` im catch → kein vorzeitiger Abbruch.

### ExamTask — .values() Loop mit verschiedenen Auspraegungen:
`for (SeatType st : SeatType.values())` erzeugt 3 Passagiere:
- Window('F'): isPreferred()=true → EmergencyRow akzeptiert → Reihe 1, Platz A
- Aisle('G'): isPreferred()=true → EmergencyRow akzeptiert → Reihe 1, Platz B
- Middle('M'): isPreferred()=false → EmergencyRow lehnt ab → Normal-Reihe → Reihe 5, Platz A

### Vollstaendige Konsolenausgabe:
```
Platziert in Reihe 6 Platz A
Nur Crew in der First Class erlaubt!
Platziert in Reihe 1 Platz A
Nur Crew in der First Class erlaubt!
Platziert in Reihe 1 Platz B
Nur Crew in der First Class erlaubt!
Nur Passagiere mit bevorzugtem Sitztyp erlaubt!
Platziert in Reihe 5 Platz A
```

Erklaerung Zeile fuer Zeile:
1. Crew → FirstClassRow: 4 >= 2 UND FlightCrew → platziert Reihe 6 A
2. Window-Passenger → FirstClassRow: kein FlightCrew → Fehler
3. Window-Passenger → EmergencyRow: Passenger UND isPreferred() → platziert Reihe 1 A
4. Aisle-Passenger → FirstClassRow: kein FlightCrew → Fehler
5. Aisle-Passenger → EmergencyRow: Passenger UND isPreferred() → platziert Reihe 1 B
6. Middle-Passenger → FirstClassRow: kein FlightCrew → Fehler
7. Middle-Passenger → EmergencyRow: Middle.isPreferred()=false → Fehler
8. Middle-Passenger → Row(5): nicht voll → platziert Reihe 5 A
