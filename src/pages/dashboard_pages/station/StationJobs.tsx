import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Facebook from '../../../assets/socials/Facebook.png';
import Instagram from '../../../assets/socials/Instagram.png';
import Snapchat from '../../../assets/socials/Snapchat.png';
import Twitter from '../../../assets/socials/X.png';
import Youtube from '../../../assets/socials/Youtube.png';
import Tiktok from '../../../assets/socials/Tiktok.png';
import All from '../../../assets/socials/All.png';
import Fm from '../../../assets/influencer/Fm.png';
import ProfilePic from '../../../assets/influencer/ProfilePic.png';
import {
  Copy,
  Download,
  DownloadIcon,
  MessageSquareReply,
  TriangleAlert,
} from 'lucide-react';

const socials = [
  { icon: All, value: 'all' },
  { icon: Twitter, value: 'twitter' },
  { icon: Instagram, value: 'instagram' },
  { icon: Facebook, value: 'facebook' },
  { icon: Youtube, value: 'youtube' },
];

const tabs = [
  { icon: All, value: 'New' },
  { icon: Twitter, value: 'In-Progress' },
  { icon: Instagram, value: 'Completed' },
];

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

interface Artist {
  id: number;
  name: string;
  email: string;
  profilePic: string;
  message: string;
  status: 'New' | 'In-Progress' | 'Completed';
  icon: string;
  song: Song;
  influencers: Influencer[];
}



const artists : Artist[] = [
  {
    id: 1,
    name: 'Burna Boy',
    icon: Tiktok,
    status: 'New',
    email: 'burnaboy@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=1',
    message: 'I want you to be able to push my music in your own creative way.',
    song: {
      title: 'City Boys',
      duration: '3:24',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
    influencers: [
      {
        id: 1,
        name: 'Ayo Sounds',
        handle: '@ayosounds',
        avatar: 'https://i.pravatar.cc/50?img=11',
      },
    ],
  },
  {
    id: 2,
    name: 'Wizkid',
    icon: Instagram,
    status: 'In-Progress',
    email: 'wizkid@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=2',
    message: 'Check out my latest track!',
    song: {
      title: 'Essence',
      duration: '4:12',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
    influencers: [
      {
        id: 1,
        name: 'Timi Viral',
        handle: '@timiviral',
        avatar: 'https://i.pravatar.cc/50?img=12',
      },
      {
        id: 2,
        name: 'Ayo Sounds',
        handle: '@ayosounds',
        avatar: 'https://i.pravatar.cc/50?img=11',
      },
    ],
  },
  {
    id: 3,
    name: 'Tiwa Savage',
    icon: Facebook,
    status: 'Completed',
    email: 'tiwa@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=3',
    message: 'Looking forward to collaborating.',
    song: {
      title: 'Somebody’s Son',
      duration: '2:58',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
    influencers: [
      {
        id: 1,
        name: 'Lola Trends',
        handle: '@lolatrends',
        avatar: 'https://i.pravatar.cc/50?img=13',
      },
      {
        id: 2,
        name: 'Timi Viral',
        handle: '@timiviral',
        avatar: 'https://i.pravatar.cc/50?img=12',
      },
      {
        id: 3,
        name: 'Jay Promo',
        handle: '@jaypromo',
        avatar: 'https://i.pravatar.cc/50?img=14',
      },
    ],
  },
  {
    id: 4,
    name: 'Olamide',
    icon: Snapchat,
    status: 'In-Progress',
    email: 'olamide@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=4',
    message: 'New hit coming your way!',
    song: {
      title: 'Street Pop',
      duration: '3:36',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
    influencers: [
      {
        id: 1,
        name: 'Jay Promo',
        handle: '@jaypromo',
        avatar: 'https://i.pravatar.cc/50?img=14',
      },
    ],
  },
  {
    id: 5,
    name: 'Rema',
    icon: Instagram,
    status: 'Completed',
    email: 'rema@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=5',
    message: 'Hope you enjoy my latest release.',
    song: {
      title: 'Calm Down',
      duration: '3:15',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
    influencers: [
      {
        id: 1,
        name: 'Ayo Sounds',
        handle: '@ayosounds',
        avatar: 'https://i.pravatar.cc/50?img=11',
      },
      {
        id: 2,
        name: 'Lola Trends',
        handle: '@lolatrends',
        avatar: 'https://i.pravatar.cc/50?img=13',
      },
    ],
  },
];


const percentages = [25, 50, 70, 100];

function StationJobs() {
  const [progress, setProgress] = useState<number>(50);
  return (
    <div>
      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs defaultValue="New" className="w-full">
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
          {tabs.map((tab) => (
            <TabsContent value={tab.value} key={tab.value}>
              {artists
                .filter((artist) => artist.status === tab.value)
                .map((artist, index) => (
                  <Card
                    key={index}
                    className="bg-[#4040404D] border-0 w-full lg:w-[1032px] h-auto lg:h-[283px] mt-10"
                  >
                    <CardContent className="grid gap-6">
                      <div className="grid grid-cols-1">
                        <div className="flex justify-between flex-col md:flex-row md:justify-between gap-4">
                          <div className="shrink-0"></div>
                          {artist.status === 'New' ? (
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                              <Button className="bg-[#0D4787] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px text-xs sm:text-base">
                                <Download /> Download
                              </Button>

                              <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base">
                                Progress
                              </Button>
                            </div>
                          ) : artist.status === 'In-Progress' ? (
                            <p className="text-yellow-500"> </p>
                          ) : (
                            <p className="text-white">Completed</p>
                          )}
                        </div>

                        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[auto_1.5fr_1fr_auto_56px] gap-6 p-3 text-white text-sm md:text-base bg-[#111] rounded-lg ">
                          {/* Artist */}
                          <div className="flex flex-col items-center lg:items-start">
                            <img
                              src={ProfilePic}
                              alt=""
                              className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] rounded-md"
                            />
                            <p className="pt-2 text-xs">Artist Name</p>
                          </div>

                          {/* Email + message */}
                          <div className="w-full min-w-0">
                            <div className="flex justify-between items-center mb-2 min-w-0">
                              <span className="text-xs truncate">
                                Email: {artist.email}
                              </span>
                              <Copy className="cursor-pointer opacity-80 hover:opacity-100" />
                            </div>

                            <div className="border border-[#A67102] p-3  max-w-full rounded-lg h-[98px] text-xs overflow-y-auto   wrap-break-word">
                              {artist.message}
                            </div>
                          </div>

                          {/* Song */}
                          <div className=" items-center w-[188px] ">
                            <span>
                              <img src={Fm} alt="" className="h-[80px]" />
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

                          {/* Reviewer */}
                          <div className="flex flex-row m-auto align-middle items-center">
                          {artist.influencers.map((influencer) => (
    <div key={influencer.id} className="flex flex-col items-center">
      <img
        src={influencer.avatar}
        alt={influencer.name}
        className="w-[60px] h-[60px] rounded-full border-2 border-[#111]"
      />
      <p className="pt-1 text-[10px] truncate">{influencer.name}</p>
    </div>
  ))}
                        
                          </div>
                  {artist.status === 'New' ? (
                    <div className="flex items-center  justify-center bg-[#B88D35] rounded-md h-full">
                            <TriangleAlert className="text-white" />
                          </div>
                          ) : artist.status === 'In-Progress' ? (
                                                      <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-center bg-[#0D4787] rounded-md h-full">
                              <DownloadIcon className="text-white" />
                            </div>
                            <div className="flex items-center justify-center bg-[#B88D35] rounded-md h-full">
                              <TriangleAlert className="text-white" />
                            </div>
                          </div>
                          ) : (
                            null
                          )}
                         
                     

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

export default StationJobs;
