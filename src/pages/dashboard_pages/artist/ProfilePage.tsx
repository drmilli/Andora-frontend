import { Instagram, Twitter, Music2, Globe } from "lucide-react";
import * as React from "react";
import { useContext } from "react";
import { AppContext } from "@/Context/AppContext";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { useEffect, useState } from "react";
import { fetchSentPromotionRequests } from "@/services/artist/promotions";
import type { GetInfluencerRequest } from "@/types/influencer/requests";


export const ProfilePage: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const [completedCampaigns, setCompletedCampaigns] = useState<GetInfluencerRequest[]>([]);

  useEffect(() => {
    fetchSentPromotionRequests(1, 8, "COMPLETED")
      .then((res) => setCompletedCampaigns(res.data))
      .catch(() => setCompletedCampaigns([]));
  }, []);

  const fullName = user
    ? `${user.firstname || ""} ${user.surname || ""}`.trim()
    : "User";
  const roleDisplay = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Artist";
  const profilePic = user?.profilePicture
    ? `${user.profilePicture}?t=${user.updatedAt || Date.now()}`
    : "https://i.pravatar.cc/150?img=12";

  return (
    <div className="w-full pb-28 md:pb-0">
      {/* Profile Info Card */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 p-6 mb-6">
        <div className="flex items-start gap-5">
          <img
            key={user?.updatedAt || "0"}
            src={profilePic}
            alt={fullName}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#A67102]"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">
                  {roleDisplay}
                </p>
                <h2 className="text-white text-xl font-semibold mb-1">
                  {fullName}
                </h2>
                <p className="text-gray-500 text-sm mb-2">@{user?.username}</p>
              </div>
              <EditProfileDialog />
            </div>
            {user?.bio && (
              <p className="text-gray-400 text-sm mb-3 max-w-2xl">{user.bio}</p>
            )}
            <div className="flex items-center gap-5 text-gray-400 text-xs flex-wrap">
              {user?.instagram && (
                <span className="flex items-center gap-1.5">
                  <Instagram size={14} /> {user.instagram}
                </span>
              )}
              {user?.twitter && (
                <span className="flex items-center gap-1.5">
                  <Twitter size={14} /> {user.twitter}
                </span>
              )}
              {user?.tiktok && (
                <span className="flex items-center gap-1.5">
                  <Music2 size={14} /> {user.tiktok}
                </span>
              )}
              {user?.website && (
                <span className="flex items-center gap-1.5">
                  <Globe size={14} /> {user.website}
                </span>
              )}
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
          {completedCampaigns.length === 0 ? (
            <p className="text-gray-500 text-sm">No completed campaigns yet.</p>
          ) : (
            completedCampaigns.map((c) => (
              <div key={c.id} className="rounded-lg overflow-hidden">
                <img
                  src={
                    c.influencer.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      c.influencer.username
                    )}&background=A67102&color=fff&size=200`
                  }
                  alt={c.media?.title ?? c.influencer.username}
                  className="w-full h-50 object-cover"
                />
                <div className="p-3 space-y-2">
                  <p className="text-white font-medium text-sm">
                    {c.media?.title ?? "Promotion"}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">
                    {c.platform} &bull;{" "}
                    {new Date(c.completedAt ?? c.createdAt).toLocaleDateString("en-GB", {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;