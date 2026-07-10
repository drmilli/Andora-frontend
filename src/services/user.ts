import api from "../lib/axios";
import type { User } from "../types/auth";

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const res = await api.put("/users/me", data);
  return res.data;
};

export const uploadProfilePhoto = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  const res = await api.post("/users/me/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
