import { ChevronRight, Dumbbell, Waves, Zap } from "lucide-react";

const historyItems = [
  {
    id: 1,
    title: "Full Body Strength",
    time: "Today, 10:30 AM",
    duration: "45 mins",
    icon: Dumbbell,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    title: "Morning Swim",
    time: "Yesterday",
    duration: "30 mins",
    icon: Waves,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "HIIT Cardio",
    time: "Oct 12",
    duration: "20 mins",
    icon: Zap,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function RecentHistory() {
  return (
    <div className="flex flex-col gap-4">
      {historyItems.map((item) => (
        <div
          key={item.id}
          className="bg-surface p-4 rounded-[24px] shadow-sm border border-slate-50 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div
            className={`h-12 w-12 rounded-2xl flex items-center justify-center ${item.color}`}
          >
            <item.icon size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base leading-tight text-text-main">
              {item.title}
            </h3>
            <div className="flex items-center gap-2 text-text-muted text-xs font-medium mt-1">
              <span>{item.time}</span>
              <span className="opacity-30">•</span>
              <span>{item.duration}</span>
            </div>
          </div>
          <ChevronRight className="text-gray-300" size={24} />
        </div>
      ))}
    </div>
  );
}
