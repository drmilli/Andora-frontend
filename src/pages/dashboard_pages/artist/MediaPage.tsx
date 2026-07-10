import React, { useRef, useState } from "react";
import { ScheduleStep } from "@/components/schedule/ScheduleStep";
import type { ScheduleData } from "@/types/schedule";
import { PlatformsStep } from "@/components/platforms/PlatformsStep";
import type { PlatformsData } from "@/components/platforms/PlatformsStep";
import { useMedia } from "@/hooks/artist/useMedia";
import { Trash2, Loader2 } from "lucide-react";

const FilterButtons: React.FC<{ type: "songs" | "videos" }> = ({ type }) => (
  <div className="flex gap-3 mb-6">
    <button className="px-4 py-2 bg-[#A67102] text-white rounded-full text-sm font-medium">
      Total {type === "songs" ? "Songs" : "Videos"}
    </button>
    <button className="px-4 py-2 bg-[#2a2a2a] text-gray-400 rounded-full text-sm font-medium hover:bg-[#3a3a3a]">
      Uploaded
    </button>
    <button className="px-4 py-2 bg-[#2a2a2a] text-gray-400 rounded-full text-sm font-medium hover:bg-[#3a3a3a]">
      Not uploaded
    </button>
  </div>
);

export const MediaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"songs" | "videos">("songs");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<
    "details" | "tracks" | "schedule" | "platforms" | "review"
  >("details");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [platformsData, setPlatformsData] = useState<PlatformsData | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { media: songs, loading: songsLoading, upload: uploadSong, remove: removeSong } = useMedia("audio");
  const { media: videos, loading: videosLoading, upload: uploadVideo, remove: removeVideo } = useMedia("video");

  const [uploadingFile, setUploadingFile] = useState(false);

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadFile(file);
  };

  const handleSubmit = async () => {
    if (!uploadFile) {
      fileInputRef.current?.click();
      return;
    }
    setUploadingFile(true);
    try {
      const title = formTitle || uploadFile.name;
      if (activeTab === "songs") {
        await uploadSong(uploadFile, title);
      } else {
        await uploadVideo(uploadFile, title);
      }
      setIsUploading(false);
      setUploadStep("details");
      setUploadFile(null);
      setFormTitle("");
      setScheduleData(null);
      setPlatformsData(null);
    } catch {
      // error handled by hook
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDelete = async (id: string, type: string | null) => {
    if (!window.confirm("Delete this media?")) return;
    try {
      if (type === "audio") await removeSong(id);
      else await removeVideo(id);
    } catch {
      // error handled by hook
    }
  };

  const currentMedia = activeTab === "songs" ? songs : videos;
  const loading = activeTab === "songs" ? songsLoading : videosLoading;

  function Yearselection() {
    const curYear = new Date().getFullYear();
    const years = [];
    for (let i = curYear - 200; i <= curYear; i++) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
    return <>{years}</>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={activeTab === "songs" ? "audio/*" : "video/*"}
        onChange={handleFileSelected}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto">
        {isUploading ? (
          <div>
            <button
              onClick={() => { setIsUploading(false); setUploadStep("details"); setUploadFile(null); }}
              className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-6 border-b border-gray-700 mb-8">
              {[{ id: "details", label: "Details" }, { id: "tracks", label: "Tracks" }, { id: "schedule", label: "Schedule" }, { id: "platforms", label: "Platforms" }, { id: "review", label: "Review" }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setUploadStep(tab.id as any)}
                  className={`pb-3 text-sm font-medium transition-colors w-[80px] h-[80px] md:w-[50px] md:h-[50px] lg:w-[250px] lg:h-[52px] ${uploadStep === tab.id ? "text-white border-b-2 border-[#A67102]" : "text-gray-400"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {uploadStep === "details" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">{activeTab === "songs" ? "Enter Song details" : "Enter Video Title"}</h2>
                {activeTab === "videos" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Select Music</label>
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>name</option>
                      </select>
                    </div>
                    <button onClick={() => setUploadStep("tracks")} className="w-full px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">Continue</button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name of Single, Ep or Album</label>
                        <input
                          type="text"
                          placeholder="name"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Copyright Holder</label>
                          <input type="text" placeholder="holder" className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Copyright Year</label>
                          <select className="w-full bg-[#0D0B07] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">{Yearselection()}</select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Production Holder</label>
                          <input type="text" placeholder="holder" className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Production Year</label>
                          <select className="w-full bg-[#0D0B07] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">{Yearselection()}</select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Record Label</label>
                        <input type="text" placeholder="holder" className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Featuring Artists</label>
                        <input type="text" placeholder="name" className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Written By</label>
                        <input type="text" placeholder="writer" className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]" />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setIsUploading(false)} className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium">Back</button>
                      <button onClick={() => setUploadStep("tracks")} className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">Continue</button>
                    </div>
                  </>
                )}
              </div>
            )}

            {uploadStep === "tracks" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">{activeTab === "songs" ? "Upload Tracks" : "Enter Song details"}</h2>
                {activeTab === "videos" ? (
                  <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-96">
                    <svg className="w-24 h-24 text-[#A67102] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-white text-center mb-4 text-lg">Drag and drop files to upload</p>
                    <p className="text-gray-400 text-sm mb-6">OR</p>
                    <button onClick={handleFilePick} className="px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                      {uploadFile ? uploadFile.name : "Upload Cover"}
                    </button>
                    <p className="text-gray-500 text-xs mt-6">only mp4 format is accepted</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-64">
                      <svg className="w-16 h-16 text-[#A67102] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-white text-center mb-4">Drag and drop files to upload</p>
                      <p className="text-gray-400 text-sm mb-4">OR</p>
                      <button onClick={handleFilePick} className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium">
                        {uploadFile ? `Selected: ${uploadFile.name}` : "Upload Cover"}
                      </button>
                      <p className="text-gray-500 text-xs mt-4">only mp3 format is accepted</p>
                    </div>
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Track List</h3>
                        <button className="text-[#A67102] hover:text-[#8a5e02] text-sm font-medium">+ Add Track(s)</button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setUploadStep("details")} className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium">Back</button>
                  <button onClick={() => setUploadStep("schedule")} className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">Continue</button>
                </div>
              </div>
            )}

            {uploadStep === "schedule" && (
              <ScheduleStep onBack={() => setUploadStep("tracks")} onContinue={(data) => { setScheduleData(data); setUploadStep("platforms"); }} />
            )}
            {uploadStep === "platforms" && (
              <PlatformsStep type={activeTab} onBack={() => setUploadStep("schedule")} onContinue={(data) => { setPlatformsData(data); setUploadStep("review"); }} />
            )}
            {uploadStep === "review" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review</h2>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 space-y-3">
                  <p className="text-gray-400">Review your upload details before submitting</p>
                  {uploadFile && (
                    <p className="text-sm text-gray-300">File: <span className="text-white">{uploadFile.name}</span></p>
                  )}
                  {formTitle && (
                    <p className="text-sm text-gray-300">Title: <span className="text-white">{formTitle}</span></p>
                  )}
                </div>
                <div className="flex gap-4 mt-8">
                  <button onClick={() => setUploadStep("platforms")} className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium">Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={uploadingFile}
                    className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploadingFile ? <Loader2 size={16} className="animate-spin" /> : null}
                    {uploadingFile ? "Uploading..." : "Submit"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedId ? (
          <div>
            <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-white flex items-center gap-2 mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div className="flex flex-col items-center justify-center min-h-64 text-gray-400">
              <p className="text-lg">Media detail view</p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-6">MEDIA</h1>

            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("songs")}
                className={`pb-4 font-semibold transition-colors w-[80px] h-[80px] md:w-[50px] md:h-[50px] lg:w-[550px] lg:h-[52px] ${activeTab === "songs" ? "text-white border-b-2 border-[#A67102]" : "text-gray-400"}`}
              >Songs</button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-4 font-semibold transition-colors w-[80px] h-[80px] md:w-[50px] md:h-[50px] lg:w-[550px] lg:h-[52px] ${activeTab === "videos" ? "text-white border-b-2 border-[#A67102]" : "text-gray-400"}`}
              >Videos</button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div></div>
              <button
                onClick={() => setIsUploading(true)}
                className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors flex items-center gap-2 text-sm font-medium"
              >
                + Upload
              </button>
            </div>

            {activeTab === "songs" && (
              <>
                <FilterButtons type="songs" />
                <div className="text-sm text-gray-400 mb-4">Count: {songs.length}</div>
                {songsLoading ? (
                  <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#A67102]" /></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {songs.map((item) => (
                      <div key={item.id} onClick={() => setSelectedId(item.id)} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer">
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-800 flex items-center justify-center">
                          <Music2Icon />
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.type); }} className="absolute top-3 right-3 bg-red-500/80 text-white p-2 rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white mb-1 truncate">{item.title || "Untitled"}</h3>
                          <p className="text-sm text-gray-400">{item.type} • {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {songs.length === 0 && <div className="col-span-full text-center py-20 text-gray-500"><p>No audio uploads yet. Click + Upload to add your first song.</p></div>}
                  </div>
                )}
              </>
            )}

            {activeTab === "videos" && (
              <>
                <FilterButtons type="videos" />
                <div className="text-sm text-gray-400 mb-4">Count: {videos.length}</div>
                {videosLoading ? (
                  <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[#A67102]" /></div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {videos.map((item) => (
                      <div key={item.id} onClick={() => setSelectedId(item.id)} className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer">
                        <div className="relative w-full aspect-square overflow-hidden bg-gray-800 flex items-center justify-center">
                          <VideoIcon />
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.type); }} className="absolute top-3 right-3 bg-red-500/80 text-white p-2 rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-white mb-1 truncate">{item.title || "Untitled"}</h3>
                          <p className="text-sm text-gray-400">{item.type} • {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                    {videos.length === 0 && <div className="col-span-full text-center py-20 text-gray-500"><p>No video uploads yet. Click + Upload to add your first video.</p></div>}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const Music2Icon = () => (
  <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const VideoIcon = () => (
  <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
