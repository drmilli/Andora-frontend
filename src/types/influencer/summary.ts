

export type InfluencerSummaryResponse = {
  influencer: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    profilePicture: string;
  };
  requests: {
    PENDING: number;
    PENDED: number;
    ACCEPTED: number;
    DECLINED: number;
    COMPLETED: number;
    DISPUTED: number;
    total: number;
  };
  pendingByPlatform: {
    instagram: number;
    twitter: number;
    facebook: number;
    youtube: number;
    snapchat: number;
    tiktok: number;
  };
  earnings: {
    available: number;
    pending: number;
    totalMade: number;
  };
  unreadNotifications: number;
}