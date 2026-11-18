import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import {
  createPost,
  fetchPosts,
  searchPeople,
  type PersonResult,
  type Post,
} from "@/services/community";
import { apiErrorMessage } from "@/lib/influencer";
import { PostCard } from "@/components/community/PostCard";
import { FollowButton } from "@/components/community/FollowButton";
import { UserAvatar } from "@/components/community/UserAvatar";
import { displayName } from "@/components/community/displayName";
import { inputCls, primaryBtn } from "@/components/community/Modal";

const MAX_POST = 2000;

export default function CommunityPage() {
  const [tab, setTab] = React.useState<"all" | "following">("all");
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [content, setContent] = React.useState("");
  const [link, setLink] = React.useState("");
  const [posting, setPosting] = React.useState(false);
  const [postError, setPostError] = React.useState<string | null>(null);

  const [query, setQuery] = React.useState("");
  const [people, setPeople] = React.useState<PersonResult[]>([]);

  const load = React.useCallback(async (p: number, which: "all" | "following") => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchPosts({ page: p, following: which === "following" });
      setPosts((prev) => (p === 1 ? res.data : [...prev, ...res.data]));
      setPage(res.page);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load the feed"));
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load(1, tab);
  }, [tab, load]);

  // People search: debounced; empty query shows newest members to follow
  React.useEffect(() => {
    const t = setTimeout(() => {
      searchPeople(query.trim()).then(setPeople).catch(() => setPeople([]));
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = content.trim();
    const url = link.trim();
    if (!text && !url) return setPostError("Write something or add a link.");
    if (url && !/^https:\/\//i.test(url)) return setPostError("Links must start with https://");
    try {
      setPosting(true);
      setPostError(null);
      const post = await createPost({ content: text, ...(url ? { mediaUrl: url } : {}) });
      setPosts((prev) => [post, ...prev]);
      setContent("");
      setLink("");
    } catch (err) {
      setPostError(apiErrorMessage(err, "Could not publish your post"));
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold mb-6">COMMUNITY</h1>

          <form onSubmit={submit} className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 mb-6">
            <label htmlFor="post-content" className="sr-only">Share an update</label>
            <textarea
              id="post-content"
              rows={3}
              maxLength={MAX_POST}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share a release, a session, or what you're working on"
              className={inputCls}
            />
            <label htmlFor="post-link" className="sr-only">Link (optional)</label>
            <input
              id="post-link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link to a track, video or image (optional, https://)"
              className={`${inputCls} mt-2`}
            />
            {postError && <p className="text-red-400 text-sm mt-2" role="alert">{postError}</p>}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">{content.length}/{MAX_POST}</span>
              <button disabled={posting} className={primaryBtn}>{posting ? "Posting..." : "Post"}</button>
            </div>
          </form>

          <div className="flex gap-3 mb-4" role="tablist">
            {(["all", "following"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  tab === t ? "bg-[#A67102] text-white" : "bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]"
                }`}
              >
                {t === "all" ? "Everyone" : "Following"}
              </button>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm mb-4" role="alert">{error}</p>}
          {!loading && !error && posts.length === 0 && (
            <p className="text-gray-400">
              {tab === "following" ? "Nothing yet from people you follow. Find people on the right." : "No posts yet. Be the first."}
            </p>
          )}

          <div className="space-y-4">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} onDeleted={(id) => setPosts((prev) => prev.filter((x) => x.id !== id))} />
            ))}
          </div>

          {loading && <p className="text-gray-400 mt-4">Loading...</p>}
          {!loading && page < totalPages && (
            <button onClick={() => load(page + 1, tab)} className="mt-6 w-full py-3 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] text-sm text-gray-300">
              Load more
            </button>
          )}
        </div>

        <aside className="lg:pt-14">
          <div className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5 lg:sticky lg:top-4">
            <h2 className="font-semibold mb-3">Find people</h2>
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" aria-hidden="true" />
              <label htmlFor="people-search" className="sr-only">Search people</label>
              <input
                id="people-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or username"
                className={`${inputCls} pl-9`}
              />
            </div>
            {people.length === 0 && <p className="text-gray-500 text-sm">No one found.</p>}
            <ul className="space-y-3">
              {people.map((u) => (
                <li key={u.id} className="flex items-center gap-3">
                  <Link to={`/dashboard/people/${u.id}`} className="flex items-center gap-3 min-w-0 flex-1 group">
                    <UserAvatar user={u} size="sm" />
                    <span className="min-w-0">
                      <span className="block text-sm text-white truncate group-hover:underline">{displayName(u)}</span>
                      <span className="block text-xs text-gray-500 capitalize">{u.role} &bull; {u.followerCount} followers</span>
                    </span>
                  </Link>
                  <FollowButton userId={u.id} initial={u.isFollowing} small />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
