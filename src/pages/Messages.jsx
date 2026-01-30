import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');

  // Sample conversation data
  const [conversations, setConversations] = useState([
    {
      id: 1,
      keeperId: 1, // Maya Chen
      category: 'cross-pollination',
      unread: true,
      messages: [
        {
          id: 1,
          fromMe: false,
          text: "Hi! I loved your vision for urban regeneration. I think our communities could really benefit from a cross-pollination.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
      ],
    },
    {
      id: 2,
      keeperId: 2, // David Rivera
      category: 'general',
      unread: false,
      messages: [
        {
          id: 1,
          fromMe: true,
          text: "Thanks for connecting! I'd love to explore a joint workshop.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          id: 2,
          fromMe: false,
          text: "That sounds great! I was thinking we could do something around permaculture + mindfulness. When are you free to chat?",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: 3,
          fromMe: true,
          text: "How about next Tuesday? I'll send a calendar invite.",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: 4,
          fromMe: false,
          text: "Perfect, looking forward to it!",
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), // Yesterday
        },
      ],
    },
    {
      id: 3,
      keeperId: 3, // Sarah Johnson
      category: 'general',
      unread: false,
      messages: [
        {
          id: 1,
          fromMe: false,
          text: "Welcome to HiveMind! Let me know if you have any questions as you get started.",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
        {
          id: 2,
          fromMe: true,
          text: "Thanks Sarah! Excited to be here.",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
      ],
    },
  ]);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'connection', label: 'Connection Requests' },
    { id: 'cross-pollination', label: 'Cross-pollination' },
    { id: 'general', label: 'General' },
  ];

  // Helper to get hivekeeper by id
  const getKeeper = (id) => hivekeepers.find((k) => k.id === id);

  // Format timestamp
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return `${Math.floor(days / 7)}w ago`;
  };

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    if (selectedFilter === 'all') return true;
    return conv.category === selectedFilter;
  });

  // Get unread count
  const unreadCount = conversations.filter((c) => c.unread).length;

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: selectedConversation.messages.length + 1,
      fromMe: true,
      text: newMessage.trim(),
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
          };
        }
        return conv;
      })
    );

    setSelectedConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setNewMessage('');
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv);
    // Mark as read
    if (conv.unread) {
      setConversations((prev) =>
        prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
      );
    }
  };

  // Handle back button on mobile
  const handleBack = () => {
    setSelectedConversation(null);
  };

  // Empty state
  if (conversations.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h2>
          <p className="text-amber-600 mt-1 text-sm sm:text-base">Connect with fellow Hivekeepers</p>
        </div>

        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-amber-100 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-3xl sm:text-4xl">💬</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Start by connecting with Hivekeepers on the map!
          </p>
          <button
            onClick={() => navigate('/community')}
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all text-sm sm:text-base"
          >
            Explore Hivekeepers
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back to Dashboard - Hidden on mobile when conversation is selected */}
      <button
        onClick={() => navigate('/')}
        className={`flex items-center gap-1.5 text-amber-600 hover:text-amber-800 mb-4 transition-colors text-sm ${selectedConversation ? 'hidden lg:flex' : ''}`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      {/* Header - Hidden on mobile when conversation is selected */}
      <div className={`mb-4 sm:mb-6 ${selectedConversation ? 'hidden lg:block' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h2>
            <p className="text-amber-600 mt-1 text-sm sm:text-base">Connect with fellow Hivekeepers</p>
          </div>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 sm:px-3 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium">
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>

      {/* Filter Tabs - Hidden on mobile when conversation is selected */}
      <div className={`flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 ${selectedConversation ? 'hidden lg:flex' : ''}`}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedFilter === filter.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
        <div className="flex min-h-[calc(100vh-280px)] sm:min-h-[500px] lg:min-h-[600px]">
          {/* Conversation List - Hidden on mobile when conversation is selected */}
          <div className={`w-full lg:w-1/3 lg:border-r border-amber-100 ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <div className="divide-y divide-amber-50">
              {filteredConversations.length === 0 ? (
                <div className="p-6 sm:p-8 text-center text-gray-500 text-sm sm:text-base">
                  No conversations in this category
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const keeper = getKeeper(conv.keeperId);
                  const lastMessage = conv.messages[conv.messages.length - 1];
                  const isSelected = selectedConversation?.id === conv.id;

                  return (
                    <div
                      key={conv.id}
                      onClick={() => handleSelectConversation(conv)}
                      className={`p-3 sm:p-4 cursor-pointer transition-colors active:bg-amber-100 ${
                        isSelected ? 'bg-amber-50' : 'hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={keeper.photo}
                            alt={keeper.name}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover"
                          />
                          {conv.unread && (
                            <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className={`font-medium truncate text-sm sm:text-base ${conv.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                              {keeper.name}
                            </h4>
                            <span className="text-[10px] sm:text-xs text-gray-500 flex-shrink-0">
                              {formatTime(lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className={`text-xs sm:text-sm truncate mt-0.5 sm:mt-1 ${conv.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {lastMessage.fromMe ? 'You: ' : ''}{lastMessage.text}
                          </p>
                        </div>
                        {/* Chevron for mobile */}
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Conversation View */}
          <div className={`w-full lg:w-2/3 flex flex-col ${selectedConversation ? '' : 'hidden lg:flex'}`}>
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-3 sm:p-4 border-b border-amber-100 flex items-center gap-3">
                  {/* Back button - mobile only */}
                  <button
                    onClick={handleBack}
                    className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <img
                    src={getKeeper(selectedConversation.keeperId).photo}
                    alt={getKeeper(selectedConversation.keeperId).name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {getKeeper(selectedConversation.keeperId).name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">
                      {getKeeper(selectedConversation.keeperId).location}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/profile/${selectedConversation.keeperId}`)}
                    className="text-amber-600 hover:text-amber-700 font-medium text-xs sm:text-sm flex items-center gap-1 transition-colors flex-shrink-0"
                  >
                    <span className="hidden sm:inline">View Profile</span>
                    <span className="sm:hidden">Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 ${
                          msg.fromMe
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                            : 'bg-amber-50 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[10px] sm:text-xs mt-1 ${msg.fromMe ? 'text-amber-100' : 'text-gray-500'}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-3 sm:p-4 border-t border-amber-100">
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm sm:text-base"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <span className="hidden sm:inline">Send</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* No conversation selected - desktop only */
              <div className="flex-1 flex items-center justify-center text-center p-6 sm:p-8">
                <div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">💬</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h4>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Messages;
