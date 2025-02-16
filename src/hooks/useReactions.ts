import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export type ReactionType = "👍";

export function useReactions(postId: string) {
  const [reactions, setReactions] = useState<Record<ReactionType, number>>({
    "👍": 0,
  });
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (postId && user) {
      fetchReactions();

      const channel = supabase
        .channel(`reactions-${postId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "reactions",
            filter: `post_id=eq.${postId}`,
          },
          () => {
            fetchReactions();
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [postId, user]);

  const fetchReactions = async () => {
    if (!user || !postId) return;

    try {
      const { data: reactionCounts } = await supabase
        .from("reactions")
        .select("type")
        .eq("post_id", postId);

      const { data: userReaction } = await supabase
        .from("reactions")
        .select("type")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();

      const counts: Record<ReactionType, number> = { "👍": 0 };
      reactionCounts?.forEach((r) => {
        if (r.type === "👍") counts["👍"]++;
      });

      setReactions(counts);
      setUserReaction((userReaction?.type as ReactionType) || null);
    } catch (error) {
      console.error("Error fetching reactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addReaction = async (type: ReactionType) => {
    if (!user || !postId) return;

    try {
      if (userReaction === type) {
        await supabase
          .from("reactions")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        setUserReaction(null);
      } else {
        if (userReaction) {
          await supabase
            .from("reactions")
            .delete()
            .eq("post_id", postId)
            .eq("user_id", user.id);
        }
        await supabase.from("reactions").insert([
          {
            post_id: postId,
            user_id: user.id,
            type,
          },
        ]);
        setUserReaction(type);
      }
    } catch (error) {
      console.error("Error adding reaction:", error);
    }
  };

  return {
    reactions,
    userReaction,
    loading,
    addReaction,
  };
}
