import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

interface ExerciseFiltersModalProps {
  isOpen: boolean;
  filters: {
    muscle?: string;
    category?: string;
    equipment?: string;
  };
  onChange: (filters: ExerciseFiltersModalProps["filters"]) => void;
  onClose: () => void;
}

export default function ExerciseFiltersModal({
  isOpen,
  filters,
  onChange,
  onClose,
}: ExerciseFiltersModalProps) {
  const { token } = useAuth();
  const [muscles, setMuscles] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);

  useEffect(() => {
    if (!token || !isOpen) return;
    api
      .get("/exercises/muscles", token)
      .then((res) =>
        setMuscles(Array.isArray(res.data?.data) ? res.data.data : []),
      )
      .catch(() => setMuscles([]));
    api
      .get("/exercises/categories", token)
      .then((res) =>
        setCategories(Array.isArray(res.data?.data) ? res.data.data : []),
      )
      .catch(() => setCategories([]));
    api
      .get("/exercises/equipment", token)
      .then((res) =>
        setEquipment(Array.isArray(res.data?.data) ? res.data.data : []),
      )
      .catch(() => setEquipment([]));
  }, [token, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-full max-w-xs shadow-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Filter Exercises</h2>
        <div className="flex flex-col gap-4">
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={filters.muscle || ""}
            onChange={(e) => onChange({ ...filters, muscle: e.target.value })}
          >
            <option value="">All Muscles</option>
            {muscles.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={filters.category || ""}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={filters.equipment || ""}
            onChange={(e) =>
              onChange({ ...filters, equipment: e.target.value })
            }
          >
            <option value="">All Equipment</option>
            {equipment.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>
        </div>
        <button
          className="mt-6 w-full bg-primary text-white py-2 rounded-lg"
          onClick={onClose}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
