import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  LayoutDashboard,
  BarChart2,
  Music,
  Megaphone,
  User,
} from "lucide-react";

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
  const navItemClass = (isActive: boolean) =>
    `flex flex-col items-center gap-1 ${isActive ? "text-[#A67102]" : "text-gray-200"}`;

  // Use the current location to compute a contextual header title
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, ""); // normalize trailing slash

  const headerTitle = (() => {
    if (pathname === "/dashboard" || pathname === "/dashboard/")
      return "Dashboard";
    if (pathname.startsWith("/dashboard/statistics")) return "Statistics";
    if (pathname.startsWith("/dashboard/media")) return "Media";
    if (pathname.startsWith("/dashboard/promotion")) return "Promotion";
    if (pathname.startsWith("/dashboard/profile")) return "Profile";
    if (pathname.startsWith("/dashboard/notifications")) return "Notifications";
    if (pathname.startsWith("/dashboard/wallet")) return "Wallet";
    return "Dashboard";
  })();

  return (
    <div className="flex h-screen bg-black text-gray-300 font-sans overflow-hidden hero-font">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden bg-black">
        <Header title={headerTitle} />

        {/* Main content area where nested routes will render */}
        <div className="flex-1 overflow-y-auto p-8 pt-4">
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
      </nav>
    </div>
  );
}

export default DashboardPage;
