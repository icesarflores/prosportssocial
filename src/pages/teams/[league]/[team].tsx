import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import LeftSidebar from "@/components/layout/LeftSidebar";
import MainFeed from "@/components/feed/MainFeed";
import RightSidebar from "@/components/layout/RightSidebar";
import Footer from "@/components/layout/Footer";
import TeamHeader from "@/components/teams/TeamHeader";

interface Team {
  id: string;
  name: string;
  league: string;
  division: string;
  logo_url: string;
  slug: string;
}

const TeamPage = () => {
  const { league, team } = useParams();
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (league && team) {
      fetchTeamData();
    }
  }, [league, team]);

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .eq("league", league?.toUpperCase())
        .eq("slug", team?.toLowerCase())
        .single();

      if (error) {
        console.error("Error fetching team:", error);
        setTeamData(null);
        return;
      }

      setTeamData(data);
    } catch (error) {
      console.error("Error in fetchTeamData:", error);
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Team not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="flex flex-col md:flex-row w-full max-w-[1400px] md:px-4 gap-6 px-0 mx-auto py-6">
        {/* Left Sidebar */}
        <div className="md:block w-full md:w-[320px] md:min-w-[320px] h-fit">
          <div className="sticky top-[120px]">
            <LeftSidebar teamId={teamData.id} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TeamHeader
            league={league || ""}
            team={team || ""}
            teamData={{
              id: teamData.id,
              name: teamData.name,
              logo_url: teamData.logo_url,
              division: teamData.division,
              conference:
                teamData.league === "NBA"
                  ? teamData.division.includes("East")
                    ? "Eastern"
                    : "Western"
                  : undefined,
            }}
          />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-full lg:w-[320px] lg:min-w-[320px] h-fit">
          <div className="sticky top-[120px]">
            <RightSidebar teamId={teamData.id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeamPage;
