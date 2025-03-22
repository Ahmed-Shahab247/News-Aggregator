//INCLUDE THIS FILE IN YOUR BACKEND FUNCTIONS SECTION

import { Handler } from "@nhost/functions";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  const API_KEY = process.env.NEWS_API_KEY; // ✅ Getting API key from env or Insert API key
  console.log("🔹 API_KEY:", API_KEY ? "Exists" : "Not Found"); // ✅ Debugging output

  if (!API_KEY) {
    return res.status(500).json({ error: "Server misconfiguration: Missing API key" });
  }

  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
