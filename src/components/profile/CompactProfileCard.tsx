import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Link } from "react-router-dom";
import { useFollows } from "@/hooks/useFollows";
import { supabase } from "@/lib/supabase";

interface CompactProfileCardProps {
  className?: string;
}

const CompactProfileCard = ({ className = "" }: CompactProfileCardProps) => {
  const { user } = useAuth();
  const { isFollowing, followUser, unfollowUser } = useFollows(user?.id);
  const [metrics, setMetrics] = useState({
    posts: 0,
    followers: 0,
    following: 0,
  });

  useEffect(() => {
    if (user) {
      fetchMetrics();
    }
  }, [user]);

  const fetchMetrics = async () => {
    if (!user) return;

    try {
      // Get post count
      const { count: postsCount } = await supabase
        .from("posts")
        .select("*", { count: "exact" })
        .eq("user_id", user.id);

      // Get followers count
      const { count: followersCount } = await supabase
        .from("follows")
        .select("*", { count: "exact" })
        .eq("following_id", user.id);

      // Get following count
      const { count: followingCount } = await supabase
        .from("follows")
        .select("*", { count: "exact" })
        .eq("follower_id", user.id);

      setMetrics({
        posts: postsCount || 0,
        followers: followersCount || 0,
        following: followingCount || 0,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  if (!user) return null;

  return (
    <Card className={`bg-black text-white overflow-hidden ${className}`}>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={
                user.user_metadata?.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
              }
              alt={user.user_metadata?.username || "User"}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div>
              <Link
                to={`/profile/${user.user_metadata?.username}`}
                className="font-bold hover:text-gray-200"
              >
                @{user.user_metadata?.username || "User"}
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2 rounded hover:bg-white/10 cursor-pointer transition-colors">
            <div className="font-bold">{metrics.posts}</div>
            <div className="text-gray-400">Posts</div>
          </div>
          <div className="p-2 rounded hover:bg-white/10 cursor-pointer transition-colors">
            <div className="font-bold">{metrics.followers}</div>
            <div className="text-gray-400">Followers</div>
          </div>
          <div className="p-2 rounded hover:bg-white/10 cursor-pointer transition-colors">
            <div className="font-bold">{metrics.following}</div>
            <div className="text-gray-400">Following</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CompactProfileCard;
