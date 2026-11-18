import api from "../lib/axios";
import type { LoginPayload, AuthResponse, SignupPayload } from "../types/auth";


//artist
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  console.log(res.data);
  return res.data;
};

export const signupUser = async (data: SignupPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

//influencer
export { influencerLogin, influencerSignup } from "./influencer/auth/authService";

//radio station

//tv
// --- Password reset ---
// The email and the short-lived reset token are carried between the three
// screens in sessionStorage, so a refresh mid-flow doesn't lose them.
const RESET_EMAIL_KEY = "audora.resetEmail";
const RESET_TOKEN_KEY = "audora.resetToken";

const store = {
  get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } },
  set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } },
  clear: (k: string) => { try { sessionStorage.removeItem(k); } catch { /* private mode */ } },
};

export const getResetEmail = () => store.get(RESET_EMAIL_KEY);
export const getResetToken = () => store.get(RESET_TOKEN_KEY);
export const clearResetState = () => { store.clear(RESET_EMAIL_KEY); store.clear(RESET_TOKEN_KEY); };

export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  const res = await api.post("/auth/forgot-password", { email });
  store.set(RESET_EMAIL_KEY, email);
  return res.data;
};

export const verifyResetCode = async (email: string, otp: string): Promise<{ resetToken: string }> => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  store.set(RESET_TOKEN_KEY, res.data.resetToken);
  return res.data;
};

export const resetPassword = async (
  resetToken: string,
  password: string,
  password_confirmation: string
): Promise<{ message: string }> => {
  const res = await api.post("/auth/reset-password", { resetToken, password, password_confirmation });
  clearResetState();
  return res.data;
};
