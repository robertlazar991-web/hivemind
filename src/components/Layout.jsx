import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Home,
  Map,
  Users,
  Calendar,
  Sparkles,
  MessageCircle,
  Settings,
  Bell,
  ChevronLeft,
  Menu,
  Plus,
  LogOut,
  User,
  Pencil
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function Layout() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Current user data
  const currentUser = {
    name: 'Sarah',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    role: 'Hivekeeper',
  };

  // Badge counts
  const badges = {
    connections: 3,
    messages: 2,
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/', end: true },
    { name: 'Hive Map', icon: Map, path: '/community' },
    { name: 'Connections', icon: Users, path: '/connections', badge: badges.connections },
    { name: 'Events', icon: Calendar, path: '/events' },
    { name: 'Collaborate', icon: Sparkles, path: '/collaborate' },
    { name: 'Messages', icon: MessageCircle, path: '/messages', badge: badges.messages },
  ];

  const NavItem = ({ item, mobile = false }) => {
    const Icon = item.icon;

    if (mobile) {
      return (
        <NavLink
          to={item.path}
          end={item.end}
          onClick={() => setMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              isActive
                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span>{item.name}</span>
          {item.badge > 0 && (
            <span className="ml-auto w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
              {item.badge}
            </span>
          )}
        </NavLink>
      );
    }

    return (
      <NavLink
        to={item.path}
        end={item.end}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            isActive
              ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium'
              : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
          } ${sidebarCollapsed ? 'justify-center' : ''}`
        }
        title={sidebarCollapsed ? item.name : undefined}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!sidebarCollapsed && (
          <>
            <span className="flex-1">{item.name}</span>
            {item.badge > 0 && (
              <span className="w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </>
        )}
        {sidebarCollapsed && item.badge > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] rounded-full flex items-center justify-center">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-stone-900 dark:via-stone-900 dark:to-stone-800">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-stone-800 border-r border-amber-100 dark:border-stone-700 z-30 transition-all duration-300 hidden md:flex flex-col ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className={`p-4 border-b border-amber-100 dark:border-stone-700 ${sidebarCollapsed ? 'px-3' : ''}`}>
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  HiveMind
                </h1>
                <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded w-fit">
                  Phase I
                </span>
              </div>
            )}
          </NavLink>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.path} className="relative">
              <NavItem item={item} />
            </div>
          ))}
        </nav>

        {/* Theme Toggle & Settings (Bottom Section) */}
        <div className="p-3 border-t border-amber-100 dark:border-stone-700 space-y-1">
          <ThemeToggle collapsed={sidebarCollapsed} />
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
              } ${sidebarCollapsed ? 'justify-center' : ''}`
            }
            title={sidebarCollapsed ? 'Settings' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </NavLink>
        </div>

        {/* User Profile Card */}
        <div className={`p-3 border-t border-amber-100 dark:border-stone-700 ${sidebarCollapsed ? 'px-2' : ''}`}>
          <div
            ref={profileMenuRef}
            className={`relative ${sidebarCollapsed ? 'flex justify-center' : ''}`}
          >
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`flex items-center gap-3 w-full p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-amber-300 dark:border-amber-500 flex-shrink-0"
              />
              {!sidebarCollapsed && (
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-gray-900 dark:text-stone-100 text-sm truncate">{currentUser.name}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">{currentUser.role}</p>
                </div>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className={`absolute bottom-full mb-2 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-amber-100 dark:border-stone-700 py-2 z-50 ${
                  sidebarCollapsed ? 'left-full ml-2 bottom-0 mb-0' : 'left-0 right-0'
                }`}
                style={{ minWidth: '180px' }}
              >
                <button
                  onClick={() => {
                    navigate('/my-profile');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-700 flex items-center gap-3 transition-colors"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/profile/edit');
                    setProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-700 flex items-center gap-3 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profile
                </button>
                <div className="border-t border-amber-100 dark:border-stone-700 my-1" />
                <button
                  onClick={() => setProfileMenuOpen(false)}
                  className="w-full px-4 py-2.5 text-left text-gray-700 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-700 flex items-center gap-3 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-amber-100 dark:border-stone-700">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all w-full ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                sidebarCollapsed ? 'rotate-180' : ''
              }`}
            />
            {!sidebarCollapsed && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border-b border-amber-200 dark:border-stone-700 sticky top-0 z-20">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
          >
            <Menu className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          </button>

          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              HiveMind
            </h1>
          </NavLink>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors relative">
              <Bell className="w-5 h-5 text-amber-700 dark:text-amber-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </button>
            <button
              onClick={() => navigate('/my-profile')}
              className="relative"
            >
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border-2 border-amber-300 dark:border-amber-500"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/20 dark:bg-black/40 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="md:hidden fixed left-0 top-0 h-full w-72 bg-white dark:bg-stone-800 z-40 shadow-xl">
            {/* Drawer Header */}
            <div className="p-4 border-b border-amber-100 dark:border-stone-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    HiveMind
                  </h1>
                  <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded w-fit">
                    Phase I
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-stone-600 dark:text-stone-300" />
              </button>
            </div>

            {/* Mobile Nav Items */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} mobile />
              ))}
              <div className="border-t border-amber-100 dark:border-stone-700 my-3" />
              <ThemeToggle />
              <NavLink
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
                  }`
                }
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </NavLink>
            </nav>

            {/* Mobile User Card */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-amber-100 dark:border-stone-700 bg-white dark:bg-stone-800">
              <button
                onClick={() => {
                  navigate('/my-profile');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors"
              >
                <img
                  src={currentUser.photo}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 dark:border-amber-500"
                />
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-stone-100">{currentUser.name}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">{currentUser.role}</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Desktop Header (right of sidebar) */}
      <header
        className={`hidden md:block bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm border-b border-amber-200 dark:border-stone-700 sticky top-0 z-20 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="flex items-center justify-end h-14 px-6 gap-3">
          <button className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-colors relative">
            <Bell className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
          </button>
          <button
            onClick={() => navigate('/connections')}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            Invite
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
