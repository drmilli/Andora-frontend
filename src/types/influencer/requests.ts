
export type InfluencerRequestSent = {
  data: {
    id: string;
    platform: string;
    message: string;
    amount: number;
    status: string;
    progress: number;
    disputeReason: string | null;
    artistId: string;
    influencerId: string;
    mediaId: string;
    artist: {
      id: string;
      firstname: string;
      surname: string;
      username: string;
      email: string;
      profilePicture: string;
    };
    influencer: {
      id: string;
      firstname: string;
      surname: string;
      username: string;
      email: string;
      profilePicture: string;
    };
    media: {
      id: string;
      title: string;
      fileUrl: string;
      publicId: string;
      type: string;
      duration: number;
      description: string;
    };
    respondedAt: string | null;
    completedAt: string | null;
    disputedAt: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface InfluencerPromotionRequestRespose {
  id: string;
  platform: string;
  message: string;
  amount: number;
  status: string;
  progress: number;
  disputeReason: string | null;
  artistId: string;
  influencerId: string;
  mediaId: string;
  artist: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  influencer: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  media: {
    id: string;
    title: string;
    fileUrl: string;
    publicId: string;
    type: string;
    duration: number;
    description: string;
  };
  respondedAt: string | null;
  completedAt: string | null;
  disputedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

//Called by the artist paying for the promotion. {id} is the influencer's user id.
export type InfluencerRequestToPayPayload = {
  platform: string;
  message: string;
  amount: number;
  mediaId: string;
}


export type InfluencerRequestDisputePayload = {
  reason: string;
}


export type InfluencerRequestProgressPayload = {
  progress: number;
}


export type InfluencerRequestStatusPayload = {
  status: string;
}



export interface GetInfluencerRequest {
  id: string;
  platform: string;
  message: string;
  amount: number;
  status: string;
  progress: number;
  disputeReason: string | null;
  artistId: string;
  influencerId: string;
  mediaId: string;
  artist: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  influencer: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string;
  };
  media: {
    id: string;
    title: string;
    fileUrl: string;
    publicId: string;
    type: string;
    duration: number;
    description: string;
  };
  respondedAt: string | null;
  completedAt: string | null;
  disputedAt: string | null;
  createdAt: string;
  updatedAt: string;
}