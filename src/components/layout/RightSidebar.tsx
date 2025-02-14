import React from "react";
import { Card } from "@/components/ui/card";
import CompactProfileCard from "../profile/CompactProfileCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TrendingTopics from "../trending/TrendingTopics";
import UpcomingGames from "../games/UpcomingGames";
import { TrendingUp, Hash, Calendar } from "lucide-react";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar = ({ className = "" }: RightSidebarProps) => {
  return (
    <div
      className={`w-full bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="space-y-6">
        <CompactProfileCard />

        {/* Trending Topics */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Trending Topics</h3>
          </div>
          <TrendingTopics />
        </Card>

        {/* Upcoming Games */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-green-500" />
            <h3 className="font-semibold">Upcoming Games</h3>
          </div>
          <UpcomingGames />
          <Button variant="link" className="w-full mt-2">
            View all games
          </Button>
        </Card>

        {/* Popular Hashtags */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold">Popular Hashtags</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["#NBA", "#NFL", "#MLB", "#NHL", "#Soccer", "#Tennis"].map(
              (hashtag) => (
                <Button
                  key={hashtag}
                  variant="secondary"
                  size="sm"
                  className="rounded-full"
                >
                  {hashtag}
                </Button>
              ),
            )}
          </div>
        </Card>

        {/* Who to Follow */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Who to Follow</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Sports Fan {i}</p>
                    <p className="text-sm text-gray-500">@sportsfan{i}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RightSidebar;
