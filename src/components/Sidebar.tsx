import React from "react";
import { Category } from "../types";
import { cn } from "../utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  categories: Category[];
  onToggleCategory: (id: string, name: string) => void;
  currentView: "news" | "saved"; // ✅ To highlight active view
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  onToggleCategory,
  currentView,
}) => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2">
            <button
              onClick={() => onToggleCategory(category.id, category.name)}
              className="w-full text-left text-gray-700 hover:text-blue-600"
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <button
          onClick={() => navigate("/")}
          className={cn(
            "w-full text-left text-gray-700 hover:text-blue-600 py-2",
            currentView === "news" && "font-bold text-blue-600"
          )}
        >
          News Feed
        </button>
        <button
          onClick={() => navigate("/savedarticles")}
          className={cn(
            "w-full text-left text-gray-700 hover:text-blue-600 py-2",
            currentView === "saved" && "font-bold text-blue-600"
          )}
        >
          Saved Articles
        </button>
      </div>
    </aside>
  );
};
