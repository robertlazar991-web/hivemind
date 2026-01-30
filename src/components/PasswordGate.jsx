import { useState, useEffect } from 'react';

const CORRECT_PASSWORD = 'hivemind2026';
const STORAGE_KEY = 'hivemind_access';

function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const accessGranted = localStorage.getItem(STORAGE_KEY) === 'granted';
    setIsAuthenticated(accessGranted);
    setIsLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password === CORRECT_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'granted');
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  // Show nothing while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-pulse text-amber-600 text-xl">Loading...</div>
      </div>
    );
  }

  // If authenticated, show the app
  if (isAuthenticated) {
    return children;
  }

  // Show password gate
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-4xl">🐝</span>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              HiveMind
            </h1>
          </div>
          <p className="text-gray-600">This site is in private beta</p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Enter password to continue
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Password"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            Enter
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Contact the HiveMind team for access
        </p>
      </div>
    </div>
  );
}

export default PasswordGate;
