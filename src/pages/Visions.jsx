import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

// Focus area tags derived from circles
const getFocusAreas = (keeper) => {
  return keeper.circles.slice(0, 2);
};

function Visions() {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
      <div className="text-center mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Visions of the Hive
        </h1>
        <p className="text-lg sm:text-xl text-amber-700 max-w-2xl mx-auto">
          Explore the dreams driving our community of leaders
        </p>
      </div>

      {/* Vision Cards */}
      <div className="space-y-8 sm:space-y-12">
        {hivekeepers.map((keeper, index) => {
          const isEven = index % 2 === 0;
          const primaryHive = keeper.hives?.[0];

          return (
            <div
              key={keeper.id}
              className={`relative bg-white rounded-3xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-lg transition-shadow ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1/3 h-full bg-gradient-to-${isEven ? 'r' : 'l'} from-amber-50 to-transparent opacity-50 pointer-events-none hidden md:block`} />

              <div className={`relative p-6 sm:p-8 md:p-10 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-10 items-center`}>
                {/* Profile Section */}
                <div className={`flex flex-col items-center text-center ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} flex-shrink-0 w-full md:w-auto`}>
                  <img
                    src={keeper.photo}
                    alt={keeper.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-200 shadow-lg mb-4 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/profile/${keeper.id}`)}
                  />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{keeper.name}</h3>

                  {/* Hive info */}
                  {primaryHive && (
                    <p className="text-sm text-amber-600 mb-2">
                      {primaryHive.name}
                      <span className="mx-1.5">·</span>
                      <span className="text-amber-500">{primaryHive.sizeCategory}</span>
                    </p>
                  )}

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{keeper.location}</span>
                  </div>

                  {/* Focus area tags */}
                  <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'justify-end'}`}>
                    {getFocusAreas(keeper).map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Vision Quote Section */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className={`relative ${isEven ? 'md:pl-6' : 'md:pr-6'}`}>
                    {/* Quote mark */}
                    <span className={`absolute -top-4 ${isEven ? '-left-2 md:left-0' : '-right-2 md:right-0'} text-6xl sm:text-7xl text-amber-200 font-serif leading-none select-none`}>
                      "
                    </span>

                    {/* Vision text */}
                    <blockquote className={`relative text-xl sm:text-2xl lg:text-3xl text-gray-800 italic leading-relaxed ${isEven ? 'text-left' : 'md:text-right'} pt-4`}>
                      {keeper.vision}
                    </blockquote>

                    {/* Closing quote */}
                    <span className={`absolute -bottom-8 ${isEven ? 'right-0' : 'left-0'} text-6xl sm:text-7xl text-amber-200 font-serif leading-none select-none transform rotate-180`}>
                      "
                    </span>
                  </div>

                  {/* Read profile link */}
                  <div className={`mt-8 ${isEven ? 'text-left' : 'md:text-right'}`}>
                    <button
                      onClick={() => navigate(`/profile/${keeper.id}`)}
                      className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-medium transition-colors group"
                    >
                      Read full profile
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom accent bar */}
              <div className={`h-1 bg-gradient-to-r ${isEven ? 'from-amber-400 via-orange-400 to-amber-300' : 'from-amber-300 via-orange-400 to-amber-400'}`} />
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <div className="inline-block p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Share Your Vision</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Every great hive starts with a dream. What world are you building?
          </p>
          <button
            onClick={() => navigate('/community')}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            Explore the Hive Map
          </button>
        </div>
      </div>
    </main>
  );
}

export default Visions;
