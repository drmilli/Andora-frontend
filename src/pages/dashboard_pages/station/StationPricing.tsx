import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X } from 'lucide-react';
import DayTab from '@/components/tabs/DayTab';

const tabs = [
  { value: 'General' },
  { value: 'Presenter' },
  { value: 'Interviewer' },
];

const subtabs = [
  { value: 'Presenters' },
  { value: 'Pricing' },
  { value: 'Roasters' },
];

const days = [
  { value: 'Mon' },
  { value: 'Tue' },
  { value: 'Wed' },
  { value: 'Thur' },
  { value: 'Fri' },
  { value: 'Sat' },
  { value: 'Sun' },
];
type UserType = {
    id: number,
    name: string,
    image: string,
    status: string,
    price:string,
    starttime:string,
    endtime: string,
};
const interviewers: UserType =[
  {
    id: 1,
    name: 'Mathew Steven',
    image: '/images/presenters/mathew-steven.jpg',
    status: 'approved',
    price: '95,000',
    starttime: '02:00',
    endtime: '06:20',
  },
  {
    id: 2,
    name: 'Bola Ahmed',
    image: '/images/presenters/bola-ahmed.jpg',
    status: 'pending',
    price: '15,000',
    starttime: '04:40',
    endtime: '06:20',
  },
  {
    id: 3,
    name: 'Tunde Fatai',
    image: '/images/presenters/tunde-fatai.jpg',
    status: 'approved',
    price: '45,000',
    starttime: '02:50',
    endtime: '07:20',
  },
  {
    id: 4,
    name: 'Ijeoma Blessing',
    image: '/images/presenters/ijeoma-blessing.jpg',
    status: 'pending',
    price: '65,000',
    starttime: '03:30',
    endtime: '06:20',
  },
  {
    id: 5,
    name: 'Okoro Samuel',
    image: '/images/presenters/okoro-samuel.jpg',
    status: 'approved',
    price: '95,030',
    starttime: '12:00',
    endtime: '01:20',
  },
  {
    id: 6,
    name: 'Habib Musa',
    image: '/images/presenters/habib-musa.jpg',
    status: 'pending',
    price: '1,00,000',
    starttime: '08:00',
    endtime: '10:20',
  },
];
type FormDataType = {
  accountname: string;
  accountnumber: string;
  bankname: string;
  pricing: string;
  presenting: string;
  interview: string;
  user: string[];
  interviewerprice: string[];
};

function StationPricing() {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormDataType>({
    accountname: '',
    accountnumber: '',
    bankname: '',
    pricing: '',
    presenting: '',
    interview: '',
    user: Array(interviewers.length).fill(''),
    interviewerprice: Array(interviewers.length).fill(''),
  });
  function handlecancel(key: string) {
    setFormData({ ...formData, [key]: '' });
    console.log(formData.user);
  }
  //for changing interviwers profile
  const handleUserChange = (index: number, value: string) => {
    const newUsers = [...formData.user];
    newUsers[index] = value;

    setFormData({ ...formData, user: newUsers });
    setEditingIndex(index);
    console.log(newUsers[index]);
  };

  //for changing interviwers price
  const handleUserPriceChange = (index: number, value: string) => {
    const interviewerPrice = [...formData.interviewerprice];
    interviewerPrice[index] = value;

    setFormData({ ...formData, interviewerprice: interviewerPrice });
    setEditingIndex(index);
  };
  const handleUserCancel = (index: number) => {
    const check = setFormData({
      ...formData,
      user: formData.user.map((user, i) => (i === index ? '' : user)),
      interviewerprice: formData.interviewerprice.map((user, i) =>
        i === index ? '' : user
      ),
    });
    setEditingIndex(null);
    console.log(check);
  };

  //slicing the interviwers per day
  const selectedInterviwer = interviewers.slice(0, 3);
  return (
    <div className="h-auto">
      <div className="grid grid-cols-2 gap-16 ">
        <div>
          <form action="">
            <div className="mt-10 flex gap-6 justify-between">
              <div className="mb-2  wrap-break-word text-nowrap ">
                Account Number
              </div>
              <div>
                <input
                  type="text"
                  value={formData.accountnumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountnumber: e.target.value })
                  }
                  className="border border-gray-600  rounded px-4 py-2 w-[308px]"
                />
              </div>
              {formData.accountnumber.trim() !== '' && (
                <div className="flex gap-4">
                  <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                    <Check className="text-center m-auto" />
                  </div>
                  <div
                    className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg"
                    onClick={() => handlecancel('accountnumber')}
                  >
                    <X
                      className="text-center m-auto"
                      onClick={() => handlecancel('accountnumber')}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
          <form action="">
            <div className="mt-10 flex gap-6 justify-between">
              <div className="mb-2 text-nowrap">Account Name</div>
              <div>
                <input
                  type="text"
                  className="border border-gray-600 rounded px-4 py-2 w-[308px]"
                  value={formData.accountname}
                  onChange={(e) =>
                    setFormData({ ...formData, accountname: e.target.value })
                  }
                />
              </div>
              {formData.accountname.trim() !== '' && (
                <div className="flex gap-4">
                  <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                    <Check className="text-center m-auto" />
                  </div>
                  <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                    <X
                      className="text-center m-auto"
                      onClick={() => handlecancel('accountname')}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
          <form action="">
            <div className="mt-10 flex gap-6 justify-between">
              <div className="mb-2 text-nowrap">Bank Name</div>
              <div>
                <input
                  type="text"
                  className="border border-gray-600 rounded px-4 py-2 w-[308px]"
                  value={formData.bankname}
                  onChange={(e) =>
                    setFormData({ ...formData, bankname: e.target.value })
                  }
                />
              </div>
              {formData.bankname.trim() !== '' && (
                <div className="flex gap-4 animate-out transition-discrete ease-in-out">
                  <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                    <Check className="text-center m-auto" />
                  </div>
                  <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                    <X
                      className="text-center m-auto"
                      onClick={() => handlecancel('bankname')}
                    />
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
        <div>
          <div className="space-y-20 float-right text-right">
            <div className="mt-10 ">
              {/* <div>Account Number</div> */}
              <div>+1234567890</div>
            </div>
            <div className="mt-10">
              {/* <div>Account Name</div> */}
              <div>--</div>
            </div>
            <div className="mt-10">
              {/* <div>Password</div> */}
              <div>--</div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
            <Tabs defaultValue="General" className="w-full">
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

              <TabsContent value={'General'} className=" w-[1020px]">
                {' '}
                <div className="grid grid-cols-4 h-98">
                  <div className="col-span-3 ">
                    <form action="">
                      <div className="mt-10 flex gap-6 justify-between">
                        <div className="mb-2  wrap-break-word text-nowrap ">
                          Presenting Pricing
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.presenting}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                presenting: e.target.value,
                              })
                            }
                            className="border border-gray-600  rounded px-4 py-2 w-[308px]"
                          />
                        </div>
                        {formData.presenting.trim() !== '' && (
                          <div className="flex gap-4">
                            <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                              <Check className="text-center m-auto" />
                            </div>
                            <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                              <X
                                className="text-center m-auto"
                                onClick={() => handlecancel('presenting')}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                    <form action="">
                      <div className="mt-10 flex gap-6 justify-between">
                        <div className="mb-2  wrap-break-word text-nowrap ">
                          Interviewing Pricing
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.interview}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                interview: e.target.value,
                              })
                            }
                            className="border border-gray-600  rounded px-4 py-2 w-[308px]"
                          />
                        </div>
                        {formData.interview.trim() !== '' && (
                          <div className="flex gap-4">
                            <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                              <Check className="text-center m-auto" />
                            </div>
                            <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                              <X
                                className="text-center m-auto"
                                onClick={() => handlecancel('interview')}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="flex flex-col">
                    <div className="space-y-20 float-right text-right  col-span-1">
                      <div className="mt-10 ">
                        <div>N95,000,000</div>
                      </div>
                    </div>
                    <div className="space-y-20 float-right text-right  col-span-1 mt-5">
                      <div className="mt-10 ">
                        <div>N--</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value={'Presenter'}>
                <Tabs defaultValue="Presenters">
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

                  <TabsContent value={'Presenters'} className=" w-[1020px]">
                    <div>
                      {interviewers.map((interviewer, index) => (
                        <div className="grid grid-cols-3 gap-10">
                          <div className="">
                            <form action="" className="flex ">
                              <div className="mt-10 flex ">
                                <div className="mb-2 mr-15">
                                  {interviewer.id}
                                </div>
                                <input
                                  type="text"
                                  className="border border-gray-600  rounded px-4 py-2 w-[250px] "
                                  placeholder="input name"
                                  value={formData.user[index]}
                                  onChange={(e) =>
                                    handleUserChange(index, e.target.value)
                                  }
                                />
                                {formData.user[index] !== '' && (
                                  <div className="flex gap-4 ml-5">
                                    <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                                      <Check className="text-center m-auto" />
                                    </div>
                                    <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                                      <X
                                        className="text-center m-auto"
                                        onClick={() => handleUserCancel(index)}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </form>
                          </div>

                          <div className="ml-30">
                            <form action="">
                              <div className="mt-10 flex ">
                                <input
                                  type="file"
                                  className="border border-gray-600  rounded px-3 py-2 w-[250px] spacing- text-gray-400 "
                                />
                              </div>

                              <div className=" w-24 h-8  relative bg-gray-600 opacity-25 bottom-9 ml-1  mr-4 border  border-gray-400 rounded-sm"></div>
                            </form>
                          </div>

                          <div>
                            <div className="mt-10 flex  gap-2 justify-between">
                              <p className=" text-nowrap ml-20">
                                {interviewer.name}
                              </p>
                              <div className="">
                                <img
                                  src={interviewer.image}
                                  alt={interviewer.name}
                                  className="w-[60px] h-[60px] rounded-full border-2 border-[#111] align-middle items-center"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="float-right bg-[#A67102] px-5 py-5 mt-5">
                      Add Presenter
                    </Button>
                  </TabsContent>
                  <TabsContent value={'Pricing'} className=" w-[1020px]">
                    <div>
                      {interviewers.map((interviewer, index) => (
                        <div className="grid grid-cols-3 gap-10">
                          <div>
                            <div className="mt-10 flex  gap-2 ">
                              <div className="">
                                <img
                                  src={interviewer.image}
                                  alt={interviewer.name}
                                  className="w-[60px] h-[60px] rounded-full border-2 border-[#111] align-middle items-center"
                                />
                              </div>
                              <p className="ml-5 mt-3 text-center align-middle">
                                {interviewer.name}
                              </p>
                            </div>
                          </div>

                          <div className="">
                            <form action="" className="flex ">
                              <div className="mt-10 flex ">
                                <input
                                  type="text"
                                  className="border border-gray-600  rounded px-4 py-2 w-[250px] "
                                  placeholder="input amount"
                                  value={formData.interviewerprice[index]}
                                  onChange={(e) =>
                                    handleUserPriceChange(index, e.target.value)
                                  }
                                />
                                {formData.interviewerprice[index] !== '' && (
                                  <div className="flex gap-4 ml-5">
                                    <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                                      <Check className="text-center m-auto" />
                                    </div>
                                    <div
                                      className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg"
                                      onClick={() => handleUserCancel(index)}
                                    >
                                      <X className="text-center m-auto" />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </form>
                          </div>

                          <div>
                            <div className="mt-10 ">
                              <p className=" text-nowrap float-right">
                                N{interviewer.price}.00
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="float-right bg-[#A67102] px-5 py-5 mt-5">
                      Add Presenter
                    </Button>
                  </TabsContent>
                  <TabsContent value={'Roasters'} className=" w-[1020px]">
                    <Tabs defaultValue="Mon">
                      <TabsList className="flex bg-transparent p-2 gap-2 lg:gap-25">
                        {days.map((day) => (
                          <TabsTrigger
                            key={day.value}
                            value={day.value}
                            className="
       h-[80px]
        md: md:h-[50px]
        lg: lg:h-[52px]
       rounded-none
        bg-transparent
          text-white
           data-[state=active]:bg-transparent
        data-[state=active]:border-b-amber-500 
        grid grid-cols-7
        mt-10
        "
                          >
                            {day.value}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    
                      <DayTab value={"Mon"} selectedInterviwer={selectedInterviwer}/>
                      <DayTab value={"Tue"} selectedInterviwer={selectedInterviwer}/>
                    </Tabs>
                  </TabsContent>
                </Tabs>
              </TabsContent>
              <TabsContent value={'Interviewer'} className=" w-[1020px]">
                <div className="grid grid-cols-4 h-98">
                  <div className="col-span-3 ">
                    <form action="">
                      <div className="mt-10 flex gap-6 justify-between">
                        <div className="mb-2  wrap-break-word text-nowrap ">
                          Pricing
                        </div>
                        <div>
                          <input
                            type="text"
                            value={formData.pricing}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                pricing: e.target.value,
                              })
                            }
                            className="border border-gray-600  rounded px-4 py-2 w-[308px]"
                          />
                        </div>
                        {formData.pricing.trim() !== '' && (
                          <div className="flex gap-4">
                            <div className="w-[45px] h-[45px] bg-[#00A861]  py-2 rounded-lg">
                              <Check className="text-center m-auto" />
                            </div>
                            <div className="w-[45px] h-[45px] bg-[#C8170D]  py-2 rounded-lg">
                              <X className="text-center m-auto" />
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                  <div>
                    <div className="space-y-20 float-right text-right  col-span-1">
                      <div className="mt-10 ">
                        <div>N--</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationPricing;
