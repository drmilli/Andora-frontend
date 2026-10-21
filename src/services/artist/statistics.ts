import api from "../../lib/axios";
import type { ArtistStatistics } from "../../types/artist/statistics";

/** Real per-track and monthly figures for the artist statistics screen. */
export const fetchArtistStatistics = async (
  months = 12
): Promise<ArtistStatistics> => {
  const res = await api.get("/dashboard/statistics", { params: { months } });
  return res.data;
};
