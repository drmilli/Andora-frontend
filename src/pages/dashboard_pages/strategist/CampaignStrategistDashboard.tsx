import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";
import { MetricCard } from "@/components/strategist/MetricCard";
import { SongSubmissionsTable } from "@/components/strategist/SongSubmissionsTable";
import { songSubmissions, strategistMetrics } from "./mockData";

export const CampaignStrategistDashboard: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const greetingName = user?.firstname || user?.username || "Abbey";
  const navigate = useNavigate();

  return (
    <div className="w-full pb-28 md:pb-0">
      <p className="mb-6 text-lg text-gray-300">Hello, {greetingName}</p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {strategistMetrics.slice(0, 3).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Jobs</h3>
            <p className="mt-1 text-sm text-gray-500">New drops waiting for a strategy call.</p>
          </div>
          <Link
            to="/dashboard/song-submissions"
            className="shrink-0 rounded-lg border border-[#A67102] px-4 py-1.5 text-xs text-[#A67102] hover:bg-[#A67102] hover:text-white"
          >
            View all
          </Link>
        </div>
        <SongSubmissionsTable
          rows={songSubmissions.slice(0, 2)}
          onReview={(id) =>
            navigate("/dashboard/song-submissions", { state: { reviewId: id } })
          }
        />
      </div>
    </div>
  );
};

export default CampaignStrategistDashboard;
