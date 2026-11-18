import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { X, CheckCircle, Wallet, Music2, Notebook, Megaphone } from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import { useLocation } from "react-router-dom";
import { useDashboardStats } from "@/hooks/artist/useDashboardStats";
import { useMedia } from "@/hooks/artist/useMedia";




export const DashboardHome: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { stats, loading: loadingStats, balance } = useDashboardStats();
  const {  topcampaigns, recentcampaigns } = useMedia();

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
            <h3 className="font-semibold text-white">Top Campaign</h3>
          </div>
          {!topcampaigns || topcampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Megaphone size={28} className="text-gray-600 mb-2" />
              <p className="text-gray-500 text-sm">No campaign data yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topcampaigns.slice(0, 2).map((campaign, i) => (
                <div
                  key={campaign.id || i}
                  className="flex justify-between items-center border-b border-gray-800 pb-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={campaign.fileUrl || "https://i.pravatar.cc/200?img=30"}
                      alt={campaign.title || "Campaign"}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <p className="text-white">{campaign.title}</p>
                  </div>

                  <div className="flex items-center gap-2 text-right">
                    <p className="text-gray-400">{campaign.duration || "30 days"}</p>
                    {/* <p className="text-white">{campaign.percentage || "60%"}</p> */}
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>


      </div>
      <div>
        <h3 className="text-white font-semibold mb-4">Recent Campaigns</h3>
        {!recentcampaigns || recentcampaigns.length === 0 ? (
          <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-12 text-center">
            <Megaphone size={36} className="text-gray-600 mx-auto mb-3" />
            <p className="text-white font-semibold text-base mb-1">No campaigns yet</p>
            <p className="text-gray-500 text-xs">Start a campaign to promote your music.</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentcampaigns.map((c, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <img src={c.fileUrl} alt={c.title|| "Campaign"} className="w-full h-50 object-cover" />
              <div className="p-3 space-y-2">
                <p className="text-white font-medium text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wide">
                  {c.type} &bull; {c.createdAt}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        )

        }


      </div>
    </div>
  );
};