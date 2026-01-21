import { TrendingUp } from "lucide-react";

export default function VolumeStats() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Volume Chart */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-4">
          Weekly Volume
        </h3>
        <div className="flex items-end justify-between h-24 gap-1">
          <div
            className="w-full bg-primary/20 rounded-t-sm"
            style={{ height: "40%" }}
          ></div>
          <div
            className="w-full bg-primary/40 rounded-t-sm"
            style={{ height: "65%" }}
          ></div>
          <div
            className="w-full bg-primary/60 rounded-t-sm"
            style={{ height: "50%" }}
          ></div>
          <div
            className="w-full bg-primary rounded-t-sm"
            style={{ height: "90%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[8px] font-bold text-text-muted">W1</span>
          <span className="text-[8px] font-bold text-text-muted">W2</span>
          <span className="text-[8px] font-bold text-text-muted">W3</span>
          <span className="text-[8px] font-bold text-text-muted">W4</span>
        </div>
      </div>

      {/* BMI Donut */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
        <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-tight absolute top-5 left-5">
          BMI Status
        </h3>
        <div className="relative size-24 mt-4">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <circle
              className="stroke-slate-100"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="100 100"
              strokeWidth="3"
            ></circle>
            <circle
              className="stroke-primary"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray="65 100"
              strokeLinecap="round"
              strokeWidth="3"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black leading-none text-text-main">
              22.4
            </span>
            <span className="text-[8px] font-bold text-green-500 uppercase">
              Normal
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 col-span-1">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-text-muted uppercase tracking-tight">
            Total Volume
          </p>
          <p className="text-2xl font-black text-text-main">
            42,500{" "}
            <span className="text-sm font-normal text-text-muted">kg</span>
          </p>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={16} className="text-green-500" />
            <p className="text-green-500 text-xs font-bold">+12%</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 col-span-1">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold text-text-muted uppercase tracking-tight">
            Workouts
          </p>
          <p className="text-2xl font-black text-text-main">18</p>
          <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: "90%" }}
            ></div>
          </div>
          <p className="text-[10px] text-text-muted mt-1 font-medium">
            Goal: 20 completed
          </p>
        </div>
      </div>
    </div>
  );
}
