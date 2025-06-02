import { useState, useEffect } from "react";

export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) {
      try {
        return JSON.parse(stored);
      } catch {
        return stored;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      localStorage.setItem(key, String(state));
    }
  }, [key, state]);

  return [state, setState];
}
