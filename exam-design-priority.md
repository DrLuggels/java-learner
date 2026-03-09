# Probeklausur: Flugzeug — Priority Boarding (Familien & Senioren)

## Konzept
Passagiere steigen in ein Flugzeug ein. Es gibt spezielle Sitzreihen fuer
Familien (Kinder) und Prioritaetspassagiere (Senioren/Familien). Das Interface
repraesentiert "wer einsteigen kann" (Boardable).

## K3-Pattern Mapping
- Boardable = Item (interface)
- PassengerType = Freshness (enum mit Methode)
- Child = IceCream (gegeben)
- Adult = Vegetable (zu schreiben)
- SeatRow = FridgeCompartment (Basis-Klasse)
- ChildRow = IceCompartment (Bedingung + instanceof)
- PriorityRow = VegetableCompartment (instanceof + enum-Methode)
- Airplane = Fridge (Container mit try/catch)

## Klassen (8 zu implementieren, 1 gegeben):

### 1. Boardable (interface, 1.5P)
```
+getName(): String
+getLuggage(): double
```

### 2. PassengerType (enum, 3.5P)
```
FAMILY('F'), SENIOR('S'), REGULAR('R');
-value: char
+PassengerType(value: char)
+getValue(): char
+hasPriority(): boolean  // FAMILY + SENIOR = true, REGULAR = false
```

### 3. Adult (implements Boardable, 3.5P)
```
+name: String {final}
+luggage: double {final}
+type: PassengerType {final}
+Adult(name: String, luggage: double, type: PassengerType)
+getName(): String
+getLuggage(): double  // returns luggage / 2
```

### 4. SeatRow (Basis-Klasse, 10P)
```
+row: int {final}
+letter: char {final}
+maxLuggage: double {final}
-passengers: List<Boardable>
+SeatRow(row: int, letter: char, maxLuggage: double)
#getMaxLuggage(): double
#usedLuggage(): double
-hasSpace(item: Boardable): boolean
#board(item: Boardable): void  // throws Exception
```

### 5. ChildRow extends SeatRow (5.75P) — wie IceCompartment
```
-MINIMUM_ROWS: int {static final} = 2 [underlined]
-availableRows: int
+ChildRow(row: int, letter: char, maxLuggage: double, availableRows: int)
+board(item: Boardable): void
```
- Konstruktor: `super(row, letter, maxLuggage - 5)` (weniger Gepaeck, mehr Platz)
- board(): `if (availableRows >= MINIMUM_ROWS && item instanceof Child)` → super.board()
- else: throw Exception "Familienbereich nicht verfuegbar!"

### 6. PriorityRow extends SeatRow (6P) — wie VegetableCompartment
```
+PriorityRow(letter: char, maxLuggage: double)
+board(item: Boardable): void
```
- Konstruktor: `super(1, letter, maxLuggage)` — Priority immer Reihe 1
- board(): `if (item instanceof Adult a && a.type.hasPriority())` → super.board()
- else: throw Exception "Nur Prioritaetspassagiere erlaubt!"

### 7. Airplane (Container, 12P)
```
+seats: List<SeatRow> {final}
+Airplane(numberOfRows: int, seatsPerRow: int, maxLuggage: double)
+board(item: Boardable): boolean
```
- Konstruktor: ChildRow(hoechste Reihe, 4 availableRows) + PriorityRow(Reihe 1) + nested Loop
- board(): try/catch Loop wie K3 Fridge

### 8. ExamTask (5P)
- Airplane(4, 3, 90)
- Child erstellen + boarden
- for (PassengerType pt : PassengerType.values()) Loop: Adult mit pt.getValue() boarden

**Gegeben:** Child implements Boardable

### Punkte: 1.5 + 3.5 + 3.5 + 10 + 5.75 + 6 + 12 + 5 = 47.25

## Verbindungsgraph (10 Verbindungen):
```
Airplane --<>-- SeatRow --<>-- Boardable (interface)
                 |    |           |         |
           +--ext--+ throws  implements implements
           v       v   |      v              v
       ChildRow PriorityRow|  Adult       Child(gegeben)
           |       |    |      |
        throws  throws  |   --<>-- PassengerType(enum)
           v       v    v
         Exception <----+
```

## Musterloesung

```java
// 1.5P
public interface Boardable {
    public String getName();
    public double getLuggage();
}

// 3.5P
public enum PassengerType {
    FAMILY('F'),
    SENIOR('S'),
    REGULAR('R');

    private char value;

    PassengerType(char value) {
        this.value = value;
    }

    public char getValue() {
        return value;
    }

    public boolean hasPriority() {
        return this != PassengerType.REGULAR;
    }
}

// gegeben
public class Child implements Boardable {
    public final String name;
    public final double luggage;

    public Child(String name, double luggage) {
        this.name = name;
        this.luggage = luggage;
    }

    public String getName() {
        return name;
    }

    public double getLuggage() {
        return luggage;
    }
}

// 3.5P
public class Adult implements Boardable {
    public final String name;
    public final double luggage;
    public final PassengerType type;

    public Adult(String name, double luggage, PassengerType type) {
        this.name = name;
        this.luggage = luggage;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public double getLuggage() {
        return luggage / 2;
    }
}

// 10P
public class SeatRow {
    public final int row;
    public final char letter;
    public final double maxLuggage;
    private List<Boardable> passengers;

    public SeatRow(int row, char letter, double maxLuggage) {
        this.row = row;
        this.letter = letter;
        this.maxLuggage = maxLuggage;
        this.passengers = new ArrayList<>();
    }

    protected double getMaxLuggage() {
        return maxLuggage;
    }

    protected double usedLuggage() {
        double used = 0;
        for (Boardable b : passengers) {
            used += b.getLuggage();
        }
        return used;
    }

    private boolean hasSpace(Boardable item) {
        return item.getLuggage() < getMaxLuggage() - usedLuggage();
    }

    protected void board(Boardable item) throws Exception {
        if (hasSpace(item)) {
            this.passengers.add(item);
        } else {
            throw new Exception("Kein Platz");
        }
    }
}

// 5.75P
public class ChildRow extends SeatRow {
    private final static int MINIMUM_ROWS = 2;
    private int availableRows;

    public ChildRow(int row, char letter, double maxLuggage, int availableRows) {
        super(row, letter, maxLuggage - 5);
        this.availableRows = availableRows;
    }

    public void board(Boardable item) throws Exception {
        if (availableRows >= ChildRow.MINIMUM_ROWS && item instanceof Child) {
            super.board(item);
        } else {
            throw new Exception("Familienbereich nicht verfuegbar!");
        }
    }
}

// 6P
public class PriorityRow extends SeatRow {

    public PriorityRow(char letter, double maxLuggage) {
        super(1, letter, maxLuggage);
    }

    public void board(Boardable item) throws Exception {
        if (item instanceof Adult a && a.type.hasPriority()) {
            super.board(item);
        } else {
            throw new Exception("Nur Prioritaetspassagiere erlaubt!");
        }
    }
}

// 12P
public class Airplane {
    public final List<SeatRow> seats;

    public Airplane(int numberOfRows, int seatsPerRow, double maxLuggage) {
        ArrayList<SeatRow> seats = new ArrayList<>();
        seats.add(new ChildRow(numberOfRows + 2, 'A', maxLuggage, 4));
        seats.add(new PriorityRow('A', maxLuggage));
        for (int i = 0; i < numberOfRows; i++) {
            for (int j = 0; j < seatsPerRow; j++) {
                seats.add(new SeatRow(numberOfRows + 1 - i, (char)('A' + j), maxLuggage));
            }
        }
        this.seats = seats;
    }

    public boolean board(Boardable item) {
        for (SeatRow seat : seats) {
            try {
                seat.board(item);
                System.out.println("Platziert in Reihe " + seat.row + " Platz " + seat.letter);
                return true;
            } catch (Exception exception) {
                System.out.println(exception.getMessage());
            }
        }
        return false;
    }
}

// 5P
public class ExamTask {
    public static void main(String[] args) {
        Airplane airplane = new Airplane(4, 3, 90);
        Child child = new Child("Klein-Anna", 5.0);
        if (!airplane.board(child)) {
            System.out.println("Kein Platz gefunden.");
        }
        for (PassengerType pt : PassengerType.values()) {
            Adult a = new Adult("Gast-" + pt.getValue(), 70.0, pt);
            if (!airplane.board(a)) {
                System.out.println("Kein Platz fuer Typ " + pt.getValue());
            }
        }
    }
}
```
