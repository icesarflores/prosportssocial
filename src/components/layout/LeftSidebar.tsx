import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Newspaper,
  TrendingUp,
  Bell,
  Bookmark,
  Settings,
  Star,
} from "lucide-react";
import WatchlistPanel from "../watchlist/WatchlistPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFootball,
  faBaseball,
  faBasketball,
} from "@fortawesome/free-solid-svg-icons";

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar = ({ className = "" }: LeftSidebarProps) => {
  const menuItems = [
    {
      title: "MAIN",
      items: [
        { label: "Home", href: "/home" },
        {
          label: "News",
          href: "/news",
          icon: <Newspaper className="h-4 w-4" />,
        },
        {
          label: "Trending",
          href: "/trending",
          icon: <TrendingUp className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "LEAGUES",
      items: [
        {
          label: "NFL",
          href: "/nfl",
          icon: <FontAwesomeIcon icon={faFootball} className="h-4 w-4" />,
        },
        {
          label: "NBA",
          href: "/nba",
          icon: <FontAwesomeIcon icon={faBasketball} className="h-4 w-4" />,
        },
        {
          label: "MLB",
          href: "/mlb",
          icon: <FontAwesomeIcon icon={faBaseball} className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "PERSONAL",
      items: [
        {
          label: "Notifications",
          href: "/notifications",
          icon: <Bell className="h-4 w-4" />,
        },
        {
          label: "Bookmarks",
          href: "/bookmarks",
          icon: <Bookmark className="h-4 w-4" />,
        },
        {
          label: "Settings",
          href: "/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className={`w-full h-full bg-white dark:bg-gray-800 ${className}`}>
      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {menuItems.map((section, i) => (
            <div key={i} className="space-y-1">
              <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-3">
                {section.title}
              </h3>
              {section.items.map((item, j) => (
                <Link key={j} to={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 font-normal text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 h-10"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Watchlist Panel */}
        <div className="mt-6">
          <WatchlistPanel />
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeftSidebar;
