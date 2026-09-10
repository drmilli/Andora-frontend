import React, { useContext } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  LayoutDashboard,
  BarChart2,
  Music,
  Megaphone,
  User,
  Bell,
  Briefcase,
  Wallet,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";

/**
 * Dashboard layout component
 *
 * - Renders the Sidebar on the left
 * - Renders the Header on top of the main content area
 * - Uses <Outlet /> to render nested routes (Dashboard pages)
 * - Renders a mobile bottom navbar so navigation is available across dashboard routes
 *
 * Keep the named export `DashboardPage` for compatibility with existing imports.
 */
export function DashboardPage(): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const context = useContext(AppContext);
  const role = context?.user?.role?.toLowerCase();

  const navItemClass = (isActive: boolean) =>
    `flex flex-col items-center gap-1 ${isActive ? "text-[#A67102]" : "text-gray-200"}`;

  // Use the current location to compute a contextual header title
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, ""); // normalize trailing slash

  const headerTitle = (() => {
    if (pathname === "/dashboard" || pathname === "/dashboard/")
      return "Dashboard";
    if (pathname.includes("statistic")) return "Statistics";
    if (pathname.includes("media") || pathname.includes("radio") || pathname.includes("tv")) return "Media";
    if (pathname.includes("promotion") || pathname.includes("campaign")) return "Promotion";
    if (pathname.includes("profile")) return "Profile";
    if (pathname.includes("notification")) return "Notifications";
    if (pathname.includes("wallet")) return "Wallet";
    if (pathname.includes("job")) return "Jobs";
    if (pathname.includes("pricing")) return "Pricing";
    return "Dashboard";
  })();

  return (
    <div className="flex h-screen bg-black text-gray-300 font-sans overflow-hidden hero-font">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 flex flex-col overflow-hidden bg-black">
        <Header 
          title={headerTitle} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Main content area where nested routes will render */}
        <div className="flex-1 overflow-y-auto p-4 pt-4">
          <Outlet />
        </div>
      </main>

      {/* Mobile liquid-glass bottom navigation - shown on small screens only */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[94%] max-w-3xl rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-2 flex justify-between items-center px-3 md:hidden z-50">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) => navItemClass(isActive)}
        >
          <LayoutDashboard size={22} />
          <span className="text-[11px]">Dashboard</span>
        </NavLink>

        {role === "influencer" ? (
          <>
            <NavLink
              to="/dashboard/influencer-notifications"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Bell size={22} />
              <span className="text-[11px]">Notification</span>
            </NavLink>

            <NavLink
              to="/dashboard/influencer-jobs"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Briefcase size={22} />
              <span className="text-[11px]">Jobs</span>
            </NavLink>

            <NavLink
              to="/dashboard/influencer-wallets"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Wallet size={22} />
              <span className="text-[11px]">Wallet</span>
            </NavLink>

            <NavLink
              to="/dashboard/influencer-profile"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <User size={22} />
              <span className="text-[11px]">Profile</span>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard/statistics"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <BarChart2 size={22} />
              <span className="text-[11px]">Statistics</span>
            </NavLink>

            <NavLink
              to="/dashboard/media"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Music size={22} />
              <span className="text-[11px]">Media</span>
            </NavLink>

            <NavLink
              to="/dashboard/promotion"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <Megaphone size={22} />
              <span className="text-[11px]">Promotion</span>
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => navItemClass(isActive)}
            >
              <User size={22} />
              <span className="text-[11px]">Profile</span>
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}

export default DashboardPage;