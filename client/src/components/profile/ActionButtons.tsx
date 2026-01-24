import { Bell, LogOut } from "lucide-react";

interface ActionButtonsProps {
  onLogout: () => void;
}

export default function ActionButtons({ onLogout }: ActionButtonsProps) {
  return (
    <section className="px-6 mt-8">
      <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-slate-400" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <svg
            className="w-4 h-4 text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3 text-red-500">
            <LogOut size={20} />
            <span className="text-sm font-medium">Log Out</span>
          </div>
        </button>
      </div>
    </section>
  );
}
