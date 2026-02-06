const AI_KEY_STORAGE = 'javapath-ai-key';
const AI_PROVIDER_STORAGE = 'javapath-ai-provider';

export type AIProvider = 'openai' | 'custom' | 'none';

export function getAIConfig(): { provider: AIProvider; apiKey: string; endpoint: string } {
  const provider = (localStorage.getItem(AI_PROVIDER_STORAGE) || 'none') as AIProvider;
  const apiKey = localStorage.getItem(AI_KEY_STORAGE) || '';
  const endpoint = localStorage.getItem('javapath-ai-endpoint') || 'https://api.openai.com/v1/chat/completions';
  return { provider, apiKey, endpoint };
}

export function setAIConfig(provider: AIProvider, apiKey: string, endpoint?: string) {
  localStorage.setItem(AI_PROVIDER_STORAGE, provider);
  localStorage.setItem(AI_KEY_STORAGE, apiKey);
  if (endpoint) localStorage.setItem('javapath-ai-endpoint', endpoint);
}

export function clearAIConfig() {
  localStorage.removeItem(AI_PROVIDER_STORAGE);
  localStorage.removeItem(AI_KEY_STORAGE);
  localStorage.removeItem('javapath-ai-endpoint');
}

export function isAIConfigured(): boolean {
  const { provider, apiKey } = getAIConfig();
  return provider !== 'none' && apiKey.length > 0;
}

const SYSTEM_PROMPT = `Du bist ein freundlicher Java-Tutor für Anfänger. Du hilfst Studenten beim Lernen von Java 21.

Regeln:
- Antworte IMMER auf Deutsch
- Erkläre Konzepte einfach und verständlich mit Beispielen
- Nutze Java-Code-Beispiele mit \`\`\`java Code-Blöcken
- Gib KEINE vollständigen Lösungen für Aufgaben - nur Hinweise und Erklärungen
- Motiviere den Studenten und lobe Fortschritte
- Nutze Analogien aus dem Alltag für schwierige Konzepte
- Halte Antworten kurz (max 200 Wörter) und fokussiert
- Wenn nach einer Aufgabenlösung gefragt wird, gib stattdessen einen Hinweis zum nächsten Schritt`;

export async function sendToAI(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  context?: string
): Promise<string> {
  const { provider, apiKey, endpoint } = getAIConfig();

  if (provider === 'none' || !apiKey) {
    throw new Error('AI not configured');
  }

  const systemMessages = [{ role: 'system' as const, content: SYSTEM_PROMPT }];
  if (context) {
    systemMessages.push({ role: 'system' as const, content: `Aktueller Kontext: ${context}` });
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: provider === 'openai' ? 'gpt-4o-mini' : 'gpt-4o-mini',
      messages: [...systemMessages, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AI API Error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Keine Antwort erhalten.';
}
