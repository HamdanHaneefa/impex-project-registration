import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-09T10:00:00+05:30").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: t.d },
    { label: "Hours", value: t.h },
    { label: "Minutes", value: t.m },
    { label: "Seconds", value: t.s },
  ];

  return (
    <div className={`grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 ${compact ? "max-w-md" : "max-w-xl"}`}>
      {items.map((i) => (
        <div
          key={i.label}
          className="rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md border border-white/40 px-1.5 py-2 sm:px-2 sm:py-3 md:px-3 md:py-4 text-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tabular-nums tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}
