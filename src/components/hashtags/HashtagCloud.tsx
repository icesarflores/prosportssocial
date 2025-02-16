import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Hash } from "lucide-react";

interface HashtagCloudProps {
  hashtags: Array<{
    name: string;
    count: number;
  }>;
}

const HashtagCloud = ({ hashtags }: HashtagCloudProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Hash className="h-5 w-5" />
        Popular Hashtags
      </h3>
      <div className="flex flex-wrap gap-2">
        {hashtags.map((tag) => (
          <Link
            key={tag.name}
            to={`/hashtag/${tag.name}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
          >
            #{tag.name}
            <span className="ml-1 text-xs text-gray-500">({tag.count})</span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default HashtagCloud;
