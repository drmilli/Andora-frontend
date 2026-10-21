export interface Media {
  id: string;
  title?: string | null;
  fileUrl: string;
  publicId?: string | null;
  type: string | null;
  genre?: string | null;
  duration?: number | null;
  plays?: number;
  likes?: number;
  downloads?: number;
  description?: string | null;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedById?: string | null;
  uploadedBy?: {
    id?: string;
    username: string;
    firstname?: string;
    surname?: string;
    profilePicture?: string | null;
  } | null;
  _count?: { promotionRequests: number };
}

export type MediaType = "audio" | "video";
