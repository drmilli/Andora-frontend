import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationIcon } from "@/assets/notification";
import { getNotifications } from "@/services/notifications";
import type { Notifications } from "@/types/artist/notificationtypes";
import { apiErrorMessage, formatRelativeTime } from "@/lib/influencer";

export const StrategistNotifications: React.FC = () => {
  const [items, setItems] = useState<Notifications | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNotifications()
      .then(setItems)
      .catch((err) => setError(apiErrorMessage(err, "Could not load notifications")));
  }, []);

  return (
    <div className="mt-5 w-full pb-28 md:pb-0">
      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
      {items === null && !error && <p className="text-sm text-gray-400">Loading...</p>}
      {items?.length === 0 && <p className="text-sm text-gray-400">No notifications yet. New submissions will show up here.</p>}
      <div className="space-y-1">
        {items?.map((n) => (
          <Link
            key={n.id}
            to={`/dashboard/notifications/${n.id}`}
            className={`flex items-start justify-between gap-4 rounded-xl p-4 transition-shadow ${
              !n.isRead ? "bg-[#0D0B07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]" : "bg-transparent"
            }`}
          >
            <div className="flex w-full gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5">
                <NotificationIcon />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`text-sm ${!n.isRead ? "font-semibold text-white" : "text-gray-300"}`}>
                    {n.message.includes("submission") ? "New song submission" : "Notification"}
                  </h3>
                  <span className="shrink-0 text-sm text-gray-400">{formatRelativeTime(n.createdAt)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-400">{n.message}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StrategistNotifications;
