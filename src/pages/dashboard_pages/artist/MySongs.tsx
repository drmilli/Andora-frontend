import { CloudUpload, MoreVertical, Upload, Music, ChevronRight, Play } from "lucide-react";
import * as React from "react";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TrackDetail } from "@/types/artist/song";
import type { Campaign } from "@/types/artist/campaign";
import { useMedia } from "@/hooks/artist/useMedia";
import { fetchCampaigns } from "@/services/artist/campaigns";
import { trackFromMedia } from "@/lib/trackFromMedia";
import { apiErrorMessage } from "@/lib/influencer";
import { GENRES } from "@/lib/genres";
import { AppContext } from "@/Context/AppContext";

const statusStyles: Record<TrackDetail["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102] border border-[#A67102]/30",
  Completed: "bg-gray-700/40 text-gray-300 border border-gray-700/50",
  "Not Active": "bg-gray-800 text-gray-500 border border-gray-800",
};

// Matches the upload limit the backend accepts comfortably
const MAX_UPLOAD_MB = 50;

export const MySongs: React.FC = () => {
  const navigate = useNavigate();
  const user = useContext(AppContext)?.user;
  const { media, loading, error, upload, remove } = useMedia("audio");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Campaign status per track for the table
  useEffect(() => {
    fetchCampaigns(1, 100)
      .then((r) => setCampaigns(r.data))
      .catch(() => setCampaigns([]));
  }, []);

  const artistName = [user?.firstname, user?.surname].filter(Boolean).join(" ") || user?.username || "You";
  const tracks = media.map((m) => trackFromMedia(m, campaigns, artistName));

  // Upload modal state
  const [open, setOpen] = useState(false);
  const [newSongTitle, setNewSongTitle] = useState("");
  const [newSongGenre, setNewSongGenre] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAudioClick = () => {
    audioInputRef.current?.click();
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setUploadError(`That file is over ${MAX_UPLOAD_MB} MB. Export a smaller MP3 and try again.`);
      return;
    }
    setUploadError(null);
    setAudioFile(file);
    if (!newSongTitle) {
      setNewSongTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  function openUploadModal() {
    setNewSongTitle("");
    setNewSongGenre("");
    setAudioFile(null);
    setUploadError(null);
    setOpen(true);
  }

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!audioFile) return setUploadError("Choose an audio file to upload.");
    if (!newSongTitle.trim()) return setUploadError("Give the track a title.");
    try {
      setUploading(true);
      setUploadError(null);
      await upload(audioFile, newSongTitle.trim(), undefined, newSongGenre || undefined);
      setOpen(false);
    } catch (err) {
      setUploadError(apiErrorMessage(err, "Upload failed. Check your connection and try again."));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (track: TrackDetail) => {
    if (!window.confirm(`Delete "${track.name}"? This removes the audio file and can't be undone.`)) return;
    try {
      setActionError(null);
      await remove(track.id);
    } catch (err) {
      setActionError(apiErrorMessage(err, "Could not delete this track"));
    }
  };

  const handleRowClick = (trackId: string) => {
    navigate(`/dashboard/my-songs/${trackId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-28 md:pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <p className="text-gray-400 text-sm font-medium">
            {tracks.length} {tracks.length === 1 ? "Track" : "Tracks"} In Catalog
          </p>
          <p className="text-gray-500 text-xs mt-0.5">
            Click any track to play it, edit its details and see its plays and campaigns.
          </p>
        </div>

        <button
          onClick={openUploadModal}
          className="flex items-center gap-2 bg-[#A67102] hover:bg-[#8a5e02] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-lg shadow-[#A67102]/20 hover:scale-[1.02]"
        >
          <Upload size={15} />
          <span>Upload Song</span>
        </button>

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
                Upload your audio file to add it to your catalog
              </p>

              <form onSubmit={handleUploadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                 
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
                      {audioFile ? audioFile.name : "Upload Audio (MP3 / WAV)"}
                    </p>
                    <span className="bg-[#A67102]/20 text-[#A67102] text-[10px] px-2 py-0.5 rounded font-medium">
                      {audioFile ? "Selected" : "Browse File"}
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
                    {GENRES.map((genre) => (
                      <option key={genre} value={genre} className="bg-[#1f1f1f] text-white">
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                {uploadError && <p className="text-xs text-red-400" role="alert">{uploadError}</p>}

                <button
                  type="submit"
                  disabled={uploading || !audioFile || !newSongTitle.trim()}
                  className="w-full bg-[#A67102] hover:bg-[#8a5e02] disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors mt-2"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {(error || actionError) && (
        <p className="mb-4 text-sm text-red-400" role="alert">{actionError || error}</p>
      )}

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
              {loading && tracks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-sm text-gray-400">Loading your songs...</td>
                </tr>
              ) : tracks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <Music size={36} className="text-gray-600 mx-auto mb-3" />
                    <p className="text-white font-semibold text-base mb-1">No songs yet</p>
                    <p className="text-gray-500 text-xs">Upload your first track to get started.</p>
                  </td>
                </tr>
              ) : tracks.map((track) => (
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
                            navigate("/dashboard/campaigns", { state: { startCampaign: { mediaId: track.id } } });
                          }}
                          className="w-full text-left text-xs text-[#f5b640] hover:bg-white/5 px-4 py-2.5 transition-colors"
                        >
                          Launch Campaign
                        </button>
                        <button
                          onClick={() => {
                            setOpenMenuId(null);
                            handleDelete(track);
                          }}
                          className="w-full text-left text-xs text-red-400 hover:bg-white/5 px-4 py-2.5 transition-colors"
                        >
                          Delete
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