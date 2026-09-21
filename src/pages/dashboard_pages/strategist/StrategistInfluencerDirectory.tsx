import React from "react";
import { strategistInfluencers } from "./mockData";

export const StrategistInfluencerDirectory: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Influencer Directory</h2>
        <p className="mt-1 text-sm text-gray-500">Creators available for campaign assignments.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-xs text-gray-400">
              <th className="px-4 py-2 font-medium">Name</th>
              <th className="px-4 py-2 font-medium">Platform</th>
              <th className="px-4 py-2 font-medium">Followers</th>
              <th className="px-4 py-2 font-medium">Niche</th>
            </tr>
          </thead>
          <tbody>
            {strategistInfluencers.map((influencer) => (
              <tr key={influencer.id} className="text-sm text-gray-200">
                <td className="rounded-l-xl bg-[#15120C] px-4 py-3 text-white">{influencer.name}</td>
                <td className="bg-[#15120C] px-4 py-3">{influencer.platform}</td>
                <td className="bg-[#15120C] px-4 py-3">{influencer.followers}</td>
                <td className="rounded-r-xl bg-[#15120C] px-4 py-3">{influencer.niche}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StrategistInfluencerDirectory;
