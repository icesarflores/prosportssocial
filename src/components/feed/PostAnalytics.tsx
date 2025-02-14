import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageCircle, Share2, Eye } from "lucide-react";

interface PostAnalyticsProps {
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

const PostAnalytics = ({
  views,
  likes,
  comments,
  shares,
}: PostAnalyticsProps) => {
  return (
    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4" />
        <span>{views}</span>
      </div>
      <div className="flex items-center gap-1">
        <TrendingUp className="h-4 w-4" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageCircle className="h-4 w-4" />
        <span>{comments}</span>
      </div>
      <div className="flex items-center gap-1">
        <Share2 className="h-4 w-4" />
        <span>{shares}</span>
      </div>
    </div>
  );
};

export default PostAnalytics;
