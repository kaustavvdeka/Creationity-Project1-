
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaHeart, FaEye, FaEdit, FaTrash, FaSpinner, FaLaugh } from "react-icons/fa";
import contentService from "../../services/contentService";

const Jokes = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [jokes, setJokes] = useState([]);
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
    loadJokes();
  }, []);

  const loadJokes = async () => {
    try {
      setLoading(true);
      const response = await contentService.getAllContent({ type: 'joke' });
      setJokes(response.content);
    } catch (error) {
      console.error('Error loading jokes:', error);
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
        type: 'joke',
        tags
      });

      setPostForm({
        title: '',
        content: '',
        category: 'Funny',
        tags: ''
      });
      setShowPostForm(false);
      loadJokes();
    } catch (error) {
      console.error('Error creating joke:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (jokeId) => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    try {
      await contentService.toggleLike(jokeId);
      loadJokes(); // Reload to get updated like count
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async (jokeId) => {
    if (window.confirm('Are you sure you want to delete this joke?')) {
      try {
        await contentService.deleteContent(jokeId);
        loadJokes();
      } catch (error) {
        console.error('Error deleting joke:', error);
      }
    }
  };

  const categories = ["Funny", "Dad Jokes", "Puns", "One-Liners", "Knock-Knock", "Clean", "Dark Humor"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaLaugh className="text-4xl text-yellow-600 mr-3" />
            <h1 className="text-4xl font-bold text-yellow-900">Joke Corner</h1>
          </div>
          <p className="text-yellow-700 text-lg">Share your best jokes and make everyone laugh</p>
        </div>

        {/* Post Button */}
        <div className="text-center mb-8">
          {isAuthenticated ? (
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="flex items-center mx-auto px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              {showPostForm ? 'Cancel' : 'Share a Joke'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/Login')}
              className="flex items-center mx-auto px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors shadow-lg"
            >
              <FaPlus className="mr-2" />
              Login to Share a Joke
            </button>
          )}
        </div>

        {/* Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Share Your Joke</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter joke title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Joke</label>
                <textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Write your joke here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={postForm.tags}
                  onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="funny, dad-jokes, puns"
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
                  className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Posting...
                    </span>
                  ) : (
                    'Post Joke'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jokes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jokes.length > 0 ? (
            jokes.map((joke) => (
              <div key={joke._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      {joke.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {user && joke.author._id === user._id && (
                        <>
                          <button
                            onClick={() => navigate(`/edit/${joke._id}`)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(joke._id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <FaTrash size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{joke.title}</h3>
                  <p className="text-gray-700 mb-4 italic">"{joke.content}"</p>
                  
                  {joke.tags && joke.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {joke.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(joke._id)}
                        className={`flex items-center space-x-1 transition-colors ${
                          joke.likes?.includes(user?._id) ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <FaHeart size={14} />
                        <span>{joke.likeCount || 0}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <FaEye size={14} />
                        <span>{joke.views || 0}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{joke.author.username}</p>
                      <p className="text-xs">{new Date(joke.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl text-yellow-300 mb-4">😂</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No jokes yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share a hilarious joke!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => setShowPostForm(true)}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Share Your First Joke
                </button>
              ) : (
                <button
                  onClick={() => navigate('/Login')}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Login to Share
                </button>
              )}
            </div>
          )}
        </div>

        {/* Joke Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">😄 Joke Writing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Keep It Clean</h4>
              <p>Make sure your jokes are appropriate for all audiences and avoid offensive content.</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Timing is Everything</h4>
              <p>Good jokes have perfect timing and delivery. Practice makes perfect!</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Wordplay Works</h4>
              <p>Puns and clever wordplay often make the best jokes. Be creative with language!</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-600 mb-2">Original Content</h4>
              <p>Try to create original jokes or put your own spin on classic ones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jokes;