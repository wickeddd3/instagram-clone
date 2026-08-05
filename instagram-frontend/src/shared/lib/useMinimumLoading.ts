import { useEffect, useRef, useState } from "react";

/**
 * Keeps a loading flag "on" for at least `minDuration` ms after it first turns
 * on, so brief loads don't flash the loading UI on and off. Once `loading`
 * clears, the returned flag stays true until the minimum duration has elapsed.
 */
export function useMinimumLoading(loading: boolean, minDuration = 500): boolean {
  const [visible, setVisible] = useState(loading);
  const startedAt = useRef<number | null>(null);

  // Turn on immediately (during render) when loading starts.
  if (loading && !visible) {
    setVisible(true);
  }

  useEffect(() => {
    if (loading) {
      // Record when this loading cycle began (time reads are fine in effects).
      startedAt.current ??= Date.now();
      return;
    }

    if (startedAt.current === null) return;

    const remaining = Math.max(
      minDuration - (Date.now() - startedAt.current),
      0,
    );

    const timer = setTimeout(() => {
      startedAt.current = null;
      setVisible(false);
    }, remaining);

    return () => clearTimeout(timer);
  }, [loading, minDuration]);

  return visible;
}
