import api from "../../../lib/axios";
import type { GetInfluencerProfileResponse, UpdateInfluencerProfilePayload } from "@/types/influencer/profile";


export const fetchProfile = async (): Promise<GetInfluencerProfileResponse> => {
  const res = await api.get("/influencer/me/profile");
  return res.data; 
};
export const updateProfile = async (payload: UpdateInfluencerProfilePayload): Promise<GetInfluencerProfileResponse> => {
  const res = await api.patch("/influencer/me/profile", payload);
  return res.data; 
};