import api from "../lib/axios";
import type { Paginated } from "./community";
import type {
  DeclinePayload,
  StrategistStats,
  StrategistSubmission,
  SubmissionView,
} from "../types/strategist";

export const fetchSubmissions = async (
  opts: { view?: SubmissionView; search?: string; genre?: string; tier?: string; page?: number; limit?: number } = {}
): Promise<Paginated<StrategistSubmission>> => {
  const res = await api.get("/strategist/submissions", {
    params: {
      view: opts.view ?? "pending",
      page: opts.page ?? 1,
      limit: opts.limit ?? 50,
      ...(opts.search ? { search: opts.search } : {}),
      ...(opts.genre ? { genre: opts.genre } : {}),
      ...(opts.tier ? { tier: opts.tier } : {}),
    },
  });
  return res.data;
};

export const fetchSubmission = async (id: string): Promise<StrategistSubmission> => {
  const res = await api.get(`/strategist/submissions/${id}`);
  return res.data;
};

/** Approve: influencers are picked and the campaign goes live. */
export const approveSubmission = async (id: string): Promise<{ message: string; refunded: number }> => {
  const res = await api.post(`/strategist/submissions/${id}/approve`);
  return res.data;
};

/** Decline with a reason the artist will see. The artist is refunded in full. */
export const declineSubmission = async (
  id: string,
  payload: DeclinePayload
): Promise<{ message: string; refunded: number }> => {
  const res = await api.post(`/strategist/submissions/${id}/decline`, payload);
  return res.data;
};

export const fetchStrategistStats = async (days = 14): Promise<StrategistStats> => {
  const res = await api.get("/strategist/stats", { params: { days } });
  return res.data;
};

export const fetchDeclineCategories = async (): Promise<string[]> => {
  const res = await api.get("/strategist/decline-categories");
  return res.data;
};
