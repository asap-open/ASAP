import { useState, useEffect } from "react";
import { ChevronRight, Dumbbell, Loader2 } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

interface SessionStats {
  totalVolume: number;
  duration: number | null;
  exerciseCount: number;
  totalSets: number;
}

interface WorkoutSession {
  id: number;
  sessionName: string;
  startTime: string;
  endTime: string | null;
  stats: SessionStats;
  exercises: Array<{
    exercise: {
      name: string;
      category: string;
    };
  }>;
}

interface RecentHistoryProps {
  filter?: "today" | "week" | "month";
}

export default function RecentHistory({ filter }: RecentHistoryProps) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, [filter]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const filterQuery = filter ? `?filter=${filter}&limit=10` : "?limit=10";
      const response = await api.get(`/sessions${filterQuery}`, token);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
      return `Today, ${date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}`;
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const formatDuration = (duration: number | null) => {
    if (!duration) return "N/A";
    const mins = Math.round(duration);
    if (mins < 60) return `${mins} mins`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  const getCategoryColor = (category?: string) => {
    const colors: { [key: string]: string } = {
      chest: "bg-green-100 text-green-600",
      back: "bg-blue-100 text-blue-600",
      legs: "bg-orange-100 text-orange-600",
      shoulders: "bg-purple-100 text-purple-600",
      arms: "bg-pink-100 text-pink-600",
      core: "bg-yellow-100 text-yellow-600",
      cardio: "bg-red-100 text-red-600",
    };

    const key = category?.toLowerCase() || "other";
    return colors[key] || "bg-slate-100 text-slate-600";
  };

  const handleSessionClick = (sessionId: number) => {
    // TODO: Navigate to session detail page
    console.log("View session:", sessionId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <Dumbbell className="mx-auto text-slate-300 mb-4" size={48} />
        <p className="text-text-muted text-sm">No workouts yet</p>
        <p className="text-text-muted text-xs mt-1">
          Start your first session to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sessions.map((session) => {
        const primaryCategory = session.exercises[0]?.exercise?.category;
        const colorClass = getCategoryColor(primaryCategory);

        return (
          <div
            key={session.id}
            onClick={() => handleSessionClick(session.id)}
            className="bg-surface p-4 rounded-[24px] shadow-sm border border-slate-50 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            <div
              className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colorClass}`}
            >
              <Dumbbell size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base leading-tight text-text-main truncate">
                {session.sessionName}
              </h3>
              <div className="flex items-center gap-2 text-text-muted text-xs font-medium mt-1">
                <span>{formatTime(session.startTime)}</span>
                <span className="opacity-30">•</span>
                <span>{formatDuration(session.stats.duration)}</span>
                <span className="opacity-30">•</span>
                <span>{session.stats.exerciseCount} exercises</span>
              </div>
            </div>
            <ChevronRight className="text-gray-300 flex-shrink-0" size={24} />
          </div>
        );
      })}
    </div>
  );
}
