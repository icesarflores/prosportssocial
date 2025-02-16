import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Comments } from "./Comments";
import { useReactions } from "@/hooks/useReactions";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useAuth } from "@/lib/auth-context";
import {
  MessageCircle,
  Share2,
  MoreVertical,
  Flag,
  UserX,
  Trash2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserActions } from "@/hooks/useUserActions";

interface PostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  user_id?: string;
  onDelete?: () => void;
  onUpdate?: (content: string) => void;
}

const Post = ({
  id,
  author,
  content,
  image,
  likes,
  comments: commentCount,
  shares,
  timestamp,
  user_id,
  onDelete,
  onUpdate,
}: PostProps) => {
  const [showComments, setShowComments] = useState(false);
  const { reactions, userReaction, addReaction } = useReactions(id);
  const { isBookmarked, toggleBookmark } = useBookmarks(id);
  const { user } = useAuth();
  const { blockUser, reportPost } = useUserActions();
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${author.name}`,
          text: content,
          url: window.location.href,
        });
      } else {
        const shareUrl = `${window.location.origin}/post/${id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied!",
          description: "Share link has been copied to clipboard",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-gray-500">@{author.username}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {user?.id === user_id ? (
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            ) : (
              <>
                <DropdownMenuItem onClick={() => blockUser(user_id || "")}>
                  <UserX className="h-4 w-4 mr-2" />
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowReportDialog(true)}>
                  <Flag className="h-4 w-4 mr-2" />
                  Report Post
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3">
        <p className="whitespace-pre-wrap">
          {content.split(/\s+/).map((word, i) => {
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
          })}
        </p>
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden max-h-[300px]">
            <img
              src={image}
              alt="Post content"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image load error:", e);
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 gap-2 ${userReaction ? "text-blue-500 bg-blue-50" : "text-gray-500 hover:text-blue-500 hover:bg-blue-50"}`}
          onClick={() => addReaction("👍")}
        >
          <ThumbsUp className="h-5 w-5" />
          <span className="transition-all duration-300 transform scale-100 hover:scale-110">
            {reactions["👍"]}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-2 text-gray-500 hover:text-blue-500"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle className="h-5 w-5" />
          {commentCount > 0 && (
            <span className="transition-all duration-300 transform scale-100 hover:scale-110">
              {commentCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-2 text-gray-500 hover:text-green-500"
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
          {shares > 0 && (
            <span className="transition-all duration-300 transform scale-100 hover:scale-110">
              {shares}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 gap-2 ${isBookmarked ? "text-yellow-500 bg-yellow-50" : "text-gray-500 hover:text-yellow-500 hover:bg-yellow-50"}`}
          onClick={toggleBookmark}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
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
