import React from "react";
import CompactProfileCard from "../profile/CompactProfileCard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import TrendingTopics from "../trending/TrendingTopics";
import HashtagCloud from "../hashtags/HashtagCloud";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import UpcomingGames from "../games/UpcomingGames";

interface RightSidebarProps {
  className?: string;
}

const RightSidebar = ({ className = "" }: RightSidebarProps) => {
  const [popularHashtags, setPopularHashtags] = useState([]);

  useEffect(() => {
    fetchPopularHashtags();
  }, []);

  const fetchPopularHashtags = async () => {
    try {
      const { data } = await supabase
        .from("post_hashtags")
        .select("hashtag_id, hashtags(name)")
        .limit(5);

      const hashtagCounts = data.reduce((acc, curr) => {
        const name = curr.hashtags.name;
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      const formattedHashtags = Object.entries(hashtagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setPopularHashtags(formattedHashtags);
    } catch (error) {
      console.error("Error fetching popular hashtags:", error);
    }
  };
  const sections = [
    {
      title: "PROFILE",
      content: <CompactProfileCard />,
    },
    {
      title: "TRENDING",
      content: <TrendingTopics />,
    },
    {
      title: "POPULAR HASHTAGS",
      content: <HashtagCloud hashtags={popularHashtags} />,
    },
    {
      title: "UPCOMING GAMES",
      content: <UpcomingGames />,
    },
    {
      title: "WHO TO FOLLOW",
      content: (
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
      ),
    },
  ];

  return (
    <div className={`w-full h-full bg-white dark:bg-gray-800 ${className}`}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-3">
                {section.title}
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RightSidebar;
