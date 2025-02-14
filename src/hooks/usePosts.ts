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
      author: {
        username: post.author?.username || defaultAuthor.username,
        avatar: post.author?.avatar_url || defaultAuthor.avatar_url,
        name: post.author?.full_name || defaultAuthor.full_name,
      },
    };
  };

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel(`posts-${teamId || "all"}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "posts",
          filter: teamId ? `team_id=eq.${teamId}` : undefined,
        },
        async (payload) => {
          const { data, error } = await supabase
            .from("posts")
            .select(`*, author:profiles!posts_user_id_fkey(*)`) // Include profiles in real-time updates
            .eq("id", payload.new.id)
            .single();

          if (error) {
            console.error("Error fetching new post:", error);
            return;
          }

          if (data) {
            setPosts((prev) => [transformPost(data), ...prev]);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("posts")
          .upload(filePath, media, {
            cacheControl: "3600",
            upsert: true,
            contentType: media.type,
          });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
        mediaUrl = data.publicUrl;
      }

      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert([
          {
            content,
            user_id: user.id,
            team_id: teamId,
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
