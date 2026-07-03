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



/* ---- Route table (used by index.tsx to mount nested routes) ----
   Each entry is a relative path from /dashboard */
export const DASHBOARD_ROUTES = [

  // select route based wether it is for artist ,staion,influencer or admin

  { path: "", element: <DashboardHome /> },
  { path: "notifications", element: <NotificationPage /> },
  { path: "notifications/:id", element: <NotificationDetails /> },
  { path: "statistics", element: <StatisticsPage /> },
  { path: "media", element: <MediaPage /> },
  { path: "promotion", element: <PromotionPage /> },
  { path: "jobs", element: <JobsPage /> },
  // { path: "wallet", element: <WalletPage /> },
  { path: "profile", element: <ProfilePage /> },
  { path: "campaigns", element: <Campaign /> },
    {path:"billings", element:<BillingPage/>},
      {path:'settings', element:<SettingsPage />},
  {path:'my-songs', element:<MySongs/>},

  { path: "influencer-dashboard", element: <InfluencerDashboard /> },
  { path: "influencer-notifications", element: <InfluencerNotifications /> },
  { path: "influencer-jobs", element: <InfluencerJobs /> },
  { path: "influencer-profile", element: <InfluencerProfile /> },
  { path: "influencer-wallets", element: <InfluencerWallet /> },
  //  notifcation page detail route
  {
    path: "influencernotifications/:id",
    element: <InfluencerNotificationsDetail />,
  },
  //station routes can be added here later
  { path: "station-dashboard", element: <StationDashboard /> },
  { path: "station-notifications", element: <StationNotifications /> },
  { path: "station-notification/:id", element: <StationNotificationsDetail /> },
  { path: "station-profile", element: <StationProfile /> },
  { path: "station-jobs", element: <StationJobs /> },
  { path: "station-pricing", element: <StationPricing /> },
  //admin routes can be added here later
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
   { path: "admin/artist", element: <AdminArtist/> },
      { path: "admin/artist/:id", element: <AdminArtistDetails/> },
];

export default DashboardHome;
