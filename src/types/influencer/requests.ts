
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
    mediaId: string | null;
    artist: {
      id: string;
      firstname: string;
      surname: string;
      username: string;
      email: string;
      profilePicture: string | null;
    };
    influencer: {
      id: string;
      firstname: string;
      surname: string;
      username: string;
      email: string;
      profilePicture: string | null;
    };
    media: {
      id: string;
      title: string | null;
      fileUrl: string;
      publicId: string | null;
      type: string | null;
      duration: number | null;
      description: string | null;
    } | null;
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
  mediaId: string | null;
  artist: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string | null;
  };
  influencer: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string | null;
  };
  media: {
    id: string;
    title: string | null;
    fileUrl: string;
    publicId: string | null;
    type: string | null;
    duration: number | null;
    description: string | null;
  } | null;
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
  mediaId: string | null;
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
  mediaId: string | null;
  artist: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string | null;
  };
  influencer: {
    id: string;
    firstname: string;
    surname: string;
    username: string;
    email: string;
    profilePicture: string | null;
  };
  media: {
    id: string;
    title: string | null;
    fileUrl: string;
    publicId: string | null;
    type: string | null;
    duration: number | null;
    description: string | null;
  } | null;
  respondedAt: string | null;
  completedAt: string | null;
  disputedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// The full paginated response from GET /influencer/me/requests
export type PaginatedInfluencerRequests = {
  data: GetInfluencerRequest[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}