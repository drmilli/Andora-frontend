import { useEffect, useState } from "react";
import type { ArtistStatistics } from "@/types/artist/statistics";
import { fetchArtistStatistics } from "@/services/artist/statistics";
import { apiErrorMessage } from "@/lib/influencer";

type Result = { months: number; stats: ArtistStatistics | null; error: string | null };

export function useStatistics(months = 12) {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchArtistStatistics(months)
      .then((stats) => !cancelled && setResult({ months, stats, error: null }))
      .catch((err) =>
        !cancelled && setResult({ months, stats: null, error: apiErrorMessage(err, "Could not load your statistics") })
      );
    return () => {
      cancelled = true;
    };
  }, [months]);

  // Loading until a result for the range currently asked for has arrived
  const current = result?.months === months ? result : null;
  const stats = current?.stats ?? null;

  // Real per-track counters, highest streams first
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

  return { stats, loading: current === null, error: current?.error ?? null, topSongs, streamData };
}
