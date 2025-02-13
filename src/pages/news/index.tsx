import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const NewsPage = () => {
  const newsColumns = [
    {
      title: "Popular Sports Sites",
      items: [
        { title: "Most Popular Stories", url: "#" },
        { title: "Sources: Mavs new star Davis out multiple we...", url: "#" },
        { title: "Patrick Mahomes lost another Super Bowl —...", url: "#" },
        { title: "These 3 former MLB prospects have done Fr...", url: "#" },
        { title: "ATP roundup: Carlos Alcaraz, Denis Shapovalo...", url: "#" },
        {
          title: "Eagles bounce back against backup late in the NFL...",
          url: "#",
        },
        { title: "US Sports Betting on Pace To Break Records as...", url: "#" },
        { title: "BetMGM Teams Up With MoneyLion for a $42...", url: "#" },
      ],
    },
    {
      title: "Sports News",
      subtitle: "(www.espn.com)",
      description:
        "Newsweek sports is a channel founded in 1979, known for sports news personalities & analysis.",
      items: [
        {
          title: "How Jimmy Butler looked with the Warriors, and...",
          url: "#",
        },
        {
          title: "Patrick Mahomes had a bad night. How he respon...",
          url: "#",
        },
        {
          title: "Chiefs' three-peat bid in jeopardy after firing of...",
          url: "#",
        },
        {
          title: "76ers' Embiid: Might need another knee surgery...",
          url: "#",
        },
      ],
    },
    {
      title: "Sports Illustrated",
      subtitle: "(www.si.com)",
      description:
        "For over 50 years, Sports Illustrated has been a paragon of sports publications. For the news, fig...",
      items: [
        { title: "Future ACC Team Makes Coaching Change Ahead...", url: "#" },
        {
          title: "Sanford's Jermaine Samuels Puts Kansas in Beast...",
          url: "#",
        },
        {
          title: "Missouri Man Charged With Stealing $46K in Frau...",
          url: "#",
        },
        {
          title: "Colorado State vs Oregon State Basketball Live...",
          url: "#",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {newsColumns.map((column, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold">{column.title}</h2>
              {column.subtitle && (
                <span className="text-sm text-blue-600">{column.subtitle}</span>
              )}
            </div>
            {column.description && (
              <p className="text-sm text-gray-600 mb-4">{column.description}</p>
            )}
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {column.items.map((item, i) => (
                  <div key={i} className="border-b pb-3 last:border-0">
                    <Link to={item.url} className="text-sm hover:text-blue-600">
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
