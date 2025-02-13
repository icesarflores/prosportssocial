import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Score {
  id: string;
  league: string;
  homeTeam: { name: string; score: number };
  awayTeam: { name: string; score: number };
  status: string;
  time?: string;
}

const defaultScores: Score[] = [
  {
    id: "1",
    league: "NBA",
    homeTeam: { name: "Warriors", score: 105 },
    awayTeam: { name: "Lakers", score: 98 },
    status: "3rd Quarter",
    time: "8:24",
  },
  {
    id: "2",
    league: "NFL",
    homeTeam: { name: "Chiefs", score: 24 },
    awayTeam: { name: "Raiders", score: 14 },
    status: "3rd Quarter",
  },
  {
    id: "3",
    league: "MLB",
    homeTeam: { name: "Yankees", score: 5 },
    awayTeam: { name: "Red Sox", score: 3 },
    status: "7th Inning",
  },
];

const ScoreScroller = () => {
  const [scores, setScores] = useState(defaultScores);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate score updates
      setScores((prev) =>
        prev.map((score) => ({
          ...score,
          homeTeam: {
            ...score.homeTeam,
            score: Math.floor(Math.random() * 10) + score.homeTeam.score,
          },
          awayTeam: {
            ...score.awayTeam,
            score: Math.floor(Math.random() * 10) + score.awayTeam.score,
          },
          time: `${Math.floor(Math.random() * 12)}:${Math.floor(
            Math.random() * 60,
          )
            .toString()
            .padStart(2, "0")}`,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white text-black py-2 border-b border-gray-200">
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="flex gap-4 px-4 max-w-[1400px] mx-auto">
          {Object.entries(groupBy(scores, "league")).map(
            ([league, leagueScores]) => (
              <div key={league} className="flex items-center gap-4">
                <Badge
                  variant="outline"
                  className="bg-white text-black border-gray-200"
                >
                  {league}
                </Badge>
                {(leagueScores as Score[]).map((score) => (
                  <Card key={score.id} className="bg-white border-gray-200 p-2">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span>{score.homeTeam.name}</span>
                        <span className="font-bold text-black">
                          {score.homeTeam.score}
                        </span>
                      </div>
                      <span className="text-gray-500">vs</span>
                      <div className="flex items-center gap-2">
                        <span>{score.awayTeam.name}</span>
                        <span className="font-bold text-black">
                          {score.awayTeam.score}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-white text-gray-600 border-gray-200"
                      >
                        {score.status} {score.time ? `${score.time}` : ""}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            ),
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

const groupBy = (array: any[], key: string) => {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};

export default ScoreScroller;
