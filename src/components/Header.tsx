//src/components/Header.tsx
import React, { useState, ChangeEvent } from "react";
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getPageTitle } from '../lib/pageTitles';
import { Search, Bell, User, Settings, Wallet } from "lucide-react";

type HeaderProps = {
  title?: string;
  placeholder?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
};

export const Header: React.FC<HeaderProps> = ({
 
  placeholder = "Search here",
  showSearch = true,
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const { pathname } = useLocation();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    if (onSearch) onSearch(v);
  }

  return (
    <header
      className="flex items-center justify-between p-6 pb-3 border-b border-gray-900 bg-black"
      role="banner"
      aria-label="Page header"
    >
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-white tracking-wide uppercase">
            {getPageTitle(pathname)}
        </h1>

        {/* optionally show a small page subtitle or breadcrumb slot */}
        <div className="hidden sm:block text-sm text-gray-400">
          {/* placeholder for breadcrumbs / context */}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          // Hide search on mobile; visible from small screens and up
          <div className="hidden sm:block">
            <div className="relative w-72">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#A67102]" />
              </div>

              <input
                aria-label="Search"
                type="text"
                value={query}
                onChange={handleChange}
                placeholder={placeholder}
                className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-xl leading-5 bg-[#111111] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#A67102] focus:ring-1 focus:ring-[#A67102] sm:text-sm"
              />
            </div>
          </div>
        )}

        {/* Mobile-only icons: Notifications + Wallet */}
        <Link
          to="/dashboard/notifications"
          aria-label="Notifications"
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none md:hidden"
        >
          <Bell size={18} />
        </Link>

        <Link
          to="/dashboard/wallet"
          aria-label="Wallet"
          className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none md:hidden"
        >
          <Wallet size={18} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
