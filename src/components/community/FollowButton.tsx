import React from "react";
import { followUser, unfollowUser } from "@/services/community";
import { apiErrorMessage } from "@/lib/influencer";

/** Follow / Following toggle. Reports the new state so counts can update. */
export function FollowButton({
  userId,
  initial,
  onChange,
  small = false,
}: {
  userId: string;
  initial: boolean;
  onChange?: (following: boolean) => void;
  small?: boolean;
}) {
  const [following, setFollowing] = React.useState(initial);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const toggle = async () => {
    try {
      setBusy(true);
      setError(null);
      if (following) await unfollowUser(userId);
      else await followUser(userId);
      setFollowing(!following);
      onChange?.(!following);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not update follow"));
    } finally {
      setBusy(false);
    }
  };

  const size = small ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm";
  return (
    <span className="inline-flex flex-col items-end">
      <button
        onClick={toggle}
        disabled={busy}
        aria-pressed={following}
        className={`${size} rounded-full font-medium disabled:opacity-50 ${
          following ? "border border-gray-600 text-white hover:bg-[#2a2a2a]" : "bg-[#A67102] hover:bg-[#8a5e02] text-white"
        }`}
      >
        {following ? "Following" : "Follow"}
      </button>
      {error && <span className="text-red-400 text-[11px] mt-1" role="alert">{error}</span>}
    </span>
  );
}
