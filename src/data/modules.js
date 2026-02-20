export const modules = [
  { id: 1, title: 'Java Grundlagen & Datentypen', description: 'JDK/JVM, primitive Typen, Wrapper, Casting, Strings', relevance: 'MITTEL' },
  { id: 2, title: 'Operatoren & Ausdrücke', description: 'Arithmetik, Logik, Inkrement, Ternär, Präzedenz', relevance: 'MITTEL' },
  { id: 3, title: 'Verzweigungen', description: 'if-else, switch-case, switch-Expressions', relevance: 'MITTEL' },
  { id: 4, title: 'Schleifen', description: 'while, do-while, for, for-each, break, continue', relevance: 'MITTEL' },
  { id: 5, title: 'Arrays', description: 'Deklaration, Zugriff, mehrdimensional, VarArgs', relevance: 'MITTEL' },
  { id: 6, title: 'Klassen & Objekte', description: 'Attribute, Methoden, Konstruktoren, static, UML', relevance: 'KRITISCH' },
  { id: 7, title: 'Enums', description: 'Enum-Definition, Attribute, Konstruktoren, Methoden', relevance: 'HOCH' },
  { id: 8, title: 'Vererbung & Polymorphie', description: 'extends, super, Override, Up-/Downcast, instanceof', relevance: 'KRITISCH' },
  { id: 9, title: 'Abstrakte Klassen & Interfaces', description: 'abstract, final, interface, implements', relevance: 'KRITISCH' },
  { id: 10, title: 'ArrayList & Collections', description: 'ArrayList, Autoboxing, Iteration, List.of()', relevance: 'KRITISCH' },
  { id: 11, title: 'Exceptions', description: 'try-catch, throw/throws, eigene Exceptions', relevance: 'HOCH' },
  { id: 12, title: 'Comparable & Comparator', description: 'compareTo, compare, Collections.sort, Sortierung', relevance: 'KRITISCH' },
]

export function getModule(id) {
  return modules.find(m => m.id === Number(id))
}
