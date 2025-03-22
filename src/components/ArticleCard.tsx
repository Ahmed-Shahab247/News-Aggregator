import React from "react";

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    imageUrl: string;
    source: string;
    published_at: string;
    summary: string;
    url: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const saveArticle = () => {
    const savedArticles = JSON.parse(localStorage.getItem("savedArticles") || "[]");

    // Prevent duplicate saves
    if (!savedArticles.some((saved) => saved.id === article.id)) {
      localStorage.setItem("savedArticles", JSON.stringify([...savedArticles, article]));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-500 text-sm">
        {article.source} | {new Date(article.published_at).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mt-2">{article.summary}</p>
      <div className="flex justify-between items-center mt-4">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Read more
        </a>
        <button onClick={saveArticle} className="py-1 px-3 rounded bg-blue-500 text-white hover:bg-opacity-80">
          Save
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
