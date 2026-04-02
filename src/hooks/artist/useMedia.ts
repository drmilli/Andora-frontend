import { useState } from "react";
import { loginUser } from "../../services/auth";
import type { LoginPayload } from "../../types/auth";


export const useMedia = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    const uploadMedia = async (payload: LoginPayload) => {
        try {
            setLoading(true);
            setError(null);

            const data = await loginUser(payload);

            return data;

        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch notifications");
        } finally {
            setLoading(false)
        }
    };



    return { uploadMedia, loading, error };
};
