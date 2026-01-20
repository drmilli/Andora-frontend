import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';


type TabProps = {
value:string,
selectedInterviwer:string[]
};
function DayTab({ value,selectedInterviwer }:TabProps) {
  return (
    <div>
      {' '}
      <TabsContent value={value} className=" w-[1020px]">
        <div>
          {selectedInterviwer.map((interviewer, index) => (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="mt-10 flex  gap-2 ">
                  <p className="ml-5 mt-3 text-center align-middle">
                    {interviewer.name}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  {/* Time Select 1 */}
                  <div className="flex items-center gap-2 border border-gray-600 rounded-xl px-4 py-2 bg-black/20 text-white">
                    {/* Hours */}
                    <select className="bg-transparent outline-none text-white">
                      <option value="">--</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} className="text-black">
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <span className="text-lg">:</span>

                    {/* Minutes */}
                    <select className="bg-transparent outline-none text-white">
                      <option value="">--</option>
                      {[...Array(60)].map((_, i) => (
                        <option key={i} className="text-black">
                          {String(i).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    {/* AM/PM */}
                    <select className="bg-transparent outline-none text-white ml-2">
                      <option className="text-black">AM</option>
                      <option className="text-black">PM</option>
                    </select>
                  </div>

                  {/* Time Select 2 */}
                  <div className="flex items-center gap-2 border border-gray-600 rounded-xl px-4 py-2 bg-black/20 text-white">
                    <select className="bg-transparent outline-none text-white">
                      <option value="">--</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} className="text-black">
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <span className="text-lg">:</span>

                    <select className="bg-transparent outline-none text-white">
                      <option value="">--</option>
                      {[...Array(60)].map((_, i) => (
                        <option key={i} className="text-black">
                          {String(i).padStart(2, '0')}
                        </option>
                      ))}
                    </select>

                    <select className="bg-transparent outline-none text-white ml-2">
                      <option className="text-black">AM</option>
                      <option className="text-black">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className=" ml-15">
                <div className="mt-10 flex flex-row justify-end">
                  <p>{interviewer.starttime}AM</p>
                  <span>--</span>
                  <p>{interviewer.endtime}AM</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button className="float-right bg-[#A67102] px-5 py-5 mt-5">
          Add Presenter
        </Button>
      </TabsContent>
    </div>
  );
}

export default DayTab;
