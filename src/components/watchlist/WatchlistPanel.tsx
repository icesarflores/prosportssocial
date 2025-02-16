import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import { useTeams } from "@/hooks/useTeams";
import { supabase } from "@/lib/supabase";

interface WatchlistItem {
  id: string;
  name: string;
  isFollowed: boolean;
}

const WatchlistPanel = () => {
  const { followedTeams, loading: teamsLoading } = useTeams();
  const [teams, setTeams] = useState<WatchlistItem[]>([]);
  const [isTeamsOpen, setIsTeamsOpen] = useState(true);

  useEffect(() => {
    if (!followedTeams.length) return;
    const fetchTeams = async () => {
      try {
        if (followedTeams.length > 0) {
          const { data } = await supabase
            .from("teams")
            .select("*")
            .in("id", followedTeams);

          setTeams(
            (data || []).map((team) => ({
              id: team.id,
              name: team.name,
              isFollowed: true,
            })),
          );
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();

    // Subscribe to teams changes
    const teamsChannel = supabase
      .channel("teams_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teams" },
        () => {
          fetchTeams();
        },
      )
      .subscribe();

    // Subscribe to team follows changes
    const followsChannel = supabase
      .channel("team_follows")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team_follows",
        },
        () => {
          fetchTeams();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(teamsChannel);
      supabase.removeChannel(followsChannel);
    };
  }, [followedTeams]);

  const handleTeamClick = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team) {
      window.location.href = `/teams/${team.name.toLowerCase().replace(/ /g, "-")}`;
    }
  };

  const WatchlistSection = ({
    title,
    items,
    isOpen,
    onToggle,
  }: {
    title: string;
    items: WatchlistItem[];
    isOpen: boolean;
    onToggle: () => void;
  }) => (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <CollapsibleTrigger className="flex w-full items-center justify-between p-2 hover:bg-gray-100 rounded-md">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ScrollArea className="h-[150px]">
          <div className="space-y-1 p-2">
            {items.length === 0 ? (
              <div className="text-sm text-gray-500 p-2">
                No teams followed yet
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-1 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => handleTeamClick(item.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <img
                        src={
                          item.logo_url ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`
                        }
                        alt={item.name}
                        className="w-6 h-6 rounded"
                      />
                    </div>
                    <span className="text-sm text-gray-900">{item.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <Card className="p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Watchlist</h2>
      <div className="space-y-2">
        <WatchlistSection
          title="Teams"
          items={teams}
          isOpen={isTeamsOpen}
          onToggle={() => setIsTeamsOpen(!isTeamsOpen)}
        />
      </div>
    </Card>
  );
};

export default WatchlistPanel;
