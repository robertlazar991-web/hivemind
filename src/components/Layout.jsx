import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-amber-700 font-medium'
      : 'text-amber-600 hover:text-amber-900 transition-colors';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                HiveMind
              </h1>
            </NavLink>
            <nav className="flex items-center gap-6">
              <NavLink to="/" className={navLinkClass} end>
                Dashboard
              </NavLink>
              <NavLink to="/community" className={navLinkClass}>
                Community
              </NavLink>
              <NavLink to="/events" className={navLinkClass}>
                Events
              </NavLink>
              <NavLink to="/resources" className={navLinkClass}>
                Resources
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
