import api from "../../lib/axios";
import type { Notifications } from "../../types/artist/notificationtypes";

export const getNotifications = async (): Promise<Notifications> => {
  const res = await api.get("/notifications");
  console.log(res.data);
  return res.data;
};
