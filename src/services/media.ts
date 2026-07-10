import api from "../lib/axios";
import type { Media } from "../types/media";

export const getUserMedia = async (): Promise<Media[]> => {
  const res = await api.get("/media/mine");
  return res.data;
};

export const uploadMedia = async (
  file: File,
  title?: string,
  description?: string
): Promise<Media> => {
  const formData = new FormData();
  formData.append("file", file);
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);
  const res = await api.post("/media/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMedia = async (id: string): Promise<void> => {
  await api.delete(`/media/${id}`);
};
