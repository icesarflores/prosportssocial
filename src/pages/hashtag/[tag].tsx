import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Post from "@/components/feed/Post";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

interface HashtagData {
  id: string;
  name: string;
}

const HashtagPage = () => {
  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hashtagData, setHashtagData] = useState<HashtagData | null>(null);
  const [hashtagCount, setHashtagCount] = useState(0);

  useEffect(() => {
    fetchHashtagPosts();
  }, [tag]);

  const fetchHashtagPosts = async () => {
    try {
      // First get the hashtag ID
      const { data: hashtagData, error: hashtagError } = await supabase
        .from("hashtags")
        .select("*")
        .eq("name", tag)
        .single();

      if (hashtagError) throw hashtagError;
      setHashtagData(hashtagData);

      // Get hashtag usage count
      const { count } = await supabase
        .from("post_hashtags")
        .select("*", { count: "exact" })
        .eq("hashtag_id", hashtagData.id);

      setHashtagCount(count || 0);

      // Then get all posts with this hashtag
      const { data: postHashtags, error: postHashtagsError } = await supabase
        .from("post_hashtags")
        .select("post_id")
        .eq("hashtag_id", hashtagData.id);

      if (postHashtagsError) throw postHashtagsError;

      const postIds = postHashtags.map((ph) => ph.post_id);

      // Finally get the posts with their authors
      const { data: hashtagPosts, error } = await supabase
        .from("posts")
        .select(
          `
          *,
          author:profiles(username, avatar_url, full_name)
        `,
        )
        .in("id", postIds)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(hashtagPosts || []);
    } catch (error) {
      console.error("Error fetching hashtag posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Hashtags", href: "/hashtags" },
          { label: `#${tag}` },
        ]}
      />
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">#{tag}</h1>
          <Badge variant="secondary">{hashtagCount} posts</Badge>
        </div>
        {loading ? (
          <div>Loading posts...</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                author={{
                  name: post.author?.full_name || "Anonymous",
                  username: post.author?.username || "anonymous",
                  avatar:
                    post.author?.avatar_url ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_id}`,
                }}
                content={post.content}
                image={post.image_url}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                timestamp={post.created_at}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default HashtagPage;
