import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

// Helper to get hivekeeper by name
const getHostByName = (name) => {
  return hivekeepers.find(h => h.name === name) || null;
};

function Events() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState([]);

  // Form state for creating events
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'Workshop',
    isOnline: false,
    description: '',
    maxAttendees: 20,
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Full Moon Gathering',
      date: 'Feb 1, 2026',
      time: '7:00 PM',
      location: 'Riverside Park, Portland',
      host: 'Sarah Johnson',
      attendees: 23,
      maxAttendees: 30,
      type: 'Ceremony',
      isOnline: false,
      description: 'Join us for a sacred full moon ceremony where we\'ll gather in circle to honor the lunar cycle, set intentions, and connect with our community. Bring a blanket, journal, and an open heart.',
    },
    {
      id: 2,
      title: 'Mindfulness Morning',
      date: 'Feb 2, 2026',
      time: '6:30 AM',
      location: 'Zoom',
      host: 'Maya Chen',
      attendees: 45,
      maxAttendees: 100,
      type: 'Meditation',
      isOnline: true,
      description: 'Start your day with guided meditation and breathwork. This online session is perfect for beginners and experienced practitioners alike. We\'ll explore various mindfulness techniques to cultivate inner peace.',
    },
    {
      id: 3,
      title: 'Permaculture Workshop',
      date: 'Feb 5, 2026',
      time: '10:00 AM',
      location: 'Community Garden, Austin',
      host: 'David Rivera',
      attendees: 18,
      maxAttendees: 25,
      type: 'Workshop',
      isOnline: false,
      description: 'Learn the fundamentals of permaculture design in this hands-on workshop. We\'ll cover soil health, companion planting, water management, and creating sustainable food systems in urban environments.',
    },
    {
      id: 4,
      title: 'Sound Bath Experience',
      date: 'Feb 8, 2026',
      time: '5:00 PM',
      location: 'Healing Center, Nashville',
      host: 'Jordan Ellis',
      attendees: 30,
      maxAttendees: 35,
      type: 'Healing',
      isOnline: false,
      description: 'Immerse yourself in healing vibrations during this transformative sound bath. Using crystal singing bowls, gongs, and other instruments, we\'ll create a sonic journey for deep relaxation and restoration.',
    },
    {
      id: 5,
      title: 'Conscious Leadership Circle',
      date: 'Feb 10, 2026',
      time: '12:00 PM',
      location: 'Zoom',
      host: 'Alex Kim',
      attendees: 15,
      maxAttendees: 20,
      type: 'Discussion',
      isOnline: true,
      description: 'A virtual gathering for leaders who want to integrate mindfulness and ethics into their work. We\'ll discuss challenges, share insights, and support each other in leading with consciousness.',
    },
    {
      id: 6,
      title: 'Herbal Medicine Making',
      date: 'Feb 12, 2026',
      time: '2:00 PM',
      location: 'Okafor Apothecary, Atlanta',
      host: 'Amara Okafor',
      attendees: 12,
      maxAttendees: 15,
      type: 'Workshop',
      isOnline: false,
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
    const typeMatch = selectedType === 'all' || event.type === selectedType;
    const formatMatch = selectedFormat === 'all' ||
      (selectedFormat === 'online' && event.isOnline) ||
      (selectedFormat === 'offline' && !event.isOnline);
    return typeMatch && formatMatch;
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
      attendees: 1,
    }]);

    setShowCreateModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'Workshop',
      isOnline: false,
      description: '',
      maxAttendees: 20,
    });
  };

  // Handle joining an event
  const handleJoinEvent = (eventId) => {
    if (!joinedEvents.includes(eventId)) {
      setJoinedEvents([...joinedEvents, eventId]);
      setEvents(events.map(e =>
        e.id === eventId ? { ...e, attendees: e.attendees + 1 } : e
      ));
    }
    setShowJoinModal(null);
  };

  // Handle leaving an event
  const handleLeaveEvent = (eventId) => {
    setJoinedEvents(joinedEvents.filter(id => id !== eventId));
    setEvents(events.map(e =>
      e.id === eventId ? { ...e, attendees: Math.max(0, e.attendees - 1) } : e
    ));
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-amber-700 mt-1">Upcoming gatherings and experiences</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Event Type Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedType === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All Types
          </button>
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedType === type
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Online/Offline Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedFormat('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFormat === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All Formats
          </button>
          <button
            onClick={() => setSelectedFormat('online')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedFormat === 'online'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Online
          </button>
          <button
            onClick={() => setSelectedFormat('offline')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              selectedFormat === 'offline'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            In-Person
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => {
          const host = getHostByName(event.host);
          const isJoined = joinedEvents.includes(event.id);

          return (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                  {event.isOnline ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Online
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      In-Person
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-amber-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span className="text-sm font-medium">{event.attendees}/{event.maxAttendees}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

              <div className="space-y-2 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{event.date} at {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  {host && (
                    <img
                      src={host.photo}
                      alt={host.name}
                      className="w-6 h-6 rounded-full object-cover border border-amber-300 cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => navigate(`/profile/${host.id}`)}
                    />
                  )}
                  <span
                    className="text-amber-700 hover:text-amber-800 cursor-pointer"
                    onClick={() => host && navigate(`/profile/${host.id}`)}
                  >
                    Hosted by {event.host}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {isJoined ? (
                  <button
                    onClick={() => handleLeaveEvent(event.id)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Joined
                  </button>
                ) : (
                  <button
                    onClick={() => setShowJoinModal(event)}
                    disabled={event.attendees >= event.maxAttendees}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {event.attendees >= event.maxAttendees ? 'Full' : 'Join Event'}
                  </button>
                )}
                <button
                  onClick={() => setShowDetailsModal(event)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100">
          <p className="text-gray-500">No events found matching your filters.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Attendees</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({ ...newEvent, maxAttendees: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              const isJoined = joinedEvents.includes(event.id);

              return (
                <>
                  <div className="p-6 border-b border-amber-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[event.type]}`}>
                          {event.type}
                        </span>
                        {event.isOnline ? (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-700">Online</span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700">In-Person</span>
                        )}
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
                      <div className="flex items-center gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <span>{event.attendees} of {event.maxAttendees} spots filled</span>
                      </div>
                    </div>

                    {/* Capacity bar */}
                    <div className="mb-6">
                      <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                          style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {event.maxAttendees - event.attendees} spots remaining
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">About this event</h4>
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="flex gap-3">
                      {isJoined ? (
                        <button
                          onClick={() => {
                            handleLeaveEvent(event.id);
                            setShowDetailsModal({ ...event, attendees: event.attendees - 1 });
                          }}
                          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          You're Going - Click to Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleJoinEvent(event.id);
                            setShowDetailsModal({ ...event, attendees: event.attendees + 1 });
                          }}
                          disabled={event.attendees >= event.maxAttendees}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {event.attendees >= event.maxAttendees ? 'Event is Full' : 'Join This Event'}
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

      {/* Join Confirmation Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Join Event?</h3>
              <p className="text-gray-600 text-center mb-6">
                You're about to join <span className="font-semibold">{showJoinModal.title}</span> on {showJoinModal.date} at {showJoinModal.time}.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowJoinModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleJoinEvent(showJoinModal.id)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Events;
