// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { saveToken, getCurrentToken, logoutUser } from "../services/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize registered users from localStorage for persistence
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("registered_users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initialize active user based on stored token or state
  const [user, setUser] = useState(() => {
    const token = getCurrentToken();
    if (token && token !== "expired_token") {
      try {
        const savedUser = localStorage.getItem("auth_user");
        return savedUser ? JSON.parse(savedUser) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [error, setError] = useState("");

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("registered_users", JSON.stringify(registeredUsers));
    } catch (err) {
      console.error("Failed to save registered users to localStorage", err);
    }
  }, [registeredUsers]);

  // Signup function - creates a new user account and persists it
  const signup = (name, email, password) => {
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      setError("An account with this email already exists. Please log in.");
      return false;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    setError("");
    return true;
  };

  // Login function - validates against registered users and issues a token
  const login = (email, password) => {
    const existingUser = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      setError("Invalid email or password. Please check your credentials or sign up first.");
      return false;
    }

    const userData = { name: existingUser.name, email: existingUser.email };
    setUser(userData);
    
    // Save token and user info to localStorage for Experiment 4 persistence
    saveToken("mock-jwt-token-xyz123");
    localStorage.setItem("auth_user", JSON.stringify(userData));
    
    setError("");
    return true;
  };

  const logout = () => {
    setUser(null);
    logoutUser();
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}