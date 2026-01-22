import { useState, useEffect } from "react";
import ExerciseItem from "../../ui/exercises/ExerciseItem";
import CreateExerciseModal from "../../ui/exercises/modals/CreateExerciseModal";
import ExerciseDetailsModal from "../../ui/exercises/modals/ExerciseDetailsModal";
import ConfirmModal from "../../ui/exercises/modals/ConfirmDeleteModal";

// --- Types ---
interface Exercise {
  id?: string; // Should be in the real data
  title: string;
  muscles: string;
  category?: string;
  equipment?: string;
  secondaryMuscles?: string[];
  instructions?: string;
}

const exercisesMap: Exercise[] = [
  {
    id: "1",
    title: "Bench Press",
    muscles: "Chest, Triceps",
    category: "Strength",
    equipment: "Barbell",
    instructions: "Lie on the bench...",
  },
  {
    id: "2",
    title: "Deadlift",
    muscles: "Back, Legs, Core",
    category: "Powerlifting",
    equipment: "Barbell",
  },
  {
    id: "3",
    title: "Squat",
    muscles: "Legs, Glutes",
    category: "Powerlifting",
    equipment: "Barbell",
  },
  {
    id: "4",
    title: "Pull-Ups",
    muscles: "Back, Biceps",
    category: "Strength",
    equipment: "Bodyweight",
  },
  {
    id: "5",
    title: "Overhead Press",
    muscles: "Shoulders, Triceps",
    category: "Strength",
    equipment: "Barbell",
  },
];

export default function ExerciseList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Modal States
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [viewingExercise, setViewingExercise] = useState<Exercise | null>(null);
  const [deletingExercise, setDeletingExercise] = useState<Exercise | null>(
    null,
  );

  // Close menu when clicking anywhere else on the page
  useEffect(() => {
    const handleClickOutside = () => setOpenIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setOpenIndex(openIndex === index ? null : index);
  };

  const menuCallbacks = (exercise: Exercise) => ({
    onView: () => {
      setViewingExercise(exercise);
      setOpenIndex(null);
    },
    onEdit: () => {
      setEditingExercise(exercise);
      setOpenIndex(null);
    },
    onRemove: () => {
      setDeletingExercise(exercise);
      setOpenIndex(null);
    },
  });

  return (
    <div className="flex-1 px-6 py-6 pb-32 space-y-4">
      {exercisesMap.map((item, index) => (
        <ExerciseItem
          key={index}
          exercise={item}
          isOpen={openIndex === index}
          onToggle={(e) => handleToggle(e, index)}
          {...menuCallbacks(item)}
        />
      ))}

      {/* Modals */}
      <CreateExerciseModal
        isOpen={!!editingExercise}
        onClose={() => setEditingExercise(null)}
        initialData={editingExercise}
        onSuccess={() => console.log("Refetch list")}
      />

      <ExerciseDetailsModal
        isOpen={!!viewingExercise}
        onClose={() => setViewingExercise(null)}
        exercise={viewingExercise}
      />

      <ConfirmModal
        isOpen={!!deletingExercise}
        onClose={() => setDeletingExercise(null)}
        onConfirm={() => {
          console.log("Deleted", deletingExercise?.title);
          // Call API delete here
        }}
        title="Delete Exercise"
        description={`Are you sure you want to delete "${deletingExercise?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive
      />
    </div>
  );
}
