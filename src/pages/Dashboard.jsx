function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome back, Leader</h2>
        <p className="text-amber-700 mt-1">Here's what's happening in your conscious community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Community Members</h3>
            <span className="text-2xl">🐝</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
          <p className="text-sm text-green-600 mt-1">+23 this week</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Active Circles</h3>
            <span className="text-2xl">🌀</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">18</p>
          <p className="text-sm text-green-600 mt-1">3 new circles</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Upcoming Events</h3>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">7</p>
          <p className="text-sm text-amber-600 mt-1">Next: Tomorrow</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-600 font-medium">Collective Energy</h3>
            <span className="text-2xl">🌟</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
          <p className="text-sm text-green-600 mt-1">Thriving</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { name: 'Maya Chen', action: 'joined the Mindfulness Circle', time: '2 hours ago' },
              { name: 'David Rivera', action: 'shared a new resource', time: '4 hours ago' },
              { name: 'Sarah Johnson', action: 'created an event: Full Moon Gathering', time: '6 hours ago' },
              { name: 'Alex Kim', action: 'completed the Conscious Leadership course', time: '1 day ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-amber-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium">
                  {activity.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">
                    <span className="font-medium">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-sm text-amber-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
              Create New Circle
            </button>
            <button className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all">
              Schedule Event
            </button>
            <button className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all">
              Send Community Message
            </button>
            <button className="w-full p-3 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
