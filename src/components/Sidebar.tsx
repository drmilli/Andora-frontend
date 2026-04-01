import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  BarChart2,
  Music,
  Megaphone,
  Briefcase,
  Wallet,
  User,
  LogOut,
  Lock,
  Scale,
  X
} from "lucide-react";
import audoraLogo from "../assets/audora-logo.svg";
import profilePic from "../assets/ProfilePic.png";
import { AppContext } from "@/Context/AppContext";

type NavItem = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  {
    to: "/dashboard/notifications",
    label: "Notification",
    icon: <Bell size={20} />,
  },
  {
    to: "/dashboard/statistics",
    label: "Statistics",
    icon: <BarChart2 size={20} />,
  },
  { to: "/dashboard/media", label: "Media", icon: <Music size={20} /> },
  {
    to: "/dashboard/promotion",
    label: "Promotion",
    icon: <Megaphone size={20} />,
  },
  { to: "/dashboard/jobs", label: "Jobs", icon: <Briefcase size={20} /> },
  { to: "/dashboard/wallet", label: "Wallet", icon: <Wallet size={20} /> },
  { to: "/dashboard/profile", label: "Profile", icon: <User size={20} /> },
];

export const Sidebar: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = ({ isOpen = false, onClose }): React.ReactElement => {

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
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-gray-900 bg-[#050505] h-[100dvh] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:justify-between md:p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
          <div className="flex flex-col items-center mb-6 mt-4">
            <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mb-3 border-2 border-gray-600">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-semibold">{user?.username}</h3>
            <p className="text-xs text-gray-500 truncate w-40">{user?.email}</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 px-2" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === "/dashboard"}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center w-full transition-colors mb-2 ${
                    isActive
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

          {/* Centered logo (kept inside scroll area so it stays visually with nav on small screens) */}
          <div className="flex items-center justify-center my-6">
            <img src={audoraLogo} alt="Audora logo" className="h-10" />
          </div>
        </div>

        {/* Bottom-sticky settings */}
        <div className="mt-auto pt-4">
          <div className="px-2">
            <p className="text-white font-medium mb-4">Settings</p>
            <div className="flex items-center justify-start gap-6 text-gray-500 pb-4">
              <button
                type="button"
                aria-label="Lock"
                className="hover:text-white focus:outline-none"
              >
                <Lock size={18} />
              </button>
              <button
                type="button"
                aria-label="Scale"
                className="hover:text-white focus:outline-none"
              >
                <Scale size={18} />
              </button>
              <button
                type="button"
                aria-label="User"
                className="hover:text-white focus:outline-none"
              >
                <User size={18} />
              </button>
              <button
                type="button"
                aria-label="Logout"
                className="hover:text-white focus:outline-none"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;