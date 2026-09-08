
import {client} from "@/lib/axios";
import type { ResponseBody } from "@/types/client/country";


export const GetAllCountries = async (): Promise<ResponseBody> => {
  const res = await client.get("/countries");
  return res.data;
};
