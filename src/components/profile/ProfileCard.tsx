import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface ProfileCardProps {
  username: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  joinedAt: string;
  stats?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
  isFollowing?: boolean;
  onFollowToggle?: () => void;
  className?: string;
}

const ProfileCard = ({
  username,
  fullName,
  avatarUrl,
  bio,
  joinedAt,
  stats,
  isFollowing,
  onFollowToggle,
  className = "",
}: ProfileCardProps) => {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <img
            src={
              avatarUrl ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
            }
            alt={fullName}
            className="object-cover"
          />
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <Link
                to={`/profile/${username}`}
                className="text-gray-500 hover:text-gray-700"
              >
                @{username}
              </Link>
            </div>
            {onFollowToggle && (
              <Button
                variant={isFollowing ? "outline" : "default"}
                onClick={onFollowToggle}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </div>

          {bio && <p className="mt-4 text-gray-600">{bio}</p>}

          {stats && (
            <div className="flex gap-6 mt-4">
              {stats.posts !== undefined && (
                <div>
                  <span className="font-bold">{stats.posts}</span>
                  <span className="text-gray-500 ml-1">Posts</span>
                </div>
              )}
              {stats.followers !== undefined && (
                <div>
                  <span className="font-bold">{stats.followers}</span>
                  <span className="text-gray-500 ml-1">Followers</span>
                </div>
              )}
              {stats.following !== undefined && (
                <div>
                  <span className="font-bold">{stats.following}</span>
                  <span className="text-gray-500 ml-1">Following</span>
                </div>
              )}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Joined{" "}
            {formatDistanceToNow(new Date(joinedAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
