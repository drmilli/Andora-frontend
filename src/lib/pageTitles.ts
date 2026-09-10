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
  if (
    pathname.startsWith("/dashboard/influencerboard") ||
    pathname.startsWith("/dashboard/influencer-dashboard")
  )
    return "Dashboard";

  if (
    pathname.startsWith("/dashboard/influencernotifications") ||
    pathname.startsWith("/dashboard/influencer-notifications")
  )
    return "Notification";

  if (
    pathname.startsWith("/dashboard/influencerjobs") ||
    pathname.startsWith("/dashboard/influencer-jobs")
  )
    return "Jobs";

  if (
    pathname.startsWith("/dashboard/influencerprofile") ||
    pathname.startsWith("/dashboard/influencer-profile")
  )
    return "Profile";

  if (
    pathname.startsWith("/dashboard/influencerwallets") ||
    pathname.startsWith("/dashboard/influencer-wallets")
  )
    return "Wallet";

  // Station
  if (
    pathname.startsWith("/dashboard/stationboard") ||
    pathname.startsWith("/dashboard/station-dashboard")
  )
    return "Dashboard";

  if (
    pathname.startsWith("/dashboard/stationnotification") ||
    pathname.startsWith("/dashboard/station-notifications")
  )
    return "Notification";

  if (
    pathname.startsWith("/dashboard/stationjobs") ||
    pathname.startsWith("/dashboard/station-jobs")
  )
    return "Jobs";

  if (
    pathname.startsWith("/dashboard/stationprofile") ||
    pathname.startsWith("/dashboard/station-profile")
  )
    return "Profile";

  if (
    pathname.startsWith("/dashboard/stationpricing") ||
    pathname.startsWith("/dashboard/station-pricing")
  )
    return "Pricing";

  return "Dashboard";
};
