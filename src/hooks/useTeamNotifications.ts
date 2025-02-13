import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useTeamNotifications() {
  const [emailNotifications, setEmailNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchEmailNotifications();
    }
  }, [user]);

  async function fetchEmailNotifications() {
    try {
      const { data, error } = await supabase
        .from("team_notifications")
        .select("team_id")
        .eq("user_id", user?.id);

      if (error) throw error;
      setEmailNotifications(data?.map((item) => item.team_id) || []);
    } catch (error) {
      console.error("Error fetching email notifications:", error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleEmailNotifications(teamId: string) {
    if (!user) return;

    try {
      if (emailNotifications.includes(teamId)) {
        const { error } = await supabase
          .from("team_notifications")
          .delete()
          .eq("user_id", user.id)
          .eq("team_id", teamId);

        if (error) throw error;
        setEmailNotifications((prev) => prev.filter((id) => id !== teamId));
      } else {
        const { error } = await supabase
          .from("team_notifications")
          .insert([{ user_id: user.id, team_id: teamId }]);

        if (error) throw error;
        setEmailNotifications((prev) => [...prev, teamId]);
      }
    } catch (error) {
      console.error("Error toggling email notifications:", error);
    }
  }

  return {
    emailNotifications,
    loading,
    toggleEmailNotifications,
  };
}
