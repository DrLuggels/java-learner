# Lernfortschritt Java 1 — Klausurvorbereitung

## Aktueller Stand: Phase 8 (Comparable & Comparator)

### Abgeschlossene Phasen

| Phase | Thema | Status |
|---|---|---|
| 1 | Grundsyntax (Attribute, Konstruktor, Getter, Objekte erstellen) | Fertig |
| 2 | UML-Diagramm lesen + Sichtbarkeit (public/private) | Fertig |
| 3 | Vererbung (extends, super, this(...), zwei Konstruktoren) | Fertig |
| 4 | Interfaces (implements, Methodensignaturen) | Fertig |
| 5 | Exceptions (eigene Exception, throw/throws, try/catch) | Fertig |
| 6 | Enums mit Attributen, Konstruktor, Getter | Fertig |
| 7 | Abstrakte Klassen (abstract class, abstract Methode) | Fertig |
| **8** | **Comparable & Comparator (Sortierung)** | **Als nächstes — Erklärung gelesen, noch nicht geübt** |
| 9 | toString() | Offen |
| 10 | Theoriefragen (if-else vs switch, abstract vs interface) | Offen |
| 11 | Komplette Klausuraufgaben üben | Offen |

### Was als nächstes kommt (Phase 8)

**Comparable** wurde erklärt, Comparator noch nicht. Nächste Aufgabe:

1. `Auto` soll `Comparable<Auto>` implementieren — sortiere nach `ps`
2. Eigene Klasse `AutoNameComparator` die `Comparator<Auto>` implementiert — sortiere nach `name`
3. In `main`: 3 Autos in einer `ArrayList`, sortiere einmal nach `ps` und einmal nach `name`

**Wichtig zum Verständnis:**
- `Integer.valueOf(a).compareTo(Integer.valueOf(b))` für int-Vergleich
- `Double.valueOf(a).compareTo(Double.valueOf(b))` für double-Vergleich
- `a.compareTo(b)` direkt für String-Vergleich
- `Collections.sort(liste)` für Comparable
- `Collections.sort(liste, new XComparator())` für Comparator

### Häufige Fehler (darauf achten!)

- [ ] Typ vor Name? (`String name` nicht `name String`)
- [ ] Konstruktor hat KEIN void und KEIN Rückgabetyp?
- [ ] this-Zuweisungen im Konstruktor?
- [ ] Klammern {} alle geschlossen?
- [ ] Methoden haben IMMER Rückgabetyp?
- [ ] Methoden haben IMMER () nach dem Namen?
- [ ] `private` vor Attribute, `public` vor Getter/Methoden?
- [ ] Strings in "Anführungszeichen"?
- [ ] Punkt-Notation: `objekt.methode()` nicht `methode(objekt)`?
- [ ] `super(...)` ohne `= ...` danach?
- [ ] Interface-Methoden OHNE private?
- [ ] Abstrakte Methoden enden mit `;` (kein Body)?
- [ ] Enum-Konstruktor OHNE public?
- [ ] `extends` nicht `extend`, `Exception` nicht `Exeption`?
- [ ] Komma zwischen Parametern, NICHT zwischen Typ und Name?

### Lernpräferenzen

- Keine Tipps geben, nur wenn danach gefragt wird
- Keine Lösungshinweise in Aufgaben
- Alles auf Deutsch
- Code wird in `name.java` geschrieben
- Verständnis (WARUM) ist wichtiger als nur die Lösung
