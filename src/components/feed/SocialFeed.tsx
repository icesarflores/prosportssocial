import React, { useEffect, useRef, useCallback } from "react";
import { usePosts } from "@/hooks/usePosts";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Share2 } from "lucide-react";
import FeedFilters from "./FeedFilters";
import PostComposer from "./PostComposer";

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  media?: {
    type: "image" | "video";
    url: string;
  };
}

interface SocialFeedProps {
  posts?: Post[];
  onPostSubmit?: (content: string) => void;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const defaultPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "John Doe",
      username: "johndoe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    content: "Just watched an amazing game! The Warriors are on fire 🔥",
    timestamp: "2024-03-20T10:30:00Z",
    likes: 245,
    comments: 56,
    shares: 12,
  },
  {
    id: "2",
    author: {
      name: "Jane Smith",
      username: "janesmith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    content: "Check out this incredible highlight from last night's game!",
    timestamp: "2024-03-20T09:15:00Z",
    likes: 189,
    comments: 34,
    shares: 8,
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    },
  },
];

const SocialFeed = () => {
  const { posts, loading, hasMore, createPost, fetchPosts } = usePosts();
  const observer = useRef<IntersectionObserver>();

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            fetchPosts(true);
          }
        },
        {
          rootMargin: "100px", // Load more content before reaching the bottom
          threshold: 0.1,
        },
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchPosts],
  );
  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900">
      <FeedFilters />
      <div className="p-4">
        <PostComposer onSubmit={onPostSubmit} />
        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={post.id}
                ref={index === posts.length - 1 ? lastPostRef : undefined}
              >
                <Card key={post.id} className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <img src={post.author.avatar} alt={post.author.name} />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">
                          {post.author.name}
                        </span>
                        <span className="text-gray-500">
                          @{post.author.username}
                        </span>
                        <span className="text-gray-500">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-800 dark:text-gray-200">
                        {post.content}
                      </p>
                      {post.media && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          {post.media.type === "image" && (
                            <img
                              src={post.media.url}
                              alt="Post media"
                              className="w-full h-auto"
                            />
                          )}
                        </div>
                      )}
                      <div className="mt-4 flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => onLike(post.id)}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-blue-500"
                          onClick={() => onComment(post.id)}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-green-500"
                          onClick={() => onShare(post.id)}
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
            {loading && (
              <div className="flex items-center justify-center py-4 space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SocialFeed;
