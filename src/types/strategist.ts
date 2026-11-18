/** A campaign submission as a strategist sees it (GET /strategist/submissions) */
export interface StrategistSubmission {
  id: string;
  status: "Pending" | "Approved" | "Declined";
  campaignStatus: "PENDING_REVIEW" | "DECLINED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  tier: "STARTER" | "MEDIUM" | "PRO";
  packageName: string;
  budget: number;
  influencerCount: number;
  durationDays: number;
  genre: string | null;
  goal: string | null;
  brief: string;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: { id: string; username: string; firstname: string; surname: string } | null;
  decline: { title: string | null; category: string | null; reason: string | null } | null;
  assigned: number;
  artist: { id: string; username: string; firstname: string; surname: string; profilePicture: string | null };
  track: {
    id: string;
    title: string | null;
    fileUrl: string;
    type: string | null;
    duration: number | null;
    genre: string | null;
    description: string | null;
  } | null;
}

export type SubmissionView = "pending" | "approved" | "declined" | "all";

export interface StrategistStats {
  totals: { submissions: number; pending: number; approved: number; declined: number };
  today: { submitted: number; approved: number; declined: number };
  approvalRate: number | null;
  approvedBudget: number;
  series: Array<{ date: string; submitted: number; approved: number; declined: number }>;
}

export interface DeclinePayload {
  title: string;
  category: string;
  reason: string;
}
