import api from "../../../lib/axios";
import type {
  GetInfluencerRequest,
  InfluencerRequestDisputePayload,
  InfluencerRequestProgressPayload,
  InfluencerRequestStatusPayload,
  PaginatedInfluencerRequests,
} from "../../../types/influencer/requests";

/** Status-changing endpoints reply with { message, request } */
export interface MutateRequestResponse {
  message: string;
  request: GetInfluencerRequest;
}

export interface FetchRequestsOptions {
  page?: number;
  limit?: number;
  /** Comma-separated statuses, e.g. "PENDING,PENDED" */
  status?: string;
  /** Omit for the "All" tab — the API has no "all" platform value */
  platform?: string;
}

export const fetchInfluencerRequests = async (
  page: number = 1,
  limit: number = 10,
  options: Omit<FetchRequestsOptions, "page" | "limit"> = {}
): Promise<PaginatedInfluencerRequests> => {
  const res = await api.get("/influencer/me/requests", {
    params: {
      page,
      limit,
      ...(options.status ? { status: options.status } : {}),
      ...(options.platform && options.platform !== "all"
        ? { platform: options.platform }
        : {}),
    },
  });
  return res.data;
};

export const fetchRequestById = async (
  id: string
): Promise<GetInfluencerRequest> => {
  const res = await api.get(`/influencer/me/requests/${id}`);
  return res.data;
};

/** Accept, decline or pend an incoming promotion request */
export const updateRequestStatus = async (
  id: string,
  payload: InfluencerRequestStatusPayload
): Promise<MutateRequestResponse> => {
  const res = await api.patch(`/influencer/me/requests/${id}/status`, payload);
  return res.data;
};

/** Report progress on an accepted job. Sending 100 completes it and releases payment. */
export const updateRequestProgress = async (
  id: string,
  payload: InfluencerRequestProgressPayload
): Promise<MutateRequestResponse> => {
  const res = await api.patch(`/influencer/me/requests/${id}/progress`, payload);
  return res.data;
};

export const disputeRequest = async (
  id: string,
  payload: InfluencerRequestDisputePayload
): Promise<MutateRequestResponse> => {
  const res = await api.post(`/influencer/me/requests/${id}/dispute`, payload);
  return res.data;
};
