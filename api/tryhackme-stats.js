
export default async function handler(req, res) {
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
    res.status(200).json(data);

  } catch (error) {
    console.error("THM Error:", error);
    res.status(500).json({ error: error.message || "Failed to fetch THM stats" });
  }
}
