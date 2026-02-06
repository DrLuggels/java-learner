import CodeEditor from '../components/editor/CodeEditor';

const defaultCode = `public class Main {
    public static void main(String[] args) {
        // Willkommen im Java Playground!
        // Schreibe hier deinen Code und klicke auf "Ausführen"

        System.out.println("Hallo, Java 21!");

        // Probiere verschiedene Konzepte aus:
        var name = "Welt";
        System.out.println("Hallo, " + name + "!");

        // Schleifen
        for (int i = 1; i <= 5; i++) {
            System.out.println("Zahl: " + i);
        }
    }
}`;

export default function PlaygroundPage() {
  return (
    <div className="h-full flex flex-col p-4 animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-dark-100">Java Playground</h1>
        <p className="text-dark-400 text-sm">Schreibe und teste Java-Code frei im Browser. Experimentiere mit Konzepten!</p>
      </div>
      <div className="flex-1 min-h-0 min-w-0">
        <CodeEditor initialCode={defaultCode} height="100%" />
      </div>
    </div>
  );
}
