import { ChevronLeft, Pause, Play, Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { defaultStatusStyles } from "./SongSubmissionsTable";


import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import {
  type SongSubmission,
  DEFAULT_SUBMISSION_AUDIO,
  DEFAULT_SUBMISSION_COVER,
} from "@/pages/dashboard_pages/strategist/mockData";


const reasonCategories = [
  { id: 1, name: "Curse words" },
  { id: 2, name: "Explicit sexual content" },
  { id: 3, name: "Hate speech or discrimination" },
  { id: 4, name: "Violence or graphic content" },
  { id: 5, name: "Copyright or uncleared sample" },
  { id: 6, name: "Low audio quality" },
  { id: 7, name: "Incomplete submission" },
  { id: 8, name: "Off-brand for campaign" },
  { id: 9, name: "Misleading track or artist info" },
  { id: 10, name: "Duplicate or spam submission" },
  { id: 11, name: "Other" },
];

type Props = {
  submission: SongSubmission;
  onBack: () => void;
  onDecline: (id: string) => void;
  onApprove: (id: string) => void;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatSubmittedDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

export const SongSubmissionReview: React.FC<Props> = ({
  submission,
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
  const [reasonCategory, setReasonCategory] = useState(reasonCategories[0].name);
  const [reasonDescription, setReasonDescription] = useState("");

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  }, [submission.id]);

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

    await audio.play();
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
    setReasonCategory(reasonCategories[0].name);
    setReasonDescription("");
  };

  const handleDeclineModalChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) resetDeclineForm();
  };

  const handleDeclineSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDecline(submission.id);
    handleDeclineModalChange(false);
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
                        {reasonCategories.map((category) => (
                          <option
                            key={category.id}
                            value={category.name}
                            className="bg-[#1f1f1f] text-white"
                          >
                            {category.name}
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

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="submit"
                      className="mt-5 w-full bg-[#A67102] hover:bg-[#8a5e02] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium"
                    >
                      Submit
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
            disabled={!isPending}
            onClick={() => onApprove(submission.id)}
            className="rounded-lg border border-[#A67102] px-4 py-1.5 text-sm text-[#A67102] hover:bg-[#A67102] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Approve & create campaign
          </button>
        </div>
      </div>

      <img
        src={submission.cover || DEFAULT_SUBMISSION_COVER}
        alt={submission.track}
        className="mb-5 h-56 w-full rounded-2xl object-cover sm:h-72"
      />

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-gray-300">
          {submission.genre}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-medium ${defaultStatusStyles[submission.status]}`}
        >
          {submission.status}
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-white">{submission.track}</h2>
      <p className="mt-1 text-sm text-gray-400">by {submission.artist}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">Campaign goal</p>
          <p className="mt-1 text-gray-200">{submission.goal}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Budget</p>
          <p className="mt-1 text-gray-200">{submission.budget}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs text-gray-500">Submitted</p>
          <p className="mt-1 text-gray-200">{formatSubmittedDate(submission.uploaded)}</p>
        </div>
      </div>

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

      <audio
        ref={audioRef}
        src={submission.audioUrl || DEFAULT_SUBMISSION_AUDIO}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      />
    </div>
  );
};
