import api from "../../../lib/axios";
import type {
  LoginInfluencerPayload,
  InfluencerAuthResponse,
  SignupInfluencerPayload,
} from "../../../types/influencer/auth";

// influencer auth
export const influencerLogin = async (
  data: LoginInfluencerPayload
): Promise<InfluencerAuthResponse> => {
  const res = await api.post("/auth/login", data);
  console.log(res.data);
  return res.data;
};

export const influencerSignup = async (
  data: SignupInfluencerPayload
): Promise<InfluencerAuthResponse> => {
  const res = await api.post("/auth/register", data);
  console.log("response data", res.data);
  return res.data;
};
