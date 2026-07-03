import {  Instagram, Twitter, Music2 } from "lucide-react";
import * as React from "react";

type CompletedCampaign = {
  title: string;
  type: string;
  date: string;
  image: string;
};

const completedCampaigns: CompletedCampaign[] = [
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=30" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=31" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=32" },
  { title: "Smoke", type: "Influencer", date: "05-26", image: "https://i.pravatar.cc/200?img=33" },
];

export const ProfilePage: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">


      {/* Profile Info Card */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-6 mb-6">
        <div className="flex items-start gap-5">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Abbey Lincoln"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#A67102]"
          />
          <div className="flex-1">
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Artist</p>
            <h2 className="text-white text-xl font-semibold mb-1">Abbey Lincoln</h2>
            <p className="text-gray-500 text-sm mb-2">@abbeylin</p>
            <p className="text-gray-400 text-sm mb-3 max-w-2xl">
              Song Composer and writer based in Abuja. Crafting cinematic late
              night-night sounds since 2019.
            </p>
            <div className="flex items-center gap-5 text-gray-400 text-xs">
              <span className="flex items-center gap-1.5">
                <Instagram size={14} /> @abbey-lincoln
              </span>
              <span className="flex items-center gap-1.5">
                <Twitter size={14} /> @abbey-lincoln
              </span>
              <span className="flex items-center gap-1.5">
                <Music2 size={14} /> @abbey-lincoln
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-5">
          <p className="text-gray-500 text-xs mb-2">Total Reach</p>
          <p className="text-white text-2xl font-semibold">5.4 M</p>
        </div>
        <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-5">
          <p className="text-gray-500 text-xs mb-2">Total campaigns</p>
          <p className="text-white text-2xl font-semibold">8</p>
        </div>
        <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-5">
          <p className="text-gray-500 text-xs mb-2">Active</p>
          <p className="text-white text-2xl font-semibold">6</p>
        </div>
        <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-5">
          <p className="text-gray-500 text-xs mb-2">Completed</p>
          <p className="text-white text-2xl font-semibold">3</p>
        </div>
      </div>

      {/* Completed Campaigns */}
      <div>
        <h3 className="text-white font-semibold mb-4">Completed Campaigns</h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {completedCampaigns.map((c, i) => (
            <div key={i} className="rounded-lg overflow-hidden  ">
              <img src={c.image} alt={c.title} className="w-full h-50 object-cover" />
              <div className="p-3 space-y-2">
                <p className="text-white font-medium text-sm">{c.title}</p>
                <p className="text-gray-500 text-xs uppercase tracking-wide">
                  {c.type} • {c.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;