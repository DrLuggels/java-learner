import type { ExamExercise } from '../types';

export const examExercises: ExamExercise[] = [
  // ==================== JAVA 1: WÜRFELSPIELE ====================
  {
    id: 'exam-dice-01',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 1 - Waffenwürfel',
    description: 'Implementiere ein Würfelspiel mit zwei Spielern. Jeder Spieler startet mit 10 Lebenspunkten. Pro Runde würfeln beide einen Waffenwürfel (Schwert=4, Speer=2, Axt=3, Keule=1). Der Spieler mit dem niedrigeren Wert verliert die Differenz als Lebenspunkte.',
    requirements: [
      'Erstelle eine Enum-Klasse Weapon mit den Werten SCHWERT(4), SPEER(2), AXT(3), KEULE(1)',
      'Erstelle eine Klasse WeaponDice mit der Methode rollTheDice()',
      'Erstelle eine Klasse Player mit Name und Lebenspunkten',
      'Das Spiel endet wenn ein Spieler 0 oder weniger Punkte hat',
    ],
    starterCode: `import java.util.Random;
import java.util.Scanner;

// TODO: Erstelle die Enum-Klasse Weapon
// TODO: Erstelle die Klasse WeaponDice
// TODO: Erstelle die Klasse Player

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // TODO: Implementiere das Würfelspiel
    }
}`,
    solutionCode: `import java.util.Random;
import java.util.Scanner;

enum Weapon {
    SCHWERT(4), SPEER(2), AXT(3), KEULE(1);
    private final int power;
    Weapon(int power) { this.power = power; }
    public int getPower() { return power; }
}

class WeaponDice {
    private static final Random random = new Random();
    private Weapon result;
    public WeaponDice() { rollTheDice(); }
    public void rollTheDice() { result = Weapon.values()[random.nextInt(4)]; }
    public Weapon getResult() { return result; }
    public int getPower() { return result.getPower(); }
}

class Player {
    private String name;
    private int points;
    public Player(String name) { this.name = name; this.points = 10; }
    public void reducePoints(int amount) { this.points -= amount; }
    public String getName() { return name; }
    public int getPoints() { return points; }
}

public class Main {
    public static void main(String[] args) {
        Player p1 = new Player("Spieler 1");
        Player p2 = new Player("Spieler 2");
        WeaponDice dice = new WeaponDice();
        int round = 1;
        while (p1.getPoints() > 0 && p2.getPoints() > 0) {
            System.out.println("=== Runde " + round + " ===");
            dice.rollTheDice();
            int roll1 = dice.getPower();
            System.out.println(p1.getName() + " wuerfelt: " + dice.getResult() + " (" + roll1 + ")");
            dice.rollTheDice();
            int roll2 = dice.getPower();
            System.out.println(p2.getName() + " wuerfelt: " + dice.getResult() + " (" + roll2 + ")");
            if (roll1 < roll2) p1.reducePoints(roll2 - roll1);
            else if (roll2 < roll1) p2.reducePoints(roll1 - roll2);
            System.out.println(p1.getName() + ": " + p1.getPoints() + " | " + p2.getName() + ": " + p2.getPoints());
            round++;
        }
        String winner = p1.getPoints() > 0 ? p1.getName() : p2.getName();
        System.out.println(winner + " gewinnt!");
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-02',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 2 - Zahlenduell',
    description: 'Zwei Spieler würfeln abwechselnd mit zwei Würfeln. Die Summe beider Würfel wird dem eigenen Konto gutgeschrieben. Wer zuerst 50 Punkte erreicht, gewinnt.',
    requirements: [
      'Erstelle eine Klasse Dice mit Methode roll() die 1-6 zurückgibt',
      'Erstelle eine Klasse Player mit Name und Punktestand',
      'Das Spiel zeigt pro Runde die Würfelergebnisse und den aktuellen Stand',
    ],
    starterCode: `import java.util.Random;

// TODO: Erstelle die Klasse Dice
// TODO: Erstelle die Klasse Player

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere das Zahlenduell
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class Player {
    private String name;
    private int score;
    public Player(String name) { this.name = name; this.score = 0; }
    public void addScore(int points) { this.score += points; }
    public String getName() { return name; }
    public int getScore() { return score; }
}

public class Main {
    public static void main(String[] args) {
        Player p1 = new Player("Spieler 1");
        Player p2 = new Player("Spieler 2");
        Dice d1 = new Dice(), d2 = new Dice();
        int round = 1;
        while (p1.getScore() < 50 && p2.getScore() < 50) {
            System.out.println("--- Runde " + round + " ---");
            int r1 = d1.roll() + d2.roll();
            p1.addScore(r1);
            System.out.println(p1.getName() + " wuerfelt " + r1 + " (Gesamt: " + p1.getScore() + ")");
            if (p1.getScore() >= 50) break;
            int r2 = d1.roll() + d2.roll();
            p2.addScore(r2);
            System.out.println(p2.getName() + " wuerfelt " + r2 + " (Gesamt: " + p2.getScore() + ")");
            round++;
        }
        String winner = p1.getScore() >= 50 ? p1.getName() : p2.getName();
        System.out.println(winner + " gewinnt!");
    }
}`,
    timeEstimate: 20,
  },
  {
    id: 'exam-dice-03',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 3 - Mäxchen',
    description: 'Implementiere eine vereinfachte Version von Mäxchen. Jeder Spieler würfelt 2 Würfel und bildet eine zweistellige Zahl (größere Ziffer zuerst). Pasche (11,22,...,66) schlagen alle Nicht-Pasche. 21 (Mäxchen) schlägt alles.',
    requirements: [
      'Erstelle eine Methode zur Berechnung des Würfelwerts (größere Ziffer * 10 + kleinere)',
      'Sonderregel: Pasche sind höher als normale Würfe',
      '21 (Mäxchen) ist der höchste Wurf',
      'Drei Runden, der Spieler mit den meisten Rundensiegen gewinnt',
    ],
    starterCode: `import java.util.Random;

public class Main {
    // TODO: Methode zur Wertberechnung
    // TODO: Methode zum Vergleich zweier Würfe

    public static void main(String[] args) {
        Random random = new Random();
        // TODO: Implementiere 3 Runden Mäxchen
    }
}`,
    solutionCode: `import java.util.Random;

public class Main {
    static boolean isPasch(int d1, int d2) { return d1 == d2; }
    static boolean isMaexchen(int d1, int d2) { return (d1==2&&d2==1)||(d1==1&&d2==2); }
    static int getValue(int d1, int d2) {
        if (isMaexchen(d1, d2)) return 1000;
        if (isPasch(d1, d2)) return 500 + d1;
        return Math.max(d1, d2) * 10 + Math.min(d1, d2);
    }

    public static void main(String[] args) {
        Random r = new Random();
        int wins1 = 0, wins2 = 0;
        for (int round = 1; round <= 3; round++) {
            int a1 = r.nextInt(6)+1, a2 = r.nextInt(6)+1;
            int b1 = r.nextInt(6)+1, b2 = r.nextInt(6)+1;
            int val1 = getValue(a1, a2), val2 = getValue(b1, b2);
            System.out.println("Runde " + round + ": S1 wuerfelt " + a1 + "+" + a2 + "=" + val1 + " | S2 wuerfelt " + b1 + "+" + b2 + "=" + val2);
            if (val1 > val2) wins1++;
            else if (val2 > val1) wins2++;
        }
        System.out.println("Ergebnis: S1=" + wins1 + " S2=" + wins2);
        System.out.println(wins1 > wins2 ? "Spieler 1 gewinnt!" : wins2 > wins1 ? "Spieler 2 gewinnt!" : "Unentschieden!");
    }
}`,
    timeEstimate: 25,
  },

  // ==================== JAVA 1: KLASSENDIAGRAMME ====================
  {
    id: 'exam-cd-parking',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Parkhaus',
    description: 'Implementiere ein Parkhaus-System. Vehicle ist die Oberklasse für Car und Bus. Ein ParkingGarage verwaltet ein Array von ParkingSpots, die jeweils ein Vehicle aufnehmen können.',
    requirements: [
      'Vehicle: Attribute make (String), model (String), lengthInM (double), heightInM (double)',
      'Car extends Vehicle, Bus extends Vehicle',
      'ParkingSpot: Attribute lengthInM, heightInM, busOnly (boolean), vehicle (Vehicle)',
      'ParkingGarage: ParkingSpot[] spots, Methoden parkIn(), parkOut(), getNextFreeParkingSpotNumber()',
      'parkIn() prüft ob Platz frei, ob Fahrzeug passt, und ob Bus-Only beachtet wird',
    ],
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Erstelle Vehicle, Car, Bus Klassen
        // TODO: Erstelle ParkingSpot Klasse
        // TODO: Erstelle ParkingGarage Klasse
        // TODO: Teste das System
    }
}

// TODO: class Vehicle { ... }
// TODO: class Car extends Vehicle { ... }
// TODO: class Bus extends Vehicle { ... }
// TODO: class ParkingSpot { ... }
// TODO: class ParkingGarage { ... }`,
    solutionCode: `class Vehicle {
    private String make, model;
    private double lengthInM, heightInM;
    public Vehicle(String make, String model, double l, double h) {
        this.make = make; this.model = model; this.lengthInM = l; this.heightInM = h;
    }
    public double getLengthInM() { return lengthInM; }
    public double getHeightInM() { return heightInM; }
    public String toString() { return make + " " + model; }
}

class Car extends Vehicle {
    public Car(String make, String model, double l, double h) { super(make, model, l, h); }
}

class Bus extends Vehicle {
    public Bus(String make, String model, double l, double h) { super(make, model, l, h); }
}

class ParkingSpot {
    private final double lengthInM, heightInM;
    private final boolean busOnly;
    private Vehicle vehicle;
    public ParkingSpot(double l, double h, boolean busOnly) {
        this.lengthInM = l; this.heightInM = h; this.busOnly = busOnly;
    }
    public boolean isFree() { return vehicle == null; }
    public boolean fits(Vehicle v) { return v.getLengthInM() <= lengthInM && v.getHeightInM() <= heightInM; }
    public boolean isBusOnly() { return busOnly; }
    public void setVehicle(Vehicle v) { this.vehicle = v; }
    public Vehicle getVehicle() { return vehicle; }
}

class ParkingGarage {
    private ParkingSpot[] spots;
    public ParkingGarage(ParkingSpot[] spots) { this.spots = spots; }
    public String parkIn(Vehicle v, int spotNr) {
        if (spotNr < 0 || spotNr >= spots.length) return "Ungueltige Nummer";
        ParkingSpot s = spots[spotNr];
        if (!s.isFree()) return "Platz belegt";
        if (s.isBusOnly() && !(v instanceof Bus)) return "Nur fuer Busse";
        if (!s.fits(v)) return "Fahrzeug passt nicht";
        s.setVehicle(v);
        return v + " auf Platz " + spotNr + " geparkt";
    }
    public String parkOut(int spotNr) {
        if (spotNr < 0 || spotNr >= spots.length) return "Ungueltige Nummer";
        if (spots[spotNr].isFree()) return "Platz ist leer";
        Vehicle v = spots[spotNr].getVehicle();
        spots[spotNr].setVehicle(null);
        return v + " ausgeparkt";
    }
    public int getNextFreeParkingSpotNumber() {
        for (int i = 0; i < spots.length; i++) if (spots[i].isFree()) return i;
        return -1;
    }
}

public class Main {
    public static void main(String[] args) {
        ParkingSpot[] spots = { new ParkingSpot(5,2.5,false), new ParkingSpot(5,2.5,false), new ParkingSpot(12,4,true) };
        ParkingGarage garage = new ParkingGarage(spots);
        Car car = new Car("BMW", "320i", 4.5, 1.4);
        Bus bus = new Bus("MAN", "Lion", 11, 3.5);
        System.out.println(garage.parkIn(car, 0));
        System.out.println(garage.parkIn(bus, 2));
        System.out.println(garage.parkOut(0));
        System.out.println("Naechster freier Platz: " + garage.getNextFreeParkingSpotNumber());
    }
}`,
    expectedOutput: `BMW 320i auf Platz 0 geparkt
MAN Lion auf Platz 2 geparkt
BMW 320i ausgeparkt
Naechster freier Platz: 0`,
    timeEstimate: 35,
  },
  {
    id: 'exam-cd-zoo',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Zoo',
    description: 'Implementiere ein Zoo-System. Es gibt verschiedene Tierarten (Säugetiere, Vögel) in Gehegen. Der Zoo verwaltet mehrere Gehege.',
    requirements: [
      'Abstrakte Klasse Animal mit name, age und abstrakter Methode makeSound()',
      'Mammal extends Animal, Bird extends Animal',
      'Klasse Enclosure mit name, Animal[] animals, Methode addAnimal()',
      'Klasse Zoo mit Enclosure[] enclosures und Methode getAllAnimals()',
    ],
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere das Zoo-System
    }
}`,
    solutionCode: `abstract class Animal {
    private String name;
    private int age;
    public Animal(String name, int age) { this.name = name; this.age = age; }
    public abstract String makeSound();
    public String getName() { return name; }
    public String toString() { return name + " (" + age + " Jahre)"; }
}

class Mammal extends Animal {
    public Mammal(String name, int age) { super(name, age); }
    public String makeSound() { return getName() + " macht ein Saeugetiergeraeusch"; }
}

class Bird extends Animal {
    public Bird(String name, int age) { super(name, age); }
    public String makeSound() { return getName() + " zwitschert"; }
}

class Enclosure {
    private String name;
    private Animal[] animals;
    private int count;
    public Enclosure(String name, int capacity) { this.name = name; this.animals = new Animal[capacity]; }
    public void addAnimal(Animal a) { if (count < animals.length) animals[count++] = a; }
    public Animal[] getAnimals() { return java.util.Arrays.copyOf(animals, count); }
    public String getName() { return name; }
}

public class Main {
    public static void main(String[] args) {
        Enclosure savanne = new Enclosure("Savanne", 5);
        savanne.addAnimal(new Mammal("Loewe", 5));
        savanne.addAnimal(new Mammal("Zebra", 3));
        Enclosure voliere = new Enclosure("Voliere", 5);
        voliere.addAnimal(new Bird("Papagei", 2));
        for (Animal a : savanne.getAnimals()) System.out.println(a + " - " + a.makeSound());
        for (Animal a : voliere.getAnimals()) System.out.println(a + " - " + a.makeSound());
    }
}`,
    expectedOutput: `Loewe (5 Jahre) - Loewe macht ein Saeugetiergeraeusch
Zebra (3 Jahre) - Zebra macht ein Saeugetiergeraeusch
Papagei (2 Jahre) - Papagei zwitschert`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-shop',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Kassensystem',
    description: 'Erstelle ein Kassensystem für einen Supermarkt. Produkte haben einen Namen und Preis. Der Warenkorb kann Produkte hinzufügen und den Gesamtpreis berechnen.',
    requirements: [
      'Klasse Product mit name (String) und priceInEuro (double)',
      'Klasse ShoppingCart mit ArrayList<Product> und Methoden add(), remove(), getTotal()',
      'Klasse Cashier mit Methode checkout() die den Bon ausdruckt',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Implementiere Product, ShoppingCart, Cashier

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Kassensystem
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Product {
    private String name;
    private double priceInEuro;
    public Product(String name, double price) { this.name = name; this.priceInEuro = price; }
    public String getName() { return name; }
    public double getPriceInEuro() { return priceInEuro; }
    public String toString() { return name + " " + String.format("%.2f", priceInEuro) + " EUR"; }
}

class ShoppingCart {
    private ArrayList<Product> products = new ArrayList<>();
    public void add(Product p) { products.add(p); }
    public void remove(Product p) { products.remove(p); }
    public double getTotal() { return products.stream().mapToDouble(Product::getPriceInEuro).sum(); }
    public ArrayList<Product> getProducts() { return products; }
}

class Cashier {
    public void checkout(ShoppingCart cart) {
        System.out.println("=== KASSENBON ===");
        for (Product p : cart.getProducts()) System.out.println(p);
        System.out.println("-----------------");
        System.out.println("Gesamt: " + String.format("%.2f", cart.getTotal()) + " EUR");
    }
}

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.add(new Product("Milch", 1.29));
        cart.add(new Product("Brot", 2.49));
        cart.add(new Product("Butter", 1.99));
        new Cashier().checkout(cart);
    }
}`,
    expectedOutput: `=== KASSENBON ===
Milch 1,29 EUR
Brot 2,49 EUR
Butter 1,99 EUR
-----------------
Gesamt: 5,77 EUR`,
    timeEstimate: 25,
  },

  // ==================== JAVA 1: AKTIVITÄTSDIAGRAMME ====================
  {
    id: 'exam-ad-sort',
    category: 'aktivitaetsdiagramm',
    semester: 'java1',
    title: 'Selection Sort',
    description: 'Implementiere den Selection Sort Algorithmus basierend auf dem Aktivitätsdiagramm: Finde in jedem Durchlauf das Minimum des unsortierten Bereichs und tausche es an die richtige Position.',
    requirements: [
      'Implementiere selectionSort(int[] arr)',
      'Gib das Array nach jedem Durchlauf aus',
      'Zeige die Anzahl der Vergleiche und Tauschoperationen',
    ],
    starterCode: `import java.util.Arrays;

public class Main {
    // TODO: static void selectionSort(int[] arr)

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.println("Unsortiert: " + Arrays.toString(arr));
        // TODO: Sortiere und zeige Zwischenschritte
        System.out.println("Sortiert: " + Arrays.toString(arr));
    }
}`,
    solutionCode: `import java.util.Arrays;

public class Main {
    static void selectionSort(int[] arr) {
        int comparisons = 0, swaps = 0;
        for (int i = 0; i < arr.length - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < arr.length; j++) {
                comparisons++;
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx != i) {
                int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = temp;
                swaps++;
            }
            System.out.println("Durchlauf " + (i+1) + ": " + Arrays.toString(arr));
        }
        System.out.println("Vergleiche: " + comparisons + ", Tausche: " + swaps);
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        System.out.println("Unsortiert: " + Arrays.toString(arr));
        selectionSort(arr);
        System.out.println("Sortiert: " + Arrays.toString(arr));
    }
}`,
    expectedOutput: `Unsortiert: [64, 25, 12, 22, 11]
Durchlauf 1: [11, 25, 12, 22, 64]
Durchlauf 2: [11, 12, 25, 22, 64]
Durchlauf 3: [11, 12, 22, 25, 64]
Durchlauf 4: [11, 12, 22, 25, 64]
Vergleiche: 10, Tausche: 3
Sortiert: [11, 12, 22, 25, 64]`,
    timeEstimate: 20,
  },

  // ==================== JAVA 2: KLASSENDIAGRAMME ====================
  {
    id: 'exam2-cd-library',
    category: 'klassendiagramm',
    semester: 'java2',
    title: 'Bibliothek',
    description: 'Implementiere ein Bibliothekssystem mit Büchern, Mitgliedern und Ausleihen. Verwende Interfaces, Generics und Collections.',
    requirements: [
      'Interface Borrowable<T> mit borrow(T member) und returnItem()',
      'Klasse Book implements Borrowable<Member>',
      'Klasse Member mit name und List<Book> borrowedBooks',
      'Klasse Library mit Map<String, Book> catalog und Methoden zum Suchen und Ausleihen',
    ],
    starterCode: `import java.util.*;

// TODO: Interface Borrowable<T>
// TODO: Klasse Book
// TODO: Klasse Member
// TODO: Klasse Library

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Bibliothekssystem
    }
}`,
    solutionCode: `import java.util.*;

interface Borrowable<T> {
    boolean borrow(T borrower);
    boolean returnItem();
    boolean isAvailable();
}

class Book implements Borrowable<Member> {
    private String isbn, title, author;
    private Member borrowedBy;
    public Book(String isbn, String title, String author) { this.isbn = isbn; this.title = title; this.author = author; }
    public boolean borrow(Member m) {
        if (borrowedBy != null) return false;
        borrowedBy = m; m.addBook(this); return true;
    }
    public boolean returnItem() {
        if (borrowedBy == null) return false;
        borrowedBy.removeBook(this); borrowedBy = null; return true;
    }
    public boolean isAvailable() { return borrowedBy == null; }
    public String getIsbn() { return isbn; }
    public String toString() { return title + " von " + author + (isAvailable() ? " [verfuegbar]" : " [ausgeliehen]"); }
}

class Member {
    private String name;
    private List<Book> borrowedBooks = new ArrayList<>();
    public Member(String name) { this.name = name; }
    public void addBook(Book b) { borrowedBooks.add(b); }
    public void removeBook(Book b) { borrowedBooks.remove(b); }
    public String getName() { return name; }
    public List<Book> getBorrowedBooks() { return Collections.unmodifiableList(borrowedBooks); }
}

class Library {
    private Map<String, Book> catalog = new HashMap<>();
    public void addBook(Book b) { catalog.put(b.getIsbn(), b); }
    public Optional<Book> findByIsbn(String isbn) { return Optional.ofNullable(catalog.get(isbn)); }
    public List<Book> getAvailableBooks() { return catalog.values().stream().filter(Book::isAvailable).toList(); }
}

public class Main {
    public static void main(String[] args) {
        Library lib = new Library();
        lib.addBook(new Book("978-1", "Java lernen", "Max Muster"));
        lib.addBook(new Book("978-2", "Design Patterns", "GoF"));
        Member m = new Member("Anna");
        lib.findByIsbn("978-1").ifPresent(b -> { b.borrow(m); System.out.println(m.getName() + " leiht: " + b); });
        System.out.println("Verfuegbar: " + lib.getAvailableBooks());
    }
}`,
    timeEstimate: 35,
  },

  // ==================== JAVA 2: STREAM-ABFRAGEN ====================
  {
    id: 'exam2-query-cities',
    category: 'abfragen',
    semester: 'java2',
    title: 'Städte-Abfragen',
    description: 'Gegeben ist eine Liste von Städten mit Name, Land und Einwohnerzahl. Beantworte verschiedene Abfragen mit der Stream API.',
    requirements: [
      'Record City(String name, String country, int population)',
      'Finde alle Städte mit mehr als 1 Million Einwohnern',
      'Gruppiere Städte nach Land',
      'Berechne die durchschnittliche Einwohnerzahl pro Land',
      'Finde die größte Stadt pro Land',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

record City(String name, String country, int population) {}

public class Main {
    public static void main(String[] args) {
        List<City> cities = List.of(
            new City("Berlin", "DE", 3748148),
            new City("Muenchen", "DE", 1471508),
            new City("Hamburg", "DE", 1841179),
            new City("Wien", "AT", 1911191),
            new City("Graz", "AT", 283869),
            new City("Zuerich", "CH", 421878),
            new City("Bern", "CH", 133883)
        );

        // TODO: Alle Städte > 1 Mio Einwohner, sortiert nach Einwohnerzahl
        // TODO: Gruppierung nach Land
        // TODO: Durchschnittliche Einwohnerzahl pro Land
        // TODO: Größte Stadt pro Land
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

record City(String name, String country, int population) {}

public class Main {
    public static void main(String[] args) {
        List<City> cities = List.of(
            new City("Berlin", "DE", 3748148),
            new City("Muenchen", "DE", 1471508),
            new City("Hamburg", "DE", 1841179),
            new City("Wien", "AT", 1911191),
            new City("Graz", "AT", 283869),
            new City("Zuerich", "CH", 421878),
            new City("Bern", "CH", 133883)
        );

        System.out.println("Staedte > 1 Mio:");
        cities.stream()
            .filter(c -> c.population() > 1_000_000)
            .sorted(Comparator.comparingInt(City::population).reversed())
            .forEach(c -> System.out.println("  " + c.name() + ": " + c.population()));

        System.out.println("\\nNach Land:");
        cities.stream()
            .collect(Collectors.groupingBy(City::country))
            .forEach((k, v) -> System.out.println("  " + k + ": " + v.stream().map(City::name).collect(Collectors.joining(", "))));

        System.out.println("\\nDurchschnitt pro Land:");
        cities.stream()
            .collect(Collectors.groupingBy(City::country, Collectors.averagingInt(City::population)))
            .forEach((k, v) -> System.out.println("  " + k + ": " + String.format("%.0f", v)));

        System.out.println("\\nGroesste Stadt pro Land:");
        cities.stream()
            .collect(Collectors.groupingBy(City::country, Collectors.maxBy(Comparator.comparingInt(City::population))))
            .forEach((k, v) -> v.ifPresent(c -> System.out.println("  " + k + ": " + c.name())));
    }
}`,
    timeEstimate: 25,
  },
];

export function getExamExercises(semester: 'java1' | 'java2'): ExamExercise[] {
  return examExercises.filter(e => e.semester === semester);
}

export function getExamExerciseById(id: string): ExamExercise | undefined {
  return examExercises.find(e => e.id === id);
}
