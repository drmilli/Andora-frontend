import React, { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cover from "../../../assets/influencer/cover.png";
import Nopic from "../../../assets/influencer/nopic.png";
import { Plus, Upload } from "lucide-react";

const tabs = [{ value: "Info" }, { value: "Edit" }];

function StationProfile() {
  const [banner, setBanner] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file); // creates a preview instantly
    setBanner(url);
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setProfile(url);
  };

  return (
    <div>
      <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
        <Tabs defaultValue="Info" className="w-full">
          <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25 ">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
        w-[120px] h-[120px]
        md:w-[50px] md:h-[50px]
        lg:w-[450px] lg:h-[52px]
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

          <TabsContent value="Info" className=" w-full sm:w-5xl">
            <div className="relative w-full mt-10 flex justify-center">
              <div className="relative    rounded-lg overflow-hidden shadow-2xl">
                <img src={Cover} alt="" className="w-[400px] sm:w-[1032px] " />
              </div>

              {/* Profile section */}
              <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end gap-4">
                {/* Profile image */}
                <div className="relative">
                  <div className="w-20 h-20 sm:h-32 sm:w-32  rounded-full overflow-hidden border-4 border-gray-900 shadow-xl bg-gray-700">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
                      alt="Profile"
                      className="w-full  h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name badge */}
                <div className="  px-4  mb-2 rounded shadow-lg">
                  <h2 className="text-white font-bold text-lg whitespace-nowrap">
                    Abby Lincoln
                  </h2>
                </div>
              </div>
            </div>

            {/* profile info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-[1032px] h-[328px] gap-10 mt-20 mb-10  p-4">
              <div>
                <div className="mt-10">
                  <div>Phone Number</div>
                  <div>+1234567890</div>
                </div>
                <div className="mt-10">
                  <div>Instagram link</div>
                  <div>www.instagram.com/abbylincoln</div>
                </div>
                <div className="mt-10">
                  <div>TikTok link</div>
                  <div>www.youtube.com/abbylincoln</div>
                </div>
              </div>
              <div>
                <div className="mt-10">
                  <div>Email</div>
                  <div>abbeylin@gmail.com</div>
                </div>
                <div className="mt-10">
                  <div>Snapchat link</div>
                  <div>www.snapchat.com/abbylincoln</div>
                </div>
                <div className="mt-10">
                  <div>Twitter link</div>
                  <div>www.twitter.com/abbylincoln</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="Edit" className=" w-full sm:w-5xl">
            <form action="">
              <div className="relative w-full mt-10 flex justify-center">
                <div className="relative    rounded-lg overflow-hidden shadow-2xl">
                  <img
                    src={banner ?? Nopic}
                    alt=""
                    className="w-[400px] sm:w-[1032px] h-30 sm:h-90 object-cover"
                  />

                  <div className="absolute  sm:bottom-25 bottom-5  right-10 sm:right-90 m-4">
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                         ref={fileInputRef}
                        onChange={handleBannerUpload}
                      />
                      <div className="text-center align-middle m-auto">
                        <Plus className="hidden sm:block w-10 h-10 text-[#B88D35] hover:text-gray-300 cursor-pointer text-center m-auto sm:w-20 sm:h-20" />
                        <p className="hidden sm:block mb-3 text-black sm:text-sm text-xs font-medium">
                          Click the button to upload Image
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="sm:hidden block bg-[#B88D35] text-white sm:w-[297px] w-30 border-0 "
                          onClick={() => fileInputRef.current?.click()}
                          defaultChecked
                        >
                          Upload Image
                        </Button>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Profile section */}
                <div className="absolute bottom-0 left-8 transform translate-y-1/2 flex items-end gap-4">
                  {/* Profile image */}
                  <div className="relative">
                    <div className="w-20 h-20 sm:h-32 sm:w-32  rounded-full overflow-hidden border-4 border-gray-900 shadow-xl bg-gray-700">
                      <img
                        src={profile ?? Nopic}
                        alt="Profile"
                        className="w-full  h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="absolute -bottom-3 sm:bottom-3 right-41 sm:right-48 m-4">
                    <label>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileUpload}
                      />
                      <div className="text-center align-middle m-auto">
                        <Plus className=" w-10 sm:20 h-20 text-[#B88D35] hover:text-gray-300 cursor-pointer text-center m-auto" />
                      </div>
                    </label>
                  </div>

                  {/* Name badge */}
                  <div className="  px-4  mb-2 rounded shadow-lg">
                    <h2 className="text-white font-bold text-lg whitespace-nowrap">
                      Abby Lincoln
                    </h2>
                  </div>
                </div>
              </div>

              {/* profile form for ful name,phone number and email intsagram link*/}
              <div className="grid grid-cols-1 sm:grid-cols-1 w-[1032px] h-[328px] gap-10 mt-20 mb-10  p-4">
                <div>
                  <div className="mt-10">
                    <div className="mb-2">Phone Number</div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="+1234567890"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="mb-2">Email</div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="emmanwabugo@gamil.com"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="mb-2">Instagram link</div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="www.instagram.com/abbylincoln"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="mb-2">TikTok link</div>
                    <input

                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="www.youtube.com/abbylincoln"
                    />
                  </div>
                  <div className="mt-10">
                    <div className="mb-2">Snapchat link</div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="www.snapchat.com/abbylincoln"
                    />
                  </div>

                  <div className="mt-10">
                    <div className="mb-2">Twitter link</div>
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-4 py-2 w-70 sm:w-full"
                      defaultValue="www.twitter.com/abbylincoln"
                    />
                  </div>

                  <div className="mt-10 mb-10"></div>
                    <Button
                      variant="outline"
                      className="bg-[#B88D35] text-white w-70 border-0 sm:w-full  "
                    >
                      Save Changes
                    </Button>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default StationProfile;
