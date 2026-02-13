import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RoutinesSection from "../../components/settings/RoutinesSection";
import TrackedExercisesSection from "../../components/settings/TrackedExercisesSection";
import { navigateBack } from "../../utils/navigation";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-start">
          <button
            onClick={() => navigateBack(navigate)}
            className="hover:bg-slate-100 rounded-lg transition-colors p-1"
          >
            <ArrowLeft size={20} className="text-text-muted" />
          </button>
        </div>
        <h1 className="text-lg font-bold">Settings</h1>
        <div className="w-10 h-10" />
      </header>

      <main className="max-w-md mx-auto px-6 pb-32 space-y-6">
        <RoutinesSection />
        <TrackedExercisesSection />
      </main>
    </div>
  );
}
