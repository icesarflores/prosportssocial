import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleTemplate from "@/components/articles/ArticleTemplate";
import { supabase } from "@/lib/supabase";

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(
          `
          *,
          author:profiles!articles_user_id_fkey(*)
        `,
        )
        .eq("slug", decodeURIComponent(slug || ""))
        .single();

      if (error) throw error;
      if (!data) {
        navigate("/404");
        return;
      }
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found</div>;

  return <ArticleTemplate article={article} />;
};

export default ArticlePage;
