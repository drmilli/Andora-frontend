
export interface GetInfluencerProfileResponse {
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
}



export interface UpdateInfluencerProfilePayload {
  firstname?: string;
  surname?: string;
  username?: string;
  email?: string;
  role?: string;
  bio?: string | null;
  phone?: string | null;
  /** Sent as a string from the form; the API coerces it. "" clears the value. */
  followerCount?: number | string | null;
  rate?: number | string | null;
  profilePicture?: string | null;
  coverPicture?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  tiktok?: string | null;
  snapchat?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  website?: string | null;
}