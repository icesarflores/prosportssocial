import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import WatchlistPanel from "../watchlist/WatchlistPanel";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Star } from "lucide-react";

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar = ({ className = "" }: LeftSidebarProps) => {
  return (
    <div
      className={`w-full h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}
    >
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Watchlist Panel */}
          <div className="space-y-2">
            <h3 className="font-semibold px-2 text-gray-800 dark:text-gray-200">
              Watchlist
            </h3>
            <WatchlistPanel />
          </div>

          {/* Favorite Leagues */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Favorite Leagues
            </h3>
            <div className="space-y-2">
              {[
                { name: "NFL", path: "/nfl" },
                { name: "MLB", path: "/mlb" },
                { name: "NBA", path: "/nba" },
              ].map((league) => (
                <Link key={league.path} to={league.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Star className="h-4 w-4" />
                    {league.name}
                  </Button>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftSidebar;
