import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

  // Helpers to generate calendar grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const getDaysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    const day = new Date(y, m, 1).getDay(); // 0 = Sun, 1 = Mon...
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };

  const totalDays = getDaysInMonth(year, month);
  const startOffset = getFirstDayOfMonth(year, month);

  // Create array for blank spaces before the 1st of the month
  const blanks = Array.from({ length: startOffset });
  // Create array for actual days
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  // Mock active days (randomly select ~10 days for demo)
  const activeDays = [2, 5, 8, 12, 14, 15, 19, 22, 26, 28, 30];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-text-primary text-lg">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1.5 hover:bg-slate-100 rounded-full text-text-muted transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-slate-100 rounded-full text-text-muted transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Grid Header (Days) */}
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((d, i) => (
          <div
            key={i}
            className="text-center text-xs font-bold text-text-muted/60 uppercase"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-10 w-full" />
        ))}

        {days.map((day) => {
          const isWorkout = activeDays.includes(day);
          const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

          return (
            <div key={day} className="flex items-center justify-center">
              <button
                className={`
                  h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium transition-all
                  ${
                    isWorkout
                      ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-hover"
                      : "text-text-primary hover:bg-slate-50"
                  }
                  ${isToday && !isWorkout ? "border-2 border-primary text-primary" : ""}
                `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
