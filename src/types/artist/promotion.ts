/** An influencer as shown in the artist-facing directory */
export interface InfluencerListItem {
  id: string;
  firstname: string;
  surname: string;
  username: string;
  email: string;
  role: string;
  bio: string | null;
  phone: string | null;
  followerCount: number | null;
  rate: number | null;
  profilePicture: string | null;
  coverPicture: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  snapchat: string | null;
  facebook: string | null;
  youtube: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: { promotionsReceived: number };
}

export interface PaginatedInfluencers {
  data: InfluencerListItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Body for POST /influencer/{id}/requests */
export interface CreatePromotionRequestPayload {
  platform: string;
  message: string;
  amount: number;
  mediaId?: string | null;
}
