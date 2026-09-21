import React, { useState,  useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Megaphone,
  Edit3,
  Share2,
  Download,
  Check,
  Copy,
  Radio,

  Users,
  Music,
  Disc,

  Clock,
  Sparkles,

  FileAudio,
  TrendingUp,
  Sliders,
  DollarSign,
  Info,
  CheckCircle2,

} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialTracks, getTrackById } from "@/data/mockTracks";
import type { TrackDetail } from "@/types/artist/song";

const statusStyles: Record<TrackDetail["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102] border-[#A67102]/30",
  Completed: "bg-emerald-950/40 text-emerald-400 border-emerald-800/40",
  "Not Active": "bg-gray-800/60 text-gray-400 border-gray-700/40",
};

export const SongDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [track, setTrack] = useState<TrackDetail | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "analytics" | "campaigns" | "airplay" | "lyrics"
  >("overview");

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(204); // Default 3:24 in seconds
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
console.log(setDuration)

  // Modal States
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("medium");
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: "",
    genre: "",
    secondaryGenre: "",
    bpm: 0,
    musicalKey: "",
    album: "",
    label: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      const found = getTrackById(id) || initialTracks[0];
      setTrack(found);
      setEditFormData({
        name: found.name,
        genre: found.genre,
        secondaryGenre: found.secondaryGenre || "",
        bpm: found.bpm,
        musicalKey: found.musicalKey,
        album: found.album,
        label: found.label,
        description: found.description,
      });
    }
  }, [id]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  if (!track) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-gray-400 text-sm">Song not found</p>
        <button
          onClick={() => navigate("/dashboard/my-songs")}
          className="text-[#A67102] text-sm underline hover:text-[#d49102]"
        >
          Back to My Songs
        </button>
      </div>
    );
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyLyrics = () => {
    if (track) {
      navigator.clipboard.writeText(track.lyrics);
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (track) {
      setTrack({
        ...track,
        name: editFormData.name,
        genre: editFormData.genre,
        secondaryGenre: editFormData.secondaryGenre,
        bpm: editFormData.bpm,
        musicalKey: editFormData.musicalKey,
        album: editFormData.album,
        label: editFormData.label,
        description: editFormData.description,
      });
      setIsEditModalOpen(false);
    }
  };

  const handleLaunchCampaign = () => {
    setCampaignSuccess(true);
    setTimeout(() => {
      setCampaignSuccess(false);
      setIsCampaignModalOpen(false);
    }, 1800);
  };

  const packages = [
    {
      id: "starter",
      name: "Starter Push",
      price: "₦ 32,000.00",
      influencers: 2,
      duration: "14 days",
      features: ["2 Influencer Video Creations", "Social Reposting", "Basic Analytics"],
    },
    {
      id: "medium",
      name: "Medium Push",
      price: "₦ 50,000.00",
      influencers: 4,
      duration: "30 days",
      popular: true,
      features: ["4 Top Influencer Reals/TikToks", "Radio Playlist Submission", "Standard Analytics"],
    },
    {
      id: "pro",
      name: "Pro Push",
      price: "₦ 100,000.00",
      influencers: 6,
      duration: "60 days",
      features: ["6 Premium Creator Activations", "Radio Tour Syndication", "TV Sync Priority", "Dedicated Campaign Manager"],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-32 md:pb-12 px-2 sm:px-4">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard/my-songs")}
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors bg-white/[0.03] hover:bg-white/[0.08] px-3.5 py-2 rounded-xl border border-gray-800/80 hover:border-gray-700"
        >
          <ChevronLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1 text-[#A67102]"
          />
          <span>Back to My Songs</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1A1A] hover:bg-gray-800 px-3.5 py-2 rounded-xl border border-gray-800 transition-colors"
          >
            <Share2 size={14} className="text-[#A67102]" />
            <span className="hidden sm:inline">Share Track</span>
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white bg-[#1A1A1A] hover:bg-gray-800 px-3.5 py-2 rounded-xl border border-gray-800 transition-colors"
          >
            <Edit3 size={14} className="text-[#A67102]" />
            <span className="hidden sm:inline">Edit Metadata</span>
          </button>
          <button
            onClick={() => setIsCampaignModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#A67102] to-[#c78802] hover:from-[#8a5e02] hover:to-[#A67102] px-4 py-2 rounded-xl shadow-lg shadow-[#A67102]/20 transition-all transform hover:scale-[1.02]"
          >
            <Megaphone size={14} />
            <span>Launch Campaign</span>
          </button>
        </div>
      </div>

      {/* HERO SECTION - MODERN GLASS CARD */}
      <div className="relative bg-gradient-to-b from-[#141009] to-[#0D0B07] border border-gray-800/90 rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A67102]/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-[#A67102]/5 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
          {/* Cover Art Artwork with Vinyl / Glass effect */}
          <div className="relative group shrink-0">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/60 relative">
              <img
                src={track.image}
                alt={track.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

              {/* Status Badge Over Image */}
              <div className="absolute top-3 left-3">
                <span
                  className={`text-[11px] px-3 py-1 rounded-full font-semibold border backdrop-blur-md ${
                    statusStyles[track.status]
                  }`}
                >
                  {track.status}
                </span>
              </div>

              {/* Quick Play Trigger Overlay */}
              <button
                onClick={togglePlay}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#A67102]/90 hover:bg-[#c78802] text-white flex items-center justify-center shadow-lg transition-transform transform active:scale-95 group-hover:scale-110"
                aria-label="Play song"
              >
                {isPlaying ? (
                  <Pause size={24} className="fill-white" />
                ) : (
                  <Play size={24} className="fill-white translate-x-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Song Meta Information */}
          <div className="flex-1 min-w-0 text-center lg:text-left flex flex-col justify-between">
            <div>
              {/* Genre & Badges Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="bg-[#A67102]/15 text-[#f5b640] border border-[#A67102]/30 text-xs font-semibold px-3 py-0.5 rounded-full">
                  {track.genre}
                </span>
                {track.secondaryGenre && (
                  <span className="bg-white/5 text-gray-300 border border-gray-800 text-xs px-2.5 py-0.5 rounded-full">
                    {track.secondaryGenre}
                  </span>
                )}
                <span className="bg-white/5 text-gray-400 border border-gray-800 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock size={12} /> {track.duration}
                </span>
                <span className="bg-white/5 text-gray-400 border border-gray-800 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Disc size={12} /> {track.fileFormat}
                </span>
                {track.explicit && (
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                    EXPLICIT
                  </span>
                )}
              </div>

              {/* Song Title & Artist */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
                {track.name}
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-medium mb-3 flex items-center justify-center lg:justify-start gap-2">
                <span>By <strong className="text-white">{track.artist}</strong></span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-sm">{track.album}</span>
              </p>

              <p className="text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 line-clamp-2 mb-6">
                {track.description}
              </p>
            </div>

            {/* HIGH-TECH AUDIO PLAYER BAR */}
            <div className="bg-black/60 border border-gray-800/90 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Play / Pause Toggle Button */}
                <button
                  onClick={togglePlay}
                  className="w-11 h-11 shrink-0 rounded-xl bg-[#A67102] hover:bg-[#8a5e02] text-white flex items-center justify-center transition-colors shadow-md shadow-[#A67102]/20"
                >
                  {isPlaying ? (
                    <Pause size={20} className="fill-white" />
                  ) : (
                    <Play size={20} className="fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Animated Waveform Visualizer & Slider */}
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5 font-mono">
                    <span className="text-[#A67102] font-semibold">{formatTime(currentTime)}</span>
                    <div className="flex items-center gap-1.5">
                      {isPlaying && (
                        <div className="flex items-end gap-0.5 h-3 px-1">
                          <span className="w-1 bg-[#A67102] h-full animate-pulse" />
                          <span className="w-1 bg-[#A67102] h-2/3 animate-pulse delay-75" />
                          <span className="w-1 bg-[#A67102] h-4/5 animate-pulse delay-150" />
                          <span className="w-1 bg-[#A67102] h-1/2 animate-pulse delay-100" />
                        </div>
                      )}
                      <span>{track.duration}</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#A67102]"
                  />
                </div>

                {/* Volume & Download Control */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#A67102] hidden sm:block"
                  />
                  <a
                    href={track.audioUrl || "#"}
                    download={`${track.name}.mp3`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    title="Download Audio Master"
                  >
                    <Download size={17} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Total Streams
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#A67102]/10 flex items-center justify-center text-[#A67102] group-hover:scale-110 transition-transform">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {track.streams.toLocaleString()}
          </p>
          <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <span>+18.4%</span>
            <span className="text-gray-500 font-normal">vs last month</span>
          </p>
        </div>

        <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Campaign Reach
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#A67102]/10 flex items-center justify-center text-[#A67102] group-hover:scale-110 transition-transform">
              <Users size={16} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {track.totalReach}
          </p>
          <p className="text-xs text-[#f5b640] flex items-center gap-1 font-medium">
            <span>{track.campaigns} Active Campaigns</span>
          </p>
        </div>

        <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Airplay Spins
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#A67102]/10 flex items-center justify-center text-[#A67102] group-hover:scale-110 transition-transform">
              <Radio size={16} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {track.radioPlays + track.tvPlays}
          </p>
          <p className="text-xs text-gray-400 font-medium">
            {track.radioPlays} Radio • {track.tvPlays} TV Broadcasts
          </p>
        </div>

        <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 hover:border-gray-800 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Estimated Royalties
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#A67102]/10 flex items-center justify-center text-[#A67102] group-hover:scale-110 transition-transform">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {track.revenue}
          </p>
          <p className="text-xs text-emerald-400 font-medium">
            Verified payouts
          </p>
        </div>
      </div>

      {/* MODERN TAB NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-gray-800/80 mb-6 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: "overview", label: "Overview & Metadata", icon: <Info size={15} /> },
          { id: "analytics", label: "Analytics & Streaming", icon: <TrendingUp size={15} /> },
          { id: "campaigns", label: `Campaigns (${track.campaignsList.length})`, icon: <Megaphone size={15} /> },
          { id: "airplay", label: `Radio & TV Airplay (${track.radioSpins.length})`, icon: <Radio size={15} /> },
          { id: "lyrics", label: "Lyrics & Story", icon: <Music size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 -mb-1 ${
              activeTab === tab.id
                ? "border-[#A67102] text-[#A67102]"
                : "border-transparent text-gray-400 hover:text-white hover:border-gray-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & METADATA */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Metadata Grid */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
              <h3 className="text-white text-base font-bold mb-5 flex items-center gap-2">
                <Sliders size={18} className="text-[#A67102]" />
                Track Information & Industry Identifiers
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">ISRC Code</p>
                  <p className="text-sm font-semibold text-white font-mono mt-0.5">{track.isrc}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">UPC / Barcode</p>
                  <p className="text-sm font-semibold text-white font-mono mt-0.5">{track.upc}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Release Date</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.releaseDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Tempo (BPM)</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.bpm} BPM</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Musical Key</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.musicalKey}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Duration</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Primary Genre</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.genre}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Record Label</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.label}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Uploaded Date</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.uploaded}</p>
                </div>
              </div>
            </div>

            {/* Audio Master Specifications Card */}
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
              <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
                <FileAudio size={18} className="text-[#A67102]" />
                Audio File Master Specifications
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white/[0.02] border border-gray-900">
                <div>
                  <p className="text-xs text-gray-500">Audio Format</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.fileFormat}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">File Size</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{track.fileSize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Channels</p>
                  <p className="text-sm font-semibold text-white mt-0.5">Stereo (2 Ch)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Master Status</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 mt-0.5">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Credits & Collaborators Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
              <h3 className="text-white text-base font-bold mb-4 flex items-center gap-2">
                <Users size={18} className="text-[#A67102]" />
                Production & Song Credits
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-medium">Producer(s)</p>
                  <p className="text-sm text-gray-200 font-semibold mt-0.5">
                    {track.credits.producers.join(", ")}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-900">
                  <p className="text-xs text-gray-500 uppercase font-medium">Songwriter(s)</p>
                  <p className="text-sm text-gray-200 font-semibold mt-0.5">
                    {track.credits.writers.join(", ")}
                  </p>
                </div>

                {track.credits.mixEngineer && (
                  <div className="pt-2 border-t border-gray-900">
                    <p className="text-xs text-gray-500 uppercase font-medium">Mixing Engineer</p>
                    <p className="text-sm text-gray-200 font-semibold mt-0.5">
                      {track.credits.mixEngineer}
                    </p>
                  </div>
                )}

                {track.credits.masteringEngineer && (
                  <div className="pt-2 border-t border-gray-900">
                    <p className="text-xs text-gray-500 uppercase font-medium">Mastering Engineer</p>
                    <p className="text-sm text-gray-200 font-semibold mt-0.5">
                      {track.credits.masteringEngineer}
                    </p>
                  </div>
                )}

                {track.credits.featuredArtists && (
                  <div className="pt-2 border-t border-gray-900">
                    <p className="text-xs text-gray-500 uppercase font-medium">Featured / Vocal Support</p>
                    <p className="text-sm text-gray-200 font-semibold mt-0.5">
                      {track.credits.featuredArtists.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gradient-to-br from-[#1c1407] to-[#0D0B07] border border-[#A67102]/30 rounded-2xl p-6">
              <h4 className="text-white font-bold text-base mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-[#A67102]" />
                Boost this Track
              </h4>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Connect with verified influencers, get featured on top radio playlists, and scale your reach.
              </p>
              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className="w-full bg-[#A67102] hover:bg-[#8a5e02] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors shadow-lg"
              >
                Start Campaign Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANALYTICS & STREAMING */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Stream Growth Chart */}
          <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-white text-base font-bold">Stream Growth Over Time</h3>
                <p className="text-gray-500 text-xs mt-0.5">Daily & weekly cumulative stream velocity</p>
              </div>
              <div className="flex items-center gap-1.5 bg-[#1A1A1A] p-1 rounded-lg border border-gray-800 text-xs">
                <button className="px-3 py-1 bg-[#A67102] text-white rounded font-medium">30 Days</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">90 Days</button>
                <button className="px-3 py-1 text-gray-400 hover:text-white transition-colors">All Time</button>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={track.streamHistory}>
                  <defs>
                    <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A67102" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#A67102" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#777", fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#777", fontSize: 11 }}
                    tickFormatter={(val) => `${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #333",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="streams"
                    stroke="#A67102"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#streamGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* DSP Streaming Platform Breakdown */}
          <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
            <h3 className="text-white text-base font-bold mb-4">DSP Platform Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {track.platforms.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-gray-900 hover:border-gray-800 rounded-xl p-4 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white text-sm">{p.platform}</span>
                    <span className="text-xs text-emerald-400 font-medium">{p.growth}</span>
                  </div>
                  <p className="text-xl font-bold text-white mb-2">{p.streams.toLocaleString()}</p>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-[#A67102] h-full rounded-full"
                      style={{ width: `${p.sharePercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>{p.sharePercent}% of total</span>
                    <span className="text-emerald-500 font-medium">{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGNS */}
      {activeTab === "campaigns" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white text-base font-bold">Campaigns for "{track.name}"</h3>
              <p className="text-gray-500 text-xs">Track marketing reach and influencer engagements</p>
            </div>
            <button
              onClick={() => setIsCampaignModalOpen(true)}
              className="bg-[#A67102] hover:bg-[#8a5e02] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Megaphone size={14} />
              <span>New Campaign</span>
            </button>
          </div>

          {track.campaignsList.length === 0 ? (
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-12 text-center">
              <Megaphone size={36} className="text-gray-600 mx-auto mb-3" />
              <h4 className="text-white font-semibold text-base mb-1">No campaigns active yet</h4>
              <p className="text-gray-500 text-xs max-w-sm mx-auto mb-5">
                Boost "{track.name}" across TikTok, Instagram, and top Nigerian & African radio stations.
              </p>
              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className="bg-[#A67102] text-white text-xs font-medium px-5 py-2.5 rounded-xl hover:bg-[#8a5e02] transition-colors"
              >
                Launch First Campaign
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {track.campaignsList.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#0D0B07] border border-gray-900 hover:border-gray-800 rounded-2xl p-5 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                        c.status === "Active"
                          ? "bg-[#A67102]/20 text-[#f5b640]"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {c.status}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{c.budget}</span>
                  </div>

                  <h4 className="text-white font-bold text-base mb-1">{c.name}</h4>
                  <p className="text-gray-500 text-xs mb-4">{c.type} • Tier: {c.tier}</p>

                  <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-white/[0.02] border border-gray-900 rounded-xl text-center mb-4">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Creators</p>
                      <p className="text-sm font-bold text-white mt-0.5">{c.influencers}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Reach</p>
                      <p className="text-sm font-bold text-[#f5b640] mt-0.5">{c.reach}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Engage</p>
                      <p className="text-sm font-bold text-emerald-400 mt-0.5">{c.engagementRate}</p>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>From: {c.startDate}</span>
                    <span>To: {c.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AIRPLAY */}
      {activeTab === "airplay" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-white text-base font-bold">Radio & TV Broadcast Airplay</h3>
            <p className="text-gray-500 text-xs">Real-time spin monitoring across partner stations</p>
          </div>

          {track.radioSpins.length === 0 ? (
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-12 text-center">
              <Radio size={36} className="text-gray-600 mx-auto mb-3" />
              <h4 className="text-white font-semibold text-base mb-1">No airplay logs recorded yet</h4>
              <p className="text-gray-500 text-xs max-w-sm mx-auto mb-4">
                Submit this track to radio stations and DJs across Africa.
              </p>
              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className="bg-[#A67102] text-white text-xs font-medium px-4 py-2 rounded-xl"
              >
                Submit for Radio Play
              </button>
            </div>
          ) : (
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                      <th className="px-6 py-4 font-medium">Station & City</th>
                      <th className="px-6 py-4 font-medium">Frequency</th>
                      <th className="px-6 py-4 font-medium">Total Spins</th>
                      <th className="px-6 py-4 font-medium">Chart Peak</th>
                      <th className="px-6 py-4 font-medium">Last Played</th>
                    </tr>
                  </thead>
                  <tbody>
                    {track.radioSpins.map((spin) => (
                      <tr
                        key={spin.id}
                        className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#A67102]/10 text-[#A67102] flex items-center justify-center">
                              <Radio size={16} />
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">{spin.station}</p>
                              <p className="text-gray-500 text-xs">{spin.location}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-mono text-xs">{spin.frequency}</td>
                        <td className="px-6 py-4 font-bold text-white">{spin.spins}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-[#A67102]/20 text-[#f5b640] px-2.5 py-0.5 rounded-full font-medium">
                            {spin.peakPosition}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">{spin.lastPlayed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: LYRICS & STORY */}
      {activeTab === "lyrics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-900">
              <h3 className="text-white text-base font-bold flex items-center gap-2">
                <Music size={18} className="text-[#A67102]" />
                Official Lyrics
              </h3>
              <button
                onClick={handleCopyLyrics}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-gray-800"
              >
                {copiedLyrics ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Lyrics</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed select-text">
              {track.lyrics}
            </pre>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-6">
              <h4 className="text-white text-sm font-bold mb-3">Song Story & Inspiration</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{track.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: LAUNCH CAMPAIGN ----------------- */}
      <Dialog open={isCampaignModalOpen} onOpenChange={setIsCampaignModalOpen}>
        <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-lg p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Megaphone size={20} className="text-[#A67102]" />
              Launch Campaign for "{track.name}"
            </DialogTitle>
          </DialogHeader>

          {campaignSuccess ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold text-white">Campaign Initiated!</h4>
              <p className="text-xs text-gray-400 mt-1">
                Audora is matching "{track.name}" with top influencers and stations now.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-gray-400">
                Choose a push package to immediately activate viral creators and station rotations.
              </p>

              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedPackage === pkg.id
                        ? "border-[#A67102] bg-[#A67102]/10 shadow-lg shadow-[#A67102]/10"
                        : "border-gray-800 hover:border-gray-700 bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm">{pkg.name}</p>
                        {pkg.popular && (
                          <span className="text-[10px] bg-[#A67102] text-white px-2 py-0.5 rounded-full font-bold">
                            POPULAR
                          </span>
                        )}
                      </div>
                      <p className="text-white font-bold text-sm">{pkg.price}</p>
                    </div>
                    <p className="text-gray-500 text-xs mb-2">
                      {pkg.influencers} Influencers • {pkg.duration}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pkg.features.map((feat, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-black/40 text-gray-300 px-2 py-0.5 rounded border border-gray-800"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLaunchCampaign}
                  className="flex-1 bg-[#A67102] hover:bg-[#8a5e02] text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Proceed with Campaign
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ----------------- MODAL: EDIT SONG METADATA ----------------- */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-lg p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Edit3 size={18} className="text-[#A67102]" />
              Edit Track Metadata
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Song Title</label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Genre</label>
                <input
                  type="text"
                  value={editFormData.genre}
                  onChange={(e) => setEditFormData({ ...editFormData, genre: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Secondary Genre</label>
                <input
                  type="text"
                  value={editFormData.secondaryGenre}
                  onChange={(e) => setEditFormData({ ...editFormData, secondaryGenre: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">BPM (Tempo)</label>
                <input
                  type="number"
                  value={editFormData.bpm}
                  onChange={(e) => setEditFormData({ ...editFormData, bpm: Number(e.target.value) })}
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Musical Key</label>
                <input
                  type="text"
                  value={editFormData.musicalKey}
                  onChange={(e) => setEditFormData({ ...editFormData, musicalKey: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Album / Release Collection</label>
              <input
                type="text"
                value={editFormData.album}
                onChange={(e) => setEditFormData({ ...editFormData, album: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">Track Story / Description</label>
              <textarea
                rows={3}
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#A67102]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-800 text-gray-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-[#A67102] hover:bg-[#8a5e02] text-white font-semibold py-2.5 rounded-xl text-xs transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ----------------- MODAL: SHARE TRACK ----------------- */}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-md p-6">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Share2 size={18} className="text-[#A67102]" />
              Share "{track.name}"
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-xs text-gray-400">
              Share the public link to your track for promotions, playlists, and influencer submissions.
            </p>

            <div className="flex items-center gap-2 bg-[#1A1A1A] border border-gray-800 rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="bg-transparent text-xs text-gray-300 w-full px-2 focus:outline-none font-mono"
              />
              <button
                onClick={handleCopyShareLink}
                className="bg-[#A67102] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 hover:bg-[#8a5e02] transition-colors"
              >
                {copiedLink ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-gray-500 uppercase font-medium mb-2">Quick Share</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <a
                  href={`https://twitter.com/intent/tweet?text=Listen%20to%20${encodeURIComponent(track.name)}%20by%20${encodeURIComponent(track.artist)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-gray-300 transition-colors"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Check out ${track.name} on Audora: ${window.location.href}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-gray-300 transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/5 hover:bg-white/10 p-2 rounded-lg text-gray-300 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SongDetails;
