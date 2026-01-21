import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import CalendarView from "./CalendarView";

export default function ConsistencyHeatmap() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock data for heatmap squares (opacity levels: 0.1, 0.4, 0.7, 1.0)
  const squares = Array.from({ length: 30 }, () => Math.random());

  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          {isExpanded ? "History" : "Workout Consistency"}
        </h3>
        {!isExpanded && (
          <span className="text-xs font-medium text-primary-hover">
            Last 30 Days
          </span>
        )}
      </div>

      {isExpanded ? (
        <CalendarView />
      ) : (
        <div className="flex gap-1 mb-4 overflow-hidden h-10 items-center">
          {squares.map((val, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary h-full hover:scale-y-110 transition-transform duration-200"
              style={{
                opacity: Math.max(0.1, val),
                height: `${Math.max(30, val * 100)}%`,
              }}
            ></div>
          ))}
        </div>
      )}

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center gap-2 text-primary-hover text-sm font-medium cursor-pointer hover:underline mt-4 pt-2 border-t border-slate-50"
      >
        <span>{isExpanded ? "Collapse view" : "Tap to expand calendar"}</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
    </section>
  );
}
