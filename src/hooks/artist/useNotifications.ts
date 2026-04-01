import { getNotifications } from "@/services/artist/notifications";
import { useState, useEffect } from "react";
import type { Notifications } from "@/types/artist/notificationtypes";

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<Notifications>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getNotifications();
                setNotifications(data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch notifications");
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);


    return { notifications, loading, error };
};
