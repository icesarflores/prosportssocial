import React from "react";
import LeagueLanding from "@/components/landing/LeagueLanding";

const NBAPage = () => {
  const nbaData = {
    league: {
      name: "NBA",
      description:
        "The latest news, scores, and updates from the National Basketball Association",
      heroImage:
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
    },
    featuredArticles: [
      {
        title: "All-Star Weekend: Complete Guide",
        excerpt: "Everything you need to know about this year's festivities...",
        image:
          "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=80",
        author: "James Wilson",
        date: "Feb 10, 2024",
        category: "All-Star",
        url: "/articles/nba-all-star-guide",
      },
      {
        title: "Trade Deadline: Winners and Losers",
        excerpt: "Breaking down the biggest moves and their impact...",
        image:
          "https://images.unsplash.com/photo-1584770557404-a5d2a798e81a?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author: "Lisa Thompson",
        date: "Feb 9, 2024",
        category: "Trade Deadline",
        url: "/articles/nba-trade-deadline",
      },
    ],
    latestNews: [
      {
        title: "Injury Report: Daily Updates",
        url: "/articles/nba-injury-report",
      },
      { title: "Power Rankings: Week 16", url: "/articles/nba-power-rankings" },
      {
        title: "Rookie Ladder: Latest Rankings",
        url: "/articles/nba-rookie-ladder",
      },
    ],
    trending: [
      { title: "MVP Race Update", url: "/articles/nba-mvp-race" },
      { title: "Playoff Picture", url: "/articles/nba-playoff-picture" },
      { title: "Rising Stars Challenge", url: "/articles/rising-stars" },
    ],
  };

  return <LeagueLanding {...nbaData} />;
};

export default NBAPage;
