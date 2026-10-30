export interface CampaignInfluencerItem {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  status: "Posted" | "Pending";
  datePosted: string;
  reach: string;
  engagement: string;
  posts: number;
  platform: "tiktok" | "instagram" | "twitter" | "facebook";
  links?: { platform: string; url: string; label: string }[];
}

export interface CampaignDetailData {
  id: string;
  trackTitle: string;
  genre: string;
  duration: string;
  coverImage: string;
  status: "Active" | "Completed" | "Cancelled";
  daysLeft: number;
  budget: number;
  durationDays: number;
  startDate: string;
  endDate: string;
  influencersAssigned: number;
  stats: {
    totalReach: string;
    reachGrowth: string;
    totalViews: string;
    viewsGrowth: string;
    totalEngagement: string;
    engagementGrowth: string;
  };
  chartData: { day: string; value: number }[];
  topPerformer: CampaignInfluencerItem;
  influencers: CampaignInfluencerItem[];
  platformLinks: {
    facebook: { label: string; url: string }[];
    tiktok: { label: string; url: string }[];
    instagram: { label: string; url: string }[];
    twitter: { label: string; url: string }[];
  };
}

export interface CampaignListItem {
  id: string;
  trackTitle: string;
  genre: string;
  coverImage: string;
  status: "Active" | "Completed" | "Cancelled";
  influencersCount: number;
  influencerAvatars: string[];
  uploadedDate: string;
  budget: number;
  reach: string;
  progress: number;
}

export const MOCK_CAMPAIGN_DETAIL: CampaignDetailData = {
  id: "cmp-smoke-01",
  trackTitle: "Smoke",
  genre: "Gospel • 3:42",
  duration: "3:42",
  coverImage:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
  status: "Active",
  daysLeft: 12,
  budget: 50000,
  durationDays: 30,
  startDate: "June 10, 2026",
  endDate: "July 10, 2026",
  influencersAssigned: 4,
  stats: {
    totalReach: "120,500",
    reachGrowth: "27.5 % Increase vs The last 7 days",
    totalViews: "95,000",
    viewsGrowth: "27.5 % Increase vs The last 7 days",
    totalEngagement: "14,200",
    engagementGrowth: "27.5 % Increase vs The last 7 days",
  },
  chartData: [
    { day: "Day 1", value: 12400 },
    { day: "Day 3", value: 12600 },
    { day: "Day 5", value: 13100 },
    { day: "Day 7", value: 13000 },
    { day: "Day 9", value: 14800 },
    { day: "Day 11", value: 14200 },
    { day: "Day 14", value: 16800 },
  ],
  topPerformer: {
    id: "inf-1",
    name: "Steve",
    handle: "@afrobeatsdaily",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    status: "Posted",
    datePosted: "June 14, 2026",
    reach: "18,000",
    engagement: "2,100",
    posts: 4,
    platform: "tiktok",
  },
  influencers: [
    {
      id: "inf-1",
      name: "Steve",
      handle: "@afrobeatsdaily",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      status: "Posted",
      datePosted: "June 14, 2026",
      reach: "18,000",
      engagement: "2,100",
      posts: 4,
      platform: "tiktok",
    },
    {
      id: "inf-2",
      name: "Kemi Adeleke",
      handle: "@kemi_vibes",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      status: "Pending",
      datePosted: "Pending",
      reach: "14,200",
      engagement: "1,650",
      posts: 2,
      platform: "instagram",
    },
    {
      id: "inf-3",
      name: "David T.",
      handle: "@davidsoundz",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      status: "Posted",
      datePosted: "June 18, 2026",
      reach: "15,800",
      engagement: "1,890",
      posts: 3,
      platform: "tiktok",
    },
    {
      id: "inf-4",
      name: "Blessing Okafor",
      handle: "@bless_beats",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      status: "Pending",
      datePosted: "Pending",
      reach: "11,500",
      engagement: "1,200",
      posts: 1,
      platform: "facebook",
    },
  ],
  platformLinks: {
    facebook: [
      { label: "http://www.facebook.com/reel/982312091823", url: "https://www.facebook.com" },
      { label: "http://www.facebook.com/post/448102938102", url: "https://www.facebook.com" },
    
    ],
    tiktok: [
      { label: "http://www.tiktok.com/@afrobeatsdaily/video/7192837192", url: "https://www.tiktok.com" },
      { label: "http://www.tiktok.com/@afrobeatsdaily/video/7192837193", url: "https://www.tiktok.com" },
    
    ],
    instagram: [
      { label: "http://www.instagram.com/reel/Cq2x49LPoA1", url: "https://www.instagram.com" },
      { label: "http://www.instagram.com/p/Co9102KlmN2", url: "https://www.instagram.com" },
      { label: "http://www.instagram.com/stories/highlights/1792", url: "https://www.instagram.com" },
    ],
    twitter: [
      { label: "http://www.twitter.com/afrobeatsdaily/status/1710293810", url: "https://www.twitter.com" },
      { label: "http://www.twitter.com/afrobeatsdaily/status/1710293811", url: "https://www.twitter.com" },
  
    ],
  },
};

export const MOCK_CAMPAIGN_LIST: CampaignListItem[] = [
  {
    id: "cmp-smoke-01",
    trackTitle: "Smoke",
    genre: "Gospel • 3:42",
    coverImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    influencersCount: 4,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "10/06/2026",
    budget: 50000,
    reach: "120.5K",
    progress: 75,
  },
  {
    id: "cmp-essence-02",
    trackTitle: "Essence",
    genre: "Afrobeats • 3:15",
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    status: "Completed",
    influencersCount: 6,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "12/04/2026",
    budget: 150000,
    reach: "850K",
    progress: 100,
  },
  {
    id: "cmp-cityboys-03",
    trackTitle: "City Boys",
    genre: "Afro-fusion • 2:58",
    coverImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    influencersCount: 3,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "02/06/2026",
    budget: 75000,
    reach: "320K",
    progress: 50,
  },
  {
    id: "cmp-rush-04",
    trackTitle: "Rush",
    genre: "Pop / Afropop • 3:05",
    coverImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    influencersCount: 5,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "28/05/2026",
    budget: 100000,
    reach: "490K",
    progress: 60,
  },
  {
    id: "cmp-calmdown-05",
    trackTitle: "Calm Down",
    genre: "Afrorave • 3:39",
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    status: "Completed",
    influencersCount: 8,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "15/03/2026",
    budget: 250000,
    reach: "1.4M",
    progress: 100,
  },
  {
    id: "cmp-bandana-06",
    trackTitle: "Bandana",
    genre: "Afropop • 3:12",
    coverImage:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    influencersCount: 4,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "05/06/2026",
    budget: 60000,
    reach: "280K",
    progress: 40,
  },
  {
    id: "cmp-lastlast-07",
    trackTitle: "Last Last",
    genre: "Afro-fusion • 2:54",
    coverImage:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    status: "Active",
    influencersCount: 6,
    influencerAvatars: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
    uploadedDate: "01/06/2026",
    budget: 120000,
    reach: "620K",
    progress: 65,
  },
];
