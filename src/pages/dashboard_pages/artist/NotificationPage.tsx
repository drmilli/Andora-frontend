import { Link } from "react-router-dom";
import { NotificationIcon } from "../../../assets/notification";


export const NotificationPage: React.FC = () => {
  const notifications = [
    {
      id: "1",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "3",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "4",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "5",
      title: "New message from Community",
      body: "Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on t...",
      time: "2 hours ago",
      unread: false,
    },
  ];

  return (
    <div className="w-full ">
      <div className=" mx-auto">
        <div className="space-y-1">
          {notifications.map((n) => (
            <Link
              key={n.id}
              to={`/dashboard/notifications/${n.id}`}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow block hover:bg-white/5 ${
                n.unread
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
                      {n.title}
                    </h3>
                    <div className="text-sm text-gray-400 whitespace-nowrap flex-shrink-0">
                      {n.time}
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {n.body}
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