import React from "react";
import { ChartLineLinear } from "@/components/charts/ChartLineLinear";
import { MetricCard } from "@/components/strategist/MetricCard";
import { strategistMetrics } from "./mockData";

export const StrategistReports: React.FC = () => {
  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">Reports</h2>
        <p className="mt-1 text-sm text-gray-500">Reach and campaign performance at a glance.</p>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {strategistMetrics.filter((metric) => metric.span !== "full").slice(0, 3).map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="rounded-2xl border border-gray-900 bg-[#0D0B07] p-4 sm:p-6">
        <ChartLineLinear />
      </div>
    </div>
  );
};

export default StrategistReports;
