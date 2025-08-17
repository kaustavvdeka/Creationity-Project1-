import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaHeart, FaEye, FaEdit, FaTrash, FaSpinner, FaBook } from "react-icons/fa";
import contentService from "../../services/contentService";

const Story = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'Fiction',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContent({ type: 'story' });
      setStories(response.content);
    } catch (error) {
      console.error('Error loading stories:', error);
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
        type: 'story',
        tags
      });

      setPostForm({
        title: '',
        content: '',
        category: 'Fiction',
        tags: ''
      });
      setShowPostForm(false);
      loadStories();
    } catch (error) {
      console.error('Error creating story:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (storyId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    try {
      await contentService.toggleLike(storyId);
      loadStories(); // Reload to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await contentService.deleteContent(storyId);
        loadStories();
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  const categories = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Adventure", "Horror", "Fantasy", "Sci-Fi"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaBook className="text-4xl text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-blue-900">Story Corner</h1>
          </div>
          <p className="text-blue-700 text-lg">Share your stories and discover amazing tales</p>
        </div>

        {/* Post Button */}
        <div className="text-center mb-8">
          {isAuthenticated ? (
          <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
              <FaPlus className="mr-2" />
              {showPostForm ? 'Cancel' : 'Share a Story'}
          </button>
          ) : (
            <button
              onClick={() => navigate('/Login')}
              className="flex items-center mx-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              Login to Share a Story
            </button>
          )}
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Story</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter story title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story</label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your story here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="fiction, mystery, adventure"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Posting...
                    </span>
                  ) : (
                    'Post Story'
                  )}
                </button>
            </div>
            </form>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {story.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {user && story.author._id === user._id && (
                        <>
                          <button
                            onClick={() => navigate(`/edit/${story._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(story._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-4">{story.content}</p>
                  
                  {story.tags && story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {story.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(story._id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          story.likes?.includes(user?._id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <FaHeart size={14} />
                        <span>{story.likeCount || 0}</span>
          </button>
                      <div className="flex items-center space-x-1">
                        <FaEye size={14} />
                        <span>{story.views || 0}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{story.author.username}</p>
                      <p className="text-xs">{new Date(story.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl text-blue-300 mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No stories yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share an amazing story!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Share Your First Story
          </button>
              ) : (
              <button
                  onClick={() => navigate('/Login')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                  Login to Share
              </button>
              )}
            </div>
          )}
        </div>

        {/* Writing Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">✍️ Story Writing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Start Strong</h4>
              <p>Begin with an engaging opening that hooks your readers from the first sentence.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Show, Don't Tell</h4>
              <p>Use descriptive language and dialogue to bring your characters and scenes to life.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Create Conflict</h4>
              <p>Every good story needs tension and conflict to keep readers engaged.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-2">End Satisfyingly</h4>
              <p>Give your story a satisfying conclusion that resolves the main conflict.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;