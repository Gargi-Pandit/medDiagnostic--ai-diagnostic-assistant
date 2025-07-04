const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
};

// Authentication services
export const authService = {
  async signup(username, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    return response.json();
  },

  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    
    // Decode JWT to get username (simple base64 decode)
    try {
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      localStorage.setItem('username', payload.username);
    } catch (err) {
      // Fallback to input username if JWT decode fails
      localStorage.setItem('username', username);
    }
    
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('userLogin'));
    
    return data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
    // Dispatch custom event to update navbar
    window.dispatchEvent(new Event('userLogout'));
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

// Image analysis service
export const analyzeMedicalImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/image/analyze`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Image analysis failed');
  }

  return response.json();
};

// Symptom analysis service
export const analyzeSymptoms = async (symptoms) => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/symptom/analyze`, {
    method: 'POST',
    body: JSON.stringify({ symptoms }),
  });
};

// User history service
export const getUserHistory = async () => {
  return makeAuthenticatedRequest(`${API_BASE_URL}/user/history`);
};