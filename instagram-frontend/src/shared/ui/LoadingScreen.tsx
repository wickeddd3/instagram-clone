export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0d1015] z-9999">
      <div className="relative animate-pulse">
        {/* Instagram Logo */}
        <div className="w-20 h-20">
          <img src="/ig-logo.png" alt="Instagram" />
        </div>
      </div>
      {/* Meta Logo */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1">
        <span className="text-gray-400 text-sm tracking-widest">from</span>
        <img src="/meta-logo.png" width="120" height={30} alt="Meta" />
      </div>
    </div>
  );
};
