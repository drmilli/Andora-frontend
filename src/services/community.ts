import api from "../lib/axios";

export interface PublicUserCard {
  id: string;
  firstname: string;
  surname: string;
  username: string;
  profilePicture: string | null;
  role: string;
}

export interface Post {
  id: string;
  content: string | null;
  mediaUrl: string | null;
  createdAt: string;
  userId: string | null;
  user: PublicUserCard | null;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
  isMine: boolean;
}

export interface PostComment {
  id: string;
  text: string;
  createdAt: string;
  user: PublicUserCard | null;
}

export interface Paginated<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PublicProfile extends PublicUserCard {
  bio: string | null;
  coverPicture: string | null;
  instagram: string | null;
  twitter: string | null;
  tiktok: string | null;
  snapchat: string | null;
  facebook: string | null;
  youtube: string | null;
  website: string | null;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isFollowing: boolean;
  isMe: boolean;
}

export interface PersonResult extends PublicUserCard {
  followerCount: number;
  isFollowing: boolean;
}

/** The feed. `following` limits it to people you follow; `userId` to one person. */
export const fetchPosts = async (
  opts: { page?: number; following?: boolean; userId?: string } = {}
): Promise<Paginated<Post>> => {
  const res = await api.get("/posts", {
    params: {
      page: opts.page ?? 1,
      limit: 20,
      ...(opts.following ? { following: true } : {}),
      ...(opts.userId ? { userId: opts.userId } : {}),
    },
  });
  return res.data;
};

export const createPost = async (payload: { content: string; mediaUrl?: string }): Promise<Post> => {
  const res = await api.post("/posts", payload);
  return res.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`);
};

export const toggleLike = async (id: string): Promise<{ liked: boolean; likeCount: number }> => {
  const res = await api.post(`/posts/${id}/like`);
  return res.data;
};

export const fetchComments = async (postId: string): Promise<PostComment[]> => {
  const res = await api.get(`/posts/${postId}/comments`);
  return res.data;
};

export const addComment = async (postId: string, text: string): Promise<PostComment> => {
  const res = await api.post(`/posts/${postId}/comment`, { text });
  return res.data;
};

export const fetchPublicProfile = async (id: string): Promise<PublicProfile> => {
  const res = await api.get(`/users/${id}/profile`);
  return res.data;
};

export const searchPeople = async (q: string): Promise<PersonResult[]> => {
  const res = await api.get("/users/search", { params: q ? { q } : {} });
  return res.data;
};

export const followUser = async (id: string): Promise<void> => {
  await api.post(`/users/follow/${id}`);
};

export const unfollowUser = async (id: string): Promise<void> => {
  await api.post(`/users/unfollow/${id}`);
};
