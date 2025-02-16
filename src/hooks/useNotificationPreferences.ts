import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export interface NotificationPreferences {
  likes: boolean;
  comments: boolean;
  mentions: boolean;
  followers: boolean;
  team_updates: boolean;
  game_alerts: boolean;
}

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    likes: true,
    comments: true,
    mentions: true,
    followers: true,
    team_updates: true,
    game_alerts: true,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const { data, error } = await supabase
        .from("notification_preferences")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      if (data) {
        setPreferences(data);
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreference = async (
    key: keyof NotificationPreferences,
    value: boolean,
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("notification_preferences").upsert({
        user_id: user.id,
        [key]: value,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setPreferences((prev) => ({ ...prev, [key]: value }));
      toast({
        title: "Success",
        description: "Notification preferences updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    preferences,
    loading,
    updatePreference,
  };
}
