import { Shield, Lock } from "lucide-react";

export default function UserManagement() {
  return (
    <section className="px-6 mb-6">
      <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-slate-200">
        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            User Management
          </p>
        </div>
        <button className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Account Security</span>
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
        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium">Privacy Settings</span>
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
      </div>
    </section>
  );
}
