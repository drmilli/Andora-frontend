import api from "../../lib/axios";
import type { MediaResponse, GetMediaResponse, UploadMediaPayload } from "@/types/artist/media";




export const uploadMedia = async (
  payload: UploadMediaPayload
): Promise<MediaResponse> => {
  const formData = new FormData();

  if (payload.file) {
    formData.append("file", payload.file);
  }

  formData.append("title", payload.title);
  formData.append("description", payload.description);
   console.log("Uploading:", {
    file: payload.file,
    title: payload.title,
    description: payload.description,
  });

  const res = await api.post("/media/upload", formData);

  return res.data;
};

export const GetMedia = async (): Promise<GetMediaResponse> => {
  const res = await api.get("/media");
  return res.data;
};
