import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, BarChart2, Music, Megaphone, User, X, CheckCircle, Clipboard, Banknote, FileText} from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";
import { useLocation } from "react-router-dom";

type RecentUpload = {
  name: string;
  days: number;
  percentage: number;
  image: string;
};

type ActiveCampaign = {
  title: string;
  status: "Active" | "Pending" | "Ended";
  package: string;
  duration: string;
  type: string;
  progress: number;
  image: string;
};

type RecentCampaign = {
  title: string;
  type: string;
  date: string;
  image: string;
};

type SignupState = {
  signupSuccess?: boolean;
  username?: string;
};

const chartData = [
  { name: "Jan", streams: 40000 },
  { name: "Feb", streams: 30000 },
  { name: "Mar", streams: 20000 },
  { name: "Apr", streams: 27800 },
  { name: "May", streams: 18900 },
  { name: "Jun", streams: 23900 },
];

const recentUploads: RecentUpload[] = [
  { name: "Love you always", days: 30, percentage: 45, image: "https://i.pravatar.cc/80?img=10" },
  { name: "Story Time", days: 10, percentage: 45, image: "https://i.pravatar.cc/80?img=2" },
  { name: "Love you always", days: 2, percentage: 45, image: "https://i.pravatar.cc/80?img=45" },
];

const activeCampaigns: ActiveCampaign[] = [
  {
    title: "Smoke",
    status: "Active",
    package: "Starter Package",
    duration: "30 days",
    type: "Influencer",
    progress: 70,
    image: "https://i.pravatar.cc/80?img=20",
  },
  {
    title: "Smoke",
    status: "Active",
    package: "Starter Package",
    duration: "30 days",
    type: "Influencer",
    progress: 70,
    image: "https://i.pravatar.cc/80?img=21",
  },
  {
    title: "Smoke",
    status: "Active",
    package: "Starter Package",
    duration: "30 days",
    type: "Influencer",
    progress: 70,
    image: "https://i.pravatar.cc/80?img=22",
  },
];

const recentCampaigns: RecentCampaign[] = [
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=30" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=31" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=32" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=33" },
];

export const DashboardHome: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const state = (location.state as SignupState | null) ?? null;

    if (state?.signupSuccess) {
      setSuccessMessage(
        `Welcome, ${state.username || user?.username || ""}! Your account has been created successfully.`
      );
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setSuccessMessage(null), 6000);
      return () => clearTimeout(timer);
    }

    return undefined;
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
        <StatCard icon={<FileText size={20} className="text-[#A67102]" />} title="Song Uploads" value="5" />
        <StatCard icon={<Clipboard size={20} className="text-[#A67102]" />} title="Active Campaigns" value="3" />
        <StatCard icon={<Banknote size={20} className="text-[#A67102]" />} title="Available Balance" value="$104,000.00" />
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
              <BarChart data={chartData} barSize={18}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#888", fontSize: 12 }} dy={10} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                  domain={[0, 50000]}
                  tickFormatter={(value: number | string) => `${Number(value) / 1000}K`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar dataKey="streams" fill="#A67102" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Top Campaign</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="w-full text-left text-sm">
              <div className="text-xs">
                {recentUploads.map((row, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-900 py-3 pl-3 text-gray-300 last:border-0">
                    <div className="flex items-center gap-2">
                      <img src={row.image} alt="" className="mr-3 h-[50px] w-[50px] rounded-full" />
                      <p className="text-white">{row.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg text-white">{row.days}Days</p>
                      <span className="text-[#A67102]">.</span>
                      <p className="text-xs font-medium text-white">{row.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-semibold text-white">Active Campaigns</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeCampaigns.map((c, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-gray-900 bg-[#0D0B07] p-4">
              <img src={c.image} alt={c.title} className="h-14 w-14 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between">
                  <p className="font-medium text-white">{c.title}</p>
                  <span className="rounded-full bg-[#A67102]/20 px-2 py-0.5 text-[10px] font-medium text-[#A67102]">
                    {c.status}
                  </span>
                </div>
                <p className="mb-3 text-xs text-gray-500">{c.package} • {c.duration}</p>
                <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
                  <span>{c.type}</span>
                  <span className="text-[#A67102]">{c.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full rounded-full bg-[#A67102]" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-semibold text-white">Recent Campaigns</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {recentCampaigns.map((c, i) => (
            <div key={i} className="overflow-hidden rounded-lg">
              <img src={c.image} alt={c.title} className="h-50 w-full object-cover" />
              <div className="space-y-2 p-3">
                <p className="text-sm font-medium text-white">{c.title}</p>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {c.type} • {c.date}
                </p>
              </div>
            </div>
          ))}
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