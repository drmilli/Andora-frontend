import { useEffect, useState } from "react";
import { fetchCampaigns } from "@/services/artist/campaigns";
import type { Campaign } from "@/types/artist/campaign";

/**
 * The artist's campaigns for the dashboard:
 *  - top: live or finished campaigns, furthest along first
 *  - recent: newest submissions of any status except withdrawn
 */
export function useCampaignHighlights() {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCampaigns(1, 50)
      .then((res) => !cancelled && setCampaigns(res.data))
      .catch(() => !cancelled && setError("Could not load your campaigns"));
    return () => {
      cancelled = true;
    };
  }, []);

  const list = campaigns ?? [];
  const top = list
    .filter((c) => c.status === "ACTIVE" || c.status === "COMPLETED")
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);
  const recent = list.filter((c) => c.status !== "CANCELLED").slice(0, 4);

  return { top, recent, loading: campaigns === null && !error, error };
}
