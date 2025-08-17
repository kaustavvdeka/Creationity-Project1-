import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaHeart, FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import contentService from "../../services/contentService";

const Poem = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'Nature',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadPoems();
  }, []);

  const loadPoems = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContent({ type: 'poem' });
      setPoems(response.content);
    } catch (error) {
      console.error('Error loading poems:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    try {
      setSubmitting(true);
      const tags = postForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      await contentService.createContent({
        ...postForm,
        type: 'poem',
        tags
      });

      setPostForm({
        title: '',
        content: '',
        category: 'Nature',
        tags: ''
      });
      setShowPostForm(false);
      loadPoems();
    } catch (error) {
      console.error('Error creating poem:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (poemId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    try {
      await contentService.toggleLike(poemId);
      loadPoems(); // Reload to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (poemId) => {
    if (window.confirm('Are you sure you want to delete this poem?')) {
      try {
        await contentService.deleteContent(poemId);
        loadPoems();
      } catch (error) {
        console.error('Error deleting poem:', error);
      }
    }
  };

  const categories = ["Nature", "Love", "Dreams", "Life", "Friendship", "Inspiration"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Poetry Corner</h1>
          <p className="text-purple-700 text-lg">Discover and share beautiful poems</p>
        </div>

        {/* Post Button */}
        <div className="text-center mb-8">
          {isAuthenticated ? (
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              {showPostForm ? 'Cancel' : 'Share a Poem'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/Login')}
              className="flex items-center mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              Login to Share a Poem
            </button>
          )}
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Poem</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter poem title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Poem</label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Write your poem here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="poetry, nature, love"
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
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Posting...
                    </span>
                  ) : (
                    'Post Poem'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Poems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.length > 0 ? (
            poems.map((poem) => (
              <div key={poem._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                      {poem.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {user && poem.author._id === user._id && (
                        <>
                          <button
                            onClick={() => navigate(`/edit/${poem._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(poem._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{poem.title}</h3>
                  <p className="text-gray-700 mb-4 whitespace-pre-line">{poem.content}</p>
                  
                  {poem.tags && poem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {poem.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(poem._id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          poem.likes?.includes(user?._id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <FaHeart size={14} />
                        <span>{poem.likeCount || 0}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <FaEye size={14} />
                        <span>{poem.views || 0}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{poem.author.username}</p>
                      <p className="text-xs">{new Date(poem.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl text-purple-300 mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No poems yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share a beautiful poem!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Share Your First Poem
                </button>
              ) : (
                <button
                  onClick={() => navigate('/Login')}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Login to Share
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poem;