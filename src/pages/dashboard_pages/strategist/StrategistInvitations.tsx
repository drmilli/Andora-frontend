import React from "react";
import { strategistInvitations } from "./mockData";

const statusClass: Record<string, string> = {
  Pending: "text-[#A67102]",
  Accepted: "text-emerald-400",
  Declined: "text-red-400",
};

export const StrategistInvitations: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Invitations</h2>
        <p className="mt-1 text-sm text-gray-500">Influencer responses to campaign invitations.</p>
      </div>
      <div className="space-y-3">
        {strategistInvitations.map((invite) => (
          <div
            key={invite.id}
            className="flex items-center justify-between rounded-2xl border border-gray-900 bg-[#0D0B07] px-5 py-4"
          >
            <div>
              <p className="font-medium text-white">{invite.influencer}</p>
              <p className="mt-1 text-sm text-gray-400">{invite.campaign}</p>
            </div>
            <span className={`text-sm ${statusClass[invite.status] ?? "text-gray-400"}`}>
              {invite.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategistInvitations;
