import type { StrategistStats } from "@/types/strategist";
import type { StrategistMetric } from "./MetricCard";

/** The stat cards shared by the strategist dashboard and reports. */
export const metricsFromStats = (stats: StrategistStats | null): StrategistMetric[] => {
  const n = (v?: number) => (stats ? String(v ?? 0) : "—");
  return [
    { id: "pending", label: "Waiting for review", value: n(stats?.totals.pending), status: `${stats?.today.submitted ?? 0} new today`, icon: "pending" },
    { id: "approved", label: "Total approved", value: n(stats?.totals.approved), status: `${stats?.today.approved ?? 0} today`, icon: "approval" },
    { id: "declined", label: "Total declined", value: n(stats?.totals.declined), status: `${stats?.today.declined ?? 0} today`, icon: "declines" },
  ];
};
