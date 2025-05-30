import { useState, useEffect } from "react";

export function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    if (stored != null) {
      try {
        return JSON.parse(stored);
      } catch {
        // not valid JSON—just return the raw string
        return stored;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      // try to stringify (objects, arrays)
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // fallback for strings or other primitives
      localStorage.setItem(key, String(state));
    }
  }, [key, state]);

  return [state, setState];
}
