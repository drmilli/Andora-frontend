import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangleIcon,

  Copy,

} from "lucide-react";

import Fm from "../../../assets/influencer/Fm.png";
import { Card, CardContent } from "@/components/ui/card";

import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import Cover from "../../../assets/admin/MusicCover.png";

interface Artist {
  id: number;
  name: string;
  email: string;
  profilePic: string;
  message: string;
  status: "Dispute" | "Answered";
  song: Song;
  influencers: Influencer[];
}

interface Influencer {
  id: number;
  name: string;
  handle: string;
  avatar: string;
}

interface Song {
  title: string;
  duration: string;
  format: string;
  cover: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: "Burna Boy",
    status: "Dispute",
    email: "burnaboy@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=1",
    message:
      "I want you to be able to push my music in your own creative way yeye syukefdvh hf....",
    song: {
      title: "City Boys",
      duration: "3:24",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
    influencers: [
      {
        id: 1,
        name: "Ayo Sounds",
        handle: "@ayosounds",
        avatar: "https://i.pravatar.cc/50?img=11",
      },
    ],
  },
  {
    id: 2,
    name: "Wizkid",
    status: "Answered",
    email: "wizkid@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=2",
    message: "Check out my latest track!",
    song: {
      title: "Essence",
      duration: "4:12",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
    influencers: [
      {
        id: 1,
        name: "Timi Viral",
        handle: "@timiviral",
        avatar: "https://i.pravatar.cc/50?img=12",
      },
    ],
  },
];

const tabs = [
  { value: "Pending Jobs" },
  { value: "Disputes" },
  { value: "History" },
];

const subtabs = [
  { value: "All" },
  { value: "Influencers" },
  { value: "Radio Stations" },
  { value: "TV" },
];

function AdminJob() {
  return (
    <div>
      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs defaultValue="Pending Job" className="w-full">
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

          <TabsContent value={"Pending Jobs"} className=" w-[1020px]">
            <Tabs defaultValue="All">
              <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-10 mb-10">
                {subtabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="
        w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[150px] lg:h-[52px]
       rounded-full
       mt-20
         bg-neutral-800 
          text-white
           data-[state=active]:bg-[#A67102]
        data-[state=active]:border-b-amber-500 "
                  >
                    {tab.value}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={"All"} className=" w-[1020px]">
                {artists.map((artist, index) => (
                  <Card
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-auto mt-10"
                    key={index}
                  >
                    <CardContent className="grid gap-6">
                      <div className="flex ">
                        <div className="flex flex-col items-center lg:items-start mr-2">
                          <img
                            src={ProfilePic}
                            alt=""
                            className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-md"
                          />
                          <p className="pt-2 text-sm text-white text-nowrap">
                            {artist.name}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 w-[900px] ">
                          <div>
                            <div className="flex justify-between">
                              <div className="flex">
                                <img
                                  src={Cover}
                                  alt=""
                                  className="w-[60px] md:w-[106px] h-[60px] md:h-[70px] mr-1 rounded-lg"
                                />
                                <div>
                                  <p className="pt-2 text-lg text-white">
                                    {artist.song.title}
                                  </p>
                                  <p className="text-white">
                                    {" "}
                                    {artist.song.duration}
                                  </p>
                                </div>
                              </div>
                              <p className="pt-4 text-white mr-2">
                                {" "}
                                {artist.song.format}
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* Reviewer */}
                            <div className="flex flex-row justify-center gap-3 align-middle items-center border-x-1 border-gray-600">
                              {artist.influencers.map((influencer) => (
                                <div
                                  key={influencer.id}
                                  className="flex flex-col items-center text-white"
                                >
                                  <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-[60px] h-[60px] rounded-full border-2 border-[#111]"
                                  />
                                  <p className="pt-1 text-[10px] truncate">
                                    {influencer.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className=" text-center pt-4 px-3 text-white flex justify-between">
                            <div>
                              <span>Monday</span>
                              <p>
                                <span>12:00AM</span> - <span> 6:00AM</span>
                              </p>
                            </div>
                            <div>
                              <img
                                src={Fm}
                                alt={"fm"}
                                className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                              />
                              <p>95.6 FM</p>
                            </div>
                          </div>
                          <div className="w-[895px] mt-5">
                            <div className="border border-[#A67102] p-3  max-w-full rounded-lg  text-xs overflow-y-auto   wrap-break-word text-white">
                              {artist.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value={"Influencers"} className=" w-[1020px]">
                {artists.map((artist, index) => (
                  <Card
                    key={index}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div
                          className={`mt-6 grid grid-cols-1 lg:grid-cols-8 gap-2 lg:gap-15 items-start text-white text-sm md:text-base`}
                        >
                          <div>
                            <span>
                              <img
                                src={ProfilePic}
                                alt=""
                                className="w-[60px] md:w-[70px] h-[60px] md:h-[70px]"
                              />
                            </span>
                            <p className="pt-1  text-nowrap">
                              Artist Name
                            </p>{" "}
                          </div>
                          <div className="lg:col-span-3 ">
                            <p className="flex justify-between items-center mb-3 w-full">
                              <span>Email: {artist.email}</span>
                              <Copy className="mr-4 lg:mr-15" />
                            </p>

                            <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[350px]">
                              {artist.message}
                            </div>
                          </div>
                          <div className="lg:col-span-1 w-30">
                            <span>
                              <img src={Fm} alt="" className="w-30 h-15" />
                            </span>
                            <div className="flex justify-between">
                              <div className="pt-1">
                                <span className="pt-1">
                                  {artist.song.title}
                                </span>
                                <p>{artist.song.duration}</p>
                              </div>
                              <p className="pt-1">{artist.song.format}</p>
                            </div>
                          </div>
                          <div className="lg:col-span-1 w-30">
                            <span>
                              <img src={Fm} alt="" className="w-30 h-15" />
                            </span>
                            <div className="flex justify-between">
                              <div className="pt-1">
                                <span className="pt-1">
                                  {artist.song.title}
                                </span>
                                <p>{artist.song.duration}</p>
                              </div>
                              <p className="pt-1">{artist.song.format}</p>
                            </div>
                          </div>
                          <div>
                            {artist.influencers.map((influencer) => (
                              <div className="mx-3">
                                <img
                                  src={influencer.avatar}
                                  alt={influencer.avatar}
                                  className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                                />
                                <p>Influencer</p>
                              </div>
                            ))}
                          </div>
                          {artist.status === "Dispute" ? (
                            <div className="lg:col-span-1 flex items-center justify-end gap-4">
                              {/* Progress column */}
                              <div className="flex flex-col items-center ">
                                <div className="bg-[#A67102] w-10   text-xs  px-2 py-3 rounded-md">
                                  50%
                                </div>

                                <div className="w-[4px] h-[95px] bg-[#A67102]"></div>

                                <div className="bg-[#A67102] w-10  px-2 py-3 text-xs   rounded-md">
                                  50%
                                </div>
                              </div>

                              <div className=" h-45 px-2 flex items-center justify-center w-25  bg-[#A67102] rounded-md">
                                <AlertTriangleIcon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="lg:col-span-1 flex items-center justify-end gap-4">
                              {/* Progress column */}
                              <div className="flex flex-col items-center ">
                                <div className="bg-[#A67102] w-10   text-xs  px-2 py-3 rounded-md">
                                  50%
                                </div>

                                <div className="w-[4px] h-[95px] bg-[#A67102]"></div>

                                <div className="bg-[#A67102] w-10  px-2 py-3 text-xs   rounded-md">
                                  50%
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value={"Radio Stations"} className=" w-[1020px]">
                {artists.map((artist, index) => (
                  <Card
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-auto mt-10"
                    key={index}
                  >
                    <CardContent className="grid gap-6">
                      <div className="flex ">
                        <div className="flex flex-col items-center lg:items-start mr-2">
                          <img
                            src={ProfilePic}
                            alt=""
                            className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-md"
                          />
                          <p className="pt-2 text-sm text-white text-nowrap">
                            {artist.name}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 w-[900px] ">
                          <div>
                            <div className="flex justify-between">
                              <div className="flex">
                                <img
                                  src={Cover}
                                  alt=""
                                  className="w-[60px] md:w-[106px] h-[60px] md:h-[70px] mr-1 rounded-lg"
                                />
                                <div>
                                  <p className="pt-2 text-lg text-white">
                                    {artist.song.title}
                                  </p>
                                  <p className="text-white">
                                    {" "}
                                    {artist.song.duration}
                                  </p>
                                </div>
                              </div>
                              <p className="pt-4 text-white mr-2">
                                {" "}
                                {artist.song.format}
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* Reviewer */}
                            <div className="flex flex-row justify-center gap-3 align-middle items-center border-x-1 border-gray-600">
                              {artist.influencers.map((influencer) => (
                                <div
                                  key={influencer.id}
                                  className="flex flex-col items-center text-white"
                                >
                                  <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-[60px] h-[60px] rounded-full border-2 border-[#111]"
                                  />
                                  <p className="pt-1 text-[10px] truncate">
                                    {influencer.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className=" text-center pt-4 px-3 text-white flex justify-between">
                            <div>
                              <span>Monday</span>
                              <p>
                                <span>12:00AM</span> - <span> 6:00AM</span>
                              </p>
                            </div>
                            <div>
                              <img
                                src={Fm}
                                alt={"fm"}
                                className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                              />
                              <p>95.6 FM</p>
                            </div>
                          </div>
                          <div className="w-[895px] mt-5">
                            <div className="border border-[#A67102] p-3  max-w-full rounded-lg  text-xs overflow-y-auto   wrap-break-word text-white">
                              {artist.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value={"TV"} className=" w-[1020px]">
                {artists.map((artist, index) => (
                  <Card
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-auto mt-10"
                    key={index}
                  >
                    <CardContent className="grid gap-6">
                      <div className="flex ">
                        <div className="flex flex-col items-center lg:items-start mr-2">
                          <img
                            src={ProfilePic}
                            alt=""
                            className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-md"
                          />
                          <p className="pt-2 text-sm text-white text-nowrap">
                            {artist.name}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 w-[900px] ">
                          <div>
                            <div className="flex justify-between">
                              <div className="flex">
                                <img
                                  src={Cover}
                                  alt=""
                                  className="w-[60px] md:w-[106px] h-[60px] md:h-[70px] mr-1 rounded-lg"
                                />
                                <div>
                                  <p className="pt-2 text-lg text-white">
                                    {artist.song.title}
                                  </p>
                                  <p className="text-white">
                                    {" "}
                                    {artist.song.duration}
                                  </p>
                                </div>
                              </div>
                              <p className="pt-4 text-white mr-2">
                                {" "}
                                {artist.song.format}
                              </p>
                            </div>
                          </div>
                          <div>
                            {/* Reviewer */}
                            <div className="flex flex-row justify-center gap-3 align-middle items-center border-x-1 border-gray-600">
                              {artist.influencers.map((influencer) => (
                                <div
                                  key={influencer.id}
                                  className="flex flex-col items-center text-white"
                                >
                                  <img
                                    src={influencer.avatar}
                                    alt={influencer.name}
                                    className="w-[60px] h-[60px] rounded-full border-2 border-[#111]"
                                  />
                                  <p className="pt-1 text-[10px] truncate">
                                    {influencer.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className=" text-center pt-4 px-3 text-white flex justify-between">
                            <div>
                              <span>Monday</span>
                              <p>
                                <span>12:00AM</span> - <span> 6:00AM</span>
                              </p>
                            </div>
                            <div>
                              <img
                                src={Fm}
                                alt={"fm"}
                                className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                              />
                              <p>MITV</p>
                            </div>
                          </div>
                          <div className="w-[895px] mt-5">
                            <div className="border border-[#A67102] p-3  max-w-full rounded-lg  text-xs overflow-y-auto   wrap-break-word text-white">
                              {artist.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value={"Disputes"}>
                 {artists.map((artist, index) => (
                  <Card
                    key={index}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div
                          className={`mt-6 grid grid-cols-1 lg:grid-cols-8 gap-2 lg:gap-15 items-start text-white text-sm md:text-base`}
                        >
                          <div>
                            <span>
                              <img
                                src={ProfilePic}
                                alt=""
                                className="w-[60px] md:w-[70px] h-[60px] md:h-[70px]"
                              />
                            </span>
                            <p className="pt-1  text-nowrap">
                              Artist Name
                            </p>{" "}
                          </div>
                          <div className="lg:col-span-3 ">
                            <p className="flex justify-between items-center mb-3 w-full">
                              <span>Email: {artist.email}</span>
                              <Copy className="mr-4 lg:mr-15" />
                            </p>

                            <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[350px]">
                              {artist.message}
                            </div>
                          </div>
                          <div className="lg:col-span-1 w-30">
                            <span>
                              <img src={Fm} alt="" className="w-30 h-15" />
                            </span>
                            <div className="flex justify-between">
                              <div className="pt-1">
                                <span className="pt-1">
                                  {artist.song.title}
                                </span>
                                <p>{artist.song.duration}</p>
                              </div>
                              <p className="pt-1">{artist.song.format}</p>
                            </div>
                          </div>
                          <div className="lg:col-span-1 w-30">
                            <span>
                              <img src={Fm} alt="" className="w-30 h-15" />
                            </span>
                            <div className="flex justify-between">
                              <div className="pt-1">
                                <span className="pt-1">
                                  {artist.song.title}
                                </span>
                                <p>{artist.song.duration}</p>
                              </div>
                              <p className="pt-1">{artist.song.format}</p>
                            </div>
                          </div>
                          <div>
                            {artist.influencers.map((influencer) => (
                              <div className="mx-3">
                                <img
                                  src={influencer.avatar}
                                  alt={influencer.avatar}
                                  className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                                />
                                <p>Influencer</p>
                              </div>
                            ))}
                          </div>
                          {artist.status === "Dispute" ? (
                            <div className="lg:col-span-1 flex items-center justify-end gap-4">
                              {/* Progress column */}
                              <div className="flex flex-col items-center ">
                                <div className="bg-[#A67102] w-10   text-xs  px-2 py-3 rounded-md">
                                  50%
                                </div>

                                <div className="w-[4px] h-[95px] bg-[#A67102]"></div>

                                <div className="bg-[#A67102] w-10  px-2 py-3 text-xs   rounded-md">
                                  50%
                                </div>
                              </div>

                              <div className=" h-45 px-2 flex items-center justify-center w-25  bg-[#A67102] rounded-md">
                                <AlertTriangleIcon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="lg:col-span-1 flex items-center justify-end gap-4">
                              {/* Progress column */}
                              <div className="flex flex-col items-center ">
                                <div className="bg-[#A67102] w-10   text-xs  px-2 py-3 rounded-md">
                                  50%
                                </div>

                                <div className="w-[4px] h-[95px] bg-[#A67102]"></div>

                                <div className="bg-[#A67102] w-10  px-2 py-3 text-xs   rounded-md">
                                  50%
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </TabsContent>
          <TabsContent value={"History"} className=" w-[1020px]">
            {artists.map((artist, index) => (
              <Card
                className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-auto mt-10"
                key={index}
              >
                <CardContent className="grid gap-6">
                  <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                    <p className="text-white m-auto">Completed</p>
                  </div>
                  <div className="flex ">
                    <div className="flex flex-col items-center lg:items-start mr-2">
                      <img
                        src={ProfilePic}
                        alt=""
                        className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-md"
                      />
                      <p className="pt-2 text-sm text-white text-nowrap">
                        {artist.name}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 w-[900px] ">
                      <div>
                        <div className="flex justify-between">
                          <div className="flex">
                            <img
                              src={Cover}
                              alt=""
                              className="w-[60px] md:w-[106px] h-[60px] md:h-[70px] mr-1 rounded-lg"
                            />
                            <div>
                              <p className="pt-2 text-lg text-white">
                                {artist.song.title}
                              </p>
                              <p className="text-white">
                                {" "}
                                {artist.song.duration}
                              </p>
                            </div>
                          </div>
                          <p className="pt-4 text-white mr-2">
                            {" "}
                            {artist.song.format}
                          </p>
                        </div>
                      </div>
                      <div>
                        {/* Reviewer */}
                        <div className="flex flex-row justify-center gap-3 align-middle items-center border-x-1 border-gray-600">
                          {artist.influencers.map((influencer) => (
                            <div
                              key={influencer.id}
                              className="flex flex-col items-center text-white"
                            >
                              <img
                                src={influencer.avatar}
                                alt={influencer.name}
                                className="w-[60px] h-[60px] rounded-full border-2 border-[#111]"
                              />
                              <p className="pt-1 text-[10px] truncate">
                                {influencer.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className=" text-center pt-4 px-3 text-white flex justify-between">
                        <div>
                          <span>Monday</span>
                          <p>
                            <span>12:00AM</span> - <span> 6:00AM</span>
                          </p>
                        </div>
                        <div>
                          <img
                            src={Fm}
                            alt={"fm"}
                            className="w-[60px] h-[60px] rounded-full border-2 border-[#111] object-cover"
                          />
                          <p>MITV</p>
                        </div>
                      </div>
                      <div className="w-[895px] mt-5">
                        <div className="border border-[#A67102] p-3  max-w-full rounded-lg  text-xs overflow-y-auto   wrap-break-word text-white">
                          {artist.message}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AdminJob;
