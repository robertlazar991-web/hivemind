import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-amber-700 font-medium'
      : 'text-amber-600 hover:text-amber-900 transition-colors';

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition-colors ${
      isActive
        ? 'bg-amber-100 text-amber-700 font-medium'
        : 'text-gray-700 hover:bg-amber-50'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <NavLink to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                HiveMind
              </h1>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={navLinkClass} end>
                Dashboard
              </NavLink>
              <NavLink to="/community" className={navLinkClass}>
                Community
              </NavLink>
              <NavLink to="/events" className={navLinkClass}>
                Events
              </NavLink>
              <NavLink to="/messages" className={({ isActive }) =>
                `relative ${isActive
                  ? 'text-amber-700 font-medium'
                  : 'text-amber-600 hover:text-amber-900 transition-colors'}`
              }>
                Messages
                <span className="absolute -top-1 -right-3 w-2 h-2 bg-orange-500 rounded-full" />
              </NavLink>
              <NavLink to="/visions" className={navLinkClass}>
                Visions
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors relative"
            >
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              {/* Notification dot for messages */}
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-100 bg-white/95 backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                end
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span>🏠</span>
                  Dashboard
                </span>
              </NavLink>
              <NavLink
                to="/community"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span>🗺️</span>
                  Community
                </span>
              </NavLink>
              <NavLink
                to="/events"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span>📅</span>
                  Events
                </span>
              </NavLink>
              <NavLink
                to="/messages"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-amber-100 text-amber-700 font-medium'
                      : 'text-gray-700 hover:bg-amber-50'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <span>💬</span>
                    Messages
                  </span>
                  <span className="w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    1
                  </span>
                </span>
              </NavLink>
              <NavLink
                to="/visions"
                className={mobileNavLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <span>✨</span>
                  Visions
                </span>
              </NavLink>
            </nav>
          </div>
        )}
      </header>

      <Outlet />
    </div>
  );
}

export default Layout;
