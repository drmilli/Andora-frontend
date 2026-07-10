import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, BarChart2, Music, Megaphone, User, X, CheckCircle, FileText, Wallet, Users, Music2 } from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import { useLocation } from "react-router-dom";
import { getDashboardStats, type DashboardStats } from "@/services/dashboard";

export const DashboardHome: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const state = location.state as { signupSuccess?: boolean; username?: string } | null;
    if (state?.signupSuccess) {
      setSuccessMessage(
        `Welcome, ${state.username || user?.username || ""}! Your account has been created successfully.`
      );
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setSuccessMessage(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [location.state, user?.username]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch {
        // silently fail — dashboard will show 0s
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const balance = stats
    ? `$${Number(stats.walletBalance).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    : "$0.00";

  return (
    <div className="w-full pb-28 md:pb-0">
      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#A67102]/40 bg-[#A67102]/10 px-4 py-3 text-sm text-[#f5b640]">
          <CheckCircle size={18} className="shrink-0" />
          <span className="flex-1">{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className="shrink-0 rounded p-0.5 transition hover:bg-[#A67102]/20"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <p className="mb-6 text-lg text-gray-300">Hello, {user?.username}</p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Music2 size={20} className="text-[#A67102]" />}
          title="Song Uploads"
          value={loadingStats ? "..." : String(stats?.songUploads ?? 0)}
        />
        <StatCard
          icon={<Users size={20} className="text-[#A67102]" />}
          title="Followers"
          value={loadingStats ? "..." : String(stats?.followers ?? 0)}
        />
        <StatCard
          icon={<Wallet size={20} className="text-[#A67102]" />}
          title="Available Balance"
          value={loadingStats ? "..." : balance}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 pb-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Streams</h3>
            <div className="flex cursor-pointer items-center rounded-md bg-[#1A1A1A] px-3 py-1 text-xs text-[#A67102]">
              Last 6months <span className="ml-2">▼</span>
            </div>
          </div>
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyUploads || []} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar dataKey="uploads" fill="#A67102" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Quick Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
              <span className="text-sm text-gray-400">Total Uploads</span>
              <span className="text-lg font-semibold text-white">
                {loadingStats ? "..." : stats?.totalUploads ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
              <span className="text-sm text-gray-400">Posts</span>
              <span className="text-lg font-semibold text-white">
                {loadingStats ? "..." : stats?.postCount ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
              <span className="text-sm text-gray-400">Following</span>
              <span className="text-lg font-semibold text-white">
                {loadingStats ? "..." : stats?.following ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-800 p-4">
              <span className="text-sm text-gray-400">Transactions</span>
              <span className="text-lg font-semibold text-white">
                {loadingStats ? "..." : stats?.transactionCount ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[94%] max-w-3xl -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-white/5 p-2 px-3 backdrop-blur-md md:hidden">
        <a href="/dashboard" className="flex flex-col items-center gap-1 text-[#A67102]">
          <LayoutDashboard size={22} />
          <span className="text-[11px]">Dashboard</span>
        </a>
        <a href="/dashboard/statistics" className="flex flex-col items-center gap-1 text-gray-200">
          <BarChart2 size={22} />
          <span className="text-[11px]">Statistics</span>
        </a>
        <a href="/dashboard/media" className="flex flex-col items-center gap-1 text-gray-200">
          <Music size={22} />
          <span className="text-[11px]">Media</span>
        </a>
        <a href="/dashboard/promotion" className="flex flex-col items-center gap-1 text-gray-200">
          <Megaphone size={22} />
          <span className="text-[11px]">Promotion</span>
        </a>
        <a href="/dashboard/profile" className="flex flex-col items-center gap-1 text-gray-200">
          <User size={22} />
          <span className="text-[11px]">Profile</span>
        </a>
      </nav>
    </div>
  );
};