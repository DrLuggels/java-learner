import { useState } from 'react';
import { X, Github, ExternalLink, Shield, ClipboardPaste } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (token: string) => Promise<boolean>;
}

const TOKEN_URL = 'https://github.com/settings/tokens/new?description=JavaPath&scopes=gist';

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) { setError('Bitte Token einfügen'); return; }
    setLoading(true);
    setError('');
    const success = await onLogin(token.trim());
    setLoading(false);
    if (success) {
      onClose();
    } else {
      setError('Ungültiger Token. Prüfe den Token und versuche es erneut.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.startsWith('ghp_') || text.startsWith('github_pat_')) {
        setToken(text);
        setError('');
      } else if (text.trim()) {
        setToken(text.trim());
      }
    } catch {
      // Clipboard API not available, user can paste manually
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-dark-800 border border-dark-600 rounded-xl w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-dark-600">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-dark-200" />
            <h2 className="text-lg font-semibold text-dark-100">Mit GitHub verbinden</h2>
          </div>
          <button onClick={onClose} className="text-dark-400 hover:text-dark-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Step 1: Generate Token */}
          <div className={`rounded-lg border p-3 transition-colors ${step === 1 ? 'border-accent-blue/40 bg-accent-blue/5' : 'border-dark-600 bg-dark-700/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue text-xs font-bold flex items-center justify-center">1</span>
              <span className="text-sm font-medium text-dark-100">Token erstellen</span>
            </div>
            <a
              href={TOKEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-dark-900 hover:bg-dark-700 border border-dark-500 rounded-lg text-sm text-dark-100 font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              Token auf GitHub erstellen
              <ExternalLink className="w-3.5 h-3.5 text-dark-400" />
            </a>
            <p className="text-xs text-dark-500 mt-2 text-center">Alles ist vorausgefüllt — einfach "Generate token" klicken</p>
          </div>

          {/* Step 2: Paste Token */}
          <div className={`rounded-lg border p-3 transition-colors ${step === 2 ? 'border-accent-green/40 bg-accent-green/5' : 'border-dark-600 bg-dark-700/30'}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${step === 2 ? 'bg-accent-green/20 text-accent-green' : 'bg-dark-600 text-dark-400'}`}>2</span>
              <span className="text-sm font-medium text-dark-100">Token einfügen</span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="password"
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  placeholder="ghp_xxxx..."
                  className="flex-1 bg-dark-900 border border-dark-600 rounded-lg px-3 py-2 text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:border-accent-green/50"
                  autoFocus={step === 2}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="px-3 py-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg text-dark-300 transition-colors"
                  title="Aus Zwischenablage einfügen"
                >
                  <ClipboardPaste className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-accent-red text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading || !token.trim()}
                className="w-full bg-accent-green hover:bg-accent-green/80 disabled:opacity-30 text-dark-900 font-semibold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full" />
                ) : (
                  <Github className="w-4 h-4" />
                )}
                {loading ? 'Verbinden...' : 'Verbinden'}
              </button>
            </form>
          </div>

          <div className="flex items-center gap-2 text-xs text-dark-500">
            <Shield className="w-3 h-3 shrink-0" />
            <span>Token bleibt lokal. Nur Gist-Zugriff, kein Repo-Zugriff.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
