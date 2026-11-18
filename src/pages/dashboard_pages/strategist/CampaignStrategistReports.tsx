import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricCard } from "@/components/strategist/MetricCard";
import { metricsFromStats } from "@/components/strategist/metrics";
import { fetchStrategistStats } from "@/services/strategist";
import type { StrategistStats } from "@/types/strategist";
import { apiErrorMessage, formatNaira } from "@/lib/influencer";

const RANGES = [7, 14, 30, 90] as const;

// "2026-11-18" -> "18 Nov"
const shortDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

export const CampaignStrategistReports: React.FC = () => {
  const [days, setDays] = useState<(typeof RANGES)[number]>(14);
  const [stats, setStats] = useState<StrategistStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStrategistStats(days)
      .then((s) => { setStats(s); setError(null); })
      .catch((err) => setError(apiErrorMessage(err, "Could not load reports")));
  }, [days]);

  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Reports</h2>
          <p className="mt-1 text-sm text-gray-500">Submissions and review decisions over time.</p>
        </div>
        <div className="flex gap-2" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              aria-pressed={days === r}
              className={`rounded-full px-3 py-1.5 text-xs ${days === r ? "bg-[#A67102] text-white" : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"}`}
            >
              {r}d
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-400" role="alert">{error}</p>}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metricsFromStats(stats).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-5">
          <p className="text-xs text-gray-500">Approval rate</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats?.approvalRate == null ? "—" : `${stats.approvalRate}%`}</p>
          <p className="mt-1 text-xs text-gray-500">Of all reviewed submissions</p>
        </div>
        <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-5">
          <p className="text-xs text-gray-500">Campaign budget approved</p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats ? formatNaira(stats.approvedBudget) : "—"}</p>
          <p className="mt-1 text-xs text-gray-500">Sent out to influencers after approval</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
        <h3 className="mb-4 text-sm font-medium text-white">Last {days} days</h3>
        <div className="h-72">
          {stats && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#262626" vertical={false} />
                <XAxis dataKey="date" tickFormatter={shortDate} stroke="#737373" fontSize={11} tickLine={false} axisLine={false} minTickGap={16} />
                <YAxis allowDecimals={false} stroke="#737373" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  labelFormatter={(l) => shortDate(String(l))}
                  contentStyle={{ background: "#1a1a1a", border: "1px solid #333", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="submitted" name="Submitted" stroke="#f5b640" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="approved" name="Approved" stroke="#22c55e" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="declined" name="Declined" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignStrategistReports;
