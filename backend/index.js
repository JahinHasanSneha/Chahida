import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// Ensure fetch is available in older Node versions by using node-fetch
// import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};
console.log("GEMINI:", process.env.GEMINI_API_KEY ? "LOADED" : "MISSING");

app.post("/api/ai/ask", async (req, res) => {
  const { message, sessionId = "default" } = req.body;

  if (!sessions[sessionId]) {
    sessions[sessionId] = [
      { role: "user", parts: [{ text: "You are Campus Genie, a helpful friendly university assistant." }] }
    ];
  }

  sessions[sessionId].push({ role: "user", parts: [{ text: message }] });

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: sessions[sessionId] })
      }
    );

    if (!r.ok) {
      const text = await r.text().catch(() => '');
      console.error('Generative API error:', r.status, text);
      return res.status(502).json({ reply: 'AI service error.' });
    }

    const data = await r.json().catch((err) => {
      console.error('Failed parsing AI response:', err);
      return null;
    });

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Try again.";

    sessions[sessionId].push({ role: "model", parts: [{ text: reply }] });
    res.json({ reply });
  } catch {
    console.error('AI request failed', arguments);
    res.json({ reply: "AI offline." });
  }
});

app.listen(7002, () => console.log("Conversation Gemini running"));
