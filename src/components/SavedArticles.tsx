import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SavedArticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setArticles(saved);
  }, []);

  const removeArticle = (id) => {
    const updatedArticles = articles.filter((a) => a.id !== id);
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Saved Articles</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Main Page
        </button>
      </div>

      {articles.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">You haven't saved any articles yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-gray-500 text-sm">{article.source}</p>
                <button
                  onClick={() => removeArticle(article.id)}
                  className="mt-4 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticles;
