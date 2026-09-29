import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Fm from "../../../assets/influencer/Fm.png";
import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import { Copy, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import type { GetInfluencerRequest } from "@/types/influencer/requests";
import {
  fetchInfluencerRequests,
  updateRequestStatus,
} from "@/services/influencer/requests/requestsService";
import { AppContext } from "@/Context/AppContext";
import {
  SOCIALS,
  apiErrorMessage,
  formatDuration,
  formatNaira,
  platformIcon,
} from "@/lib/influencer";

// The dashboard inbox is only the requests still awaiting a decision
const INBOX_STATUSES = "PENDING,PENDED";

function InfluencerDashboard() {
  const context = useContext(AppContext);
  const [requests, setRequests] = useState<GetInfluencerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string>("all");
  const [actingOn, setActingOn] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Filter server-side so paging stays correct per tab
      const response = await fetchInfluencerRequests(currentPage, 10, {
        status: INBOX_STATUSES,
        platform,
      });
      setRequests(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load your requests"));
    } finally {
      setLoading(false);
    }
  }, [currentPage, platform]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Switching tabs restarts paging, otherwise page 3 of one tab can be empty in another
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    setCurrentPage(1);
  };

  const handleStatus = async (
    id: string,
    status: "ACCEPTED" | "DECLINED" | "PENDED"
  ) => {
    try {
      setActingOn(id);
      setError(null);
      await updateRequestStatus(id, { status });
      // Accepted/declined requests leave the inbox; pended ones stay
      await loadRequests();
    } catch (err) {
      setError(apiErrorMessage(err, "Could not update the request"));
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
      /* clipboard unavailable — nothing useful to show the user */
    }
  };

  const firstName = context?.user?.firstname;

  return (
    <div className="px-1">
      <div>
        <h1>Hello, {firstName ?? "there"}</h1>
      </div>

      {error && (
        <p className="mt-4 text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}

      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs
          value={platform}
          onValueChange={handlePlatformChange}
          className="w-full"
        >
          <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
            {SOCIALS.map((social) => (
              <TabsTrigger
                key={social.value}
                value={social.value}
                className="
        w-[45px] h-[45px]
        md:w-[50px] md:h-[50px]
        lg:w-[55px] lg:h-[55px]
        rounded-xl
        bg-neutral-800
        border
        border-neutral-700
        data-[state=active]:bg-amber-500
        data-[state=active]:border-amber-600
      "
              >
                <img
                  src={social.icon}
                  alt={social.value}
                  className="w-6 h-6 object-contain"
                />
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={platform}>
            {loading ? (
              <p className="text-white mt-10">Loading requests...</p>
            ) : requests.length === 0 ? (
              <p className="text-white mt-10">No pending requests.</p>
            ) : (
              requests.map((req) => {
                const busy = actingOn === req.id;
                return (
                  <Card
                    key={req.id}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                          <div className="shrink-0 flex items-center gap-3">
                            <img
                              src={platformIcon(req.platform)}
                              alt={req.platform}
                            />
                            <span className="text-white text-sm">
                              {formatNaira(req.amount)}
                            </span>
                            {req.status === "PENDED" && (
                              <span className="text-xs text-amber-500">
                                On hold
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <Button
                              disabled={busy}
                              onClick={() => handleStatus(req.id, "PENDED")}
                              className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                            >
                              Pend
                            </Button>
                            <Button
                              disabled={busy}
                              onClick={() => handleStatus(req.id, "DECLINED")}
                              className="bg-[#743636] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                            >
                              Decline
                            </Button>
                            <Button
                              disabled={busy}
                              onClick={() => handleStatus(req.id, "ACCEPTED")}
                              className="bg-[#4D7522] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] disabled:opacity-50"
                            >
                              {busy ? "..." : "Accept"}
                            </Button>
                          </div>
                        </div>

                        <div className="mt-6 lg:mt-15 grid grid-cols-1 lg:grid-cols-6 gap-3 p-1 text-white text-sm md:text-base">
                          <div>
                            <span>
                              <img
                                src={req.artist.profilePicture || ProfilePic}
                                alt={req.artist.username}
                                className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-full object-cover"
                              />
                            </span>{" "}
                            <p className="pt-1">
                              {req.artist.firstname} {req.artist.surname}
                            </p>{" "}
                          </div>
                          <div className="lg:col-span-3">
                            <p className="flex justify-between items-center mb-3 w-full">
                              <span>Email: {req.artist.email}</span>
                              <button
                                type="button"
                                aria-label="Copy artist email"
                                onClick={() => copyEmail(req.id, req.artist.email)}
                                className="mr-4 lg:mr-15 hover:opacity-70"
                              >
                                {copiedId === req.id ? (
                                  <Check className="text-green-500" />
                                ) : (
                                  <Copy />
                                )}
                              </button>
                            </p>

                            <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[429px] overflow-y-auto">
                              {req.message}
                            </div>
                          </div>
                          <div className="lg:col-span-2">
                            <span>
                              <img src={Fm} alt="" />
                            </span>
                            {req.media ? (
                              <div className="flex justify-between">
                                <div className="pt-1">
                                  <span className="pt-1">
                                    {req.media.title ?? "Untitled"}
                                  </span>
                                  <p>{formatDuration(req.media.duration)}</p>
                                </div>
                                <p className="pt-1">{req.media.type ?? ""}</p>
                              </div>
                            ) : (
                              <p className="pt-1 text-gray-400">
                                No track attached
                              </p>
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
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-neutral-800 border border-neutral-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>

            <span className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
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

export default InfluencerDashboard;
