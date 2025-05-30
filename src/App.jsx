// src/App.jsx
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import ResultsGrid from "./components/ResultsGrid";
import FooterControls from "./components/FooterControls";
import { useStockData } from "./hooks/useStockData";
import { useRequestCounter } from "./hooks/useRequestCounter";

export default function App() {
  const { symbol, setSymbol, result, error, isLoading, load } = useStockData();
  const { count, increment, reset, atLimit } = useRequestCounter(25);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!symbol.trim()) return;
    if (atLimit) return;
    increment();
    load(symbol);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <PageHeader />

        <SearchBar
          symbol={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onSubmit={onSubmit}
          onClear={() => load("")}
          atLimit={atLimit}
        />

        {isLoading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error.error || "Error!"}</p>}

        <ResultsGrid data={result} symbol={symbol} />

        <FooterControls count={count} onReset={reset} />
      </div>
    </div>
  );
}
