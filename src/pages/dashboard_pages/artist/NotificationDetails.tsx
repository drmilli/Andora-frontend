import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Loader2 } from "lucide-react";
import { NotificationIcon } from "../../../assets/notification";
import api from "../../../lib/axios";
import type { Notification } from "../../../types/artist/notificationtypes";

const NotificationDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/notifications/${id}`);
        setNotification(res.data);
        // Mark as read
        await api.put(`/notifications/${id}/read`);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load notification");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={24} className="animate-spin text-[#A67102]" />
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 text-sm">{error || "Notification not found"}</p>
        <button onClick={() => navigate(-1)} className="text-[#f5b640] text-sm underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pt-2 px-2">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-white hover:opacity-80 transition-opacity mb-6"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
        <span className="text-xs font-semibold">Back</span>
      </button>

      <div className="flex items-start gap-4">
        <div className="shrink-0 scale-90 origin-top-left">
          <NotificationIcon />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
            <h2 className="text-base font-bold text-white tracking-tight capitalize">
              {notification.type}
            </h2>
            <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap pt-1">
              {formatDate(notification.createdAt)}
            </span>
          </div>

          <div className="mb-8 max-w-3xl">
            <p className="text-sm text-gray-400 leading-relaxed font-normal">
              {notification.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
