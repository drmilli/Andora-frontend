import React from "react";
import { ScheduleStep } from "@/components/schedule/ScheduleStep";
import type { ScheduleData } from "@/types/schedule";
import { PlatformsStep } from "@/components/platforms/PlatformsStep";
import type { PlatformsData } from "@/components/platforms/PlatformsStep";


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
  const [activeTab, setActiveTab] = React.useState<"songs" | "videos">("songs");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadStep, setUploadStep] = React.useState<
    "details" | "tracks" | "schedule" | "platforms" | "review"
  >("details");
  const [selectedSong, setSelectedSong] = React.useState<number | null>(null);
  const [songDetailTab, setSongDetailTab] = React.useState<"songs" | "about">(
    "songs",
  );
  const [selectedVideo, setSelectedVideo] = React.useState<number | null>(null);
  const [videoDetailTab, setVideoDetailTab] = React.useState<
    "videos" | "about"
  >("videos");
  // These will be sent to the backend on final submission (Review step)

  const [scheduleData, setScheduleData] = React.useState<ScheduleData | null>(null);
  console.log(scheduleData)

  const [platformsData, setPlatformsData] = React.useState<PlatformsData | null>(null);
  console.log(platformsData)

  const songs = [
    {
      id: 1,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 7,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 8,
      title: "Smoke",
      artist: "RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Smoke",
      artist: "Single by RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Smoke",
      artist: "Album",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Smoke",
      artist: "Single by RUNTY ft JAZZY",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    },
  ];
function Yearselection() {
  const curYear = new Date().getFullYear();
  const years = [];
  for (let i = curYear - 200; i <= curYear; i++) {
    years.push(
      <option key={i} value={i} className="">
        {i}
      </option>,
    );
  }
  return <>{years}</>;
}

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {isUploading ? (
          // Upload Flow Pages
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setIsUploading(false);
                setUploadStep("details");
              }}
              className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-700 mb-8">
              {[
                { id: "details", label: "Details" },
                { id: "tracks", label: "Tracks" },
                { id: "schedule", label: "Schedule" },
                { id: "platforms", label: "Platforms" },
                { id: "review", label: "Review" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() =>
                    setUploadStep(
                      tab.id as
                        | "details"
                        | "tracks"
                        | "schedule"
                        | "platforms"
                        | "review",
                    )
                  }
                  className={`pb-3 text-sm font-medium transition-colors
                       w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[250px] lg:h-[52px]
                    ${
                    uploadStep === tab.id
                      ? "text-white border-b-2 border-[#A67102]"
                      : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Step Content */}
            {uploadStep === "details" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {activeTab === "songs"
                    ? "Enter Song details"
                    : "Enter Video Title"}
                </h2>
                {activeTab === "videos" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Select Music
                      </label>
                      <select className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-gray-400 focus:outline-none focus:border-[#A67102]">
                        <option>name</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setUploadStep("tracks")}
                      className="w-full px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Name of Single, Ep or Album
                        </label>
                        <input
                          type="text"
                          placeholder="name"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Copyright Holder
                          </label>
                          <input
                            type="text"
                            placeholder="holder"
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Copyright Year
                          </label>
                          <select id='date-dropdown' className="w-full bg-[#0D0B07] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">
                            {Yearselection()}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Production Holder
                          </label>
                          <input
                            type="text"
                            placeholder="holder"
                            className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Production Year
                          </label>
                          <select className="w-full bg-[#0D0B07] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#A67102]">
                            {Yearselection()}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Record Label
                        </label>
                        <input
                          type="text"
                          placeholder="holder"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Featuring Artists
                        </label>
                        <input
                          type="text"
                          placeholder="name"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">
                          Written By
                        </label>
                        <input
                          type="text"
                          placeholder="writer"
                          className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#A67102]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setIsUploading(false)}
                        className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setUploadStep("tracks")}
                        className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                      >
                        Continue
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {uploadStep === "tracks" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">
                  {activeTab === "songs"
                    ? "Upload Tracks"
                    : "Enter Song details"}
                </h2>
                {activeTab === "videos" ? (
                  <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-96">
                    <svg
                      className="w-24 h-24 text-[#A67102] mb-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="text-white text-center mb-4 text-lg">
                      Drag and drop files to upload
                    </p>
                    <p className="text-gray-400 text-sm mb-6">OR</p>
                    <button className="px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                      Upload Cover
                    </button>
                    <p className="text-gray-500 text-xs mt-6">
                      only mp4 format is accepted
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Upload Area */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-8 flex flex-col items-center justify-center min-h-64">
                      <svg
                        className="w-16 h-16 text-[#A67102] mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="text-white text-center mb-4">
                        Drag and drop files to upload
                      </p>
                      <p className="text-gray-400 text-sm mb-4">OR</p>
                      <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium">
                        Upload Cover
                      </button>
                      <p className="text-gray-500 text-xs mt-4">
                        only mp3 format is accepted
                      </p>
                    </div>

                    {/* Track List */}
                    <div className="bg-[#1a1a1a] rounded-lg border border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Track List</h3>
                        <button className="text-[#A67102] hover:text-[#8a5e02] text-sm font-medium">
                          + Add Track(s)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("details")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setUploadStep("schedule")}
                    className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {uploadStep === "schedule" && (
              <ScheduleStep
                onBack={() => setUploadStep("tracks")}
                onContinue={(data) => {
                  setScheduleData(data);
                  setUploadStep("platforms");
                }}
              />
            )}

            {uploadStep === "platforms" && (
              <PlatformsStep
                type={activeTab}
                onBack={() => setUploadStep("schedule")}
                onContinue={(data) => {
                  setPlatformsData(data);
                  setUploadStep("review");
                }}
              />
            )}

            {uploadStep === "review" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Review</h2>
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <p className="text-gray-400">
                    Review your upload details before submitting
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setUploadStep("platforms")}
                    className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedSong ? (
          // Song Detail View
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedSong(null)}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium border border-[#A67102]">
                Lyrics
              </button>
            </div>

            {/* Cover Image */}
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop"
                alt="Smoke"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Song Title */}
            <h1 className="text-3xl font-bold mb-6">Smoke</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setSongDetailTab("songs")}
                className={`pb-4 font-semibold transition-colors ${
                  songDetailTab === "songs"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Songs
              </button>
              <button
                onClick={() => setSongDetailTab("about")}
                className={`pb-4 font-semibold transition-colors ${
                  songDetailTab === "about"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                About
              </button>
            </div>

            {/* Tab Content */}
            {songDetailTab === "songs" && (
              <div>
                <div className="flex justify-end mb-4">
                  <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium">
                    Upload Video
                  </button>
                </div>

                <div className="space-y-3">
                  {[1, 2].map((track) => (
                    <div
                      key={track}
                      className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-4 border border-gray-700"
                    >
                      <img
                        src="https://i.pravatar.cc/60"
                        alt="Track"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-white">Song Title</p>
                      </div>
                      <p className="text-gray-400 text-sm">3:24</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {songDetailTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Bio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Runty is a passionate musician whose sound blends afro with
                    heartfelt lyrics and raw storytelling. With a love for
                    creating music that moves hearts, Runty channels inspiration
                    from everyday experiences, faith, and culture. Whether
                    performing live or recording in the studio, Runty brings
                    authenticity, emotion, and a message that resonates with
                    every beat.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Performed By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : selectedVideo ? (
          // Video Detail View
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-400 hover:text-white flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>
              <button className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium border border-[#A67102]">
                Lyrics
              </button>
            </div>

            {/* Cover Image */}
            <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop"
                alt="Smoke"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Video Title */}
            <h1 className="text-3xl font-bold mb-6">Smoke</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setVideoDetailTab("videos")}
                className={`pb-4 font-semibold transition-colors ${
                  videoDetailTab === "videos"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setVideoDetailTab("about")}
                className={`pb-4 font-semibold transition-colors ${
                  videoDetailTab === "about"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                About
              </button>
            </div>

            {/* Tab Content */}
            {videoDetailTab === "videos" && (
              <div className="space-y-3">
                {[1, 2].map((video) => (
                  <div
                    key={video}
                    className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-4 border border-gray-700"
                  >
                    <img
                      src="https://i.pravatar.cc/60"
                      alt="Video"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-white">Video Title</p>
                    </div>
                    <p className="text-gray-400 text-sm">3:24</p>
                  </div>
                ))}
              </div>
            )}

            {videoDetailTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Bio</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Runty is a passionate musician whose sound blends afro with
                    heartfelt lyrics and raw storytelling. With a love for
                    creating music that moves the soul, he began his journey in
                    [year or place], drawing inspiration from everyday
                    experiences, faith, and culture. Whether performing live or
                    recording in the studio, Runty brings authenticity, emotion,
                    and a message that resonates with every beat.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Performed By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Written By</h3>
                  <p className="text-gray-400 text-sm">
                    shqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN
                    CHGCHBJNSAMBDCKMZshqhzcbysDGHKJNERVKBJSDN CHGCHBJNSAMBDCKMZ
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
      
          <>
            <h1 className="text-2xl font-semibold mb-6">MEDIA</h1>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("songs")}
                className={`pb-4 font-semibold transition-colors                   w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[550px] lg:h-[52px] ${
                  activeTab === "songs"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Songs
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`pb-4 font-semibold transition-colors  w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[550px] lg:h-[52px] ${
                  activeTab === "videos"
                    ? "text-white border-b-2 border-[#A67102]"
                    : "text-gray-400"
                }`}
              >
                Videos
              </button>
            </div>

            {/* Upload Button */}
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

                <div className="text-sm text-gray-400 mb-4">
                  Count: {songs.length}
                </div>

                {/* Songs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {songs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => setSelectedSong(song.id)}
                      className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
                        <img
                          src={song.image}
                          alt={song.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 bg-[#A67102] text-white p-2 rounded-lg hover:bg-[#8a5e02] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-1">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === "videos" && (
              <>
                <FilterButtons type="videos" />

                <div className="text-sm text-gray-400 mb-4">
                  Count: {videos.length}
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video.id)}
                      className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:border-[#A67102] border border-transparent transition-colors group cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative w-full aspect-square overflow-hidden bg-gray-800">
                        <img
                          src={video.image}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 bg-[#A67102] text-white p-2 rounded-lg hover:bg-[#8a5e02] transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-white mb-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-400">{video.artist}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};