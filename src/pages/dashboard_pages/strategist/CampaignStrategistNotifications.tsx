import React from "react";
import { NotificationIcon } from "@/assets/notification";
import { Link } from "react-router-dom";

const notifications = [
  {
    id: "1",
    title: "New song submission",
    body: "Runty submitted Midnight Protocol for a strategy call.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    title: "Influencer accepted invite",
    body: "Samuel Banks accepted the Golden Hour Seeding campaign.",
    time: "5 hours ago",
    unread: false,
  },
  {
    id: "3",
    title: "Campaign awaiting review",
    body: "Soft Light Stories is in the review queue.",
    time: "Yesterday",
    unread: false,
  },
];

export const StrategistNotifications: React.FC = () => {
  return (
    <div className="mt-5 w-full pb-28 md:pb-0">
      <div className="space-y-1">
        {notifications.map((n) => (
          <Link
            key={n.id}
            to={`/dashboard/notifications/${n.id}`}
            className={`flex items-start justify-between gap-4 rounded-xl p-4 transition-shadow ${
              n.unread
                ? "bg-[#0D0B07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                : "bg-transparent"
            }`}
          >
            <div className="flex w-full gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                <NotificationIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white">{n.title}</h3>
                  <span className="shrink-0 text-sm text-gray-400">{n.time}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-gray-400">{n.body}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StrategistNotifications;
