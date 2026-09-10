
export interface GetInfluencerProfileResponse {
  id: string;
  firstname: string;
  surname: string;
  username: string;
  email: string;
  role: string;
  bio: string | null;
  phone: string | null;
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
  firstname: string;
  surname: string;
  username: string;
  email: string;
  role: string;
  bio: string | null;
  phone: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  snapchat: string | null;
  facebook: string | null;
  youtube: string | null;
  website: string | null;
}