import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { useAuth } from "../../../context/AuthContext";

interface ExerciseFiltersProps {
  filters: {
    muscle?: string;
    category?: string;
    equipment?: string;
  };
  onChange: (filters: ExerciseFiltersProps["filters"]) => void;
}

export default function ExerciseFilters({
  filters,
  onChange,
}: ExerciseFiltersProps) {
  const { token } = useAuth();
  const [muscles, setMuscles] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;
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
  }, [token]);

  return (
    <div className="flex flex-wrap gap-4 px-6 py-2">
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
        onChange={(e) => onChange({ ...filters, equipment: e.target.value })}
      >
        <option value="">All Equipment</option>
        {equipment.map((eq) => (
          <option key={eq} value={eq}>
            {eq}
          </option>
        ))}
      </select>
    </div>
  );
}
