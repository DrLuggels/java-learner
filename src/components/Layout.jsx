import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold text-white">Java Mastery</span>
          </Link>
          <nav className="flex gap-3">
            <NavLink to="/" active={isHome}>Dashboard</NavLink>
            <NavLink to="/schwaechen" active={location.pathname === '/schwaechen'}>
              Schwächen
            </NavLink>
            <NavLink to="/playground" active={location.pathname === '/playground'}>
              Playground
            </NavLink>
            <NavLink to="/klausur" active={location.pathname === '/klausur'}>
              Klausur
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {children}
      </main>
      <footer className="bg-slate-800 border-t border-slate-700 py-3 text-center text-sm text-slate-500">
        Java Mastery — Klausurvorbereitung Programmierung I
      </footer>
    </div>
  )
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium no-underline transition-colors ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  )
}
