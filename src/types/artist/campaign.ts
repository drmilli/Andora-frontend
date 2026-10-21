import type { GetInfluencerRequest } from "../influencer/requests";

export interface CampaignPackage {
  tier: "STARTER" | "MEDIUM" | "PRO";
  name: string;
  budget: number;
  influencerCount: number;
  durationDays: number;
}

export interface Campaign {
  id: string;
  tier: CampaignPackage["tier"];
  budget: number;
  influencerCount: number;
  durationDays: number;
  message: string;
  status: "ACTIVE" | "COMPLETED" | "CANCELLED";
  /** Mean progress across assigned influencers, 0-100 */
  progress: number;
  assigned: number;
  statusCounts: Record<string, number>;
  artistId: string;
  mediaId: string | null;
  media: {
    id: string;
    title: string | null;
    fileUrl: string;
    type: string | null;
    duration: number | null;
  } | null;
  requests: GetInfluencerRequest[];
  startedAt: string;
  endsAt: string;
  completedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCampaigns {
  data: Campaign[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CreateCampaignPayload {
  tier: CampaignPackage["tier"];
  mediaId?: string | null;
  message?: string;
}
