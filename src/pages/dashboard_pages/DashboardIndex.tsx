
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
import MySongs from "./artist/MySongs";
import SettingsPage from "./artist/SettingsPage";
import BillingPage from "./artist/BillingPage";



import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";

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

/* ---- Route table (used by index.tsx to mount nested routes) ----
   Each entry is a relative path from /dashboard */
export const DASHBOARD_ROUTES = [
  // Role-based main routes
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
  { path: "billings", element: <BillingPage /> },
  { path: "settings", element: <SettingsPage /> },
  { path: "my-songs", element: <MySongs /> },

  // Influencer direct routes
  { path: "influencer-dashboard", element: <InfluencerDashboard /> },
  { path: "influencer-notifications", element: <InfluencerNotifications /> },
  { path: "influencer-notifications/:id", element: <InfluencerNotificationsDetail /> },
  { path: "influencer-jobs", element: <InfluencerJobs /> },
  { path: "influencer-profile", element: <InfluencerProfile /> },
  { path: "influencer-wallets", element: <InfluencerWallet /> },
  {
    path: "influencernotifications/:id",
    element: <InfluencerNotificationsDetail />,
  },

  // Station routes
  { path: "station-dashboard", element: <StationDashboard /> },
  { path: "station-notifications", element: <StationNotifications /> },
  { path: "station-notification/:id", element: <StationNotificationsDetail /> },
  { path: "station-profile", element: <StationProfile /> },
  { path: "station-jobs", element: <StationJobs /> },
  { path: "station-pricing", element: <StationPricing /> },

  // Admin routes
  { path: "admin-dashboard", element: <AdminDashboard /> },
  { path: "admin-notification", element: <AdminNotifications /> },
  { path: "admin-notification/:id", element: <AdminNotificationsDetails /> },
  { path: "admin-wallets", element: <AdminWallet /> },
  { path: "admin-profile", element: <AdminProfile /> },
  { path: "admin-influencers", element: <AdminInfluencers /> },
  { path: "admin-influencers/:id", element: <AdminInfluencersDetail /> },
  { path: "admin-radios", element: <AdminRadio /> },
  { path: "admin-radios/:id", element: <AdminRadioDetails /> },
  { path: "admin-tv", element: <AdminTv /> },
  { path: "admin-tv/:id", element: <AdminTvDetails /> },
  { path: "admin-job", element: <AdminJob /> },
  { path: "admin/artist", element: <AdminArtist /> },
  { path: "admin/artist/:id", element: <AdminArtistDetails /> },
];

export default RoleDashboardHome;

