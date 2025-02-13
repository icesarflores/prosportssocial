import React from "react";
import { Card } from "../ui/card";
import { formatDistanceToNow } from "date-fns";

interface PostMetricsProps {
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  timestamp: string;
}

const PostMetrics = ({
  likes,
  comments,
  shares,
  views,
  timestamp,
}: PostMetricsProps) => {
  return (
    <Card className="p-4 bg-gray-50">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{likes}</div>
          <div className="text-sm text-gray-500">Likes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{comments}</div>
          <div className="text-sm text-gray-500">Comments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{shares}</div>
          <div className="text-sm text-gray-500">Shares</div>
        </div>
        {views !== undefined && (
          <div className="text-center">
            <div className="text-2xl font-bold">{views}</div>
            <div className="text-sm text-gray-500">Views</div>
          </div>
        )}
      </div>
      <div className="mt-4 text-center text-sm text-gray-500">
        Posted {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
      </div>
    </Card>
  );
};

export default PostMetrics;
