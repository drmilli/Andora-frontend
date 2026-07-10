export interface Media {
  id: string;
  title?: string | null;
  fileUrl: string;
  publicId?: string | null;
  type?: string | null;
  description?: string | null;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  uploadedById?: string | null;
}

export type MediaType = "audio" | "video";
