# Flugzeug-Klausur — Steffen-Style (K3 Pattern) — FINALE VERSION

## Analyse der 3 Original-Klausuren

### K1 (Street/House) — 51.5P + 5P Theorie
- Street -> ArrayList<House> -> ArrayList<Flat>
- Rentable interface (rent method), 2 Exceptions, Comparable+Comparator
- Person (gegeben, hat budget)
- Konstruktor-Muster: Street erstellt N Houses, House erstellt N Flats (Preis steigend)

### K2 Task 1 (CarPark) — 45P
- CarPark -> ArrayList<Floor> -> ArrayList<ParkingLot>
- Parkable interface, 1 Exception (TooWideException), Comparable+Comparator
- BMW (gegeben, implements Parkable)
- Konstruktor-Muster: CarPark erstellt N Floors, Floor erstellt N ParkingLots

### K2 Task 2 (Device) — 30P
- Device (abstract) -> Phone, Laptop (extends)
- OperatingSystem enum mit char-Werten + isMobile()
- Static ArrayList<Device> in Device
- toString() + isSecure() abstract methods

### K3 (Fridge) — 47.25P — VORLAGE FUER FINALE
- Fridge -> List<FridgeCompartment>
- FridgeCompartment (Basis) -> IceCompartment, VegetableCompartment (extends)
- Item (interface, getVolume) -> Vegetable, IceCream(gegeben) (implements)
- Freshness enum (Fresh/Okay/Old, canBeEaten())
- KEIN Comparable/Comparator
- throws Exception direkt (keine custom Exception-Klasse)
- Konstruktor: Fridge erstellt IceComp + VegetableComp + N normale FridgeCompartments

## K3 Verbindungsgraph (EIN zusammenhaengendes Diagramm)
```
Fridge --has--> FridgeCompartment --stores--> Item (interface)
                    |       |                      |
              +-extends-+  throws     +--implements--+
              v         v   |         v              v
        IceCompart  VegetComp |    Vegetable      IceCream(gegeben)
              |         |     |        |
           throws    throws   v     has--> Freshness(enum)
              v         v
           Exception <----+
```
FridgeCompartment hat 5 Verbindungen: Fridge, Item, IceComp, VegetComp, Exception

## K3 Subklassen-Mechanik (WICHTIG)

### IceCompartment:
- Konstruktor: `super(length-10, width-10, height-10, level)` -> Masse veraendert
- MINIMUM_STORAGE_TEMPERATURE static final, currentTemperature Instanzvariable
- store(): `if (currentTemp < MINIMUM && item instanceof IceCream)` -> super.put()
- Muster: Umgebungsbedingung UND Typ-Check

### VegetableCompartment:
- Konstruktor: `super(length, width, height, 1)` -> Level 1 hardcoded
- store(): `if (item instanceof Vegetable v && v.freshness.canBeEaten())` -> super.put()
- Muster: instanceof mit Pattern Variable UND enum-Methode

## Steffens UML-Diagramm-Stil
- ALLE Linien durchgezogen (solid) — auch implements und throws
- Rechtwinklige (orthogonale) Linienrouten
- Basis-Klasse als zentraler Hub mit 5+ Verbindungen
- "gegeben" steht im Aufgabentext, NICHT im Diagramm
- Exception hat +getMessage(): String (nicht leer)
- Enum-Konstanten OHNE +/- Sichtbarkeit (UML-Standard)
- Kompositions-Diamant bei List<>-Beziehungen (Airplane->Seat, Seat->Boardable)
- Klassen die nicht implementiert werden muessen trotzdem im Diagramm mit allen Details

## Insider-Info fuer finale Klausur
- Enum mit .value Pattern (wie OperatingSystem char-Werte)
- Reihen 1,2,3 + Sitzbuchstaben a,b,c
- KEIN Comparable/Comparator
- Abstrakte Klassen (NICHT im aktuellen Design — K3 hat auch keine)
- ArrayList-Iteration
- Loop mit verschiedenen Auspraegungen, speziell mit .value (= for-each ueber Enum.values())

### Insider-Abdeckung im Design:
- [x] Enum .value -> TicketClass mit `private char value` + `getValue()`
- [x] Reihen+Buchstaben -> Seat: `row: int` + `letter: char`, nested Loop `(char)('A'+j)`
- [x] Kein Comparable/Comparator
- [x] .values() Loop -> ExamTask: `for (TicketClass tc : TicketClass.values())`
- [x] ArrayList-Iteration -> Airplane.board() + ExamTask
- [ ] Abstrakte Klassen -> Seat ist konkret (wie FridgeCompartment in K3)

---

## FINALES DESIGN: Flugzeug-Klausur

### Konzept
Passagiere steigen in Sitze ein. Verschiedene Sitztypen haben verschiedene
Einsteige-Regeln. Das Interface repraesentiert "wer einsteigen kann" (Boardable).

### Klassen (8 zu implementieren, 1 gegeben):

1. **Boardable** (interface, 1.5P) — `+getWeight(): double`

2. **TicketClass** (enum, 3.5P)
   ```
   Business('B'), Economy('E'), Standby('S');
   - value: char
   + TicketClass(value: char)
   + getValue(): char
   + canBoard(): boolean  -> Business+Economy=true, Standby=false
   ```

3. **Passenger** (3.5P) — implements Boardable
   ```
   + name: String {final}
   + weight: double {final}
   + ticketClass: TicketClass {final}
   + Passenger(name, weight, ticketClass)
   + getWeight(): double  -> weight / 2
   ```

4. **Seat** (10P) — Basis-Klasse (wie FridgeCompartment)
   ```
   + row: int {final}
   + letter: char {final}
   + maxWeight: double {final}
   - passengers: List<Boardable>
   + Seat(row, letter, maxWeight)
   # getMaxWeight(): double      -> maxWeight
   # usedWeight(): double        -> Summe aller Passagier-Gewichte
   - hasSpace(Boardable): boolean -> Gewicht < maxWeight - benutztes Gewicht
   # board(Boardable): void      -> throws Exception wenn kein Platz
   ```
   5 Verbindungen: Airplane(comp), Boardable(comp), BusinessSeat(ext), EconomySeat(ext), Exception(throws)

5. **BusinessSeat** (5.75P) — extends Seat (wie IceCompartment)
   ```
   - MINIMUM_SEATS: int {static final} = 4
   - availableSeats: int
   + BusinessSeat(row, letter, maxWeight, availableSeats)
   + board(Boardable): void
   ```
   - Konstruktor: `super(row, letter, maxWeight - 10)` -> weniger Kapazitaet (breitere Sitze)
   - board(): `if (availableSeats >= MINIMUM_SEATS && item instanceof CrewMember)` -> super.board()
   - else: throw Exception "Nur Crew in der Business Klasse erlaubt!"

6. **EconomySeat** (6P) — extends Seat (wie VegetableCompartment)
   ```
   + EconomySeat(letter, maxWeight)
   + board(Boardable): void
   ```
   - Konstruktor: `super(1, letter, maxWeight)` — Economy immer Reihe 1
   - board(): `if (item instanceof Passenger p && p.ticketClass.canBoard())` -> super.board()
   - else: throw Exception "Nur Passagiere mit gueltigem Ticket erlaubt!"

7. **Airplane** (12P) — Container (wie Fridge)
   ```
   + seats: List<Seat> {final}
   + Airplane(numberOfRows, seatsPerRow, maxWeight)
   + board(Boardable): boolean
   ```
   - Konstruktor: BusinessSeat(hoechste Reihe) + EconomySeat(Reihe 1) + nested Loop Reihen+Buchstaben
   - board(): iteriert seats, try/catch, Reihe+Buchstabe bei Erfolg, instanceof-Check im catch

8. **ExamTask** (5P)
   - Airplane(4, 3, 90)
   - CrewMember erstellen + boarden
   - `for (TicketClass tc : TicketClass.values())` Loop: Passenger mit tc.getValue() boarden
   - Fehler mit tc.getValue() ausgeben

**Gegeben:** CrewMember implements Boardable — im Aufgabentext erwaehnt, im Diagramm normal dargestellt

### Punkte-Verteilung: 1.5 + 3.5 + 3.5 + 10 + 5.75 + 6 + 12 + 5 = 47.25

### Verbindungsgraph (10 Verbindungen):
```
Airplane --<>-- Seat --<>-- Boardable (interface)
                 |    |           |         |
           +--ext--+ throws  implements implements
           v       v   |      v              v
     BusinessSeat EcoSeat |  Passenger    CrewMember
           |       |    |      |
        throws  throws  |   --<>-- TicketClass(enum)
           v       v    v
         Exception <----+
```

### Musterloesung

```java
// 1.5
public interface Boardable {
    public double getWeight();
}

// 3.5
public enum TicketClass {
    Business('B'),
    Economy('E'),
    Standby('S');

    private char value;

    TicketClass(char value) {
        this.value = value;
    }

    public char getValue() {
        return value;
    }

    public boolean canBoard() {
        return this != TicketClass.Standby;
    }
}

// 3.5
public class Passenger implements Boardable {
    public final String name;
    public final double weight;
    public final TicketClass ticketClass;

    public Passenger(String name, double weight, TicketClass ticketClass) {
        this.name = name;
        this.weight = weight;
        this.ticketClass = ticketClass;
    }

    public double getWeight() {
        return weight / 2;
    }
}

// 10.0
public class Seat {
    public final int row;
    public final char letter;
    public final double maxWeight;
    private List<Boardable> passengers;

    public Seat(int row, char letter, double maxWeight) {
        this.row = row;
        this.letter = letter;
        this.maxWeight = maxWeight;
        this.passengers = new ArrayList<>();
    }

    protected double getMaxWeight() {
        return maxWeight;
    }

    protected double usedWeight() {
        double used = 0;
        for (Boardable b : passengers) {
            used += b.getWeight();
        }
        return used;
    }

    private boolean hasSpace(Boardable item) {
        return item.getWeight() < getMaxWeight() - usedWeight();
    }

    protected void board(Boardable item) throws Exception {
        if (hasSpace(item)) {
            this.passengers.add(item);
        } else {
            throw new Exception("Kein Platz");
        }
    }
}

// 5.75
public class BusinessSeat extends Seat {
    private final static int MINIMUM_SEATS = 4;
    private int availableSeats;

    public BusinessSeat(int row, char letter, double maxWeight, int availableSeats) {
        super(row, letter, maxWeight - 10);
        this.availableSeats = availableSeats;
    }

    public void board(Boardable item) throws Exception {
        if (availableSeats >= BusinessSeat.MINIMUM_SEATS && item instanceof CrewMember) {
            super.board(item);
        } else {
            throw new Exception("Nur Crew in der Business Klasse erlaubt!");
        }
    }
}

// 6.0
public class EconomySeat extends Seat {

    public EconomySeat(char letter, double maxWeight) {
        super(1, letter, maxWeight);
    }

    public void board(Boardable item) throws Exception {
        if (item instanceof Passenger passenger && passenger.ticketClass.canBoard()) {
            super.board(item);
        } else {
            throw new Exception("Nur Passagiere mit gueltigem Ticket erlaubt!");
        }
    }
}

// 12.0
public class Airplane {
    public final List<Seat> seats;

    public Airplane(int numberOfRows, int seatsPerRow, double maxWeight) {
        ArrayList<Seat> seats = new ArrayList<>();
        seats.add(new BusinessSeat(numberOfRows + 2, 'A', maxWeight, 6));
        seats.add(new EconomySeat('A', maxWeight));
        for (int i = 0; i < numberOfRows; i++) {
            for (int j = 0; j < seatsPerRow; j++) {
                seats.add(new Seat(numberOfRows + 1 - i, (char)('A' + j), maxWeight));
            }
        }
        this.seats = seats;
    }

    public boolean board(Boardable item) {
        for (Seat seat : seats) {
            try {
                seat.board(item);
                System.out.println("Platziert in Reihe " + seat.row + " Platz " + seat.letter);
                return true;
            } catch (Exception exception) {
                if (seat instanceof BusinessSeat || seat instanceof EconomySeat) {
                    return false;
                } else {
                    System.out.println(exception.getMessage());
                }
            }
        }
        return false;
    }
}

// 5.0
public class ExamTask {
    public static void main(String[] args) {
        Airplane airplane = new Airplane(4, 3, 90);
        CrewMember crew = new CrewMember("Pilot Mueller");
        if (!airplane.board(crew)) {
            System.out.println("Kein Platz gefunden.");
        }
        for (TicketClass tc : TicketClass.values()) {
            Passenger p = new Passenger("Gast-" + tc.getValue(), 70.0, tc);
            if (!airplane.board(p)) {
                System.out.println("Kein Platz fuer Ticket " + tc.getValue());
            }
        }
    }
}
```

### Airplane-Konstruktor — Verschachtelter Loop mit Reihen + Buchstaben:
Aeusserer Loop zaehlt Reihen herunter (numberOfRows+1 bis 2),
innerer Loop erzeugt Buchstaben via char-Arithmetik: `(char)('A' + j)`.
Ergibt: 5A, 5B, 5C, 4A, 4B, 4C, 3A, 3B, 3C, 2A, 2B, 2C.
BusinessSeat Reihe 6, EconomySeat Reihe 1.

### ExamTask — .values() Loop mit verschiedenen Auspraegungen:
`for (TicketClass tc : TicketClass.values())` erzeugt 3 Passagiere:
- Business('B'): canBoard()=true -> platziert in EconomySeat
- Economy('E'): canBoard()=true -> platziert
- Standby('S'): canBoard()=false -> ABLEHNUNG "Kein Platz fuer Ticket S"

### Airplane.board() — Die 2.0-Punkte-Stelle:
Bei BusinessSeat/EconomySeat sofort `return false` wenn Exception gefangen (spezialisierte Sitze).
Bei normalen Seats: Fehler ausgeben und weitersuchen.
`instanceof` Check im catch-Block: `seat instanceof BusinessSeat || seat instanceof EconomySeat`

### PDF-Generierung:
`generate_exam.py` erzeugt `probeklausur-flugzeug.pdf` (7 Seiten):
1. Titelseite
2. Aufgabe + Glossar + "CrewMember ist gegeben"
3. UML-Klassendiagramm (Landscape, orthogonal, 10 Verbindungen)
4. Hinweise: Boardable, TicketClass, Passenger, Seat
5. Hinweise: BusinessSeat, EconomySeat
6. Hinweise: Airplane, ExamTask
7. Java API + Collections + Schnittstellen
