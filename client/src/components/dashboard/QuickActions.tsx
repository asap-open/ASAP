import { Timer, LayoutTemplate } from "lucide-react";

interface QuickActionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickActions({ isOpen, onClose }: QuickActionsProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-50 pointer-events-none md:hidden">
      <div className="flex flex-col items-center gap-3 w-full pointer-events-auto">
        {/* Select Template */}
        <button className="bg-surface shadow-lg border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3 w-full animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-primary/10 text-primary-hover p-2 rounded-xl">
            <LayoutTemplate size={24} />
          </div>
          <span className="font-semibold text-sm text-text-main">
            Select a template routine
          </span>
        </button>

        {/* Start Fresh */}
        <button className="bg-surface shadow-lg border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3 w-full animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="bg-primary/10 text-primary-hover p-2 rounded-xl">
            <Timer size={24} />
          </div>
          <span className="font-semibold text-sm text-text-main">
            Start fresh session
          </span>
        </button>
      </div>
    </div>
  );
}
