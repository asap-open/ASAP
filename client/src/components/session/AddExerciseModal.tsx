import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { api } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "../dashboard/exercises/SearchBar";

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  primaryMuscles: string[];
}

interface AddExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExercise: (exercise: Exercise) => void;
}

export default function AddExerciseModal({
  isOpen,
  onClose,
  onAddExercise,
}: AddExerciseModalProps) {
  const { token } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>(["all"]);

  // Fetch categories once when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Fetch exercises when modal opens or search/category changes
  useEffect(() => {
    if (isOpen) {
      fetchExercises();
    }
    // eslint-disable-next-line
  }, [isOpen, searchQuery, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/exercises/categories", token);
      setCategories(["all", ...(response.data || response)]);
    } catch (error) {
      setCategories(["all"]);
    }
  };

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append("q", searchQuery);
      if (selectedCategory && selectedCategory !== "all")
        params.append("category", selectedCategory);

      const response = await api.get(
        `/exercises/search?${params.toString()}`,
        token,
      );
      setExercises(response.data || response);
    } catch (error) {
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    onAddExercise(exercise);
    onClose();
    setSearchQuery("");
    setSelectedCategory("all");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl md:rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-in slide-in-from-bottom md:slide-in-from-bottom-0 md:fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-text-main">Add Exercise</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-main transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          {/* Category Filter */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-text-muted hover:bg-slate-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-8 text-text-muted">
              Loading exercises...
            </div>
          ) : exercises.length === 0 ? (
            <div className="text-center py-8 text-text-muted">
              No exercises found
            </div>
          ) : (
            <div className="space-y-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => handleAddExercise(exercise)}
                  className="w-full p-4 bg-white border border-slate-100 rounded-xl hover:border-primary hover:shadow-sm transition-all text-left"
                >
                  <div className="font-semibold text-text-main">
                    {exercise.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-text-muted uppercase font-semibold">
                      {exercise.category}
                    </span>
                    <span className="text-xs text-text-muted">•</span>
                    <span className="text-xs text-text-muted">
                      {exercise.equipment}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
