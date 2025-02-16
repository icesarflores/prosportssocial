import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface Profile {
  username: string;
  avatar_url?: string;
  full_name: string;
}

export interface Post {
  id: string;
  created_at: string;
  content: string;
  user_id: string;
  team_id?: string;
  image_url?: string;
  likes: number;
  comments: number;
  shares: number;
  author: Profile;
}

export function usePosts(teamId?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { user } = useAuth();

  const transformPost = (post: any): Post => {
    const defaultAuthor = {
      username: "anonymous",
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`,
      full_name: "Anonymous User",
    };

    return {
      ...post,
      author: post.author || defaultAuthor,
    };
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to posts changes
    const postsChannel = supabase
      .channel(`posts-${teamId || "all"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
          filter: teamId ? `team_id=eq.${teamId}` : undefined,
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
            return;
          }

          const { data, error } = await supabase
            .from("posts")
            .select(`*, author:profiles!posts_user_id_fkey(*)`)
            .eq("id", payload.new.id)
            .single();

          if (error) {
            console.error("Error fetching post:", error);
            return;
          }

          if (data) {
            if (payload.eventType === "INSERT") {
              setPosts((prev) => [transformPost(data), ...prev]);
            } else if (payload.eventType === "UPDATE") {
              setPosts((prev) =>
                prev.map((p) => (p.id === data.id ? transformPost(data) : p)),
              );
            }
          }
        },
      )
      .subscribe();

    // Subscribe to likes changes
    const likesChannel = supabase
      .channel(`likes-${teamId || "all"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
        },
        async ({ eventType, new: newRecord, old: oldRecord }) => {
          const postId = newRecord?.post_id || oldRecord?.post_id;
          if (!postId) return;

          const { data: likesCount } = await supabase
            .from("likes")
            .select("id", { count: "exact" })
            .eq("post_id", postId);

          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, likes: likesCount || 0 } : p,
            ),
          );
        },
      )
      .subscribe();

    // Subscribe to comments changes
    const commentsChannel = supabase
      .channel(`comments-${teamId || "all"}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        async ({ eventType, new: newRecord, old: oldRecord }) => {
          const postId = newRecord?.post_id || oldRecord?.post_id;
          if (!postId) return;

          const { count: commentsCount } = await supabase
            .from("comments")
            .select("*", { count: "exact" })
            .eq("post_id", postId);

          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, comments: commentsCount || 0 } : p,
            ),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, [teamId]);

  async function fetchPosts(loadMore = false) {
    if (loadMore && !hasMore) return;
    try {
      let query = supabase
        .from("posts")
        .select(`*, author:profiles!posts_user_id_fkey(*)`);

      if (teamId) {
        query = query.eq("team_id", teamId);
      }

      const { data, error } = await query
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (error) throw error;

      const transformedPosts = (data || []).map(transformPost);

      if (loadMore) {
        setPosts((prev) => [...prev, ...transformedPosts]);
      } else {
        setPosts(transformedPosts);
      }
      setHasMore((data || []).length === PAGE_SIZE);
      if (loadMore) setPage((p) => p + 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function createPost(content: string, media?: File) {
    if (!user) return null;

    try {
      let mediaUrl = null;
      if (media) {
        const fileExt = media.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("posts")
          .upload(fileName, media, {
            cacheControl: "3600",
            contentType: media.type,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("posts")
          .getPublicUrl(fileName);

        mediaUrl = urlData.publicUrl;
      }

      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert([
          {
            content,
            user_id: user.id,
            team_id: teamId,
            created_at: new Date().toISOString(),
            image_url: mediaUrl,
            likes: 0,
            comments: 0,
            shares: 0,
          },
        ])
        .select(`*, author:profiles!posts_user_id_fkey(*)`)
        .single();

      if (postError) throw postError;

      const transformedPost = transformPost(post);
      setPosts((prev) => [transformedPost, ...prev]);
      return transformedPost;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  const deletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", user.id);

      if (error) throw error;

      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  const updatePost = async (postId: string, content: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("posts")
        .update({ content })
        .eq("id", postId)
        .eq("user_id", user.id);

      if (error) throw error;

      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, content } : p)),
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  };

  return {
    posts,
    loading,
    hasMore,
    createPost,
    deletePost,
    updatePost,
    fetchPosts,
  };
}
