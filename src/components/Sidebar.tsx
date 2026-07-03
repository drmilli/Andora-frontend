import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  BarChart2,
  Music,

  Briefcase,
  Wallet,
  User,

  X,
  Settings
} from "lucide-react";
import audoraLogo from "../assets/audora-logo.svg";
import profilePic from "../assets/ProfilePic.png";
import { AppContext } from "@/Context/AppContext";

// type NavItem = {
//   to: string;
//   label: string;
//   icon: React.ReactNode;
// };

// getting a dynamic route based on type dashboard
export interface NavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}
const NAV_ITEMS_BY_ROLE: Record<string, NavItemProps[]> = {
  artist: [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/dashboard/notifications", label: "Notification", icon: <Bell size={20} /> },
    { to: "/dashboard/my-songs", label: "My songs", icon: <Music size={20} /> },
    { to: "/dashboard/campaigns", label: "Campaigns", icon: <BarChart2 size={20} /> },
    { to: "/dashboard/billings", label: "Billings", icon: <Wallet size={20} /> },
    {to:"/dashboard/settings",label:"Settings",icon:<Settings size={20}/>},
    // { to: "/dashboard/wallet", label: "Wallet", icon: <Wallet size={20} /> },
    { to: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
  ],

  station: [
    { to: "/dashboard/station-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/dashboard/station-notifications", label: "Notification", icon: <Bell size={20} /> },
    { to: "/dashboard/station-jobs", label: "Jobs", icon: <Briefcase size={20} /> },
    { to: "/dashboard/station-pricing", label: "Pricing", icon: <Wallet size={20} /> },
    { to: "/dashboard/station-profile", label: "Profile", icon: <User size={20} /> },
  ],

  influencer: [
    { to: "/dashboard/influencer-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/dashboard/influencer-notifications", label: "Notification", icon: <Bell size={20} /> },
    { to: "/dashboard/influencer-jobs", label: "Jobs", icon: <Briefcase size={20} /> },
    { to: "/dashboard/influencer-wallets", label: "Wallet", icon: <Wallet size={20} /> },
    { to: "/dashboard/influencer-profile", label: "Profile", icon: <User size={20} /> },
  ],

  admin: [
    { to: "/dashboard/admin-dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/dashboard/admin-notification", label: "Notification", icon: <Bell size={20} /> },
    { to: "/dashboard/admin-wallets", label: "Wallet", icon: <Wallet size={20} /> },
    { to: "/dashboard/admin-profile", label: "Profile", icon: <User size={20} /> },
    { to: "/dashboard/admin-influencers", label: "Influencers", icon: <User size={20} /> },
    { to: "/dashboard/admin-radios", label: "Radios", icon: <Music size={20} /> },
    { to: "/dashboard/admin-tv", label: "TV", icon: <Music size={20} /> },
    { to: "/dashboard/admin-job", label: "Jobs", icon: <Briefcase size={20} /> },
  ],
};

export type UserRole = "artist" | "station" | "influencer" | "admin";
const user = {
  role: "artist",
};
const navItems = NAV_ITEMS_BY_ROLE[user.role];
export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void; }> = ({ isOpen = false, onClose }): React.ReactElement => {
  const context = useContext(AppContext);
  const user = context?.user;
  console.log(user);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-900 bg-[#050505] h-[100dvh] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:justify-between md:p-4 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Primary"
      >
        {/* Close button for mobile */}
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        {/* Top scrollable area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="overflow-y-auto pr-2">
            {/* Profile */}
             {/* Centered logo (kept inside scroll area so it stays visually with nav on small screens) */}
            <div className="flex  justify-start my-6 px-2">
              <img src={audoraLogo} alt="Audora logo" className="w-30" />
            </div>
            {/* Navigation */}
            <nav className="space-y-3 px-2" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  end={item.to === "/dashboard"}
                  className={({ isActive }: { isActive: boolean }) =>
                    `flex items-center w-full transition-colors mb-2 ${isActive
                      ? "bg-[#A67102] text-white rounded-lg  pl-4 pr-5 py-3 shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-gray-900 pl-3 pr-4 py-2"
                    }`
                  }
                >
                  <span className="mr-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              ))}
            </nav>


          </div>

          {/* Bottom-sticky settings */}
          <div className="mt-auto pt-4">
            <div className="">
              <div className="flex gap-3 justify-between align-middle items-center mb-6 mt-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mb-3 border-2 border-gray-600">
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
   <h3 className="text-white font-semibold">{user?.username}</h3>
                <p className="text-xs text-gray-500 truncate w-40">{user?.email}</p>
                </div>
             
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;