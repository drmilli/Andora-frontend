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
  profilePicture?: string | null;
}
export interface AuthResponse {
  token: string;
  user:User
}


