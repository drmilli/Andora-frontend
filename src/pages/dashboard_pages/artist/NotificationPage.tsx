import { Link } from "react-router-dom";
import { NotificationIcon } from "../../../assets/notification";
import { useNotifications } from "../../../hooks/artist/useNotifications";



export const NotificationPage: React.FC = () => {
  const { notifications, loading, error } = useNotifications();


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#A67102]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-500 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#A67102] text-white rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
        <NotificationIcon />
        <p className="mt-4 text-sm font-medium">No notifications yet</p>
      </div>
    );
  }
 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="w-full ">
      <div className=" mx-auto">
        <div className="space-y-1">
          {notifications.map((n) => (
            <Link
              key={n.id}
              to={`/dashboard/notifications/${n.id}`}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow block hover:bg-white/5 ${
                n.isRead
                  ? "bg-[#0D0B07]  shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <NotificationIcon />
                </div>

                <div className="flex-1 min-w-0">
                  <div className=" flex justify-between items-start gap-4">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {n.type}
                    </h3>
                    <div className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">
                      {formatDate(n.createdAt)}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {n.message}
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
};