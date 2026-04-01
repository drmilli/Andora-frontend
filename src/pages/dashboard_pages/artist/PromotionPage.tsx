
import React from "react";
import {
  Video,
  Music,
  User,
  MapPin,
  Radio,
  Clock,
  Trash2,
  Search,
} from "lucide-react";


export const PromotionPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<
    "audio" | "video" | "influencer"
  >("audio");
  const [selections, setSelections] = React.useState<number[]>([1]);
  const [selectedSocials, setSelectedSocials] = React.useState<string[]>([]);

  const addSelection = () => {
    setSelections([...selections, selections.length + 1]);
  };

  const removeSelection = (id: number) => {
    setSelections(selections.filter((s) => s !== id));
  };

  const toggleSocial = (social: string) => {
    if (selectedSocials.includes(social)) {
      setSelectedSocials(selectedSocials.filter((s) => s !== social));
    } else {
      setSelectedSocials([...selectedSocials, social]);
    }
  };

  const socialPlatforms = [
    { id: "instagram", icon: "instagram", color: "#A67102" },
    { id: "youtube", icon: "youtube", color: "#3a3a3a" },
    { id: "facebook", icon: "facebook", color: "#3a3a3a" },
    { id: "tiktok", icon: "tiktok", color: "#3a3a3a" },
    { id: "snapchat", icon: "snapchat", color: "#3a3a3a" },
    { id: "twitter", icon: "twitter", color: "#3a3a3a" },
  ];

  const influencers = [
    {
      id: 1,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=1",
    },
    {
      id: 2,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=2",
    },
    {
      id: 3,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=3",
    },
    {
      id: 4,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=4",
    },
    {
      id: 5,
      name: "Peter Nneamaka C.",
      followers: "346K",
      price: "₦20,000",
      avatar: "https://i.pravatar.cc/60?img=5",
    },
  ];

  const tabs = [
    { id: "audio", label: "Audio" },
    { id: "video", label: "Video" },
    { id: "influencer", label: "Influencer" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex  bg-transparent  lg:gap-25 gap-8 border-b border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "audio" | "video" | "influencer")}
              className={`
        w-[100px] h-[100px]
        md:w-[50px] md:h-[50px]
        lg:w-[250px] lg:h-[52px]
       rounded-none
        bg-transparent
          text-white
           data-[state=active]:bg-transparent
        data-[state=active]:border-b-amber-500 " ${activeTab === tab.id
                  ? "text-white border-b-2 border-[#A67102]"
                  : "text-gray-400"
                }`}
            >
              {tab.label}
            </button>
          ))}


        </div>

        {/* Description Text */}
        <p className="text-gray-400 text-sm mb-6">
          Duration for weekly is the number of times the music promotion would
          run for based on selected presenter (working hours), and monthly has
          4weeks in it and can only run 4times for the 4 weeks in a month.
        </p>

        {/* Audio Tab */}
        {activeTab === "audio" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Radio Stations</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Music Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Music</label>
              <div className="relative">
                <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                  <option>Select music audio</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell us what you want..."
                rows={4}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102] resize-none"
              />
            </div>

            {/* Selections */}
            {selections.map((selection) => (
              <div key={selection} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    Selection {selection}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">₦30,000</p>
                    {selections.length > 1 && (
                      <button
                        onClick={() => removeSelection(selection)}
                        className="p-2 bg-[#A67102] rounded-lg hover:bg-[#8a5e02] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Location */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select loca...</option>
                      </select>
                    </div>
                  </div>

                  {/* Radio */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Radio
                    </label>
                    <div className="relative">
                      <Radio className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select Radio</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Presenter */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Presenter
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                      <option>Select Presenter</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Tab */}
        {activeTab === "video" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Television Stations</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Video Selection */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">Video</label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                  <option>Select music video</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Description
              </label>
              <textarea
                placeholder="Tell us what you want..."
                rows={4}
                className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102] resize-none"
              />
            </div>

            {/* Selections */}
            {selections.map((selection) => (
              <div key={selection} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">
                    Selection {selection}
                  </h3>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold">₦30,000</p>
                    {selections.length > 1 && (
                      <button
                        onClick={() => removeSelection(selection)}
                        className="p-2 bg-[#A67102] rounded-lg hover:bg-[#8a5e02] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Television Channel */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Television Channel
                    </label>
                    <div className="relative">
                      <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select tv station</option>
                      </select>
                    </div>
                  </div>

                  {/* Presenter */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Presenter
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>Select Presenter</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Duration (weekly) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Duration (weekly)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="E.g. X2"
                        className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                      />
                    </div>
                  </div>

                  {/* Duration (monthly) */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Duration (monthly)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Max X4"
                        className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={addSelection}
                className="px-6 py-2 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
              >
                Add
              </button>
            </div>

            {/* Proceed to Payment */}
            <button className="w-full px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium text-lg">
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Influencer Tab */}
        {activeTab === "influencer" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Influencer Promotion</h2>
              <p className="text-2xl font-semibold">₦630,000</p>
            </div>

            {/* Video and Music Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Video
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                    <option>Select music video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Music
                </label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full bg-transparent border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                    <option>Select music audio</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 mb-6">
              {socialPlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => toggleSocial(platform.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${selectedSocials.includes(platform.id) ||
                      platform.id === "instagram"
                      ? "bg-[#A67102]"
                      : "bg-[#3a3a3a] hover:bg-[#4a4a4a]"
                    }`}
                >
                  {platform.icon === "instagram" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {platform.icon === "youtube" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {platform.icon === "facebook" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {platform.icon === "tiktok" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  )}
                  {platform.icon === "snapchat" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.12-.069-.179.031-.075.044-.149.074-.195.12-.104.374-.149.404-.149 3.136-.599 4.732-3.92 4.777-3.99.179-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
                    </svg>
                  )}
                  {platform.icon === "twitter" && (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A67102]" />
              <input
                type="text"
                placeholder="Search promoter here"
                className="w-full bg-[#2a2a2a] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#A67102] focus:outline-none focus:border-[#A67102]"
              />
            </div>

            {/* Influencer List Header */}
            <div className="grid grid-cols-3 gap-4 mb-4 px-4">
              <p className="text-gray-400 text-sm font-medium">Influencer</p>
              <p className="text-gray-400 text-sm font-medium text-center">
                Followers
              </p>
              <p className="text-gray-400 text-sm font-medium text-right">
                Price
              </p>
            </div>

            {/* Influencer List */}
            <div className="space-y-3">
              {influencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className="grid grid-cols-3 gap-4 items-center bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 hover:border-[#A67102] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-white font-medium">{influencer.name}</p>
                  </div>
                  <p className="text-white text-center">
                    {influencer.followers}
                  </p>
                  <p className="text-white font-semibold text-right">
                    {influencer.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};