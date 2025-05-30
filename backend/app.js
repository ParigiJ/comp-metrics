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
      return res.status(502).json({ error: "Bad gateway" });
    }

    const [overview, earnings] = await Promise.all([
      ovRes.json(),
      erRes.json(),
    ]);

    const rateLimitMsg = overview.Note || earnings.Note;
    if (rateLimitMsg) {
      return res.status(429).json({ error: rateLimitMsg });
    }

    const missingOverview =
      !overview ||
      Object.keys(overview).length === 0 ||
      overview["Error Message"];
    const missingEarnings =
      !earnings ||
      !Array.isArray(earnings.annualEarnings) ||
      earnings.annualEarnings.length === 0 ||
      earnings["Error Message"];

    if (missingOverview && missingEarnings) {
      return res.status(404).json({ error: `No data found for "${symbol}"` });
    }

    res.json({ overview, earnings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(Port, () => {
  console.log(`🚀 Server listening on http://localhost:${Port}`);
});
