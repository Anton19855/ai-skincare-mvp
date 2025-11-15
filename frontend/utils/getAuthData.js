// utils/getAuthData.js

export const getAuthData = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("auth="));

    if (!cookie) return null;

    const encodedValue = cookie.split("=")[1];
    if (!encodedValue) return null;

    const decoded = decodeURIComponent(encodedValue);
    const authData = JSON.parse(decoded);

    // Проверка на структуру
    if (!authData.token || !authData.user) return null;

    return authData;

  } catch (error) {
    console.error("Error parsing auth cookie:", error);
    return null;
  }
};
