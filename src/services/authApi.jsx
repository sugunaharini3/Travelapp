// src/services/authApi.jsx

const TOKEN_KEY = "auth_token";

// Save authentication token to localStorage
export function saveToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Failed to save token", error);
  }
}

// Retrieve current authentication token
export function getCurrentToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to retrieve token", error);
    return null;
  }
}

// Remove authentication token on logout
export function logoutUser() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Failed to remove token", error);
  }
}