import { NotificationIcon } from "@/assets/notification";
import React from "react";
import { Link } from "react-router-dom";

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
function StationNotifications() {
  return (
    <div className="w-full  mt-5">
      <div className=" mx-auto">
        <div className="space-y-1">
          {notifications.map((n) => (
            <Link to={`${n.id}`}>
                      <div
              key={n.id}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow ${
                n.unread
                  ? "bg-[#0D0B07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                  : "bg-transparent"
              }`}
            >
              <div className="flex gap-4 w-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <NotificationIcon />
                </div>

                {/* Text Section */}
                <div className="flex flex-col w-full">
                  {/* Title + Time */}
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {n.title}
                    </h3>

                    <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                      {n.time}
                    </div>
                  </div>

                  {/* Body */}
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed break-words">
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
}

export default StationNotifications;
