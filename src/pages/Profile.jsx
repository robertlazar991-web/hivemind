import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getHivekeeperById } from '../data/hivekeepers';

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
  Budding: 'bg-green-100 text-green-700',
  Growing: 'bg-blue-100 text-blue-700',
  Thriving: 'bg-amber-100 text-amber-700',
};

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showCrossPollinationModal, setShowCrossPollinationModal] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');
  const [crossPollinationMessage, setCrossPollinationMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const keeper = getHivekeeperById(id);

  if (!keeper) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900">Hivekeeper not found</h2>
          <button
            onClick={() => navigate('/community')}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
          >
            Back to Community
          </button>
        </div>
      </main>
    );
  }

  const handleConnect = () => {
    setMessageSent(true);
    setTimeout(() => {
      setShowConnectModal(false);
      setMessageSent(false);
      setConnectMessage('');
    }, 2000);
  };

  const handleCrossPollination = () => {
    setMessageSent(true);
    setTimeout(() => {
      setShowCrossPollinationModal(false);
      setMessageSent(false);
      setCrossPollinationMessage('');
    }, 2000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/community')}
        className="flex items-center gap-2 text-amber-600 hover:text-amber-800 mb-6 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Hive Map
      </button>

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
              src={keeper.photo}
              alt={keeper.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Name and location */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{keeper.name}</h1>
            <div className="flex items-center gap-2 text-amber-600 mt-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{keeper.location}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date(keeper.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            <p className="text-gray-700 leading-relaxed">{keeper.bio}</p>
          </div>

          {/* Vision & Mission */}
          {(keeper.vision || keeper.mission) && (
            <div className="mb-6 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
              {keeper.vision && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">Vision</h3>
                  <p className="text-lg text-gray-800 italic leading-relaxed">"{keeper.vision}"</p>
                </div>
              )}
              {keeper.mission && (
                <div>
                  <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-2">Mission</h3>
                  <p className="text-gray-700 leading-relaxed">{keeper.mission}</p>
                </div>
              )}
            </div>
          )}

          {/* My Hive(s) */}
          {keeper.hives && keeper.hives.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">My Hive(s)</h2>
              <div className="space-y-3">
                {keeper.hives.map((hive, index) => {
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
                        Join on {platform.label}
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
              {keeper.skills.map(skill => (
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
              {(keeper.openToCollaborate || keeper.openTo).map(item => (
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
          {keeper.pastCollaborations && keeper.pastCollaborations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Past Collaborations</h2>
              <div className="space-y-2">
                {keeper.pastCollaborations.map((collab, index) => (
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowConnectModal(true)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>🤝</span>
              Connect as Hivekeeper
            </button>
            <button
              onClick={() => setShowCrossPollinationModal(true)}
              className="flex-1 px-6 py-3 bg-white border-2 border-amber-500 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <span>🐝</span>
              Request Cross-pollination
            </button>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            {!messageSent ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Connect as Hivekeeper
                    </h3>
                    <p className="text-sm text-gray-500">Leader-to-leader connection</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Introduce yourself to {keeper.name} and share why you'd like to connect as fellow Hivekeepers.
                </p>
                <textarea
                  value={connectMessage}
                  onChange={(e) => setConnectMessage(e.target.value)}
                  placeholder={`Hi ${keeper.name.split(' ')[0]}, I'm a fellow Hivekeeper and I'd love to connect because...`}
                  className="w-full h-32 p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConnect}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Send Request
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Request Sent!</h3>
                <p className="text-gray-600">
                  {keeper.name.split(' ')[0]} will receive your Hivekeeper connection request.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cross-pollination Modal */}
      {showCrossPollinationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            {!messageSent ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🐝</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Request Cross-pollination
                    </h3>
                    <p className="text-sm text-gray-500">Share offerings across hives</p>
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl mb-4 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>What is cross-pollination?</strong> It means sharing your offerings with each other's communities. For example, you might offer a workshop to their hive, and they might share their expertise with yours.
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  Share what you'd like to offer {keeper.name}'s community and what you're hoping to receive:
                </p>
                <textarea
                  value={crossPollinationMessage}
                  onChange={(e) => setCrossPollinationMessage(e.target.value)}
                  placeholder={`Hi ${keeper.name.split(' ')[0]}, I'd love to explore cross-pollination. I could offer your community... and I'd be interested in...`}
                  className="w-full h-32 p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setShowCrossPollinationModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCrossPollination}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Send Request
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🐝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-pollination Request Sent!</h3>
                <p className="text-gray-600">
                  {keeper.name.split(' ')[0]} will review your cross-pollination proposal.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
