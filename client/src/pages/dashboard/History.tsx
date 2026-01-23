import { useState } from "react";
import WeekCalendar from "../../components/dashboard/history/WeekCalendar";
import RecentHistory from "../../components/dashboard/history/RecentHistory";

type TimeFilter = "today" | "week" | "month";

export default function History() {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("today");

  const filters: { label: string; value: TimeFilter }[] = [
    { label: "Today", value: "today" },
    { label: "1 Week", value: "week" },
    { label: "1 Month", value: "month" },
  ];

  return (
    <div className="max-w-md mx-auto w-full md:max-w-4xl md:px-6">
      {/* Header */}
      <header className="pt-8 px-6 pb-4 bg-background md:pt-12 md:pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text-main">
          FitTrack
        </h1>
      </header>

      {/* Calendar Strip */}
      <div className="px-6 mb-6">
        <WeekCalendar />
      </div>

      {/* Time Filter Pills */}
      <div className="px-6 mb-8">
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all ${
                activeFilter === filter.value
                  ? "bg-primary text-slate-900 shadow-primary/20"
                  : "bg-slate-200/60 text-text-muted hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="px-6 pb-32">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-main">History</h2>
          <button className="text-primary-hover text-sm font-bold hover:underline">
            See All
          </button>
        </div>
        <RecentHistory filter={activeFilter} />
      </div>
    </div>
  );
}
