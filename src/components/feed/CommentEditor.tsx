import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Bold,
  Italic,
  List,
  Link as LinkIcon,
  Image,
  Smile,
  AtSign,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMentions } from "@/hooks/useMentions";
import MentionsPopover from "../shared/MentionsPopover";

interface CommentEditorProps {
  initialContent?: string;
  onSubmit: (content: string) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  placeholder?: string;
  submitLabel?: string;
}

const CommentEditor = ({
  initialContent = "",
  onSubmit,
  onCancel,
  loading = false,
  placeholder = "Write a comment...",
  submitLabel = "Post",
}: CommentEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { users, loading: loadingMentions } = useMentions(mentionSearch);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleInput = () => {
      const value = textarea.value;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const matches = textBeforeCursor.match(/@[\w-]*$/);

      if (matches) {
        setMentionSearch(matches[0]);
        setShowMentions(true);
      } else {
        setShowMentions(false);
      }
    };

    textarea.addEventListener("input", handleInput);
    return () => textarea.removeEventListener("input", handleInput);
  }, []);

  const handleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "list":
        formattedText = `\n- ${selectedText}`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      case "mention":
        formattedText = `@${selectedText}`;
        break;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center gap-1 mb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("list")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("link")}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("mention")}
        >
          <AtSign className="h-4 w-4" />
        </Button>
        <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
          <PopoverTrigger asChild>
            <Button type="button" variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            {/* Add emoji picker content here */}
          </PopoverContent>
        </Popover>
      </div>

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px]"
        />
        {showMentions && (
          <div className="absolute bottom-full left-0 w-full mb-1 bg-white rounded-md shadow-lg border z-50">
            <MentionsPopover
              users={users}
              loading={loadingMentions}
              onSelect={(user) => {
                const textarea = textareaRef.current;
                if (!textarea) return;

                const cursorPosition = textarea.selectionStart;
                const textBeforeCursor = content.substring(0, cursorPosition);
                const mentionStart = textBeforeCursor.lastIndexOf("@");

                const newContent =
                  content.substring(0, mentionStart) +
                  `@${user.username} ` +
                  content.substring(cursorPosition);

                setContent(newContent);
                setShowMentions(false);
                textarea.focus();
              }}
            />
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={!content.trim() || loading}>
          {loading ? "Posting..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default CommentEditor;
