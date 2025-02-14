import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/AuthModal";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, TrendingUp } from "lucide-react";

const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data } = await supabase.from("teams").select("*").order("division");
    if (data) setTeams(data);
  };

  const getTeamsByLeagueAndDivision = (league) => {
    const leagueTeams = teams.filter((team) => team.league === league);
    const divisions = [...new Set(leagueTeams.map((team) => team.division))];
    return divisions.map((division) => ({
      division,
      teams: leagueTeams.filter((team) => team.division === division),
    }));
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-bold text-black dark:text-white">
              PROSPORTSTALK
            </h1>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {["NFL", "MLB", "NBA"].map((league) => (
              <DropdownMenu key={league}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">{league}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`w-[800px] p-6 ${league === "NFL" ? "grid grid-cols-4" : "grid grid-cols-3"} gap-8 bg-white dark:bg-gray-800`}
                >
                  {getTeamsByLeagueAndDivision(league).map(
                    ({ division, teams }) => (
                      <div key={division}>
                        <h3 className="font-semibold mb-2 text-sm text-gray-500">
                          {division}
                        </h3>
                        <div className="space-y-0.5">
                          {teams.map((team) => (
                            <DropdownMenuItem
                              key={team.id}
                              onClick={() =>
                                navigate(
                                  `/teams/${league.toLowerCase()}/${team.slug.toLowerCase()}`,
                                )
                              }
                              className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm text-sm font-medium"
                            >
                              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
                                {team.name.substring(0, 2).toUpperCase()}
                              </div>
                              {team.name}
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => navigate("/news")}
          >
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

          {user ? (
            <>
              <NotificationsPopover />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAuthModal(true)}
            >
              <User className="h-5 w-5" />
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
