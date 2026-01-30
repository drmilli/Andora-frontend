import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  ChevronDown,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import musiccover from "../../../assets/admin/MusicCover.png";
import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import { Copy, Download, MessageSquareReply } from "lucide-react";
import { ChartRadialText } from "@/components/charts/ChartRadialText";

import { Link } from "react-router-dom";
import coverphoto from "../../../assets/admin/influencercover.png";

const tabs = [{ value: "Audio" }, { value: "Video" }, { value: "Jobs" }];

function AdminArtistDetails() {
  return (
    <div>
      <Link to="">
        <button className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 text-[10px] md:text-xs text-gray-300 border border-zinc-700 rounded-md hover:bg-zinc-900 transition-colors">
          <ArrowLeftIcon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          Back
        </button>
      </Link>

      <div className="flex flex-row items-start gap-4 mt-4">
        <div>
          <img src={coverphoto} alt="" className=" rounded-md object-cover" />
        </div>

        <div className="space-y-4 text-white text-sm md:text-base w-full">
          <div className="flex w-full items-center">
            <span>Username</span>
            <p className="ml-auto">sambanks</p>
          </div>

          <div className="flex w-full items-center">
            <span>Name</span>
            <p className="ml-auto">Samuel Banks</p>
          </div>

          <div className="flex w-full items-center">
            <span>Email</span>
            <p className="ml-auto">sambanks@gmail.com</p>
          </div>

          <div className="flex w-full items-center">
            <span>Phone Number</span>
            <p className="ml-auto">+234123456789</p>
          </div>

          <div className="flex w-full items-center">
            <span>Total Jobs</span>
            <p className="ml-auto">40</p>
          </div>

          <div className="flex w-full items-center">
            <span>Pending Jobs</span>
            <p className="ml-auto">2</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
          <Tabs defaultValue="Audio" className="w-full">
            <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
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
                  {tab.value}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="Audio" className="w-[1000px]">
              <div className="hidden sm:block mt-5  ">
                <div className="relative w-full ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-[#A67102]" />
                  </div>

                  <input
                    aria-label="Search"
                    type="text"
                    placeholder="Search music or album"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-xl leading-5 bg-[#111111] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#A67102] focus:ring-1 focus:ring-[#A67102] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mt-5">
                  <p>Total</p>
                  <span>20</span>
                </div>
              </div>

              {/* cards for audio files using shadncn ui card component */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="bg-[#111] border border-gray-800 overflow-hidden"
                  >
                    <CardContent className="px-3">
                      {/* IMAGE SECTION */}
                      <div className="relative">
                        <img
                          src={musiccover}
                          alt="Album Art"
                          className="w-full h-[220px] object-cover"
                        />

                        {/* DROPDOWN BUTTON */}
                        <div className="absolute top-3 right-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-md p-2">
                              <ChevronDown size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1a1a1a] border-gray-700 text-white">
                              <DropdownMenuItem>Play</DropdownMenuItem>
                              <DropdownMenuItem>
                                Add to Playlist
                              </DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* TEXT SECTION */}
                      <div className="p-4 space-y-1">
                        <h3 className="text-white font-semibold text-lg">
                          Smoke
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Single by RUNTY ft JAZZY
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="Video" className="w-[1000px]">
              <div className="hidden sm:block mt-5  ">
                <div className="relative w-full ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-[#A67102]" />
                  </div>

                  <input
                    aria-label="Search"
                    type="text"
                    placeholder="Search music or album"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-xl leading-5 bg-[#111111] text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#A67102] focus:ring-1 focus:ring-[#A67102] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mt-5">
                  <p>Total</p>
                  <span>20</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card
                    key={item}
                    className="bg-[#111] border border-gray-800 overflow-hidden"
                  >
                    <CardContent className="px-3">
                      {/* IMAGE SECTION */}
                      <div className="relative">
                        <img
                          src={musiccover}
                          alt="Album Art"
                          className="w-full h-[220px] object-cover"
                        />

                        {/* DROPDOWN BUTTON */}
                        <div className="absolute top-3 right-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-md p-2">
                              <ChevronDown size={18} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1a1a1a] border-gray-700 text-white">
                              <DropdownMenuItem>Play</DropdownMenuItem>
                              <DropdownMenuItem>
                                Add to Playlist
                              </DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* TEXT SECTION */}
                      <div className="p-4 space-y-1">
                        <h3 className="text-white font-semibold text-lg">
                          Smoke
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Single by RUNTY ft JAZZY
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="Jobs"></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdminArtistDetails;
