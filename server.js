import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GROQ_API_KEY;
const endpoint = "https://api.groq.com/openai/v1/chat/completions";
const modelName = "llama-3.3-70b-versatile";

if (!apiKey) {
  console.error("Error: GROQ_API_KEY is missing in .env file");
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages,
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || `Groq API error: ${response.status}`);
    }

    res.json(data);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.get('/api/github-achievements', async (req, res) => {
  try {
    const response = await fetch('https://github.com/m2l33k?tab=achievements', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const regex = /<img[^>]+src="([^"]+)"[^>]+alt="Achievement: ([^"]+)"/g;
    const achievements = new Map();
    
    let match;
    while ((match = regex.exec(html)) !== null) {
      const name = match[2];
      const image = match[1];
      // Use name as key to deduplicate
      if (!achievements.has(name)) {
        achievements.set(name, image);
      }
    }

    const result = Array.from(achievements.entries()).map(([name, image]) => ({ name, image }));
    res.json(result);

  } catch (error) {
    console.error("Achievements Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch achievements" });
  }
});

app.get('/api/tryhackme-stats', async (req, res) => {
  try {
    const response = await fetch('https://tryhackme.com/api/v2/public-profile?username=RootKeeper', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`THM fetch failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("THM Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch THM stats" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
