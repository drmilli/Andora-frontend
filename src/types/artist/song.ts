export interface PlatformDistribution {
  platform: "Spotify" | "Apple Music" | "Boomplay" | "Audiomack" | "YouTube" | "TikTok";
  streams: number;
  status: "Live" | "Processing" | "Pending";
  link?: string;
  growth: string;
  sharePercent: number;
}

export interface SongCampaign {
  id: string;
  name: string;
  type: "Influencer Push" | "Radio Tour" | "Club DJ Promo" | "TV Broadcast";
  tier: "Starter" | "Medium" | "Pro";
  status: "Active" | "Completed" | "Scheduled";
  influencers: number;
  reach: string;
  engagementRate: string;
  budget: string;
  startDate: string;
  endDate: string;
}

export interface RadioSpin {
  id: string;
  station: string;
  location: string;
  frequency: string;
  spins: number;
  peakPosition: string;
  lastPlayed: string;
}

export interface StreamDataPoint {
  date: string;
  streams: number;
  radio: number;
}

export interface TrackCredits {
  producers: string[];
  writers: string[];
  mixEngineer?: string;
  masteringEngineer?: string;
  featuredArtists?: string[];
}

export interface TrackDetail {
  id: string;
  name: string;
  artist: string;
  status: "Active" | "Completed" | "Not Active";
  campaigns: number;
  uploaded: string;
  image: string;
  genre: string;
  secondaryGenre?: string;
  duration: string;
  bpm: number;
  musicalKey: string;
  isrc: string;
  upc: string;
  releaseDate: string;
  album: string;
  label: string;
  explicit: boolean;
  fileSize: string;
  fileFormat: string;
  audioUrl?: string;
  streams: number;
  radioPlays: number;
  tvPlays: number;
  influencerPosts: number;
  totalReach: string;
  revenue: string;
  description: string;
  credits: TrackCredits;
  platforms: PlatformDistribution[];
  campaignsList: SongCampaign[];
  radioSpins: RadioSpin[];
  streamHistory: StreamDataPoint[];
  lyrics: string;
}
