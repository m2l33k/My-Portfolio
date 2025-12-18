import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const modelName = "meta/Llama-3.3-70B-Instruct";

if (!token) {
  console.error("Error: GITHUB_TOKEN is missing in .env file");
}

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: messages,
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    res.json(response.body);

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.get('/api/github-achievements', async (req, res) => {
  try {
    const response = await fetch('https://github.com/m2l33k?tab=achievements', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`GitHub fetch failed: ${response.statusText}`);
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`THM fetch failed: ${response.statusText}`);
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
