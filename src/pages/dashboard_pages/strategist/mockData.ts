export type SongSubmission = {
  id: string;
  track: string;
  artist: string;
  genre: string;
  goal: string;
  budget: string;
  uploaded: string;
  artwork: string;
  cover?: string;
  audioUrl?: string;
  status: "Pending" | "Approved" | "Declined";
};

export const DEFAULT_SUBMISSION_COVER =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80";

export const DEFAULT_SUBMISSION_AUDIO =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export type StrategistMetric = {
  id: string;
  label: string;
  value: string;
  status: string;
  icon: "jobs" | "approval" | "declines";
  span?: "full" | "third";
};

export const strategistMetrics: StrategistMetric[] = [
  {
    id: "jobs",
    label: "Total Jobs",
    value: "20",
    status: "Today",
    icon: "jobs",
    span: "third",
  },
  {
    id: "approved",
    label: "Total Approved",
    value: "10",
    status: "Today",
    icon: "approval",
    span: "third",
  },
  {
    id: "declined",
    label: "Total Declined",
    value: "4",
    status: "Declined",
    icon: "declines",
    span: "third",
  },
];

export const songSubmissions: SongSubmission[] = [
  {
    id: "1",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=12",
    status: "Pending",
  },
  {
    id: "2",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=32",
    status: "Pending",
  },
  {
    id: "3",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=20",
    status: "Declined",
  },
  {
    id: "4",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=47",
    status: "Pending",
  },
  {
    id: "5",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=14",
    status: "Approved",
  },
  {
    id: "6",
    track: "Midnight Protocol",
    artist: "Runty",
    genre: "Gospel",
    goal: "Influencers create a challenge",
    budget: "50,000",
    uploaded: "2026-05-10",
    artwork: "https://i.pravatar.cc/80?img=25",
    status: "Declined",
  },
];

export const strategistCampaigns = [
  {
    id: "c1",
    title: "Midnight Protocol Challenge",
    artist: "Runty",
    status: "Live",
    influencers: 8,
    budget: "50,000",
  },
  {
    id: "c2",
    title: "Golden Hour Seeding",
    artist: "Abbey",
    status: "In progress",
    influencers: 4,
    budget: "75,000",
  },
  {
    id: "c3",
    title: "Soft Light Stories",
    artist: "Mira",
    status: "Queue",
    influencers: 6,
    budget: "32,000",
  },
];

export const strategistInfluencers = [
  { id: "i1", name: "Faith Okoro", platform: "TikTok", followers: "1.2M", niche: "Gospel" },
  { id: "i2", name: "Samuel Banks", platform: "Instagram", followers: "840K", niche: "Lifestyle" },
  { id: "i3", name: "Kelly Sandra", platform: "YouTube", followers: "2.1M", niche: "Music" },
  { id: "i4", name: "Kola John", platform: "X", followers: "390K", niche: "Afrobeat" },
];

export const strategistInvitations = [
  { id: "v1", influencer: "Faith Okoro", campaign: "Midnight Protocol Challenge", status: "Pending" },
  { id: "v2", influencer: "Samuel Banks", campaign: "Golden Hour Seeding", status: "Accepted" },
  { id: "v3", influencer: "Kelly Sandra", campaign: "Soft Light Stories", status: "Declined" },
];
