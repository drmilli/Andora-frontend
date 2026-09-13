import api from "../../../lib/axios";
import type { PaginatedInfluencerRequests } from "../../../types/influencer/requests";

export const fetchInfluencerRequests = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedInfluencerRequests> => {
  const res = await api.get("/influencer/me/requests", {
    params: { page, limit },
  });
  return res.data; 
};
