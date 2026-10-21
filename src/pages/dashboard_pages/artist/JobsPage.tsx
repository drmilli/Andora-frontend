import React from "react";
import {
  disputeSentRequest,
  fetchSentPromotionRequests,
} from "@/services/artist/promotions";
import type { GetInfluencerRequest } from "@/types/influencer/requests";
import { apiErrorMessage, formatDuration, formatNaira } from "@/lib/influencer";



export const JobsPage: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = React.useState<
    "pending" | "completed" | "disputes"
  >("pending");
  const [activeFilterTab, setActiveFilterTab] = React.useState<
    "all" | "influencers" | "radio" | "tv"
  >("all");
  const [confirmationModal, setConfirmationModal] = React.useState<{
    isOpen: boolean;
    jobId: string | null;
  }>({ isOpen: false, jobId: null });
  const [disputeModal, setDisputeModal] = React.useState<{
    isOpen: boolean;
    jobId: string | null;
  }>({ isOpen: false, jobId: null });

  const [promotions, setPromotions] = React.useState<GetInfluencerRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [disputeReason, setDisputeReason] = React.useState("");
  const [acting, setActing] = React.useState(false);

  // The artist's "jobs" are the promotions they have paid for
  const STATUS_BY_TAB: Record<string, string> = {
    pending: "PENDING,PENDED,ACCEPTED",
    completed: "COMPLETED",
    disputes: "DISPUTED",
  };

  const load = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchSentPromotionRequests(1, 50, STATUS_BY_TAB[activeMainTab]);
      setPromotions(res.data);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load your jobs"));
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMainTab]);

  React.useEffect(() => {
    load();
  }, [load]);

  // Shape each promotion into the card this page already renders
  const toJob = (r: GetInfluencerRequest) => ({
    id: r.id,
    type: "influencer" as const,
    influencer: {
      name: `${r.influencer.firstname} ${r.influencer.surname}`.trim() || r.influencer.username,
      avatar:
        r.influencer.profilePicture ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(r.influencer.username)}&background=A67102&color=fff`,
    },
    description: r.message,
    amount: r.amount,
    platform: r.platform,
    status: r.status,
    songs: r.media
      ? [
          {
            title: r.media.title ?? "Untitled",
            duration: formatDuration(r.media.duration),
            format: r.media.type ?? "",
          },
        ]
      : [],
    completion: r.progress,
  });

  const pendingJobs = promotions.map(toJob);
  const completedJobs = pendingJobs;

  const submitDispute = async () => {
    const id = disputeModal.jobId;
    if (!id || !disputeReason.trim()) {
      setError("Describe the problem before submitting a dispute.");
      return;
    }
    try {
      setActing(true);
      setError(null);
      await disputeSentRequest(String(id), { reason: disputeReason.trim() });
      setDisputeModal({ isOpen: false, jobId: null });
      setDisputeReason("");
      await load();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not submit the dispute"));
    } finally {
      setActing(false);
    }
  };

  // Radio and TV promotions need the station backend, which does not exist yet,
  // so those tabs are intentionally empty rather than showing influencer jobs.
  const filteredJobs =
    activeFilterTab === "radio" || activeFilterTab === "tv" ? [] : pendingJobs;
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

        {loading && <p className="text-gray-400 mb-3">Loading your jobs...</p>}
        {error && <p className="text-red-400 text-sm mb-3" role="alert">{error}</p>}

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
                  {(
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
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeMainTab === "completed" && (
          <div className="space-y-4">
            {completedJobs.length === 0 && (
              <p className="text-gray-400">No completed jobs yet.</p>
            )}
            {completedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5"
              >
                <div className="flex items-start gap-4 flex-wrap">
                  <img
                    src={job.influencer.avatar}
                    alt={job.influencer.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-[220px]">
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <p className="text-white font-medium">{job.influencer.name}</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wide">
                          {job.platform} &bull; {formatNaira(job.amount)}
                        </p>
                      </div>
                      <span className="text-xs text-gray-300">{job.status}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{job.description}</p>
                    {job.songs.map((song, idx) => (
                      <p key={idx} className="text-gray-500 text-xs mt-2">
                        {song.title} &bull; {song.duration} &bull; {song.format}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeMainTab === "disputes" && (
          <div className="text-center py-12">
            {pendingJobs.length === 0 ? (
              <p className="text-gray-400">No disputes at the moment</p>
            ) : (
              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <div key={job.id} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
                    <p className="text-white font-medium">{job.influencer.name}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">
                      {job.platform} &bull; {formatNaira(job.amount)}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">{job.description}</p>
                  </div>
                ))}
              </div>
            )}
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
                <button
                  onClick={submitDispute}
                  disabled={acting || !disputeReason.trim()}
                  className="flex-1 px-6 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium disabled:opacity-50"
                >
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
