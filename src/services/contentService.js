const API_BASE_URL = 'http://localhost:3000/api';

class ContentService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Get all content with filters
  async getAllContent(filters = {}) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await fetch(`${this.baseURL}/content?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    return response.json();
  }

  // Get content by type and category
  async getContentByTypeAndCategory(type, category, page = 1, limit = 10) {
    const response = await fetch(
      `${this.baseURL}/content/${type}/${category}?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    return response.json();
  }

  // Get trending content
  async getTrendingContent(type, limit = 10) {
    const response = await fetch(
      `${this.baseURL}/content/trending/${type}?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch trending content');
    }
    return response.json();
  }

  // Get single content item
  async getContentById(id) {
    const response = await fetch(`${this.baseURL}/content/item/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    return response.json();
  }

  // Create new content
  async createContent(contentData) {
    const response = await fetch(`${this.baseURL}/content`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(contentData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create content');
    }
    return response.json();
  }

  // Update content
  async updateContent(id, contentData) {
    const response = await fetch(`${this.baseURL}/content/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(contentData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update content');
    }
    return response.json();
  }

  // Delete content
  async deleteContent(id) {
    const response = await fetch(`${this.baseURL}/content/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete content');
    }
    return response.json();
  }

  // Like/unlike content
  async toggleLike(id) {
    const response = await fetch(`${this.baseURL}/content/${id}/like`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to toggle like');
    }
    return response.json();
  }

  // Get user's content
  async getUserContent(filters = {}) {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        params.append(key, filters[key]);
      }
    });

    const response = await fetch(`${this.baseURL}/content/user/me?${params}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user content');
    }
    return response.json();
  }

  // Get user's liked content
  async getLikedContent(page = 1, limit = 10) {
    const response = await fetch(
      `${this.baseURL}/user/liked?page=${page}&limit=${limit}`,
      {
        headers: this.getAuthHeaders()
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch liked content');
    }
    return response.json();
  }

  // Get user statistics
  async getUserStats() {
    const response = await fetch(`${this.baseURL}/user/stats`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user statistics');
    }
    return response.json();
  }

  // Get public user profile
  async getPublicProfile(username) {
    const response = await fetch(`${this.baseURL}/user/profile/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return response.json();
  }
}

export default new ContentService();
