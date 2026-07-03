import React, { useState, } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPageTitle } from "../lib/pageTitles";
import { Bell, Wallet, Menu, ChevronLeft, Music, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type HeaderProps = {
  title?: string;
  placeholder?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
};

// ---- Campaign flow types ----
type CampaignStep = "method" | "selectSong" | "package";

type Song = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  image: string;
};

type PackageOption = {
  id: string;
  name: string;
  duration: string;
  influencers: number;
  price: string;
};

const songs: Song[] = [
  { id: "1", title: "Smoke", genre: "Gospel", duration: "3:42", image: "https://i.pravatar.cc/80?img=10" },
  { id: "2", title: "Smoke", genre: "Gospel", duration: "3:42", image: "https://i.pravatar.cc/80?img=11" },
  { id: "3", title: "Smoke", genre: "Gospel", duration: "3:42", image: "https://i.pravatar.cc/80?img=12" },
  { id: "4", title: "Smoke", genre: "Gospel", duration: "3:42", image: "https://i.pravatar.cc/80?img=13" },
  { id: "5", title: "Smoke", genre: "Gospel", duration: "3:42", image: "https://i.pravatar.cc/80?img=14" },
];

const packages: PackageOption[] = [
  { id: "starter", name: "Starter Push", duration: "14 days", influencers: 2, price: "₦ 32,000.00" },
  { id: "medium", name: "Medium Push", duration: "30 days", influencers: 4, price: "₦ 50,000.00" },
  { id: "pro", name: "Pro Push", duration: "60 days", influencers: 6, price: "₦ 100,000.00" },
];

export const Header: React.FC<HeaderProps> = ({

  showSearch = true,

  onMenuClick,
}) => {

  const { pathname } = useLocation();

  // Campaign modal state
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<CampaignStep>("method");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageOption | null>(null);



  function openCampaignModal() {
    setStep("method");
    setSelectedSong(null);
    setSelectedPackage(null);
    setOpen(true);
  }

  function goBack() {
    if (step === "selectSong") setStep("method");
    else if (step === "package") setStep("selectSong");
  }

  function handleSelectSong(song: Song) {
    setSelectedSong(song);
    setStep("package");
  }

  function handleLaunchCampaign() {
    // TODO: hook this up to your API call
    console.log("Launching campaign:", { selectedSong, selectedPackage });
    setOpen(false);
  }

  return (
    <header
      className="flex items-center justify-between p-6 pb-3 border-b border-gray-900 bg-black"
      role="banner"
      aria-label="Page header"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase truncate max-w-[200px] sm:max-w-none">
          {getPageTitle(pathname)}
        </h1>

        <div className="hidden sm:block text-sm text-gray-400" />
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="hidden sm:block">
            <button
              onClick={openCampaignModal}
              className="bg-[#A67102] hover:bg-[#8a5e02] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              Start Campaign
            </button>
          </div>
        )}

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

      {/* ----------- START CAMPAIGN MODAL ----------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-md p-0 overflow-hidden">
          <div className="p-4">
            {/* Back button (hidden on first step) */}
            {step !== "method" ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4"
              >
                <ChevronLeft size={16} />
                Back
              </button>
            ) : (
              <div className="h-5 mb-4" />
            )}

            <DialogHeader className="mb-1">
              <DialogTitle className="text-white text-xl font-semibold">
                Start a new campaign
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-6">
              Audora auto-assigns influencers based on your package.
            </p>

            {/* ---- STEP 1: Choose method ---- */}
            {step === "method" && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStep("selectSong")}
                  className="border border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-left transition-colors"
                >
                  <Music size={20} className="text-[#A67102] mb-3" />
                  <p className="text-white font-medium text-sm mb-1">Select from my songs</p>
                  <p className="text-gray-500 text-xs">Promote a track you've already uploaded.</p>
                </button>

                <button
                  onClick={() => {
                    // TODO: open upload flow instead
                    setStep("selectSong");
                  }}
                  className="border border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-left transition-colors"
                >
                  <Upload size={20} className="text-[#A67102] mb-3" />
                  <p className="text-white font-medium text-sm mb-1">Upload new song</p>
                  <p className="text-gray-500 text-xs">Add a new track and promote it.</p>
                </button>
              </div>
            )}

            {/* ---- STEP 2: Select a song ---- */}
            {step === "selectSong" && (
              <div className="flex flex-col gap-3 max-h-80 overflow-y-auto pr-1">
                {songs.map((song) => (
                  <button
                    key={song.id}
                    onClick={() => handleSelectSong(song)}
                    className="flex items-center gap-3 border border-gray-800 hover:border-[#A67102] rounded-xl p-3 text-left transition-colors"
                  >
                    <img
                      src={song.image}
                      alt={song.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-white text-sm font-medium">{song.title}</p>
                      <p className="text-gray-500 text-xs">
                        {song.genre} • {song.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* ---- STEP 3: Choose package ---- */}
            {step === "package" && (
              <div className="flex flex-col gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`flex items-center justify-between border rounded-xl p-4 text-left transition-colors ${
                      selectedPackage?.id === pkg.id
                        ? "border-[#A67102] bg-[#A67102]/10"
                        : "border-gray-800 hover:border-[#A67102]"
                    }`}
                  >
                    <div>
                      <p className="text-white text-sm font-medium">
                        {pkg.name}{" "}
                        <span className="text-gray-500 font-normal">{pkg.duration}</span>
                      </p>
                      <p className="text-gray-500 text-xs">Influencer ({pkg.influencers})</p>
                    </div>
                    <p className="text-white text-sm font-semibold whitespace-nowrap">
                      {pkg.price}
                    </p>
                  </button>
                ))}

                <button
                  onClick={handleLaunchCampaign}
                  disabled={!selectedPackage}
                  className="mt-2 bg-[#A67102] hover:bg-[#8a5e02] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-sm transition-colors"
                >
                  Launch Campaign
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;