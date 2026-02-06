import type { Exercise } from '../../types';
export const interfacesExercises: Exercise[] = [
  { id: 'interfaces-01', topicId: 'interfaces', title: 'Drawable und Resizable Interfaces', difficulty: 'mittel',
    description: 'Erstelle zwei Interfaces: Drawable (mit Methode draw()) und Resizable (mit Methode resize(double factor)). Implementiere eine Klasse Circle und eine Klasse Rectangle, die beide Interfaces implementieren. Jede Form hat eine Groesse, die durch resize() veraendert werden kann.',
    requirements: ['Interface Drawable mit Methode void draw()', 'Interface Resizable mit Methode void resize(double factor)', 'Klasse Circle implementiert beide Interfaces, hat Feld radius', 'Klasse Rectangle implementiert beide Interfaces, hat Felder width und height', 'draw() gibt die Form mit ihren aktuellen Massen aus', 'resize() multipliziert alle Masse mit dem Faktor'],
    hints: ['Eine Klasse kann mehrere Interfaces implementieren: class X implements A, B', 'Nutze String.format("%.1f", wert) fuer formatierte Ausgabe', 'Denke an sinnvolle toString()-Methoden'],
    starterCode: `// TODO: Interface Drawable\n// TODO: Interface Resizable\n// TODO: Klasse Circle\n// TODO: Klasse Rectangle\n\npublic class Main {\n    public static void main(String[] args) {\n        // TODO: Formen erstellen, zeichnen, skalieren, erneut zeichnen\n    }\n}`,
    solutionCode: `interface Drawable {\n    void draw();\n}\n\ninterface Resizable {\n    void resize(double factor);\n}\n\nclass Circle implements Drawable, Resizable {\n    private double radius;\n\n    public Circle(double radius) {\n        this.radius = radius;\n    }\n\n    @Override\n    public void draw() {\n        System.out.println("Kreis mit Radius " + String.format("%.1f", radius));\n    }\n\n    @Override\n    public void resize(double factor) {\n        this.radius *= factor;\n    }\n}\n\nclass Rectangle implements Drawable, Resizable {\n    private double width;\n    private double height;\n\n    public Rectangle(double width, double height) {\n        this.width = width;\n        this.height = height;\n    }\n\n    @Override\n    public void draw() {\n        System.out.println("Rechteck " + String.format("%.1f", width) + " x " + String.format("%.1f", height));\n    }\n\n    @Override\n    public void resize(double factor) {\n        this.width *= factor;\n        this.height *= factor;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Circle kreis = new Circle(5.0);\n        Rectangle rechteck = new Rectangle(4.0, 6.0);\n\n        System.out.println("=== Vor Resize ===");\n        kreis.draw();\n        rechteck.draw();\n\n        kreis.resize(2.0);\n        rechteck.resize(0.5);\n\n        System.out.println("=== Nach Resize ===");\n        kreis.draw();\n        rechteck.draw();\n    }\n}`,
    expectedOutput: '=== Vor Resize ===\nKreis mit Radius 5,0\nRechteck 4,0 x 6,0\n=== Nach Resize ===\nKreis mit Radius 10,0\nRechteck 2,0 x 3,0',
    testCases: [
      { expectedOutput: 'Kreis mit Radius 5', description: 'Kreis wird korrekt gezeichnet' },
      { expectedOutput: 'Rechteck 4', description: 'Rechteck wird korrekt gezeichnet' },
      { expectedOutput: 'Kreis mit Radius 10', description: 'Kreis wird korrekt skaliert' },
      { expectedOutput: 'Rechteck 2', description: 'Rechteck wird korrekt verkleinert' },
    ],
  },
];
