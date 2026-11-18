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
  /** PENDING_REVIEW: paid, waiting for a strategist. DECLINED: refunded in full. */
  status: "PENDING_REVIEW" | "DECLINED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  genre: string | null;
  goal: string | null;
  reviewedAt: string | null;
  declineTitle: string | null;
  declineCategory: string | null;
  declineReason: string | null;
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
  /** Required: a strategist reviews the track before the campaign goes live */
  mediaId: string;
  genre?: string;
  goal?: string;
  message?: string;
}
