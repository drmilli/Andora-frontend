import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LayoutDashboard, BarChart2, Music, Megaphone, User } from "lucide-react";
import { FileText, Video } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/artist/StatCard";
import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";

type RecentUpload = {
  type: string;
  status: "Successful" | "Pending" | string;
  id: string;
  time: string;
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
  {
    type: "Music Audio",
    status: "Successful",
    id: "#34577190",
    time: "30 mins ago",
  },
  {
    type: "Music Audio",
    status: "Successful",
    id: "#34577191",
    time: "30 mins ago",
  },
  {
    type: "Music Video",
    status: "Pending",
    id: "#34577192",
    time: "10 mins ago",
  },
  {
    type: "Music Audio",
    status: "Successful",
    id: "#34577193",
    time: "30 mins ago",
  },
  {
    type: "Music Video",
    status: "Pending",
    id: "#34577194",
    time: "10 mins ago",
  },
  {
    type: "Music Audio",
    status: "Successful",
    id: "#34577195",
    time: "30 mins ago",
  },
  {
    type: "Music Video",
    status: "Pending",
    id: "#34577196",
    time: "10 mins ago",
  },
];

export const DashboardHome: React.FC = () => {
  // const { user } = useContext(AppContext);
  const context = useContext(AppContext);
  const user = context?.user;
  console.log(user);

  return (
    <div className="w-full pb-28 md:pb-0">
      <p className="text-lg text-gray-300 mb-6">Hello, {user?.username}</p>

      {/* Stats Grid - responsive: 1 col on mobile, 2 on sm, 4 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={<FileText size={20} className="text-[#A67102]" />}
          title="Song Uploads"
          value="5K Song Uploads"
          subtext="0 Song uploaded today"
        />
        <StatCard
          icon={<Video size={20} className="text-[#A67102]" />}
          title="Video Uploads"
          value="2K Video Uploads"
          subtext="0 video uploaded today"
        />
        <StatCard
          icon={<FileText size={20} className="text-[#A67102]" />}
          title="Not Uploaded"
          value="2K Songs Not Uploaded"
          subtext="0 tasks done today"
        />
        <StatCard
          icon={<FileText size={20} className="text-[#A67102]" />}
          title="Not Uploaded"
          value="1K Videos Not Uploaded"
          subtext="0 Song uploaded today"
        />
      </div>

      {/* Bottom Section: Chart & Table (stacked on mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {/* Chart Section */}
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#333"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#888", fontSize: 12 }}
                  domain={[0, 50000]}
                  tickFormatter={(value: number | string) =>
                    `${Number(value) / 1000}K`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #333",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                />
                <Bar dataKey="streams" fill="#A67102" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Uploads Table */}
        <div className="bg-[#0D0B07] p-4 sm:p-6 rounded-2xl border border-gray-900">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Recent Uploads</h3>
            <div className="bg-[#1A1A1A] text-xs px-3 py-1 rounded-md flex items-center text-[#A67102] cursor-pointer">
              Last 24hrs <span className="ml-2">▼</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-400 bg-[#A67102]/20">
                  <th className="pb-3 pt-3 pl-3 rounded-l-md font-medium text-white">
                    Uploads
                  </th>
                  <th className="pb-3 pt-3 font-medium text-white">Status</th>
                  <th className="pb-3 pt-3 font-medium text-white">
                    Upload Id
                  </th>
                  <th className="pb-3 pt-3 pr-3 rounded-r-md font-medium text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {recentUploads.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-900 last:border-0"
                  >
                    <td className="py-3 pl-3 text-gray-300">{row.type}</td>
                    <td
                      className={`py-3 font-medium ${row.status === "Successful" ? "text-green-500" : "text-[#A67102]"}`}
                    >
                      {row.status}
                    </td>
                    <td className="py-3 text-gray-400">{row.id}</td>
                    <td className="py-3 pr-3 text-gray-300">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile liquid-glass bottom navigation */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[94%] max-w-3xl rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-2 flex justify-between items-center px-3 md:hidden z-50">
        <a
          href="/dashboard"
          className="flex flex-col items-center gap-1 text-[#A67102]"
        >
          <LayoutDashboard size={22} />
          <span className="text-[11px]">Dashboard</span>
        </a>
        <a
          href="/dashboard/statistics"
          className="flex flex-col items-center gap-1 text-gray-200"
        >
          <BarChart2 size={22} />
          <span className="text-[11px]">Statistics</span>
        </a>
        <a
          href="/dashboard/media"
          className="flex flex-col items-center gap-1 text-gray-200"
        >
          <Music size={22} />
          <span className="text-[11px]">Media</span>
        </a>
        <a
          href="/dashboard/promotion"
          className="flex flex-col items-center gap-1 text-gray-200"
        >
          <Megaphone size={22} />
          <span className="text-[11px]">Promotion</span>
        </a>
        <a
          href="/dashboard/profile"
          className="flex flex-col items-center gap-1 text-gray-200"
        >
          <User size={22} />
          <span className="text-[11px]">Profile</span>
        </a>
      </nav>
    </div>
  );
};
