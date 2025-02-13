import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  author: {
    username: string;
    avatar_url?: string;
    full_name: string;
  };
  category?: string;
}

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data: articleData, error } = await supabase
        .from("articles")
        .select(
          `
          *,
          author:profiles(username, avatar_url, full_name)
        `,
        )
        .eq("id", slug)
        .single();

      if (error) throw error;
      if (!articleData) throw new Error("Article not found");

      setArticle(articleData);

      // Fetch related articles
      const { data: relatedData } = await supabase
        .from("articles")
        .select(
          `
          *,
          author:profiles(username, avatar_url, full_name)
        `,
        )
        .neq("id", articleData.id)
        .eq("category", articleData.category)
        .limit(3);

      setRelatedArticles(relatedData || []);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          {
            label: article.category || "Articles",
            href: `/category/${article.category}`,
          },
          { label: article.title },
        ]}
        className="mb-8"
      />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>

        <div className="flex items-center gap-4 mb-8">
          <Avatar className="h-12 w-12">
            <img
              src={
                article.author.avatar_url ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author.username}`
              }
              alt={article.author.full_name}
            />
          </Avatar>
          <div>
            <p className="font-medium">{article.author.full_name}</p>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(article.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>

        {article.image_url && (
          <div className="aspect-video mb-8 rounded-lg overflow-hidden">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Card key={related.id} className="overflow-hidden">
                  {related.image_url && (
                    <div className="aspect-video">
                      <img
                        src={related.image_url}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">
                      <Link
                        to={`/articles/${related.id}`}
                        className="hover:text-blue-600"
                      >
                        {related.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {related.author.full_name} •{" "}
                      {formatDistanceToNow(new Date(related.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticlePage;
