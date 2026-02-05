import { Settings as SettingsIcon, Bell, Lock, User, Palette, Globe, HelpCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Settings() {
  const { isDark, toggleTheme } = useTheme();

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', description: 'Update your name, photo, and bio' },
        { label: 'Hive Details', description: 'Manage your community information' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Choose what emails you receive' },
        { label: 'Push Notifications', description: 'Manage mobile and browser alerts' },
      ],
    },
    {
      title: 'Privacy',
      icon: Lock,
      items: [
        { label: 'Profile Visibility', description: 'Control who can see your profile' },
        { label: 'Connection Requests', description: 'Manage who can send you requests' },
      ],
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Display Density', description: 'Adjust content spacing' },
      ],
      customContent: (
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-amber-50 dark:border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-stone-700 flex items-center justify-center">
              {isDark ? (
                <Moon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              ) : (
                <Sun className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-stone-100">Theme</p>
              <p className="text-sm text-gray-500 dark:text-stone-400">
                {isDark ? 'Dark mode enabled' : 'Light mode enabled'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              isDark ? 'bg-amber-500' : 'bg-stone-300 dark:bg-stone-600'
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                isDark ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      ),
    },
    {
      title: 'Language & Region',
      icon: Globe,
      items: [
        { label: 'Language', description: 'Select your preferred language' },
        { label: 'Timezone', description: 'Set your local timezone' },
      ],
    },
    {
      title: 'Help & Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', description: 'Browse FAQs and guides' },
        { label: 'Contact Support', description: 'Get help from our team' },
      ],
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-stone-100">Settings</h1>
        </div>
        <p className="text-gray-600 dark:text-stone-400">Manage your account preferences and application settings</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4 sm:space-y-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-amber-100 dark:border-stone-700 overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-4 border-b border-amber-100 dark:border-stone-700 flex items-center gap-3">
                <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h2 className="font-semibold text-gray-900 dark:text-stone-100">{section.title}</h2>
              </div>
              <div className="divide-y divide-amber-50 dark:divide-stone-700">
                {section.customContent}
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-amber-50/50 dark:hover:bg-stone-700/50 transition-colors text-left"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-stone-100">{item.label}</p>
                      <p className="text-sm text-gray-500 dark:text-stone-400">{item.description}</p>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 dark:text-stone-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <div className="mt-6 sm:mt-8 bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/50 overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20">
          <h2 className="font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
        </div>
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-medium text-gray-900 dark:text-stone-100">Delete Account</p>
              <p className="text-sm text-gray-500 dark:text-stone-400">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm whitespace-nowrap">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Settings;
