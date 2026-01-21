export default function MuscleDistribution() {
  return (
    <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-6">
        Muscle Group Split
      </h3>
      <div className="flex items-center gap-8">
        {/* Donut Chart */}
        <div className="relative size-32 shrink-0">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <circle
              className="stroke-primary"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="40 100"
              strokeWidth="4"
            />
            <circle
              className="stroke-orange-400"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="25 100"
              strokeDashoffset="-40"
              strokeWidth="4"
            />
            <circle
              className="stroke-blue-400"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="20 100"
              strokeDashoffset="-65"
              strokeWidth="4"
            />
            <circle
              className="stroke-purple-400"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="15 100"
              strokeDashoffset="-85"
              strokeWidth="4"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-bold text-text-muted">Total</span>
            <span className="text-lg font-black text-text-main">48</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">
          {[
            { label: "Legs", percent: "40%", color: "bg-primary" },
            { label: "Chest", percent: "25%", color: "bg-orange-400" },
            { label: "Back", percent: "20%", color: "bg-blue-400" },
            { label: "Arms", percent: "15%", color: "bg-purple-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`size-2 rounded-full ${item.color}`}></div>
                <span className="text-xs font-bold text-text-muted">
                  {item.label}
                </span>
              </div>
              <span className="text-xs font-bold text-text-main">
                {item.percent}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
