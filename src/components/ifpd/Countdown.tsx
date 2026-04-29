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
    <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${compact ? "max-w-md" : "max-w-xl"}`}>
      {items.map((i) => (
        <div
          key={i.label}
          className="rounded-xl bg-white/10 backdrop-blur border border-white/15 px-2 py-3 sm:px-3 sm:py-4 text-center"
        >
          <div className="text-2xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[10px] sm:text-xs uppercase tracking-widest text-white/70">
            {i.label}
          </div>
        </div>
      ))}
    </div>
  );
}
