import { useState } from "react";

interface Platform {
  id: string;      
  name: string;    
  logoUrl: string; 
  bgColor: string; 
}

// Data sent back to the parent when the user clicks "Continue"
export interface PlatformsData {
  selectedPlatforms: string[]; // list of selected platform IDs
}

interface PlatformsStepProps {
  type: "songs" | "videos";          // which platform list to show
  onBack: () => void;                // called when "Back" is clicked
  onContinue: (data: PlatformsData) => void; // called with selection when "Continue" is clicked
}

const STREAMING_PLATFORMS: Platform[] = [
  {
    id: "spotify",
    name: "Spotify",
    logoUrl: "https://cdn.simpleicons.org/spotify/ffffff",
    bgColor: "#1DB954",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    logoUrl: "https://cdn.simpleicons.org/applemusic/ffffff",
    bgColor: "#FC3C44",
  },
  {
    id: "amazon-music",
    name: "Amazon Music",
    logoUrl: "https://cdn.simpleicons.org/amazon/ffffff",
    bgColor: "#232F3E",
  },
  {
    id: "tidal",
    name: "Tidal Music",
    logoUrl: "https://cdn.simpleicons.org/tidal/ffffff",
    bgColor: "#000000",
  },
  {
    id: "deezer",
    name: "Deezer",
    logoUrl: "https://cdn.simpleicons.org/deezer/ffffff",
    bgColor: "#A722FF",
  },
  {
    id: "soundcloud",
    name: "Sound Cloud",
    logoUrl: "https://cdn.simpleicons.org/soundcloud/ffffff",
    bgColor: "#FF5500",
  },
  {
    id: "qobuz",
    name: "Qobuz",
    logoUrl: "https://cdn.simpleicons.org/qobuz/ffffff",
    bgColor: "#002E5B",
  },
  {
    id: "youtube-music",
    name: "Youtube Music",
    logoUrl: "https://cdn.simpleicons.org/youtubemusic/ffffff",
    bgColor: "#FF0000",
  },
  {
    id: "bandcamp",
    name: "Bandcamp",
    logoUrl: "https://cdn.simpleicons.org/bandcamp/ffffff",
    bgColor: "#1DA0C3",
  },
  {
    id: "pandora",
    name: "Pandora",
    logoUrl: "https://cdn.simpleicons.org/pandora/ffffff",
    bgColor: "#224099",
  },
];

// Video platforms — shown when uploading videos
const VIDEO_PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    logoUrl: "https://cdn.simpleicons.org/youtube/ffffff",
    bgColor: "#FF0000",
  },
  {
    id: "youtube-music",
    name: "Youtube Music",
    logoUrl: "https://cdn.simpleicons.org/youtubemusic/ffffff",
    bgColor: "#FF0000",
  },
  {
    id: "tidal",
    name: "Tidal Music",
    logoUrl: "https://cdn.simpleicons.org/tidal/ffffff",
    bgColor: "#000000",
  },
  {
    id: "bandcamp",
    name: "Bandcamp",
    logoUrl: "https://cdn.simpleicons.org/bandcamp/ffffff",
    bgColor: "#1DA0C3",
  },
  {
    id: "pandora",
    name: "Pandora",
    logoUrl: "https://cdn.simpleicons.org/pandora/ffffff",
    bgColor: "#224099",
  },
];


export function PlatformsStep({ type, onBack, onContinue }: PlatformsStepProps) {

  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<string>>(new Set());

  // Choose which list to display based on whether it's a song or video upload
  const platformList = type === "songs" ? STREAMING_PLATFORMS : VIDEO_PLATFORMS;
  const heading = type === "songs" ? "Streaming Apps" : "Video Platforms";

  // Toggle a platform's selected state when its card is clicked
  function togglePlatform(platformId: string) {
    setSelectedPlatforms((currentSelection) => {
      // Always work on a copy — never mutate the original Set
      const updated = new Set(currentSelection);

      if (updated.has(platformId)) {
        updated.delete(platformId); // it was selected → now deselect it
      } else {
        updated.add(platformId);    // it wasn't selected → now select it
      }

      return updated;
    });
  }

  // Called when the user is happy with their selection and clicks "Continue"
  function handleContinue() {
    onContinue({
      // Convert the Set to a plain Array — easier to work with in the rest of the app
      selectedPlatforms: Array.from(selectedPlatforms),
    });
  }

  return (
    <div>
      {/* Section heading */}
      <h2 className="text-xl font-semibold mb-6">{heading}</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {platformList.map((platform) => {
          // Is this particular platform currently selected?
          const isSelected = selectedPlatforms.has(platform.id);

          return (
            <div
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
             
              <div
                className={`
                  w-full aspect-square rounded-xl overflow-hidden
                  flex items-center justify-center p-3
                  transition-all duration-200
                  ${
                    isSelected
                      ? "ring-2 ring-[#A67102] scale-95"          // selected → amber border
                      : "ring-1 ring-gray-700 group-hover:ring-gray-400 group-hover:scale-105" // not selected → subtle border
                  }
                `}
                style={{ backgroundColor: platform.bgColor }}
              >
                <img
                  src={platform.logoUrl}
                  alt={platform.name}
                  className="w-full h-full object-contain"
               
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = "0";
                  }}
                />
              </div>

              <p
                className={`
                  text-xs text-center leading-tight transition-colors
                  ${isSelected ? "text-[#A67102]" : "text-gray-400 group-hover:text-gray-200"}
                `}
              >
                {platform.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---- Back / Continue buttons ---- */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-3 border border-gray-700 text-white rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 px-4 py-3 bg-[#A67102] text-white rounded-lg hover:bg-[#8a5e02] transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
