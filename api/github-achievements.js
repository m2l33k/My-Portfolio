
export default async function handler(req, res) {
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
      if (!achievements.has(name)) {
        achievements.set(name, image);
      }
    }

    const result = Array.from(achievements.entries()).map(([name, image]) => ({ name, image }));
    res.status(200).json(result);

  } catch (error) {
    console.error("Achievements Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch achievements" });
  }
}
