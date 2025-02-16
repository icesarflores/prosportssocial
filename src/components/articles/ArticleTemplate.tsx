import React from "react";
import { Link } from "react-router-dom";

import { marked } from "marked";
import DOMPurify from "dompurify";

interface ArticleTemplateProps {
  article: {
    title: string;
    content: string;
    image?: string;
    author: {
      name: string;
      avatar?: string;
    };
    date: string;
    category?: string;
  };
}

const ArticleTemplate = ({ article }: ArticleTemplateProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Main Article */}
      <h1 className="text-6xl font-black mb-6">{article.title}</h1>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={
            article.author.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author.name}`
          }
          alt={article.author.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-medium">By {article.author.name}</p>
          <p className="text-gray-500">{article.date}</p>
        </div>
      </div>

      {article.image && (
        <img
          src={article.image}
          alt="Article header"
          className="w-full aspect-video object-cover mb-8 rounded-lg"
        />
      )}

      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(article.content)),
        }}
      />

      {/* More to Read Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">More to Read</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Link key={i} to="#" className="group">
              <div className="space-y-4">
                <img
                  src={`https://source.unsplash.com/800x600?sports=${i}`}
                  alt={`Related Article ${i}`}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <h3 className="font-bold group-hover:text-blue-600 transition-colors">
                  Related Article {i}
                </h3>
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sit amet nulla auctor, vestibulum magna sed, convallis ex.
                </p>
                <div className="text-blue-600 text-sm font-medium">
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleTemplate;
