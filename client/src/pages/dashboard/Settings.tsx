import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import AddExerciseModal from "../../components/session/AddExerciseModal";

interface TrackedExercise {
  id: string;
  name: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const [trackedExercises, setTrackedExercises] = useState<TrackedExercise[]>(
    () => {
      const stored = localStorage.getItem("tracked_exercises");
      return stored ? JSON.parse(stored) : [];
    },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tracked_exercises", JSON.stringify(trackedExercises));
  }, [trackedExercises]);

  const handleAddExercise = (exercise: { id: string; name: string }) => {
    if (!trackedExercises.find((e) => e.id === exercise.id)) {
      setTrackedExercises((prev) => [
        ...prev,
        { id: exercise.id, name: exercise.name },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleRemoveExercise = (id: string) => {
    setTrackedExercises((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="w-10 h-10 flex items-center justify-start">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-100 rounded-lg transition-colors p-1"
          >
            <ArrowLeft size={20} className="text-text-muted" />
          </button>
        </div>
        <h1 className="text-lg font-bold">Settings</h1>
        <div className="w-10 h-10" />
      </header>

      <main className="max-w-md mx-auto px-6 pb-32">
        {/* Tracked Exercises Section */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-text-main">
                Tracked Exercises
              </h2>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <p className="text-sm text-text-muted mb-4">
            Select exercises you want to monitor for personal bests on your
            Progress dashboard.
          </p>

          {trackedExercises.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted bg-slate-50 rounded-lg">
              <p className="text-sm font-medium">No exercises tracked</p>
              <p className="text-xs mt-1">Click Add to track exercises</p>
            </div>
          ) : (
            <div className="space-y-2">
              {trackedExercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-text-muted w-6">
                      {index + 1}.
                    </span>
                    <span className="font-medium text-text-main">
                      {exercise.name}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveExercise(exercise.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Future Settings Sections */}
        <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-text-main mb-2">
            More Settings
          </h2>
          <p className="text-sm text-text-muted">Coming soon...</p>
        </section>
      </main>

      <AddExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExercise={handleAddExercise}
      />
    </div>
  );
}
