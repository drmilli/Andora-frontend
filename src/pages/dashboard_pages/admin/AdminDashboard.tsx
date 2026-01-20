
import { Card, CardContent } from '@/components/ui/card';

import {  Ellipsis, Triangle } from 'lucide-react';
import { AdminChartLineLinear } from '@/components/charts/admin/AdminChartLineLinear';


const statistics = [
  { label: 'Artists', value: '900,456,000', rate: '75%' },
  { label: 'Influencers', value: '23,456', rate: '75%' },
  { label: 'Radios', value: '34,456', rate: '75%' },
  { label: 'TV Stations', value: '1,234', rate: '75%' },
  { label: 'Audio Uploads', value: '12,123,456', rate: '75%' },
  { label: ' Video Uploads', value: '1,123,456', rate: '75%' } 
];
const overalls = [
  { label: 'Received Jobs', value: '123,456', rate: '75%' },
  { label: 'Pending Jobs', value: '123,456', rate: '75%' },
  { label: 'Completed Jobs', value: '123,456', rate: '75%' },
   { label: 'Disputes', value: '3,456', rate: '75%' },
];
function AdminDashboard() {
  return (
    <div>   <div>
        <div>
          <h1>Hello,Issac</h1>
        </div>
        <div className="flex w-full max-w-full lg:max-w-sm flex-col gap-6 mt-10">
          <div>
            <Card className="bg-transparent border-0 w-full lg:w-[1032px]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {statistics.map((stat, index) => (
                <CardContent
                  key={index}
                  className="bg-[#4040404D]  p-5 rounded-xl h-[154px]"
                >
                  <div className="">
                    <div className="flex-col md:flex-row md:justify-between gap-4">
                      <div className="shrink-0 flex items-center justify-between gap-2">
                        <div
                          className={`flex items-center justify-center 
                     ${stat.rate.startsWith('+') ? 'text-green-500' : 'text-red-500'} 
                     bg-white rounded-full
                        w-[70px] h-[30px] 
                        `}
                        >
                          <Triangle
                            className="w-4 h-5 text-transparent"
                            fill="#50AF68"
                          />{' '}
                          {stat.rate}
                        </div>
                        <span className="text-white">
                          <Ellipsis />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-2xl mt-2 pt-3">
                          {stat.value}
                        </h3>
                        <h2 className="text-sm text-white pt-3">
                          {stat.label}
                        </h2>
                      </div>
                    </div>
                  </div>
                </CardContent>
              ))}
            </Card>
            <Card className="bg-transparent border-0 w-full lg:w-[1032px]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {overalls.map((overall, index) => (
                <CardContent
                  key={index}
                  className="bg-[#4040404D]  p-5 rounded-xl h-[154px]"
                >
                  <div className="">
                    <div className="flex-col md:flex-row md:justify-between gap-4">
                      <div className="shrink-0 flex items-center justify-between gap-2">
                        <div
                          className={`flex items-center justify-center 
                     ${overall.rate.startsWith('+') ? 'text-green-500' : 'text-red-500'} 
                     bg-white rounded-full
                        w-[70px] h-[30px] 
                        `}
                        >
                          <Triangle
                            className="w-4 h-5 text-transparent"
                            fill="#50AF68"
                          />{' '}
                          {overall.rate}
                        </div>
                        <span className="text-white">
                          <Ellipsis />
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-2xl mt-2 pt-3">
                          {overall.value}
                        </h3>
                        <h2 className="text-sm text-white pt-3">
                          {overall.label}
                        </h2>
                      </div>
                    </div>
                  </div>
                </CardContent>
              ))}
            </Card>
            <div>
              <AdminChartLineLinear/>
            </div>
          </div>
        </div>
      </div></div>
  )
}

export default AdminDashboard