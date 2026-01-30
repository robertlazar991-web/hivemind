import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Available options
const hiveSizeOptions = [
  'Under 50 members',
  '50 - 150 members',
  '150 - 500 members',
  '500 - 1,500 members',
  '1,500+ members',
];
const platformOptions = ['Skool', 'WhatsApp', 'Telegram', 'Discord', 'Website', 'Other'];
const skillOptions = [
  'Meditation', 'Leadership Coaching', 'Community Building', 'Breathwork', 'Retreat Facilitation',
  'Permaculture', 'Sound Healing', 'Yoga', 'Art Therapy', 'Somatic Work', 'Plant Medicine',
  'Marketing', 'Technology', 'Writing', 'Public Speaking', 'Facilitation', 'Herbalism',
];
const collaborationOptions = [
  'Co-hosting retreats',
  'Guest teaching/speaking',
  'Cross-pollination',
  'Joint programs',
  'Knowledge exchange',
  'Mentorship',
];

function EditProfile() {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form state with initial data
  const [formData, setFormData] = useState({
    name: 'Sarah',
    location: 'San Francisco, CA',
    tagline: 'Meditation & Conscious Leadership',
    bio: 'I guide conscious entrepreneurs and community leaders on their journey to authentic leadership. With over 10 years of experience in meditation and mindfulness practices, I help others cultivate inner peace while building thriving communities.',
    vision: 'A world where every community leader leads from a place of presence, compassion, and authentic connection.',
    mission: 'I help conscious leaders build thriving communities by integrating mindfulness practices into their leadership approach.',
    skills: ['Meditation', 'Leadership Coaching', 'Community Building', 'Breathwork', 'Retreat Facilitation'],
    openTo: ['Co-hosting retreats', 'Guest teaching/speaking', 'Cross-pollination', 'Mentorship', 'Knowledge exchange'],
    hives: [
      {
        name: 'Consciousness Collective',
        platform: 'Skool',
        sizeCategory: '50 - 150 members',
        link: 'https://skool.com/consciousness-collective',
      },
    ],
  });

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle hive changes
  const handleHiveChange = (index, field, value) => {
    setFormData(prev => {
      const newHives = [...prev.hives];
      newHives[index] = { ...newHives[index], [field]: value };
      return { ...prev, hives: newHives };
    });
  };

  // Add new hive
  const addHive = () => {
    if (formData.hives.length < 3) {
      setFormData(prev => ({
        ...prev,
        hives: [...prev.hives, { name: '', platform: 'Skool', sizeCategory: 'Under 50 members', link: '' }],
      }));
    }
  };

  // Remove hive
  const removeHive = (index) => {
    setFormData(prev => ({
      ...prev,
      hives: prev.hives.filter((_, i) => i !== index),
    }));
  };

  // Toggle skill
  const toggleSkill = (skill) => {
    setFormData(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  // Toggle collaboration option
  const toggleCollaboration = (option) => {
    setFormData(prev => {
      if (prev.openTo.includes(option)) {
        return { ...prev, openTo: prev.openTo.filter(o => o !== option) };
      } else {
        return { ...prev, openTo: [...prev.openTo, option] };
      }
    });
  };

  // Handle save
  const handleSave = () => {
    // In a real app, this would save to backend
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      navigate('/my-profile');
    }, 1500);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-amber-700 mt-1">Update your profile information</p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Personal Info Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>👤</span>
            Personal Info
          </h2>

          {/* Profile Photo */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-amber-200"
              />
              <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-xl font-medium hover:bg-amber-200 transition-all text-sm">
                Change Photo
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Your name"
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="City, Country"
            />
          </div>

          {/* Tagline */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => handleChange('tagline', e.target.value)}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Meditation & Conscious Leadership"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">About / Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="Tell others about yourself and your work..."
            />
          </div>
        </div>

        {/* My Hive Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🐝</span>
            My Hive(s)
          </h2>

          {formData.hives.map((hive, index) => (
            <div key={index} className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-amber-700">Hive {index + 1}</span>
                {formData.hives.length > 1 && (
                  <button
                    onClick={() => removeHive(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Hive Name</label>
                  <input
                    type="text"
                    value={hive.name}
                    onChange={(e) => handleHiveChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="Community name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Size</label>
                  <select
                    value={hive.sizeCategory}
                    onChange={(e) => handleHiveChange(index, 'sizeCategory', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  >
                    {hiveSizeOptions.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Platform</label>
                  <select
                    value={hive.platform}
                    onChange={(e) => handleHiveChange(index, 'platform', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  >
                    {platformOptions.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Link</label>
                  <input
                    type="url"
                    value={hive.link}
                    onChange={(e) => handleHiveChange(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.hives.length < 3 && (
            <button
              onClick={addHive}
              className="w-full py-2.5 border-2 border-dashed border-amber-300 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Another Hive
            </button>
          )}
        </div>

        {/* Vision & Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>✨</span>
            Vision & Mission
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
            <textarea
              value={formData.vision}
              onChange={(e) => handleChange('vision', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="A world where..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
            <textarea
              value={formData.mission}
              onChange={(e) => handleChange('mission', e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              placeholder="I help..."
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span>
            Skills
          </h2>
          <p className="text-sm text-gray-500 mb-3">Select all that apply</p>

          <div className="flex flex-wrap gap-2">
            {skillOptions.map(skill => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  formData.skills.includes(skill)
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Open to Collaborate Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🤝</span>
            Open to Collaborate
          </h2>
          <p className="text-sm text-gray-500 mb-3">What types of collaboration are you open to?</p>

          <div className="space-y-2">
            {collaborationOptions.map(option => (
              <label
                key={option}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  formData.openTo.includes(option)
                    ? 'bg-amber-100 border-2 border-amber-400'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.openTo.includes(option)}
                  onChange={() => toggleCollaboration(option)}
                  className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                />
                <span className={`font-medium ${formData.openTo.includes(option) ? 'text-amber-800' : 'text-gray-700'}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate('/my-profile')}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-pulse">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Profile updated!
        </div>
      )}
    </main>
  );
}

export default EditProfile;
