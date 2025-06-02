import { useLazyGetDataQuery } from "../services/dataApi";
import { usePersistedState } from "./usePersistedState";

export function useStockData() {
  const [symbol, setSymbol] = usePersistedState("lastSymbol", "");
  const [storedResult, setStoredResult] = usePersistedState("lastResult", null);
  const [fetchData, { data, error, isLoading }] = useLazyGetDataQuery();

  const load = (s) => {
    if (!s.trim()) {
      setSymbol("");
      return setStoredResult(null);
    }
    setSymbol(s);
    fetchData(s.toUpperCase()).then((res) => {
      if (res.data) setStoredResult(res.data);
    });
    window.history.replaceState(null, "", `?symbol=${encodeURIComponent(s)}`);
  };

  return {
    symbol,
    setSymbol,
    result: data ?? storedResult,
    error,
    isLoading,
    load,
  };
}
