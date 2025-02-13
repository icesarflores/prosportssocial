import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, BookmarkPlus, MessageSquare } from "lucide-react";

interface ArticlePageProps {
  article: {
    title: string;
    content: string;
    headerImage?: string;
    publishedAt: string;
    author: {
      name: string;
      avatar: string;
      bio?: string;
    };
    category?: string;
    readTime?: string;
  };
}

export function ArticlePage({ article }: ArticlePageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <div className="mb-8">
        {article.category && (
          <span className="text-blue-600 text-sm font-medium mb-2 block">
            {article.category}
          </span>
        )}
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-between py-4 border-y">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <img src={article.author.avatar} alt={article.author.name} />
            </Avatar>
            <div>
              <p className="font-medium">{article.author.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  {formatDistanceToNow(new Date(article.publishedAt), {
                    addSuffix: true,
                  })}
                </span>
                {article.readTime && (
                  <>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <BookmarkPlus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="space-y-6">
        {article.headerImage && (
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <img
              src={article.headerImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>

      {/* Author Bio */}
      {article.author.bio && (
        <Card className="mt-12 p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <img src={article.author.avatar} alt={article.author.name} />
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg mb-2">
                About {article.author.name}
              </h3>
              <p className="text-gray-600">{article.author.bio}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Comments Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Comments</h2>
          <Button>
            <MessageSquare className="h-5 w-5 mr-2" />
            Write a Comment
          </Button>
        </div>
        {/* Add Comments component here */}
      </div>
    </div>
  );
}
