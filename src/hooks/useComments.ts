import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author?: {
    username: string;
    avatar_url?: string;
    full_name: string;
  };
}

export function useComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          fetchComments();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

    const subscription = supabase
      .channel(`comments:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `post_id=eq.${postId}`,
        },
        fetchComments,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [postId]);

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          `
          *,
          author:profiles(username, avatar_url, full_name)
        `,
        )
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addComment(content: string) {
    if (!user) return;

    try {
      const { error } = await supabase.from("comments").insert([
        {
          content,
          post_id: postId,
          user_id: user.id,
        },
      ]);

      if (error) throw error;
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  async function deleteComment(commentId: string) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId)
        .eq("user_id", user.id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  return {
    comments,
    loading,
    addComment,
    deleteComment,
  };
}
