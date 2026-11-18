import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { SongSubmissionReview } from "@/components/strategist/SongSubmissionReview";
import { SongSubmissionsTable } from "@/components/strategist/SongSubmissionsTable";
import {
  approveSubmission,
  declineSubmission,
  fetchDeclineCategories,
  fetchSubmission,
  fetchSubmissions,
} from "@/services/strategist";
import type { StrategistSubmission, SubmissionView } from "@/types/strategist";
import { GENRES } from "@/lib/genres";
import { apiErrorMessage } from "@/lib/influencer";

const filterTriggerClass =
  "h-10 min-w-[140px] rounded-lg border border-gray-800 bg-[#0D0B07] px-3 text-sm text-gray-200 shadow-none hover:border-[#A67102] focus-visible:border-[#A67102] focus-visible:ring-0 dark:bg-[#0D0B07] dark:hover:bg-[#0D0B07]";
const filterContentClass = "border-gray-800 bg-[#1A1A1A] text-gray-200";

const VIEWS: Array<{ id: SubmissionView; label: string }> = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "declined", label: "Declined" },
  { id: "all", label: "All" },
];

const TIERS = [
  { id: "STARTER", label: "Starter Push" },
  { id: "MEDIUM", label: "Medium Push" },
  { id: "PRO", label: "Pro Push" },
];

const SubmissionsView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state as { reviewId?: string; search?: string; view?: SubmissionView } | null;
  const [view, setView] = useState<SubmissionView>(navState?.view ?? "pending");
  const [rows, setRows] = useState<StrategistSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const [reviewId, setReviewId] = useState<string | null>(navState?.reviewId ?? null);
  const [reviewing, setReviewing] = useState<StrategistSubmission | null>(null);

  // The header search sends people here with a query already filled in
  const [input, setInput] = useState(navState?.search ?? "");
  const [query, setQuery] = useState(navState?.search ?? "");
  const [genre, setGenre] = useState("all");
  const [tier, setTier] = useState("all");

  // Debounce typing in the search box
  useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    fetchDeclineCategories().then(setCategories).catch(() => setCategories(["Other"]));
  }, []);

  const load = useCallback(() => {
    fetchSubmissions({
      view,
      search: query || undefined,
      genre: genre === "all" ? undefined : genre,
      tier: tier === "all" ? undefined : tier,
    })
      .then((r) => {
        setRows(r.data);
        setError(null);
      })
      .catch((err) => setError(apiErrorMessage(err, "Could not load submissions")));
  }, [view, query, genre, tier]);

  useEffect(load, [load]);

  // Open the review screen: always fetch fresh, it may have changed
  useEffect(() => {
    if (!reviewId) return;
    let cancelled = false;
    fetchSubmission(reviewId)
      .then((s) => !cancelled && setReviewing(s))
      .catch((err) => {
        if (cancelled) return;
        setError(apiErrorMessage(err, "Could not open that submission"));
        setReviewId(null);
      });
    return () => {
      cancelled = true;
    };
  }, [reviewId]);

  const closeReview = () => {
    setReviewId(null);
    setReviewing(null);
    // Drop the dashboard's reviewId so Back doesn't reopen it
    if (location.state) navigate(location.pathname, { replace: true, state: null });
  };

  if (reviewId) {
    if (!reviewing || reviewing.id !== reviewId) return <p className="text-gray-400">Loading submission...</p>;
    return (
      <SongSubmissionReview
        // Remount per submission so player and form state start fresh
        key={reviewing.id}
        submission={reviewing}
        categories={categories}
        onBack={closeReview}
        onApprove={async (id) => {
          const res = await approveSubmission(id);
          setNotice(res.message + (res.refunded > 0 ? ` ₦${res.refunded.toLocaleString("en-NG")} refunded to the artist.` : ""));
          closeReview();
          load();
        }}
        onDecline={async (id, payload) => {
          const res = await declineSubmission(id, payload);
          setNotice(res.message);
          closeReview();
          load();
        }}
      />
    );
  }

  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-4 flex flex-wrap gap-2" role="tablist">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={view === v.id}
            onClick={() => setView(v.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              view === v.id ? "bg-[#A67102] text-white" : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-2.5 rounded-[10px] border border-[#A67102]/60 p-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <label htmlFor="submission-search" className="sr-only">Search song or artist</label>
          <input
            id="submission-search"
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Search song or artist"
            className="h-10 w-full rounded-lg border border-gray-800 bg-[#0D0B07] py-2 pl-9 pr-3 text-sm text-gray-200 placeholder:text-gray-500 focus:border-[#A67102] focus:outline-none"
          />
        </div>

        <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto sm:justify-end">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className={filterTriggerClass} aria-label="Filter by genre">
              <SelectValue placeholder="All genres" />
            </SelectTrigger>
            <SelectContent className={filterContentClass}>
              <SelectItem value="all">All genres</SelectItem>
              {GENRES.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger className={filterTriggerClass} aria-label="Filter by package">
              <SelectValue placeholder="All packages" />
            </SelectTrigger>
            <SelectContent className={filterContentClass}>
              <SelectItem value="all">All packages</SelectItem>
              {TIERS.map((t) => (
                <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {notice && <p className="mb-3 text-sm text-green-400" role="status">{notice}</p>}
      {error && <p className="mb-3 text-sm text-red-400" role="alert">{error}</p>}
      {rows === null && !error ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <SongSubmissionsTable
          rows={rows ?? []}
          onReview={(id) => { setNotice(null); setReviewId(id); }}
          emptyText={view === "pending" && !query && genre === "all" && tier === "all" ? "Nothing waiting for review." : "No submissions match these filters."}
        />
      )}
    </div>
  );
};

// Remount when the header search sends a new query, so it replaces the filters
export const CampaignStrategistJobs: React.FC = () => {
  const location = useLocation();
  const search = (location.state as { search?: string } | null)?.search ?? "";
  return <SubmissionsView key={search} />;
};

export default CampaignStrategistJobs;
