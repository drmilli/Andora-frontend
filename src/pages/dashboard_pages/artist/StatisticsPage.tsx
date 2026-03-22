import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Music, User, Download, ThumbsUp } from "lucide-react";

export const StatisticsPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = React.useState<{
    name: string;
    count: number;
    streams: number;
    likes: number;
    downloads: number;
  } | null>(null);

  const audienceLocations = [
    {
      name: "Nigeria",
      count: 20000,
      streams: 10000,
      likes: 5000,
      downloads: 3000,
    },
    { name: "US", count: 5000, streams: 10000, likes: 5000, downloads: 3000 },
    {
      name: "Ghana",
      count: 2000,
      streams: 10000,
      likes: 5000,
      downloads: 3000,
    },
  ];

  const topSongs = [
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
    { title: "Smoke by Runty", streams: 5000, likes: 500, downloads: 176 },
  ];

  const platforms = [
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Apple Music", streams: 5000, likes: 500, downloads: 176 },
    { name: "Boom Play", streams: 5000, likes: 500, downloads: 176 },
    { name: "Play Music", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
    { name: "Spotify", streams: 5000, likes: 500, downloads: 176 },
  ];

  const streamData = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 420 },
    { month: "Mar", value: 410 },
    { month: "Apr", value: 430 },
    { month: "May", value: 450 },
    { month: "Jun", value: 480 },
    { month: "Jul", value: 500 },
    { month: "Aug", value: 520 },
    { month: "Sep", value: 540 },
    { month: "Oct", value: 550 },
    { month: "Nov", value: 570 },
    { month: "Dec", value: 600 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">STATISTICS</h1>
            <p className="text-gray-400 text-sm">Hello, Abbey</p>
          </div>
          <button className="px-4 py-2 bg-[#A67102] text-black rounded-md hover:bg-[#8a5e02] transition-colors flex items-center gap-2 text-sm">
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <div className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Streams</h2>
                <select className="bg-[#2a2a2a] text-white px-3 py-1.5 rounded-md border border-gray-700 text-sm">
                  <option>Year</option>
                  <option>Month</option>
                  <option>Week</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2a2a2a",
                      border: "none",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#A67102"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Total Streams</p>
                <p className="text-xl font-bold">45K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <User className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Listeners</p>
                <p className="text-xl font-bold">3.2K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <Download className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Downloads</p>
                <p className="text-xl font-bold">5.6K</p>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-4 flex items-center gap-3">
              <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                <User className="w-5 h-5 text-[white]" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Followers</p>
                <p className="text-xl font-bold">1.7K</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Top Songs</h2>
            <div className="space-y-2">
              {topSongs.map((song, index) => (
                <div
                  key={index}
                  className="bg-[#2a2a2a] rounded-lg p-3 flex items-center gap-3 border border-[#3a3a3a] hover:border-[#A67102] transition-colors"
                >
                  <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                    <Music className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{song.title}</p>
                    <p className="text-xs text-gray-400">
                      {song.streams.toLocaleString()} streams
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>{song.likes} Likes</p>
                    <p>{song.downloads} Downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Audience by Location</h2>
            <div className="space-y-2">
              {audienceLocations.map((location, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedLocation(location)}
                  className="bg-[#2a2a2a] rounded-lg p-3 flex items-center justify-between border border-[#3a3a3a] hover:border-[#A67102] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-sm">{location.name}</p>
                  </div>
                  <p className="text-lg font-bold">
                    {location.count.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {selectedLocation && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLocation(null)}
        >
          <div
            className="bg-black border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-3">
                    {selectedLocation.name}
                  </h2>
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {selectedLocation.streams.toLocaleString()} streams
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {(selectedLocation.likes / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <span className="text-base font-semibold">
                        {(selectedLocation.downloads / 1000).toFixed(0)}k
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {platforms.map((platform, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] rounded-lg p-3 flex items-center gap-3 border border-[#2a2a2a]"
                  >
                    <div className="bg-[#A67102] bg-opacity-20 p-2 rounded-lg">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{platform.name}</p>
                      <p className="text-sm text-gray-400">
                        {platform.streams.toLocaleString()} streams
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>{platform.likes} Likes</p>
                      <p>{platform.downloads} Downloads</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};