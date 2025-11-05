// services/authService.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Helper to send JSON POST requests to backend
 */
const postRequest = async (endpoint, data) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include', // include cookies (if using cookies from backend)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Request failed');
  }

  const json = await res.json();

  // If response includes user field, store it in cookies
  if (json.user && json.token) {
    const payload = {
      user: json.user,
      token: json.token,
    };
    document.cookie = `auth=${encodeURIComponent(JSON.stringify(payload))}; path=/; SameSite=Lax`;
  }

  return json;
};

/**
 * Signup function
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 */
export const signup = async (name, email, password) => {
  return postRequest('/auth/signup', { name, email, password });
};

/**
 * Login function
 * @param {string} email 
 * @param {string} password 
 */
export const login = async (email, password) => {
  return postRequest('/auth/login', { email, password });
};
