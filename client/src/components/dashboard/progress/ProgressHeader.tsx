import { Share, Settings } from "lucide-react";

export default function ProgressHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl px-6 pt-12 pb-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-text-main">
          Progress
        </h1>
        <div className="flex gap-4">
          <button className="flex items-center justify-center size-10 rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer text-text-muted">
            <Share size={20} />
          </button>
          <button className="flex items-center justify-center size-10 rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer text-text-muted">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
