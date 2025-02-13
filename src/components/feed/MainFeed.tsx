import React, { useEffect, useRef, useCallback } from "react";
import PostComposer from "./PostComposer";
import Post from "./Post";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";

interface MainFeedProps {
  showPostComposer?: boolean;
  teamId?: string;
}

const MainFeed: React.FC<MainFeedProps> = ({
  teamId,
  showPostComposer = true,
}) => {
  const { user } = useAuth();
  const {
    posts,
    loading,
    hasMore,
    createPost,
    deletePost,
    updatePost,
    fetchPosts,
  } = usePosts(teamId);
  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts(true);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts],
  );

  const handleSubmit = async (content: string, media?: File) => {
    if (!user) return;
    const post = await createPost(content, media);
    if (!post) {
      console.error('Failed to create post');
    }
  };

  return (
    <div className="w-full max-w-[680px] mx-auto bg-white min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="space-y-4">
        {showPostComposer && user ? (
          <PostComposer onSubmit={handleSubmit} />
        ) : showPostComposer ? (
          <Card className="p-4 text-center">
            <p>Please sign in to create posts</p>
          </Card>
        ) : null}
        {loading ? (
          <div className="text-center py-4">Loading posts...</div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? lastPostRef : undefined}
              >
                <Post
                  key={post.id}
                  id={post.id}
                  author={{
                    name: post.author?.username || "anonymous",
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
                  user_id={post.user_id}
                  onDelete={() => deletePost(post.id)}
                  onUpdate={(content) => updatePost(post.id, content)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFeed;
