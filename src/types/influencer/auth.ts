export interface LoginInfluencerPayload {
  email: string;
  password: string;
}


export interface SignupInfluencerPayload {
  firstname:string;
  surname:string;
  username:string;
  email: string;
  password: string;
  password_confirmation:string
  role:string
}

export interface InfluencerUser {
  id: string;
  email: string;
  username: string;
  firstname: string;
  surname: string;
  role: string;
  bio?: string | null;
  profilePicture?: string | null;
  coverPicture?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  tiktok?: string | null;
  snapchat?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  website?: string | null;
  updatedAt?: string;
}
export interface InfluencerAuthResponse {
  token: string;
  user:InfluencerUser
}


