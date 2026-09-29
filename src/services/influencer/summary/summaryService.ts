import api from "../../../lib/axios";
import type { InfluencerSummaryResponse } from "../../../types/influencer/summary";

/** Dashboard header: request counts per status, per-platform badges, earnings, unread count */
export const fetchInfluencerSummary =
  async (): Promise<InfluencerSummaryResponse> => {
    const res = await api.get("/influencer/me/summary");
    return res.data;
  };
