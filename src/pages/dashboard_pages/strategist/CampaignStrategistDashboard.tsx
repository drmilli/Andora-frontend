import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/Context/AppContext";
import { MetricCard } from "@/components/strategist/MetricCard";
import { metricsFromStats } from "@/components/strategist/metrics";
import { SongSubmissionsTable } from "@/components/strategist/SongSubmissionsTable";
import { fetchStrategistStats, fetchSubmissions } from "@/services/strategist";
import type { StrategistStats, StrategistSubmission } from "@/types/strategist";
import { apiErrorMessage } from "@/lib/influencer";

export const CampaignStrategistDashboard: React.FC = () => {
  const context = useContext(AppContext);
  const user = context?.user;
  const greetingName = user?.firstname || user?.username || "there";
  const navigate = useNavigate();

  const [stats, setStats] = useState<StrategistStats | null>(null);
  const [queue, setQueue] = useState<StrategistSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchStrategistStats(), fetchSubmissions({ view: "pending", limit: 5 })])
      .then(([s, q]) => {
        setStats(s);
        setQueue(q.data);
      })
      .catch((err) => setError(apiErrorMessage(err, "Could not load your dashboard")));
  }, []);

  return (
    <div className="w-full pb-28 md:pb-0">
      <p className="mb-6 text-lg text-gray-300">Hello, {greetingName}</p>
      {error && <p className="mb-4 text-sm text-red-400" role="alert">{error}</p>}

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricsFromStats(stats).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Waiting for review</h3>
            <p className="mt-1 text-sm text-gray-500">Oldest first. The artist's money is held until you decide.</p>
          </div>
          <Link
            to="/dashboard/song-submissions"
            className="shrink-0 rounded-lg border border-[#A67102] px-4 py-1.5 text-xs text-[#A67102] hover:bg-[#A67102] hover:text-white"
          >
            View all
          </Link>
        </div>
        {queue === null && !error ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : (
          <SongSubmissionsTable
            rows={queue ?? []}
            emptyText="Nothing waiting. New submissions will show up here."
            onReview={(id) => navigate("/dashboard/song-submissions", { state: { reviewId: id } })}
          />
        )}
      </div>
    </div>
  );
};

export default CampaignStrategistDashboard;
