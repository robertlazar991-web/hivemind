import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { hivekeepers } from '../data/hivekeepers';

// Helper to get hivekeeper by name
const getHivekeeperByName = (name) => {
  return hivekeepers.find(h => h.name === name) || null;
};

// Helper to format relative time
const getRelativeTime = (daysAgo) => {
  if (daysAgo === 0) return 'Today';
  if (daysAgo === 1) return 'Yesterday';
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 14) return '1 week ago';
  return `${Math.floor(daysAgo / 7)} weeks ago`;
};

// Available tags
const availableTags = [
  'Retreats', 'Workshops', 'Speaking', 'Teaching', 'Mentorship',
  'Cross-pollination', 'Research', 'Europe', 'USA', 'Online',
  'Breathwork', 'Somatic', 'Permaculture', 'Leadership', 'Marketing',
  'New Leaders', 'Psychedelics', 'Sound Healing', 'Art', 'Community'
];

function Collaborate() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [responseSent, setResponseSent] = useState(false);

  // New post form state
  const [newPost, setNewPost] = useState({
    type: 'looking',
    title: '',
    description: '',
    tags: [],
    expiration: 30,
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: 'looking',
      title: 'Co-host for Portugal retreat (March 2026)',
      description: 'Looking for an experienced retreat facilitator to co-host a 7-day mindfulness and somatic retreat in Portugal. We have the venue and marketing handled, seeking someone with strong facilitation skills and ideally a complementary offering (movement, breathwork, etc.).',
      author: 'Maya Chen',
      tags: ['Retreats', 'Europe', 'Somatic'],
      daysAgo: 3,
    },
    {
      id: 2,
      type: 'offering',
      title: 'Guest teaching spots at permaculture program',
      description: 'I have 3 guest teaching slots available in our 12-week permaculture certification program starting April 2026. Perfect for Hivekeepers with expertise in soil science, water management, or community organizing. Great exposure to 25+ dedicated learners.',
      author: 'David Rivera',
      tags: ['Teaching', 'Permaculture'],
      daysAgo: 1,
    },
    {
      id: 3,
      type: 'looking',
      title: 'Research partner for consciousness study',
      description: 'Seeking a research collaborator for a study on the intersection of art, consciousness, and healing. Looking for someone with academic connections or research experience. Open to creative methodologies.',
      author: 'Luna Morales',
      tags: ['Research', 'Psychedelics'],
      daysAgo: 5,
    },
    {
      id: 4,
      type: 'offering',
      title: 'Free promotional exchange for aligned hives',
      description: 'Offering cross-promotional opportunities through my Conscious Tech Leaders community (2,500+ members). Looking to exchange with hives focused on wellbeing, sustainability, or conscious business. Let\'s amplify each other\'s work!',
      author: 'Alex Kim',
      tags: ['Cross-pollination', 'Marketing'],
      daysAgo: 2,
    },
    {
      id: 5,
      type: 'looking',
      title: 'Guest speaker for leadership intensive',
      description: 'Need a dynamic speaker for our 3-day leadership intensive in Chicago (February 2026). Topic: "Leading with Purpose in Uncertain Times." Honorarium provided plus travel expenses.',
      author: 'Marcus Thompson',
      tags: ['Speaking', 'Leadership'],
      daysAgo: 4,
    },
    {
      id: 6,
      type: 'offering',
      title: 'Mentorship for emerging Hivekeepers',
      description: 'Opening up 2 mentorship spots for new community leaders. 6 months of bi-weekly calls, guidance on building authentic community, and integration of wellness practices into your leadership. Application-based.',
      author: 'Priya Sharma',
      tags: ['Mentorship', 'New Leaders'],
      daysAgo: 0,
    },
    {
      id: 7,
      type: 'looking',
      title: 'Hive to cross-pollinate breathwork workshop',
      description: 'I\'ve developed a powerful 2-hour breathwork journey and I\'m looking for aligned communities to share it with. Ideally hives focused on healing, wellness, or personal growth. I can host online or travel for in-person.',
      author: 'Sarah Johnson',
      tags: ['Cross-pollination', 'Breathwork'],
      daysAgo: 6,
    },
    {
      id: 8,
      type: 'offering',
      title: 'Sound bath collaborations available',
      description: 'Available for sound bath collaborations at retreats, events, or community gatherings. I bring crystal bowls, gongs, and 10+ years of experience. Open to creative partnerships and energy exchange arrangements.',
      author: 'Jordan Ellis',
      tags: ['Sound Healing', 'Retreats'],
      daysAgo: 8,
    },
  ]);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'looking') return post.type === 'looking';
    if (selectedFilter === 'offering') return post.type === 'offering';
    return true;
  });

  // Handle creating a new post
  const handleCreatePost = (e) => {
    e.preventDefault();
    const currentUser = hivekeepers[0]; // Assume first user is logged in
    const newId = Math.max(...posts.map(p => p.id)) + 1;

    setPosts([{
      id: newId,
      ...newPost,
      author: currentUser.name,
      daysAgo: 0,
    }, ...posts]);

    setShowCreateModal(false);
    setNewPost({
      type: 'looking',
      title: '',
      description: '',
      tags: [],
      expiration: 30,
    });
  };

  // Handle tag toggle
  const toggleTag = (tag) => {
    if (newPost.tags.includes(tag)) {
      setNewPost({ ...newPost, tags: newPost.tags.filter(t => t !== tag) });
    } else if (newPost.tags.length < 5) {
      setNewPost({ ...newPost, tags: [...newPost.tags, tag] });
    }
  };

  // Handle respond
  const handleRespond = () => {
    setResponseSent(true);
    setTimeout(() => {
      setShowRespondModal(null);
      setResponseSent(false);
      setResponseMessage('');
    }, 2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Collaboration Board</h2>
          <p className="text-amber-700 mt-1 text-sm sm:text-base">Find your next cross-pollination partner</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post Request
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-6">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            selectedFilter === 'all'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedFilter('looking')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedFilter === 'looking'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <span>🔍</span>
          Looking For
        </button>
        <button
          onClick={() => setSelectedFilter('offering')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
            selectedFilter === 'offering'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
              : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
          }`}
        >
          <span>🎁</span>
          Offering
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredPosts.map(post => {
          const author = getHivekeeperByName(post.author);
          const primaryHive = author?.hives?.[0];

          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6 hover:shadow-md transition-shadow"
            >
              {/* Type Badge */}
              <div className="mb-4">
                {post.type === 'looking' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                    <span>🔍</span>
                    Looking For
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide">
                    <span>🎁</span>
                    Offering
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{post.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author + Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => author && navigate(`/profile/${author.id}`)}
                >
                  {author && (
                    <img
                      src={author.photo}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-200"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 text-sm hover:text-amber-700 transition-colors">
                      {post.author}
                    </p>
                    {primaryHive && (
                      <p className="text-xs text-gray-500">{primaryHive.name}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-2">{getRelativeTime(post.daysAgo)}</p>
                  <button
                    onClick={() => setShowRespondModal(post)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Respond
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-amber-100">
          <p className="text-gray-500">No posts found matching your filter.</p>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-amber-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
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

            <form onSubmit={handleCreatePost} className="p-6 space-y-5">
              {/* Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What are you posting?</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setNewPost({ ...newPost, type: 'looking' })}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      newPost.type === 'looking'
                        ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span>🔍</span>
                    I'm looking for...
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewPost({ ...newPost, type: 'offering' })}
                    className={`flex-1 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      newPost.type === 'offering'
                        ? 'bg-green-100 text-green-700 border-2 border-green-300'
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
                    }`}
                  >
                    <span>🎁</span>
                    I'm offering...
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder={newPost.type === 'looking' ? "What are you looking for?" : "What are you offering?"}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={4}
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  placeholder="Describe what you're looking for or offering in detail..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags <span className="text-gray-400 font-normal">(select up to 5)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        newPost.tags.includes(tag)
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expiration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">This post expires in</label>
                <select
                  value={newPost.expiration}
                  onChange={(e) => setNewPost({ ...newPost, expiration: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Respond Modal */}
      {showRespondModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            {!responseSent ? (
              <div className="p-6">
                {/* Post Preview */}
                <div className="mb-4 p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    {showRespondModal.type === 'looking' ? (
                      <span className="text-xs font-bold text-blue-700 uppercase">🔍 Looking For</span>
                    ) : (
                      <span className="text-xs font-bold text-green-700 uppercase">🎁 Offering</span>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{showRespondModal.title}</h4>
                  <p className="text-sm text-gray-600">{showRespondModal.description}</p>
                </div>

                {/* Author */}
                {(() => {
                  const author = getHivekeeperByName(showRespondModal.author);
                  return author && (
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={author.photo}
                        alt={author.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-amber-200"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{author.name}</p>
                        <p className="text-xs text-gray-500">{author.location}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Write a message to {showRespondModal.author.split(' ')[0]}
                  </label>
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                    placeholder={`Hi ${showRespondModal.author.split(' ')[0]}, I'm interested in your post about...`}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowRespondModal(null);
                      setResponseMessage('');
                    }}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRespond}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Response Sent!</h3>
                <p className="text-gray-600">
                  {showRespondModal.author.split(' ')[0]} will receive your message in their inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Collaborate;
