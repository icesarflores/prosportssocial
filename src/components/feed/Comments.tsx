import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/lib/auth-context";
import { Trash2 } from "lucide-react";

interface CommentsProps {
  postId: string;
  onClose: () => void;
}

export function Comments({ postId, onClose }: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    await addComment(newComment);
    setNewComment("");
    onClose(); // Close the modal after posting
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Comments</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>

      <ScrollArea className="h-[300px]">
        {loading ? (
          <p className="text-center py-4">Loading comments...</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <img
                    src={
                      comment.author?.avatar_url ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user_id}`
                    }
                    alt={comment.author?.username || "User"}
                  />
                </Avatar>
                <div className="flex-1">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">
                        {comment.author?.username || "Anonymous"}
                      </p>
                      {user?.id === comment.user_id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-500 hover:text-red-500"
                          onClick={() => deleteComment(comment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(comment.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {user && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="min-h-[80px]"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!newComment.trim()}
          >
            Post Comment
          </Button>
        </form>
      )}
    </div>
  );
}
