import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import NewsFeed from "./components/NewsFeed";
import { Search } from "lucide-react";
import { categories as initialCategories } from "./data";
import { nhost } from "./App";

const MainPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    nhost.auth.onAuthStateChanged((event, session) => {
      setIsAuthenticated(!!session);
      setUserId(session?.user?.id || "");
    });
  }, []);

  const handleToggleCategory = (id: string, name: string) => {
    setCategories(categories.map(category =>
      category.id === id ? { ...category, isSelected: !category.isSelected } : category
    ));
    setSearchQuery(name);
  };

  const saveArticle = async (article: any) => {
    const user = nhost.auth.getUser();
    if (!user) {
      alert("Please sign in to save articles.");
      return;
    }

    const { article_id, title, imageUrl, source, publishedAt, sentiment, summary, url } = article;

    try {
      await nhost.graphql.request(`
        mutation SaveArticle(
          $userId: uuid!,
          $articleId: String!,
          $title: String!,
          $imageUrl: String!,
          $source: String!,
          $publishedAt: String!,
          $sentiment: String!,
          $summary: String!,
          $url: String!
        ) {
          insert_saved_articles_one(object: {
            user_id: $userId,
            article_id: $articleId,
            title: $title,
            image_url: $imageUrl,
            source: $source,
            published_at: $publishedAt,
            sentiment: $sentiment,
            summary: $summary,
            url: $url,
            saved_at: now()
          }) {
            id
          }
        }
      `, {
        userId: user.id,
        articleId: article_id,
        title,
        imageUrl,
        source,
        publishedAt,
        sentiment,
        summary,
        url
      });
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar categories={categories} onToggleCategory={handleToggleCategory} />

      <main className="flex-1 overflow-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <NewsFeed searchQuery={searchQuery} onSave={saveArticle} />
      </main>
    </div>
  );
};

export default MainPage;
