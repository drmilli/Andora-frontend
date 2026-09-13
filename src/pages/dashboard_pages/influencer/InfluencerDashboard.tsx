import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Facebook from "../../../assets/socials/Facebook.png";
import Instagram from "../../../assets/socials/Instagram.png";
import Snapchat from "../../../assets/socials/Snapchat.png";
import Twitter from "../../../assets/socials/X.png";
import Youtube from "../../../assets/socials/Youtube.png";
import Tiktok from "../../../assets/socials/Tiktok.png";
import All from "../../../assets/socials/All.png";
import Fm from "../../../assets/influencer/Fm.png";
import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import { Copy, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { GetInfluencerRequest } from "@/types/influencer/requests";
import { fetchInfluencerRequests } from "@/services/influencer/requests/requestsService";

const socials = [
  { icon: All, value: "all" },
  { icon: Twitter, value: "twitter" },
  { icon: Instagram, value: "instagram" },
  { icon: Facebook, value: "facebook" },
  { icon: Youtube, value: "youtube" },
  { icon: Snapchat, value: "snapchat" },
  { icon: Tiktok, value: "tiktok" },
];

function InfluencerDashboard() {
  const [requests, setRequests] = useState<GetInfluencerRequest[]>([]);
  const [loading, setLoading] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch requests whenever the page changes
  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const response = await fetchInfluencerRequests(currentPage, 10);
        console.log("API response:", response);

        setRequests(response.data); 
        setTotalPages(response.totalPages); 
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, [currentPage]); // <-- re-runs when currentPage changes

  // Simple helpers for Previous / Next
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


  return (
    <div className='px-1 '>
      <div>
        <h1>Hello,Issac</h1>
      </div>
      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
            {socials.map((social) => (
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
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </TabsTrigger>
            ))}
          </TabsList>
          {socials.map((social) => (
            <TabsContent value={social.value} key={social.value}>
              {loading ? (
                <p className="text-white mt-10">Loading requests...</p>
              ) : requests
                .filter(
                  (req) =>
                    social.value === "all" || req.platform.toLowerCase() === social.value
                )
                .length === 0 ? (
                <p className="text-white mt-10">No requests found.</p>
              ) : (
                requests
                  .filter(
                    (req) =>
                      social.value === "all" || req.platform.toLowerCase() === social.value
                  )
                  .map((req) => (
                    <Card
                      key={req.id}
                      className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                    >
                      <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1">
                          <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                            <div className="shrink-0">
                              <img
                                src={
                                  socials.find(
                                    (s) => s.value === req.platform.toLowerCase()
                                  )?.icon ?? All
                                }
                                alt={req.platform}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                              <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px]">
                                Pend
                              </Button>
                              <Button className="bg-[#743636] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px]">
                                Decline
                              </Button>
                              <Button className="bg-[#4D7522] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px]">
                                Accept
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
                              <p className="pt-1">{req.artist.firstname} {req.artist.surname}</p>{" "}
                            </div>
                            <div className="lg:col-span-3">
                              <p className="flex justify-between items-center mb-3 w-full">
                                <span>Email: {req.artist.email}</span>
                                <Copy className="mr-4 lg:mr-15" />
                              </p>

                              <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[429px]">
                                {req.message}
                              </div>
                            </div>
                            <div className="lg:col-span-2">
                              <span>
                                <img src={Fm} alt="" />
                              </span>
                              <div className="flex justify-between">
                                <div className="pt-1">
                                  <span className="pt-1">{req.media.title}</span>
                                  <p>{Math.floor(req.media.duration / 60)}:{String(Math.floor(req.media.duration % 60)).padStart(2, '0')}</p>
                                </div>
                                <p className="pt-1">{req.media.type}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* ===== PAGINATION BUTTONS ===== */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Previous button - disabled on first page */}
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="bg-neutral-800 border border-neutral-700 disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>

            {/* Page indicator */}
            <span className="text-white text-sm">
              Page {currentPage} of {totalPages}
            </span>

            {/* Next button - disabled on last page */}
            <Button
              onClick={goToNextPage}
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
