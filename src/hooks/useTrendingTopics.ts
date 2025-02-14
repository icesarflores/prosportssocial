import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface TrendingTopic {
  id: string;
  topic: string;
  posts: number;
  category?: string;
  hashtags?: string[];
}

export function useTrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTopics();

    const channel = supabase
      .channel("trending-topics")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "post_hashtags",
        },
        () => {
          fetchTrendingTopics();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      // Get hashtag counts from post_hashtags
      const { data: hashtagCounts, error: hashtagError } = await supabase
        .from("post_hashtags")
        .select("hashtag_id, hashtags(name)", { count: "exact" })
        .limit(10);

      if (hashtagError) throw hashtagError;

      // Transform the data
      const transformedTopics = hashtagCounts.map((item: any) => ({
        id: item.hashtag_id,
        topic: item.hashtags.name,
        posts: Math.floor(Math.random() * 10000) + 1000, // Temporary random count
        hashtags: [`#${item.hashtags.name}`],
      }));

      setTopics(transformedTopics);
    } catch (error) {
      console.error("Error fetching trending topics:", error);
    } finally {
      setLoading(false);
    }
  };

  return { topics, loading };
}
