import api from "../lib/axios";
import type { Media } from "../types/media";

export const getUserMedia = async (): Promise<Media[]> => {
  const res = await api.get("/media/mine");
  return res.data;
};

export const uploadMedia = async (
  file: File,
  title?: string,
  description?: string,
  genre?: string
): Promise<Media> => {
  const formData = new FormData();
  formData.append("file", file);
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);
  if (genre) formData.append("genre", genre);
  const res = await api.post("/media/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMedia = async (id: string): Promise<void> => {
  await api.delete(`/media/${id}`);
};

export const getMediaById = async (id: string): Promise<Media> => {
  const res = await api.get(`/media/${id}`);
  return res.data;
};

/** Engagement counters — these feed the statistics screen. */
export const recordPlay = async (id: string) => {
  const res = await api.post(`/media/${id}/play`);
  return res.data as { id: string; plays: number; likes: number; downloads: number };
};

export const recordLike = async (id: string) => {
  const res = await api.post(`/media/${id}/like`);
  return res.data as { id: string; plays: number; likes: number; downloads: number };
};

export const recordDownload = async (id: string) => {
  const res = await api.post(`/media/${id}/download`);
  return res.data as { id: string; plays: number; likes: number; downloads: number };
};
