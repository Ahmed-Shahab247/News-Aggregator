import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { gql } from "@apollo/client";
import client from "./ApolloClient"; // ✅ Ensure this correctly points to your Apollo Client instance

// ✅ GraphQL Mutation to Save Articles (Only Required Fields)
const SAVE_ARTICLE_MUTATION = gql`
  mutation SaveArticle($userId: uuid!, $articleId: uuid!) {
    insert_saved_articles_one(object: {
      user_id: $userId,
      article_id: $articleId
    }) {
      article_id
    }
  }
`;

// ✅ Function to Save Article to Nhost
export const saveArticleToNhost = async (article, userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is missing!");
    }
    if (!article || !article.id) {
      throw new Error("Invalid article object: missing ID");
    }

    console.log("🟡 Attempting to save article:", article, "User ID:", userId);

    const { data } = await client.mutate({
      mutation: SAVE_ARTICLE_MUTATION,
      variables: {
        userId,
        articleId: article.id, // ✅ Ensure `article.id` is correct
      },
    });

    console.log("✅ Article saved successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error saving article:", error.message);
  }
};

// ✅ Utility Function for Tailwind CSS Merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
