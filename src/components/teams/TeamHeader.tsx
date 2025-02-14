import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Users } from "lucide-react";
import { useTeams } from "@/hooks/useTeams";
import { useToast } from "@/components/ui/use-toast";
import { useTeamNotifications } from "@/hooks/useTeamNotifications";
import TeamContent from "./TeamContent";

interface TeamHeaderProps {
  league: string;
  team: string;
  teamData: {
    id: string;
    name: string;
    logo_url: string;
    division: string;
    conference?: string;
  };
}

const TeamHeader = ({ league, team, teamData }: TeamHeaderProps) => {
  const [activeTab, setActiveTab] = useState("feed");
  const { followTeam, unfollowTeam, followedTeams } = useTeams();
  const { emailNotifications, toggleEmailNotifications } =
    useTeamNotifications();
  const { toast } = useToast();
  const isFollowing = followedTeams.includes(teamData.id);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowTeam(teamData.id);
        toast({
          title: "Success",
          description: `You have unfollowed ${teamData.name}`,
        });
      } else {
        await followTeam(teamData.id);
        toast({
          title: "Success",
          description: `You are now following ${teamData.name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team follow status. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <Link to={`/${league.toLowerCase()}`} className="hover:text-gray-700">
            {league.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{teamData.name}</span>
        </div>

        {/* Team Info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src={"https://placehold.co/75x75"}
              alt={teamData.name}
              className="w-16 h-16"
            />
            <div>
              <h1 className="text-2xl font-bold">{teamData.name}</h1>
              <p className="text-sm text-gray-600">
                {teamData.conference
                  ? `${teamData.conference} Conference - `
                  : ""}
                {teamData.division} Division
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => toggleTeamNotifications(teamData.id)}
            >
              {emailNotifications.includes(teamData.id) ? (
                <Bell className="h-4 w-4 text-blue-500" />
              ) : (
                <Bell className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleFollowToggle}
            >
              <Users className="h-4 w-4" />
              {isFollowing ? "Following" : "Follow Team"}
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 border-b mb-6">
          {[
            { id: "feed", label: "Feed" },
            { id: "news", label: "News" },
            { id: "roster", label: "Roster" },
            { id: "schedule", label: "Schedule" },
            { id: "injuries", label: "Injuries" },
            { id: "results", label: "Results" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`relative pb-2 ${activeTab === tab.id ? "text-blue-600" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Dynamic Content */}
      <TeamContent teamId={teamData.id} activeTab={activeTab} />
    </div>
  );
};

export default TeamHeader;
