import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { NotificationIcon } from "@/assets/notification";
import type { Notification } from "@/types/artist/notificationtypes";
import {
  getNotificationById,
  markNotificationAsRead,
} from "@/services/notifications";
import { apiErrorMessage, formatRelativeTime } from "@/lib/influencer";

function InfluencerNotificationsDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNotificationById(id);
        setNotification(data);
        // Opening it is what marks it read; a failure here shouldn't block the view
        if (!data.isRead) {
          markNotificationAsRead(id).catch(() => {});
        }
      } catch (err) {
        setError(apiErrorMessage(err, "Could not load this notification"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className="w-full pt-2 px-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity mb-6"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        <span className="text-xs font-semibold">Back</span>
      </button>

      {loading ? (
        <p className="text-white">Loading...</p>
      ) : error ? (
        <p className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      ) : !notification ? (
        <p className="text-gray-400">Notification not found.</p>
      ) : (
        <div className="flex items-start gap-4">
          <div className="shrink-0 scale-90 origin-top-left">
            <NotificationIcon />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                {notification.message}
              </h2>
              <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap pt-1">
                {formatRelativeTime(notification.createdAt)}
              </span>
            </div>

            <div className="mb-8 max-w-3xl">
              <p className="text-sm text-gray-400 leading-relaxed font-normal capitalize">
                {notification.type}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfluencerNotificationsDetail;
