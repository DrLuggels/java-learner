import { Link } from 'react-router-dom'
import CodePlayground from '../components/CodePlayground'

const DEFAULT_CODE = `public class Main {
    public static void main(String[] args) {
        // Schreibe deinen Java-Code hier!
        // Aendere Werte und druecke "Ausfuehren"

        // Variablen
        int x = 10;
        double y = 3.5;
        String name = "Java";

        System.out.println("Hallo " + name + "!");
        System.out.println("x = " + x);
        System.out.println("y = " + y);
        System.out.println("x + y = " + (x + y));

        // Casting
        System.out.println("(int) y = " + (int) y);

        // Schleifen
        for (int i = 1; i <= 5; i++) {
            System.out.println(i + " * " + i + " = " + (i * i));
        }
    }
}`

export default function PlaygroundPage() {
  return (
    <div>
      <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm no-underline mb-4 inline-block">
        ← Zurück zum Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-white mb-2">Java Playground</h1>
      <p className="text-slate-400 mb-6">
        Schreibe Java-Code und sieh sofort die Ausgabe. Perfekt zum Experimentieren und Verstehen!
      </p>
      <CodePlayground initialCode={DEFAULT_CODE} title="Freier Editor" />
      <div className="mt-6 bg-slate-800 rounded-lg border border-slate-700 p-4">
        <h3 className="text-white font-semibold mb-2">Unterstützte Features</h3>
        <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
          <li>System.out.println() und System.out.print()</li>
          <li>Variablen: int, double, String, char, boolean</li>
          <li>Arithmetik: +, -, *, /, % (inkl. Ganzzahldivision)</li>
          <li>String-Konkatenation mit +</li>
          <li>Casting: (int), (double)</li>
          <li>Vergleiche und logische Operatoren</li>
          <li>if/else, for, while Schleifen</li>
          <li>Arrays und Array-Zugriff</li>
          <li>Pre/Post-Inkrement (++i, i++)</li>
        </ul>
      </div>
    </div>
  )
}
