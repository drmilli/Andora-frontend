import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";


import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { songSubmissions, type SongSubmission } from "./mockData";
import { SongSubmissionReview } from "@/components/strategist/SongSubmissionReview";
import { SongSubmissionsTable } from "@/components/strategist/SongSubmissionsTable";


const filterTriggerClass =
  "h-10 min-w-[140px] rounded-lg border border-gray-800 bg-[#0D0B07] px-3 text-sm text-gray-200 shadow-none hover:border-[#A67102] focus-visible:border-[#A67102] focus-visible:ring-0 dark:bg-[#0D0B07] dark:hover:bg-[#0D0B07]";

const filterContentClass =
  "border-gray-800 bg-[#1A1A1A] text-gray-200";

const genreOptions = [
  "Trap/Rap",
  "Afrobeats",
  "Amapiano",
  "Gospel",
  "HipHop",
  "R&B",
  "Dancehall",
  "Highlife",
  "Afro-soul",
  "Jazz/blues",
  "EDM",
  "Lofi",
  "Country",
  "House-Music",
  "Rock/Alternative",
  "Fuji",
  "Funk",
];

export const CampaignStrategistJobs: React.FC = () => {
  const location = useLocation();
  const [submissions, setSubmissions] = useState(songSubmissions);
  const [reviewId, setReviewId] = useState<string | null>(
    (location.state as { reviewId?: string } | null)?.reviewId ?? null
  );
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [budget, setBudget] = useState("all");
  const [status, setStatus] = useState("all");

  const reviewing = submissions.find((row) => row.id === reviewId) ?? null;

  const genres = useMemo(
    () =>
      Array.from(
        new Set([...genreOptions, ...submissions.map((row) => row.genre)])
      ).sort(),
    [submissions]
  );
  const budgets = useMemo(
    () => Array.from(new Set(submissions.map((row) => row.budget))).sort(),
    [submissions]
  );

  const updateStatus = (id: string, nextStatus: SongSubmission["status"]) => {
    setSubmissions((current) =>
      current.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
    );
    setReviewId(null);
  };

  const filteredRows = useMemo(() => {
    const term = query.trim().toLowerCase();

    return submissions.filter((row) => {
      const matchesQuery =
        !term ||
        row.track.toLowerCase().includes(term) ||
        row.artist.toLowerCase().includes(term);
      const matchesGenre = genre === "all" || row.genre === genre;
      const matchesBudget = budget === "all" || row.budget === budget;
      const matchesStatus = status === "all" || row.status === status;

      return matchesQuery && matchesGenre && matchesBudget && matchesStatus;
    });
  }, [submissions, query, genre, budget, status]);

  if (reviewing) {
    return (
      <SongSubmissionReview
        submission={reviewing}
        onBack={() => setReviewId(null)}
        onDecline={(id) => updateStatus(id, "Declined")}
        onApprove={(id) => updateStatus(id, "Approved")}
      />
    );
  }

  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-4 flex flex-col gap-2.5 rounded-[10px] border border-[#A67102]/60 p-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
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
              {genres.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className={filterTriggerClass} aria-label="Filter by budget">
              <SelectValue placeholder="All Budget" />
            </SelectTrigger>
            <SelectContent className={filterContentClass}>
              <SelectItem value="all">All Budget</SelectItem>
              {budgets.map((amount) => (
                <SelectItem key={amount} value={amount}>
                  {amount}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className={filterTriggerClass} aria-label="Filter by status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent className={filterContentClass}>
              <SelectItem value="all">All statuses</SelectItem>
              {(["Pending", "Approved", "Declined"] as SongSubmission["status"][]).map(
                (value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <SongSubmissionsTable rows={filteredRows} onReview={setReviewId} />
    </div>
  );
};

export default CampaignStrategistJobs;
