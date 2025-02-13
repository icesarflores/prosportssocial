import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { TrendingUp, MessageCircle, Hash } from "lucide-react";

interface TrendingTopic {
  id: string;
  topic: string;
  engagement: number;
  category: string;
  hashtags: string[];
}

interface TrendingTopicsProps {
  topics?: TrendingTopic[];
}

const defaultTopics: TrendingTopic[] = [
  {
    id: "1",
    topic: "Lakers vs Warriors Highlights",
    engagement: 15200,
    category: "NBA",
    hashtags: ["#LakeShow", "#DubNation"],
  },
  {
    id: "2",
    topic: "Champions League Quarter Finals",
    engagement: 12800,
    category: "Soccer",
    hashtags: ["#UCL", "#Football"],
  },
  {
    id: "3",
    topic: "NFL Draft Predictions",
    engagement: 8900,
    category: "NFL",
    hashtags: ["#NFLDraft", "#Football"],
  },
];

const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  topics = defaultTopics,
}) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Trending Topics</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium hover:text-primary cursor-pointer">
                    {topic.topic}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="secondary" className="text-xs">
                      {topic.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {topic.engagement.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {topic.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center text-sm text-primary hover:text-primary/80 cursor-pointer"
                  >
                    <Hash className="h-4 w-4" />
                    {tag.replace("#", "")}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
