import { MoreVertical, Dumbbell, Activity, Target } from "lucide-react";

const exercises = [
  { title: "Bench Press", muscles: "Chest, Triceps", icon: Dumbbell },
  { title: "Deadlift", muscles: "Back, Legs, Core", icon: Activity },
  { title: "Squat", muscles: "Legs, Glutes", icon: Target },
  { title: "Pull-Ups", muscles: "Back, Biceps", icon: Dumbbell },
  { title: "Overhead Press", muscles: "Shoulders, Triceps", icon: Dumbbell },
];

export default function ExerciseList() {
  return (
    <div className="flex-1 px-6 py-6 pb-32 space-y-4">
      {exercises.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-sm border border-slate-50 flex items-center justify-between group hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary-hover">
              <item.icon size={24} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-text-main">
                {item.title}
              </h3>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                {item.muscles}
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-text-main p-2">
            <MoreVertical size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
