// utils/auth.js

export const getAuthData = () => {
  if (typeof window === 'undefined') return null;

  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth='))
    ?.split('=')[1];

  return value ? JSON.parse(decodeURIComponent(value)) : null;
};
