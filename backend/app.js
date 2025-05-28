import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

console.log(process.env.PORT);

const Port = process.env.PORT ?? 3000;
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is not set in the environment variables.");
  process.exit(1);
}

app.get("/data/all/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  const baseUrl = "https://www.alphavantage.co/query";
  try {
    const [ovRes, erRes] = await Promise.all([
      fetch(`${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`),
      fetch(`${baseUrl}?function=EARNINGS&symbol=${symbol}&apikey=${apiKey}`),
    ]);
    if (!ovRes.ok || !erRes.ok) {
      return res.status(502).json({
        error: `Error fetching data from one of the APIs`,
      });
    }

    const [overview, earnings] = await Promise.all([
      ovRes.json(),
      erRes.json(),
    ]);
    res.json({ overview, earnings });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(Port, () => {
  console.log(`🚀 Server listening on http://localhost:${Port}`);
});
