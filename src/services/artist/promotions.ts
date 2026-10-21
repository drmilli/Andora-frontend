import api from "../../lib/axios";
import type {
  CreatePromotionRequestPayload,
  InfluencerListItem,
  PaginatedInfluencers,
} from "../../types/artist/promotion";
import type { PaginatedInfluencerRequests, GetInfluencerRequest } from "../../types/influencer/requests";

/** Browse influencers an artist can hire. `platform` filters to those with a handle for it. */
export const fetchInfluencers = async (opts: {
  search?: string;
  platform?: string;
  page?: number;
  limit?: number;
} = {}): Promise<PaginatedInfluencers> => {
  const res = await api.get("/influencer", {
    params: {
      page: opts.page ?? 1,
      limit: opts.limit ?? 20,
      ...(opts.search ? { search: opts.search } : {}),
      ...(opts.platform && opts.platform !== "all" ? { platform: opts.platform } : {}),
    },
  });
  return res.data;
};

export const fetchInfluencerById = async (id: string): Promise<InfluencerListItem> => {
  const res = await api.get(`/influencer/${id}`);
  return res.data;
};

/**
 * Hire an influencer. The amount is debited from the artist's wallet immediately
 * and held in escrow, so the wallet must be funded first.
 */
export const createPromotionRequest = async (
  influencerId: string,
  payload: CreatePromotionRequestPayload
): Promise<GetInfluencerRequest> => {
  const res = await api.post(`/influencer/${influencerId}/requests`, payload);
  return res.data;
};

/** The artist's own outgoing promotion requests. */
export const fetchSentPromotionRequests = async (
  page = 1,
  limit = 10,
  status?: string
): Promise<PaginatedInfluencerRequests> => {
  const res = await api.get("/influencer/requests/sent", {
    params: { page, limit, ...(status ? { status } : {}) },
  });
  return res.data;
};

/** Artist-side dispute on a promotion they paid for. */
export const disputeSentRequest = async (
  id: string,
  payload: { reason: string }
): Promise<{ message: string; request: GetInfluencerRequest }> => {
  const res = await api.post(`/influencer/requests/${id}/dispute`, payload);
  return res.data;
};
