import React, { useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Settings,
  BarChart2,
  Plus,
  LogOut,
  CalendarDays,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import QuickActions from "../components/dashboard/QuickActions";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const desktopNavItems = [
    { to: "/", icon: LayoutDashboard, label: "History" },
    { to: "/workouts", icon: Dumbbell, label: "Workouts" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-background text-text-main font-display overflow-hidden">
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-surface border-r border-slate-200 h-full p-6 justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-primary p-2 rounded-lg">
              <Dumbbell className="text-slate-900 w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              FitTrack
            </span>
          </div>

          <nav className="space-y-2">
            {desktopNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive
                      ? "bg-primary text-slate-900 shadow-lg shadow-primary/20"
                      : "text-text-muted hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                <item.icon size={20} strokeWidth={2.5} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-text-muted hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative h-full pb-24 md:pb-0 scrollbar-hide">
        <Outlet />

        {/* Overlay when Quick Actions are open */}
        {isActionsOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={() => setIsActionsOpen(false)}
          />
        )}

        {/* Quick Actions Menu (Mobile Only) */}
        <QuickActions
          isOpen={isActionsOpen}
          onClose={() => setIsActionsOpen(false)}
        />
      </main>

      {/* MOBILE BOTTOM NAVIGATION (Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-t border-slate-200 px-6 pb-8 pt-2">
        <div className="flex items-center justify-between relative">
          {/* Left Items */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-text-muted"}`
            }
          >
            <CalendarDays size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">History</span>
          </NavLink>

          <NavLink
            to="/workouts"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-text-muted"}`
            }
          >
            <Dumbbell size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">Workouts</span>
          </NavLink>

          {/* Center FAB */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <button
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className={`flex items-center justify-center h-16 w-16 rounded-full shadow-xl ring-4 ring-background transition-transform active:scale-95 ${isActionsOpen ? "bg-slate-900 rotate-45" : "bg-primary"}`}
            >
              <Plus
                size={32}
                strokeWidth={3}
                className={isActionsOpen ? "text-white" : "text-slate-900"}
              />
            </button>
          </div>

          {/* Spacer for FAB */}
          <div className="w-12"></div>

          {/* Right Items */}
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-text-muted"}`
            }
          >
            <BarChart2 size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">Progress</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-text-muted"}`
            }
          >
            <User size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
