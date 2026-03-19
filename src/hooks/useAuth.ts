import { useState } from "react";
import { loginUser, signupUser } from "./../services/auth";
import type { LoginPayload, SignupPayload } from "../types/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const login = async (payload: LoginPayload) => {
  try {
    setLoading(true);
    setError(null);

    const data = await loginUser(payload);
    localStorage.setItem("token", data.token);
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
    try {
      setLoading(true);
      const data = await signupUser(payload);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Register failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
  };

  return { login, register, logout, loading, error };
};
