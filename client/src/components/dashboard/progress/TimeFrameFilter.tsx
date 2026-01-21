import { useState } from "react";

const timeframes = ["1W", "1M", "3M", "6M", "1Y"];

export default function TimeFrameFilter() {
  const [selected, setSelected] = useState("1M");

  return (
    <section className="py-2">
      <div className="flex items-center justify-between bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setSelected(tf)}
            className={`
                    flex-1 py-2 px-3 text-[10px] font-bold rounded-full transition-colors cursor-pointer
                    ${
                      selected === tf
                        ? "bg-primary text-white shadow-sm"
                        : "text-text-muted hover:bg-slate-50"
                    }
                `}
          >
            {tf}
          </button>
        ))}
      </div>
    </section>
  );
}
