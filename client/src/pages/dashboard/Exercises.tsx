import { useState } from "react";
import ExerciseHeader from "../../components/dashboard/exercises/ExerciseHeader";
import SearchBar from "../../components/dashboard/exercises/SearchBar";
import CategoryFilter from "../../components/dashboard/exercises/CategoryFilter";
import ExerciseList from "../../components/dashboard/exercises/ExerciseList";
import CreateExerciseModal from "../../components/ui/exercises/modals/CreateExerciseModal";

export default function Exercises() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto w-full md:max-w-4xl">
      <ExerciseHeader onAddClick={() => setIsModalOpen(true)} />
      <SearchBar />
      <CategoryFilter />
      <ExerciseList />

      <CreateExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // TODO: Refresh List
          console.log("Exercise added!");
        }}
      />
    </div>
  );
}
