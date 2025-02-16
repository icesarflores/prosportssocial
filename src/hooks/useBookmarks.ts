import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useBookmarks(postId?: string) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (postId && user) {
      checkBookmarkStatus();

      const channel = supabase
        .channel(`bookmarks-${postId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `post_id=eq.${postId}`,
          },
          () => {
            checkBookmarkStatus();
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [postId, user]);

  const checkBookmarkStatus = async () => {
    if (!user || !postId) return;

    try {
      const { data } = await supabase
        .from("bookmarks")
        .select()
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      setIsBookmarked(!!data);
    } catch (error) {
      console.error("Error checking bookmark status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (!user || !postId) return;

    try {
      if (isBookmarked) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        await supabase.from("bookmarks").insert([
          {
            post_id: postId,
            user_id: user.id,
          },
        ]);
      }

      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return {
    isBookmarked,
    loading,
    toggleBookmark,
  };
}
