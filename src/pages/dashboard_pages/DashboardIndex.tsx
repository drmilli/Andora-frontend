import React from "react";
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
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { NotificationIcon } from "../../assets/notification";
import InfluencerNotificationsDetail from "./influencer/InfluencerNotificationsDetail";
import StationDashboard from "./station/StationDashboard";
import StationNotifications from "./station/StationNotifications";
import StationNotificationsDetail from "./station/StationNotificationsDetail";
import StationJobs from "./station/StationJobs";
import StationPricing from "./station/StationPricing";
import StationProfile from "./station/StationProfile";

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
            <div
              key={n.id}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow ${
                n.unread
                  ? "bg-[#0D0B07]  shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <NotificationIcon />
                </div>

                <div>
                  <div className=" flex justify-between">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {n.title}
                    </h3>
                    <div className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">
                      {n.time}
                    </div>
                  </div>
                  <div className="w-[947px]">
                    <p className="text-sm text-gray-400 mt-1 flex ">{n.body}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const StatisticsPage: React.FC = () => (
  <PageShell title="Statistics" description="Analytics and charts (dummy)" />
);
export const MediaPage: React.FC = () => (
  <PageShell title="Media" description="Manage audio and video assets" />
);
export const PromotionPage: React.FC = () => (
  <PageShell title="Promotion" description="Promotion campaigns and tools" />
);
export const JobsPage: React.FC = () => (
  <PageShell title="Jobs" description="Job postings and applications" />
);
export const WalletPage: React.FC = () => (
  <PageShell title="Wallet" description="Wallet balance and transactions" />
);
export const ProfilePage: React.FC = () => (
  <PageShell title="Profile" description="Edit profile and account settings" />
);

/* ---- Route table (used by index.tsx to mount nested routes) ----
   Each entry is a relative path from /dashboard */
export const DASHBOARD_ROUTES = [
  { path: "", element: <DashboardHome /> }, // index route
  { path: "notifications", element: <NotificationPage /> },
  { path: "statistics", element: <StatisticsPage /> },
  { path: "media", element: <MediaPage /> },
  { path: "promotion", element: <PromotionPage /> },
  { path: "jobs", element: <JobsPage /> },
  { path: "wallet", element: <WalletPage /> },
  { path: "profile", element: <ProfilePage /> },
   { path: "influencerboard", element: <InfluencerDashboard/> },
    { path: "influencernotifications", element: <InfluencerNotifications/> },
   { path: "influencerjobs", element: <InfluencerJobs/> },
      { path: "influencerprofile", element: <InfluencerProfile/> },
         { path: "influencerwallets", element: <InfluencerWallet/> },
        //  notifcation page detail route
        {path: "influencernotifications/:id", element: <InfluencerNotificationsDetail/>},
        //station routes can be added here later
        {path:"stationboard", element: <StationDashboard/> },
        {path:"stationnotification", element: <StationNotifications/> },
        {path:"stationnotification/:id", element: <StationNotificationsDetail/> },
        {path:"stationprofile", element: <StationProfile/> },
         {path:"stationjobs", element: <StationJobs/> },
          {path:"stationpricing", element: <StationPricing/> },

];

export default DashboardHome;
