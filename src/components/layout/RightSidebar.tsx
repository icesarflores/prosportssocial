import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import TrendingTopics from "../trending/TrendingTopics";
import { Card } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Users } from "lucide-react";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar = ({ className = "" }: RightSidebarProps) => {
  const { user } = useAuth();
  const username = user?.user_metadata?.username || user?.email?.split("@")[0];

  return (
    <div
      className={`w-full h-full bg-white p-2 flex flex-col gap-2 ${className}`}
    >
      <Link to={`/profile/${username}`}>
        <Card className="w-full bg-[#1C2127] border-gray-800 p-4 space-y-4 hover:bg-[#252a31] transition-colors">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <img
                src={
                  user?.user_metadata?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`
                }
                alt={user?.user_metadata?.full_name || "Profile"}
                className="aspect-square object-cover"
              />
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-200">
                {user?.user_metadata?.username || user?.email?.split("@")[0]}
              </h3>
              <p className="text-sm text-gray-400">
                @{user?.user_metadata?.username || user?.email?.split("@")[0]}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full gap-2 border-gray-700 text-gray-300 hover:text-gray-100"
          >
            <Users className="h-4 w-4" /> View Profile
          </Button>
          <div className="flex gap-2">
            {[
              { icon: "🏈", label: "NFL" },
              { icon: "⚾", label: "MLB" },
              { icon: "🏀", label: "NBA" },
              { icon: "⚽", label: "Soccer" },
            ].map((sport) => (
              <Badge
                key={sport.label}
                variant="secondary"
                className="gap-1 bg-gray-800 text-gray-300"
              >
                {sport.icon} {sport.label}
              </Badge>
            ))}
          </div>
        </Card>
      </Link>
      <TrendingTopics />
      <Card className="p-4 mt-4">
        <h3 className="font-semibold mb-4">Trending Hashtags</h3>
        <div className="space-y-2">
          {[
            { tag: "DubNation", count: "15.2K" },
            { tag: "LakeShow", count: "12.8K" },
            { tag: "NFL", count: "10.5K" },
            { tag: "MLB", count: "8.9K" },
            { tag: "NBA", count: "7.6K" },
          ].map((item) => (
            <div
              key={item.tag}
              className="flex items-center justify-between text-sm"
            >
              <Link
                to={`/hashtag/${item.tag}`}
                className="text-blue-500 hover:underline"
              >
                #{item.tag}
              </Link>
              <span className="text-gray-500">{item.count} posts</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RightSidebar;
