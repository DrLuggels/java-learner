# Probeklausur — Programmierung I

**Bearbeitungszeit:** 90 Minuten
**Erlaubte Hilfsmittel:** Java-API (wird mitgegeben)
**Gesamtpunkte:** 56,5

---

## Aufgabe 1 (51,5 Punkte)

Implementiere die Klassen **Bookable** (2 Punkte), **NotBookableException** (1,5 Punkte), **TooLowBudgetException** (2 Punkte), **Room** (7,5 Punkte), **Floor** (14,5 Punkte), **FloorPriceComparator** (2,75 Punkte), **Hotel** (16 Punkte), und **ExamTask01** (5,25 Punkte) entsprechend dem Klassendiagramm. Befolge alle Hinweise bei der Implementierung!

### Glossar

| Englisch | Deutsch |
|---|---|
| Hotel | Hotel |
| Floor | Etage |
| Room | Zimmer |
| Guest | Gast |
| Book | Buchen |
| Price | Preis |
| TooLowBudget | Zu wenig Geld |

---

### Klassendiagramm

```
┌──────────────────────────────────────────────┐
│                    Hotel                      │
├──────────────────────────────────────────────┤
│ +floors: ArrayList<Floor> { final }          │
├──────────────────────────────────────────────┤
│ +Hotel(numberOfFloors: int)                  │
│ +bookFloor(guest: Guest): void               │
│ +bookRoom(guest: Guest): boolean             │
│ +sortByPrice(): void                         │
│ +sort(): void                                │
└──────────────────┬───────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────┐
│                   Floor                       │
├──────────────────────────────────────────────┤
│ -number: int { final }                       │
│ +price: double { final }                     │
│ -guest: Guest                                │
│ +rooms: ArrayList<Room> { final }            │
├──────────────────────────────────────────────┤
│ +Floor(number: int, numberOfRooms: int)      │
│ +Floor(number: int, numberOfRooms: int,      │
│        price: double)                        │
│ +getNumber(): int                            │
│ +isBookable(): boolean                       │
│ +book(guest: Guest): void                    │
│ +compareTo(other: Floor): int                │
└──────────────────┬───────────────────────────┘
                   │           implements           implements
                   ▼               │                    │
┌──────────────────────────┐       ▼                    ▼
│          Room            │  ┌─────────────────┐  ┌──────────────────┐
├──────────────────────────┤  │ Comparable       │  │ Comparator       │
│ +price: double { final } │  │ <Floor>          │  │ <Floor>          │
│ -guest: Guest            │  ├─────────────────┤  ├──────────────────┤
├──────────────────────────┤  │ compareTo(other: │  │ compare(f1:Floor,│
│ +Room(price: double)     │  │  Floor): int     │  │  f2: Floor): int │
│ +isFree(): boolean       │  └─────────────────┘  └────────▲─────────┘
│ +isBookable(): boolean   │                                │
│ +book(guest: Guest): void│                        implements
└──────────┬───────────────┘                                │
           │                              ┌─────────────────────────────┐
       implements                         │     FloorPriceComparator    │
           │                              ├─────────────────────────────┤
           ▼                              │ +compare(f1: Floor,         │
┌──────────────────────────┐              │          f2: Floor): int    │
│     «interface»          │              └─────────────────────────────┘
│      Bookable            │
├──────────────────────────┤
│ +book(guest: Guest): void│
└─────┬──────────┬─────────┘
 throws│          │throws
       ▼          ▼
┌──────────────┐  ┌────────────────────────────┐     ┌────────────────────┐
│NotBookable-  │  │ TooLowBudgetException      │     │       Guest        │
│Exception     │  ├────────────────────────────┤     ├────────────────────┤
├──────────────┤  │ +missingMoney: double       │     │ +budget: double    │
│ +NotBookable-│  │                  { final }  │     │          { final } │
│  Exception() │  ├────────────────────────────┤     ├────────────────────┤
└──────┬───────┘  │ +TooLowBudgetException(    │     │ +Guest(budget:     │
       │          │   missingMoney: double)     │     │          double)   │
   extends        └──────────┬─────────────────┘     └────────────────────┘
       │                     │
       ▼                 extends
┌──────────────┐             │
│  Exception   │◄────────────┘
└──────────────┘


┌──────────────────────────────┐
│         ExamTask01           │
├──────────────────────────────┤
│ + main(args: String[]): void │  ← static (unterstrichen)
└──────────────────────────────┘
```

---

### Hinweise zur Klasse Bookable (Buchbar)

- Die Methode **book** soll angeben, dass diese Methode eine **NotBookableException** oder eine **TooLowBudgetException** auslösen kann.

### Hinweise zur Klasse NotBookableException

- Der Konstruktor hat keine Parameter.

### Hinweise zur Klasse TooLowBudgetException (ZuWenigGeldException)

- Der Konstruktor soll alle Attribute initialisieren.

### Hinweise zur Klasse Room (Zimmer)

- Der Konstruktor soll alle Attribute initialisieren.
- Die Methode **isFree** soll `true` zurückgeben, wenn kein Gast (guest) im Zimmer ist.
- Die Methode **isBookable** soll `true` zurückgeben, wenn der Preis größer als 0 ist.
- Die Methode **book** soll den eingehenden Gast buchen lassen.

  Ist das Zimmer nicht buchbar oder nicht frei, soll eine **NotBookableException** ausgelöst werden.

  Ist das Zimmer buchbar und frei, aber nicht bezahlbar für den eingehenden Gast soll eine **TooLowBudgetException** ausgelöst werden. Ein Zimmer ist nicht bezahlbar, sobald der Preis größer ist als das Budget eines Gastes.

  Ist das Zimmer buchbar, frei und bezahlbar soll der eingehende Gast als Gast (guest) zugewiesen werden.

### Hinweise zur Klasse Floor (Etage)

- Die Konstruktoren sollen alle Attribute initialisieren. Rufe im unspezifischen Konstruktor den spezifischen Konstruktor so auf, dass immer 0 als Preis für die Etage gesetzt wird.

  Der spezifische Konstruktor soll nach der Initialisierung aller Attribute N Zimmer erzeugen. N entspricht `numberOfRooms`. Das erste Zimmer soll einen Preis von 100 haben. Jedes weitere generierte Zimmer soll 50 Einheiten teurer sein. Alle generierten Zimmer sollen der Etage hinzugefügt werden.

- Die Methode **getNumber** soll die Etagennummer zurückgeben.
- Die Methode **isBookable** soll `true` zurückgeben, wenn der Preis größer als 0 ist und kein Gast (guest) auf der Etage ist.
- Die Methode **book** soll den eingehenden Gast buchen lassen.

  Ist die Etage nicht buchbar, soll eine **NotBookableException** ausgelöst werden.

  Ist die Etage buchbar, aber nicht bezahlbar für den eingehenden Gast soll eine **TooLowBudgetException** ausgelöst werden. Eine Etage ist nicht bezahlbar, sobald der Preis größer ist als das Budget eines Gastes.

  Ist die Etage buchbar und bezahlbar soll der eingehende Gast als Gast (guest) zugewiesen werden.

- Die Methode **compareTo** soll die natürliche Ordnung der Klasse Floor definieren. Hierbei soll nach der Etagennummer (number) aufsteigend sortiert werden.

### Hinweise zur Klasse FloorPriceComparator

- Der FloorPriceComparator soll das Comparator Interface implementieren und Etagen aufsteigend nach Preis sortieren.

### Hinweise zur Klasse Hotel

- Der Konstruktor soll alle Attribute initialisieren.

  Der Konstruktor soll nach der Initialisierung aller Attribute N Etagen (Floor) erzeugen. N entspricht `numberOfFloors`. Die Etagen sollen beginnend mit 1 aufsteigend nummeriert werden. Etagen mit einer geraden Etagennummer, sollen 4 Zimmer haben jedoch keinen Preis. Etagen mit einer ungeraden Etagennummer, sollen keine Zimmer haben, jedoch einen Preis von 3000. Verwende für die Instanziierung von Etagen, wenn möglich einen unspezifischen Konstruktor. Füge die generierten Etagen dem Hotel hinzu.

- Die Methode **bookFloor** soll den eingehenden Gast in einer Etage (Floor) buchen lassen. Konnte der Gast eine Etage buchen, soll die Suche in weiteren Etagen abgebrochen werden.

  Kann eine Etage nicht gebucht werden, weil das Budget nicht ausreicht, soll dies auf der Konsole ausgegeben werden. Relevant ist das fehlende Geld.

  Bsp: `"Es wird 450.0 mehr Geld gebraucht"`

  Kann eine Etage aus anderen Gründen nicht gebucht werden, soll dies auf der Konsole ausgegeben werden. Relevant ist die Etagennummer.

  Bsp: `"Die Etage 3 kann nicht gebucht werden"`

- Die Methode **bookRoom** soll den eingehenden Gast in irgendeinem Zimmer (Room) in irgendeiner Etage (Floor) buchen lassen. Konnte der Gast ein Zimmer buchen, soll `true` zurückgegeben werden.

  Kann ein Zimmer nicht gebucht werden, weil das Budget nicht ausreicht, soll dies auf der Konsole ausgegeben werden. Relevant ist der Preis.

  Bsp: `"Zu wenig Geld für Zimmer. Preis: 100.0"`

  Kann ein Zimmer aus anderen Gründen nicht gebucht werden, soll dies auf der Konsole ausgegeben werden. Relevant ist das wievielte Zimmer auf der Etage, beginnend bei 1.

  Bsp: `"Zimmer 1 nicht Buchbar"`

  Kann kein Zimmer auf keiner Etage des Hotels vom eingehenden Gast gebucht werden, soll `false` zurückgegeben werden.

- Die Methode **sortByPrice** soll die Etagen nach Preis aufsteigend sortieren.
- Die Methode **sort** soll die Etagen nach ihrer natürlichen Ordnung sortieren.

### Hinweise zur Klasse ExamTask01

Es soll ein Hotel mit 15 Etagen erstellt werden. Sortiere die Etagen aufsteigend nach ihrem Preis und finde das günstigste Zimmer des gesamten Hotels. Gib anschließend den Preis des günstigsten Zimmers aus.

---

## Aufgabe 2 (5 Punkte)

Was ist der Unterschied zwischen einer abstrakten Klasse und einem Interface? Erläutere die Unterschiede und Restriktionen. Nenne einen konkreten Anwendungsfall und begründe deine Entscheidung.
