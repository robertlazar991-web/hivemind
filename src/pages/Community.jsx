import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

function Community() {
  const navigate = useNavigate();
  const [hoveredKeeper, setHoveredKeeper] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const circles = [...new Set(hivekeepers.flatMap(h => h.circles))];

  const filteredKeepers = selectedFilter === 'all'
    ? hivekeepers
    : hivekeepers.filter(h => h.circles.includes(selectedFilter));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Hive Map</h2>
        <p className="text-amber-700 mt-1">Explore our community of Hivekeepers</p>
      </div>

      {/* Filter by Circle */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedFilter === 'all'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          All Hivekeepers
        </button>
        {circles.map(circle => (
          <button
            key={circle}
            onClick={() => setSelectedFilter(circle)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFilter === circle
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            {circle}
          </button>
        ))}
      </div>

      {/* Visual Map */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-8">
        <div className="relative w-full h-[500px] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-xl overflow-hidden">
          {/* Hexagon pattern background */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <polygon
                  points="25,0 50,14.4 50,43.4 25,57.7 0,43.4 0,14.4"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>

          {/* Connection lines between nearby keepers */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {filteredKeepers.map((keeper, i) =>
              filteredKeepers.slice(i + 1).map(other => {
                const dx = keeper.coordinates.x - other.coordinates.x;
                const dy = keeper.coordinates.y - other.coordinates.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 25) {
                  return (
                    <line
                      key={`${keeper.id}-${other.id}`}
                      x1={`${keeper.coordinates.x}%`}
                      y1={`${keeper.coordinates.y}%`}
                      x2={`${other.coordinates.x}%`}
                      y2={`${other.coordinates.y}%`}
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeOpacity="0.3"
                    />
                  );
                }
                return null;
              })
            )}
          </svg>

          {/* Hivekeeper nodes */}
          {filteredKeepers.map(keeper => (
            <div
              key={keeper.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${keeper.coordinates.x}%`,
                top: `${keeper.coordinates.y}%`,
              }}
              onClick={() => navigate(`/profile/${keeper.id}`)}
              onMouseEnter={() => setHoveredKeeper(keeper)}
              onMouseLeave={() => setHoveredKeeper(null)}
            >
              {/* Pulse animation */}
              <div className="absolute inset-0 w-16 h-16 -m-2 bg-amber-400 rounded-full animate-ping opacity-20 group-hover:opacity-40" />

              {/* Avatar */}
              <div className="relative w-12 h-12 rounded-full border-3 border-amber-400 shadow-lg overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 group-hover:scale-125 transition-transform duration-200">
                <img
                  src={keeper.photo}
                  alt={keeper.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover tooltip */}
              {hoveredKeeper?.id === keeper.id && (
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-3 min-w-[200px] z-20 border border-amber-100">
                  <p className="font-semibold text-gray-900">{keeper.name}</p>
                  <p className="text-sm text-amber-600">{keeper.location}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {keeper.circles.slice(0, 2).map(circle => (
                      <span key={circle} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        {circle}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Click to view profile</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* List view */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">All Hivekeepers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredKeepers.map(keeper => (
            <div
              key={keeper.id}
              onClick={() => navigate(`/profile/${keeper.id}`)}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors border border-amber-100"
            >
              <img
                src={keeper.photo}
                alt={keeper.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-300"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{keeper.name}</p>
                <p className="text-sm text-amber-600 truncate">{keeper.location}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {keeper.openTo.slice(0, 2).map(item => (
                    <span key={item} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Community;
