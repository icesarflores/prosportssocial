import React from "react";
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
    content: string;
    slug: string;
  }>;
  latestNews: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  trending: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

const LeagueLanding = ({
  league,
  featuredArticles,
  latestNews,
  trending,
}: LeagueLandingProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breaking News Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-red-600 mb-2 block">
              Breaking News
            </span>
            <h1 className="text-4xl font-bold mb-4">
              {featuredArticles[0]?.title}
            </h1>
            <p className="text-gray-600 mb-4">{featuredArticles[0]?.excerpt}</p>
            <Link
              to={`/articles/${featuredArticles[0]?.slug}`}
              className="inline-block bg-gray-100 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredArticles.slice(1).map((article) => (
            <Link
              key={article.id}
              to={`/articles/${encodeURIComponent(article.slug)}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeagueLanding;
