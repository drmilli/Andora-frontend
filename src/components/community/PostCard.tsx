import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Trash2, ExternalLink } from "lucide-react";
import {
  addComment,
  deletePost,
  fetchComments,
  toggleLike,
  type Post,
  type PostComment,
} from "@/services/community";
import { apiErrorMessage, formatRelativeTime } from "@/lib/influencer";
import { UserAvatar } from "./UserAvatar";
import { displayName } from "./displayName";

const isImage = (url: string) => /\.(png|jpe?g|gif|webp|avif)(\?|$)/i.test(url);

export function PostCard({ post, onDeleted }: { post: Post; onDeleted: (id: string) => void }) {
  const [liked, setLiked] = React.useState(post.likedByMe);
  const [likeCount, setLikeCount] = React.useState(post.likeCount);
  const [commentCount, setCommentCount] = React.useState(post.commentCount);
  const [showComments, setShowComments] = React.useState(false);
  const [comments, setComments] = React.useState<PostComment[] | null>(null);
  const [draft, setDraft] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const like = async () => {
    // Optimistic, then reconcile with the server's count
    setLiked(!liked);
    setLikeCount((c) => c + (liked ? -1 : 1));
    try {
      const res = await toggleLike(post.id);
      setLiked(res.liked);
      setLikeCount(res.likeCount);
    } catch (err) {
      setLiked(liked);
      setLikeCount(post.likeCount);
      setError(apiErrorMessage(err, "Could not update like"));
    }
  };

  const openComments = async () => {
    const next = !showComments;
    setShowComments(next);
    if (next && comments === null) {
      try {
        setComments(await fetchComments(post.id));
      } catch (err) {
        setError(apiErrorMessage(err, "Could not load comments"));
      }
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    try {
      setBusy(true);
      setError(null);
      const c = await addComment(post.id, draft.trim());
      setComments((prev) => [...(prev ?? []), c]);
      setCommentCount((n) => n + 1);
      setDraft("");
    } catch (err) {
      setError(apiErrorMessage(err, "Could not post comment"));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this post? This can't be undone.")) return;
    try {
      await deletePost(post.id);
      onDeleted(post.id);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not delete post"));
    }
  };

  return (
    <article className="bg-[#0D0B07] border border-gray-900 rounded-2xl p-5">
      <header className="flex items-start gap-3">
        {post.user ? (
          <Link to={`/dashboard/people/${post.user.id}`} className="flex items-center gap-3 min-w-0 flex-1 group">
            <UserAvatar user={post.user} />
            <div className="min-w-0">
              <p className="text-white font-medium truncate group-hover:underline">{displayName(post.user)}</p>
              <p className="text-gray-500 text-xs">
                @{post.user.username} &bull; {formatRelativeTime(post.createdAt)}
              </p>
            </div>
          </Link>
        ) : (
          <p className="text-gray-500 text-sm flex-1">Deleted user</p>
        )}
        {post.isMine && (
          <button onClick={remove} className="text-gray-500 hover:text-red-400 p-1" aria-label="Delete post">
            <Trash2 size={16} />
          </button>
        )}
      </header>

      {post.content && <p className="text-gray-200 text-sm mt-4 whitespace-pre-wrap break-words">{post.content}</p>}
      {post.mediaUrl &&
        (isImage(post.mediaUrl) ? (
          <img src={post.mediaUrl} alt="" className="mt-4 rounded-lg max-h-[420px] w-full object-cover" loading="lazy" />
        ) : (
          <a
            href={post.mediaUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="mt-4 flex items-center gap-2 text-[#f5b640] text-sm break-all hover:underline"
          >
            <ExternalLink size={14} className="flex-shrink-0" /> {post.mediaUrl}
          </a>
        ))}

      <div className="flex gap-5 mt-4 text-sm text-gray-400">
        <button
          onClick={like}
          aria-pressed={liked}
          className={`flex items-center gap-1.5 hover:text-white ${liked ? "text-[#f5b640]" : ""}`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} /> {likeCount}
          <span className="sr-only">{liked ? "Unlike" : "Like"}</span>
        </button>
        <button onClick={openComments} aria-expanded={showComments} className="flex items-center gap-1.5 hover:text-white">
          <MessageCircle size={16} /> {commentCount}
          <span className="sr-only">comments</span>
        </button>
      </div>

      {error && <p className="text-red-400 text-xs mt-2" role="alert">{error}</p>}

      {showComments && (
        <div className="mt-4 border-t border-gray-900 pt-4 space-y-3">
          {comments === null && <p className="text-gray-500 text-xs">Loading comments...</p>}
          {comments?.length === 0 && <p className="text-gray-500 text-xs">No comments yet.</p>}
          {comments?.map((c) => (
            <div key={c.id} className="flex gap-2">
              <UserAvatar user={c.user} size="sm" />
              <div className="bg-[#1a1a1a] rounded-lg px-3 py-2 min-w-0">
                <p className="text-xs text-gray-400">
                  {c.user ? (
                    <Link to={`/dashboard/people/${c.user.id}`} className="text-white font-medium hover:underline">
                      {displayName(c.user)}
                    </Link>
                  ) : (
                    "Deleted user"
                  )}{" "}
                  &bull; {formatRelativeTime(c.createdAt)}
                </p>
                <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">{c.text}</p>
              </div>
            </div>
          ))}
          <form onSubmit={submitComment} className="flex gap-2">
            <label htmlFor={`comment-${post.id}`} className="sr-only">Write a comment</label>
            <input
              id={`comment-${post.id}`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={1000}
              placeholder="Write a comment"
              className="flex-1 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-[#A67102]"
            />
            <button disabled={busy || !draft.trim()} className="px-4 py-2 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-md text-sm disabled:opacity-50">
              {busy ? "..." : "Reply"}
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
