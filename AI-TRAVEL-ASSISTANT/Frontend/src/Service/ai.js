/* eslint-disable no-undef */
// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  console.error("API key is not set. Please set the GOOGLE_GENAI_API_KEY environment variable.");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
console.log("Google Generative AI initialized with API key:", apiKey);

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    // FIX: Correct model name
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ result: response.text() });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// Temporary code to list models
app.get("/api/models", async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json(models);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
