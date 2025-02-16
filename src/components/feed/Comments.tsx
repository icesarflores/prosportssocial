import { useState } from "react";
import { useComments } from "@/hooks/useComments";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/lib/auth-context";
import {
  Trash2,
  Reply,
  Edit,
  MessageCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import CommentEditor from "./CommentEditor";
import { marked } from "marked";
import DOMPurify from "dompurify";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CommentsProps {
  postId: string;
  onClose: () => void;
}

export function Comments({ postId, onClose }: CommentsProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [collapsedComments, setCollapsedComments] = useState<Set<string>>(
    new Set(),
  );

  const toggleCollapse = (commentId: string) => {
    setCollapsedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };
  const { comments, loading, addComment, deleteComment, updateComment } =
    useComments(postId);
  const { user } = useAuth();

  const handleSubmit = async (content: string, parentId?: string) => {
    await addComment(content, parentId);
    setReplyingTo(null);
    onClose();
  };

  const handleUpdate = async (commentId: string, content: string) => {
    await updateComment(commentId, content);
    setEditingId(null);
  };

  const renderMarkdown = (content: string) => {
    const html = marked(content);
    return DOMPurify.sanitize(html);
  };

  const renderComments = (parentId: string | null = null, level = 0) => {
    const filteredComments = comments.filter(
      (comment) => comment.parent_id === parentId,
    );

    return filteredComments.map((comment) => (
      <div key={comment.id} className={`pl-${level > 0 ? "6" : "0"} relative`}>
        {level > 0 && (
          <div
            className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
            style={{ top: "-1rem" }}
          />
        )}
        <div className="flex gap-3">
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
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-500 hover:text-blue-500"
                      onClick={() => setEditingId(comment.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-gray-500 hover:text-red-500"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              {editingId === comment.id ? (
                <CommentEditor
                  initialContent={comment.content}
                  onSubmit={(content) => handleUpdate(comment.id, content)}
                  onCancel={() => setEditingId(null)}
                  submitLabel="Save"
                />
              ) : (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(comment.content),
                  }}
                />
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 ml-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-blue-500 h-6 px-2"
                onClick={() => setReplyingTo(comment.id)}
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                })}
                {comment.edited_at && " (edited)"}
              </span>
            </div>
            {replyingTo === comment.id && (
              <div className="mt-2">
                <CommentEditor
                  onSubmit={(content) => handleSubmit(content, comment.id)}
                  onCancel={() => setReplyingTo(null)}
                  placeholder="Write a reply..."
                />
              </div>
            )}
          </div>
        </div>
        {comments.some((c) => c.parent_id === comment.id) && (
          <Collapsible
            open={!collapsedComments.has(comment.id)}
            onOpenChange={() => toggleCollapse(comment.id)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-blue-500 h-6 px-2 mt-2"
              >
                {collapsedComments.has(comment.id) ? (
                  <>
                    <ChevronRight className="h-3 w-3 mr-1" />
                    Show replies
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Hide replies
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {renderComments(comment.id, level + 1)}
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    ));
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
          <div className="space-y-4">{renderComments()}</div>
        )}
      </ScrollArea>

      {user && (
        <div className="mt-4">
          <CommentEditor
            onSubmit={handleSubmit}
            placeholder="Write a comment..."
          />
        </div>
      )}
    </div>
  );
}
