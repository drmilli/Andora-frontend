import { useState, useContext } from "react";
import { loginUser, signupUser } from "../../services/auth";
import type { LoginPayload, SignupPayload } from "../../types/auth";
import { AppContext } from "../../Context/AppContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAuth must be used within AppProvider");
  }

  const { setToken, setUser } = context;

  const login = async (payload: LoginPayload) => {
    console.log(payload)
    try {
      setLoading(true);
      setError(null);

      const data = await loginUser(payload);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: SignupPayload) => {
    console.log(payload)
    try {
      setLoading(true);
      setError(null);
      const data = await signupUser(payload);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  console.log(error)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return { login, register, logout, loading, error };
};
