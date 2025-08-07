import React, { createContext, useState, useContext } from "react";

// Dummy authentication - replace with backend API integration as needed

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  // Check for persisted authentication
  const localToken = localStorage.getItem("auth_token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!localToken);
  const [token, setToken] = useState(localToken);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    // Simulate authentication
    // Replace with real API endpoint
    if (email && password) {
      const fakeToken = `${email}-mocktoken`;
      setIsAuthenticated(true);
      setToken(fakeToken);
      localStorage.setItem("auth_token", fakeToken);
      return { success: true };
    }
    return { success: false, error: "Missing credentials" };
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
