import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface UserMention {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
}

export function useMentions(searchTerm: string) {
  const [users, setUsers] = useState<UserMention[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.startsWith("@") && searchTerm.length > 1) {
      searchUsers(searchTerm.slice(1));
    }
  }, [searchTerm]);

  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, full_name, avatar_url")
        .ilike("username", `${query}%`)
        .limit(5);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error searching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading };
}
