import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  BookOpen, Trophy, Play, BarChart3,
  ChevronDown, ChevronRight, Coffee, CheckCircle2,
  Circle, Flame, GraduationCap, Boxes, GitBranch,
  Cpu, TestTube, X
} from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const moduleConfig = [
  { id: 'grundlagen', title: 'Grundlagen', icon: BookOpen, color: 'text-accent-blue',
    topics: [
      { id: 'programmieren', title: 'Programmieren' },
      { id: 'java-sprache', title: 'Die Programmiersprache Java' },
      { id: 'klassenaufbau', title: 'Aufbau einer Java-Klasse' },
      { id: 'binaerzahlen', title: 'Binärzahlen' },
      { id: 'datentypen', title: 'Datentypen' },
      { id: 'datenobjekte', title: 'Datenobjekte' },
      { id: 'zeichenketten', title: 'Zeichenketten' },
      { id: 'operatoren', title: 'Operatoren' },
      { id: 'math-berechnungen', title: 'Math. Berechnungen' },
      { id: 'pseudozufallszahlen', title: 'Pseudozufallszahlen' },
      { id: 'konsolenanwendungen', title: 'Konsolenanwendungen' },
    ]
  },
  { id: 'kontrollstrukturen', title: 'Kontrollstrukturen', icon: GitBranch, color: 'text-accent-green',
    topics: [
      { id: 'verzweigungen', title: 'Verzweigungen' },
      { id: 'schleifen', title: 'Schleifen' },
    ]
  },
  { id: 'datenstrukturen', title: 'Datenstrukturen', icon: Boxes, color: 'text-accent-orange',
    topics: [
      { id: 'arrays', title: 'Arrays / Felder' },
      { id: 'arraylists', title: 'ArrayLists' },
      { id: 'listen', title: 'Listen' },
      { id: 'maps', title: 'Maps' },
      { id: 'baeume', title: 'Bäume' },
    ]
  },
  { id: 'oop', title: 'OOP', icon: GraduationCap, color: 'text-accent-purple',
    topics: [
      { id: 'oop-konzepte', title: 'OOP-Konzepte' },
      { id: 'klassen', title: 'Klassen' },
      { id: 'referenzen-objekte', title: 'Referenzen & Objekte' },
      { id: 'vererbung', title: 'Vererbung' },
      { id: 'polymorphie', title: 'Polymorphie' },
      { id: 'object-klasse', title: 'Die Object-Klasse' },
      { id: 'abstrakt-final', title: 'Abstrakt & Final' },
      { id: 'interfaces', title: 'Interfaces' },
      { id: 'innere-klassen', title: 'Innere Klassen' },
    ]
  },
  { id: 'fortgeschritten', title: 'Fortgeschritten', icon: Cpu, color: 'text-accent-cyan',
    topics: [
      { id: 'java-api', title: 'Java API' },
      { id: 'wrapper-klassen', title: 'Wrapper-Klassen' },
      { id: 'datum-zeit', title: 'Datum & Zeit' },
      { id: 'dateien', title: 'Dateien & Verzeichnisse' },
      { id: 'enums', title: 'Enumerations' },
      { id: 'klassendiagramme', title: 'Klassendiagramme' },
      { id: 'aktivitaetsdiagramme', title: 'Aktivitätsdiagramme' },
      { id: 'komparatoren', title: 'Komparatoren' },
      { id: 'exceptions', title: 'Exceptions' },
      { id: 'records', title: 'Records' },
      { id: 'lombok', title: 'Lombok' },
      { id: 'slf4j', title: 'SLF4J' },
      { id: 'lambdas', title: 'Lambda-Ausdrücke' },
      { id: 'generics', title: 'Generics' },
      { id: 'optionals', title: 'Optionals' },
      { id: 'stream-api', title: 'Stream API' },
      { id: 'io-streams', title: 'IO-Streams' },
    ]
  },
  { id: 'frameworks', title: 'Frameworks & Testing', icon: TestTube, color: 'text-accent-red',
    topics: [
      { id: 'collections-framework', title: 'Collections Framework' },
      { id: 'hashing', title: 'Hashing' },
      { id: 'algorithmen', title: 'Algorithmen' },
      { id: 'gui', title: 'GUI-Grundlagen' },
      { id: 'javafx', title: 'JavaFX' },
      { id: 'softwaretests', title: 'Softwaretests' },
      { id: 'unit-tests', title: 'Unit Tests' },
      { id: 'mockito', title: 'Mockito' },
    ]
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [expandedModules, setExpandedModules] = useState<string[]>(['grundlagen']);
  const location = useLocation();
  const { isTopicCompleted } = useProgress();

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
    );
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="sidebar-mobile-overlay lg:hidden" onClick={onToggle} />
    <aside className="w-72 bg-dark-800 border-r border-dark-600 flex flex-col h-full overflow-hidden shrink-0 sidebar-mobile lg:relative lg:z-auto">
      <div className="p-4 border-b border-dark-600 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-dark-100 hover:text-accent-blue transition-colors">
          <Coffee className="w-6 h-6 text-accent-orange" />
          <span className="text-lg font-bold">JavaPath</span>
        </NavLink>
        <button onClick={onToggle} className="lg:hidden text-dark-400 hover:text-dark-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        <div className="px-3 mb-2">
          <NavLink to="/" className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-dark-700 text-dark-100' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'}`
          }>
            <Flame className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink to="/playground" className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-dark-700 text-dark-100' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'}`
          }>
            <Play className="w-4 h-4" />
            Playground
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-dark-700 text-dark-100' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'}`
          }>
            <BarChart3 className="w-4 h-4" />
            Fortschritt
          </NavLink>
        </div>

        <div className="px-3 py-2">
          <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider px-3">Lernpfad</span>
        </div>

        {moduleConfig.map(module => {
          const isExpanded = expandedModules.includes(module.id);
          const Icon = module.icon;
          const completedCount = module.topics.filter(t => isTopicCompleted(t.id)).length;
          const progress = Math.round((completedCount / module.topics.length) * 100);

          return (
            <div key={module.id} className="px-3 mb-1">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-dark-700/50 transition-colors group"
              >
                <Icon className={`w-4 h-4 ${module.color}`} />
                <span className="flex-1 text-left text-dark-200 font-medium">{module.title}</span>
                <span className="text-xs text-dark-500">{completedCount}/{module.topics.length}</span>
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 text-dark-500" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-dark-500" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-4 border-l border-dark-600 pl-2 mt-1 mb-2">
                  {module.topics.map(topic => {
                    const completed = isTopicCompleted(topic.id);
                    const isActive = location.pathname === `/learn/${module.id}/${topic.id}`;
                    return (
                      <NavLink
                        key={topic.id}
                        to={`/learn/${module.id}/${topic.id}`}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                          isActive ? 'bg-accent-blue/10 text-accent-blue' :
                          completed ? 'text-accent-green/70 hover:text-accent-green' :
                          'text-dark-400 hover:text-dark-200 hover:bg-dark-700/30'
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent-green shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-dark-500 shrink-0" />
                        )}
                        <span className="truncate">{topic.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}

              {progress > 0 && (
                <div className="mx-3 mb-2">
                  <div className="h-1 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-green rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="px-3 py-2 mt-2">
          <span className="text-xs font-semibold text-dark-500 uppercase tracking-wider px-3">Prüfung</span>
        </div>
        <div className="px-3">
          <NavLink to="/exam/java1" className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-dark-700 text-dark-100' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'}`
          }>
            <Trophy className="w-4 h-4 text-accent-orange" />
            Klausur Java 1
          </NavLink>
          <NavLink to="/exam/java2" className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-dark-700 text-dark-100' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'}`
          }>
            <Trophy className="w-4 h-4 text-accent-purple" />
            Klausur Java 2
          </NavLink>
        </div>
      </nav>
    </aside>
    </>
  );
}

export { moduleConfig };
