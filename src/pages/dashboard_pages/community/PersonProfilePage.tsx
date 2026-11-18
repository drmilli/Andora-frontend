import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Globe } from "lucide-react";
import { fetchPosts, fetchPublicProfile, type Post, type PublicProfile } from "@/services/community";
import { fetchServices, type Service } from "@/services/marketplace";
import { apiErrorMessage, formatNaira } from "@/lib/influencer";
import { PostCard } from "@/components/community/PostCard";
import { FollowButton } from "@/components/community/FollowButton";
import { UserAvatar } from "@/components/community/UserAvatar";
import { displayName } from "@/components/community/displayName";

const SOCIALS: Array<{ key: keyof PublicProfile; label: string; url: (h: string) => string }> = [
  { key: "instagram", label: "Instagram", url: (h) => `https://instagram.com/${h.replace(/^@/, "")}` },
  { key: "twitter", label: "X", url: (h) => `https://x.com/${h.replace(/^@/, "")}` },
  { key: "tiktok", label: "TikTok", url: (h) => `https://tiktok.com/@${h.replace(/^@/, "")}` },
  { key: "youtube", label: "YouTube", url: (h) => (h.startsWith("http") ? h : `https://youtube.com/@${h.replace(/^@/, "")}`) },
];

function ProfileView({ id }: { id: string }) {
  const [profile, setProfile] = React.useState<PublicProfile | null>(null);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([fetchPublicProfile(id), fetchPosts({ userId: id }), fetchServices({ userId: id })])
      .then(([p, ps, sv]) => {
        if (cancelled) return;
        setProfile(p);
        setPosts(ps.data);
        setServices(sv.data);
      })
      .catch((err) => !cancelled && setError(apiErrorMessage(err, "Could not load this profile")));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <p className="text-red-400 p-4" role="alert">{error}</p>;
  if (!profile) return <p className="text-gray-400 p-4">Loading...</p>;

  const website = profile.website && /^https?:\/\//i.test(profile.website) ? profile.website : null;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/dashboard/community" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4">
        <ArrowLeft size={16} /> Community
      </Link>

      <section className="bg-[#0D0B07] border border-gray-900 rounded-2xl overflow-hidden mb-6">
        {profile.coverPicture ? (
          <img src={profile.coverPicture} alt="" className="h-36 w-full object-cover" />
        ) : (
          <div className="h-24 bg-gradient-to-r from-[#A67102]/40 to-transparent" />
        )}
        <div className="p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 min-w-0">
              <UserAvatar user={profile} size="lg" />
              <div className="min-w-0">
                <h1 className="text-xl font-semibold truncate">{displayName(profile)}</h1>
                <p className="text-gray-500 text-sm">@{profile.username} &bull; <span className="capitalize">{profile.role}</span></p>
              </div>
            </div>
            {!profile.isMe && (
              <FollowButton
                userId={profile.id}
                initial={profile.isFollowing}
                onChange={(f) => setProfile((p) => (p ? { ...p, isFollowing: f, followerCount: p.followerCount + (f ? 1 : -1) } : p))}
              />
            )}
          </div>

          {profile.bio && <p className="text-gray-300 text-sm mt-4 whitespace-pre-wrap">{profile.bio}</p>}

          <dl className="flex gap-6 mt-4 text-sm">
            <div><dt className="text-gray-500">Followers</dt><dd className="font-semibold">{profile.followerCount}</dd></div>
            <div><dt className="text-gray-500">Following</dt><dd className="font-semibold">{profile.followingCount}</dd></div>
            <div><dt className="text-gray-500">Posts</dt><dd className="font-semibold">{profile.postCount}</dd></div>
          </dl>

          <div className="flex gap-3 flex-wrap mt-4 text-xs">
            {SOCIALS.filter((s) => profile[s.key]).map((s) => (
              <a key={s.key} href={s.url(String(profile[s.key]))} target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1 rounded-full bg-[#1a1a1a] text-gray-300 hover:text-white">
                {s.label}
              </a>
            ))}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer nofollow" className="px-3 py-1 rounded-full bg-[#1a1a1a] text-gray-300 hover:text-white inline-flex items-center gap-1">
                <Globe size={12} /> Website
              </a>
            )}
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold mb-3">Services</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.id} className="bg-[#0D0B07] border border-gray-900 rounded-xl p-4">
                <p className="text-white font-medium">{s.title}</p>
                <p className="text-[#f5b640] text-sm">{formatNaira(s.price)}</p>
                <p className="text-gray-400 text-sm mt-1 line-clamp-3">{s.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <h2 className="font-semibold mb-3">Posts</h2>
      {posts.length === 0 && <p className="text-gray-400">No posts yet.</p>}
      <div className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onDeleted={(pid) => setPosts((prev) => prev.filter((x) => x.id !== pid))} />
        ))}
      </div>
    </div>
  );
}

export default function PersonProfilePage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Keyed so moving between profiles starts fresh */}
      {id && <ProfileView key={id} id={id} />}
    </div>
  );
}
