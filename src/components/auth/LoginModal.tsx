import { useState } from 'react';
import { X, Github, Key, ExternalLink, Shield, Cloud } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (token: string) => Promise<boolean>;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) { setError('Bitte Token eingeben'); return; }
    setLoading(true);
    setError('');
    const success = await onLogin(token.trim());
    setLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Ungültiger Token. Bitte prüfe den Token und versuche es erneut.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-800 border border-dark-600 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-dark-600">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-dark-200" />
            <h2 className="text-lg font-semibold text-dark-100">GitHub Login</h2>
          </div>
          <button onClick={onClose} className="text-dark-400 hover:text-dark-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-dark-700/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-accent-blue text-sm font-medium">
              <Cloud className="w-4 h-4" />
              Warum einloggen?
            </div>
            <ul className="text-sm text-dark-300 space-y-1">
              <li>• Fortschritt über Geräte hinweg synchronisieren</li>
              <li>• Code und Lösungen in der Cloud speichern</li>
              <li>• Lernstatistiken dauerhaft sichern</li>
            </ul>
          </div>

          <div className="bg-dark-700/50 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-accent-green text-sm font-medium">
              <Key className="w-4 h-4" />
              So erstellst du einen Token:
            </div>
            <ol className="text-sm text-dark-300 space-y-1 list-decimal list-inside">
              <li>Öffne <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline inline-flex items-center gap-1">GitHub Token Einstellungen <ExternalLink className="w-3 h-3" /></a></li>
              <li>Name: <code className="bg-dark-600 px-1 rounded text-xs">JavaPath</code></li>
              <li>Scope: Nur <code className="bg-dark-600 px-1 rounded text-xs">gist</code> auswählen</li>
              <li>Token generieren und hier einfügen</li>
            </ol>
          </div>

          <div className="flex items-center gap-2 text-xs text-dark-400">
            <Shield className="w-3 h-3" />
            <span>Der Token wird nur lokal gespeichert und nur für Gist-Zugriff verwendet.</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="password"
                value={token}
                onChange={e => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-accent-blue"
                autoFocus
              />
              {error && <p className="text-accent-red text-xs mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-blue hover:bg-accent-blue/80 disabled:opacity-50 text-white font-medium py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              {loading ? 'Anmelden...' : 'Mit Token anmelden'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
