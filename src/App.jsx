import { useState } from "react";
import Overview from "./Overview";
import EarningsTable from "./EarningsTable";
import MessageDialog from "./Components/MessageDialog";

function App() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) return setShowMsg(true);

    setError("");
    setResult(null);

    try {
      const res = await fetch(`/data/all/${symbol}`);
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(`Fetch failed: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Search Stocks (e.g., AAPL, MSFT)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Fetch Overview & Earnings
        </button>
      </form>

      <MessageDialog
        message="Please enter Stock Name before submitting."
        visible={showMsg}
        onClose={() => setShowMsg(false)}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-6">
          <Overview
            Symbol={result.overview.Symbol}
            OfficialSite={result.overview.OfficialSite}
            Name={result.overview.Name}
            Description={result.overview.Description}
          />
          <h2 className="text-xl font-semibold mb-2 mt-5">
            {result.earnings
              ? Object.keys(result.earnings)[1]
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())
              : "Earnings"}
          </h2>
          <EarningsTable earnings={result.earnings.annualEarnings} />
        </div>
      )}
    </div>
  );
}

export default App;
