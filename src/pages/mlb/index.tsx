import React from "react";
import LeagueLanding from "@/components/landing/LeagueLanding";

const MLBPage = () => {
  const mlbData = {
    league: {
      name: "MLB",
      description:
        "The latest news, scores, and updates from Major League Baseball",
      heroImage:
        "https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    featuredArticles: [
      {
        title: "Spring Training: What to Watch For",
        excerpt:
          "As teams report to camp, here are the key storylines to follow...",
        image:
          "https://images.unsplash.com/photo-1578432014316-48b448d79d57?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author: "Sarah Wilson",
        date: "Feb 10, 2024",
        category: "Spring Training",
        url: "/articles/spring-training-preview",
      },
      {
        title: "Free Agency: Top Players Still Available",
        excerpt:
          "Looking at the best unsigned players as the season approaches...",
        image:
          "https://images.unsplash.com/photo-1578432014316-48b448d79d57?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author: "Tom Davis",
        date: "Feb 9, 2024",
        category: "Free Agency",
        url: "/articles/mlb-free-agency",
      },
    ],
    latestNews: [
      {
        title: "Trade Rumors: Latest Updates",
        url: "/articles/mlb-trade-rumors",
      },
      { title: "Prospect Rankings: Top 100", url: "/articles/mlb-prospects" },
      { title: "Rule Changes for 2024", url: "/articles/mlb-rule-changes" },
    ],
    trending: [
      { title: "MVP Predictions", url: "/articles/mlb-mvp-predictions" },
      { title: "World Series Odds", url: "/articles/world-series-odds" },
      { title: "Rookie Watch", url: "/articles/mlb-rookie-watch" },
    ],
  };

  return <LeagueLanding {...mlbData} />;
};

export default MLBPage;
