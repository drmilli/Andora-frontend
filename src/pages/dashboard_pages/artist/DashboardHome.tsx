import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, BarChart2, Music, Megaphone, User, Banknote, Clipboard } from "lucide-react";
import { FileText } from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";

type RecentUpload = {
  name: string;
  days: number;
  percentage: number;
  image: string;
};

// NEW: Active campaign card type
type ActiveCampaign = {
  title: string;
  status: "Active" | "Pending" | "Ended";
  package: string;
  duration: string;
  type: string;
  progress: number; // 0-100
  image: string;
};

// NEW: Recent campaign grid item type
type RecentCampaign = {
  title: string;
  type: string;
  date: string;
  image: string;
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

// NEW: sample data for Active Campaigns
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

// NEW: sample data for Recent Campaigns grid
const recentCampaigns: RecentCampaign[] = [
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=30" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=31" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=32" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=33" },
];

export const DashboardHome: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;

  return (
    <div className="w-full pb-28 md:pb-0">
      {/* Header with title + Start Campaign button */}
      <div className="flex justify-between items-center mb-6">
        <div>
  
          <p className="text-gray-400 text-sm">Hello, {user?.username}</p>
        </div>

      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={<FileText size={20} className="text-[#A67102]" />} title="Song Uploads" value="5" />
        <StatCard icon={<Clipboard size={20} className="text-[#A67102]" />} title="Active Campaigns" value="3" />
        <StatCard icon={<Banknote size={20} className="text-[#A67102]" />} title="Available Balance" value="$104,000.00" />
      </div>
      {/* Existing Chart & Top Campaign sections kept below, or remove if not needed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        <div className="bg-[#0D0B07] p-4 sm:p-6 rounded-2xl border border-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Streams</h3>
            <div className="bg-[#1A1A1A] text-xs px-3 py-1 rounded-md flex items-center text-[#A67102] cursor-pointer">
              Last 6months <span className="ml-2">▼</span>
            </div>
          </div>
          <div className="h-56 sm:h-64 w-full">
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

        <div className="bg-[#0D0B07] p-4 sm:p-6 rounded-2xl border border-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Top Campaign</h3>
          </div>
          <div className="overflow-x-auto">
            <div className="w-full text-left text-sm">
              <div className="text-xs">
                {recentUploads.map((row, index) => (
                  <div key={index} className="border-b flex justify-between border-gray-900 last:border-0 py-3 pl-3 text-gray-300">
                    <div className="flex items-center gap-2 ju">
                      <img src={row.image} alt="" className="w-[50px] h-[50px] rounded-full mr-3" />
                      <p className="text-white">{row.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-lg">{row.days}Days</p> <span className="text-[#A67102]">.</span>
                      <p className="text-white text-xs font-medium">{row.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Active Campaigns */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Active Campaigns</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCampaigns.map((c, i) => (
            <div key={i} className="bg-[#0D0B07] p-4 rounded-2xl border border-gray-900 flex gap-3">
              <img src={c.image} alt={c.title} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-white font-medium">{c.title}</p>
                  <span className="text-[10px] bg-[#A67102]/20 text-[#A67102] px-2 py-0.5 rounded-full font-medium">
                    {c.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-3">{c.package} • {c.duration}</p>
                <div className="flex items-center justify-between text-xs text-gray-300 mb-1">
                  <span>{c.type}</span>
                  <span className="text-[#A67102]">{c.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A67102] rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Campaigns grid */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4">Recent Campaigns</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentCampaigns.map((c, i) => (
            <div key={i} className="rounded-lg overflow-hidden  ">
              <img src={c.image} alt={c.title} className="w-full h-50 object-cover" />
              <div className="p-3 space-y-2">
                <p className="text-white font-medium text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wide">
                  {c.type} • {c.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Mobile bottom nav (unchanged) */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[94%] max-w-3xl rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-2 flex justify-between items-center px-3 md:hidden z-50">
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