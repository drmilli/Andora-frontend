import api from "../lib/axios";
import type { Notification, Notifications } from "../types/artist/notificationtypes";

export const getNotifications = async (): Promise<Notifications> => {
  const res = await api.get("/notifications");
  return res.data;
};

export const getNotificationById = async (id: string): Promise<Notification> => {
  const res = await api.get(`/notifications/${id}`);
  return res.data;
};

export const markNotificationAsRead = async (id: string): Promise<Notification> => {
  const res = await api.put(`/notifications/${id}/read`);
  return res.data;
};
