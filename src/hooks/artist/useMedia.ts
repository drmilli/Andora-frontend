import { useState, useContext } from "react";
import { loginUser, signupUser } from "../../services/auth";
import type { LoginPayload, SignupPayload } from "../../types/auth";


export const useMedia = () => {
    const [media, setMedia] = useState<any[]>([]);
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



    return { login, loading, error };
};
