import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const API_KEY = process.env.VENICE_API_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch("https://api.venice.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "venice-uncensored",
      messages: [
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();

  res.json({
    reply: data.choices?.[0]?.message?.content || "No response"
  });
});

app.listen(3000, () => {
  console.log("AI server running on http://localhost:3000");
});
