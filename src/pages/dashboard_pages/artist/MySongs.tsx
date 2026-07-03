import { CloudUpload, MoreVertical, Upload } from "lucide-react";
import * as React from "react";
import { useState, useRef } from "react";


import {
  Dialog,
  DialogContent,
  DialogHeader,

  DialogTitle,
} from "@/components/ui/dialog";



type Track = {
  id: string;
  name: string;
  status: "Active" | "Completed" | "Not Active";
  campaigns: number;
  uploaded: string;
  image: string;
};

const tracks: Track[] = [
  { id: "1", name: "Smoke", status: "Active", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=10" },
  { id: "2", name: "Midnight Protocol", status: "Completed", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=11" },
  { id: "3", name: "Midnight Protocol", status: "Active", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=12" },
  { id: "4", name: "Midnight Protocol", status: "Active", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=13" },
  { id: "5", name: "Midnight Protocol", status: "Not Active", campaigns: 0, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=14" },
  { id: "6", name: "Midnight Protocol", status: "Active", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=15" },
  { id: "7", name: "Midnight Protocol", status: "Active", campaigns: 4, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=16" },
  { id: "8", name: "Midnight Protocol", status: "Not Active", campaigns: 0, uploaded: "2026-05-10", image: "https://i.pravatar.cc/80?img=17" },
];

const statusStyles: Record<Track["status"], string> = {
  Active: "bg-[#A67102]/20 text-[#A67102]",
  Completed: "bg-gray-700/40 text-gray-300",
  "Not Active": "bg-gray-800 text-gray-500",
};

export const MySongs: React.FC = () => {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  // Campaign modal state
  const [open, setOpen] = useState(false);



  const audioInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleUploadAudioClick = () => {
    audioInputRef.current?.click();
  };

  const handleAudioFileChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log(file);
    console.log(file.name);
    console.log(file.type);
    console.log(file.size);

    // Upload to backend here
  };

  const handleUploadCoverClick = () => {
    coverInputRef.current?.click();
  };

  const handleCoverFileChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log(file);
    console.log(file.name);
    console.log(file.type);
    console.log(file.size);

    // Upload to backend here
  };

  function openCampaignModal() {

    setOpen(true);
  }
  const activeCount = tracks.filter((t) => t.status === "Active").length;
  const genres = [
    { id: 1, name: "Afrobeats" },
    { id: 2, name: "Amaapiano" },
    { id: 3, name: "Gospel" },
    { id: 4, name: "HipHop" },
    { id: 5, name: "R&B" },
    { id: 6, name: "Dancehall" },
    { id: 7, name: "Highlife" },
    { id: 8, name: "Afro-soul" },
    { id: 9, name: "jazz/blues" },
    { id: 10, name: "EDM" },
    { id: 11, name: "Lofi" },
    { id: 12, name: "Country" },
    { id: 13, name: "House-Music" },
    { id: 14, name: "Rock/Alternative" },
    { id: 15, name: "Fuji" },
    { id: 16, name: "Funk" },
    { id: 17, name: "Trap/Rap" },
  ]
  return (
    <div className="w-full pb-28 md:pb-0">


      {/* Subheader row */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-400 text-sm">
          {tracks.length} Tracks • {activeCount} Active
        </p>
        <button onClick={openCampaignModal} className="flex items-center gap-2 border border-gray-700 hover:border-[#A67102] text-white text-sm px-4 py-2 rounded-lg transition-colors">
          <Upload size={14} />
          Upload
        </button>

        {/* ----------- START CAMPAIGN MODAL ----------- */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-[#0D0B07] border border-gray-800 text-white sm:max-w-md p-0 overflow-hidden">
            <div className="p-4">

              <DialogHeader className="mb-1">
                <DialogTitle className="text-white text-xl font-semibold">
                  Upload a Song
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-500 text-xs uppercase tracking-wide mb-6">
                Please fill the form.
              </p>

              <form>   
                <div className="grid grid-cols-2 gap-4">
                <div
                  className="border flex bg-[#3333334D] flex-col items-center space-y-2 border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-center transition-colors"
                >
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleAudioFileChange}
                  />
                  <CloudUpload size={30} className="text-[#A67102] mb-3" />

                  <p className="text-white font-normal text-2xl mb-1">Drag and drop files to upload</p>
                  <p className="text-gray-500 text-xs">OR</p>

                  <button
                    type="button"
                    onClick={handleUploadAudioClick}
                    className="bg-[#A67102] hover:bg-[#8a5e02] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium"
                  >
                    Upload Song
                  </button>
                  <p className="text-white text-xs">only mp3 format is accepted</p>
                </div>

                <div

                  className="border flex flex-col bg-[#3333334D] items-center space-y-2 border-gray-800 hover:border-[#A67102] rounded-xl p-4 text-center transition-colors"
                >
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverFileChange}
                  />
                  <CloudUpload size={30} className="text-[#A67102] mb-3" />
                  <p className="text-white   font-normal text-2xl mb-1 ">Drag and drop files to upload</p>
                  <p className="text-gray-500 text-xs">OR</p>
                  <button
                    type="button"
                    onClick={handleUploadCoverClick}
                    className="bg-[#A67102] hover:bg-[#8a5e02] transition-colors text-white px-5 py-2 rounded-lg text-sm font-medium"
                  >
                    Upload Song Cover
                  </button>
                  <p className="text-white text-xs">PNG,JPG</p>
                </div>
              </div>
                <div className="mt-3">
                  <label htmlFor="songName" className="text-white">Song Title
                    <input type="text" id="songName" name="songName" className="w-full bg-[#3333334D] border mt-2 border-gray-800 hover:border-[#A67102] rounded-lg p-2 text-white" />
                  </label>
                </div>
                {/* selecting different genre option */}
                <div className="mt-3">
                  <label htmlFor="songName" className="text-white">Genres
                    <select
                      className=" w-full rounded-lg border bg-[#3333334D] p-3  text-white  focus:border-[#A67102]  focus:outline-none appearance-none mt-2 "
                    >
                      <option value="" className="bg-[#1f1f1f] text-gray-400">
                        Select a genre
                      </option>

                      {genres.map((genre: any) => (
                        <option
                          key={genre.id}
                          value={genre.name}
                          className="bg-[#1f1f1f] text-white "

                        >
                          {genre.name}
                        </option>
                      ))}
                    </select>

                  </label>
                </div>

              </form>



            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="bg-[#0D0B07] rounded-2xl border border-gray-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-900">
                <th className="px-6 py-4 font-medium">Track</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Campaigns</th>
                <th className="px-6 py-4 font-medium">Uploaded</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track) => (
                <tr
                  key={track.id}
                  className="border-b border-gray-900 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={track.image}
                        alt={track.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <span className="text-white font-medium">{track.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-[11px] px-3 py-1 rounded-full font-medium ${statusStyles[track.status]}`}
                    >
                      {track.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-gray-300">{track.campaigns}</td>
                  <td className="px-6 py-3 text-gray-300">{track.uploaded}</td>
                  <td className="px-6 py-3 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === track.id ? null : track.id)
                      }
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {openMenuId === track.id && (
                      <div className="absolute right-6 top-10 z-10 bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-lg overflow-hidden w-36">
                        <button className="w-full text-left text-xs text-gray-300 hover:bg-white/5 px-4 py-2.5">
                          View
                        </button>
                        {track.status === "Not Active" && (
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
      </div>
    </div>
  );
};

export default MySongs;