import { CloudUpload, MoreVertical, Upload, Music, ChevronRight, Play } from "lucide-react";
import * as React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialTracks } from "@/data/mockTracks";
import type { TrackDetail } from "@/types/artist/song";

const statusStyles: Record<TrackDetail["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102] border border-[#A67102]/30",
  Completed: "bg-gray-700/40 text-gray-300 border border-gray-700/50",
  "Not Active": "bg-gray-800 text-gray-500 border border-gray-800",
};

export const MySongs: React.FC = () => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<TrackDetail[]>(initialTracks);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  
  // Upload modal state
  const [open, setOpen] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongGenre, setNewSongGenre] = useState("");

  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [audioFileName, setAudioFileName] = useState<string>("");
  const [coverFileName, setCoverFileName] = useState<string>("");

  const handleUploadAudioClick = () => {
    audioInputRef.current?.click();
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioFileName(file.name);
    if (!newSongTitle) {
      setNewSongTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUploadCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFileName(file.name);
  };

  function openUploadModal() {
    setOpen(true);
  }

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSongTitle) return;

    const newTrack: TrackDetail = {
      id: String(Date.now()),
      name: newSongTitle,
      artist: "Runty",
      status: "Active",
      campaigns: 0,
      uploaded: new Date().toISOString().split("T")[0],
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
      genre: newSongGenre || "Afrobeats",
      duration: "3:30",
      bpm: 112,
      musicalKey: "C Minor",
      isrc: `NG-ADR-26-00${Math.floor(100 + Math.random() * 900)}`,
      upc: `19871100${Math.floor(1000 + Math.random() * 9000)}`,
      releaseDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      album: "Singles & Unreleased",
      label: "Audora Music Group",
      explicit: false,
      fileSize: "38.5 MB",
      fileFormat: "WAV 24-bit / 48.0 kHz",
      streams: 0,
      radioPlays: 0,
      tvPlays: 0,
      influencerPosts: 0,
      totalReach: "0",
      revenue: "₦ 0.00",
      description: "Freshly uploaded audio master ready for distribution and campaign push.",
      credits: {
        producers: ["Self-Produced"],
        writers: ["Runty"],
      },
      platforms: [],
      campaignsList: [],
      radioSpins: [],
      streamHistory: [{ date: "Today", streams: 0, radio: 0 }],
      lyrics: "[Lyrics pending]",
    };

    setTracks([newTrack, ...tracks]);
    setOpen(false);
    setNewSongTitle("");
    setNewSongGenre("");
    setAudioFileName("");
    setCoverFileName("");
  };

  const handleRowClick = (trackId: string) => {
    navigate(`/dashboard/my-songs/${trackId}`);
  };

  const activeCount = tracks.filter((t) => t.status === "Active").length;
  const genres = [
    { id: 1, name: "Afrobeats" },
    { id: 2, name: "Amapiano" },
    { id: 3, name: "Gospel" },
    { id: 4, name: "HipHop" },
    { id: 5, name: "R&B" },
    { id: 6, name: "Dancehall" },
    { id: 7, name: "Highlife" },
    { id: 8, name: "Afro-soul" },
    { id: 9, name: "Jazz/Blues" },
    { id: 10, name: "EDM" },
    { id: 11, name: "Lofi" },
    { id: 12, name: "Country" },
    { id: 13, name: "House-Music" },
    { id: 14, name: "Rock/Alternative" },
    { id: 15, name: "Fuji" },
    { id: 16, name: "Funk" },
    { id: 17, name: "Trap/Rap" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto pb-28 md:pb-10">
      {/* Subheader row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-sm font-medium">
            {tracks.length} Tracks In Catalog •{" "}
            <span className="text-[#f5b640]">{activeCount} Active In Rotation</span>
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            Click any track to view comprehensive analytics, metadata, campaign history, and airplay.
          </p>
        </div>

        <button
          onClick={openUploadModal}
          className="flex items-center gap-2 bg-[#A67102] hover:bg-[#8a5e02] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-[#A67102]/20 hover:scale-[1.02]"
        >
          <Upload size={15} />
          <span>Upload Song</span>
        </button>

        {/* ----------- UPLOAD SONG MODAL ----------- */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-lg p-6 overflow-hidden">
            <div>
              <DialogHeader className="mb-1">
                <DialogTitle className="text-white text-xl font-bold flex items-center gap-2">
                  <Music size={20} className="text-[#A67102]" />
                  Upload a New Track
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-5">
                Upload your audio file and cover art to register on Audora
              </p>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Audio Upload Box */}
                  <div
                    onClick={handleUploadAudioClick}
                    className="border flex bg-white/[0.02] flex-col items-center justify-center space-y-2 border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={handleAudioFileChange}
                    />
                    <CloudUpload size={28} className="text-[#A67102]" />
                    <p className="text-white font-medium text-xs">
                      {audioFileName ? audioFileName : "Upload Audio (MP3 / WAV)"}
                    </p>
                    <span className="bg-[#A67102]/20 text-[#A67102] text-[10px] px-2 py-0.5 rounded font-medium">
                      {audioFileName ? "Selected" : "Browse File"}
                    </span>
                  </div>

                  {/* Cover Upload Box */}
                  <div
                    onClick={handleUploadCoverClick}
                    className="border flex flex-col bg-white/[0.02] items-center justify-center space-y-2 border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCoverFileChange}
                    />
                    <CloudUpload size={28} className="text-[#A67102]" />
                    <p className="text-white font-medium text-xs">
                      {coverFileName ? coverFileName : "Cover Artwork (JPG/PNG)"}
                    </p>
                    <span className="bg-[#A67102]/20 text-[#A67102] text-[10px] px-2 py-0.5 rounded font-medium">
                      {coverFileName ? "Selected" : "Browse Image"}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="songName" className="text-xs text-gray-300 font-medium block mb-1">
                    Song Title
                  </label>
                  <input
                    type="text"
                    id="songName"
                    value={newSongTitle}
                    onChange={(e) => setNewSongTitle(e.target.value)}
                    placeholder="e.g. Midnight Protocol"
                    required
                    className="w-full bg-[#1A1A1A] border border-gray-800 focus:border-[#A67102] rounded-xl p-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="genreSelect" className="text-xs text-gray-300 font-medium block mb-1">
                    Primary Genre
                  </label>
                  <select
                    id="genreSelect"
                    value={newSongGenre}
                    onChange={(e) => setNewSongGenre(e.target.value)}
                    className="w-full rounded-xl border border-gray-800 bg-[#1A1A1A] p-2.5 text-sm text-white focus:border-[#A67102] focus:outline-none"
                  >
                    <option value="" className="bg-[#1f1f1f] text-gray-400">
                      Select a genre
                    </option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.name} className="bg-[#1f1f1f] text-white">
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#A67102] hover:bg-[#8a5e02] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2"
                >
                  Save & Add Song
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-900 bg-white/[0.01]">
                <th className="px-6 py-4 font-semibold">Track & Artist</th>
                <th className="px-6 py-4 font-semibold">Genre</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Streams</th>
                <th className="px-6 py-4 font-semibold">Campaigns</th>
                <th className="px-6 py-4 font-semibold">Uploaded</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900/60">
              {tracks.map((track) => (
                <tr
                  key={track.id}
                  onClick={() => handleRowClick(track.id)}
                  className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-800/80 group-hover:border-[#A67102]/50 transition-colors">
                        <img
                          src={track.image}
                          alt={track.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Play size={14} className="fill-white text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-[#f5b640] transition-colors flex items-center gap-1.5">
                          <span>{track.name}</span>
                          <ChevronRight
                            size={14}
                            className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-[#A67102]"
                          />
                        </p>
                        <p className="text-gray-500 text-xs">{track.artist}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-3.5">
                    <span className="text-xs text-gray-300 font-medium bg-white/[0.03] px-2.5 py-1 rounded-lg border border-gray-800">
                      {track.genre}
                    </span>
                  </td>

                  <td className="px-6 py-3.5">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[track.status]}`}
                    >
                      {track.status}
                    </span>
                  </td>

                  <td className="px-6 py-3.5 text-gray-300 font-mono text-xs">
                    {track.streams > 0 ? track.streams.toLocaleString() : "—"}
                  </td>

                  <td className="px-6 py-3.5 text-gray-300 font-medium">
                    {track.campaigns > 0 ? (
                      <span className="text-[#f5b640]">{track.campaigns} Active</span>
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </td>

                  <td className="px-6 py-3.5 text-gray-400 text-xs">{track.uploaded}</td>

                  <td
                    className="px-6 py-3.5 text-right relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === track.id ? null : track.id)
                      }
                      className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                      aria-label="Track actions"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === track.id && (
                      <div className="absolute right-6 top-10 z-20 bg-[#141414] border border-gray-800 rounded-xl shadow-2xl overflow-hidden w-40 backdrop-blur-md">
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            handleRowClick(track.id);
                          }}
                          className="w-full text-left text-xs text-gray-200 hover:bg-white/5 px-4 py-2.5 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            navigate(`/dashboard/my-songs/${track.id}`);
                          }}
                          className="w-full text-left text-xs text-[#f5b640] hover:bg-white/5 px-4 py-2.5 transition-colors"
                        >
                          Launch Campaign
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MySongs;