import React from "react";
import { Link } from "react-router-dom";
import InfluencerDashboard from "./influencer/InfluencerDashboard";
import InfluencerNotifications from "./influencer/InfluencerNotifications";
import InfluencerProfile from "./influencer/InfluencerProfile";
import InfluencerJobs from "../dashboard_pages/influencer/InfluencerJobs";
import InfluencerWallet from "./influencer/InfluencerWallet";
import {
  ArrowUpRight,
  FileText,
  Video,
  LayoutDashboard,
  BarChart2,
  Music,
  Megaphone,
  User,
  ThumbsUp,
  Download,
  MapPin,
  Radio,
  Clock,
  Trash2,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { NotificationIcon } from "../../assets/notification";
import NotificationDetails from "./notification/NotificationDetails";
import WalletPage from "./wallet/WalletPage";
import InfluencerNotificationsDetail from "./influencer/InfluencerNotificationsDetail";
import StationDashboard from "./station/StationDashboard";
import StationNotifications from "./station/StationNotifications";
import StationNotificationsDetail from "./station/StationNotificationsDetail";
import StationJobs from "./station/StationJobs";
import StationPricing from "./station/StationPricing";
import StationProfile from "./station/StationProfile";
import AdminDashboard from "./admin/AdminDashboard";
import AdminNotifications from "./admin/AdminNotifications";
import AdminNotificationsDetails from "./admin/AdminNotificationsDetails";
import AdminWallet from "./admin/AdminWallet";
import AdminProfile from "./admin/AdminProfile";
import AdminInfluencers from "./admin/AdminInfluencers";
import AdminInfluencersDetail from "./admin/AdminInfluencersDetail";
import AdminRadio from "./admin/AdminRadio";
import AdminTv from "./admin/AdminTv";
import AdminRadioDetails from "./admin/AdminRadioDetails";
import AdminTvDetails from "./admin/AdminTvDetails";
import AdminJob from "./admin/AdminJob";
import AdminArtist from "./admin/AdminArtist";
import AdminArtistDetails from "./admin/AdminArtistDetails";

/**
 * Dashboard index page (restored from original design)
 *
 * This file exposes:
 * - DashboardHome (full dashboard UI with stat cards, chart, table)
 * - Several small dummy pages for the other nav items
 * - DASHBOARD_ROUTES: an array of nested route definitions (relative paths)
 */

/* ---- Types ---- */
type ChartPoint = {
  name: string;
  streams: number;
};

type RecentUpload = {
  type: string;
  status: "Successful" | "Pending" | string;
  id: string;
  time: string;
};

/* ---- Mock Data ---- */
const chartData: ChartPoint[] = [
  { name: "Jan", streams: 36000 },
  { name: "Feb", streams: 41000 },
  { name: "Mar", streams: 12000 },
  { name: "Apr", streams: 47000 },
  { name: "May", streams: 40000 },
  { name: "Jun", streams: 21000 },
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

/* ---- Small reusable components (local to this file) ---- */
const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext?: string;
}> = ({ icon, title, value, subtext }) => {
  return (
    <div className="bg-[#0D0B07] p-6 rounded-2xl relative group hover:border-[#A67102]/30 transition-all border border-gray-900">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#A67102]/10 rounded-full">{icon}</div>
          <span className="text-white font-semibold text-sm">{title}</span>
        </div>
        <div className="bg-[#1A1A1A] p-1.5 rounded-full text-[#A67102] cursor-pointer">
          <ArrowUpRight size={16} />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">{value}</h2>
        <p className="text-xs text-white">{subtext}</p>
      </div>
      <div className="border-t border-gray-900 pt-4">
        <p className="text-[10px] text-[#A67102]">Updated after every upload</p>
      </div>
    </div>
  );
};

/* ---- Dashboard Home (restored full UI) ---- */
export const DashboardHome: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <p className="text-lg text-gray-300 mb-6">Hello, Abbey</p>

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

/* ---- Dummy pages for the other nav items ---- */
const PageShell: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => (
  <div className="w-full h-full flex items-start justify-center">
    <div className="max-w-3xl w-full">
      <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-6">
          {description ??
            "This is a placeholder page. Replace with the real implementation when available."}
        </p>

        <div className="rounded-md border border-gray-800 bg-[#080808] p-6 text-gray-300">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante. Use this area to add meaningful UI for the{" "}
            <span className="text-white font-medium">{title}</span> page.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const NotificationPage: React.FC = () => {
  const notifications = [
    {
      id: "1",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "3",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "4",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "5",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
  ];

  return (
    <div className="w-full ">
      <div className=" mx-auto">
        <div className="space-y-1">
          {notifications.map((n) => (
            <Link
              key={n.id}
              to={`/dashboard/notifications/${n.id}`}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow block hover:bg-white/5 ${
                n.unread
                  ? "bg-[#0D0B07]  shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <NotificationIcon />
                </div>

                <div className="flex-1 min-w-0">
                  <div className=" flex justify-between items-start gap-4">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {n.title}
                    </h3>
                    <div className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">
                      {n.time}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {n.body}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export const StatisticsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState<{
    name: string;
    count: number;
    streams: number;
    likes: number;
    downloads: number;
  } | null>(null);

  const audienceLocations = [
    {
      name: "Nigeria",
      count: 20000,
      streams: 10000,
      likes: 5000,
      downloads: 3000,
    },
    { name: "US", count: 5000, streams: 10000, likes: 5000, downloads: 3000 },
    {
      name: "Ghana",
      count: 2000,
      streams: 10000,
      likes: 5000,
      downloads: 3000,
    },
  ];

  const topSongs = [
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
  ];

  const platforms = [
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Apple Music", streams: 5000, likes: 500, downloads: 176 },
    { name: "Boom Play", streams: 5000, likes: 500, downloads: 176 },
    { name: "Play Music", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
  ];

  const streamData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 420 },
    { month: "Mar", value: 410 },
    { month: "Apr", value: 430 },
    { month: "May", value: 450 },
    { month: "Jun", value: 480 },
    { month: "Jul", value: 500 },
    { month: "Aug", value: 520 },
    { month: "Sep", value: 540 },
    { month: "Oct", value: 550 },
    { month: "Nov", value: 570 },
    { month: "Dec", value: 600 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">STATISTICS</h1>
            <p className="text-gray-400 text-sm">Hello, Abbey</p>
          </div>
          <button className="px-4 py-2 bg-[#A67102] text-black rounded-md hover:bg-[#8a5e02] transition-colors flex items-center gap-2 text-sm">
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Streams</h2>
                <select className="bg-[#2a2a2a] text-white px-3 py-1.5 rounded-md border border-gray-700 text-sm">
                  <option>Year</option>
                  <option>Month</option>
                  <option>Week</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2a2a2a",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#A67102"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Streams</p>
                <p className="text-xl font-bold">45K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <User className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Listeners</p>
                <p className="text-xl font-bold">3.2K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <Download className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Downloads</p>
                <p className="text-xl font-bold">5.6K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <User className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Followers</p>
                <p className="text-xl font-bold">1.7K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Top Songs</h2>
            <div className="space-y-2">
              {topSongs.map((song, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded-lg p-3 flex items-center gap-3 border border-[#3a3a3a] hover:border-[#A67102] transition-colors"
                >
                  <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{song.title}</p>
                    <p className="text-xs text-gray-400">
                      {song.streams.toLocaleString()} streams
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>{song.likes} Likes</p>
                    <p>{song.downloads} Downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Audience by Location</h2>
            <div className="space-y-2">
              {audienceLocations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedLocation(location)}
                  className="bg-[#2a2a2a] rounded-lg p-3 flex items-center justify-between border border-[#3a3a3a] hover:border-[#A67102] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-sm">{location.name}</p>
                  </div>
                  <p className="text-lg font-bold">
                    {location.count.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-black border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    {selectedLocation.name}
                  </h2>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {selectedLocation.streams.toLocaleString()} streams
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {(selectedLocation.likes / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {(selectedLocation.downloads / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] rounded-lg p-3 flex items-center gap-3 border border-[#2a2a2a]"
                  >
                    <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{platform.name}</p>
                      <p className="text-sm text-gray-400">
                        {platform.streams.toLocaleString()} streams
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>{platform.likes} Likes</p>
                      <p>{platform.downloads} Downloads</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FilterButtons: React.FC<{ type: "songs" | "videos" }> = ({ type }) => (
  <div className="flex gap-3 mb-6">
    <button className="px-4 py-2 bg-[#A67102] text-white rounded-full text-sm font-medium">
      Total {type === "songs" ? "Songs" : "Videos"}
    </button>
    <button className="px-4 py-2 bg-[#2a2a2a] text-gray-400 rounded-full text-sm font-medium hover:bg-[#3a3a3a]">
      Uploaded
    </button>
    <button className="px-4 py-2 bg-[#2a2a2a] text-gray-400 rounded-full text-sm font-medium hover:bg-[#3a3a3a]">
      Not uploaded
    </button>
  </div>
);

export const MediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"songs" | "videos">("songs");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStep, setUploadStep] = React.useState<
    "details" | "tracks" | "schedule" | "platforms" | "review"
  >("details");
  const [selectedSong, setSelectedSong] = React.useState<number | null>(null);
  const [songDetailTab, setSongDetailTab] = React.useState<"songs" | "about">(
    "songs",
  );
  const [selectedVideo, setSelectedVideo] = React.useState<number | null>(null);
  const [videoDetailTab, setVideoDetailTab] = React.useState<
    "videos" | "about"
  >("videos");

  const songs = [
    {
      id: 1,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Smoke",
      artist: "Single by RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Smoke",
      artist: "Album",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Smoke",
      artist: "Single by RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {isUploading ? (
          // Upload Flow Pages
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setIsUploading(false);
                setUploadStep("details");
              }}
              className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-700 mb-8">
              {[
                { id: "details", label: "Details" },
                { id: "tracks", label: "Tracks" },
                { id: "schedule", label: "Schedule" },
                { id: "platforms", label: "Platforms" },
                { id: "review", label: "Review" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setUploadStep(
                      tab.id as
                        | "details"
                        | "tracks"
                        | "schedule"
                        | "platforms"
                        | "review",
                    )
                  }
                  className={`pb-3 text-sm font-medium transition-colors ${
                    uploadStep === tab.id
                      ? "text-white border-b-2 border-[#A67102]"
                      : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Step Content */}
            {uploadStep === "details" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {activeTab === "songs"
                    ? "Enter Song details"
                    : "Enter Video Title"}
                </h2>
                {activeTab === "videos" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Select Music
                      </label>
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>name</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setUploadStep("tracks")}
                      className="w-full px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Name of Single, Ep or Album
                        </label>
                        <input
                          type="text"
                          placeholder="name"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Copyright Holder
                          </label>
                          <input
                            type="text"
                            placeholder="holder"
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Copyright Year
                          </label>
                          <select className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">
                            <option>year</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Production Holder
                          </label>
                          <input
                            type="text"
                            placeholder="holder"
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Production Year
                          </label>
                          <select className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">
                            <option>year</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Record Label
                        </label>
                        <input
                          type="text"
                          placeholder="holder"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Featuring Artists
                        </label>
                        <input
                          type="text"
                          placeholder="name"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Written By
                        </label>
                        <input
                          type="text"
                          placeholder="writer"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setIsUploading(false)}
                        className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setUploadStep("tracks")}
                        className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {uploadStep === "tracks" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {activeTab === "songs"
                    ? "Upload Tracks"
                    : "Enter Song details"}
                </h2>
                {activeTab === "videos" ? (
                  <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-96">
                    <svg
                      className="w-24 h-24 text-[#A67102] mb-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-white text-center mb-4 text-lg">
                      Drag and drop files to upload
                    </p>
                    <p className="text-gray-400 text-sm mb-6">OR</p>
                    <button className="px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                      Upload Cover
                    </button>
                    <p className="text-gray-500 text-xs mt-6">
                      only mp4 format is accepted
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Upload Area */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-64">
                      <svg
                        className="w-16 h-16 text-[#A67102] mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-white text-center mb-4">
                        Drag and drop files to upload
                      </p>
                      <p className="text-gray-400 text-sm mb-4">OR</p>
                      <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium">
                        Upload Cover
                      </button>
                      <p className="text-gray-500 text-xs mt-4">
                        only mp3 format is accepted
                      </p>
                    </div>

                    {/* Track List */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Track List</h3>
                        <button className="text-[#A67102] hover:text-[#8a5e02] text-sm font-medium">
                          + Add Track(s)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("details")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setUploadStep("schedule")}
                    className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "schedule" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  Select Date and Time
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Time
                    </label>
                    <div className="flex gap-4 items-center">
                      <input
                        type="text"
                        value="10:30"
                        readOnly
                        className="flex-1 bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white"
                      />
                      <span className="text-gray-400 text-sm">(GMT +1)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {[
                        "9:00",
                        "9:30",
                        "10:00",
                        "10:30",
                        "11:00",
                        "11:30",
                        "12:00",
                        "12:30",
                      ].map((time) => (
                        <button
                          key={time}
                          className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                            time === "10:30"
                              ? "bg-[#A67102] text-white"
                              : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-4">
                      Date
                    </label>
                    <p className="text-white mb-4">6. January 2022</p>
                    <div className="bg-[#1a1a1a] rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Calendar picker</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("tracks")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setUploadStep("platforms")}
                    className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "platforms" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {activeTab === "songs" ? "Streaming Apps" : "Video Platforms"}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {activeTab === "videos"
                    ? [
                        "Sportify",
                        "Youtube Music",
                        "Bandcamp",
                        "Tidal Music",
                        "Pandora",
                      ].map((platform) => (
                        <div
                          key={platform}
                          className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-[#A67102] cursor-pointer transition-colors"
                        >
                          <p className="text-white text-sm font-medium">
                            {platform}
                          </p>
                        </div>
                      ))
                    : [
                        "Spotify",
                        "Apple Music",
                        "Amazon Music",
                        "Tidal Music",
                        "Deezer",
                        "Sound Cloud",
                        "Qobuz",
                        "Youtube Music",
                        "Bandcamp",
                        "Pandora",
                      ].map((platform) => (
                        <div
                          key={platform}
                          className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-[#A67102] cursor-pointer transition-colors"
                        >
                          <p className="text-white text-sm font-medium">
                            {platform}
                          </p>
                        </div>
                      ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("schedule")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setUploadStep("review")}
                    className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "review" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review</h2>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400">
                    Review your upload details before submitting
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("platforms")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedSong ? (
          // Song Detail View
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedSong(null)}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium border border-[#A67102]">
                Lyrics
              </button>
            </div>

            {/* Cover Image */}
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop"
                alt="Smoke"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Song Title */}
            <h1 className="text-3xl font-bold mb-6">Smoke</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setSongDetailTab("songs")}
                className={`pb-4 font-semibold transition-colors ${
                  songDetailTab === "songs"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Songs
              </button>
              <button
                onClick={() => setSongDetailTab("about")}
                className={`pb-4 font-semibold transition-colors ${
                  songDetailTab === "about"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                About
              </button>
            </div>

            {/* Tab Content */}
            {songDetailTab === "songs" && (
              <div>
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium">
                    Upload Video
                  </button>
                </div>

                <div className="space-y-3">
                  {[1, 2].map((track) => (
                    <div
                      key={track}
                      className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-4 border border-gray-700"
                    >
                      <img
                        src="https://i.pravatar.cc/60"
                        alt="Track"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-white">Song Title</p>
                      </div>
                      <p className="text-gray-400 text-sm">3:24</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {songDetailTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Bio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Runty is a passionate musician whose sound blends afro with
                    heartfelt lyrics and raw storytelling. With a love for
                    creating music that moves hearts, Runty channels inspiration
                    from everyday experiences, faith, and culture. Whether
                    performing live or recording in the studio, Runty brings
                    authenticity, emotion, and a message that resonates with
                    every beat.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Performed By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : selectedVideo ? (
          // Video Detail View
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium border border-[#A67102]">
                Lyrics
              </button>
            </div>

            {/* Cover Image */}
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop"
                alt="Smoke"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Title */}
            <h1 className="text-3xl font-bold mb-6">Smoke</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setVideoDetailTab("videos")}
                className={`pb-4 font-semibold transition-colors ${
                  videoDetailTab === "videos"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setVideoDetailTab("about")}
                className={`pb-4 font-semibold transition-colors ${
                  videoDetailTab === "about"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                About
              </button>
            </div>

            {/* Tab Content */}
            {videoDetailTab === "videos" && (
              <div className="space-y-3">
                {[1, 2].map((video) => (
                  <div
                    key={video}
                    className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-4 border border-gray-700"
                  >
                    <img
                      src="https://i.pravatar.cc/60"
                      alt="Video"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Video Title</p>
                    </div>
                    <p className="text-gray-400 text-sm">3:24</p>
                  </div>
                ))}
              </div>
            )}

            {videoDetailTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Bio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Runty is a passionate musician whose sound blends afro with
                    heartfelt lyrics and raw storytelling. With a love for
                    creating music that moves the soul, he began his journey in
                    [year or place], drawing inspiration from everyday
                    experiences, faith, and culture. Whether performing live or
                    recording in the studio, Runty brings authenticity, emotion,
                    and a message that resonates with every beat.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Performed By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Written By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Main Media View
          <>
            <h1 className="text-2xl font-semibold mb-6">MEDIA</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("songs")}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === "songs"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Songs
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-4 font-semibold transition-colors ${
                  activeTab === "videos"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Videos
              </button>
            </div>

            {/* Upload Button */}
            <div className="flex justify-between items-center mb-6">
              <div></div>
              <button
                onClick={() => setIsUploading(true)}
                className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors flex items-center gap-2 text-sm font-medium"
              >
                + Upload
              </button>
            </div>

            {activeTab === "songs" && (
              <>
                <FilterButtons type="songs" />

                <div className="text-sm text-gray-400 mb-4">
                  Count: {songs.length}
                </div>

                {/* Songs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {songs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => setSelectedSong(song.id)}
                      className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
                        <img
                          src={song.image}
                          alt={song.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 bg-[#A67102] text-white p-2 rounded-lg hover:bg-[#8a5e02] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-1">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "videos" && (
              <>
                <FilterButtons type="videos" />

                <div className="text-sm text-gray-400 mb-4">
                  Count: {videos.length}
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video.id)}
                      className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 bg-[#A67102] text-white p-2 rounded-lg hover:bg-[#8a5e02] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-400">{video.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export const PromotionPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    "audio" | "video" | "influencer"
  >("audio");
  const [selections, setSelections] = React.useState<number[]>([1]);
  const [selectedSocials, setSelectedSocials] = React.useState<string[]>([]);

  const addSelection = () => {
    setSelections([...selections, selections.length + 1]);
  };

  const removeSelection = (id: number) => {
    setSelections(selections.filter((s) => s !== id));
  };

  const toggleSocial = (social: string) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(selectedSocials.filter((s) => s !== social));
    } else {
      setSelectedSocials([...selectedSocials, social]);
    }
  };

  const socialPlatforms = [
    { id: "instagram", icon: "instagram", color: "#A67102" },
    { id: "youtube", icon: "youtube", color: "#3a3a3a" },
    { id: "facebook", icon: "facebook", color: "#3a3a3a" },
    { id: "tiktok", icon: "tiktok", color: "#3a3a3a" },
    { id: "snapchat", icon: "snapchat", color: "#3a3a3a" },
    { id: "twitter", icon: "twitter", color: "#3a3a3a" },
  ];

  const influencers = [
    {
      id: 1,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=1",
    },
    {
      id: 2,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=2",
    },
    {
      id: 3,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=3",
    },
    {
      id: 4,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=4",
    },
    {
      id: 5,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=5",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">PROMOTE</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("audio")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "audio"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            Audio
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "video"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            Video
          </button>
          <button
            onClick={() => setActiveTab("influencer")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "influencer"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            Influencer
          </button>
        </div>

        {/* Description Text */}
        <p className="text-gray-400 text-sm mb-6">
          Duration for weekly is the number of times the music promotion would
          run for based on selected presenter (working hours), and monthly has
          4weeks in it and can only run 4times for the 4 weeks in a month.
        </p>

        {/* Audio Tab */}
        {activeTab === "audio" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Radio Stations</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Music Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Music</label>
              <div className="relative">
                <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                  <option>Select music audio</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell us what you want..."
                rows={4}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102] resize-none"
              />
            </div>

            {/* Selections */}
            {selections.map((selection, index) => (
              <div key={selection} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    Selection {selection}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">₦30,000</p>
                    {selections.length > 1 && (
                      <button
                        onClick={() => removeSelection(selection)}
                        className="p-2 bg-[#A67102] rounded-lg hover:bg-[#8a5e02] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select loca...</option>
                      </select>
                    </div>
                  </div>

                  {/* Radio */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Radio
                    </label>
                    <div className="relative">
                      <Radio className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select Radio</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Presenter */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Presenter
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                      <option>Select Presenter</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Tab */}
        {activeTab === "video" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Television Stations</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Video Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Video</label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                  <option>Select music video</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell us what you want..."
                rows={4}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102] resize-none"
              />
            </div>

            {/* Selections */}
            {selections.map((selection, index) => (
              <div key={selection} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    Selection {selection}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">₦30,000</p>
                    {selections.length > 1 && (
                      <button
                        onClick={() => removeSelection(selection)}
                        className="p-2 bg-[#A67102] rounded-lg hover:bg-[#8a5e02] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Television Channel */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Television Channel
                    </label>
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select tv station</option>
                      </select>
                    </div>
                  </div>

                  {/* Presenter */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Presenter
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select Presenter</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Duration (weekly) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Duration (weekly)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="E.g. X2"
                        className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                      />
                    </div>
                  </div>

                  {/* Duration (monthly) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Duration (monthly)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Max X4"
                        className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={addSelection}
                className="px-6 py-2 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
              >
                Add
              </button>
            </div>

            {/* Proceed to Payment */}
            <button className="w-full px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium text-lg">
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Influencer Tab */}
        {activeTab === "influencer" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Influencer Promotion</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Video and Music Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Video
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                    <option>Select music video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Music
                </label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                    <option>Select music audio</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => toggleSocial(platform.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    selectedSocials.includes(platform.id) ||
                    platform.id === "instagram"
                      ? "bg-[#A67102]"
                      : "bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                  }`}
                >
                  {platform.icon === "instagram" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {platform.icon === "youtube" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {platform.icon === "facebook" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {platform.icon === "tiktok" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  )}
                  {platform.icon === "snapchat" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.069-.179.031-.075.044-.149.074-.195.12-.104.374-.149.404-.149 3.136-.599 4.732-3.92 4.777-3.99.179-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
                    </svg>
                  )}
                  {platform.icon === "twitter" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A67102]" />
              <input
                type="text"
                placeholder="Search promoter here"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A67102] focus:outline-none focus:border-[#A67102]"
              />
            </div>

            {/* Influencer List Header */}
            <div className="grid grid-cols-3 gap-4 mb-4 px-4">
              <p className="text-gray-400 text-sm font-medium">Influencer</p>
              <p className="text-gray-400 text-sm font-medium text-center">
                Followers
              </p>
              <p className="text-gray-400 text-sm font-medium text-right">
                Price
              </p>
            </div>

            {/* Influencer List */}
            <div className="space-y-3">
              {influencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className="grid grid-cols-3 gap-4 items-center bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-[#A67102] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-white font-medium">{influencer.name}</p>
                  </div>
                  <p className="text-white text-center">
                    {influencer.followers}
                  </p>
                  <p className="text-white font-semibold text-right">
                    {influencer.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const JobsPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = React.useState<
    "pending" | "completed" | "disputes"
  >("pending");
  const [activeFilterTab, setActiveFilterTab] = React.useState<
    "all" | "influencers" | "radio" | "tv"
  >("all");
  const [confirmationModal, setConfirmationModal] = React.useState<{
    isOpen: boolean;
    jobId: number | null;
  }>({ isOpen: false, jobId: null });
  const [disputeModal, setDisputeModal] = React.useState<{
    isOpen: boolean;
    jobId: number | null;
  }>({ isOpen: false, jobId: null });

  const pendingJobs = [
    {
      id: 1,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=1",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 50,
    },
    {
      id: 2,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=2",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 70,
    },
    {
      id: 3,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=3",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 70,
    },
    {
      id: 4,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=4",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 50,
    },
    {
      id: 5,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "12/04/25 - 13/05/26",
      time: "12:00AM - 6:00AM",
    },
    {
      id: 6,
      type: "tv",
      station: { name: "MITV", logo: "https://i.pravatar.cc/80?img=11" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=21", name: "Arayioba..." },
        { avatar: "https://i.pravatar.cc/60?img=22", name: "Arayioba..." },
        { avatar: "https://i.pravatar.cc/60?img=23", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
  ];

  const completedJobs = [
    {
      id: 101,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
    {
      id: 102,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
  ];

  const filteredJobs = pendingJobs.filter((job) => {
    if (activeFilterTab === "all") return true;
    if (activeFilterTab === "influencers") return job.type === "influencer";
    if (activeFilterTab === "radio") return job.type === "radio";
    if (activeFilterTab === "tv") return job.type === "tv";
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">JOBS</h1>

        {/* Main Tabs */}
        <div className="flex gap-8 border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveMainTab("pending")}
            className={`pb-4 font-semibold transition-colors ${
              activeMainTab === "pending"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            {activeMainTab === "pending" ? "Pending" : "Pending Jobs"}
          </button>
          <button
            onClick={() => setActiveMainTab("completed")}
            className={`pb-4 font-semibold transition-colors ${
              activeMainTab === "completed"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveMainTab("disputes")}
            className={`pb-4 font-semibold transition-colors ${
              activeMainTab === "disputes"
                ? "text-white border-b-2 border-[#A67102]"
                : "text-gray-400"
            }`}
          >
            Disputes
          </button>
        </div>

        {activeMainTab === "pending" && (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveFilterTab("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "all"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilterTab("influencers")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "influencers"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                Influencers
              </button>
              <button
                onClick={() => setActiveFilterTab("radio")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "radio"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                Radio Stations
              </button>
              <button
                onClick={() => setActiveFilterTab("tv")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "tv"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                TV Stations
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700"
                >
                  {job.type === "influencer" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Influencer Info */}
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={job.influencer.avatar}
                          alt={job.influencer.name}
                          className="w-20 h-20 rounded-full mb-3"
                        />
                        <p className="text-white font-medium">Influencer</p>
                      </div>

                      {/* Description */}
                      <div className="flex items-center">
                        <div className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#A67102]">
                          <p className="text-gray-300 text-sm">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      {/* Songs and Actions */}
                      <div className="space-y-3">
                        {job.songs.map((song, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="bg-white rounded-lg p-2 flex-shrink-0">
                              <div className="w-16 h-16 flex items-center justify-center">
                                <div className="text-red-600 font-bold text-xs">
                                  fm 92.5
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 bg-[#2a2a2a] rounded-lg p-3">
                              <p className="text-white text-sm font-medium mb-1">
                                {song.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{song.duration}</span>
                                <span>{song.format}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div className="bg-[#A67102] text-white text-xs font-bold px-3 py-1 rounded">
                                {job.completion}%
                              </div>
                              {idx === 0 && (
                                <button
                                  onClick={() =>
                                    setConfirmationModal({
                                      isOpen: true,
                                      jobId: job.id,
                                    })
                                  }
                                  className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium"
                                >
                                  Accept
                                </button>
                              )}
                              {idx === 1 && (
                                <button
                                  onClick={() =>
                                    setDisputeModal({
                                      isOpen: true,
                                      jobId: job.id,
                                    })
                                  }
                                  className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors text-sm font-medium"
                                >
                                  Dispute
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Station Info */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                          <div className="text-red-600 font-bold text-sm">
                            fm 92.5
                          </div>
                        </div>
                        <p className="text-white font-medium">
                          {job.station.name}
                        </p>
                      </div>

                      {/* Song Info */}
                      <div className="flex items-center gap-3">
                        <div className="bg-white rounded-lg p-2 flex-shrink-0">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <div className="text-red-600 font-bold text-xs">
                              fm 92.5
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium mb-1">
                            {job.song.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{job.song.duration}</span>
                            <span>{job.song.format}</span>
                          </div>
                        </div>
                      </div>

                      {/* Presenters */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex -space-x-2 mb-2">
                          {job.presenters.map((presenter, idx) => (
                            <img
                              key={idx}
                              src={presenter.avatar}
                              alt={presenter.name}
                              className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">
                          {job.presenters[0].name}
                        </p>
                      </div>

                      {/* Date/Time and Description */}
                      <div>
                        <div className="text-right mb-3">
                          <p className="text-white text-sm mb-1">{job.date}</p>
                          <p className="text-gray-400 text-xs">{job.time}</p>
                        </div>
                        <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#A67102]">
                          <p className="text-gray-300 text-xs">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeMainTab === "completed" && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700"
              >
                <div className="text-center mb-4">
                  <span className="inline-block bg-[#2a2a2a] text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Completed
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Station Info */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                      <div className="text-red-600 font-bold text-sm">
                        fm 92.5
                      </div>
                    </div>
                    <p className="text-white font-medium">{job.station.name}</p>
                  </div>

                  {/* Song Info */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 flex-shrink-0">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <div className="text-red-600 font-bold text-xs">
                          fm 92.5
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {job.song.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{job.song.duration}</span>
                        <span>{job.song.format}</span>
                      </div>
                    </div>
                  </div>

                  {/* Presenters */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex -space-x-2 mb-2">
                      {job.presenters.map((presenter, idx) => (
                        <img
                          key={idx}
                          src={presenter.avatar}
                          alt={presenter.name}
                          className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {job.presenters[0].name}
                    </p>
                  </div>

                  {/* Date/Time and Description */}
                  <div>
                    <div className="text-right mb-3">
                      <p className="text-white text-sm mb-1">{job.date}</p>
                      <p className="text-gray-400 text-xs">{job.time}</p>
                    </div>
                    <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#A67102]">
                      <p className="text-gray-300 text-xs">{job.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMainTab === "disputes" && (
          <div className="text-center py-12">
            <p className="text-gray-400">No disputes at the moment</p>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmationModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() =>
                  setConfirmationModal({ isOpen: false, jobId: null })
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Confirmation
              </h2>
              <p className="text-gray-300 text-center mb-8">
                Are you sure you want to accept that [influencer] has completed
                50% of the project?
              </p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                  Accept Request
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({ isOpen: false, jobId: null })
                  }
                  className="flex-1 px-6 py-3 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
                >
                  Decline Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
        {disputeModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setDisputeModal({ isOpen: false, jobId: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Dispute
              </h2>
              <p className="text-gray-300 text-center mb-8">
                You'll have to send us email, providing evidence of
                communication and receipts
              </p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                  Proceed to Email
                </button>
                <button
                  onClick={() =>
                    setDisputeModal({ isOpen: false, jobId: null })
                  }
                  className="flex-1 px-6 py-3 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { WalletPage };
export const ProfilePage: React.FC = () => {
  const [isEditingPhone, setIsEditingPhone] = React.useState(false);
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [isEditingName, setIsEditingName] = React.useState(false);

  const [phoneNumber, setPhoneNumber] = React.useState("08876654322");
  const [email, setEmail] = React.useState("abbeylin@gmail.com");
  const [name, setName] = React.useState("Abbey Lincoln");

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">PROFILE</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Profile Image Section */}
          <div className="bg-[#1a1a1a] rounded-lg p-6">
            <div className="flex flex-col items-center">
              {/* Profile Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-6 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center border-4 border-white">
                  <User className="w-16 h-16 text-gray-400" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-1">Abbey Lincoln</h2>
                <p className="text-gray-400 text-sm">@abbeylin</p>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-[#A67102] rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Bio</h3>
            <p className="text-white text-sm leading-relaxed">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. It is a long
              established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of usingt
              is a long established fact that a reader will be distracted by the
              readable content. It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here'
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!isEditingPhone}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingPhone(!isEditingPhone)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditingEmail}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditingName}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102] disabled:text-gray-400"
              />
              <button
                onClick={() => setIsEditingName(!isEditingName)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A67102] hover:text-[#8a5e02] text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={() => {
                setIsEditingPhone(false);
                setIsEditingEmail(false);
                setIsEditingName(false);
                // Add your update logic here
              }}
              className="px-8 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---- Route table (used by index.tsx to mount nested routes) ----
   Each entry is a relative path from /dashboard */
export const DASHBOARD_ROUTES = [
  { path: "", element: <DashboardHome /> }, // index route
  { path: "notifications", element: <NotificationPage /> },
  { path: "notifications/:id", element: <NotificationDetails /> },
  { path: "statistics", element: <StatisticsPage /> },
  { path: "media", element: <MediaPage /> },
  { path: "promotion", element: <PromotionPage /> },
  { path: "jobs", element: <JobsPage /> },
  { path: "wallet", element: <WalletPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "influencerboard", element: <InfluencerDashboard /> },
  { path: "influencernotifications", element: <InfluencerNotifications /> },
  { path: "influencerjobs", element: <InfluencerJobs /> },
  { path: "influencerprofile", element: <InfluencerProfile /> },
  { path: "influencerwallets", element: <InfluencerWallet /> },
  //  notifcation page detail route
  {
    path: "influencernotifications/:id",
    element: <InfluencerNotificationsDetail />,
  },
  //station routes can be added here later
  { path: "stationboard", element: <StationDashboard /> },
  { path: "stationnotification", element: <StationNotifications /> },
  { path: "stationnotification/:id", element: <StationNotificationsDetail /> },
  { path: "stationprofile", element: <StationProfile /> },
  { path: "stationjobs", element: <StationJobs /> },
  { path: "stationpricing", element: <StationPricing /> },
  //admin routes can be added here later
  { path: "adminboard", element: <AdminDashboard /> },
  { path: "adminnotification", element: <AdminNotifications /> },
  { path: "adminnotification/:id", element: <AdminNotificationsDetails /> },
  { path: "adminwallets", element: <AdminWallet /> },
  { path: "adminprofile", element: <AdminProfile /> },
  { path: "admininfluencers", element: <AdminInfluencers /> },
  { path: "admininfluencers/:id", element: <AdminInfluencersDetail /> },
  { path: "adminradios", element: <AdminRadio /> },
  { path: "adminradios/:id", element: <AdminRadioDetails /> },
  { path: "admintv", element: <AdminTv /> },
  { path: "admintv/:id", element: <AdminTvDetails /> },
  { path: "adminjob", element: <AdminJob /> },
   { path: "admin/artist", element: <AdminArtist/> },
      { path: "admin/artist/:id", element: <AdminArtistDetails/> },
];

export default DashboardHome;
