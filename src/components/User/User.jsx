import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaCalendar, FaEye, FaHeart, FaFileAlt } from 'react-icons/fa';
import contentService from '../../services/contentService';

const UserProfile = () => {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });
  const [stats, setStats] = useState(null);
  const [userContent, setUserContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/Login');
      return;
    }
    loadUserData();
  }, [user, navigate]);

  const loadUserData = async () => {
    try {
      const [statsData, contentData] = await Promise.all([
        contentService.getUserStats(),
        contentService.getUserContent({ limit: 5 })
      ]);
      
      setStats(statsData.stats);
      setUserContent(contentData.content);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        setErrors({});
      } else {
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to update profile' });
    }
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      bio: user?.bio || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={user?.avatar || 'https://via.placeholder.com/100/6366f1/ffffff?text=U'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-orange-100"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.username}</h1>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaSave className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Form */}
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter avatar URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about yourself..."
                  maxLength="500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
              {errors.submit && (
                <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200">
                  {errors.submit}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaUser />
                <span>Username: {user?.username}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaEnvelope />
                <span>Email: {user?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendar />
                <span>Joined: {new Date(user?.createdAt).toLocaleDateString()}</span>
              </div>
              {user?.bio && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bio</h3>
                  <p className="text-gray-700">{user.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Statistics */}
        {stats && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <FaFileAlt className="mx-auto text-orange-600 text-2xl mb-2" />
                <div className="text-2xl font-bold text-orange-600">{stats.totalContent}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <FaHeart className="mx-auto text-green-600 text-2xl mb-2" />
                <div className="text-2xl font-bold text-green-600">{stats.totalLikes}</div>
                <div className="text-sm text-gray-600">Total Likes</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <FaEye className="mx-auto text-blue-600 text-2xl mb-2" />
                <div className="text-2xl font-bold text-blue-600">{stats.totalViews}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <FaUser className="mx-auto text-purple-600 text-2xl mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {Object.keys(stats.contentByType).length}
                </div>
                <div className="text-sm text-gray-600">Content Types</div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Content</h2>
            <button
              onClick={() => navigate('/my-content')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              View All
            </button>
          </div>
          {userContent.length > 0 ? (
            <div className="space-y-4">
              {userContent.map((content) => (
                <div key={content._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{content.title}</h3>
                      <p className="text-sm text-gray-600">{content.type} • {content.category}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(content.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FaHeart className="mr-1" />
                        {content.likeCount || 0}
                      </span>
                      <span className="flex items-center">
                        <FaEye className="mr-1" />
                        {content.views || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FaFileAlt className="mx-auto text-4xl mb-4 text-gray-300" />
              <p>No content yet. Start creating!</p>
              <button
                onClick={() => navigate('/Poem')}
                className="mt-2 text-orange-600 hover:text-orange-700 font-medium"
              >
                Create your first post
              </button>
            </div>
          )}
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Actions</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/my-content')}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage My Content
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;