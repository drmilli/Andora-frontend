
import InfluencerDashboard from "./influencer/InfluencerDashboard";
import InfluencerNotifications from "./influencer/InfluencerNotifications";
import InfluencerProfile from "./influencer/InfluencerProfile";
import InfluencerJobs from "../dashboard_pages/influencer/InfluencerJobs";
import InfluencerWallet from "./influencer/InfluencerWallet";


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

import Campaign from "./artist/Campaign";
import CampaignDetails from "./artist/CampaignDetails";
import MySongs from "./artist/MySongs";
import SongDetails from "./artist/SongDetails";
import SettingsPage from "./artist/SettingsPage";
import BillingPage from "./artist/BillingPage";



import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";
import { isCampaignStrategist } from "@/lib/roles";
import { CampaignStrategistDashboard } from "./strategist/CampaignStrategistDashboard";
import CampaignStrategistNotifications from "./strategist/CampaignStrategistNotifications";
import CampaignStrategistJobs from "./strategist/CampaignStrategistJobs";
import CampaignStrategistReports from "./strategist/CampaignStrategistReports";
import RoleGuard from "@/components/auth/RoleGuard";

export function RoleDashboardHome() {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  if (role === "influencer") {
    return <InfluencerDashboard />;
  }
  if (role === "station") {
    return <StationDashboard />;
  }
  if (role === "admin") {
    return <AdminDashboard />;
  }
  if (isCampaignStrategist(role)) {
    return <CampaignStrategistDashboard />;
  }
  return <DashboardHome />;
}

export function RoleNotifications() {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  if (role === "influencer") {
    return <InfluencerNotifications />;
  }
  if (role === "station") {
    return <StationNotifications />;
  }
  if (role === "admin") {
    return <AdminNotifications />;
  }
  if (isCampaignStrategist(role)) {
    return <CampaignStrategistNotifications />;
  }
  return <NotificationPage />;
}

export function RoleJobs() {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  if (role === "influencer") {
    return <InfluencerJobs />;
  }
  if (role === "station") {
    return <StationJobs />;
  }
  if (role === "admin") {
    return <AdminJob />;
  }
  return <JobsPage />;
}

export function RoleProfile() {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  if (role === "influencer") {
    return <InfluencerProfile />;
  }
  if (role === "station") {
    return <StationProfile />;
  }
  if (role === "admin") {
    return <AdminProfile />;
  }
  return <ProfilePage />;
}

export function RoleWallet() {
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  if (role === "influencer") {
    return <InfluencerWallet />;
  }
  if (role === "admin") {
    return <AdminWallet />;
  }
  return <BillingPage />;
}

export const DASHBOARD_ROUTES = [

  { path: "", element: <RoleDashboardHome /> },
  { path: "notifications", element: <RoleNotifications /> },
  { path: "notifications/:id", element: <NotificationDetails /> },
  { path: "statistics", element: <StatisticsPage /> },
  { path: "media", element: <MediaPage /> },
  { path: "promotion", element: <PromotionPage /> },
  { path: "jobs", element: <RoleJobs /> },
  { path: "wallet", element: <RoleWallet /> },
  { path: "profile", element: <RoleProfile /> },
  { path: "campaigns", element: <Campaign /> },
  { path: "campaigns/:id", element: <CampaignDetails /> },
  { path: "billings", element: <BillingPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "my-songs", element: <MySongs /> },
  { path: "my-songs/:id", element: <SongDetails /> },

  // Campaign strategist
  { path: "strategist-dashboard", element: <RoleGuard allowedRoles={["campaign_strategist"]}><CampaignStrategistDashboard /></RoleGuard> },
  { path: "song-submissions", element: <RoleGuard allowedRoles={["campaign_strategist"]}><CampaignStrategistJobs /></RoleGuard> },
  { path: "reports", element: <RoleGuard allowedRoles={["campaign_strategist"]}><CampaignStrategistReports /></RoleGuard> },

  // Influencer direct routes
  { path: "influencer-dashboard", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerDashboard /></RoleGuard> },
  { path: "influencer-notifications", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerNotifications /></RoleGuard> },
  { path: "influencer-notifications/:id", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerNotificationsDetail /></RoleGuard> },
  { path: "influencer-jobs", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerJobs /></RoleGuard> },
  { path: "influencer-profile", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerProfile /></RoleGuard> },
  { path: "influencer-wallets", element: <RoleGuard allowedRoles={["influencer"]}><InfluencerWallet /></RoleGuard> },
  {
    path: "influencernotifications/:id",
    element: <RoleGuard allowedRoles={["influencer"]}><InfluencerNotificationsDetail /></RoleGuard>,
  },

  // Station routes
  { path: "station-dashboard", element: <RoleGuard allowedRoles={["station"]}><StationDashboard /></RoleGuard> },
  { path: "station-notifications", element: <RoleGuard allowedRoles={["station"]}><StationNotifications /></RoleGuard> },
  { path: "station-notification/:id", element: <RoleGuard allowedRoles={["station"]}><StationNotificationsDetail /></RoleGuard> },
  { path: "station-profile", element: <RoleGuard allowedRoles={["station"]}><StationProfile /></RoleGuard> },
  { path: "station-jobs", element: <RoleGuard allowedRoles={["station"]}><StationJobs /></RoleGuard> },
  { path: "station-pricing", element: <RoleGuard allowedRoles={["station"]}><StationPricing /></RoleGuard> },

  // Admin routes
  { path: "admin-dashboard", element: <RoleGuard allowedRoles={["admin"]}><AdminDashboard /></RoleGuard> },
  { path: "admin-notification", element: <RoleGuard allowedRoles={["admin"]}><AdminNotifications /></RoleGuard> },
  { path: "admin-notification/:id", element: <RoleGuard allowedRoles={["admin"]}><AdminNotificationsDetails /></RoleGuard> },
  { path: "admin-wallets", element: <RoleGuard allowedRoles={["admin"]}><AdminWallet /></RoleGuard> },
  { path: "admin-profile", element: <RoleGuard allowedRoles={["admin"]}><AdminProfile /></RoleGuard> },
  { path: "admin-influencers", element: <RoleGuard allowedRoles={["admin"]}><AdminInfluencers /></RoleGuard> },
  { path: "admin-influencers/:id", element: <RoleGuard allowedRoles={["admin"]}><AdminInfluencersDetail /></RoleGuard> },
  { path: "admin-radios", element: <RoleGuard allowedRoles={["admin"]}><AdminRadio /></RoleGuard> },
  { path: "admin-radios/:id", element: <RoleGuard allowedRoles={["admin"]}><AdminRadioDetails /></RoleGuard> },
  { path: "admin-tv", element: <RoleGuard allowedRoles={["admin"]}><AdminTv /></RoleGuard> },
  { path: "admin-tv/:id", element: <RoleGuard allowedRoles={["admin"]}><AdminTvDetails /></RoleGuard> },
  { path: "admin-job", element: <RoleGuard allowedRoles={["admin"]}><AdminJob /></RoleGuard> },
  { path: "admin/artist", element: <RoleGuard allowedRoles={["admin"]}><AdminArtist /></RoleGuard> },
  { path: "admin/artist/:id", element: <RoleGuard allowedRoles={["admin"]}><AdminArtistDetails /></RoleGuard> },
];

export default RoleDashboardHome;

