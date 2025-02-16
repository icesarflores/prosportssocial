import React, { useState, useRef } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar } from "../ui/avatar";
import { useToast } from "../ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ImageIcon, SmileIcon, AtSign, Hash, X } from "lucide-react";

interface PostComposerProps {
  onSubmit?: (content: string, media?: File) => Promise<void>;
  avatarUrl?: string;
  username?: string;
}

const PostComposer = ({
  onSubmit = async () => {},
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
  username = "sports_fan",
}: PostComposerProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setMediaPreview(previewUrl);
      setMedia(file);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emoji: any) => {
    setContent((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleMentionClick = () => {
    setContent((prev) => prev + "@");
  };

  const handleHashtagClick = () => {
    setContent((prev) => prev + "#");
  };

  const clearMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMedia(null);
    setMediaPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() && !media) return;
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to post",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await onSubmit(content, media || undefined);
      setContent("");
      clearMedia();
      toast({
        title: "Success",
        description: "Your post has been published!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 bg-white dark:bg-gray-800 border dark:border-gray-700">
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <img src={avatarUrl} alt={username} className="object-cover" />
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="What's your sport take today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-2 bg-gray-50 dark:bg-gray-900"
          />

          {mediaPreview && (
            <div className="relative mt-2">
              <img
                src={mediaPreview}
                alt="Preview"
                className="max-h-[300px] rounded-lg object-contain bg-gray-100 dark:bg-gray-800"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                onClick={clearMedia}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleMediaUpload}
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5" />
              </Button>

              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-blue-500"
                  >
                    <SmileIcon className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-500"
                onClick={handleMentionClick}
              >
                <AtSign className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-blue-500"
                onClick={handleHashtagClick}
              >
                <Hash className="h-5 w-5" />
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={(!content.trim() && !media) || loading}
            >
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostComposer;
