import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { message } = req.body;

  try {
    const response = await fetch(
      "https://api.venice.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.VENICE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "venice-uncensored",
          messages: [
            { role: "user", content: message }
          ]
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
