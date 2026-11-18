import { useEffect, useState } from "react";
import { getDashboardStats, type DashboardStats } from "@/services/dashboard";
import { formatNaira } from "@/lib/influencer";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Wallet is in naira, like every other amount on the platform
  const balance = formatNaira(stats ? Number(stats.walletBalance) : 0);

  return { stats, loading, balance };
}
