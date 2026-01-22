const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms"];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-3 px-6 py-2 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
              flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors cursor-pointer
              ${
                selected === cat
                  ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold"
                  : "bg-white border border-slate-100 text-text-muted hover:border-primary/50 hover:text-primary-hover"
              }
           `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
