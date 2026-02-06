import type { Exercise } from '../../types';
export const genericsExercises: Exercise[] = [
  { id: 'generics-01', topicId: 'generics', title: 'Generische Box', difficulty: 'mittel',
    description: 'Erstelle eine generische Box<T> Klasse die jeden Typ speichern kann.',
    requirements: ['Klasse Box<T> mit Attribut content', 'Getter und Setter', 'toString() Methode', 'Teste mit String, Integer und Double'],
    hints: ['class Box<T> { private T content; }', 'T ist ein Platzhalter für den echten Typ'],
    starterCode: `// TODO: class Box<T>\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Boxen mit verschiedenen Typen erstellen\n    }\n}`,
    solutionCode: `class Box<T> {\n    private T content;\n    public Box(T content) { this.content = content; }\n    public T getContent() { return content; }\n    public void setContent(T content) { this.content = content; }\n    public String toString() { return "Box[" + content + "]"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> textBox = new Box<>("Hallo Generics!");\n        Box<Integer> intBox = new Box<>(42);\n        Box<Double> doubleBox = new Box<>(3.14);\n        System.out.println(textBox);\n        System.out.println(intBox);\n        System.out.println(doubleBox);\n        System.out.println("Inhalt: " + textBox.getContent());\n    }\n}`,
    expectedOutput: 'Box[Hallo Generics!]\nBox[42]\nBox[3.14]\nInhalt: Hallo Generics!',
    testCases: [{ expectedOutput: 'Box[Hallo Generics!]', description: 'String-Box' }, { expectedOutput: 'Box[42]', description: 'Integer-Box' }],
  },
];
