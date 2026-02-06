const GIST_FILENAME = 'javapath-progress.json';

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  html_url: string;
}

// --- Token Management ---
function getToken(): string | null {
  return localStorage.getItem('gh-token');
}

function setToken(token: string) {
  localStorage.setItem('gh-token', token);
}

export function clearToken() {
  localStorage.removeItem('gh-token');
  localStorage.removeItem('gh-user');
  localStorage.removeItem('gh-gist-id');
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

// --- GitHub API Helpers ---
async function ghFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  return fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      ...options.headers,
    },
  });
}

// --- User Info ---
export async function getUser(): Promise<GitHubUser | null> {
  const cached = localStorage.getItem('gh-user');
  if (cached) {
    try { return JSON.parse(cached); } catch { /* ignore */ }
  }
  if (!isLoggedIn()) return null;
  try {
    const res = await ghFetch('https://api.github.com/user');
    if (!res.ok) { clearToken(); return null; }
    const user = await res.json();
    localStorage.setItem('gh-user', JSON.stringify(user));
    return user;
  } catch { return null; }
}

// --- Personal Access Token Login (simple approach for static sites) ---
export async function loginWithToken(token: string): Promise<GitHubUser | null> {
  setToken(token);
  const user = await getUser();
  if (!user) {
    clearToken();
    return null;
  }
  return user;
}

// --- Gist-based Progress Sync ---
async function findProgressGist(): Promise<string | null> {
  const cached = localStorage.getItem('gh-gist-id');
  if (cached) return cached;

  const res = await ghFetch('https://api.github.com/gists?per_page=100');
  if (!res.ok) return null;
  const gists = await res.json();
  const found = gists.find((g: { files: Record<string, unknown> }) => GIST_FILENAME in g.files);
  if (found) {
    localStorage.setItem('gh-gist-id', found.id);
    return found.id;
  }
  return null;
}

async function createProgressGist(data: unknown): Promise<string | null> {
  const res = await ghFetch('https://api.github.com/gists', {
    method: 'POST',
    body: JSON.stringify({
      description: 'JavaPath - Lernfortschritt',
      public: false,
      files: {
        [GIST_FILENAME]: { content: JSON.stringify(data, null, 2) },
      },
    }),
  });
  if (!res.ok) return null;
  const gist = await res.json();
  localStorage.setItem('gh-gist-id', gist.id);
  return gist.id;
}

export async function saveProgressToGist(data: unknown): Promise<boolean> {
  if (!isLoggedIn()) return false;
  try {
    let gistId = await findProgressGist();
    if (!gistId) {
      gistId = await createProgressGist(data);
      return !!gistId;
    }
    const res = await ghFetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: { content: JSON.stringify(data, null, 2) },
        },
      }),
    });
    return res.ok;
  } catch { return false; }
}

export async function loadProgressFromGist(): Promise<unknown | null> {
  if (!isLoggedIn()) return null;
  try {
    const gistId = await findProgressGist();
    if (!gistId) return null;
    const res = await ghFetch(`https://api.github.com/gists/${gistId}`);
    if (!res.ok) return null;
    const gist = await res.json();
    const content = gist.files?.[GIST_FILENAME]?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch { return null; }
}
