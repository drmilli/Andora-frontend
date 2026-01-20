import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Copy, Download, MessageSquareReply } from 'lucide-react';
import { ChartRadialText } from '@/components/charts/ChartRadialText';

const socials = [
  { icon: All, value: 'all' },
  { icon: Twitter, value: 'twitter' },
  { icon: Instagram, value: 'instagram' },
  { icon: Facebook, value: 'facebook' },
  { icon: Youtube, value: 'youtube' },
];

const tabs = [
  { icon: All, value: 'Accepted' },
  { icon: Twitter, value: 'Pending' },
  { icon: Instagram, value: 'Completed' },
];

const artists = [
  {
    name: 'Burna Boy',
    icon: Tiktok,
    status: 'Accepted',
    email: 'burnaboy@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=1',
    message: 'I want you to be able to push my music in your own creative way.',
    song: {
      title: 'Song One',
      duration: '3:24',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
  },
  {
    name: 'Wizkid',
    icon: Instagram,
    status: 'Completed',
    email: 'wizkid@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=2',
    message: 'Check out my latest track!',
    song: {
      title: 'Song Two',
      duration: '4:12',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
  },
  {
    name: 'Tiwa Savage',
    icon: Facebook,
    status: 'Pending',
    email: 'tiwa@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=3',
    message: 'Looking forward to collaborating.',
    song: {
      title: 'Song Three',
      duration: '2:58',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
  },
  {
    name: 'Olamide',
    icon: Snapchat,
    status: 'Completed',
    email: 'olamide@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=4',
    message: 'New hit coming your way!',
    song: {
      title: 'Song Four',
      duration: '3:36',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
  },
  {
    name: 'Rema',
    icon: Instagram,
    status: 'Pending',
    email: 'rema@gmail.com',
    profilePic: 'https://i.pravatar.cc/90?img=5',
    message: 'Hope you enjoy my latest release.',
    song: {
      title: 'Song Five',
      duration: '3:15',
      format: 'mp3',
      cover: 'https://via.placeholder.com/50',
    },
  },
];

const percentages = [25, 50, 70, 100]

function InfluencerJobs() {
   const [progress, setProgress] = useState< number>(50)
  return (
    <div>
      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs defaultValue="Accepted" className="w-full">
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
                          <div className="shrink-0">
                            <img src={artist.icon} alt="" />
                          </div>
                          {artist.status === 'Accepted' ? (
                            <div className="grid grid-cols-3 gap-2 md:gap-3">
                              <Button className="bg-[#0D4787] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px text-xs sm:text-base">
                                <Download /> Download
                              </Button>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="bg-[#497718] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base">
                                    <MessageSquareReply /> Review
                                  </Button>
                                </DialogTrigger>

                                <DialogContent className="relative  bottom-70 sm:relative sm:bottom-80 max-w-[600px] sm:max-w-[425px] border-0 bg-[#000000] overflow-y-auto w-full shadow-sm shadow-gray-400">
                                  <DialogHeader className='pt-3'>
                                    <h1 className='text-2xl text-white text-center'>Review</h1>
                                  </DialogHeader>
                                  <DialogDescription className="space-y-4 mt-4 text-white  text-sm md:text-base">
                                    <ChartRadialText value={progress}/>
                                    <span className='flex justify-center'>Hey! your job is {progress}% Complete</span>
                                  </DialogDescription>

                                  <DialogFooter className="text-white">
                                    <div className="relative w-full flex flex-col items-center mt-6">
                                      {/* Horizontal progress line */}
                                      <div className="absolute top-1/5 left-3 w-70 sm:w-80 h-[6px] bg-gray-700 rounded-full -translate-y-1/2"></div>

                                      {/* Filled progress */}
                                      <div
                                        className="absolute top-1/5 left-2 h-[6px] bg-[#A67102] rounded-full -translate-y-1/2"
                                        style={{ width: `${progress}%` }}
                                      ></div>

                                      {/* Buttons */}
          <div className="w-full flex justify-between z-10 px-2 mt-2">
            {percentages.map((p) => (
              <Button
                key={p}
                onClick={() => setProgress(p)}
                className={`w-[60px] h-[45px] border-2 
                  ${progress === p ? "bg-[#A67102] text-white border-0" : "border-[#A67102]"}
                `}
              >
                {p}%
              </Button>
            ))}
          </div>
                                      {/* submit button with full in all sizes */}
                                      <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-full h-[48px] md:h-[50px] lg:h-[52px] mt-10 text-xs sm:text-base">
                                        Submit Review
                                      </Button>


                                    </div>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button className="bg-[#A67102] w-full md:w-[150px] lg:w-[200px] h-[48px] md:h-[50px] lg:h-[52px] text-xs sm:text-base">
                                Dispute
                              </Button>
                            </div>
                          ) : artist.status === 'Pending' ? (
                            <p className="text-yellow-500">
                              {' '}
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
                            </p>
                          ) : (
                            <p className="text-white">Completed</p>
                          )}
                        </div>

                        <div className="mt-6 lg:mt-15 grid grid-cols-1 lg:grid-cols-6 gap-3 p-1 text-white text-sm md:text-base">
                          <div>
                            <span>
                              <img
                                src={ProfilePic}
                                alt=""
                                className="w-[60px] md:w-[90px] h-[60px] md:h-[90px]"
                              />
                            </span>{' '}
                            <p className="pt-1">Artist Name</p>{' '}
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
                                <span className="pt-1">
                                  {artist.song.title}
                                </span>
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

export default InfluencerJobs;
