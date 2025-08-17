import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaHeart, FaEye, FaEdit, FaTrash, FaSpinner, FaSmileWink } from "react-icons/fa";
import contentService from "../../services/contentService";

const PickUpLine = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pickupLines, setPickupLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'Funny',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPickupLines();
  }, []);

  const loadPickupLines = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContent({ type: 'pickup-line' });
      setPickupLines(response.content);
    } catch (error) {
      console.error('Error loading pickup lines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      setSubmitting(true);
      const tags = postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await contentService.createContent({
        ...postForm,
        type: 'pickup-line',
        tags
      });

      setPostForm({
        title: '',
        content: '',
        category: 'Funny',
        tags: ''
      });
      setShowPostForm(false);
      loadPickupLines();
    } catch (error) {
      console.error('Error creating pickup line:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (pickupLineId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await contentService.toggleLike(pickupLineId);
      loadPickupLines(); // Reload to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (pickupLineId) => {
    if (window.confirm('Are you sure you want to delete this pickup line?')) {
      try {
        await contentService.deleteContent(pickupLineId);
        loadPickupLines();
      } catch (error) {
        console.error('Error deleting pickup line:', error);
      }
    }
  };

  const categories = ["Funny", "Romantic", "Cheesy", "Clever", "Smooth", "Creative", "Classic", "Modern"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaSmileWink className="text-4xl text-pink-600 mr-3" />
            <h1 className="text-4xl font-bold text-pink-900">Pickup Lines</h1>
          </div>
          <p className="text-pink-700 text-lg">Share your best pickup lines and discover charming ways to break the ice</p>
        </div>

        {/* Post Button */}
        <div className="text-center mb-8">
          {isAuthenticated ? (
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center mx-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              {showPostForm ? 'Cancel' : 'Share a Pickup Line'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center mx-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              Login to Share a Pickup Line
            </button>
          )}
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Pickup Line</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Enter pickup line title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Line</label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Write your pickup line here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="funny, romantic, clever"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPostForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Posting...
                    </span>
                  ) : (
                    'Post Pickup Line'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pickup Lines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pickupLines.length > 0 ? (
            pickupLines.map((pickupLine) => (
              <div key={pickupLine._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-pink-100 text-pink-800 text-xs font-medium rounded-full">
                      {pickupLine.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {user && pickupLine.author._id === user._id && (
                        <>
                          <button
                            onClick={() => navigate(`/edit/${pickupLine._id}`)}
                            className="text-pink-600 hover:text-pink-800"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(pickupLine._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pickupLine.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-4">{pickupLine.content}</p>
                  
                  {pickupLine.tags && pickupLine.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {pickupLine.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(pickupLine._id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          pickupLine.likes?.includes(user?._id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <FaHeart size={14} />
                        <span>{pickupLine.likeCount || 0}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <FaEye size={14} />
                        <span>{pickupLine.views || 0}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{pickupLine.author.username}</p>
                      <p className="text-xs">{new Date(pickupLine.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl text-pink-300 mb-4">💕</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No pickup lines yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share a charming pickup line!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Share Your First Pickup Line
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Login to Share
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pickup Line Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💝 Pickup Line Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">Be Original</h4>
              <p>Create unique pickup lines that reflect your personality and creativity.</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">Keep it Respectful</h4>
              <p>Make sure your pickup lines are fun and respectful, not offensive or inappropriate.</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">Use Humor</h4>
              <p>Funny pickup lines often work better than overly serious ones.</p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 mb-2">Be Confident</h4>
              <p>Deliver your pickup line with confidence and a genuine smile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpLine;