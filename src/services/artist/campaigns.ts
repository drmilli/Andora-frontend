import api from "../../lib/axios";
import type {
  Campaign,
  CampaignPackage,
  CreateCampaignPayload,
  PaginatedCampaigns,
} from "../../types/artist/campaign";

/**
 * The available tiers. Always read these rather than hard-coding prices —
 * the artist is charged the figure the API returns.
 */
export const fetchCampaignPackages = async (): Promise<CampaignPackage[]> => {
  const res = await api.get("/campaigns/packages");
  return res.data;
};

/** Buy a package. Audora assigns the influencers and holds the budget. */
export const createCampaign = async (
  payload: CreateCampaignPayload
): Promise<Campaign> => {
  const res = await api.post("/campaigns", payload);
  return res.data;
};

export const fetchCampaigns = async (
  page = 1,
  limit = 20,
  status?: string
): Promise<PaginatedCampaigns> => {
  const res = await api.get("/campaigns", {
    params: { page, limit, ...(status ? { status } : {}) },
  });
  return res.data;
};

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
  const res = await api.get(`/campaigns/${id}`);
  return res.data;
};

/** Cancels and refunds every request no influencer has accepted yet. */
export const cancelCampaign = async (
  id: string
): Promise<{ message: string; refunded: number; campaign: Campaign }> => {
  const res = await api.patch(`/campaigns/${id}/cancel`);
  return res.data;
};
