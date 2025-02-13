import React from "react";
import { useAuth } from "@/lib/auth-context";
import { usePosts } from "@/hooks/usePosts";
import WatchlistPanel from "../watchlist/WatchlistPanel";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Home,
  TrendingUp,
  Calendar,
  Users,
  MessageSquare,
  Bell,
} from "lucide-react";

interface LeftSidebarProps {
  className?: string;
  teamId?: string;
}

const LeftSidebar = ({ className = "", teamId }: LeftSidebarProps) => {
  const { user } = useAuth();
  const { posts } = usePosts(teamId);

  const navigationItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Trending",
      path: "/trending",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Following",
      path: "/following",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Notifications",
      path: "/notifications",
    },
  ];

  return (
    <div
      className={`w-full h-full bg-white p-2 flex flex-col gap-4 ${className}`}
    >
      <Card className="p-4 bg-white dark:bg-gray-800">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              {item.icon}
              <span>{item.label}</span>
            </Button>
          ))}
        </nav>
      </Card>

      <WatchlistPanel />

      {teamId && (
        <Card className="p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-4">Team News</h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {posts
                .filter(
                  (post) =>
                    post.team_id === teamId &&
                    post.content.toLowerCase().includes("news"),
                )
                .slice(0, 5)
                .map((post, index) => (
                  <div key={index} className="border-b pb-3 last:border-0">
                    <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {new Date(post.created_at).toLocaleString(
                        navigator.language,
                        {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone:
                            Intl.DateTimeFormat().resolvedOptions().timeZone,
                        },
                      )}
                    </span>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
};

export default LeftSidebar;
