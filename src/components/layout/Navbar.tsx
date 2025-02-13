import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TeamLink } from "./TeamLink";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth/AuthModal";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  User,
  TrendingUp,
  Newspaper,
  Trophy,
  Dumbbell,
  CircleDot,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu, ChevronRight } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      <nav className="w-full bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-black p-0"
            >
              <div className="flex flex-col py-4 h-[calc(100vh-4rem)] overflow-y-auto">
                <h2 className="text-2xl font-bold text-white px-6 mb-4">
                  Sports
                </h2>
                <div className="space-y-1">
                  {[
                    {
                      label: "NFL",
                      path: "/nfl",
                      divisions: [
                        {
                          name: "AFC East",
                          teams: ["Bills", "Dolphins", "Patriots", "Jets"],
                        },
                        {
                          name: "AFC North",
                          teams: ["Ravens", "Bengals", "Browns", "Steelers"],
                        },
                        {
                          name: "AFC South",
                          teams: ["Texans", "Colts", "Jaguars", "Titans"],
                        },
                        {
                          name: "AFC West",
                          teams: ["Broncos", "Chiefs", "Raiders", "Chargers"],
                        },
                        {
                          name: "NFC East",
                          teams: ["Cowboys", "Giants", "Eagles", "Commanders"],
                        },
                        {
                          name: "NFC North",
                          teams: ["Bears", "Lions", "Packers", "Vikings"],
                        },
                        {
                          name: "NFC South",
                          teams: [
                            "Falcons",
                            "Panthers",
                            "Saints",
                            "Buccaneers",
                          ],
                        },
                        {
                          name: "NFC West",
                          teams: ["Cardinals", "Rams", "49ers", "Seahawks"],
                        },
                      ],
                    },
                    {
                      label: "NBA",
                      path: "/nba",
                      divisions: [
                        {
                          name: "Atlantic",
                          teams: [
                            "Celtics",
                            "Nets",
                            "Knicks",
                            "76ers",
                            "Raptors",
                          ],
                        },
                        {
                          name: "Central",
                          teams: [
                            "Bulls",
                            "Cavaliers",
                            "Pistons",
                            "Pacers",
                            "Bucks",
                          ],
                        },
                        {
                          name: "Southeast",
                          teams: [
                            "Hawks",
                            "Hornets",
                            "Heat",
                            "Magic",
                            "Wizards",
                          ],
                        },
                        {
                          name: "Northwest",
                          teams: [
                            "Nuggets",
                            "Timberwolves",
                            "Thunder",
                            "Trail Blazers",
                            "Jazz",
                          ],
                        },
                        {
                          name: "Pacific",
                          teams: [
                            "Warriors",
                            "Clippers",
                            "Lakers",
                            "Suns",
                            "Kings",
                          ],
                        },
                        {
                          name: "Southwest",
                          teams: [
                            "Mavericks",
                            "Rockets",
                            "Grizzlies",
                            "Pelicans",
                            "Spurs",
                          ],
                        },
                      ],
                    },
                    {
                      label: "MLB",
                      path: "/mlb",
                      divisions: [
                        {
                          name: "AL East",
                          teams: [
                            "Orioles",
                            "Red Sox",
                            "Yankees",
                            "Rays",
                            "Blue Jays",
                          ],
                        },
                        {
                          name: "AL Central",
                          teams: [
                            "White Sox",
                            "Guardians",
                            "Tigers",
                            "Royals",
                            "Twins",
                          ],
                        },
                        {
                          name: "AL West",
                          teams: [
                            "Astros",
                            "Angels",
                            "Athletics",
                            "Mariners",
                            "Rangers",
                          ],
                        },
                        {
                          name: "NL East",
                          teams: [
                            "Braves",
                            "Marlins",
                            "Mets",
                            "Phillies",
                            "Nationals",
                          ],
                        },
                        {
                          name: "NL Central",
                          teams: [
                            "Cubs",
                            "Reds",
                            "Brewers",
                            "Pirates",
                            "Cardinals",
                          ],
                        },
                        {
                          name: "NL West",
                          teams: [
                            "Diamondbacks",
                            "Rockies",
                            "Dodgers",
                            "Padres",
                            "Giants",
                          ],
                        },
                      ],
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-b border-white/10 last:border-0"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between px-6 py-4 text-white hover:bg-white/10 rounded-none text-lg font-normal"
                        onClick={() => {
                          setActiveMenu(
                            activeMenu === item.label ? null : item.label,
                          );
                        }}
                      >
                        {item.label}
                        <ChevronRight
                          className={`h-5 w-5 transition-transform ${activeMenu === item.label ? "rotate-90" : ""}`}
                        />
                      </Button>
                      {activeMenu === item.label && (
                        <div className="bg-white/5">
                          {item.divisions.map((division) => (
                            <div key={division.name} className="px-8 py-2">
                              <h3 className="text-white/60 text-sm font-medium mb-1">
                                {division.name}
                              </h3>
                              {division.teams.map((team) => (
                                <Button
                                  key={team}
                                  variant="ghost"
                                  className="w-full justify-start px-2 py-2 text-white hover:bg-white/10 rounded-none text-base font-normal"
                                  onClick={() => {
                                    navigate(
                                      `/teams/${item.label.toLowerCase()}/${team.toLowerCase()}`,
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {team}
                                </Button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <h1 className="text-xl font-bold text-black">PROSPORTSTALK</h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-black hover:text-gray-600"
                >
                  NFL
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="grid grid-cols-4 gap-4 p-4 w-[600px]">
                  <div>
                    <h3 className="font-semibold mb-2">AFC East</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Buffalo Bills"
                        slug="bills"
                        league="NFL"
                      />
                      <TeamLink
                        name="Miami Dolphins"
                        slug="dolphins"
                        league="NFL"
                      />
                      <TeamLink
                        name="New England Patriots"
                        slug="patriots"
                        league="NFL"
                      />
                      <TeamLink name="New York Jets" slug="jets" league="NFL" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AFC North</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Baltimore Ravens"
                        slug="ravens"
                        league="NFL"
                      />
                      <TeamLink
                        name="Cincinnati Bengals"
                        slug="bengals"
                        league="NFL"
                      />
                      <TeamLink
                        name="Cleveland Browns"
                        slug="browns"
                        league="NFL"
                      />
                      <TeamLink
                        name="Pittsburgh Steelers"
                        slug="steelers"
                        league="NFL"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AFC South</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Houston Texans"
                        slug="texans"
                        league="NFL"
                      />
                      <TeamLink
                        name="Indianapolis Colts"
                        slug="colts"
                        league="NFL"
                      />
                      <TeamLink
                        name="Jacksonville Jaguars"
                        slug="jaguars"
                        league="NFL"
                      />
                      <TeamLink
                        name="Tennessee Titans"
                        slug="titans"
                        league="NFL"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">AFC West</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Denver Broncos"
                        slug="broncos"
                        league="NFL"
                      />
                      <TeamLink
                        name="Kansas City Chiefs"
                        slug="chiefs"
                        league="NFL"
                      />
                      <TeamLink
                        name="Las Vegas Raiders"
                        slug="raiders"
                        league="NFL"
                      />
                      <TeamLink
                        name="Los Angeles Chargers"
                        slug="chargers"
                        league="NFL"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 w-[600px] border-t">
                  <div>
                    <h3 className="font-semibold mb-2">NFC East</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Dallas Cowboys"
                        slug="cowboys"
                        league="NFL"
                      />
                      <TeamLink
                        name="New York Giants"
                        slug="giants"
                        league="NFL"
                      />
                      <TeamLink
                        name="Philadelphia Eagles"
                        slug="eagles"
                        league="NFL"
                      />
                      <TeamLink
                        name="Washington Commanders"
                        slug="commanders"
                        league="NFL"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">NFC North</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Chicago Bears"
                        slug="bears"
                        league="NFL"
                      />
                      <TeamLink
                        name="Detroit Lions"
                        slug="lions"
                        league="NFL"
                      />
                      <TeamLink
                        name="Green Bay Packers"
                        slug="packers"
                        league="NFL"
                      />
                      <TeamLink
                        name="Minnesota Vikings"
                        slug="vikings"
                        league="NFL"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">NFC South</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Atlanta Falcons"
                        slug="falcons"
                        league="NFL"
                      />
                      <TeamLink
                        name="Carolina Panthers"
                        slug="panthers"
                        league="NFL"
                      />
                      <TeamLink
                        name="New Orleans Saints"
                        slug="saints"
                        league="NFL"
                      />
                      <TeamLink
                        name="Tampa Bay Buccaneers"
                        slug="buccaneers"
                        league="NFL"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">NFC West</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Arizona Cardinals"
                        slug="cardinals"
                        league="NFL"
                      />
                      <TeamLink
                        name="Los Angeles Rams"
                        slug="rams"
                        league="NFL"
                      />
                      <TeamLink
                        name="San Francisco 49ers"
                        slug="49ers"
                        league="NFL"
                      />
                      <TeamLink
                        name="Seattle Seahawks"
                        slug="seahawks"
                        league="NFL"
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-black hover:text-gray-600"
                >
                  MLB
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="grid grid-cols-3 gap-4 p-4 w-[800px]">
                  <div>
                    <h3 className="font-semibold mb-2">American League East</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Baltimore Orioles"
                        slug="orioles"
                        league="MLB"
                      />
                      <TeamLink
                        name="Boston Red Sox"
                        slug="red-sox"
                        league="MLB"
                      />
                      <TeamLink
                        name="New York Yankees"
                        slug="yankees"
                        league="MLB"
                      />
                      <TeamLink
                        name="Tampa Bay Rays"
                        slug="rays"
                        league="MLB"
                      />
                      <TeamLink
                        name="Toronto Blue Jays"
                        slug="blue-jays"
                        league="MLB"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      American League Central
                    </h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Chicago White Sox"
                        slug="white-sox"
                        league="MLB"
                      />
                      <TeamLink
                        name="Cleveland Guardians"
                        slug="guardians"
                        league="MLB"
                      />
                      <TeamLink
                        name="Detroit Tigers"
                        slug="tigers"
                        league="MLB"
                      />
                      <TeamLink
                        name="Kansas City Royals"
                        slug="royals"
                        league="MLB"
                      />
                      <TeamLink
                        name="Minnesota Twins"
                        slug="twins"
                        league="MLB"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">American League West</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Athletics"
                        slug="athletics"
                        league="MLB"
                      />
                      <TeamLink
                        name="Houston Astros"
                        slug="astros"
                        league="MLB"
                      />
                      <TeamLink
                        name="Los Angeles Angels"
                        slug="angels"
                        league="MLB"
                      />
                      <TeamLink
                        name="Seattle Mariners"
                        slug="mariners"
                        league="MLB"
                      />
                      <TeamLink
                        name="Texas Rangers"
                        slug="rangers"
                        league="MLB"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 w-[800px] border-t">
                  <div>
                    <h3 className="font-semibold mb-2">National League East</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Atlanta Braves"
                        slug="braves"
                        league="MLB"
                      />
                      <TeamLink
                        name="Miami Marlins"
                        slug="marlins"
                        league="MLB"
                      />
                      <TeamLink name="New York Mets" slug="mets" league="MLB" />
                      <TeamLink
                        name="Philadelphia Phillies"
                        slug="phillies"
                        league="MLB"
                      />
                      <TeamLink
                        name="Washington Nationals"
                        slug="nationals"
                        league="MLB"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      National League Central
                    </h3>
                    <div className="space-y-1">
                      <TeamLink name="Chicago Cubs" slug="cubs" league="MLB" />
                      <TeamLink
                        name="Cincinnati Reds"
                        slug="reds"
                        league="MLB"
                      />
                      <TeamLink
                        name="Milwaukee Brewers"
                        slug="brewers"
                        league="MLB"
                      />
                      <TeamLink
                        name="Pittsburgh Pirates"
                        slug="pirates"
                        league="MLB"
                      />
                      <TeamLink
                        name="St. Louis Cardinals"
                        slug="cardinals"
                        league="MLB"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">National League West</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Arizona Diamondbacks"
                        slug="diamondbacks"
                        league="MLB"
                      />
                      <TeamLink
                        name="Colorado Rockies"
                        slug="rockies"
                        league="MLB"
                      />
                      <TeamLink
                        name="Los Angeles Dodgers"
                        slug="dodgers"
                        league="MLB"
                      />
                      <TeamLink
                        name="San Diego Padres"
                        slug="padres"
                        league="MLB"
                      />
                      <TeamLink
                        name="San Francisco Giants"
                        slug="giants"
                        league="MLB"
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-black hover:text-gray-600"
                >
                  NBA
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="grid grid-cols-3 gap-4 p-4 w-[800px]">
                  <div>
                    <h3 className="font-semibold mb-2">Atlantic</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Boston Celtics"
                        slug="celtics"
                        league="NBA"
                      />
                      <TeamLink name="Brooklyn Nets" slug="nets" league="NBA" />
                      <TeamLink
                        name="New York Knicks"
                        slug="knicks"
                        league="NBA"
                      />
                      <TeamLink
                        name="Philadelphia 76ers"
                        slug="76ers"
                        league="NBA"
                      />
                      <TeamLink
                        name="Toronto Raptors"
                        slug="raptors"
                        league="NBA"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Central</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Chicago Bulls"
                        slug="bulls"
                        league="NBA"
                      />
                      <TeamLink
                        name="Cleveland Cavaliers"
                        slug="cavaliers"
                        league="NBA"
                      />
                      <TeamLink
                        name="Detroit Pistons"
                        slug="pistons"
                        league="NBA"
                      />
                      <TeamLink
                        name="Indiana Pacers"
                        slug="pacers"
                        league="NBA"
                      />
                      <TeamLink
                        name="Milwaukee Bucks"
                        slug="bucks"
                        league="NBA"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Southeast</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Atlanta Hawks"
                        slug="hawks"
                        league="NBA"
                      />
                      <TeamLink
                        name="Charlotte Hornets"
                        slug="hornets"
                        league="NBA"
                      />
                      <TeamLink name="Miami Heat" slug="heat" league="NBA" />
                      <TeamLink
                        name="Orlando Magic"
                        slug="magic"
                        league="NBA"
                      />
                      <TeamLink
                        name="Washington Wizards"
                        slug="wizards"
                        league="NBA"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 w-[800px] border-t">
                  <div>
                    <h3 className="font-semibold mb-2">Northwest</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Denver Nuggets"
                        slug="nuggets"
                        league="NBA"
                      />
                      <TeamLink
                        name="Minnesota Timberwolves"
                        slug="timberwolves"
                        league="NBA"
                      />
                      <TeamLink
                        name="Oklahoma City Thunder"
                        slug="thunder"
                        league="NBA"
                      />
                      <TeamLink
                        name="Portland Trail Blazers"
                        slug="blazers"
                        league="NBA"
                      />
                      <TeamLink name="Utah Jazz" slug="jazz" league="NBA" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pacific</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Golden State Warriors"
                        slug="warriors"
                        league="NBA"
                      />
                      <TeamLink
                        name="LA Clippers"
                        slug="clippers"
                        league="NBA"
                      />
                      <TeamLink
                        name="Los Angeles Lakers"
                        slug="lakers"
                        league="NBA"
                      />
                      <TeamLink name="Phoenix Suns" slug="suns" league="NBA" />
                      <TeamLink
                        name="Sacramento Kings"
                        slug="kings"
                        league="NBA"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Southwest</h3>
                    <div className="space-y-1">
                      <TeamLink
                        name="Dallas Mavericks"
                        slug="mavericks"
                        league="NBA"
                      />
                      <TeamLink
                        name="Houston Rockets"
                        slug="rockets"
                        league="NBA"
                      />
                      <TeamLink
                        name="Memphis Grizzlies"
                        slug="grizzlies"
                        league="NBA"
                      />
                      <TeamLink
                        name="New Orleans Pelicans"
                        slug="pelicans"
                        league="NBA"
                      />
                      <TeamLink
                        name="San Antonio Spurs"
                        slug="spurs"
                        league="NBA"
                      />
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              onClick={() => navigate("/trending")}
              className="text-black hover:text-gray-600 flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" /> Trending
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/news")}
              className="text-black hover:text-gray-600 flex items-center gap-2"
            >
              <Newspaper className="h-4 w-4" /> News
            </Button>

            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <NotificationsPopover />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-black hover:text-gray-600"
                      >
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate("/settings")}>
                        Profile Settings
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black hover:text-gray-600"
                  onClick={() => setShowAuthModal(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
