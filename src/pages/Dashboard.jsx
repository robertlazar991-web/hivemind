import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

function Dashboard() {
  const navigate = useNavigate();

  // Current user data (Layer 1 Hivekeeper)
  const currentUser = {
    name: 'Saya',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    hiveName: 'Consciousness Collective',
    hiveSize: 'Growing',
    hivePlatform: 'Skool',
    hiveLink: 'https://skool.com/consciousness-collective',
  };

  // Hive size categories
  const hiveSizeInfo = {
    Seedling: { label: 'Under 50 members', color: 'text-emerald-600' },
    Growing: { label: '50-150 members', color: 'text-blue-600' },
    Thriving: { label: '150-500 members', color: 'text-purple-600' },
    Flourishing: { label: '500-1,500 members', color: 'text-amber-600' },
    Established: { label: '1,500+ members', color: 'text-orange-600' },
  };

  // Connected hivekeepers (sample data)
  const connectedHivekeepers = hivekeepers.slice(0, 5);
  const totalConnected = 12;

  // Stats
  const stats = {
    connectedHivekeepers: 12,
    pendingRequests: 3,
    crossPollinations: 2,
  };

  // Recent activity (leader-relevant)
  const recentActivity = [
    {
      type: 'connection_request',
      user: hivekeepers[0], // Maya Chen
      action: 'sent you a connection request',
      time: '2 hours ago',
      icon: '🤝',
    },
    {
      type: 'cross_pollination',
      user: hivekeepers[1], // David Rivera
      action: 'proposed a cross-pollination',
      time: '5 hours ago',
      icon: '🐝',
    },
    {
      type: 'event',
      user: hivekeepers[2], // Sarah Johnson
      action: 'created an event: Full Moon Gathering',
      time: '1 day ago',
      icon: '📅',
    },
    {
      type: 'success',
      user: hivekeepers[4], // Luna Morales
      action: 'Your cross-pollination was successful',
      time: '2 days ago',
      icon: '✨',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <img
            src={currentUser.photo}
            alt={currentUser.name}
            className="w-14 h-14 rounded-full object-cover border-3 border-amber-400"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-amber-700 font-medium">My Hive: {currentUser.hiveName}</span>
              <span className="text-gray-400">•</span>
              <span className={`font-medium ${hiveSizeInfo[currentUser.hiveSize].color}`}>
                {currentUser.hiveSize}
              </span>
              <span className="text-gray-400">•</span>
              <a
                href={currentUser.hiveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <span>🔗</span>
                <span className="underline">{currentUser.hivePlatform}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Connected Hivekeepers</h3>
            <span className="text-2xl">🤝</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.connectedHivekeepers}</p>
          <p className="text-sm text-gray-500 mt-1">Leader-to-leader connections</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Pending Requests</h3>
            <span className="text-2xl">📬</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingRequests}</p>
          <p className="text-sm text-amber-600 mt-1">Awaiting your response</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Cross-pollinations</h3>
            <span className="text-2xl">🐝</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.crossPollinations}</p>
          <p className="text-sm text-green-600 mt-1">Active partnerships</p>
        </div>
      </div>

      {/* My Hive Partners Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">My Hive Partners</h3>
          <button
            onClick={() => navigate('/community')}
            className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 transition-colors"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {connectedHivekeepers.map((keeper, index) => (
              <img
                key={keeper.id}
                src={keeper.photo}
                alt={keeper.name}
                title={keeper.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white cursor-pointer hover:scale-110 hover:z-10 transition-transform"
                style={{ zIndex: connectedHivekeepers.length - index }}
                onClick={() => navigate(`/profile/${keeper.id}`)}
              />
            ))}
            {totalConnected > connectedHivekeepers.length && (
              <div
                className="w-12 h-12 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center cursor-pointer hover:bg-amber-200 transition-colors"
                onClick={() => navigate('/community')}
              >
                <span className="text-amber-700 font-medium text-sm">
                  +{totalConnected - connectedHivekeepers.length}
                </span>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm">
            Leaders you've connected with for collaboration and cross-pollination
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer"
                onClick={() => activity.user && navigate(`/profile/${activity.user.id}`)}
              >
                <div className="relative">
                  {activity.user ? (
                    <img
                      src={activity.user.photo}
                      alt={activity.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                      {activity.icon}
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    {activity.user && (
                      <span className="font-medium">{activity.user.name} </span>
                    )}
                    {activity.action}
                  </p>
                  <p className="text-sm text-amber-600">{activity.time}</p>
                </div>
                {activity.type === 'connection_request' && (
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
                      Accept
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all">
                      Decline
                    </button>
                  </div>
                )}
                {activity.type === 'cross_pollination' && (
                  <button className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all">
                    View
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/community')}
              className="w-full p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
            >
              <span>🗺️</span>
              Explore Hivekeepers
            </button>
            <button
              onClick={() => navigate('/events')}
              className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all flex items-center justify-center gap-2"
            >
              <span>📅</span>
              Create Event
            </button>
            <button
              onClick={() => navigate('/collaborate')}
              className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all flex items-center justify-center gap-2"
            >
              <span>🐝</span>
              Request Cross-pollination
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all flex items-center justify-center gap-2 relative"
            >
              <span>💬</span>
              Messages
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => navigate('/profile/edit')}
              className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all flex items-center justify-center gap-2"
            >
              <span>✏️</span>
              Update My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Hive Size Legend */}
      <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <h4 className="font-semibold text-gray-900 mb-3">Hive Size Categories</h4>
        <div className="flex flex-wrap gap-4">
          {Object.entries(hiveSizeInfo).map(([size, info]) => (
            <div key={size} className="flex items-center gap-2">
              <span className={`font-medium ${info.color}`}>{size}</span>
              <span className="text-gray-500 text-sm">({info.label})</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
