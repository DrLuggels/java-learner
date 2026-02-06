const AI_KEY_STORAGE = 'javapath-ai-key';
const AI_PROVIDER_STORAGE = 'javapath-ai-provider';
const MODEL_STORAGE = 'javapath-ai-model';

const COPILOT_ENDPOINT = 'https://api.githubcopilot.com/chat/completions';
const COPILOT_MODELS_ENDPOINT = 'https://api.githubcopilot.com/models';
const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com/chat/completions';
const GITHUB_MODELS_LIST = 'https://models.inference.ai.azure.com/models';

export type AIProvider = 'copilot' | 'github-models' | 'openai' | 'custom' | 'none';

export interface ModelInfo {
  id: string;
  name: string;
  publisher: string;
}

// --- Token ---
function getGitHubToken(): string | null {
  return localStorage.getItem('gh-token');
}

// --- Model Selection ---
export function getSelectedModel(): string {
  return localStorage.getItem(MODEL_STORAGE) || 'gpt-4o';
}

export function setSelectedModel(model: string) {
  localStorage.setItem(MODEL_STORAGE, model);
}

// --- Config ---
export function getAIConfig(): { provider: AIProvider; apiKey: string; endpoint: string; model: string } {
  // Manual config takes priority
  const manualProvider = localStorage.getItem(AI_PROVIDER_STORAGE) as AIProvider | null;
  const manualKey = localStorage.getItem(AI_KEY_STORAGE) || '';
  if (manualProvider && manualProvider !== 'none' && manualKey) {
    const endpoint = localStorage.getItem('javapath-ai-endpoint') || 'https://api.openai.com/v1/chat/completions';
    return { provider: manualProvider, apiKey: manualKey, endpoint, model: getSelectedModel() };
  }

  // Auto: GitHub token → try Copilot first, fallback to Models
  const ghToken = getGitHubToken();
  if (ghToken) {
    const preferredApi = localStorage.getItem('javapath-ai-api') || 'copilot';
    if (preferredApi === 'copilot') {
      return { provider: 'copilot', apiKey: ghToken, endpoint: COPILOT_ENDPOINT, model: getSelectedModel() };
    }
    return { provider: 'github-models', apiKey: ghToken, endpoint: GITHUB_MODELS_ENDPOINT, model: getSelectedModel() };
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

export function getAISource(): 'copilot' | 'github-models' | 'manual' | 'none' {
  const manualProvider = localStorage.getItem(AI_PROVIDER_STORAGE) as AIProvider | null;
  const manualKey = localStorage.getItem(AI_KEY_STORAGE) || '';
  if (manualProvider && manualProvider !== 'none' && manualKey) return 'manual';
  const ghToken = getGitHubToken();
  if (ghToken) {
    const preferredApi = localStorage.getItem('javapath-ai-api') || 'copilot';
    return preferredApi === 'copilot' ? 'copilot' : 'github-models';
  }
  return 'none';
}

export function setPreferredApi(api: 'copilot' | 'github-models') {
  localStorage.setItem('javapath-ai-api', api);
  // Clear model cache when switching
  localStorage.removeItem(MODELS_CACHE_KEY);
}

export function getPreferredApi(): 'copilot' | 'github-models' {
  return (localStorage.getItem('javapath-ai-api') || 'copilot') as 'copilot' | 'github-models';
}

// --- Model Fetching ---
const MODELS_CACHE_KEY = 'javapath-models-cache';
const MODELS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

const EXCLUDE_KEYWORDS = ['embed', 'tts', 'whisper', 'dall-e', 'safety', 'shield', 'guard', 'audio', 'transcri'];

function isChatModel(id: string): boolean {
  const lower = id.toLowerCase();
  return !EXCLUDE_KEYWORDS.some(k => lower.includes(k));
}

export async function fetchAvailableModels(): Promise<ModelInfo[]> {
  const cacheKey = MODELS_CACHE_KEY + '-' + getPreferredApi();
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const { models, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < MODELS_CACHE_TTL && models.length > 0) return models;
    } catch { /* ignore */ }
  }

  const token = getGitHubToken();
  if (!token) return FALLBACK_MODELS;

  const preferredApi = getPreferredApi();
  const modelsUrl = preferredApi === 'copilot' ? COPILOT_MODELS_ENDPOINT : GITHUB_MODELS_LIST;

  try {
    const res = await fetch(modelsUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        ...(preferredApi === 'copilot' ? { 'Copilot-Integration-Id': 'vscode-chat' } : {}),
      },
    });

    if (!res.ok) {
      // If Copilot fails, try falling back to GitHub Models
      if (preferredApi === 'copilot') {
        const fallbackRes = await fetch(GITHUB_MODELS_LIST, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          return parseModels(data, cacheKey);
        }
      }
      return FALLBACK_MODELS;
    }

    const data = await res.json();
    return parseModels(data, cacheKey);
  } catch {
    return FALLBACK_MODELS;
  }
}

function parseModels(data: unknown, cacheKey: string): ModelInfo[] {
  const arr = (data as { data?: unknown[] })?.data || (Array.isArray(data) ? data : []);
  const models: ModelInfo[] = (arr as { id: string; name?: string; owned_by?: string; publisher?: string; model_picker_enabled?: boolean }[])
    .filter(m => m.id && isChatModel(m.id))
    .map(m => ({
      id: m.id,
      name: m.name || m.id,
      publisher: m.owned_by || m.publisher || '',
    }))
    .sort((a, b) => {
      // Popular models first
      const priority = ['gpt', 'o1', 'o3', 'o4', 'claude', 'gemini'];
      const aP = priority.findIndex(p => a.id.toLowerCase().startsWith(p));
      const bP = priority.findIndex(p => b.id.toLowerCase().startsWith(p));
      const aIdx = aP >= 0 ? aP : 99;
      const bIdx = bP >= 0 ? bP : 99;
      if (aIdx !== bIdx) return aIdx - bIdx;
      return a.name.localeCompare(b.name);
    });

  if (models.length > 0) {
    localStorage.setItem(cacheKey, JSON.stringify({ models, timestamp: Date.now() }));
    return models;
  }
  return FALLBACK_MODELS;
}

const FALLBACK_MODELS: ModelInfo[] = [
  { id: 'gpt-4o', name: 'GPT-4o', publisher: 'OpenAI' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', publisher: 'OpenAI' },
  { id: 'gpt-4.1', name: 'GPT-4.1', publisher: 'OpenAI' },
  { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', publisher: 'OpenAI' },
  { id: 'o4-mini', name: 'o4 Mini', publisher: 'OpenAI' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', publisher: 'Anthropic' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', publisher: 'Google' },
  { id: 'DeepSeek-R1', name: 'DeepSeek R1', publisher: 'DeepSeek' },
];

// --- System Prompt ---
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

// --- Send Message ---
export async function sendToAI(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  context?: string
): Promise<string> {
  const config = getAIConfig();

  if (config.provider === 'none' || !config.apiKey) {
    throw new Error('AI not configured');
  }

  const systemMessages = [{ role: 'system' as const, content: SYSTEM_PROMPT }];
  if (context) {
    systemMessages.push({ role: 'system' as const, content: `Aktueller Kontext: ${context}` });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  };

  // Copilot API needs extra headers
  if (config.provider === 'copilot') {
    headers['Copilot-Integration-Id'] = 'vscode-chat';
    headers['Editor-Version'] = 'vscode/1.100.0';
  }

  let response: Response;
  try {
    response = await fetch(config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: config.model,
        messages: [...systemMessages, ...messages],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
  } catch (e) {
    // If Copilot fails, auto-fallback to GitHub Models
    if (config.provider === 'copilot') {
      response = await fetch(GITHUB_MODELS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages: [...systemMessages, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
    } else {
      throw e;
    }
  }

  if (!response.ok) {
    // Auto-fallback: Copilot 401/403 → try GitHub Models
    if (config.provider === 'copilot' && (response.status === 401 || response.status === 403)) {
      const fallback = await fetch(GITHUB_MODELS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages: [...systemMessages, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      if (fallback.ok) {
        // Switch to GitHub Models for future requests
        setPreferredApi('github-models');
        const data = await fallback.json();
        return data.choices?.[0]?.message?.content || 'Keine Antwort erhalten.';
      }
    }
    const error = await response.text();
    throw new Error(`AI API Error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'Keine Antwort erhalten.';
}
