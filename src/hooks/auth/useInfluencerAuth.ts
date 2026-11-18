import { useState, useContext } from "react";
import { influencerLogin, influencerSignup } from "../../services/influencer/auth/authService";
import type { LoginInfluencerPayload, SignupInfluencerPayload } from "../../types/influencer/auth";
import axios from "axios";
import { AppContext } from "../../Context/AppContext";
import { apiErrorMessage } from "../../lib/influencer";

export const useInfluencerAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useInfluencerAuth must be used within AppProvider");
  }

  const { setToken, setUser } = context;

  const login = async (payload: LoginInfluencerPayload) => {
    console.log(payload);
    try {
      setLoading(true);
      setError(null);

      const data = await influencerLogin(payload);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      console.error("Login error:", err);
      setError(apiErrorMessage(err, "Login failed"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: SignupInfluencerPayload) => {
    console.log(payload);
    try {
      setLoading(true);
      setError(null);
      const data = await influencerSignup(payload);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const data = axios.isAxiosError(err) ? err.response?.data : undefined;
      console.error("Register error status:", axios.isAxiosError(err) ? err.response?.status : undefined);
      console.error("Register error response body:", data);
      const serverMessage =
        (typeof data === "string" && data) || apiErrorMessage(err, "Register failed");
      setError(serverMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  console.log(error);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return { login, register, logout, loading, error };
};

// Also export as useAuth for backward compatibility
export const useAuth = useInfluencerAuth;
