const AI_KEY_STORAGE = 'javapath-ai-key';
const AI_PROVIDER_STORAGE = 'javapath-ai-provider';

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const GITHUB_MODELS_MODEL = 'gpt-4o-mini';

export type AIProvider = 'github' | 'openai' | 'custom' | 'none';

// Check if user is logged in via GitHub (has a token stored)
function getGitHubToken(): string | null {
  return localStorage.getItem('gh-token');
}

export function getAIConfig(): { provider: AIProvider; apiKey: string; endpoint: string; model: string } {
  // Manual config takes priority
  const manualProvider = localStorage.getItem(AI_PROVIDER_STORAGE) as AIProvider | null;
  const manualKey = localStorage.getItem(AI_KEY_STORAGE) || '';

  if (manualProvider && manualProvider !== 'none' && manualKey) {
    const endpoint = localStorage.getItem('javapath-ai-endpoint') || 'https://api.openai.com/v1/chat/completions';
    return { provider: manualProvider, apiKey: manualKey, endpoint, model: 'gpt-4o-mini' };
  }

  // Auto-detect: GitHub login → use GitHub Models API
  const ghToken = getGitHubToken();
  if (ghToken) {
    return { provider: 'github', apiKey: ghToken, endpoint: GITHUB_MODELS_ENDPOINT, model: GITHUB_MODELS_MODEL };
  }

  return { provider: 'none', apiKey: '', endpoint: '', model: '' };
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
  const { provider } = getAIConfig();
  return provider !== 'none';
}

export function getAISource(): 'github' | 'manual' | 'none' {
  const manualProvider = localStorage.getItem(AI_PROVIDER_STORAGE) as AIProvider | null;
  const manualKey = localStorage.getItem(AI_KEY_STORAGE) || '';
  if (manualProvider && manualProvider !== 'none' && manualKey) return 'manual';
  if (getGitHubToken()) return 'github';
  return 'none';
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
  const { provider, apiKey, endpoint, model } = getAIConfig();

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
      model,
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
