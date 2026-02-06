import { useState } from 'react';
import { Menu, Bot, Flame, Github, LogOut, User } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import { useAuth } from '../../hooks/useAuth';
import LoginModal from '../auth/LoginModal';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleCopilot: () => void;
  copilotOpen: boolean;
}

export default function Header({ onToggleSidebar, onToggleCopilot, copilotOpen }: HeaderProps) {
  const { progress } = useProgress();
  const { user, login, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className="h-12 bg-dark-800 border-b border-dark-600 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="text-dark-400 hover:text-dark-200 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm text-dark-400">
            <Flame className="w-4 h-4 text-accent-orange" />
            <span>{progress.streakDays} Tage Streak</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-sm text-dark-400 mr-4">
            <span className="text-dark-300 font-medium">{progress.completedTopics.length}</span>
            <span>Themen abgeschlossen</span>
          </div>
          <button
            onClick={onToggleCopilot}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
              copilotOpen
                ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30'
                : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-sm text-dark-300">
                <img src={user.avatar_url} alt={user.login} className="w-5 h-5 rounded-full" />
                <span className="hidden sm:inline">{user.login}</span>
              </div>
              <button
                onClick={logout}
                className="text-dark-400 hover:text-accent-red transition-colors p-1.5"
                title="Abmelden"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-dark-400 hover:text-dark-200 hover:bg-dark-700 transition-all"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
          )}
          <a
            href="https://github.com/DrLuggels/java-learner"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-400 hover:text-dark-200 transition-colors p-1.5"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </header>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={login} />}
    </>
  );
}
