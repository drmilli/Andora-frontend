import React from "react";
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
import { Copy } from "lucide-react";

const socials = [
  { icon: All, value: "all" },
  { icon: Twitter, value: "twitter" },
  { icon: Instagram, value: "instagram" },
  { icon: Facebook, value: "facebook" },
  { icon: Youtube, value: "youtube" },
  { icon: Snapchat, value: "snapchat" },
  { icon: Tiktok, value: "tiktok" },
];

const artists = [
  {
    name: "Burna Boy",
    icon: Tiktok,
    email: "burnaboy@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=1",
    message: "I want you to be able to push my music in your own creative way.",
    song: {
      title: "Song One",
      duration: "3:24",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Wizkid",
    icon: Instagram,
    email: "wizkid@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=2",
    message: "Check out my latest track!",
    song: {
      title: "Song Two",
      duration: "4:12",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Tiwa Savage",
    icon: Facebook,
    email: "tiwa@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=3",
    message: "Looking forward to collaborating.",
    song: {
      title: "Song Three",
      duration: "2:58",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Olamide",
    icon: Snapchat,
    email: "olamide@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=4",
    message: "New hit coming your way!",
    song: {
      title: "Song Four",
      duration: "3:36",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
  },
  {
    name: "Rema",
    icon: Instagram,
    email: "rema@gmail.com",
    profilePic: "https://i.pravatar.cc/90?img=5",
    message: "Hope you enjoy my latest release.",
    song: {
      title: "Song Five",
      duration: "3:15",
      format: "mp3",
      cover: "https://via.placeholder.com/50",
    },
  },
];

function InfluencerDashboard() {
  return (
    <div>
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
              {artists
                .filter(
                  (artist) =>
                    social.value === "all" || artist.icon === social.icon
                )
                .map((artist, index) => (
                  <Card
                    key={index}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                          <div className="shrink-0">
                            <img src={artist.icon} alt="" />
                          </div>
                          <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px]">
                              pend
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
                                src={ProfilePic}
                                alt=""
                                className="w-[60px] md:w-[90px] h-[60px] md:h-[90px]"
                              />
                            </span>{" "}
                            <p className="pt-1">Artist Name</p>{" "}
                          </div>
                          <div className="lg:col-span-3">
                            <p className="flex justify-between items-center mb-3 w-full">
                              <span>Email: {artist.email}</span>
                              <Copy className="mr-4 lg:mr-15" />
                            </p>

                            <div className="border border-[#A67102] p-2 rounded-lg h-[98px] w-full lg:w-[429px]">
                              {artist.message}
                            </div>
                          </div>
                          <div className="lg:col-span-2">
                            <span>
                              <img src={Fm} alt="" />
                            </span>
                            <div className="flex justify-between">
                              <div className="pt-1">
                                <span className="pt-1">{artist.song.title}</span>
                                <p>{artist.song.duration}</p>
                              </div>
                              <p className="pt-1">{artist.song.format}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default InfluencerDashboard;