# Flugzeug-Klausur V3 — Sitz-fokussiert mit getSeatNumber() (K3 Pattern)

## Warum V3?
V1 deckt die Insider-Infos mit Seat als Hub (Weight-basiert) ab.
V2 deckt sie mit Row als Hub (Count-basiert, single loop) ab.
V3 bringt eine neue Methode: getSeatNumber() kombiniert Reihe + Buchstabe
zu einem Sitz-Code wie "4A". Diese Kennung erscheint im Erfolgs-Print
und in der Basis-Exception.

## Strukturelle Unterschiede V1 vs V2 vs V3

| Aspekt | V1 (Seat-basiert) | V2 (Row-basiert) | V3 (Sitz-fokussiert) |
|--------|-------------------|-------------------|----------------------|
| Hub-Klasse | Seat (Sitz) | Row (Reihe) | Seat (Sitz) |
| Kapazitaet | Gewicht (double, usedWeight) | Anzahl (int, isFull per Row) | Anzahl (int, isFull per Seat) |
| Sitzkennung | row + letter getrennt | Row.number + getNextLetter() | getSeatNumber() → "4A" |
| Nested Loop | Ja (Reihen x Buchstaben) | KEINER — Buchstaben aus Index | Ja (Reihen x Buchstaben) |
| char-Arithmetik | `(char)('A' + j)` im Loop | `(char)('A' + size)` in Methode | `(char)('A' + j)` im Loop |
| Print-Ort | In Airplane.board() | In Row.add() | In Seat.assign() |
| Print-Inhalt | "Reihe " + row + " Platz " + letter | "Reihe " + number + " Platz " + letter | name + " auf Sitz " + getSeatNumber() |
| Catch-Verhalten | instanceof → return false | Log + continue | Log + continue |
| Interface-Methode | getWeight(): double (Berechnung) | getName(): String (Ausgabe) | getName(): String (Ausgabe) |
| Enum-Semantik | TicketClass (Business/Economy/Standby) | SeatType (Window/Aisle/Middle) | BoardingGroup (Priority/Standard/Standby) |
| Enum char-Werte | 'B', 'E', 'S' | 'F', 'G', 'M' | 'P', 'S', 'N' (Prioritaet/Standard/Nachrang) |
| Key Feature | Weight-Arithmetik in usedWeight() | Dynamischer Buchstabe getNextLetter() | getSeatNumber() String-Konkat |

## Was GLEICH bleibt (= K3-Kernmuster)

- Subklasse 1: `feld >= KONSTANTE && item instanceof Typ` → super.assign() (= IceCompartment)
- Subklasse 2: `item instanceof Typ p && p.feld.enumMethode()` → super.assign() (= VegetableCompartment)
- Subklasse 1 super(): Parameter veraendert (maxPassengers - 1)
- Subklasse 2 super(): Wert hardcoded (Reihe 1)
- Container iteriert List, try/catch
- ExamTask: for (EnumTyp e : EnumTyp.values()) Loop
- 10 Verbindungen, Hub mit 5 Connections
- 47.25 Punkte
- throws Exception direkt (keine custom Exception)
- Gegeben-Klasse implements Interface

## Insider-Abdeckung

- [x] Enum .value → BoardingGroup mit `private char value` + `getValue()`
- [x] Reihen+Buchstaben → Seat.row + Seat.letter + getSeatNumber() via `"" + row + letter`
- [x] Kein Comparable/Comparator
- [x] .values() Loop → ExamTask: `for (BoardingGroup bg : BoardingGroup.values())`
- [x] ArrayList-Iteration → Airplane.board() + Seat.assign() intern
- [ ] Abstrakte Klassen → Seat ist konkret (wie K3)

## V3-Besonderheit: getSeatNumber() und String-Konkatenation

`getSeatNumber()` gibt `"" + row + letter` zurueck.
- OHNE das `""` waere `row + letter` = int-Arithmetik: `4 + 'A'` = 69
- MIT dem `""` wird es String-Konkatenation: `"" + 4 + 'A'` = "4A"
- Wird im Erfolgs-Print und in der Basis-Exception verwendet

---

## DESIGN: Flugzeug-Klausur V3

### Konzept
Passagiere werden einzelnen Sitzen zugewiesen. Jeder Sitz hat eine eindeutige
Kennung aus Reihe und Buchstabe (z.B. "4A"), berechnet durch getSeatNumber().
Verschiedene Sitztypen haben verschiedene Zuweisungs-Regeln.

### Klassen (8 zu implementieren, 1 gegeben):

1. **Boardable** (interface, 1.5P) — `+getName(): String`

2. **BoardingGroup** (enum, 3.5P)
   ```
   Priority('P'), Standard('S'), Standby('N');
   - value: char
   + BoardingGroup(value: char)
   + getValue(): char
   + canBoard(): boolean  -> Priority+Standard=true, Standby=false
   ```

3. **Passenger** (3.5P) — implements Boardable
   ```
   + name: String {final}
   + age: int {final}
   + boardingGroup: BoardingGroup {final}
   + Passenger(name, age, boardingGroup)
   + getName(): String  -> name
   ```

4. **Seat** (10P) — Basis-Klasse / Hub (wie FridgeCompartment)
   ```
   + row: int {final}
   + letter: char {final}
   + maxPassengers: int {final}
   - passengers: List<Boardable>
   + Seat(row, letter, maxPassengers)
   # getSeatNumber(): String   -> "" + row + letter
   # isFull(): boolean         -> passengers.size() >= maxPassengers
   # assign(Boardable): void   -> throws Exception wenn voll
   ```
   5 Verbindungen: Airplane(comp), Boardable(comp), CrewSeat(ext), ExitSeat(ext), Exception(throws)

5. **CrewSeat** (5.75P) — extends Seat (wie IceCompartment)
   ```
   - MIN_RANK: int {static final} = 3
   - crewRank: int
   + CrewSeat(row, letter, maxPassengers, crewRank)
   + assign(Boardable): void
   ```
   - Konstruktor: `super(row, letter, maxPassengers - 1)` -> weniger Plaetze (extra Ausruestung)
   - assign(): `if (crewRank >= CrewSeat.MIN_RANK && item instanceof CrewMember)` -> super.assign()
   - else: throw Exception "Nur Crew in diesem Sitz erlaubt!"

6. **ExitSeat** (6P) — extends Seat (wie VegetableCompartment)
   ```
   + ExitSeat(letter, maxPassengers)
   + assign(Boardable): void
   ```
   - Konstruktor: `super(1, letter, maxPassengers)` — Notausgang immer Reihe 1
   - assign(): `if (item instanceof Passenger p && p.boardingGroup.canBoard())` -> super.assign()
   - else: throw Exception "Nur Passagiere mit gueltigem Boarding erlaubt!"

7. **Airplane** (12P) — Container (wie Fridge)
   ```
   + seats: List<Seat> {final}
   + Airplane(numberOfRows, seatsPerRow, maxPassengers)
   + board(Boardable): boolean
   ```
   - Konstruktor: CrewSeat(hoechste Reihe, 'A') + ExitSeat('A') + nested Loop Reihen+Buchstaben
   - board(): iteriert seats, try/catch, print getMessage(), continue (wie K3 original)

8. **ExamTask** (5P)
   - Airplane(3, 2, 2)
   - CrewMember erstellen + boarden
   - `for (BoardingGroup bg : BoardingGroup.values())` Loop: Passenger mit bg.getValue() boarden
   - Fehler mit bg.getValue() ausgeben

**Gegeben:** CrewMember implements Boardable — im Aufgabentext erwaehnt, im Diagramm normal dargestellt

### Punkte-Verteilung: 1.5 + 3.5 + 3.5 + 10 + 5.75 + 6 + 12 + 5 = 47.25

### Verbindungsgraph (10 Verbindungen):
```
Airplane --<>-- Seat --<>-- Boardable (interface)
                 |    |         |         |
           +--ext--+ throws  impl     impl
           v       v   |      v          v
       CrewSeat  ExitSeat |  Passenger  CrewMember(gegeben)
           |       |    |      |
        throws  throws  |   --<>-- BoardingGroup(enum)
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
public enum BoardingGroup {
    Priority('P'),
    Standard('S'),
    Standby('N');

    private char value;

    BoardingGroup(char value) {
        this.value = value;
    }

    public char getValue() {
        return value;
    }

    public boolean canBoard() {
        return this != BoardingGroup.Standby;
    }
}

// 3.5
public class Passenger implements Boardable {
    public final String name;
    public final int age;
    public final BoardingGroup boardingGroup;

    public Passenger(String name, int age, BoardingGroup boardingGroup) {
        this.name = name;
        this.age = age;
        this.boardingGroup = boardingGroup;
    }

    public String getName() {
        return name;
    }
}

// 10.0
public class Seat {
    public final int row;
    public final char letter;
    public final int maxPassengers;
    private List<Boardable> passengers;

    public Seat(int row, char letter, int maxPassengers) {
        this.row = row;
        this.letter = letter;
        this.maxPassengers = maxPassengers;
        this.passengers = new ArrayList<>();
    }

    protected String getSeatNumber() {
        return "" + row + letter;
    }

    protected boolean isFull() {
        return passengers.size() >= maxPassengers;
    }

    protected void assign(Boardable item) throws Exception {
        if (!isFull()) {
            System.out.println(item.getName() + " auf Sitz " + getSeatNumber());
            passengers.add(item);
        } else {
            throw new Exception("Sitz " + getSeatNumber() + " ist voll");
        }
    }
}

// 5.75
public class CrewSeat extends Seat {
    private static final int MIN_RANK = 3;
    private int crewRank;

    public CrewSeat(int row, char letter, int maxPassengers, int crewRank) {
        super(row, letter, maxPassengers - 1);
        this.crewRank = crewRank;
    }

    public void assign(Boardable item) throws Exception {
        if (crewRank >= CrewSeat.MIN_RANK && item instanceof CrewMember) {
            super.assign(item);
        } else {
            throw new Exception("Nur Crew in diesem Sitz erlaubt!");
        }
    }
}

// 6.0
public class ExitSeat extends Seat {

    public ExitSeat(char letter, int maxPassengers) {
        super(1, letter, maxPassengers);
    }

    public void assign(Boardable item) throws Exception {
        if (item instanceof Passenger p && p.boardingGroup.canBoard()) {
            super.assign(item);
        } else {
            throw new Exception("Nur Passagiere mit gueltigem Boarding erlaubt!");
        }
    }
}

// 12.0
public class Airplane {
    public final List<Seat> seats;

    public Airplane(int numberOfRows, int seatsPerRow, int maxPassengers) {
        ArrayList<Seat> seats = new ArrayList<>();
        seats.add(new CrewSeat(numberOfRows + 2, 'A', maxPassengers, 4));
        seats.add(new ExitSeat('A', maxPassengers));
        for (int i = 0; i < numberOfRows; i++) {
            for (int j = 0; j < seatsPerRow; j++) {
                seats.add(new Seat(numberOfRows + 1 - i, (char)('A' + j), maxPassengers));
            }
        }
        this.seats = seats;
    }

    public boolean board(Boardable item) {
        for (Seat seat : seats) {
            try {
                seat.assign(item);
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
        Airplane airplane = new Airplane(3, 2, 2);
        CrewMember crew = new CrewMember("Pilot Mueller");
        if (!airplane.board(crew)) {
            System.out.println("Kein Platz gefunden.");
        }
        for (BoardingGroup bg : BoardingGroup.values()) {
            Passenger p = new Passenger("Gast-" + bg.getValue(), 30, bg);
            if (!airplane.board(p)) {
                System.out.println("Kein Platz fuer Boarding " + bg.getValue());
            }
        }
    }
}
```

### Airplane-Konstruktor — Verschachtelter Loop mit Reihen + Buchstaben:
Wie V1: aeusserer Loop zaehlt Reihen herunter (numberOfRows+1 bis 2),
innerer Loop erzeugt Buchstaben via char-Arithmetik: `(char)('A' + j)`.
Airplane(3, 2, 2) ergibt:
[CrewSeat(5A,max=1), ExitSeat(1A,max=2), Seat(4A,2), Seat(4B,2), Seat(3A,2), Seat(3B,2), Seat(2A,2), Seat(2B,2)]

### getSeatNumber() — Die zentrale V3-Methode:
`"" + row + letter` erzeugt einen String wie "4A".
ACHTUNG: Ohne das `""` waere `row + letter` = int-Arithmetik (4 + 65 = 69)!
Das `""` erzwingt String-Konkatenation: `"" + 4 + 'A'` = "4A".
Wird im Erfolgs-Print und in der Basis-Exception verwendet.

### Seat.assign() — Print mit getName() + getSeatNumber():
Anders als V1 (Print im Container mit row/letter getrennt) und V2 (Print im Hub mit Reihe + Letter)
kombiniert V3 den Passagiernamen mit der Sitzkennung:
`item.getName() + " auf Sitz " + getSeatNumber()`

### Airplane.board() — K3-Original-Pattern:
Einfachstes catch: Exception loggen und naechsten Sitz versuchen.
Wie K3 Fridge.store() — kein instanceof im catch, kein return false im catch.

### Vollstaendige Konsolenausgabe:
```
Pilot Mueller auf Sitz 5A
Nur Crew in diesem Sitz erlaubt!
Gast-P auf Sitz 1A
Nur Crew in diesem Sitz erlaubt!
Gast-S auf Sitz 1A
Nur Crew in diesem Sitz erlaubt!
Nur Passagiere mit gueltigem Boarding erlaubt!
Gast-N auf Sitz 4A
```

Erklaerung Zeile fuer Zeile:
1. Crew → CrewSeat(5A): 4>=3 UND CrewMember → super.assign() → !isFull → "Pilot Mueller auf Sitz 5A"
2. Gast-P → CrewSeat(5A): Passenger ist kein CrewMember → "Nur Crew in diesem Sitz erlaubt!"
3. Gast-P → ExitSeat(1A): Passenger UND Priority.canBoard()=true → super.assign() → "Gast-P auf Sitz 1A"
4. Gast-S → CrewSeat(5A): Passenger ist kein CrewMember → "Nur Crew in diesem Sitz erlaubt!"
5. Gast-S → ExitSeat(1A): Passenger UND Standard.canBoard()=true → !isFull(1<2) → "Gast-S auf Sitz 1A"
6. Gast-N → CrewSeat(5A): Passenger ist kein CrewMember → "Nur Crew in diesem Sitz erlaubt!"
7. Gast-N → ExitSeat(1A): Passenger ABER Standby.canBoard()=false → "Nur Passagiere mit gueltigem Boarding erlaubt!"
8. Gast-N → Seat(4A): !isFull → "Gast-N auf Sitz 4A"

8 Zeilen Output. getSeatNumber() erscheint in den 4 Erfolgs-Zeilen.
Subklassen-Exceptions sind generisch (ohne Sitznummer).
Sitz 1A nimmt 2 Passagiere auf (maxPassengers=2), Sitz 4A einen.

### Besondere Trace-Details:
- Sitz 1A nimmt ZWEI Passagiere auf (Gast-P und Gast-S), weil ExitSeat maxPassengers=2 behaelt
- CrewSeat(5A) hat nur maxPassengers=1 (wegen -1 im Konstruktor), ist nach Pilot voll
- Aber die Subklasse-Exception feuert VOR der isFull-Pruefung (Passenger kein CrewMember)
- Die Basis-Exception "Sitz 5A ist voll" existiert im Code, erscheint aber nicht im Trace,
  weil kein zweiter CrewMember versucht wird → Code muss trotzdem korrekt implementiert werden
