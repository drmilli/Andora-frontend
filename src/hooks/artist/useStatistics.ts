import { useEffect, useState } from "react";
import type { ArtistStatistics } from "@/types/artist/statistics";
import { fetchArtistStatistics } from "@/services/artist/statistics";
import { apiErrorMessage } from "@/lib/influencer";

export function useStatistics(months = 12) {
  const [stats, setStats] = useState<ArtistStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArtistStatistics(months)
      .then(setStats)
      .catch((err) => setError(apiErrorMessage(err, "Could not load your statistics")))
      .finally(() => setLoading(false));
  }, [months]);

  const topSongs = (stats?.tracks ?? []).slice(0, 5).map((t) => ({
    title: t.title ?? "Untitled",
    streams: t.streams,
    likes: t.likes,
    downloads: t.downloads,
  }));

  const streamData = (stats?.monthly ?? []).map((m) => ({
    month: m.month,
    value: m.plays,
  }));

  return { stats, loading, error, topSongs, streamData };
}
