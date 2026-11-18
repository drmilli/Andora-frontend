import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/services/dashboard";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const balance = stats
    ? `$${Number(stats.walletBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    : "$0.00";

  return { stats, loading, balance };
}
