import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { X, CheckCircle, Wallet, Music2, Notebook, Megaphone } from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import { Link, useLocation } from "react-router-dom";
import { useDashboardStats } from "@/hooks/artist/useDashboardStats";
import { useCampaignHighlights } from "@/hooks/artist/useCampaignHighlights";
import type { Campaign } from "@/types/artist/campaign";
import { formatNaira } from "@/lib/influencer";

const STATUS_LABEL: Record<Campaign["status"], string> = {
  PENDING_REVIEW: "In review",
  DECLINED: "Declined",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const STATUS_STYLE: Record<Campaign["status"], string> = {
  PENDING_REVIEW: "bg-blue-500/15 text-blue-300",
  DECLINED: "bg-red-500/15 text-red-400",
  ACTIVE: "bg-[#A67102]/20 text-[#f5b640]",
  COMPLETED: "bg-gray-700/40 text-gray-300",
  CANCELLED: "bg-gray-800 text-gray-500",
};




export const DashboardHome: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const location = useLocation();
  // Shown once, straight after signup (signup navigates here with this state)
  const [successMessage, setSuccessMessage] = useState<string | null>(() => {
    const state = location.state as { signupSuccess?: boolean; username?: string } | null;
    return state?.signupSuccess
      ? `Welcome, ${state.username || user?.username || ""}! Your account has been created successfully.`
      : null;
  });
  const { stats, loading: loadingStats, balance } = useDashboardStats();
  const { top: topcampaigns, recent: recentcampaigns, loading: loadingCampaigns } = useCampaignHighlights();

  useEffect(() => {
    if (!successMessage) return;
    // Don't show it again on refresh
    window.history.replaceState({}, document.title);
    const timer = setTimeout(() => setSuccessMessage(null), 6000);
    return () => clearTimeout(timer);
  }, [successMessage]);


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
          icon={<Notebook size={20} className="text-[#A67102]" />}
          title="Active Campaigns"
          value={loadingStats ? "..." : String(stats?.activeCampaigns ?? 0)}
          subtext={stats?.campaignsInReview ? `${stats.campaignsInReview} waiting for review` : undefined}
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
            <h3 className="font-semibold text-white">Uploads</h3>
            <span className="rounded-md bg-[#1A1A1A] px-3 py-1 text-xs text-[#A67102]">Last 6 months</span>
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
            <h3 className="font-semibold text-white">Top Campaign</h3>
          </div>
          {loadingCampaigns ? (
            <p className="py-10 text-center text-sm text-gray-500">Loading...</p>
          ) : topcampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Megaphone size={28} className="text-gray-600 mb-2" />
              <p className="text-gray-500 text-sm">No live campaigns yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topcampaigns.map((c) => (
                <Link
                  key={c.id}
                  to={`/dashboard/campaigns/${c.id}`}
                  className="block border-b border-gray-800 pb-3 last:border-0 hover:opacity-90"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#A67102]/15">
                        <Music2 size={16} className="text-[#A67102]" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-white">{c.media?.title || "Untitled track"}</p>
                        <p className="text-xs text-gray-500">
                          {c.assigned} influencer{c.assigned === 1 ? "" : "s"} &bull; {c.durationDays} days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white">{c.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-800">
                    <div className="h-full bg-[#A67102]" style={{ width: `${c.progress}%` }} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>


      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Recent Campaigns</h3>
        {loadingCampaigns ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : recentcampaigns.length === 0 ? (
          <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-12 text-center">
            <Megaphone size={36} className="text-gray-600 mx-auto mb-3" />
            <p className="text-white font-semibold text-base mb-1">No campaigns yet</p>
            <p className="text-gray-500 text-xs">Start a campaign to promote your music.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentcampaigns.map((c) => (
              <Link
                key={c.id}
                to={`/dashboard/campaigns/${c.id}`}
                className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 hover:border-[#A67102]/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate font-medium text-white">{c.media?.title || "Untitled track"}</p>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[c.status]}`}>
                    {STATUS_LABEL[c.status]}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                  {c.tier} &bull; {formatNaira(c.budget)}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  Submitted {new Date(c.createdAt).toLocaleDateString("en-GB")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};