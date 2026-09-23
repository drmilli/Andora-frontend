import React from "react";
import {
  Wrench,
  Radio,
  MessageSquare,
  Inbox,
  ClipboardList,
} from "lucide-react";
import type { StrategistMetric } from "@/pages/dashboard_pages/strategist/mockData";

const icons = {
  jobs: ClipboardList,
  approval: Wrench,
  declines: Wrench,
  active: Radio,
  pending: MessageSquare,
  review: Inbox,
};

export const MetricCard: React.FC<{ metric: StrategistMetric }> = ({ metric }) => {
  const Icon = icons[metric.icon];

  return (
    <div className="relative rounded-2xl border border-[#A67102]/25 bg-[#0D0B07] p-5 min-h-[132px]">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#A67102]/40 bg-[#A67102]/10">
          <Icon size={16} className="text-[#A67102]" />
        </div>
        <span className="text-xs text-gray-400">{metric.status}</span>
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-white">{metric.value}</h2>
      <p className="mt-1 text-sm text-gray-300">{metric.label}</p>
    </div>
  );
};
