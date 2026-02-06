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

  // ==================== JAVA 1: WÜRFELSPIELE (Fortsetzung) ====================
  {
    id: 'exam-dice-04',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 4 - Craps (vereinfacht)',
    description: 'Implementiere eine vereinfachte Version des Würfelspiels Craps. Der Spieler wirft zwei Würfel. Beim ersten Wurf: Summe 7 oder 11 = sofort gewonnen, Summe 2, 3 oder 12 = sofort verloren. Bei jeder anderen Summe wird diese zum "Point". Der Spieler würfelt weiter, bis er den Point erneut trifft (gewonnen) oder eine 7 würfelt (verloren).',
    requirements: [
      'Erstelle eine Klasse CrapsDice mit Methode roll() fuer zwei Wuerfel',
      'Erster Wurf: 7/11 = Gewinn, 2/3/12 = Verlust, sonst Point setzen',
      'Folgewuerfe: Point erneut = Gewinn, 7 = Verlust',
      'Zeige jeden Wurf und das Endergebnis an',
    ],
    starterCode: `import java.util.Random;

// TODO: Erstelle die Klasse CrapsDice
// TODO: Implementiere die Spiellogik

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere Craps
    }
}`,
    solutionCode: `import java.util.Random;

class CrapsDice {
    private static final Random random = new Random();
    private int die1, die2;

    public void roll() {
        die1 = random.nextInt(6) + 1;
        die2 = random.nextInt(6) + 1;
    }

    public int getDie1() { return die1; }
    public int getDie2() { return die2; }
    public int getSum() { return die1 + die2; }
}

public class Main {
    public static void main(String[] args) {
        CrapsDice dice = new CrapsDice();
        dice.roll();
        int sum = dice.getSum();
        System.out.println("Erster Wurf: " + dice.getDie1() + " + " + dice.getDie2() + " = " + sum);

        if (sum == 7 || sum == 11) {
            System.out.println("Sofort gewonnen!");
            return;
        }
        if (sum == 2 || sum == 3 || sum == 12) {
            System.out.println("Sofort verloren!");
            return;
        }

        int point = sum;
        System.out.println("Point ist: " + point);

        while (true) {
            dice.roll();
            sum = dice.getSum();
            System.out.println("Wurf: " + dice.getDie1() + " + " + dice.getDie2() + " = " + sum);
            if (sum == point) {
                System.out.println("Point getroffen! Gewonnen!");
                break;
            }
            if (sum == 7) {
                System.out.println("7 gewuerfelt! Verloren!");
                break;
            }
        }
    }
}`,
    timeEstimate: 20,
  },
  {
    id: 'exam-dice-05',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 5 - Pig',
    description: 'Implementiere das Würfelspiel Pig. Zwei Spieler spielen abwechselnd. Pro Zug würfelt ein Spieler so oft er möchte. Die Augen werden addiert. Würfelt er jedoch eine 1, verliert er alle Punkte dieser Runde. Wer zuerst 100 Punkte erreicht, gewinnt. Die Computerversion simuliert beide Spieler automatisch: jeder Spieler hört nach 3 Würfen auf oder wenn die Rundensumme >= 20 ist.',
    requirements: [
      'Erstelle eine Klasse Dice mit Methode roll()',
      'Erstelle eine Klasse PigPlayer mit Name, Gesamtpunkte und Rundenpunkte',
      'Bei einer 1 gehen alle Rundenpunkte verloren',
      'Automatische Strategie: Aufhören nach 3 Würfen oder bei Rundensumme >= 20',
      'Gewinnziel: 100 Punkte',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice
// TODO: Klasse PigPlayer

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere das Pig-Spiel
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class PigPlayer {
    private String name;
    private int totalScore;
    private int turnScore;

    public PigPlayer(String name) { this.name = name; this.totalScore = 0; }
    public String getName() { return name; }
    public int getTotalScore() { return totalScore; }
    public int getTurnScore() { return turnScore; }
    public void resetTurnScore() { turnScore = 0; }
    public void addToTurn(int points) { turnScore += points; }
    public void bankPoints() { totalScore += turnScore; turnScore = 0; }
}

public class Main {
    public static void main(String[] args) {
        Dice dice = new Dice();
        PigPlayer p1 = new PigPlayer("Spieler 1");
        PigPlayer p2 = new PigPlayer("Spieler 2");
        PigPlayer current = p1;

        while (p1.getTotalScore() < 100 && p2.getTotalScore() < 100) {
            current.resetTurnScore();
            System.out.println("--- " + current.getName() + " ist dran (Gesamt: " + current.getTotalScore() + ") ---");
            int rolls = 0;

            while (rolls < 3 && current.getTurnScore() < 20) {
                int roll = dice.roll();
                rolls++;
                System.out.print("  Wurf " + rolls + ": " + roll);
                if (roll == 1) {
                    System.out.println(" -> Verloren! Rundenpunkte weg.");
                    current.resetTurnScore();
                    break;
                }
                current.addToTurn(roll);
                System.out.println(" (Runde: " + current.getTurnScore() + ")");
            }

            if (current.getTurnScore() > 0) {
                current.bankPoints();
                System.out.println("  Gesichert! Gesamt: " + current.getTotalScore());
            }

            current = (current == p1) ? p2 : p1;
        }

        String winner = p1.getTotalScore() >= 100 ? p1.getName() : p2.getName();
        System.out.println(winner + " gewinnt!");
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam-dice-06',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 6 - Chicago',
    description: 'Implementiere das Würfelspiel Chicago. Es wird in 6 Runden gespielt. In Runde 1 versucht man 1-1 zu würfeln, in Runde 2 2-2, usw. bis 6-6. Pro Runde hat jeder Spieler 3 Versuche mit 2 Würfeln. Gelingt der Pasch, bekommt man die Augenzahl als Punkte (Runde 1 = 1 Punkt, Runde 6 = 6 Punkte). Wer nach 6 Runden die meisten Punkte hat, gewinnt.',
    requirements: [
      'Erstelle eine Klasse Dice mit Methode roll()',
      'Erstelle eine Klasse ChicagoPlayer mit Name und Punktestand',
      '6 Runden, in jeder Runde muss der passende Pasch gewuerfelt werden',
      'Pro Runde 3 Versuche',
      'Punkte = Rundennummer bei Erfolg',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice
// TODO: Klasse ChicagoPlayer

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere Chicago
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class ChicagoPlayer {
    private String name;
    private int score;
    public ChicagoPlayer(String name) { this.name = name; this.score = 0; }
    public String getName() { return name; }
    public int getScore() { return score; }
    public void addScore(int points) { this.score += points; }
}

public class Main {
    public static void main(String[] args) {
        Dice d1 = new Dice();
        Dice d2 = new Dice();
        ChicagoPlayer p1 = new ChicagoPlayer("Spieler 1");
        ChicagoPlayer p2 = new ChicagoPlayer("Spieler 2");
        ChicagoPlayer[] players = {p1, p2};

        for (int round = 1; round <= 6; round++) {
            System.out.println("=== Runde " + round + " (Ziel: " + round + "-" + round + ") ===");
            for (ChicagoPlayer player : players) {
                boolean success = false;
                for (int attempt = 1; attempt <= 3 && !success; attempt++) {
                    int roll1 = d1.roll();
                    int roll2 = d2.roll();
                    System.out.print("  " + player.getName() + " Versuch " + attempt + ": " + roll1 + "-" + roll2);
                    if (roll1 == round && roll2 == round) {
                        player.addScore(round);
                        System.out.println(" -> Pasch! +" + round + " Punkte");
                        success = true;
                    } else {
                        System.out.println(" -> kein Pasch");
                    }
                }
                if (!success) {
                    System.out.println("  " + player.getName() + ": kein Pasch in dieser Runde.");
                }
            }
        }

        System.out.println("=== Endergebnis ===");
        for (ChicagoPlayer p : players) {
            System.out.println(p.getName() + ": " + p.getScore() + " Punkte");
        }
        String winner = p1.getScore() > p2.getScore() ? p1.getName() :
                         p2.getScore() > p1.getScore() ? p2.getName() : "Unentschieden";
        System.out.println(winner.equals("Unentschieden") ? "Unentschieden!" : winner + " gewinnt!");
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam-dice-07',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 7 - Kniffel (vereinfacht)',
    description: 'Implementiere eine vereinfachte Version von Kniffel (Yahtzee). Der Spieler würfelt 5 Würfel und hat insgesamt 3 Versuche pro Runde. Nach jedem Wurf wird automatisch entschieden, welche Würfel behalten werden (gleiche Augenzahlen). Nach 3 Versuchen wird die beste Kombination ausgewertet: Paar=10, Drilling=20, Full House=30, Viererpasch=40, Kniffel(5 gleiche)=50.',
    requirements: [
      'Erstelle eine Klasse Dice mit Methode roll()',
      'Verwende ein Array von 5 Wuerfeln',
      '3 Versuche pro Runde, automatisches Behalten gleicher Wuerfel',
      'Auswertung: Paar=10, Drilling=20, Full House=30, Viererpasch=40, Kniffel=50',
      'Spiele 3 Runden und zeige die Gesamtpunktzahl',
    ],
    starterCode: `import java.util.Random;
import java.util.Arrays;

// TODO: Klasse Dice

public class Main {
    // TODO: Methode zur Auswertung der 5 Wuerfel
    // TODO: Methode zur Anzeige der Wuerfel

    public static void main(String[] args) {
        // TODO: Implementiere vereinfachtes Kniffel
    }
}`,
    solutionCode: `import java.util.Random;
import java.util.Arrays;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    static int[] countDice(int[] dice) {
        int[] counts = new int[7];
        for (int d : dice) counts[d]++;
        return counts;
    }

    static String evaluate(int[] dice) {
        int[] counts = countDice(dice);
        int maxCount = 0;
        boolean hasPair = false, hasTriple = false;
        for (int i = 1; i <= 6; i++) {
            if (counts[i] > maxCount) maxCount = counts[i];
            if (counts[i] == 2) hasPair = true;
            if (counts[i] == 3) hasTriple = true;
        }
        if (maxCount == 5) return "Kniffel";
        if (maxCount == 4) return "Viererpasch";
        if (hasTriple && hasPair) return "Full House";
        if (hasTriple) return "Drilling";
        if (hasPair) return "Paar";
        return "Nichts";
    }

    static int getPoints(String combo) {
        switch (combo) {
            case "Kniffel": return 50;
            case "Viererpasch": return 40;
            case "Full House": return 30;
            case "Drilling": return 20;
            case "Paar": return 10;
            default: return 0;
        }
    }

    static int findMostFrequent(int[] dice) {
        int[] counts = countDice(dice);
        int best = 1;
        for (int i = 2; i <= 6; i++) {
            if (counts[i] > counts[best]) best = i;
        }
        return best;
    }

    public static void main(String[] args) {
        Dice die = new Dice();
        int totalScore = 0;

        for (int round = 1; round <= 3; round++) {
            System.out.println("=== Runde " + round + " ===");
            int[] dice = new int[5];
            for (int i = 0; i < 5; i++) dice[i] = die.roll();
            System.out.println("Wurf 1: " + Arrays.toString(dice));

            for (int attempt = 2; attempt <= 3; attempt++) {
                int keep = findMostFrequent(dice);
                for (int i = 0; i < 5; i++) {
                    if (dice[i] != keep) dice[i] = die.roll();
                }
                System.out.println("Wurf " + attempt + ": " + Arrays.toString(dice) + " (behalte " + keep + "er)");
            }

            String combo = evaluate(dice);
            int points = getPoints(combo);
            totalScore += points;
            System.out.println("Ergebnis: " + combo + " = " + points + " Punkte");
        }

        System.out.println("=== Gesamtpunktzahl: " + totalScore + " ===");
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-08',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 8 - Schiffe versenken mit Würfeln',
    description: 'Implementiere ein Schiffe-versenken-Spiel mit Würfeln. Jeder Spieler hat 5 Schiffe mit unterschiedlichen Trefferpunkten. Pro Runde würfelt ein Spieler mit 2 Würfeln. Bei bestimmten Summen wird ein gegnerisches Schiff getroffen: 2-4 trifft Schiff 1, 5-6 trifft Schiff 2, 7 trifft Schiff 3, 8-9 trifft Schiff 4, 10-12 trifft Schiff 5. Ein Schiff sinkt nach 2 Treffern. Wer zuerst alle gegnerischen Schiffe versenkt, gewinnt.',
    requirements: [
      'Erstelle eine Klasse Ship mit name und hitPoints (startet bei 2)',
      'Erstelle eine Klasse Player mit name und einem Array von 5 Schiffen',
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Wuerfelsumme bestimmt welches Schiff getroffen wird',
      'Ein Schiff sinkt nach 2 Treffern',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Ship
// TODO: Klasse Player
// TODO: Klasse Dice

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere Schiffe versenken mit Wuerfeln
    }
}`,
    solutionCode: `import java.util.Random;

class Ship {
    private String name;
    private int hitPoints;
    public Ship(String name) { this.name = name; this.hitPoints = 2; }
    public String getName() { return name; }
    public boolean isAlive() { return hitPoints > 0; }
    public void hit() { if (hitPoints > 0) hitPoints--; }
    public int getHitPoints() { return hitPoints; }
}

class Player {
    private String name;
    private Ship[] ships;
    public Player(String name) {
        this.name = name;
        this.ships = new Ship[] {
            new Ship("Boot"), new Ship("Fregatte"),
            new Ship("Kreuzer"), new Ship("Schlachtschiff"), new Ship("Traeger")
        };
    }
    public String getName() { return name; }
    public Ship[] getShips() { return ships; }
    public boolean hasShipsLeft() {
        for (Ship s : ships) if (s.isAlive()) return true;
        return false;
    }
    public Ship getShipBySum(int sum) {
        if (sum >= 2 && sum <= 4) return ships[0];
        if (sum >= 5 && sum <= 6) return ships[1];
        if (sum == 7) return ships[2];
        if (sum >= 8 && sum <= 9) return ships[3];
        return ships[4];
    }
}

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    public static void main(String[] args) {
        Player p1 = new Player("Spieler 1");
        Player p2 = new Player("Spieler 2");
        Dice d1 = new Dice(), d2 = new Dice();
        Player attacker = p1, defender = p2;
        int round = 1;

        while (p1.hasShipsLeft() && p2.hasShipsLeft()) {
            int roll = d1.roll() + d2.roll();
            Ship target = defender.getShipBySum(roll);
            System.out.print("Runde " + round + ": " + attacker.getName() + " wuerfelt " + roll);
            if (target.isAlive()) {
                target.hit();
                System.out.print(" -> trifft " + target.getName());
                if (!target.isAlive()) System.out.print(" (VERSENKT!)");
                System.out.println();
            } else {
                System.out.println(" -> " + target.getName() + " bereits versenkt");
            }

            Player temp = attacker;
            attacker = defender;
            defender = temp;
            round++;
        }

        String winner = p1.hasShipsLeft() ? p1.getName() : p2.getName();
        System.out.println(winner + " gewinnt nach " + (round - 1) + " Runden!");
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-09',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 9 - Würfel-Poker',
    description: 'Implementiere Würfel-Poker. Jeder Spieler würfelt 5 Würfel. Die Kombination wird ausgewertet: Paar (2 gleiche), Zwei Paare, Drilling (3 gleiche), Full House (Drilling+Paar), Kleine Straße (4 aufeinander), Große Straße (5 aufeinander), Viererpasch (4 gleiche), Fünferpasch (5 gleiche). Höhere Kombination gewinnt. Bei Gleichheit entscheidet die höchste Augenzahl.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Erstelle eine Methode evaluate(int[]) die den Rang der Kombination zurueckgibt',
      'Erkenne: Paar, Zwei Paare, Drilling, Full House, Kleine Strasse, Grosse Strasse, Viererpasch, Fuenferpasch',
      'Vergleiche die Kombinationen zweier Spieler',
    ],
    starterCode: `import java.util.Random;
import java.util.Arrays;

// TODO: Klasse Dice

public class Main {
    // TODO: Methode evaluate(int[] dice) -> Rang und Beschreibung
    // TODO: Methode zum Vergleich

    public static void main(String[] args) {
        // TODO: Implementiere Wuerfel-Poker fuer 2 Spieler
    }
}`,
    solutionCode: `import java.util.Random;
import java.util.Arrays;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    static int[] countValues(int[] dice) {
        int[] counts = new int[7];
        for (int d : dice) counts[d]++;
        return counts;
    }

    static boolean isSmallStraight(int[] counts) {
        return (counts[1]>=1 && counts[2]>=1 && counts[3]>=1 && counts[4]>=1) ||
               (counts[2]>=1 && counts[3]>=1 && counts[4]>=1 && counts[5]>=1) ||
               (counts[3]>=1 && counts[4]>=1 && counts[5]>=1 && counts[6]>=1);
    }

    static boolean isLargeStraight(int[] counts) {
        return (counts[1]==1 && counts[2]==1 && counts[3]==1 && counts[4]==1 && counts[5]==1) ||
               (counts[2]==1 && counts[3]==1 && counts[4]==1 && counts[5]==1 && counts[6]==1);
    }

    static int evaluate(int[] dice) {
        int[] counts = countValues(dice);
        int pairs = 0, threes = 0, fours = 0, fives = 0;
        for (int i = 1; i <= 6; i++) {
            if (counts[i] == 2) pairs++;
            if (counts[i] == 3) threes++;
            if (counts[i] == 4) fours++;
            if (counts[i] == 5) fives++;
        }
        if (fives == 1) return 8;
        if (fours == 1) return 7;
        if (isLargeStraight(counts)) return 6;
        if (isSmallStraight(counts)) return 5;
        if (threes == 1 && pairs == 1) return 4;
        if (threes == 1) return 3;
        if (pairs == 2) return 2;
        if (pairs == 1) return 1;
        return 0;
    }

    static String rankName(int rank) {
        String[] names = {"Nichts", "Paar", "Zwei Paare", "Drilling",
                          "Full House", "Kleine Strasse", "Grosse Strasse",
                          "Viererpasch", "Fuenferpasch"};
        return names[rank];
    }

    static int highestValue(int[] dice) {
        int max = 0;
        for (int d : dice) if (d > max) max = d;
        return max;
    }

    public static void main(String[] args) {
        Dice die = new Dice();
        int[] dice1 = new int[5], dice2 = new int[5];
        for (int i = 0; i < 5; i++) { dice1[i] = die.roll(); dice2[i] = die.roll(); }
        Arrays.sort(dice1);
        Arrays.sort(dice2);

        int rank1 = evaluate(dice1), rank2 = evaluate(dice2);
        System.out.println("Spieler 1: " + Arrays.toString(dice1) + " -> " + rankName(rank1));
        System.out.println("Spieler 2: " + Arrays.toString(dice2) + " -> " + rankName(rank2));

        if (rank1 > rank2) System.out.println("Spieler 1 gewinnt!");
        else if (rank2 > rank1) System.out.println("Spieler 2 gewinnt!");
        else {
            int h1 = highestValue(dice1), h2 = highestValue(dice2);
            if (h1 > h2) System.out.println("Spieler 1 gewinnt (hoehere Augenzahl)!");
            else if (h2 > h1) System.out.println("Spieler 2 gewinnt (hoehere Augenzahl)!");
            else System.out.println("Unentschieden!");
        }
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-10',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 10 - Meiern/Lügen',
    description: 'Implementiere eine vereinfachte Version von Meiern (auch Mäxchen/Lügen). Spieler 1 würfelt zwei Würfel und bildet eine Zahl (größere Ziffer zuerst). Er kann die Wahrheit sagen oder lügen (das Programm entscheidet zufällig). Spieler 2 muss entscheiden ob er es glaubt (automatische Entscheidung: glaubt bei Werten unter 50). Wenn Spieler 2 "Lügner!" ruft und es war gelogen, verliert Spieler 1 einen Punkt. Wenn es die Wahrheit war, verliert Spieler 2. Wer zuerst 0 Punkte hat, verliert.',
    requirements: [
      'Erstelle eine Klasse MeierDice mit roll() fuer 2 Wuerfel',
      'Wertberechnung: groessere Ziffer * 10 + kleinere Ziffer',
      'Spieler 1 kann luegen (zufaellige Entscheidung, 30% Chance)',
      'Beim Luegen wird ein hoeherer Wert behauptet',
      'Spieler 2 glaubt automatisch bei Werten unter 50',
      'Jeder Spieler startet mit 3 Lebenspunkten',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse MeierDice
// TODO: Spiellogik

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere Meiern
    }
}`,
    solutionCode: `import java.util.Random;

class MeierDice {
    private static final Random random = new Random();
    private int die1, die2;

    public void roll() {
        die1 = random.nextInt(6) + 1;
        die2 = random.nextInt(6) + 1;
    }

    public int getValue() {
        return Math.max(die1, die2) * 10 + Math.min(die1, die2);
    }

    public int getDie1() { return die1; }
    public int getDie2() { return die2; }
}

public class Main {
    public static void main(String[] args) {
        Random random = new Random();
        MeierDice dice = new MeierDice();
        int livesP1 = 3, livesP2 = 3;
        int round = 1;

        while (livesP1 > 0 && livesP2 > 0) {
            System.out.println("=== Runde " + round + " (S1: " + livesP1 + " | S2: " + livesP2 + " Leben) ===");
            dice.roll();
            int realValue = dice.getValue();
            System.out.println("Spieler 1 wuerfelt: " + dice.getDie1() + "+" + dice.getDie2() + " = " + realValue);

            boolean lies = random.nextInt(100) < 30;
            int claimedValue = realValue;
            if (lies) {
                claimedValue = realValue + random.nextInt(20) + 10;
                if (claimedValue > 66) claimedValue = 66;
                System.out.println("Spieler 1 LUEGT und behauptet: " + claimedValue);
            } else {
                System.out.println("Spieler 1 sagt die Wahrheit: " + claimedValue);
            }

            boolean believes = claimedValue < 50;
            if (believes) {
                System.out.println("Spieler 2 glaubt es.");
                if (lies) {
                    System.out.println("  -> Spieler 1 hat geluegt und kommt damit durch!");
                }
            } else {
                System.out.println("Spieler 2 ruft: Luegner!");
                if (lies) {
                    System.out.println("  -> Richtig! Spieler 1 hat geluegen. S1 verliert 1 Leben.");
                    livesP1--;
                } else {
                    System.out.println("  -> Falsch! Spieler 1 hat die Wahrheit gesagt. S2 verliert 1 Leben.");
                    livesP2--;
                }
            }
            round++;
        }

        String loser = livesP1 <= 0 ? "Spieler 1" : "Spieler 2";
        String winner = livesP1 > 0 ? "Spieler 1" : "Spieler 2";
        System.out.println(loser + " hat keine Leben mehr. " + winner + " gewinnt!");
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam-dice-11',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 11 - 10000 (Zehntausend) vereinfacht',
    description: 'Implementiere eine vereinfachte Version von 10000 (Zehntausend). Pro Zug würfelt der Spieler 6 Würfel. Punkte gibt es für: Einsen (100 je), Fünfen (50 je), Drilling (Augenzahl x 100, z.B. drei 4er = 400, drei 1er = 1000), drei Paare (1500). Nach jedem Wurf werden die Punkte-Würfel rausgelegt und der Spieler kann mit den restlichen Würfeln weiterwürfeln oder aufhören. Kein Punkte-Würfel = alle Rundenpunkte verloren.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Werte 6 Wuerfel gleichzeitig aus',
      'Punkte: Einsen=100, Fuenfen=50, Drilling=Augenzahl*100 (1er-Drilling=1000)',
      'Keine Punkte-Wuerfel = Runde verloren',
      'Automatische Strategie: aufhoeren wenn weniger als 3 Wuerfel uebrig',
      'Gewinnziel: 10000 Punkte, 2 Spieler',
    ],
    starterCode: `import java.util.Random;
import java.util.Arrays;

// TODO: Klasse Dice

public class Main {
    // TODO: Methode zum Auswerten der Wuerfel
    // TODO: Methode zum Zaehlen der Punkte-Wuerfel

    public static void main(String[] args) {
        // TODO: Implementiere 10000
    }
}`,
    solutionCode: `import java.util.Random;
import java.util.Arrays;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    static int[] countValues(int[] dice) {
        int[] counts = new int[7];
        for (int d : dice) if (d > 0) counts[d]++;
        return counts;
    }

    static int calculatePoints(int[] dice) {
        int[] counts = countValues(dice);
        int points = 0;

        // Drillinge pruefen
        for (int i = 1; i <= 6; i++) {
            if (counts[i] >= 3) {
                points += (i == 1) ? 1000 : i * 100;
                counts[i] -= 3;
            }
        }

        // Einzelne 1er und 5er
        points += counts[1] * 100;
        points += counts[5] * 50;

        return points;
    }

    static int countScoringDice(int[] dice) {
        int[] counts = countValues(dice);
        int scoring = 0;
        for (int i = 1; i <= 6; i++) {
            if (counts[i] >= 3) { scoring += 3; counts[i] -= 3; }
        }
        scoring += counts[1] + counts[5];
        return scoring;
    }

    public static void main(String[] args) {
        Dice die = new Dice();
        int[] scores = {0, 0};
        String[] names = {"Spieler 1", "Spieler 2"};
        int currentPlayer = 0;

        while (scores[0] < 10000 && scores[1] < 10000) {
            System.out.println("--- " + names[currentPlayer] + " (Gesamt: " + scores[currentPlayer] + ") ---");
            int numDice = 6;
            int turnPoints = 0;
            boolean busted = false;

            while (numDice >= 3 && !busted) {
                int[] rolled = new int[numDice];
                for (int i = 0; i < numDice; i++) rolled[i] = die.roll();
                System.out.println("  Wuerfel: " + Arrays.toString(rolled));

                int points = calculatePoints(rolled);
                if (points == 0) {
                    System.out.println("  Keine Punkte! Alles verloren.");
                    turnPoints = 0;
                    busted = true;
                } else {
                    turnPoints += points;
                    int scoringDice = countScoringDice(rolled);
                    numDice -= scoringDice;
                    if (numDice == 0) numDice = 6;
                    System.out.println("  +" + points + " Punkte (Runde: " + turnPoints + "), " + numDice + " Wuerfel uebrig");
                }
            }

            if (!busted) {
                scores[currentPlayer] += turnPoints;
                System.out.println("  Gesichert: " + turnPoints + " -> Gesamt: " + scores[currentPlayer]);
            }

            currentPlayer = 1 - currentPlayer;
        }

        String winner = scores[0] >= 10000 ? names[0] : names[1];
        System.out.println(winner + " gewinnt mit " + Math.max(scores[0], scores[1]) + " Punkten!");
    }
}`,
    timeEstimate: 35,
  },
  {
    id: 'exam-dice-12',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 12 - Bunco',
    description: 'Implementiere das Würfelspiel Bunco. Es wird in 6 Runden gespielt. In jeder Runde ist eine Zielzahl (Runde 1 = Ziel 1, Runde 2 = Ziel 2, usw.). Pro Zug würfelt der Spieler 3 Würfel. Jeder Würfel der die Zielzahl zeigt gibt 1 Punkt. Zeigen alle 3 die Zielzahl, ist es ein "Bunco" (21 Punkte). Der Spieler würfelt so lange weiter, wie mindestens ein Würfel die Zielzahl trifft. Bei 0 Treffern ist der nächste Spieler dran.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Erstelle eine Klasse BuncoPlayer mit Name und Punktestand',
      '6 Runden mit jeweils passender Zielzahl',
      'Bunco (3 gleiche Zielzahl) = 21 Punkte',
      'Normaler Treffer = 1 Punkt pro passendem Wuerfel',
      'Spieler wuerfelt weiter solange mind. 1 Treffer',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice
// TODO: Klasse BuncoPlayer

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere Bunco
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class BuncoPlayer {
    private String name;
    private int score;
    private int buncoCount;

    public BuncoPlayer(String name) { this.name = name; }
    public String getName() { return name; }
    public int getScore() { return score; }
    public int getBuncoCount() { return buncoCount; }
    public void addScore(int points) { score += points; }
    public void addBunco() { buncoCount++; }
}

public class Main {
    public static void main(String[] args) {
        Dice d1 = new Dice(), d2 = new Dice(), d3 = new Dice();
        BuncoPlayer p1 = new BuncoPlayer("Spieler 1");
        BuncoPlayer p2 = new BuncoPlayer("Spieler 2");
        BuncoPlayer[] players = {p1, p2};

        for (int round = 1; round <= 6; round++) {
            System.out.println("=== Runde " + round + " (Ziel: " + round + ") ===");
            for (BuncoPlayer player : players) {
                System.out.println(player.getName() + " ist dran:");
                boolean keepRolling = true;
                while (keepRolling) {
                    int r1 = d1.roll(), r2 = d2.roll(), r3 = d3.roll();
                    System.out.print("  Wuerfel: " + r1 + "-" + r2 + "-" + r3);

                    if (r1 == round && r2 == round && r3 == round) {
                        System.out.println(" -> BUNCO! +21 Punkte!");
                        player.addScore(21);
                        player.addBunco();
                    } else {
                        int hits = 0;
                        if (r1 == round) hits++;
                        if (r2 == round) hits++;
                        if (r3 == round) hits++;
                        if (hits > 0) {
                            System.out.println(" -> " + hits + " Treffer!");
                            player.addScore(hits);
                        } else {
                            System.out.println(" -> kein Treffer. Ende.");
                            keepRolling = false;
                        }
                    }
                }
                System.out.println("  " + player.getName() + " Punkte: " + player.getScore());
            }
        }

        System.out.println("=== Endergebnis ===");
        for (BuncoPlayer p : players) {
            System.out.println(p.getName() + ": " + p.getScore() + " Punkte (" + p.getBuncoCount() + " Buncos)");
        }
        String winner = p1.getScore() > p2.getScore() ? p1.getName() :
                         p2.getScore() > p1.getScore() ? p2.getName() : "Unentschieden";
        System.out.println(winner.equals("Unentschieden") ? "Unentschieden!" : winner + " gewinnt!");
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam-dice-13',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 13 - Eskalero',
    description: 'Implementiere eine vereinfachte Version von Eskalero (Würfelpoker mit Tabelle). Der Spieler hat eine Tabelle mit 6 Kategorien: Einser bis Sechser (Summe aller entsprechenden Würfel). Pro Runde würfelt er 5 Würfel mit bis zu 3 Versuchen. Nach den Versuchen muss er eine noch freie Kategorie wählen. Das Programm wählt automatisch die beste freie Kategorie. Nach 6 Runden wird die Gesamtpunktzahl berechnet.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      '5 Wuerfel pro Wurf, 3 Versuche pro Runde',
      'Tabelle mit 6 Kategorien (Einser bis Sechser)',
      'Automatische Wahl der besten freien Kategorie',
      'Berechne und zeige die Gesamtpunktzahl nach 6 Runden',
    ],
    starterCode: `import java.util.Random;
import java.util.Arrays;

// TODO: Klasse Dice

public class Main {
    // TODO: Methode fuer die beste Kategorie
    // TODO: Tabelle verwalten

    public static void main(String[] args) {
        // TODO: Implementiere Eskalero
    }
}`,
    solutionCode: `import java.util.Random;
import java.util.Arrays;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    static int scoreForCategory(int[] dice, int category) {
        int sum = 0;
        for (int d : dice) if (d == category) sum += d;
        return sum;
    }

    static int findBestCategory(int[] dice, boolean[] used) {
        int bestCat = -1, bestScore = -1;
        for (int cat = 1; cat <= 6; cat++) {
            if (!used[cat]) {
                int score = scoreForCategory(dice, cat);
                if (score > bestScore) { bestScore = score; bestCat = cat; }
            }
        }
        // Falls keine Kategorie Punkte bringt, nimm die erste freie
        if (bestScore == 0) {
            for (int cat = 1; cat <= 6; cat++) {
                if (!used[cat]) return cat;
            }
        }
        return bestCat;
    }

    static int findMostFrequent(int[] dice) {
        int[] counts = new int[7];
        for (int d : dice) counts[d]++;
        int best = 1;
        for (int i = 2; i <= 6; i++) if (counts[i] > counts[best]) best = i;
        return best;
    }

    public static void main(String[] args) {
        Dice die = new Dice();
        boolean[] used = new boolean[7];
        int[] table = new int[7];
        String[] catNames = {"", "Einser", "Zweier", "Dreier", "Vierer", "Fuenfer", "Sechser"};

        for (int round = 1; round <= 6; round++) {
            System.out.println("=== Runde " + round + " ===");
            int[] dice = new int[5];
            for (int i = 0; i < 5; i++) dice[i] = die.roll();
            System.out.println("Wurf 1: " + Arrays.toString(dice));

            for (int attempt = 2; attempt <= 3; attempt++) {
                int keep = findMostFrequent(dice);
                for (int i = 0; i < 5; i++) {
                    if (dice[i] != keep) dice[i] = die.roll();
                }
                System.out.println("Wurf " + attempt + ": " + Arrays.toString(dice) + " (behalte " + keep + "er)");
            }

            int bestCat = findBestCategory(dice, used);
            int points = scoreForCategory(dice, bestCat);
            used[bestCat] = true;
            table[bestCat] = points;
            System.out.println("-> " + catNames[bestCat] + ": " + points + " Punkte");
        }

        System.out.println("=== Ergebnis ===");
        int total = 0;
        for (int cat = 1; cat <= 6; cat++) {
            System.out.println(catNames[cat] + ": " + table[cat]);
            total += table[cat];
        }
        System.out.println("Gesamt: " + total + " Punkte");
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-14',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 14 - Glücksrad-Würfel',
    description: 'Implementiere ein Glücksrad-Spiel, das mit 3 Würfeln simuliert wird. Die Summe der 3 Würfel bestimmt den Sektor des Glücksrads: 3-6 = "Niete" (0 Punkte), 7-9 = "Kleiner Gewinn" (10 Punkte), 10-12 = "Mittlerer Gewinn" (25 Punkte), 13-15 = "Grosser Gewinn" (50 Punkte), 16-17 = "Jackpot" (100 Punkte), 18 = "Super-Jackpot" (200 Punkte). Jeder Spieler hat 5 Drehungen. Wer die meisten Punkte hat, gewinnt.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Erstelle eine Klasse WheelPlayer mit Name und Punktestand',
      'Drei Wuerfel simulieren das Gluecksrad',
      'Sektoren basierend auf der Wuerfelsumme',
      '5 Drehungen pro Spieler, 2 Spieler',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice
// TODO: Klasse WheelPlayer

public class Main {
    // TODO: Methode getSector(int sum) -> Name und Punkte

    public static void main(String[] args) {
        // TODO: Implementiere Gluecksrad-Wuerfel
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class WheelPlayer {
    private String name;
    private int score;
    public WheelPlayer(String name) { this.name = name; }
    public String getName() { return name; }
    public int getScore() { return score; }
    public void addScore(int points) { score += points; }
}

public class Main {
    static String getSectorName(int sum) {
        if (sum <= 6) return "Niete";
        if (sum <= 9) return "Kleiner Gewinn";
        if (sum <= 12) return "Mittlerer Gewinn";
        if (sum <= 15) return "Grosser Gewinn";
        if (sum <= 17) return "Jackpot";
        return "Super-Jackpot";
    }

    static int getSectorPoints(int sum) {
        if (sum <= 6) return 0;
        if (sum <= 9) return 10;
        if (sum <= 12) return 25;
        if (sum <= 15) return 50;
        if (sum <= 17) return 100;
        return 200;
    }

    public static void main(String[] args) {
        Dice d1 = new Dice(), d2 = new Dice(), d3 = new Dice();
        WheelPlayer p1 = new WheelPlayer("Spieler 1");
        WheelPlayer p2 = new WheelPlayer("Spieler 2");
        WheelPlayer[] players = {p1, p2};

        for (WheelPlayer player : players) {
            System.out.println("=== " + player.getName() + " ===");
            for (int spin = 1; spin <= 5; spin++) {
                int r1 = d1.roll(), r2 = d2.roll(), r3 = d3.roll();
                int sum = r1 + r2 + r3;
                String sector = getSectorName(sum);
                int points = getSectorPoints(sum);
                player.addScore(points);
                System.out.println("  Drehung " + spin + ": " + r1 + "+" + r2 + "+" + r3 + "=" + sum
                    + " -> " + sector + " (+" + points + ", Gesamt: " + player.getScore() + ")");
            }
        }

        System.out.println("=== Endergebnis ===");
        System.out.println(p1.getName() + ": " + p1.getScore() + " Punkte");
        System.out.println(p2.getName() + ": " + p2.getScore() + " Punkte");
        String winner = p1.getScore() > p2.getScore() ? p1.getName() :
                         p2.getScore() > p1.getScore() ? p2.getName() : "Unentschieden";
        System.out.println(winner.equals("Unentschieden") ? "Unentschieden!" : winner + " gewinnt!");
    }
}`,
    timeEstimate: 20,
  },
  {
    id: 'exam-dice-15',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 15 - Shut the Box',
    description: 'Implementiere das Würfelspiel "Shut the Box". Es gibt 9 Klappen mit den Zahlen 1-9. Pro Runde würfelt der Spieler 2 Würfel. Er muss Klappen umlegen, deren Summe der Würfelsumme entspricht (das Programm legt automatisch die größtmögliche einzelne Klappe um, sonst eine Kombination aus zwei Klappen). Das Spiel endet wenn keine gültige Kombination mehr möglich ist. Die Summe der offenen Klappen ist die Punktzahl (weniger = besser). 0 = "Shut the Box"!',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Verwende ein boolean-Array fuer die 9 Klappen',
      'Pro Wurf: Klappen umlegen deren Summe = Wuerfelsumme',
      'Automatische Strategie: groesste einzelne Klappe zuerst, sonst Zweierkombination',
      'Spiel endet wenn keine Kombination moeglich',
      'Zeige Endpunktzahl (Summe offener Klappen)',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice

public class Main {
    // TODO: Methode um zu pruefen ob eine Kombination moeglich ist
    // TODO: Methode um Klappen umzulegen

    public static void main(String[] args) {
        // TODO: Implementiere Shut the Box
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

public class Main {
    static boolean tryShutSingle(boolean[] boxes, int sum) {
        if (sum >= 1 && sum <= 9 && boxes[sum]) {
            boxes[sum] = false;
            return true;
        }
        return false;
    }

    static boolean tryShutPair(boolean[] boxes, int sum) {
        for (int i = Math.min(sum - 1, 9); i >= 1; i--) {
            int j = sum - i;
            if (j >= 1 && j <= 9 && j != i && boxes[i] && boxes[j]) {
                boxes[i] = false;
                boxes[j] = false;
                return true;
            }
        }
        return false;
    }

    static boolean canMove(boolean[] boxes, int sum) {
        if (sum >= 1 && sum <= 9 && boxes[sum]) return true;
        for (int i = 1; i <= 9; i++) {
            int j = sum - i;
            if (j >= 1 && j <= 9 && j != i && boxes[i] && boxes[j]) return true;
        }
        return false;
    }

    static void printBoxes(boolean[] boxes) {
        System.out.print("  Klappen: ");
        for (int i = 1; i <= 9; i++) {
            System.out.print(boxes[i] ? "[" + i + "]" : "[ ]");
        }
        System.out.println();
    }

    static int getScore(boolean[] boxes) {
        int sum = 0;
        for (int i = 1; i <= 9; i++) if (boxes[i]) sum += i;
        return sum;
    }

    public static void main(String[] args) {
        Dice d1 = new Dice(), d2 = new Dice();
        boolean[] boxes = new boolean[10];
        for (int i = 1; i <= 9; i++) boxes[i] = true;

        int round = 1;
        while (true) {
            int sum = d1.roll() + d2.roll();
            System.out.println("Runde " + round + ": Wuerfelsumme = " + sum);

            if (!canMove(boxes, sum)) {
                System.out.println("  Keine Kombination moeglich!");
                break;
            }

            if (!tryShutSingle(boxes, sum)) {
                tryShutPair(boxes, sum);
            }

            printBoxes(boxes);
            if (getScore(boxes) == 0) {
                System.out.println("  SHUT THE BOX!");
                break;
            }
            round++;
        }

        int score = getScore(boxes);
        System.out.println("Endpunktzahl: " + score + (score == 0 ? " - Perfekt!" : " Punkte"));
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam-dice-16',
    category: 'wuerfelspiel',
    semester: 'java1',
    title: 'Würfelspiel 16 - Würfel-Rennen',
    description: 'Implementiere ein Würfel-Rennen für 4 Spieler. Jeder Spieler startet auf Position 0 und muss Position 30 erreichen. Pro Runde würfelt jeder Spieler einen Würfel und zieht entsprechend viele Felder vor. Sonderregeln: Bei einer 6 darf man nochmal würfeln. Wer auf einem Feld landet, auf dem bereits ein anderer steht, schickt diesen auf Start zurück. Wer zuerst Position 30 (oder mehr) erreicht, gewinnt.',
    requirements: [
      'Erstelle eine Klasse Dice mit roll()-Methode',
      'Erstelle eine Klasse RacePlayer mit Name und Position',
      '4 Spieler, Ziel: Position 30',
      'Bei einer 6: nochmal wuerfeln (zusaetzlicher Wurf)',
      'Auf besetztem Feld landen = Gegner zurueck auf Start',
      'Zeige nach jeder Runde die Positionen aller Spieler',
    ],
    starterCode: `import java.util.Random;

// TODO: Klasse Dice
// TODO: Klasse RacePlayer

public class Main {
    public static void main(String[] args) {
        // TODO: Implementiere das Wuerfel-Rennen
    }
}`,
    solutionCode: `import java.util.Random;

class Dice {
    private static final Random random = new Random();
    public int roll() { return random.nextInt(6) + 1; }
}

class RacePlayer {
    private String name;
    private int position;
    public RacePlayer(String name) { this.name = name; this.position = 0; }
    public String getName() { return name; }
    public int getPosition() { return position; }
    public void move(int steps) { position += steps; }
    public void resetPosition() { position = 0; }
}

public class Main {
    public static void main(String[] args) {
        Dice dice = new Dice();
        RacePlayer[] players = {
            new RacePlayer("Spieler 1"), new RacePlayer("Spieler 2"),
            new RacePlayer("Spieler 3"), new RacePlayer("Spieler 4")
        };
        boolean finished = false;
        int round = 1;

        while (!finished) {
            System.out.println("=== Runde " + round + " ===");
            for (RacePlayer player : players) {
                if (finished) break;
                int totalRoll = 0;
                int roll = dice.roll();
                totalRoll += roll;
                System.out.print("  " + player.getName() + " wuerfelt " + roll);

                while (roll == 6) {
                    System.out.print(" (6! nochmal)");
                    roll = dice.roll();
                    totalRoll += roll;
                    System.out.print(" +" + roll);
                }

                player.move(totalRoll);
                System.out.println(" -> Position " + player.getPosition());

                // Pruefen ob jemand rausgeworfen wird
                for (RacePlayer other : players) {
                    if (other != player && other.getPosition() == player.getPosition() && player.getPosition() > 0) {
                        System.out.println("    " + other.getName() + " wird zurueckgeschickt!");
                        other.resetPosition();
                    }
                }

                if (player.getPosition() >= 30) {
                    System.out.println(player.getName() + " hat das Ziel erreicht!");
                    finished = true;
                }
            }

            System.out.print("  Positionen: ");
            for (RacePlayer p : players) {
                System.out.print(p.getName() + "=" + p.getPosition() + " ");
            }
            System.out.println();
            round++;
        }
    }
}`,
    timeEstimate: 25,
  },

  // ==================== JAVA 1: AKTIVITÄTSDIAGRAMME (Fortsetzung) ====================
  {
    id: 'exam-ad-02',
    category: 'aktivitaetsdiagramm',
    semester: 'java1',
    title: 'Geldautomat',
    description: 'Implementiere die Logik eines Geldautomaten basierend auf einem Aktivitätsdiagramm. Der Benutzer gibt seine PIN ein (hat 3 Versuche). Nach erfolgreicher Anmeldung kann er einen Betrag eingeben. Der Automat prüft ob genügend Guthaben vorhanden ist und ob der Betrag durch 10 teilbar ist. Am Ende wird das Geld ausgegeben und der neue Kontostand angezeigt.',
    requirements: [
      'PIN-Eingabe mit maximal 3 Versuchen (korrekte PIN: 1234)',
      'Nach 3 Fehlversuchen: Karte einziehen',
      'Betrag muss durch 10 teilbar sein',
      'Betrag darf Guthaben nicht uebersteigen (Startguthaben: 1000)',
      'Geld ausgeben und neuen Kontostand anzeigen',
    ],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int correctPin = 1234;
        int balance = 1000;
        // TODO: Implementiere die Geldautomat-Logik
        // - PIN-Eingabe (3 Versuche)
        // - Betrag eingeben
        // - Pruefen und Geld ausgeben
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int correctPin = 1234;
        int balance = 1000;
        boolean authenticated = false;

        System.out.println("=== Geldautomat ===");
        System.out.println("Willkommen! Bitte Karte eingefuehrt.");

        // PIN-Eingabe mit 3 Versuchen
        for (int attempt = 1; attempt <= 3; attempt++) {
            System.out.print("PIN eingeben (Versuch " + attempt + "/3): ");
            int pin = scanner.nextInt();
            if (pin == correctPin) {
                authenticated = true;
                System.out.println("PIN korrekt! Anmeldung erfolgreich.");
                break;
            } else {
                System.out.println("Falsche PIN!");
            }
        }

        if (!authenticated) {
            System.out.println("3 Fehlversuche! Karte wird eingezogen.");
            scanner.close();
            return;
        }

        // Betrag eingeben
        System.out.println("Aktueller Kontostand: " + balance + " EUR");
        System.out.print("Gewuenschter Betrag: ");
        int amount = scanner.nextInt();

        // Pruefen ob Betrag gueltig
        if (amount % 10 != 0) {
            System.out.println("Fehler: Betrag muss durch 10 teilbar sein!");
            scanner.close();
            return;
        }

        if (amount > balance) {
            System.out.println("Fehler: Nicht genuegend Guthaben!");
            scanner.close();
            return;
        }

        if (amount <= 0) {
            System.out.println("Fehler: Betrag muss positiv sein!");
            scanner.close();
            return;
        }

        // Geld ausgeben
        balance -= amount;
        System.out.println("Bitte entnehmen Sie " + amount + " EUR.");
        System.out.println("Neuer Kontostand: " + balance + " EUR");
        System.out.println("Auf Wiedersehen!");
        scanner.close();
    }
}`,
    expectedOutput: `=== Geldautomat ===
Willkommen! Bitte Karte eingefuehrt.
PIN eingeben (Versuch 1/3): 1234
PIN korrekt! Anmeldung erfolgreich.
Aktueller Kontostand: 1000 EUR
Gewuenschter Betrag: 200
Bitte entnehmen Sie 200 EUR.
Neuer Kontostand: 800 EUR
Auf Wiedersehen!`,
    timeEstimate: 20,
  },
  {
    id: 'exam-ad-03',
    category: 'aktivitaetsdiagramm',
    semester: 'java1',
    title: 'Paketversand',
    description: 'Implementiere die Logik eines Paketversand-Systems basierend auf einem Aktivitätsdiagramm. Das Paketgewicht wird eingegeben. Daraus wird die Zone bestimmt (Inland/EU/International). Der Grundpreis wird berechnet (Gewicht * Faktor). Optional kann Express gewählt werden (+50%). Am Ende wird der Gesamtpreis ausgegeben und eine Sendungsnummer generiert.',
    requirements: [
      'Gewicht eingeben (in kg)',
      'Zone bestimmen: I=Inland (bis 5kg: 4.99, bis 10kg: 6.99, bis 31.5kg: 9.99), E=EU (+3 EUR Aufschlag), W=Weltweit (+8 EUR Aufschlag)',
      'Express-Option: +50% Aufschlag',
      'Sendungsnummer generieren (zufaellige 8-stellige Zahl)',
      'Gesamtpreis und Sendungsnummer ausgeben',
    ],
    starterCode: `import java.util.Scanner;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        // TODO: Implementiere die Paketversand-Logik
        // - Gewicht eingeben
        // - Zone waehlen (I/E/W)
        // - Express-Option (J/N)
        // - Preis berechnen und ausgeben
    }
}`,
    solutionCode: `import java.util.Scanner;
import java.util.Random;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        System.out.println("=== Paketversand ===");
        System.out.print("Paketgewicht in kg: ");
        double weight = scanner.nextDouble();

        if (weight <= 0 || weight > 31.5) {
            System.out.println("Fehler: Gewicht muss zwischen 0 und 31.5 kg liegen!");
            scanner.close();
            return;
        }

        // Grundpreis nach Gewicht
        double basePrice;
        if (weight <= 5) basePrice = 4.99;
        else if (weight <= 10) basePrice = 6.99;
        else basePrice = 9.99;

        System.out.print("Zone (I=Inland, E=EU, W=Weltweit): ");
        String zone = scanner.next().toUpperCase();

        double zoneExtra = 0;
        String zoneName;
        switch (zone) {
            case "I":
                zoneName = "Inland";
                break;
            case "E":
                zoneName = "EU";
                zoneExtra = 3.00;
                break;
            case "W":
                zoneName = "Weltweit";
                zoneExtra = 8.00;
                break;
            default:
                System.out.println("Ungueltige Zone!");
                scanner.close();
                return;
        }

        double totalPrice = basePrice + zoneExtra;

        System.out.print("Express-Versand? (J/N): ");
        String express = scanner.next().toUpperCase();
        String versandart = "Standard";
        if (express.equals("J")) {
            totalPrice *= 1.5;
            versandart = "Express";
        }

        // Sendungsnummer generieren
        int trackingNumber = 10000000 + random.nextInt(90000000);

        System.out.println("--- Versandbestaetigung ---");
        System.out.println("Gewicht: " + String.format("%.1f", weight) + " kg");
        System.out.println("Zone: " + zoneName);
        System.out.println("Versandart: " + versandart);
        System.out.println("Preis: " + String.format("%.2f", totalPrice) + " EUR");
        System.out.println("Sendungsnummer: " + trackingNumber);
        scanner.close();
    }
}`,
    expectedOutput: `=== Paketversand ===
Paketgewicht in kg: 3.5
Zone (I=Inland, E=EU, W=Weltweit): E
Express-Versand? (J/N): J
--- Versandbestaetigung ---
Gewicht: 3.5 kg
Zone: EU
Versandart: Express
Preis: 11.99 EUR
Sendungsnummer: 48273651`,
    timeEstimate: 20,
  },
  {
    id: 'exam-ad-04',
    category: 'aktivitaetsdiagramm',
    semester: 'java1',
    title: 'Notenberechnung',
    description: 'Implementiere ein Notenbewertungssystem basierend auf einem Aktivitätsdiagramm. Der Benutzer gibt die erreichten Punkte und die maximale Punktzahl ein. Das Programm berechnet den Prozentsatz und ordnet eine Note zu. Am Ende wird angezeigt ob der Student bestanden hat (Note 4.0 oder besser).',
    requirements: [
      'Punkte und Maximalpunkte eingeben',
      'Prozentualen Anteil berechnen',
      'Note zuordnen: >=92%=1.0, >=84%=1.3, >=76%=1.7, >=68%=2.0, >=60%=2.3, >=52%=2.7, >=44%=3.0, >=36%=3.3, >=28%=3.7, >=20%=4.0, <20%=5.0',
      'Bestanden bei Note 4.0 oder besser',
      'Ausgabe: Punkte, Prozent, Note und Bestanden/Nicht bestanden',
    ],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // TODO: Implementiere die Notenberechnung
        // - Punkte eingeben
        // - Maximalpunkte eingeben
        // - Prozent berechnen
        // - Note zuordnen
        // - Bestanden/Nicht bestanden ausgeben
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    static double calculateGrade(double percent) {
        if (percent >= 92) return 1.0;
        if (percent >= 84) return 1.3;
        if (percent >= 76) return 1.7;
        if (percent >= 68) return 2.0;
        if (percent >= 60) return 2.3;
        if (percent >= 52) return 2.7;
        if (percent >= 44) return 3.0;
        if (percent >= 36) return 3.3;
        if (percent >= 28) return 3.7;
        if (percent >= 20) return 4.0;
        return 5.0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("=== Notenberechnung ===");

        System.out.print("Erreichte Punkte: ");
        double points = scanner.nextDouble();

        System.out.print("Maximale Punkte: ");
        double maxPoints = scanner.nextDouble();

        if (maxPoints <= 0) {
            System.out.println("Fehler: Maximale Punkte muessen groesser als 0 sein!");
            scanner.close();
            return;
        }

        if (points < 0 || points > maxPoints) {
            System.out.println("Fehler: Punkte muessen zwischen 0 und " + maxPoints + " liegen!");
            scanner.close();
            return;
        }

        double percent = (points / maxPoints) * 100;
        double grade = calculateGrade(percent);
        boolean passed = grade <= 4.0;

        System.out.println("--- Ergebnis ---");
        System.out.println("Punkte: " + String.format("%.1f", points) + " / " + String.format("%.1f", maxPoints));
        System.out.println("Prozent: " + String.format("%.1f", percent) + "%");
        System.out.println("Note: " + String.format("%.1f", grade));
        System.out.println("Status: " + (passed ? "BESTANDEN" : "NICHT BESTANDEN"));
        scanner.close();
    }
}`,
    expectedOutput: `=== Notenberechnung ===
Erreichte Punkte: 75
Maximale Punkte: 100
--- Ergebnis ---
Punkte: 75.0 / 100.0
Prozent: 75.0%
Note: 1.7
Status: BESTANDEN`,
    timeEstimate: 15,
  },
  {
    id: 'exam-ad-05',
    category: 'aktivitaetsdiagramm',
    semester: 'java1',
    title: 'Getränkeautomat',
    description: 'Implementiere die Logik eines Getränkeautomaten basierend auf einem Aktivitätsdiagramm. Der Benutzer wirft Geld ein (10ct, 20ct, 50ct, 1EUR, 2EUR Münzen). Dann wählt er ein Getränk. Der Automat prüft ob genug Geld eingeworfen wurde, gibt das Getränk aus und berechnet das Wechselgeld.',
    requirements: [
      'Getraenke: Wasser (0.80), Cola (1.20), Saft (1.50), Kaffee (1.80), Cappuccino (2.00)',
      'Akzeptierte Muenzen: 10ct, 20ct, 50ct, 1EUR, 2EUR',
      'Geld einwerfen bis genuegend fuer das gewuenschte Getraenk',
      'Wechselgeld berechnen und in Muenzen ausgeben (groesste Muenzen zuerst)',
      'Getraenk ausgeben und Vorgang abschliessen',
    ],
    starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        // TODO: Implementiere die Getraenkeautomat-Logik
        // - Getraenk waehlen
        // - Geld einwerfen
        // - Wechselgeld berechnen
        // - Getraenk ausgeben
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String[] drinks = {"Wasser", "Cola", "Saft", "Kaffee", "Cappuccino"};
        int[] prices = {80, 120, 150, 180, 200}; // in Cent

        System.out.println("=== Getraenkeautomat ===");
        System.out.println("Getraenke:");
        for (int i = 0; i < drinks.length; i++) {
            System.out.println("  " + (i + 1) + ". " + drinks[i] + " - " + String.format("%.2f", prices[i] / 100.0) + " EUR");
        }

        System.out.print("Getraenk waehlen (1-5): ");
        int choice = scanner.nextInt();
        if (choice < 1 || choice > 5) {
            System.out.println("Ungueltige Auswahl!");
            scanner.close();
            return;
        }

        String selectedDrink = drinks[choice - 1];
        int price = prices[choice - 1];
        System.out.println("Gewaehltes Getraenk: " + selectedDrink + " (" + String.format("%.2f", price / 100.0) + " EUR)");

        int inserted = 0;
        int[] validCoins = {200, 100, 50, 20, 10}; // in Cent
        String[] coinNames = {"2 EUR", "1 EUR", "50ct", "20ct", "10ct"};

        while (inserted < price) {
            System.out.println("Eingeworfen: " + String.format("%.2f", inserted / 100.0) + " EUR | Noch: " + String.format("%.2f", (price - inserted) / 100.0) + " EUR");
            System.out.print("Muenze einwerfen (10/20/50/100/200 Cent): ");
            int coin = scanner.nextInt();

            boolean validCoin = false;
            for (int vc : validCoins) {
                if (coin == vc) { validCoin = true; break; }
            }

            if (!validCoin) {
                System.out.println("Ungueltige Muenze! Akzeptiert: 10, 20, 50, 100, 200 Cent");
                continue;
            }

            inserted += coin;
        }

        // Wechselgeld berechnen
        int change = inserted - price;
        System.out.println("--- Ausgabe ---");
        System.out.println("Getraenk: " + selectedDrink + " wird ausgegeben.");

        if (change > 0) {
            System.out.println("Wechselgeld: " + String.format("%.2f", change / 100.0) + " EUR");
            System.out.print("Muenzen: ");
            int remaining = change;
            boolean first = true;
            for (int i = 0; i < validCoins.length; i++) {
                while (remaining >= validCoins[i]) {
                    if (!first) System.out.print(", ");
                    System.out.print(coinNames[i]);
                    remaining -= validCoins[i];
                    first = false;
                }
            }
            System.out.println();
        } else {
            System.out.println("Kein Wechselgeld.");
        }

        System.out.println("Vielen Dank! Auf Wiedersehen.");
        scanner.close();
    }
}`,
    expectedOutput: `=== Getraenkeautomat ===
Getraenke:
  1. Wasser - 0.80 EUR
  2. Cola - 1.20 EUR
  3. Saft - 1.50 EUR
  4. Kaffee - 1.80 EUR
  5. Cappuccino - 2.00 EUR
Getraenk waehlen (1-5): 2
Gewaehltes Getraenk: Cola (1.20 EUR)
Eingeworfen: 0.00 EUR | Noch: 1.20 EUR
Muenze einwerfen (10/20/50/100/200 Cent): 200
--- Ausgabe ---
Getraenk: Cola wird ausgegeben.
Wechselgeld: 0.80 EUR
Muenzen: 50ct, 20ct, 10ct
Vielen Dank! Auf Wiedersehen.`,
    timeEstimate: 25,
  },

  // ==================== JAVA 1: KLASSENDIAGRAMME (FORTSETZUNG) ====================
  {
    id: 'exam-cd-04',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Fahrzeugvermietung',
    description: 'Implementiere ein Fahrzeugvermietungssystem. Vehicle ist die Oberklasse fuer Car und Truck. Eine RentalAgency verwaltet Fahrzeuge und prueft deren Verfuegbarkeit.',
    requirements: [
      'Klasse Vehicle mit licensePlate (String), brand (String), dailyRate (double), available (boolean)',
      'Klasse Car extends Vehicle mit seats (int)',
      'Klasse Truck extends Vehicle mit loadCapacityKg (double)',
      'Klasse RentalAgency mit ArrayList<Vehicle>, Methoden addVehicle(), rentVehicle(), returnVehicle(), getAvailableVehicles()',
      'rentVehicle() prueft Verfuegbarkeit und gibt Meldung zurueck',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Vehicle
// TODO: Klasse Car extends Vehicle
// TODO: Klasse Truck extends Vehicle
// TODO: Klasse RentalAgency

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Fahrzeugvermietung
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Vehicle {
    private String licensePlate, brand;
    private double dailyRate;
    private boolean available;
    public Vehicle(String licensePlate, String brand, double dailyRate) {
        this.licensePlate = licensePlate; this.brand = brand;
        this.dailyRate = dailyRate; this.available = true;
    }
    public String getLicensePlate() { return licensePlate; }
    public String getBrand() { return brand; }
    public double getDailyRate() { return dailyRate; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean a) { this.available = a; }
    public String toString() { return brand + " (" + licensePlate + ") " + dailyRate + " EUR/Tag"; }
}

class Car extends Vehicle {
    private int seats;
    public Car(String licensePlate, String brand, double dailyRate, int seats) {
        super(licensePlate, brand, dailyRate); this.seats = seats;
    }
    public int getSeats() { return seats; }
    public String toString() { return super.toString() + " [PKW, " + seats + " Sitze]"; }
}

class Truck extends Vehicle {
    private double loadCapacityKg;
    public Truck(String licensePlate, String brand, double dailyRate, double loadCapacityKg) {
        super(licensePlate, brand, dailyRate); this.loadCapacityKg = loadCapacityKg;
    }
    public double getLoadCapacityKg() { return loadCapacityKg; }
    public String toString() { return super.toString() + " [LKW, " + loadCapacityKg + " kg]"; }
}

class RentalAgency {
    private ArrayList<Vehicle> vehicles = new ArrayList<>();
    public void addVehicle(Vehicle v) { vehicles.add(v); }
    public String rentVehicle(String licensePlate) {
        for (Vehicle v : vehicles) {
            if (v.getLicensePlate().equals(licensePlate)) {
                if (!v.isAvailable()) return v.getBrand() + " ist bereits vermietet.";
                v.setAvailable(false);
                return v.getBrand() + " wurde vermietet. Preis: " + v.getDailyRate() + " EUR/Tag";
            }
        }
        return "Fahrzeug nicht gefunden.";
    }
    public String returnVehicle(String licensePlate) {
        for (Vehicle v : vehicles) {
            if (v.getLicensePlate().equals(licensePlate)) {
                if (v.isAvailable()) return v.getBrand() + " ist nicht vermietet.";
                v.setAvailable(true);
                return v.getBrand() + " wurde zurueckgegeben.";
            }
        }
        return "Fahrzeug nicht gefunden.";
    }
    public ArrayList<Vehicle> getAvailableVehicles() {
        ArrayList<Vehicle> result = new ArrayList<>();
        for (Vehicle v : vehicles) if (v.isAvailable()) result.add(v);
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        RentalAgency agency = new RentalAgency();
        agency.addVehicle(new Car("B-AB 123", "VW Golf", 45.0, 5));
        agency.addVehicle(new Car("B-CD 456", "BMW 3er", 75.0, 5));
        agency.addVehicle(new Truck("B-EF 789", "MAN TGX", 120.0, 18000));
        System.out.println("Verfuegbare Fahrzeuge: " + agency.getAvailableVehicles().size());
        System.out.println(agency.rentVehicle("B-AB 123"));
        System.out.println(agency.rentVehicle("B-AB 123"));
        System.out.println("Verfuegbare Fahrzeuge: " + agency.getAvailableVehicles().size());
        System.out.println(agency.returnVehicle("B-AB 123"));
        System.out.println("Verfuegbare Fahrzeuge: " + agency.getAvailableVehicles().size());
    }
}`,
    expectedOutput: `Verfuegbare Fahrzeuge: 3
VW Golf wurde vermietet. Preis: 45.0 EUR/Tag
VW Golf ist bereits vermietet.
Verfuegbare Fahrzeuge: 2
VW Golf wurde zurueckgegeben.
Verfuegbare Fahrzeuge: 3`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-05',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Schulverwaltung',
    description: 'Implementiere ein Schulverwaltungssystem. Person ist die Oberklasse fuer Teacher und Student. Ein Course hat einen Lehrer und eine Teilnehmerliste von Studenten.',
    requirements: [
      'Klasse Person mit name (String) und age (int)',
      'Klasse Teacher extends Person mit subject (String)',
      'Klasse Student extends Person mit studentId (String)',
      'Klasse Course mit name, teacher (Teacher), ArrayList<Student>, Methoden enroll(), unenroll(), getStudentCount()',
      'enroll() prueft ob Student bereits eingeschrieben ist',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Person
// TODO: Klasse Teacher extends Person
// TODO: Klasse Student extends Person
// TODO: Klasse Course

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Schulverwaltung
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Person {
    private String name;
    private int age;
    public Person(String name, int age) { this.name = name; this.age = age; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String toString() { return name + " (" + age + ")"; }
}

class Teacher extends Person {
    private String subject;
    public Teacher(String name, int age, String subject) { super(name, age); this.subject = subject; }
    public String getSubject() { return subject; }
    public String toString() { return "Lehrer: " + super.toString() + " [" + subject + "]"; }
}

class Student extends Person {
    private String studentId;
    public Student(String name, int age, String studentId) { super(name, age); this.studentId = studentId; }
    public String getStudentId() { return studentId; }
    public String toString() { return "Schueler: " + super.toString() + " [" + studentId + "]"; }
}

class Course {
    private String name;
    private Teacher teacher;
    private ArrayList<Student> students = new ArrayList<>();
    public Course(String name, Teacher teacher) { this.name = name; this.teacher = teacher; }
    public String enroll(Student s) {
        for (Student st : students) {
            if (st.getStudentId().equals(s.getStudentId())) return s.getName() + " ist bereits eingeschrieben.";
        }
        students.add(s);
        return s.getName() + " wurde in " + name + " eingeschrieben.";
    }
    public String unenroll(Student s) {
        if (students.remove(s)) return s.getName() + " wurde aus " + name + " abgemeldet.";
        return s.getName() + " ist nicht eingeschrieben.";
    }
    public int getStudentCount() { return students.size(); }
    public String toString() { return name + " (Lehrer: " + teacher.getName() + ", Teilnehmer: " + students.size() + ")"; }
}

public class Main {
    public static void main(String[] args) {
        Teacher t = new Teacher("Herr Mueller", 45, "Mathematik");
        Student s1 = new Student("Anna", 16, "S001");
        Student s2 = new Student("Ben", 17, "S002");
        Course c = new Course("Mathe LK", t);
        System.out.println(c.enroll(s1));
        System.out.println(c.enroll(s2));
        System.out.println(c.enroll(s1));
        System.out.println(c);
        System.out.println(c.unenroll(s1));
        System.out.println(c);
    }
}`,
    expectedOutput: `Anna wurde in Mathe LK eingeschrieben.
Ben wurde in Mathe LK eingeschrieben.
Anna ist bereits eingeschrieben.
Mathe LK (Lehrer: Herr Mueller, Teilnehmer: 2)
Anna wurde aus Mathe LK abgemeldet.
Mathe LK (Lehrer: Herr Mueller, Teilnehmer: 1)`,
    timeEstimate: 25,
  },
  {
    id: 'exam-cd-06',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Bankkonto',
    description: 'Implementiere ein Bankensystem. Account ist eine abstrakte Oberklasse fuer SavingsAccount (mit Zinsen) und CheckingAccount (mit Ueberziehungslimit).',
    requirements: [
      'Abstrakte Klasse Account mit owner (String), balance (double), Methoden deposit(), withdraw() (abstrakt), getBalance()',
      'Klasse SavingsAccount extends Account mit interestRate (double) und Methode applyInterest()',
      'Klasse CheckingAccount extends Account mit overdraftLimit (double)',
      'withdraw() bei SavingsAccount: kein negativer Saldo erlaubt',
      'withdraw() bei CheckingAccount: Abhebung bis zum Ueberziehungslimit erlaubt',
    ],
    starterCode: `// TODO: Abstrakte Klasse Account
// TODO: Klasse SavingsAccount extends Account
// TODO: Klasse CheckingAccount extends Account

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Bankensystem
    }
}`,
    solutionCode: `abstract class Account {
    private String owner;
    protected double balance;
    public Account(String owner, double balance) { this.owner = owner; this.balance = balance; }
    public void deposit(double amount) { if (amount > 0) balance += amount; }
    public abstract String withdraw(double amount);
    public String getOwner() { return owner; }
    public double getBalance() { return balance; }
    public String toString() { return owner + ": " + String.format("%.2f", balance) + " EUR"; }
}

class SavingsAccount extends Account {
    private double interestRate;
    public SavingsAccount(String owner, double balance, double interestRate) {
        super(owner, balance); this.interestRate = interestRate;
    }
    public String withdraw(double amount) {
        if (amount > balance) return "Abhebung abgelehnt. Guthaben reicht nicht aus.";
        balance -= amount;
        return String.format("%.2f", amount) + " EUR abgehoben. Neuer Stand: " + String.format("%.2f", balance) + " EUR";
    }
    public String applyInterest() {
        double interest = balance * interestRate;
        balance += interest;
        return "Zinsen: " + String.format("%.2f", interest) + " EUR. Neuer Stand: " + String.format("%.2f", balance) + " EUR";
    }
}

class CheckingAccount extends Account {
    private double overdraftLimit;
    public CheckingAccount(String owner, double balance, double overdraftLimit) {
        super(owner, balance); this.overdraftLimit = overdraftLimit;
    }
    public String withdraw(double amount) {
        if (balance - amount < -overdraftLimit) return "Abhebung abgelehnt. Ueberziehungslimit erreicht.";
        balance -= amount;
        return String.format("%.2f", amount) + " EUR abgehoben. Neuer Stand: " + String.format("%.2f", balance) + " EUR";
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount savings = new SavingsAccount("Anna", 1000.0, 0.02);
        CheckingAccount checking = new CheckingAccount("Ben", 500.0, 200.0);
        System.out.println("=== Sparkonto ===");
        System.out.println(savings);
        System.out.println(savings.withdraw(300));
        System.out.println(savings.withdraw(800));
        System.out.println(savings.applyInterest());
        System.out.println("=== Girokonto ===");
        System.out.println(checking);
        System.out.println(checking.withdraw(600));
        System.out.println(checking.withdraw(200));
    }
}`,
    expectedOutput: `=== Sparkonto ===
Anna: 1000,00 EUR
300,00 EUR abgehoben. Neuer Stand: 700,00 EUR
Abhebung abgelehnt. Guthaben reicht nicht aus.
Zinsen: 14,00 EUR. Neuer Stand: 714,00 EUR
=== Girokonto ===
Ben: 500,00 EUR
600,00 EUR abgehoben. Neuer Stand: -100,00 EUR
Abhebung abgelehnt. Ueberziehungslimit erreicht.`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-07',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Pizzeria',
    description: 'Implementiere ein Bestellsystem fuer eine Pizzeria. Eine Pizza hat einen Grundpreis und kann mit verschiedenen Toppings belegt werden. Eine Order fasst mehrere Pizzen zusammen und berechnet den Gesamtpreis.',
    requirements: [
      'Klasse Topping mit name (String) und price (double)',
      'Klasse Pizza mit name (String), basePrice (double), ArrayList<Topping> toppings, Methoden addTopping() und getTotalPrice()',
      'Klasse Order mit ArrayList<Pizza>, Methoden addPizza(), getTotalPrice(), printReceipt()',
      'Der Gesamtpreis einer Pizza ist Grundpreis + Summe aller Toppings',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Topping
// TODO: Klasse Pizza
// TODO: Klasse Order

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Pizzeria-Bestellsystem
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Topping {
    private String name;
    private double price;
    public Topping(String name, double price) { this.name = name; this.price = price; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public String toString() { return name + " (+" + String.format("%.2f", price) + " EUR)"; }
}

class Pizza {
    private String name;
    private double basePrice;
    private ArrayList<Topping> toppings = new ArrayList<>();
    public Pizza(String name, double basePrice) { this.name = name; this.basePrice = basePrice; }
    public void addTopping(Topping t) { toppings.add(t); }
    public double getTotalPrice() {
        double total = basePrice;
        for (Topping t : toppings) total += t.getPrice();
        return total;
    }
    public String getName() { return name; }
    public String toString() {
        StringBuilder sb = new StringBuilder(name + " (" + String.format("%.2f", basePrice) + " EUR)");
        for (Topping t : toppings) sb.append("\\n    + ").append(t);
        sb.append("\\n    = ").append(String.format("%.2f", getTotalPrice())).append(" EUR");
        return sb.toString();
    }
}

class Order {
    private ArrayList<Pizza> pizzas = new ArrayList<>();
    public void addPizza(Pizza p) { pizzas.add(p); }
    public double getTotalPrice() {
        double total = 0;
        for (Pizza p : pizzas) total += p.getTotalPrice();
        return total;
    }
    public void printReceipt() {
        System.out.println("=== Bestellung ===");
        int nr = 1;
        for (Pizza p : pizzas) { System.out.println(nr + ". " + p); nr++; }
        System.out.println("------------------");
        System.out.println("Gesamt: " + String.format("%.2f", getTotalPrice()) + " EUR");
    }
}

public class Main {
    public static void main(String[] args) {
        Topping salami = new Topping("Salami", 1.50);
        Topping pilze = new Topping("Pilze", 1.00);
        Topping mozzarella = new Topping("Mozzarella", 1.20);
        Pizza p1 = new Pizza("Margherita", 6.50);
        p1.addTopping(mozzarella);
        Pizza p2 = new Pizza("Diavola", 7.00);
        p2.addTopping(salami);
        p2.addTopping(pilze);
        Order order = new Order();
        order.addPizza(p1);
        order.addPizza(p2);
        order.printReceipt();
    }
}`,
    expectedOutput: `=== Bestellung ===
1. Margherita (6,50 EUR)
    + Mozzarella (+1,20 EUR)
    = 7,70 EUR
2. Diavola (7,00 EUR)
    + Salami (+1,50 EUR)
    + Pilze (+1,00 EUR)
    = 9,50 EUR
------------------
Gesamt: 17,20 EUR`,
    timeEstimate: 25,
  },
  {
    id: 'exam-cd-08',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Flughafen',
    description: 'Implementiere ein Flughafensystem. Ein Airport verwaltet Fluege (Flight). Jeder Flug hat eine Passagierliste. Das Boarding prueft ob ein Passagier auf der Liste steht.',
    requirements: [
      'Klasse Passenger mit name (String) und passportNumber (String)',
      'Klasse Flight mit flightNumber (String), destination (String), maxSeats (int), ArrayList<Passenger> passengers',
      'Klasse Airport mit name (String), ArrayList<Flight> flights',
      'Methoden: Flight.board(Passenger), Flight.getAvailableSeats(), Airport.addFlight(), Airport.findFlight()',
      'board() prueft ob noch Plaetze frei sind und ob Passagier bereits gebucht ist',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Passenger
// TODO: Klasse Flight
// TODO: Klasse Airport

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Flughafensystem
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Passenger {
    private String name, passportNumber;
    public Passenger(String name, String passportNumber) {
        this.name = name; this.passportNumber = passportNumber;
    }
    public String getName() { return name; }
    public String getPassportNumber() { return passportNumber; }
    public String toString() { return name + " [" + passportNumber + "]"; }
}

class Flight {
    private String flightNumber, destination;
    private int maxSeats;
    private ArrayList<Passenger> passengers = new ArrayList<>();
    public Flight(String flightNumber, String destination, int maxSeats) {
        this.flightNumber = flightNumber; this.destination = destination; this.maxSeats = maxSeats;
    }
    public String board(Passenger p) {
        for (Passenger existing : passengers) {
            if (existing.getPassportNumber().equals(p.getPassportNumber()))
                return p.getName() + " ist bereits gebucht auf Flug " + flightNumber + ".";
        }
        if (passengers.size() >= maxSeats)
            return "Flug " + flightNumber + " ist voll. Kein Platz fuer " + p.getName() + ".";
        passengers.add(p);
        return p.getName() + " wurde auf Flug " + flightNumber + " nach " + destination + " gebucht.";
    }
    public int getAvailableSeats() { return maxSeats - passengers.size(); }
    public String getFlightNumber() { return flightNumber; }
    public String toString() { return flightNumber + " -> " + destination + " (" + passengers.size() + "/" + maxSeats + ")"; }
}

class Airport {
    private String name;
    private ArrayList<Flight> flights = new ArrayList<>();
    public Airport(String name) { this.name = name; }
    public void addFlight(Flight f) { flights.add(f); }
    public Flight findFlight(String flightNumber) {
        for (Flight f : flights) if (f.getFlightNumber().equals(flightNumber)) return f;
        return null;
    }
    public void printFlights() {
        System.out.println("=== " + name + " - Abfluege ===");
        for (Flight f : flights) System.out.println("  " + f);
    }
}

public class Main {
    public static void main(String[] args) {
        Airport airport = new Airport("Berlin BER");
        Flight lh100 = new Flight("LH100", "Muenchen", 2);
        Flight ew200 = new Flight("EW200", "London", 3);
        airport.addFlight(lh100);
        airport.addFlight(ew200);
        Passenger p1 = new Passenger("Anna Schmidt", "DE001");
        Passenger p2 = new Passenger("Ben Mueller", "DE002");
        Passenger p3 = new Passenger("Clara Fischer", "DE003");
        System.out.println(lh100.board(p1));
        System.out.println(lh100.board(p2));
        System.out.println(lh100.board(p3));
        System.out.println(lh100.board(p1));
        airport.printFlights();
    }
}`,
    expectedOutput: `Anna Schmidt wurde auf Flug LH100 nach Muenchen gebucht.
Ben Mueller wurde auf Flug LH100 nach Muenchen gebucht.
Flug LH100 ist voll. Kein Platz fuer Clara Fischer.
Anna Schmidt ist bereits gebucht auf Flug LH100.
=== Berlin BER - Abfluege ===
  LH100 -> Muenchen (2/2)
  EW200 -> London (0/3)`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-09',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Musikbibliothek',
    description: 'Implementiere eine Musikbibliothek. Songs gehoeren zu Alben, Alben gehoeren zu Kuenstlern. Eine Playlist kann Songs aus verschiedenen Alben enthalten.',
    requirements: [
      'Klasse Song mit title (String) und durationInSeconds (int)',
      'Klasse Album mit title (String), year (int), ArrayList<Song> songs',
      'Klasse Artist mit name (String), ArrayList<Album> albums',
      'Klasse Playlist mit name (String), ArrayList<Song> songs, Methoden addSong(), getTotalDuration(), printPlaylist()',
      'Album hat Methode getTotalDuration() die Gesamtdauer aller Songs berechnet',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Song
// TODO: Klasse Album
// TODO: Klasse Artist
// TODO: Klasse Playlist

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Musikbibliothek
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Song {
    private String title;
    private int durationInSeconds;
    public Song(String title, int durationInSeconds) {
        this.title = title; this.durationInSeconds = durationInSeconds;
    }
    public String getTitle() { return title; }
    public int getDurationInSeconds() { return durationInSeconds; }
    public String formatDuration() {
        return (durationInSeconds / 60) + ":" + String.format("%02d", durationInSeconds % 60);
    }
    public String toString() { return title + " (" + formatDuration() + ")"; }
}

class Album {
    private String title;
    private int year;
    private ArrayList<Song> songs = new ArrayList<>();
    public Album(String title, int year) { this.title = title; this.year = year; }
    public void addSong(Song s) { songs.add(s); }
    public ArrayList<Song> getSongs() { return songs; }
    public int getTotalDuration() {
        int total = 0;
        for (Song s : songs) total += s.getDurationInSeconds();
        return total;
    }
    public String getTitle() { return title; }
    public String toString() { return title + " (" + year + ") - " + songs.size() + " Songs"; }
}

class Artist {
    private String name;
    private ArrayList<Album> albums = new ArrayList<>();
    public Artist(String name) { this.name = name; }
    public void addAlbum(Album a) { albums.add(a); }
    public String getName() { return name; }
    public ArrayList<Album> getAlbums() { return albums; }
    public String toString() { return name + " - " + albums.size() + " Alben"; }
}

class Playlist {
    private String name;
    private ArrayList<Song> songs = new ArrayList<>();
    public Playlist(String name) { this.name = name; }
    public void addSong(Song s) { songs.add(s); }
    public int getTotalDuration() {
        int total = 0;
        for (Song s : songs) total += s.getDurationInSeconds();
        return total;
    }
    public void printPlaylist() {
        System.out.println("=== Playlist: " + name + " ===");
        int nr = 1;
        for (Song s : songs) { System.out.println(nr + ". " + s); nr++; }
        int totalSec = getTotalDuration();
        System.out.println("Gesamtdauer: " + (totalSec / 60) + ":" + String.format("%02d", totalSec % 60));
    }
}

public class Main {
    public static void main(String[] args) {
        Artist artist = new Artist("Die Band");
        Album album = new Album("Erstes Album", 2023);
        Song s1 = new Song("Lied Eins", 210);
        Song s2 = new Song("Lied Zwei", 185);
        Song s3 = new Song("Lied Drei", 240);
        album.addSong(s1); album.addSong(s2); album.addSong(s3);
        artist.addAlbum(album);
        System.out.println(artist);
        System.out.println(album);
        Playlist playlist = new Playlist("Meine Lieblinge");
        playlist.addSong(s1);
        playlist.addSong(s3);
        playlist.printPlaylist();
    }
}`,
    expectedOutput: `Die Band - 1 Alben
Erstes Album (2023) - 3 Songs
=== Playlist: Meine Lieblinge ===
1. Lied Eins (3:30)
2. Lied Drei (4:00)
Gesamtdauer: 7:30`,
    timeEstimate: 25,
  },
  {
    id: 'exam-cd-10',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Krankenhaus',
    description: 'Implementiere ein Krankenhaus-Verwaltungssystem. Person ist die Oberklasse fuer Doctor und Patient. Appointments verbinden Aerzte mit Patienten.',
    requirements: [
      'Klasse Person mit name (String) und dateOfBirth (String)',
      'Klasse Doctor extends Person mit specialty (String) und licenseNumber (String)',
      'Klasse Patient extends Person mit insuranceNumber (String)',
      'Klasse Appointment mit doctor (Doctor), patient (Patient), date (String), time (String), notes (String)',
      'Klasse Hospital mit ArrayList<Doctor>, ArrayList<Patient>, ArrayList<Appointment> und Methoden zum Verwalten',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Person
// TODO: Klasse Doctor extends Person
// TODO: Klasse Patient extends Person
// TODO: Klasse Appointment
// TODO: Klasse Hospital

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Krankenhaussystem
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Person {
    private String name, dateOfBirth;
    public Person(String name, String dateOfBirth) { this.name = name; this.dateOfBirth = dateOfBirth; }
    public String getName() { return name; }
    public String getDateOfBirth() { return dateOfBirth; }
}

class Doctor extends Person {
    private String specialty, licenseNumber;
    public Doctor(String name, String dob, String specialty, String licenseNumber) {
        super(name, dob); this.specialty = specialty; this.licenseNumber = licenseNumber;
    }
    public String getSpecialty() { return specialty; }
    public String getLicenseNumber() { return licenseNumber; }
    public String toString() { return "Dr. " + getName() + " (" + specialty + ")"; }
}

class Patient extends Person {
    private String insuranceNumber;
    public Patient(String name, String dob, String insuranceNumber) {
        super(name, dob); this.insuranceNumber = insuranceNumber;
    }
    public String getInsuranceNumber() { return insuranceNumber; }
    public String toString() { return getName() + " [" + insuranceNumber + "]"; }
}

class Appointment {
    private Doctor doctor;
    private Patient patient;
    private String date, time, notes;
    public Appointment(Doctor doctor, Patient patient, String date, String time) {
        this.doctor = doctor; this.patient = patient; this.date = date; this.time = time; this.notes = "";
    }
    public void setNotes(String notes) { this.notes = notes; }
    public Doctor getDoctor() { return doctor; }
    public Patient getPatient() { return patient; }
    public String getDate() { return date; }
    public String toString() {
        return date + " " + time + " - " + patient.getName() + " bei " + doctor + (notes.isEmpty() ? "" : " | " + notes);
    }
}

class Hospital {
    private String name;
    private ArrayList<Doctor> doctors = new ArrayList<>();
    private ArrayList<Patient> patients = new ArrayList<>();
    private ArrayList<Appointment> appointments = new ArrayList<>();
    public Hospital(String name) { this.name = name; }
    public void addDoctor(Doctor d) { doctors.add(d); }
    public void addPatient(Patient p) { patients.add(p); }
    public void addAppointment(Appointment a) { appointments.add(a); }
    public ArrayList<Appointment> getAppointmentsForDoctor(Doctor d) {
        ArrayList<Appointment> result = new ArrayList<>();
        for (Appointment a : appointments)
            if (a.getDoctor().getLicenseNumber().equals(d.getLicenseNumber())) result.add(a);
        return result;
    }
    public void printSchedule() {
        System.out.println("=== " + name + " - Terminplan ===");
        for (Appointment a : appointments) System.out.println("  " + a);
    }
}

public class Main {
    public static void main(String[] args) {
        Hospital hospital = new Hospital("Stadtklinik");
        Doctor doc1 = new Doctor("Weber", "1975-03-15", "Kardiologie", "D001");
        Doctor doc2 = new Doctor("Klein", "1980-07-22", "Orthopaedie", "D002");
        Patient pat1 = new Patient("Meier", "1990-01-10", "AOK123");
        Patient pat2 = new Patient("Schulz", "1985-06-20", "TK456");
        hospital.addDoctor(doc1); hospital.addDoctor(doc2);
        hospital.addPatient(pat1); hospital.addPatient(pat2);
        Appointment a1 = new Appointment(doc1, pat1, "2024-03-15", "09:00");
        a1.setNotes("Routineuntersuchung");
        Appointment a2 = new Appointment(doc2, pat2, "2024-03-15", "10:30");
        Appointment a3 = new Appointment(doc1, pat2, "2024-03-16", "14:00");
        hospital.addAppointment(a1); hospital.addAppointment(a2); hospital.addAppointment(a3);
        hospital.printSchedule();
        System.out.println("Termine fuer " + doc1 + ": " + hospital.getAppointmentsForDoctor(doc1).size());
    }
}`,
    expectedOutput: `=== Stadtklinik - Terminplan ===
  2024-03-15 09:00 - Meier bei Dr. Weber (Kardiologie) | Routineuntersuchung
  2024-03-15 10:30 - Schulz bei Dr. Klein (Orthopaedie)
  2024-03-16 14:00 - Schulz bei Dr. Weber (Kardiologie)
Termine fuer Dr. Weber (Kardiologie): 2`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-11',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'E-Commerce',
    description: 'Implementiere ein E-Commerce-System. Kunden koennen Produkte in den Warenkorb legen und Bestellungen aufgeben. Ab einem Bestellwert von 50 EUR gibt es 10% Rabatt.',
    requirements: [
      'Klasse Product mit name (String), price (double), stock (int)',
      'Klasse Customer mit name (String), email (String), ArrayList<Order> orderHistory',
      'Klasse ShoppingCart mit ArrayList<Product> items, Methoden add(), remove(), getSubtotal(), applyDiscount()',
      'Klasse Order mit orderNumber (int), customer (Customer), ArrayList<Product> items, totalPrice (double)',
      'Rabattregel: Ab 50 EUR Warenwert gibt es 10% Rabatt',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Product
// TODO: Klasse Customer
// TODO: Klasse ShoppingCart
// TODO: Klasse Order

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das E-Commerce-System
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Product {
    private String name;
    private double price;
    private int stock;
    public Product(String name, double price, int stock) {
        this.name = name; this.price = price; this.stock = stock;
    }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }
    public void reduceStock(int amount) { stock -= amount; }
    public String toString() { return name + " (" + String.format("%.2f", price) + " EUR)"; }
}

class Order {
    private static int nextNumber = 1;
    private int orderNumber;
    private ArrayList<Product> items;
    private double totalPrice;
    public Order(ArrayList<Product> items, double totalPrice) {
        this.orderNumber = nextNumber++; this.items = new ArrayList<>(items); this.totalPrice = totalPrice;
    }
    public int getOrderNumber() { return orderNumber; }
    public double getTotalPrice() { return totalPrice; }
    public String toString() {
        return "Bestellung #" + orderNumber + " - " + items.size() + " Artikel - " + String.format("%.2f", totalPrice) + " EUR";
    }
}

class ShoppingCart {
    private ArrayList<Product> items = new ArrayList<>();
    public String add(Product p) {
        if (p.getStock() <= 0) return p.getName() + " ist nicht auf Lager.";
        items.add(p);
        return p.getName() + " zum Warenkorb hinzugefuegt.";
    }
    public void remove(Product p) { items.remove(p); }
    public double getSubtotal() {
        double total = 0;
        for (Product p : items) total += p.getPrice();
        return total;
    }
    public double applyDiscount() {
        double subtotal = getSubtotal();
        if (subtotal >= 50) return subtotal * 0.9;
        return subtotal;
    }
    public ArrayList<Product> getItems() { return items; }
    public void clear() { items.clear(); }
    public String toString() {
        double sub = getSubtotal();
        double total = applyDiscount();
        String result = "Warenkorb: " + items.size() + " Artikel, Zwischensumme: " + String.format("%.2f", sub) + " EUR";
        if (sub >= 50) result += " -> mit 10% Rabatt: " + String.format("%.2f", total) + " EUR";
        return result;
    }
}

class Customer {
    private String name, email;
    private ArrayList<Order> orderHistory = new ArrayList<>();
    public Customer(String name, String email) { this.name = name; this.email = email; }
    public Order placeOrder(ShoppingCart cart) {
        Order order = new Order(cart.getItems(), cart.applyDiscount());
        for (Product p : cart.getItems()) p.reduceStock(1);
        orderHistory.add(order);
        cart.clear();
        return order;
    }
    public String getName() { return name; }
    public ArrayList<Order> getOrderHistory() { return orderHistory; }
}

public class Main {
    public static void main(String[] args) {
        Product laptop = new Product("Laptop", 35.00, 5);
        Product maus = new Product("Maus", 12.99, 10);
        Product tastatur = new Product("Tastatur", 19.99, 3);
        Customer kunde = new Customer("Anna", "anna@mail.de");
        ShoppingCart cart = new ShoppingCart();
        System.out.println(cart.add(laptop));
        System.out.println(cart.add(maus));
        System.out.println(cart.add(tastatur));
        System.out.println(cart);
        Order order = kunde.placeOrder(cart);
        System.out.println(order);
        System.out.println("Bestellhistorie: " + kunde.getOrderHistory().size() + " Bestellung(en)");
    }
}`,
    expectedOutput: `Laptop zum Warenkorb hinzugefuegt.
Maus zum Warenkorb hinzugefuegt.
Tastatur zum Warenkorb hinzugefuegt.
Warenkorb: 3 Artikel, Zwischensumme: 67,98 EUR -> mit 10% Rabatt: 61,18 EUR
Bestellung #1 - 3 Artikel - 61,18 EUR
Bestellhistorie: 1 Bestellung(en)`,
    timeEstimate: 35,
  },
  {
    id: 'exam-cd-12',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Fitnessstudio',
    description: 'Implementiere ein Fitnessstudio-Verwaltungssystem. Mitglieder haben eine Mitgliedschaft mit Laufzeit. Trainer leiten Kurse, an denen Mitglieder teilnehmen koennen.',
    requirements: [
      'Klasse Member mit name (String), memberId (String), Membership membership',
      'Klasse Membership mit type (String), startDate (String), durationMonths (int), monthlyFee (double)',
      'Klasse Trainer mit name (String), specialty (String)',
      'Klasse Course mit name (String), trainer (Trainer), maxParticipants (int), ArrayList<Member> participants',
      'Course hat Methoden register(), unregister() und isFull(). Membership hat Methode getTotalCost()',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Membership
// TODO: Klasse Member
// TODO: Klasse Trainer
// TODO: Klasse Course

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Fitnessstudio-System
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Membership {
    private String type, startDate;
    private int durationMonths;
    private double monthlyFee;
    public Membership(String type, String startDate, int durationMonths, double monthlyFee) {
        this.type = type; this.startDate = startDate;
        this.durationMonths = durationMonths; this.monthlyFee = monthlyFee;
    }
    public double getTotalCost() { return durationMonths * monthlyFee; }
    public String getType() { return type; }
    public String toString() {
        return type + " (ab " + startDate + ", " + durationMonths + " Monate, " + String.format("%.2f", monthlyFee) + " EUR/Monat)";
    }
}

class Member {
    private String name, memberId;
    private Membership membership;
    public Member(String name, String memberId, Membership membership) {
        this.name = name; this.memberId = memberId; this.membership = membership;
    }
    public String getName() { return name; }
    public String getMemberId() { return memberId; }
    public Membership getMembership() { return membership; }
    public String toString() { return name + " [" + memberId + "] - " + membership.getType(); }
}

class Trainer {
    private String name, specialty;
    public Trainer(String name, String specialty) { this.name = name; this.specialty = specialty; }
    public String getName() { return name; }
    public String getSpecialty() { return specialty; }
    public String toString() { return name + " (" + specialty + ")"; }
}

class Course {
    private String name;
    private Trainer trainer;
    private int maxParticipants;
    private ArrayList<Member> participants = new ArrayList<>();
    public Course(String name, Trainer trainer, int maxParticipants) {
        this.name = name; this.trainer = trainer; this.maxParticipants = maxParticipants;
    }
    public boolean isFull() { return participants.size() >= maxParticipants; }
    public String register(Member m) {
        for (Member existing : participants)
            if (existing.getMemberId().equals(m.getMemberId())) return m.getName() + " ist bereits angemeldet.";
        if (isFull()) return "Kurs " + name + " ist voll.";
        participants.add(m);
        return m.getName() + " wurde fuer " + name + " angemeldet.";
    }
    public String unregister(Member m) {
        if (participants.remove(m)) return m.getName() + " wurde von " + name + " abgemeldet.";
        return m.getName() + " ist nicht angemeldet.";
    }
    public String toString() {
        return name + " (Trainer: " + trainer.getName() + ", " + participants.size() + "/" + maxParticipants + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Trainer t1 = new Trainer("Max Kraft", "Krafttraining");
        Trainer t2 = new Trainer("Lisa Flex", "Yoga");
        Membership m1 = new Membership("Premium", "2024-01-01", 12, 49.99);
        Membership m2 = new Membership("Basic", "2024-03-01", 6, 29.99);
        Member mem1 = new Member("Anna", "M001", m1);
        Member mem2 = new Member("Ben", "M002", m2);
        System.out.println(mem1 + " - Gesamtkosten: " + String.format("%.2f", m1.getTotalCost()) + " EUR");
        System.out.println(mem2 + " - Gesamtkosten: " + String.format("%.2f", m2.getTotalCost()) + " EUR");
        Course yoga = new Course("Morning Yoga", t2, 2);
        System.out.println(yoga.register(mem1));
        System.out.println(yoga.register(mem2));
        System.out.println(yoga);
    }
}`,
    expectedOutput: `Anna [M001] - Premium - Gesamtkosten: 599,88 EUR
Ben [M002] - Basic - Gesamtkosten: 179,94 EUR
Anna wurde fuer Morning Yoga angemeldet.
Ben wurde fuer Morning Yoga angemeldet.
Morning Yoga (Trainer: Lisa Flex, 2/2)`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-13',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Rezeptbuch',
    description: 'Implementiere ein digitales Rezeptbuch. Rezepte bestehen aus Zutaten mit Mengenangaben und gehoeren zu Kategorien. Eine Mengenumrechnung ermoeglicht die Anpassung fuer verschiedene Portionenzahlen.',
    requirements: [
      'Klasse Ingredient mit name (String), amount (double), unit (String)',
      'Klasse Recipe mit title (String), category (String), servings (int), ArrayList<Ingredient> ingredients',
      'Klasse RecipeBook mit ArrayList<Recipe>, Methoden addRecipe(), findByCategory(), findByIngredient()',
      'Recipe hat Methode scaleToServings(int newServings) die Mengen umrechnet und neue Zutatenliste zurueckgibt',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Ingredient
// TODO: Klasse Recipe
// TODO: Klasse RecipeBook

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Rezeptbuch
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Ingredient {
    private String name, unit;
    private double amount;
    public Ingredient(String name, double amount, String unit) {
        this.name = name; this.amount = amount; this.unit = unit;
    }
    public String getName() { return name; }
    public double getAmount() { return amount; }
    public String getUnit() { return unit; }
    public Ingredient scale(double factor) { return new Ingredient(name, amount * factor, unit); }
    public String toString() { return String.format("%.1f", amount) + " " + unit + " " + name; }
}

class Recipe {
    private String title, category;
    private int servings;
    private ArrayList<Ingredient> ingredients = new ArrayList<>();
    public Recipe(String title, String category, int servings) {
        this.title = title; this.category = category; this.servings = servings;
    }
    public void addIngredient(Ingredient i) { ingredients.add(i); }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public ArrayList<Ingredient> getIngredients() { return ingredients; }
    public ArrayList<Ingredient> scaleToServings(int newServings) {
        double factor = (double) newServings / servings;
        ArrayList<Ingredient> scaled = new ArrayList<>();
        for (Ingredient i : ingredients) scaled.add(i.scale(factor));
        return scaled;
    }
    public boolean hasIngredient(String name) {
        for (Ingredient i : ingredients) if (i.getName().equalsIgnoreCase(name)) return true;
        return false;
    }
    public void print() {
        System.out.println("=== " + title + " (" + category + ", " + servings + " Portionen) ===");
        for (Ingredient i : ingredients) System.out.println("  - " + i);
    }
}

class RecipeBook {
    private ArrayList<Recipe> recipes = new ArrayList<>();
    public void addRecipe(Recipe r) { recipes.add(r); }
    public ArrayList<Recipe> findByCategory(String category) {
        ArrayList<Recipe> result = new ArrayList<>();
        for (Recipe r : recipes) if (r.getCategory().equalsIgnoreCase(category)) result.add(r);
        return result;
    }
    public ArrayList<Recipe> findByIngredient(String ingredientName) {
        ArrayList<Recipe> result = new ArrayList<>();
        for (Recipe r : recipes) if (r.hasIngredient(ingredientName)) result.add(r);
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        Recipe pancakes = new Recipe("Pfannkuchen", "Fruehstueck", 4);
        pancakes.addIngredient(new Ingredient("Mehl", 200, "g"));
        pancakes.addIngredient(new Ingredient("Milch", 300, "ml"));
        pancakes.addIngredient(new Ingredient("Eier", 2, "Stueck"));
        pancakes.print();
        System.out.println("\\nFuer 2 Portionen:");
        for (Ingredient i : pancakes.scaleToServings(2)) System.out.println("  - " + i);
        System.out.println("\\nFuer 8 Portionen:");
        for (Ingredient i : pancakes.scaleToServings(8)) System.out.println("  - " + i);
    }
}`,
    expectedOutput: `=== Pfannkuchen (Fruehstueck, 4 Portionen) ===
  - 200,0 g Mehl
  - 300,0 ml Milch
  - 2,0 Stueck Eier

Fuer 2 Portionen:
  - 100,0 g Mehl
  - 150,0 ml Milch
  - 1,0 Stueck Eier

Fuer 8 Portionen:
  - 400,0 g Mehl
  - 600,0 ml Milch
  - 4,0 Stueck Eier`,
    timeEstimate: 25,
  },
  {
    id: 'exam-cd-14',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Kinoprogramm',
    description: 'Implementiere ein Kinoprogramm-System. Ein Kino hat mehrere Saele. Vorstellungen verbinden Filme mit Saelen und Zeitslots. Tickets koennen mit Sitzplatzwahl gebucht werden.',
    requirements: [
      'Klasse Movie mit title (String), durationMinutes (int), rating (String)',
      'Klasse Cinema mit name (String), ArrayList<Screening> screenings',
      'Klasse Screening mit movie (Movie), hall (int), time (String), boolean[][] seats (Reihen x Plaetze)',
      'Klasse Ticket mit screening (Screening), row (int), seat (int), price (double)',
      'Screening hat Methode bookSeat(int row, int seat) mit Sitzplatzpruefung',
    ],
    starterCode: `import java.util.ArrayList;

// TODO: Klasse Movie
// TODO: Klasse Screening
// TODO: Klasse Ticket
// TODO: Klasse Cinema

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Kinoprogramm
    }
}`,
    solutionCode: `import java.util.ArrayList;

class Movie {
    private String title, rating;
    private int durationMinutes;
    public Movie(String title, int durationMinutes, String rating) {
        this.title = title; this.durationMinutes = durationMinutes; this.rating = rating;
    }
    public String getTitle() { return title; }
    public int getDurationMinutes() { return durationMinutes; }
    public String toString() { return title + " (" + durationMinutes + " min, " + rating + ")"; }
}

class Ticket {
    private int row, seat;
    private double price;
    private String movieTitle;
    public Ticket(String movieTitle, int row, int seat, double price) {
        this.movieTitle = movieTitle; this.row = row; this.seat = seat; this.price = price;
    }
    public String toString() {
        return "Ticket: " + movieTitle + " | Reihe " + (row + 1) + ", Platz " + (seat + 1) + " | " + String.format("%.2f", price) + " EUR";
    }
}

class Screening {
    private Movie movie;
    private int hall;
    private String time;
    private boolean[][] seats;
    private double ticketPrice;
    public Screening(Movie movie, int hall, String time, int rows, int seatsPerRow, double ticketPrice) {
        this.movie = movie; this.hall = hall; this.time = time;
        this.seats = new boolean[rows][seatsPerRow]; this.ticketPrice = ticketPrice;
    }
    public Ticket bookSeat(int row, int seat) {
        if (row < 0 || row >= seats.length || seat < 0 || seat >= seats[0].length) {
            System.out.println("Ungueltiger Sitzplatz."); return null;
        }
        if (seats[row][seat]) {
            System.out.println("Reihe " + (row+1) + ", Platz " + (seat+1) + " ist bereits belegt."); return null;
        }
        seats[row][seat] = true;
        Ticket ticket = new Ticket(movie.getTitle(), row, seat, ticketPrice);
        System.out.println("Buchung erfolgreich: " + ticket);
        return ticket;
    }
    public int getAvailableSeats() {
        int count = 0;
        for (boolean[] row : seats) for (boolean s : row) if (!s) count++;
        return count;
    }
    public Movie getMovie() { return movie; }
    public String toString() { return "Saal " + hall + " | " + time + " | " + movie + " | Frei: " + getAvailableSeats(); }
}

class Cinema {
    private String name;
    private ArrayList<Screening> screenings = new ArrayList<>();
    public Cinema(String name) { this.name = name; }
    public void addScreening(Screening s) { screenings.add(s); }
    public void printProgram() {
        System.out.println("=== " + name + " - Programm ===");
        for (Screening s : screenings) System.out.println("  " + s);
    }
}

public class Main {
    public static void main(String[] args) {
        Movie m1 = new Movie("Matrix", 136, "FSK 16");
        Movie m2 = new Movie("Findet Nemo", 100, "FSK 0");
        Screening s1 = new Screening(m1, 1, "20:00", 3, 4, 12.50);
        Screening s2 = new Screening(m2, 2, "15:00", 3, 4, 9.00);
        Cinema cinema = new Cinema("CineStar");
        cinema.addScreening(s1); cinema.addScreening(s2);
        cinema.printProgram();
        System.out.println();
        s1.bookSeat(0, 1);
        s1.bookSeat(0, 2);
        s1.bookSeat(0, 1);
        System.out.println();
        cinema.printProgram();
    }
}`,
    expectedOutput: `=== CineStar - Programm ===
  Saal 1 | 20:00 | Matrix (136 min, FSK 16) | Frei: 12
  Saal 2 | 15:00 | Findet Nemo (100 min, FSK 0) | Frei: 12

Buchung erfolgreich: Ticket: Matrix | Reihe 1, Platz 2 | 12,50 EUR
Buchung erfolgreich: Ticket: Matrix | Reihe 1, Platz 3 | 12,50 EUR
Reihe 1, Platz 2 ist bereits belegt.

=== CineStar - Programm ===
  Saal 1 | 20:00 | Matrix (136 min, FSK 16) | Frei: 10
  Saal 2 | 15:00 | Findet Nemo (100 min, FSK 0) | Frei: 12`,
    timeEstimate: 30,
  },
  {
    id: 'exam-cd-15',
    category: 'klassendiagramm',
    semester: 'java1',
    title: 'Spielesammlung',
    description: 'Implementiere eine Spielesammlung. Game ist eine abstrakte Oberklasse fuer BoardGame und CardGame. Spieler haben Highscores fuer verschiedene Spiele.',
    requirements: [
      'Abstrakte Klasse Game mit name (String), minPlayers (int), maxPlayers (int), abstrakte Methode getType()',
      'Klasse BoardGame extends Game mit boardSize (String)',
      'Klasse CardGame extends Game mit deckSize (int)',
      'Klasse Player mit name (String) und einer Map<String, Integer> highscores (Spielname -> Punktzahl)',
      'Player hat Methoden updateHighscore(), getHighscore(), getBestGame(). Game hat Methode canPlay(int playerCount)',
    ],
    starterCode: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

// TODO: Abstrakte Klasse Game
// TODO: Klasse BoardGame extends Game
// TODO: Klasse CardGame extends Game
// TODO: Klasse Player

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Spielesammlung
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

abstract class Game {
    private String name;
    private int minPlayers, maxPlayers;
    public Game(String name, int minPlayers, int maxPlayers) {
        this.name = name; this.minPlayers = minPlayers; this.maxPlayers = maxPlayers;
    }
    public abstract String getType();
    public boolean canPlay(int playerCount) { return playerCount >= minPlayers && playerCount <= maxPlayers; }
    public String getName() { return name; }
    public String toString() { return name + " [" + getType() + "] (" + minPlayers + "-" + maxPlayers + " Spieler)"; }
}

class BoardGame extends Game {
    private String boardSize;
    public BoardGame(String name, int minPlayers, int maxPlayers, String boardSize) {
        super(name, minPlayers, maxPlayers); this.boardSize = boardSize;
    }
    public String getType() { return "Brettspiel"; }
    public String getBoardSize() { return boardSize; }
}

class CardGame extends Game {
    private int deckSize;
    public CardGame(String name, int minPlayers, int maxPlayers, int deckSize) {
        super(name, minPlayers, maxPlayers); this.deckSize = deckSize;
    }
    public String getType() { return "Kartenspiel"; }
    public int getDeckSize() { return deckSize; }
}

class Player {
    private String name;
    private Map<String, Integer> highscores = new HashMap<>();
    public Player(String name) { this.name = name; }
    public void updateHighscore(String gameName, int score) {
        if (!highscores.containsKey(gameName) || highscores.get(gameName) < score) {
            highscores.put(gameName, score);
        }
    }
    public int getHighscore(String gameName) {
        return highscores.getOrDefault(gameName, 0);
    }
    public String getBestGame() {
        String best = null; int bestScore = -1;
        for (Map.Entry<String, Integer> entry : highscores.entrySet()) {
            if (entry.getValue() > bestScore) { best = entry.getKey(); bestScore = entry.getValue(); }
        }
        return best != null ? best + " (" + bestScore + " Punkte)" : "Keine Scores vorhanden";
    }
    public String getName() { return name; }
    public void printHighscores() {
        System.out.println("=== Highscores von " + name + " ===");
        for (Map.Entry<String, Integer> e : highscores.entrySet())
            System.out.println("  " + e.getKey() + ": " + e.getValue() + " Punkte");
        System.out.println("  Bestes Spiel: " + getBestGame());
    }
}

public class Main {
    public static void main(String[] args) {
        BoardGame schach = new BoardGame("Schach", 2, 2, "8x8");
        CardGame skat = new CardGame("Skat", 3, 3, 32);
        BoardGame mensch = new BoardGame("Mensch aergere Dich nicht", 2, 4, "Kreuz");
        ArrayList<Game> games = new ArrayList<>();
        games.add(schach); games.add(skat); games.add(mensch);
        System.out.println("Spielesammlung:");
        for (Game g : games) {
            System.out.println("  " + g + " - 3 Spieler: " + (g.canPlay(3) ? "Ja" : "Nein"));
        }
        Player p = new Player("Anna");
        p.updateHighscore("Schach", 1200);
        p.updateHighscore("Skat", 850);
        p.updateHighscore("Schach", 1350);
        p.updateHighscore("Skat", 900);
        System.out.println();
        p.printHighscores();
    }
}`,
    expectedOutput: `Spielesammlung:
  Schach [Brettspiel] (2-2 Spieler) - 3 Spieler: Nein
  Skat [Kartenspiel] (3-3 Spieler) - 3 Spieler: Ja
  Mensch aergere Dich nicht [Brettspiel] (2-4 Spieler) - 3 Spieler: Ja

=== Highscores von Anna ===
  Schach: 1350 Punkte
  Skat: 900 Punkte
  Bestes Spiel: Schach (1350 Punkte)`,
    timeEstimate: 30,
  },

  // ==================== JAVA 2: KLASSENDIAGRAMME (FORTSETZUNG) ====================
  {
    id: 'exam2-cd-02',
    category: 'klassendiagramm',
    semester: 'java2',
    title: 'Notenverwaltung mit Generics',
    description: 'Implementiere eine generische Notenverwaltung. Grade<T> kann verschiedene Notentypen halten (Double fuer Noten, String fuer Bewertungen). Ein GradeBook verwaltet Noten fuer Studenten mit Streams.',
    requirements: [
      'Generische Klasse Grade<T extends Comparable<T>> mit subject (String), value (T), weight (double)',
      'Record Student(String name, String id, List<Grade<Double>> grades)',
      'Klasse GradeBook<T extends Comparable<T>> mit Map<String, List<Grade<T>>> studentGrades',
      'Verwende Streams fuer: Durchschnitt berechnen, beste Note finden, nach Fach filtern',
      'Verwende Optional fuer sichere Rueckgabewerte',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

// TODO: Generische Klasse Grade<T extends Comparable<T>>
// TODO: Record Student
// TODO: Klasse GradeBook<T extends Comparable<T>>

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Notenverwaltung
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

class Grade<T extends Comparable<T>> {
    private String subject;
    private T value;
    private double weight;
    public Grade(String subject, T value, double weight) {
        this.subject = subject; this.value = value; this.weight = weight;
    }
    public String getSubject() { return subject; }
    public T getValue() { return value; }
    public double getWeight() { return weight; }
    public String toString() { return subject + ": " + value + " (Gewicht: " + weight + ")"; }
}

record Student(String name, String id) {}

class GradeBook {
    private Map<String, List<Grade<Double>>> studentGrades = new HashMap<>();

    public void addGrade(String studentId, Grade<Double> grade) {
        studentGrades.computeIfAbsent(studentId, k -> new ArrayList<>()).add(grade);
    }

    public OptionalDouble getAverage(String studentId) {
        List<Grade<Double>> grades = studentGrades.get(studentId);
        if (grades == null || grades.isEmpty()) return OptionalDouble.empty();
        double weightedSum = grades.stream()
            .mapToDouble(g -> g.getValue() * g.getWeight()).sum();
        double totalWeight = grades.stream()
            .mapToDouble(Grade::getWeight).sum();
        return OptionalDouble.of(weightedSum / totalWeight);
    }

    public Optional<Grade<Double>> getBestGrade(String studentId) {
        List<Grade<Double>> grades = studentGrades.get(studentId);
        if (grades == null) return Optional.empty();
        return grades.stream().min(Comparator.comparingDouble(Grade::getValue));
    }

    public List<Grade<Double>> getGradesBySubject(String studentId, String subject) {
        return studentGrades.getOrDefault(studentId, List.of()).stream()
            .filter(g -> g.getSubject().equalsIgnoreCase(subject))
            .toList();
    }

    public Map<String, Double> getAverageBySubject(String studentId) {
        return studentGrades.getOrDefault(studentId, List.of()).stream()
            .collect(Collectors.groupingBy(Grade::getSubject,
                Collectors.averagingDouble(Grade::getValue)));
    }
}

public class Main {
    public static void main(String[] args) {
        GradeBook book = new GradeBook();
        Student anna = new Student("Anna Mueller", "S001");

        book.addGrade(anna.id(), new Grade<>("Mathe", 1.3, 1.0));
        book.addGrade(anna.id(), new Grade<>("Mathe", 2.0, 0.5));
        book.addGrade(anna.id(), new Grade<>("Physik", 1.7, 1.0));
        book.addGrade(anna.id(), new Grade<>("Informatik", 1.0, 1.0));

        System.out.println("Noten von " + anna.name() + ":");
        book.getGradesBySubject(anna.id(), "Mathe")
            .forEach(g -> System.out.println("  " + g));

        book.getAverage(anna.id())
            .ifPresent(avg -> System.out.println("Gewichteter Durchschnitt: " + String.format("%.2f", avg)));

        book.getBestGrade(anna.id())
            .ifPresent(g -> System.out.println("Beste Note: " + g));

        System.out.println("Durchschnitt nach Fach:");
        book.getAverageBySubject(anna.id())
            .forEach((subj, avg) -> System.out.println("  " + subj + ": " + String.format("%.2f", avg)));
    }
}`,
    expectedOutput: `Noten von Anna Mueller:
  Mathe: 1.3 (Gewicht: 1.0)
  Mathe: 2.0 (Gewicht: 0.5)
Gewichteter Durchschnitt: 1.49
Beste Note: Informatik: 1.0 (Gewicht: 1.0)
Durchschnitt nach Fach:
  Informatik: 1,00
  Physik: 1,70
  Mathe: 1,65`,
    timeEstimate: 35,
  },
  {
    id: 'exam2-cd-03',
    category: 'klassendiagramm',
    semester: 'java2',
    title: 'Event-System mit Observer-Pattern',
    description: 'Implementiere ein Event-System basierend auf dem Observer-Pattern. Ein EventBus verwaltet Listener fuer verschiedene Event-Typen. Listener werden generisch typisiert.',
    requirements: [
      'Interface Listener<T> mit Methode onEvent(T event)',
      'Record Event(String type, String message, long timestamp)',
      'Klasse EventBus mit Map<String, List<Listener<?>>> listeners',
      'Methoden: subscribe(), unsubscribe(), publish()',
      'Verwende Generics und Functional Interfaces (Lambda-kompatibel)',
    ],
    starterCode: `import java.util.*;

// TODO: Interface Listener<T>
// TODO: Record Event
// TODO: Klasse EventBus

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Event-System
    }
}`,
    solutionCode: `import java.util.*;

@FunctionalInterface
interface Listener<T> {
    void onEvent(T event);
}

record Event(String type, String message, long timestamp) {
    public Event(String type, String message) {
        this(type, message, System.currentTimeMillis());
    }
    public String toString() { return "[" + type + "] " + message; }
}

class EventBus {
    private final Map<String, List<Listener<Event>>> listeners = new HashMap<>();

    public void subscribe(String eventType, Listener<Event> listener) {
        listeners.computeIfAbsent(eventType, k -> new ArrayList<>()).add(listener);
    }

    public void unsubscribe(String eventType, Listener<Event> listener) {
        List<Listener<Event>> list = listeners.get(eventType);
        if (list != null) list.remove(listener);
    }

    public void publish(Event event) {
        List<Listener<Event>> list = listeners.getOrDefault(event.type(), List.of());
        list.forEach(l -> l.onEvent(event));
        // Auch an Wildcard-Listener senden
        listeners.getOrDefault("*", List.of()).forEach(l -> l.onEvent(event));
    }

    public int getListenerCount(String eventType) {
        return listeners.getOrDefault(eventType, List.of()).size();
    }
}

class Logger {
    private final List<String> log = new ArrayList<>();
    public Listener<Event> getListener() {
        return event -> {
            String entry = "LOG: " + event;
            log.add(entry);
            System.out.println(entry);
        };
    }
    public List<String> getLog() { return Collections.unmodifiableList(log); }
}

public class Main {
    public static void main(String[] args) {
        EventBus bus = new EventBus();
        Logger logger = new Logger();

        // Logger hoert auf alle Events
        bus.subscribe("*", logger.getListener());

        // Spezifische Listener mit Lambdas
        bus.subscribe("USER_LOGIN", event -> System.out.println("Willkommen! " + event.message()));
        bus.subscribe("ERROR", event -> System.out.println("ALARM: " + event.message()));

        System.out.println("Listener fuer USER_LOGIN: " + bus.getListenerCount("USER_LOGIN"));
        System.out.println("Listener fuer ERROR: " + bus.getListenerCount("ERROR"));
        System.out.println();

        bus.publish(new Event("USER_LOGIN", "Benutzer Anna hat sich angemeldet"));
        System.out.println();
        bus.publish(new Event("ERROR", "Datenbankverbindung fehlgeschlagen"));
        System.out.println();
        bus.publish(new Event("INFO", "System gestartet"));

        System.out.println("\\nLog-Eintraege: " + logger.getLog().size());
    }
}`,
    expectedOutput: `Listener fuer USER_LOGIN: 1
Listener fuer ERROR: 1

LOG: [USER_LOGIN] Benutzer Anna hat sich angemeldet
Willkommen! Benutzer Anna hat sich angemeldet

LOG: [ERROR] Datenbankverbindung fehlgeschlagen
ALARM: Datenbankverbindung fehlgeschlagen

LOG: [INFO] System gestartet

Log-Eintraege: 3`,
    timeEstimate: 30,
  },
  {
    id: 'exam2-cd-04',
    category: 'klassendiagramm',
    semester: 'java2',
    title: 'Plugin-System mit Interface und Generics',
    description: 'Implementiere ein Plugin-System. Plugins haben eine generische Konfiguration. Ein PluginManager laedt, konfiguriert und verwaltet Plugins ueber ein gemeinsames Interface.',
    requirements: [
      'Interface Plugin<C> mit Methoden getName(), initialize(C config), execute(), isEnabled()',
      'Record PluginInfo(String name, String version, String author)',
      'Klasse PluginManager mit Map<String, Plugin<?>> plugins und Methoden register(), unregister(), executeAll()',
      'Mindestens zwei konkrete Plugin-Implementierungen mit verschiedenen Config-Typen',
      'Verwende Generics und Optional fuer sichere Plugin-Abfragen',
    ],
    starterCode: `import java.util.*;

// TODO: Interface Plugin<C>
// TODO: Record PluginInfo
// TODO: Klasse PluginManager
// TODO: Konkrete Plugin-Implementierungen

public class Main {
    public static void main(String[] args) {
        // TODO: Teste das Plugin-System
    }
}`,
    solutionCode: `import java.util.*;

interface Plugin<C> {
    String getName();
    void initialize(C config);
    String execute();
    boolean isEnabled();
}

record PluginInfo(String name, String version, String author) {}

record LogConfig(String level, String outputFile) {}
record CacheConfig(int maxSize, int ttlSeconds) {}

class LogPlugin implements Plugin<LogConfig> {
    private PluginInfo info = new PluginInfo("LogPlugin", "1.0", "Dev Team");
    private LogConfig config;
    private boolean enabled = false;
    public String getName() { return info.name(); }
    public void initialize(LogConfig config) { this.config = config; this.enabled = true; }
    public String execute() {
        if (!enabled) return getName() + " ist nicht initialisiert.";
        return getName() + " loggt mit Level '" + config.level() + "' in '" + config.outputFile() + "'";
    }
    public boolean isEnabled() { return enabled; }
    public PluginInfo getInfo() { return info; }
}

class CachePlugin implements Plugin<CacheConfig> {
    private PluginInfo info = new PluginInfo("CachePlugin", "2.1", "Cache Corp");
    private CacheConfig config;
    private boolean enabled = false;
    public String getName() { return info.name(); }
    public void initialize(CacheConfig config) { this.config = config; this.enabled = true; }
    public String execute() {
        if (!enabled) return getName() + " ist nicht initialisiert.";
        return getName() + " Cache mit max " + config.maxSize() + " Eintraegen, TTL " + config.ttlSeconds() + "s";
    }
    public boolean isEnabled() { return enabled; }
    public PluginInfo getInfo() { return info; }
}

class PluginManager {
    private final Map<String, Plugin<?>> plugins = new LinkedHashMap<>();

    public void register(Plugin<?> plugin) {
        plugins.put(plugin.getName(), plugin);
        System.out.println("Plugin registriert: " + plugin.getName());
    }

    public void unregister(String name) {
        if (plugins.remove(name) != null) System.out.println("Plugin entfernt: " + name);
        else System.out.println("Plugin nicht gefunden: " + name);
    }

    public Optional<Plugin<?>> getPlugin(String name) {
        return Optional.ofNullable(plugins.get(name));
    }

    public void executeAll() {
        System.out.println("=== Alle Plugins ausfuehren ===");
        plugins.values().stream()
            .filter(Plugin::isEnabled)
            .forEach(p -> System.out.println("  " + p.execute()));
        long disabled = plugins.values().stream().filter(p -> !p.isEnabled()).count();
        if (disabled > 0) System.out.println("  (" + disabled + " Plugin(s) deaktiviert)");
    }

    public long getEnabledCount() { return plugins.values().stream().filter(Plugin::isEnabled).count(); }
}

public class Main {
    public static void main(String[] args) {
        PluginManager manager = new PluginManager();
        LogPlugin logPlugin = new LogPlugin();
        CachePlugin cachePlugin = new CachePlugin();

        manager.register(logPlugin);
        manager.register(cachePlugin);

        logPlugin.initialize(new LogConfig("DEBUG", "app.log"));
        cachePlugin.initialize(new CacheConfig(1000, 300));

        manager.executeAll();

        System.out.println("\\nAktive Plugins: " + manager.getEnabledCount());

        manager.getPlugin("LogPlugin")
            .ifPresent(p -> System.out.println("Gefunden: " + p.getName() + " (aktiv: " + p.isEnabled() + ")"));

        manager.getPlugin("UnknownPlugin")
            .ifPresentOrElse(
                p -> System.out.println("Gefunden: " + p.getName()),
                () -> System.out.println("UnknownPlugin nicht gefunden.")
            );
    }
}`,
    expectedOutput: `Plugin registriert: LogPlugin
Plugin registriert: CachePlugin
=== Alle Plugins ausfuehren ===
  LogPlugin loggt mit Level 'DEBUG' in 'app.log'
  CachePlugin Cache mit max 1000 Eintraegen, TTL 300s

Aktive Plugins: 2
Gefunden: LogPlugin (aktiv: true)
UnknownPlugin nicht gefunden.`,
    timeEstimate: 35,
  },
  {
    id: 'exam2-cd-05',
    category: 'klassendiagramm',
    semester: 'java2',
    title: 'Datenpipeline mit Streams',
    description: 'Implementiere eine Datenpipeline. Daten fliessen von einer DataSource durch Filter und Transformer zu einem Ergebnis. Die Pipeline nutzt Streams, Function und Predicate.',
    requirements: [
      'Interface DataSource<T> mit Methode getData() die Stream<T> zurueckgibt',
      'Klasse Filter<T> mit Predicate<T> und Methode apply(Stream<T>)',
      'Klasse Transformer<T, R> mit Function<T, R> und Methode apply(Stream<T>)',
      'Klasse Pipeline<T> die Filter und Transformer verkettet und ausfuehrt',
      'Verwende Streams, Function, Predicate, Collector',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

// TODO: Interface DataSource<T>
// TODO: Klasse Filter<T>
// TODO: Klasse Transformer<T, R>
// TODO: Klasse Pipeline<T>

public class Main {
    public static void main(String[] args) {
        // TODO: Teste die Datenpipeline
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;
import java.util.function.*;

interface DataSource<T> {
    Stream<T> getData();
}

class ListDataSource<T> implements DataSource<T> {
    private final List<T> data;
    public ListDataSource(List<T> data) { this.data = data; }
    public Stream<T> getData() { return data.stream(); }
}

class Filter<T> {
    private final String name;
    private final Predicate<T> predicate;
    public Filter(String name, Predicate<T> predicate) { this.name = name; this.predicate = predicate; }
    public Stream<T> apply(Stream<T> stream) { return stream.filter(predicate); }
    public String getName() { return name; }
}

class Transformer<T, R> {
    private final String name;
    private final Function<T, R> function;
    public Transformer(String name, Function<T, R> function) { this.name = name; this.function = function; }
    public Stream<R> apply(Stream<T> stream) { return stream.map(function); }
    public String getName() { return name; }
}

class Pipeline<T> {
    private final DataSource<T> source;
    private final List<Filter<T>> filters = new ArrayList<>();
    private final List<String> log = new ArrayList<>();

    public Pipeline(DataSource<T> source) { this.source = source; }

    public Pipeline<T> addFilter(Filter<T> filter) {
        filters.add(filter);
        log.add("Filter hinzugefuegt: " + filter.getName());
        return this;
    }

    public List<T> execute() {
        log.add("Pipeline gestartet");
        Stream<T> stream = source.getData();
        for (Filter<T> f : filters) { stream = f.apply(stream); }
        List<T> result = stream.toList();
        log.add("Pipeline abgeschlossen. Ergebnis: " + result.size() + " Elemente");
        return result;
    }

    public <R> List<R> executeWithTransform(Transformer<T, R> transformer) {
        log.add("Pipeline mit Transformation gestartet");
        Stream<T> stream = source.getData();
        for (Filter<T> f : filters) { stream = f.apply(stream); }
        List<R> result = transformer.apply(stream).toList();
        log.add("Pipeline abgeschlossen. Ergebnis: " + result.size() + " Elemente");
        return result;
    }

    public void printLog() {
        System.out.println("=== Pipeline-Log ===");
        log.forEach(entry -> System.out.println("  " + entry));
    }
}

record Product(String name, double price, String category) {}

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
            new Product("Laptop", 999.99, "Elektronik"),
            new Product("Maus", 29.99, "Elektronik"),
            new Product("Buch", 15.99, "Medien"),
            new Product("Monitor", 349.99, "Elektronik"),
            new Product("Stift", 2.99, "Buero"),
            new Product("Tastatur", 79.99, "Elektronik")
        );

        DataSource<Product> source = new ListDataSource<>(products);
        Pipeline<Product> pipeline = new Pipeline<>(source);

        Filter<Product> elektronik = new Filter<>("Nur Elektronik", p -> p.category().equals("Elektronik"));
        Filter<Product> teuer = new Filter<>("Preis > 50 EUR", p -> p.price() > 50);
        Transformer<Product, String> toName = new Transformer<>("Name extrahieren", Product::name);

        pipeline.addFilter(elektronik).addFilter(teuer);

        List<String> result = pipeline.executeWithTransform(toName);
        System.out.println("Teure Elektronik-Produkte: " + result);

        pipeline.printLog();

        // Statistik mit Streams
        System.out.println("\\nStatistik aller Produkte:");
        DoubleSummaryStatistics stats = products.stream()
            .mapToDouble(Product::price).summaryStatistics();
        System.out.println("  Anzahl: " + stats.getCount());
        System.out.println("  Min: " + String.format("%.2f", stats.getMin()) + " EUR");
        System.out.println("  Max: " + String.format("%.2f", stats.getMax()) + " EUR");
        System.out.println("  Durchschnitt: " + String.format("%.2f", stats.getAverage()) + " EUR");
    }
}`,
    expectedOutput: `Teure Elektronik-Produkte: [Laptop, Monitor, Tastatur]
=== Pipeline-Log ===
  Filter hinzugefuegt: Nur Elektronik
  Filter hinzugefuegt: Preis > 50 EUR
  Pipeline mit Transformation gestartet
  Pipeline abgeschlossen. Ergebnis: 3 Elemente

Statistik aller Produkte:
  Anzahl: 6
  Min: 2,99 EUR
  Max: 999,99 EUR
  Durchschnitt: 246,49 EUR`,
    timeEstimate: 35,
  },

  // ==================== JAVA 2: STREAM-ABFRAGEN (FORTSETZUNG) ====================
  {
    id: 'exam2-query-02',
    category: 'abfragen',
    semester: 'java2',
    title: 'Mitarbeiter-Statistiken',
    description: 'Gegeben ist eine Liste von Mitarbeitern mit Name, Abteilung und Gehalt. Beantworte verschiedene statistische Abfragen mit der Stream API: Gruppierung, Durchschnitt, Partitionierung.',
    requirements: [
      'Record Employee(String name, String department, double salary, int yearsOfService)',
      'Gruppiere Mitarbeiter nach Abteilung (groupingBy)',
      'Berechne das Durchschnittsgehalt pro Abteilung (averagingDouble)',
      'Partitioniere Mitarbeiter nach Gehalt ueber/unter 60000 (partitioningBy)',
      'Finde den bestbezahlten Mitarbeiter pro Abteilung',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

record Employee(String name, String department, double salary, int yearsOfService) {}

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Anna", "IT", 72000, 5),
            new Employee("Ben", "IT", 65000, 3),
            new Employee("Clara", "HR", 55000, 7),
            new Employee("David", "HR", 58000, 4),
            new Employee("Eva", "IT", 80000, 8),
            new Employee("Frank", "Sales", 48000, 2),
            new Employee("Gina", "Sales", 52000, 5),
            new Employee("Hans", "HR", 62000, 10)
        );

        // TODO: Gruppierung nach Abteilung
        // TODO: Durchschnittsgehalt pro Abteilung
        // TODO: Partitionierung nach Gehalt >= 60000
        // TODO: Bestbezahlter Mitarbeiter pro Abteilung
        // TODO: Gesamtgehalt pro Abteilung
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

record Employee(String name, String department, double salary, int yearsOfService) {}

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = List.of(
            new Employee("Anna", "IT", 72000, 5),
            new Employee("Ben", "IT", 65000, 3),
            new Employee("Clara", "HR", 55000, 7),
            new Employee("David", "HR", 58000, 4),
            new Employee("Eva", "IT", 80000, 8),
            new Employee("Frank", "Sales", 48000, 2),
            new Employee("Gina", "Sales", 52000, 5),
            new Employee("Hans", "HR", 62000, 10)
        );

        System.out.println("=== Mitarbeiter nach Abteilung ===");
        employees.stream()
            .collect(Collectors.groupingBy(Employee::department))
            .forEach((dept, emps) -> System.out.println(dept + ": "
                + emps.stream().map(Employee::name).collect(Collectors.joining(", "))));

        System.out.println("\\n=== Durchschnittsgehalt pro Abteilung ===");
        employees.stream()
            .collect(Collectors.groupingBy(Employee::department,
                Collectors.averagingDouble(Employee::salary)))
            .forEach((dept, avg) -> System.out.println(dept + ": " + String.format("%.2f", avg) + " EUR"));

        System.out.println("\\n=== Partitionierung (Gehalt >= 60000) ===");
        Map<Boolean, List<Employee>> partitioned = employees.stream()
            .collect(Collectors.partitioningBy(e -> e.salary() >= 60000));
        System.out.println("Ueber 60000: " + partitioned.get(true).stream()
            .map(Employee::name).collect(Collectors.joining(", ")));
        System.out.println("Unter 60000: " + partitioned.get(false).stream()
            .map(Employee::name).collect(Collectors.joining(", ")));

        System.out.println("\\n=== Bestbezahlter pro Abteilung ===");
        employees.stream()
            .collect(Collectors.groupingBy(Employee::department,
                Collectors.maxBy(Comparator.comparingDouble(Employee::salary))))
            .forEach((dept, emp) -> emp.ifPresent(e ->
                System.out.println(dept + ": " + e.name() + " (" + String.format("%.0f", e.salary()) + " EUR)")));

        System.out.println("\\n=== Gesamtgehalt pro Abteilung ===");
        employees.stream()
            .collect(Collectors.groupingBy(Employee::department,
                Collectors.summingDouble(Employee::salary)))
            .forEach((dept, total) -> System.out.println(dept + ": " + String.format("%.0f", total) + " EUR"));
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam2-query-03',
    category: 'abfragen',
    semester: 'java2',
    title: 'Online-Shop Analyse',
    description: 'Analysiere Bestelldaten eines Online-Shops. Bestellungen enthalten mehrere Artikel. Verwende flatMap, reducing und toMap fuer komplexe Auswertungen.',
    requirements: [
      'Record Item(String name, double price, int quantity)',
      'Record Order(int orderId, String customer, List<Item> items, String date)',
      'Verwende flatMap um alle Artikel aus allen Bestellungen zu extrahieren',
      'Berechne Umsatz pro Kunde (reducing/toMap)',
      'Finde die meistbestellten Artikel (groupingBy + summingInt)',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

record Item(String name, double price, int quantity) {
    double total() { return price * quantity; }
}

record Order(int orderId, String customer, List<Item> items, String date) {
    double total() { return items.stream().mapToDouble(Item::total).sum(); }
}

public class Main {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order(1, "Anna", List.of(
                new Item("Laptop", 999.99, 1), new Item("Maus", 29.99, 2)), "2024-01-15"),
            new Order(2, "Ben", List.of(
                new Item("Monitor", 349.99, 1), new Item("Tastatur", 79.99, 1)), "2024-01-16"),
            new Order(3, "Anna", List.of(
                new Item("Tastatur", 79.99, 1), new Item("USB-Kabel", 9.99, 3)), "2024-01-17"),
            new Order(4, "Clara", List.of(
                new Item("Laptop", 999.99, 1)), "2024-01-18"),
            new Order(5, "Ben", List.of(
                new Item("Maus", 29.99, 1), new Item("Mauspad", 14.99, 1)), "2024-01-19")
        );

        // TODO: Alle Artikel (flatMap)
        // TODO: Umsatz pro Kunde
        // TODO: Meistbestellte Artikel (nach Menge)
        // TODO: Teuerste Bestellung
        // TODO: Artikel-Umsatz-Ranking
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

record Item(String name, double price, int quantity) {
    double total() { return price * quantity; }
}

record Order(int orderId, String customer, List<Item> items, String date) {
    double total() { return items.stream().mapToDouble(Item::total).sum(); }
}

public class Main {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order(1, "Anna", List.of(
                new Item("Laptop", 999.99, 1), new Item("Maus", 29.99, 2)), "2024-01-15"),
            new Order(2, "Ben", List.of(
                new Item("Monitor", 349.99, 1), new Item("Tastatur", 79.99, 1)), "2024-01-16"),
            new Order(3, "Anna", List.of(
                new Item("Tastatur", 79.99, 1), new Item("USB-Kabel", 9.99, 3)), "2024-01-17"),
            new Order(4, "Clara", List.of(
                new Item("Laptop", 999.99, 1)), "2024-01-18"),
            new Order(5, "Ben", List.of(
                new Item("Maus", 29.99, 1), new Item("Mauspad", 14.99, 1)), "2024-01-19")
        );

        System.out.println("=== Alle Artikel (flatMap) ===");
        orders.stream()
            .flatMap(o -> o.items().stream())
            .map(i -> i.name() + " x" + i.quantity())
            .forEach(s -> System.out.println("  " + s));

        System.out.println("\\n=== Umsatz pro Kunde ===");
        orders.stream()
            .collect(Collectors.groupingBy(Order::customer,
                Collectors.summingDouble(Order::total)))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + String.format("%.2f", e.getValue()) + " EUR"));

        System.out.println("\\n=== Meistbestellte Artikel (Menge) ===");
        orders.stream()
            .flatMap(o -> o.items().stream())
            .collect(Collectors.groupingBy(Item::name, Collectors.summingInt(Item::quantity)))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue() + " Stueck"));

        System.out.println("\\n=== Teuerste Bestellung ===");
        orders.stream()
            .max(Comparator.comparingDouble(Order::total))
            .ifPresent(o -> System.out.println("  Bestellung #" + o.orderId() + " von " + o.customer()
                + ": " + String.format("%.2f", o.total()) + " EUR"));

        System.out.println("\\n=== Artikel-Umsatz-Ranking ===");
        orders.stream()
            .flatMap(o -> o.items().stream())
            .collect(Collectors.groupingBy(Item::name, Collectors.summingDouble(Item::total)))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + String.format("%.2f", e.getValue()) + " EUR"));
    }
}`,
    timeEstimate: 30,
  },
  {
    id: 'exam2-query-04',
    category: 'abfragen',
    semester: 'java2',
    title: 'Log-File Analyse',
    description: 'Analysiere Log-Eintraege einer Anwendung. Filtere nach Log-Level, zaehle Vorkommnisse, und analysiere Zeitraeume. Nutze Stream API mit groupingBy, counting und filtering.',
    requirements: [
      'Record LogEntry(String timestamp, String level, String source, String message)',
      'Filtere Log-Eintraege nach Level (ERROR, WARN, INFO, DEBUG)',
      'Zaehle Eintraege pro Level (groupingBy + counting)',
      'Gruppiere Fehler nach Quelle (source)',
      'Finde den Zeitraum mit den meisten Fehlern',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

record LogEntry(String timestamp, String level, String source, String message) {}

public class Main {
    public static void main(String[] args) {
        List<LogEntry> logs = List.of(
            new LogEntry("2024-01-15 08:00:01", "INFO", "AuthService", "Server gestartet"),
            new LogEntry("2024-01-15 08:05:12", "INFO", "AuthService", "Benutzer angemeldet"),
            new LogEntry("2024-01-15 08:10:33", "WARN", "DBService", "Verbindung langsam"),
            new LogEntry("2024-01-15 08:15:45", "ERROR", "DBService", "Verbindung fehlgeschlagen"),
            new LogEntry("2024-01-15 08:16:02", "ERROR", "DBService", "Retry fehlgeschlagen"),
            new LogEntry("2024-01-15 08:20:11", "INFO", "AuthService", "Benutzer abgemeldet"),
            new LogEntry("2024-01-15 09:00:05", "ERROR", "APIService", "Timeout bei Anfrage"),
            new LogEntry("2024-01-15 09:05:22", "WARN", "APIService", "Hohe Latenz"),
            new LogEntry("2024-01-15 09:10:33", "ERROR", "DBService", "Deadlock erkannt"),
            new LogEntry("2024-01-15 09:15:44", "INFO", "DBService", "Verbindung wiederhergestellt"),
            new LogEntry("2024-01-15 09:20:55", "DEBUG", "AuthService", "Token erneuert"),
            new LogEntry("2024-01-15 09:30:06", "WARN", "APIService", "Rate Limit erreicht")
        );

        // TODO: Anzahl pro Level
        // TODO: Nur ERROR-Eintraege
        // TODO: Fehler gruppiert nach Quelle
        // TODO: Stunde mit den meisten Fehlern
        // TODO: Zusammenfassung
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

record LogEntry(String timestamp, String level, String source, String message) {
    String getHour() { return timestamp.substring(11, 13); }
}

public class Main {
    public static void main(String[] args) {
        List<LogEntry> logs = List.of(
            new LogEntry("2024-01-15 08:00:01", "INFO", "AuthService", "Server gestartet"),
            new LogEntry("2024-01-15 08:05:12", "INFO", "AuthService", "Benutzer angemeldet"),
            new LogEntry("2024-01-15 08:10:33", "WARN", "DBService", "Verbindung langsam"),
            new LogEntry("2024-01-15 08:15:45", "ERROR", "DBService", "Verbindung fehlgeschlagen"),
            new LogEntry("2024-01-15 08:16:02", "ERROR", "DBService", "Retry fehlgeschlagen"),
            new LogEntry("2024-01-15 08:20:11", "INFO", "AuthService", "Benutzer abgemeldet"),
            new LogEntry("2024-01-15 09:00:05", "ERROR", "APIService", "Timeout bei Anfrage"),
            new LogEntry("2024-01-15 09:05:22", "WARN", "APIService", "Hohe Latenz"),
            new LogEntry("2024-01-15 09:10:33", "ERROR", "DBService", "Deadlock erkannt"),
            new LogEntry("2024-01-15 09:15:44", "INFO", "DBService", "Verbindung wiederhergestellt"),
            new LogEntry("2024-01-15 09:20:55", "DEBUG", "AuthService", "Token erneuert"),
            new LogEntry("2024-01-15 09:30:06", "WARN", "APIService", "Rate Limit erreicht")
        );

        System.out.println("=== Anzahl pro Level ===");
        logs.stream()
            .collect(Collectors.groupingBy(LogEntry::level, Collectors.counting()))
            .entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));

        System.out.println("\\n=== ERROR-Eintraege ===");
        logs.stream()
            .filter(l -> l.level().equals("ERROR"))
            .forEach(l -> System.out.println("  [" + l.timestamp() + "] " + l.source() + ": " + l.message()));

        System.out.println("\\n=== Fehler nach Quelle ===");
        logs.stream()
            .filter(l -> l.level().equals("ERROR"))
            .collect(Collectors.groupingBy(LogEntry::source, Collectors.counting()))
            .forEach((src, cnt) -> System.out.println("  " + src + ": " + cnt + " Fehler"));

        System.out.println("\\n=== Stunde mit den meisten Fehlern ===");
        logs.stream()
            .filter(l -> l.level().equals("ERROR"))
            .collect(Collectors.groupingBy(LogEntry::getHour, Collectors.counting()))
            .entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .ifPresent(e -> System.out.println("  " + e.getKey() + ":00 Uhr: " + e.getValue() + " Fehler"));

        System.out.println("\\n=== Zusammenfassung ===");
        System.out.println("  Gesamt: " + logs.size() + " Eintraege");
        long errors = logs.stream().filter(l -> l.level().equals("ERROR")).count();
        long warnings = logs.stream().filter(l -> l.level().equals("WARN")).count();
        System.out.println("  Fehler: " + errors + ", Warnungen: " + warnings);
        long sources = logs.stream().map(LogEntry::source).distinct().count();
        System.out.println("  Quellen: " + sources);
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam2-query-05',
    category: 'abfragen',
    semester: 'java2',
    title: 'Studentenauswertung',
    description: 'Analysiere Studentendaten mit Noten-Listen. Verwende flatMapToDouble fuer Notenauswertungen, summarizingDouble fuer Statistiken und komplexe Stream-Operationen.',
    requirements: [
      'Record Student(String name, String major, int semester, List<Double> grades)',
      'Berechne den Notendurchschnitt pro Student (flatMapToDouble)',
      'Erstelle eine Statistik ueber alle Noten (summarizingDouble)',
      'Finde Studenten mit einem Durchschnitt besser als 2.0',
      'Gruppiere Studenten nach Studiengang und berechne den Durchschnitt pro Studiengang',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

record Student(String name, String major, int semester, List<Double> grades) {
    double average() { return grades.stream().mapToDouble(Double::doubleValue).average().orElse(0.0); }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Anna", "Informatik", 3, List.of(1.3, 2.0, 1.7, 1.0)),
            new Student("Ben", "Informatik", 5, List.of(2.3, 2.7, 3.0, 2.0)),
            new Student("Clara", "Mathematik", 2, List.of(1.0, 1.3, 1.7)),
            new Student("David", "Informatik", 4, List.of(1.7, 2.0, 1.3, 2.3)),
            new Student("Eva", "Mathematik", 6, List.of(1.3, 1.0, 1.7, 1.0, 1.3)),
            new Student("Frank", "Physik", 3, List.of(2.7, 3.0, 2.3, 3.3)),
            new Student("Gina", "Physik", 1, List.of(1.7, 2.0))
        );

        // TODO: Notendurchschnitt pro Student
        // TODO: Gesamtstatistik aller Noten
        // TODO: Studenten mit Durchschnitt besser als 2.0
        // TODO: Durchschnitt pro Studiengang
        // TODO: Bester Student pro Studiengang
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

record Student(String name, String major, int semester, List<Double> grades) {
    double average() { return grades.stream().mapToDouble(Double::doubleValue).average().orElse(0.0); }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Anna", "Informatik", 3, List.of(1.3, 2.0, 1.7, 1.0)),
            new Student("Ben", "Informatik", 5, List.of(2.3, 2.7, 3.0, 2.0)),
            new Student("Clara", "Mathematik", 2, List.of(1.0, 1.3, 1.7)),
            new Student("David", "Informatik", 4, List.of(1.7, 2.0, 1.3, 2.3)),
            new Student("Eva", "Mathematik", 6, List.of(1.3, 1.0, 1.7, 1.0, 1.3)),
            new Student("Frank", "Physik", 3, List.of(2.7, 3.0, 2.3, 3.3)),
            new Student("Gina", "Physik", 1, List.of(1.7, 2.0))
        );

        System.out.println("=== Notendurchschnitt pro Student ===");
        students.stream()
            .sorted(Comparator.comparingDouble(Student::average))
            .forEach(s -> System.out.println("  " + s.name() + " (" + s.major() + "): "
                + String.format("%.2f", s.average())));

        System.out.println("\\n=== Gesamtstatistik aller Noten ===");
        DoubleSummaryStatistics stats = students.stream()
            .flatMapToDouble(s -> s.grades().stream().mapToDouble(Double::doubleValue))
            .summaryStatistics();
        System.out.println("  Anzahl Noten: " + stats.getCount());
        System.out.println("  Beste Note: " + String.format("%.1f", stats.getMin()));
        System.out.println("  Schlechteste Note: " + String.format("%.1f", stats.getMax()));
        System.out.println("  Durchschnitt: " + String.format("%.2f", stats.getAverage()));

        System.out.println("\\n=== Studenten mit Durchschnitt besser als 2.0 ===");
        students.stream()
            .filter(s -> s.average() < 2.0)
            .sorted(Comparator.comparingDouble(Student::average))
            .forEach(s -> System.out.println("  " + s.name() + ": " + String.format("%.2f", s.average())));

        System.out.println("\\n=== Durchschnitt pro Studiengang ===");
        students.stream()
            .collect(Collectors.groupingBy(Student::major,
                Collectors.averagingDouble(Student::average)))
            .entrySet().stream()
            .sorted(Map.Entry.comparingByValue())
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + String.format("%.2f", e.getValue())));

        System.out.println("\\n=== Bester Student pro Studiengang ===");
        students.stream()
            .collect(Collectors.groupingBy(Student::major,
                Collectors.minBy(Comparator.comparingDouble(Student::average))))
            .forEach((major, best) -> best.ifPresent(s ->
                System.out.println("  " + major + ": " + s.name() + " (" + String.format("%.2f", s.average()) + ")")));
    }
}`,
    timeEstimate: 25,
  },
  {
    id: 'exam2-query-06',
    category: 'abfragen',
    semester: 'java2',
    title: 'Wortfrequenz-Analyse',
    description: 'Analysiere einen Text und ermittle Wortfrequenzen. Zerlege den Text in Woerter, zaehle die Haeufigkeit jedes Wortes und sortiere nach Frequenz. Nutze Streams, groupingBy und counting.',
    requirements: [
      'Zerlege einen Text in einzelne Woerter (split, toLowerCase)',
      'Zaehle die Haeufigkeit jedes Wortes (groupingBy + counting)',
      'Sortiere Woerter nach Haeufigkeit absteigend',
      'Filtere Stoppwoerter heraus (der, die, das, und, oder, ein, eine, ist, ...)',
      'Berechne Statistiken: Gesamtwoerter, einzigartige Woerter, haeufigstes Wort',
    ],
    starterCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    static final Set<String> STOP_WORDS = Set.of(
        "der", "die", "das", "und", "oder", "ein", "eine", "ist",
        "in", "von", "zu", "den", "mit", "auf", "fuer", "an",
        "es", "im", "dem", "nicht", "sich", "als", "auch", "noch"
    );

    public static void main(String[] args) {
        String text = """
            Die Programmierung ist eine Kunst und eine Wissenschaft.
            In der Programmierung ist das Wichtigste die Logik.
            Die Logik ist das Fundament von guter Programmierung.
            Ein guter Programmierer versteht die Logik und die Struktur.
            Die Struktur von Code ist wichtig fuer die Wartbarkeit.
            Guter Code ist lesbarer Code und wartbarer Code.
            In der Praxis ist die Erfahrung mit Programmierung wichtig.
            Die Erfahrung macht den Unterschied in der Programmierung.
            """;

        // TODO: Text in Woerter zerlegen
        // TODO: Wortfrequenz berechnen (mit und ohne Stoppwoerter)
        // TODO: Top 10 Woerter nach Haeufigkeit
        // TODO: Statistiken ausgeben
    }
}`,
    solutionCode: `import java.util.*;
import java.util.stream.*;

public class Main {
    static final Set<String> STOP_WORDS = Set.of(
        "der", "die", "das", "und", "oder", "ein", "eine", "ist",
        "in", "von", "zu", "den", "mit", "auf", "fuer", "an",
        "es", "im", "dem", "nicht", "sich", "als", "auch", "noch"
    );

    public static void main(String[] args) {
        String text = """
            Die Programmierung ist eine Kunst und eine Wissenschaft.
            In der Programmierung ist das Wichtigste die Logik.
            Die Logik ist das Fundament von guter Programmierung.
            Ein guter Programmierer versteht die Logik und die Struktur.
            Die Struktur von Code ist wichtig fuer die Wartbarkeit.
            Guter Code ist lesbarer Code und wartbarer Code.
            In der Praxis ist die Erfahrung mit Programmierung wichtig.
            Die Erfahrung macht den Unterschied in der Programmierung.
            """;

        // Text in Woerter zerlegen
        List<String> words = Arrays.stream(text.toLowerCase()
                .replaceAll("[^a-zaeoeueaouess\\\\s]", "")
                .split("\\\\s+"))
            .filter(w -> !w.isBlank())
            .toList();

        System.out.println("=== Alle Wortfrequenzen ===");
        Map<String, Long> allFrequencies = words.stream()
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
        allFrequencies.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(10)
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));

        System.out.println("\\n=== Ohne Stoppwoerter ===");
        Map<String, Long> filtered = words.stream()
            .filter(w -> !STOP_WORDS.contains(w))
            .collect(Collectors.groupingBy(w -> w, Collectors.counting()));
        filtered.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(10)
            .forEach(e -> System.out.println("  " + e.getKey() + ": " + e.getValue()));

        System.out.println("\\n=== Statistiken ===");
        System.out.println("  Gesamtwoerter: " + words.size());
        System.out.println("  Einzigartige Woerter: " + allFrequencies.size());
        System.out.println("  Ohne Stoppwoerter: " + filtered.size() + " einzigartige Woerter");

        allFrequencies.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .ifPresent(e -> System.out.println("  Haeufigstes Wort: " + e.getKey() + " (" + e.getValue() + "x)"));

        long stopWordCount = words.stream().filter(STOP_WORDS::contains).count();
        System.out.println("  Stoppwoerter: " + stopWordCount
            + " (" + String.format("%.1f", 100.0 * stopWordCount / words.size()) + "%)");
    }
}`,
    timeEstimate: 20,
  },
];

export function getExamExercises(semester: 'java1' | 'java2'): ExamExercise[] {
  return examExercises.filter(e => e.semester === semester);
}

export function getExamExerciseById(id: string): ExamExercise | undefined {
  return examExercises.find(e => e.id === id);
}
