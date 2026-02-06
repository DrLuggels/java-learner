import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb } from 'lucide-react';
import type { ChatMessage } from '../../types';

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'Konzept erklären', icon: Lightbulb, prompt: 'Erkläre mir das aktuelle Konzept einfach und verständlich.' },
  { label: 'Hilfe bei Aufgabe', icon: Sparkles, prompt: 'Ich brauche einen Hinweis für die aktuelle Aufgabe, ohne die Lösung zu verraten.' },
];

export default function AICopilot({ isOpen, onClose }: AICopilotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hallo! Ich bin dein Java-Tutor. Stelle mir Fragen zu Java-Konzepten, bitte um Hilfe bei Aufgaben, oder lass dir Code erklären. Wie kann ich dir helfen?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

    const lower = userMessage.toLowerCase();

    if (lower.includes('variable') || lower.includes('datenobjekt')) {
      return 'Eine **Variable** in Java ist wie eine beschriftete Box, in der du einen Wert speichern kannst.\n\n```java\nint alter = 25; // Box "alter" enthält 25\nString name = "Max"; // Box "name" enthält "Max"\n```\n\nJede Variable hat:\n- Einen **Datentyp** (was reinpasst)\n- Einen **Namen** (das Etikett)\n- Einen **Wert** (der Inhalt)\n\nMit `final` machst du eine Variable unveränderlich (Konstante):\n```java\nfinal double PI = 3.14159;\n```';
    }
    if (lower.includes('schleife') || lower.includes('loop')) {
      return 'Schleifen wiederholen Code-Blöcke. Java hat 3 Hauptarten:\n\n**for** - wenn du die Anzahl kennst:\n```java\nfor (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n```\n\n**while** - solange Bedingung wahr:\n```java\nwhile (eingabe != 0) {\n    // tue etwas\n}\n```\n\n**do-while** - mindestens 1x ausführen:\n```java\ndo {\n    // tue etwas\n} while (bedingung);\n```\n\n**Tipp:** `for` für Zähler, `while` für Bedingungen, `for-each` für Collections!';
    }
    if (lower.includes('klasse') || lower.includes('class') || lower.includes('oop')) {
      return 'Eine **Klasse** ist wie ein Bauplan für Objekte.\n\n```java\npublic class Auto {\n    private String marke;    // Eigenschaft\n    private int kmStand;     // Eigenschaft\n    \n    public Auto(String marke) {  // Konstruktor\n        this.marke = marke;\n        this.kmStand = 0;\n    }\n    \n    public void fahren(int km) { // Methode\n        this.kmStand += km;\n    }\n}\n```\n\nEine Klasse definiert:\n- **Attribute** (Eigenschaften)\n- **Methoden** (Verhalten)\n- **Konstruktoren** (Initialisierung)\n\nObjekte werden mit `new` erzeugt:\n```java\nAuto meinAuto = new Auto("BMW");\n```';
    }
    if (lower.includes('array')) {
      return 'Ein **Array** speichert mehrere Werte gleichen Typs in einer festen Größe.\n\n```java\n// Deklaration und Initialisierung\nint[] zahlen = new int[5];\nzahlen[0] = 10;\n\n// Oder direkt\nString[] namen = {"Max", "Anna", "Tom"};\n\n// Durchlaufen mit for-each\nfor (String name : namen) {\n    System.out.println(name);\n}\n```\n\n**Wichtig:** Arrays starten bei Index 0 und haben eine feste Größe! Brauchst du flexible Größe? Nutze `ArrayList`.';
    }
    if (lower.includes('hinweis') || lower.includes('hilfe') || lower.includes('tipp')) {
      return 'Hier ein allgemeiner Tipp für deine Aufgabe:\n\n1. **Lies die Aufgabe nochmal genau** - was wird gefordert?\n2. **Zerlege das Problem** in kleine Schritte\n3. **Schreib Pseudocode** bevor du Java schreibst\n4. **Teste Schritt für Schritt** - nicht alles auf einmal\n\nWelches Konzept bereitet dir Schwierigkeiten? Dann kann ich gezielter helfen!';
    }
    if (lower.includes('fehler') || lower.includes('error') || lower.includes('exception')) {
      return 'Java-Fehler lassen sich in 3 Kategorien einteilen:\n\n1. **Kompilierfehler** - Syntaxfehler, die der Compiler findet\n   - Semikolon vergessen, Typo im Variablennamen\n\n2. **Laufzeitfehler** (Exceptions) - treten beim Ausführen auf\n   - `NullPointerException` - Variable ist null\n   - `ArrayIndexOutOfBoundsException` - Index zu groß\n\n3. **Logikfehler** - Programm läuft, gibt aber falsches Ergebnis\n   - Am schwersten zu finden!\n\n**Tipp:** Lies die Fehlermeldung genau - sie sagt dir die Zeile und den Fehlertyp!';
    }

    return 'Gute Frage! Hier sind einige Tipps:\n\n1. Schau dir die aktuelle Lektion nochmal an\n2. Versuche das Konzept in eigenen Worten zu erklären\n3. Experimentiere mit dem Code-Editor\n\nStelle mir gerne eine spezifischere Frage zu einem Java-Konzept, und ich erkläre es dir Schritt für Schritt!';
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-dark-800 border-l border-dark-600 flex flex-col h-full animate-slide-in shrink-0">
      <div className="p-3 border-b border-dark-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-accent-blue" />
          <span className="font-medium text-dark-100 text-sm">AI Java-Tutor</span>
        </div>
        <button onClick={onClose} className="text-dark-400 hover:text-dark-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-accent-blue" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
              msg.role === 'user'
                ? 'bg-accent-blue/20 text-dark-100'
                : 'bg-dark-700 text-dark-300'
            }`}>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{msg.content}</pre>
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-accent-purple/20 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-accent-purple" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-accent-blue" />
            </div>
            <div className="bg-dark-700 rounded-lg px-3 py-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-dark-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 border-t border-dark-600">
        <div className="flex gap-1 mb-2 flex-wrap">
          {quickActions.map(action => (
            <button
              key={action.label}
              onClick={() => sendMessage(action.prompt)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-dark-700 text-dark-400 hover:text-dark-200 hover:bg-dark-600 transition-colors"
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Frag mich etwas..."
            className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-200 placeholder-dark-500 focus:outline-none focus:border-accent-blue/50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 disabled:opacity-30 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
