import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Flag,
  UserX,
  Trash2,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserActions } from "@/hooks/useUserActions";
import { Comments } from "./Comments";
import { useLikes } from "@/hooks/useLikes";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface PostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  comments: number;
  shares: number;
  image?: string;
  user_id: string;
  onDelete?: () => Promise<void>;
  onUpdate?: (content: string) => Promise<void>;
}

const Post = ({
  id,
  author,
  content,
  timestamp,
  comments: commentCount,
  shares,
  image,
  user_id,
  onDelete,
  onUpdate,
}: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { isLiked, likesCount, toggleLike } = useLikes(id);
  const { toast } = useToast();
  const { blockUser, reportPost } = useUserActions();
  const { user } = useAuth();

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/posts/${id}`;

      if (navigator.share) {
        await navigator.share({
          title: `Post by ${author.name}`,
          text: content,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const renderContent = (text: string) => {
    return text.split(" ").map((word, i) => {
      if (word.startsWith("#")) {
        return (
          <Link
            key={i}
            to={`/hashtag/${word.slice(1)}`}
            className="text-blue-500 hover:underline"
          >
            {word}{" "}
          </Link>
        );
      }
      return word + " ";
    });
  };

  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10">
          <img src={author.avatar} alt={author.name} className="object-cover" />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/profile/${author.username}`}
              className="font-semibold hover:underline"
            >
              @{author.username}
            </Link>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user?.id === user_id && onDelete && (
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Post
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => reportPost(id, "inappropriate content")}
                  className="text-red-600"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Report Post
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => blockUser(user_id)}
                  className="text-red-600"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  Block User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="mt-2 text-gray-800 dark:text-gray-200">
            {renderContent(content)}
          </p>

          {image && (
            <img
              src={image}
              alt="Post attachment"
              className="mt-3 rounded-lg max-h-96 w-full object-cover"
            />
          )}

          {user && (
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{Math.floor(Math.random() * 1000)}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{likesCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{commentCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>{shares}</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-6 mt-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 ${isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"}`}
              onClick={toggleLike}
            >
              <Heart className="h-5 w-5" />
              {likesCount > 0 && <span>{likesCount}</span>}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-500 hover:text-blue-500"
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="h-5 w-5" />
              {commentCount > 0 && <span>{commentCount}</span>}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-gray-500 hover:text-green-500"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              {shares > 0 && <span>{shares}</span>}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent>
          <Comments postId={id} onClose={() => setShowComments(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Post;
