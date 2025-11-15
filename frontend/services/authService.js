// services/authService.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper: POST request to backend
const postRequest = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Request failed');
  }

  // Save token and user into cookie
  if (json.token && json.user) {
    const authData = {
      token: json.token,
      user: json.user
    };

    document.cookie =
      `auth=${encodeURIComponent(JSON.stringify(authData))}; path=/; SameSite=Lax`;
  }

  return json;
};

// SIGNUP
export const signup = async (name, email, password) => {
  return postRequest('/auth/signup', { name, email, password });
};

// LOGIN
export const login = async (email, password) => {
  return postRequest('/auth/login', { email, password });
};
