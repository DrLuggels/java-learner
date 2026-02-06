const AI_KEY_STORAGE = 'javapath-ai-key';
const AI_PROVIDER_STORAGE = 'javapath-ai-provider';

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const MODEL_STORAGE = 'javapath-ai-model';

export type AIProvider = 'github' | 'openai' | 'custom' | 'none';

export interface ModelInfo {
  id: string;
  name: string;
  publisher: string;
}

// Only show well-known chat models, not Azure infrastructure / embedding / image models
const CHAT_MODEL_KEYWORDS = [
  'gpt-4', 'gpt-3.5', 'o1', 'o3', 'o4',
  'llama', 'mistral', 'deepseek',
  'phi-', 'phi3', 'phi4',
  'command-r', 'jamba',
  'codestral', 'pixtral', 'ministral',
];
const EXCLUDE_KEYWORDS = ['embed', 'tts', 'whisper', 'dall-e', 'safety', 'shield', 'guard', 'vision'];

function isChatModel(id: string): boolean {
  const lower = id.toLowerCase();
  if (EXCLUDE_KEYWORDS.some(k => lower.includes(k))) return false;
  return CHAT_MODEL_KEYWORDS.some(k => lower.includes(k));
}

const MODELS_CACHE_KEY = 'javapath-models-cache';
const MODELS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  const cached = localStorage.getItem(MODELS_CACHE_KEY);
  if (cached) {
    try {
      const { models, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < MODELS_CACHE_TTL) return models;
    } catch { /* ignore */ }
  }

  const token = localStorage.getItem('gh-token');
  if (!token) return FALLBACK_MODELS;

  try {
    const res = await fetch('https://models.inference.ai.azure.com/models', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) return FALLBACK_MODELS;

    const data = await res.json();
    const raw = (data.data || data || []) as { id: string; name?: string; owned_by?: string; publisher?: string }[];
    const models: ModelInfo[] = raw
      .filter(m => m.id && isChatModel(m.id))
      .map(m => ({
        id: m.id,
        name: m.name || m.id,
        publisher: m.owned_by || m.publisher || '',
      }))
      .sort((a, b) => {
        // OpenAI GPT first, then o-series, then rest alphabetical
        const aIsGpt = a.id.startsWith('gpt');
        const bIsGpt = b.id.startsWith('gpt');
        if (aIsGpt && !bIsGpt) return -1;
        if (!aIsGpt && bIsGpt) return 1;
        return a.name.localeCompare(b.name);
      });

    if (models.length > 0) {
      localStorage.setItem(MODELS_CACHE_KEY, JSON.stringify({ models, timestamp: Date.now() }));
      return models;
    }
    return FALLBACK_MODELS;
  } catch {
    return FALLBACK_MODELS;
  }
}

const FALLBACK_MODELS: ModelInfo[] = [
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', publisher: 'OpenAI' },
  { id: 'gpt-4o', name: 'GPT-4o', publisher: 'OpenAI' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', publisher: 'OpenAI' },
  { id: 'gpt-4.1', name: 'GPT-4.1', publisher: 'OpenAI' },
  { id: 'o4-mini', name: 'o4-mini', publisher: 'OpenAI' },
  { id: 'DeepSeek-R1', name: 'DeepSeek R1', publisher: 'DeepSeek' },
  { id: 'Meta-Llama-3.1-405B-Instruct', name: 'Llama 3.1 405B', publisher: 'Meta' },
  { id: 'Mistral-Large-2', name: 'Mistral Large 2', publisher: 'Mistral' },
];

export function getSelectedModel(): string {
  return localStorage.getItem(MODEL_STORAGE) || 'gpt-4o-mini';
}

export function setSelectedModel(model: string) {
  localStorage.setItem(MODEL_STORAGE, model);
}

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
    return { provider: 'github', apiKey: ghToken, endpoint: GITHUB_MODELS_ENDPOINT, model: getSelectedModel() };
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
