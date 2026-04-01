import React from "react";
import { ArrowUpRight, FileText, Video, LayoutDashboard, BarChart2, Music, Megaphone, User, ThumbsUp, Download, MapPin, Radio, Clock, Trash2, Search } from "lucide-react";



export const JobsPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = React.useState<
    "pending" | "completed" | "disputes"
  >("pending");
  const [activeFilterTab, setActiveFilterTab] = React.useState<
    "all" | "influencers" | "radio" | "tv"
  >("all");
  const [confirmationModal, setConfirmationModal] = React.useState<{
    isOpen: boolean;
    jobId: number | null;
  }>({ isOpen: false, jobId: null });
  const [disputeModal, setDisputeModal] = React.useState<{
    isOpen: boolean;
    jobId: number | null;
  }>({ isOpen: false, jobId: null });

  const pendingJobs = [
    {
      id: 1,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=1",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 50,
    },
    {
      id: 2,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=2",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 70,
    },
    {
      id: 3,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=3",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 70,
    },
    {
      id: 4,
      type: "influencer",
      influencer: {
        name: "Influencer",
        avatar: "https://i.pravatar.cc/80?img=4",
      },
      description:
        "I want you to be able to push my music in your own creative way.",
      songs: [
        { title: "Song Title", duration: "3:24", format: "mp3" },
        { title: "Song Title", duration: "3:40", format: "mp4" },
      ],
      completion: 50,
    },
    {
      id: 5,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "12/04/25 - 13/05/26",
      time: "12:00AM - 6:00AM",
    },
    {
      id: 6,
      type: "tv",
      station: { name: "MITV", logo: "https://i.pravatar.cc/80?img=11" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=21", name: "Arayioba..." },
        { avatar: "https://i.pravatar.cc/60?img=22", name: "Arayioba..." },
        { avatar: "https://i.pravatar.cc/60?img=23", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
  ];

  const completedJobs = [
    {
      id: 101,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
    {
      id: 102,
      type: "radio",
      station: { name: "95.6 FM", logo: "https://i.pravatar.cc/80?img=10" },
      description:
        "I want you to be able to push my music in your own creative way yeye syukefdvh hf...",
      song: { title: "Song Title", duration: "3:24", format: "mp3" },
      presenters: [
        { avatar: "https://i.pravatar.cc/60?img=20", name: "Arayioba..." },
      ],
      date: "Monday",
      time: "12:00AM - 6:00AM",
    },
  ];

  const filteredJobs = pendingJobs.filter((job) => {
    if (activeFilterTab === "all") return true;
    if (activeFilterTab === "influencers") return job.type === "influencer";
    if (activeFilterTab === "radio") return job.type === "radio";
    if (activeFilterTab === "tv") return job.type === "tv";
    return true;
  });
  const tabs = [
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ];
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">JOBS</h1>

        {/* Main Tabs */}
        <div className="flex  bg-transparent  lg:gap-25 gap-8 border-b border-gray-700 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as "pending" | "completed")}
              className={`
          w-[120px] h-[120px]
        md:w-[50px] md:h-[50px]
        lg:w-[450px] lg:h-[52px]
       rounded-none
        bg-transparent
          text-white
           data-[state=active]:bg-transparent
        data-[state=active]:border-b-amber-500 " ${activeMainTab === tab.id
                  ? "text-white border-b-2 border-[#A67102]"
                  : "text-gray-400"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeMainTab === "pending" && (
          <>
            {/* Filter Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveFilterTab("all")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "all"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilterTab("influencers")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "influencers"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                Influencers
              </button>
              <button
                onClick={() => setActiveFilterTab("radio")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "radio"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                Radio Stations
              </button>
              <button
                onClick={() => setActiveFilterTab("tv")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilterTab === "tv"
                    ? "bg-[#A67102] text-white"
                    : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                TV Stations
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700"
                >
                  {job.type === "influencer" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Influencer Info */}
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={job.influencer?.avatar}
                          alt={job.influencer?.name}
                          className="w-20 h-20 rounded-full mb-3"
                        />
                        <p className="text-white font-medium">Influencer</p>
                      </div>

                      {/* Description */}
                      <div className="flex items-center">
                        <div className="w-full bg-[#2a2a2a] rounded-lg p-4 border border-[#A67102]">
                          <p className="text-gray-300 text-sm">
                            {job.description}
                          </p>
                        </div>
                      </div>

                      {/* Songs and Actions */}
                      <div className="space-y-3">
                        {job.songs?.map((song, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="bg-white rounded-lg p-2 flex-shrink-0">
                              <div className="w-16 h-16 flex items-center justify-center">
                                <div className="text-red-600 font-bold text-xs">
                                  fm 92.5
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 bg-[#2a2a2a] rounded-lg p-3">
                              <p className="text-white text-sm font-medium mb-1">
                                {song.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-400">
                                <span>{song.duration}</span>
                                <span>{song.format}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <div className="bg-[#A67102] text-white text-xs font-bold px-3 py-1 rounded">
                                {job.completion}%
                              </div>
                              {idx === 0 && (
                                <button
                                  onClick={() =>
                                    setConfirmationModal({
                                      isOpen: true,
                                      jobId: job.id,
                                    })
                                  }
                                  className="px-4 py-2 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors text-sm font-medium"
                                >
                                  Accept
                                </button>
                              )}
                              {idx === 1 && (
                                <button
                                  onClick={() =>
                                    setDisputeModal({
                                      isOpen: true,
                                      jobId: job.id,
                                    })
                                  }
                                  className="px-4 py-2 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors text-sm font-medium"
                                >
                                  Dispute
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Station Info */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                          <div className="text-red-600 font-bold text-sm">
                            fm 92.5
                          </div>
                        </div>
                        <p className="text-white font-medium">
                          {job.station?.name}
                        </p>
                      </div>

                      {/* Song Info */}
                      <div className="flex items-center gap-3">
                        <div className="bg-white rounded-lg p-2 flex-shrink-0">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <div className="text-red-600 font-bold text-xs">
                              fm 92.5
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium mb-1">
                            {job.song?.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{job.song?.duration}</span>
                            <span>{job.song?.format}</span>
                          </div>
                        </div>
                      </div>

                      {/* Presenters */}
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex -space-x-2 mb-2">
                          {job.presenters?.map((presenter, idx) => (
                            <img
                              key={idx}
                              src={presenter.avatar}
                              alt={presenter.name}
                              className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]"
                            />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400">
                          {job.presenters?.[0]?.name}
                        </p>
                      </div>

                      {/* Date/Time and Description */}
                      <div>
                        <div className="text-right mb-3">
                          <p className="text-white text-sm mb-1">{job.date}</p>
                          <p className="text-gray-400 text-xs">{job.time}</p>
                        </div>
                        <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#A67102]">
                          <p className="text-gray-300 text-xs">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeMainTab === "completed" && (
          <div className="space-y-4">
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700"
              >
                <div className="text-center mb-4">
                  <span className="inline-block bg-[#2a2a2a] text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Completed
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {/* Station Info */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
                      <div className="text-red-600 font-bold text-sm">
                        fm 92.5
                      </div>
                    </div>
                    <p className="text-white font-medium">{job.station.name}</p>
                  </div>

                  {/* Song Info */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 flex-shrink-0">
                      <div className="w-16 h-16 flex items-center justify-center">
                        <div className="text-red-600 font-bold text-xs">
                          fm 92.5
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {job.song.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{job.song.duration}</span>
                        <span>{job.song.format}</span>
                      </div>
                    </div>
                  </div>

                  {/* Presenters */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex -space-x-2 mb-2">
                      {job.presenters.map((presenter, idx) => (
                        <img
                          key={idx}
                          src={presenter.avatar}
                          alt={presenter.name}
                          className="w-12 h-12 rounded-full border-2 border-[#1a1a1a]"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      {job.presenters[0].name}
                    </p>
                  </div>

                  {/* Date/Time and Description */}
                  <div>
                    <div className="text-right mb-3">
                      <p className="text-white text-sm mb-1">{job.date}</p>
                      <p className="text-gray-400 text-xs">{job.time}</p>
                    </div>
                    <div className="bg-[#2a2a2a] rounded-lg p-3 border border-[#A67102]">
                      <p className="text-gray-300 text-xs">{job.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMainTab === "disputes" && (
          <div className="text-center py-12">
            <p className="text-gray-400">No disputes at the moment</p>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmationModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() =>
                  setConfirmationModal({ isOpen: false, jobId: null })
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Confirmation
              </h2>
              <p className="text-gray-300 text-center mb-8">
                Are you sure you want to accept that [influencer] has completed
                50% of the project?
              </p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                  Accept Request
                </button>
                <button
                  onClick={() =>
                    setConfirmationModal({ isOpen: false, jobId: null })
                  }
                  className="flex-1 px-6 py-3 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
                >
                  Decline Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dispute Modal */}
        {disputeModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setDisputeModal({ isOpen: false, jobId: null })}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Dispute
              </h2>
              <p className="text-gray-300 text-center mb-8">
                You'll have to send us email, providing evidence of
                communication and receipts
              </p>
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium">
                  Proceed to Email
                </button>
                <button
                  onClick={() =>
                    setDisputeModal({ isOpen: false, jobId: null })
                  }
                  className="flex-1 px-6 py-3 bg-transparent border border-gray-600 text-white rounded-lg hover:bg-[#2a2a2a] transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};