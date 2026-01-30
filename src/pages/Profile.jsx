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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestType, setRequestType] = useState('connection');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const keeper = getHivekeeperById(id);

  // Mock: Check if already connected (in real app, this would come from user state)
  const isAlreadyConnected = false; // Set to true to test disabled state

  // Mock: Get keeper's upcoming events that are open for cross-pollination
  const getKeeperEvents = () => {
    // In a real app, this would fetch from the keeper's events
    return [
      { id: 'e1', title: 'Full Moon Meditation Circle', date: 'Feb 15, 2025' },
      { id: 'e2', title: 'Community Breathwork Session', date: 'Feb 22, 2025' },
      { id: 'e3', title: 'Leadership Workshop', date: 'Mar 5, 2025' },
    ];
  };

  const keeperEvents = getKeeperEvents();

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

  const handleMessage = () => {
    // Navigate directly to messages with this person
    navigate(`/messages?to=${keeper.id}`);
  };

  const handleSendRequest = () => {
    // Validate
    if (!requestMessage.trim()) return;
    if (requestType === 'cross-pollination' && !selectedEvent) return;

    setRequestSent(true);
    setTimeout(() => {
      setShowRequestModal(false);
      setRequestSent(false);
      setRequestMessage('');
      setRequestType('connection');
      setSelectedEvent('');
    }, 2000);
  };

  const openRequestModal = () => {
    // Default to connection if not already connected, otherwise cross-pollination
    setRequestType(isAlreadyConnected ? 'cross-pollination' : 'connection');
    setShowRequestModal(true);
  };

  const isFormValid = () => {
    if (!requestMessage.trim()) return false;
    if (requestType === 'cross-pollination' && !selectedEvent) return false;
    return true;
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

          {/* Action Buttons - Simplified to 2 buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleMessage}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>💬</span>
              Message
            </button>
            <button
              onClick={openRequestModal}
              className="flex-1 px-6 py-3 bg-white border-2 border-amber-500 text-amber-700 rounded-xl font-semibold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <span>📋</span>
              Request...
            </button>
          </div>
        </div>
      </div>

      {/* Unified Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            {!requestSent ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Send Request to {keeper.name.split(' ')[0]}
                  </h3>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Request Type Selection */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-3 block">What would you like to request?</label>
                  <div className="space-y-2">
                    {/* Connection Option */}
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        requestType === 'connection'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-200'
                      } ${isAlreadyConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <input
                        type="radio"
                        name="requestType"
                        value="connection"
                        checked={requestType === 'connection'}
                        onChange={(e) => setRequestType(e.target.value)}
                        disabled={isAlreadyConnected}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-xl">🤝</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Connection</span>
                        <p className="text-sm text-gray-500">
                          {isAlreadyConnected
                            ? 'Already connected'
                            : 'Request to connect as fellow Hivekeepers'}
                        </p>
                      </div>
                      {isAlreadyConnected && (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </label>

                    {/* Cross-pollination Option */}
                    <label
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        requestType === 'cross-pollination'
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="requestType"
                        value="cross-pollination"
                        checked={requestType === 'cross-pollination'}
                        onChange={(e) => setRequestType(e.target.value)}
                        className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                      />
                      <span className="text-xl">🐝</span>
                      <div className="flex-1">
                        <span className="font-medium text-gray-900">Cross-pollination</span>
                        <p className="text-sm text-gray-500">Request to join one of their events</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Event Selection (only for cross-pollination) */}
                {requestType === 'cross-pollination' && (
                  <div className="mb-5">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Select an event to join <span className="text-red-500">*</span>
                    </label>
                    {keeperEvents.length > 0 ? (
                      <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="w-full p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                      >
                        <option value="">Choose an event...</option>
                        {keeperEvents.map(event => (
                          <option key={event.id} value={event.id}>
                            {event.title} ({event.date})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-xl text-center">
                        <p className="text-gray-500 text-sm">
                          No upcoming events available for cross-pollination
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Cross-pollination lets you share this event with your hive members.
                    </p>
                  </div>
                )}

                {/* Message Field */}
                <div className="mb-5">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Your message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder={
                      requestType === 'connection'
                        ? `Hi ${keeper.name.split(' ')[0]}, I'm a fellow Hivekeeper and I'd love to connect because...`
                        : `Hi ${keeper.name.split(' ')[0]}, I'd love to bring some of my community members to your event because...`
                    }
                    className="w-full h-28 p-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-amber-50 p-4 rounded-xl mb-5 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    {requestType === 'connection' ? (
                      <>
                        <strong>About connections:</strong> Connecting lets you message directly, see each other's full profiles, and opens opportunities for collaboration.
                      </>
                    ) : (
                      <>
                        <strong>About cross-pollination:</strong> You don't need to be connected to request cross-pollination. This allows you to bring members from your hive to their event.
                      </>
                    )}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendRequest}
                    disabled={!isFormValid()}
                    className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isFormValid()
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{requestType === 'connection' ? '🤝' : '🐝'}</span>
                    Send Request
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{requestType === 'connection' ? '🤝' : '🐝'}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {requestType === 'connection' ? 'Connection' : 'Cross-pollination'} Request Sent!
                </h3>
                <p className="text-gray-600">
                  {keeper.name.split(' ')[0]} will receive your request and respond soon.
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
