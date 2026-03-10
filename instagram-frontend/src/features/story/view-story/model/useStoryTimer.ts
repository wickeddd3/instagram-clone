import { useEffect, useRef, useState } from "react";

export const useStoryTimer = (
  duration: number,
  onComplete: () => void,
  activeStoryId: string,
) => {
  const [progress, setProgress] = useState(0);

  // Use a ref for the callback so the effect doesn't
  // restart if the parent component re-renders the function
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setProgress(0); // Reset for new segment

    const startTime = Date.now();

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
  }, [duration, activeStoryId]); // activeStoryId dependency ensure timer resets on new segment

  return { progress };
};
