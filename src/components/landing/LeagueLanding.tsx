import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

interface LeagueLandingProps {
  league: {
    name: string;
    description: string;
    heroImage: string;
  };
  featuredArticles: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    category: string;
    slug: string;
  }>;
  latestNews: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
  trending: Array<{
    id: string;
    title: string;
    slug: string;
  }>;
}

const LeagueLanding = ({
  league,
  featuredArticles,
  latestNews,
  trending,
}: LeagueLandingProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{ backgroundImage: `url(${league.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-6">{league.name}</h1>
            <p className="text-xl">{league.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Featured Articles */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <Card key={index} className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">
                      <Link
                        to={`/articles/${article.slug || article.id}`}
                        className="hover:text-blue-600"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <p className="text-sm text-gray-500">By {article.author}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Latest News */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Latest News</h2>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {latestNews.map((news, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <Link
                        to={`/articles/${news.slug || news.id}`}
                        className="hover:text-blue-600"
                      >
                        {news.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Trending */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Trending</h2>
              <div className="space-y-4">
                {trending.map((item, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <Link
                      to={`/articles/${item.slug || item.id}`}
                      className="hover:text-blue-600"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueLanding;
