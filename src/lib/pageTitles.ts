export const getPageTitle = (pathname: string): string => {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "Dashboard";
  if (pathname.startsWith("/dashboard/earnings")) return "Earnings";
  if (pathname.startsWith("/dashboard/payouts")) return "Payouts";
  if (pathname.startsWith("/dashboard/categories/new")) return "New Category";
  if (pathname.startsWith("/dashboard/categories")) return "Categories";
  if (pathname.startsWith("/dashboard/menu/new")) return "Add Food Item";
  if (pathname.startsWith("/dashboard/menu")) return "Menu";
  if (pathname.startsWith("/dashboard/orders")) return "Orders";
  if (pathname.startsWith("/dashboard/reviews")) return "Reviews";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  if (pathname === "/dashboard_pages") return "Dashboard";
  if (pathname.startsWith("/dashboard/my-songs")) return "My Songs";

      if (pathname.startsWith("/dashboard/campaigns")) return "Campaigns";
        if (pathname.startsWith("/dashboard/billings")) return "Billings";
          if (pathname.startsWith("/dashboard/settings")) return "Settings";

  if (pathname.startsWith("/dashboard/notifications")) return "Notification";

  if (pathname.startsWith("/dashboard/statistics")) return "Statistics";

  if (pathname.startsWith("/dashboard/media")) return "Media";

  if (pathname.startsWith("/dashboard/promotion")) return "Promotion";

  if (pathname.startsWith("/dashboard/jobs")) return "Jobs";

  if (pathname.startsWith("/dashboard/wallet")) return "Wallet";

  if (pathname.startsWith("/dashboard/profile")) return "Profile";

  // Influencer
  if (pathname.startsWith("/dashboard/influencerboard")) return "Dashboard";

  if (pathname.startsWith("/dashboard/influencernotifications"))
    return "Notification";

  if (pathname.startsWith("/dashboard/influencerjobs")) return "Jobs";

  if (pathname.startsWith("/dashboard/influencerprofile")) return "Profile";

  if (pathname.startsWith("/dashboard/influencerwallets")) return "Wallet";

  // Station
  if (pathname.startsWith("/dashboard/stationboard")) return "Dashboard";

  if (pathname.startsWith("/dashboard/stationnotification"))
    return "Notification";

  if (pathname.startsWith("/dashboard/stationjobs")) return "Jobs";

  if (pathname.startsWith("/dashboard/stationprofile")) return "Profile";

  if (pathname.startsWith("/dashboard/stationpricing")) return "Pricing";

  return "Dashboard";
};
