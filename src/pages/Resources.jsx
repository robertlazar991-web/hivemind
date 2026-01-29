import { useState } from 'react';

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Introduction to Mindfulness Practice',
      description: 'A comprehensive guide to starting your mindfulness journey with practical exercises and daily practices.',
      category: 'Mindfulness',
      author: 'Maya Chen',
      type: 'Guide',
      likes: 156,
    },
    {
      id: 2,
      title: 'Permaculture Principles for Beginners',
      description: 'Learn the 12 principles of permaculture and how to apply them in your garden and community.',
      category: 'Sustainability',
      author: 'David Rivera',
      type: 'Course',
      likes: 89,
    },
    {
      id: 3,
      title: 'Moon Cycle Rituals',
      description: 'Explore the power of lunar cycles and how to create meaningful ceremonies for each phase.',
      category: 'Spirituality',
      author: 'Sarah Johnson',
      type: 'Guide',
      likes: 234,
    },
    {
      id: 4,
      title: 'Conscious Leadership Toolkit',
      description: 'Essential frameworks and practices for leading with awareness, empathy, and purpose.',
      category: 'Leadership',
      author: 'Alex Kim',
      type: 'Toolkit',
      likes: 312,
    },
    {
      id: 5,
      title: 'Herbal Medicine Basics',
      description: 'An introduction to common healing herbs, their properties, and how to prepare simple remedies.',
      category: 'Wellness',
      author: 'Amara Okafor',
      type: 'Course',
      likes: 178,
    },
    {
      id: 6,
      title: 'Sound Healing Frequencies',
      description: 'Discover the science behind sound healing and experience guided sound bath recordings.',
      category: 'Wellness',
      author: 'Jordan Ellis',
      type: 'Audio',
      likes: 267,
    },
  ];

  const categories = ['all', ...new Set(resources.map(r => r.category))];

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const typeIcons = {
    Guide: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    Course: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    Toolkit: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    Audio: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Resources</h2>
          <p className="text-amber-700 mt-1">Collective wisdom from our community</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Share Resource
        </button>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div
            key={resource.id}
            className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                {resource.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                {typeIcons[resource.type]}
                <span className="text-sm">{resource.type}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{resource.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-amber-100">
              <span className="text-sm text-amber-600">By {resource.author}</span>
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{resource.likes}</span>
              </div>
            </div>

            <button className="mt-4 w-full px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all">
              View Resource
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Resources;
