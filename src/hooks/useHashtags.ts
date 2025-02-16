import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useHashtags(postId?: string) {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      fetchHashtags();
    }
  }, [postId]);

  const fetchHashtags = async () => {
    try {
      const { data, error } = await supabase
        .from("post_hashtags")
        .select(
          `
          hashtags (name)
        `,
        )
        .eq("post_id", postId);

      if (error) throw error;
      setHashtags(data?.map((item) => item.hashtags.name) || []);
    } catch (error) {
      console.error("Error fetching hashtags:", error);
    } finally {
      setLoading(false);
    }
  };

  const addHashtag = async (postId: string, hashtag: string) => {
    try {
      // First, ensure the hashtag exists
      const { data: existingHashtag } = await supabase
        .from("hashtags")
        .select("id")
        .eq("name", hashtag)
        .single();

      let hashtagId;
      if (!existingHashtag) {
        const { data: newHashtag } = await supabase
          .from("hashtags")
          .insert([{ name: hashtag }])
          .select()
          .single();
        hashtagId = newHashtag?.id;
      } else {
        hashtagId = existingHashtag.id;
      }

      // Then link it to the post
      await supabase
        .from("post_hashtags")
        .insert([{ post_id: postId, hashtag_id: hashtagId }]);

      await fetchHashtags();
    } catch (error) {
      console.error("Error adding hashtag:", error);
    }
  };

  return {
    hashtags,
    loading,
    addHashtag,
  };
}
