import { usePersistedState } from "./usePersistedState";

export function useRequestCounter(max = 25) {
  const [count, setCount] = usePersistedState("requestCount", 0);

  const increment = () => {
    setCount((c) => (c < max ? c + 1 : c));
  };
  const reset = () => setCount(0);

  return { count, increment, reset, atLimit: count >= max };
}
