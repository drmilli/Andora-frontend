import React from "react";
import { strategistCampaigns } from "./mockData";

const statusClass: Record<string, string> = {
  Live: "text-emerald-400",
  "In progress": "text-[#A67102]",
  Queue: "text-gray-400",
};

export const StrategistCampaigns: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Campaign</h2>
        <p className="mt-1 text-sm text-gray-500">Track live, in-progress, and queued campaigns.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {strategistCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="rounded-2xl border border-[#A67102]/25 bg-[#0D0B07] p-5"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-white">{campaign.title}</h3>
              <span className={`text-xs ${statusClass[campaign.status] ?? "text-gray-400"}`}>
                {campaign.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-400">Artist: {campaign.artist}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-300">
              <span>{campaign.influencers} influencers</span>
              <span>{campaign.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategistCampaigns;
