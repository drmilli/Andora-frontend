import React from "react";
import { CheckCircle2, ClipboardList, Inbox, XCircle } from "lucide-react";

export type StrategistMetric = {
  id: string;
  label: string;
  value: string;
  status: string;
  icon: "jobs" | "approval" | "declines" | "pending";
};

const icons = {
  jobs: ClipboardList,
  approval: CheckCircle2,
  declines: XCircle,
  pending: Inbox,
};

export const MetricCard: React.FC<{ metric: StrategistMetric }> = ({ metric }) => {
  const Icon = icons[metric.icon];

  return (
    <div className="relative rounded-2xl border border-[#A67102]/25 bg-[#0D0B07] p-5 min-h-[132px]">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#A67102]/40 bg-[#A67102]/10">
          <Icon size={16} className="text-[#A67102]" aria-hidden="true" />
        </div>
        <span className="text-xs text-gray-400">{metric.status}</span>
      </div>
      <p className="mt-6 text-2xl font-semibold text-white">{metric.value}</p>
      <p className="mt-1 text-sm text-gray-300">{metric.label}</p>
    </div>
  );
};
