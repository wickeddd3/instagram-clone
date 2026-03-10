export const ProgressBar = ({ segments, activeIndex, progress }: any) => (
  <div className="flex gap-1 px-4 pt-3 pb-1 z-50">
    {segments.map((_: any, i: number) => (
      <div
        key={i}
        className="h-0.5 flex-1 bg-white/20 rounded-full overflow-hidden"
      >
        <div
          className="h-full bg-white"
          style={{
            transition: i === activeIndex ? "width 50ms linear" : "none",
            width:
              i < activeIndex
                ? "100%"
                : i === activeIndex
                  ? `${progress}%`
                  : "0%",
          }}
        />
      </div>
    ))}
  </div>
);
