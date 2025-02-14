import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/ui/use-toast";

export function useUserActions() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const blockUser = async (userId: string) => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("user_blocks").insert([
        {
          blocker_id: user.id,
          blocked_id: userId,
        },
      ]);

      if (error) throw error;

      toast({
        title: "User blocked",
        description: "You will no longer see posts from this user",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const reportPost = async (postId: string, reason: string) => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("reports").insert([
        {
          post_id: postId,
          reporter_id: user.id,
          reason,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Post reported",
        description: "Thank you for helping keep our community safe",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    blockUser,
    reportPost,
    loading,
  };
}
