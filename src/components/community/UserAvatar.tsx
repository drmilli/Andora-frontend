import type { PublicUserCard } from "@/services/community";

const SIZES = { sm: "w-9 h-9 text-xs", md: "w-11 h-11 text-sm", lg: "w-20 h-20 text-xl" } as const;

/** Profile picture, or the user's initials when they haven't set one. */
export function UserAvatar({ user, size = "md" }: { user: Pick<PublicUserCard, "username" | "firstname" | "surname" | "profilePicture"> | null; size?: keyof typeof SIZES }) {
  const cls = `${SIZES[size]} rounded-full flex-shrink-0 object-cover`;
  if (user?.profilePicture) return <img src={user.profilePicture} alt="" className={cls} />;
  const initials =
    [user?.firstname?.[0], user?.surname?.[0]].filter(Boolean).join("") || user?.username?.[0] || "?";
  return (
    <span aria-hidden="true" className={`${cls} bg-[#A67102]/25 text-[#f5b640] font-semibold flex items-center justify-center uppercase`}>
      {initials}
    </span>
  );
}

