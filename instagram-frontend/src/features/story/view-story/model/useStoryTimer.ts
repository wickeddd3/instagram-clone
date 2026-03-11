import { useEffect, useRef, useState } from "react";

export const useStoryTimer = (
  duration: number,
  onComplete: () => void,
  activeStoryId: string,
  isPaused: boolean,
) => {
  const [progress, setProgress] = useState(0);

  // Use a ref for the callback and activeStoryId so the effect doesn't
  // restart if the parent component re-renders the function
  const onCompleteRef = useRef(onComplete);
  const lastStoryId = useRef(activeStoryId);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    // 1. If paused (e.g. Viewers list is open), stop everything
    if (isPaused) return;

    // 2. Determine if this is a brand new segment
    const isNewSegment = lastStoryId.current !== activeStoryId;

    // 3. If it's a new segment, we MUST start from 0.
    // Otherwise, use the current progress (for resuming after pause).
    const startingProgress = isNewSegment ? 0 : progress;

    if (isNewSegment) {
      setProgress(0);
      lastStoryId.current = activeStoryId;
    }

    const startTime = Date.now() - (startingProgress / 100) * duration;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = (elapsed / duration) * 100;

      if (percent >= 100) {
        clearInterval(interval);
        setProgress(100);
        onCompleteRef.current(); // Trigger the next segment
      } else {
        setProgress(percent);
      }
    }, 32); // ~30fps is plenty smooth

    return () => clearInterval(interval);

    // Dependencies: We watch activeStoryId to trigger the 'Reset' logic above
  }, [duration, activeStoryId, isPaused]);

  return { progress, setProgress };
};
