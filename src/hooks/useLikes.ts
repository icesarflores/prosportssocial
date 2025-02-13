import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useLikes(postId: string) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkIfLiked();
      getLikesCount();
    }

    const subscription = supabase
      .channel(`likes:${postId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "likes",
          filter: `post_id=eq.${postId}`,
        },
        () => {
          getLikesCount();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [postId, user]);

  async function checkIfLiked() {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      setIsLiked(!!data);
    } catch (error) {
      console.error("Error checking like status:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getLikesCount() {
    try {
      const { count, error } = await supabase
        .from("likes")
        .select("id", { count: "exact" })
        .eq("post_id", postId);

      if (error) throw error;
      setLikesCount(count || 0);
    } catch (error) {
      console.error("Error getting likes count:", error);
    }
  }

  async function toggleLike() {
    if (!user) return;

    try {
      if (isLiked) {
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        if (error) throw error;
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        const { error } = await supabase
          .from("likes")
          .insert([{ post_id: postId, user_id: user.id }]);

        if (error) throw error;
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  return {
    isLiked,
    likesCount,
    loading,
    toggleLike,
  };
}
