import { useState, useEffect, useCallback } from "react";
import { getUserMedia, uploadMedia, deleteMedia } from "../../services/media";
import type { Media, MediaType } from "../../types/media";
import { apiErrorMessage } from "../../lib/influencer";

export const useMedia = (type?: MediaType) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserMedia();
      const filtered = type ? data.filter((m) => m.type === type) : data;
      setMedia(filtered);
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to fetch media"));
    } finally {
      setLoading(false);
    }
  }, [type]);
  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const upload = async (file: File, title?: string, description?: string, genre?: string) => {
    try {
      setLoading(true);
      setError(null);
      const uploaded = await uploadMedia(file, title, description, genre);
      setMedia((prev) => [uploaded, ...prev]);
      return uploaded;
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to upload media"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoading(true);
      await deleteMedia(id);
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(apiErrorMessage(err, "Failed to delete media"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { media, loading, error, upload, remove, refetch: fetchMedia };
};
