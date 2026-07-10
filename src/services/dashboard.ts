import api from "../lib/axios";

export interface MonthlyDataPoint {
  name: string;
  uploads: number;
}

export interface DashboardStats {
  songUploads: number;
  videoUploads: number;
  totalUploads: number;
  walletBalance: number;
  followers: number;
  following: number;
  postCount: number;
  transactionCount: number;
  monthlyUploads: MonthlyDataPoint[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get("/dashboard/stats");
  return res.data;
};
