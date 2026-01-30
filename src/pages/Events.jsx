import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

// Helper to get hivekeeper by name
const getHostByName = (name) => {
  return hivekeepers.find(h => h.name === name) || null;
};

// Category configuration
const categoryConfig = {
  'hivekeeper-only': {
    icon: '🔒',
    label: 'Hivekeeper Only',
    shortLabel: 'Hivekeeper',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  'cross-pollination': {
    icon: '🐝',
    label: 'Open for Cross-pollination',
    shortLabel: 'Cross-pollination',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  'open': {
    icon: '🌍',
    label: 'Open Event',
    shortLabel: 'Open',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
};

function Events() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showCrossPollinateModal, setShowCrossPollinateModal] = useState(null);
  const [interestedEvents, setInterestedEvents] = useState([]);
  const [crossPollinationMessage, setCrossPollinationMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  // Form state for creating events
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'Workshop',
    category: 'cross-pollination',
    isOnline: false,
    description: '',
    crossPollinationSpots: 5,
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Full Moon Gathering',
      date: 'Feb 1, 2026',
      time: '7:00 PM',
      location: 'Riverside Park, Portland',
      host: 'Sarah Johnson',
      type: 'Ceremony',
      isOnline: false,
      category: 'cross-pollination',
      crossPollinationSpots: 5,
      interestedHives: 3,
      interestedHivekeepers: ['Maya Chen', 'David Rivera', 'Luna Morales'],
      description: 'Join us for a sacred full moon ceremony where we\'ll gather in circle to honor the lunar cycle, set intentions, and connect with our community. Bring a blanket, journal, and an open heart.',
    },
    {
      id: 2,
      title: 'Mindfulness Morning',
      date: 'Feb 2, 2026',
      time: '6:30 AM',
      location: 'Zoom',
      host: 'Maya Chen',
      type: 'Meditation',
      isOnline: true,
      category: 'cross-pollination',
      crossPollinationSpots: 8,
      interestedHives: 5,
      interestedHivekeepers: ['Sarah Johnson', 'Alex Kim', 'Priya Sharma', 'Kai Nakamura', 'Jordan Ellis'],
      description: 'Start your day with guided meditation and breathwork. This online session is perfect for beginners and experienced practitioners alike. We\'ll explore various mindfulness techniques to cultivate inner peace.',
    },
    {
      id: 3,
      title: 'Permaculture Workshop',
      date: 'Feb 5, 2026',
      time: '10:00 AM',
      location: 'Community Garden, Austin',
      host: 'David Rivera',
      type: 'Workshop',
      isOnline: false,
      category: 'open',
      crossPollinationSpots: 0,
      interestedHives: 0,
      interestedHivekeepers: [],
      description: 'Learn the fundamentals of permaculture design in this hands-on workshop. We\'ll cover soil health, companion planting, water management, and creating sustainable food systems in urban environments.',
    },
    {
      id: 4,
      title: 'Sound Bath Experience',
      date: 'Feb 8, 2026',
      time: '5:00 PM',
      location: 'Healing Center, Nashville',
      host: 'Jordan Ellis',
      type: 'Healing',
      isOnline: false,
      category: 'cross-pollination',
      crossPollinationSpots: 4,
      interestedHives: 2,
      interestedHivekeepers: ['River Stone', 'Luna Morales'],
      description: 'Immerse yourself in healing vibrations during this transformative sound bath. Using crystal singing bowls, gongs, and other instruments, we\'ll create a sonic journey for deep relaxation and restoration.',
    },
    {
      id: 5,
      title: 'Conscious Leadership Circle',
      date: 'Feb 10, 2026',
      time: '12:00 PM',
      location: 'Zoom',
      host: 'Alex Kim',
      type: 'Discussion',
      isOnline: true,
      category: 'hivekeeper-only',
      crossPollinationSpots: 0,
      interestedHives: 0,
      interestedHivekeepers: [],
      description: 'A private gathering for Hivekeepers who want to discuss leadership challenges, share insights, and support each other in leading conscious communities. This is a safe space for leader-to-leader dialogue.',
    },
    {
      id: 6,
      title: 'Herbal Medicine Making',
      date: 'Feb 12, 2026',
      time: '2:00 PM',
      location: 'Okafor Apothecary, Atlanta',
      host: 'Amara Okafor',
      type: 'Workshop',
      isOnline: false,
      category: 'cross-pollination',
      crossPollinationSpots: 3,
      interestedHives: 1,
      interestedHivekeepers: ['Priya Sharma'],
      description: 'Learn to create your own herbal remedies in this hands-on workshop. We\'ll make tinctures, salves, and teas using traditional methods and locally sourced herbs.',
    },
  ]);

  const eventTypes = ['Ceremony', 'Meditation', 'Workshop', 'Healing', 'Discussion'];

  const typeColors = {
    Ceremony: 'bg-purple-100 text-purple-700',
    Meditation: 'bg-blue-100 text-blue-700',
    Workshop: 'bg-green-100 text-green-700',
    Healing: 'bg-pink-100 text-pink-700',
    Discussion: 'bg-amber-100 text-amber-700',
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' ||
      selectedCategory === event.category ||
      (selectedCategory === 'my-events' && event.host === hivekeepers[0]?.name);
    const formatMatch = selectedFormat === 'all' ||
      (selectedFormat === 'online' && event.isOnline) ||
      (selectedFormat === 'offline' && !event.isOnline);
    return categoryMatch && formatMatch;
  });

  // Handle creating a new event
  const handleCreateEvent = (e) => {
    e.preventDefault();
    const currentUser = hivekeepers[0]; // Assume first user is logged in
    const newId = Math.max(...events.map(e => e.id)) + 1;

    setEvents([...events, {
      ...newEvent,
      id: newId,
      host: currentUser.name,
      interestedHives: 0,
      interestedHivekeepers: [],
    }]);

    setShowCreateModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'Workshop',
      category: 'cross-pollination',
      isOnline: false,
      description: '',
      crossPollinationSpots: 5,
    });
  };

  // Handle cross-pollination request
  const handleCrossPollinateRequest = (eventId) => {
    if (!interestedEvents.includes(eventId)) {
      setInterestedEvents([...interestedEvents, eventId]);
      setEvents(events.map(e =>
        e.id === eventId ? {
          ...e,
          interestedHives: e.interestedHives + 1,
          interestedHivekeepers: [...e.interestedHivekeepers, hivekeepers[0]?.name]
        } : e
      ));
    }
    setRequestSent(true);
    setTimeout(() => {
      setShowCrossPollinateModal(null);
      setRequestSent(false);
      setCrossPollinationMessage('');
    }, 2000);
  };

  // Handle withdrawing interest
  const handleWithdrawInterest = (eventId) => {
    setInterestedEvents(interestedEvents.filter(id => id !== eventId));
    setEvents(events.map(e =>
      e.id === eventId ? {
        ...e,
        interestedHives: Math.max(0, e.interestedHives - 1),
        interestedHivekeepers: e.interestedHivekeepers.filter(name => name !== hivekeepers[0]?.name)
      } : e
    ));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-amber-700 mt-1 text-sm sm:text-base">Cross-pollinate with fellow Hivekeepers</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Create Event</span>
          <span className="sm:hidden">Create</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setSelectedCategory('cross-pollination')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'cross-pollination'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>🐝</span>
            <span className="hidden sm:inline">Open for Cross-pollination</span>
            <span className="sm:hidden">Cross-pollination</span>
          </button>
          <button
            onClick={() => setSelectedCategory('hivekeeper-only')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'hivekeeper-only'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>🔒</span>
            <span className="hidden sm:inline">Hivekeeper Only</span>
            <span className="sm:hidden">Hivekeeper</span>
          </button>
          <button
            onClick={() => setSelectedCategory('open')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'open'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <span>🌍</span>
            <span>Open Events</span>
          </button>
          <button
            onClick={() => setSelectedCategory('my-events')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === 'my-events'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            My Events
          </button>
        </div>

        {/* Online/Offline Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedFormat('all')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              selectedFormat === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All Formats
          </button>
          <button
            onClick={() => setSelectedFormat('online')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              selectedFormat === 'online'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Online
          </button>
          <button
            onClick={() => setSelectedFormat('offline')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
              selectedFormat === 'offline'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            In-Person
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {filteredEvents.map(event => {
          const host = getHostByName(event.host);
          const isInterested = interestedEvents.includes(event.id);
          const category = categoryConfig[event.category];
          const spotsAvailable = event.crossPollinationSpots - event.interestedHives;

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-4 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Category Badge */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium border ${category.color}`}>
                    <span className="mr-1">{category.icon}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.shortLabel}</span>
                  </span>
                </div>
              </div>

              {/* Type and Format badges */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-3">
                <span className={`px-2.5 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium ${typeColors[event.type]}`}>
                  {event.type}
                </span>
                {event.isOnline ? (
                  <span className="px-2.5 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium bg-cyan-100 text-cyan-700 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Online</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>In-Person</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

              <div className="space-y-1.5 sm:space-y-2 text-gray-600 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="truncate">{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  {host && (
                    <img
                      src={host.photo}
                      alt={host.name}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-amber-300 cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                      onClick={() => navigate(`/profile/${host.id}`)}
                    />
                  )}
                  <span
                    className="text-amber-700 hover:text-amber-800 cursor-pointer truncate"
                    onClick={() => host && navigate(`/profile/${host.id}`)}
                  >
                    Hosted by {event.host}
                  </span>
                </div>
              </div>

              {/* Hive interest & spots */}
              {event.category === 'cross-pollination' && (
                <div className="flex items-center justify-between mb-4 p-3 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🐝</span>
                    <span className="text-sm font-medium text-amber-800">
                      {event.interestedHives} hive{event.interestedHives !== 1 ? 's' : ''} interested
                    </span>
                  </div>
                  <span className="text-sm font-medium text-amber-600">
                    {event.interestedHives}/{event.crossPollinationSpots} hive spots
                  </span>
                </div>
              )}

              <div className="flex gap-2 sm:gap-3">
                {event.category === 'cross-pollination' && (
                  isInterested ? (
                    <button
                      onClick={() => handleWithdrawInterest(event.id)}
                      className="flex-1 px-3 py-2 sm:px-4 bg-green-100 text-green-700 rounded-xl text-sm sm:text-base font-medium hover:bg-green-200 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="hidden sm:inline">Interested</span>
                      <span className="sm:hidden">🐝</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowCrossPollinateModal(event)}
                      disabled={spotsAvailable <= 0}
                      className="flex-1 px-3 py-2 sm:px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm sm:text-base font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                    >
                      <span>🐝</span>
                      <span className="hidden sm:inline">Cross-pollinate</span>
                      <span className="sm:hidden">Pollinate</span>
                    </button>
                  )
                )}
                {event.category !== 'cross-pollination' && (
                  <button
                    onClick={() => setShowDetailsModal(event)}
                    className="flex-1 px-3 py-2 sm:px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm sm:text-base font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    View Event
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(event)}
                  className="px-3 py-2 sm:px-4 bg-amber-100 text-amber-700 rounded-xl text-sm sm:text-base font-medium hover:bg-amber-200 transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-8 sm:py-12 bg-white rounded-2xl border border-amber-100">
          <p className="text-gray-500 text-sm sm:text-base">No events found matching your filters.</p>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Create New Event</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter event title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="cross-pollination">🐝 Open for Cross-pollination</option>
                    <option value="hivekeeper-only">🔒 Hivekeeper Only</option>
                    <option value="open">🌍 Open Event</option>
                  </select>
                </div>
              </div>

              {newEvent.category === 'cross-pollination' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cross-pollination Spots</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={newEvent.crossPollinationSpots}
                    onChange={(e) => setNewEvent({ ...newEvent, crossPollinationSpots: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">How many partner hives can join?</p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEvent.isOnline}
                    onChange={(e) => setNewEvent({ ...newEvent, isOnline: e.target.checked })}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">This is an online event</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {newEvent.isOnline ? 'Meeting Link' : 'Location'}
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={newEvent.isOnline ? 'Zoom link or meeting URL' : 'Enter venue address'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Describe your event..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const event = showDetailsModal;
              const host = getHostByName(event.host);
              const isInterested = interestedEvents.includes(event.id);
              const category = categoryConfig[event.category];
              const spotsAvailable = event.crossPollinationSpots - event.interestedHives;

              return (
                <>
                  <div className="p-6 border-b border-amber-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${category.color}`}>
                          {category.icon} {category.label}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowDetailsModal(null)}
                        className="p-2 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[event.type]}`}>
                        {event.type}
                      </span>
                      {event.isOnline ? (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700">Online</span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">In-Person</span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{event.title}</h3>

                    {/* Host info with profile picture */}
                    {host && (
                      <div
                        className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl mb-4 cursor-pointer hover:bg-amber-100 transition-colors"
                        onClick={() => {
                          setShowDetailsModal(null);
                          navigate(`/profile/${host.id}`);
                        }}
                      >
                        <img
                          src={host.photo}
                          alt={host.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
                        />
                        <div>
                          <p className="text-sm text-amber-600">Hosted by</p>
                          <p className="font-semibold text-gray-900">{host.name}</p>
                          <p className="text-sm text-gray-600">{host.location}</p>
                        </div>
                        <svg className="w-5 h-5 text-amber-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>

                    {/* Cross-pollination Opportunity Section */}
                    {event.category === 'cross-pollination' && (
                      <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                        <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                          <span>🐝</span> Cross-pollination Opportunity
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                          {host?.name.split(' ')[0]} is looking for <strong>{event.crossPollinationSpots}</strong> partner hives to share this event.
                        </p>

                        {/* Interested Hivekeepers */}
                        {event.interestedHivekeepers.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs text-amber-700 font-medium mb-2">Interested Hivekeepers:</p>
                            <div className="flex -space-x-2">
                              {event.interestedHivekeepers.slice(0, 5).map((name, idx) => {
                                const hk = hivekeepers.find(h => h.name === name);
                                return hk ? (
                                  <img
                                    key={idx}
                                    src={hk.photo}
                                    alt={hk.name}
                                    title={hk.name}
                                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                  />
                                ) : null;
                              })}
                              {event.interestedHivekeepers.length > 5 && (
                                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-xs font-medium text-amber-800">
                                  +{event.interestedHivekeepers.length - 5}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Spots Progress */}
                        <div className="mb-3">
                          <div className="h-2 bg-amber-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                              style={{ width: `${(event.interestedHives / event.crossPollinationSpots) * 100}%` }}
                            />
                          </div>
                          <p className="text-xs text-amber-700 mt-1">
                            {spotsAvailable} of {event.crossPollinationSpots} spots remaining
                          </p>
                        </div>

                        {/* What you get/give */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-2 bg-white rounded-lg">
                            <p className="font-medium text-green-700 mb-1">What you get:</p>
                            <p className="text-gray-600">Your hive gets access to this event</p>
                          </div>
                          <div className="p-2 bg-white rounded-lg">
                            <p className="font-medium text-amber-700 mb-1">What you give:</p>
                            <p className="text-gray-600">Promote to your community</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">About this event</h4>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="flex gap-3">
                      {event.category === 'cross-pollination' && (
                        isInterested ? (
                          <button
                            onClick={() => {
                              handleWithdrawInterest(event.id);
                              setShowDetailsModal({
                                ...event,
                                interestedHives: event.interestedHives - 1,
                                interestedHivekeepers: event.interestedHivekeepers.filter(n => n !== hivekeepers[0]?.name)
                              });
                            }}
                            className="flex-1 px-4 py-3 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-all flex items-center justify-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Withdraw Interest
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setShowDetailsModal(null);
                              setShowCrossPollinateModal(event);
                            }}
                            disabled={spotsAvailable <= 0}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <span>🐝</span>
                            {spotsAvailable <= 0 ? 'Spots Filled' : 'Request Cross-pollination'}
                          </button>
                        )
                      )}
                      {event.category !== 'cross-pollination' && (
                        <button
                          onClick={() => setShowDetailsModal(null)}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Cross-pollination Request Modal */}
      {showCrossPollinateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            {!requestSent ? (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🐝</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Request Cross-pollination</h3>
                    <p className="text-sm text-gray-500">{showCrossPollinateModal.title}</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl mb-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Cross-pollination</strong> means partnering with {getHostByName(showCrossPollinateModal.host)?.name.split(' ')[0]} to share this event with your hive. Your community gets access, and you help spread the word!
                  </p>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  Tell {getHostByName(showCrossPollinateModal.host)?.name.split(' ')[0]} about your hive and why you'd like to cross-pollinate:
                </p>

                <textarea
                  value={crossPollinationMessage}
                  onChange={(e) => setCrossPollinationMessage(e.target.value)}
                  placeholder={`Hi! I run [Your Hive Name] and I think my community would love this event because...`}
                  className="w-full h-28 p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none text-sm"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowCrossPollinateModal(null);
                      setCrossPollinationMessage('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleCrossPollinateRequest(showCrossPollinateModal.id)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🐝</span>
                    Send Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🐝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h3>
                <p className="text-gray-600">
                  {getHostByName(showCrossPollinateModal.host)?.name.split(' ')[0]} will review your cross-pollination request.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;
