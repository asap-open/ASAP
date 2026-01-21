import WeekCalendar from "../../components/dashboard/WeekCalendar";
import RecentHistory from "../../components/dashboard/RecentHistory";

export default function History() {
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
          <button className="px-5 py-2 rounded-full bg-primary text-slate-900 text-sm font-semibold shadow-sm shadow-primary/20">
            Today
          </button>
          <button className="px-5 py-2 rounded-full bg-slate-200/60 text-text-muted text-sm font-semibold hover:bg-slate-200 transition-colors">
            1 Week
          </button>
          <button className="px-5 py-2 rounded-full bg-slate-200/60 text-text-muted text-sm font-semibold hover:bg-slate-200 transition-colors">
            1 Month
          </button>
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
        <RecentHistory />
      </div>
    </div>
  );
}
