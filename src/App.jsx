import { useState } from "react";

function App() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) {
      alert("Please enter a valid stock name");
      return;
    }
    setError(null);
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
          placeholder="Enter stock symbol"
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

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {result && (
        <div className="mt-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Overview for {symbol.toUpperCase()}
            </h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result.overview, null, 2)}
            </pre>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              Earnings for {symbol.toUpperCase()}
            </h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(result.earnings, null, 2)}
            </pre>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
