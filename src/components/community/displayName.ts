import type { PublicUserCard } from "@/services/community";

/** "First Last", falling back to the username. */
export const displayName = (u: Pick<PublicUserCard, "firstname" | "surname" | "username"> | null) =>
  u ? [u.firstname, u.surname].filter(Boolean).join(" ").trim() || u.username : "Deleted user";
