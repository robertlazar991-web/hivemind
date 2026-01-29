function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: 'Full Moon Gathering',
      date: 'Tomorrow',
      time: '7:00 PM',
      location: 'Riverside Park',
      host: 'Sarah Johnson',
      attendees: 23,
      type: 'Ceremony',
    },
    {
      id: 2,
      title: 'Mindfulness Morning',
      date: 'Feb 2, 2026',
      time: '6:30 AM',
      location: 'Online',
      host: 'Maya Chen',
      attendees: 45,
      type: 'Meditation',
    },
    {
      id: 3,
      title: 'Permaculture Workshop',
      date: 'Feb 5, 2026',
      time: '10:00 AM',
      location: 'Community Garden',
      host: 'David Rivera',
      attendees: 18,
      type: 'Workshop',
    },
    {
      id: 4,
      title: 'Sound Bath Experience',
      date: 'Feb 8, 2026',
      time: '5:00 PM',
      location: 'Healing Center',
      host: 'Jordan Ellis',
      attendees: 30,
      type: 'Healing',
    },
    {
      id: 5,
      title: 'Conscious Leadership Circle',
      date: 'Feb 10, 2026',
      time: '12:00 PM',
      location: 'Online',
      host: 'Alex Kim',
      attendees: 15,
      type: 'Discussion',
    },
  ];

  const typeColors = {
    Ceremony: 'bg-purple-100 text-purple-700',
    Meditation: 'bg-blue-100 text-blue-700',
    Workshop: 'bg-green-100 text-green-700',
    Healing: 'bg-pink-100 text-pink-700',
    Discussion: 'bg-amber-100 text-amber-700',
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Events</h2>
          <p className="text-amber-700 mt-1">Upcoming gatherings and experiences</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upcomingEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[event.type]}`}>
                {event.type}
              </span>
              <div className="flex items-center gap-1 text-amber-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm font-medium">{event.attendees}</span>
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
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Hosted by {event.host}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
                Join Event
              </button>
              <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Events;
