import { Card, CardContent } from '@/components/ui/card';

import { Ellipsis, Triangle } from 'lucide-react';
import { AdminChartLineLinear } from '@/components/charts/admin/AdminChartLineLinear';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/Context/AppContext';
import type { AdminOverview } from '@/types/admin/admin';
import { fetchOverview } from '@/services/admin/adminService';
import { apiErrorMessage } from '@/lib/influencer';

function AdminDashboard() {
  const context = useContext(AppContext);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        setOverview(await fetchOverview());
      } catch (err) {
        setError(apiErrorMessage(err, 'Could not load platform stats'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const n = (v?: number | null) => (v ?? 0).toLocaleString('en-NG');

  // Radio / TV have no backend yet, so they are not shown as fabricated numbers
  const statistics = [
    { label: 'Artists', value: n(overview?.users.byRole.artist), rate: '' },
    { label: 'Influencers', value: n(overview?.users.byRole.influencer), rate: '' },
    { label: 'Producers', value: n(overview?.users.byRole.producer), rate: '' },
    { label: 'Total Users', value: n(overview?.users.total), rate: '' },
    { label: 'Media Approved', value: n(overview?.media.approved), rate: '' },
    { label: 'Media Pending', value: n(overview?.media.pending), rate: '' },
  ];

  const overalls = [
    { label: 'Received Jobs', value: n(Object.values(overview?.promotions ?? {}).reduce((a, b) => a + b, 0)), rate: '' },
    { label: 'Pending Jobs', value: n((overview?.promotions?.PENDING ?? 0) + (overview?.promotions?.PENDED ?? 0)), rate: '' },
    { label: 'Completed Jobs', value: n(overview?.promotions?.COMPLETED), rate: '' },
    { label: 'Disputes', value: n(overview?.promotions?.DISPUTED), rate: '' },
  ];

  if (loading) {
    return <p className="text-white mt-10">Loading platform stats...</p>;
  }

  if (error) {
    return (
      <p className="text-red-400 mt-10 text-sm" role="alert">
        {error}
      </p>
    );
  }

  return (
    <div>   <div>
        <div>
          <h1>Hello, {context?.user?.firstname ?? 'Admin'}</h1>
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