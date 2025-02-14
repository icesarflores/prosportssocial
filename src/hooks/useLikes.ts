import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useLikes(postId: string) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkIfLiked();
      getLikesCount();
    }

    const channel = supabase
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
      channel.unsubscribe();
    };
  }, [postId, user]);

  const checkIfLiked = async () => {
    try {
      const { data } = await supabase
        .from("likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user?.id)
        .single();

      setIsLiked(!!data);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const getLikesCount = async () => {
    try {
      const { count } = await supabase
        .from("likes")
        .select("id", { count: "exact" })
        .eq("post_id", postId);

      setLikesCount(count || 0);
    } catch (error) {
      console.error("Error getting likes count:", error);
    }
  };

  const toggleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);

        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await supabase
          .from("likes")
          .insert([{ post_id: postId, user_id: user.id }]);

        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return { isLiked, likesCount, toggleLike };
}
