import React, { useState } from "react";
import MainFeed from "@/components/feed/MainFeed";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePosts } from "@/hooks/usePosts";
import { formatDistanceToNow } from "date-fns";

interface TeamContentProps {
  teamId: string;
  activeTab: string;
}

const TeamContent = ({ teamId, activeTab = "feed" }: TeamContentProps) => {
  const { loading } = usePosts(teamId);
  const showPostComposer = activeTab === "feed" && !loading;

  switch (activeTab) {
    case "feed":
      return <MainFeed teamId={teamId} showPostComposer={showPostComposer} />;

    case "news":
      return <MainFeed teamId={teamId} showPostComposer={false} />;

    case "roster":
      return (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Team Roster</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(15)
              .fill(null)
              .map((_, i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=player${i}`}
                      alt="Player Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">Player {i + 1}</h3>
                      <p className="text-sm text-gray-500">
                        #{i + 1} | Position
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Card>
      );

    default:
      return null;
  }
};

export default TeamContent;
