import { Frown } from "lucide-react";
import * as React from "react";

type PackageOption = {
  id: string;
  name: string;
  price: string;
  influencers: number;
  duration: string;
};

type CampaignRow = {
  id: string;
  track: string;
  status: "Active" | "Completed" | "Not Active";
  campaigns: number;
  uploaded: string;
  image: string;
};

const packages: PackageOption[] = [
  { id: "starter", name: "Starter Push", price: "₦ 32,000.00", influencers: 2, duration: "14 days" },
  { id: "medium", name: "Medium Push", price: "₦ 50,000.00", influencers: 4, duration: "30 days" },
  { id: "pro", name: "Pro Push", price: "₦ 100,000.00", influencers: 6, duration: "60 days" },
];

// Empty for now — swap with real data once campaigns exist
const campaignRows: CampaignRow[] = [];

const statusStyles: Record<CampaignRow["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102]",
  Completed: "bg-gray-700/40 text-gray-300",
  "Not Active": "bg-gray-800 text-gray-500",
};

export const Campaign: React.FC = () => {
  function handleStartCampaign() {
    // TODO: open the Start Campaign modal flow here
    console.log("Start campaign clicked");
  }

  return (
    <div className="w-full pb-28 md:pb-0">


      {/* Start a new campaign banner */}
      <div className=" rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-white text-lg font-semibold mb-1">Start a new campaign</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wide">
              Audora auto-assigns influencers based on your package.
            </p>
          </div>
 
        </div>

        {/* Package summary cards */}
        <div className="  grid grid-cols-1 sm:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#0D0B07] border border-gray-800 rounded-xl p-4 flex justify-between items-start"
            >
              <div>
                <p className="text-white text-sm font-medium">{pkg.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Influencer ({pkg.influencers}) • {pkg.duration}
                </p>
              </div>
              <p className="text-white text-sm font-semibold whitespace-nowrap">
                {pkg.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign table / empty state */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 overflow-hidden">
        {campaignRows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 rounded-full border-2 border-gray-700 flex items-center justify-center mb-5">
              <Frown size={28} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-sm mb-5">
              Oops!! Nothing to see here, Click the "Start Campaign" button to start
            </p>
            <button
              onClick={handleStartCampaign}
              className="border border-[#A67102] text-[#A67102] hover:bg-[#A67102]/10 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              Start Campaign
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                  <th className="px-6 py-4 font-medium">Track</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Campaigns</th>
                  <th className="px-6 py-4 font-medium">Uploaded</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaignRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.image}
                          alt={row.track}
                          className="w-9 h-9 rounded-lg object-cover"
                        />
                        <span className="text-white font-medium">{row.track}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-300">{row.campaigns}</td>
                    <td className="px-6 py-3 text-gray-300">{row.uploaded}</td>
                    <td className="px-6 py-3 text-right text-gray-400">•••</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaign;