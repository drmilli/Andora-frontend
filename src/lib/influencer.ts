import All from "../assets/socials/All.png";
import Facebook from "../assets/socials/Facebook.png";
import Instagram from "../assets/socials/Instagram.png";
import Snapchat from "../assets/socials/Snapchat.png";
import Tiktok from "../assets/socials/Tiktok.png";
import Twitter from "../assets/socials/X.png";
import Youtube from "../assets/socials/Youtube.png";

/** Platform values the API accepts, lowercase. "all" is a UI-only tab. */
export const SOCIALS = [
  { icon: All, value: "all" },
  { icon: Twitter, value: "twitter" },
  { icon: Instagram, value: "instagram" },
  { icon: Facebook, value: "facebook" },
  { icon: Youtube, value: "youtube" },
  { icon: Snapchat, value: "snapchat" },
  { icon: Tiktok, value: "tiktok" },
] as const;

export const platformIcon = (platform?: string | null) =>
  SOCIALS.find((s) => s.value === platform?.toLowerCase())?.icon ?? All;

/** Media duration is seconds and may be null — render a dash rather than NaN. */
export const formatDuration = (seconds?: number | null) => {
  if (seconds == null || Number.isNaN(seconds)) return "--:--";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

export const formatNaira = (amount?: number | null) =>
  `₦${(amount ?? 0).toLocaleString("en-NG")}`;

export const formatRelativeTime = (iso?: string | null) => {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
};

/** Pull a readable message out of an axios error. */
export const apiErrorMessage = (err: unknown, fallback = "Something went wrong") => {
  const e = err as { response?: { data?: { message?: string; error?: string } } };
  return e?.response?.data?.message || e?.response?.data?.error || fallback;
};
