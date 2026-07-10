export interface LoginPayload {
  email: string;
  password: string;
}



export interface SignupPayload {
  firstname:string;
  surname:string;
  username:string;
  email: string;
  password: string;
  password_confirmation:string
}


export interface User {
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
  website?: string | null;
  updatedAt?: string;
}
export interface AuthResponse {
  token: string;
  user:User
}


