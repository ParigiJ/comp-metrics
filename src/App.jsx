import { useState, useEffect } from "react";
import Overview from "./features/stock/Overview";
import EarningsTable from "./features/stock/EarningsTable";
import MessageDialog from "./Components/MessageDialog";
import { useLazyGetDataQuery } from "./services/dataApi";
import RequestCounter from "./features/counter/RequestCounter";
import KeyDataTable from "./features/stock/KeyDataTable";

function App() {
  const [symbol, setSymbol] = useState(() => {
    return localStorage.getItem("lastSymbol") || "";
  });
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);
  const [showLimitMsg, setShowLimitMsg] = useState(false);
  const [showApiLimitMsg, setShowApiLimitMsg] = useState(false);
  const [requestCount, setRequestCount] = useState(() => {
    const saved = parseInt(localStorage.getItem("requestCount"), 10);
    return Number.isNaN(saved) ? 0 : saved;
  });

  const [fetchData, { data: result, error, isLoading }] = useLazyGetDataQuery();

  const [persistedResult, setPersistedResult] = useState(() => {
    const saved = localStorage.getItem("lastResult");
    return saved ? JSON.parse(saved) : null;
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!symbol.trim()) {
      setShowEmptyMsg(true);
      return;
    }

    if (requestCount >= 25) {
      setShowLimitMsg(true);
      return;
    }

    setRequestCount((c) => c + 1);
    fetchData(symbol.toUpperCase());
    window.history.pushState(null, "", `?symbol=${encodeURIComponent(symbol)}`);
  };

  const clearSearch = () => {
    setSymbol("");
    setPersistedResult(null);
    localStorage.removeItem("lastResult");
    localStorage.removeItem("lastSymbol");
    window.history.replaceState(null, "", window.location.pathname);
  };

  useEffect(() => {
    if (error && error.status === 429) {
      setShowApiLimitMsg(true);
    }
    localStorage.setItem("requestCount", String(requestCount));
    if (result) {
      localStorage.setItem("lastResult", JSON.stringify(result));
      localStorage.setItem("lastSymbol", symbol);
      setPersistedResult(result);
    }
  }, [requestCount, error, result, symbol]);

  const displayResult = result ?? persistedResult;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Stocks (e.g., AAPL, MSFT)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border p-2 pr-8 rounded"
          />
          {symbol && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute inset-y-0 right-2 flex items-center justify-center
                 bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-full
                 w-6 h-6"
            >
              ×
            </button>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Fetch Overview & Earnings
        </button>
      </form>
      <MessageDialog
        message="AlphaVantage rate limit exceeded. Please wait a minute before trying again."
        visible={showApiLimitMsg}
        onClose={() => setShowApiLimitMsg(false)}
      />

      <MessageDialog
        message="Please enter a stock name before submitting."
        visible={showEmptyMsg}
        onClose={() => setShowEmptyMsg(false)}
      />

      <MessageDialog
        message="Request limit reached (25). Please wait or upgrade your plan."
        visible={showLimitMsg}
        onClose={() => setShowLimitMsg(false)}
      />

      {isLoading && <p className="mt-4">Loading…</p>}

      {error && (
        <p className="mt-4 text-red-500">
          {(() => {
            if (error.status) {
              const data = error.data;
              if (data && typeof data === "object" && "error" in data) {
                return data.error;
              }
              return `Request failed with status ${error.status}`;
            }
            return error.error;
          })()}
        </p>
      )}

      {displayResult && (
        <div className="mt-6">
          <Overview
            Symbol={displayResult.overview.Symbol}
            OfficialSite={displayResult.overview.OfficialSite}
            Name={displayResult.overview.Name}
            Description={displayResult.overview.Description}
          />
          <h2 className="text-xl font-semibold mb-2 mt-5">
            {displayResult.earnings
              ? `${(
                  displayResult.overview.Symbol || symbol
                ).toUpperCase()} Earnings`
              : "Earnings"}
          </h2>
          <EarningsTable earnings={displayResult.earnings.annualEarnings} />
          <KeyDataTable overview={displayResult.overview} />
        </div>
      )}

      <RequestCounter count={requestCount} max={25} />

      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            setRequestCount(0);
            localStorage.removeItem("requestCount");
          }}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Reset Counter
        </button>
      </div>
    </div>
  );
}

export default App;
