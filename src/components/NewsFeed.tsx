import React, { useEffect, useState } from "react";
import { useAuthenticationStatus, useUserId } from "@nhost/react";
import ArticleCard from "./ArticleCard";
import { Article } from "../types";

interface APIArticle {
  title: string;
  urlToImage: string;
  description: string;
  url: string;
  source?: { name: string };
  publishedAt?: string;
}

const NewsFeed: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = useUserId(); // ✅ Get userId from Nhost
  const { isAuthenticated } = useAuthenticationStatus(); // ✅ Check if logged in

  console.log("✅ Current User ID:", userId); // Debugging

  useEffect(() => {
    if (!searchQuery) return;

    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          //YOUR NHOST FUNCTION URL
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        setArticles(
          (data.articles || []).slice(0, 10).map((article: APIArticle) => ({
            id: article.url, // ✅ Use URL as a unique ID
            title: article.title,
            imageUrl: article.urlToImage || "/default-image.jpg",
            source: article.source?.name || "Unknown Source",
            publishedAt: article.publishedAt || new Date().toISOString(),
            sentiment: "neutral",
            summary: article.description || "No summary available",
            url: article.url,
            isRead: false,
            isSaved: false,
          }))
        );
      } catch (error) {
        console.error("❌ Error fetching news:", error);
        setError("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            userId={userId} // ✅ Pass `userId` properly
            isSaved={false}
            onToggleRead={() => {}}
            onToggleSave={(id) => console.log("Saving article:", id)}
            onShare={(id) => console.log("Sharing article:", id)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
