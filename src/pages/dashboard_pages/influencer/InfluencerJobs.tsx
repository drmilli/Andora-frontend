import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fm from "../../../assets/influencer/Fm.png";
import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import { Copy, Check, Download, MessageSquareReply, ChevronLeft, ChevronRight } from "lucide-react";
import { ChartRadialText } from "@/components/charts/ChartRadialText";
import type { GetInfluencerRequest } from "@/types/influencer/requests";
import {
  disputeRequest,
  fetchInfluencerRequests,
  updateRequestProgress,
  updateRequestStatus,
} from "@/services/influencer/requests/requestsService";
import {
  apiErrorMessage,
  formatDuration,
  formatNaira,
  platformIcon,
} from "@/lib/influencer";

// Tab label -> the status filter the API expects
const TABS = [
  { label: "Accepted", status: "ACCEPTED" },
  { label: "Pending", status: "PENDING,PENDED" },
  { label: "Completed", status: "COMPLETED,DISPUTED" },
] as const;

const PERCENTAGES = [25, 50, 70, 100];

function InfluencerJobs() {
  const [tab, setTab] = useState<string>("Accepted");
  const [jobs, setJobs] = useState<GetInfluencerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actingOn, setActingOn] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Progress chosen in the Review dialog, per job
  const [draftProgress, setDraftProgress] = useState<Record<string, number>>({});
  const [disputeReason, setDisputeReason] = useState<Record<string, string>>({});

  const activeStatus =
    TABS.find((t) => t.label === tab)?.status ?? "ACCEPTED";

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchInfluencerRequests(page, 10, { status: activeStatus });
      setJobs(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load your jobs"));
    } finally {
      setLoading(false);
    }
  }, [page, activeStatus]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const changeTab = (value: string) => {
    setTab(value);
    setPage(1);
  };

  const handleStatus = async (
    id: string,
    status: "ACCEPTED" | "DECLINED" | "PENDED"
  ) => {
    try {
      setActingOn(id);
      setError(null);
      await updateRequestStatus(id, { status });
      await loadJobs();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not update the job"));
    } finally {
      setActingOn(null);
    }
  };

  const submitProgress = async (job: GetInfluencerRequest) => {
    const progress = draftProgress[job.id] ?? job.progress;
    try {
      setActingOn(job.id);
      setError(null);
      await updateRequestProgress(job.id, { progress });
      await loadJobs();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not submit your progress"));
    } finally {
      setActingOn(null);
    }
  };

  const submitDispute = async (job: GetInfluencerRequest) => {
    const reason = (disputeReason[job.id] ?? "").trim();
    if (!reason) {
      setError("Please describe the problem before submitting a dispute.");
      return;
    }
    try {
      setActingOn(job.id);
      setError(null);
      await disputeRequest(job.id, { reason });
      setDisputeReason((d) => ({ ...d, [job.id]: "" }));
      await loadJobs();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not submit the dispute"));
    } finally {
      setActingOn(null);
    }
  };

  const copyEmail = async (id: string, email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="px-10">
      {error && (
        <p className="mt-4 text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs value={tab} onValueChange={changeTab} className="w-full">
          <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
            {TABS.map((t) => (
              <TabsTrigger
                key={t.label}
                value={t.label}
                className="
        w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[250px] lg:h-[52px]
       rounded-none
        bg-transparent
          text-white
           data-[state=active]:bg-transparent
        data-[state=active]:border-b-amber-500 "
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tab}>
            {loading ? (
              <p className="text-white mt-10">Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p className="text-white mt-10">Nothing here yet.</p>
            ) : (
              jobs.map((job) => {
                const busy = actingOn === job.id;
                const progress = draftProgress[job.id] ?? job.progress;
                return (
                  <Card
                    key={job.id}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                          <div className="shrink-0 flex items-center gap-3">
                            <img src={platformIcon(job.platform)} alt={job.platform} />
                            <span className="text-white text-sm">
                              {formatNaira(job.amount)}
                            </span>
                          </div>

                          {job.status === "ACCEPTED" ? (
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                              <Button
                                asChild={!!job.media}
                                disabled={!job.media}
                                className="bg-[#0D4787] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base disabled:opacity-50"
                              >
                                {job.media ? (
                                  <a
                                    href={job.media.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                  >
                                    <Download /> Download
                                  </a>
                                ) : (
                                  <span>
                                    <Download /> Download
                                  </span>
                                )}
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-[#497718] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base">
                                    <MessageSquareReply /> Review
                                  </Button>
                                </DialogTrigger>

                                <DialogContent className="max-w-[600px] sm:max-w-[425px] border-0 bg-[#000000] overflow-y-auto w-full shadow-sm shadow-gray-400">
                                  <DialogHeader className="pt-3">
                                    <h1 className="text-2xl text-white text-center">
                                      Review
                                    </h1>
                                  </DialogHeader>
                                  <DialogDescription asChild>
                                    <div className="space-y-4 mt-4 text-white text-sm md:text-base">
                                      <ChartRadialText value={progress} />
                                      <span className="flex justify-center">
                                        Hey! your job is {progress}% Complete
                                      </span>
                                    </div>
                                  </DialogDescription>

                                  <DialogFooter className="text-white">
                                    <div className="relative w-full flex flex-col items-center mt-6">
                                      <div className="w-full flex justify-between z-10 px-2 mt-2">
                                        {PERCENTAGES.map((p) => (
                                          <Button
                                            key={p}
                                            type="button"
                                            onClick={() =>
                                              setDraftProgress((d) => ({
                                                ...d,
                                                [job.id]: p,
                                              }))
                                            }
                                            disabled={p < job.progress}
                                            title={
                                              p < job.progress
                                                ? "Progress cannot go backwards"
                                                : undefined
                                            }
                                            className={`w-[60px] h-[45px] border-2 disabled:opacity-40
                  ${progress === p ? "bg-[#A67102] text-white border-0" : "border-[#A67102]"}
                `}
                                          >
                                            {p}%
                                          </Button>
                                        ))}
                                      </div>

                                      <Button
                                        disabled={busy || progress === job.progress}
                                        onClick={() => submitProgress(job)}
                                        className="bg-[#A67102] w-full md:w-[150px] lg:w-full h-[48px] md:h-[50px] lg:h-[52px] mt-10 text-xs sm:text-base disabled:opacity-50"
                                      >
                                        {busy
                                          ? "Submitting..."
                                          : progress === 100
                                          ? "Complete job & get paid"
                                          : "Submit Review"}
                                      </Button>
                                    </div>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base">
                                    Dispute
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[600px] sm:max-w-[425px] border-0 bg-[#000000] w-full shadow-sm shadow-gray-400">
                                  <DialogHeader className="pt-3">
                                    <h1 className="text-2xl text-white text-center">
                                      Raise a dispute
                                    </h1>
                                  </DialogHeader>
                                  <DialogDescription asChild>
                                    <div className="mt-4 text-white text-sm">
                                      <label
                                        htmlFor={`dispute-${job.id}`}
                                        className="mb-2 block"
                                      >
                                        What went wrong?
                                      </label>
                                      <textarea
                                        id={`dispute-${job.id}`}
                                        rows={4}
                                        value={disputeReason[job.id] ?? ""}
                                        onChange={(e) =>
                                          setDisputeReason((d) => ({
                                            ...d,
                                            [job.id]: e.target.value,
                                          }))
                                        }
                                        className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
                                        placeholder="Describe the problem for the review team"
                                      />
                                    </div>
                                  </DialogDescription>
                                  <DialogFooter>
                                    <Button
                                      disabled={busy}
                                      onClick={() => submitDispute(job)}
                                      className="bg-[#A67102] w-full h-[48px] disabled:opacity-50"
                                    >
                                      {busy ? "Submitting..." : "Submit dispute"}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          ) : job.status === "PENDING" || job.status === "PENDED" ? (
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                              <Button
                                disabled={busy}
                                onClick={() => handleStatus(job.id, "PENDED")}
                                className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                              >
                                Pend
                              </Button>
                              <Button
                                disabled={busy}
                                onClick={() => handleStatus(job.id, "DECLINED")}
                                className="bg-[#743636] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                              >
                                Decline
                              </Button>
                              <Button
                                disabled={busy}
                                onClick={() => handleStatus(job.id, "ACCEPTED")}
                                className="bg-[#4D7522] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                              >
                                Accept
                              </Button>
                            </div>
                          ) : (
                            <p className="text-white self-center">
                              {job.status === "DISPUTED" ? "Disputed" : "Completed"}
                            </p>
                          )}
                        </div>

                        <div className="mt-6 lg:mt-15 grid grid-cols-1 lg:grid-cols-6 gap-3 p-1 text-white text-sm md:text-base">
                          <div>
                            <span>
                              <img
                                src={job.artist.profilePicture || ProfilePic}
                                alt={job.artist.username}
                                className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-full object-cover"
                              />
                            </span>{" "}
                            <p className="pt-1">
                              {job.artist.firstname} {job.artist.surname}
                            </p>{" "}
                          </div>
                          <div className="lg:col-span-3">
                            <p className="flex justify-between items-center mb-3 w-full">
                              <span>Email: {job.artist.email}</span>
                              <button
                                type="button"
                                aria-label="Copy artist email"
                                onClick={() => copyEmail(job.id, job.artist.email)}
                                className="mr-4 lg:mr-15 hover:opacity-70"
                              >
                                {copiedId === job.id ? (
                                  <Check className="text-green-500" />
                                ) : (
                                  <Copy />
                                )}
                              </button>
                            </p>

                            <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[429px] overflow-y-auto">
                              {job.message}
                            </div>
                          </div>
                          <div className="lg:col-span-2">
                            <span>
                              <img src={Fm} alt="" />
                            </span>
                            {job.media ? (
                              <div className="flex justify-between">
                                <div className="pt-1">
                                  <span className="pt-1">
                                    {job.media.title ?? "Untitled"}
                                  </span>
                                  <p>{formatDuration(job.media.duration)}</p>
                                </div>
                                <p className="pt-1">{job.media.type ?? ""}</p>
                              </div>
                            ) : (
                              <p className="pt-1 text-gray-400">No track attached</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-neutral-800 border border-neutral-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>
            <span className="text-white text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="bg-neutral-800 border border-neutral-700 disabled:opacity-40"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfluencerJobs;
