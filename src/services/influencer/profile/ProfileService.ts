import api from "../../../lib/axios";
import type { GetInfluencerProfileResponse, UpdateInfluencerProfilePayload } from "@/types/influencer/profile";


export const fetchProfile = async (): Promise<GetInfluencerProfileResponse> => {
  const res = await api.get("/influencer/me/profile");
  return res.data; 
};
export const updateProfile = async (payload: UpdateInfluencerProfilePayload): Promise<GetInfluencerProfileResponse> => {
  const res = await api.put("/influencer/me/profile", payload);
  return res.data; 
};

/** Multipart upload for the banner and/or avatar on the profile Edit tab. */
export const uploadProfileImages = async (files: {
  profilePicture?: File;
  coverPicture?: File;
}): Promise<GetInfluencerProfileResponse> => {
  const formData = new FormData();
  if (files.profilePicture) formData.append("profilePicture", files.profilePicture);
  if (files.coverPicture) formData.append("coverPicture", files.coverPicture);

  const res = await api.post("/influencer/me/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
