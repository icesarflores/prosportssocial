import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";

interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  league: string;
}

interface UpcomingGamesProps {
  games?: Game[];
}

const defaultGames: Game[] = [
  {
    id: "1",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    date: "2024-03-25",
    time: "19:30",
    league: "NBA",
  },
  {
    id: "2",
    homeTeam: "Celtics",
    awayTeam: "Heat",
    date: "2024-03-26",
    time: "20:00",
    league: "NBA",
  },
  {
    id: "3",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    date: "2024-03-27",
    time: "15:00",
    league: "Premier League",
  },
];

const UpcomingGames = ({ games = defaultGames }: UpcomingGamesProps) => {
  return (
    <Card className="w-[320px] bg-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Upcoming Games</span>
          <Button variant="ghost" size="sm" className="p-0">
            <span className="text-sm text-muted-foreground">View All</span>
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[360px] pr-4">
          <div className="space-y-4">
            {games.map((game) => (
              <Card key={game.id} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{game.league}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {game.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{game.homeTeam}</div>
                    <div className="text-sm text-muted-foreground">vs</div>
                    <div className="text-sm font-medium">{game.awayTeam}</div>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {game.time} EST
                  </div>
                  <Button variant="outline" className="w-full">
                    Game Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UpcomingGames;
