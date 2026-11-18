import api from "../../lib/axios";
import type {
  AdminOverview,
  PaginatedAdminUsers,
  PendingMedia,
} from "../../types/admin/admin";
import type { TransactionResponse } from "../../types/transactions";

/** Platform-wide counts for the admin dashboard. */
export const fetchOverview = async (): Promise<AdminOverview> => {
  const res = await api.get("/admin/overview");
  return res.data;
};

/** Paginated user list. Pass `role` to back the Artists / Influencers screens. */
export const fetchUsers = async (opts: {
  role?: string;
  search?: string;
  banned?: boolean;
  page?: number;
  limit?: number;
} = {}): Promise<PaginatedAdminUsers> => {
  const res = await api.get("/admin/users", {
    params: {
      page: opts.page ?? 1,
      limit: opts.limit ?? 20,
      ...(opts.role ? { role: opts.role } : {}),
      ...(opts.search ? { search: opts.search } : {}),
      ...(opts.banned !== undefined ? { banned: opts.banned } : {}),
    },
  });
  return res.data;
};

/** Toggles the ban flag — same endpoint bans and unbans. */
export const toggleBanUser = async (id: string): Promise<{ message: string }> => {
  const res = await api.put(`/admin/users/${id}/ban`);
  return res.data;
};

export const deleteUser = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const fetchPendingMedia = async (): Promise<PendingMedia[]> => {
  const res = await api.get("/admin/media/pending");
  return res.data;
};

export const approveMedia = async (id: string): Promise<{ message: string }> => {
  const res = await api.put(`/admin/media/${id}/approve`);
  return res.data;
};

export const rejectMedia = async (id: string): Promise<{ message: string }> => {
  const res = await api.delete(`/admin/media/${id}/reject`);
  return res.data;
};

/** All platform transactions (admin only). */
export const fetchAllTransactions = async (): Promise<TransactionResponse[]> => {
  const res = await api.get("/transactions/all");
  return res.data;
};

// --- Promotion disputes ---

export interface AdminDispute {
  id: string;
  platform: string;
  message: string;
  amount: number;
  status: "DISPUTED" | "COMPLETED" | "DECLINED";
  progress: number;
  disputeReason: string | null;
  disputedAt: string | null;
  createdAt: string;
  artist: { id: string; username: string; email: string; profilePicture: string | null };
  influencer: { id: string; username: string; email: string; profilePicture: string | null };
  media: { id: string; title: string | null; fileUrl: string } | null;
  campaign: { id: string; tier: string } | null;
}

export const fetchDisputes = async (status: "open" | "resolved" = "open"): Promise<AdminDispute[]> => {
  const res = await api.get("/admin/disputes", { params: { status } });
  return res.data;
};

/** Release the held payment to the influencer, or refund it to the artist. */
export const resolveDispute = async (
  id: string,
  outcome: "pay_influencer" | "refund_artist",
  note?: string
): Promise<{ message: string }> => {
  const res = await api.post(`/admin/disputes/${id}/resolve`, { outcome, ...(note ? { note } : {}) });
  return res.data;
};

/** Change a user's role, e.g. grant or remove campaign strategist access. */
export const setUserRole = async (id: string, role: string): Promise<{ message: string }> => {
  const res = await api.put(`/admin/users/${id}/role`, { role });
  return res.data;
};
