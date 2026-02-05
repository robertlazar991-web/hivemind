import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import PropTypes from 'prop-types';

function ThemeToggle({ collapsed = false, showLabel = true }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 ${
        collapsed ? 'justify-center' : ''
      }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`w-5 h-5 absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      {!collapsed && showLabel && (
        <span className="text-sm">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      )}
    </button>
  );
}

ThemeToggle.propTypes = {
  collapsed: PropTypes.bool,
  showLabel: PropTypes.bool,
};

export default ThemeToggle;
