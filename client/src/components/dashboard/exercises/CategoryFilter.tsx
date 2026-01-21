const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms"];

export default function CategoryFilter() {
  return (
    <div className="flex gap-3 px-6 py-2 overflow-x-auto no-scrollbar">
      {categories.map((cat, index) => (
        <button
          key={index}
          className={`
              flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors cursor-pointer
              ${
                index === 0
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
