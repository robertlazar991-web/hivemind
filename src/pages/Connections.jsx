import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

// Get relative time
const getLastActive = (daysAgo) => {
  if (daysAgo === 0) return 'Active now';
  if (daysAgo === 1) return 'Last active yesterday';
  if (daysAgo < 7) return `Last active ${daysAgo} days ago`;
  return `Last active ${Math.floor(daysAgo / 7)} week${daysAgo >= 14 ? 's' : ''} ago`;
};

// Get relative time for requests
const getTimeAgo = (days) => {
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};

function Connections() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [requestFilter, setRequestFilter] = useState('all');

  // Handle smooth scroll to section on load or hash change
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure page is rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  // Pending requests - now with type differentiation
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      type: 'connection',
      name: 'Luna Morales',
      message: "Your work on conscious leadership resonates deeply with my art integration practice. I'd love to explore collaboration opportunities around creative expression and community building.",
      receivedDays: 2,
    },
    {
      id: 2,
      type: 'cross-pollination',
      name: 'David Rivera',
      eventTitle: 'Full Moon Gathering',
      eventDate: 'Feb 1, 2026',
      message: "I'd love to share this with my community, it aligns perfectly with our values around earth-based practices and seasonal celebrations.",
      receivedDays: 3,
    },
    {
      id: 3,
      type: 'connection',
      name: 'Jordan Ellis',
      message: "I've been following your community's growth and love what you're building. Would love to connect and share experiences about growing conscious communities.",
      receivedDays: 3,
    },
    {
      id: 4,
      type: 'cross-pollination',
      name: 'River Stone',
      eventTitle: 'Mindfulness Morning',
      eventDate: 'Feb 2, 2026',
      message: "This would be perfect for my land-based community. Many of my members are looking for mindfulness practices to complement our outdoor work.",
      receivedDays: 5,
    },
    {
      id: 5,
      type: 'connection',
      name: 'Priya Sharma',
      message: "Fellow earth-based practitioner here! I noticed we share similar values around land connection and ceremony. Let's connect and explore synergies.",
      receivedDays: 6,
    },
  ]);

  // Connected hivekeepers (using existing data)
  const connectedHivekeepers = [
    { ...hivekeepers.find(h => h.name === 'Maya Chen'), lastActiveDays: 0, connectedSince: '2024-06' },
    { ...hivekeepers.find(h => h.name === 'Sarah Johnson'), lastActiveDays: 2, connectedSince: '2024-05' },
    { ...hivekeepers.find(h => h.name === 'Alex Kim'), lastActiveDays: 4, connectedSince: '2024-09' },
    { ...hivekeepers.find(h => h.name === 'Marcus Thompson'), lastActiveDays: 1, connectedSince: '2024-07' },
    { ...hivekeepers.find(h => h.name === 'Amara Okafor'), lastActiveDays: 0, connectedSince: '2024-04' },
    { ...hivekeepers.find(h => h.name === 'Kai Nakamura'), lastActiveDays: 6, connectedSince: '2024-11' },
  ].filter(Boolean);

  // Active collaborations (cross-pollinations only, removed co-hosting)
  const [activeCollaborations] = useState([
    {
      id: 1,
      type: 'cross-pollination',
      typeLabel: '🐝 Cross-pollination',
      partnerName: 'Maya Chen',
      title: 'Mindfulness & Breathwork Workshop',
      status: 'Event scheduled for Feb 15',
      statusColor: 'text-green-700 bg-green-100',
    },
    {
      id: 2,
      type: 'cross-pollination',
      typeLabel: '🐝 Cross-pollination',
      partnerName: 'Sarah Johnson',
      title: 'Full Moon Ceremony',
      status: 'In planning phase',
      statusColor: 'text-amber-700 bg-amber-100',
    },
  ]);

  // Cross-pollination history data
  const pollinationHistory = {
    shared: [
      { id: 1, eventTitle: 'Morning Meditation', hostName: 'Maya Chen', date: 'Jan 28' },
      { id: 2, eventTitle: 'Permaculture Workshop', hostName: 'David Rivera', date: 'Jan 20' },
      { id: 3, eventTitle: 'Sound Bath Experience', hostName: 'Jordan Ellis', date: 'Jan 15' },
      { id: 4, eventTitle: 'Herbal Medicine Making', hostName: 'Amara Okafor', date: 'Jan 10' },
    ],
    received: [
      { id: 1, eventTitle: 'Full Moon Gathering', sharerName: 'Luna Morales', date: 'Jan 26' },
      { id: 2, eventTitle: 'Leadership Circle', sharerName: 'Marcus Thompson', date: 'Jan 22' },
      { id: 3, eventTitle: 'Breathwork Session', sharerName: 'Sarah Johnson', date: 'Jan 18' },
      { id: 4, eventTitle: 'Conscious Tech Meetup', sharerName: 'Alex Kim', date: 'Jan 12' },
    ],
  };

  // Filter counts
  const connectionRequests = pendingRequests.filter(r => r.type === 'connection');
  const crossPollinationRequests = pendingRequests.filter(r => r.type === 'cross-pollination');

  // Filter pending requests
  const filteredRequests = pendingRequests.filter(request => {
    if (requestFilter === 'all') return true;
    return request.type === requestFilter;
  });

  // Filter connected hivekeepers by search
  const filteredConnections = connectedHivekeepers.filter(keeper =>
    keeper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    keeper.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    keeper.hives?.some(h => h.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle accepting a request
  const handleAccept = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    // In a real app, this would add them to connected list or confirm cross-pollination
  };

  // Handle declining a request
  const handleDecline = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Get hivekeeper by name
  const getHivekeeperByName = (name) => {
    return hivekeepers.find(h => h.name === name) || null;
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back to Dashboard */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-amber-600 hover:text-amber-800 mb-4 transition-colors text-sm"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Connections</h1>
        <p className="text-amber-700 mt-1 text-sm sm:text-base">Your network of fellow Hivekeepers</p>
      </div>

      {/* Pending Requests Section */}
      <section id="pending-requests" className="mb-10 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Pending Requests
            {pendingRequests.length > 0 && (
              <span className="ml-2 px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {pendingRequests.length}
              </span>
            )}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
          <button
            onClick={() => setRequestFilter('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              requestFilter === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All ({pendingRequests.length})
          </button>
          <button
            onClick={() => setRequestFilter('connection')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
              requestFilter === 'connection'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>🤝</span>
            Connections ({connectionRequests.length})
          </button>
          <button
            onClick={() => setRequestFilter('cross-pollination')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
              requestFilter === 'cross-pollination'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>🐝</span>
            Cross-pollinations ({crossPollinationRequests.length})
          </button>
        </div>

        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map(request => {
              const requester = getHivekeeperByName(request.name);
              const primaryHive = requester?.hives?.[0];
              const isConnection = request.type === 'connection';

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden"
                >
                  {/* Type Badge Header */}
                  <div className={`px-5 py-2 ${isConnection ? 'bg-green-50' : 'bg-orange-100'}`}>
                    <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold ${isConnection ? 'text-green-700' : 'text-orange-700'}`}>
                      <span>{isConnection ? '🤝' : '🐝'}</span>
                      {isConnection ? 'CONNECTION REQUEST' : 'CROSS-POLLINATION REQUEST'}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Profile */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        {requester && (
                          <img
                            src={requester.photo}
                            alt={requester.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-amber-200 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => navigate(`/profile/${requester.id}`)}
                          />
                        )}
                        <div className="sm:hidden">
                          <h3 className="font-semibold text-gray-900">{request.name}</h3>
                          {primaryHive && (
                            <p className="text-sm text-amber-600">{primaryHive.name}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-0.5">{getTimeAgo(request.receivedDays)}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="hidden sm:flex sm:items-start sm:justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.name}</h3>
                            {primaryHive && (
                              <p className="text-sm text-amber-600">{primaryHive.name}</p>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 flex-shrink-0">
                            {getTimeAgo(request.receivedDays)}
                          </p>
                        </div>

                        {/* Cross-pollination specific: Event info */}
                        {!isConnection && request.eventTitle && (
                          <div className="mb-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                            <p className="text-xs text-orange-600 font-medium mb-1">Wants to share with their hive:</p>
                            <div className="flex items-center gap-2">
                              <span>📅</span>
                              <span className="font-semibold text-gray-900">"{request.eventTitle}"</span>
                              <span className="text-sm text-gray-500">({request.eventDate})</span>
                            </div>
                          </div>
                        )}

                        <p className="text-gray-600 text-sm mb-4 italic">"{request.message}"</p>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(request.id)}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => requester && navigate(`/profile/${requester.id}`)}
                            className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all"
                          >
                            View Profile
                          </button>
                          {!isConnection && (
                            <button
                              onClick={() => navigate('/events')}
                              className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all"
                            >
                              View Event
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 text-center">
            <p className="text-gray-500">
              {requestFilter === 'all'
                ? 'No pending requests'
                : requestFilter === 'connection'
                  ? 'No pending connection requests'
                  : 'No pending cross-pollination requests'}
            </p>
          </div>
        )}
      </section>

      {/* Connected Hivekeepers Section */}
      <section id="connected" className="mb-10 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Connected
            <span className="ml-2 px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {connectedHivekeepers.length}
            </span>
          </h2>

          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map(keeper => {
            const primaryHive = keeper.hives?.[0];

            return (
              <div
                key={keeper.id}
                className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={keeper.photo}
                    alt={keeper.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/profile/${keeper.id}`)}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{keeper.name}</h3>
                    {primaryHive && (
                      <p className="text-sm text-amber-600 truncate">{primaryHive.name}</p>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      <span className="truncate">{keeper.location}</span>
                    </div>
                  </div>
                </div>

                <p className={`text-xs mb-4 ${keeper.lastActiveDays === 0 ? 'text-green-600' : 'text-gray-400'}`}>
                  {getLastActive(keeper.lastActiveDays)}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/messages')}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Message
                  </button>
                  <button
                    onClick={() => navigate(`/profile/${keeper.id}`)}
                    className="flex-1 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all"
                  >
                    Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredConnections.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 text-center">
            <p className="text-gray-500">No connections found matching "{searchQuery}"</p>
          </div>
        )}
      </section>

      {/* Active Collaborations Section */}
      <section id="collaborations" className="scroll-mt-20 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Active Collaborations
            {activeCollaborations.length > 0 && (
              <span className="ml-2 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {activeCollaborations.length}
              </span>
            )}
          </h2>
        </div>

        {activeCollaborations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCollaborations.map(collab => {
              const partner = getHivekeeperByName(collab.partnerName);

              return (
                <div
                  key={collab.id}
                  className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6"
                >
                  {/* Type Badge */}
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mb-3">
                    {collab.typeLabel}
                  </span>

                  <h3 className="font-bold text-gray-900 mb-3">{collab.title}</h3>

                  {/* Partner */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-500">With:</span>
                    {partner && (
                      <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => navigate(`/profile/${partner.id}`)}
                      >
                        <img
                          src={partner.photo}
                          alt={partner.name}
                          className="w-8 h-8 rounded-full object-cover border border-amber-200"
                        />
                        <span className="text-sm font-medium text-amber-700 hover:text-amber-800">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${collab.statusColor}`}>
                      {collab.status}
                    </span>
                    <button
                      className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-all"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-8 text-center">
            <p className="text-gray-500 mb-4">No active collaborations yet.</p>
            <button
              onClick={() => navigate('/collaborate')}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
            >
              Visit Collaboration Board
            </button>
          </div>
        )}
      </section>

      {/* Cross-pollination History Section */}
      <section id="pollination-history" className="scroll-mt-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🐝</span>
            Cross-pollination History
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Events You Shared */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">📤</span>
                You shared
              </h3>
              <div className="space-y-2">
                {pollinationHistory.shared.map(item => {
                  const host = getHivekeeperByName(item.hostName);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors cursor-pointer"
                      onClick={() => host && navigate(`/profile/${host.id}`)}
                    >
                      {host && (
                        <img
                          src={host.photo}
                          alt={host.name}
                          className="w-8 h-8 rounded-full object-cover border border-amber-200"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          <span className="font-medium">{item.hostName}'s</span> "{item.eventTitle}"
                        </p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events Shared to Your Hive */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">📥</span>
                Shared to your hive
              </h3>
              <div className="space-y-2">
                {pollinationHistory.received.map(item => {
                  const sharer = getHivekeeperByName(item.sharerName);
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer"
                      onClick={() => sharer && navigate(`/profile/${sharer.id}`)}
                    >
                      {sharer && (
                        <img
                          src={sharer.photo}
                          alt={sharer.name}
                          className="w-8 h-8 rounded-full object-cover border border-green-200"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">
                          <span className="font-medium">{item.sharerName}</span> shared your "{item.eventTitle}"
                        </p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Connections;
