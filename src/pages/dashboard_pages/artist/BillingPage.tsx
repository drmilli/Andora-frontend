import { MoreVertical } from 'lucide-react';
import React from 'react'


    type Billing = {
  id: string;
  description: string;
  status: string;
  date: string;
  amount: string;
};
    const billings: Billing[] = [
  { id: "1", description: "Campaign - Smoke (Basic Package)", status: "Active", date:"2026-05-10",amount:"30,000"}

];

const statusStyles: Record<Billing["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102]",
  Completed: "bg-gray-700/40 text-gray-300",
  "Not Active": "bg-gray-800 text-gray-500",
};

function BillingPage() {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  return (
    <div>      {/* Table */}
      <div className="rounded-2xl border border-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className='bg-[#0D0B07]'>
              <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium ">Status</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {billings.map((billing) => (
                <tr
                  key={billing.id}
                  className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3">
                  {billing.date}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[billing.status]}`}
                    >
                      {billing.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-300">{billing.description}</td>
                  <td className="px-6 py-3 text-gray-300">{billing.amount}</td>
                  <td className="px-6 py-3 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === billing.id ? null : billing.id)
                      }
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === billing.id && (
                      <div className="absolute right-6 top-10 z-10 bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-lg overflow-hidden w-36">
                        <button className="w-full text-left text-xs text-gray-300 hover:bg-white/5 px-4 py-2.5">
                          View
                        </button>
                        {billing.status === "Not Active" && (
                          <button className="w-full text-left text-xs text-[#A67102] hover:bg-white/5 px-4 py-2.5">
                            Start Campaign
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></div>
  )
}

export default BillingPage