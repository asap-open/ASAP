export default function WeekCalendar() {
  const days = [
    { day: "Mon", date: "12", active: false },
    { day: "Tue", date: "13", active: false },
    { day: "Wed", date: "14", active: true },
    { day: "Thu", date: "15", active: false },
    { day: "Fri", date: "16", active: false },
    { day: "Sat", date: "17", active: false },
  ];

  return (
    <div className="flex overflow-x-auto gap-3 py-2 scrollbar-none px-1">
      {days.map((item, index) => (
        <div
          key={index}
          className={`
            flex flex-col items-center min-w-[54px] p-3 rounded-2xl border shadow-sm transition-colors cursor-pointer
            ${
              item.active
                ? "bg-primary text-slate-900 border-primary shadow-lg shadow-primary/30"
                : "bg-surface text-text-main border-slate-100"
            }
          `}
        >
          <span
            className={`text-[10px] font-bold uppercase mb-1 ${item.active ? "opacity-80" : "text-text-muted"}`}
          >
            {item.day}
          </span>
          <span className="text-lg font-bold">{item.date}</span>
        </div>
      ))}
    </div>
  );
}
