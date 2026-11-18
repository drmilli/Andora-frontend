import { ChevronLeft, Music, Pause, Play, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { defaultStatusStyles } from "./statusStyles";
import type { DeclinePayload, StrategistSubmission } from "@/types/strategist";
import { formatNaira } from "@/lib/influencer";
import { displayName } from "@/components/community/displayName";


import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

type Props = {
  submission: StrategistSubmission;
  /** Decline categories from the API, so the form and the server agree */
  categories: string[];
  onBack: () => void;
  onDecline: (id: string, payload: DeclinePayload) => Promise<void>;
  onApprove: (id: string) => Promise<void>;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export const SongSubmissionReview: React.FC<Props> = ({
  submission,
  categories,
  onBack,
  onDecline,
  onApprove,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const isPending = submission.status === "Pending";
  const [open, setOpen] = useState(false);
  const [reasonTitle, setReasonTitle] = useState("");
  const [reasonCategory, setReasonCategory] = useState(categories[0] ?? "");
  const [reasonDescription, setReasonDescription] = useState("");
  const [busy, setBusy] = useState<"approve" | "decline" | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [declineError, setDeclineError] = useState<string | null>(null);
  const audioUrl = submission.track?.fileUrl;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setActionError("This track can't be played in the browser. Open it directly to listen.");
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolume = (value: number) => {
    setVolume(value);
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.7);
      return;
    }
    setIsMuted(true);
  };

  const resetDeclineForm = () => {
    setReasonTitle("");
    setReasonCategory(categories[0] ?? "");
    setReasonDescription("");
    setDeclineError(null);
  };

  const handleDeclineModalChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetDeclineForm();
  };

  const errorText = (err: unknown, fallback: string) =>
    (err as { response?: { data?: { message?: string } } })?.response?.data?.message || fallback;

  const handleDeclineSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reasonTitle.trim() || !reasonDescription.trim()) {
      setDeclineError("Add a title and a description so the artist knows what to fix.");
      return;
    }
    try {
      setBusy("decline");
      setDeclineError(null);
      await onDecline(submission.id, {
        title: reasonTitle.trim(),
        category: reasonCategory,
        reason: reasonDescription.trim(),
      });
      handleDeclineModalChange(false);
    } catch (err) {
      setDeclineError(errorText(err, "Could not decline this submission"));
    } finally {
      setBusy(null);
    }
  };

  const handleApprove = async () => {
    if (!window.confirm(`Approve "${submission.track?.title || "this track"}"? Influencers will be assigned and the campaign goes live.`)) return;
    try {
      setBusy("approve");
      setActionError(null);
      await onApprove(submission.id);
    } catch (err) {
      setActionError(errorText(err, "Could not approve this submission"));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="w-full pb-28 md:pb-0">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm text-gray-300 hover:text-white"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={!isPending}
            onClick={() => setOpen(true)}
            className="rounded-lg border border-gray-700 px-4 py-1.5 text-sm text-white hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Decline
          </button>

          {/* ----------- DECLINE CAMPAIGN MODAL ----------- */}
          <Dialog open={open} onOpenChange={handleDeclineModalChange}>
            <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-md p-0 overflow-hidden">
              <div className="p-4">

                <DialogHeader className="mb-1">
                  <DialogTitle className="text-white text-xl font-semibold">
                    Song Decline
                  </DialogTitle>
                </DialogHeader>

                <p className="text-gray-500 text-xs uppercase tracking-wide mb-6">
                  Please fill the form.
                </p>

                <form onSubmit={handleDeclineSubmit}>
                  <div className="mt-3">
                    <label htmlFor="reasonTitle" className="text-white">Reason Title
                      <input
                        type="text"
                        id="reasonTitle"
                        name="reasonTitle"
                        value={reasonTitle}
                        onChange={(event) => setReasonTitle(event.target.value)}
                        required
                        className="w-full bg-[#3333334D] border mt-2 border-gray-800 hover:border-[#A67102] rounded-lg p-2 text-white"
                      />
                    </label>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="reasonCatergory" className="text-white">Reason Category
                      <select
                        id="reasonCatergory"
                        name="reasonCatergory"
                        value={reasonCategory}
                        onChange={(event) => setReasonCategory(event.target.value)}
                        className="mt-2 w-full appearance-none rounded-lg border bg-[#3333334D] p-3 text-white focus:border-[#A67102] focus:outline-none"
                      >
                        {categories.map((category) => (
                          <option
                            key={category}
                            value={category}
                            className="bg-[#1f1f1f] text-white"
                          >
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="reasonDescription" className="text-white">Reason Description
                      <textarea
                        id="reasonDescription"
                        name="reasonDescription"
                        value={reasonDescription}
                        onChange={(event) => setReasonDescription(event.target.value)}
                        required
                        className="w-full bg-[#3333334D] border mt-2 border-gray-800 hover:border-[#A67102] rounded-lg p-2 text-white"
                      />
                    </label>
                  </div>

                  <p className="mt-3 text-xs text-gray-500">
                    The artist sees this reason and is refunded {formatNaira(submission.budget)} in full.
                  </p>
                  {declineError && <p className="mt-2 text-sm text-red-400" role="alert">{declineError}</p>}

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={busy === "decline"}
                      className="mt-5 w-full bg-[#A67102] hover:bg-[#8a5e02] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                    >
                      {busy === "decline" ? "Declining..." : "Submit"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeclineModalChange(false)}
                      className="mt-5 w-full rounded-lg border border-gray-800 transition-colors text-white px-5 py-2 text-sm font-medium hover:border-[#A67102]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </DialogContent>
          </Dialog>


          <button
            type="button"
            disabled={!isPending || busy !== null}
            onClick={handleApprove}
            className="rounded-lg border border-[#A67102] px-4 py-1.5 text-sm text-[#A67102] hover:bg-[#A67102] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {busy === "approve" ? "Approving..." : "Approve & create campaign"}
          </button>
        </div>
      </div>

      {actionError && <p className="mb-4 text-sm text-red-400" role="alert">{actionError}</p>}

      <div className="mb-5 flex h-40 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#A67102]/40 via-[#1a1207] to-black sm:h-56">
        <Music size={56} className="text-[#f5b640]/70" aria-hidden="true" />
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        {submission.genre && (
          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-gray-300">
            {submission.genre}
          </span>
        )}
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-gray-300">
          {submission.packageName}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-medium ${defaultStatusStyles[submission.status]}`}
        >
          {submission.status}
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-white">{submission.track?.title || "Untitled"}</h2>
      <p className="mt-1 text-sm text-gray-400">by {displayName(submission.artist)} (@{submission.artist.username})</p>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">Campaign goal</p>
          <p className="mt-1 text-gray-200">{submission.goal || "Not specified"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Budget</p>
          <p className="mt-1 text-gray-200">
            {formatNaira(submission.budget)} &bull; {submission.influencerCount} influencers, {submission.durationDays} days
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-gray-500">Submitted</p>
          <p className="mt-1 text-gray-200">{new Date(submission.submittedAt).toLocaleDateString("en-GB")}</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-[#15120C] p-4">
        <p className="text-xs text-gray-500">Brief for influencers</p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-gray-200">{submission.brief}</p>
      </div>

      {submission.reviewedAt && (
        <div className={`mt-4 rounded-lg border p-4 text-sm ${submission.decline ? "border-red-500/30" : "border-green-500/30"}`}>
          <p className="text-gray-300">
            {submission.decline ? "Declined" : "Approved"} by{" "}
            {submission.reviewedBy ? displayName(submission.reviewedBy) : "a strategist"} on{" "}
            {new Date(submission.reviewedAt).toLocaleDateString("en-GB")}
            {!submission.decline && ` • ${submission.assigned} influencer${submission.assigned === 1 ? "" : "s"} assigned`}
          </p>
          {submission.decline && (
            <p className="mt-2 text-gray-400">
              <span className="text-white">{submission.decline.title}</span> ({submission.decline.category}):{" "}
              {submission.decline.reason}
            </p>
          )}
        </div>
      )}

      {!audioUrl && <p className="mt-8 text-sm text-gray-500">No audio attached to this submission.</p>}
      {audioUrl && (
      <div className="mt-8 flex items-center gap-8 md:gap-16 rounded-lg border border-[#A67102]/60 px-3 py-2">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A67102] text-black hover:bg-[#8a5e02]"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-0.5" fill="currentColor" />}
          </button>

          <span className="w-8 shrink-0 text-xs text-gray-400">{formatTime(currentTime)}</span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(event) => handleSeek(Number(event.target.value))}
            className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-[#A67102]/25 accent-[#A67102]"
            aria-label="Seek"
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            className="shrink-0 text-gray-400 hover:text-white"
            aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(event) => handleVolume(Number(event.target.value))}
            className="h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-[#A67102]/25 accent-[#A67102]"
            aria-label="Volume"
          />
        </div>
      </div>

      )}

      {audioUrl && (
        <a href={audioUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-[#A67102] hover:underline">
          Open audio file
        </a>
      )}

      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />
    </div>
  );
};
