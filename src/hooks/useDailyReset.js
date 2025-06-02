import { useEffect } from "react";

function getIsoDateString(date = new Date()) {
  return date.toISOString().split("T")[0];
}

export function useDailyReset(onReset, hour, minute, storageKeyDate) {
  useEffect(() => {
    function checkAndResetIfNeeded() {
      const today = getIsoDateString();
      const lastStored = localStorage.getItem(storageKeyDate) || "";
      if (lastStored !== today) {
        onReset();
        localStorage.setItem(storageKeyDate, today);
      }
    }

    checkAndResetIfNeeded();

    const now = new Date();
    let nextReset = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      minute,
      0,
      0
    );

    if (nextReset.getTime() <= now.getTime()) {
      nextReset.setDate(nextReset.getDate() + 1);
    }
    const msUntilReset = nextReset.getTime() - now.getTime();

    const timerId = setTimeout(() => {
      onReset();
      localStorage.setItem(storageKeyDate, getIsoDateString());

      const tomorrow = new Date(
        nextReset.getFullYear(),
        nextReset.getMonth(),
        nextReset.getDate() + 1,
        hour,
        minute,
        0,
        0
      );
      const msToTomorrow = tomorrow.getTime() - Date.now();
      setTimeout(() => {
        onReset();
        localStorage.setItem(storageKeyDate, getIsoDateString());
      }, msToTomorrow);
    }, msUntilReset);

    function handleVisibilityOrFocus() {
      if (document.visibilityState === "visible") {
        checkAndResetIfNeeded();
      }
    }
    window.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [onReset, hour, minute, storageKeyDate]);
}
