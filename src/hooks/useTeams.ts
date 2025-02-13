import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useTeams() {
  const [followedTeams, setFollowedTeams] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFollowedTeams();

      // Subscribe to team_follows changes
      const channel = supabase
        .channel(`team_follows_${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "team_follows",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setFollowedTeams((prev) => [...prev, payload.new.team_id]);
          },
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "team_follows",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            setFollowedTeams((prev) =>
              prev.filter((id) => id !== payload.old.team_id),
            );
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  async function fetchFollowedTeams() {
    try {
      const { data, error } = await supabase
        .from("team_follows")
        .select("team_id")
        .eq("user_id", user?.id);

      if (error) throw error;
      setFollowedTeams(data?.map((item) => item.team_id) || []);
    } catch (error) {
      console.error("Error fetching followed teams:", error);
    } finally {
      setLoading(false);
    }
  }

  async function followTeam(teamId: string) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("team_follows")
        .insert([{ user_id: user.id, team_id: teamId }]);

      if (error) throw error;
      setFollowedTeams((prev) => [...prev, teamId]);
    } catch (error) {
      console.error("Error following team:", error);
    }
  }

  async function unfollowTeam(teamId: string) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("team_follows")
        .delete()
        .eq("user_id", user.id)
        .eq("team_id", teamId);

      if (error) throw error;
      setFollowedTeams((prev) => prev.filter((id) => id !== teamId));
    } catch (error) {
      console.error("Error unfollowing team:", error);
    }
  }

  return {
    followedTeams,
    loading,
    followTeam,
    unfollowTeam,
  };
}
