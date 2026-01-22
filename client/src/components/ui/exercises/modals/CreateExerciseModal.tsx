import React, { useState } from "react";
import Modal from "../../Modal";
import { ChevronDown } from "lucide-react";
import { api } from "../../../../utils/api";

interface CreateExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateExerciseModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateExerciseModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Schema Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Strength");
  const [equipment, setEquipment] = useState("Bodyweight");
  const [primaryMuscles, setPrimaryMuscles] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert comma-separated strings to arrays for JSON fields
      const primary = primaryMuscles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const secondary = secondaryMuscles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      await api.post("/exercises", {
        name,
        category,
        equipment,
        primaryMuscles: primary,
        secondaryMuscles: secondary.length > 0 ? secondary : undefined,
        instructions,
        isCustom: true, // Always true for user-created
      });

      // Reset and close
      setName("");
      setInstructions("");
      setPrimaryMuscles("");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create exercise", error);
      alert("Failed to create exercise. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Exercise">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Exercise Name */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col w-full">
            <span className="text-text-main text-sm font-semibold pb-1.5 px-1">
              Exercise Name
            </span>
            <input
              required
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 h-14 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
              placeholder="e.g. Incline Bench Press"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        {/* Category & Equipment Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <span className="text-text-main text-sm font-semibold px-1">
              Category
            </span>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 h-14 px-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main"
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Stretching">Stretching</option>
                <option value="Plyometrics">Plyometrics</option>
                <option value="Powerlifting">Powerlifting</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Equipment */}
          <div className="flex flex-col gap-2">
            <span className="text-text-main text-sm font-semibold px-1">
              Equipment
            </span>
            <div className="relative">
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 h-14 px-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-text-main"
              >
                <option value="Bodyweight">Bodyweight</option>
                <option value="Barbell">Barbell</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Machine">Machine</option>
                <option value="Cable">Cable</option>
                <option value="Kettlebell">Kettlebell</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Primary Muscles */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col w-full">
            <span className="text-text-main text-sm font-semibold pb-1.5 px-1">
              Primary Muscles
            </span>
            <input
              required
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 h-14 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
              placeholder="e.g. Chest, Triceps (comma separated)"
              value={primaryMuscles}
              onChange={(e) => setPrimaryMuscles(e.target.value)}
            />
          </label>
        </div>

        {/* Secondary Muscles */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col w-full">
            <span className="text-text-main text-sm font-semibold pb-1.5 px-1">
              Secondary Muscles{" "}
              <span className="text-text-muted font-normal">(Optional)</span>
            </span>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 h-14 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main"
              placeholder="e.g. Shoulders"
              value={secondaryMuscles}
              onChange={(e) => setSecondaryMuscles(e.target.value)}
            />
          </label>
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col w-full">
            <span className="text-text-main text-sm font-semibold pb-1.5 px-1">
              Instructions{" "}
              <span className="text-text-muted font-normal">(Optional)</span>
            </span>
            <textarea
              className="w-full min-h-[120px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main resize-none"
              placeholder="Describe proper form..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </label>
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-3 pb-30">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-hover text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Add to Library"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="w-full bg-transparent text-text-muted font-medium py-2 rounded-xl hover:text-red-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
