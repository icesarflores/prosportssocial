import React from "react";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Heart, MessageCircle, Share } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface Author {
  name: string;
  username: string;
  avatar: string;
}

interface PostProps {
  id: string;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  user_id: string;
  onDelete: () => Promise<void>;
  onUpdate: (content: string) => Promise<void>;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  image,
  likes,
  comments,
  shares,
  timestamp,
  user_id,
  onDelete,
  onUpdate,
}) => {
  const { user } = useAuth();
  const isAuthor = user?.id === user_id;

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

      // Update share count
      const { error } = await supabase
        .from("posts")
        .update({ shares: shares + 1 })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error sharing post:", error);
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-gray-500">@{author.username}</p>
          </div>
        </div>
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete()}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  const newContent = prompt("Edit post:", content);
                  if (newContent && newContent !== content) {
                    onUpdate(newContent);
                  }
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <p className="text-gray-900 mb-4">{content}</p>

      {image && (
        <img
          src={image}
          alt="Post attachment"
          className="rounded-lg mb-4 max-h-96 w-full object-cover"
        />
      )}

      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="sm" className="gap-2">
            <Heart className="h-5 w-5" />
            {likes > 0 && <span>{likes}</span>}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-5 w-5" />
            {comments > 0 && <span>{comments}</span>}
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleShare}>
            <Share className="h-5 w-5" />
            {shares > 0 && <span>{shares}</span>}
          </Button>
        </div>
        <span className="text-gray-500">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
      </div>
    </Card>
  );
};

export default Post;
