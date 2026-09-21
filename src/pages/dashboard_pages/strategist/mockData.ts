export type SongSubmission = {
  id: string;
  track: string;
  artist: string;
  genre: string;
  goal: string;
  budget: string;
  uploaded: string;
  artwork: string;
};

export type StrategistMetric = {
  id: string;
  label: string;
  value: string;
  status: string;
  icon: "reach" | "posts" | "campaign" | "building" | "active" | "pending" | "review";
  span?: "full" | "third";
};

export const strategistMetrics: StrategistMetric[] = [
  {
    id: "reach",
    label: "Total Reach",
    value: "200M",
    status: "Today",
    icon: "reach",
    span: "full",
  },
  {
    id: "posts",
    label: "Total Influencers Post",
    value: "20",
    status: "Today",
    icon: "posts",
    span: "third",
  },
  {
    id: "campaigns",
    label: "Total Campaign",
    value: "10",
    status: "Today",
    icon: "campaign",
    span: "third",
  },
  {
    id: "building",
    label: "Campaign being built",
    value: "4",
    status: "In progress",
    icon: "building",
    span: "third",
  },
  {
    id: "active",
    label: "Active Campaigns",
    value: "2",
    status: "Live",
    icon: "active",
    span: "third",
  },
  {
    id: "pending",
    label: "Pending Influencer Responses",
    value: "4",
    status: "In progress",
    icon: "pending",
    span: "third",
  },
  {
    id: "review",
    label: "Awaiting Review",
    value: "6",
    status: "Queue",
    icon: "review",
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
  },
  {
    id: "3",
    track: "Golden Hour",
    artist: "Abbey",
    genre: "Afrobeat",
    goal: "Playlist seeding",
    budget: "75,000",
    uploaded: "2026-05-08",
    artwork: "https://i.pravatar.cc/80?img=20",
  },
  {
    id: "4",
    track: "Soft Light",
    artist: "Mira",
    genre: "R&B",
    goal: "Story mentions",
    budget: "32,000",
    uploaded: "2026-05-04",
    artwork: "https://i.pravatar.cc/80?img=47",
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
