import { NotificationIcon } from "@/assets/notification";
import React from "react";

function StationNotificationsDetail() {
  return (
      <div className="w-full  mt-5">
          <div className=" mx-auto">
            <div className="space-y-1">
          
                <div
              
                  className={`flex items-start justify-between gap-4 p-4 rounded-xl transition-shadow bg-[#0D0B07] shadow-[0_8px_30px_rgba(0,0,0,0.6)]`}
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
                         New message from Community
                        </h3>
    
                        <div className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
                         2 hours ago
                        </div>
                      </div>
    
                      {/* Body */}
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed break-words">
                        Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video on the community Olamide posted a video
                      </p>

                      {/* 2 buttons accept and decline */}
                      <div className="flex gap-4 mt-4">
                        <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-green-700 transition">
                          Accept Request
                        </button>
                        <button className="px-4 py-2 bg-[#3A3A3A] text-white rounded-lg hover:bg-red-700 transition">
                          Decline Request
                        </button>
              </div>
                    </div>
                  </div>
                </div>
           
            </div>
          </div>
        </div>
  )
}

export default StationNotificationsDetail