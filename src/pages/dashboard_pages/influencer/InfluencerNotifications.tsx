import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotificationIcon } from "@/assets/notification";
import type { Notification } from "@/types/artist/notificationtypes";
import { getNotifications } from "@/services/notifications";
import { apiErrorMessage, formatRelativeTime } from "@/lib/influencer";

function InfluencerNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotifications();
        setNotifications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(apiErrorMessage(err, "Could not load notifications"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <p className="text-white mt-5">Loading notifications...</p>;
  }

  if (error) {
    return (
      <p className="text-red-400 mt-5 text-sm" role="alert">
        {error}
      </p>
    );
  }

  if (notifications.length === 0) {
    return <p className="text-gray-400 mt-5">You have no notifications yet.</p>;
  }

  return (
    <div className="w-full mt-5">
      <div className="mx-auto">
        <div className="space-y-1">
          {notifications.map((n) => (
            <Link key={n.id} to={`${n.id}`}>
              <div
                className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow ${
                  !n.isRead
                    ? "bg-[#0D0B07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                    : "bg-transparent"
                }`}
              >
                <div className="flex gap-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <NotificationIcon />
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <h3 className="text-white font-semibold text-sm leading-tight">
                        {n.message}
                      </h3>

                      <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                        {formatRelativeTime(n.createdAt)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mt-1 leading-relaxed break-words capitalize">
                      {n.type}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfluencerNotifications;
