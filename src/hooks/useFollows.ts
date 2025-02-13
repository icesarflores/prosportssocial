import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useFollows(userId?: string) {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchFollowData();

      const channel = supabase
        .channel(`follows_${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "follows",
            filter: `OR(follower_id.eq.${userId},following_id.eq.${userId})`,
          },
          () => {
            fetchFollowData();
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userId, user]);

  const fetchFollowData = async () => {
    if (!userId) return;

    try {
      // Get followers
      const { data: followersData } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("following_id", userId);

      setFollowers(followersData?.map((f) => f.follower_id) || []);

      // Get following
      const { data: followingData } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", userId);

      setFollowing(followingData?.map((f) => f.following_id) || []);

      // Check if current user is following
      if (user) {
        const { data } = await supabase
          .from("follows")
          .select()
          .eq("follower_id", user.id)
          .eq("following_id", userId)
          .single();

        setIsFollowing(!!data);
      }
    } catch (error) {
      console.error("Error fetching follow data:", error);
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (targetUserId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("follows").insert([
        {
          follower_id: user.id,
          following_id: targetUserId,
        },
      ]);

      if (error) throw error;
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const unfollowUser = async (targetUserId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", user.id)
        .eq("following_id", targetUserId);

      if (error) throw error;
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return {
    followers,
    following,
    isFollowing,
    loading,
    followUser,
    unfollowUser,
  };
}
