export interface LoginPayload {
  email: string;
  password: string;
}



export interface SignupPayload {
  firstname:string;
  lastname:string;
  username:string;
  email: string;
  password: string;
  password_confirmation:string
}

export interface  SignupResponse {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
}
export interface AuthResponse {
  token: string;
  user:User
}


