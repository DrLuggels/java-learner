import { useState, useEffect, useCallback } from 'react';
import type { GitHubUser } from '../utils/githubAuth';
import { getUser, loginWithToken, clearToken, isLoggedIn } from '../utils/githubAuth';

export function useAuth() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn()) {
      getUser().then(u => { setUser(u); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (token: string): Promise<boolean> => {
    setLoading(true);
    const u = await loginWithToken(token);
    setUser(u);
    setLoading(false);
    return !!u;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return { user, loading, login, logout, isLoggedIn: !!user };
}
