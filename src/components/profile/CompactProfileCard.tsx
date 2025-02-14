import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Link } from "react-router-dom";
import { useFollows } from "@/hooks/useFollows";

interface CompactProfileCardProps {
  className?: string;
}

const CompactProfileCard = ({ className = "" }: CompactProfileCardProps) => {
  const { user } = useAuth();
  const { isFollowing, followUser, unfollowUser } = useFollows(user?.id);

  if (!user) return null;

  return (
    <Card className={`bg-black text-white overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={
              user.user_metadata?.avatar_url ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
            }
            alt={user.user_metadata?.username || "User"}
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <div className="flex-1">
            <Link
              to={`/profile/${user.user_metadata?.username}`}
              className="font-bold hover:text-gray-200"
            >
              @{user.user_metadata?.username || "User"}
            </Link>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
            onClick={() =>
              isFollowing ? unfollowUser(user.id) : followUser(user.id)
            }
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CompactProfileCard;
