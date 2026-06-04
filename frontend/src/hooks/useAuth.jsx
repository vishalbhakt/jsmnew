import { createContext, useContext, useMemo, useState } from "react";

import { api } from "../services/api";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem("jsm_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(false);

  async function login(credentials) {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/token/", credentials);
      localStorage.setItem("jsm_access_token", data.access);
      localStorage.setItem("jsm_refresh_token", data.refresh);
      localStorage.setItem("jsm_user", JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register/", payload);
      return data;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("jsm_access_token");
    localStorage.removeItem("jsm_refresh_token");
    localStorage.removeItem("jsm_user");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, logout, register, isAuthenticated: Boolean(user) }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
