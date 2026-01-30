import { useNavigate } from 'react-router-dom';

// Platform icons and colors
const platformConfig = {
  Skool: { icon: '🎓', color: 'bg-yellow-500', label: 'Skool' },
  WhatsApp: { icon: '💬', color: 'bg-green-500', label: 'WhatsApp' },
  Telegram: { icon: '📱', color: 'bg-blue-500', label: 'Telegram' },
  Discord: { icon: '💭', color: 'bg-indigo-500', label: 'Discord' },
  Website: { icon: '🌐', color: 'bg-gray-500', label: 'Website' },
};

// Size category badges
const sizeCategoryColors = {
  Seedling: 'bg-emerald-100 text-emerald-700',
  Growing: 'bg-blue-100 text-blue-700',
  Thriving: 'bg-purple-100 text-purple-700',
  Flourishing: 'bg-amber-100 text-amber-700',
  Established: 'bg-orange-100 text-orange-700',
};

function MyProfile() {
  const navigate = useNavigate();

  // Current user's full profile data
  const myProfile = {
    name: 'Sarah',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
    location: 'San Francisco, CA',
    tagline: 'Meditation & Conscious Leadership',
    joinedDate: '2024-03-15',
    bio: 'I guide conscious entrepreneurs and community leaders on their journey to authentic leadership. With over 10 years of experience in meditation and mindfulness practices, I help others cultivate inner peace while building thriving communities.',
    vision: 'A world where every community leader leads from a place of presence, compassion, and authentic connection.',
    mission: 'I help conscious leaders build thriving communities by integrating mindfulness practices into their leadership approach.',
    hives: [
      {
        name: 'Consciousness Collective',
        platform: 'Skool',
        sizeCategory: 'Growing',
        link: 'https://skool.com/consciousness-collective',
      },
    ],
    skills: ['Meditation', 'Leadership Coaching', 'Community Building', 'Breathwork', 'Retreat Facilitation'],
    openTo: ['Co-hosting retreats', 'Guest teaching', 'Cross-pollination', 'Mentorship', 'Knowledge exchange'],
    pastCollaborations: [
      'Joint meditation series with Mindful Leaders Hub',
      'Guest speaker at Conscious Business Summit 2024',
      'Cross-pollination with Earth Wisdom Circle',
    ],
    circles: ['Mindfulness', 'Leadership'],
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

      {/* Preview Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👁️</span>
          <p className="text-amber-800 font-medium">This is how others see your profile</p>
        </div>
        <button
          onClick={() => navigate('/profile/edit')}
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
        >
          <span>✏️</span>
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
        {/* Header with gradient */}
        <div className="h-32 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 relative">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hex-pattern" width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon
                    points="15,0 30,8.7 30,26 15,34.6 0,26 0,8.7"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hex-pattern)" />
            </svg>
          </div>
        </div>

        {/* Profile content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <img
              src={myProfile.photo}
              alt={myProfile.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Name and location */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{myProfile.name}</h1>
            {myProfile.tagline && (
              <p className="text-amber-700 font-medium mt-1">{myProfile.tagline}</p>
            )}
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{myProfile.location}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date(myProfile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{myProfile.bio}</p>
          </div>

          {/* Vision & Mission */}
          {(myProfile.vision || myProfile.mission) && (
            <div className="mb-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              {myProfile.vision && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">Vision</h3>
                  <p className="text-lg text-gray-800 italic leading-relaxed">"{myProfile.vision}"</p>
                </div>
              )}
              {myProfile.mission && (
                <div>
                  <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">Mission</h3>
                  <p className="text-gray-700 leading-relaxed">{myProfile.mission}</p>
                </div>
              )}
            </div>
          )}

          {/* My Hive(s) */}
          {myProfile.hives && myProfile.hives.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">My Hive(s)</h2>
              <div className="space-y-3">
                {myProfile.hives.map((hive, index) => {
                  const platform = platformConfig[hive.platform] || platformConfig.Website;
                  const sizeColor = sizeCategoryColors[hive.sizeCategory] || sizeCategoryColors.Growing;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-amber-200 hover:border-amber-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{platform.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{hive.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${sizeColor}`}>
                              {hive.sizeCategory}
                            </span>
                            <span className="text-xs text-gray-500">on {hive.platform}</span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={hive.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 ${platform.color} text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity`}
                      >
                        <span>{platform.icon}</span>
                        Visit
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {myProfile.skills.map(skill => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Open to Collaborate */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Open to Collaborate</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {myProfile.openTo.map(item => (
                <div
                  key={item}
                  className="flex items-center gap-2 p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-amber-200"
                >
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-amber-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Past Collaborations */}
          {myProfile.pastCollaborations && myProfile.pastCollaborations.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Past Collaborations</h2>
              <div className="space-y-2">
                {myProfile.pastCollaborations.map((collab, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200"
                  >
                    <span className="text-lg">🤝</span>
                    <span className="text-sm text-green-800">{collab}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Edit Profile Button at bottom */}
          <div className="pt-4 border-t border-amber-100">
            <button
              onClick={() => navigate('/profile/edit')}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>✏️</span>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MyProfile;
