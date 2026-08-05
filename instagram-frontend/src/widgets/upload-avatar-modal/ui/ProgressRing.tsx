import type { ReactNode } from "react";

interface ProgressRingProps {
  progress: number;
  active?: boolean;
  size?: number;
  stroke?: number;
  children: ReactNode;
}

// Draws an animated circular progress track around its children (the avatar
// preview). The ring only renders while `active`, so it disappears when idle.
export const ProgressRing = ({
  progress,
  active = false,
  size = 112,
  stroke = 4,
  children,
}: ProgressRingProps) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {active && (
        <svg
          width={size}
          height={size}
          className="absolute inset-0 -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-neutral-700"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="stroke-indigo-500 transition-[stroke-dashoffset] duration-200 ease-out"
          />
        </svg>
      )}
      {children}
    </div>
  );
};
