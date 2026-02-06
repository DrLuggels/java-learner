import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Lightbulb, Settings, Zap, WifiOff } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { isAIConfigured, sendToAI, setAIConfig, clearAIConfig, getAIConfig } from '../../utils/aiProvider';
import type { AIProvider } from '../../utils/aiProvider';

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'Konzept erklären', icon: Lightbulb, prompt: 'Erkläre mir das aktuelle Konzept einfach und verständlich.' },
  { label: 'Hilfe bei Aufgabe', icon: Sparkles, prompt: 'Ich brauche einen Hinweis für die aktuelle Aufgabe, ohne die Lösung zu verraten.' },
];

// Fallback responses for when no AI API is configured
function getFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  if (lower.includes('variable') || lower.includes('datenobjekt'))
    return 'Eine **Variable** in Java ist wie eine beschriftete Box.\n\n```java\nint alter = 25;\nString name = "Max";\nfinal double PI = 3.14159;\n```\n\nJede Variable hat: **Datentyp**, **Name**, **Wert**.';
  if (lower.includes('schleife') || lower.includes('loop'))
    return '**for** - Anzahl bekannt:\n```java\nfor (int i = 0; i < 5; i++) { ... }\n```\n**while** - Bedingung:\n```java\nwhile (x > 0) { ... }\n```\n**for-each** - Collections:\n```java\nfor (String s : liste) { ... }\n```';
  if (lower.includes('klasse') || lower.includes('class') || lower.includes('oop'))
    return 'Eine **Klasse** ist ein Bauplan:\n```java\npublic class Auto {\n    private String marke;\n    public Auto(String marke) { this.marke = marke; }\n    public void fahren() { ... }\n}\nAuto a = new Auto("BMW");\n```';
  if (lower.includes('array'))
    return '```java\nint[] zahlen = {1, 2, 3, 4, 5};\nString[] namen = new String[3];\nfor (String n : namen) { ... }\n```\nArrays starten bei Index 0 und haben feste Größe. Flexible Größe? → `ArrayList`';
  if (lower.includes('hinweis') || lower.includes('hilfe') || lower.includes('tipp'))
    return '1. Lies die Aufgabe nochmal genau\n2. Zerlege das Problem in kleine Schritte\n3. Schreib erst Pseudocode\n4. Teste Schritt für Schritt\n\nWelches Konzept bereitet dir Schwierigkeiten?';
  if (lower.includes('fehler') || lower.includes('error') || lower.includes('exception'))
    return '**Kompilierfehler**: Syntax (Semikolon, Typo)\n**Laufzeitfehler**: NullPointer, ArrayIndex\n**Logikfehler**: Falsches Ergebnis\n\nTipp: Lies die Fehlermeldung genau - Zeile und Fehlertyp!';
  if (lower.includes('stream'))
    return '```java\nList<String> namen = List.of("Anna", "Bob", "Charlie");\nnamen.stream()\n    .filter(n -> n.length() > 3)\n    .map(String::toUpperCase)\n    .forEach(System.out::println);\n```\nKernoperationen: `filter`, `map`, `reduce`, `collect`';
  if (lower.includes('interface'))
    return '```java\ninterface Fahrbar {\n    void fahren();\n    default void hupen() { System.out.println("Huup!"); }\n}\nclass Auto implements Fahrbar {\n    public void fahren() { ... }\n}\n```\nInterfaces definieren Verträge. Seit Java 8 mit `default`-Methoden.';
  return 'Stelle mir eine spezifischere Frage zu einem Java-Konzept!\n\n💡 **Tipp**: Frage nach Variablen, Schleifen, Klassen, Arrays, Streams, Interfaces, Exceptions oder bitte um Hilfe bei einer Aufgabe.\n\n⚡ Für bessere Antworten: Konfiguriere eine AI-API in den Einstellungen (⚙️ oben).';
}

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
  const [showSettings, setShowSettings] = useState(false);
  const [aiActive, setAiActive] = useState(isAIConfigured());
  const [settingsKey, setSettingsKey] = useState('');
  const [settingsProvider, setSettingsProvider] = useState<AIProvider>('openai');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (showSettings) {
      const config = getAIConfig();
      setSettingsKey(config.apiKey);
      setSettingsProvider(config.provider === 'none' ? 'openai' : config.provider);
    }
  }, [showSettings]);

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

    let response: string;

    if (isAIConfigured()) {
      try {
        const chatHistory = messages
          .filter(m => m.id !== '1')
          .slice(-8)
          .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }));
        chatHistory.push({ role: 'user', content: text.trim() });
        response = await sendToAI(chatHistory);
      } catch (e) {
        response = `⚠️ API-Fehler: ${e instanceof Error ? e.message : 'Unbekannter Fehler'}\n\nFallback-Antwort:\n\n${getFallbackResponse(text)}`;
      }
    } else {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 500));
      response = getFallbackResponse(text);
    }

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  const handleSaveSettings = () => {
    if (settingsKey.trim()) {
      setAIConfig(settingsProvider, settingsKey.trim());
      setAiActive(true);
    } else {
      clearAIConfig();
      setAiActive(false);
    }
    setShowSettings(false);
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-dark-800 border-l border-dark-600 flex flex-col h-full animate-slide-in shrink-0">
      <div className="p-3 border-b border-dark-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-accent-blue" />
          <span className="font-medium text-dark-100 text-sm">AI Java-Tutor</span>
          <span title={aiActive ? 'AI API aktiv' : 'Offline-Modus'}>
            {aiActive ? (
              <Zap className="w-3 h-3 text-accent-green" />
            ) : (
              <WifiOff className="w-3 h-3 text-dark-500" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSettings(!showSettings)} className="text-dark-400 hover:text-dark-200 transition-colors p-1" title="AI Einstellungen">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="text-dark-400 hover:text-dark-200 transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="p-3 border-b border-dark-600 bg-dark-750 space-y-2">
          <p className="text-xs text-dark-300 font-medium">AI-Provider konfigurieren</p>
          <select
            value={settingsProvider}
            onChange={e => setSettingsProvider(e.target.value as AIProvider)}
            className="w-full bg-dark-700 border border-dark-600 rounded px-2 py-1 text-xs text-dark-200"
          >
            <option value="openai">OpenAI (GPT-4o-mini)</option>
            <option value="custom">Benutzerdefiniert</option>
          </select>
          <input
            type="password"
            value={settingsKey}
            onChange={e => setSettingsKey(e.target.value)}
            placeholder="API Key eingeben..."
            className="w-full bg-dark-700 border border-dark-600 rounded px-2 py-1 text-xs text-dark-200 placeholder:text-dark-500"
          />
          <div className="flex gap-2">
            <button onClick={handleSaveSettings} className="flex-1 bg-accent-blue/20 text-accent-blue text-xs py-1 rounded hover:bg-accent-blue/30">
              Speichern
            </button>
            <button onClick={() => { clearAIConfig(); setAiActive(false); setShowSettings(false); }} className="text-dark-400 text-xs py-1 px-2 rounded hover:bg-dark-600">
              Deaktivieren
            </button>
          </div>
        </div>
      )}

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
