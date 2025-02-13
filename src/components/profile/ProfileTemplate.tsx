import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Post from "@/components/feed/Post";
import { formatDistanceToNow } from "date-fns";

import { useFollows } from "@/hooks/useFollows";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ProfileTemplateProps {
  profile: {
    username: string;
    avatar_url?: string;
    bio?: string;
    created_at: string;
  };
  posts: Array<{
    id: string;
    content: string;
    created_at: string;
    image_url?: string;
    likes: number;
    comments: number;
    shares: number;
    user_id: string;
    author: {
      username: string;
      avatar_url?: string;
    };
  }>;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  isFollowing: boolean;
  onFollowToggle: (() => void) | undefined;
}

const ProfileTemplate = ({
  profile,
  posts,
  stats,
  isFollowing,
  onFollowToggle,
}: ProfileTemplateProps) => {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6 mb-8">
        <div className="flex items-start gap-6">
          <Avatar className="h-24 w-24">
            <img
              src={
                profile.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`
              }
              alt={profile.username}
              className="object-cover"
            />
          </Avatar>
          <div className="flex-1 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">@{profile.username}</h1>
              {profile.bio && <p className="mt-2">{profile.bio}</p>}
              <p className="text-sm text-gray-500 mt-2">
                Joined{" "}
                {formatDistanceToNow(new Date(profile.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
            {user && user.id !== profile.id && (
              <Button
                onClick={onFollowToggle}
                variant={isFollowing ? "outline" : "default"}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4 mt-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={{
                username: post.author.username,
                avatar:
                  post.author.avatar_url ||
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
        </TabsContent>

        <TabsContent value="media" className="mt-4">
          <div className="grid grid-cols-3 gap-4">
            {posts
              .filter((post) => post.image_url)
              .map((post) => (
                <div
                  key={post.id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={post.image_url}
                    alt="Media"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileTemplate;
