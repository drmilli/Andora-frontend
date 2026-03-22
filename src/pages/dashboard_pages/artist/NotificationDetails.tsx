import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { NotificationIcon } from "../../../assets/notification";

const NotificationDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-2 px-2">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity mb-6"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        <span className="text-xs font-semibold">Back</span>
      </button>

      {/* Notification Content Container */}
      <div className="flex items-start gap-4">
        {/* User Icon - scaled down slightly */}
        <div className="shrink-0 scale-90 origin-top-left">
          <NotificationIcon />
        </div>

        {/* Text Section */}
        <div className="flex-1 min-w-0">
          {/* Title and Time Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <h2 className="text-base font-bold text-white tracking-tight">
              New message from Community
            </h2>
            <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap pt-1">
              2 hours ago
            </span>
          </div>

          {/* Body Text */}
          <div className="mb-8 max-w-3xl">
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              Olamide posted a video on the community Olamide posted a video on
              the community Olamide posted a video on the community Olamide
              posted a video on Olamide posted a video on the community Olamide
              posted a video on the community Olamide posted a video on the
              community Olamide posted a video on the community Olamide posted a
              video
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
            <button className="flex-1 py-2.5 bg-[#A67102] text-white font-bold rounded-lg hover:brightness-110 transition-all text-[10px] tracking-widest uppercase">
              Accept Request
            </button>
            <button className="flex-1 py-2.5 bg-transparent text-white font-bold rounded-lg border border-white hover:bg-white/5 transition-all text-[10px] tracking-widest uppercase">
              Decline Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
