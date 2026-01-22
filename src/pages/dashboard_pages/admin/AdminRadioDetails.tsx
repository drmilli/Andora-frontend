import { AlertTriangleIcon, ArrowLeftIcon, NotebookPen } from "lucide-react";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Instagram from "../../../assets/socials/Instagram.png";

import Twitter from "../../../assets/socials/X.png";

import ProfilePic from "../../../assets/influencer/ProfilePic.png";
import Cover from "../../../assets/admin/MusicCover.png";
import influencerCover from "../../../assets/admin/influencer.png";
import { Link } from "react-router-dom";
import coverphoto from "../../../assets/admin/influencercover.png";
const tabs = [
  { icon: Twitter, value: "Jobs" },
  { icon: Instagram, value: "Presenters" },
];
const subtabs = [{ value: "Pending" }, { value: "Completed" }];
interface Artist {
  id: number;
  name: string;
  email: string;
  profilePic: string;
  message: string;
  status: "Pending" | "Completed";
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
    status: "Completed",
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
    status: "Pending",
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
      {
        id: 2,
        name: "Ayo Sounds",
        handle: "@ayosounds",
        avatar: "https://i.pravatar.cc/50?img=11",
      },
    ],
  },
];
const influencers = [
  {
    id: 1,
    Presenter: "Samuel Banks",
    price: "20,000",
    email: "sambanks@gmail.com",
    startday: "Mon",
    endday: "Wed",
    starttime: "12:00",
    endtime: "6:00",
  },
  {
    id: 2,
    Presenter: "Kelly Sandra",
    price: "20,000",
    email: "kellysandra@gmail.com",
    startday: "Mon",
    endday: "Wed",
    starttime: "12:00",
    endtime: "6:00",
  },
];


function AdminRadioDetails() {

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
          <Tabs defaultValue="Jobs" className="w-full">
            <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="
        w-[80px] h-[80px]
        md:w-[50px] md:h-[50px]
        lg:w-[400px] lg:h-[52px]
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
            <TabsContent value="Jobs">
              <Tabs defaultValue="Pending">
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
                {subtabs.map((tab) => (
                  <TabsContent
                    value={tab.value}
                    key={tab.value}
                    className=" w-[1020px]"
                  >
                    {artists
                      .filter((artist) => artist.status === tab.value)
                      .map((artist, index) => (
                        <Card
                          className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-auto mt-10"
                          key={index}
                        >
                          <CardContent className="grid gap-6">
                            {artist.status === "Completed" ? (
                              <p className="text-white m-auto">Completed</p>
                            ) : (
                              ""
                            )}
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
                                <div className=" text-center pt-4 text-white">
                                  <span>Monday</span>
                                  <p>
                                    <span>12:00AM</span> - <span> 6:00AM</span>
                                  </p>
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
                ))}
              </Tabs>
            </TabsContent>

            <TabsContent value="Presenters" className="w-[1000px] mt-4">
              <table className="w-full  border-separate border-spacing-y-3 ">
                <thead className=" ">
                  <tr>
                    <th className=" px-6 py-4 text-sm text-gray-200 rounded-l-lg">
                      Presenter
                    </th>
                    <th className=" px-6 py-4 text-sm text-gray-200">Price</th>
                    <th className=" px-6 py-4 text-sm text-gray-200">Days</th>
                    <th className=" px-6 py-4 text-sm text-gray-200 rounded-r-lg">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  {influencers.map((influencer, index) => (
                    <tr className="border border-zinc-800 " key={index}>
                      <td className="px-6 py-4 rounded-l-lg pl-30">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <img
                              src={influencerCover}
                              className="w-[60px] h-[60px] rounded-lg"
                            />
                            <p className="text-xs text-white truncate">
                              Arwojobe...
                            </p>
                          </div>

                          <div className="flex flex-col items-center">
                            <img
                              src={influencerCover}
                              className="w-[60px] h-[60px] rounded-lg"
                            />
                            <p className="text-xs text-white truncate">
                              Peter Em...
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        {influencer.price}
                      </td>

                      <td className="px-6 py-4 text-gray-200">
                        {influencer.startday} – {influencer.endday}
                      </td>

                      <td className="px-6 py-4 text-gray-200 rounded-r-lg">
                        {influencer.starttime}AM – {influencer.endtime}AM
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default AdminRadioDetails;
