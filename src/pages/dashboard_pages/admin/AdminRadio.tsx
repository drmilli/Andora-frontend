import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { Link } from "react-router-dom";
import Fm from "../../../assets/influencer/Fm.png"

  const influencers = [
    {
      id: 1,
      username: "Samuel Banks",
      phone: "0810XXXXXX",
      email: "sambanks@gmail.com",
      totalJobs: 40,
    },
    {
      id: 2,
      username: "Kelly Sandra",
      phone: "0803XXXXXX",
      email: "kellysandra@gmail.com",
      totalJobs: 70,
    },
    {
      id: 3,
      username: "Kola John",
      phone: "0705XXXXXX",
      email: "kolajohn@gmail.com",
      totalJobs: 50,
    },
    {
      id: 4,
      username: "Vitamin X",
      phone: "0812XXXXXX",
      email: "vitaminx@gmail.com",
      totalJobs: 30,
    },
    {
      id: 5,
      username: "Papaya X",
      phone: "0901XXXXXX",
      email: "papayax@gmail.com",
      totalJobs: 40,
    },
  ];
function AdminRadio() {
    
  return (
     <div>
      {" "}
      <div className="mt-10">
        <div className="mb-6">

          <div className="flex justify-between">
            <div>
                <span>20 listed</span>
            </div>
            <div className="flex justify-center align-middle">
                <p className="mr-1">Page</p>
                <div className="flex">
                    <div className=" border-[#A67102] border-1 px-3 py-0.5 rounded-lg mx-2">200</div> / <div className="mx-2">900</div>
                </div>
            </div>
            <div className="flex gap-3">
              <Button className=" bg-[#A67102] rounded-full">Previous</Button>
              <Button className=" border-[#A67102] border-1 rounded-full">Next</Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <div className="min-w-[600px] md:min-w-full max-w-6xl mx-auto">
            <table className="w-full  border-separate border-spacing-y-3">
              <thead>
                <tr className="bg-[#A67102] rounded-lg">
                  <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 rounded-l-lg">
                    Radio
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                    Phone Number
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                    Email
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                    Total Jobs
                  </th>
                  <th className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200 rounded-r-lg">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-zinc-950 border border-zinc-800 ">
                {influencers.map((influencer, index) => (
                  <tr
                    key={influencer.id}
                    className={`border-b border-zinc-800  w-full ${
                      index === influencers.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200  rounded-l-lg flex gap-2">
                    <span>
                        <img src={Fm} alt="" className="w-9 h-9 object-cover rounded-lg"/>
                    </span>
                      {influencer.username}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-400">
                      {influencer.phone}
                    </td>

                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                      {influencer.email}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-xs md:text-sm text-gray-200">
                      {influencer.totalJobs}
                    </td>
                    <td className="px-3 md:px-6 py-3 md:py-4 text-right   rounded-r-lg">
                      <Link to={`${influencer.id}`}>
                        <button className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 text-[10px] md:text-xs text-gray-300 border border-zinc-700 rounded-md hover:bg-zinc-900 transition-colors">
                          <NotebookPen className="w-3 h-3 md:w-3.5 md:h-3.5" />
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminRadio