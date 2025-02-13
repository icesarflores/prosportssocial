import React from "react";
import LeagueLanding from "@/components/landing/LeagueLanding";

const NFLPage = () => {
  const nflData = {
    league: {
      name: "NFL",
      description:
        "The latest news, scores, and updates from the National Football League",
      heroImage:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=3333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    featuredArticles: [
      {
        title: "Super Bowl LVIII: Chiefs vs 49ers Preview",
        excerpt:
          "Breaking down the key matchups and storylines ahead of the big game...",
        image:
          "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
        author: "John Smith",
        date: "Feb 10, 2024",
        category: "Super Bowl",
        url: "/articles/super-bowl-preview",
      },
      {
        title: "NFL Draft: Top Prospects to Watch",
        excerpt:
          "A look at the most promising college players entering the NFL draft...",
        image:
          "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80",
        author: "Mike Johnson",
        date: "Feb 9, 2024",
        category: "Draft",
        url: "/articles/nfl-draft-prospects",
      },
    ],
    latestNews: [
      {
        title: "Injury Report: Week 15 Updates",
        url: "/articles/injury-report-week-15",
      },
      {
        title: "Power Rankings: Post-Season Edition",
        url: "/articles/power-rankings-post-season",
      },
      {
        title: "Coaching Changes: Latest Updates",
        url: "/articles/coaching-changes",
      },
    ],
    trending: [
      { title: "MVP Race: Leading Candidates", url: "/articles/mvp-race" },
      {
        title: "Playoff Picture: Who's In, Who's Out",
        url: "/articles/playoff-picture",
      },
      {
        title: "Trade Deadline: Biggest Moves",
        url: "/articles/trade-deadline",
      },
    ],
  };

  return <LeagueLanding {...nflData} />;
};

export default NFLPage;
