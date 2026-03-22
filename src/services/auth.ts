import api from "../lib/axios";
import type { LoginPayload, AuthResponse, SignupPayload } from "../types/auth";

export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", data);
  console.log(res.data);
  return res.data;
};

export const signupUser = async (data: SignupPayload): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
