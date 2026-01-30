import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';
import HiveMap from '../components/HiveMap';

function Community() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const circles = [...new Set(hivekeepers.flatMap(h => h.circles))];

  const filteredKeepers = selectedFilter === 'all'
    ? hivekeepers
    : hivekeepers.filter(h => h.circles.includes(selectedFilter));

  const handleMarkerClick = (keeper) => {
    navigate(`/profile/${keeper.id}`);
  };

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

      {/* World Map */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 mb-8">
        <HiveMap
          hivekeepers={filteredKeepers}
          onMarkerClick={handleMarkerClick}
        />
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
