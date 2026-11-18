import type { StrategistSubmission } from "@/types/strategist";

export const defaultStatusStyles: Record<StrategistSubmission["status"], string> = {
  Pending: "bg-[#A67102]/20 text-[#A67102]",
  Approved: "bg-green-500/20 text-green-500",
  Declined: "bg-red-500/20 text-red-500",
};
