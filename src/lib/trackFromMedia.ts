import type { Media } from "@/types/media";
import type { Campaign } from "@/types/artist/campaign";
import type { SongCampaign, TrackDetail } from "@/types/artist/song";
import cover from "@/assets/admin/MusicCover.png";
import { formatNaira } from "@/lib/influencer";

const TIER_LABEL: Record<Campaign["tier"], SongCampaign["tier"]> = {
  STARTER: "Starter",
  MEDIUM: "Medium",
  PRO: "Pro",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const fmtDuration = (secs?: number | null) =>
  secs == null ? "—" : `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, "0")}`;

/**
 * Build the song screens' view of a track from what the platform actually
 * records. Things Audora doesn't track yet (radio spins, DSP streams, BPM,
 * ISRC, lyrics...) come back empty rather than invented.
 */
export function trackFromMedia(media: Media, campaigns: Campaign[], artistName: string): TrackDetail {
  const mine = campaigns.filter((c) => c.mediaId === media.id);
  const active = mine.filter((c) => c.status === "ACTIVE").length;
  const status: TrackDetail["status"] = active > 0
    ? "Active"
    : mine.some((c) => c.status === "COMPLETED")
      ? "Completed"
      : "Not Active";

  const posts = mine.reduce(
    (n, c) => n + (c.requests ?? []).filter((r) => r.status === "COMPLETED").length,
    0
  );
  const ext = media.fileUrl.split("?")[0].split(".").pop()?.toUpperCase();

  return {
    id: media.id,
    name: media.title || "Untitled",
    artist: artistName,
    status,
    campaigns: active,
    uploaded: new Date(media.createdAt).toISOString().slice(0, 10),
    image: cover,
    genre: media.genre || "—",
    duration: fmtDuration(media.duration),
    bpm: 0,
    musicalKey: "—",
    isrc: "—",
    upc: "—",
    releaseDate: fmtDate(media.createdAt),
    album: "—",
    label: "—",
    explicit: false,
    fileSize: "—",
    fileFormat: ext && ext.length <= 5 ? ext : "—",
    audioUrl: media.fileUrl,
    streams: media.plays ?? 0,
    radioPlays: 0,
    tvPlays: 0,
    influencerPosts: posts,
    totalReach: "—",
    revenue: "—",
    description: media.description || "",
    credits: { producers: [], writers: [] },
    platforms: [],
    campaignsList: mine
      .filter((c) => c.status !== "CANCELLED" && c.status !== "DECLINED")
      .map((c) => ({
        id: c.id,
        name: `${TIER_LABEL[c.tier]} Push`,
        type: "Influencer Push",
        tier: TIER_LABEL[c.tier],
        status: c.status === "COMPLETED" ? "Completed" : c.status === "ACTIVE" ? "Active" : "Scheduled",
        influencers: c.assigned,
        reach: "—",
        engagementRate: `${c.progress}% done`,
        budget: formatNaira(c.budget),
        startDate: c.status === "PENDING_REVIEW" ? "In review" : fmtDate(c.startedAt),
        endDate: c.status === "PENDING_REVIEW" ? "—" : fmtDate(c.endsAt),
      })),
    radioSpins: [],
    streamHistory: [],
    lyrics: "",
  };
}
