export interface AdminUser {
  id: string;
  firstname: string;
  surname: string;
  username: string;
  email: string;
  role: string;
  bio: string | null;
  phone: string | null;
  followerCount: number | null;
  rate: number | null;
  profilePicture: string | null;
  coverPicture: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  snapchat: string | null;
  facebook: string | null;
  youtube: string | null;
  website: string | null;
  walletBalance: number;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedAdminUsers {
  data: AdminUser[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminOverview {
  users: { total: number; banned: number; byRole: Record<string, number> };
  media: { pending: number; approved: number };
  promotions: Record<string, number>;
  transactions: { count: number; volume: number };
  withdrawals: Record<string, { count: number; amount: number }>;
}

export interface PendingMedia {
  id: string;
  title: string | null;
  fileUrl: string;
  type: string | null;
  description: string | null;
  isApproved: boolean;
  createdAt: string;
  uploadedBy?: { id?: string; username: string; email?: string } | null;
}
