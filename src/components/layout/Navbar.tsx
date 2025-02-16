import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/AuthModal";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import { User, TrendingUp, Newspaper, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [nflTeams, setNflTeams] = useState<any[]>([]);
  const [mlbTeams, setMlbTeams] = useState<any[]>([]);
  const [nbaTeams, setNbaTeams] = useState<any[]>([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      // Fetch NFL teams
      const { data: nflData } = await supabase
        .from("teams")
        .select("*")
        .eq("league", "NFL")
        .order("division");
      setNflTeams(nflData || []);

      // Fetch MLB teams
      const { data: mlbData } = await supabase
        .from("teams")
        .select("*")
        .eq("league", "MLB")
        .order("division");
      setMlbTeams(mlbData || []);

      // Fetch NBA teams
      const { data: nbaData } = await supabase
        .from("teams")
        .select("*")
        .eq("league", "NBA")
        .order("division");
      setNbaTeams(nbaData || []);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const groupTeamsByDivision = (teams: any[]) => {
    return teams.reduce((acc, team) => {
      if (!acc[team.division]) {
        acc[team.division] = [];
      }
      acc[team.division].push(team);
      return acc;
    }, {});
  };

  const renderTeamsDropdown = (teams: any[], league: string) => (
    <DropdownMenuContent className="w-[800px]">
      <div
        className={`grid ${league === "NFL" ? "grid-cols-4" : "grid-cols-3"} gap-4 p-4`}
      >
        {Object.entries(groupTeamsByDivision(teams)).map(
          ([division, teams]) => (
            <div key={division}>
              <h3 className="font-semibold mb-2">{division}</h3>
              <div className="space-y-2">
                {teams.map((team: any) => (
                  <DropdownMenuItem
                    key={team.id}
                    onClick={() =>
                      navigate(`/teams/${league.toLowerCase()}/${team.slug}`)
                    }
                  >
                    {team.name}
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </DropdownMenuContent>
  );

  return (
    <nav className={`w-full bg-white border-b ${className}`}>
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/home" className="text-xl font-bold hover:opacity-80">
            PROSPORTSSOCIAL
          </Link>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  NFL
                </Button>
              </DropdownMenuTrigger>
              {renderTeamsDropdown(nflTeams, "NFL")}
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  NBA
                </Button>
              </DropdownMenuTrigger>
              {renderTeamsDropdown(nbaTeams, "NBA")}
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  MLB
                </Button>
              </DropdownMenuTrigger>
              {renderTeamsDropdown(mlbTeams, "MLB")}
            </DropdownMenu>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/news")}
            >
              <Newspaper className="h-4 w-4" />
              News
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/trending")}
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NotificationsPopover />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user.user_metadata?.username || "Profile"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      navigate(`/profile/${user.user_metadata?.username}`)
                    }
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAuthModal(true)}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
};

export default Navbar;
