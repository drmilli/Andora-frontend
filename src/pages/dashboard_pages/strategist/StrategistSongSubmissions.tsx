import React from "react";
import { SongSubmissionsTable } from "@/components/strategist/SongSubmissionsTable";
import { songSubmissions } from "./mockData";

export const StrategistSongSubmissions: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Song Submissions</h2>
        <p className="mt-1 text-sm text-gray-500">Review new drops waiting for a strategy call.</p>
      </div>
      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
        <SongSubmissionsTable rows={songSubmissions} />
      </div>
    </div>
  );
};

export default StrategistSongSubmissions;
