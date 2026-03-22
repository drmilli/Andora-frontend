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
import { DashboardHome } from "./artist/DashboardHome";
import { NotificationPage } from "./artist/NotificationPage";
import NotificationDetails from "./artist/NotificationDetails";
import { StatisticsPage } from "./artist/StatisticsPage";
import { MediaPage } from "./artist/MediaPage";
import { PromotionPage } from "./artist/PromotionPage";
import { JobsPage } from "./artist/JobsPage";
import { ProfilePage } from "./artist/ProfilePage";
import WalletPage from "./artist/WalletPage";



/* ---- Route table (used by index.tsx to mount nested routes) ----
   Each entry is a relative path from /dashboard */
export const DASHBOARD_ROUTES = [
  { path: "", element: <DashboardHome /> },
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
